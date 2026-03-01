import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import { cookies } from 'next/headers'
import SubscribeButton from '@/components/subscribe/SubscribeButton'
import ManageSubscription from '@/components/subscribe/ManageSubscription'
import RealtimeSubscriptionSync from '@/components/subscribe/RealtimeSubscriptionSync'
import { Check, Loader2, Sparkles, Zap } from 'lucide-react'
import { CustomSpinner } from "@/components/CustomSpinner"

function formatPrice(value: number | string, currency: string) {
    const n = typeof value === 'number' ? value : Number(value || 0)
    try {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(n)
    } catch {
        return `$${n.toFixed(2)}`
    }
}

type PlanRow = {
    id: string
    name: string
    description: string | null
    price: number
    credits: number | null
    currency: string | null
    dodo_product_id: string
}

async function getPlans(): Promise<PlanRow[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('dodo_pricing_plans')
        .select('id, name, description, price, credits, currency, dodo_product_id')
        .eq('is_active', true)
        .order('price', { ascending: true })
    if (error) return []
    return (data || []) as PlanRow[]
}

async function getUser() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    return user
}

async function getLatestSubscription(userId: string) {
    const supabase = await createClient()

    // Priority 1: Look for an active subscription first
    const { data: activeSub, error: activeError } = await supabase
        .from('dodo_subscriptions')
        .select('dodo_subscription_id, status, pricing_plan_id, next_billing_date, cancel_at_period_end, current_period_end, canceled_at, price_snapshot, currency_snapshot')
        .eq('user_id', userId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

    if (activeError) return null
    if (activeSub) return activeSub

    // Priority 2: Look for a pending subscription (checkout in progress)
    const { data: pendingSub, error: pendingError } = await supabase
        .from('dodo_subscriptions')
        .select('dodo_subscription_id, status, pricing_plan_id, next_billing_date, cancel_at_period_end, current_period_end, canceled_at, price_snapshot, currency_snapshot')
        .eq('user_id', userId)
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

    if (pendingError) return null
    if (pendingSub) return pendingSub

    // Priority 3: Fall back to most recent subscription (for cancelled/expired states)
    const { data, error } = await supabase
        .from('dodo_subscriptions')
        .select('dodo_subscription_id, status, pricing_plan_id, next_billing_date, cancel_at_period_end, current_period_end, canceled_at, price_snapshot, currency_snapshot')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

    if (error) return null
    return data
}

export default async function SubscribePage() {
    // Touch cookies to enable RSC auth context
    await cookies()
    const [plans, user] = await Promise.all([getPlans(), getUser()])

    // If user is available, try pulling their latest subscription
    let subscriptionSummary: {
        subscription_id: string
        status: 'pending' | 'active' | 'cancelled' | 'expired'
        plan_name?: string
        next_billing_date?: string
        cancel_at_period_end?: boolean
        current_period_end?: string
        canceled_at?: string
        price_snapshot?: number | null
        currency_snapshot?: string | null
    } | null = null

    if (user) {
        const row = await getLatestSubscription(user.id)
        if (row?.dodo_subscription_id) {
            const planName = plans.find(p => p.id === (row as any).pricing_plan_id)?.name
            // Normalize status
            const rawStatus = String(row.status || '').toLowerCase()
            const status = (rawStatus === 'active'
                ? 'active'
                : rawStatus === 'pending'
                    ? 'pending'
                    : rawStatus === 'cancelled' || rawStatus === 'canceled'
                        ? 'cancelled'
                        : 'expired') as 'pending' | 'active' | 'cancelled' | 'expired'

            subscriptionSummary = {
                subscription_id: row.dodo_subscription_id,
                status,
                plan_name: planName || undefined,
                next_billing_date: row.next_billing_date || undefined,
                cancel_at_period_end: !!row.cancel_at_period_end,
                current_period_end: row.current_period_end || undefined,
                canceled_at: row.canceled_at || undefined,
                price_snapshot: row.price_snapshot ?? null,
                currency_snapshot: row.currency_snapshot ?? null,
            }
        }
    }

    // If user has an active subscription, show management instead of checkout
    if (subscriptionSummary?.status === 'active') {
        return (
        <main className="min-h-screen font-sans bg-zinc-950 text-zinc-100 flex flex-col items-center">
                {/* Live updates for webhook-driven lifecycle changes */}
                <RealtimeSubscriptionSync userId={user?.id} />
                <div className="w-full ">
                    <ManageSubscription
                        subscription={subscriptionSummary}
                        plans={plans}
                        userEmail={user?.email || null}
                    />
                </div>
            </main>
        )
    }

    // Otherwise, render subscribe/checkout UI (marketing + CTA)
    const activePlans = plans

    return (
        <main className="min-h-screen font-sans bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center py-4">
            {/* After returning from hosted checkout (?subscribed=1), auto-refresh and poll until active */}
            <RealtimeSubscriptionSync userId={user?.id} />

            {/* ISLAND CARD CONTAINER */}
            <div className="w-full max-w-5xl border border-zinc-800 bg-zinc-900">

                {/* Header Section */}
                <div className="text-center pt-10 pb-6 border-b border-zinc-800 px-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-800 border border-zinc-700 mb-4">
                        <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">Early Bird Pricing</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-3">
                        Stop publishing generic fluff.
                    </h1>
                    <p className="text-zinc-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                        Get the only AI that researches like an expert and writes in <i>your</i> voice.
                        <br className="hidden sm:block" />
                        Start ranking with content that actually converts.
                    </p>
                </div>

                {/* Content Section */}
                {activePlans && activePlans.length > 0 ? (
                    <div className="p-4 sm:p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {activePlans.map((plan) => (
                                <div key={plan.id} className="border border-zinc-800 bg-zinc-900">
                                    <div className="p-6 border-b border-zinc-800 text-center">
                                        <h2 className="text-xl font-bold text-zinc-100">{plan.name}</h2>
                                        <p className="text-zinc-300 text-sm mt-2">
                                            {plan.description || 'Flexible monthly subscription'}
                                        </p>
                                        <div className="flex items-baseline gap-1 justify-center mt-4">
                                            <span className="text-4xl font-bold tracking-tighter text-zinc-100">
                                                {formatPrice(plan.price, plan.currency ?? 'USD')}
                                            </span>
                                            <span className="text-zinc-400 font-medium">/mo</span>
                                        </div>
                                        <p className="text-xs text-zinc-300 mt-2 font-medium bg-zinc-800 px-3 py-1 border border-zinc-700 inline-block">
                                            Includes {plan.credits ?? 0} credits per month
                                        </p>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid gap-y-3 text-left">
                                            <FeatureItem text="No rollover of unused credits" />
                                            <FeatureItem text="Cancel anytime; access until period end" />
                                            <FeatureItem text="Works with your existing workflows" />
                                        </div>
                                        <div className="mt-6">
                                            <SubscribeButton
                                                productId={plan.dodo_product_id}
                                                isAuthenticated={!!user}
                                                className="
                                                    cursor-pointer w-full text-base font-semibold text-white
                                                    bg-gradient-to-b from-zinc-700 to-zinc-900
                                                    hover:from-zinc-600 hover:to-zinc-800
                                                    transition-all
                                                "
                                            >
                                                <span className="flex items-center gap-2 justify-center">
                                                    <Zap className="w-4 h-4 fill-white/20" />
                                                    Subscribe
                                                </span>
                                            </SubscribeButton>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="p-12 text-center text-stone-500">
                        <CustomSpinner className="w-10 h-10 mx-auto mb-2" />
                        <p>Loading plans...</p>
                    </div>
                )}

                {/* Footer Info */}
                <div className="bg-zinc-900 border-t border-zinc-800 p-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">

                    <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                            Secure payments by{' '}
                            <Image
                                src="/dodo-logo.png"
                                alt="Dodo Payments"
                                width={70}
                                height={14}
                                className="inline-block align-middle ml-1"
                            />
                        </span>
                    </div>
                </div>
            </div>



        </main>
    )
}

function FeatureItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-zinc-200 flex-shrink-0" strokeWidth={3} />
            <span className="text-sm text-zinc-200 font-medium">{text}</span>
        </div>
    )
}
