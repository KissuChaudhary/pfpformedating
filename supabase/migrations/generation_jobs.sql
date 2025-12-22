-- Generation Jobs Table for Fal.ai Webhook-based Processing
-- Run this in your Supabase SQL Editor

create table public.generation_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  model_id bigint not null references models(id) on delete cascade,
  fal_request_id text unique,
  prompt text not null,
  enhanced_prompt text,
  status text not null default 'pending', -- pending, processing, completed, failed
  result_url text,
  image_id bigint references images(id) on delete set null,
  error_message text,
  credits_deducted integer default 1,
  created_at timestamptz default now(),
  completed_at timestamptz
);

-- Index for faster lookups
create index idx_generation_jobs_user_id on public.generation_jobs(user_id);
create index idx_generation_jobs_status on public.generation_jobs(status);
create index idx_generation_jobs_fal_request_id on public.generation_jobs(fal_request_id);

-- Enable RLS
alter table public.generation_jobs enable row level security;

-- Policy: Users can only see their own jobs
create policy "Users can view own jobs"
  on public.generation_jobs for select
  using (auth.uid() = user_id);

-- Policy: Users can insert their own jobs
create policy "Users can insert own jobs"
  on public.generation_jobs for insert
  with check (auth.uid() = user_id);

-- Policy: Service role can update any job (for webhook)
create policy "Service role can update jobs"
  on public.generation_jobs for update
  using (true);
