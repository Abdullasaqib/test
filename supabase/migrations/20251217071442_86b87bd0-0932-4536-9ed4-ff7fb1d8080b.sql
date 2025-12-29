-- Seed AI Builder Certificate lessons (10 lessons from PLAN + PROMPT modules)
INSERT INTO certification_lessons (certification_id, lesson_order, title, description, estimated_minutes, learning_objectives, quiz_questions, sprint_count) VALUES
-- PLAN Module (Lessons 1-6)
('59605064-f965-4fd1-976a-2a79b295e3e0', 1, 'The Entrepreneurial Journey', 
'Explore the unique aspects of the entrepreneurial journey and the key steps involved in starting and growing a venture. Learn from real-world case studies and create SMART goals for your own path.',
45,
ARRAY['Explain the concept of the entrepreneurial journey and its significance in career choices', 'Analyze case studies to identify key stages ventures went through in their journeys', 'Create SMART goals covering short-term (3-6 months) and medium-term (6-12 months) timeframes'],
'[{"question": "What does SMART stand for in goal setting?", "options": ["Specific, Measurable, Achievable, Relevant, Time-bound", "Simple, Managed, Adaptive, Realistic, Tactical", "Strategic, Motivated, Actionable, Reasonable, Targeted", "Successful, Meaningful, Attainable, Resourceful, Timely"], "correct_answer": 0}, {"question": "Which is NOT one of the 8 steps in the entrepreneurial journey?", "options": ["Opportunity Recognition", "Idea Validation", "Hiring a Large Team First", "Scaling and Growth"], "correct_answer": 2}]'::jsonb,
3),

('59605064-f965-4fd1-976a-2a79b295e3e0', 2, 'The Entrepreneurial Mindset',
'Discover what sets entrepreneurs apart - the ability to identify opportunities and act on them. Develop your personal vision statement and understand your unique strengths through self-assessment.',
45,
ARRAY['Define the entrepreneurial mindset and explain its significance', 'Evaluate characteristics of effective vision statements using real examples', 'Develop a personalized entrepreneurial vision statement reflecting your passion and purpose'],
'[{"question": "What is an entrepreneurial mindset?", "options": ["Only about making money", "A lens for viewing the world that empowers you to identify opportunities and take calculated risks", "A personality trait you are born with", "Something only tech founders have"], "correct_answer": 1}, {"question": "What does SWOT analysis help you understand?", "options": ["Stock market trends", "Your Strengths, Weaknesses, Opportunities, and Threats", "Software development", "Social media strategy"], "correct_answer": 1}]'::jsonb,
3),

('59605064-f965-4fd1-976a-2a79b295e3e0', 3, 'What is Entrepreneurial Opportunity?',
'Learn the crucial difference between an idea and an opportunity. Explore how successful entrepreneurs like Sara Blakely (Spanx) and Melanie Perkins (Canva) identified problems and transformed them into successful ventures.',
45,
ARRAY['Define and differentiate between an idea and an entrepreneurial opportunity', 'Analyze case studies of successful entrepreneurs and how they recognized opportunities', 'Generate potential venture opportunities by identifying problems faced by customer segments'],
'[{"question": "What makes an idea become an entrepreneurial opportunity?", "options": ["Having a cool name", "When the entrepreneur creates a solution targeting a specific market that will appeal to customers", "Getting lots of social media followers", "Copying what competitors do"], "correct_answer": 1}, {"question": "According to the lesson, what do customers actually buy?", "options": ["Products", "Solutions to problems", "The cheapest option", "Whatever is advertised"], "correct_answer": 1}]'::jsonb,
3),

('59605064-f965-4fd1-976a-2a79b295e3e0', 4, 'How to Find Business Opportunities',
'Master strategies for identifying entrepreneurial opportunities including Jobs to Be Done theory, low-end market opportunities, and new market disruption. Learn from Clayton Christensens disruptive innovation framework.',
45,
ARRAY['Define and distinguish between Jobs to Be Done, low-end, and new market opportunities', 'Analyze real-world examples of disruptive innovations', 'Identify emotional situations that cause pain or pleasure for specific customer segments'],
'[{"question": "What is the Jobs to Be Done theory about?", "options": ["Creating job listings", "Understanding the underlying job customers are trying to accomplish", "Hiring employees", "Job market analysis"], "correct_answer": 1}, {"question": "What is a low-end market opportunity?", "options": ["Selling cheap products", "Serving customers overlooked by existing companies focused on high-end users", "Marketing on a budget", "Starting with minimal funding"], "correct_answer": 1}]'::jsonb,
3),

