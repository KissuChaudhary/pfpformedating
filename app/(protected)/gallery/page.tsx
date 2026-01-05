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

  // 1. Get user profile and payment status
  const { data: profile } = await supabase
    .from('profiles')
    .select('trial_preview_used, credits')
    .eq('id', user.id)
    .single()

  const { data: payments } = await supabase
    .from('dodo_payments')
    .select('id')
    .eq('user_id', user.id)
    .eq('status', 'succeeded')
    .limit(1)

  // 2. Determine user status
  const trialUsed = profile?.trial_preview_used === true
  const hasCredits = (profile?.credits || 0) > 0
  const hasPaid = payments && payments.length > 0
  const isUnlockedUser = hasPaid || hasCredits

  // 3. Enforce Strict Rules
  if (!isUnlockedUser) {
    if (trialUsed) {
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

