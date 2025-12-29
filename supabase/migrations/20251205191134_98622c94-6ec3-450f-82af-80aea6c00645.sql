-- Create curriculum evaluations table
CREATE TABLE public.curriculum_evaluations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mission_id UUID REFERENCES public.missions(id) ON DELETE CASCADE,
  overall_score INTEGER DEFAULT 0,
  skill_value_score INTEGER DEFAULT 0,
  privacy_score INTEGER DEFAULT 0,
  ai_integration_score INTEGER DEFAULT 0,
  artifact_score INTEGER DEFAULT 0,
  time_efficiency_score INTEGER DEFAULT 0,
  progression_score INTEGER DEFAULT 0,
  age_appropriateness_score INTEGER DEFAULT 0,
  learning_outcome_score INTEGER DEFAULT 0,
  flags JSONB DEFAULT '[]',
  suggestions JSONB DEFAULT '[]',
  improved_version JSONB DEFAULT NULL,
  evaluated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  evaluated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(mission_id)
);

-- Enable RLS
ALTER TABLE public.curriculum_evaluations ENABLE ROW LEVEL SECURITY;

-- Admin-only access
CREATE POLICY "Admins can manage curriculum evaluations"
ON public.curriculum_evaluations
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster lookups
CREATE INDEX idx_curriculum_evaluations_mission ON public.curriculum_evaluations(mission_id);
CREATE INDEX idx_curriculum_evaluations_overall_score ON public.curriculum_evaluations(overall_score);