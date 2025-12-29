
-- Drop and recreate pricing_tiers with new structure
DROP TABLE IF EXISTS pricing_changes_log;

-- Create pricing_changes_log for audit trail
CREATE TABLE pricing_changes_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tier_id UUID,
  field_changed TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  changed_by UUID,
  changed_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on pricing_changes_log
ALTER TABLE pricing_changes_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage pricing changes log"
ON pricing_changes_log FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create case_studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  student_name TEXT NOT NULL,
  student_age INTEGER,
  program TEXT CHECK (program IN ('junior', 'teen', 'advanced')),
  thumbnail_url TEXT,
  problem_found TEXT,
  prompts_used JSONB DEFAULT '[]',
  design_journey TEXT,
  code_journey TEXT,
  launch_story TEXT,
  key_learnings TEXT,
  tools_used TEXT[] DEFAULT '{}',
  outcome TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on case_studies
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published case studies"
ON case_studies FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins can manage case studies"
ON case_studies FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create scholarship_codes table
CREATE TABLE IF NOT EXISTS scholarship_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  discount_amount NUMERIC DEFAULT 0,
  discount_type TEXT DEFAULT 'fixed' CHECK (discount_type IN ('fixed', 'percentage')),
  max_uses INTEGER DEFAULT 1000,
  current_uses INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  applicable_tiers TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on scholarship_codes
ALTER TABLE scholarship_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can validate scholarship codes"
ON scholarship_codes FOR SELECT
USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));

CREATE POLICY "Admins can manage scholarship codes"
ON scholarship_codes FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add new columns to pricing_tiers
ALTER TABLE pricing_tiers 
ADD COLUMN IF NOT EXISTS original_price NUMERIC,
ADD COLUMN IF NOT EXISTS current_price NUMERIC,
ADD COLUMN IF NOT EXISTS slug TEXT,
ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'b2c',
ADD COLUMN IF NOT EXISTS billing_period TEXT DEFAULT 'one-time',
ADD COLUMN IF NOT EXISTS trial_days INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS includes_yearly_access BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS certificates_included TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS min_students INTEGER,
ADD COLUMN IF NOT EXISTS max_students INTEGER,
ADD COLUMN IF NOT EXISTS badge_text TEXT;

-- Add unique constraint on slug if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pricing_tiers_slug_key') THEN
    ALTER TABLE pricing_tiers ADD CONSTRAINT pricing_tiers_slug_key UNIQUE (slug);
  END IF;
END $$;

-- Add new columns to students for tier tracking
ALTER TABLE students
ADD COLUMN IF NOT EXISTS pricing_tier_id UUID REFERENCES pricing_tiers(id),
ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS scholarship_code_used TEXT,
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'trial', 'expired', 'cancelled'));

-- Clear existing pricing tiers and insert new ones
DELETE FROM pricing_tiers;

-- Insert B2C tiers
INSERT INTO pricing_tiers (name, slug, type, original_price, current_price, upfront_price, monthly_price, billing_period, trial_days, includes_yearly_access, certificates_included, features, is_active, display_order, badge_text, tier_type, program, duration_months)
VALUES 
(
  'Revolution Start',
  'revolution-start',
  'b2c',
  39,
  9,
  9,
  0,
  'one-time',
  30,
  false,
  ARRAY['revolutionary'],
  '{"ai_coach_daily": 10, "tank_weekly": 3, "curriculum_access": "preview", "case_studies": false, "live_classes": false, "mentor_access": false}'::jsonb,
  true,
  1,
  NULL,
  'individual',
  'all',
  1
),
(
  'Yearly Founder',
  'yearly-founder',
  'b2c',
  NULL,
  99,
  99,
  29,
  'yearly',
  0,
  true,
  ARRAY['revolutionary', 'ai_founders'],
  '{"ai_coach_daily": 50, "tank_weekly": -1, "curriculum_access": "full", "case_studies": true, "live_classes": false, "mentor_access": false}'::jsonb,
  true,
  2,
  'RECOMMENDED',
  'individual',
  'all',
  12
),
(
  'Live Cohort',
  'live-cohort',
  'b2c',
  690,
  290,
  290,
  0,
  'one-time',
  0,
  true,
  ARRAY['revolutionary', 'ai_founders'],
  '{"ai_coach_daily": 50, "tank_weekly": -1, "curriculum_access": "full", "case_studies": true, "live_classes": true, "mentor_access": true}'::jsonb,
  true,
  3,
  'LIMITED OFFER',
  'individual',
  'all',
  12
),
-- Insert B2B tiers
(
  'Schools Pilot',
  'schools-pilot',
  'b2b',
  NULL,
  9,
  9,
  0,
  'one-time',
  30,
  false,
  ARRAY['revolutionary'],
  '{"ai_coach_daily": 10, "tank_weekly": 3, "curriculum_access": "preview", "case_studies": false, "live_classes": false, "mentor_access": false, "school_dashboard": true}'::jsonb,
  true,
  4,
  'PILOT',
  'school',
  'all',
  1
),
(
  'Schools Standard',
  'schools-standard',
  'b2b',
  NULL,
  45,
  45,
  0,
  'yearly',
  0,
  true,
  ARRAY['revolutionary', 'ai_founders'],
  '{"ai_coach_daily": 50, "tank_weekly": -1, "curriculum_access": "full", "case_studies": true, "live_classes": false, "mentor_access": false, "school_dashboard": true}'::jsonb,
  true,
  5,
  NULL,
  'school',
  'all',
  12
),
(
  'Schools Volume',
  'schools-volume',
  'b2b',
  NULL,
  35,
  35,
  0,
  'yearly',
  0,
  true,
  ARRAY['revolutionary', 'ai_founders'],
  '{"ai_coach_daily": 50, "tank_weekly": -1, "curriculum_access": "full", "case_studies": true, "live_classes": false, "mentor_access": false, "school_dashboard": true, "priority_support": true}'::jsonb,
  true,
  6,
  'BEST VALUE',
  'school',
  'all',
  12
),
(
  'Schools Enterprise',
  'schools-enterprise',
  'b2b',
  NULL,
  30,
  30,
  0,
  'yearly',
  0,
  true,
  ARRAY['revolutionary', 'ai_founders'],
  '{"ai_coach_daily": 50, "tank_weekly": -1, "curriculum_access": "full", "case_studies": true, "live_classes": true, "mentor_access": true, "school_dashboard": true, "priority_support": true, "custom_implementation": true}'::jsonb,
  true,
  7,
  'ENTERPRISE',
  'school',
  'all',
  12
);

