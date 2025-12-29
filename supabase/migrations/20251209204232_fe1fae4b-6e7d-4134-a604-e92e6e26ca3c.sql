-- Add learning_objectives column to certification_lessons
ALTER TABLE public.certification_lessons 
ADD COLUMN IF NOT EXISTS learning_objectives TEXT[] DEFAULT '{}';

-- Update existing lessons with learning objectives
UPDATE public.certification_lessons SET learning_objectives = ARRAY[
  'Understand what AI prompts are and how they work',
  'Identify the key components of effective prompts',
  'Recognize the difference between good and weak prompts'
] WHERE title ILIKE '%introduction%' OR lesson_order = 1;

UPDATE public.certification_lessons SET learning_objectives = ARRAY[
  'Apply the CRISPE framework to structure prompts',
  'Write prompts with clear context, role, and constraints',
  'Transform vague requests into specific, actionable prompts'
] WHERE title ILIKE '%framework%' OR title ILIKE '%structure%' OR lesson_order = 2;

UPDATE public.certification_lessons SET learning_objectives = ARRAY[
  'Master iterative prompt refinement techniques',
  'Debug and improve underperforming prompts',
  'Use follow-up prompts to get better results'
] WHERE title ILIKE '%advanced%' OR title ILIKE '%refin%' OR lesson_order = 3;

UPDATE public.certification_lessons SET learning_objectives = ARRAY[
  'Apply prompting skills to real-world business scenarios',
  'Create prompts for content, analysis, and problem-solving',
  'Build a personal prompt library for future use'
] WHERE title ILIKE '%practical%' OR title ILIKE '%application%' OR lesson_order = 4;

UPDATE public.certification_lessons SET learning_objectives = ARRAY[
  'Combine multiple prompting techniques effectively',
  'Create complex multi-step prompt workflows',
  'Evaluate and optimize prompt performance'
] WHERE lesson_order = 5;

UPDATE public.certification_lessons SET learning_objectives = ARRAY[
  'Demonstrate mastery through practical assessment',
  'Apply all learned techniques in a capstone project',
  'Earn your AI Foundations Certificate'
] WHERE lesson_order = 6;

-- Populate curriculum_weeks table with 12-week content
INSERT INTO public.curriculum_weeks (week_number, program, title, description, homework_description) VALUES
(1, 'teen', 'Discovery: Finding Problems Worth Solving', 'Learn to observe the world like a founder. Identify frustrations, inefficiencies, and unmet needs in your daily life. Use AI to brainstorm and validate problem spaces.', 'Interview 3 people about their daily frustrations. Document the top 5 problems you discover using AI to analyze patterns.'),
(2, 'teen', 'Discovery: Understanding Your Users', 'Deep dive into customer empathy. Create user personas, map customer journeys, and understand the people behind the problems you want to solve.', 'Create 2 detailed user personas using AI. Map their journey and identify the biggest pain points.'),
(3, 'teen', 'Validation: Testing Your Ideas', 'Learn rapid validation techniques. Create simple tests to see if real people actually want your solution before building anything.', 'Run 3 validation experiments for your top idea. Document what you learned from each.'),
(4, 'teen', 'Validation: Market Research with AI', 'Use AI tools to research your market, analyze competitors, and find your unique positioning. Discover opportunities others are missing.', 'Complete a competitive analysis using AI. Identify 3 competitors and your unique advantage.'),
(5, 'teen', 'Building: Your First AI Prototype', 'Start building! Use AI-powered tools to create your first working prototype. Learn the fundamentals of vibe coding and no-code development.', 'Build your first working prototype using Base44 or similar AI tools. Get 3 people to test it.'),
(6, 'teen', 'Building: Iterating Based on Feedback', 'Learn to love feedback. Collect user input, prioritize changes, and rapidly improve your product through iteration.', 'Collect feedback from 5 users. Make 3 improvements based on what you learned.'),
(7, 'teen', 'Building: Polishing Your MVP', 'Transform your prototype into a polished MVP. Focus on user experience, design, and the details that make products great.', 'Polish your MVP with professional design and clear user flow. Prepare for launch.'),
(8, 'teen', 'Growth: Launch Strategy', 'Plan your launch like a pro. Create buzz, identify early adopters, and prepare for your first real users.', 'Create a launch plan with 5 specific channels to reach your first 50 users.'),
(9, 'teen', 'Growth: Getting Your First Users', 'Execute your launch! Learn scrappy growth tactics to acquire your first customers without spending money.', 'Launch your product and acquire your first 10 real users. Document your growth tactics.'),
(10, 'teen', 'Growth: Measuring What Matters', 'Learn startup metrics. Track user engagement, retention, and the numbers that actually matter for growth.', 'Set up basic analytics. Track 3 key metrics for one week and analyze the results.'),
(11, 'teen', 'Pitch: Telling Your Story', 'Master the art of storytelling. Learn to pitch your startup in a way that captures attention and inspires action.', 'Write your pitch script. Practice delivering it in under 2 minutes.'),
(12, 'teen', 'Pitch: Demo Day Preparation', 'Prepare for Demo Day! Polish your pitch, prepare for investor questions, and get ready to showcase your journey.', 'Complete final pitch deck. Record a practice pitch and get feedback from peers.')
ON CONFLICT DO NOTHING;