('59605064-f965-4fd1-976a-2a79b295e3e0', 5, 'Drafting Your Business Plan',
'Learn different business plan formats including traditional, executive summary, and lean startup canvas. Create your own lean business plan that captures your venture idea in a clear, actionable format.',
45,
ARRAY['Understand different business plan formats and when to use each', 'Identify the key components of a lean startup business plan', 'Draft a lean business plan for your venture idea'],
'[{"question": "What is a Lean Startup Business Plan?", "options": ["A 50-page detailed document", "A single-page document providing a basic overview of essential aspects", "A plan focused only on finances", "A diet plan for entrepreneurs"], "correct_answer": 1}, {"question": "Which is NOT a component of the lean canvas?", "options": ["Problem and Solution", "Unique Value Proposition", "Detailed 5-year financial projections", "Revenue Streams"], "correct_answer": 2}]'::jsonb,
3),

('59605064-f965-4fd1-976a-2a79b295e3e0', 6, 'Your Elevator Pitch',
'Master the art of the problem-solution narrative and craft a compelling elevator pitch. Learn the 4-step structure used by successful founders to communicate their venture story.',
45,
ARRAY['Understand the significance of storytelling in entrepreneurship', 'Identify elements of a problem-solution narrative and effective elevator pitch', 'Create and deliver a 2-5 minute elevator pitch summarizing your venture idea'],
'[{"question": "What are the 4 steps to creating an effective elevator pitch?", "options": ["Talk fast, use jargon, show charts, ask for money", "State goals, grab attention with a hook, emphasize value proposition, practice", "Introduce yourself, list features, show competitors, end abruptly", "Read from notes, focus on yourself, ignore audience, rush through"], "correct_answer": 1}, {"question": "What is a problem-solution narrative?", "options": ["A story about your personal problems", "A concise story that introduces a problem and presents your venture as the solution", "A list of technical issues", "A narrative about past failures"], "correct_answer": 1}]'::jsonb,
3),

-- PROMPT Module (Lessons 7-10)
('59605064-f965-4fd1-976a-2a79b295e3e0', 7, 'Build Better Prompts: The BASE Framework',
'Master vibe coding - the practice of instructing AI to build apps through natural language. Learn the BASE Prompting Framework: Be Specific, Address the Problem, Structure the Workflow, Establish the End Goal.',
45,
ARRAY['Write a clear purpose for your app using the BASE framework', 'Describe the user journey step-by-step in your prompts', 'Add polish with details and edge cases'],
'[{"question": "What does BASE stand for in the BASE Prompting Framework?", "options": ["Build, Apply, Share, Execute", "Be Specific, Address the Problem, Structure the Workflow, Establish the End Goal", "Basic, Advanced, Standard, Expert", "Best, Average, Simple, Effective"], "correct_answer": 1}, {"question": "What is vibe coding?", "options": ["Writing code while listening to music", "Instructing AI to build apps through natural language", "A coding style trend", "Testing code vibes"], "correct_answer": 1}]'::jsonb,
3),

('59605064-f965-4fd1-976a-2a79b295e3e0', 8, 'Level Up Your Prompts',
'Learn to analyze and improve prompts by comparing weak vs strong examples. Practice transforming vague prompts into clear, actionable instructions that produce better AI outputs.',
45,
ARRAY['Identify what makes a prompt weak or strong', 'Transform vague prompts into specific, actionable instructions', 'Apply the BASE framework to evaluate and improve any prompt'],
'[{"question": "Which is a WEAK prompt?", "options": ["I want to build a time management app for college students that tracks study hours and sends reminders", "Give me an app", "Build a mobile app called BudgetBuddy for young professionals to track spending with categories, set limits, and get alerts", "Create a web app for founders to log investor meetings with notes, follow-ups, and calendar integration"], "correct_answer": 1}, {"question": "Why do vague prompts lead to poor results?", "options": ["AI doesnt like short prompts", "The AI lacks details to understand what you actually want", "Vague is always better", "AI prefers long prompts only"], "correct_answer": 1}]'::jsonb,
3),

