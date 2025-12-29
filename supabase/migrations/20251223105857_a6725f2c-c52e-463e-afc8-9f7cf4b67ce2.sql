-- Create admin activity log table
CREATE TABLE public.admin_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  event_category TEXT NOT NULL,
  actor_id UUID,
  actor_name TEXT,
  actor_type TEXT DEFAULT 'system',
  entity_id UUID,
  entity_type TEXT,
  entity_name TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  school_id UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for fast queries
CREATE INDEX idx_activity_log_created ON public.admin_activity_log(created_at DESC);
CREATE INDEX idx_activity_log_category ON public.admin_activity_log(event_category);
CREATE INDEX idx_activity_log_school ON public.admin_activity_log(school_id);
CREATE INDEX idx_activity_log_event_type ON public.admin_activity_log(event_type);

-- Enable RLS
ALTER TABLE public.admin_activity_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view activity log
CREATE POLICY "Admins can manage activity log"
ON public.admin_activity_log
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Enable realtime for activity log
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_activity_log;

-- Trigger function for student signup
CREATE OR REPLACE FUNCTION public.log_student_signup()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.admin_activity_log (
    event_type, event_category, actor_id, actor_name, actor_type,
    entity_id, entity_type, entity_name, metadata, school_id
  ) VALUES (
    'student_signup',
    'student',
    NEW.user_id,
    NEW.full_name,
    'student',
    NEW.id,
    'student',
    NEW.full_name,
    jsonb_build_object('program', NEW.program, 'age', NEW.age),
    NEW.school_id
  );
  RETURN NEW;
END;
$$;

-- Trigger for student signup
CREATE TRIGGER on_student_signup
  AFTER INSERT ON public.students
  FOR EACH ROW
  EXECUTE FUNCTION public.log_student_signup();

-- Trigger function for certification progress
CREATE OR REPLACE FUNCTION public.log_lesson_completed()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_student_name TEXT;
  v_lesson_title TEXT;
  v_cert_name TEXT;
  v_school_id UUID;
BEGIN
  SELECT s.full_name, s.school_id INTO v_student_name, v_school_id
  FROM public.students s WHERE s.id = NEW.student_id;
  
  SELECT l.title, c.name INTO v_lesson_title, v_cert_name
  FROM public.certification_lessons l
  JOIN public.certifications c ON c.id = l.certification_id
  WHERE l.id = NEW.lesson_id;
  
  INSERT INTO public.admin_activity_log (
    event_type, event_category, actor_id, actor_name, actor_type,
    entity_id, entity_type, entity_name, metadata, school_id
  ) VALUES (
    'lesson_completed',
    'certification',
    NEW.student_id,
    v_student_name,
    'student',
    NEW.lesson_id,
    'lesson',
    v_lesson_title,
    jsonb_build_object('quiz_score', NEW.quiz_score, 'certification', v_cert_name),
    v_school_id
  );
  RETURN NEW;
END;
$$;

-- Trigger for lesson completion
CREATE TRIGGER on_lesson_completed
  AFTER INSERT ON public.certification_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.log_lesson_completed();

-- Trigger function for enrollment created
CREATE OR REPLACE FUNCTION public.log_enrollment_created()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_student_name TEXT;
  v_school_id UUID;
  v_tier_name TEXT;
BEGIN
  SELECT s.full_name, s.school_id INTO v_student_name, v_school_id
  FROM public.students s WHERE s.id = NEW.student_id;
  
  SELECT p.name INTO v_tier_name
  FROM public.pricing_tiers p WHERE p.id = NEW.pricing_tier_id;
  
  INSERT INTO public.admin_activity_log (
    event_type, event_category, actor_id, actor_name, actor_type,
    entity_id, entity_type, entity_name, metadata, school_id
  ) VALUES (
    'enrollment_created',
    'payment',
    NEW.student_id,
    v_student_name,
    'student',
    NEW.id,
    'enrollment',
    COALESCE(v_tier_name, 'Enrollment'),
    jsonb_build_object('amount', NEW.total_amount, 'status', NEW.status, 'payment_type', NEW.payment_type),
    v_school_id
  );
  RETURN NEW;
END;
$$;

-- Trigger for enrollment creation
CREATE TRIGGER on_enrollment_created
  AFTER INSERT ON public.enrollments
  FOR EACH ROW
  EXECUTE FUNCTION public.log_enrollment_created();

-- Trigger function for application submitted
CREATE OR REPLACE FUNCTION public.log_application_submitted()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'submitted' AND (OLD.status IS NULL OR OLD.status != 'submitted') THEN
    INSERT INTO public.admin_activity_log (
      event_type, event_category, actor_id, actor_name, actor_type,
      entity_id, entity_type, entity_name, metadata
    ) VALUES (
      'application_submitted',
      'application',
      NEW.user_id,
      NEW.founder_name,
      'student',
      NEW.id,
      'application',
      NEW.startup_name,
      jsonb_build_object('country', NEW.country, 'age', NEW.age, 'email', NEW.email)
    );
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger for application submission
CREATE TRIGGER on_application_submitted
  AFTER INSERT OR UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.log_application_submitted();

-- Trigger function for school registered
CREATE OR REPLACE FUNCTION public.log_school_registered()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.admin_activity_log (
    event_type, event_category, actor_id, actor_name, actor_type,
    entity_id, entity_type, entity_name, metadata, school_id
  ) VALUES (
    'school_registered',
    'school',
    NULL,
    'System',
    'system',
    NEW.id,
    'school',
    NEW.name,
    jsonb_build_object('country', NEW.country, 'city', NEW.city, 'contact_email', NEW.contact_email),
    NEW.id
  );
  RETURN NEW;
END;
$$;

-- Trigger for school registration
CREATE TRIGGER on_school_registered
  AFTER INSERT ON public.schools
  FOR EACH ROW
  EXECUTE FUNCTION public.log_school_registered();

-- Trigger function for challenge attempt (pitch/sprint)
CREATE OR REPLACE FUNCTION public.log_challenge_attempt()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_student_name TEXT;
  v_challenge_title TEXT;
  v_school_id UUID;
BEGIN
  SELECT s.full_name, s.school_id INTO v_student_name, v_school_id
  FROM public.students s WHERE s.id = NEW.student_id;
  
  SELECT c.title INTO v_challenge_title
  FROM public.challenges c WHERE c.id = NEW.challenge_id;
  
  INSERT INTO public.admin_activity_log (
    event_type, event_category, actor_id, actor_name, actor_type,
    entity_id, entity_type, entity_name, metadata, school_id
  ) VALUES (
    'challenge_completed',
    'activity',
    NEW.student_id,
    v_student_name,
    'student',
    NEW.challenge_id,
    'challenge',
    v_challenge_title,
    jsonb_build_object('score', NEW.score, 'xp_earned', NEW.xp_earned, 'archetype', NEW.archetype),
    v_school_id
  );
  RETURN NEW;
END;
$$;

-- Trigger for challenge attempts
CREATE TRIGGER on_challenge_attempt
  AFTER INSERT ON public.challenge_attempts
  FOR EACH ROW
  EXECUTE FUNCTION public.log_challenge_attempt();