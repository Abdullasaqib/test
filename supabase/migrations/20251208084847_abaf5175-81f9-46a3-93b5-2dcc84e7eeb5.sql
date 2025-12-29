-- Auto-enroll existing students in Revolutionary Certificate
INSERT INTO student_certifications (student_id, certification_id, started_at)
SELECT 
  s.id,
  '761a157d-a1e0-4423-99b8-a58f5ddad129'::uuid,
  NOW()
FROM students s
WHERE s.onboarding_completed = true
ON CONFLICT (student_id, certification_id) DO NOTHING;

-- Enable realtime for key dashboard tables
ALTER PUBLICATION supabase_realtime ADD TABLE student_missions;
ALTER PUBLICATION supabase_realtime ADD TABLE skill_scores;
ALTER PUBLICATION supabase_realtime ADD TABLE pitch_attempts;
ALTER PUBLICATION supabase_realtime ADD TABLE certification_progress;
ALTER PUBLICATION supabase_realtime ADD TABLE enrollments;