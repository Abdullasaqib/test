
-- Week 4 Junior Mission Sprints (20 sprints for 5 missions) - with proper JSONB casting

-- Week 4, Day 1: Design Thinking Basics
INSERT INTO public.mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, 1, 'content', '🎨 What is Design Thinking?', 
'Design thinking is like being a detective AND an artist! 🕵️‍♀️🎨

**The Big Idea:** Before building, REALLY understand the problem. Design thinking helps you look at problems from different angles, think about what people need, sketch ideas, and try things!

**Fun Fact:** IDEO used design thinking to create the first Apple mouse! 🖱️', 
60, 
'[{"question": "What does design thinking help you do FIRST?", "options": ["Build immediately", "Understand the problem deeply", "Copy others", "Give up"], "correctIndex": 1}]'::jsonb,
NULL
FROM missions m WHERE m.track = 'junior' AND m.week = 4 AND m.day = 1;

INSERT INTO public.mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, 2, 'content', '👟 Walk in Their Shoes', 
'The secret to great design? Understanding how others feel - **empathy**! 💕

Think about when you were frustrated with something. That frustration is what you want to fix for YOUR customers!

**Designer''s Trick:** Ask yourself: What would make someone smile? 😊 Frustrated? 😤 Say WOW? 🤩', 
45, 
'[{"question": "Empathy in design means...", "options": ["Making things pretty", "Understanding how users feel", "Using lots of colors", "Building fast"], "correctIndex": 1}]'::jsonb,
NULL
FROM missions m WHERE m.track = 'junior' AND m.week = 4 AND m.day = 1;

INSERT INTO public.mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, 3, 'lab', '🤖 AI Empathy Interview', 'Use AI to understand your customers better!', 90, NULL,
'Copy this prompt: "I''m building [YOUR IDEA] for [WHO]. Help me understand: 1. What frustrates them? 2. What would make them happy? 3. What might worry them about trying something new? Give me answers a 10-year-old would understand!"'
FROM missions m WHERE m.track = 'junior' AND m.week = 4 AND m.day = 1;

INSERT INTO public.mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, 4, 'reflection', '🌟 Design Detective Badge!', 
'You learned the FIRST step: Understanding your users! ✅ Design thinking = detective + artist ✅ Empathy means understanding feelings ✅ AI helps you think like customers. Coming Up: Sketching ideas! ✏️', 
30, NULL, NULL
FROM missions m WHERE m.track = 'junior' AND m.week = 4 AND m.day = 1;

-- Week 4, Day 2
INSERT INTO public.mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, 1, 'content', '✏️ The Power of Sketching', 
'The BEST founders sketch ideas before building! 🚀 It''s FAST, you can try MANY ideas, easy to throw away bad ones, and easy to get feedback. Your sketches don''t need to be pretty - stick figures are PERFECT!', 
60, '[{"question": "Why sketch before building?", "options": ["To make art", "To test ideas quickly", "Because you have to", "To impress people"], "correctIndex": 1}]'::jsonb, NULL
FROM missions m WHERE m.track = 'junior' AND m.week = 4 AND m.day = 2;

INSERT INTO public.mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, 2, 'content', '📱 App Screen Basics', 
'Every app has simple parts like LEGO! 📍 Header (title at top), 🔘 Buttons (tap to do things), 📝 Text (explains things), 🖼️ Images, 📋 Lists. Draw rectangles, label them - that''s your first wireframe! 🎉', 
50, '[{"question": "What goes at the TOP of most app screens?", "options": ["A button", "The header/title", "A picture", "A list"], "correctIndex": 1}]'::jsonb, NULL
FROM missions m WHERE m.track = 'junior' AND m.week = 4 AND m.day = 2;

INSERT INTO public.mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, 3, 'lab', '🎨 AI Wireframe Helper', 'Let AI help plan your screens!', 90, NULL,
'Ask AI: "I''m building [APP NAME] that helps [WHO] with [PROBLEM]. Design 3 simple screens: Home, Main action, Success. For each: what''s at top, what buttons, what info shown. Keep it super simple!"'
FROM missions m WHERE m.track = 'junior' AND m.week = 4 AND m.day = 2;

INSERT INTO public.mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, 4, 'reflection', '🏆 Wireframe Warrior!', 
'You learned how designers start every project! ✅ Sketching saves time ✅ Apps are made of simple blocks ✅ AI helps plan screens ✅ Created your first wireframes! Next: Making designs AMAZING! 🌈', 
30, NULL, NULL
FROM missions m WHERE m.track = 'junior' AND m.week = 4 AND m.day = 2;

-- Week 4, Days 3-5, Week 5-6 abbreviated for space (following same pattern with ::jsonb casting)
INSERT INTO public.mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, 1, 'content', '🌈 The Magic of Colors', 
'Colors make people FEEL things! 🔴 Red = excitement (YouTube), 🔵 Blue = trust (Facebook), 🟢 Green = growth (Spotify), 🟡 Yellow = happy (Snapchat). McDonald''s uses red+yellow because they make people hungry AND happy! 🍔', 
60, '[{"question": "Which color makes people feel calm and trusting?", "options": ["Red", "Blue", "Yellow", "Green"], "correctIndex": 1}]'::jsonb, NULL
FROM missions m WHERE m.track = 'junior' AND m.week = 4 AND m.day = 3;

