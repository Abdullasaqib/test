-- Add archetype and role_feedback columns to challenge_attempts table
ALTER TABLE public.challenge_attempts 
ADD COLUMN IF NOT EXISTS archetype text,
ADD COLUMN IF NOT EXISTS role_feedback text;