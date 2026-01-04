import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { fal } from "@fal-ai/client";
import { putR2Object } from "@/lib/r2";

const FAL_KEY = process.env.FAL_KEY;

fal.config({ credentials: FAL_KEY || "" });

export const dynamic = "force-dynamic";

/**
 * Get preview image status for a model.
 * If the job is pending, polls fal.ai for updates (like /api/fal/jobs does).
 */
export async function GET(request: NextRequest) {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const modelId = searchParams.get("modelId");

    if (!modelId) {
        return NextResponse.json({ error: "modelId is required" }, { status: 400 });
    }

    // Get preview record
    const { data: preview, error: previewError } = await supabase
        .from("preview_images")
        .select("*, generation_jobs(*)")
        .eq("model_id", parseInt(modelId))
        .eq("user_id", user.id)
        .single();

    if (previewError || !preview) {
        return NextResponse.json({
            error: "Preview not found",
            status: "not_found"
        }, { status: 404 });
    }

    // If already completed or failed, return immediately
    if (preview.status === "completed" || preview.status === "failed") {
        return NextResponse.json({
            status: preview.status,
            image_url: preview.image_url,
        });
    }

    // If pending, poll fal.ai for the job status (same pattern as /api/fal/jobs)
    const job = preview.generation_jobs;
    if (!job || !job.fal_request_id) {
        return NextResponse.json({
            status: preview.status,
            image_url: null,
        });
    }

    try {
        const falStatus = await fal.queue.status("fal-ai/bytedance/seedream/v4.5/edit", {
            requestId: job.fal_request_id,
        });

        console.log(`Preview job ${job.id} fal status:`, falStatus.status);

        if (falStatus.status === "COMPLETED") {
            // Try to claim the job with atomic lock
            const { data: claimedJob, error: claimError } = await supabase
                .from("generation_jobs")
                .update({ status: "processing" })
                .eq("id", job.id)
                .eq("status", "pending")
                .select()
                .single();

            if (claimError || !claimedJob) {
                // Another process got it, just return current status
                // Refetch the preview to get updated status
                const { data: updatedPreview } = await supabase
                    .from("preview_images")
                    .select("status, image_url")
                    .eq("id", preview.id)
                    .single();

                return NextResponse.json({
                    status: updatedPreview?.status || "pending",
                    image_url: updatedPreview?.image_url,
                });
            }

            // Fetch the result from fal
            const result = await fal.queue.result("fal-ai/bytedance/seedream/v4.5/edit", {
                requestId: job.fal_request_id,
            });

            const falImageUrl = (result.data as any)?.images?.[0]?.url;
            console.log(`Preview job ${job.id} completed, fal image URL:`, falImageUrl);

            if (falImageUrl) {
                try {
                    // Download image from fal.ai
                    const imageResponse = await fetch(falImageUrl);
                    if (!imageResponse.ok) {
                        throw new Error(`Failed to fetch from fal: ${imageResponse.status}`);
                    }

                    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

                    // Generate R2 key for preview
                    const timestamp = Date.now();
                    const randomId = crypto.randomUUID();
                    const key = `previews/${user.id}/${modelId}/${timestamp}-${randomId}.png`;

                    // Upload to R2
                    await putR2Object(key, imageBuffer, "image/png");

                    // Construct public URL
                    const r2BaseUrl = process.env.R2_PUBLIC_URL || "";
                    const publicUri = `${r2BaseUrl}/${key}`;

                    // Update preview_images table
                    await supabase
                        .from("preview_images")
                        .update({
                            status: "completed",
                            image_url: publicUri,
                            completed_at: new Date().toISOString(),
                        })
                        .eq("id", preview.id);

                    // Update generation_jobs table
                    await supabase
                        .from("generation_jobs")
                        .update({
                            status: "completed",
                            result_url: publicUri,
                            completed_at: new Date().toISOString(),
                        })
                        .eq("id", job.id);

                    return NextResponse.json({
                        status: "completed",
                        image_url: publicUri,
                    });
                } catch (saveError) {
                    console.error("Failed to save preview image:", saveError);

                    // Mark as failed
                    await supabase
                        .from("preview_images")
                        .update({
                            status: "failed",
                            completed_at: new Date().toISOString(),
                        })
                        .eq("id", preview.id);

                    await supabase
                        .from("generation_jobs")
                        .update({
                            status: "failed",
                            error_message: `Failed to save: ${saveError instanceof Error ? saveError.message : "Unknown"}`,
                            completed_at: new Date().toISOString(),
                        })
                        .eq("id", job.id);

                    return NextResponse.json({
                        status: "failed",
                        image_url: null,
                    });
                }
            }
        } else if ((falStatus as any).status === "FAILED") {
            // Mark as failed
            await supabase
                .from("preview_images")
                .update({
                    status: "failed",
                    completed_at: new Date().toISOString(),
                })
                .eq("id", preview.id);

            await supabase
                .from("generation_jobs")
                .update({
                    status: "failed",
                    error_message: "Generation failed on fal.ai",
                    completed_at: new Date().toISOString(),
                })
                .eq("id", job.id);

            return NextResponse.json({
                status: "failed",
                image_url: null,
            });
        }

        // Still pending
        return NextResponse.json({
            status: "pending",
            image_url: null,
        });

    } catch (error) {
        console.error("Error checking preview status:", error);
        return NextResponse.json({
            status: preview.status,
            image_url: preview.image_url,
            error: "Failed to check fal status",
        });
    }
}
