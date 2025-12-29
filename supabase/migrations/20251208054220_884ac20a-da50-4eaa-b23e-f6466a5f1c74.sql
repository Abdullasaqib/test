-- =============================================
-- PHASE 1: Fix Critical RLS INSERT Policies
-- =============================================

-- 1. Applications: Add validation for public inserts
DROP POLICY IF EXISTS "Anyone can create applications" ON applications;
CREATE POLICY "Validated application creation" ON applications
FOR INSERT TO public
WITH CHECK (
  -- Must provide valid email matching pattern
  email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND length(founder_name) <= 100
  AND length(email) <= 255
  AND length(startup_name) <= 200
  AND length(problem_statement) <= 5000
  AND length(solution_description) <= 5000
  AND length(pitch_description) <= 5000
  AND age >= 5 AND age <= 25
);

-- 2. Leads: Add validation for public inserts
DROP POLICY IF EXISTS "Anyone can create leads" ON leads;
CREATE POLICY "Validated lead creation" ON leads
FOR INSERT TO public
WITH CHECK (
  email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND length(email) <= 255
  AND (name IS NULL OR length(name) <= 100)
  AND (source IS NULL OR length(source) <= 50)
);

-- 3. Students: Require matching user_id (must be authenticated)
DROP POLICY IF EXISTS "Users can create their own student profile" ON students;
CREATE POLICY "Users can create their own student profile" ON students
FOR INSERT TO authenticated
WITH CHECK (
  user_id = auth.uid()
  AND length(full_name) <= 100
);

-- 4. Student Missions: Validate ownership via student lookup
DROP POLICY IF EXISTS "Students can insert own missions" ON student_missions;
CREATE POLICY "Students can insert own missions" ON student_missions
FOR INSERT TO authenticated
WITH CHECK (
  student_id IN (SELECT id FROM students WHERE user_id = auth.uid())
);

-- 5. Pitch Attempts: Add is_public column for opt-in leaderboard
ALTER TABLE pitch_attempts ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;

-- Fix pitch attempts INSERT policy
DROP POLICY IF EXISTS "Students can create own pitch attempts" ON pitch_attempts;
CREATE POLICY "Students can create own pitch attempts" ON pitch_attempts
FOR INSERT TO authenticated
WITH CHECK (
  student_id IN (SELECT id FROM students WHERE user_id = auth.uid())
);

-- Fix pitch attempts SELECT policy for leaderboard privacy
DROP POLICY IF EXISTS "Students can view all pitch attempts for leaderboard" ON pitch_attempts;
CREATE POLICY "Students can view pitch attempts" ON pitch_attempts
FOR SELECT TO authenticated
USING (
  -- Own attempts: see everything
  student_id IN (SELECT id FROM students WHERE user_id = auth.uid())
  -- Other attempts: only if they're marked for public leaderboard
  OR is_public = true
  -- Admins can see all
  OR public.has_role(auth.uid(), 'admin')
);

-- =============================================
-- PHASE 2: Fix Functions Missing search_path
-- =============================================

-- Fix update_pricing_tier_timestamp
CREATE OR REPLACE FUNCTION public.update_pricing_tier_timestamp()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- =============================================
-- PHASE 3: Add Performance Indexes
-- =============================================

-- Student missions: common query pattern
CREATE INDEX IF NOT EXISTS idx_student_missions_student_status 
ON student_missions(student_id, status);

CREATE INDEX IF NOT EXISTS idx_student_missions_updated 
ON student_missions(updated_at DESC);

-- AI usage: rate limit queries
CREATE INDEX IF NOT EXISTS idx_ai_usage_student_feature_created 
ON student_ai_usage(student_id, feature, created_at DESC);

-- Sales conversations: lead lookup
CREATE INDEX IF NOT EXISTS idx_sales_conversations_lead 
ON sales_conversations(lead_id, created_at DESC);

-- Leads: scoring and status
CREATE INDEX IF NOT EXISTS idx_leads_score_status 
ON leads(lead_score DESC, status);

-- Pitch attempts: leaderboard queries
CREATE INDEX IF NOT EXISTS idx_pitch_attempts_public_score
ON pitch_attempts(is_public, score DESC) WHERE is_public = true;