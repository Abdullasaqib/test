-- Create Vibe Coding Essentials certification
INSERT INTO certifications (id, name, slug, description, estimated_hours, lessons_count, is_active, is_free)
VALUES (
  gen_random_uuid(),
  'Vibe Coding Essentials',
  'vibe-coding-essentials',
  'Master the art of building apps through conversation with AI. Learn the prompt cycle, iteration techniques, and ship your first working app.',
  1.5,
  4,
  true,
  false
);

-- Get the certification ID for the lessons
DO $$
DECLARE
  cert_id uuid;
BEGIN
  SELECT id INTO cert_id FROM certifications WHERE slug = 'vibe-coding-essentials';
  
  -- Lesson 1: What is Vibe Coding?
  INSERT INTO certification_lessons (id, certification_id, lesson_order, title, description, estimated_minutes, learning_objectives, sprint_count)
  VALUES (
    gen_random_uuid(),
    cert_id,
    1,
    'What is Vibe Coding?',
    'Discover how natural language can replace traditional programming. Understand the revolution of building through conversation.',
    20,
    ARRAY['Understand vibe coding vs traditional coding', 'Learn why AI changes everything', 'See what''s possible without code'],
    4
  );

  -- Lesson 2: Mastering the Prompt Cycle
  INSERT INTO certification_lessons (id, certification_id, lesson_order, title, description, estimated_minutes, learning_objectives, sprint_count)
  VALUES (
    gen_random_uuid(),
    cert_id,
    2,
    'Mastering the Prompt Cycle',
    'Learn the iterative loop of prompting, reviewing, and refining that powers vibe coding success.',
    25,
    ARRAY['Master the prompt-review-refine cycle', 'Write clear, specific prompts', 'Debug and fix AI outputs'],
    4
  );

  -- Lesson 3: From Idea to Working App
  INSERT INTO certification_lessons (id, certification_id, lesson_order, title, description, estimated_minutes, learning_objectives, sprint_count)
  VALUES (
    gen_random_uuid(),
    cert_id,
    3,
    'From Idea to Working App',
    'Walk through building a complete app from scratch using only natural language prompts.',
    25,
    ARRAY['Structure a project with prompts', 'Build features incrementally', 'Connect frontend to backend'],
    4
  );

  -- Lesson 4: Ship & Share
  INSERT INTO certification_lessons (id, certification_id, lesson_order, title, description, estimated_minutes, learning_objectives, sprint_count)
  VALUES (
    gen_random_uuid(),
    cert_id,
    4,
    'Ship & Share',
    'Deploy your creation, get real users, and share your work with the world.',
    20,
    ARRAY['Deploy your app to production', 'Get your first users', 'Iterate based on feedback'],
    3
  );
END $$;

-- Add sprints for each lesson
DO $$
DECLARE
  lesson1_id uuid;
  lesson2_id uuid;
  lesson3_id uuid;
  lesson4_id uuid;
