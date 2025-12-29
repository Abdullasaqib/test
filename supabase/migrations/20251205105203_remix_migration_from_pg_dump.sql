CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: app_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.app_role AS ENUM (
    'student',
    'mentor',
    'admin',
    'investor',
    'guardian',
    'school_admin',
    'club_advisor'
);


--
-- Name: application_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.application_status AS ENUM (
    'draft',
    'submitted',
    'ai_scored',
    'stress_test',
    'finalist',
    'rejected',
    'registered',
    'video_submitted',
    'processing',
    'advanced',
    'eliminated'
);


--
-- Name: artifact_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.artifact_type AS ENUM (
    'problem_card',
    'interview_notes',
    'customer_persona',
    'solution_sketch',
    'value_proposition',
    'landing_page',
    'prototype',
    'business_model',
    'pitch_deck',
    'pitch_video',
    'user_feedback',
    'reflection',
    'customer_email',
    'mvp_prototype',
    'business_name',
    'logo',
    'brand_kit',
    'prd_document',
    'app_link',
    'marketing_plan',
    'wireframe'
);


--
-- Name: mission_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.mission_status AS ENUM (
    'locked',
    'available',
    'in_progress',
    'completed'
);


--
-- Name: prompt_difficulty; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.prompt_difficulty AS ENUM (
    'beginner',
    'intermediate',
    'advanced'
);


--
-- Name: prompt_kid_category; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.prompt_kid_category AS ENUM (
    'design_help',
    'customer_conversations',
    'content_creation',
    'technical_help',
    'business_model',
    'marketing'
);


--
-- Name: prompt_stage; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.prompt_stage AS ENUM (
    'idea',
    'validation',
    'mvp',
    'launch',
    'scale'
);


--
-- Name: skill_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.skill_type AS ENUM (
    'problem_analysis',
    'creative_thinking',
    'research',
    'communication',
    'ai_collaboration',
    'technical_building',
    'business_thinking',
    'presentation',
    'resilience',
    'user_empathy'
);


--
-- Name: get_user_school_ids(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_user_school_ids(check_user_id uuid) RETURNS SETOF uuid
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT school_id FROM public.school_admins
  WHERE user_id = check_user_id
$$;


--
-- Name: handle_new_student(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.handle_new_student() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  INSERT INTO public.students (user_id, full_name, age, program, onboarding_completed)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    0,
    'pending',
    false
  );
  RETURN NEW;
END;
$$;


--
-- Name: has_role(uuid, public.app_role); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;


--
-- Name: is_primary_school_admin(uuid, uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.is_primary_school_admin(check_user_id uuid, check_school_id uuid) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.school_admins
    WHERE user_id = check_user_id AND school_id = check_school_id AND is_primary = true
  )
$$;


--
-- Name: is_school_admin(uuid, uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.is_school_admin(check_user_id uuid, check_school_id uuid) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.school_admins
    WHERE user_id = check_user_id AND school_id = check_school_id
  )
$$;


--
-- Name: trigger_update_ranks(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.trigger_update_ranks() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  -- Only trigger if status changed to ai_scored or if final_score changed
  IF (NEW.status = 'ai_scored' AND OLD.status != 'ai_scored') 
     OR (NEW.final_score IS DISTINCT FROM OLD.final_score AND NEW.status = 'ai_scored') THEN
    -- Call the ranking function
    PERFORM public.update_application_ranks();
  END IF;
  RETURN NEW;
END;
$$;


--
-- Name: update_application_ranks(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_application_ranks() RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  -- Update ranks based on final_score for scored applications
  WITH ranked_applications AS (
    SELECT 
      id,
      ROW_NUMBER() OVER (
        PARTITION BY round 
        ORDER BY final_score DESC NULLS LAST, scored_at ASC NULLS LAST
      ) as new_rank
    FROM public.applications
    WHERE status = 'ai_scored' AND final_score IS NOT NULL
  )
  UPDATE public.applications
  SET rank = ranked_applications.new_rank
  FROM ranked_applications
  WHERE applications.id = ranked_applications.id;

  -- Mark top 20 for round 1
  UPDATE public.applications
  SET is_top_20 = true
  WHERE round = 1 
    AND status = 'ai_scored' 
    AND rank <= 20 
    AND rank IS NOT NULL;

  -- Unmark those who are not top 20
  UPDATE public.applications
  SET is_top_20 = false
  WHERE round = 1 
    AND status = 'ai_scored' 
    AND (rank > 20 OR rank IS NULL);

  -- Mark top 10 for round 2
  UPDATE public.applications
  SET is_top_10 = true
  WHERE round = 2 
    AND status = 'ai_scored' 
    AND rank <= 10 
    AND rank IS NOT NULL;

  -- Unmark those who are not top 10
  UPDATE public.applications
  SET is_top_10 = false
  WHERE round = 2 
    AND status = 'ai_scored' 
    AND (rank > 10 OR rank IS NULL);
END;
$$;


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: announcements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.announcements (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    target_roles public.app_role[] DEFAULT '{}'::public.app_role[],
    target_programs text[] DEFAULT '{}'::text[],
    target_cohort_id uuid,
    priority text DEFAULT 'normal'::text,
    published_at timestamp with time zone,
    expires_at timestamp with time zone,
    created_by uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT announcements_priority_check CHECK ((priority = ANY (ARRAY['low'::text, 'normal'::text, 'high'::text, 'urgent'::text])))
);


--
-- Name: applications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.applications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    founder_name text NOT NULL,
    age integer NOT NULL,
    country text NOT NULL,
    email text NOT NULL,
    phone text,
    startup_name text NOT NULL,
    pitch_description text NOT NULL,
    problem_statement text NOT NULL,
    solution_description text NOT NULL,
    target_market text,
    video_url text,
    ai_score numeric(3,1),
    ai_feedback jsonb,
    clarity_score numeric(3,1),
    feasibility_score numeric(3,1),
    founder_confidence_score numeric(3,1),
    status public.application_status DEFAULT 'draft'::public.application_status,
    round integer DEFAULT 1,
    is_top_20 boolean DEFAULT false,
    is_top_10 boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    submitted_at timestamp with time zone,
    scored_at timestamp with time zone,
    city text,
    grade text,
    school_name text,
    counselor_name text,
    counselor_email text,
    video_duration integer,
    video_thumbnail_url text,
    video_submitted_at timestamp with time zone,
    final_score numeric(5,2),
    rank integer,
    school_other text,
    city_other text,
    parent_email text,
    parent_name text,
    school_id text,
    parent_phone text,
    resume_url text,
    pitch_deck_url text,
    motivation text,
    payment_status text DEFAULT 'pending'::text,
    onboarding_completed boolean DEFAULT false,
    CONSTRAINT applications_age_check CHECK (((age >= 13) AND (age <= 25))),
    CONSTRAINT applications_ai_score_check CHECK (((ai_score >= (0)::numeric) AND (ai_score <= (10)::numeric)))
);


--
-- Name: artifacts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.artifacts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    mission_id uuid,
    artifact_type public.artifact_type NOT NULL,
    title text NOT NULL,
    content jsonb DEFAULT '{}'::jsonb NOT NULL,
    is_ai_generated boolean DEFAULT false,
    version integer DEFAULT 1,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: behavioral_signals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.behavioral_signals (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    signal_type text NOT NULL,
    signal_value numeric NOT NULL,
    context jsonb DEFAULT '{}'::jsonb,
    mission_id uuid,
    recorded_at timestamp with time zone DEFAULT now(),
    CONSTRAINT behavioral_signals_signal_type_check CHECK ((signal_type = ANY (ARRAY['time_on_task'::text, 'retry_count'::text, 'help_requests'::text, 'answer_depth'::text, 'creative_risk'::text, 'engagement_velocity'::text, 'iteration_count'::text, 'mood_pattern'::text])))
);


--
-- Name: bonus_credits_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bonus_credits_log (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    team_id uuid NOT NULL,
    credits_awarded integer NOT NULL,
    reason text NOT NULL,
    awarded_by uuid,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: chat_conversations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.chat_conversations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    title text DEFAULT 'New Conversation'::text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    needs_attention boolean DEFAULT false,
    stuck_indicators jsonb DEFAULT '[]'::jsonb
);


--
-- Name: chat_messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.chat_messages (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    conversation_id uuid NOT NULL,
    role text NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT chat_messages_role_check CHECK ((role = ANY (ARRAY['user'::text, 'assistant'::text])))
);


--
-- Name: club_members; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.club_members (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    club_id uuid NOT NULL,
    student_id uuid NOT NULL,
    role text DEFAULT 'member'::text,
    joined_at timestamp with time zone DEFAULT now(),
    CONSTRAINT club_members_role_check CHECK ((role = ANY (ARRAY['president'::text, 'vice_president'::text, 'secretary'::text, 'treasurer'::text, 'member'::text])))
);


--
-- Name: clubs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.clubs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    school_id uuid,
    name text NOT NULL,
    description text,
    club_type text DEFAULT 'entrepreneurship'::text,
    advisor_user_id uuid,
    meeting_schedule text,
    max_members integer,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT clubs_club_type_check CHECK ((club_type = ANY (ARRAY['entrepreneurship'::text, 'mun'::text, 'coding'::text, 'robotics'::text, 'other'::text])))
);


--
-- Name: cohorts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cohorts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    program text NOT NULL,
    name text NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    status text DEFAULT 'upcoming'::text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT cohorts_program_check CHECK ((program = ANY (ARRAY['junior'::text, 'teen'::text, 'advanced'::text]))),
    CONSTRAINT cohorts_status_check CHECK ((status = ANY (ARRAY['upcoming'::text, 'active'::text, 'completed'::text])))
);


--
-- Name: curriculum_weeks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.curriculum_weeks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    program text NOT NULL,
    week_number integer NOT NULL,
    title text NOT NULL,
    description text,
    video_url text,
    template_url text,
    workflow_json text,
    homework_description text,
    unlock_date date,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT curriculum_weeks_program_check CHECK ((program = ANY (ARRAY['junior'::text, 'teen'::text, 'advanced'::text])))
);


--
-- Name: enrollments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.enrollments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    application_id uuid,
    pricing_tier_id uuid,
    student_id uuid,
    school_license_id uuid,
    user_id uuid,
    status text DEFAULT 'pending_payment'::text,
    payment_type text DEFAULT 'installment'::text,
    total_amount numeric DEFAULT 0 NOT NULL,
    amount_paid numeric DEFAULT 0,
    scholarship_id uuid,
    discount_applied numeric DEFAULT 0,
    enrolled_at timestamp with time zone,
    starts_at date,
    ends_at date,
    stripe_customer_id text,
    stripe_subscription_id text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: guardian_students; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.guardian_students (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    guardian_user_id uuid NOT NULL,
    student_id uuid NOT NULL,
    relationship text DEFAULT 'parent'::text,
    is_primary boolean DEFAULT true,
    can_view_progress boolean DEFAULT true,
    can_view_payments boolean DEFAULT true,
    can_contact_mentor boolean DEFAULT false,
    verified_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT guardian_students_relationship_check CHECK ((relationship = ANY (ARRAY['parent'::text, 'guardian'::text, 'other'::text])))
);


