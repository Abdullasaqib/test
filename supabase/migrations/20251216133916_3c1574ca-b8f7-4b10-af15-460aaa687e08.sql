-- Seed all 27 sprints for AI Foundations Certificate

-- Lesson 1: The AI Power-Up (5 sprints)
INSERT INTO public.certification_lesson_sprints (lesson_id, sprint_order, title, content, age_track, estimated_seconds, quiz_questions, is_advanced_technique) VALUES

-- Sprint 1.1: The 5-Minute Miracle
('3c09f877-2922-46a5-8dc7-ecfea63450f5', 1, 'The 5-Minute Miracle', 
'# What You''re About to Learn Will Change Everything

In the next 5 minutes, you''re going to see something that took professional developers **months** to build... created in under 5 minutes.

## The Old Way vs The New Way

**Before AI (The Old Way):**
- Learn to code for 6-12 months
- Build basic projects for practice
- Maybe launch something after 1-2 years

**With AI (The New Way):**
- Describe what you want in plain English
- Watch AI build it in minutes
- Launch the same day

## Real Example: A Homework Tracker App

Imagine you wanted an app to track your homework. Here''s what that prompt looks like:

> "Build me a homework tracker app where I can add assignments with due dates, mark them complete, and see which ones are overdue. Make it colorful and fun."

That''s it. That single sentence creates a fully working app.

## Your "Aha!" Moment

The skill you''re learning isn''t coding—it''s **communication**. The better you can describe what you want, the better AI builds it.

This is called **prompt engineering**, and it''s the most valuable skill of the 2020s.

**Think about it:** What would YOU build if you could create any app just by describing it?', 
'all', 90, 
'[{"question": "What is the main skill you are learning in this course?", "options": ["Coding in Python", "Prompt engineering", "Graphic design", "Video editing"], "correct": 1}, {"question": "How long did it traditionally take to learn to build apps?", "options": ["5 minutes", "1-2 weeks", "6-12 months minimum", "It was impossible"], "correct": 2}]', 
false),

-- Sprint 1.2: Your Brain on AI
('3c09f877-2922-46a5-8dc7-ecfea63450f5', 2, 'Your Brain on AI', 
'# How AI Actually Thinks (And Why It Matters)

To get amazing results from AI, you need to understand how it "thinks"—and it''s very different from humans.

## AI is Like a Super-Powered Autocomplete

When you type on your phone and it suggests the next word? AI works the same way, but WAY more powerful. It predicts the most likely helpful response based on:

- Everything it was trained on (books, websites, code)
- The specific words you use in your prompt
- The context and details you provide

## The Garbage In, Garbage Out Rule

**Vague prompt = Vague result**
> "Make me an app"
*(AI doesn''t know what kind, who it''s for, or what it should do)*

**Specific prompt = Specific result**  
> "Make me a pet care reminder app for dog owners that sends notifications for feeding times, walks, and vet appointments"
*(AI knows exactly what to build)*

## The Context Window

AI can only "remember" what''s in your current conversation. This is called the **context window**. 

**Pro tip:** If AI seems confused, start a fresh conversation and give it all the context again clearly.

## Your Superpower Unlocked

When you understand that AI is pattern-matching and predicting based on your input, you realize: **You''re the director. AI is your production team.**

The clearer your direction, the better the movie.', 
'all', 90, 
'[{"question": "What is the Context Window?", "options": ["A physical window in a building", "What AI can remember in your current conversation", "A type of computer screen", "A social media feature"], "correct": 1}]', 
false),

-- Sprint 1.3: Chain-of-Thought (Advanced)
('3c09f877-2922-46a5-8dc7-ecfea63450f5', 3, 'Chain-of-Thought: The Secret Weapon', 
'# 🔥 Advanced Technique: Chain-of-Thought Prompting

This is a technique most adults don''t even know. You''re about to learn something that gives you an unfair advantage.

## What Is Chain-of-Thought?

Instead of asking AI for the final answer, you ask it to **think step by step**. This makes AI much smarter and more accurate.

## The Magic Phrase

Add this to any complex prompt:
> "Think through this step by step before giving your final answer."

## Real Example

**Without Chain-of-Thought:**
> "What''s a good price for my homework help app?"
*AI might give a random answer like "$5"*

**With Chain-of-Thought:**
> "I''m building a homework help app for middle schoolers. Think step by step: Who are my competitors? What do they charge? What makes my app different? What would parents pay? Then recommend a price."

*AI now considers multiple factors and gives you a well-reasoned answer like "$3.99/month because competitor X charges $7.99 but has more features, and parents are price-sensitive for kids'' apps..."*

## When to Use This

- Complex decisions
- Business planning
- Debugging problems
- Any time you need AI to really *think*

## Try It Now (In Your Head)

Think of a question you''d ask AI. Now add "Think through this step by step." How would that change the answer?', 
'all', 90, 
'[{"question": "What does Chain-of-Thought prompting do?", "options": ["Makes AI respond faster", "Makes AI think step by step for better answers", "Lets AI remember more", "Changes the AI voice"], "correct": 1}]', 
true),

-- Sprint 1.4: Your AI Toolbox
('3c09f877-2922-46a5-8dc7-ecfea63450f5', 4, 'Your AI Toolbox', 
'# Your AI Toolbox: The Right Tool for Every Job

Just like a carpenter has different tools for different jobs, AI builders have different AI tools. Here''s your toolbox:

## 🗣️ Text AI (The Brain)
**Tools:** ChatGPT, Claude, Gemini
**Use for:** Ideas, writing, planning, problem-solving, explaining things

*Example:* "Help me brainstorm 10 app ideas for pet owners"

## 🎨 Image AI (The Artist)
**Tools:** Midjourney, DALL-E, Leonardo.ai
**Use for:** Logos, illustrations, product mockups, marketing images

*Example:* "Create a cute mascot logo for a pet care app"

## 🏗️ App Builder AI (The Builder)
**Tools:** Base44, Bolt, Replit
**Use for:** Creating actual working apps, websites, and tools

*Example:* "Build a pet feeding reminder app with notifications"

## 🎬 Video AI (The Director)
**Tools:** Runway, Pika, HeyGen
**Use for:** Product demos, explainer videos, animated content

*Example:* "Create a 15-second demo video of my app"

## The Power Combo

The magic happens when you **chain tools together**:

1. **ChatGPT** → brainstorm app idea
2. **Midjourney** → create logo and visuals  
3. **Base44** → build the actual app
4. **Runway** → make a promo video

That''s a complete product launch using AI!

## Coming Up Next

You''ll actually build something. Get ready!', 
'all', 90, 
'[{"question": "Which tool category would you use to create a logo?", "options": ["Text AI", "Image AI", "App Builder AI", "Video AI"], "correct": 1}, {"question": "What is Base44 used for?", "options": ["Writing essays", "Creating images", "Building working apps", "Making videos"], "correct": 2}]', 
false),

