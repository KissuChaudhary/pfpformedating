"use server"

import { GoogleGenAI } from "@google/genai";
import { REFERENCE_PROMPTS } from "./prompts";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Step 1: Prompt Engineering
 * Uses gemini-2.5-flash to rewrite the user's raw input into a professional photographer's prompt.
 * It injects specific examples from the REFERENCE_PROMPTS based on the selected mode.
 */
export async function enhancePrompt(
    userPrompt: string,
    mode: string,
    gender: string,
    lighting: string = 'DAYLIGHT'
): Promise<string> {
    try {
        // Get relevant examples based on mode
        const modeKey = mode as keyof typeof REFERENCE_PROMPTS;
        const examples = REFERENCE_PROMPTS[modeKey]
            ? REFERENCE_PROMPTS[modeKey].slice(0, 3).join("\n- ")
            : REFERENCE_PROMPTS.FLASH.slice(0, 3).join("\n- "); // Default to Flash if not found

        // Define lighting guidelines based on user selection
        const lightingGuide = lighting === 'NIGHT'
            ? `LIGHTING TIME: Night/Indoor
- Use natural night lighting: flash, neon lights, street lamps, indoor lighting to capture the imperfact natural lightiung shot on mobiles
- Hard shadows from direct flash or dramatic artificial night light`
            : `LIGHTING TIME: Daylight/Outdoor
- Use natural sunlight: golden hour, overcast, direct sun, window light
- Outdoor settings: parks, streets, cafes, beaches, city streets, markets, malls, airports, train stations, bus stations, shopping centers
- Soft or harsh natural shadows depending on time of day`;

        const systemInstruction = `
      You are a specialized AI Photographer Assistant. Your goal is to write a prompt for an Image-to-Image generation model.
      
      THE AESTHETIC:
      - Raw, candid, disposable camera style.
      - Imperfect lighting (varying based on time of day).
      - Realistic skin texture (visible pores, natural skin, imperfections).
      - NO "AI perfection", NO smooth plastic skin.
      
      ${lightingGuide}
      
      REFERENCE EXAMPLES OF THE STYLE:
      - ${examples}
      
      INSTRUCTIONS:
      1. Analyze the user's idea: "${userPrompt}"
      2. Write a single, detailed image generation prompt.
      3. The subject is ${gender}.
      4. IMPORTANT: The lighting MUST match the ${lighting === 'NIGHT' ? 'NIGHT/ARTIFICIAL' : 'DAYLIGHT/NATURAL'} setting specified above.
      5. Incorporate the style of the REFERENCE EXAMPLES (camera angle, texture).
      6. Explicitly state: "Keep facial identity consistent with reference photos."
      7. Output ONLY the prompt string. No explanations.
    `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate the prompt for: ${userPrompt}`,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
            }
        });

        return response.text || `${userPrompt}, ${gender}, ${lighting === 'NIGHT' ? 'night, flash photography' : 'daylight, natural light'}, candid, raw`;
    } catch (error) {
        console.error("Prompt enhancement failed:", error);
        // Fallback if AI fails
        return `${userPrompt}, ${gender}, photorealistic, high detail, ${lighting === 'NIGHT' ? 'flash photography, night' : 'natural sunlight, daylight'}`;
    }
}

/**
 * Helper: Convert URL or base64 string to clean base64 data
 */
async function imageToBase64(imageInput: string): Promise<{ data: string; mimeType: string }> {
    // If it's already base64 data URL
    if (imageInput.startsWith('data:image/')) {
        const matches = imageInput.match(/^data:(image\/\w+);base64,(.*)$/);
        if (matches) {
            return { mimeType: matches[1], data: matches[2] };
        }
    }

    // If it's a URL (http/https or relative path that needs to be fetched)
    if (imageInput.startsWith('http://') || imageInput.startsWith('https://') || imageInput.startsWith('/')) {
        try {
            // For relative paths, we need to construct full URL or use R2 directly
            let fetchUrl = imageInput;
            if (imageInput.startsWith('/')) {
                // It's an R2 key path, construct the full URL
                const r2PublicUrl = process.env.R2_PUBLIC_URL || '';
                fetchUrl = `${r2PublicUrl}${imageInput}`;
            }

            const response = await fetch(fetchUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch image: ${response.status}`);
            }

            const arrayBuffer = await response.arrayBuffer();
            const base64 = Buffer.from(arrayBuffer).toString('base64');
            const contentType = response.headers.get('content-type') || 'image/jpeg';

            return { mimeType: contentType, data: base64 };
        } catch (error) {
            console.error('Failed to fetch image from URL:', imageInput, error);
            throw error;
        }
    }

    // Assume it's raw base64 without prefix
    return { mimeType: 'image/jpeg', data: imageInput };
}

