-- Create system error logs table for admin monitoring
CREATE TABLE public.system_error_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'error', 'critical')),
  category TEXT NOT NULL DEFAULT 'general' CHECK (category IN ('general', 'module_load', 'network', 'render', 'auth')),
  message TEXT NOT NULL,
  stack TEXT,
  route TEXT,
  url TEXT,
  user_agent TEXT,
  user_id UUID,
  context JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add index for common queries
CREATE INDEX idx_system_error_logs_timestamp ON public.system_error_logs(timestamp DESC);
CREATE INDEX idx_system_error_logs_severity ON public.system_error_logs(severity);
CREATE INDEX idx_system_error_logs_category ON public.system_error_logs(category);

-- Enable RLS
ALTER TABLE public.system_error_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view error logs
CREATE POLICY "Admins can view all error logs"
ON public.system_error_logs
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete error logs
CREATE POLICY "Admins can delete error logs"
ON public.system_error_logs
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Anyone can insert error logs (needed for client-side logging)
CREATE POLICY "Anyone can insert error logs"
ON public.system_error_logs
FOR INSERT
WITH CHECK (true);