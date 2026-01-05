import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { CreateModelClient } from "./CreateModelClient";

export default async function CreateModelPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Check if user has already used their trial preview
    const { data: profile } = await supabase
        .from("profiles")
        .select("trial_preview_used, credits")
        .eq("id", user.id)
        .single();

    // Check if user has any successful payments
    const { data: payments } = await supabase
        .from("dodo_payments")
        .select("id")
        .eq("user_id", user.id)
        .eq("status", "succeeded")
        .limit(1);

    const hasUsedTrial = profile?.trial_preview_used === true;
    const hasCredits = (profile?.credits || 0) > 0;
    const hasPaid = payments && payments.length > 0;

    // If user used their trial but hasn't paid AND has no credits → redirect to buy credits
    if (hasUsedTrial && !hasPaid && !hasCredits) {
        // Find their existing preview to redirect them there
        const { data: existingPreview } = await supabase
            .from("preview_images")
            .select("model_id")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();

        if (existingPreview?.model_id) {
            // Redirect to their preview page where they can pay
            redirect(`/preview/${existingPreview.model_id}`);
        } else {
            // No preview found, redirect to buy credits
            redirect("/buy-credits");
        }
    }

    // User is allowed to create model
    return <CreateModelClient />;
}