-- Sprint 1.5: Your First Build (Explorer - Ages 9-11)
('3c09f877-2922-46a5-8dc7-ecfea63450f5', 5, '🎮 Your First Build!', 
'# Time to Build Something REAL!

You''ve learned the basics. Now let''s make something cool!

## Your Mission: Build a Fun Quiz App

We''re going to create a quiz app about something YOU love. Could be:
- 🦖 Dinosaurs
- 🎮 Video games  
- 🐕 Dogs
- ⚽ Sports
- Anything you''re into!

## Here''s Your Prompt Template

Copy this and fill in the blanks:

> "Build me a fun quiz app about [YOUR TOPIC]. Include:
> - 5 multiple choice questions
> - Fun colors and animations
> - A score at the end
> - Celebration confetti when you get questions right
> - Make it fun for kids!"

## Tips for an Amazing Result

1. **Be specific about your topic** - "dogs" is okay, "golden retrievers" is better!
2. **Add personality** - Ask for jokes, fun facts, or silly animations
3. **Think about what YOU''D want** - If you were playing this quiz, what would make it awesome?

## What You Just Learned

🎉 You built a real app by just describing what you wanted!

This is the superpower you''re developing. The better you describe things, the better AI builds them.

**Next up:** We''ll learn secret techniques to make your prompts even more powerful!', 
'explorer', 90, 
'[{"question": "What makes a prompt better?", "options": ["Using big words", "Being specific about what you want", "Making it as short as possible", "Using code"], "correct": 1}]', 
false),

-- Sprint 1.5: Your First Build (Builder - Ages 12-14)
('3c09f877-2922-46a5-8dc7-ecfea63450f5', 5, 'Your First Build: A Real Tool', 
'# Time to Build Something Useful

You understand the basics. Now let''s create a tool that actually solves a problem.

## Your Mission: Build a Productivity Tool

Choose something that would help YOU:
- 📚 Study session timer with breaks
- 📝 Quick note-taker with categories
- 🎯 Goal tracker with progress bars
- 💡 Random idea generator for projects

## Your Prompt Template

> "Build me a [TYPE OF TOOL] that helps me [SPECIFIC PROBLEM]. Include:
> - Clean, modern design
> - Ability to save my data
> - [2-3 specific features you want]
> - Dark mode option
> Make it look professional but not boring."

## Level Up Your Prompt

**Basic:** "Build me a study timer"

**Better:** "Build me a study timer using the Pomodoro technique - 25 minutes work, 5 minutes break. Show a progress circle, play a sound when time''s up, and track how many sessions I complete each day. Use calming blue colors."

See the difference? The second prompt gives AI everything it needs.

## What You Just Built

You created a real productivity tool. This is exactly how professional developers work now—they describe what they want, AI builds the first version, then they refine it.

**You''re already ahead of most adults who don''t know this skill exists.**', 
'builder', 90, 
'[{"question": "Why is the second prompt example better?", "options": ["It uses fancier words", "It is longer", "It gives specific details about features and design", "It mentions more tools"], "correct": 2}]', 
false),

-- Sprint 1.5: Your First Build (Founder - Ages 15-16)
('3c09f877-2922-46a5-8dc7-ecfea63450f5', 5, 'Your First Build: MVP Thinking', 
'# Building Your First MVP

You''ve got the fundamentals. Now let''s think like a founder and build a Minimum Viable Product.

## What''s an MVP?

MVP = Minimum Viable Product. It''s the simplest version of your idea that still provides value. Real startups use this approach to test ideas quickly.

## Your Mission: Solve a Real Problem

Think of a genuine problem you or people around you face:
- Group project coordination chaos
- Splitting bills with friends
- Finding study partners
- Tracking shared responsibilities

## The Founder''s Prompt Framework

> "Build an MVP for [PROBLEM]. Target user: [WHO]. Core feature: [THE ONE THING IT MUST DO].
>
> Requirements:
> - User authentication (people can sign up/log in)  
> - Clean, professional UI
> - Mobile-responsive
> - [Your key differentiator]
>
> Skip for MVP: [Features that can wait]"

## Real Example

> "Build an MVP for splitting group expenses. Target user: college students sharing apartments. Core feature: Add expenses and see who owes who.
>
> Requirements:
> - User accounts
> - Create/join a group
> - Add expenses with who paid and who benefited
> - Dashboard showing balances
> - Clean, modern design
>
> Skip for MVP: Payment integration, receipt scanning, budget tracking"

## The Founder Mindset

Notice what we''re NOT building: payment processing, receipt scanning, AI categorization. Those are future features. 

**Real founders ship fast, then iterate.** You just learned to think like one.', 
'founder', 90, 
'[{"question": "What does MVP stand for?", "options": ["Most Valuable Player", "Minimum Viable Product", "Maximum Value Proposition", "Modern Visual Platform"], "correct": 1}, {"question": "Why do founders skip some features in an MVP?", "options": ["They are lazy", "To ship fast and test if the idea works", "Features are too hard", "AI cannot build them"], "correct": 1}]', 
false);

-- Lesson 2: Prompt Engineering Secrets (4 sprints)
INSERT INTO public.certification_lesson_sprints (lesson_id, sprint_order, title, content, age_track, estimated_seconds, quiz_questions, is_advanced_technique) VALUES

-- Sprint 2.1: The RECIPE Framework
('7ca176bc-1f1b-44be-8152-d99b48279ba2', 1, 'The RECIPE Framework', 
'# The RECIPE Framework: Your Secret Formula

Professional prompt engineers use frameworks to get consistent, amazing results. Here''s the one we use: **RECIPE**.

## R - Role
Tell AI who to be.
> "You are an expert UX designer with 10 years of experience..."

## E - Examples  
Show AI what you want.
> "Here are 3 examples of the style I like: [examples]"

## C - Context
Give background information.
> "I''m building an app for busy parents who have 5 minutes max..."

## I - Instructions
Be crystal clear about the task.
> "Create 5 different landing page headlines that emphasize time-saving..."

## P - Persona
Define the voice/tone.
> "Write in a friendly, casual tone like talking to a friend..."

## E - Evaluation
Tell AI how to check its work.
> "Make sure each headline is under 10 words and includes a benefit..."

## The Full RECIPE Example

> "**Role:** You are an expert children''s app designer.
> **Context:** I''m building a math practice app for 8-10 year olds who find math boring.
> **Instructions:** Design 3 game concepts that make multiplication fun.
> **Persona:** Keep descriptions exciting and kid-friendly.
> **Evaluation:** Each game should be explainable in under 50 words and feel like a real game, not homework."

## You Don''t Need All 6 Every Time

Use what''s relevant. But when you''re stuck, run through RECIPE and see what''s missing!', 
'all', 90, 
'[{"question": "What does the R in RECIPE stand for?", "options": ["Results", "Role", "Research", "Review"], "correct": 1}, {"question": "Why do you give AI examples?", "options": ["To confuse it", "To show what style or quality you want", "To make the prompt longer", "Examples are not helpful"], "correct": 1}]', 
false),

