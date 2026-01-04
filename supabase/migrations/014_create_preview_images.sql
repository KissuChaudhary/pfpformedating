-- Create separate table for preview image tracking
-- This keeps the models table clean and follows the single responsibility principle

CREATE TABLE public.preview_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  model_id BIGINT NOT NULL REFERENCES public.models(id) ON DELETE CASCADE,
  job_id UUID REFERENCES public.generation_jobs(id),
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, generating, completed, failed
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  UNIQUE(model_id) -- One preview per model
);

-- Indexes for faster lookups
CREATE INDEX idx_preview_images_user_id ON public.preview_images(user_id);
CREATE INDEX idx_preview_images_model_id ON public.preview_images(model_id);
CREATE INDEX idx_preview_images_status ON public.preview_images(status);

-- Enable RLS
ALTER TABLE public.preview_images ENABLE ROW LEVEL SECURITY;

-- Users can view their own preview images
CREATE POLICY "Users can view own preview images"
  ON public.preview_images FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own preview images
CREATE POLICY "Users can insert own preview images"
  ON public.preview_images FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Service role can update any preview image (for webhook)
CREATE POLICY "Service role can update preview images"
  ON public.preview_images FOR UPDATE
  USING (true);

-- Add is_preview flag to generation_jobs to identify preview jobs
ALTER TABLE public.generation_jobs
ADD COLUMN is_preview BOOLEAN DEFAULT false;

-- Index for efficient preview job queries
CREATE INDEX idx_generation_jobs_is_preview ON public.generation_jobs(is_preview) WHERE is_preview = true;
