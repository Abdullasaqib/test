-- Update certification name to "Revolutionary Certificate" for consistent branding
UPDATE certifications 
SET name = 'Revolutionary Certificate' 
WHERE slug = 'prompt-engineering-fundamentals';

-- Also update the description for consistency
UPDATE certifications 
SET description = 'Master AI prompt engineering in 6 lessons. Earn your LinkedIn-shareable NEXT_ CERTIFIED credential and prove you''re ready to build what''s NEXT_.'
WHERE slug = 'prompt-engineering-fundamentals';