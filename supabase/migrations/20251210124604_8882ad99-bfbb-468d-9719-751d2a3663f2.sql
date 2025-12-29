-- Create lesson_sprints table for micro-sprint architecture
CREATE TABLE public.lesson_sprints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID NOT NULL REFERENCES public.certification_lessons(id) ON DELETE CASCADE,
  sprint_order INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  estimated_seconds INTEGER NOT NULL DEFAULT 60,
  quiz_questions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.lesson_sprints ENABLE ROW LEVEL SECURITY;

-- Anyone can view sprints (lessons are already public)
CREATE POLICY "Anyone can view lesson sprints" 
ON public.lesson_sprints 
FOR SELECT 
USING (true);

-- Admins can manage sprints
CREATE POLICY "Admins can manage lesson sprints" 
ON public.lesson_sprints 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create sprint_progress table to track individual sprint completion
CREATE TABLE public.sprint_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  sprint_id UUID NOT NULL REFERENCES public.lesson_sprints(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  quiz_score INTEGER,
  UNIQUE(student_id, sprint_id)
);

-- Enable RLS
ALTER TABLE public.sprint_progress ENABLE ROW LEVEL SECURITY;

-- Students can view own progress
CREATE POLICY "Students can view own sprint progress" 
ON public.sprint_progress 
FOR SELECT 
USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

-- Students can track own progress
CREATE POLICY "Students can track own sprint progress" 
ON public.sprint_progress 
FOR INSERT 
WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

-- Students can update own progress
CREATE POLICY "Students can update own sprint progress" 
ON public.sprint_progress 
FOR UPDATE 
USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

-- Admins can manage all progress
CREATE POLICY "Admins can manage all sprint progress" 
ON public.sprint_progress 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add sprint_count to certification_lessons
ALTER TABLE public.certification_lessons ADD COLUMN IF NOT EXISTS sprint_count INTEGER DEFAULT 0;

-- Create indexes for performance
CREATE INDEX idx_lesson_sprints_lesson_id ON public.lesson_sprints(lesson_id);
CREATE INDEX idx_lesson_sprints_order ON public.lesson_sprints(lesson_id, sprint_order);
CREATE INDEX idx_sprint_progress_student ON public.sprint_progress(student_id);
CREATE INDEX idx_sprint_progress_sprint ON public.sprint_progress(sprint_id);