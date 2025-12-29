-- Create mission_sprints table for micro-sprint content
CREATE TABLE public.mission_sprints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mission_id UUID NOT NULL REFERENCES public.missions(id) ON DELETE CASCADE,
  sprint_order INTEGER NOT NULL,
  sprint_type TEXT NOT NULL DEFAULT 'content' CHECK (sprint_type IN ('content', 'quiz', 'lab', 'reflection')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  estimated_seconds INTEGER NOT NULL DEFAULT 60,
  quiz_questions JSONB DEFAULT '[]'::jsonb,
  lab_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create mission_sprint_progress table for tracking student progress
CREATE TABLE public.mission_sprint_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  sprint_id UUID NOT NULL REFERENCES public.mission_sprints(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  quiz_score INTEGER,
  time_spent_seconds INTEGER,
  UNIQUE(student_id, sprint_id)
);

-- Add sprint_count column to missions table
ALTER TABLE public.missions ADD COLUMN IF NOT EXISTS sprint_count INTEGER DEFAULT 0;

-- Enable RLS
ALTER TABLE public.mission_sprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mission_sprint_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for mission_sprints
CREATE POLICY "Anyone can view mission sprints" ON public.mission_sprints
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage mission sprints" ON public.mission_sprints
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for mission_sprint_progress
CREATE POLICY "Students can view own sprint progress" ON public.mission_sprint_progress
  FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students can track own sprint progress" ON public.mission_sprint_progress
  FOR INSERT WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students can update own sprint progress" ON public.mission_sprint_progress
  FOR UPDATE USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage all sprint progress" ON public.mission_sprint_progress
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Create indexes for performance
CREATE INDEX idx_mission_sprints_mission_id ON public.mission_sprints(mission_id);
CREATE INDEX idx_mission_sprints_order ON public.mission_sprints(mission_id, sprint_order);
CREATE INDEX idx_mission_sprint_progress_student ON public.mission_sprint_progress(student_id);
CREATE INDEX idx_mission_sprint_progress_sprint ON public.mission_sprint_progress(sprint_id);