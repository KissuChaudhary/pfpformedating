'use client'

import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { SubscriptionManagement } from '@/components/billingsdk/subscription-management'
import { UpdatePlanDialog } from '@/components/billingsdk/update-plan-dialog'
import {
    cancelSubscription as apiCancelSubscription,
    restoreSubscription as apiRestoreSubscription,
    changeSubscriptionPlan as apiChangePlan,
    previewChangeSubscriptionPlan as apiPreviewChangePlan,
    updatePaymentMethod as apiUpdatePaymentMethod,
} from '@/lib/dodopayments'
import type { Plan as BSDKPlan, CurrentPlan as BSDKCurrentPlan } from '@/lib/billingsdk-config'
import { Button } from '@/components/ui/button'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'
import { useRouter } from 'next/navigation'
import { createClient as createSupabaseClient } from '@/utils/supabase/client'

type SubscriptionStatus = 'pending' | 'active' | 'cancelled' | 'expired'

export interface SubscriptionSummary {
    subscription_id: string
    status: SubscriptionStatus
    plan_name?: string
    next_billing_date?: string
    cancel_at_period_end?: boolean
    current_period_end?: string
    canceled_at?: string
    price_snapshot?: number | null
    currency_snapshot?: string | null
}

export interface PlanRow {
    id: string
    name: string
    description?: string | null
    price: number
    credits?: number | null
    currency?: string | null
    dodo_product_id: string
}

interface ManageSubscriptionProps {
    subscription: SubscriptionSummary
    plans: PlanRow[]
    userEmail?: string | null
}

function formatCurrency(amount: number, currency: string = 'USD') {
    try {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
    } catch {
        // Fallback
        return `$${(amount || 0).toFixed(2)}`
    }
}

function currencySymbol(code?: string | null): string {
    if (!code) return '$'
    const c = code.toUpperCase()
    switch (c) {
        case 'USD': return '$'
        case 'EUR': return '€'
        case 'GBP': return '£'
        case 'INR': return '₹'
        case 'AUD': return 'A$'
        case 'CAD': return 'C$'
        case 'JPY': return '¥'
        default: return '$'
    }
}

