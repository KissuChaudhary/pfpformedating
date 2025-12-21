import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { putR2Object } from '@/lib/r2';
import { hasCredits, deductCredits } from '@/lib/credits';

const CREDIT_COST_PER_IMAGE = 1;

// POST: Save a generated image to R2 and database
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient();
    const { id: modelId } = await params;

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has sufficient credits
    const { hasCredits: hasSufficientCredits, currentBalance } = await hasCredits(user.id, CREDIT_COST_PER_IMAGE);
    if (!hasSufficientCredits) {
        return NextResponse.json({
            error: 'Insufficient credits',
            currentBalance,
            requiredCredits: CREDIT_COST_PER_IMAGE
        }, { status: 402 });
    }

    // Verify the model belongs to the user
    const { data: model, error: modelError } = await supabase
        .from('models')
        .select('id, user_id')
        .eq('id', modelId)
        .single();

    if (modelError || !model) {
        return NextResponse.json({ error: 'Model not found' }, { status: 404 });
    }

    if (model.user_id !== user.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const body = await request.json();
        const { imageBase64 } = body;

        if (!imageBase64) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        // Extract base64 data and mime type
        const matches = imageBase64.match(/^data:(image\/\w+);base64,(.*)$/);
        if (!matches) {
            return NextResponse.json({ error: 'Invalid image format' }, { status: 400 });
        }

        const mimeType = matches[1];
        const base64Data = matches[2];
        const extension = mimeType.split('/')[1] || 'png';

        // Generate unique key for R2
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(7);
        const key = `models/${user.id}/${modelId}/generated/${timestamp}-${randomId}.${extension}`;

        // Convert base64 to buffer and upload to R2
        const buffer = Buffer.from(base64Data, 'base64');
        await putR2Object(key, buffer, mimeType, 'public, max-age=31536000');

        // Construct the public URL
        const r2PublicUrl = process.env.R2_PUBLIC_URL || '';
        const uri = `${r2PublicUrl}/${key}`;

        // Save to images table
        const { data: image, error: imageError } = await supabase
            .from('images')
            .insert({
                uri,
                modelId: parseInt(modelId),
            })
            .select()
            .single();

        if (imageError) {
            console.error('Error saving image:', imageError);
            return NextResponse.json({ error: 'Failed to save image' }, { status: 500 });
        }

        // Deduct credits after successful save
        const { success: deductSuccess, newBalance, error: deductError } = await deductCredits(
            user.id,
            CREDIT_COST_PER_IMAGE,
            'Image generation'
        );

        if (!deductSuccess) {
            console.error('Failed to deduct credits:', deductError);
            // Image was saved but credits weren't deducted - log but don't fail
        }

        return NextResponse.json({
            image,
            creditsDeducted: CREDIT_COST_PER_IMAGE,
            newBalance: newBalance ?? currentBalance - CREDIT_COST_PER_IMAGE
        }, { status: 201 });
    } catch (error) {
        console.error('Error saving generated image:', error);
        return NextResponse.json({ error: 'Failed to save image' }, { status: 500 });
    }
}

// GET: Fetch all generated images for a model
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient();
    const { id: modelId } = await params;

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the model belongs to the user
    const { data: model, error: modelError } = await supabase
        .from('models')
        .select('id, user_id')
        .eq('id', modelId)
        .single();

    if (modelError || !model) {
        return NextResponse.json({ error: 'Model not found' }, { status: 404 });
    }

    if (model.user_id !== user.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { data: images, error } = await supabase
        .from('images')
        .select('id, uri, created_at')
        .eq('modelId', parseInt(modelId))
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching images:', error);
        return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
    }

    return NextResponse.json({ images });
}
