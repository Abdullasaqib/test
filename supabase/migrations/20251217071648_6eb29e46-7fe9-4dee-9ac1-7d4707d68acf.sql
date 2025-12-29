-- Seed sprints for AI Builder lessons (fixed escaping)
INSERT INTO certification_lesson_sprints (lesson_id, sprint_order, title, content, age_track, estimated_seconds, quiz_questions) VALUES
-- Lesson 1 sprints
('2452373a-2abc-4bed-8fca-3df8d5c93ffb', 1, 'Steps on the Journey', 
'The entrepreneurial journey has 8 key steps: 1) Opportunity Recognition 2) Idea Validation 3) Business Planning 4) Funding 5) Execution 6) Scaling 7) Sustainability 8) Exit Strategy. Case Study: Airbnb started by renting air mattresses to conference attendees - now worth $100 billion.',
'all', 180, '[{"question": "What is the first step in the entrepreneurial journey?", "options": ["Getting funding", "Opportunity Recognition", "Hiring employees", "Building a website"], "correct_answer": 1}]'::jsonb),
('2452373a-2abc-4bed-8fca-3df8d5c93ffb', 2, 'Case Study: Real Entrepreneurs', 
'Study Warby Parker, TOMS Shoes, and Patagonia. Each started by solving a real problem - overpriced glasses, children without shoes, need for quality climbing gear. Pattern: Successful entrepreneurs identify problems others overlook.',
'all', 180, '[{"question": "What pattern do successful entrepreneurs share?", "options": ["They had lots of money", "They identified problems and created solutions", "They copied competitors", "They were tech experts"], "correct_answer": 1}]'::jsonb),
('2452373a-2abc-4bed-8fca-3df8d5c93ffb', 3, 'Setting SMART Goals', 
'SMART = Specific, Measurable, Achievable, Relevant, Time-bound. Example: Launch prototype and get 100 customer feedback responses in 6 months. Lab: Write 2 SMART goals for your venture.',
'all', 180, '[{"question": "SMART goals must be:", "options": ["Ambitious but vague", "Specific, Measurable, Achievable, Relevant, Time-bound", "Only about revenue", "Set by investors"], "correct_answer": 1}]'::jsonb),

-- Lesson 2 sprints
('0c8cec83-e101-4818-9f00-1230752653ef', 1, 'Entrepreneurial Mindset', 
'The entrepreneurial mindset is a lens for viewing the world - identifying opportunities, taking calculated risks, creating solutions. Key traits: adapting to change, resilience, creativity, risk tolerance.',
'all', 180, '[{"question": "An entrepreneurial mindset is:", "options": ["Only for born entrepreneurs", "A way of thinking anyone can develop", "Only for tech startups", "About reckless risks"], "correct_answer": 1}]'::jsonb),
('0c8cec83-e101-4818-9f00-1230752653ef', 2, 'Vision Statement', 
'Case Study: Izzy Wheels transforms wheelchairs into expressions of personal style. Their vision: Revolutionize wheelchair perception, empowering individuals to express unique style. Lab: Draft your vision statement.',
'all', 180, '[{"question": "A good vision statement should be:", "options": ["Very technical", "Clear, inspirational, aligned with market needs", "Only about money", "As long as possible"], "correct_answer": 1}]'::jsonb),
('0c8cec83-e101-4818-9f00-1230752653ef', 3, 'SWOT Analysis', 
'SWOT = Strengths, Weaknesses, Opportunities, Threats. Internal factors (S/W) you control. External factors (O/T) in your environment. Lab: Complete your personal SWOT analysis.',
'all', 180, '[{"question": "In SWOT, opportunities and threats are:", "options": ["Internal factors", "External factors in your environment", "Same as strengths", "Not important"], "correct_answer": 1}]'::jsonb),

-- Lesson 7 sprints (BASE Framework)
('f7f14fe3-83a1-4d74-9172-e3ea5732f131', 1, 'Introducing BASE', 
'BASE = Be Specific, Address the Problem, Structure the Workflow, Establish the End Goal. Vibe coding means instructing AI to build apps through natural language. Great prompts = better results.',
'all', 180, '[{"question": "BASE stands for:", "options": ["Build Apply Share Execute", "Be Specific, Address Problem, Structure Workflow, End Goal", "Basic Advanced Standard Expert", "Best Average Simple Effective"], "correct_answer": 1}]'::jsonb),
('f7f14fe3-83a1-4d74-9172-e3ea5732f131', 2, 'Be Specific and Address Problems', 
'Vague prompts lead to vague results. Include: what your app does, who it is for, how it should look. Every great app solves a problem - describe that challenge clearly.',
'all', 180, '[{"question": "What makes a prompt weak?", "options": ["Too many details", "Being vague and unclear", "Including user stories", "Having a clear purpose"], "correct_answer": 1}]'::jsonb),
('f7f14fe3-83a1-4d74-9172-e3ea5732f131', 3, 'Structure and End Goal', 
'Guide the AI through the user journey step-by-step. Tell the AI what success looks like - what should your app or user accomplish? This ensures usable deliverables.',
'all', 180, '[{"question": "Why structure the workflow in your prompt?", "options": ["AI likes long prompts", "It makes the prompt actionable and predictable", "It is optional", "Only for complex apps"], "correct_answer": 1}]'::jsonb),

-- Lesson 8 sprints (Level Up Prompts)
('03b4dc0f-4726-4cb9-9e03-abc3f03fc69c', 1, 'Weak vs Strong Prompts', 
'Weak: Give me an app. Strong: Build a time management app for college students that tracks study hours, sends reminders, and shows weekly reports. The difference is specificity and context.',
'all', 180, '[{"question": "Which is a weak prompt?", "options": ["Build a budget app for young professionals with spending categories", "Give me an app", "Create a web app for founders to track investor meetings", "Design a mobile app with dark mode"], "correct_answer": 1}]'::jsonb),
('03b4dc0f-4726-4cb9-9e03-abc3f03fc69c', 2, 'Prompt Makeover', 
'Practice transforming vague prompts into clear instructions. Before: Help me with marketing. After: Generate 3 low-cost marketing strategies for a new coffee shop targeting college students.',
'all', 180, '[{"question": "Prompt makeover means:", "options": ["Deleting your prompt", "Transforming vague prompts into specific ones", "Making prompts shorter", "Adding emojis"], "correct_answer": 1}]'::jsonb),
('03b4dc0f-4726-4cb9-9e03-abc3f03fc69c', 3, 'Iterate for Better Results', 
'Prompting is creative, not one-time. You can always change your audience, swap tools, or add features. Every iteration gets your AI closer to your vision. Pro tip: Test, learn, refine.',
'all', 180, '[{"question": "What should you do if AI output is not perfect?", "options": ["Give up", "Accept whatever you get", "Iterate and refine your prompt", "Start a new project"], "correct_answer": 2}]'::jsonb);