--
-- Name: homework_feedback; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.homework_feedback (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    progress_id uuid NOT NULL,
    mentor_id uuid NOT NULL,
    rating integer,
    feedback text NOT NULL,
    strengths text,
    improvements text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT homework_feedback_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


--
-- Name: idea_boards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.idea_boards (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    title text DEFAULT 'My Startup Idea'::text NOT NULL,
    description text,
    status text DEFAULT 'draft'::text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: idea_cards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.idea_cards (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    board_id uuid NOT NULL,
    card_type text NOT NULL,
    title text NOT NULL,
    content text,
    position_x integer DEFAULT 0,
    position_y integer DEFAULT 0,
    color text,
    is_ai_generated boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: launch_checklists; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.launch_checklists (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    checklist_items jsonb DEFAULT '[]'::jsonb NOT NULL,
    completed_count integer DEFAULT 0,
    total_count integer DEFAULT 20,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: leads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.leads (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    name text,
    source text DEFAULT 'website'::text NOT NULL,
    interested_program text,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: live_classes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.live_classes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    zoom_link text NOT NULL,
    zoom_meeting_id text,
    zoom_passcode text,
    scheduled_at timestamp with time zone NOT NULL,
    duration_minutes integer DEFAULT 60,
    program text NOT NULL,
    week_number integer,
    class_type text DEFAULT 'lesson'::text,
    recording_url text,
    is_recurring boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: mentor_availability; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mentor_availability (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    mentor_id uuid NOT NULL,
    day_of_week integer NOT NULL,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT mentor_availability_day_of_week_check CHECK (((day_of_week >= 0) AND (day_of_week <= 6))),
    CONSTRAINT valid_time_range CHECK ((end_time > start_time))
);


--
-- Name: mentor_blocked_dates; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mentor_blocked_dates (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    mentor_id uuid NOT NULL,
    blocked_date date NOT NULL,
    reason text,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: mentor_bookings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mentor_bookings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    team_id uuid NOT NULL,
    mentor_id uuid NOT NULL,
    booked_by uuid NOT NULL,
    scheduled_at timestamp with time zone NOT NULL,
    duration_minutes integer DEFAULT 30,
    status text DEFAULT 'pending'::text,
    meeting_link text,
    agenda text,
    questions text,
    mentor_notes text,
    team_feedback text,
    team_rating integer,
    mentor_rating integer,
    credits_used integer DEFAULT 1,
    cancelled_by uuid,
    cancelled_reason text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT mentor_bookings_mentor_rating_check CHECK (((mentor_rating >= 1) AND (mentor_rating <= 5))),
    CONSTRAINT mentor_bookings_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'confirmed'::text, 'completed'::text, 'cancelled'::text, 'no_show'::text]))),
    CONSTRAINT mentor_bookings_team_rating_check CHECK (((team_rating >= 1) AND (team_rating <= 5)))
);


--
-- Name: mentor_profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mentor_profiles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    full_name text NOT NULL,
    email text NOT NULL,
    avatar_url text,
    bio text,
    expertise text[] DEFAULT '{}'::text[],
    industries text[] DEFAULT '{}'::text[],
    languages text[] DEFAULT '{English}'::text[],
    linkedin_url text,
    company text,
    job_title text,
    years_experience integer,
    max_teams integer DEFAULT 5,
    is_accepting_teams boolean DEFAULT true,
    is_active boolean DEFAULT true,
    timezone text DEFAULT 'UTC'::text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: mission_steps; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mission_steps (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    mission_id uuid NOT NULL,
    step_number integer NOT NULL,
    title text NOT NULL,
    instruction text NOT NULL,
    prompt_help text,
    input_type text DEFAULT 'text'::text NOT NULL,
    input_placeholder text,
    example_output text,
    is_required boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT mission_steps_input_type_check CHECK ((input_type = ANY (ARRAY['text'::text, 'textarea'::text, 'select'::text, 'ai_generate'::text, 'upload'::text, 'record'::text]))),
    CONSTRAINT mission_steps_step_number_check CHECK ((step_number >= 1))
);


--
-- Name: missions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.missions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    track text NOT NULL,
    phase integer NOT NULL,
    week integer NOT NULL,
    day integer NOT NULL,
    day_number integer NOT NULL,
    title text NOT NULL,
    subtitle text,
    micro_content text NOT NULL,
    lab_prompt text NOT NULL,
    artifact_type public.artifact_type,
    estimated_minutes integer DEFAULT 30 NOT NULL,
    video_url text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT missions_day_check CHECK (((day >= 1) AND (day <= 5))),
    CONSTRAINT missions_day_number_check CHECK (((day_number >= 1) AND (day_number <= 60))),
    CONSTRAINT missions_phase_check CHECK (((phase >= 1) AND (phase <= 5))),
    CONSTRAINT missions_track_check CHECK ((track = ANY (ARRAY['junior'::text, 'teen'::text, 'advanced'::text]))),
    CONSTRAINT missions_week_check CHECK (((week >= 1) AND (week <= 12)))
);


--
-- Name: payments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    enrollment_id uuid NOT NULL,
    amount numeric NOT NULL,
    payment_number integer DEFAULT 1,
    status text DEFAULT 'pending'::text,
    stripe_payment_intent_id text,
    stripe_invoice_id text,
    stripe_charge_id text,
    payment_method text,
    failure_reason text,
    paid_at timestamp with time zone,
    refunded_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: pitch_attempts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pitch_attempts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    mission_id uuid,
    video_url text,
    transcript text,
    duration_seconds integer,
    ai_feedback jsonb,
    investor_persona text,
    score integer,
    created_at timestamp with time zone DEFAULT now(),
    scores jsonb DEFAULT '{}'::jsonb,
    questions_asked jsonb DEFAULT '[]'::jsonb,
    total_xp_earned integer DEFAULT 0,
    CONSTRAINT pitch_attempts_investor_persona_check CHECK ((investor_persona = ANY (ARRAY['friendly_angel'::text, 'skeptical_vc'::text, 'shark'::text, 'mentor'::text, 'visionary'::text, 'brand_builder'::text, 'numbers'::text, 'retail_queen'::text]))),
    CONSTRAINT pitch_attempts_score_check CHECK (((score >= 0) AND (score <= 100)))
);


--
-- Name: pricing_tiers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pricing_tiers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    program text NOT NULL,
    tier_type text NOT NULL,
    monthly_price numeric DEFAULT 0 NOT NULL,
    upfront_price numeric DEFAULT 0 NOT NULL,
    duration_months integer DEFAULT 3 NOT NULL,
    features jsonb DEFAULT '[]'::jsonb,
    is_active boolean DEFAULT true,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: prompts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.prompts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    prompt_template text NOT NULL,
    stage public.prompt_stage NOT NULL,
    difficulty public.prompt_difficulty DEFAULT 'beginner'::public.prompt_difficulty NOT NULL,
    kid_category public.prompt_kid_category NOT NULL,
    usage_count integer DEFAULT 0,
    program_track text,
    week_relevant integer[],
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT prompts_program_track_check CHECK ((program_track = ANY (ARRAY['junior'::text, 'teen'::text, 'advanced'::text])))
);


--
-- Name: public_leaderboard; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.public_leaderboard AS
 SELECT id,
    founder_name,
    startup_name,
    country,
    grade,
    school_name,
    round,
    final_score,
    rank,
    is_top_20,
    is_top_10,
    scored_at
   FROM public.applications
  WHERE ((status = 'ai_scored'::public.application_status) AND (final_score IS NOT NULL))
  ORDER BY final_score DESC, scored_at;


--
-- Name: reflections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reflections (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    mission_id uuid NOT NULL,
    what_learned text,
    what_surprised text,
    what_next text,
    mood integer,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT reflections_mood_check CHECK (((mood >= 1) AND (mood <= 5)))
);


--
-- Name: resources; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.resources (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    resource_type text NOT NULL,
    url text NOT NULL,
    thumbnail_url text,
    program text,
    week_number integer,
    category text NOT NULL,
    is_featured boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: round_statistics; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.round_statistics AS
 SELECT round,
    count(*) AS total_applications,
    count(
        CASE
            WHEN (status = 'ai_scored'::public.application_status) THEN 1
            ELSE NULL::integer
        END) AS scored_count,
    avg(
        CASE
            WHEN (final_score IS NOT NULL) THEN final_score
            ELSE NULL::numeric
        END) AS avg_score,
    max(final_score) AS max_score,
    min(final_score) AS min_score,
    count(DISTINCT country) AS countries_represented,
    count(DISTINCT school_name) AS schools_represented
   FROM public.applications
  GROUP BY round;


--
-- Name: scholarships; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.scholarships (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    application_id uuid,
    discount_percentage integer DEFAULT 50 NOT NULL,
    reason text,
    status text DEFAULT 'pending'::text,
    approved_by uuid,
    applied_at timestamp with time zone DEFAULT now(),
    reviewed_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: school_admins; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.school_admins (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    school_id uuid NOT NULL,
    user_id uuid NOT NULL,
    role text DEFAULT 'admin'::text,
    is_primary boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT school_admins_role_check CHECK ((role = ANY (ARRAY['admin'::text, 'coordinator'::text, 'viewer'::text])))
);


--
-- Name: school_invites; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.school_invites (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    school_id uuid NOT NULL,
    code text NOT NULL,
    max_uses integer DEFAULT 100,
    uses_count integer DEFAULT 0,
    program text NOT NULL,
    grade text,
    expires_at timestamp with time zone,
    is_active boolean DEFAULT true,
    created_by uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT school_invites_program_check CHECK ((program = ANY (ARRAY['junior'::text, 'teen'::text, 'advanced'::text])))
);


--
-- Name: school_licenses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.school_licenses (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    school_id uuid,
    license_type text DEFAULT 'starter'::text NOT NULL,
    max_students integer DEFAULT 20 NOT NULL,
    enrolled_students integer DEFAULT 0,
    price_per_student numeric DEFAULT 100,
    total_annual_price numeric DEFAULT 0 NOT NULL,
    status text DEFAULT 'pending'::text,
    is_pilot boolean DEFAULT false,
    case_study_agreed boolean DEFAULT false,
    starts_at date,
    expires_at date,
    invoice_url text,
    stripe_subscription_id text,
    notes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: school_name_mappings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.school_name_mappings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    original_name text NOT NULL,
    standardized_name text NOT NULL,
    mapping_source text DEFAULT 'admin'::text NOT NULL,
    confidence_score numeric,
    times_used integer DEFAULT 1,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by uuid
);


--
-- Name: school_stats; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.school_stats AS
 SELECT school_name,
    country,
    count(*) AS total_students,
    count(
        CASE
            WHEN (status = 'ai_scored'::public.application_status) THEN 1
            ELSE NULL::integer
        END) AS scored_students,
    avg(
        CASE
            WHEN (final_score IS NOT NULL) THEN final_score
            ELSE NULL::numeric
        END) AS avg_score,
    max(final_score) AS top_score,
    count(
        CASE
            WHEN (is_top_20 = true) THEN 1
            ELSE NULL::integer
        END) AS top_20_count,
    count(
        CASE
            WHEN (is_top_10 = true) THEN 1
            ELSE NULL::integer
        END) AS top_10_count
   FROM public.applications
  WHERE (school_name IS NOT NULL)
  GROUP BY school_name, country
  ORDER BY (avg(
        CASE
            WHEN (final_score IS NOT NULL) THEN final_score
            ELSE NULL::numeric
        END)) DESC NULLS LAST;


--
-- Name: school_student_enrollments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.school_student_enrollments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    school_id uuid NOT NULL,
    student_id uuid NOT NULL,
    license_id uuid,
    invite_id uuid,
    enrolled_by uuid,
    enrollment_method text NOT NULL,
    status text DEFAULT 'active'::text,
    enrolled_at timestamp with time zone DEFAULT now(),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT school_student_enrollments_enrollment_method_check CHECK ((enrollment_method = ANY (ARRAY['csv_upload'::text, 'manual_add'::text, 'invite_code'::text, 'bulk_import'::text]))),
    CONSTRAINT school_student_enrollments_status_check CHECK ((status = ANY (ARRAY['active'::text, 'inactive'::text, 'graduated'::text, 'withdrawn'::text])))
);


--
-- Name: schools; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schools (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    code text,
    country text,
    city text,
    address text,
    website text,
    logo_url text,
    contact_name text,
    contact_email text,
    contact_phone text,
    plan_type text DEFAULT 'basic'::text,
    max_students integer,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT schools_plan_type_check CHECK ((plan_type = ANY (ARRAY['basic'::text, 'premium'::text, 'enterprise'::text])))
);


--
-- Name: skill_assessments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.skill_assessments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    skill_category text NOT NULL,
    current_level text DEFAULT 'emerging'::text NOT NULL,
    behavioral_score integer DEFAULT 0,
    performance_score integer DEFAULT 0,
    combined_score integer GENERATED ALWAYS AS (((behavioral_score + performance_score) / 2)) STORED,
    momentum text DEFAULT 'stable'::text,
    momentum_change integer DEFAULT 0,
    signature_strength boolean DEFAULT false,
    last_assessment_at timestamp with time zone DEFAULT now(),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT skill_assessments_behavioral_score_check CHECK (((behavioral_score >= 0) AND (behavioral_score <= 100))),
    CONSTRAINT skill_assessments_current_level_check CHECK ((current_level = ANY (ARRAY['emerging'::text, 'developing'::text, 'proficient'::text, 'advanced'::text]))),
    CONSTRAINT skill_assessments_momentum_check CHECK ((momentum = ANY (ARRAY['rising'::text, 'stable'::text, 'declining'::text]))),
    CONSTRAINT skill_assessments_performance_score_check CHECK (((performance_score >= 0) AND (performance_score <= 100)))
);


--
-- Name: skill_insights; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.skill_insights (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    signature_strength_name text,
    signature_strength_description text,
    growth_tips text[] DEFAULT '{}'::text[],
    weekly_recommendations jsonb DEFAULT '[]'::jsonb,
    learning_style text,
    team_role_suggestion text,
    at_risk_indicators jsonb DEFAULT '[]'::jsonb,
    engagement_score integer DEFAULT 50,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT skill_insights_engagement_score_check CHECK (((engagement_score >= 0) AND (engagement_score <= 100)))
);


