-- Phase 1: Add Base44 lessons to AI Foundations (lessons 7-10)
INSERT INTO certification_lessons (certification_id, lesson_order, title, description, estimated_minutes, learning_objectives, content)
VALUES 
  ('761a157d-a1e0-4423-99b8-a58f5ddad129', 7, 'Build Better Prompts', 
   'Master the BASE Framework: Be Specific, Address the Problem, Structure Your Workflow, End Goal. Learn how professional prompt engineers write prompts that get results.',
   35,
   ARRAY['Apply the BASE Framework to any AI prompt', 'Identify weak prompts and improve them', 'Write prompts that get predictable results'],
   'Learn the BASE Framework used by professional AI builders at Base44. This lesson transforms your prompting from amateur to pro level.'),
   
  ('761a157d-a1e0-4423-99b8-a58f5ddad129', 8, 'Level Up Your Prompts',
   'Compare weak vs strong prompts using real examples. Practice transforming vague requests into powerful instructions.',
   35,
   ARRAY['Convert weak prompts to strong prompts', 'Recognize common prompting mistakes', 'Apply specificity rules consistently'],
   'Side-by-side comparisons of weak vs strong prompts. Practice improving prompts until they consistently deliver results.'),
   
  ('761a157d-a1e0-4423-99b8-a58f5ddad129', 9, 'From Prompt to Prototype',
   'Use your $48 Base44 credits to build your first real AI-powered app. Go from idea to working prototype in one lesson.',
   45,
   ARRAY['Build a complete AI-powered prototype', 'Use Base44 platform effectively', 'Debug and iterate on AI-built features'],
   'Hands-on lesson where you use your Base44 credits to build a real working app. This is where prompting becomes building.'),
   
  ('761a157d-a1e0-4423-99b8-a58f5ddad129', 10, 'Take Vibe Coding Further',
   'Celebrate your first AI-built app and plan your next steps. Learn how to continue building with AI tools.',
   25,
   ARRAY['Present your first AI-built prototype', 'Plan your next AI building project', 'Identify your unique builder strengths'],
   'Reflect on what you built, share it with peers, and plan what comes next. This is just the beginning of your AI building journey.');

-- Update AI Foundations certification with new lesson count and hours
UPDATE certifications 
SET lessons_count = 10, estimated_hours = 7.0
WHERE slug = 'prompt-engineering-fundamentals';

-- Phase 2: Add "taste" tracking columns to students table for FREE tier limits
ALTER TABLE students 
ADD COLUMN IF NOT EXISTS free_coach_uses INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS free_tank_uses INTEGER DEFAULT 0;

-- Create FREE tier (forever free, with taste limits) - use 0 for monthly_price
INSERT INTO pricing_tiers (
  name, slug, type, tier_type, program, 
  original_price, current_price, monthly_price, upfront_price,
  billing_period, duration_months, trial_days,
  includes_yearly_access, certificates_included, features,
  min_students, max_students, is_active, is_featured, badge_text, display_order
) VALUES (
  'FREE Forever', 'free-foundations', 'b2c', 'free', 'free',
  0, 0, 0, 0,
  'forever', 0, 0,
  false, ARRAY['prompt-engineering-fundamentals'],
  '{"ai_coach_total": 5, "tank_total": 2, "sprint_daily": 3, "curriculum_access": "free", "case_studies": false, "live_classes": false}'::jsonb,
  NULL, NULL, true, false, 'FREE FOREVER', 0
);

-- Update BUILDER tier pricing ($19 crossed from $45)
UPDATE pricing_tiers 
SET current_price = 19, original_price = 45, badge_text = 'LIMITED OFFER'
WHERE slug = 'revolution-start';

-- Update FULL tier pricing ($99 crossed from $145)
UPDATE pricing_tiers 
SET current_price = 99, original_price = 145, badge_text = 'BEST VALUE'
WHERE slug = 'yearly-founder';

-- Phase 4: Add pilot tracking to school_licenses
ALTER TABLE school_licenses
ADD COLUMN IF NOT EXISTS pilot_end_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS is_pilot BOOLEAN DEFAULT false;

-- Create School Pilot FREE tier (60 days with taste limits)
INSERT INTO pricing_tiers (
  name, slug, type, tier_type, program,
  original_price, current_price, monthly_price, upfront_price,
  billing_period, duration_months, trial_days,
  includes_yearly_access, certificates_included, features,
  min_students, max_students, is_active, is_featured, badge_text, display_order
) VALUES (
  'School Pilot - FREE', 'schools-pilot-free', 'b2b', 'pilot', 'schools',
  0, 0, 0, 0,
  'pilot', 2, 60,
  false, ARRAY['prompt-engineering-fundamentals'],
  '{"ai_coach_total": 5, "tank_total": 2, "sprint_daily": 3, "curriculum_access": "free", "school_dashboard": true, "case_studies": false, "live_classes": false}'::jsonb,
  1, 500, true, true, '60-DAY FREE PILOT', 5
);