-- Sprint 2.2: Few-Shot Learning (Advanced)
('7ca176bc-1f1b-44be-8152-d99b48279ba2', 2, 'Few-Shot Learning: Teach AI By Example', 
'# 🔥 Advanced Technique: Few-Shot Learning

This technique is used by AI researchers and professional prompt engineers. You''re about to learn it too.

## What is Few-Shot Learning?

Instead of explaining what you want, you **show** AI examples. It learns the pattern and applies it.

## The Pattern

```
Here are examples of what I want:

Input: [example 1 input]
Output: [example 1 output]

Input: [example 2 input]  
Output: [example 2 output]

Now do this one:
Input: [your actual request]
Output:
```

## Real Example: Writing Product Descriptions

> "Write product descriptions in my style. Here are examples:
>
> Product: Blue water bottle
> Description: Stay hydrated in style. This ocean-blue bottle keeps drinks cold for 24 hours. Perfect for adventurers who refuse to compromise.
>
> Product: Wireless earbuds  
> Description: Sound that moves with you. Crystal-clear audio meets ultimate comfort. For listeners who demand more.
>
> Now write one for:
> Product: Laptop backpack
> Description:"

AI will now match your style exactly—short punchy sentences, benefit-focused, aspirational tone.

## When Few-Shot Crushes It

- Matching a specific writing style
- Consistent formatting across outputs
- Teaching AI your brand voice
- Any time you can show rather than tell

## Pro Tip

2-3 examples is usually enough. More examples = more consistent results, but diminishing returns after 5.', 
'all', 90, 
'[{"question": "What is Few-Shot Learning?", "options": ["Learning with few teachers", "Teaching AI with examples so it learns the pattern", "Taking few screenshots", "Quick photography"], "correct": 1}]', 
true),

-- Sprint 2.3: Persona Stacking (Advanced)
('7ca176bc-1f1b-44be-8152-d99b48279ba2', 3, 'Persona Stacking: Combine Expert Minds', 
'# 🔥 Advanced Technique: Persona Stacking

What if you could get advice from multiple experts at once? With persona stacking, you can.

## The Concept

Instead of one AI persona, you combine multiple expert perspectives for richer, more complete answers.

## Single Persona (Good)
> "As a marketing expert, review my landing page."

## Stacked Personas (Amazing)
> "Review my landing page from three perspectives and give specific feedback from each:
> 1. As a UX designer: Is it intuitive? Any friction points?
> 2. As a copywriter: Is the message clear? Headlines compelling?  
> 3. As a skeptical first-time visitor: What would make you leave? What questions are unanswered?"

## Real Power Move: The Devil''s Advocate Stack

> "You are three advisors helping me evaluate my app idea:
>
> **The Optimist:** What''s exciting about this idea? Why could it succeed?
> **The Pessimist:** What could go wrong? What are the risks?
> **The Pragmatist:** What''s the realistic first step? What should I actually do?
>
> My idea: [your idea]
>
> Each advisor responds with their honest perspective."

## When to Use Persona Stacking

- Evaluating ideas (get multiple viewpoints)
- Reviewing work (catch blind spots)
- Making decisions (consider all angles)
- Creative work (blend different styles)

## The Result

You get consultant-level analysis that would cost thousands of dollars from actual experts—for free, instantly.', 
'all', 90, 
'[{"question": "What is Persona Stacking?", "options": ["Creating multiple AI accounts", "Combining multiple expert perspectives in one prompt", "Stacking papers on a desk", "A social media strategy"], "correct": 1}]', 
true),

-- Sprint 2.4: Prompt Upgrade Challenge
('7ca176bc-1f1b-44be-8152-d99b48279ba2', 4, 'The Prompt Upgrade Challenge', 
'# Test Your Skills: Upgrade These Prompts

Time to practice! Take these weak prompts and make them powerful.

## Challenge 1: The Vague Request

**Weak prompt:** "Make me a website"

**Your upgraded version should include:**
- What kind of website?
- Who is it for?
- What pages does it need?
- What style/feeling?

**Example upgrade:**
> "Build me a portfolio website for a teen photographer. Include: home page with featured photos, gallery organized by category (nature, portraits, events), about me page, and contact form. Style: minimal, lots of white space, let the photos be the focus. Make it mobile-friendly."

## Challenge 2: Missing Context

**Weak prompt:** "Write me a speech"

**Think about:** 
- What''s the occasion?
- Who''s the audience?
- How long should it be?
- What tone?

## Challenge 3: No Success Criteria

**Weak prompt:** "Give me business ideas"

**Think about:**
- How many ideas?
- What constraints? (budget, skills, time)
- What makes an idea "good" for you?
- What format do you want?

## The Upgrade Checklist

Before hitting send, check:
✅ Did I explain WHO this is for?
✅ Did I give CONTEXT about the situation?
✅ Did I specify WHAT SUCCESS looks like?
✅ Did I describe the STYLE or TONE?
✅ Did I include CONSTRAINTS (length, budget, etc.)?

**Master this checklist and your results will 10x.**', 
'all', 90, 
'[{"question": "What is missing from the prompt ''Make me a website''?", "options": ["Nothing, it is perfect", "The word please", "Context about type, audience, style, and pages", "A signature"], "correct": 2}]', 
false);

-- Lesson 3: Multi-Tool Workflows (5 sprints)
INSERT INTO public.certification_lesson_sprints (lesson_id, sprint_order, title, content, age_track, estimated_seconds, quiz_questions, is_advanced_technique) VALUES

-- Sprint 3.1: The AI Pipeline Concept
('51f66120-e906-47ff-8f85-785c024f4864', 1, 'The AI Pipeline Concept', 
'# Chaining Tools: The Real Superpower

Individual AI tools are powerful. But chaining them together? That''s where magic happens.

## What''s an AI Pipeline?

A pipeline is when the **output of one AI tool becomes the input for another**.

Think of it like a factory assembly line, but for creating digital products.

## Simple Pipeline Example

**Goal:** Create a children''s story app

1. **ChatGPT** → Generate the story and characters
2. **Midjourney** → Create illustrations for each scene
3. **Base44** → Build an interactive story app with the text and images
4. **ElevenLabs** → Add narration audio

One person. Four tools. A complete product that would have needed a whole team before.

## Why Pipelines Are Powerful

- **Speed:** Hours instead of weeks
- **Cost:** Free or cheap instead of hiring specialists
- **Control:** You direct every step
- **Iteration:** Easy to change and improve

## The Pipeline Mindset

When you see a finished product, start breaking it down:
- What''s the text content? → Text AI
- What are the visuals? → Image AI
- How does it function? → App Builder AI
- Is there audio/video? → Media AI

**Everything is made of pieces you can create with AI.**

## Coming Up

You''ll learn specific pipeline patterns that work for different types of projects.', 
'all', 90, 
'[{"question": "What is an AI Pipeline?", "options": ["A physical tube for AI", "When output from one AI becomes input for another", "A new social media app", "A type of computer processor"], "correct": 1}]', 
false),

