-- Update pricing tier features to include sprint_daily limits
-- FIRST STEP: 3 sprints per month (trial taste)
-- FULL FOUNDATION: Unlimited sprints
-- ACCELERATOR: Unlimited sprints

UPDATE pricing_tiers
SET features = jsonb_set(
  COALESCE(features::jsonb, '{}'::jsonb),
  '{sprint_daily}',
  '3'::jsonb
)
WHERE slug = 'revolution-start';

UPDATE pricing_tiers
SET features = jsonb_set(
  COALESCE(features::jsonb, '{}'::jsonb),
  '{sprint_daily}',
  '-1'::jsonb
)
WHERE slug = 'yearly-founder';

UPDATE pricing_tiers
SET features = jsonb_set(
  COALESCE(features::jsonb, '{}'::jsonb),
  '{sprint_daily}',
  '-1'::jsonb
)
WHERE slug = 'live-cohort';