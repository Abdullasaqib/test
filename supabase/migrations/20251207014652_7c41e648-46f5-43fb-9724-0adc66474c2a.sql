-- Add parent consent and profile completion fields to students table
ALTER TABLE students ADD COLUMN IF NOT EXISTS parent_name TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS parent_email TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS parent_phone TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS parent_relationship TEXT DEFAULT 'parent';
ALTER TABLE students ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMPTZ;
ALTER TABLE students ADD COLUMN IF NOT EXISTS parent_consent_at TIMESTAMPTZ;
ALTER TABLE students ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN DEFAULT false;
ALTER TABLE students ADD COLUMN IF NOT EXISTS profile_completed_at TIMESTAMPTZ;

-- Add comment for clarity
COMMENT ON COLUMN students.parent_consent_at IS 'Timestamp when parent/guardian consent was provided for minor students';
COMMENT ON COLUMN students.terms_accepted_at IS 'Timestamp when Terms of Service were accepted';
COMMENT ON COLUMN students.parent_relationship IS 'Relationship to student: parent, guardian, other';