-- Sprint 3.2: ChatGPT to Image
('51f66120-e906-47ff-8f85-785c024f4864', 2, 'Pipeline Pattern: Text → Image', 
'# Pipeline 1: From Idea to Visual

This is the most common pipeline. Use AI to develop an idea, then visualize it.

## The Pattern

```
ChatGPT (Brainstorm) → ChatGPT (Refine) → Image AI (Visualize)
```

## Step-by-Step Example: App Icon Design

**Step 1: Brainstorm with ChatGPT**
> "I''m creating a meditation app for teens. Brainstorm 5 different icon concepts that would appeal to Gen Z but still convey calm and mindfulness."

**Step 2: Refine the best idea**
> "I like the ''minimal mountain with sunrise gradient'' concept. Describe exactly how this icon should look in detail—colors, shapes, style—so I can give this to an image generator."

**Step 3: Generate with Image AI**
Take ChatGPT''s detailed description and use it in Midjourney/DALL-E:
> "App icon, minimal mountain silhouette, sunrise gradient from deep purple to soft pink to warm orange, clean geometric style, no text, centered composition, iOS app icon style --s 750"

## Pro Tips

1. **ChatGPT is great for image prompts** - Ask it to write Midjourney prompts for you
2. **Iterate in conversation** - "Make it more minimal" or "add more energy"
3. **Get variations** - Generate multiple versions, pick the best

## Your Turn

Think of something you want to visualize. What would you ask ChatGPT to help you describe first?', 
'all', 90, 
'[{"question": "Why use ChatGPT before an image AI?", "options": ["Image AI does not work alone", "ChatGPT can help you develop and describe your idea in detail first", "It is required by law", "ChatGPT creates better images"], "correct": 1}]', 
false),

-- Sprint 3.3: Image to App
('51f66120-e906-47ff-8f85-785c024f4864', 3, 'Pipeline Pattern: Image → App', 
'# Pipeline 2: From Design to Functional App

What if you could show AI a picture and have it build the app? You can.

## The Pattern

```
Design Mockup → Base44 (Build) → Working App
```

## How It Works

Modern app builders like Base44 can take visual references and build matching interfaces.

## Step-by-Step Example: Recreating a Design

**Step 1: Create or find your design**
- Sketch on paper and photograph it
- Use Figma or Canva to create a mockup
- Generate with AI image tools
- Screenshot an app you love (for inspiration, not copying!)

**Step 2: Describe with visual reference**
> "Build this app based on the design shown. This is a task manager with:
> - Header with app name and add button
> - List of tasks with checkboxes
> - Completed tasks shown with strikethrough
> - Bottom navigation bar
> Match the colors and layout from my reference image."

## The Secret: Describe What You See

Even without uploading an image, you can describe a design in detail:

> "Create a Spotify-style music player interface: dark background, large album art centered, song title and artist below, playback controls (previous, play/pause, next) at the bottom, progress bar above controls, subtle purple accent color on active elements."

## Why This Matters

- **Non-designers can build beautiful apps** - Describe what looks good to you
- **Speed** - Skip the design phase entirely
- **Iteration** - Tweak with words instead of redoing mockups', 
'all', 90, 
'[{"question": "What can you use as input when building an app with visual reference?", "options": ["Only professional Figma files", "Sketches, mockups, screenshots, or detailed descriptions", "Only code", "You cannot use visual references"], "correct": 1}]', 
false),

-- Sprint 3.4: The Content Factory
('51f66120-e906-47ff-8f85-785c024f4864', 4, 'Pipeline Pattern: The Content Factory', 
'# Pipeline 3: Complete Content Creation

This pipeline creates a full content suite from a single idea. Perfect for launching products.

## The Full Pipeline

```
Idea → ChatGPT (Content) → Image AI (Visuals) → Video AI (Demo) → App Builder (Landing Page)
```

## Real Example: Launching a New App

**Starting point:** You built a study timer app

**Step 1: ChatGPT - Create the copy**
> "Write marketing content for my Pomodoro study timer app:
> - Catchy app name (5 options)
> - One-liner description
> - 3 key features with benefits
> - 5 social media posts
> - App store description"

**Step 2: Image AI - Create visuals**
> "Marketing image: student focused on laptop, calm aesthetic, soft lighting, productivity vibes, space for text overlay on left side"

Also generate: app icon, social media graphics, screenshots

**Step 3: Video AI - Create demo**
Use Runway or Pika to animate your screenshots or create a quick demo video

**Step 4: Base44 - Build landing page**
> "Build a landing page for my app called [name]. Include: hero section with app screenshot, 3 feature cards with icons, testimonial section, download buttons for App Store and Google Play, footer with links"

## The Result

In one day, you have:
✅ Marketing copy
✅ Professional visuals
✅ Demo video
✅ Landing page

That''s a complete product launch kit.', 
'all', 90, 
'[{"question": "What is the Content Factory pipeline best for?", "options": ["Making music", "Creating all marketing content needed to launch a product", "Fixing bugs in code", "Learning to draw"], "correct": 1}]', 
false),

-- Sprint 3.5: Build Your First Pipeline
('51f66120-e906-47ff-8f85-785c024f4864', 5, 'Build Your First Pipeline', 
'# Hands-On: Create Your Own Pipeline

Time to put it all together. You''ll design a pipeline for YOUR idea.

## Your Mission

Choose a project and map out the AI tools you''d use:

**Option A: YouTube Channel Launch**
- Video topic ideas
- Thumbnail design
- Script writing  
- Channel art

**Option B: Small Business**
- Business name and brand
- Logo and visuals
- Simple website
- Social media content

**Option C: School Club**
- Club name and mission
- Promotional poster
- Sign-up form/website
- Social posts for recruitment

## Pipeline Planning Template

Fill this out for your chosen project:

```
My Project: ________________

Step 1: _________ (Tool: _________)
What I''ll create: 

Step 2: _________ (Tool: _________)
What I''ll create:

Step 3: _________ (Tool: _________)
What I''ll create:

Step 4: _________ (Tool: _________)
What I''ll create:

Final Output: ________________
```

## Key Questions

1. What''s the FIRST thing I need to figure out? (Usually: ChatGPT for brainstorming)
2. What VISUALS do I need? (Image AI)
3. Does this need to BE something? (App Builder)
4. How will people LEARN about it? (Content + distribution)

## You''re Thinking Like a Builder

This planning process is how professional creators work. You see the whole picture before starting—that''s what separates builders from dreamers.', 
'all', 90, 
'[{"question": "Why should you plan your pipeline before starting?", "options": ["AI requires it", "It helps you see the whole picture and know what tools you need at each step", "It is not important", "To impress friends"], "correct": 1}]', 
false);

