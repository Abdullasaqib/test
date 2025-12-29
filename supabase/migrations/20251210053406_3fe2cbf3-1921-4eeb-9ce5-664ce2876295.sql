-- Add new columns to case_studies for showcase consolidation
ALTER TABLE public.case_studies 
ADD COLUMN IF NOT EXISTS users_count integer DEFAULT NULL,
ADD COLUMN IF NOT EXISTS users_context text DEFAULT NULL,
ADD COLUMN IF NOT EXISTS is_project_of_week boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS problem_story text DEFAULT NULL,
ADD COLUMN IF NOT EXISTS build_journey text DEFAULT NULL,
ADD COLUMN IF NOT EXISTS outcome_story text DEFAULT NULL,
ADD COLUMN IF NOT EXISTS creator_quote text DEFAULT NULL,
ADD COLUMN IF NOT EXISTS story_depth text DEFAULT 'full',
ADD COLUMN IF NOT EXISTS display_order integer DEFAULT 0;

-- Migrate data from showcase_projects to case_studies
INSERT INTO public.case_studies (
  title, slug, student_name, student_age, program, thumbnail_url,
  problem_found, outcome, tools_used, is_featured, is_published,
  users_count, is_project_of_week, problem_story,
  build_journey, outcome_story, creator_quote, story_depth, display_order
)
SELECT 
  sp.title,
  LOWER(REPLACE(REPLACE(sp.title, ' ', '-'), '''', '')) as slug,
  sp.student_name,
  sp.student_age,
  COALESCE(sp.student_program, 'teen'),
  sp.thumbnail_url,
  sp.problem_story as problem_found,
  sp.outcome_story as outcome,
  sp.tools_used,
  sp.is_featured,
  true as is_published,
  sp.users_count,
  sp.is_project_of_week,
  sp.problem_story,
  sp.build_journey,
  sp.outcome_story,
  sp.creator_quote,
  'quick' as story_depth,
  sp.display_order
FROM public.showcase_projects sp
WHERE NOT EXISTS (
  SELECT 1 FROM public.case_studies cs 
  WHERE LOWER(cs.title) = LOWER(sp.title)
);

-- Update existing case_studies to have story_depth = 'full' if not set
UPDATE public.case_studies 
SET story_depth = 'full' 
WHERE story_depth IS NULL OR story_depth = '';

-- Drop the showcase_projects table
DROP TABLE IF EXISTS public.showcase_projects;