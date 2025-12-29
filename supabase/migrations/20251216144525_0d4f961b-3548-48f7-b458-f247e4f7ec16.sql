-- Drop the old check constraint and add a new one with 'creator'
ALTER TABLE certification_lesson_sprints DROP CONSTRAINT IF EXISTS certification_lesson_sprints_age_track_check;
ALTER TABLE certification_lesson_sprints ADD CONSTRAINT certification_lesson_sprints_age_track_check CHECK (age_track IN ('all', 'explorer', 'creator', 'founder'));

-- Update any existing 'builder' values to 'creator'
UPDATE certification_lesson_sprints SET age_track = 'creator' WHERE age_track = 'builder';