BEGIN
  SELECT id INTO lesson1_id FROM certification_lessons WHERE title = 'What is Vibe Coding?' AND certification_id = (SELECT id FROM certifications WHERE slug = 'vibe-coding-essentials');
  SELECT id INTO lesson2_id FROM certification_lessons WHERE title = 'Mastering the Prompt Cycle' AND certification_id = (SELECT id FROM certifications WHERE slug = 'vibe-coding-essentials');
  SELECT id INTO lesson3_id FROM certification_lessons WHERE title = 'From Idea to Working App' AND certification_id = (SELECT id FROM certifications WHERE slug = 'vibe-coding-essentials');
  SELECT id INTO lesson4_id FROM certification_lessons WHERE title = 'Ship & Share' AND certification_id = (SELECT id FROM certifications WHERE slug = 'vibe-coding-essentials');

  -- Lesson 1 Sprints
  INSERT INTO certification_lesson_sprints (lesson_id, sprint_order, title, content, age_track, estimated_seconds, quiz_questions) VALUES
  (lesson1_id, 1, 'The End of Traditional Coding', 'For decades, building software meant learning complex programming languages. You had to memorize syntax, understand compilers, and spend years mastering the craft. **Vibe coding changes everything.** Now you describe what you want in plain English, and AI builds it. No semicolons. No debugging mysterious errors. Just conversation.', 'all', 60, '[]'::jsonb),
  (lesson1_id, 2, 'How Vibe Coding Works', 'Think of vibe coding like directing a movie. You''re the director—you decide what gets built. The AI is your entire film crew. **You say:** "I need a landing page with a hero section and signup form." **AI builds:** The complete page, styled and functional. Your job is vision and feedback, not typing code.', 'all', 60, '[]'::jsonb),
  (lesson1_id, 3, 'What You Can Build', 'With vibe coding, you can build anything traditional programmers build: **Web apps** (dashboards, marketplaces, social networks), **Mobile apps** (iOS and Android), **Databases** (user accounts, storing data), **APIs** (connecting to external services). The only limit is your imagination—not your coding skills.', 'all', 60, '[{"question": "What is the main advantage of vibe coding?", "options": ["You need to learn programming languages", "You describe what you want in plain English", "You must understand compilers", "It takes years to master"], "correctIndex": 1}]'::jsonb),
  (lesson1_id, 4, 'The Mindset Shift', 'Traditional coders think: "How do I implement this?" Vibe coders think: "What do I want to exist?" **This is the key mindset shift.** You focus on the WHAT, not the HOW. You become a product visionary instead of a code monkey. The AI handles implementation—you handle innovation.', 'all', 60, '[]'::jsonb);

  -- Lesson 2 Sprints
  INSERT INTO certification_lesson_sprints (lesson_id, sprint_order, title, content, age_track, estimated_seconds, quiz_questions) VALUES
  (lesson2_id, 1, 'The Prompt Cycle', 'Vibe coding follows a simple cycle: **Prompt → Review → Refine → Repeat.** You write a prompt, AI generates code, you review what it built, then refine your next prompt based on what needs fixing. This cycle continues until you have exactly what you want. Most features take 3-5 cycles.', 'all', 60, '[]'::jsonb),
  (lesson2_id, 2, 'Writing Clear Prompts', 'Bad prompt: "Make it look better." Good prompt: "Change the button color to blue (#3B82F6), increase font size to 18px, and add a hover effect that makes it slightly darker." **Specific prompts = better results.** Include colors, sizes, behaviors, and examples when possible. The more detail, the fewer cycles needed.', 'all', 60, '[{"question": "Which is a better prompt?", "options": ["Make it nicer", "Add a blue button with rounded corners that says Submit", "Fix the design", "Change stuff"], "correctIndex": 1}]'::jsonb),
  (lesson2_id, 3, 'When AI Gets It Wrong', 'AI will misunderstand you. It''s normal. When it happens: **1)** Don''t delete everything and start over. **2)** Identify exactly what''s wrong. **3)** Tell the AI specifically what to change. Example: "The button is in the wrong place—move it to the bottom right corner of the card."', 'all', 60, '[]'::jsonb),
  (lesson2_id, 4, 'Iteration is the Skill', 'The best vibe coders aren''t the ones who write perfect prompts. **They''re the ones who iterate quickly.** They review fast, spot issues fast, and refine fast. Speed comes from practice. After 10 projects, you''ll move through cycles in seconds instead of minutes.', 'all', 60, '[{"question": "What makes someone great at vibe coding?", "options": ["Writing perfect prompts the first time", "Knowing programming languages", "Iterating quickly through the prompt cycle", "Never making mistakes"], "correctIndex": 2}]'::jsonb);

  -- Lesson 3 Sprints
  INSERT INTO certification_lesson_sprints (lesson_id, sprint_order, title, content, age_track, estimated_seconds, quiz_questions) VALUES
  (lesson3_id, 1, 'Starting Your Project', 'Every app starts with a single prompt. Be bold—describe your complete vision: "I''m building a task manager for students. It should have a dashboard showing today''s tasks, the ability to add/edit/delete tasks, and a calendar view." **Don''t start small. Start with your full vision,** then let the AI scaffold it.', 'all', 60, '[]'::jsonb),
  (lesson3_id, 2, 'Building Feature by Feature', 'After your initial scaffold, build one feature at a time: **Feature 1:** "Add a form to create new tasks with title, due date, and priority." **Feature 2:** "Add the ability to mark tasks complete with a checkbox." **Feature 3:** "Add filters to show only high-priority tasks." Small, focused prompts = clean, working features.', 'all', 60, '[]'::jsonb),
  (lesson3_id, 3, 'Connecting to Data', 'Most apps need to save data. With vibe coding: "Set up a database to store user accounts and their tasks. Users should only see their own tasks." The AI handles database tables, authentication, and security rules. **You describe the behavior, AI implements the infrastructure.**', 'all', 60, '[{"question": "How do you add a database in vibe coding?", "options": ["Learn SQL first", "Describe what data you need to store", "Hire a backend developer", "It''s not possible"], "correctIndex": 1}]'::jsonb),
  (lesson3_id, 4, 'Making It Beautiful', 'Design prompts work just like feature prompts: "Make the task cards have a subtle shadow, rounded corners, and a green checkmark when completed. Use a clean, modern look like Linear or Notion." **Reference apps you admire.** AI understands "like Airbnb" or "like Apple."', 'all', 60, '[]'::jsonb);

  -- Lesson 4 Sprints
  INSERT INTO certification_lesson_sprints (lesson_id, sprint_order, title, content, age_track, estimated_seconds, quiz_questions) VALUES
  (lesson4_id, 1, 'Deploying to Production', 'Your app works locally. Now ship it: "Deploy this app so anyone can access it at a public URL." Modern vibe coding platforms handle hosting, SSL certificates, and scaling automatically. **In one prompt, you go from local prototype to live product.**', 'all', 60, '[]'::jsonb),
  (lesson4_id, 2, 'Getting Your First Users', 'Share your app: **1)** Post the link in communities related to your app''s purpose. **2)** Ask 5 friends to try it and give feedback. **3)** Watch how people actually use it—they''ll surprise you. Real users reveal problems you never imagined.', 'all', 60, '[{"question": "What''s the best way to improve your app?", "options": ["Keep building features alone", "Watch real users try it", "Wait until it''s perfect", "Never share it"], "correctIndex": 1}]'::jsonb),
  (lesson4_id, 3, 'Iterate Based on Feedback', 'Users will request changes. This is where vibe coding shines: "Users say the signup process has too many steps. Simplify it to just email and password, with optional profile setup later." **Rapid iteration is your superpower.** Traditional developers take weeks. You take hours.', 'all', 60, '[]'::jsonb);
END $$;