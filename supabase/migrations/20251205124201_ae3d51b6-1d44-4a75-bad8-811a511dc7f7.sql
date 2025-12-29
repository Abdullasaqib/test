-- Delete all existing missions
DELETE FROM public.missions;

-- Insert 60 new AI-First curriculum missions for 'teen' track
-- PHASE 1: DISCOVERY (Weeks 1-2)

-- Week 1: Welcome to AI Building
INSERT INTO public.missions (track, week, day, day_number, phase, title, subtitle, micro_content, lab_prompt, artifact_type, estimated_minutes, video_url) VALUES
('teen', 1, 1, 1, 1, 'Welcome to AI Building', 'Meet your AI co-founder', 
'Welcome to the future of building! In this program, you won''t just learn about entrepreneurship—you''ll BUILD with AI from Day 1. Meet your AI Coach, your 24/7 co-founder who can brainstorm, research, write, and help you build anything. Today you''ll have your first conversation and discover what''s possible when humans and AI work together.',
'Open AI Coach and introduce yourself! Tell the AI: 1) Your name and age, 2) One problem you''ve noticed in your life, 3) One thing you''re excited to build. Then ask it: "What kind of businesses could I build to solve this problem?" Write down your favorite 3 ideas.',
'reflection', 20, NULL),

('teen', 1, 2, 2, 1, 'Set Up Your Builder Account', 'Create your Base44 account and explore', 
'Today you get access to Base44—the AI tool that lets you build real apps just by describing what you want. No coding required! This is called "Vibe Coding"—you describe the vibe, and AI builds it. By the end of today, you''ll have your own account and will have explored what''s possible.',
'Create your Base44 account at base44.com. Explore the interface for 10 minutes. Then try building something simple: ask Base44 to create a "simple to-do list app with a fun design." Screenshot your first creation and reflect: What surprised you about how easy (or hard) this was?',
'reflection', 25, NULL),

('teen', 1, 3, 3, 1, 'AI Problem Brainstorm', 'Use AI to generate 50 problem ideas', 
'Great entrepreneurs don''t just solve problems—they find the RIGHT problems. Today you''ll use AI to brainstorm at superhuman speed. The key is learning to prompt well. Good prompts = better ideas. You''ll generate 50 problems in categories like school, home, hobbies, health, and environment.',
'Open AI Coach and use this prompt: "Generate 50 problems that teenagers face, organized by category: School (10), Home (10), Social (10), Health (10), Environment (10). Make them specific and real, not generic." Review all 50. Circle your top 10. Star your top 3. Write why these 3 matter to YOU.',
'problem_card', 30, NULL),

('teen', 1, 4, 4, 1, 'AI Problem Analyzer', 'AI helps score and rank your problems', 
'Not all problems are worth solving. The best startup ideas solve problems that are: Frequent (happens often), Painful (really bothers people), and Solvable (you can actually fix it). Today AI will help you analyze and rank your problems using these criteria.',
'Take your top 3 problems from yesterday. Ask AI Coach: "Analyze these 3 problems and score each from 1-10 on: Frequency (how often does this happen?), Pain level (how much does it bother people?), Solvability (how hard would it be to fix?). Give me a total score and recommend which I should pursue." Create a simple ranking document.',
'problem_card', 25, NULL),

('teen', 1, 5, 5, 1, 'Your First AI Document', 'Generate a problem report with AI', 
'Time to make it official! Today you''ll create your first AI-generated business document: a Problem Report. This is a 1-page document that clearly explains the problem you want to solve. You''ll use AI to help write it, then make it your own.',
'Use AI Coach with this prompt: "Create a 1-page Problem Report for this problem: [your chosen problem]. Include: Problem Statement (2 sentences), Who experiences this (target customer), How often it happens, Current solutions and why they fail, Why this matters. Make it professional but easy to read." Edit the output to add your personal touches and save as your first artifact.',
'problem_card', 30, NULL),

-- Week 2: AI Customer Discovery
('teen', 2, 1, 6, 1, 'AI Persona Generator', 'AI creates detailed customer personas', 
'Who will buy your product? You need to know your customer better than they know themselves. Today AI will help you create detailed "personas"—fictional characters that represent your ideal customers. Great personas include demographics, behaviors, frustrations, and goals.',
'Ask AI Coach: "Create 3 detailed customer personas for someone who experiences [your problem]. For each persona include: Name and age, Daily routine, Where they spend time online, Their biggest frustrations with this problem, What they''ve tried before, What would make them pay for a solution. Make them feel like real people." Pick your favorite persona and give them a real photo (find one online).',
'customer_persona', 30, NULL),

('teen', 2, 2, 7, 1, 'AI Interview Script Writer', 'AI generates interview questions', 
'The best founders talk to real customers. But what do you ask? Today AI will help you create the perfect interview script. Great questions are open-ended (not yes/no), focus on past behavior (not future predictions), and dig into emotions.',
'Ask AI Coach: "Create a 10-question customer interview script for understanding [your problem]. Include: 2 warm-up questions, 5 questions about their experience with this problem, 2 questions about solutions they''ve tried, 1 closing question. Make questions open-ended and avoid leading questions." Practice reading the script out loud. Does it sound natural?',
'interview_notes', 25, NULL),