--
-- Name: skill_mappings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.skill_mappings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    mission_id uuid NOT NULL,
    skill public.skill_type NOT NULL,
    points integer DEFAULT 10 NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT skill_mappings_points_check CHECK ((points > 0))
);


--
-- Name: skill_scores; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.skill_scores (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    skill public.skill_type NOT NULL,
    total_points integer DEFAULT 0 NOT NULL,
    missions_completed integer DEFAULT 0 NOT NULL,
    last_earned_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: strength_history; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.strength_history (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    week_number integer NOT NULL,
    skill_snapshot jsonb DEFAULT '{}'::jsonb,
    founder_type text,
    role_fit jsonb DEFAULT '{}'::jsonb,
    total_xp integer DEFAULT 0,
    missions_completed integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: strength_profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.strength_profiles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    founder_type text NOT NULL,
    founder_type_description text,
    superpowers text[] DEFAULT '{}'::text[],
    growth_edges text[] DEFAULT '{}'::text[],
    role_fit jsonb DEFAULT '{}'::jsonb,
    personalized_insight text,
    recommended_focus text,
    analysis_data jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: student_issues; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.student_issues (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    title text NOT NULL,
    description text,
    screenshot_url text,
    tool_name text,
    ai_response text,
    status text DEFAULT 'open'::text,
    created_at timestamp with time zone DEFAULT now(),
    resolved_at timestamp with time zone
);


--
-- Name: student_missions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.student_missions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    mission_id uuid NOT NULL,
    status public.mission_status DEFAULT 'locked'::public.mission_status NOT NULL,
    started_at timestamp with time zone,
    completed_at timestamp with time zone,
    time_spent_minutes integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: student_progress; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.student_progress (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    week_id uuid NOT NULL,
    started_at timestamp with time zone,
    completed_at timestamp with time zone,
    homework_submitted boolean DEFAULT false,
    homework_url text,
    mentor_feedback text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: student_prompt_favorites; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.student_prompt_favorites (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    prompt_id uuid NOT NULL,
    saved_at timestamp with time zone DEFAULT now()
);


--
-- Name: student_prompt_history; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.student_prompt_history (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    prompt_id uuid NOT NULL,
    used_at timestamp with time zone DEFAULT now(),
    context text
);


--
-- Name: student_revenue; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.student_revenue (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    amount numeric NOT NULL,
    source text NOT NULL,
    recorded_at timestamp with time zone DEFAULT now(),
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: student_tool_progress; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.student_tool_progress (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    student_id uuid NOT NULL,
    tool_name text NOT NULL,
    tutorial_id uuid,
    completed_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: students; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.students (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    full_name text NOT NULL,
    age integer NOT NULL,
    program text NOT NULL,
    cohort_id uuid,
    enrolled_at timestamp with time zone DEFAULT now(),
    status text DEFAULT 'active'::text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    country text,
    city text,
    school_name text,
    grade text,
    builder_type text DEFAULT 'individual'::text,
    has_idea boolean DEFAULT false,
    idea_summary text,
    onboarding_completed boolean DEFAULT false,
    school_id uuid,
    registration_type text DEFAULT 'individual'::text,
    pitch_level integer DEFAULT 1,
    pitch_total_xp integer DEFAULT 0,
    CONSTRAINT students_program_check CHECK ((program = ANY (ARRAY['junior'::text, 'teen'::text, 'advanced'::text, 'pending'::text]))),
    CONSTRAINT students_registration_type_check CHECK ((registration_type = ANY (ARRAY['individual'::text, 'school_enrolled'::text, 'school_invited'::text]))),
    CONSTRAINT students_status_check CHECK ((status = ANY (ARRAY['active'::text, 'paused'::text, 'completed'::text])))
);


--
-- Name: team_booking_credits; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.team_booking_credits (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    team_id uuid NOT NULL,
    total_credits integer DEFAULT 4,
    used_credits integer DEFAULT 0,
    bonus_credits integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: team_members; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.team_members (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    team_id uuid NOT NULL,
    student_id uuid NOT NULL,
    role text DEFAULT 'member'::text,
    joined_at timestamp with time zone DEFAULT now()
);


--
-- Name: team_mentor_assignments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.team_mentor_assignments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    team_id uuid NOT NULL,
    mentor_id uuid NOT NULL,
    is_primary boolean DEFAULT false,
    assigned_at timestamp with time zone DEFAULT now(),
    assigned_by uuid,
    status text DEFAULT 'active'::text,
    notes text,
    CONSTRAINT team_mentor_assignments_status_check CHECK ((status = ANY (ARRAY['active'::text, 'completed'::text, 'cancelled'::text])))
);


--
-- Name: team_notes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.team_notes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    team_id uuid NOT NULL,
    title text NOT NULL,
    content text,
    created_by uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: teams; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.teams (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    join_code text NOT NULL,
    created_by uuid,
    program text NOT NULL,
    cohort_id uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: tool_tutorials; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tool_tutorials (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    tool_name text NOT NULL,
    title text NOT NULL,
    description text,
    video_url text,
    tutorial_url text,
    difficulty text DEFAULT 'beginner'::text NOT NULL,
    sequence_order integer DEFAULT 0 NOT NULL,
    age_min integer DEFAULT 9,
    age_max integer DEFAULT 16,
    estimated_minutes integer DEFAULT 30,
    category text DEFAULT 'basics'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public.app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: announcements announcements_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.announcements
    ADD CONSTRAINT announcements_pkey PRIMARY KEY (id);


--
-- Name: applications applications_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_email_unique UNIQUE (email);


--
-- Name: applications applications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (id);


--
-- Name: artifacts artifacts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.artifacts
    ADD CONSTRAINT artifacts_pkey PRIMARY KEY (id);


--
-- Name: behavioral_signals behavioral_signals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.behavioral_signals
    ADD CONSTRAINT behavioral_signals_pkey PRIMARY KEY (id);


--
-- Name: bonus_credits_log bonus_credits_log_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bonus_credits_log
    ADD CONSTRAINT bonus_credits_log_pkey PRIMARY KEY (id);


--
-- Name: chat_conversations chat_conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chat_conversations
    ADD CONSTRAINT chat_conversations_pkey PRIMARY KEY (id);


--
-- Name: chat_messages chat_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT chat_messages_pkey PRIMARY KEY (id);


--
-- Name: club_members club_members_club_id_student_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.club_members
    ADD CONSTRAINT club_members_club_id_student_id_key UNIQUE (club_id, student_id);


--
-- Name: club_members club_members_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.club_members
    ADD CONSTRAINT club_members_pkey PRIMARY KEY (id);


--
-- Name: clubs clubs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clubs
    ADD CONSTRAINT clubs_pkey PRIMARY KEY (id);


--
-- Name: cohorts cohorts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cohorts
    ADD CONSTRAINT cohorts_pkey PRIMARY KEY (id);


--
-- Name: curriculum_weeks curriculum_weeks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.curriculum_weeks
    ADD CONSTRAINT curriculum_weeks_pkey PRIMARY KEY (id);


--
-- Name: curriculum_weeks curriculum_weeks_program_week_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.curriculum_weeks
    ADD CONSTRAINT curriculum_weeks_program_week_number_key UNIQUE (program, week_number);


--
-- Name: enrollments enrollments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_pkey PRIMARY KEY (id);


--
-- Name: guardian_students guardian_students_guardian_user_id_student_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.guardian_students
    ADD CONSTRAINT guardian_students_guardian_user_id_student_id_key UNIQUE (guardian_user_id, student_id);


--
-- Name: guardian_students guardian_students_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.guardian_students
    ADD CONSTRAINT guardian_students_pkey PRIMARY KEY (id);


--
-- Name: homework_feedback homework_feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.homework_feedback
    ADD CONSTRAINT homework_feedback_pkey PRIMARY KEY (id);


--
-- Name: idea_boards idea_boards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.idea_boards
    ADD CONSTRAINT idea_boards_pkey PRIMARY KEY (id);


--
-- Name: idea_cards idea_cards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.idea_cards
    ADD CONSTRAINT idea_cards_pkey PRIMARY KEY (id);


--
-- Name: launch_checklists launch_checklists_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.launch_checklists
    ADD CONSTRAINT launch_checklists_pkey PRIMARY KEY (id);


--
-- Name: leads leads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_pkey PRIMARY KEY (id);


--
-- Name: live_classes live_classes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.live_classes
    ADD CONSTRAINT live_classes_pkey PRIMARY KEY (id);


--
-- Name: mentor_availability mentor_availability_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentor_availability
    ADD CONSTRAINT mentor_availability_pkey PRIMARY KEY (id);


--
-- Name: mentor_blocked_dates mentor_blocked_dates_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentor_blocked_dates
    ADD CONSTRAINT mentor_blocked_dates_pkey PRIMARY KEY (id);


--
-- Name: mentor_bookings mentor_bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentor_bookings
    ADD CONSTRAINT mentor_bookings_pkey PRIMARY KEY (id);


--
-- Name: mentor_profiles mentor_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentor_profiles
    ADD CONSTRAINT mentor_profiles_pkey PRIMARY KEY (id);


--
-- Name: mentor_profiles mentor_profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentor_profiles
    ADD CONSTRAINT mentor_profiles_user_id_key UNIQUE (user_id);


--
-- Name: mission_steps mission_steps_mission_id_step_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mission_steps
    ADD CONSTRAINT mission_steps_mission_id_step_number_key UNIQUE (mission_id, step_number);


--
-- Name: mission_steps mission_steps_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mission_steps
    ADD CONSTRAINT mission_steps_pkey PRIMARY KEY (id);


--
-- Name: missions missions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.missions
    ADD CONSTRAINT missions_pkey PRIMARY KEY (id);


--
-- Name: missions missions_track_day_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.missions
    ADD CONSTRAINT missions_track_day_number_key UNIQUE (track, day_number);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: pitch_attempts pitch_attempts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pitch_attempts
    ADD CONSTRAINT pitch_attempts_pkey PRIMARY KEY (id);


--
-- Name: pricing_tiers pricing_tiers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pricing_tiers
    ADD CONSTRAINT pricing_tiers_pkey PRIMARY KEY (id);


--
-- Name: prompts prompts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prompts
    ADD CONSTRAINT prompts_pkey PRIMARY KEY (id);


--
-- Name: reflections reflections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reflections
    ADD CONSTRAINT reflections_pkey PRIMARY KEY (id);


--
-- Name: reflections reflections_student_id_mission_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reflections
    ADD CONSTRAINT reflections_student_id_mission_id_key UNIQUE (student_id, mission_id);


--
-- Name: resources resources_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_pkey PRIMARY KEY (id);


--
-- Name: scholarships scholarships_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scholarships
    ADD CONSTRAINT scholarships_pkey PRIMARY KEY (id);


--
-- Name: school_admins school_admins_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.school_admins
    ADD CONSTRAINT school_admins_pkey PRIMARY KEY (id);


--
-- Name: school_admins school_admins_school_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.school_admins
    ADD CONSTRAINT school_admins_school_id_user_id_key UNIQUE (school_id, user_id);


--
-- Name: school_invites school_invites_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.school_invites
    ADD CONSTRAINT school_invites_code_key UNIQUE (code);


--
-- Name: school_invites school_invites_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.school_invites
    ADD CONSTRAINT school_invites_pkey PRIMARY KEY (id);


--
-- Name: school_licenses school_licenses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.school_licenses
    ADD CONSTRAINT school_licenses_pkey PRIMARY KEY (id);


--
-- Name: school_name_mappings school_name_mappings_original_name_standardized_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.school_name_mappings
    ADD CONSTRAINT school_name_mappings_original_name_standardized_name_key UNIQUE (original_name, standardized_name);


--
-- Name: school_name_mappings school_name_mappings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.school_name_mappings
    ADD CONSTRAINT school_name_mappings_pkey PRIMARY KEY (id);


--
-- Name: school_student_enrollments school_student_enrollments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.school_student_enrollments
    ADD CONSTRAINT school_student_enrollments_pkey PRIMARY KEY (id);


--
-- Name: school_student_enrollments school_student_enrollments_school_id_student_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.school_student_enrollments
    ADD CONSTRAINT school_student_enrollments_school_id_student_id_key UNIQUE (school_id, student_id);


--
-- Name: schools schools_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schools
    ADD CONSTRAINT schools_code_key UNIQUE (code);


--
-- Name: schools schools_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schools
    ADD CONSTRAINT schools_pkey PRIMARY KEY (id);


--
-- Name: skill_assessments skill_assessments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_assessments
    ADD CONSTRAINT skill_assessments_pkey PRIMARY KEY (id);


--
-- Name: skill_assessments skill_assessments_student_id_skill_category_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_assessments
    ADD CONSTRAINT skill_assessments_student_id_skill_category_key UNIQUE (student_id, skill_category);


--
-- Name: skill_insights skill_insights_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_insights
    ADD CONSTRAINT skill_insights_pkey PRIMARY KEY (id);


--
-- Name: skill_insights skill_insights_student_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_insights
    ADD CONSTRAINT skill_insights_student_id_key UNIQUE (student_id);


--
-- Name: skill_mappings skill_mappings_mission_id_skill_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_mappings
    ADD CONSTRAINT skill_mappings_mission_id_skill_key UNIQUE (mission_id, skill);


--
-- Name: skill_mappings skill_mappings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_mappings
    ADD CONSTRAINT skill_mappings_pkey PRIMARY KEY (id);


--
-- Name: skill_scores skill_scores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_scores
    ADD CONSTRAINT skill_scores_pkey PRIMARY KEY (id);


--
-- Name: skill_scores skill_scores_student_id_skill_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_scores
    ADD CONSTRAINT skill_scores_student_id_skill_key UNIQUE (student_id, skill);


--
-- Name: strength_history strength_history_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.strength_history
    ADD CONSTRAINT strength_history_pkey PRIMARY KEY (id);


--
-- Name: strength_profiles strength_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.strength_profiles
    ADD CONSTRAINT strength_profiles_pkey PRIMARY KEY (id);


--
-- Name: strength_profiles strength_profiles_student_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.strength_profiles
    ADD CONSTRAINT strength_profiles_student_id_key UNIQUE (student_id);


--
-- Name: student_issues student_issues_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_issues
    ADD CONSTRAINT student_issues_pkey PRIMARY KEY (id);


--
-- Name: student_missions student_missions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_missions
    ADD CONSTRAINT student_missions_pkey PRIMARY KEY (id);


--
-- Name: student_missions student_missions_student_id_mission_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_missions
    ADD CONSTRAINT student_missions_student_id_mission_id_key UNIQUE (student_id, mission_id);


--
-- Name: student_progress student_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_progress
    ADD CONSTRAINT student_progress_pkey PRIMARY KEY (id);


--
-- Name: student_progress student_progress_student_id_week_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_progress
    ADD CONSTRAINT student_progress_student_id_week_id_key UNIQUE (student_id, week_id);


--
-- Name: student_prompt_favorites student_prompt_favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_prompt_favorites
    ADD CONSTRAINT student_prompt_favorites_pkey PRIMARY KEY (id);


--
-- Name: student_prompt_favorites student_prompt_favorites_student_id_prompt_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_prompt_favorites
    ADD CONSTRAINT student_prompt_favorites_student_id_prompt_id_key UNIQUE (student_id, prompt_id);


--
-- Name: student_prompt_history student_prompt_history_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_prompt_history
    ADD CONSTRAINT student_prompt_history_pkey PRIMARY KEY (id);


--
-- Name: student_revenue student_revenue_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_revenue
    ADD CONSTRAINT student_revenue_pkey PRIMARY KEY (id);


--
-- Name: student_tool_progress student_tool_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_tool_progress
    ADD CONSTRAINT student_tool_progress_pkey PRIMARY KEY (id);


--
-- Name: student_tool_progress student_tool_progress_student_id_tutorial_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_tool_progress
    ADD CONSTRAINT student_tool_progress_student_id_tutorial_id_key UNIQUE (student_id, tutorial_id);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- Name: students students_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_user_id_key UNIQUE (user_id);


--
-- Name: team_booking_credits team_booking_credits_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_booking_credits
    ADD CONSTRAINT team_booking_credits_pkey PRIMARY KEY (id);


--
-- Name: team_booking_credits team_booking_credits_team_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_booking_credits
    ADD CONSTRAINT team_booking_credits_team_id_key UNIQUE (team_id);


--
-- Name: team_members team_members_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_pkey PRIMARY KEY (id);


--
-- Name: team_members team_members_team_id_student_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_team_id_student_id_key UNIQUE (team_id, student_id);


--
-- Name: team_mentor_assignments team_mentor_assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_mentor_assignments
    ADD CONSTRAINT team_mentor_assignments_pkey PRIMARY KEY (id);


--
-- Name: team_mentor_assignments team_mentor_assignments_team_id_mentor_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_mentor_assignments
    ADD CONSTRAINT team_mentor_assignments_team_id_mentor_id_key UNIQUE (team_id, mentor_id);


--
-- Name: team_notes team_notes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_notes
    ADD CONSTRAINT team_notes_pkey PRIMARY KEY (id);


--
-- Name: teams teams_join_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_join_code_key UNIQUE (join_code);


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);


--
-- Name: tool_tutorials tool_tutorials_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tool_tutorials
    ADD CONSTRAINT tool_tutorials_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);


--
-- Name: idx_announcements_published; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_announcements_published ON public.announcements USING btree (published_at) WHERE (published_at IS NOT NULL);


--
-- Name: idx_applications_city; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_applications_city ON public.applications USING btree (city) WHERE (city IS NOT NULL);


--
-- Name: idx_applications_country; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_applications_country ON public.applications USING btree (country);


--
-- Name: idx_applications_final_score; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_applications_final_score ON public.applications USING btree (final_score DESC);


--
-- Name: idx_applications_grade; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_applications_grade ON public.applications USING btree (grade);


--
-- Name: idx_applications_round; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_applications_round ON public.applications USING btree (round);


--
-- Name: idx_applications_school_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_applications_school_name ON public.applications USING btree (school_name) WHERE (school_name IS NOT NULL);


--
-- Name: idx_applications_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_applications_status ON public.applications USING btree (status);


--
-- Name: idx_artifacts_student; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_artifacts_student ON public.artifacts USING btree (student_id);


--
-- Name: idx_artifacts_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_artifacts_type ON public.artifacts USING btree (student_id, artifact_type);


--
-- Name: idx_behavioral_signals_student; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_behavioral_signals_student ON public.behavioral_signals USING btree (student_id);


--
-- Name: idx_behavioral_signals_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_behavioral_signals_type ON public.behavioral_signals USING btree (signal_type);


--
-- Name: idx_chat_conversations_student_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_chat_conversations_student_id ON public.chat_conversations USING btree (student_id);


--
-- Name: idx_chat_messages_conversation_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_chat_messages_conversation_id ON public.chat_messages USING btree (conversation_id);


--
-- Name: idx_chat_messages_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_chat_messages_created_at ON public.chat_messages USING btree (created_at);


--
-- Name: idx_club_members_club; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_club_members_club ON public.club_members USING btree (club_id);


--
-- Name: idx_club_members_student; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_club_members_student ON public.club_members USING btree (student_id);


--
-- Name: idx_clubs_school; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_clubs_school ON public.clubs USING btree (school_id);


--
-- Name: idx_enrollments_application_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_enrollments_application_id ON public.enrollments USING btree (application_id);


--
-- Name: idx_enrollments_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_enrollments_status ON public.enrollments USING btree (status);


--
-- Name: idx_enrollments_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_enrollments_user_id ON public.enrollments USING btree (user_id);


--
-- Name: idx_guardian_students_guardian; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_guardian_students_guardian ON public.guardian_students USING btree (guardian_user_id);


--
-- Name: idx_guardian_students_student; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_guardian_students_student ON public.guardian_students USING btree (student_id);


--
-- Name: idx_mentor_availability_mentor; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_mentor_availability_mentor ON public.mentor_availability USING btree (mentor_id);


--
-- Name: idx_mentor_bookings_mentor; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_mentor_bookings_mentor ON public.mentor_bookings USING btree (mentor_id);


--
-- Name: idx_mentor_bookings_scheduled; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_mentor_bookings_scheduled ON public.mentor_bookings USING btree (scheduled_at);


--
-- Name: idx_mentor_bookings_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_mentor_bookings_status ON public.mentor_bookings USING btree (status);


--
-- Name: idx_mentor_bookings_team; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_mentor_bookings_team ON public.mentor_bookings USING btree (team_id);


--
-- Name: idx_mentor_profiles_active; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_mentor_profiles_active ON public.mentor_profiles USING btree (is_active) WHERE (is_active = true);


--
-- Name: idx_mentor_profiles_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_mentor_profiles_user_id ON public.mentor_profiles USING btree (user_id);


--
-- Name: idx_missions_track_day; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_missions_track_day ON public.missions USING btree (track, day_number);


--
-- Name: idx_payments_enrollment_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_payments_enrollment_id ON public.payments USING btree (enrollment_id);


--
-- Name: idx_payments_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_payments_status ON public.payments USING btree (status);


--
-- Name: idx_pitch_attempts_student; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_pitch_attempts_student ON public.pitch_attempts USING btree (student_id);


--
-- Name: idx_pitch_attempts_student_created; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_pitch_attempts_student_created ON public.pitch_attempts USING btree (student_id, created_at DESC);


--
-- Name: idx_pricing_tiers_program; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_pricing_tiers_program ON public.pricing_tiers USING btree (program);


--
-- Name: idx_pricing_tiers_tier_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_pricing_tiers_tier_type ON public.pricing_tiers USING btree (tier_type);


--
-- Name: idx_prompts_difficulty; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_prompts_difficulty ON public.prompts USING btree (difficulty);


--
-- Name: idx_prompts_kid_category; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_prompts_kid_category ON public.prompts USING btree (kid_category);


--
-- Name: idx_prompts_stage; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_prompts_stage ON public.prompts USING btree (stage);


--
-- Name: idx_scholarships_application_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_scholarships_application_id ON public.scholarships USING btree (application_id);


--
-- Name: idx_scholarships_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_scholarships_status ON public.scholarships USING btree (status);


--
-- Name: idx_school_admins_school; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_school_admins_school ON public.school_admins USING btree (school_id);


--
-- Name: idx_school_admins_user; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_school_admins_user ON public.school_admins USING btree (user_id);


--
-- Name: idx_school_invites_code; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_school_invites_code ON public.school_invites USING btree (code);


--
-- Name: idx_school_invites_school_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_school_invites_school_id ON public.school_invites USING btree (school_id);


--
-- Name: idx_school_licenses_school_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_school_licenses_school_id ON public.school_licenses USING btree (school_id);


--
-- Name: idx_school_name_mappings_original; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_school_name_mappings_original ON public.school_name_mappings USING btree (original_name);


--
-- Name: idx_school_name_mappings_standardized; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_school_name_mappings_standardized ON public.school_name_mappings USING btree (standardized_name);


--
-- Name: idx_school_student_enrollments_school_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_school_student_enrollments_school_id ON public.school_student_enrollments USING btree (school_id);


--
-- Name: idx_school_student_enrollments_student_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_school_student_enrollments_student_id ON public.school_student_enrollments USING btree (student_id);


--
-- Name: idx_skill_assessments_student; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_skill_assessments_student ON public.skill_assessments USING btree (student_id);


--
-- Name: idx_skill_insights_student; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_skill_insights_student ON public.skill_insights USING btree (student_id);


--
-- Name: idx_skill_scores_student; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_skill_scores_student ON public.skill_scores USING btree (student_id);


--
-- Name: idx_strength_history_student; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_strength_history_student ON public.strength_history USING btree (student_id);


--
-- Name: idx_strength_history_week; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_strength_history_week ON public.strength_history USING btree (student_id, week_number);


--
-- Name: idx_strength_profiles_student; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_strength_profiles_student ON public.strength_profiles USING btree (student_id);


--
-- Name: idx_student_missions_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_student_missions_status ON public.student_missions USING btree (student_id, status);


--
-- Name: idx_student_missions_student; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_student_missions_student ON public.student_missions USING btree (student_id);


--
-- Name: idx_student_prompt_favorites_student; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_student_prompt_favorites_student ON public.student_prompt_favorites USING btree (student_id);


--
-- Name: idx_student_prompt_history_student; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_student_prompt_history_student ON public.student_prompt_history USING btree (student_id);


--
-- Name: idx_students_school_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_students_school_id ON public.students USING btree (school_id);


--
-- Name: idx_team_mentor_assignments_mentor; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_team_mentor_assignments_mentor ON public.team_mentor_assignments USING btree (mentor_id);


--
-- Name: idx_team_mentor_assignments_team; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_team_mentor_assignments_team ON public.team_mentor_assignments USING btree (team_id);


--
-- Name: announcements update_announcements_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON public.announcements FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: applications update_applications_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: artifacts update_artifacts_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_artifacts_updated_at BEFORE UPDATE ON public.artifacts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: chat_conversations update_chat_conversations_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_chat_conversations_updated_at BEFORE UPDATE ON public.chat_conversations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: clubs update_clubs_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_clubs_updated_at BEFORE UPDATE ON public.clubs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: cohorts update_cohorts_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_cohorts_updated_at BEFORE UPDATE ON public.cohorts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: curriculum_weeks update_curriculum_weeks_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_curriculum_weeks_updated_at BEFORE UPDATE ON public.curriculum_weeks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: enrollments update_enrollments_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON public.enrollments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: homework_feedback update_homework_feedback_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_homework_feedback_updated_at BEFORE UPDATE ON public.homework_feedback FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: launch_checklists update_launch_checklists_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_launch_checklists_updated_at BEFORE UPDATE ON public.launch_checklists FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: mentor_bookings update_mentor_bookings_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_mentor_bookings_updated_at BEFORE UPDATE ON public.mentor_bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: mentor_profiles update_mentor_profiles_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_mentor_profiles_updated_at BEFORE UPDATE ON public.mentor_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: missions update_missions_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_missions_updated_at BEFORE UPDATE ON public.missions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: pricing_tiers update_pricing_tiers_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_pricing_tiers_updated_at BEFORE UPDATE ON public.pricing_tiers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: applications update_ranks_on_score; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_ranks_on_score AFTER UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION public.trigger_update_ranks();


--
-- Name: school_invites update_school_invites_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_school_invites_updated_at BEFORE UPDATE ON public.school_invites FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: school_licenses update_school_licenses_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_school_licenses_updated_at BEFORE UPDATE ON public.school_licenses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: school_name_mappings update_school_name_mappings_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_school_name_mappings_updated_at BEFORE UPDATE ON public.school_name_mappings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: school_student_enrollments update_school_student_enrollments_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_school_student_enrollments_updated_at BEFORE UPDATE ON public.school_student_enrollments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: schools update_schools_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON public.schools FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: skill_assessments update_skill_assessments_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_skill_assessments_updated_at BEFORE UPDATE ON public.skill_assessments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: skill_insights update_skill_insights_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_skill_insights_updated_at BEFORE UPDATE ON public.skill_insights FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: skill_scores update_skill_scores_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_skill_scores_updated_at BEFORE UPDATE ON public.skill_scores FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: strength_profiles update_strength_profiles_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_strength_profiles_updated_at BEFORE UPDATE ON public.strength_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: student_missions update_student_missions_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_student_missions_updated_at BEFORE UPDATE ON public.student_missions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: student_progress update_student_progress_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_student_progress_updated_at BEFORE UPDATE ON public.student_progress FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: students update_students_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: team_booking_credits update_team_booking_credits_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_team_booking_credits_updated_at BEFORE UPDATE ON public.team_booking_credits FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: announcements announcements_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.announcements
    ADD CONSTRAINT announcements_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id);


--
-- Name: announcements announcements_target_cohort_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.announcements
    ADD CONSTRAINT announcements_target_cohort_id_fkey FOREIGN KEY (target_cohort_id) REFERENCES public.cohorts(id);


--
-- Name: artifacts artifacts_mission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.artifacts
    ADD CONSTRAINT artifacts_mission_id_fkey FOREIGN KEY (mission_id) REFERENCES public.missions(id) ON DELETE SET NULL;


--
-- Name: artifacts artifacts_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.artifacts
    ADD CONSTRAINT artifacts_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: behavioral_signals behavioral_signals_mission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.behavioral_signals
    ADD CONSTRAINT behavioral_signals_mission_id_fkey FOREIGN KEY (mission_id) REFERENCES public.missions(id);


--
-- Name: behavioral_signals behavioral_signals_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.behavioral_signals
    ADD CONSTRAINT behavioral_signals_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: bonus_credits_log bonus_credits_log_awarded_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bonus_credits_log
    ADD CONSTRAINT bonus_credits_log_awarded_by_fkey FOREIGN KEY (awarded_by) REFERENCES auth.users(id);


--
-- Name: bonus_credits_log bonus_credits_log_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bonus_credits_log
    ADD CONSTRAINT bonus_credits_log_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id) ON DELETE CASCADE;


--
-- Name: chat_conversations chat_conversations_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chat_conversations
    ADD CONSTRAINT chat_conversations_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: chat_messages chat_messages_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT chat_messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.chat_conversations(id) ON DELETE CASCADE;


--
-- Name: club_members club_members_club_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.club_members
    ADD CONSTRAINT club_members_club_id_fkey FOREIGN KEY (club_id) REFERENCES public.clubs(id) ON DELETE CASCADE;


--
-- Name: club_members club_members_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.club_members
    ADD CONSTRAINT club_members_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: clubs clubs_advisor_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clubs
    ADD CONSTRAINT clubs_advisor_user_id_fkey FOREIGN KEY (advisor_user_id) REFERENCES auth.users(id);


--
-- Name: clubs clubs_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clubs
    ADD CONSTRAINT clubs_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.schools(id) ON DELETE CASCADE;


--
-- Name: enrollments enrollments_application_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_application_id_fkey FOREIGN KEY (application_id) REFERENCES public.applications(id) ON DELETE SET NULL;


--
-- Name: enrollments enrollments_pricing_tier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_pricing_tier_id_fkey FOREIGN KEY (pricing_tier_id) REFERENCES public.pricing_tiers(id) ON DELETE SET NULL;


--
-- Name: enrollments enrollments_scholarship_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_scholarship_id_fkey FOREIGN KEY (scholarship_id) REFERENCES public.scholarships(id) ON DELETE SET NULL;


--
-- Name: enrollments enrollments_school_license_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_school_license_id_fkey FOREIGN KEY (school_license_id) REFERENCES public.school_licenses(id) ON DELETE SET NULL;


--
-- Name: enrollments enrollments_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE SET NULL;


--
-- Name: students fk_students_cohort; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT fk_students_cohort FOREIGN KEY (cohort_id) REFERENCES public.cohorts(id) ON DELETE SET NULL;


--
-- Name: guardian_students guardian_students_guardian_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.guardian_students
    ADD CONSTRAINT guardian_students_guardian_user_id_fkey FOREIGN KEY (guardian_user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: guardian_students guardian_students_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.guardian_students
    ADD CONSTRAINT guardian_students_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: homework_feedback homework_feedback_mentor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.homework_feedback
    ADD CONSTRAINT homework_feedback_mentor_id_fkey FOREIGN KEY (mentor_id) REFERENCES public.mentor_profiles(id) ON DELETE CASCADE;


--
-- Name: homework_feedback homework_feedback_progress_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.homework_feedback
    ADD CONSTRAINT homework_feedback_progress_id_fkey FOREIGN KEY (progress_id) REFERENCES public.student_progress(id) ON DELETE CASCADE;


--
-- Name: idea_boards idea_boards_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.idea_boards
    ADD CONSTRAINT idea_boards_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: idea_cards idea_cards_board_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.idea_cards
    ADD CONSTRAINT idea_cards_board_id_fkey FOREIGN KEY (board_id) REFERENCES public.idea_boards(id) ON DELETE CASCADE;


--
-- Name: launch_checklists launch_checklists_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.launch_checklists
    ADD CONSTRAINT launch_checklists_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: mentor_availability mentor_availability_mentor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentor_availability
    ADD CONSTRAINT mentor_availability_mentor_id_fkey FOREIGN KEY (mentor_id) REFERENCES public.mentor_profiles(id) ON DELETE CASCADE;


--
-- Name: mentor_blocked_dates mentor_blocked_dates_mentor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentor_blocked_dates
    ADD CONSTRAINT mentor_blocked_dates_mentor_id_fkey FOREIGN KEY (mentor_id) REFERENCES public.mentor_profiles(id) ON DELETE CASCADE;


--
-- Name: mentor_bookings mentor_bookings_booked_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentor_bookings
    ADD CONSTRAINT mentor_bookings_booked_by_fkey FOREIGN KEY (booked_by) REFERENCES auth.users(id);


--
-- Name: mentor_bookings mentor_bookings_cancelled_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentor_bookings
    ADD CONSTRAINT mentor_bookings_cancelled_by_fkey FOREIGN KEY (cancelled_by) REFERENCES auth.users(id);


--
-- Name: mentor_bookings mentor_bookings_mentor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentor_bookings
    ADD CONSTRAINT mentor_bookings_mentor_id_fkey FOREIGN KEY (mentor_id) REFERENCES public.mentor_profiles(id) ON DELETE CASCADE;


--
-- Name: mentor_bookings mentor_bookings_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentor_bookings
    ADD CONSTRAINT mentor_bookings_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id) ON DELETE CASCADE;


--
-- Name: mentor_profiles mentor_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentor_profiles
    ADD CONSTRAINT mentor_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mission_steps mission_steps_mission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mission_steps
    ADD CONSTRAINT mission_steps_mission_id_fkey FOREIGN KEY (mission_id) REFERENCES public.missions(id) ON DELETE CASCADE;


--
-- Name: payments payments_enrollment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_enrollment_id_fkey FOREIGN KEY (enrollment_id) REFERENCES public.enrollments(id) ON DELETE CASCADE;


--
-- Name: pitch_attempts pitch_attempts_mission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pitch_attempts
    ADD CONSTRAINT pitch_attempts_mission_id_fkey FOREIGN KEY (mission_id) REFERENCES public.missions(id) ON DELETE SET NULL;


--
-- Name: pitch_attempts pitch_attempts_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pitch_attempts
    ADD CONSTRAINT pitch_attempts_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: reflections reflections_mission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reflections
    ADD CONSTRAINT reflections_mission_id_fkey FOREIGN KEY (mission_id) REFERENCES public.missions(id) ON DELETE CASCADE;


--
-- Name: reflections reflections_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reflections
    ADD CONSTRAINT reflections_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: scholarships scholarships_application_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scholarships
    ADD CONSTRAINT scholarships_application_id_fkey FOREIGN KEY (application_id) REFERENCES public.applications(id) ON DELETE CASCADE;


--
-- Name: school_admins school_admins_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.school_admins
    ADD CONSTRAINT school_admins_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.schools(id) ON DELETE CASCADE;


--
-- Name: school_admins school_admins_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.school_admins
    ADD CONSTRAINT school_admins_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: school_invites school_invites_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.school_invites
    ADD CONSTRAINT school_invites_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id);


--
-- Name: school_invites school_invites_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.school_invites
    ADD CONSTRAINT school_invites_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.schools(id) ON DELETE CASCADE;


--
-- Name: school_licenses school_licenses_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.school_licenses
    ADD CONSTRAINT school_licenses_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.schools(id) ON DELETE CASCADE;


--
-- Name: school_name_mappings school_name_mappings_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.school_name_mappings
    ADD CONSTRAINT school_name_mappings_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id);


--
-- Name: school_student_enrollments school_student_enrollments_enrolled_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.school_student_enrollments
    ADD CONSTRAINT school_student_enrollments_enrolled_by_fkey FOREIGN KEY (enrolled_by) REFERENCES auth.users(id);


--
-- Name: school_student_enrollments school_student_enrollments_invite_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.school_student_enrollments
    ADD CONSTRAINT school_student_enrollments_invite_id_fkey FOREIGN KEY (invite_id) REFERENCES public.school_invites(id);


--
-- Name: school_student_enrollments school_student_enrollments_license_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.school_student_enrollments
    ADD CONSTRAINT school_student_enrollments_license_id_fkey FOREIGN KEY (license_id) REFERENCES public.school_licenses(id);


--
-- Name: school_student_enrollments school_student_enrollments_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.school_student_enrollments
    ADD CONSTRAINT school_student_enrollments_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.schools(id) ON DELETE CASCADE;


--
-- Name: school_student_enrollments school_student_enrollments_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.school_student_enrollments
    ADD CONSTRAINT school_student_enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: skill_assessments skill_assessments_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_assessments
    ADD CONSTRAINT skill_assessments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: skill_insights skill_insights_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_insights
    ADD CONSTRAINT skill_insights_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: skill_mappings skill_mappings_mission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_mappings
    ADD CONSTRAINT skill_mappings_mission_id_fkey FOREIGN KEY (mission_id) REFERENCES public.missions(id) ON DELETE CASCADE;


--
-- Name: skill_scores skill_scores_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_scores
    ADD CONSTRAINT skill_scores_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: strength_history strength_history_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.strength_history
    ADD CONSTRAINT strength_history_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: strength_profiles strength_profiles_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.strength_profiles
    ADD CONSTRAINT strength_profiles_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: student_issues student_issues_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_issues
    ADD CONSTRAINT student_issues_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: student_missions student_missions_mission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_missions
    ADD CONSTRAINT student_missions_mission_id_fkey FOREIGN KEY (mission_id) REFERENCES public.missions(id) ON DELETE CASCADE;


--
-- Name: student_missions student_missions_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_missions
    ADD CONSTRAINT student_missions_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: student_progress student_progress_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_progress
    ADD CONSTRAINT student_progress_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: student_progress student_progress_week_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_progress
    ADD CONSTRAINT student_progress_week_id_fkey FOREIGN KEY (week_id) REFERENCES public.curriculum_weeks(id) ON DELETE CASCADE;


--
-- Name: student_prompt_favorites student_prompt_favorites_prompt_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_prompt_favorites
    ADD CONSTRAINT student_prompt_favorites_prompt_id_fkey FOREIGN KEY (prompt_id) REFERENCES public.prompts(id) ON DELETE CASCADE;


--
-- Name: student_prompt_favorites student_prompt_favorites_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_prompt_favorites
    ADD CONSTRAINT student_prompt_favorites_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: student_prompt_history student_prompt_history_prompt_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_prompt_history
    ADD CONSTRAINT student_prompt_history_prompt_id_fkey FOREIGN KEY (prompt_id) REFERENCES public.prompts(id) ON DELETE CASCADE;


--
-- Name: student_prompt_history student_prompt_history_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_prompt_history
    ADD CONSTRAINT student_prompt_history_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: student_revenue student_revenue_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_revenue
    ADD CONSTRAINT student_revenue_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: student_tool_progress student_tool_progress_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_tool_progress
    ADD CONSTRAINT student_tool_progress_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: student_tool_progress student_tool_progress_tutorial_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_tool_progress
    ADD CONSTRAINT student_tool_progress_tutorial_id_fkey FOREIGN KEY (tutorial_id) REFERENCES public.tool_tutorials(id);


--
-- Name: students students_school_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_school_id_fkey FOREIGN KEY (school_id) REFERENCES public.schools(id) ON DELETE SET NULL;


--
-- Name: students students_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: team_booking_credits team_booking_credits_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_booking_credits
    ADD CONSTRAINT team_booking_credits_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id) ON DELETE CASCADE;


