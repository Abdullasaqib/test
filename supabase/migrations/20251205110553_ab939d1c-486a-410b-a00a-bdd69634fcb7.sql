-- Create student AI usage tracking table
CREATE TABLE public.student_ai_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  feature TEXT NOT NULL, -- 'landing_page', 'pitch_deck', 'ai_coach', 'stuck_prompt'
  tokens_input INTEGER DEFAULT 0,
  tokens_output INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for efficient queries
CREATE INDEX idx_student_ai_usage_student ON public.student_ai_usage(student_id);
CREATE INDEX idx_student_ai_usage_feature ON public.student_ai_usage(feature);
CREATE INDEX idx_student_ai_usage_created ON public.student_ai_usage(created_at);
CREATE INDEX idx_student_ai_usage_student_feature_date ON public.student_ai_usage(student_id, feature, created_at);

-- Enable RLS
ALTER TABLE public.student_ai_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Students can view own AI usage"
ON public.student_ai_usage
FOR SELECT
USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students can insert own AI usage"
ON public.student_ai_usage
FOR INSERT
WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Admins can view all AI usage"
ON public.student_ai_usage
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Service role can insert AI usage"
ON public.student_ai_usage
FOR INSERT
WITH CHECK (true);

-- Create AI rate limits configuration table
CREATE TABLE public.ai_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature TEXT NOT NULL UNIQUE,
  daily_limit INTEGER DEFAULT 10,
  weekly_limit INTEGER DEFAULT 30,
  monthly_limit INTEGER DEFAULT 100,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ai_rate_limits ENABLE ROW LEVEL SECURITY;

-- Anyone can view rate limits
CREATE POLICY "Anyone can view rate limits"
ON public.ai_rate_limits
FOR SELECT
USING (true);

-- Only admins can manage rate limits
CREATE POLICY "Admins can manage rate limits"
ON public.ai_rate_limits
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert default rate limits
INSERT INTO public.ai_rate_limits (feature, daily_limit, weekly_limit, monthly_limit) VALUES
  ('landing_page', 3, 10, 30),
  ('pitch_deck', 3, 10, 30),
  ('ai_coach', 20, 100, 500),
  ('stuck_prompt', 10, 50, 200);

-- Function to check if student is within rate limit
CREATE OR REPLACE FUNCTION public.check_ai_rate_limit(
  p_student_id UUID,
  p_feature TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_limits RECORD;
  v_daily_count INTEGER;
  v_weekly_count INTEGER;
  v_monthly_count INTEGER;
  v_result JSONB;
BEGIN
  -- Get rate limits for this feature
  SELECT * INTO v_limits FROM ai_rate_limits WHERE feature = p_feature AND is_active = true;
  
  IF NOT FOUND THEN
    -- No limits configured, allow
    RETURN jsonb_build_object('allowed', true, 'reason', 'no_limits_configured');
  END IF;
  
  -- Count usage
  SELECT COUNT(*) INTO v_daily_count
  FROM student_ai_usage
  WHERE student_id = p_student_id
    AND feature = p_feature
    AND created_at > now() - interval '1 day';
    
  SELECT COUNT(*) INTO v_weekly_count
  FROM student_ai_usage
  WHERE student_id = p_student_id
    AND feature = p_feature
    AND created_at > now() - interval '7 days';
    
  SELECT COUNT(*) INTO v_monthly_count
  FROM student_ai_usage
  WHERE student_id = p_student_id
    AND feature = p_feature
    AND created_at > now() - interval '30 days';
  
  -- Check limits
  IF v_daily_count >= v_limits.daily_limit THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'reason', 'daily_limit_reached',
      'limit', v_limits.daily_limit,
      'used', v_daily_count,
      'resets_in', 'tomorrow'
    );
  END IF;
  
  IF v_weekly_count >= v_limits.weekly_limit THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'reason', 'weekly_limit_reached',
      'limit', v_limits.weekly_limit,
      'used', v_weekly_count,
      'resets_in', 'next week'
    );
  END IF;
  
  IF v_monthly_count >= v_limits.monthly_limit THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'reason', 'monthly_limit_reached',
      'limit', v_limits.monthly_limit,
      'used', v_monthly_count,
      'resets_in', 'next month'
    );
  END IF;
  
  -- All checks passed
  RETURN jsonb_build_object(
    'allowed', true,
    'daily_remaining', v_limits.daily_limit - v_daily_count,
    'weekly_remaining', v_limits.weekly_limit - v_weekly_count,
    'monthly_remaining', v_limits.monthly_limit - v_monthly_count
  );
END;
$$;