('teen', 2, 3, 8, 1, 'Human Interviews + AI Notes', 'Talk to real people, AI summarizes', 
'Time to get out of the building! Today you''ll interview at least 3 real people about your problem. This is scary but essential. Remember: you''re not selling anything, you''re learning. Use voice notes to record (with permission), then use AI to summarize.',
'Interview 3 people (family, friends, neighbors) using your script. Record voice notes. Then use AI Coach: "Summarize these interview notes and identify: Common themes across all interviews, Surprising insights, Quotes that stood out, How painful this problem really is (1-10)." Upload or paste your notes for AI to analyze.',
'interview_notes', 45, NULL),

('teen', 2, 4, 9, 1, 'AI Insight Finder', 'Upload notes and AI finds patterns', 
'You have raw data from your interviews. Now let''s turn it into gold! AI excels at finding patterns humans miss. Today you''ll feed all your research to AI and ask it to find the hidden insights that will shape your product.',
'Compile all your interview notes into one document. Ask AI Coach: "Analyze these customer interviews and give me: The #1 insight that surprised you, The most common complaint (exact words they used), What customers are currently doing to solve this, What would make customers switch to a new solution, A recommended customer segment to focus on." Create an Insights Summary document.',
'interview_notes', 30, NULL),

('teen', 2, 5, 10, 1, 'AI Journey Mapper', 'AI visualizes the customer journey', 
'Every customer goes through a journey: they realize they have a problem, search for solutions, try things, get frustrated, and eventually find something that works (or give up). Today AI will help you map this journey so you can find the best moment to help.',
'Ask AI Coach: "Create a customer journey map for someone experiencing [your problem]. Include 6 stages: Trigger (when they realize the problem), Search (how they look for solutions), Evaluation (how they compare options), Decision (what makes them choose), Usage (their experience), Outcome (success or failure). For each stage, list their actions, thoughts, and emotions." Then use Base44 to create a simple visual of this journey.',
'customer_persona', 35, NULL),

-- PHASE 2: VALIDATION (Weeks 3-4)

-- Week 3: AI Market Research
('teen', 3, 1, 11, 2, 'AI Competitor Spy', 'AI researches and summarizes competitors', 
'Before you build, you need to know what already exists. Your competitors have been solving this problem for years—learn from them! Today AI will help you research competitors and understand what they do well and where they fail.',
'Ask AI Coach: "Research competitors for [your problem/solution]. Find 5 existing solutions and for each tell me: Company name and what they do, Price and business model, What customers love about them (from reviews), What customers complain about, Key feature that makes them unique, Gap or opportunity they''re missing." Create a Competitor Analysis document.',
'business_model', 35, NULL),

('teen', 3, 2, 12, 2, 'AI UVP Generator', 'AI creates 10 unique value propositions', 
'Your UVP (Unique Value Proposition) is the ONE thing that makes you different and better. It''s the reason customers will choose YOU over everyone else. Today AI will help you brainstorm and refine your UVP.',
'Ask AI Coach: "Based on my problem [X] and these competitor weaknesses [paste from yesterday], generate 10 unique value propositions. Each should complete this sentence: Unlike [competitor], we [unique benefit] for [target customer]. Make them specific, measurable, and exciting." Pick your top 3 and test them on 2 people. Which one makes them say "Tell me more!"?',
'value_proposition', 30, NULL),

('teen', 3, 3, 13, 2, 'AI Market Researcher', 'AI estimates TAM/SAM/SOM', 
'Investors want to know: how big is this opportunity? Today you''ll learn TAM (Total Addressable Market), SAM (Serviceable Addressable Market), and SOM (Serviceable Obtainable Market). AI will help you estimate real numbers.',
'Ask AI Coach: "Help me calculate market size for [your solution]. Estimate: TAM (everyone who could possibly use this), SAM (the segment I can realistically serve), SOM (what I can capture in year 1). Use real data where possible and explain your assumptions. Present in both number of customers and dollar value." Create a Market Size slide.',
'business_model', 35, NULL),

('teen', 3, 4, 14, 2, 'AI Survey Builder', 'Build a survey form with AI', 
'Interviews are deep, surveys are wide. Today you''ll create a survey to validate your idea with more people. AI will help you write questions that get honest answers, and Base44 will help you build a real form.',
'Ask AI Coach: "Create a 10-question survey to validate this product idea: [your solution]. Include: 2 demographic questions, 3 questions about their problem experience, 3 questions about your proposed solution, 2 questions about pricing/willingness to pay. Make it take under 3 minutes to complete." Then build the survey in Base44 or Google Forms. Send to 10+ people!',
'interview_notes', 40, NULL),