-- Lesson 4: Base44 Mastery (5 sprints)
INSERT INTO public.certification_lesson_sprints (lesson_id, sprint_order, title, content, age_track, estimated_seconds, quiz_questions, is_advanced_technique) VALUES

-- Sprint 4.1: Why Base44 Changes Everything
('15cb3710-e7bc-4911-b1a8-30b36d194790', 1, 'Why Base44 Changes Everything', 
'# Welcome to Vibe Coding

Base44 represents a fundamental shift in how software gets built. It''s called **vibe coding** - you describe the vibe, AI writes the code.

## What Makes Base44 Different

**Traditional coding:**
- Learn syntax for months/years
- Write code line by line
- Debug errors constantly
- Deploy is complicated

**Base44 vibe coding:**
- Describe what you want in English
- AI writes all the code
- See live preview instantly
- One-click deployment

## What You Can Build

With Base44, you can create:
- ✅ Full web applications
- ✅ User accounts and login systems
- ✅ Databases that save information
- ✅ Mobile-responsive designs
- ✅ API integrations
- ✅ Admin dashboards

Basically, anything you see on the internet—you can build with conversation.

## The Mindset Shift

You''re not learning to code. You''re learning to **direct AI coders**.

Think of yourself as the CEO of a software company. You have a vision. Your AI team (Base44) executes. Your job is to communicate clearly and iterate based on results.

## The Unfair Advantage

Most people still think you need to learn Python or JavaScript to build apps. While they spend months learning syntax, you''ll be shipping products.

**This is your unfair advantage. Use it.**', 
'all', 90, 
'[{"question": "What is Vibe Coding?", "options": ["Coding while listening to music", "Describing what you want and AI writes the code", "A type of dance", "Coding very fast"], "correct": 1}]', 
false),

-- Sprint 4.2: Base44 Power Prompts
('15cb3710-e7bc-4911-b1a8-30b36d194790', 2, 'Base44 Power Prompts', 
'# Mastering Base44 Prompts

Base44 is conversational, but there are patterns that get better results faster.

## The Anatomy of a Great Base44 Prompt

**Structure:**
> "[What to build] for [who]. Include:
> - [Feature 1]
> - [Feature 2]  
> - [Feature 3]
> 
> Design: [Style guidance]"

## Power Prompt Patterns

**The Complete Spec:**
> "Build a habit tracker for students. Include:
> - Add habits with custom names and icons
> - Daily check-off for each habit
> - Streak counter showing consecutive days
> - Weekly overview graph
> - Dark mode toggle
>
> Design: Modern, minimal, use a purple accent color. Make it satisfying to check things off (add a subtle animation)."

**The Reference Prompt:**
> "Build a note-taking app similar to Apple Notes. Simple left sidebar with note titles, main area for writing. Include:
> - Create/delete notes
> - Auto-save as I type
> - Search notes
> Clean, minimal design with lots of white space."

**The Iteration Prompt:**
> "I like what we have. Now make these changes:
> 1. Make the header sticky so it stays visible when scrolling
> 2. Add a loading spinner when data is being fetched
> 3. Change the primary button color to green"

## Pro Tips

1. **Start simple, then add** - Get the core working, then layer features
2. **Be specific about design** - "Modern and clean" is okay, colors and spacing are better
3. **Use "similar to [X]"** - Reference familiar apps to convey style quickly
4. **Bullet points are your friend** - Easier for AI to parse than long paragraphs', 
'all', 90, 
'[{"question": "What is a good strategy when building with Base44?", "options": ["Try to build everything at once", "Start simple, get core working, then add features", "Never use bullet points", "Only use one-word prompts"], "correct": 1}]', 
false),

-- Sprint 4.3: Database Magic
('15cb3710-e7bc-4911-b1a8-30b36d194790', 3, 'Database Magic: Saving Data', 
'# Making Your App Remember

Apps that forget everything when you close them aren''t very useful. Let''s add persistence!

## What Is a Database?

A database is where your app stores information permanently. When someone:
- Creates an account → saved in database
- Posts a comment → saved in database
- Uploads a file → saved in database

## Adding a Database in Base44

It''s as simple as describing what you need to save:

> "Build a journaling app. **Save each journal entry to a database** with:
> - Entry date
> - Mood (happy, sad, neutral, excited)
> - The journal text
> - Optional photo
>
> Show entries in a timeline, most recent first. Let users edit or delete past entries."

**Key phrases that trigger database creation:**
- "save to database"
- "store the data"
- "remember the information"
- "persist between sessions"
- "let users come back and see their..."

## Real Example: Event RSVP System

> "Build an event RSVP system where:
> - Admin can create events with name, date, location, and description
> - Each event has a unique shareable link
> - Visitors can RSVP by entering their name and email (save to database)
> - Admin can see all RSVPs for each event
> - Show RSVP count on the event page"

## The Power Unlock

With databases, your apps can:
- Have user-generated content
- Track progress over time
- Work for multiple people
- Be actually useful in real life

**You''re building real software now.**', 
'all', 90, 
'[{"question": "What is a database used for in apps?", "options": ["Making apps look pretty", "Storing information permanently so the app remembers it", "Running faster", "Adding animations"], "correct": 1}]', 
true),

-- Sprint 4.4: Authentication in Plain English
('15cb3710-e7bc-4911-b1a8-30b36d194790', 4, 'Authentication: User Accounts Made Easy', 
'# Adding User Accounts

Want people to sign up, log in, and have their own private data? It''s easier than you think.

## The Magic Phrase

> "Add user authentication so people can sign up and log in. Each user should only see their own [data type]."

That''s it. Base44 handles all the complexity of:
- Sign up forms
- Login forms
- Password security
- Session management
- Protecting private data

## Real Example: Personal Budget Tracker

> "Build a personal budget tracker with **user authentication**.
>
> Each user can:
> - Add income and expenses with amounts and categories
> - See their monthly total and breakdown by category
> - View past months
>
> **Each user should only see their own transactions.**
>
> Include a nice dashboard with charts showing spending patterns."

## The Key Phrase That Protects Privacy

**"Each user should only see their own [X]"**

This tells Base44 to set up proper data security so users can''t see each other''s data.

## What You Can Now Build

With authentication + databases, you can build:
- Social apps (each user has their profile)
- Productivity apps (private task lists)
- Learning apps (personal progress tracking)
- Marketplaces (buyers and sellers)
- Any "logged in" experience

## Security Note

Base44 handles security best practices automatically. The data is encrypted and protected. You don''t need to be a security expert—the AI is.', 
'all', 90, 
'[{"question": "What does the phrase ''Each user should only see their own data'' tell Base44 to do?", "options": ["Delete all data", "Set up security so users cannot see each other''s data", "Make the app slower", "Remove the login page"], "correct": 1}]', 
true),

