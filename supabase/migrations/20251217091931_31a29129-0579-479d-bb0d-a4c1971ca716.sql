-- Add parent consent verification columns to students table
ALTER TABLE public.students 
ADD COLUMN IF NOT EXISTS parent_consent_token TEXT,
ADD COLUMN IF NOT EXISTS parent_consent_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS parent_consent_requested_at TIMESTAMPTZ;

-- Create index for token lookups
CREATE INDEX IF NOT EXISTS idx_students_parent_consent_token 
ON public.students(parent_consent_token) 
WHERE parent_consent_token IS NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.students.parent_consent_token IS 'Unique token for parent email verification (COPPA compliance)';
COMMENT ON COLUMN public.students.parent_consent_verified IS 'Whether parent has verified consent for under-13 users';
COMMENT ON COLUMN public.students.parent_consent_requested_at IS 'When the consent email was sent to parent';