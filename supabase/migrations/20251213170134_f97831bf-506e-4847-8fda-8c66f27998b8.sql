-- Update missions track check constraint to include adult tracks
ALTER TABLE missions DROP CONSTRAINT missions_track_check;

ALTER TABLE missions ADD CONSTRAINT missions_track_check 
CHECK (track = ANY (ARRAY['junior'::text, 'teen'::text, 'advanced'::text, 'professional'::text, 'college'::text]));