
-- Enterprise organizations table
CREATE TABLE public.enterprise_organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  industry TEXT,
  logo_url TEXT,
  primary_contact_name TEXT,
  primary_contact_email TEXT,
  primary_contact_phone TEXT,
  max_seats INTEGER DEFAULT 100,
  license_start_date DATE,
  license_end_date DATE,
  is_active BOOLEAN DEFAULT true,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enterprise admins table (links users to organizations with admin role)
CREATE TABLE public.enterprise_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.enterprise_organizations(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('owner', 'admin', 'manager')),
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, organization_id)
);

-- Enterprise learners (employees enrolled via enterprise)
CREATE TABLE public.enterprise_learners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.enterprise_organizations(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.students(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  department TEXT,
  job_title TEXT,
  enrolled_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  status TEXT DEFAULT 'invited' CHECK (status IN ('invited', 'active', 'completed', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(organization_id, email)
);

-- Enable RLS
ALTER TABLE public.enterprise_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enterprise_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enterprise_learners ENABLE ROW LEVEL SECURITY;

-- Helper function to check enterprise admin status
CREATE OR REPLACE FUNCTION public.is_enterprise_admin(check_user_id UUID, check_org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.enterprise_admins
    WHERE user_id = check_user_id AND organization_id = check_org_id
  )
$$;

-- Helper function to get user's enterprise org IDs
CREATE OR REPLACE FUNCTION public.get_user_enterprise_orgs(check_user_id UUID)
RETURNS SETOF UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT organization_id FROM public.enterprise_admins
  WHERE user_id = check_user_id
$$;

-- RLS Policies for enterprise_organizations
CREATE POLICY "Enterprise admins can view their orgs"
ON public.enterprise_organizations FOR SELECT
USING (id IN (SELECT public.get_user_enterprise_orgs(auth.uid())));

CREATE POLICY "Enterprise owners can update their orgs"
ON public.enterprise_organizations FOR UPDATE
USING (id IN (
  SELECT organization_id FROM public.enterprise_admins
  WHERE user_id = auth.uid() AND role = 'owner'
));

CREATE POLICY "Platform admins can manage all orgs"
ON public.enterprise_organizations FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for enterprise_admins
CREATE POLICY "Enterprise admins can view org admins"
ON public.enterprise_admins FOR SELECT
USING (organization_id IN (SELECT public.get_user_enterprise_orgs(auth.uid())));

CREATE POLICY "Enterprise owners can manage org admins"
ON public.enterprise_admins FOR ALL
USING (organization_id IN (
  SELECT organization_id FROM public.enterprise_admins ea
  WHERE ea.user_id = auth.uid() AND ea.role = 'owner'
));

CREATE POLICY "Platform admins can manage all enterprise admins"
ON public.enterprise_admins FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for enterprise_learners
CREATE POLICY "Enterprise admins can view org learners"
ON public.enterprise_learners FOR SELECT
USING (organization_id IN (SELECT public.get_user_enterprise_orgs(auth.uid())));

CREATE POLICY "Enterprise admins can manage org learners"
ON public.enterprise_learners FOR ALL
USING (organization_id IN (SELECT public.get_user_enterprise_orgs(auth.uid())));

CREATE POLICY "Platform admins can manage all learners"
ON public.enterprise_learners FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Indexes for performance
CREATE INDEX idx_enterprise_admins_user ON public.enterprise_admins(user_id);
CREATE INDEX idx_enterprise_admins_org ON public.enterprise_admins(organization_id);
CREATE INDEX idx_enterprise_learners_org ON public.enterprise_learners(organization_id);
CREATE INDEX idx_enterprise_learners_student ON public.enterprise_learners(student_id);
