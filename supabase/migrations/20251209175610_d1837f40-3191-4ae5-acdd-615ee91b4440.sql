-- Add new columns to showcase_projects for Hall of Young Founders
ALTER TABLE public.showcase_projects 
ADD COLUMN IF NOT EXISTS creator_photo_url text,
ADD COLUMN IF NOT EXISTS problem_story text,
ADD COLUMN IF NOT EXISTS build_journey text,
ADD COLUMN IF NOT EXISTS outcome_story text,
ADD COLUMN IF NOT EXISTS creator_quote text,
ADD COLUMN IF NOT EXISTS users_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_project_of_week boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS demo_embed_url text;

-- Add comment for clarity
COMMENT ON COLUMN public.showcase_projects.problem_story IS 'Why I built this - in student own words';
COMMENT ON COLUMN public.showcase_projects.build_journey IS 'How I made it - the building story';
COMMENT ON COLUMN public.showcase_projects.outcome_story IS 'What happened after launch';
COMMENT ON COLUMN public.showcase_projects.creator_quote IS 'One-liner testimonial from student';
COMMENT ON COLUMN public.showcase_projects.is_project_of_week IS 'Featured as project of the week';