('teen', 3, 5, 15, 2, 'AI Decision Report', 'AI summarizes all validation data', 
'Decision time! You''ve done customer interviews, competitor research, market sizing, and surveys. Now AI will help you synthesize EVERYTHING into a clear recommendation: pivot or persevere?',
'Compile all your research. Ask AI Coach: "Based on all this validation data, give me a Go/No-Go recommendation for this startup idea. Structure as: Executive Summary (2 sentences), Evidence FOR (3 bullets), Evidence AGAINST (3 bullets), Key Risks, Recommended Next Steps, Final Verdict with confidence level (1-10)." If it''s a GO, celebrate! If not, use insights to pivot your idea.',
'business_model', 30, NULL),

-- Week 4: AI Solution Design
('teen', 4, 1, 16, 2, 'AI Idea Machine', 'Generate 100 solution ideas with AI', 
'You''ve validated the problem. Now let''s solve it! Today you''ll use AI to brainstorm 100 possible solutions—from simple to crazy. The best ideas often come from unexpected combinations.',
'Ask AI Coach: "Generate 100 different ways to solve [your validated problem]. Organize into categories: Simple (can build this week), Medium (can build this month), Ambitious (would need funding), Crazy (sounds impossible but might work). Don''t filter—include wild ideas!" Review all 100. Pick your top 5 and explain why each could work.',
'solution_sketch', 35, NULL),

('teen', 4, 2, 17, 2, 'AI Flowchart Builder', 'AI creates user flow in Base44', 
'Before you build, you need to plan HOW your product works. A user flow shows every step a customer takes from first hearing about you to becoming a happy user. Today AI helps you map the complete journey.',
'Ask AI Coach: "Create a detailed user flow for [your solution]. Include: Discovery (how they find you), Signup (how they join), First Use (their first experience), Core Action (the main thing they do), Return (why they come back), Tell Friends (how they share). List each screen or step they''ll see." Then use Base44 to create a visual flowchart.',
'solution_sketch', 35, NULL),

('teen', 4, 3, 18, 2, 'AI Wireframe Generator', 'AI generates app wireframes', 
'Wireframes are simple sketches of your app screens—no colors, no details, just boxes and text showing what goes where. Today AI will describe wireframes and you''ll bring them to life in Base44.',
'Ask AI Coach: "Describe wireframes for the 5 most important screens of [your solution]: 1) Landing/Home page, 2) Signup page, 3) Main dashboard, 4) Core feature screen, 5) Settings/Profile. For each, describe: Layout, Key elements, Main call-to-action, What makes it simple to use." Use Base44 to build rough versions of each screen.',
'solution_sketch', 40, NULL),

('teen', 4, 4, 19, 2, 'AI Feature Ranker', 'AI helps prioritize features', 
'You probably have 50 feature ideas. You can only build 5 to start. How do you choose? Today AI helps you prioritize using the ICE framework: Impact, Confidence, and Ease. This is how real startups decide what to build first.',
'List all your feature ideas. Ask AI Coach: "Score each feature from 1-10 on: Impact (how much will users love this?), Confidence (how sure are we this will work?), Ease (how quickly can we build this?). Calculate ICE score (Impact × Confidence × Ease). Rank features by score and recommend my MVP feature set (top 5 features)." Create your MVP Feature List.',
'solution_sketch', 30, NULL),

('teen', 4, 5, 20, 2, 'AI Pitch Writer', 'AI drafts your solution pitch', 
'End of Phase 2! Time to pitch your validated solution. This is a 60-second pitch that explains your problem, solution, and why you''ll win. AI will draft it, you''ll perfect it.',
'Ask AI Coach: "Write a 60-second pitch script for my startup: Problem: [X], Solution: [Y], Target Customer: [Z], Unique Value: [W], Business Model: [how we make money]. Structure as: Hook (10 sec), Problem (15 sec), Solution (20 sec), Why Us (10 sec), Ask (5 sec). Make it exciting but authentic for a teenager to deliver." Practice it 5 times. Record yourself. Get feedback from 2 people.',
'pitch_video', 35, NULL),

-- PHASE 3: BUILDING (Weeks 5-7) - Vibe Coding

-- Week 5: MVP Builder
('teen', 5, 1, 21, 3, 'Vibe Coding Fundamentals', 'Learn to prompt like a pro', 
'Welcome to Vibe Coding—the skill that will define your generation! Instead of learning syntax and debugging code, you''ll learn to clearly describe what you want and let AI build it. Today you learn the fundamentals of great prompts.',
'Study these 5 prompt principles: 1) Be specific (not "make an app" but "make a task tracker for students"), 2) Describe the user (who uses this?), 3) List features clearly, 4) Mention the vibe/style (playful, professional, minimal), 5) Iterate (ask for changes). Build 3 mini-apps in Base44, each using these principles better than the last.',
'prototype', 35, NULL),

('teen', 5, 2, 22, 3, 'Build Your MVP - Part 1', 'Core feature only, perfect it', 
'Today you build the CORE of your MVP—the one feature that solves the main problem. Resist the urge to add more. The best MVPs do ONE thing perfectly. Remember: you can always add more later.',
'Use Base44 with this prompt structure: "Build an app that solves [specific problem] for [target customer]. The ONLY feature is [core feature]. When a user opens it, they should be able to [main action] in under 30 seconds. Style: [your vibe]. Include: [2-3 essential elements only]." Build and test. Does it solve the problem?',
'mvp_prototype', 45, NULL),