--
-- Name: team_members team_members_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: team_members team_members_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id) ON DELETE CASCADE;


--
-- Name: team_mentor_assignments team_mentor_assignments_assigned_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_mentor_assignments
    ADD CONSTRAINT team_mentor_assignments_assigned_by_fkey FOREIGN KEY (assigned_by) REFERENCES auth.users(id);


--
-- Name: team_mentor_assignments team_mentor_assignments_mentor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_mentor_assignments
    ADD CONSTRAINT team_mentor_assignments_mentor_id_fkey FOREIGN KEY (mentor_id) REFERENCES public.mentor_profiles(id) ON DELETE CASCADE;


--
-- Name: team_mentor_assignments team_mentor_assignments_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_mentor_assignments
    ADD CONSTRAINT team_mentor_assignments_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id) ON DELETE CASCADE;


--
-- Name: team_notes team_notes_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_notes
    ADD CONSTRAINT team_notes_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.students(id);


--
-- Name: team_notes team_notes_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_notes
    ADD CONSTRAINT team_notes_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id) ON DELETE CASCADE;


--
-- Name: teams teams_cohort_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_cohort_id_fkey FOREIGN KEY (cohort_id) REFERENCES public.cohorts(id);


--
-- Name: teams teams_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.students(id);


--
-- Name: announcements Admins can manage all announcements; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all announcements" ON public.announcements USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: artifacts Admins can manage all artifacts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all artifacts" ON public.artifacts USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: team_mentor_assignments Admins can manage all assignments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all assignments" ON public.team_mentor_assignments USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: behavioral_signals Admins can manage all behavioral signals; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all behavioral signals" ON public.behavioral_signals USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: mentor_bookings Admins can manage all bookings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all bookings" ON public.mentor_bookings USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: club_members Admins can manage all club members; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all club members" ON public.club_members USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: clubs Admins can manage all clubs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all clubs" ON public.clubs USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: team_booking_credits Admins can manage all credits; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all credits" ON public.team_booking_credits USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: enrollments Admins can manage all enrollments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all enrollments" ON public.enrollments USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: school_student_enrollments Admins can manage all enrollments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all enrollments" ON public.school_student_enrollments USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: guardian_students Admins can manage all guardian links; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all guardian links" ON public.guardian_students USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: school_invites Admins can manage all invites; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all invites" ON public.school_invites USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: mentor_profiles Admins can manage all mentor profiles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all mentor profiles" ON public.mentor_profiles USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: payments Admins can manage all payments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all payments" ON public.payments USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: pitch_attempts Admins can manage all pitch attempts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all pitch attempts" ON public.pitch_attempts USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: reflections Admins can manage all reflections; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all reflections" ON public.reflections USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: scholarships Admins can manage all scholarships; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all scholarships" ON public.scholarships USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: school_admins Admins can manage all school admins; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all school admins" ON public.school_admins USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: school_licenses Admins can manage all school licenses; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all school licenses" ON public.school_licenses USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: schools Admins can manage all schools; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all schools" ON public.schools USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: skill_assessments Admins can manage all skill assessments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all skill assessments" ON public.skill_assessments USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: skill_insights Admins can manage all skill insights; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all skill insights" ON public.skill_insights USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: skill_scores Admins can manage all skills; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all skills" ON public.skill_scores USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: strength_history Admins can manage all strength history; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all strength history" ON public.strength_history USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: strength_profiles Admins can manage all strength profiles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all strength profiles" ON public.strength_profiles USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: student_missions Admins can manage all student missions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all student missions" ON public.student_missions USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: bonus_credits_log Admins can manage bonus credits; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage bonus credits" ON public.bonus_credits_log USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: mission_steps Admins can manage mission steps; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage mission steps" ON public.mission_steps USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: missions Admins can manage missions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage missions" ON public.missions USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: pricing_tiers Admins can manage pricing tiers; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage pricing tiers" ON public.pricing_tiers USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: prompts Admins can manage prompts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage prompts" ON public.prompts USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: school_name_mappings Admins can manage school name mappings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage school name mappings" ON public.school_name_mappings USING (public.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: skill_mappings Admins can manage skill mappings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage skill mappings" ON public.skill_mappings USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: mentor_availability Admins can view all availability; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all availability" ON public.mentor_availability FOR SELECT USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: homework_feedback Admins can view all feedback; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all feedback" ON public.homework_feedback FOR SELECT USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: user_roles Admins can view all roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: mentor_blocked_dates Admins can view blocked dates; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view blocked dates" ON public.mentor_blocked_dates FOR SELECT USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: leads Admins can view leads; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view leads" ON public.leads FOR SELECT USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: applications Anyone can create applications; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can create applications" ON public.applications FOR INSERT WITH CHECK (true);


--
-- Name: leads Anyone can create leads; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can create leads" ON public.leads FOR INSERT WITH CHECK (true);


--
-- Name: applications Anyone can update applications; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can update applications" ON public.applications FOR UPDATE USING (true);


--
-- Name: school_invites Anyone can view active invites; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view active invites" ON public.school_invites FOR SELECT USING (((is_active = true) AND ((expires_at IS NULL) OR (expires_at > now()))));


--
-- Name: pricing_tiers Anyone can view active pricing tiers; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view active pricing tiers" ON public.pricing_tiers FOR SELECT USING ((is_active = true));


--
-- Name: applications Anyone can view applications; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view applications" ON public.applications FOR SELECT USING (true);


--
-- Name: cohorts Anyone can view cohorts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view cohorts" ON public.cohorts FOR SELECT USING (true);


--
-- Name: curriculum_weeks Anyone can view curriculum weeks; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view curriculum weeks" ON public.curriculum_weeks FOR SELECT USING (true);


--
-- Name: mission_steps Anyone can view mission steps; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view mission steps" ON public.mission_steps FOR SELECT USING (true);


--
-- Name: missions Anyone can view missions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view missions" ON public.missions FOR SELECT USING (true);


--
-- Name: prompts Anyone can view prompts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view prompts" ON public.prompts FOR SELECT USING (true);


--
-- Name: resources Anyone can view resources; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view resources" ON public.resources FOR SELECT USING (true);


--
-- Name: school_name_mappings Anyone can view school name mappings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view school name mappings" ON public.school_name_mappings FOR SELECT USING (true);


--
-- Name: skill_mappings Anyone can view skill mappings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view skill mappings" ON public.skill_mappings FOR SELECT USING (true);


--
-- Name: tool_tutorials Anyone can view tool tutorials; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view tool tutorials" ON public.tool_tutorials FOR SELECT USING (true);


--
-- Name: club_members Club advisors can manage members; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Club advisors can manage members" ON public.club_members USING ((club_id IN ( SELECT clubs.id
   FROM public.clubs
  WHERE (clubs.advisor_user_id = auth.uid()))));


