-- Update certificate names in certifications table
UPDATE public.certifications 
SET name = 'AI Foundations Certificate' 
WHERE name = 'Revolutionary Certificate' OR slug = 'prompt-engineering-fundamentals';

UPDATE public.certifications 
SET name = 'AI Builder Certificate' 
WHERE name = 'AI Founders Certificate';

-- Update pricing_tiers certificates_included arrays
UPDATE public.pricing_tiers 
SET certificates_included = array_replace(certificates_included, 'revolutionary', 'ai_foundations');

UPDATE public.pricing_tiers 
SET certificates_included = array_replace(certificates_included, 'ai_founders', 'ai_builder');