('teen', 5, 3, 23, 3, 'Build Your MVP - Part 2', 'Add 2 supporting features', 
'Your core feature works! Today you add exactly 2 supporting features that make the experience complete. Think: what would make users say "Oh nice!" without adding complexity?',
'Look at your MVP. Ask AI Coach: "Given my core feature [X], suggest 5 supporting features that would enhance the experience without adding complexity. Rank by: User value (how much will they love it), Build time (how quick to add), Necessity (is it needed for launch)." Pick top 2. Add them to your app in Base44. Test the complete flow.',
'mvp_prototype', 40, NULL),

('teen', 5, 4, 24, 3, 'Design Polish Day', 'Make it beautiful with AI', 
'Functionality is done. Now let''s make it BEAUTIFUL. Users judge your product in 3 seconds. Today you''ll use AI to improve colors, fonts, spacing, and overall visual appeal.',
'Ask AI Coach: "Review my app design and suggest improvements for: Color scheme (give me specific hex codes), Font pairing (which fonts work together), Spacing and layout (what feels cramped?), Visual hierarchy (what should stand out?), Micro-interactions (small delightful details)." Implement the changes in Base44. Before/after comparison!',
'mvp_prototype', 35, NULL),

('teen', 5, 5, 25, 3, 'MVP Demo Day', 'Present your MVP to get feedback', 
'Your MVP is ready! Today you''ll demo it to 5 real people and collect feedback. This is terrifying and essential. Real feedback from real users is worth more than 100 hours of building in isolation.',
'Demo your MVP to 5 people (friends, family, potential users). For each person, observe: Do they understand what it does in 10 seconds? Can they complete the main task without help? What do they try to click that doesn''t exist? What do they say out loud? After all 5 demos, ask AI Coach to summarize patterns and prioritize improvements.',
'user_feedback', 40, NULL),

-- Week 6: Launch Pad
('teen', 6, 1, 26, 3, 'AI Landing Page Generator', 'Create your marketing page', 
'Every startup needs a landing page—a single page that explains what you do and convinces people to sign up. Today you''ll use our AI Landing Page Generator to create a professional page in minutes.',
'Use the AI Landing Page Generator with this info: Headline (your hook), Problem (what you solve), Solution (what you built), Features (top 3), Social Proof (even if fake for now), CTA (what should they do?). Generate 3 versions. Pick your favorite. Customize it further with AI refinement chat.',
'landing_page', 40, NULL),

('teen', 6, 2, 27, 3, 'Copywriting with AI', 'Words that sell', 
'Great copy converts visitors into users. Today you''ll learn copywriting formulas and use AI to write compelling headlines, benefit statements, and calls-to-action. The right words can 10x your signups!',
'Learn these formulas: PAS (Problem-Agitate-Solve), AIDA (Attention-Interest-Desire-Action), BAB (Before-After-Bridge). Ask AI Coach to rewrite your landing page copy using each formula. A/B test different headlines by asking 10 people which makes them want to click. Update your landing page with winning copy.',
'landing_page', 35, NULL),

('teen', 6, 3, 28, 3, 'Connect Your App', 'Link landing page to your MVP', 
'Your landing page promises value. Your app delivers it. Today you connect them! Visitors who sign up should smoothly enter your app experience. We''ll also add basic analytics so you know what''s happening.',
'Add a prominent CTA button on your landing page that links to your Base44 app. Create a simple "Get Started" flow: Landing page → Sign up form → Welcome screen in app. Ask AI Coach: "How do I track when someone visits my landing page and signs up for my app? What free analytics tools should I use?" Implement basic tracking.',
'app_link', 35, NULL),

('teen', 6, 4, 29, 3, 'Mobile Optimization', 'Make it work on phones', 
'Most of your users will find you on mobile. If your landing page and app don''t work beautifully on phones, you''ll lose them instantly. Today is all about mobile-first optimization.',
'Test your landing page on 3 different phones. Note: Does text size work? Do buttons fit thumbs? Does it load fast? Ask AI Coach: "Review my landing page for mobile optimization. Check: Touch targets (big enough?), Text readability, Image sizes, Load time, Scroll behavior. Give me specific fixes." Make all changes. Test again.',
'landing_page', 35, NULL),

('teen', 6, 5, 30, 3, 'Soft Launch', 'Release to your first 10 users', 
'The big day! Today you''ll share your landing page with 10 real potential users and ask them to sign up and try your app. This is your "soft launch"—small scale, lots of learning.',
'Share your landing page link with 10 people who fit your target customer profile. Track: How many click through? How many sign up? How many complete the main action in your app? Collect feedback from at least 3 users. Ask AI Coach to analyze the results and suggest 3 improvements for next week.',
'user_feedback', 40, NULL),

