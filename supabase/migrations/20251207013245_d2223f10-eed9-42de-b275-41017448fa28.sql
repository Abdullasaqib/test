-- Drop the old constraint that only allows ages 13-25
ALTER TABLE applications DROP CONSTRAINT IF EXISTS applications_age_check;

-- Add new constraint allowing ages 9-25 to support Junior track (ages 9-11)
ALTER TABLE applications ADD CONSTRAINT applications_age_check 
  CHECK ((age >= 9) AND (age <= 25));