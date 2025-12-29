-- Fix pricing tier slugs and certificates_included arrays to match actual certification slugs
-- Current certification slugs: prompt-engineering-fundamentals, ai-founders-certificate, ai-launcher

-- Update Revolution Start tier
UPDATE public.pricing_tiers 
SET 
  slug = 'revolution-start',
  certificates_included = ARRAY['prompt-engineering-fundamentals']
WHERE slug = 'revolution' OR name ILIKE '%revolution%';

-- Update Yearly Founder tier  
UPDATE public.pricing_tiers 
SET 
  slug = 'yearly-founder',
  certificates_included = ARRAY['prompt-engineering-fundamentals', 'ai-founders-certificate']
WHERE slug = 'yearly' OR name ILIKE '%yearly%';

-- Update Live Cohort tier
UPDATE public.pricing_tiers 
SET 
  slug = 'live-cohort',
  certificates_included = ARRAY['prompt-engineering-fundamentals', 'ai-founders-certificate', 'ai-launcher']
WHERE slug = 'live' OR name ILIKE '%live cohort%';