-- Week 7: Vibe Coder Pro
('teen', 7, 1, 31, 3, 'Advanced Prompting', 'Level up your vibe coding skills', 
'You''ve learned the basics. Now let''s go PRO. Advanced prompting techniques include: chaining prompts, using examples, specifying constraints, and debugging with AI. These skills separate hobbyists from builders.',
'Complete these 3 challenges: 1) Chain Challenge: Build a feature using 5 connected prompts, each building on the last. 2) Example Challenge: Give AI an example of what you want, then ask for variations. 3) Debug Challenge: When something doesn''t work, describe the problem and ask AI to fix it. Document your best prompting techniques.',
'prototype', 40, NULL),

('teen', 7, 2, 32, 3, 'Build a Complex Feature', 'Push your limits', 
'Time to build something you didn''t think was possible. Today you''ll add a "stretch feature" to your app—something that seems advanced but is achievable with good prompting and persistence.',
'Pick a complex feature: User accounts with saved data, Real-time updates, AI-powered recommendations, Payment integration, Social sharing, or Data visualization. Ask AI Coach: "How would I build [feature] in Base44? Break it into small steps. What prompts should I use for each step?" Build it step-by-step. Don''t give up!',
'mvp_prototype', 50, NULL),

('teen', 7, 3, 33, 3, 'Multi-Tool Building', 'Combine AI tools for power', 
'Pro builders don''t use just one tool. Today you''ll combine Base44 with other AI tools to create something neither could do alone. This is how real products get built—by connecting the right tools.',
'Explore combining: Base44 + AI Coach (use Coach to plan, Base44 to build), Base44 + Image AI (generate custom images for your app), Base44 + Automation tools (connect to email, SMS, etc). Build one integration that makes your product more powerful. Document how you connected the tools.',
'app_link', 45, NULL),

('teen', 7, 4, 34, 3, 'Performance and Polish', 'Make it fast and flawless', 
'Users expect apps to be FAST and FLAWLESS. Today you''ll optimize performance, fix bugs, and polish every detail. This is the difference between a project and a product.',
'Test your app on slow internet (use browser throttling). Fix anything that takes over 3 seconds. Ask AI Coach: "Do a UX audit of my app. Check: Loading times, Error messages, Edge cases (what if user does something unexpected?), Accessibility (can everyone use it?), Polish (small details that feel professional)." Fix the top 5 issues.',
'mvp_prototype', 40, NULL),

('teen', 7, 5, 35, 3, 'Vibe Coder Certification', 'Prove your skills', 
'Congratulations—you''ve completed Vibe Coding mastery! Today you''ll document everything you built and create your Vibe Coder portfolio. This proves to future employers, colleges, and investors that you can BUILD with AI.',
'Create your Vibe Coder Portfolio: 1) Screenshot of your MVP with features listed, 2) Landing page link, 3) 3 examples of complex prompts you wrote, 4) Before/after of a design you improved, 5) Metrics (users, signups, feedback scores). Share in our community. You''ve earned your Vibe Coder badge! 🎓',
'app_link', 35, NULL),

-- PHASE 4: GROWTH (Weeks 8-10)

-- Week 8: Test Lab
('teen', 8, 1, 36, 4, 'User Testing Protocol', 'Watch real users struggle and succeed', 
'Building in isolation is dangerous. Today you''ll run structured user tests where you watch people use your product without helping them. This reveals problems you can''t see because you''re too close.',
'Recruit 5 test users. For each: 1) Give them a task ("Sign up and complete [main action]"), 2) Stay silent—no hints!, 3) Ask them to think out loud, 4) Note every confusion, wrong click, or hesitation, 5) End with 3 questions: What was confusing? What was delightful? Would you use this again? Ask AI Coach to summarize findings into action items.',
'user_feedback', 45, NULL),

('teen', 8, 2, 37, 4, 'AI Feedback Analyzer', 'Turn feedback into features', 
'You have a pile of feedback. Now what? Today AI helps you categorize, prioritize, and turn feedback into a clear improvement roadmap. Not all feedback is equal—you''ll learn to identify what matters.',
'Compile all user feedback. Ask AI Coach: "Analyze this user feedback and create: 1) Categories (UX issues, Feature requests, Bugs, Praise), 2) Frequency count (how many people mentioned each issue), 3) Severity ranking (blocking, annoying, minor), 4) Recommended fixes in priority order, 5) What to ignore (edge cases, personal preferences)." Update your product roadmap.',
'user_feedback', 35, NULL),

('teen', 8, 3, 38, 4, 'Rapid Iteration Day', 'Fix the top 5 issues', 
'Speed matters in startups. Today you''ll fix your top 5 user issues in one session. This is called "rapid iteration"—making quick improvements based on real feedback. Ship fast, learn fast.',
'From yesterday''s prioritized list, take the top 5 issues. Set a timer: 30 minutes per fix. Use AI Coach to help problem-solve: "Users are confused by [X]. How should I redesign this to be more intuitive?" Build the fix in Base44. After all 5 fixes, do a quick re-test with one user. Did it work?',
'mvp_prototype', 45, NULL),