--
-- Name: clubs Club advisors can update their clubs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Club advisors can update their clubs" ON public.clubs FOR UPDATE USING ((advisor_user_id = auth.uid()));


--
-- Name: clubs Club advisors can view their clubs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Club advisors can view their clubs" ON public.clubs FOR SELECT USING ((advisor_user_id = auth.uid()));


--
-- Name: club_members Club members can view members; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Club members can view members" ON public.club_members FOR SELECT USING ((club_id IN ( SELECT club_members_1.club_id
   FROM public.club_members club_members_1
  WHERE (club_members_1.student_id IN ( SELECT students.id
           FROM public.students
          WHERE (students.user_id = auth.uid()))))));


--
-- Name: guardian_students Guardians can view their linked students; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Guardians can view their linked students" ON public.guardian_students FOR SELECT USING ((guardian_user_id = auth.uid()));


--
-- Name: chat_messages Mentors can insert messages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Mentors can insert messages" ON public.chat_messages FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM public.user_roles
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'mentor'::public.app_role)))));


--
-- Name: mentor_availability Mentors can manage own availability; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Mentors can manage own availability" ON public.mentor_availability USING ((mentor_id IN ( SELECT mentor_profiles.id
   FROM public.mentor_profiles
  WHERE (mentor_profiles.user_id = auth.uid()))));


