
-- Phase 2: Certification Tables

-- Main certifications table
CREATE TABLE public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  lessons_count INTEGER DEFAULT 0,
  estimated_hours DECIMAL(4,1),
  badge_image_url TEXT,
  is_free BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Certification lessons
CREATE TABLE public.certification_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certification_id UUID NOT NULL REFERENCES public.certifications(id) ON DELETE CASCADE,
  lesson_order INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  video_url TEXT,
  estimated_minutes INTEGER DEFAULT 30,
  quiz_questions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Student certification enrollments
CREATE TABLE public.student_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  certification_id UUID NOT NULL REFERENCES public.certifications(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  certificate_url TEXT,
  certificate_number TEXT UNIQUE,
  linkedin_shared BOOLEAN DEFAULT false,
  linkedin_shared_at TIMESTAMPTZ,
  UNIQUE(student_id, certification_id)
);

-- Lesson progress tracking
CREATE TABLE public.certification_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.certification_lessons(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT now(),
  quiz_score INTEGER,
  quiz_attempts INTEGER DEFAULT 0,
  UNIQUE(student_id, lesson_id)
);

-- Phase 3: Showcase Projects Table
CREATE TABLE public.showcase_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  student_name TEXT NOT NULL,
  student_age INTEGER,
  student_program TEXT,
  description TEXT,
  tools_used TEXT[] DEFAULT '{}',
  project_url TEXT,
  thumbnail_url TEXT,
  video_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certification_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certification_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.showcase_projects ENABLE ROW LEVEL SECURITY;

-- RLS Policies for certifications (public read)
CREATE POLICY "Anyone can view active certifications"
  ON public.certifications FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage certifications"
  ON public.certifications FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for certification_lessons (public read)
CREATE POLICY "Anyone can view lessons"
  ON public.certification_lessons FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage lessons"
  ON public.certification_lessons FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for student_certifications
CREATE POLICY "Students can view own certifications"
  ON public.student_certifications FOR SELECT
  USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students can enroll in certifications"
  ON public.student_certifications FOR INSERT
  WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students can update own certifications"
  ON public.student_certifications FOR UPDATE
  USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage all student certifications"
  ON public.student_certifications FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for certification_progress
CREATE POLICY "Students can view own progress"
  ON public.certification_progress FOR SELECT
  USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students can track own progress"
  ON public.certification_progress FOR INSERT
  WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students can update own progress"
  ON public.certification_progress FOR UPDATE
  USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage all progress"
  ON public.certification_progress FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for showcase_projects (public read)
CREATE POLICY "Anyone can view showcase projects"
  ON public.showcase_projects FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage showcase projects"
  ON public.showcase_projects FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Seed the free certification
INSERT INTO public.certifications (name, slug, description, lessons_count, estimated_hours, is_free, is_active)
VALUES (
  'AI Prompt Engineering Fundamentals',
  'prompt-engineering-fundamentals',
  'Master the art of communicating with AI tools. Learn to write effective prompts for ChatGPT, Claude, Lovable, and more. Earn a LinkedIn-shareable certificate!',
  6,
  4.5,
  true,
  true
);

-- Seed the 6 lessons
INSERT INTO public.certification_lessons (certification_id, lesson_order, title, description, content, estimated_minutes, quiz_questions)
SELECT 
  c.id,
  1,
  'Introduction to AI Tools',
  'Discover the world of AI assistants and understand how they can help you build amazing things.',
  '# Welcome to AI Tools! 🚀

## What You''ll Learn
In this lesson, you''ll discover the amazing world of AI tools and how they can help you build incredible things!

## What is AI?
AI (Artificial Intelligence) is like having a super-smart helper that can understand what you say and help you with tasks. Think of it as a really smart friend who knows a lot about many topics!

## Popular AI Tools

### ChatGPT
ChatGPT is made by OpenAI and is great for:
- Writing stories and essays
- Answering questions
- Brainstorming ideas
- Explaining complex topics simply

