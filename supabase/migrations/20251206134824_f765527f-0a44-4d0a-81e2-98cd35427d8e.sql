-- Fix remaining policies - drop existing ones first

-- Drop any existing policies that conflict
DROP POLICY IF EXISTS "Admins can manage all invites" ON school_invites;
DROP POLICY IF EXISTS "School admins can manage school invites" ON school_invites;
DROP POLICY IF EXISTS "Authenticated users can validate active invites" ON school_invites;

-- Recreate school_invites policies
CREATE POLICY "Authenticated users can validate active invites"
ON school_invites FOR SELECT
TO authenticated
USING (
  is_active = true 
  AND (expires_at IS NULL OR expires_at > now())
);

CREATE POLICY "School admins can manage school invites"
ON school_invites FOR ALL
USING (
  school_id IN (SELECT get_user_school_ids(auth.uid()))
);

CREATE POLICY "Admins can manage all invites"
ON school_invites FOR ALL
USING (has_role(auth.uid(), 'admin'));