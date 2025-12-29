-- Update ai_tool_used for JUNIOR track (Glide focus)
UPDATE public.missions SET ai_tool_used = 'Glide' WHERE track = 'junior' AND week IN (5, 6, 7);
UPDATE public.missions SET ai_tool_used = 'AI Coach' WHERE track = 'junior' AND week IN (1, 2, 3, 4, 8, 9, 10, 11, 12) AND ai_tool_used IS NULL;

-- Update ai_tool_used for TEEN track (Base44/AI Coach)
UPDATE public.missions SET ai_tool_used = 'Base44' WHERE track = 'teen' AND week IN (5, 6, 7);
UPDATE public.missions SET ai_tool_used = 'AI Coach' WHERE track = 'teen' AND week IN (1, 2, 3, 4);
UPDATE public.missions SET ai_tool_used = 'AI Coach' WHERE track = 'teen' AND week IN (8, 9, 10);
UPDATE public.missions SET ai_tool_used = 'Pitch Deck Generator' WHERE track = 'teen' AND week IN (11, 12);

-- Update ai_tool_used for ADVANCED track (Lovable/Cursor)
UPDATE public.missions SET ai_tool_used = 'Lovable' WHERE track = 'advanced' AND week IN (5, 6);
UPDATE public.missions SET ai_tool_used = 'Cursor' WHERE track = 'advanced' AND week = 7;
UPDATE public.missions SET ai_tool_used = 'AI Coach' WHERE track = 'advanced' AND week IN (1, 2, 3, 4);
UPDATE public.missions SET ai_tool_used = 'AI Coach' WHERE track = 'advanced' AND week IN (8, 9, 10);
UPDATE public.missions SET ai_tool_used = 'Pitch Deck Generator' WHERE track = 'advanced' AND week IN (11, 12);

-- Update junior duration progression (15 min Week 1 → 25 min Week 12)
UPDATE public.missions SET estimated_minutes = 15 WHERE track = 'junior' AND week = 1;
UPDATE public.missions SET estimated_minutes = 16 WHERE track = 'junior' AND week = 2;
UPDATE public.missions SET estimated_minutes = 17 WHERE track = 'junior' AND week = 3;
UPDATE public.missions SET estimated_minutes = 18 WHERE track = 'junior' AND week = 4;
UPDATE public.missions SET estimated_minutes = 19 WHERE track = 'junior' AND week = 5;
UPDATE public.missions SET estimated_minutes = 20 WHERE track = 'junior' AND week = 6;
UPDATE public.missions SET estimated_minutes = 21 WHERE track = 'junior' AND week = 7;
UPDATE public.missions SET estimated_minutes = 22 WHERE track = 'junior' AND week = 8;
UPDATE public.missions SET estimated_minutes = 23 WHERE track = 'junior' AND week = 9;
UPDATE public.missions SET estimated_minutes = 24 WHERE track = 'junior' AND week = 10;
UPDATE public.missions SET estimated_minutes = 25 WHERE track = 'junior' AND week = 11;
UPDATE public.missions SET estimated_minutes = 25 WHERE track = 'junior' AND week = 12;

-- Update some junior artifact types to use new types
UPDATE public.missions SET artifact_type = 'poster' WHERE track = 'junior' AND week = 1 AND day = 5;
UPDATE public.missions SET artifact_type = 'drawing' WHERE track = 'junior' AND week = 2 AND day = 3;
UPDATE public.missions SET artifact_type = 'video_diary' WHERE track = 'junior' AND week = 4 AND day = 5;
UPDATE public.missions SET artifact_type = 'poster' WHERE track = 'junior' AND week = 6 AND day = 5;
UPDATE public.missions SET artifact_type = 'drawing' WHERE track = 'junior' AND week = 8 AND day = 2;

-- Update some advanced artifact types to use new types
UPDATE public.missions SET artifact_type = 'investor_memo' WHERE track = 'advanced' AND week = 3 AND day = 5;
UPDATE public.missions SET artifact_type = 'competitive_analysis' WHERE track = 'advanced' AND week = 4 AND day = 3;
UPDATE public.missions SET artifact_type = 'financial_model' WHERE track = 'advanced' AND week = 10 AND day = 4;
UPDATE public.missions SET artifact_type = 'investor_memo' WHERE track = 'advanced' AND week = 11 AND day = 2;
UPDATE public.missions SET artifact_type = 'financial_model' WHERE track = 'advanced' AND week = 12 AND day = 3;