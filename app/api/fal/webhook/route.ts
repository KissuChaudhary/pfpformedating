import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { putR2Object } from "@/lib/r2";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Create a service role client for webhook (bypasses RLS)
function getServiceClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    return createClient(supabaseUrl, serviceRoleKey);
}

// POST: Handle fal.ai webhook callback
export async function POST(request: NextRequest) {
    const supabase = getServiceClient();

    try {
        const body = await request.json();
        const { request_id, status, payload, error: falError } = body;

        console.log("Fal webhook received:", { request_id, status });

        if (!request_id) {
            return NextResponse.json({ error: "Missing request_id" }, { status: 400 });
        }

        // Find the job by fal_request_id
        const { data: job, error: jobFetchError } = await supabase
            .from("generation_jobs")
            .select("*")
            .eq("fal_request_id", request_id)
            .single();

        if (jobFetchError || !job) {
            console.error("Job not found for request_id:", request_id);
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        // Skip if job already completed/failed/processing
        if (job.status !== "pending") {
            console.log("Job already being processed or completed, skipping:", request_id, job.status);
            return NextResponse.json({ received: true, status: "already_processed" });
        }

        // ATOMIC LOCK: Try to claim the job by setting status to 'processing'
        // Only succeeds if status is still 'pending' (prevents race condition)
        const { data: claimedJob, error: claimError } = await supabase
            .from("generation_jobs")
            .update({ status: "processing" })
            .eq("id", job.id)
            .eq("status", "pending")  // Only update if still pending
            .select()
            .single();

        if (claimError || !claimedJob) {
            console.log("Failed to claim job (another process got it first):", request_id);
            return NextResponse.json({ received: true, status: "claimed_by_other" });
        }

        console.log("Webhook claimed job:", request_id);

        // Handle error status
        if (status === "ERROR") {
            await supabase
                .from("generation_jobs")
                .update({
                    status: "failed",
                    error_message: falError || payload?.detail?.[0]?.msg || "Generation failed",
                    completed_at: new Date().toISOString(),
                })
                .eq("id", job.id);

            // If this is a preview job, update the preview_images table
            if (job.is_preview) {
                await supabase
                    .from("preview_images")
                    .update({
                        status: "failed",
                        completed_at: new Date().toISOString(),
                    })
                    .eq("job_id", job.id);
            }

            // TODO: Consider refunding credits on failure
            console.error("Fal generation failed:", { request_id, error: falError, payload, isPreview: job.is_preview });
            return NextResponse.json({ received: true, status: "error_recorded" });
        }

        // Handle success
        if (status === "OK" && payload?.images?.[0]?.url) {
            const imageUrl = payload.images[0].url;

            try {
                // Download image from fal.ai
                const imageResponse = await fetch(imageUrl);
                if (!imageResponse.ok) throw new Error("Failed to fetch image from fal");

                let imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

                // If this is a preview job, apply watermark (burned into pixels)
                if (job.is_preview) {
                    const { applyWatermark } = await import("@/lib/watermark");
                    console.log(`Applying watermark to preview image for job ${job.id}...`);
                    const watermarked = await applyWatermark(imageBuffer, 'PREVIEW');
                    imageBuffer = Buffer.from(watermarked);
                }

                // Generate R2 key (different path for previews)
                const timestamp = Date.now();
                const randomId = crypto.randomUUID();
                const keyPrefix = job.is_preview ? 'previews' : 'generated';
                const key = `${keyPrefix}/${job.user_id}/${job.model_id}/${timestamp}-${randomId}.png`;

                // Upload to R2
                await putR2Object(key, imageBuffer, "image/png");

                // Construct public URL
                const r2BaseUrl = process.env.R2_PUBLIC_URL || "";
                const publicUri = `${r2BaseUrl}/${key}`;

                // For preview jobs, ONLY save to preview_images (not images table)
                // This prevents preview images from appearing in the gallery
                if (job.is_preview) {
                    await supabase
                        .from("preview_images")
                        .update({
                            image_url: publicUri,
                            status: "completed",
                            completed_at: new Date().toISOString(),
                        })
                        .eq("job_id", job.id);

                    // Update job as completed (no image_id for preview jobs)
                    await supabase
                        .from("generation_jobs")
                        .update({
                            status: "completed",
                            result_url: publicUri,
                            completed_at: new Date().toISOString(),
                        })
                        .eq("id", job.id);

                    console.log("Preview image completed:", { request_id, model_id: job.model_id });
                } else {
                    // Regular job - save to images table for gallery
                    const { data: image, error: imageError } = await supabase
                        .from("images")
                        .insert({
                            uri: publicUri,
                            modelId: job.model_id,
                        })
                        .select()
                        .single();

                    if (imageError) {
                        console.error("Failed to save image to DB:", imageError);
                    }

                    // Update job as completed
                    await supabase
                        .from("generation_jobs")
                        .update({
                            status: "completed",
                            result_url: publicUri,
                            image_id: image?.id,
                            completed_at: new Date().toISOString(),
                        })
                        .eq("id", job.id);
                }

                console.log("Fal generation completed:", { request_id, model_id: job.model_id, isPreview: job.is_preview });

            } catch (saveError) {
                console.error("Failed to save generated image:", saveError);

                // Mark as failed but save the fal URL
                await supabase
                    .from("generation_jobs")
                    .update({
                        status: "failed",
                        result_url: imageUrl, // Save original URL as fallback
                        error_message: "Failed to save image to storage",
                        completed_at: new Date().toISOString(),
                    })
                    .eq("id", job.id);
            }

            return NextResponse.json({ received: true, status: "completed" });
        }

        // Unknown status
        console.warn("Unknown webhook status:", { request_id, status, payload });
        return NextResponse.json({ received: true, status: "unknown" });

    } catch (error) {
        console.error("Webhook processing error:", error);
        return NextResponse.json({
            error: "Webhook processing failed",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
