import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { fal } from "@fal-ai/client";
import { putR2Object } from "@/lib/r2";

export const dynamic = "force-dynamic";

fal.config({ credentials: process.env.FAL_KEY || "" });

// GET: Fetch user's generation jobs and poll for updates
export async function GET(request: NextRequest) {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const modelId = searchParams.get("modelId");
    const statusFilter = searchParams.get("status");
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);

    let query = supabase
        .from("generation_jobs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(limit);

    if (modelId) {
        query = query.eq("model_id", parseInt(modelId));
    }

    if (statusFilter) {
        query = query.eq("status", statusFilter);
    }

    const { data: jobs, error } = await query;

    if (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
    }

    // For pending jobs, poll fal.ai for status updates
    const pendingJobs = jobs?.filter(j => j.status === "pending") || [];
    let hasNewCompletions = false;

    if (pendingJobs.length > 0) {
        console.log(`Polling ${pendingJobs.length} pending jobs...`);

        for (const job of pendingJobs.slice(0, 5)) {
            try {
                const falStatus = await fal.queue.status("fal-ai/nano-banana-2/edit", {
                    requestId: job.fal_request_id,
                });

                console.log(`Job ${job.id} fal status:`, falStatus.status);

                if (falStatus.status === "COMPLETED") {
                    // ATOMIC LOCK: Try to claim the job by setting status to 'processing'
                    const { data: claimedJob, error: claimError } = await supabase
                        .from("generation_jobs")
                        .update({ status: "processing" })
                        .eq("id", job.id)
                        .eq("status", "pending")  // Only if still pending
                        .select()
                        .single();

                    if (claimError || !claimedJob) {
                        console.log(`Job ${job.id} already claimed by another process, skipping`);
                        continue;  // Another process (webhook) got it first
                    }

                    console.log(`Polling claimed job ${job.id}, fetching result...`);

                    // Fetch the result
                    const result = await fal.queue.result("fal-ai/nano-banana-2/edit", {
                        requestId: job.fal_request_id,
                    });

                    const imageUrls: string[] = ((result.data as any)?.images || [])
                        .map((i: any) => i?.url)
                        .filter((u: string) => !!u);
                    console.log(`Job ${job.id} completed, fal image URLs:`, imageUrls);

                    if (imageUrls.length > 0) {
                        try {
                            let firstPublicUri: string | null = null;
                            let firstImageId: number | null = null;

                            for (const url of imageUrls) {
                                const imageResponse = await fetch(url);
                                if (!imageResponse.ok) {
                                    throw new Error(`Failed to fetch from fal: ${imageResponse.status}`);
                                }

                                const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
                                console.log(`Downloaded image, size: ${imageBuffer.length} bytes`);

                                // Generate R2 key
                                const timestamp = Date.now();
                                const randomId = crypto.randomUUID();
                                const key = `generated/${user.id}/${job.model_id}/${timestamp}-${randomId}.png`;

                                // Upload to R2
                                await putR2Object(key, imageBuffer, "image/png");
                                console.log(`Uploaded to R2: ${key}`);

                                // Construct public URL
                                const r2BaseUrl = process.env.R2_PUBLIC_URL || "";
                                const publicUri = `${r2BaseUrl}/${key}`;

                                // Save to images table
                                const { data: newImage } = await supabase
                                    .from("images")
                                    .insert({
                                        uri: publicUri,
                                        modelId: job.model_id,
                                    })
                                    .select()
                                    .single();

                                if (!firstPublicUri) {
                                    firstPublicUri = publicUri;
                                    firstImageId = newImage?.id ?? null;
                                }
                            }

                            // Update job as completed
                            await supabase
                                .from("generation_jobs")
                                .update({
                                    status: "completed",
                                    result_url: firstPublicUri,
                                    image_id: firstImageId,
                                    completed_at: new Date().toISOString(),
                                })
                                .eq("id", job.id);

                            // If this is a preview job, update the preview_images table
                            if (job.is_preview) {
                                await supabase
                                    .from("preview_images")
                                    .update({
                                        image_url: firstPublicUri,
                                        status: "completed",
                                        completed_at: new Date().toISOString(),
                                    })
                                    .eq("job_id", job.id);

                                console.log(`Preview image completed for job ${job.id}`);
                            }

                            hasNewCompletions = true;
                        } catch (saveError) {
                            console.error("Failed to save generated image:", saveError);

                            // Mark as failed with error message
                            await supabase
                                .from("generation_jobs")
                                .update({
                                    status: "failed",
                                    error_message: `Failed to save: ${saveError instanceof Error ? saveError.message : "Unknown"}`,
                                    completed_at: new Date().toISOString(),
                                })
                                .eq("id", job.id);
                        }
                    }
                } else if ((falStatus as any).status === "FAILED") {
                    await supabase
                        .from("generation_jobs")
                        .update({
                            status: "failed",
                            error_message: "Generation failed on fal.ai",
                            completed_at: new Date().toISOString(),
                        })
                        .eq("id", job.id);
                }
            } catch (e) {
                console.error("Status check failed for job:", job.id, e);
            }
        }
    }

    // If we had completions, refetch the jobs to return updated data
    if (hasNewCompletions) {
        const { data: updatedJobs } = await supabase
            .from("generation_jobs")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(limit);

        return NextResponse.json({ jobs: updatedJobs, hasNewCompletions: true });
    }

    return NextResponse.json({ jobs, hasNewCompletions: false });
}