### Claude
Claude is made by Anthropic and excels at:
- Long, thoughtful conversations
- Analyzing documents
- Creative writing
- Careful, nuanced responses

### Lovable
Lovable is perfect for:
- Building real websites and apps
- Creating beautiful designs
- Turning ideas into working products
- No coding required!

## How AI Tools Work
When you type something to an AI, you''re giving it a **prompt**. The AI reads your prompt, thinks about what you want, and gives you a response.

**Example:**
- Your prompt: "Write a short poem about robots"
- AI response: "Metal friends with hearts of code, helping humans down the road..."

## Key Takeaways
1. AI tools are helpers, not replacements for your creativity
2. Different AI tools are good at different things
3. The better your prompt, the better the response
4. You''re in control - AI is just a tool!

## Your First Challenge
Try asking an AI tool: "Explain how a computer works like I''m 10 years old"

Notice how it simplifies the explanation? That''s the power of good prompting!',
  30,
  '[
    {"question": "What is a prompt?", "options": ["A type of computer", "The text you give to an AI", "A programming language", "A video game"], "correct": 1},
    {"question": "Which AI tool is best for building websites without coding?", "options": ["ChatGPT", "Claude", "Lovable", "All of them"], "correct": 2},
    {"question": "What makes AI responses better?", "options": ["Typing faster", "Using shorter prompts", "Writing clearer prompts", "Using bigger fonts"], "correct": 2}
  ]'::jsonb
FROM public.certifications c WHERE c.slug = 'prompt-engineering-fundamentals';

INSERT INTO public.certification_lessons (certification_id, lesson_order, title, description, content, estimated_minutes, quiz_questions)
SELECT 
  c.id,
  2,
  'Anatomy of a Great Prompt',
  'Learn the secret structure behind prompts that get amazing results every time.',
  '# Anatomy of a Great Prompt ✨

## The Secret Formula
Great prompts aren''t magic - they follow a simple structure. Let''s break it down!

## The 4 Parts of a Perfect Prompt

### 1. Context 🎯
Tell the AI WHO it should be and WHAT situation you''re in.

**Example:**
> "You are a friendly science teacher explaining to a 12-year-old student..."

### 2. Task 📝
Clearly state WHAT you want the AI to do.

**Example:**
> "...explain how volcanoes work..."

### 3. Format 📊
Specify HOW you want the answer formatted.

**Example:**
> "...using bullet points and simple words..."

### 4. Constraints ⚠️
Add any rules or limitations.

**Example:**
> "...in under 100 words, without using scientific jargon."

## Putting It All Together

**Weak Prompt:**
> "Tell me about volcanoes"

**Strong Prompt:**
> "You are a friendly science teacher. Explain how volcanoes erupt to a 12-year-old student. Use bullet points and simple words. Keep it under 100 words and make it exciting!"

## The Difference
| Weak Prompt | Strong Prompt |
|-------------|---------------|
| Vague results | Specific results |
| Too long or too short | Right length |
| Wrong tone | Perfect tone |
| May need follow-ups | Gets it right first time |

## Power Words to Use
- "Act as..." - Sets the AI''s role
- "Step by step..." - Gets detailed explanations
- "In the style of..." - Matches a specific tone
- "Examples include..." - Guides the direction
- "Avoid..." - Prevents unwanted content

## Practice Prompt Template
Copy this and fill in the blanks:

```
Act as a [ROLE].
I need you to [TASK].
Please format the response as [FORMAT].
Keep it [CONSTRAINTS].
```

## Your Challenge
Rewrite this weak prompt to be strong:
> "Help me with my homework about space"

Think about: Who should the AI be? What exactly do you need? How should it be formatted?',
  35,
  '[
    {"question": "What are the 4 parts of a great prompt?", "options": ["Who, What, When, Where", "Context, Task, Format, Constraints", "Start, Middle, End, Summary", "Question, Answer, Review, Submit"], "correct": 1},
    {"question": "What does Context tell the AI?", "options": ["How long to make the response", "Who it should be and the situation", "What language to use", "When to respond"], "correct": 1},
    {"question": "Which is a stronger prompt?", "options": ["Tell me about dogs", "You are a vet. Explain 3 tips for new puppy owners in bullet points.", "Dogs please", "I like dogs"], "correct": 1}
  ]'::jsonb
