import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// GET: Fetch all models for the authenticated user
export async function GET() {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: models, error } = await supabase
        .from('models')
        .select(`
      id,
      name,
      type,
      status,
      created_at,
      samples (
        id,
        uri
      )
    `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching models:', error);
        return NextResponse.json({ error: 'Failed to fetch models' }, { status: 500 });
    }

    return NextResponse.json({ models });
}

// POST: Create a new model
export async function POST(request: NextRequest) {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, type } = body;

        if (!name || !type) {
            return NextResponse.json({ error: 'Name and type are required' }, { status: 400 });
        }

        const { data: model, error } = await supabase
            .from('models')
            .insert({
                name,
                type,
                user_id: user.id,
                status: 'processing',
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating model:', error);
            return NextResponse.json({ error: 'Failed to create model' }, { status: 500 });
        }

        return NextResponse.json({ model }, { status: 201 });
    } catch (error) {
        console.error('Error parsing request:', error);
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}
