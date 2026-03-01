import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { CreateModelClient } from "./CreateModelClient";

export default async function CreateModelPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // User is allowed to create model
    return <CreateModelClient />;
}