FROM public.certifications c WHERE c.slug = 'prompt-engineering-fundamentals';

INSERT INTO public.certification_lessons (certification_id, lesson_order, title, description, content, estimated_minutes, quiz_questions)
SELECT 
  c.id,
  3,
  'Prompt Patterns for Builders',
  'Master the most useful prompt patterns for brainstorming, writing, and building.',
  '# Prompt Patterns for Builders 🔧

## Why Patterns Matter
Just like LEGO instructions, prompt patterns are reusable templates that work every time!

## Pattern 1: The Brainstormer 💡
**Use when:** You need ideas

**Template:**
```
Generate 10 creative ideas for [YOUR TOPIC].
For each idea, include:
- A catchy name
- One sentence description
- Why it would work
```

**Example:**
> "Generate 10 creative ideas for a mobile app that helps students study better..."

## Pattern 2: The Explainer 📚
**Use when:** You need to understand something

**Template:**
```
Explain [TOPIC] in 3 different ways:
1. Like I''m 5 years old
2. Like I''m a teenager
3. Like I''m an expert
```

## Pattern 3: The Improver ✏️
**Use when:** You want to make something better

**Template:**
```
Here is my [CONTENT TYPE]:
[YOUR CONTENT]

Please improve it by:
1. Making it clearer
2. Making it more engaging
3. Fixing any mistakes

Show me the before and after.
```

## Pattern 4: The Comparer ⚖️
**Use when:** You need to make a decision

**Template:**
```
Compare [OPTION A] vs [OPTION B] for [YOUR GOAL].
Create a table with:
- Pros of each
- Cons of each
- Best for what situation
- Your recommendation
```

## Pattern 5: The Step-by-Step Guide 📋
**Use when:** You need instructions

**Template:**
```
Create a step-by-step guide for [TASK].
Requirements:
- Number each step
- Explain WHY for each step
- Include tips for beginners
- Warn about common mistakes
```

## Pattern 6: The Critic 🎯
**Use when:** You want honest feedback

**Template:**
```
Review my [WORK] as if you were a [EXPERT TYPE].
Be honest and specific:
- What works well (3 things)
- What needs improvement (3 things)
- One actionable tip to make it better
```

## Combining Patterns
You can use multiple patterns together!

**Example:**
> "First, brainstorm 5 app ideas (Brainstormer), then compare the top 2 (Comparer), then create a step-by-step plan for the winner (Guide)."

## Your Builder''s Toolkit
Save these patterns! You''ll use them constantly when building your startup.',
  40,
  '[
    {"question": "Which pattern should you use when you need new ideas?", "options": ["The Explainer", "The Brainstormer", "The Critic", "The Comparer"], "correct": 1},
    {"question": "What makes the Improver pattern special?", "options": ["It creates new content from scratch", "It shows before and after changes", "It only works for essays", "It compares two options"], "correct": 1},
    {"question": "Can you combine multiple prompt patterns?", "options": ["No, only use one at a time", "Yes, patterns work great together", "Only experts can do that", "It makes the AI confused"], "correct": 1}
  ]'::jsonb
FROM public.certifications c WHERE c.slug = 'prompt-engineering-fundamentals';

INSERT INTO public.certification_lessons (certification_id, lesson_order, title, description, content, estimated_minutes, quiz_questions)
SELECT 
  c.id,
  4,
  'AI Tool Deep-Dive: Lovable',
  'Learn to build real apps with Lovable using the power of vibe coding.',
  '# Building Apps with Lovable 🏗️

## What is Lovable?
Lovable is an AI-powered app builder that turns your ideas into real, working websites and apps - no coding required!

