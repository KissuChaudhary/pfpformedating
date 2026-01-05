import { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation"
import { commonPageMetadata } from '@/lib/seo'
import FeedbackForm from "@/components/FeedbackForm"
import { DashboardContent } from '@/components/dashboard/DashboardContent'
import { creditService } from '@/lib/credits'

export const metadata: Metadata = commonPageMetadata.dashboard()

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Check if user has any trained models
  const { data: models } = await supabase
    .from('models')
    .select('id')
    .eq('user_id', user.id)
    .limit(1)

  // If no models, redirect to model creation
  if (!models || models.length === 0) {
    redirect("/models/create")
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
    // Check if they actually have a completed preview job
    const { count } = await supabase
      .from('preview_images')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('status', 'completed');

    if (count && count > 0) {
      realTrialUsed = true;
    }
  }

  // Check payments (accept both 'succeeded' and 'completed' just in case)
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

  // Debug log
  console.log('🔴 DASHBOARD CHECK (ROBUST):', {
    userId: user.id,
    profileFound: !!profile,
    flagInProfile: profile?.trial_preview_used,
    realTrialUsed,
    hasPaid,
  })

  // 3. Enforce Strict Rules
  if (!isUnlockedUser) {
    if (realTrialUsed) {
      // User used trial (flag or actual image found) -> Buy credits
      redirect('/buy-credits')
    } else {
      // New user -> Create model
      redirect('/models/create')
    }
  }

  // Rule B: Unlocked users have full access
  // (dashboard renders below)

  // Otherwise, allow dashboard access:
  // - New users who haven't finished preview → Will be on preview page anyway
  // - Old users with 0 credits but payment history → Dashboard works, generate disabled
  // - Users with credits → Full dashboard access

  return (
    <div className="space-y-8">
      <DashboardContent />
      <FeedbackForm userId={user.id} />
    </div>
  )
}