('59605064-f965-4fd1-976a-2a79b295e3e0', 9, 'Bring Your Prompt to Life with Base44',
'Take your prompt from paper to prototype. Use the Prompt Builder Worksheet to structure your idea, then run it in Base44 to create your first working MVP.',
45,
ARRAY['Complete the Prompt Builder Worksheet for your venture idea', 'Run your structured prompt in Base44 to generate an MVP', 'Iterate on AI output to refine your prototype'],
'[{"question": "What is the purpose of the Prompt Builder Worksheet?", "options": ["To write essays", "To structure your app idea before building with AI", "To create marketing materials", "To design logos"], "correct_answer": 1}, {"question": "What should you do after running your first prompt in Base44?", "options": ["Accept whatever you get", "Iterate and refine based on the output", "Give up if its not perfect", "Start over completely"], "correct_answer": 1}]'::jsonb,
3),

('59605064-f965-4fd1-976a-2a79b295e3e0', 10, 'Present Your Venture Opportunity',
'Prepare to showcase your MVP with a professional presentation. Learn peer review best practices and how to give and receive constructive feedback on venture prototypes.',
45,
ARRAY['Prepare a professional presentation of your MVP', 'Practice giving and receiving constructive peer feedback', 'Identify areas for improvement based on feedback'],
'[{"question": "Why is peer feedback valuable for entrepreneurs?", "options": ["It is not valuable", "It provides outside perspectives that reveal blind spots", "Only investors can give useful feedback", "Peers are always right"], "correct_answer": 1}, {"question": "What should you focus on when presenting your MVP?", "options": ["Only the features you built", "The problem, your solution, and how users benefit", "Technical implementation details", "How long it took to build"], "correct_answer": 1}]'::jsonb,
3);

-- Update AI Builder Certificate to reflect 10 lessons and correct hours
UPDATE certifications 
SET lessons_count = 10, 
    estimated_hours = 7.5,
    description = 'Master entrepreneurship fundamentals and AI-powered building. Learn from real case studies (Spanx, Canva, Airbnb), create business plans, and build your MVP using the BASE Prompting Framework with Base44.',
    is_active = true
WHERE id = '59605064-f965-4fd1-976a-2a79b295e3e0';

-- Seed AI Launcher Certificate lessons (3 lessons from LAUNCH module - for live teaching)
INSERT INTO certification_lessons (certification_id, lesson_order, title, description, estimated_minutes, learning_objectives, quiz_questions, sprint_count) VALUES
('5537e7ac-9cb6-4534-9707-0bdfea319f0f', 1, 'Which Venture Idea is the One?',
'Live session where teams vote on venture ideas and select which concepts to pursue. Review and expand business reports with mentor guidance.',
120,
ARRAY['Evaluate multiple venture ideas using structured criteria', 'Participate in team voting and selection process', 'Expand your business report with peer and mentor feedback'],
'[]'::jsonb,
0),

('5537e7ac-9cb6-4534-9707-0bdfea319f0f', 2, 'Preparing for Demo Day',
'Polish your MVP and pitch deck with mentor guidance. Get real user feedback and iterate on your product before the final presentation.',
120,
ARRAY['Refine your MVP based on user feedback', 'Structure your pitch for maximum impact', 'Practice presenting to a critical audience'],
'[]'::jsonb,
0),

('5537e7ac-9cb6-4534-9707-0bdfea319f0f', 3, 'Final Venture Pitch - From Idea to Impact',
'Demo Day: Present your venture to real investors and industry experts. Receive professional feedback and grading using the venture pitch rubric.',
180,
ARRAY['Deliver a polished venture pitch to investors', 'Handle Q&A from a panel of judges', 'Receive and process professional feedback'],
'[]'::jsonb,
0);

-- Update AI Launcher Certificate
UPDATE certifications 
SET lessons_count = 3,
    estimated_hours = 7.0,
    description = 'Live cohort program: Team selection, MVP polish, and Demo Day pitch to real investors. Complete with mentor guidance and grading rubric evaluation.',
    is_active = true
WHERE id = '5537e7ac-9cb6-4534-9707-0bdfea319f0f';