## What is Vibe Coding?
**Vibe coding** is describing what you want to build in plain English, and letting AI create it for you. It''s the future of building!

## Getting Started with Lovable

### Step 1: Start with a Clear Vision
Before you prompt, answer these:
- What does your app do?
- Who will use it?
- What''s the main feature?

### Step 2: Write Your First Prompt
**Template for new apps:**
```
Create a [TYPE OF APP] for [TARGET USER] that helps them [MAIN GOAL].

Key features:
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]

Design style: [modern/playful/professional/minimal]
Color scheme: [describe colors you like]
```

**Example:**
```
Create a task manager app for students that helps them track homework.

Key features:
1. Add tasks with due dates
2. Mark tasks complete
3. See overdue tasks highlighted in red

Design style: Modern and clean
Color scheme: Blue and white with green for completed tasks
```

## Iterating Your App
Lovable works best when you iterate (improve step by step).

### Common Iteration Prompts:

**Change the design:**
> "Make the header blue instead of green"

**Add a feature:**
> "Add a button to delete tasks"

**Fix something:**
> "The submit button isn''t working, please fix it"

**Improve UX:**
> "Make the buttons bigger and add icons"

## Pro Tips for Lovable

### ✅ DO:
- Be specific about what you want
- Describe one change at a time
- Reference existing elements ("the blue button in the header")
- Ask for mobile-responsive designs

### ❌ DON''T:
- Ask for too many changes at once
- Be vague ("make it better")
- Forget to specify where changes go
- Skip describing the user experience

## Real Example: Building a Landing Page

**Prompt 1 (Start):**
```
Create a landing page for my startup called "StudyBuddy" - an AI homework helper for students.

Include:
- Hero section with headline and signup button
- Features section with 3 key benefits
- Testimonials section
- Call to action at the bottom

Style: Friendly, colorful, modern
```

**Prompt 2 (Iterate):**
> "Add a pricing section with 3 tiers: Free, Pro ($9/mo), Team ($19/mo)"

**Prompt 3 (Polish):**
> "Add subtle animations when scrolling and make the signup button glow"

## Your Challenge
Write a prompt to create a simple app you''ve always wanted!',
  45,
  '[
    {"question": "What is vibe coding?", "options": ["A type of music for coders", "Describing what you want in plain English and letting AI build it", "A programming language", "Coding while dancing"], "correct": 1},
    {"question": "What''s the best way to improve your Lovable app?", "options": ["Start over each time", "Make many changes at once", "Iterate step by step", "Only use templates"], "correct": 2},
    {"question": "Which is a good Lovable prompt?", "options": ["Make it better", "Add a red delete button next to each task item", "Do something cool", "Change stuff"], "correct": 1}
  ]'::jsonb
FROM public.certifications c WHERE c.slug = 'prompt-engineering-fundamentals';

INSERT INTO public.certification_lessons (certification_id, lesson_order, title, description, content, estimated_minutes, quiz_questions)
SELECT 
  c.id,
  5,
  'AI Tool Deep-Dive: Design Tools',
  'Create stunning visuals with Canva AI and Midjourney.',
  '# Designing with AI Tools 🎨

## Why Design Matters
Great products need great design! AI tools make professional design accessible to everyone.

## Canva AI

### What is Canva?
Canva is a design platform with powerful AI features for creating:
- Social media graphics
- Presentations
- Logos and brand kits
- Marketing materials

### Key AI Features in Canva

**1. Magic Write**
Generate text content instantly.
```
Prompt: "Write a catchy tagline for a pet sitting app"
Result: "Your pets deserve a vacation too! 🐾"
```

**2. Magic Design**
Describe what you want, get designs.
```
Prompt: "Instagram post announcing a summer sale, bright colors, fun vibe"
```

**3. Background Remover**
One click to remove backgrounds from photos.

**4. Magic Resize**
Automatically resize designs for different platforms.

### Canva Prompting Tips
- Mention the platform (Instagram, LinkedIn, etc.)
- Describe the mood (professional, playful, elegant)
- Specify colors if you have brand colors
- Include your industry for relevant imagery