('teen', 8, 4, 39, 4, 'Metrics That Matter', 'Track what counts', 
'What gets measured gets improved. Today you''ll set up simple analytics to track the metrics that matter: visitors, signups, activation (completing main action), retention (coming back), and referral (sharing).',
'Ask AI Coach: "What are the 5 most important metrics for a [your type of app]? How do I track each one? What free tools can I use?" Set up tracking for at least 3 metrics. Create a simple dashboard (spreadsheet is fine!) where you''ll update numbers weekly. What''s your baseline for each metric?',
'business_model', 35, NULL),

('teen', 8, 5, 40, 4, 'Version 2.0 Planning', 'What''s next for your product?', 
'Based on everything you''ve learned, it''s time to plan Version 2.0. This is your product roadmap—the features and improvements you''ll build next. AI helps you think big while staying focused.',
'Ask AI Coach: "Based on my user feedback and metrics, help me create a V2.0 roadmap. Include: Quick Wins (can ship this week), Medium Features (2-4 weeks), Big Bets (need more resources), Experiments (things to test). For each item, estimate impact (1-10) and effort (days). Recommend my next 4 weeks of work." Create your V2.0 Roadmap document.',
'solution_sketch', 35, NULL),

-- Week 9: Growth Hacker
('teen', 9, 1, 41, 4, 'AI Marketing Strategist', 'Create your growth playbook', 
'Time to get users! Marketing as a teenager is different—you have limited budget but unlimited creativity. Today AI helps you create a growth strategy that plays to your strengths: authenticity, social native, and hustle.',
'Ask AI Coach: "Create a growth marketing strategy for a teen-built startup. My product: [X], Target user: [Y], Budget: $0-50. Give me: 5 free marketing channels ranked by potential, 3 creative guerrilla tactics, 1 viral loop idea (how users bring more users), Content themes that would resonate, How to leverage being a young founder." Create your Growth Playbook.',
'marketing_plan', 35, NULL),

('teen', 9, 2, 42, 4, 'AI Content Creator', 'Generate posts that pop', 
'Content is king, but creating it takes forever—unless you use AI. Today you''ll generate a week''s worth of social content: posts, hooks, captions, and stories. AI writes, you add personality.',
'Ask AI Coach: "Create 7 days of social media content for [your product]. For each day give me: TikTok/Reel hook (first 3 seconds), Instagram caption, Twitter/X post, Story idea. Make it authentic to a teenage founder—not corporate, not cringe. Include: Behind-the-scenes, User stories, Tips, Fun facts, Memes, Calls-to-action." Edit to add your voice. Schedule posts for this week.',
'marketing_plan', 40, NULL),

('teen', 9, 3, 43, 4, 'First Paid Experiment', 'Test a $20 ad campaign', 
'Most startup advice says "don''t pay for users." But controlled experiments teach you tons! Today you''ll run a tiny paid experiment—$10-20 on one platform—and measure exactly what happens.',
'Pick one platform (Instagram, TikTok, or Google). Set up a $10-20 ad promoting your landing page. Ask AI Coach: "Help me create an ad for [platform]. Give me: Headline options, Image/video concept, Target audience settings, What to track." Run for 2-3 days. Measure: Cost per click, Signups, Cost per signup. Was it worth it? Document learnings.',
'marketing_plan', 40, NULL),

('teen', 9, 4, 44, 4, 'Community Building 101', 'Find your first fans', 
'The best startups have passionate communities, not just users. Today you''ll identify where your people hang out online and how to genuinely contribute (not spam) to become a known name.',
'Ask AI Coach: "Where do [your target users] hang out online? Find: 5 Reddit communities, 5 Discord servers, 5 Facebook groups, 5 other forums or platforms. For each, tell me: How active is it? What type of content gets engagement? How could I provide value without being salesy?" Join 3 communities. Make 5 helpful posts/comments this week. No selling—just helping!',
'marketing_plan', 35, NULL),

('teen', 9, 5, 45, 4, 'Growth Metrics Review', 'Is it working?', 
'Week 9 complete! Time to look at the data. What worked? What didn''t? Today you''ll analyze your marketing experiments and double down on winners while cutting losers.',
'Pull all your metrics from this week: Social stats, Ad performance, Landing page analytics, New signups. Ask AI Coach: "Analyze my growth experiment data. Tell me: What channel performed best? What content got most engagement? What was my CAC (cost to acquire customer)? Where should I invest more time/money? What should I stop doing?" Create your Growth Report.',
'business_model', 35, NULL),

-- Week 10: Launch Day!
('teen', 10, 1, 46, 4, 'Pre-Launch Checklist', 'Everything ready for go-time', 
'This is it—launch week! Before you tell the world, let''s make sure everything is perfect. Today you''ll go through a comprehensive pre-launch checklist. No broken links, no bugs, no missed opportunities.',
'Use AI Coach to generate: "Pre-launch checklist for [my product]. Check: Product (all features work, mobile-friendly, fast loading), Landing page (clear value prop, working signup, social proof), Marketing (content scheduled, email ready, launch day plan), Legal (privacy policy, terms of service), Backup plan (what if it goes viral? what if nobody comes?)." Go through every item!',
'app_link', 40, NULL),

