-- Insert adult pricing tiers with all required columns
INSERT INTO public.pricing_tiers (name, slug, type, tier_type, program, original_price, current_price, billing_period, features, badge_text, is_active, is_featured, display_order, trial_days)
VALUES 
  ('PROFESSIONAL BUILDER', 'professional-builder', 'b2c', 'professional', 'professional', 999, 749, 'one_time',
   '{"ai_coach": true, "tank_access": true, "sprint_daily": true, "certificates": ["ai-builder-pro"], "curriculum_weeks": 8}'::jsonb,
   'BEST FOR PROFESSIONALS', true, true, 10, 0),
  ('COLLEGE FOUNDERS', 'college-founders', 'b2c', 'college', 'college', 499, 299, 'one_time',
   '{"ai_coach": true, "tank_access": true, "sprint_daily": true, "certificates": ["ai-venture"], "curriculum_weeks": 12}'::jsonb,
   'BEST FOR STUDENTS', true, false, 11, 0)
ON CONFLICT (slug) DO NOTHING;

-- Insert adult certifications
INSERT INTO public.certifications (name, slug, description, estimated_hours, is_active, is_free)
VALUES 
  ('AI Builder Pro', 'ai-builder-pro', 'Professional certification for AI-powered product building.', 40, true, false),
  ('AI Venture', 'ai-venture', 'College-level certification for AI entrepreneurship.', 60, true, false)
ON CONFLICT (slug) DO NOTHING;