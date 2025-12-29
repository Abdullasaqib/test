-- =============================================
-- Fix Security Definer Views
-- =============================================

-- Drop the views first
DROP VIEW IF EXISTS public_leaderboard;
DROP VIEW IF EXISTS round_statistics;
DROP VIEW IF EXISTS school_stats;

-- Recreate public_leaderboard with security_invoker (respects RLS)
CREATE VIEW public_leaderboard 
WITH (security_invoker = true)
AS
SELECT id, founder_name, startup_name, country, grade, school_name,
       round, final_score, rank, is_top_20, is_top_10, scored_at
FROM applications
WHERE status = 'ai_scored' AND final_score IS NOT NULL
ORDER BY final_score DESC, scored_at;

-- Recreate round_statistics with security_invoker
CREATE VIEW round_statistics
WITH (security_invoker = true)
AS
SELECT 
  round,
  COUNT(*) as total_applications,
  COUNT(*) FILTER (WHERE status = 'ai_scored') as scored_count,
  AVG(final_score) FILTER (WHERE status = 'ai_scored') as avg_score,
  MAX(final_score) FILTER (WHERE status = 'ai_scored') as max_score,
  MIN(final_score) FILTER (WHERE status = 'ai_scored') as min_score
FROM applications
GROUP BY round;

-- Recreate school_stats with security_invoker
CREATE VIEW school_stats
WITH (security_invoker = true)
AS
SELECT 
  school_name,
  COUNT(*) as total_students,
  COUNT(*) FILTER (WHERE status = 'ai_scored') as scored_students,
  AVG(final_score) FILTER (WHERE status = 'ai_scored') as avg_score
FROM applications
WHERE school_name IS NOT NULL
GROUP BY school_name;