('teen', 10, 2, 47, 4, 'Launch Story Creation', 'Craft your narrative', 
'Every great launch has a great story. Why did you build this? What''s your journey? Today you''ll craft the narrative that makes people root for you. Being a young founder IS your superpower.',
'Write your launch story. Ask AI Coach: "Help me write my founder story for launch. Include: What problem I noticed, Why I cared enough to solve it, My journey building this (including failures), What makes it special being a teen founder, My vision for the future, Call to action for launch day. Make it authentic, not polished. Under 500 words." Get feedback from 2 people. Refine.',
'pitch_video', 35, NULL),

('teen', 10, 3, 48, 4, 'Launch Day Campaign', 'Execute the big day plan', 
'LAUNCH DAY! Today you''ll execute your launch campaign. Post on all channels, email your list, ask friends to share, engage with every comment. This is intense, but you''re ready!',
'Launch day schedule: Morning - Post launch story everywhere. Midday - Share in communities (Reddit, Discord, etc.). Afternoon - Respond to every comment/message. Evening - Thank everyone who shared, post Day 1 results. Track hourly: Visitors, Signups, Shares, Comments. Ask AI Coach for real-time advice: "I''m getting [X result]. How should I adjust my approach?"',
'marketing_plan', 50, NULL),

('teen', 10, 4, 49, 4, 'Launch Day +1', 'Ride the momentum', 
'The launch buzz continues! Day 2 is about maintaining momentum. New people are discovering you. Keep engaging, keep sharing, keep learning from what''s working.',
'Review Day 1 results with AI Coach: "Here''s my launch data. What worked best? What should I do more of today? Any red flags I should address?" Tasks: Respond to every new comment, Share user testimonials (even if just one!), Post behind-the-scenes of launch day, Reach out to anyone influential who engaged, Update your landing page with Day 1 social proof.',
'marketing_plan', 35, NULL),

('teen', 10, 5, 50, 4, 'Launch Week Retro', 'What did we learn?', 
'Launch week complete! Let''s capture everything while it''s fresh. What worked? What surprised you? What would you do differently? This reflection will help you and help others.',
'Create your Launch Retrospective. Ask AI Coach: "Help me structure a launch retrospective. Include: Goals vs Results (what did I hope for vs what happened?), Biggest Wins, Biggest Surprises, What Didn''t Work, Lessons for Next Time, Updated Metrics Baseline, Next 30 Days Plan." Share your learnings with the community. You launched! 🚀',
'business_model', 35, NULL),

-- PHASE 5: PITCH (Weeks 11-12)

-- Week 11: Pitch Perfect
('teen', 11, 1, 51, 5, 'AI Pitch Deck Builder', 'Create investor-ready slides', 
'Time to pitch like a pro! Investors see thousands of pitches. Yours needs to stand out. Today you''ll use our AI Pitch Deck Generator to create a professional deck that tells your story in slides.',
'Use the Pitch Deck Generator with: Problem (compelling hook), Solution (clear and visual), Market (how big?), Product (screenshots), Business Model (how you make money), Traction (what you''ve achieved), Team (why you?), Ask (what do you need?). Generate and customize. Get feedback from AI Coach on each slide.',
'pitch_deck', 45, NULL),

('teen', 11, 2, 52, 5, 'Storytelling Mastery', 'Turn data into emotion', 
'Investors fund people and stories, not just products. Today you''ll transform your pitch from informational to emotional. You''ll learn story structures that make people FEEL your vision.',
'Learn these story frameworks: The Hero''s Journey (you are the hero), Problem-Solution-Impact, Before-After-Bridge. Ask AI Coach: "Rewrite my pitch using each framework. For each, give me: Opening hook, Emotional peak, Memorable closing. Include specific stories from my user interviews." Practice the best version out loud. Record yourself.',
'pitch_deck', 35, NULL),

('teen', 11, 3, 53, 5, 'Q&A Preparation', 'Handle the hard questions', 
'After your pitch comes Q&A—where investors try to poke holes in your plan. Today you''ll prepare for every hard question they might ask. No surprises on demo day!',
'Ask AI Coach: "Generate 20 hard questions investors might ask about my startup. Include: Market doubts, Competition concerns, Team skepticism, Financial questions, Technical challenges. For each question, give me a strong answer framework." Practice answering each question. Time yourself—answers should be 30-60 seconds. Prepare your "I don''t know, but here''s how I''d find out" responses.',
'pitch_deck', 40, NULL),

('teen', 11, 4, 54, 5, 'Pitch Practice - Round 1', 'First full run in THE TANK', 
'Your first real pitch practice! Today you''ll face THE TANK—our AI investor personas who will ask tough questions and score your pitch. This is low stakes practice for high stakes performance.',
'Go to THE TANK. Select an investor persona. Deliver your full pitch (aim for 3 minutes). Answer their follow-up questions. Review your scores across all dimensions. Ask AI Coach: "Based on my TANK scores and feedback, what are my top 3 areas to improve? Give me specific, actionable tips for each." Practice the improved version.',
'pitch_video', 40, NULL),

