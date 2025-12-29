-- Add missing columns to students table that code expects
ALTER TABLE public.students 
ADD COLUMN IF NOT EXISTS audience_type text DEFAULT 'youth',
ADD COLUMN IF NOT EXISTS pro_onboarding_completed boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS industry text,
ADD COLUMN IF NOT EXISTS idea_stage text;