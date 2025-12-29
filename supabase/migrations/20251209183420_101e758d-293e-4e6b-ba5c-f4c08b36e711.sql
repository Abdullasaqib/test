-- Add landing_page_html column to showcase_projects table
ALTER TABLE public.showcase_projects 
ADD COLUMN IF NOT EXISTS landing_page_html TEXT;

-- Add a comment to describe the column
COMMENT ON COLUMN public.showcase_projects.landing_page_html IS 'Pre-generated HTML landing page for the showcase project';