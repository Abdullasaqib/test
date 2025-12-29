-- Add ai_tool_used column to missions table
ALTER TABLE public.missions 
ADD COLUMN IF NOT EXISTS ai_tool_used text;

-- Add new artifact types to the enum
ALTER TYPE public.artifact_type ADD VALUE IF NOT EXISTS 'poster';
ALTER TYPE public.artifact_type ADD VALUE IF NOT EXISTS 'drawing';
ALTER TYPE public.artifact_type ADD VALUE IF NOT EXISTS 'video_diary';
ALTER TYPE public.artifact_type ADD VALUE IF NOT EXISTS 'investor_memo';
ALTER TYPE public.artifact_type ADD VALUE IF NOT EXISTS 'financial_model';
ALTER TYPE public.artifact_type ADD VALUE IF NOT EXISTS 'competitive_analysis';