
-- Add research framework tags to existing tables
ALTER TABLE public.challenges ADD COLUMN IF NOT EXISTS bloom_level text;
ALTER TABLE public.challenges ADD COLUMN IF NOT EXISTS learning_framework text;

ALTER TABLE public.mission_sprints ADD COLUMN IF NOT EXISTS bloom_level text;
ALTER TABLE public.mission_sprints ADD COLUMN IF NOT EXISTS learning_framework text;

ALTER TABLE public.lesson_sprints ADD COLUMN IF NOT EXISTS bloom_level text;
ALTER TABLE public.lesson_sprints ADD COLUMN IF NOT EXISTS learning_framework text;

-- Create industry_certifications table (parent for industry tracks)
CREATE TABLE public.industry_certifications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  icon text NOT NULL,
  color_theme text NOT NULL DEFAULT 'blue',
  hero_image_url text,
  prerequisites text[] DEFAULT '{}',
  modules_count integer DEFAULT 6,
  estimated_hours numeric DEFAULT 8,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  skill_focus_areas jsonb DEFAULT '[]',
  career_paths jsonb DEFAULT '[]',
  real_world_companies jsonb DEFAULT '[]',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create industry_modules table
CREATE TABLE public.industry_modules (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  certification_id uuid NOT NULL REFERENCES public.industry_certifications(id) ON DELETE CASCADE,
  module_number integer NOT NULL,
  title text NOT NULL,
  description text,
  learning_objectives text[] DEFAULT '{}',
  bloom_levels text[] DEFAULT '{}',
  sprints_count integer DEFAULT 5,
  estimated_minutes integer DEFAULT 30,
  case_study_company text,
  case_study_description text,
  created_at timestamp with time zone DEFAULT now()
);

-- Create industry_sprints table
CREATE TABLE public.industry_sprints (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id uuid NOT NULL REFERENCES public.industry_modules(id) ON DELETE CASCADE,
  sprint_number integer NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  bloom_level text,
  learning_framework text,
  quiz_questions jsonb DEFAULT '[]',
  reflection_prompt text,
  real_world_example text,
  estimated_seconds integer DEFAULT 90,
  created_at timestamp with time zone DEFAULT now()
);

-- Create student_industry_progress table
CREATE TABLE public.student_industry_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  certification_id uuid NOT NULL REFERENCES public.industry_certifications(id) ON DELETE CASCADE,
  modules_completed integer DEFAULT 0,
  sprints_completed integer DEFAULT 0,
  current_module_id uuid REFERENCES public.industry_modules(id),
  started_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  certificate_number text,
  UNIQUE(student_id, certification_id)
);

-- Create student_industry_sprint_progress table
CREATE TABLE public.student_industry_sprint_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  sprint_id uuid NOT NULL REFERENCES public.industry_sprints(id) ON DELETE CASCADE,
  completed_at timestamp with time zone DEFAULT now(),
  quiz_score integer,
  UNIQUE(student_id, sprint_id)
);

-- Enable RLS
ALTER TABLE public.industry_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_sprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_industry_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_industry_sprint_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for industry_certifications (public read for active)
CREATE POLICY "Anyone can view active industry certifications" ON public.industry_certifications
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage industry certifications" ON public.industry_certifications
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for industry_modules (enrolled students only)
CREATE POLICY "Enrolled students can view industry modules" ON public.industry_modules
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM students s
      JOIN enrollments e ON e.student_id = s.id
      WHERE s.user_id = auth.uid()
      AND e.status IN ('active', 'trial')
    )
  );

CREATE POLICY "Admins can manage industry modules" ON public.industry_modules
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for industry_sprints (enrolled students only)
CREATE POLICY "Enrolled students can view industry sprints" ON public.industry_sprints
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM students s
      JOIN enrollments e ON e.student_id = s.id
      WHERE s.user_id = auth.uid()
      AND e.status IN ('active', 'trial')
    )
  );

CREATE POLICY "Admins can manage industry sprints" ON public.industry_sprints
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for student_industry_progress
CREATE POLICY "Students can view own industry progress" ON public.student_industry_progress
  FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students can create own industry progress" ON public.student_industry_progress
  FOR INSERT WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students can update own industry progress" ON public.student_industry_progress
  FOR UPDATE USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage all industry progress" ON public.student_industry_progress
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for student_industry_sprint_progress
CREATE POLICY "Students can view own sprint progress" ON public.student_industry_sprint_progress
  FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students can create own sprint progress" ON public.student_industry_sprint_progress
  FOR INSERT WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage all sprint progress" ON public.student_industry_sprint_progress
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Create indexes for performance
CREATE INDEX idx_industry_modules_certification ON public.industry_modules(certification_id);
CREATE INDEX idx_industry_sprints_module ON public.industry_sprints(module_id);
CREATE INDEX idx_student_industry_progress_student ON public.student_industry_progress(student_id);
CREATE INDEX idx_student_industry_sprint_progress_student ON public.student_industry_sprint_progress(student_id);
