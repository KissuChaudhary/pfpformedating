import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { getDodoClient } from '@/lib/dodopayments-server'
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json().catch(() => ({}))
    let {
      subscription_id,
      product_id,
      proration_billing_mode,
      quantity,
    }: {
      subscription_id?: string
      product_id?: string
      proration_billing_mode?: 'prorated_immediately' | 'difference_immediately' | 'full_immediately'
      quantity?: number
    } = body || {}

    if (!product_id) {
      return NextResponse.json({ error: 'product_id is required' }, { status: 400 })
    }

    if (!subscription_id) {
      const { data: latestSub } = await supabase
        .from('dodo_subscriptions')
        .select('dodo_subscription_id, status')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()
      subscription_id = latestSub?.dodo_subscription_id || undefined
      if (!subscription_id) {
        return NextResponse.json({ error: 'No subscription found' }, { status: 404 })
      }
      if ((latestSub?.status || '').toLowerCase() !== 'active') {
        return NextResponse.json({ error: 'Subscription is not active' }, { status: 400 })
      }
    }

    // Validate product exists in local pricing plans
    const { data: plan } = await supabase
      .from('dodo_pricing_plans')
      .select('id, price, credits, currency, dodo_product_id')
      .eq('dodo_product_id', product_id)
      .maybeSingle()
    if (!plan) {
      return NextResponse.json({ error: 'Invalid product_id' }, { status: 400 })
    }

    const client = getDodoClient()
    const preview: any = await (client as any).subscriptions.previewChangePlan(subscription_id, {
      product_id,
      proration_billing_mode: proration_billing_mode ?? 'prorated_immediately',
      quantity: typeof quantity === 'number' && quantity > 0 ? quantity : 1,
    })

    const immObj = preview?.immediate_charge ?? preview?.charge ?? preview?.difference ?? null
    const immRaw =
      (immObj && (immObj.amount ?? immObj.total_amount ?? immObj.value)) ??
      preview?.immediate_charge_amount ??
      preview?.immediate_charge ??
      0
    const immSummary =
      (immObj && (immObj.summary ?? immObj.text)) ??
      preview?.immediate_charge_summary ??
      null
    const credRaw =
      (preview?.credit_amount?.amount ?? preview?.credit_amount?.total_amount) ??
      preview?.credit_amount ??
      0
    const currency =
      (preview?.currency ?? immObj?.currency ?? plan.currency ?? 'USD') as string

    const toNumber = (v: any): number => {
      if (typeof v === 'number') return v
      if (typeof v === 'string') {
        const s = v.replace(/[^0-9.\-]/g, '')
        const n = Number(s)
        return Number.isFinite(n) ? n : 0
      }
      return 0
    }

    const breakdown = {
      immediate_charge: toNumber(immRaw),
      immediate_summary: typeof immSummary === 'string' ? immSummary : null,
      credit_amount: toNumber(credRaw),
      effective_date: preview?.effective_date ?? null,
      current_plan_end: preview?.current_plan_end ?? null,
      currency,
      new_plan: {
        id: plan.id,
        price: Number(plan.price),
        credits: plan.credits ?? null,
        currency: plan.currency || 'USD',
        product_id: plan.dodo_product_id,
      }
    }

    return NextResponse.json({ ok: true, preview: breakdown }, { status: 200 })
  } catch (err: any) {
    const msg = (err?.message || err?.error || '').toString() || 'Failed to preview plan change'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