-- Sprint 4.5: 20-Minute Challenge (All tracks use same content for this one)
('15cb3710-e7bc-4911-b1a8-30b36d194790', 5, 'The 20-Minute Full-Stack Challenge', 
'# Challenge: Build a Complete App in 20 Minutes

Time to prove what you''ve learned. Pick one of these challenges and build it.

## Challenge Options

**Option 1: Community Board**
> A local community bulletin board where neighbors can:
> - Post announcements, events, or items for sale
> - Comment on posts
> - Filter by category
> - User accounts so you can track who posted what

**Option 2: Study Group Finder**
> A platform where students can:
> - Create study groups for specific subjects
> - Join existing groups
> - See group chat/discussion
> - Track upcoming study sessions

**Option 3: Skill Swap**
> A marketplace where people exchange skills:
> - Post skills you can teach
> - Browse skills others are offering
> - Request a swap (I''ll teach you X if you teach me Y)
> - User ratings/reviews

## Your Prompt Template

> "Build a [your choice] app with user authentication.
>
> Features:
> - [Core feature 1]
> - [Core feature 2]
> - [Core feature 3]
> - [Core feature 4]
>
> Each user should only see their own [private data].
> Anyone can view [public data].
>
> Design: [Your style preference]"

## Success Criteria

✅ User can sign up and log in
✅ Core functionality works
✅ Data saves and persists
✅ Looks reasonably good on mobile and desktop

## What You Just Built

A full-stack web application. Authentication, database, frontend, backend—all working together.

**You''re now more capable than many computer science students who''ve been studying for years.**', 
'all', 120, 
'[{"question": "What makes a full-stack application?", "options": ["Only front-end design", "Authentication, database, frontend, and backend working together", "Lots of colors", "Video content"], "correct": 1}]', 
false);

-- Lesson 5: AI Design Studio (4 sprints)
INSERT INTO public.certification_lesson_sprints (lesson_id, sprint_order, title, content, age_track, estimated_seconds, quiz_questions, is_advanced_technique) VALUES

-- Sprint 5.1: Beyond Basic Design
('15028fe4-9b08-4638-b858-68c0a6fdc5cd', 1, 'Beyond Basic Design', 
'# Level Up Your AI Image Game

You''ve probably tried DALL-E or Midjourney before. Time to go from beginner to power user.

## The Common Mistakes

**Mistake 1: Too vague**
❌ "A dog"
✅ "Golden retriever puppy, soft studio lighting, shallow depth of field, cream colored background, looking at camera with head tilted"

**Mistake 2: Forgetting style**
❌ "A city skyline"
✅ "Tokyo skyline at night, cyberpunk aesthetic, neon lights reflecting on wet streets, cinematic photography style, 35mm lens"

**Mistake 3: No technical specs**
❌ "A logo for my company"
✅ "Minimal logo mark, geometric abstract shape suggesting connection and growth, single color on white background, vector style, suitable for app icon, no text"

## The Power Formula

```
[Subject] + [Style/Aesthetic] + [Lighting] + [Technical Details] + [Mood/Feeling]
```

## Professional Parameters (Midjourney)

- `--ar 16:9` → Widescreen aspect ratio
- `--ar 1:1` → Square (good for social media)
- `--s 750` → Stylization level (0-1000)
- `--q 2` → Higher quality
- `--v 6` → Version 6 (latest)

## Example Power Prompt

> "Cozy coffee shop interior, morning light streaming through windows, steam rising from coffee cup in foreground, bookshelves on walls, warm amber tones, film photography aesthetic, Kodak Portra 400 --ar 16:9 --s 750 --v 6"

This prompt will generate something that looks like a professional photograph, not a generic AI image.', 
'all', 90, 
'[{"question": "What does the --ar parameter control in Midjourney?", "options": ["Art style", "Aspect ratio", "Animation", "Audio"], "correct": 1}]', 
false),

-- Sprint 5.2: Consistent Characters
('15028fe4-9b08-4638-b858-68c0a6fdc5cd', 2, 'Consistent Characters & Brand Identity', 
'# The Holy Grail: Consistency

One of the hardest things in AI image generation is getting the same character or style across multiple images. Here''s how.

## Method 1: Detailed Character Description

Create a "character sheet" prompt and reference it:

> "Character: Luna, a 12-year-old girl with curly red hair in two buns, green eyes, freckles across her nose, wearing a purple space suit with gold accents. Friendly smile, adventurous expression."

Then in every future prompt:
> "[Your scene] with Luna [from your character description]"

## Method 2: Reference Images

In Midjourney v6:
1. Upload a reference image of your character
2. Use `--cref [image URL]` to reference it
3. AI will maintain character consistency

> "Luna exploring an alien jungle --cref [your uploaded image URL]"

## Method 3: Style References

For brand consistency (colors, aesthetic):
> "Marketing image for my app --sref [style reference image URL]"

This keeps the color palette, lighting style, and overall aesthetic consistent.

## Building a Brand Kit

Create these with consistent style:
1. **Logo** - Your icon/symbol
2. **Color palette** - 3-5 colors that work together
3. **Typography** - What fonts you use
4. **Imagery style** - Photography? Illustration? 3D?

## Pro Tip: Create a "Brand Bible" Prompt

> "Design style for [brand name]: modern and minimal, color palette of deep navy blue (#1a365d) and warm gold (#d69e2e) with clean white backgrounds. Photography style is bright and airy. Illustrations are simple flat style. Fonts are geometric sans-serif."

Reference this for every visual you create!', 
'all', 90, 
'[{"question": "What is --cref used for in Midjourney?", "options": ["Creating references to websites", "Referencing a character image for consistency", "Changing resolution", "Adding text"], "correct": 1}]', 
true),