-- Insert AI Founders Certificate
INSERT INTO certifications (name, slug, description, is_free, is_active, lessons_count, estimated_hours, badge_image_url)
VALUES (
  'AI Founders Certificate',
  'ai-founders-certificate',
  'Complete the full 12-week founder journey to earn your AI Founders Certificate. Demonstrates mastery of vibe coding, customer validation, product building, and pitching.',
  false,
  true,
  0,
  60,
  NULL
) ON CONFLICT (slug) DO NOTHING;

-- Seed 5 case studies
INSERT INTO case_studies (title, slug, student_name, student_age, program, problem_found, prompts_used, design_journey, code_journey, launch_story, key_learnings, tools_used, outcome, is_featured)
VALUES 
(
  'Pet Finder App',
  'pet-finder-app',
  'Maya',
  11,
  'junior',
  'My neighbor lost their cat and we spent 3 days putting up flyers. I thought there should be an app where people can post lost pets and others nearby can help look.',
  '[{"prompt": "Create a simple app where people can post photos of lost pets with their location and contact info", "tool": "Glide"}, {"prompt": "Add a map that shows all lost pets near me", "tool": "Glide"}, {"prompt": "Make a button that lets me share a lost pet post on WhatsApp", "tool": "Glide"}]'::jsonb,
  'I started by drawing my app on paper. I wanted a big button to post a lost pet and a map to see pets nearby. My mentor helped me pick colors that were bright and happy so people would want to use it.',
  'I used Glide because it was easy to connect to a spreadsheet. Every time someone posts a lost pet, it goes into my Google Sheet and shows up on the app automatically!',
  'I launched by showing my school and our neighborhood Facebook group. In the first week, 45 people signed up and we actually helped find 2 lost cats!',
  'I learned that you don''t need to know coding to make something useful. Also, talking to real users helped me make the app better - they wanted a "Found!" button I hadn''t thought of.',
  ARRAY['Glide', 'Google Sheets', 'Canva'],
  '45 users, 2 pets reunited in first week',
  true
),
(
  'Homework Helper Bot',
  'homework-helper-bot',
  'Alex',
  13,
  'teen',
  'My friends and I always get stuck on homework and our parents can''t always help. I wanted a tutor that''s available 24/7 and doesn''t judge you for asking "dumb" questions.',
  '[{"prompt": "You are a friendly homework tutor for middle schoolers. Explain concepts simply and encourage the student. Never give direct answers, instead guide them to figure it out themselves.", "tool": "ChatGPT"}, {"prompt": "Create a chat interface that looks like a messaging app with a friendly robot avatar", "tool": "Lovable"}]'::jsonb,
  'I wanted it to feel like texting a smart friend, not a boring tutor. I made the robot avatar cute and gave it a name - "Buddy". The chat bubbles are colorful.',
  'I built the frontend in Lovable and connected it to the ChatGPT API. The hardest part was making sure Buddy doesn''t just give answers but helps you think through problems.',
  'I showed it to my class and 23 students started using it. My teacher even mentioned it at a parent meeting! Now I''m thinking about adding subject-specific tutors.',
  'The biggest lesson was prompt engineering - getting AI to act exactly how you want takes lots of testing. Also, users give the best feedback.',
  ARRAY['ChatGPT API', 'Lovable', 'Figma'],
  '23 active users, featured by teacher',
  true
),
(
  'Eco Points Tracker',
  'eco-points-tracker',
  'Zara',
  14,
  'teen',
  'Our school started a recycling program but nobody was doing it. I thought if we made it a game with points and prizes, more kids would participate.',
  '[{"prompt": "Design a gamification system for recycling where students earn points for eco-friendly actions", "tool": "ChatGPT"}, {"prompt": "Create a leaderboard app that shows top recyclers this week with fun badges", "tool": "Bubble"}, {"prompt": "Generate badge icons for different eco achievements like ''Plastic Warrior'' and ''Paper Champion''", "tool": "Midjourney"}]'::jsonb,
  'I looked at games like Duolingo for inspiration. I wanted streaks, badges, and a leaderboard. The badges had to look cool enough that kids would want to collect them.',
  'I built it in Bubble because I needed user accounts and a real database. Teachers can scan a QR code to award points when they see someone recycling.',
  'We launched during Earth Week and 156 students signed up. Recycling went up 340% in the first month! The principal gave me an award at assembly.',
  'Gamification really works! Also, I learned to start small - I only had 3 ways to earn points at first, then added more based on what students asked for.',
  ARRAY['Bubble', 'ChatGPT', 'Midjourney', 'Canva'],
  '156 users, 340% increase in recycling',
  true
),
(
  'Language Exchange Matcher',
  'language-exchange-matcher',
  'Jin',
  15,
  'advanced',
  'I''m learning Spanish and my friend is learning Korean. We realized we could teach each other! But how do you find language exchange partners in your timezone who are your age?',
  '[{"prompt": "Build a matching algorithm that pairs users based on: languages they know, languages they want to learn, timezone, and age range", "tool": "Claude"}, {"prompt": "Create a modern, Tinder-style swipe interface for matching with potential language partners", "tool": "Lovable"}, {"prompt": "Generate a video call integration using Daily.co API", "tool": "Cursor"}]'::jsonb,
  'The UX had to be super simple - swipe right if you want to practice with someone, left if not. I used gradients and language flag icons to make it visually interesting.',
  'This was my most complex app. I used Lovable for the frontend, Supabase for the database and auth, and integrated Daily.co for video calls. The matching algorithm runs as an edge function.',
  'I posted on Reddit''s language learning communities and got 89 signups in the first 48 hours. Users from 12 different countries! Some partnerships have been going for 3 months now.',
  'Building for a global audience is hard - timezones, age verification, safety for minors. I had to add parent consent flows and reporting features. Also learned about product-market fit.',
  ARRAY['Lovable', 'Supabase', 'Daily.co', 'Cursor', 'Claude'],
  '89 users from 12 countries, lasting partnerships formed',
  true
),
(
  'Local Business Review App',
  'local-business-review',
  'Priya',
  16,
  'advanced',
  'Big review sites like Yelp are full of fake reviews and don''t feature small local businesses. My town has amazing family shops that nobody knows about.',
  '[{"prompt": "Create a review platform that verifies reviewers actually visited the business using location data and receipt uploads", "tool": "ChatGPT"}, {"prompt": "Build a mobile-first PWA with a beautiful card-based design for browsing local businesses", "tool": "Lovable"}, {"prompt": "Implement a receipt scanning feature using OCR to verify purchases", "tool": "Claude"}]'::jsonb,
  'I wanted it to feel premium and trustworthy. Used lots of photography, clean typography, and a verification badge system. Each business gets a beautiful profile page.',
  'Built as a PWA in Lovable with Supabase backend. The receipt verification uses an AI vision model to extract store name and date. Added Stripe so businesses can claim their profiles.',
  'I partnered with our local Chamber of Commerce who promoted it to all their members. 34 businesses are now on the platform and we have 200+ verified reviews.',
  'B2B is different from B2C - businesses want analytics and ways to respond to reviews. Also learned about monetization - businesses will pay for premium features that help them.',
  ARRAY['Lovable', 'Supabase', 'Stripe', 'Claude Vision', 'Mapbox'],
  '34 businesses, 200+ verified reviews, $500 MRR from premium profiles',
  true
);

-- Create trigger for updating pricing_tiers updated_at
CREATE OR REPLACE FUNCTION update_pricing_tier_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_pricing_tiers_timestamp ON pricing_tiers;
CREATE TRIGGER update_pricing_tiers_timestamp
BEFORE UPDATE ON pricing_tiers
FOR EACH ROW
EXECUTE FUNCTION update_pricing_tier_timestamp();