/**
 * Step 2: Image Generation
 * Uses gemini-2.5-flash-image to generate the photo.
 * Accepts reference images (URLs or base64) to guide the generation (Identity/Context).
 */
export async function generateCandidPhoto(
    enhancedPrompt: string,
    referenceImages: string[],
    aspectRatio: string = "1:1"
): Promise<string | null> {
    try {
        const parts: any[] = [];

        // Add reference images as context (Multimodal Input)
        for (const imageInput of referenceImages) {
            const { data, mimeType } = await imageToBase64(imageInput);
            parts.push({
                inlineData: {
                    mimeType,
                    data
                }
            });
        }

        // Add the text prompt
        parts.push({ text: enhancedPrompt });

        // Handle Aspect Ratio Mapping
        // API supports: "1:1", "3:4", "4:3", "9:16", "16:9"
        // We map user requests like 4:5 to the closest native support (3:4)
        let finalRatio = aspectRatio;
        if (aspectRatio === '4:5') finalRatio = '3:4';
        if (aspectRatio === '5:4') finalRatio = '4:3';

        // Using gemini-2.5-flash-image
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: parts
            },
            config: {
                imageConfig: {
                    aspectRatio: finalRatio
                }
            }
        });

        // Extract image from response
        for (const candidate of response.candidates || []) {
            if (!candidate.content?.parts) continue;
            for (const part of candidate.content.parts) {
                if (part.inlineData) {
                    return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                }
            }
        }

        console.warn("No image data found in response");
        return null;

    } catch (error) {
        console.error("Image generation failed:", error);
        throw error;
    }
}

/**
 * Step 3: Unified Generate + Save (OPTIMIZED)
 * Generates the image and saves it directly to R2/database on server.
 * This avoids sending the large base64 to the client, preventing browser freezes.
 */
import { putR2Object } from './r2';
import { createClient } from '@/utils/supabase/server';
import { hasCredits, deductCredits } from '@/lib/credits';

export async function generateAndSaveImage(
    userPrompt: string,
    mode: string,
    gender: string,
    lighting: string,
    referenceImages: string[],
    aspectRatio: string,
    modelId: number
): Promise<{ success: boolean; image?: { id: number; uri: string; created_at: string }; newBalance?: number; error?: string }> {
    try {
        const supabase = await createClient();

        // Auth check
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return { success: false, error: 'Unauthorized' };
        }

        // Credit check
        const { hasCredits: hasSufficientCredits, currentBalance } = await hasCredits(user.id, 1);
        if (!hasSufficientCredits) {
            return { success: false, error: 'Insufficient credits' };
        }

        // Verify model ownership
        const { data: model, error: modelError } = await supabase
            .from('models')
            .select('id, user_id')
            .eq('id', modelId)
            .single();

        if (modelError || !model || model.user_id !== user.id) {
            return { success: false, error: 'Model not found or forbidden' };
        }

        // Step 1: Enhance prompt
        const enhancedPrompt = await enhancePrompt(userPrompt, mode, gender, lighting);
        console.log("Enhanced Prompt:", enhancedPrompt);

        // Step 2: Generate image (stays on server)
        const imageBase64 = await generateCandidPhoto(enhancedPrompt, referenceImages, aspectRatio);

        if (!imageBase64) {
            return { success: false, error: 'Image generation failed' };
        }

        // Step 3: Save to R2 (all on server, no client transfer)
        const matches = imageBase64.match(/^data:(image\/\w+);base64,(.*)$/);
        if (!matches) {
            return { success: false, error: 'Invalid image format' };
        }

        const mimeType = matches[1];
        const base64Data = matches[2];
        const extension = mimeType.split('/')[1] || 'png';

        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(7);
        const key = `models/${user.id}/${modelId}/generated/${timestamp}-${randomId}.${extension}`;

        const buffer = Buffer.from(base64Data, 'base64');
        await putR2Object(key, buffer, mimeType, 'public, max-age=31536000');

        const r2PublicUrl = process.env.R2_PUBLIC_URL || '';
        const uri = `${r2PublicUrl}/${key}`;

        // Step 4: Save to database
        const { data: image, error: imageError } = await supabase
            .from('images')
            .insert({
                uri,
                modelId: modelId,
            })
            .select()
            .single();

        if (imageError) {
            console.error('Error saving image:', imageError);
            return { success: false, error: 'Failed to save image' };
        }

        // Step 5: Deduct credits
        const { newBalance } = await deductCredits(user.id, 1, 'Image generation');

        return {
            success: true,
            image: {
                id: image.id,
                uri: image.uri,
                created_at: image.created_at
            },
            newBalance: newBalance ?? currentBalance - 1
        };

    } catch (error) {
        console.error("generateAndSaveImage failed:", error);
        return { success: false, error: 'Generation failed' };
    }
}