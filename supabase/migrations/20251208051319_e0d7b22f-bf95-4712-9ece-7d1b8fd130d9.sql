-- Create deals table for B2B sales pipeline
CREATE TABLE public.deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES public.schools(id) ON DELETE SET NULL,
  school_name TEXT NOT NULL,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  contact_role TEXT,
  stage TEXT NOT NULL DEFAULT 'lead',
  deal_value NUMERIC DEFAULT 0,
  student_count INTEGER DEFAULT 0,
  license_type TEXT DEFAULT 'standard',
  source TEXT,
  priority TEXT DEFAULT 'medium',
  expected_close_date DATE,
  actual_close_date DATE,
  lost_reason TEXT,
  notes TEXT,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create deal_activities table for activity tracking
CREATE TABLE public.deal_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deal_activities ENABLE ROW LEVEL SECURITY;

-- RLS policies for deals - admin only
CREATE POLICY "Admins can manage all deals"
ON public.deals FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for deal_activities - admin only
CREATE POLICY "Admins can manage all deal activities"
ON public.deal_activities FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Indexes for performance
CREATE INDEX idx_deals_stage ON public.deals(stage);
CREATE INDEX idx_deals_school_id ON public.deals(school_id);
CREATE INDEX idx_deals_created_at ON public.deals(created_at DESC);
CREATE INDEX idx_deals_expected_close ON public.deals(expected_close_date);
CREATE INDEX idx_deal_activities_deal_id ON public.deal_activities(deal_id);
CREATE INDEX idx_deal_activities_created_at ON public.deal_activities(created_at DESC);

-- Trigger for updated_at
CREATE TRIGGER update_deals_updated_at
  BEFORE UPDATE ON public.deals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();