-- Create industry_tracks table
CREATE TABLE public.industry_tracks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL,
  description TEXT NOT NULL,
  color_theme TEXT NOT NULL DEFAULT 'orange',
  hero_image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  target_age_range TEXT DEFAULT 'all',
  skill_focus_areas JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.industry_tracks ENABLE ROW LEVEL SECURITY;

-- Anyone can view active tracks
CREATE POLICY "Anyone can view active industry tracks"
ON public.industry_tracks FOR SELECT
USING (is_active = true);

-- Admins can manage tracks
CREATE POLICY "Admins can manage industry tracks"
ON public.industry_tracks FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add pillar and industry_track_id to challenges
ALTER TABLE public.challenges 
ADD COLUMN IF NOT EXISTS pillar TEXT CHECK (pillar IN ('discover', 'design', 'build', 'explore')),
ADD COLUMN IF NOT EXISTS industry_track_id UUID REFERENCES public.industry_tracks(id),
ADD COLUMN IF NOT EXISTS real_world_context JSONB DEFAULT '{}'::jsonb;

-- Create student_track_interests table
CREATE TABLE public.student_track_interests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  track_id UUID NOT NULL REFERENCES public.industry_tracks(id) ON DELETE CASCADE,
  interest_level INTEGER DEFAULT 3 CHECK (interest_level >= 1 AND interest_level <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(student_id, track_id)
);

ALTER TABLE public.student_track_interests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can manage own track interests"
ON public.student_track_interests FOR ALL
USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

-- Create student_track_progress table
CREATE TABLE public.student_track_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  track_id UUID NOT NULL REFERENCES public.industry_tracks(id) ON DELETE CASCADE,
  challenges_completed INTEGER DEFAULT 0,
  discover_completed INTEGER DEFAULT 0,
  design_completed INTEGER DEFAULT 0,
  build_completed INTEGER DEFAULT 0,
  explore_completed INTEGER DEFAULT 0,
  total_xp INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(student_id, track_id)
);

ALTER TABLE public.student_track_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can manage own track progress"
ON public.student_track_progress FOR ALL
USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

-- Seed 5 industry tracks
INSERT INTO public.industry_tracks (name, slug, icon, description, color_theme, display_order, skill_focus_areas) VALUES
('AI + Healthcare', 'healthcare', '🏥', 'Healing the Future — Discover how AI is revolutionizing medicine, from diagnosing diseases to creating personalized treatments. Build solutions that save lives.', 'emerald', 1, '["Problem Solving", "Empathy", "Data Analysis", "Innovation"]'::jsonb),
('AI + Sustainability', 'sustainability', '🌱', 'Building a Greener World — Explore how AI tackles climate change, optimizes energy, and creates sustainable solutions. Every challenge helps protect our planet.', 'green', 2, '["Systems Thinking", "Environmental Awareness", "Resource Optimization", "Future Planning"]'::jsonb),
('AI + Fashion & Retail', 'fashion', '👗', 'Style Meets Technology — From personalized shopping to sustainable fashion, discover how AI is transforming what we wear and how we buy.', 'pink', 3, '["Trend Analysis", "Customer Empathy", "Creative Problem Solving", "Market Understanding"]'::jsonb),
('AI + Aviation & Events', 'aviation', '✈️', 'Sky''s Not the Limit — Explore the technology behind Dubai''s drone shows, smart airports, and the future of travel and entertainment.', 'blue', 4, '["Logistics", "Safety Planning", "Innovation", "Spectacle Design"]'::jsonb),
('AI + Gaming & Entertainment', 'gaming', '🎮', 'Play, Create, Inspire — Dive into how AI creates games, recommends content, and builds immersive experiences that bring joy to billions.', 'purple', 5, '["User Experience", "Engagement Design", "Creative Thinking", "Technical Innovation"]'::jsonb);

-- Update existing challenges to have pillars
UPDATE public.challenges SET pillar = 
  CASE category
    WHEN 'decision' THEN 'design'
    WHEN 'scenario' THEN 'discover'
    WHEN 'thought' THEN 'explore'
  END
WHERE pillar IS NULL;