--
-- Name: mentor_blocked_dates Mentors can manage own blocked dates; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Mentors can manage own blocked dates" ON public.mentor_blocked_dates USING ((mentor_id IN ( SELECT mentor_profiles.id
   FROM public.mentor_profiles
  WHERE (mentor_profiles.user_id = auth.uid()))));


--
-- Name: homework_feedback Mentors can manage their feedback; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Mentors can manage their feedback" ON public.homework_feedback USING ((mentor_id IN ( SELECT mentor_profiles.id
   FROM public.mentor_profiles
  WHERE (mentor_profiles.user_id = auth.uid()))));


--
-- Name: chat_conversations Mentors can update conversations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Mentors can update conversations" ON public.chat_conversations FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM public.user_roles
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'mentor'::public.app_role)))));


--
-- Name: mentor_profiles Mentors can update own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Mentors can update own profile" ON public.mentor_profiles FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: mentor_bookings Mentors can update their bookings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Mentors can update their bookings" ON public.mentor_bookings FOR UPDATE USING ((mentor_id IN ( SELECT mentor_profiles.id
   FROM public.mentor_profiles
  WHERE (mentor_profiles.user_id = auth.uid()))));


--
-- Name: chat_conversations Mentors can view all conversations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Mentors can view all conversations" ON public.chat_conversations FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.user_roles
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'mentor'::public.app_role)))));


--
-- Name: chat_messages Mentors can view all messages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Mentors can view all messages" ON public.chat_messages FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.user_roles
  WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'mentor'::public.app_role)))));


--
-- Name: mentor_profiles Mentors can view own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Mentors can view own profile" ON public.mentor_profiles FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: team_mentor_assignments Mentors can view their assignments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Mentors can view their assignments" ON public.team_mentor_assignments FOR SELECT USING ((mentor_id IN ( SELECT mentor_profiles.id
   FROM public.mentor_profiles
  WHERE (mentor_profiles.user_id = auth.uid()))));


--
-- Name: mentor_bookings Mentors can view their bookings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Mentors can view their bookings" ON public.mentor_bookings FOR SELECT USING ((mentor_id IN ( SELECT mentor_profiles.id
   FROM public.mentor_profiles
  WHERE (mentor_profiles.user_id = auth.uid()))));


