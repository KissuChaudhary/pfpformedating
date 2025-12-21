import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { putR2Object } from '@/lib/r2';

// POST: Upload sample images for a model
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
        const formData = await request.formData();
        const files = formData.getAll('images') as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ error: 'No images provided' }, { status: 400 });
        }

        if (files.length > 4) {
            return NextResponse.json({ error: 'Maximum 4 images allowed' }, { status: 400 });
        }

        const uploadedSamples = [];
        const r2BaseUrl = process.env.R2_PUBLIC_URL || '';

        for (const file of files) {
            // Generate unique key for R2
            const timestamp = Date.now();
            const randomId = Math.random().toString(36).substring(7);
            const extension = file.name.split('.').pop() || 'jpg';
            const key = `models/${user.id}/${modelId}/samples/${timestamp}-${randomId}.${extension}`;

            // Read file as buffer
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // Upload to R2
            await putR2Object(key, buffer, file.type);

            // Construct the public URL
            const uri = `${r2BaseUrl}/${key}`;

            // Save to samples table
            const { data: sample, error: sampleError } = await supabase
                .from('samples')
                .insert({
                    uri,
                    modelId: parseInt(modelId),
                })
                .select()
                .single();

            if (sampleError) {
                console.error('Error saving sample:', sampleError);
                continue;
            }

            uploadedSamples.push(sample);
        }

        // Update model status to 'ready' if we have samples
        if (uploadedSamples.length > 0) {
            await supabase
                .from('models')
                .update({ status: 'ready' })
                .eq('id', modelId);
        }

        return NextResponse.json({
            samples: uploadedSamples,
            uploadedCount: uploadedSamples.length
        }, { status: 201 });
    } catch (error) {
        console.error('Error uploading samples:', error);
        return NextResponse.json({ error: 'Failed to upload samples' }, { status: 500 });
    }
}