## Midjourney

### What is Midjourney?
Midjourney creates stunning AI-generated images from text descriptions.

### The Midjourney Prompt Formula
```
[Subject] + [Style] + [Details] + [Parameters]
```

### Example Prompts

**Simple:**
> "A friendly robot helping a student with homework"

**Detailed:**
> "A friendly robot tutor helping a teenage student with homework, warm lighting, modern classroom, digital art style, cheerful atmosphere --ar 16:9"

### Key Parameters
- `--ar 16:9` = Aspect ratio (width:height)
- `--v 5` = Version of Midjourney
- `--style raw` = Less stylized, more realistic
- `--q 2` = Higher quality (slower)

### Style Keywords to Try
| Style | Description |
|-------|-------------|
| Photorealistic | Looks like a real photo |
| Digital art | Clean, modern illustration |
| Watercolor | Soft, artistic feel |
| Isometric | 3D-looking flat design |
| Minimalist | Simple, clean, fewer elements |

## When to Use Each Tool

| Task | Best Tool |
|------|-----------|
| Social media posts | Canva |
| Presentations | Canva |
| Unique illustrations | Midjourney |
| Product mockups | Midjourney + Canva |
| Brand materials | Canva |
| Hero images | Midjourney |

## Combining Tools
1. Generate image in Midjourney
2. Download and import to Canva
3. Add text and branding in Canva
4. Export final design

## Your Design Challenge
Create a social media post for your startup idea:
1. Write a Midjourney prompt for the background image
2. Describe what you''d add in Canva (text, buttons, etc.)',
  40,
  '[
    {"question": "Which AI feature in Canva removes photo backgrounds?", "options": ["Magic Write", "Magic Design", "Background Remover", "Magic Resize"], "correct": 2},
    {"question": "What does --ar 16:9 do in Midjourney?", "options": ["Makes image higher quality", "Sets the aspect ratio", "Changes the style", "Adds more details"], "correct": 1},
    {"question": "For creating a social media post with text, which tool is best?", "options": ["Midjourney only", "Canva", "Neither", "Only Photoshop"], "correct": 1}
  ]'::jsonb
FROM public.certifications c WHERE c.slug = 'prompt-engineering-fundamentals';

INSERT INTO public.certification_lessons (certification_id, lesson_order, title, description, content, estimated_minutes, quiz_questions)
SELECT 
  c.id,
  6,
  'Your First AI Project',
  'Put everything together and build something real for your portfolio!',
  '# Your First AI Project 🎓

## Congratulations!
You''ve learned the fundamentals of prompt engineering. Now it''s time to put it all together!

## Your Capstone Challenge
Build a simple landing page for a startup idea using AI tools.

## Step 1: Brainstorm Your Idea (ChatGPT/Claude)

**Prompt:**
```
I want to build a startup that helps [TARGET AUDIENCE] with [PROBLEM].

Generate 5 unique startup ideas with:
- A catchy name
- One-sentence description
- Why people would pay for it
```

Pick your favorite idea!

## Step 2: Create Your Hero Image (Midjourney or Canva)

**Midjourney Prompt Template:**
```
[Your product] being used by [target user], [setting], 
[mood] atmosphere, modern digital art style --ar 16:9
```

**Example:**
> "A teenager using a study app on their phone, cozy bedroom, warm evening lighting, happy focused expression, modern digital art style --ar 16:9"

## Step 3: Build Your Landing Page (Lovable)

**Prompt:**
```
Create a landing page for [STARTUP NAME] - [ONE SENTENCE DESCRIPTION].

Target audience: [WHO]
Main benefit: [WHAT THEY GET]

Sections:
1. Hero with headline, subheadline, and signup form
2. Problem section - what pain point you solve
3. Solution section - how your product helps
4. 3 key features with icons
5. Testimonial (you can make one up for now)
6. Call to action with signup button

Design: [STYLE] with [COLORS]
```

