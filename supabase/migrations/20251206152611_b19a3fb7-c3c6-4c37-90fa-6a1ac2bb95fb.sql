-- Create sales_conversations table for tracking sales chat sessions
CREATE TABLE public.sales_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id),
  session_id TEXT NOT NULL,
  lead_score INTEGER DEFAULT 0,
  qualified_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'qualified', 'converted', 'lost')),
  child_age INTEGER,
  child_name TEXT,
  parent_name TEXT,
  interested_program TEXT,
  budget_range TEXT,
  timeline TEXT,
  pain_points TEXT[],
  objections TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create sales_messages table for individual messages
CREATE TABLE public.sales_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.sales_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  intent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create sales_meetings table for booked demos
CREATE TABLE public.sales_meetings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.sales_conversations(id),
  lead_id UUID REFERENCES public.leads(id),
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  meeting_type TEXT DEFAULT 'demo' CHECK (meeting_type IN ('demo', 'consultation', 'follow_up')),
  meeting_link TEXT,
  attendee_name TEXT,
  attendee_email TEXT NOT NULL,
  attendee_phone TEXT,
  notes TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  reminder_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.sales_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_meetings ENABLE ROW LEVEL SECURITY;

-- RLS policies for sales_conversations (public can create, admins can view all)
CREATE POLICY "Anyone can create sales conversations"
ON public.sales_conversations FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update their own conversation"
ON public.sales_conversations FOR UPDATE
USING (true);

CREATE POLICY "Anyone can view their conversation by session"
ON public.sales_conversations FOR SELECT
USING (true);

CREATE POLICY "Admins can manage all sales conversations"
ON public.sales_conversations FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for sales_messages
CREATE POLICY "Anyone can create sales messages"
ON public.sales_messages FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can view messages in their conversation"
ON public.sales_messages FOR SELECT
USING (true);

CREATE POLICY "Admins can manage all sales messages"
ON public.sales_messages FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for sales_meetings
CREATE POLICY "Anyone can create meetings"
ON public.sales_meetings FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can view their meetings"
ON public.sales_meetings FOR SELECT
USING (true);

CREATE POLICY "Admins can manage all meetings"
ON public.sales_meetings FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Indexes for performance
CREATE INDEX idx_sales_conversations_session ON public.sales_conversations(session_id);
CREATE INDEX idx_sales_conversations_lead ON public.sales_conversations(lead_id);
CREATE INDEX idx_sales_messages_conversation ON public.sales_messages(conversation_id);
CREATE INDEX idx_sales_meetings_scheduled ON public.sales_meetings(scheduled_at);

-- Add indexes to leads table for sales tracking
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);