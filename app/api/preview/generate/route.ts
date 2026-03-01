import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { fal } from "@fal-ai/client";

const FAL_KEY = process.env.FAL_KEY;
const WEBHOOK_URL = process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/api/fal/webhook`
    : null;

if (!FAL_KEY) {
    console.warn("MISSING FAL_KEY env variable");
}

fal.config({ credentials: FAL_KEY || "" });

// Hardcoded "golden prompts" for the free preview - male-only
const GOLDEN_PROMPTS = {
    MALE: "raw, documentary-style street photograph of a man walking quickly across a busy city street at midday. He (keep his facial identity exactly consistent from reference photos provided) is holding a takeaway coffee cup and direct sunlight hitting his face. He is looking off-camera with a slight smile. The hard sunlight casts sharp, defined shadows and highlights the natural texture of his skin, stubble, and the denim of his jacket. The background is a bustle of pedestrians and yellow taxi cabs. Film grain is present. Shot on 35mm film stock Kodak Portra 400.",
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Generate a "golden prompt" preview image for a newly created model.
 * This is the free preview that hooks users before they pay.
 */
export async function POST(request: NextRequest) {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { modelId } = body;

        if (!modelId) {
            return NextResponse.json({ error: "modelId is required" }, { status: 400 });
        }

        // CRITICAL: Check if user has already used their ONE free trial preview
        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("trial_preview_used")
            .eq("user_id", user.id)
            .single();

        // Log for debugging
        console.log("Preview generate check:", {
            userId: user.id,
            modelId,
            profile,
            profileError: profileError?.message,
            trial_preview_used: profile?.trial_preview_used
        });

        // Only block if EXPLICITLY true - allow for new users (null/undefined/missing)
        const hasUsedTrial = profile?.trial_preview_used === true;

        if (hasUsedTrial) {
            // User already used their free preview - check if they have existing preview for this model
            const { data: existingPreview } = await supabase
                .from("preview_images")
                .select("id, status, image_url")
                .eq("model_id", modelId)
                .eq("user_id", user.id)
                .single();

            if (existingPreview) {
                // Return existing preview for this model
                return NextResponse.json({
                    success: true,
                    exists: true,
                    status: existingPreview.status,
                    imageUrl: existingPreview.image_url,
                });
            }

            // No preview for this model and user already used trial - deny
            return NextResponse.json({
                error: "Free preview already used. Please purchase credits to generate more images.",
                code: "TRIAL_USED"
            }, { status: 403 });
        }

        // Verify model belongs to user and get model info
        const { data: model, error: modelError } = await supabase
            .from("models")
            .select("id, user_id, type, mode, samples(uri)")
            .eq("id", modelId)
            .single();

        if (modelError || !model || model.user_id !== user.id) {
            return NextResponse.json({ error: "Model not found or forbidden" }, { status: 404 });
        }

        // Check if preview already exists for THIS model (idempotent for same model)
        const { data: existingPreview } = await supabase
            .from("preview_images")
            .select("id, status, image_url")
            .eq("model_id", modelId)
            .eq("user_id", user.id)
            .single();

        if (existingPreview) {
            return NextResponse.json({
                success: true,
                exists: true,
                status: existingPreview.status,
                imageUrl: existingPreview.image_url,
            });
        }

        // Get sample image URLs for reference
        const referenceImageUrls = (model.samples || []).map((s: any) => s.uri);
        if (referenceImageUrls.length === 0) {
            return NextResponse.json({ error: "Model has no sample images" }, { status: 400 });
        }

        // Use male-only golden prompt
        const goldenPrompt = GOLDEN_PROMPTS.MALE;

        // Submit to fal.ai queue with webhook
        const { request_id } = await fal.queue.submit("fal-ai/bytedance/seedream/v4.5/edit", {
            input: {
                prompt: goldenPrompt,
                image_urls: referenceImageUrls,
                image_size: "portrait_4_3",
                num_images: 1,
                enable_safety_checker: true,
            },
            webhookUrl: WEBHOOK_URL || undefined,
        });

        // Save job to generation_jobs with is_preview flag
        const { data: job, error: jobError } = await supabase
            .from("generation_jobs")
            .insert({
                user_id: user.id,
                model_id: parseInt(modelId),
                fal_request_id: request_id,
                prompt: "Professional Preview",
                enhanced_prompt: goldenPrompt,
                status: "pending",
                credits_deducted: 0, // Free preview - no credits charged
                is_preview: true,
            })
            .select()
            .single();

        if (jobError) {
            console.error("Failed to save preview job:", jobError);
            return NextResponse.json({ error: "Failed to create preview job" }, { status: 500 });
        }

        // Create entry in preview_images table
        const { error: previewError } = await supabase
            .from("preview_images")
            .insert({
                user_id: user.id,
                model_id: parseInt(modelId),
                job_id: job.id,
                status: "pending",
            });

        if (previewError) {
            console.error("Failed to create preview record:", previewError);
            // Continue anyway - the job is submitted
        }

        // CRITICAL: Mark trial preview as used IMMEDIATELY when job is submitted
        // This prevents creating multiple models to get multiple free previews
        await supabase
            .from("profiles")
            .update({ trial_preview_used: true })
            .eq("user_id", user.id);

        return NextResponse.json({
            success: true,
            jobId: job.id,
            requestId: request_id,
            status: "pending",
        });

    } catch (error) {
        console.error("Error generating preview:", error);
        return NextResponse.json({
            error: "Failed to generate preview",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
