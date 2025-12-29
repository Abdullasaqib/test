-- Update FIRST STEP tier to 30 sprints per month (1 per day) instead of 3
UPDATE pricing_tiers 
SET features = jsonb_set(features, '{sprint_daily}', '30'::jsonb)
WHERE slug = 'revolution-start';