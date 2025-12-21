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
    gender: string
): Promise<string> {
    try {
        // Get relevant examples based on mode
        const modeKey = mode as keyof typeof REFERENCE_PROMPTS;
        const examples = REFERENCE_PROMPTS[modeKey]
            ? REFERENCE_PROMPTS[modeKey].slice(0, 3).join("\n- ")
            : REFERENCE_PROMPTS.FLASH.slice(0, 3).join("\n- "); // Default to Flash if not found

        const systemInstruction = `
      You are a specialized AI Photographer Assistant. Your goal is to write a prompt for an Image-to-Image generation model.
      
      THE AESTHETIC:
      - Raw, candid, disposable camera style.
      - Imperfect lighting (direct flash, harsh shadows, mixed lighting).
      - Realistic skin texture (visible pores, oil, sweat, flush, imperfections).
      - NO "AI perfection", NO smooth plastic skin.
      
      REFERENCE EXAMPLES OF THE STYLE:
      - ${examples}
      
      INSTRUCTIONS:
      1. Analyze the user's idea: "${userPrompt}"
      2. Write a single, detailed image generation prompt.
      3. The subject is ${gender}.
      4. Incorporate the style of the REFERENCE EXAMPLES (lighting, camera angle, texture).
      5. Explicitly state: "Keep facial identity consistent with reference photos."
      6. Output ONLY the prompt string. No explanations.
    `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate the prompt for: ${userPrompt}`,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
            }
        });

        return response.text || `${userPrompt}, ${gender}, flash photography, candid, raw`;
    } catch (error) {
        console.error("Prompt enhancement failed:", error);
        // Fallback if AI fails
        return `${userPrompt}, ${gender}, photorealistic, high detail, flash photography`;
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
            model: 'gemini-3-pro-image-preview',
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