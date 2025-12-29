-- Create certification_lesson_sprints table for age-adaptive content
CREATE TABLE IF NOT EXISTS public.certification_lesson_sprints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID NOT NULL REFERENCES public.certification_lessons(id) ON DELETE CASCADE,
  sprint_order INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  age_track TEXT NOT NULL DEFAULT 'all' CHECK (age_track IN ('explorer', 'builder', 'founder', 'all')),
  estimated_seconds INTEGER NOT NULL DEFAULT 90,
  quiz_questions JSONB DEFAULT '[]'::jsonb,
  is_advanced_technique BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create unique constraint for lesson + sprint_order + age_track
CREATE UNIQUE INDEX IF NOT EXISTS idx_lesson_sprint_track ON public.certification_lesson_sprints(lesson_id, sprint_order, age_track);

-- Enable RLS
ALTER TABLE public.certification_lesson_sprints ENABLE ROW LEVEL SECURITY;

-- Anyone can view sprints
CREATE POLICY "Anyone can view lesson sprints"
ON public.certification_lesson_sprints
FOR SELECT
USING (true);

-- Admins can manage sprints
CREATE POLICY "Admins can manage lesson sprints"
ON public.certification_lesson_sprints
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));