('teen', 11, 5, 55, 5, 'Pitch Practice - Round 2', 'Level up your performance', 
'Second round of TANK! Your goal: improve every score from yesterday. Focus on your weak areas. Investors notice improvement—showing you can learn fast is itself impressive.',
'Warm up with 5 minutes of your pitch. Go to THE TANK. Try a DIFFERENT investor persona (they ask different questions). Deliver your improved pitch. Compare scores to yesterday. Ask AI Coach: "Compare my Day 1 and Day 2 TANK results. What improved? What still needs work? Give me one thing to perfect for Demo Day." Record your best pitch for review.',
'pitch_video', 40, NULL),

-- Week 12: Demo Day!
('teen', 12, 1, 56, 5, 'Final Deck Polish', 'Perfect every pixel', 
'Demo Day is in 4 days! Today we perfect your pitch deck. Every word, every image, every transition should be intentional. AI helps you polish while keeping your authentic voice.',
'Go through your deck slide by slide with AI Coach: "Review slide [X]. Is the message clear in 5 seconds? Is the visual supporting or distracting? Is there anything unnecessary? How could this slide be more memorable?" Make refinements. Test: Can you explain your deck to a 10-year-old? To a busy investor? Both should understand instantly.',
'pitch_deck', 40, NULL),

('teen', 12, 2, 57, 5, 'Demo Video Creation', 'Show your product in action', 
'A great demo video is worth 1000 slides. Today you''ll create a 60-90 second video showing your product in action. This plays during or after your pitch and lets the product speak for itself.',
'Plan your demo video. Ask AI Coach: "Script a 60-second product demo video. Include: Opening hook (3 sec), Problem statement (10 sec), Live product demo (35 sec), Key benefit (7 sec), Call to action (5 sec). Make it feel energetic but not rushed." Record on your phone. Simple is fine! Edit out mistakes. Add captions. Practice the timing with your pitch.',
'pitch_video', 45, NULL),

('teen', 12, 3, 58, 5, 'Dress Rehearsal', 'Full pitch simulation', 
'Tomorrow is Demo Day Eve, today is dress rehearsal. You''ll deliver your complete pitch—deck, demo, Q&A—exactly as you will on Demo Day. Time it. Film it. Get it right.',
'Set up like Demo Day: Nice background, good lighting, business casual clothes. Deliver your full pitch: Introduction (30 sec), Deck (3 min), Demo video (60 sec), Q&A practice (2 min). Record the whole thing. Watch it back. Ask AI Coach to review and give final notes. Make last adjustments. Get a good night''s sleep!',
'pitch_video', 50, NULL),

('teen', 12, 4, 59, 5, 'Demo Day!', 'Pitch to the world', 
'THIS IS IT! Demo Day! You''ve built a real product, gotten real users, and now you''re pitching to real investors and parents. Take a breath. You''ve prepared for this. Go show them what you''ve built!',
'Demo Day schedule: Morning - Final prep, practice once. Event - Arrive early, set up, breathe. Pitch - Deliver with confidence, smile, be yourself! Q&A - Listen carefully, answer honestly. After - Thank everyone, collect feedback, celebrate! You did it! A real product, a real launch, a real pitch. You''re officially a founder.',
'pitch_video', 60, NULL),

('teen', 12, 5, 60, 5, 'The Next Chapter', 'Your founder journey continues', 
'Congratulations! You''ve completed the program, but your founder journey is just beginning. Today we reflect on how far you''ve come, capture your key learnings, and plan what''s next for your startup.',
'Create your Founder Portfolio: 1) Your journey timeline (idea → launch), 2) Key metrics achieved, 3) Skills developed (with evidence), 4) Pitch deck and demo video, 5) Testimonials from users, 6) What''s next (3 possible paths). Ask AI Coach: "Based on my progress and results, what are my 3 best options for continuing this startup? Be honest about what each path requires." Share your portfolio. Connect with alumni. Keep building! 🚀',
'business_model', 40, NULL);

-- Copy teen missions to junior track with same content (can customize later)
INSERT INTO public.missions (track, week, day, day_number, phase, title, subtitle, micro_content, lab_prompt, artifact_type, estimated_minutes, video_url)
SELECT 'junior', week, day, day_number, phase, title, subtitle, micro_content, lab_prompt, artifact_type, estimated_minutes, video_url
FROM public.missions WHERE track = 'teen';

-- Copy teen missions to advanced track with same content (can customize later)
INSERT INTO public.missions (track, week, day, day_number, phase, title, subtitle, micro_content, lab_prompt, artifact_type, estimated_minutes, video_url)
SELECT 'advanced', week, day, day_number, phase, title, subtitle, micro_content, lab_prompt, artifact_type, estimated_minutes, video_url
FROM public.missions WHERE track = 'teen';