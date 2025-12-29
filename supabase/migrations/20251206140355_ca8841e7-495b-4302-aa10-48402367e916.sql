-- Create email templates table
CREATE TABLE public.email_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  sequence TEXT NOT NULL, -- 'parent_launch', 'school_outreach', 'government'
  subject TEXT NOT NULL,
  preview_text TEXT,
  html_content TEXT NOT NULL,
  order_in_sequence INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create email campaigns table
CREATE TABLE public.email_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  sequence TEXT NOT NULL,
  status TEXT DEFAULT 'draft', -- draft, scheduled, sending, completed
  scheduled_at TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  total_recipients INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create email sends table for tracking individual emails
CREATE TABLE public.email_sends (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID REFERENCES email_campaigns(id) ON DELETE CASCADE,
  template_id UUID REFERENCES email_templates(id),
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  recipient_type TEXT DEFAULT 'parent', -- parent, school, government
  sent_at TIMESTAMP WITH TIME ZONE,
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  bounced_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'pending', -- pending, sent, opened, clicked, bounced, failed
  resend_id TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_sends ENABLE ROW LEVEL SECURITY;

-- Email templates policies - admin only
CREATE POLICY "Admins can manage email templates"
ON public.email_templates FOR ALL
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view email templates"
ON public.email_templates FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Email campaigns policies - admin only
CREATE POLICY "Admins can manage email campaigns"
ON public.email_campaigns FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Email sends policies - admin only
CREATE POLICY "Admins can manage email sends"
ON public.email_sends FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Create indexes for performance
CREATE INDEX idx_email_templates_sequence ON email_templates(sequence);
CREATE INDEX idx_email_campaigns_status ON email_campaigns(status);
CREATE INDEX idx_email_sends_campaign ON email_sends(campaign_id);
CREATE INDEX idx_email_sends_status ON email_sends(status);
CREATE INDEX idx_email_sends_recipient ON email_sends(recipient_email);

-- Create trigger for updated_at
CREATE TRIGGER update_email_templates_updated_at
BEFORE UPDATE ON email_templates
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_campaigns_updated_at
BEFORE UPDATE ON email_campaigns
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Seed initial email templates
INSERT INTO email_templates (name, sequence, subject, preview_text, html_content, order_in_sequence) VALUES
-- Parent Launch Sequence
('Parent Launch - Email 1', 'parent_launch', 'The AI question every parent is asking', 'Jobs won''t be taken by AI. They''ll be taken by people who know AI.', E'<html>
<body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
<h1 style="color: #0A0F1C;">Jobs won''t be taken by AI.</h1>
<h2 style="color: #3B82F6;">They''ll be taken by people who know AI.</h2>
<p>Hi {{name}},</p>
<p>By the time your child enters the workforce, AI won''t be a "skill"—it will be the baseline.</p>
<p>The question isn''t whether they''ll use AI. It''s whether they''ll command it or compete against it.</p>
<p>Next Billion Lab exists for one reason: To make sure your child is on the right side of that equation.</p>
<p><strong>12 weeks. Real customers. AI building tools. A lifetime of confidence.</strong></p>
<p><a href="https://nextbillionlab.com/academy" style="background: #F59E0B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">Learn More</a></p>
<p>Tomorrow, I''ll share exactly what makes our program different.</p>
<p>— The Next Billion Lab Team</p>
</body>
</html>', 1),

('Parent Launch - Email 2', 'parent_launch', 'What your child will build (not just learn)', 'See the real products our students create in 12 weeks', E'<html>
<body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
<h1 style="color: #0A0F1C;">This isn''t homework.</h1>
<h2 style="color: #3B82F6;">It''s a real business.</h2>
<p>Hi {{name}},</p>
<p>Most programs teach theory. Ours produces founders.</p>
<p><strong>In 12 weeks, your child will:</strong></p>
<ul>
<li>Identify a real problem worth solving</li>
<li>Interview actual customers</li>
<li>Build a working MVP using AI tools</li>
<li>Create a landing page and get real sign-ups</li>
<li>Pitch to investors on Demo Day</li>
</ul>
<p>They won''t just learn about entrepreneurship. They''ll BE an entrepreneur.</p>
<p><a href="https://nextbillionlab.com/academy" style="background: #F59E0B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">Reserve Your Child''s Spot</a></p>
<p>— The Next Billion Lab Team</p>
</body>
</html>', 2),

('Parent Launch - Email 3', 'parent_launch', 'From consumer to creator', 'The mindset shift that changes everything', E'<html>
<body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
<h1 style="color: #0A0F1C;">Most kids consume technology.</h1>
<h2 style="color: #3B82F6;">Ours create it.</h2>
<p>Hi {{name}},</p>
<p>The average teenager spends 7+ hours a day on screens. Consuming. Scrolling. Watching.</p>
<p>What if those same hours could transform them into builders?</p>
<p>Next Billion Lab doesn''t ban technology. We flip the script:</p>
<ul>
<li>Instead of using ChatGPT for homework, they use it to build businesses</li>
<li>Instead of watching TikTok, they create apps others want to use</li>
<li>Instead of playing games, they design products that solve real problems</li>
</ul>
<p>This is the consumer-to-creator shift.</p>
<p><a href="https://nextbillionlab.com/academy" style="background: #F59E0B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">Make the Shift</a></p>
<p>— The Next Billion Lab Team</p>
</body>
</html>', 3),

-- School Outreach Sequence
('School Outreach - Email 1', 'school_outreach', 'The AI education gap your students face', 'What we''re hearing from school leaders worldwide', E'<html>
<body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
<h1 style="color: #0A0F1C;">Schools that move first will produce founders.</h1>
<h2 style="color: #3B82F6;">Schools that wait will explain why they didn''t.</h2>
<p>Dear {{name}},</p>
<p>AI is reshaping every industry. Your students will graduate into a world where commanding AI isn''t optional—it''s essential.</p>
<p>But here''s the challenge: Traditional curriculum wasn''t designed for this.</p>
<p><strong>Next Billion Lab is the solution:</strong></p>
<ul>
<li>12-week AI entrepreneurship program</li>
<li>No teacher AI expertise required</li>
<li>Students build real businesses, not just projects</li>
<li>Measurable outcomes: launched products, real customers</li>
</ul>
<p><strong>First 5 schools get a FREE pilot program.</strong></p>
<p><a href="https://nextbillionlab.com/schools" style="background: #F59E0B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">Request Free Pilot</a></p>
<p>— The Next Billion Lab Team</p>
</body>
</html>', 1),

('School Outreach - Email 2', 'school_outreach', 'Why Singapore, Israel, and Estonia are ahead', 'The global race for AI-native talent', E'<html>
<body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
<h1 style="color: #0A0F1C;">The Global Race for AI-Native Talent</h1>
<p>Dear {{name}},</p>
<p>While some schools debate whether to allow ChatGPT, others are producing the next generation of AI founders.</p>
<p><strong>What''s happening globally:</strong></p>
<ul>
<li><strong>Singapore:</strong> AI curriculum mandatory from primary school</li>
<li><strong>Israel:</strong> Teaching AI entrepreneurship in every high school</li>
<li><strong>Estonia:</strong> Every student learns to build with AI by 15</li>
<li><strong>China:</strong> 1M+ students in AI programs annually</li>
</ul>
<p>The question isn''t whether AI education is important. It''s whether your students will lead or follow.</p>
<p>Next Billion Lab provides a turnkey solution that requires zero AI expertise from your staff.</p>
<p><a href="https://nextbillionlab.com/schools" style="background: #F59E0B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">See How It Works</a></p>
<p>— The Next Billion Lab Team</p>
</body>
</html>', 2),

-- Government Outreach
('Government - Email 1', 'government', 'A National Opportunity: AI-Native Workforce Development', 'Proposal for Ministry consideration', E'<html>
<body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
<h1 style="color: #0A0F1C;">National AI Education Initiative</h1>
<p>Dear {{name}},</p>
<p>The countries that produce AI-native talent will lead the next century of innovation.</p>
<p><strong>Next Billion Lab offers a turnkey national program:</strong></p>
<ul>
<li>Scalable to 1M+ students</li>
<li>90-day implementation</li>
<li>No teacher training required</li>
<li>Measurable economic outcomes</li>
</ul>
<p><strong>Projected National Impact:</strong></p>
<ul>
<li>10,000 new businesses launched by students</li>
<li>$50M+ in economic activity within 3 years</li>
<li>Youth unemployment reduced by positioning students as creators, not job seekers</li>
</ul>
<p>We''ve prepared a detailed proposal for your ministry''s consideration.</p>
<p><a href="https://nextbillionlab.com/academy-pitch" style="background: #F59E0B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">View Full Proposal</a></p>
<p>— The Next Billion Lab Team</p>
</body>
</html>', 1);