-- Sprint 5.3: Complete Brand Kit Challenge
('15028fe4-9b08-4638-b858-68c0a6fdc5cd', 3, 'The Complete Brand Kit Challenge', 
'# Challenge: Build Your Brand

Create a complete visual brand for your project. By the end, you''ll have everything needed to look professional.

## What You''ll Create

1. **Logo/Icon** - Your visual symbol
2. **Color Palette** - Your signature colors
3. **Social Media Header** - For your profiles
4. **App Screenshot Mockup** - Show your product
5. **Marketing Image** - For promotion

## Step-by-Step

### Step 1: Logo
> "Logo design for [your app/project name], a [what it does]. Style: [minimal/playful/bold/elegant]. Must work as small app icon. Single memorable symbol, no text in the icon itself. Colors: [your preference or let AI suggest]"

### Step 2: Color Palette
> "Generate a color palette for a [type] brand. Primary color, secondary color, accent color, background color, and text color. Show them as swatches with hex codes. Style: [modern/playful/professional/etc]"

### Step 3: Social Header
> "Social media header banner (16:9 ratio) for [brand]. Include the logo subtly, tagline ''[your tagline]''. Use brand colors [colors]. Clean and professional, not cluttered."

### Step 4: App Screenshot
> "App store screenshot mockup showing [your app] on an iPhone. The app screen shows [describe what screen to show]. Lifestyle background with soft gradient. Top text reads ''[key feature]''"

### Step 5: Marketing Hero Image
> "Marketing hero image for [brand]. [Your visual concept]. Aspirational feeling. Room for text overlay on [left/right] side. Uses brand colors."

## You Now Have

A complete visual identity that looks like a real company. These assets work for app stores, social media, websites, and pitch decks.

**This would cost $500-5000 from a designer. You made it yourself.**', 
'all', 120, 
'[{"question": "What five items make up a basic brand kit?", "options": ["Only a logo is needed", "Logo, color palette, social header, app mockup, and marketing image", "Just social media posts", "Only photographs"], "correct": 1}]', 
false),

-- Sprint 5.4: Video AI Sneak Peek
('15028fe4-9b08-4638-b858-68c0a6fdc5cd', 4, 'AI Video: The Next Frontier', 
'# Video AI: Sneak Peek

Image AI is amazing. But video AI is where things get really wild.

## The Current Landscape

**Text-to-Video:**
- **Runway** - Generate videos from text prompts
- **Pika** - Quick, stylized videos
- **Sora** (OpenAI) - Highest quality, limited access

**Image-to-Video:**
- Animate any still image
- Add motion to product shots
- Bring illustrations to life

## What You Can Create

1. **Product demos** - Show your app in action
2. **Logo animations** - Make your logo move
3. **Explainer snippets** - Quick concept visualizations
4. **Social content** - Eye-catching motion graphics

## Example Prompts

**For Runway:**
> "Smooth camera push in on a laptop screen showing a colorful app interface. Cozy office background, warm afternoon lighting. 4 seconds."

**For Logo Animation:**
> "Simple logo animation: [Your logo] appears by drawing itself, then a subtle glow pulse. Clean white background. 3 seconds loop."

## Why This Matters

Before AI:
- Video production required expensive equipment
- Needed editing skills (months to learn)
- Professional work cost $1000s+

After AI:
- Describe what you want
- Generate in seconds
- Iterate instantly

## Coming Soon

As these tools evolve, you''ll be able to create:
- Full commercials from text
- Animated stories
- Interactive video experiences

**You''re learning these tools at the perfect time—before most adults even know they exist.**', 
'all', 90, 
'[{"question": "What can AI video tools like Runway do?", "options": ["Only edit existing videos", "Generate videos from text prompts or animate images", "Replace all human filmmakers", "Only work on professional computers"], "correct": 1}]', 
false);

-- Lesson 6: The 48-Hour Ship Challenge (4 sprints)
INSERT INTO public.certification_lesson_sprints (lesson_id, sprint_order, title, content, age_track, estimated_seconds, quiz_questions, is_advanced_technique) VALUES

-- Sprint 6.1: Challenge Rules
('1987925c-1791-40b4-9d9c-10ed1391cfc1', 1, 'The 48-Hour Ship Challenge: Rules', 
'# Welcome to the Ship Challenge

This is it. Everything you''ve learned comes together in a simulated startup sprint.

## The Challenge

**Your mission:** Concept, build, and ship a complete product in 48 hours (simulated).

By the end, you''ll have:
- ✅ A working application
- ✅ A public URL anyone can visit
- ✅ A landing page or product hunt post
- ✅ Proof that you can CREATE, not just consume

## The Rules

1. **Choose a real problem** - Something you or others actually experience
2. **Keep it simple** - MVP only. One core feature done well.
3. **Actually ship** - Published to the internet where anyone can find it
4. **Tell someone** - Share with at least 3 people

## The Timeline (Simulated)

**Hour 0-4: Ideation & Planning**
- Pick your problem
- Define your one-page spec
- Create your prompt

**Hour 4-12: Building**
- Core functionality working
- Iterate until it actually works

**Hour 12-24: Polish**
- Design cleanup
- Test on mobile
- Fix obvious issues

**Hour 24-36: Marketing**
- Create landing page or entry point
- Write launch post/description
- Create one visual asset

**Hour 36-48: Launch**
- Deploy publicly
- Share with real people
- Collect feedback

## This Is Real

This challenge simulates what real founders do. Except they do it without your AI superpowers. You have an unfair advantage—use it.', 
'all', 90, 
'[{"question": "What is the goal of the Ship Challenge?", "options": ["Write the longest code", "Build and publicly launch a complete product", "Learn more theory", "Just design mockups"], "correct": 1}]', 
false),

-- Sprint 6.2: Phase 1 (Explorer)
('1987925c-1791-40b4-9d9c-10ed1391cfc1', 2, '🎮 Phase 1: Pick Your Adventure!', 
'# Time to Pick What You''ll Build!

This is the fun part—choosing your idea. Pick something YOU actually care about!

## Idea Starters

Think about problems in your life:
- 🎮 **Gaming** - Is there a tool that would help you or your friends with games?
- 📚 **School** - What annoys you about homework, studying, or projects?
- 🐕 **Pets** - Do you have a pet that needs something tracked?
- 👨‍👩‍👧‍👦 **Family** - Chores? Planning? Family game nights?
- 🎨 **Hobbies** - What do you love doing? Could an app make it better?

## Pick ONE From These or Create Your Own

**Option A: Pet Care Tracker** 🐕
Track feeding times, walks, and vet visits for your pet

**Option B: Chore Trading App** 🏠
Trade chores with siblings fairly

**Option C: Game Night Picker** 🎲
Randomly pick games and keep score for family game nights

**Option D: Reading Streak Tracker** 📖
Track books you''re reading and maintain your reading streak

**Option E: Your Own Idea!** 💡
What problem do YOU want to solve?

## Your One-Page Spec

Fill this out:

```
My App: ____________________

Problem it solves: ___________

Who it helps: ________________

The ONE main thing it does: _______________

It will be cool because: ________________
```

## Ready?

Once you have your spec, you''re ready to build! Next sprint, we actually create it.', 
'explorer', 90, 
'[{"question": "Why should you pick a problem you actually care about?", "options": ["It does not matter what you pick", "You will be more motivated and understand the problem better", "Adults told you to", "AI works better with personal problems"], "correct": 1}]', 
false),

