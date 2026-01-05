import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ModelsClientPage } from './ModelsClientPage'

export default async function ModelsPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
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
            // User used trial but hasn't paid -> ALWAYS send to buy credits
            redirect('/buy-credits')
        } else {
            // User is NEW -> ALWAYS send to create model
            redirect('/models/create')
        }
    }

    return <ModelsClientPage />
}