INSERT INTO public.mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, 2, 'content', '✨ Building Your Brand', 
'Your brand is your startup''s personality! 🎨 Colors (2-3 main), ✍️ Font (fun? serious?), 🖼️ Logo, 💬 Voice. What fits YOUR startup - Playful? 🎉 Serious? 💼 Bold? 🚀', 
50, '[{"question": "How many main colors should a brand have?", "options": ["10 colors", "2-3 colors", "1 only", "As many as possible"], "correctIndex": 1}]'::jsonb, NULL
FROM missions m WHERE m.track = 'junior' AND m.week = 4 AND m.day = 3;

INSERT INTO public.mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, 3, 'lab', '🎨 AI Brand Creator', 'Let AI design your brand!', 90, NULL,
'Ask AI: "I''m creating a brand for [NAME]. It''s a [WHAT] for [WHO]. Feeling I want: [fun/serious/exciting]. Suggest: 2-3 colors, font style, 3 logo ideas, and a tagline like Nike''s Just Do It!"'
FROM missions m WHERE m.track = 'junior' AND m.week = 4 AND m.day = 3;

INSERT INTO public.mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, 4, 'reflection', '🌟 Brand Builder Complete!', 
'Your startup has a personality! ✅ Chose colors ✅ Picked font style ✅ Got logo ideas ✅ Created a tagline! Keep your brand consistent everywhere! Next: Testing with real people! 👥', 
30, NULL, NULL
FROM missions m WHERE m.track = 'junior' AND m.week = 4 AND m.day = 3;

-- Week 4, Day 4
INSERT INTO public.mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, 1, 'content', '🧪 Why Testing Matters', 
'Founder secret: Your first idea is almost NEVER perfect! The Testing Loop: Build → Show to people → Listen → Improve → Repeat! Even the first iPhone didn''t have copy-paste - Apple added it AFTER users complained! 📱', 
60, '[{"question": "After showing your design, what should you do?", "options": ["Argue with feedback", "Listen and learn from it", "Ignore it", "Give up"], "correctIndex": 1}]'::jsonb, NULL
FROM missions m WHERE m.track = 'junior' AND m.week = 4 AND m.day = 4;

INSERT INTO public.mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, 2, 'content', '🎯 Getting Good Feedback', 
'Not all feedback is equal! Ask: "What''s confusing?" "What would you change?" "Would you use this?" DON''T ask: "Isn''t this cool?" (leading!). Pro Tip: Watch what people DO, not just what they SAY! 👀', 
50, '[{"question": "Which is a GOOD feedback question?", "options": ["Isn''t this amazing?", "What''s confusing about this?", "You like it, right?", "This is the best, agree?"], "correctIndex": 1}]'::jsonb, NULL
FROM missions m WHERE m.track = 'junior' AND m.week = 4 AND m.day = 4;

INSERT INTO public.mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, 3, 'lab', '📋 Create Your Test Plan', 'Plan your first user test!', 90, NULL,
'Ask AI: "I built [YOUR IDEA]. My users are [WHO]. Create a simple test: 5 good questions, what to WATCH for (confusion), and a feedback form with 3 rating questions and 2 open questions. Make it fun!"'
FROM missions m WHERE m.track = 'junior' AND m.week = 4 AND m.day = 4;

INSERT INTO public.mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, 4, 'reflection', '🏆 User Testing Pro!', 
'You know how to learn from real users! ✅ Build-Test-Learn loop ✅ Good vs bad questions ✅ Your testing plan ✅ Feedback form ready! Even negative feedback is a GIFT! 🎁 Tomorrow: Putting it ALL together! 🎯', 
30, NULL, NULL
FROM missions m WHERE m.track = 'junior' AND m.week = 4 AND m.day = 4;

-- Week 4, Day 5
INSERT INTO public.mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, 1, 'content', '🎯 Your Design Journey', 
'Look how far you came! Day 1: Design thinking, Day 2: Wireframes, Day 3: Branding, Day 4: User testing. Real designers iterate (keep improving) - they don''t get it right first time! 💡', 
50, '[{"question": "What does iterate mean in design?", "options": ["Give up", "Keep improving your work", "Copy someone else", "Make it perfect first try"], "correctIndex": 1}]'::jsonb, NULL
FROM missions m WHERE m.track = 'junior' AND m.week = 4 AND m.day = 5;

INSERT INTO public.mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, 2, 'content', '📱 Designing for Your Users', 
'Different people need different designs! 👶 Young Kids: Big buttons, bright colors. 👴 Grandparents: Large text, simple navigation. 🏃 Busy People: Quick actions, minimal steps. Key: Who is YOUR user?', 
45, '[{"question": "If designing for grandparents, what matters most?", "options": ["Tiny text", "Large text and simple navigation", "Complex menus", "Lots of animations"], "correctIndex": 1}]'::jsonb, NULL
FROM missions m WHERE m.track = 'junior' AND m.week = 4 AND m.day = 5;

INSERT INTO public.mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, 3, 'lab', '🎨 Design Portfolio Piece', 'Create a polished design summary!', 90, NULL,
'Ask AI: "Create a 1-page design summary for [NAME]: Problem Statement, Solution, Target User, Brand Colors (with hex), 3 Main Screens, Key User Feedback. Format nicely to share!" This is your portfolio piece!'
FROM missions m WHERE m.track = 'junior' AND m.week = 4 AND m.day = 5;

INSERT INTO public.mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, 4, 'reflection', '🎉 Design Week COMPLETE!', 
'You''re a DESIGN THINKER! 🎨🧠 ✅ Design thinking ✅ Wireframes ✅ Brand identity ✅ User tests ✅ Portfolio piece! You think like a designer at Google or Apple! 🍎 Next Week: TIME TO BUILD! 🛠️', 
30, NULL, NULL
FROM missions m WHERE m.track = 'junior' AND m.week = 4 AND m.day = 5;