## Step 4: Iterate and Improve

Make at least 3 improvements:

**Prompt 1 - Add Social Proof:**
> "Add a section showing ''Trusted by 1000+ students'' with logos"

**Prompt 2 - Improve CTA:**
> "Make the signup button bigger and add ''It''s free!'' below it"

**Prompt 3 - Mobile Responsive:**
> "Ensure the design looks great on mobile phones"

## Step 5: Create Supporting Graphics (Canva)

Use Canva to create:
- A simple logo for your startup
- A social media announcement post
- An icon for each of your 3 features

## Submission Checklist

✅ Chose a startup idea using AI brainstorming
✅ Created a hero image with AI
✅ Built a landing page with at least 5 sections
✅ Made 3+ iterations to improve it
✅ Created at least 1 supporting graphic

## Portfolio Piece
This landing page is now part of your portfolio! You can:
- Share the link with friends and family
- Add it to your LinkedIn
- Use it as an example when applying to programs

## What''s Next?
Now that you have prompt engineering fundamentals:
1. **Join the full NEXT_ program** to build a real startup
2. **Practice daily** with different AI tools
3. **Share your certificate** on LinkedIn

## You Did It! 🎉
You''re now certified in AI Prompt Engineering Fundamentals.

Click "Complete & Get Certificate" to receive your LinkedIn-shareable certificate!',
  45,
  '[
    {"question": "What''s the first step in building your AI project?", "options": ["Build the landing page", "Create graphics", "Brainstorm your idea with AI", "Share on social media"], "correct": 2},
    {"question": "How many iterations should you make to improve your landing page?", "options": ["Zero - get it perfect first time", "At least 3", "Exactly 10", "As few as possible"], "correct": 1},
    {"question": "What can you do with your completed project?", "options": ["Nothing, it''s just practice", "Add it to your portfolio and LinkedIn", "Delete it immediately", "Only show your teacher"], "correct": 1}
  ]'::jsonb
FROM public.certifications c WHERE c.slug = 'prompt-engineering-fundamentals';

-- Seed 5 showcase projects
INSERT INTO public.showcase_projects (title, student_name, student_age, student_program, description, tools_used, project_url, is_featured, display_order) VALUES
(
  'Pet Finder App',
  'Emma T.',
  10,
  'junior',
  'A neighborhood app that helps reunite lost pets with their owners. Features a map of sightings, photo uploads, and instant alerts to nearby users.',
  ARRAY['Lovable', 'ChatGPT'],
  'https://petfinder-demo.lovable.app',
  true,
  1
),
(
  'Homework Helper Bot',
  'Marcus L.',
  13,
  'teen',
  'An AI-powered chatbot that helps students understand difficult homework problems. It doesn''t give answers - it teaches you how to solve them!',
  ARRAY['ChatGPT API', 'Glide', 'Canva'],
  'https://homework-helper-demo.glide.page',
  true,
  2
),
(
  'Pitch Perfect Deck',
  'Sofia R.',
  14,
  'teen',
  'A professional investor pitch deck for a sustainable fashion startup. Created using AI tools and presented at the Demo Day finals.',
  ARRAY['Canva AI', 'Gamma', 'ChatGPT'],
  null,
  true,
  3
),
(
  'Recipe Remix',
  'James K.',
  11,
  'junior',
  'An app that suggests creative recipes based on ingredients you already have in your fridge. Reduces food waste and makes cooking fun!',
  ARRAY['Glide', 'ChatGPT', 'Midjourney'],
  'https://recipe-remix-demo.glide.page',
  true,
  4
),
(
  'EcoShop Marketplace',
  'Aisha M.',
  16,
  'advanced',
  'A full e-commerce platform for eco-friendly products made by teen entrepreneurs. Features Stripe payments, inventory management, and order tracking.',
  ARRAY['Lovable', 'Stripe', 'Supabase', 'ChatGPT'],
  'https://ecoshop-demo.lovable.app',
  true,
  5
);
