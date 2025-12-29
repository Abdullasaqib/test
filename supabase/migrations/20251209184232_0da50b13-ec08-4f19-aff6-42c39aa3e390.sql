-- Enhance resources table with video tutorials, intent filtering, age groups
ALTER TABLE public.resources 
ADD COLUMN IF NOT EXISTS video_embed_url TEXT,
ADD COLUMN IF NOT EXISTS difficulty_level TEXT DEFAULT 'beginner',
ADD COLUMN IF NOT EXISTS intent_tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS week_relevance INTEGER[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS age_groups TEXT[] DEFAULT '{}';

-- Create AI Coach Knowledge Base table
CREATE TABLE public.ai_coach_knowledge (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  source_url TEXT,
  tags TEXT[] DEFAULT '{}',
  priority INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ai_coach_knowledge ENABLE ROW LEVEL SECURITY;

-- Anyone can read knowledge base
CREATE POLICY "Anyone can view knowledge base"
ON public.ai_coach_knowledge
FOR SELECT
USING (is_active = true);

-- Admins can manage knowledge base
CREATE POLICY "Admins can manage knowledge base"
ON public.ai_coach_knowledge
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Seed knowledge base with showcase projects, curriculum, tank personas, founder wisdom
INSERT INTO public.ai_coach_knowledge (category, title, content, tags, priority) VALUES
-- Showcase Project Examples
('showcase_project', 'Emma''s Pet Finder App', 'Emma, age 12, built Pet Finder - a neighborhood alert app for lost and found pets. She noticed her neighbor crying because her cat went missing, and nobody knew about it. Emma used AI to build an app that sends instant alerts to everyone in the neighborhood when a pet goes missing. Within 2 weeks, her app helped reunite 3 pets with their families. She learned that the best startup ideas come from problems you see in your own life.', ARRAY['pets', 'community', 'alerts', 'problem-solving', 'customer-discovery'], 10),
('showcase_project', 'Marcus''s Homework Helper Bot', 'Marcus, age 14, created Homework Helper Bot because tutoring was too expensive for his family. He built an AI chatbot that explains concepts in simple ways and creates practice problems. He validated by asking 20 classmates what subjects they struggled with most. Math was #1, so he focused there first. His bot now helps 500+ students in his school district.', ARRAY['education', 'ai', 'chatbot', 'validation', 'mvp'], 10),
('showcase_project', 'Sofia''s Recipe Remix', 'Sofia, age 11, built Recipe Remix after watching her mom throw away food that went bad. The app suggests recipes based on ingredients you already have. She interviewed 15 families about food waste before building anything. Her MVP was just a simple form that texted back recipe ideas. Now she''s partnered with a local grocery store.', ARRAY['food', 'sustainability', 'customer-interviews', 'simple-mvp'], 10),
('showcase_project', 'Alex''s EcoShop Marketplace', 'Alex, age 15, created EcoShop to make sustainable shopping easier. He noticed his friends wanted to buy eco-friendly products but couldn''t find them locally. He built a marketplace connecting local eco-friendly sellers with young buyers. He started by creating a simple Instagram page before building the full app.', ARRAY['sustainability', 'marketplace', 'ecommerce', 'validation'], 10),
('showcase_project', 'Zara''s Pitch Perfect', 'Zara, age 13, built Pitch Perfect because she was terrified of public speaking. Her app uses AI to analyze your pitch and give feedback on pace, clarity, and confidence. She practiced with it before her school presentation and got an A+. Now she helps other kids overcome their fear of presenting.', ARRAY['public-speaking', 'ai', 'confidence', 'pitch'], 10),

-- THE TANK Investor Personas
('tank_persona', 'The Shark (Marcus Chen)', 'Marcus Chen is a numbers-focused investor who made his fortune in fintech. He asks tough questions about revenue models, unit economics, and scalability. To impress him: Have your numbers ready, know your customer acquisition cost, and show a clear path to profitability. His signature question: "How do you make money, and how much will it cost to acquire each customer?"', ARRAY['tank', 'investor', 'numbers', 'revenue'], 8),
('tank_persona', 'The Visionary (Sarah Kim)', 'Sarah Kim backs moonshot ideas. She sold her AI company for $2B and now looks for the next big thing. She cares about the size of your vision and how it could change the world. To impress her: Dream big, show how your idea could scale globally, and demonstrate deep passion. Her signature question: "If this works, how big could it really get?"', ARRAY['tank', 'investor', 'vision', 'scale'], 8),
('tank_persona', 'The Mentor (David Okonkwo)', 'David Okonkwo is a former teacher who became a successful EdTech founder. He focuses on the founder''s character and learning ability. He asks about your failures and what you learned. To impress him: Be honest about struggles, show growth mindset, and demonstrate coachability. His signature question: "What''s the biggest mistake you''ve made so far, and what did you learn?"', ARRAY['tank', 'investor', 'mentor', 'learning'], 8),
('tank_persona', 'The Customer Champion (Lisa Rodriguez)', 'Lisa Rodriguez built a $500M consumer brand. She obsesses over customer experience and product-market fit. She wants to know if you truly understand your users. To impress her: Share customer stories, show user research, demonstrate empathy. Her signature question: "Tell me about the last conversation you had with a customer."', ARRAY['tank', 'investor', 'customer', 'product'], 8),
('tank_persona', 'The Operator (James Wright)', 'James Wright scaled 3 companies to $100M+. He focuses on execution, team building, and operational excellence. He asks about how you''ll actually build and deliver. To impress him: Show a clear execution plan, talk about your team, demonstrate operational thinking. His signature question: "Walk me through exactly how you''ll get from here to 1,000 customers."', ARRAY['tank', 'investor', 'operations', 'execution'], 8),

-- Founder Wisdom
('founder_wisdom', 'Paul Graham on Ideas', 'The best startup ideas come from noticing problems in your own life. Don''t try to think of startup ideas. Instead, notice problems. What do you wish existed? What''s broken that you could fix? The best founders are the ones who genuinely need what they''re building.', ARRAY['ideas', 'problems', 'yc'], 7),
('founder_wisdom', 'Reid Hoffman on MVPs', 'If you''re not embarrassed by the first version of your product, you launched too late. Ship fast, learn fast, iterate fast. Your first version should solve ONE problem for ONE type of customer. That''s it. Don''t try to build everything at once.', ARRAY['mvp', 'launch', 'iteration'], 7),
('founder_wisdom', 'Steve Jobs on Customers', 'Get closer than ever to your customers. So close that you tell them what they need before they realize it themselves. But first, you have to deeply understand them. Talk to 100 people before you write a single line of code.', ARRAY['customers', 'research', 'empathy'], 7),
('founder_wisdom', 'Sara Blakely on Rejection', 'I got rejected by every store for a year before Spanx took off. Rejection is just redirection. Every "no" gets you closer to "yes." The founders who win aren''t the smartest - they''re the ones who don''t give up.', ARRAY['rejection', 'persistence', 'mindset'], 7),
('founder_wisdom', 'Elon Musk on First Principles', 'Don''t reason by analogy. Think from first principles. Instead of saying "this is how it''s always been done," ask "what are the fundamental truths here, and what can I build from those?" That''s how you create breakthrough innovation.', ARRAY['innovation', 'thinking', 'first-principles'], 7),

-- Curriculum Context
('curriculum', 'Week 1-2: Discovery Phase', 'In the Discovery phase, students learn to find real problems worth solving. Key activities: observe your daily life, interview 10+ people, identify pain points, and choose a problem you genuinely care about. The goal is NOT to have an idea yet - it''s to deeply understand problems.', ARRAY['discovery', 'problems', 'week-1', 'week-2'], 9),
('curriculum', 'Week 3-4: Validation Phase', 'In the Validation phase, students test if their problem is real and if people would pay for a solution. Key activities: customer interviews, surveys, competitor research, and defining your target customer. The goal is to prove your idea before building anything.', ARRAY['validation', 'research', 'week-3', 'week-4'], 9),
('curriculum', 'Week 5-7: Building Phase', 'In the Building phase, students create their MVP using AI tools like Lovable. Key activities: wireframing, building a simple first version, getting user feedback, and iterating. The goal is to create something real that solves the core problem - nothing more.', ARRAY['building', 'mvp', 'week-5', 'week-6', 'week-7'], 9),
('curriculum', 'Week 8-10: Growth Phase', 'In the Growth phase, students launch and get real users. Key activities: creating a landing page, social media strategy, getting first 10 users, collecting feedback, and improving. The goal is to prove people actually want what you built.', ARRAY['growth', 'launch', 'marketing', 'week-8', 'week-9', 'week-10'], 9),
('curriculum', 'Week 11-12: Pitch Phase', 'In the Pitch phase, students prepare for Demo Day. Key activities: creating pitch deck, practicing with THE TANK, refining your story, and presenting to real investors. The goal is to communicate your vision compellingly and confidently.', ARRAY['pitch', 'demo-day', 'week-11', 'week-12'], 9),

-- Brand Voice
('brand_voice', 'NEXT_ Philosophy', 'We''re not teaching kids to code - we''re teaching them to command AI. We''re not preparing them for jobs - we''re preparing them to CREATE jobs. The future is unknown (ChatGPT didn''t exist 3 years ago, Lovable didn''t exist 2 years ago). We teach them to BUILD what''s NEXT, whatever that is.', ARRAY['philosophy', 'brand', 'mission'], 6),
('brand_voice', 'Encouragement Style', 'Every founder feels stuck sometimes. Emma felt stuck. Marcus felt stuck. That''s normal! The difference between founders who succeed and those who don''t isn''t intelligence - it''s persistence. Take a break if you need to, but don''t give up. You''ve got this!', ARRAY['encouragement', 'motivation', 'support'], 6);

-- Update existing resources with enhanced fields (sample data)
UPDATE public.resources SET 
  video_embed_url = 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  difficulty_level = 'beginner',
  intent_tags = ARRAY['build-app'],
  week_relevance = ARRAY[5,6,7],
  age_groups = ARRAY['teen', 'advanced']
WHERE title ILIKE '%lovable%' OR title ILIKE '%app%';

UPDATE public.resources SET 
  difficulty_level = 'beginner',
  intent_tags = ARRAY['design'],
  week_relevance = ARRAY[5,6,7,8],
  age_groups = ARRAY['junior', 'teen', 'advanced']
WHERE title ILIKE '%canva%' OR title ILIKE '%figma%' OR title ILIKE '%design%';

UPDATE public.resources SET 
  difficulty_level = 'beginner',
  intent_tags = ARRAY['write-content', 'get-unstuck'],
  week_relevance = ARRAY[1,2,3,4,5,6,7,8,9,10,11,12],
  age_groups = ARRAY['junior', 'teen', 'advanced']
WHERE title ILIKE '%chatgpt%' OR title ILIKE '%claude%' OR title ILIKE '%ai%';