function daysUntil(dateIso?: string): number {
    if (!dateIso) return 0
    const now = new Date()
    const d = new Date(dateIso)
    const diff = Math.max(0, d.getTime() - now.getTime())
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export default function ManageSubscription({ subscription, plans, userEmail }: ManageSubscriptionProps) {
    const [busy, setBusy] = useState(false)
    const [confirmCancelOpen, setConfirmCancelOpen] = useState(false)
    const [confirmRestoreOpen, setConfirmRestoreOpen] = useState(false)
    const [confirmUpgradeOpen, setConfirmUpgradeOpen] = useState(false)
    const [upgradeDetails, setUpgradeDetails] = useState<{
        planId?: string
        planName?: string
        immediate?: number
        credit?: number
        effectiveDate?: string | null
        currency?: string
    } | null>(null)
    const [paymentProcessing, setPaymentProcessing] = useState(false)
    const [latestPayment, setLatestPayment] = useState<{
        id?: string
        amount?: number
        currency?: string
        status?: string
        timestamp?: string | null
    } | null>(null)
    const router = useRouter()
    const [localCancelAtPeriodEnd, setLocalCancelAtPeriodEnd] = useState(!!subscription.cancel_at_period_end)
    const [localNextBillingDate, setLocalNextBillingDate] = useState<string | undefined>(subscription.next_billing_date)
    const [localCurrentPeriodEnd, setLocalCurrentPeriodEnd] = useState<string | undefined>(subscription.current_period_end)
    const cancelGuardDate = useMemo(
        () => localCurrentPeriodEnd ?? localNextBillingDate,
        [localCurrentPeriodEnd, localNextBillingDate]
    )
    const cancelDescription = useMemo(() => {
        return (
            `This will schedule your subscription to cancel at the end of the current billing period.` +
            (cancelGuardDate ? ` You will retain access until ${new Date(cancelGuardDate).toLocaleString()}.` : '') +
            ` You can restore anytime before that date.`
        )
    }, [cancelGuardDate])

    // Map pricing plans to BillingSDK Plan type
    const billingPlans = useMemo<BSDKPlan[]>(() => {
        return (plans || []).map((p) => ({
            id: p.id,
            title: p.name,
            description: p.description || '',
            currency: currencySymbol(p.currency || 'USD'),
            monthlyPrice: String(p.price ?? 0),
            yearlyPrice: String((p.price ?? 0) * 12),
            buttonText: 'Select',
            features: [
                { name: p.credits ? `${p.credits} Human-like articles per month` : 'AI-generated articles', icon: 'check' },
                { name: 'Automated content strategy', icon: 'check' },
                { name: 'CMS integration', icon: 'check' },
                { name: 'On-brand AI images', icon: 'check' },
                { name: 'Smart internal linking', icon: 'check' },
                { name: 'Real-time research with citations', icon: 'check' },
                { name: 'Cancel anytime', icon: 'check' },
            ],
        }))
    }, [plans])

    // Determine current plan display
    const currentPlanDisplay = useMemo(() => {
        const byName = billingPlans.find((bp) => bp.title === subscription.plan_name)
        return byName || billingPlans[0]
    }, [billingPlans, subscription.plan_name])

    const nextBillingDateStr = useMemo(() => {
        return localNextBillingDate ? new Date(localNextBillingDate).toLocaleDateString() : '—'
    }, [localNextBillingDate])

    const planEndsDateStr = useMemo(() => {
        return localCurrentPeriodEnd
            ? new Date(localCurrentPeriodEnd).toLocaleDateString()
            : (localNextBillingDate ? new Date(localNextBillingDate).toLocaleDateString() : '—')
    }, [localCurrentPeriodEnd, localNextBillingDate])

    const dateLabel = localCancelAtPeriodEnd ? 'Plan ends on' : 'Next billing date'

    const currentPlanInfo = useMemo<BSDKCurrentPlan>(() => {
        let sym = currentPlanDisplay?.currency || '$'
        let priceStr = currentPlanDisplay ? `${sym}${currentPlanDisplay.monthlyPrice}/month` : '—'

        if (subscription.price_snapshot != null) {
            const snapCurrency = subscription.currency_snapshot || 'USD'
            sym = currencySymbol(snapCurrency)
            const amt = subscription.price_snapshot / 100 // assuming price_snapshot is in cents
            priceStr = `${sym}${amt}/month`
        }

        const status: BSDKCurrentPlan['status'] =
            subscription.status === 'active'
                ? 'active'
                : subscription.status === 'pending'
                    ? 'inactive'
                    : subscription.status === 'cancelled'
                        ? 'cancelled'
                        : 'inactive'

        return {
            plan: currentPlanDisplay || {
                id: 'default',
                title: subscription.plan_name || 'Plan',
                description: '',
                currency: '$',
                monthlyPrice: '0',
                yearlyPrice: '0',
                buttonText: 'Select',
                features: [],
            },
            type: 'monthly',
            price: priceStr,
            nextBillingDate: localCancelAtPeriodEnd ? planEndsDateStr : nextBillingDateStr,
            paymentMethod: 'Card on file',
            status,
        }
    }, [currentPlanDisplay, subscription.status, nextBillingDateStr, planEndsDateStr, localCancelAtPeriodEnd, subscription.plan_name])

    const onCancel = useCallback(async () => {
        if (!subscription.subscription_id) return
        try {
            setBusy(true)
            const res = await apiCancelSubscription(subscription.subscription_id)
            setLocalCancelAtPeriodEnd(true)
            if (res?.remote?.current_period_end) {
                setLocalCurrentPeriodEnd(res.remote.current_period_end as any)
            }
            if (res?.remote?.next_billing_date) {
                setLocalNextBillingDate(res.remote.next_billing_date as any)
            }
            setConfirmCancelOpen(false)
            router.refresh()
        } finally {
            setBusy(false)
        }
    }, [subscription.subscription_id, router])

    useEffect(() => {
        async function checkProcessing() {
            try {
                const supabase = createSupabaseClient()
                let uid: string | undefined = undefined
                if (userEmail) {
                    const { data: prof } = await supabase.from('profiles').select('id').eq('email', userEmail).maybeSingle()
                    uid = (prof as any)?.id
                }
                if (!uid) return
                const { data: pending } = await supabase
                    .from('dodo_subscription_changes')
                    .select('id')
                    .eq('user_id', uid)
                    .eq('status', 'pending')
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .maybeSingle()
                setPaymentProcessing(!!pending)
            } catch { }
        }
        checkProcessing()
    }, [userEmail])

    useEffect(() => {
        async function fetchLatestPayment() {
            try {
                const supabase = createSupabaseClient()
                let uid: string | undefined = undefined
                if (userEmail) {
                    const { data: prof } = await supabase.from('profiles').select('id').eq('email', userEmail).maybeSingle()
                    uid = (prof as any)?.id
                }
                if (!uid) return
                const { data } = await (createSupabaseClient() as any)
                    .from('dodo_payments')
                    .select('dodo_payment_id, amount, currency, status, metadata')
                    .eq('user_id', uid)
                    .order('metadata->>payment_timestamp', { ascending: false })
                    .limit(1)
                const row = Array.isArray(data) ? (data[0] as any) : (data as any)
                if (row) {
                    setLatestPayment({
                        id: row.dodo_payment_id,
                        amount: typeof row.amount === 'number' ? row.amount : Number(String(row.amount || '0').replace(/[^0-9.\-]/g, '')),
                        currency: row.currency || 'USD',
                        status: String(row.status || '').toLowerCase(),
                        timestamp: row?.metadata?.payment_timestamp ?? null,
                    })
                }
            } catch { }
        }
        fetchLatestPayment()
        if (paymentProcessing) {
            const t = setInterval(fetchLatestPayment, 5000)
            return () => clearInterval(t)
        }
    }, [userEmail, paymentProcessing])

    const onRestore = useCallback(async () => {
        if (!subscription.subscription_id) return
        try {
            setBusy(true)
            await apiRestoreSubscription(subscription.subscription_id)
            setLocalCancelAtPeriodEnd(false)
            router.refresh()
        } finally {
            setBusy(false)
        }
    }, [subscription.subscription_id, router])

    const onPlanChange = useCallback(async (planId: string) => {
        const chosen = plans.find((p) => p.id === planId)
        if (!chosen || !subscription.subscription_id) return
        try {
            setBusy(true)
            const previewRes = await apiPreviewChangePlan(
                subscription.subscription_id,
                chosen.dodo_product_id,
                'difference_immediately',
                1
            )
            const currency = (previewRes?.preview?.currency as string) || subscription.currency_snapshot || 'USD'
            let immediate = Number(previewRes?.preview?.immediate_charge ?? 0)
            if (!Number.isFinite(immediate) || immediate === 0) {
                const sum = previewRes?.preview?.immediate_summary as string | undefined
                if (sum) {
                    const parsed = Number(String(sum).replace(/[^0-9.\-]/g, ''))
                    if (Number.isFinite(parsed)) immediate = parsed
                }
            }
            const credit = Number(previewRes?.preview?.credit_amount ?? 0)
            const eff = previewRes?.preview?.effective_date ?? null
            setUpgradeDetails({
                planId: chosen.id,
                planName: chosen.name,
                immediate,
                credit,
                effectiveDate: eff,
                currency,
            })
            setConfirmUpgradeOpen(true)
        } catch (e) {
            console.error('Plan change failed', e)
            alert((e as any)?.message || 'Failed to change plan')
        } finally {
            setBusy(false)
        }
    }, [plans, subscription.subscription_id, router])

    const onUpdatePaymentMethod = useCallback(async () => {
        try {
            setBusy(true)
            const origin = typeof window !== 'undefined' ? window.location.origin : ''
            const return_url = `${origin}/subscribe?pm_updated=1`
            const res = await apiUpdatePaymentMethod(subscription.subscription_id, return_url)
            if (res?.url) {
                window.location.href = res.url
            } else if (res?.emailed) {
                alert(res?.message || 'We emailed you a secure link to update your payment method.')
            } else {
                alert('Unable to open payment method update flow.')
            }
        } catch (e) {
            console.error('Update payment method failed', e)
            alert('Failed to open payment method update')
        } finally {
            setBusy(false)
        }
    }, [subscription.subscription_id])

    // Realtime: reflect webhook updates without hard refresh
    useEffect(() => {
        if (!subscription.subscription_id) return
        const supabase = createSupabaseClient()
        const channel = supabase
            .channel(`dodo_subscriptions:${subscription.subscription_id}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'dodo_subscriptions',
                    filter: `dodo_subscription_id=eq.${subscription.subscription_id}`,
                } as any,
                (payload: any) => {
                    const row = (payload?.new ?? {}) as any
                    if (typeof row.cancel_at_period_end !== 'undefined') {
                        setLocalCancelAtPeriodEnd(!!row.cancel_at_period_end)
                    }
                    if ('next_billing_date' in row) {
                        setLocalNextBillingDate(row.next_billing_date || undefined)
                    }
                    if ('current_period_end' in row) {
                        setLocalCurrentPeriodEnd(row.current_period_end || undefined)
                    }
                    router.refresh()
                }
            )
            .subscribe()

        return () => {
            try { supabase.removeChannel(channel) } catch (_) { }
        }
    }, [subscription.subscription_id, router])




    return (
        <div className="mx-auto flex w-full flex-col gap-8">


            {/* Subscription Management (Plan change + Cancel dialog) */}
            <div id="subscription-management-section">
                <SubscriptionManagement
                    className="w-full"
                    currentPlan={currentPlanInfo}
                    cancelSubscription={{
                        title: 'Cancel Subscription',
                        description:
                            'This will schedule your subscription to cancel at the end of the current billing period. You will retain access until the end of the period.',
                        plan: currentPlanInfo.plan,
                        triggerButtonText: 'Cancel Subscription',
                        onCancel: async () => onCancel(),
                        onKeepSubscription: async () => onRestore(),
                    }}
                    updatePlan={{
                        currentPlan: currentPlanInfo.plan,
                        plans: billingPlans,
                        triggerText: 'Change Plan',
                        onPlanChange: (planId: string) => onPlanChange(planId),
                    }}
                    hideUpdatePlan={false}
                    hideCancelDialog={true}
                    dateLabel={dateLabel}
                    isPlanEnding={localCancelAtPeriodEnd}
                >
                    <>
                        {latestPayment && (
                            <div className="w-full border border-zinc-700 bg-zinc-900 px-3 py-2 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-xs text-zinc-400">Latest payment</span>
                                    <span className="text-sm font-semibold text-zinc-100">
                                        {currencySymbol(latestPayment.currency)}{Number(latestPayment.amount ?? 0).toFixed(2)}
                                    </span>
                                    {latestPayment.timestamp && (
                                        <span className="text-[10px] text-zinc-500">
                                            {new Date(latestPayment.timestamp).toLocaleString()}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <span
                                        className={[
                                            'inline-flex items-center rounded-sm px-2 py-0.5 text-[11px] font-semibold border',
                                            latestPayment.status === 'processing'
                                                ? 'bg-yellow-900/20 text-yellow-300 border-yellow-700'
                                                : latestPayment.status === 'successful' || latestPayment.status === 'succeeded' || latestPayment.status === 'completed'
                                                    ? 'bg-emerald-900/20 text-emerald-300 border-emerald-700'
                                                    : 'bg-red-900/20 text-red-300 border-red-700',
                                        ].join(' ')}
                                    >
                                        {String(latestPayment.status || 'unknown')}
                                    </span>
                                </div>
                            </div>
                        )}
                        {paymentProcessing && (
                            <div className="w-full rounded-none border border-yellow-700 bg-yellow-900/20 px-3 py-2 text-yellow-300">
                                Payment is processing. Plan will finalize after confirmation.
                            </div>
                        )}
                        <UpdatePlanDialog
                            currentPlan={currentPlanInfo.plan}
                            plans={billingPlans}
                            triggerText="Change Plan"
                            showCycleToggle={false}
                            className="bg-zinc-900 text-zinc-100 border border-zinc-800"
                            onPlanChange={(planId: string) => onPlanChange(planId)}
                        />
                        {subscription.status === 'active' && !localCancelAtPeriodEnd && (
                            <Button
                                variant="destructive"
                                onClick={() => setConfirmCancelOpen(true)}
                                disabled={busy}
                            >
                                Cancel at period end
                            </Button>
                        )}
                        {subscription.status === 'active' && localCancelAtPeriodEnd && (
                            <Button
                                variant="default"
                                onClick={() => setConfirmRestoreOpen(true)}
                                disabled={busy}
                            >
                                Restore subscription
                            </Button>
                        )}
                        <Button variant="outline" onClick={onUpdatePaymentMethod} disabled={busy}>
                            Update payment method
                        </Button>
                    </>
                </SubscriptionManagement>
            </div>


            <ConfirmationDialog
                isOpen={confirmCancelOpen}
                onClose={() => setConfirmCancelOpen(false)}
                onConfirm={async () => {
                    try {
                        await onCancel()
                    } catch (e) {
                        console.error('Failed to cancel subscription', e)
                        alert('Failed to cancel subscription')
                    }
                }}
                title="Confirm cancellation at period end"
                description={cancelDescription}
                confirmText="Confirm cancellation"
                cancelText="Keep subscription"
                variant="destructive"
            />

            <ConfirmationDialog
                isOpen={confirmRestoreOpen}
                onClose={() => setConfirmRestoreOpen(false)}
                onConfirm={async () => {
                    try {
                        await onRestore()
                        setConfirmRestoreOpen(false)
                    } catch (e) {
                        console.error('Failed to restore subscription', e)
                        alert('Failed to restore subscription')
                    }
                }}
                title="Restore your subscription?"
                description="Your subscription will continue and you will be billed on the next billing date. Your access will remain uninterrupted."
                confirmText="Yes, restore subscription"
                cancelText="Cancel"
                variant="default"
            />

            <ConfirmationDialog
                isOpen={confirmUpgradeOpen}
                onClose={() => setConfirmUpgradeOpen(false)}
                onConfirm={async () => {
                    if (!subscription.subscription_id || !upgradeDetails?.planId) return
                    try {
                        setBusy(true)
                        const planRow = plans.find(p => p.id === upgradeDetails.planId)
                        if (!planRow) return
                        await apiChangePlan(subscription.subscription_id, planRow.dodo_product_id, 'difference_immediately', 1)
                        setConfirmUpgradeOpen(false)
                        router.refresh()
                    } finally {
                        setBusy(false)
                    }
                }}
                title="Confirm plan change"
                description={
                    (() => {
                        const sym = currencySymbol(upgradeDetails?.currency || 'USD')
                        const imm = Number(upgradeDetails?.immediate ?? 0)
                        const cred = Number(upgradeDetails?.credit ?? 0)
                        const eff = upgradeDetails?.effectiveDate
                        return [
                            `You are changing to "${upgradeDetails?.planName || ''}".`,
                            `Immediate charge: ${sym}${Number.isFinite(imm) ? imm.toFixed(2) : '0.00'}`,
                            cred > 0 ? `Credit applied: ${sym}${Number.isFinite(cred) ? cred.toFixed(2) : '0.00'}` : '',
                            eff ? `Effective date: ${new Date(eff).toLocaleString()}` : '',
                        ].filter(Boolean).join('\n')
                    })()
                }
                confirmText="Confirm change"
                cancelText="Cancel"
                variant="default"
            />

        </div>
    )
}
