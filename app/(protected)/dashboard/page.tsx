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

  // === NEW: Dashboard access control for Preview Tunnel ===

  // Check if user has used their free preview
  const { data: profile } = await supabase
    .from('profiles')
    .select('trial_preview_used')
    .eq('user_id', user.id)
    .single()

  // Check if user has ever paid (completed payment)
  const { data: payments } = await supabase
    .from('dodo_payments')
    .select('id')
    .eq('user_id', user.id)
    .eq('status', 'completed')
    .limit(1)

  const { balance } = await creditService.getUserCredits(user.id)

  const hasUsedFreePreview = profile?.trial_preview_used === true
  const hasPaymentHistory = payments && payments.length > 0
  const hasCredits = balance > 0

  // Only redirect if:
  // 1. They've used their free preview (saw their image)
  // 2. AND they've never paid
  // 3. AND they have 0 credits
  if (hasUsedFreePreview && !hasPaymentHistory && !hasCredits) {
    redirect('/buy-credits')
  }

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
