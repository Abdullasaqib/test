-- Create challenges table for daily sprint challenges
CREATE TABLE public.challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  scenario TEXT NOT NULL,
  question TEXT NOT NULL,
  success_criteria JSONB NOT NULL DEFAULT '[]'::jsonb,
  category TEXT NOT NULL CHECK (category IN ('decision', 'scenario', 'thought')),
  difficulty_level TEXT NOT NULL DEFAULT 'medium' CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
  estimated_minutes INTEGER NOT NULL DEFAULT 3 CHECK (estimated_minutes BETWEEN 1 AND 10),
  age_range TEXT NOT NULL DEFAULT 'teen' CHECK (age_range IN ('junior', 'teen', 'advanced', 'all')),
  skills_developed JSONB NOT NULL DEFAULT '[]'::jsonb,
  xp_reward INTEGER NOT NULL DEFAULT 25,
  is_active BOOLEAN DEFAULT true,
  is_daily_eligible BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create challenge_attempts table
CREATE TABLE public.challenge_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  response TEXT NOT NULL,
  score INTEGER CHECK (score BETWEEN 0 AND 100),
  ai_feedback TEXT,
  skills_awarded JSONB DEFAULT '[]'::jsonb,
  xp_earned INTEGER DEFAULT 0,
  time_spent_seconds INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create student_streaks table
CREATE TABLE public.student_streaks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE UNIQUE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_challenge_date DATE,
  total_challenges_completed INTEGER NOT NULL DEFAULT 0,
  total_xp_earned INTEGER NOT NULL DEFAULT 0,
  streak_freezes_available INTEGER NOT NULL DEFAULT 1,
  streak_frozen_until DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_streaks ENABLE ROW LEVEL SECURITY;

-- Challenges policies (anyone can view active challenges)
CREATE POLICY "Anyone can view active challenges"
  ON public.challenges FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage challenges"
  ON public.challenges FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Challenge attempts policies
CREATE POLICY "Students can view own attempts"
  ON public.challenge_attempts FOR SELECT
  USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students can create own attempts"
  ON public.challenge_attempts FOR INSERT
  WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Admins can view all attempts"
  ON public.challenge_attempts FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Student streaks policies
CREATE POLICY "Students can view own streak"
  ON public.student_streaks FOR SELECT
  USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students can manage own streak"
  ON public.student_streaks FOR ALL
  USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Admins can view all streaks"
  ON public.student_streaks FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create indexes
CREATE INDEX idx_challenges_category ON public.challenges(category);
CREATE INDEX idx_challenges_age_range ON public.challenges(age_range);
CREATE INDEX idx_challenges_daily_eligible ON public.challenges(is_daily_eligible) WHERE is_active = true;
CREATE INDEX idx_challenge_attempts_student ON public.challenge_attempts(student_id);
CREATE INDEX idx_challenge_attempts_challenge ON public.challenge_attempts(challenge_id);
CREATE INDEX idx_challenge_attempts_completed ON public.challenge_attempts(completed_at);
CREATE INDEX idx_student_streaks_student ON public.student_streaks(student_id);

-- Trigger for updated_at
CREATE TRIGGER update_challenges_updated_at
  BEFORE UPDATE ON public.challenges
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_student_streaks_updated_at
  BEFORE UPDATE ON public.student_streaks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();