-- Sprint 6.2: Phase 1 (Builder)
('1987925c-1791-40b4-9d9c-10ed1391cfc1', 2, 'Phase 1: Define Your Problem', 
'# Choosing Your Battle

The best products solve real problems. Let''s find yours.

## The Problem Audit

Spend 5 minutes thinking about frustrations:
- What do you wish existed?
- What takes too long?
- What''s confusing or badly designed?
- What do your friends complain about?

## Promising Problem Categories

**Productivity/Organization**
- Group project coordination
- Study schedule optimization
- Note organization

**School Life**
- Club management
- Event planning
- Tutoring matching

**Social/Community**
- Splitting bills fairly
- Planning hangouts
- Shared playlists/recommendations

**Personal Growth**
- Habit tracking
- Skill learning
- Goal setting

## The Specificity Test

❌ Too broad: "Help people be productive"
✅ Specific: "Help students track assignments across multiple classes with deadlines and priority levels"

## Your One-Page Spec

```
Problem: [Specific pain point]
Target User: [Who exactly?]
Core Feature: [The ONE thing it must do]
Success = [How do you know it works?]
Skip for MVP: [What you''re NOT building]
```

## Example Spec

```
Problem: When doing group projects, no one knows who is doing what
Target User: High school students in group projects
Core Feature: Shared task list where members claim tasks
Success = A real group uses it for one project
Skip for MVP: Chat, file sharing, grades integration
```

Ready to build? Let''s go!', 
'builder', 90, 
'[{"question": "What makes a good MVP problem?", "options": ["As broad as possible", "Very specific and focused on one pain point", "Something no one has ever thought of", "The most complex problem you can find"], "correct": 1}]', 
false),

-- Sprint 6.2: Phase 1 (Founder)
('1987925c-1791-40b4-9d9c-10ed1391cfc1', 2, 'Phase 1: Market-Validated Problem Selection', 
'# Thinking Like a Real Founder

Real startups don''t guess—they validate. Let''s apply that thinking.

## The Founder''s Problem Framework

**1. Problem Frequency**
- Does this happen daily? Weekly? Yearly?
- Higher frequency = more valuable solution

**2. Problem Intensity**
- Mild annoyance or genuine pain?
- Would someone PAY to solve this?

**3. Existing Solutions**
- What do people use now? (Competitors)
- Why don''t current solutions work?

**4. Your Advantage**
- Why are YOU the one to build this?
- Do you deeply understand the user?

## Quick Validation Techniques

**The Mom Test:**
Ask about the problem, not your solution.
- ❌ "Would you use an app that does X?"
- ✅ "Tell me about the last time [problem] happened. What did you do?"

**The Twitter/Reddit Test:**
Search for your problem. Are people complaining about it?

**The Competitor Gap:**
Look at 1-star reviews of existing solutions. What''s missing?

## Your Founder''s Spec

```
Problem: _______________
Frequency: Daily / Weekly / Monthly
Intensity (1-10): ___
Current alternatives: _______________
Why they fail: _______________
My unfair advantage: _______________

Target user: _______________
Core feature: _______________
Key metric for success: _______________
Future monetization potential: _______________
```

## The Litmus Test

Could you get 10 people to use this in the next week? If no, make it simpler or more specific until the answer is yes.

**Founders ship. Let''s build.**', 
'founder', 90, 
'[{"question": "What is The Mom Test about?", "options": ["Asking your mom for money", "Asking about the problem, not your solution, to get honest feedback", "Testing if your mom can use the app", "A memory test"], "correct": 1}]', 
false),

-- Sprint 6.3: Phase 2 - Build It
('1987925c-1791-40b4-9d9c-10ed1391cfc1', 3, 'Phase 2: Build It', 
'# Time to Build

You have your spec. Now let''s turn it into reality.

## The Building Prompt Template

Use this structure for your main build prompt:

```
Build a [type of app] called [name].

Problem it solves: [one sentence]

Core features:
1. [Must have feature]
2. [Must have feature]  
3. [Must have feature]

User flow:
- User arrives at the app
- User can [action 1]
- User can [action 2]
- Data is [saved/shown/etc.]

Design: [Your style preference]

Include: User authentication so each person has their own [data]
```

## Building Tips

**Start with ONE feature**
Get the core working before adding anything else. You can always add more.

**Talk to Base44 like a collaborator**
- "Can you also add..."
- "Make this part simpler..."
- "I don''t like how X looks, try..."

**Test as you go**
Click through everything. Does it work? Is it confusing?

## When You Get Stuck

1. **Describe the problem:** "When I click X, Y happens instead of Z"
2. **Ask for help:** "Why isn''t this working? Here''s what I expected..."
3. **Start simple:** "Let''s simplify this feature. Just do the basic version."

## The MVP Mindset

Remember: Done is better than perfect.

Your goal isn''t to build the best version of this app ever. Your goal is to build a WORKING version that someone can actually use.

**Ship it. Then improve it.**', 
'all', 90, 
'[{"question": "What is the MVP mindset?", "options": ["Make it perfect before showing anyone", "Done is better than perfect - ship a working version first", "Add as many features as possible", "Never launch until it is complete"], "correct": 1}]', 
false),

-- Sprint 6.4: Phase 3 - Ship It
('1987925c-1791-40b4-9d9c-10ed1391cfc1', 4, 'Phase 3: Ship It', 
'# Shipping Is the Goal

The difference between a dreamer and a builder? Builders ship.

## Deploy Your App

In Base44:
1. Click the "Deploy" button
2. Get your public URL
3. Test it one more time from the live link

**Your app is now on the internet.** Anyone with the link can use it.

## Create Your Launch Post

Write a simple announcement. Use this template:

> "I just built [app name]!
>
> It helps [who] to [do what].
>
> I built it in [timeframe] using AI tools.
>
> Check it out: [your URL]
>
> Would love feedback! What should I add next?"

## Share With Real People

**Minimum: 3 people**

Options:
- Friends or family (show them in person)
- Classmates who have the problem you solved
- Online communities related to your topic
- Social media

## Collect Feedback

Ask these questions:
1. Does it make sense? Were you confused about anything?
2. What''s the best part?
3. What''s missing or annoying?
4. Would you actually use this? Why or why not?

## You Did It! 🎉

**What you just accomplished:**
- ✅ Identified a real problem
- ✅ Built a working solution
- ✅ Deployed it publicly
- ✅ Shared it with real people
- ✅ Collected feedback

This is what founders do. And you just did it.

**You''re NEXT_ CERTIFIED. You know how to build what''s next.**', 
'all', 90, 
'[{"question": "Why is sharing with real people important?", "options": ["It is not important", "To get real feedback and learn what to improve", "To show off", "Because AI told you to"], "correct": 1}]', 
false);