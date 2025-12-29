-- Grant AI Builder tier to test@test.com
UPDATE students 
SET pricing_tier_id = '80c96d75-86ae-4b5e-9d43-180877e64d51'
WHERE user_id = 'a3d5b8fe-ee70-43c3-9bb5-6867ded087d0';

-- Also fix any existing users who have active enrollments but null pricing_tier_id
UPDATE students s
SET pricing_tier_id = (
  SELECT e.pricing_tier_id 
  FROM enrollments e 
  WHERE e.student_id = s.id 
    AND e.status = 'active'
    AND e.pricing_tier_id IS NOT NULL
  ORDER BY e.created_at DESC 
  LIMIT 1
)
WHERE s.pricing_tier_id IS NULL
AND EXISTS (
  SELECT 1 FROM enrollments e 
  WHERE e.student_id = s.id 
    AND e.status = 'active'
    AND e.pricing_tier_id IS NOT NULL
);