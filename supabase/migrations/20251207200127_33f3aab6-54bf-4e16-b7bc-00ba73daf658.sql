-- Remove is_free flag from AI Prompt Engineering certification
-- This certification is now part of paid tiers, not free
UPDATE certifications 
SET is_free = false 
WHERE slug = 'prompt-engineering-fundamentals';