--
-- Name: team_notes Note creators can delete notes; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Note creators can delete notes" ON public.team_notes FOR DELETE USING ((created_by IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: team_notes Note creators can delete their notes; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Note creators can delete their notes" ON public.team_notes FOR DELETE USING ((created_by IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: team_notes Note creators can update notes; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Note creators can update notes" ON public.team_notes FOR UPDATE USING ((created_by IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: team_notes Note creators can update their notes; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Note creators can update their notes" ON public.team_notes FOR UPDATE USING ((created_by IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: school_admins Primary school admins can manage other admins; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Primary school admins can manage other admins" ON public.school_admins USING (public.is_primary_school_admin(auth.uid(), school_id));


--
-- Name: school_student_enrollments School admins can manage own enrollments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "School admins can manage own enrollments" ON public.school_student_enrollments USING ((school_id IN ( SELECT school_admins.school_id
   FROM public.school_admins
  WHERE (school_admins.user_id = auth.uid()))));


--
-- Name: school_invites School admins can manage own invites; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "School admins can manage own invites" ON public.school_invites USING ((school_id IN ( SELECT school_admins.school_id
   FROM public.school_admins
  WHERE (school_admins.user_id = auth.uid()))));


--
-- Name: clubs School admins can manage school clubs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "School admins can manage school clubs" ON public.clubs USING ((school_id IN ( SELECT school_admins.school_id
   FROM public.school_admins
  WHERE (school_admins.user_id = auth.uid()))));


--
-- Name: students School admins can update school students; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "School admins can update school students" ON public.students FOR UPDATE USING ((school_id IN ( SELECT public.get_user_school_ids(auth.uid()) AS get_user_school_ids)));


--
-- Name: schools School admins can update their school; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "School admins can update their school" ON public.schools FOR UPDATE USING ((id IN ( SELECT school_admins.school_id
   FROM public.school_admins
  WHERE ((school_admins.user_id = auth.uid()) AND (school_admins.role = 'admin'::text)))));


--
-- Name: school_admins School admins can view admins of their school; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "School admins can view admins of their school" ON public.school_admins FOR SELECT USING ((school_id IN ( SELECT public.get_user_school_ids(auth.uid()) AS get_user_school_ids)));


--
-- Name: students School admins can view school students; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "School admins can view school students" ON public.students FOR SELECT USING ((school_id IN ( SELECT public.get_user_school_ids(auth.uid()) AS get_user_school_ids)));


--
-- Name: school_licenses School admins can view their licenses; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "School admins can view their licenses" ON public.school_licenses FOR SELECT USING ((school_id IN ( SELECT school_admins.school_id
   FROM public.school_admins
  WHERE (school_admins.user_id = auth.uid()))));


--
-- Name: schools School admins can view their school; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "School admins can view their school" ON public.schools FOR SELECT USING ((id IN ( SELECT school_admins.school_id
   FROM public.school_admins
  WHERE (school_admins.user_id = auth.uid()))));


--
-- Name: strength_history School admins can view their students history; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "School admins can view their students history" ON public.strength_history FOR SELECT USING ((student_id IN ( SELECT s.id
   FROM public.students s
  WHERE (s.school_id IN ( SELECT school_admins.school_id
           FROM public.school_admins
          WHERE (school_admins.user_id = auth.uid()))))));


--
-- Name: strength_profiles School admins can view their students profiles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "School admins can view their students profiles" ON public.strength_profiles FOR SELECT USING ((student_id IN ( SELECT s.id
   FROM public.students s
  WHERE (s.school_id IN ( SELECT school_admins.school_id
           FROM public.school_admins
          WHERE (school_admins.user_id = auth.uid()))))));


--
-- Name: skill_assessments School admins can view their students skill assessments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "School admins can view their students skill assessments" ON public.skill_assessments FOR SELECT USING ((student_id IN ( SELECT s.id
   FROM (public.students s
     JOIN public.school_student_enrollments sse ON ((s.id = sse.student_id)))
  WHERE (sse.school_id IN ( SELECT public.get_user_school_ids(auth.uid()) AS get_user_school_ids)))));


--
-- Name: skill_insights School admins can view their students skill insights; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "School admins can view their students skill insights" ON public.skill_insights FOR SELECT USING ((student_id IN ( SELECT s.id
   FROM (public.students s
     JOIN public.school_student_enrollments sse ON ((s.id = sse.student_id)))
  WHERE (sse.school_id IN ( SELECT public.get_user_school_ids(auth.uid()) AS get_user_school_ids)))));


--
-- Name: student_prompt_favorites Students can add favorites; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can add favorites" ON public.student_prompt_favorites FOR INSERT WITH CHECK ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: student_prompt_history Students can add history; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can add history" ON public.student_prompt_history FOR INSERT WITH CHECK ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: chat_messages Students can create messages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can create messages" ON public.chat_messages FOR INSERT WITH CHECK ((conversation_id IN ( SELECT chat_conversations.id
   FROM public.chat_conversations
  WHERE (chat_conversations.student_id IN ( SELECT students.id
           FROM public.students
          WHERE (students.user_id = auth.uid()))))));


--
-- Name: artifacts Students can create own artifacts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can create own artifacts" ON public.artifacts FOR INSERT WITH CHECK ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: behavioral_signals Students can create own behavioral signals; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can create own behavioral signals" ON public.behavioral_signals FOR INSERT WITH CHECK ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: launch_checklists Students can create own checklist; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can create own checklist" ON public.launch_checklists FOR INSERT WITH CHECK ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: chat_conversations Students can create own conversations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can create own conversations" ON public.chat_conversations FOR INSERT WITH CHECK ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: idea_boards Students can create own idea boards; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can create own idea boards" ON public.idea_boards FOR INSERT WITH CHECK ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: idea_cards Students can create own idea cards; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can create own idea cards" ON public.idea_cards FOR INSERT WITH CHECK ((board_id IN ( SELECT idea_boards.id
   FROM public.idea_boards
  WHERE (idea_boards.student_id IN ( SELECT students.id
           FROM public.students
          WHERE (students.user_id = auth.uid()))))));


--
-- Name: student_issues Students can create own issues; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can create own issues" ON public.student_issues FOR INSERT WITH CHECK ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: pitch_attempts Students can create own pitch attempts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can create own pitch attempts" ON public.pitch_attempts FOR INSERT WITH CHECK ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: student_tool_progress Students can create own progress; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can create own progress" ON public.student_tool_progress FOR INSERT WITH CHECK ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: reflections Students can create own reflections; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can create own reflections" ON public.reflections FOR INSERT WITH CHECK ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: teams Students can create teams; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can create teams" ON public.teams FOR INSERT WITH CHECK ((created_by IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: artifacts Students can delete own artifacts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can delete own artifacts" ON public.artifacts FOR DELETE USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: idea_boards Students can delete own idea boards; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can delete own idea boards" ON public.idea_boards FOR DELETE USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: idea_cards Students can delete own idea cards; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can delete own idea cards" ON public.idea_cards FOR DELETE USING ((board_id IN ( SELECT idea_boards.id
   FROM public.idea_boards
  WHERE (idea_boards.student_id IN ( SELECT students.id
           FROM public.students
          WHERE (students.user_id = auth.uid()))))));


--
-- Name: student_missions Students can insert own missions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can insert own missions" ON public.student_missions FOR INSERT WITH CHECK ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: skill_scores Students can insert own skills; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can insert own skills" ON public.skill_scores FOR INSERT WITH CHECK ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: strength_history Students can insert own strength history; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can insert own strength history" ON public.strength_history FOR INSERT WITH CHECK ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: strength_profiles Students can insert own strength profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can insert own strength profile" ON public.strength_profiles FOR INSERT WITH CHECK ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: student_progress Students can insert their own progress; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can insert their own progress" ON public.student_progress FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM public.students
  WHERE ((students.id = student_progress.student_id) AND (students.user_id = auth.uid())))));


--
-- Name: student_revenue Students can insert their own revenue; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can insert their own revenue" ON public.student_revenue FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM public.students
  WHERE ((students.id = student_revenue.student_id) AND (students.user_id = auth.uid())))));


--
-- Name: team_members Students can join teams; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can join teams" ON public.team_members FOR INSERT WITH CHECK ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: team_members Students can leave teams; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can leave teams" ON public.team_members FOR DELETE USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: student_prompt_favorites Students can remove favorites; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can remove favorites" ON public.student_prompt_favorites FOR DELETE USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: artifacts Students can update own artifacts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can update own artifacts" ON public.artifacts FOR UPDATE USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: launch_checklists Students can update own checklist; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can update own checklist" ON public.launch_checklists FOR UPDATE USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: chat_conversations Students can update own conversations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can update own conversations" ON public.chat_conversations FOR UPDATE USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: idea_boards Students can update own idea boards; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can update own idea boards" ON public.idea_boards FOR UPDATE USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: idea_cards Students can update own idea cards; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can update own idea cards" ON public.idea_cards FOR UPDATE USING ((board_id IN ( SELECT idea_boards.id
   FROM public.idea_boards
  WHERE (idea_boards.student_id IN ( SELECT students.id
           FROM public.students
          WHERE (students.user_id = auth.uid()))))));


--
-- Name: student_issues Students can update own issues; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can update own issues" ON public.student_issues FOR UPDATE USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: student_missions Students can update own missions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can update own missions" ON public.student_missions FOR UPDATE USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: pitch_attempts Students can update own pitch attempts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can update own pitch attempts" ON public.pitch_attempts FOR UPDATE USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: student_tool_progress Students can update own progress; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can update own progress" ON public.student_tool_progress FOR UPDATE USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: reflections Students can update own reflections; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can update own reflections" ON public.reflections FOR UPDATE USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: skill_scores Students can update own skills; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can update own skills" ON public.skill_scores FOR UPDATE USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: strength_profiles Students can update own strength profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can update own strength profile" ON public.strength_profiles FOR UPDATE USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: student_progress Students can update their own progress; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can update their own progress" ON public.student_progress FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM public.students
  WHERE ((students.id = student_progress.student_id) AND (students.user_id = auth.uid())))));


--
-- Name: mentor_profiles Students can view active mentors; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view active mentors" ON public.mentor_profiles FOR SELECT USING (((is_active = true) AND public.has_role(auth.uid(), 'student'::public.app_role)));


--
-- Name: pitch_attempts Students can view all pitch attempts for leaderboard; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view all pitch attempts for leaderboard" ON public.pitch_attempts FOR SELECT USING (true);


--
-- Name: clubs Students can view clubs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view clubs" ON public.clubs FOR SELECT USING ((is_active = true));


--
-- Name: homework_feedback Students can view feedback on their progress; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view feedback on their progress" ON public.homework_feedback FOR SELECT USING ((progress_id IN ( SELECT student_progress.id
   FROM public.student_progress
  WHERE (student_progress.student_id IN ( SELECT students.id
           FROM public.students
          WHERE (students.user_id = auth.uid()))))));


--
-- Name: live_classes Students can view live classes; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view live classes" ON public.live_classes FOR SELECT USING (true);


--
-- Name: mentor_availability Students can view mentor availability; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view mentor availability" ON public.mentor_availability FOR SELECT USING (public.has_role(auth.uid(), 'student'::public.app_role));


--
-- Name: artifacts Students can view own artifacts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view own artifacts" ON public.artifacts FOR SELECT USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: behavioral_signals Students can view own behavioral signals; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view own behavioral signals" ON public.behavioral_signals FOR SELECT USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: launch_checklists Students can view own checklist; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view own checklist" ON public.launch_checklists FOR SELECT USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: chat_conversations Students can view own conversations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view own conversations" ON public.chat_conversations FOR SELECT USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: school_student_enrollments Students can view own enrollment; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view own enrollment" ON public.school_student_enrollments FOR SELECT USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: student_prompt_favorites Students can view own favorites; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view own favorites" ON public.student_prompt_favorites FOR SELECT USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: student_prompt_history Students can view own history; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view own history" ON public.student_prompt_history FOR SELECT USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: idea_boards Students can view own idea boards; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view own idea boards" ON public.idea_boards FOR SELECT USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: idea_cards Students can view own idea cards; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view own idea cards" ON public.idea_cards FOR SELECT USING ((board_id IN ( SELECT idea_boards.id
   FROM public.idea_boards
  WHERE (idea_boards.student_id IN ( SELECT students.id
           FROM public.students
          WHERE (students.user_id = auth.uid()))))));


--
-- Name: student_issues Students can view own issues; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view own issues" ON public.student_issues FOR SELECT USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: chat_messages Students can view own messages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view own messages" ON public.chat_messages FOR SELECT USING ((conversation_id IN ( SELECT chat_conversations.id
   FROM public.chat_conversations
  WHERE (chat_conversations.student_id IN ( SELECT students.id
           FROM public.students
          WHERE (students.user_id = auth.uid()))))));


