-- Update quiz questions to have 5 questions per lesson (add 2 new questions to each)

-- Lesson 1: Introduction to AI Tools
UPDATE certification_lessons 
SET quiz_questions = (
  SELECT jsonb_agg(q) FROM (
    SELECT * FROM jsonb_array_elements(quiz_questions)
    UNION ALL
    SELECT '{"question": "What is the main difference between ChatGPT and Lovable?", "options": ["ChatGPT is newer", "ChatGPT talks, Lovable builds apps", "They do the same thing", "Lovable is free, ChatGPT isn''t"], "correct": 1}'::jsonb
    UNION ALL
    SELECT '{"question": "Why is it important to be specific in your prompts?", "options": ["AI likes long text", "More words = faster response", "Specific prompts get better results", "It doesn''t matter"], "correct": 2}'::jsonb
  ) q
)
WHERE lesson_order = 1 
  AND certification_id = (SELECT id FROM certifications WHERE slug = 'prompt-engineering-fundamentals');

-- Lesson 2: Anatomy of a Great Prompt
UPDATE certification_lessons 
SET quiz_questions = (
  SELECT jsonb_agg(q) FROM (
    SELECT * FROM jsonb_array_elements(quiz_questions)
    UNION ALL
    SELECT '{"question": "What does ''Format'' tell the AI in the 4-part formula?", "options": ["What voice to use", "How long to make it", "How to structure the response", "What language to use"], "correct": 2}'::jsonb
    UNION ALL
    SELECT '{"question": "Which power word tells AI to think step-by-step?", "options": ["Quickly", "Simply", "Step-by-step", "Briefly"], "correct": 2}'::jsonb
  ) q
)
WHERE lesson_order = 2 
  AND certification_id = (SELECT id FROM certifications WHERE slug = 'prompt-engineering-fundamentals');

-- Lesson 3: Prompt Patterns for Builders
UPDATE certification_lessons 
SET quiz_questions = (
  SELECT jsonb_agg(q) FROM (
    SELECT * FROM jsonb_array_elements(quiz_questions)
    UNION ALL
    SELECT '{"question": "The ''Critic'' pattern is best used when you want to:", "options": ["Generate new ideas", "Find weaknesses in your work", "Compare two options", "Learn something new"], "correct": 1}'::jsonb
    UNION ALL
    SELECT '{"question": "What makes the Step-by-Step pattern useful?", "options": ["It''s faster", "It breaks complex tasks into manageable steps", "It uses fewer tokens", "It only works with ChatGPT"], "correct": 1}'::jsonb
  ) q
)
WHERE lesson_order = 3 
  AND certification_id = (SELECT id FROM certifications WHERE slug = 'prompt-engineering-fundamentals');

-- Lesson 4: AI Tool Deep-Dive: Lovable
UPDATE certification_lessons 
SET quiz_questions = (
  SELECT jsonb_agg(q) FROM (
    SELECT * FROM jsonb_array_elements(quiz_questions)
    UNION ALL
    SELECT '{"question": "What should you avoid when writing Lovable prompts?", "options": ["Being specific", "Vague requests like ''make it better''", "Describing colors", "Mentioning buttons"], "correct": 1}'::jsonb
    UNION ALL
    SELECT '{"question": "When your Lovable app doesn''t work perfectly, you should:", "options": ["Start over completely", "Give up", "Make small, specific changes one at a time", "Delete everything"], "correct": 2}'::jsonb
  ) q
)
WHERE lesson_order = 4 
  AND certification_id = (SELECT id FROM certifications WHERE slug = 'prompt-engineering-fundamentals');

-- Lesson 5: AI Tool Deep-Dive: Design Tools
UPDATE certification_lessons 
SET quiz_questions = (
  SELECT jsonb_agg(q) FROM (
    SELECT * FROM jsonb_array_elements(quiz_questions)
    UNION ALL
    SELECT '{"question": "What are the 4 parts of a Midjourney prompt?", "options": ["Who, What, When, Where", "Subject, Style, Details, Parameters", "Start, Middle, End, Summary", "Color, Size, Shape, Texture"], "correct": 1}'::jsonb
    UNION ALL
    SELECT '{"question": "Which Canva AI feature writes text for you?", "options": ["Magic Design", "Magic Write", "Background Remover", "Magic Resize"], "correct": 1}'::jsonb
  ) q
)
WHERE lesson_order = 5 
  AND certification_id = (SELECT id FROM certifications WHERE slug = 'prompt-engineering-fundamentals');

-- Lesson 6: Your First AI Project (Capstone)
UPDATE certification_lessons 
SET quiz_questions = (
  SELECT jsonb_agg(q) FROM (
    SELECT * FROM jsonb_array_elements(quiz_questions)
    UNION ALL
    SELECT '{"question": "What''s the correct order for building an AI project?", "options": ["Build → Design → Brainstorm → Iterate", "Brainstorm → Design → Build → Iterate", "Iterate → Build → Design → Brainstorm", "Design → Brainstorm → Build → Iterate"], "correct": 1}'::jsonb
    UNION ALL
    SELECT '{"question": "What should you do with your completed project?", "options": ["Delete it immediately", "Keep it secret", "Add it to your portfolio and share it", "Only show to teachers"], "correct": 2}'::jsonb
  ) q
)
WHERE lesson_order = 6 
  AND certification_id = (SELECT id FROM certifications WHERE slug = 'prompt-engineering-fundamentals');