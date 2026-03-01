import { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation"
import { commonPageMetadata } from '@/lib/seo'
import FeedbackForm from "@/components/FeedbackForm"
import { DashboardContent } from '@/components/dashboard/DashboardContent'
// import { creditService } from '@/lib/credits'

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

  // Dashboard is accessible to any authenticated user with at least one model

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
