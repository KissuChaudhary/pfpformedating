-- Enable Row Level Security on images table
ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;

-- Allow users to SELECT images from their own models
CREATE POLICY "Users can view images from their own models"
  ON public.images
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.models
      WHERE models.id = images."modelId"
      AND models.user_id = auth.uid()
    )
  );

-- Allow users to INSERT images for their own models
CREATE POLICY "Users can insert images for their own models"
  ON public.images
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.models
      WHERE models.id = images."modelId"
      AND models.user_id = auth.uid()
    )
  );

-- Allow users to DELETE images from their own models
CREATE POLICY "Users can delete images from their own models"
  ON public.images
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.models
      WHERE models.id = images."modelId"
      AND models.user_id = auth.uid()
    )
  );
