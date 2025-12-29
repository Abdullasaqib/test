-- Insert 100% discount scholarship codes for AI Foundations (revolution-start tier)
INSERT INTO scholarship_codes (code, discount_amount, discount_type, applicable_tiers, max_uses, is_active)
VALUES 
  ('NEXTGEN2025', 100, 'percentage', ARRAY['revolution-start'], 10000, true),
  ('FUTUREFOUNDER', 100, 'percentage', ARRAY['revolution-start'], 5000, true),
  ('SCHOOL-FREE', 100, 'percentage', ARRAY['revolution-start'], 50000, true),
  ('EARLY-BIRD', 100, 'percentage', ARRAY['revolution-start'], 1000, true),
  ('AIFOUNDER', 100, 'percentage', ARRAY['revolution-start'], 10000, true)
ON CONFLICT (code) DO NOTHING;