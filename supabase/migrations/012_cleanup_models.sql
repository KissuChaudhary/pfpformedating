-- Cleanup models table: remove unused columns
-- The 'type' column already exists and will be used for gender/identity

-- Drop the expiration index first (depends on the columns being dropped)
DROP INDEX IF EXISTS idx_models_expiration;

-- Remove unused columns
ALTER TABLE public.models DROP COLUMN IF EXISTS auto_extend;
ALTER TABLE public.models DROP COLUMN IF EXISTS is_custom;
ALTER TABLE public.models DROP COLUMN IF EXISTS expires_at;

-- Add comment to clarify 'type' usage
COMMENT ON COLUMN public.models.type IS 'Subject identity/gender: Female, Male, or Non-Binary';
