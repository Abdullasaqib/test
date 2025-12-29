-- Add AI LAUNCHER certificate (Level 3 - earned through Live Cohort with Demo Day)
INSERT INTO public.certifications (
  name,
  slug,
  description,
  estimated_hours,
  lessons_count,
  is_active,
  is_free
) VALUES (
  'AI Launcher',
  'ai-launcher',
  'Prove you can launch. Complete live cohort classes, ship your product, and present at Demo Day with real investors. The ultimate founder credential.',
  40,
  12,
  true,
  false
);

-- Update Live Cohort tier to include all 3 certificates
UPDATE public.pricing_tiers 
SET certificates_included = ARRAY['ai-foundations', 'ai-builder', 'ai-launcher']
WHERE slug = 'live-cohort';

-- Also ensure Yearly Founder has both foundation certs
UPDATE public.pricing_tiers 
SET certificates_included = ARRAY['ai-foundations', 'ai-builder']
WHERE slug = 'yearly-founder';

-- Ensure Revolution Start has just foundations
UPDATE public.pricing_tiers 
SET certificates_included = ARRAY['ai-foundations']
WHERE slug = 'revolution-start';