--
-- Name: student_missions Students can view own missions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view own missions" ON public.student_missions FOR SELECT USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: pitch_attempts Students can view own pitch attempts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view own pitch attempts" ON public.pitch_attempts FOR SELECT USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: student_tool_progress Students can view own progress; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view own progress" ON public.student_tool_progress FOR SELECT USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: reflections Students can view own reflections; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view own reflections" ON public.reflections FOR SELECT USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: skill_assessments Students can view own skill assessments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view own skill assessments" ON public.skill_assessments FOR SELECT USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: skill_insights Students can view own skill insights; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view own skill insights" ON public.skill_insights FOR SELECT USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: skill_scores Students can view own skills; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view own skills" ON public.skill_scores FOR SELECT USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: strength_history Students can view own strength history; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view own strength history" ON public.strength_history FOR SELECT USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: strength_profiles Students can view own strength profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view own strength profile" ON public.strength_profiles FOR SELECT USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: team_members Students can view team members of their teams; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view team members of their teams" ON public.team_members FOR SELECT USING ((team_id IN ( SELECT team_members_1.team_id
   FROM public.team_members team_members_1
  WHERE (team_members_1.student_id IN ( SELECT students.id
           FROM public.students
          WHERE (students.user_id = auth.uid()))))));


--
-- Name: teams Students can view teams they are members of; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view teams they are members of" ON public.teams FOR SELECT USING ((id IN ( SELECT team_members.team_id
   FROM public.team_members
  WHERE (team_members.student_id IN ( SELECT students.id
           FROM public.students
          WHERE (students.user_id = auth.uid()))))));


--
-- Name: teams Students can view teams they belong to; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view teams they belong to" ON public.teams FOR SELECT USING (((id IN ( SELECT team_members.team_id
   FROM public.team_members
  WHERE (team_members.student_id IN ( SELECT students.id
           FROM public.students
          WHERE (students.user_id = auth.uid()))))) OR (created_by IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid())))));


--
-- Name: guardian_students Students can view their guardians; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view their guardians" ON public.guardian_students FOR SELECT USING ((student_id IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: student_progress Students can view their own progress; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view their own progress" ON public.student_progress FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.students
  WHERE ((students.id = student_progress.student_id) AND (students.user_id = auth.uid())))));


--
-- Name: student_revenue Students can view their own revenue; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Students can view their own revenue" ON public.student_revenue FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.students
  WHERE ((students.id = student_revenue.student_id) AND (students.user_id = auth.uid())))));


--
-- Name: teams Team creators can update teams; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Team creators can update teams" ON public.teams FOR UPDATE USING ((created_by IN ( SELECT students.id
   FROM public.students
  WHERE (students.user_id = auth.uid()))));


--
-- Name: mentor_bookings Team members can create bookings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Team members can create bookings" ON public.mentor_bookings FOR INSERT WITH CHECK ((team_id IN ( SELECT team_members.team_id
   FROM public.team_members
  WHERE (team_members.student_id IN ( SELECT students.id
           FROM public.students
          WHERE (students.user_id = auth.uid()))))));


--
-- Name: team_notes Team members can create notes; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Team members can create notes" ON public.team_notes FOR INSERT WITH CHECK ((team_id IN ( SELECT team_members.team_id
   FROM public.team_members
  WHERE (team_members.student_id IN ( SELECT students.id
           FROM public.students
          WHERE (students.user_id = auth.uid()))))));


--
-- Name: mentor_bookings Team members can update their bookings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Team members can update their bookings" ON public.mentor_bookings FOR UPDATE USING ((team_id IN ( SELECT team_members.team_id
   FROM public.team_members
  WHERE (team_members.student_id IN ( SELECT students.id
           FROM public.students
          WHERE (students.user_id = auth.uid()))))));


--
-- Name: team_members Team members can view members; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Team members can view members" ON public.team_members FOR SELECT USING ((team_id IN ( SELECT team_members_1.team_id
   FROM public.team_members team_members_1
  WHERE (team_members_1.student_id IN ( SELECT students.id
           FROM public.students
          WHERE (students.user_id = auth.uid()))))));


--
-- Name: team_notes Team members can view notes; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Team members can view notes" ON public.team_notes FOR SELECT USING ((team_id IN ( SELECT team_members.team_id
   FROM public.team_members
  WHERE (team_members.student_id IN ( SELECT students.id
           FROM public.students
          WHERE (students.user_id = auth.uid()))))));


--
-- Name: team_mentor_assignments Team members can view their assignments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Team members can view their assignments" ON public.team_mentor_assignments FOR SELECT USING ((team_id IN ( SELECT team_members.team_id
   FROM public.team_members
  WHERE (team_members.student_id IN ( SELECT students.id
           FROM public.students
          WHERE (students.user_id = auth.uid()))))));


--
-- Name: bonus_credits_log Team members can view their bonus log; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Team members can view their bonus log" ON public.bonus_credits_log FOR SELECT USING ((team_id IN ( SELECT team_members.team_id
   FROM public.team_members
  WHERE (team_members.student_id IN ( SELECT students.id
           FROM public.students
          WHERE (students.user_id = auth.uid()))))));


--
-- Name: mentor_bookings Team members can view their bookings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Team members can view their bookings" ON public.mentor_bookings FOR SELECT USING ((team_id IN ( SELECT team_members.team_id
   FROM public.team_members
  WHERE (team_members.student_id IN ( SELECT students.id
           FROM public.students
          WHERE (students.user_id = auth.uid()))))));


--
-- Name: team_booking_credits Team members can view their credits; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Team members can view their credits" ON public.team_booking_credits FOR SELECT USING ((team_id IN ( SELECT team_members.team_id
   FROM public.team_members
  WHERE (team_members.student_id IN ( SELECT students.id
           FROM public.students
          WHERE (students.user_id = auth.uid()))))));


--
-- Name: team_notes Team members can view their team notes; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Team members can view their team notes" ON public.team_notes FOR SELECT USING ((team_id IN ( SELECT team_members.team_id
   FROM public.team_members
  WHERE (team_members.student_id IN ( SELECT students.id
           FROM public.students
          WHERE (students.user_id = auth.uid()))))));


--
-- Name: enrollments Users can create own enrollments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create own enrollments" ON public.enrollments FOR INSERT WITH CHECK ((user_id = auth.uid()));


--
-- Name: scholarships Users can create scholarship applications; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create scholarship applications" ON public.scholarships FOR INSERT WITH CHECK ((application_id IN ( SELECT applications.id
   FROM public.applications
  WHERE (applications.user_id = auth.uid()))));


--
-- Name: students Users can create their own student profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own student profile" ON public.students FOR INSERT TO authenticated WITH CHECK ((auth.uid() = user_id));


--
-- Name: enrollments Users can update own enrollments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update own enrollments" ON public.enrollments FOR UPDATE USING ((user_id = auth.uid()));


--
-- Name: students Users can update their own student profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own student profile" ON public.students FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: enrollments Users can view own enrollments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view own enrollments" ON public.enrollments FOR SELECT USING ((user_id = auth.uid()));


--
-- Name: payments Users can view own payments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view own payments" ON public.payments FOR SELECT USING ((enrollment_id IN ( SELECT enrollments.id
   FROM public.enrollments
  WHERE (enrollments.user_id = auth.uid()))));


--
-- Name: user_roles Users can view own roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING ((auth.uid() = user_id));


--
-- Name: scholarships Users can view own scholarships; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view own scholarships" ON public.scholarships FOR SELECT USING ((application_id IN ( SELECT applications.id
   FROM public.applications
  WHERE (applications.user_id = auth.uid()))));


--
-- Name: announcements Users can view relevant announcements; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view relevant announcements" ON public.announcements FOR SELECT USING (((published_at IS NOT NULL) AND (published_at <= now()) AND ((expires_at IS NULL) OR (expires_at > now()))));


--
-- Name: students Users can view their own student profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own student profile" ON public.students FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: announcements; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

--
-- Name: applications; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

--
-- Name: artifacts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.artifacts ENABLE ROW LEVEL SECURITY;

--
-- Name: behavioral_signals; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.behavioral_signals ENABLE ROW LEVEL SECURITY;

--
-- Name: bonus_credits_log; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.bonus_credits_log ENABLE ROW LEVEL SECURITY;

--
-- Name: chat_conversations; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;

--
-- Name: chat_messages; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

--
-- Name: club_members; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.club_members ENABLE ROW LEVEL SECURITY;

--
-- Name: clubs; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.clubs ENABLE ROW LEVEL SECURITY;

--
-- Name: cohorts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.cohorts ENABLE ROW LEVEL SECURITY;

--
-- Name: curriculum_weeks; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.curriculum_weeks ENABLE ROW LEVEL SECURITY;

--
-- Name: enrollments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

--
-- Name: guardian_students; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.guardian_students ENABLE ROW LEVEL SECURITY;

--
-- Name: homework_feedback; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.homework_feedback ENABLE ROW LEVEL SECURITY;

--
-- Name: idea_boards; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.idea_boards ENABLE ROW LEVEL SECURITY;

--
-- Name: idea_cards; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.idea_cards ENABLE ROW LEVEL SECURITY;

--
-- Name: launch_checklists; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.launch_checklists ENABLE ROW LEVEL SECURITY;

--
-- Name: leads; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

--
-- Name: live_classes; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.live_classes ENABLE ROW LEVEL SECURITY;

--
-- Name: mentor_availability; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.mentor_availability ENABLE ROW LEVEL SECURITY;

--
-- Name: mentor_blocked_dates; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.mentor_blocked_dates ENABLE ROW LEVEL SECURITY;

--
-- Name: mentor_bookings; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.mentor_bookings ENABLE ROW LEVEL SECURITY;

--
-- Name: mentor_profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.mentor_profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: mission_steps; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.mission_steps ENABLE ROW LEVEL SECURITY;

--
-- Name: missions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;

--
-- Name: payments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

--
-- Name: pitch_attempts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.pitch_attempts ENABLE ROW LEVEL SECURITY;

--
-- Name: pricing_tiers; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.pricing_tiers ENABLE ROW LEVEL SECURITY;

--
-- Name: prompts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

--
-- Name: reflections; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.reflections ENABLE ROW LEVEL SECURITY;

--
-- Name: resources; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

--
-- Name: scholarships; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;

--
-- Name: school_admins; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.school_admins ENABLE ROW LEVEL SECURITY;

--
-- Name: school_invites; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.school_invites ENABLE ROW LEVEL SECURITY;

--
-- Name: school_licenses; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.school_licenses ENABLE ROW LEVEL SECURITY;

--
-- Name: school_name_mappings; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.school_name_mappings ENABLE ROW LEVEL SECURITY;

--
-- Name: school_student_enrollments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.school_student_enrollments ENABLE ROW LEVEL SECURITY;

--
-- Name: schools; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

--
-- Name: skill_assessments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.skill_assessments ENABLE ROW LEVEL SECURITY;

--
-- Name: skill_insights; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.skill_insights ENABLE ROW LEVEL SECURITY;

--
-- Name: skill_mappings; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.skill_mappings ENABLE ROW LEVEL SECURITY;

--
-- Name: skill_scores; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.skill_scores ENABLE ROW LEVEL SECURITY;

--
-- Name: strength_history; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.strength_history ENABLE ROW LEVEL SECURITY;

--
-- Name: strength_profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.strength_profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: student_issues; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.student_issues ENABLE ROW LEVEL SECURITY;

--
-- Name: student_missions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.student_missions ENABLE ROW LEVEL SECURITY;

--
-- Name: student_progress; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;

--
-- Name: student_prompt_favorites; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.student_prompt_favorites ENABLE ROW LEVEL SECURITY;

--
-- Name: student_prompt_history; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.student_prompt_history ENABLE ROW LEVEL SECURITY;

--
-- Name: student_revenue; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.student_revenue ENABLE ROW LEVEL SECURITY;

--
-- Name: student_tool_progress; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.student_tool_progress ENABLE ROW LEVEL SECURITY;

--
-- Name: students; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

--
-- Name: team_booking_credits; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.team_booking_credits ENABLE ROW LEVEL SECURITY;

--
-- Name: team_members; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

--
-- Name: team_mentor_assignments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.team_mentor_assignments ENABLE ROW LEVEL SECURITY;

--
-- Name: team_notes; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.team_notes ENABLE ROW LEVEL SECURITY;

--
-- Name: teams; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

--
-- Name: tool_tutorials; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.tool_tutorials ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


