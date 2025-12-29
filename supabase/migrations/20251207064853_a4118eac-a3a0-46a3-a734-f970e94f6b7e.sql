
-- Add missing is_featured column
ALTER TABLE pricing_tiers ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