-- Also add junior and advanced tracks
INSERT INTO public.curriculum_weeks (week_number, program, title, description, homework_description) VALUES
(1, 'junior', 'Discovery: Be a Problem Detective', 'Become a detective who spots problems! Look for things that bug you or others, and learn how to write them down clearly.', 'Find 3 problems at home or school. Draw or write about each one.'),
(2, 'junior', 'Discovery: Who Needs Help?', 'Learn about the people you want to help. What do they need? What makes them happy or frustrated?', 'Interview a family member about something that bugs them. Create a fun poster about it.'),
(3, 'junior', 'Validation: Does Anyone Want This?', 'Before building, ask people if they would actually use your idea. Learn to ask good questions!', 'Ask 5 people about your idea. Make a tally chart of who liked it.'),
(4, 'junior', 'Validation: Spy on the Competition', 'See if anyone else is solving your problem. What can you learn from them?', 'Find 2 apps or products similar to your idea. What do they do well?'),
(5, 'junior', 'Building: Create Your First App', 'Time to build! Use fun AI tools to create something real that solves your problem.', 'Build your first simple app using Glide. Show it to your family!'),
(6, 'junior', 'Building: Make It Better', 'Listen to feedback and improve your creation. Every founder makes their product better over time.', 'Ask 3 friends to try your app. Fix 2 things they mentioned.'),
(7, 'junior', 'Building: Add the Fun Stuff', 'Make your app look amazing! Add colors, pictures, and fun features people will love.', 'Add 3 cool features or designs to your app.'),
(8, 'junior', 'Growth: Tell the World', 'Time to share your creation! Make a plan to tell people about what you built.', 'Make a poster or video showing off your app.'),
(9, 'junior', 'Growth: Get Your First Fans', 'Find people who love what you made. Your first fans are the most important!', 'Get 5 friends or family members to use your app.'),
(10, 'junior', 'Growth: Count Your Wins', 'Track how many people use your app and what they do with it.', 'Count how many people used your app this week. What did they like most?'),
(11, 'junior', 'Pitch: Share Your Story', 'Learn to tell people about your journey. What problem did you solve? How did you do it?', 'Practice telling your story in 1 minute. Record yourself!'),
(12, 'junior', 'Pitch: Show and Tell Day', 'Present your amazing creation to everyone! Show what you built and what you learned.', 'Get ready for Demo Day! Practice your presentation 3 times.')
ON CONFLICT DO NOTHING;

INSERT INTO public.curriculum_weeks (week_number, program, title, description, homework_description) VALUES
(1, 'advanced', 'Discovery: Market Opportunity Analysis', 'Apply systematic frameworks to identify high-potential market opportunities. Use AI for comprehensive market research and trend analysis.', 'Complete a TAM/SAM/SOM analysis for your target market using AI research tools.'),
(2, 'advanced', 'Discovery: Customer Development Mastery', 'Master the art of customer interviews. Extract deep insights, identify hidden needs, and validate assumptions with rigor.', 'Conduct 5 structured customer development interviews. Synthesize findings into actionable insights.'),
(3, 'advanced', 'Validation: Hypothesis-Driven Testing', 'Design and run experiments to validate key assumptions. Learn to think in terms of hypotheses and evidence.', 'Define 5 critical hypotheses. Design and run tests for each. Document learnings.'),
(4, 'advanced', 'Validation: Business Model Canvas', 'Map your entire business model. Understand unit economics, customer acquisition costs, and lifetime value.', 'Complete a full Business Model Canvas. Calculate preliminary unit economics.'),
(5, 'advanced', 'Building: Full-Stack AI Development', 'Build sophisticated products using advanced AI tools like Lovable, Cursor, or Replit. Create production-ready applications.', 'Build a fully-functional MVP with user authentication, database, and core features.'),
(6, 'advanced', 'Building: User Experience Design', 'Apply UX principles to create intuitive, delightful products. Learn information architecture, user flows, and design systems.', 'Create a comprehensive UX audit. Redesign key user flows based on best practices.'),
(7, 'advanced', 'Building: Technical Debt & Scalability', 'Prepare your product for scale. Understand technical architecture, performance optimization, and maintainability.', 'Audit your codebase for scalability. Implement 3 major improvements.'),
(8, 'advanced', 'Growth: Growth Hacking Strategies', 'Learn advanced growth tactics. Viral loops, referral programs, content marketing, and data-driven optimization.', 'Design and implement a referral program or viral loop for your product.'),
(9, 'advanced', 'Growth: Data-Driven Decision Making', 'Master analytics and A/B testing. Make every decision backed by data and evidence.', 'Set up comprehensive analytics. Run 2 A/B tests and analyze results.'),
(10, 'advanced', 'Growth: Building for Scale', 'Prepare your startup for exponential growth. Systems, processes, and strategies for scaling operations.', 'Create a scaling plan for reaching 1000 users. Identify key bottlenecks.'),
(11, 'advanced', 'Pitch: Investor Pitch Mastery', 'Craft a compelling investor pitch. Understand what VCs look for, how to structure your narrative, and handle tough questions.', 'Complete a full investor pitch deck. Practice handling 10 common investor objections.'),
(12, 'advanced', 'Pitch: Demo Day Excellence', 'Deliver a world-class presentation. Master public speaking, storytelling, and leave a lasting impression.', 'Deliver your final pitch. Get feedback from mentors and peers. Prepare for real investor meetings.')
ON CONFLICT DO NOTHING;