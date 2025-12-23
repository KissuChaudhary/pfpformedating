-- Add mode column to models table for single/couple distinction
-- Run this in your Supabase SQL Editor

ALTER TABLE models ADD COLUMN IF NOT EXISTS mode TEXT DEFAULT 'single';

-- Add check constraint for valid values
ALTER TABLE models ADD CONSTRAINT models_mode_check 
  CHECK (mode IN ('single', 'couple'));

-- Comment for documentation
COMMENT ON COLUMN models.mode IS 'single for individual photoshoots, couple for pair photoshoots';
