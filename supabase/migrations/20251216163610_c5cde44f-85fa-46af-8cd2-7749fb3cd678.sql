-- Create learning_objectives table for measurable outcomes
CREATE TABLE public.learning_objectives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_type TEXT NOT NULL CHECK (certificate_type IN ('ai_foundations', 'ai_builder', 'ai_launcher')),
  phase INTEGER, -- 1-5 for AI Builder, NULL for Foundations
  week INTEGER, -- 1-12 for AI Builder, NULL for Foundations  
  lesson_id UUID REFERENCES certification_lessons(id) ON DELETE CASCADE, -- For AI Foundations
  objective TEXT NOT NULL,
  measurable_outcome TEXT NOT NULL,
  bloom_level TEXT CHECK (bloom_level IN ('remember', 'understand', 'apply', 'analyze', 'evaluate', 'create')),
  skill_category TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.learning_objectives ENABLE ROW LEVEL SECURITY;

-- Anyone can view learning objectives (public educational content)
CREATE POLICY "Anyone can view learning objectives"
ON public.learning_objectives
FOR SELECT
USING (is_active = true);

-- Admins can manage learning objectives
CREATE POLICY "Admins can manage learning objectives"
ON public.learning_objectives
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add indexes for common queries
CREATE INDEX idx_learning_objectives_certificate ON public.learning_objectives(certificate_type);
CREATE INDEX idx_learning_objectives_week ON public.learning_objectives(week);
CREATE INDEX idx_learning_objectives_lesson ON public.learning_objectives(lesson_id);

-- Add trigger for updated_at
CREATE TRIGGER update_learning_objectives_updated_at
BEFORE UPDATE ON public.learning_objectives
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();