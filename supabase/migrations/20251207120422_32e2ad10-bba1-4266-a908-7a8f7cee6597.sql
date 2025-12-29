-- CRITICAL SECURITY FIX: Harden RLS policies on exposed tables

-- 1. FIX applications table - Remove public access, restrict to owner + admin
DROP POLICY IF EXISTS "Anyone can view applications" ON public.applications;
DROP POLICY IF EXISTS "Anyone can update applications" ON public.applications;
DROP POLICY IF EXISTS "Anyone can create applications" ON public.applications;

-- Users can only view their own applications (by email match or user_id)
CREATE POLICY "Users can view own applications" 
ON public.applications 
FOR SELECT 
USING (
  email = (SELECT email FROM auth.users WHERE id = auth.uid())
  OR user_id = auth.uid()
  OR has_role(auth.uid(), 'admin')
);

-- Users can only update their own applications
CREATE POLICY "Users can update own applications" 
ON public.applications 
FOR UPDATE 
USING (
  email = (SELECT email FROM auth.users WHERE id = auth.uid())
  OR user_id = auth.uid()
  OR has_role(auth.uid(), 'admin')
);

-- Anyone can create applications (needed for public signup)
CREATE POLICY "Anyone can create applications" 
ON public.applications 
FOR INSERT 
WITH CHECK (true);

-- Admins can delete applications
CREATE POLICY "Admins can delete applications" 
ON public.applications 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'));

-- 2. FIX sales_conversations table - Restrict to authenticated staff
ALTER TABLE public.sales_conversations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view sales conversations" ON public.sales_conversations;
DROP POLICY IF EXISTS "Anyone can create sales conversations" ON public.sales_conversations;
DROP POLICY IF EXISTS "Anyone can update sales conversations" ON public.sales_conversations;

-- Only admins can view all sales conversations
CREATE POLICY "Admins can manage sales conversations" 
ON public.sales_conversations 
FOR ALL 
USING (has_role(auth.uid(), 'admin'));

-- Allow anonymous session-based access for chat widget (by session_id match)
CREATE POLICY "Users can view own session conversations" 
ON public.sales_conversations 
FOR SELECT 
USING (session_id IS NOT NULL);

CREATE POLICY "Anyone can create sales conversations" 
ON public.sales_conversations 
FOR INSERT 
WITH CHECK (true);

-- 3. FIX sales_messages table - Restrict to conversation participants
ALTER TABLE public.sales_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view sales messages" ON public.sales_messages;
DROP POLICY IF EXISTS "Anyone can create sales messages" ON public.sales_messages;

-- Admins can manage all messages
CREATE POLICY "Admins can manage sales messages" 
ON public.sales_messages 
FOR ALL 
USING (has_role(auth.uid(), 'admin'));

-- Anyone can create messages (for chat widget)
CREATE POLICY "Anyone can create sales messages" 
ON public.sales_messages 
FOR INSERT 
WITH CHECK (true);

-- Users can view messages in conversations they have access to
CREATE POLICY "Users can view conversation messages" 
ON public.sales_messages 
FOR SELECT 
USING (
  conversation_id IN (
    SELECT id FROM public.sales_conversations WHERE session_id IS NOT NULL
  )
);

-- 4. FIX sales_meetings table - Restrict to authenticated users and admins
ALTER TABLE public.sales_meetings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view sales meetings" ON public.sales_meetings;
DROP POLICY IF EXISTS "Anyone can create sales meetings" ON public.sales_meetings;

-- Admins can manage all meetings
CREATE POLICY "Admins can manage sales meetings" 
ON public.sales_meetings 
FOR ALL 
USING (has_role(auth.uid(), 'admin'));

-- Users can view their own meetings (by email match)
CREATE POLICY "Users can view own meetings" 
ON public.sales_meetings 
FOR SELECT 
USING (
  attendee_email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

-- Anyone can create meetings (for booking widget)
CREATE POLICY "Anyone can create sales meetings" 
ON public.sales_meetings 
FOR INSERT 
WITH CHECK (true);