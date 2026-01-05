import type { Metadata } from "next"
import ImageGallery from "@/components/ImageGallery"
import { createClient } from '@/utils/supabase/server'; // Updated import from utility
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Image Gallery | AI Headshot Generator",
  description: "View your generated AI headshots",
}

export default async function GalleryPage() {
  const supabase = await createClient(); // Use the new utility function with await
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // === STRICT ONBOARDING CONTROL ===

  // 1. Get user profile
  let { data: profile } = await supabase
    .from('profiles')
    .select('trial_preview_used, credits')
    .eq('user_id', user.id)
    .single()

  // FALLBACK: If profile is missing or flag is false, double check real usage
  let realTrialUsed = profile?.trial_preview_used === true;

  if (!realTrialUsed) {
    const { count } = await supabase
      .from('preview_images')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('status', 'completed');

    if (count && count > 0) {
      realTrialUsed = true;
    }
  }

  const { data: payments } = await supabase
    .from('dodo_payments')
    .select('id')
    .eq('user_id', user.id)
    .in('status', ['succeeded', 'completed'])
    .limit(1)

  // 2. Determine user status
  const hasCredits = (profile?.credits || 0) > 0
  const hasPaid = payments && payments.length > 0
  const isUnlockedUser = hasPaid || hasCredits

  // 3. Enforce Strict Rules
  if (!isUnlockedUser) {
    if (realTrialUsed) {
      redirect('/buy-credits')
    } else {
      redirect('/models/create')
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <ImageGallery />
    </div>
  )
}

