import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

/**
 * Mark that the user has viewed their free preview image.
 * This is used to determine if they should be redirected from dashboard to buy-credits.
 */
export async function POST() {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Update the profile to mark trial as used
    const { error: updateError } = await supabase
        .from('profiles')
        .update({ trial_preview_used: true })
        .eq('user_id', user.id);

    if (updateError) {
        console.error("Failed to mark preview as viewed:", updateError);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
