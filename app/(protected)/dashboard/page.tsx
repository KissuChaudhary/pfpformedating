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

  // Rule A: If user is NOT unlocked (no pay, no credits)
  if (!isUnlockedUser) {
    if (trialUsed) {
      // User used trial but hasn't paid -> ALWAYS send to buy credits
      redirect('/buy-credits')
    } else {
      // User is NEW (training wheels on) -> ALWAYS send to create model
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
