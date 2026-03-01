alter table public.dodo_subscription_changes
  add column if not exists proration_billing_mode text null,
  add column if not exists immediate_charge numeric(10,2) null,
  add column if not exists credit_amount numeric(10,2) null,
  add column if not exists invoice_id text null,
  add column if not exists payment_id text null,
  add column if not exists effective_date timestamp with time zone null;

create table if not exists public.dodo_subscription_history (
  id uuid not null default extensions.uuid_generate_v4 (),
  created_at timestamp with time zone not null default now(),
  user_id uuid not null,
  dodo_subscription_id text not null,
  from_plan_id uuid null,
  to_plan_id uuid null,
  proration_billing_mode text null,
  immediate_charge numeric(10,2) null,
  credit_amount numeric(10,2) null,
  invoice_id text null,
  payment_id text null,
  effective_date timestamp with time zone null,
  event_type text not null default 'plan_changed',
  metadata jsonb null default '{}'::jsonb,
  constraint dodo_subscription_history_pkey primary key (id),
  constraint dodo_subscription_history_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade,
  constraint dodo_subscription_history_from_plan_id_fkey foreign key (from_plan_id) references public.dodo_pricing_plans (id),
  constraint dodo_subscription_history_to_plan_id_fkey foreign key (to_plan_id) references public.dodo_pricing_plans (id)
);

create index if not exists dodo_subscription_history_user_idx on public.dodo_subscription_history using btree (user_id);
create index if not exists dodo_subscription_history_sub_idx on public.dodo_subscription_history using btree (dodo_subscription_id);
create index if not exists dodo_subscription_history_created_idx on public.dodo_subscription_history using btree (created_at desc);
