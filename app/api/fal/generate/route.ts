import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { fal } from "@fal-ai/client";
import { enhancePrompt } from "@/lib/genai";
import { hasCredits, deductCredits } from "@/lib/credits";
import { apiRateLimit, checkRateLimit } from "@/utils/rate-limit";

const FAL_KEY = process.env.FAL_KEY;
const WEBHOOK_URL = process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/api/fal/webhook`
    : null;

if (!FAL_KEY) {
    console.warn("MISSING FAL_KEY env variable");
}

fal.config({ credentials: FAL_KEY || "" });

const CREDIT_COST = 1;

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// POST: Submit image generation job to fal.ai queue
export async function POST(request: NextRequest) {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limit check
    const rl = await checkRateLimit(`fal-generate:${user.id}`, apiRateLimit);
    if (!rl.success) {
        console.warn("Rate limit exceeded on fal-generate", { userId: user.id });
    }

    try {
        const body = await request.json();
        const { modelId, prompt, mode, lighting, aspectRatio, numImages } = body;

        if (!modelId || !prompt) {
            return NextResponse.json({ error: "modelId and prompt are required" }, { status: 400 });
        }

        // Check credits
        const { hasCredits: hasSufficientCredits, currentBalance } = await hasCredits(user.id, CREDIT_COST);
        if (!hasSufficientCredits) {
            return NextResponse.json({
                error: "Insufficient credits",
                currentBalance
            }, { status: 402 });
        }

        // Verify model belongs to user
        const { data: model, error: modelError } = await supabase
            .from("models")
            .select("id, user_id, type, mode, samples(uri)")
            .eq("id", modelId)
            .single();

        if (modelError || !model || model.user_id !== user.id) {
            return NextResponse.json({ error: "Model not found or forbidden" }, { status: 404 });
        }

        // Get sample image URLs for reference
        const referenceImageUrls = (model.samples || []).map((s: any) => s.uri);
        if (referenceImageUrls.length === 0) {
            return NextResponse.json({ error: "Model has no sample images" }, { status: 400 });
        }

        const enhancedPrompt = await enhancePrompt(
            prompt,
            mode || "FLASH",
            lighting || "DAYLIGHT"
        );

        // Deduct credits upfront (optimistic)
        const { success: deducted } = await deductCredits(user.id, CREDIT_COST);
        if (!deducted) {
            return NextResponse.json({ error: "Failed to deduct credits" }, { status: 500 });
        }

        let imageSize: string;
        const allowedAspectRatios = new Set([
            "auto",
            "1:1",
            "16:9",
            "4:3",
            "3:4",
            "9:16",
        ]);
        imageSize = allowedAspectRatios.has(aspectRatio) ? aspectRatio : "auto";
        const safeNumImages = Math.min(Math.max(parseInt(numImages ?? "1"), 1), 4);

        // Submit to fal.ai queue with webhook
        const { request_id } = await fal.queue.submit("fal-ai/nano-banana-2/edit", {
            input: {
                prompt: enhancedPrompt,
                image_urls: referenceImageUrls,
                aspect_ratio: imageSize,
                num_images: safeNumImages,
                output_format: "png",
                safety_tolerance: "4",
                resolution: "1K"
            },
            webhookUrl: WEBHOOK_URL || undefined,
        });

        // Save job to database
        const { data: job, error: jobError } = await supabase
            .from("generation_jobs")
            .insert({
                user_id: user.id,
                model_id: parseInt(modelId),
                fal_request_id: request_id,
                prompt,
                enhanced_prompt: enhancedPrompt,
                status: "pending",
                credits_deducted: CREDIT_COST,
            })
            .select()
            .single();

        if (jobError) {
            console.error("Failed to save job:", jobError);
            // Still return success since fal job was submitted
        }

        return NextResponse.json({
            success: true,
            jobId: job?.id,
            requestId: request_id,
            status: "pending",
        });

    } catch (error) {
        console.error("Error submitting fal job:", error);
        return NextResponse.json({
            error: "Failed to submit generation job",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
