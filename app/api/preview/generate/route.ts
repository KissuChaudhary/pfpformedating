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

// Hardcoded "golden prompts" for the free preview - professional headshots that wow users
const GOLDEN_PROMPTS = {
    MALE: "A hyper-realistic, waist-up professional headshot of a man standing outdoors in a modern tech campus with glass architecture. The lighting is 'Open Shade'—soft, diffuse natural light that eliminates harsh shadows under the eyes. He is wearing a structured charcoal blazer over a crisp white oxford shirt and dark navy chinos. His expression is confident and approachable, shoulders angled slightly. Shot on Canon R5 with the RF 85mm f/1.2 L USM lens at f/1.2. The shallow depth of field keeps his eyes aggressively sharp while rendering the glass building behind into creamy bokeh. Skin texture is high-fidelity, showing pores and stubble.",
    FEMALE: "A hyper-realistic portrait of a woman looking back over her shoulder directly at the camera. She has a messy, curly high bun with loose tendrils framing her face. She is wearing a fitted, white ribbed turtleneck sweater. The lighting is high-contrast hard flash photography, creating a sharp, dramatic shadow against a solid deep pink wall background. Her skin is dewy and glossy, with hyper-detailed, natural texture—visible, natural skin creases, absolutely no plastic smoothing. The mood is bold and cinematic. Shot on a Fujifilm GFX 100S Medium Format, GF 80mm f/1.7 lens, aperture f/2.0. The image is incredibly sharp, capturing the weave of the ribbed sweater and individual strands of messy hair. Keep facial identity consistent with reference photos.",
    COUPLE: "A hyper-realistic, waist-up professional portrait of a couple standing together outdoors in a modern tech campus with glass architecture. The lighting is 'Open Shade'—soft, diffuse natural light that eliminates harsh shadows. They are dressed in coordinated smart casual attire—he in a structured charcoal blazer over a crisp white oxford shirt, she in a structured navy blue blazer over a crisp white silk blouse. They stand close together with natural, affectionate body language, both with confident and warm expressions. Shot on Canon R5 with the RF 85mm f/1.2 L USM lens at f/1.2. The shallow depth of field keeps their eyes aggressively sharp while rendering the glass building behind into creamy bokeh. Skin texture is high-fidelity and realistic.",
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
            .eq("id", user.id)
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

        // Select golden prompt based on mode (couple) or gender (solo)
        let goldenPrompt: string;
        const mode = (model.mode || "").toLowerCase();

        if (mode === "couple") {
            goldenPrompt = GOLDEN_PROMPTS.COUPLE;
        } else {
            // Solo mode - select based on gender
            const gender = (model.type || "Female").toUpperCase();
            goldenPrompt = gender === "MALE" ? GOLDEN_PROMPTS.MALE : GOLDEN_PROMPTS.FEMALE;
        }

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
            .eq("id", user.id);

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
