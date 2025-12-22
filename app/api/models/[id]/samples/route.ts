import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { putR2Object } from '@/lib/r2';

// Vercel config for file uploads
export const runtime = 'nodejs';
export const maxDuration = 60; // 60 seconds timeout

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
        const errors: string[] = [];

        for (const file of files) {
            try {
                // Generate unique key for R2
                const timestamp = Date.now();
                const randomId = Math.random().toString(36).substring(7);
                const extension = file.name.split('.').pop() || 'jpg';
                const key = `models/${user.id}/${modelId}/samples/${timestamp}-${randomId}.${extension}`;

                // Read file as buffer
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                // Upload to R2
                console.log(`Uploading to R2: ${key}`);
                await putR2Object(key, buffer, file.type);
                console.log(`R2 upload successful: ${key}`);

                // Construct the public URL
                const uri = `${r2BaseUrl}/${key}`;

                // Save to samples table
                console.log(`Saving to DB: modelId=${modelId}, uri=${uri}`);
                const { data: sample, error: sampleError } = await supabase
                    .from('samples')
                    .insert({
                        uri,
                        modelId: parseInt(modelId),
                    })
                    .select()
                    .single();

                if (sampleError) {
                    console.error('Error saving sample to DB:', sampleError);
                    errors.push(`DB error: ${sampleError.message}`);
                    continue;
                }

                console.log(`Sample saved successfully: ${sample.id}`);
                uploadedSamples.push(sample);
            } catch (fileError) {
                console.error(`Error processing file ${file.name}:`, fileError);
                errors.push(`File ${file.name}: ${fileError instanceof Error ? fileError.message : 'Unknown error'}`);
            }
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
            uploadedCount: uploadedSamples.length,
            errors: errors.length > 0 ? errors : undefined
        }, { status: uploadedSamples.length > 0 ? 201 : 500 });
    } catch (error) {
        console.error('Error uploading samples:', error);
        return NextResponse.json({
            error: 'Failed to upload samples',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
