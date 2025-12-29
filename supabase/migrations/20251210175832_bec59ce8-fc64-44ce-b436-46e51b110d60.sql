
-- Migration: Add micro-sprints for Junior Track Weeks 2-3 (10 missions → 40 sprints)
-- Using correct column names: week (not week_number), day_number

-- Week 2 Day 1: Finding Your First Customers
INSERT INTO mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, s.sprint_order, s.sprint_type, s.title, s.content, s.estimated_seconds, s.quiz_questions::jsonb, s.lab_instructions
FROM missions m
CROSS JOIN (VALUES
    (1, 'content', '🎯 Finding Your First Customers', 
     '## Who Needs Your Solution? 🤔

Every amazing product starts with finding people who REALLY need it!

**Fun Fact:** When the founders of Airbnb started, they literally went door-to-door asking people if they needed a place to stay! 🏠

Think about it: if you made a cool homework helper app, who would use it? Students like you! That''s your **target customer**.

**Your target customer** is the person who will say "YES! I need this!" when they see your product.', 
     60, 
     '[{"question": "What is a target customer? 🎯", "options": ["Anyone who might see your product", "The person who really needs your solution", "Your friends and family", "People who like apps"], "correctIndex": 1}, {"question": "Why did Airbnb founders go door-to-door?", "options": ["To sell cookies", "To find people who needed places to stay", "To make friends", "To exercise"], "correctIndex": 1}]',
     NULL),
    (2, 'quiz', '🔍 Discovery Time!', 
     '## Let''s Find YOUR Customers! 🕵️

Now it''s YOUR turn to be a detective! 

Think about the problem you want to solve. Who has this problem the MOST?

**Example:** 
- Problem: Hard to remember homework
- Target Customer: Students aged 8-14 who forget assignments

**Your Turn:** Write down 3 types of people who might have the problem you want to solve!',
     45,
     '[{"question": "If your app helps pets find homes, who is your target customer?", "options": ["The pets themselves 🐕", "People who want to adopt pets 👨‍👩‍👧", "Pet food companies", "Veterinarians"], "correctIndex": 1}]',
     NULL),
    (3, 'lab', '🤖 AI Customer Finder', 
     '## Time to Use AI Magic! ✨

Let''s ask AI to help us find our perfect customers!

Copy this prompt and paste it into ChatGPT or Claude:',
     90,
     NULL,
     'Copy and paste this prompt:\n\n"I''m [your age] years old and I want to build a [your idea]. Help me find my target customers by listing:\n1. 3 types of people who have this problem\n2. How old they might be\n3. Where I might find them\n\nKeep it simple and fun for a kid to understand!"'),
    (4, 'reflection', '🎉 Amazing Work, Founder!', 
     '## You Did It! 🌟

You just learned how to find your target customers - that''s HUGE!

**What You Learned:**
- ✅ Target customers are people who REALLY need your solution
- ✅ You can use AI to help find them
- ✅ Real founders (like Airbnb!) started by talking to customers

**Next Up:** Tomorrow you''ll learn how to TALK to your customers! 🗣️',
     30,
     NULL,
     NULL)
) AS s(sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
WHERE m.track = 'junior' AND m.week = 2 AND m.day_number = 1;

-- Week 2 Day 2: Talking to Customers
INSERT INTO mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, s.sprint_order, s.sprint_type, s.title, s.content, s.estimated_seconds, s.quiz_questions::jsonb, s.lab_instructions
FROM missions m
CROSS JOIN (VALUES
    (1, 'content', '💬 Talking to Customers', 
     '## The Secret Superpower: LISTENING! 👂

The best founders don''t just build cool stuff - they LISTEN to what people need!

**Fun Fact:** The creator of Snapchat asked his classmates what they wished existed before building it! 📱

**Customer Interview** = Having a friendly chat to learn what people really want.

It''s like being a detective, but instead of solving crimes, you''re solving problems! 🕵️',
     60,
     '[{"question": "What is a customer interview?", "options": ["A job interview", "A test at school", "A friendly chat to learn what people need", "A TV show"], "correctIndex": 2}]',
     NULL),
    (2, 'quiz', '🎤 Interview Practice!', 
     '## Good Questions vs. Bad Questions ❓

**Bad Question:** "Do you like my idea?" (They might just say yes to be nice!)

**Good Question:** "Tell me about the last time you had this problem?" (Now you get REAL info!)

The trick is asking questions that help you LEARN, not just hear "yes"!',
     45,
     '[{"question": "Which is a BETTER question to ask?", "options": ["Is my app cool?", "Would you pay $100 for this?", "Tell me about your biggest homework problem", "Do you want to be my customer?"], "correctIndex": 2}]',
     NULL),
    (3, 'lab', '📝 Create Your Interview Questions', 
     '## AI Interview Question Generator! 🤖

Let''s create amazing interview questions with AI help!',
     90,
     NULL,
     'Copy and paste this prompt:\n\n"I''m building a [your idea] for [your target customer]. Help me create 5 simple interview questions I can ask them. Make the questions:\n- Easy for a kid to ask\n- Open-ended (not yes/no)\n- Fun and friendly\n\nI''m [your age] years old!"'),
    (4, 'reflection', '⭐ Interview Champion!', 
     '## You''re Ready to Talk to Customers! 🎊

**Today''s Wins:**
- ✅ You know what customer interviews are
- ✅ You learned to ask GOOD questions
- ✅ You created your own interview questions with AI

**Pro Tip:** Practice your questions on a family member first! 👨‍👩‍👧

**Tomorrow:** Time to do your FIRST real interview! 😄',
     30,
     NULL,
     NULL)
) AS s(sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
WHERE m.track = 'junior' AND m.week = 2 AND m.day_number = 2;

-- Week 2 Day 3: Your First Interview
INSERT INTO mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, s.sprint_order, s.sprint_type, s.title, s.content, s.estimated_seconds, s.quiz_questions::jsonb, s.lab_instructions
FROM missions m
CROSS JOIN (VALUES
    (1, 'content', '🏃 Your First Interview!', 
     '## Time to Be a Real Founder! 💪

Today is SUPER exciting - you''re going to do your first customer interview!

**Don''t worry:** Even famous founders were nervous for their first interview!

**Remember:**
- 😊 Smile and be friendly
- 👂 Listen more than you talk
- 📝 Write down what they say
- 🙏 Say thank you at the end!',
     60,
     '[{"question": "What should you do MORE of during an interview?", "options": ["Talk about your idea", "Listen to the customer", "Show them pictures", "Tell jokes"], "correctIndex": 1}]',
     NULL),
    (2, 'quiz', '🎯 Interview Prep Checklist', 
     '## Get Ready! ✅

Before your interview, make sure you have:
- [ ] Your questions ready
- [ ] Something to write notes on
- [ ] A quiet place to talk
- [ ] A big smile! 😊

**Who to interview:** A parent, sibling, neighbor, or classmate who might have the problem you''re solving!',
     45,
     '[{"question": "Who would be BEST to interview for a homework helper app?", "options": ["A baby", "A student who does homework", "A dog", "A teacher who doesn''t assign homework"], "correctIndex": 1}]',
     NULL),
    (3, 'lab', '📞 Do Your Interview!', 
     '## It''s Interview Time! 🎬

Find someone to interview and use your questions from yesterday!',
     120,
     NULL,
     'Interview Steps:\n\n1. Find your interviewee (parent, sibling, friend)\n2. Say: "Hi! I''m working on a project to help [your problem]. Can I ask you 5 quick questions?"\n3. Ask your questions and write down their answers\n4. Say "Thank you so much!"\n5. Write down the ONE most interesting thing they said!'),
    (4, 'reflection', '🏆 You Did Your First Interview!', 
     '## WOW! You''re a Real Founder Now! 🌟

You just did something most adults are scared to do - you talked to a real customer!

**Celebrate This:**
- ✅ You overcame your nervousness
- ✅ You learned something new about your customer
- ✅ You took action like a real entrepreneur!

**Share:** Tell someone about the most surprising thing you learned!',
     30,
     NULL,
     NULL)
) AS s(sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
WHERE m.track = 'junior' AND m.week = 2 AND m.day_number = 3;

-- Week 2 Day 4: Learning from Interviews
INSERT INTO mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, s.sprint_order, s.sprint_type, s.title, s.content, s.estimated_seconds, s.quiz_questions::jsonb, s.lab_instructions
FROM missions m
CROSS JOIN (VALUES
    (1, 'content', '🔮 What Did You Learn?', 
     '## Turning Interviews into Gold! 💰

Now comes the magic part - figuring out what all those interview answers MEAN!

**Fun Fact:** The founders of Instagram interviewed people and learned they wanted SIMPLER photo sharing, not more features! That''s why Instagram became so popular! 📸

Look for **patterns** - things multiple people said!',
     60,
     '[{"question": "What should you look for in interview answers?", "options": ["The longest answers", "Patterns - things multiple people said", "The funniest answers", "Answers that agree with your idea"], "correctIndex": 1}]',
     NULL),
    (2, 'quiz', '📊 Pattern Detective!', 
     '## Finding Hidden Patterns 🔍

**Example:**
- Person 1: "I always forget my homework assignments"
- Person 2: "I lose track of what''s due"
- Person 3: "I wish I had reminders for homework"

**Pattern Found:** People need help REMEMBERING homework! 💡

This pattern tells you what to focus on building!',
     45,
     '[{"question": "If 3 people say they hate forgetting stuff, the pattern is:", "options": ["People like forgetting", "People need help remembering", "People don''t have stuff", "People should try harder"], "correctIndex": 1}]',
     NULL),
    (3, 'lab', '🤖 AI Pattern Finder', 
     '## Let AI Help You See Patterns! ✨

Share your interview notes with AI to find hidden insights!',
     90,
     NULL,
     'Copy and paste this prompt:\n\n"I interviewed people about [your problem]. Here''s what they said:\n[Paste 3-5 things people told you]\n\nHelp me find:\n1. The main pattern or common theme\n2. The biggest problem they mentioned\n3. One surprising thing I might have missed\n\nExplain it simply for a kid!"'),
    (4, 'reflection', '💎 Insight Master!', 
     '## You Can See What Others Miss! 👁️

You just learned to find patterns in customer feedback - that''s a RARE skill!

**Your Discoveries:**
- ✅ You know how to spot patterns
- ✅ You used AI to find hidden insights
- ✅ You understand your customers better now!

**Tomorrow:** We''ll use these patterns to make your idea even BETTER! 🚀',
     30,
     NULL,
     NULL)
) AS s(sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
WHERE m.track = 'junior' AND m.week = 2 AND m.day_number = 4;

-- Week 2 Day 5: Improving Your Idea
INSERT INTO mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, s.sprint_order, s.sprint_type, s.title, s.content, s.estimated_seconds, s.quiz_questions::jsonb, s.lab_instructions
FROM missions m
CROSS JOIN (VALUES
    (1, 'content', '🔄 Improve Your Idea!', 
     '## Making Your Idea 10x Better! 🚀

This is the BEST part of being a founder - using what you learned to improve your idea!

**The Loop:** Interview → Learn → Improve → Repeat! 🔄

**Fun Fact:** The first version of YouTube was a VIDEO DATING SITE! But founders learned people wanted to share ALL kinds of videos, so they changed it! 📺',
     60,
     '[{"question": "Why do founders change their ideas?", "options": ["Because they get bored", "Because they learn from customers", "Because their friends told them to", "Because they ran out of ideas"], "correctIndex": 1}]',
     NULL),
    (2, 'quiz', '✏️ Idea Improvement Time!', 
     '## Before vs. After 📈

**Before Interviews:** "I want to build a homework app"

**After Interviews:** "I want to build an app that sends fun reminders about homework with encouraging messages because my interviews showed people forget AND feel stressed about it!"

See how much BETTER that is? You know exactly what to build!',
     45,
     '[{"question": "What makes the second idea better?", "options": ["It''s longer", "It''s based on what customers actually said", "It uses bigger words", "It costs more"], "correctIndex": 1}]',
     NULL),
    (3, 'lab', '📝 Write Your Improved Idea', 
     '## Update Your Idea with AI! 🤖

Let''s combine everything you learned into an IMPROVED idea!',
     90,
     NULL,
     'Copy and paste this prompt:\n\n"I''m building [your original idea]. After interviewing customers, I learned:\n[Share 2-3 key things you learned]\n\nHelp me write a NEW, IMPROVED version of my idea that includes what I learned. Make it one paragraph a kid can understand.\n\nStart with: ''I''m building...'' "'),
    (4, 'reflection', '🎓 Week 2 Complete!', 
     '## You''re a Validation PRO! 🏆

This week you did something AMAZING:
- ✅ Found your target customers
- ✅ Created interview questions
- ✅ Did REAL customer interviews
- ✅ Found patterns in feedback
- ✅ Improved your idea based on data!

**You''re ahead of 90% of adult entrepreneurs who skip this step!**

Next week: Let''s see who else is solving this problem! 👀',
     30,
     NULL,
     NULL)
) AS s(sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
WHERE m.track = 'junior' AND m.week = 2 AND m.day_number = 5;

-- Week 3 Day 1: Competition Research
INSERT INTO mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, s.sprint_order, s.sprint_type, s.title, s.content, s.estimated_seconds, s.quiz_questions::jsonb, s.lab_instructions
FROM missions m
CROSS JOIN (VALUES
    (1, 'content', '🔍 Who Else Is Solving This?', 
     '## Meet Your Competition! 🏁

Here''s a secret: Having competition is actually GOOD! It means people want a solution!

**Fun Fact:** When Google started, there were already 10+ search engines! They just made a BETTER one! 🔎

**Competition** = Other products that solve the same problem you want to solve.',
     60,
     '[{"question": "Is having competition good or bad?", "options": ["Bad - give up now", "Good - it means people want a solution!", "It doesn''t matter", "Only bad if they''re bigger"], "correctIndex": 1}]',
     NULL),
    (2, 'quiz', '🎯 Competition Types', 
     '## Direct vs. Indirect Competition

**Direct:** Does the EXACT same thing
- Example: Uber and Lyft both do ride-sharing

**Indirect:** Solves the same PROBLEM differently  
- Example: Uber and buses both help you get places

Both are important to know about!',
     45,
     '[{"question": "If you''re building a homework reminder app, what''s DIRECT competition?", "options": ["A calendar app", "Another homework reminder app", "A school", "A pencil"], "correctIndex": 1}]',
     NULL),
    (3, 'lab', '🤖 AI Competition Finder', 
     '## Discover Your Competition with AI! 🔎',
     90,
     NULL,
     'Copy and paste this prompt:\n\n"I''m building [your idea] for [target customers]. Help me find:\n\n1. 3 apps or products that do something similar (direct competition)\n2. 3 different ways people currently solve this problem (indirect competition)\n3. What makes each one good or not-so-good\n\nExplain it simply for a [your age]-year-old!"'),
    (4, 'reflection', '📚 Competition Knowledge!', 
     '## You Know Your Market Now! 🗺️

Knowing your competition is like knowing the other teams before a big game!

**What You Learned:**
- ✅ Competition means your idea has potential
- ✅ Direct vs. indirect competition
- ✅ How to research competition with AI

**Tomorrow:** We''ll find what makes YOUR idea special! ⭐',
     30,
     NULL,
     NULL)
) AS s(sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
WHERE m.track = 'junior' AND m.week = 3 AND m.day_number = 1;

-- Week 3 Day 2: Your Superpower
INSERT INTO mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, s.sprint_order, s.sprint_type, s.title, s.content, s.estimated_seconds, s.quiz_questions::jsonb, s.lab_instructions
FROM missions m
CROSS JOIN (VALUES
    (1, 'content', '⭐ Your Superpower!', 
     '## What Makes YOU Special? 💫

Every successful product has a **superpower** - something that makes it WAY better than others!

**Examples:**
- TikTok''s superpower: Super short, addictive videos
- Netflix superpower: Watch anything, anytime, no ads
- Nintendo Switch superpower: Play on TV OR handheld!

What will YOUR superpower be? 🦸',
     60,
     '[{"question": "What is a product superpower?", "options": ["A video game feature", "Something that makes your product WAY better than others", "A superhero character", "The most expensive feature"], "correctIndex": 1}]',
     NULL),
    (2, 'quiz', '💪 Superpower Brainstorm', 
     '## Finding YOUR Unique Advantage

Think about these questions:
- What can you do BETTER than competition?
- What can you do FASTER?
- What can you make MORE FUN?
- What''s MISSING from other solutions?

Your answer = Your superpower! 🌟',
     45,
     '[{"question": "If all homework apps are boring, what could be your superpower?", "options": ["Make it even more boring", "Make it fun and game-like!", "Copy what they do", "Charge more money"], "correctIndex": 1}]',
     NULL),
    (3, 'lab', '🤖 Discover Your Superpower', 
     '## AI Superpower Finder! ✨',
     90,
     NULL,
     'Copy and paste this prompt:\n\n"I''m building [your idea]. My competition is [name 1-2 competitors].\n\nHelp me find my superpower by suggesting 5 ways I could be DIFFERENT and BETTER than them. Think about:\n- What I could do faster\n- What I could make more fun\n- What I could make easier\n- What''s missing from competitors\n\nMake suggestions fun for a kid to understand!"'),
    (4, 'reflection', '🦸 You Found Your Superpower!', 
     '## You''re One of a Kind! 🌈

Now you know what makes your idea SPECIAL!

**Remember:**
- ✅ Every great product has a superpower
- ✅ Your superpower makes you stand out
- ✅ Focus on being DIFFERENT, not just better

**Tomorrow:** Let''s figure out how much people might pay! 💰',
     30,
     NULL,
     NULL)
) AS s(sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
WHERE m.track = 'junior' AND m.week = 3 AND m.day_number = 2;

-- Week 3 Day 3: Pricing
INSERT INTO mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, s.sprint_order, s.sprint_type, s.title, s.content, s.estimated_seconds, s.quiz_questions::jsonb, s.lab_instructions
FROM missions m
CROSS JOIN (VALUES
    (1, 'content', '💰 The Money Talk!', 
     '## How Much Is Your Solution Worth? 🤑

This is where it gets exciting - figuring out pricing!

**Fun Fact:** The first iPhone was $599! People said it was TOO expensive. Now iPhones cost over $1000 and people happily pay! 📱

**Pricing Tips:**
- Too cheap = People think it''s bad quality
- Too expensive = People won''t buy
- Just right = People feel like they''re getting a deal! ✨',
     60,
     '[{"question": "What happens if you price too cheap?", "options": ["Everyone buys it", "People think it''s bad quality", "You get rich", "Nothing bad"], "correctIndex": 1}]',
     NULL),
    (2, 'quiz', '📊 Pricing Strategies', 
     '## Different Ways to Charge 💳

**Free + Ads:** Free to use, show ads (YouTube)
**Freemium:** Basic free, pay for extras (games)
**Subscription:** Pay monthly (Netflix)
**One-time:** Pay once, own forever (most games)

Which fits YOUR product best? 🤔',
     45,
     '[{"question": "Netflix uses which pricing model?", "options": ["Free with ads", "One-time payment", "Subscription (pay monthly)", "Freemium"], "correctIndex": 2}]',
     NULL),
    (3, 'lab', '🤖 Price Your Product', 
     '## Let AI Help You Find the Right Price! 💲',
     90,
     NULL,
     'Copy and paste this prompt:\n\n"I''m building [your idea] for [target customers]. My competition charges [if you know, list prices].\n\nHelp me figure out:\n1. What pricing model would work best (free, freemium, subscription, one-time)\n2. A suggested price range\n3. Why customers would pay this price\n\nExplain your thinking simply for a kid!"'),
    (4, 'reflection', '💵 Pricing Pro!', 
     '## You Understand Value Now! 💎

Most people struggle with pricing - but not you!

**What You Know:**
- ✅ Price too low = looks bad quality
- ✅ Different pricing models exist
- ✅ How to think about YOUR pricing

**Tomorrow:** Who exactly is buying? Let''s get specific! 🎯',
     30,
     NULL,
     NULL)
) AS s(sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
WHERE m.track = 'junior' AND m.week = 3 AND m.day_number = 3;

-- Week 3 Day 4: Customer Avatar
INSERT INTO mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, s.sprint_order, s.sprint_type, s.title, s.content, s.estimated_seconds, s.quiz_questions::jsonb, s.lab_instructions
FROM missions m
CROSS JOIN (VALUES
    (1, 'content', '👤 Meet Your Perfect Customer', 
     '## Creating a Customer Avatar! 🎭

A **Customer Avatar** is like creating a character for your perfect customer!

**Example Avatar - "Homework Harry":**
- Age: 12
- Problem: Always forgets homework
- Wants: To stop getting in trouble
- Likes: Games, YouTube, Soccer
- Tech Level: Uses phone a lot

When you know your avatar, you know EXACTLY who you''re building for!',
     60,
     '[{"question": "What is a customer avatar?", "options": ["A video game character", "A detailed description of your perfect customer", "A robot customer", "Your profile picture"], "correctIndex": 1}]',
     NULL),
    (2, 'quiz', '📝 Avatar Details', 
     '## What to Include in Your Avatar

**Must Have:**
- Name (make one up!)
- Age
- Main problem
- What they want
- What they like

**Bonus:**
- Where they hang out online
- What they spend money on
- Who influences them

The more you know, the better you can help them!',
     45,
     '[{"question": "Why give your avatar a made-up name?", "options": ["Because it''s fun", "So you can remember and talk about them like a real person", "Because you have to", "To keep it secret"], "correctIndex": 1}]',
     NULL),
    (3, 'lab', '🤖 Create Your Avatar', 
     '## Build Your Customer Avatar with AI! 🎨',
     90,
     NULL,
     'Copy and paste this prompt:\n\n"Help me create a Customer Avatar for my [your idea] targeting [your customer type].\n\nGive my avatar:\n- A fun name\n- Age and grade\n- Their biggest problem with [your problem area]\n- What they wish existed\n- Their hobbies and interests\n- Where they spend time online\n- One quote they might say\n\nMake it detailed but fun for a kid to read!"'),
    (4, 'reflection', '👥 You Know Your Customer!', 
     '## Your Avatar is Ready! 🎉

Now when you build, you can ask: "Would [Avatar Name] like this?"

**You Created:**
- ✅ A detailed customer avatar
- ✅ Understanding of their problems
- ✅ Knowledge of what they want

**Tomorrow:** Time to put it all together in a MARKET MAP! 🗺️',
     30,
     NULL,
     NULL)
) AS s(sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
WHERE m.track = 'junior' AND m.week = 3 AND m.day_number = 4;

-- Week 3 Day 5: Market Map
INSERT INTO mission_sprints (mission_id, sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
SELECT m.id, s.sprint_order, s.sprint_type, s.title, s.content, s.estimated_seconds, s.quiz_questions::jsonb, s.lab_instructions
FROM missions m
CROSS JOIN (VALUES
    (1, 'content', '🗺️ Your Market Map!', 
     '## Put It All Together! 📊

A **Market Map** is like a treasure map for your business!

**Your Map Shows:**
- 🎯 Who your customer is
- 🔍 Who your competition is
- ⭐ What makes you special
- 💰 How you''ll make money

When investors or adults ask about your business, you''ll have ALL the answers!',
     60,
     '[{"question": "What does a Market Map help you understand?", "options": ["Just your idea", "Everything: customers, competition, pricing, and what makes you special", "Only your competitors", "Nothing important"], "correctIndex": 1}]',
     NULL),
    (2, 'quiz', '📋 Map Components', 
     '## Your Market Map Has 4 Parts:

**1. Customer:** Who buys from you
**2. Problem:** What you''re solving
**3. Competition:** Who else solves this
**4. Advantage:** Your superpower

Put these together and you have a complete picture of your market!',
     45,
     '[{"question": "What''s NOT typically on a Market Map?", "options": ["Customer description", "Your competition", "What you ate for breakfast", "Your superpower"], "correctIndex": 2}]',
     NULL),
    (3, 'lab', '🤖 Generate Your Market Map', 
     '## Create Your Complete Market Map! 🗺️',
     90,
     NULL,
     'Copy and paste this prompt:\n\n"Help me create a Market Map for my startup:\n\n**My Idea:** [your idea]\n**Target Customer:** [your avatar name and description]\n**Competition:** [list 2-3 competitors]\n**My Superpower:** [what makes you different]\n**Pricing:** [your pricing model]\n\nCreate a simple, visual market map I can show to others. Use emojis and make it fun for a kid to present!"'),
    (4, 'reflection', '🎓 Week 3 Complete!', 
     '## You''re a Market Research Expert! 🏆

This week you learned HUGE business skills:
- ✅ How to research competition
- ✅ How to find your superpower
- ✅ How to think about pricing
- ✅ How to create a customer avatar
- ✅ How to make a Market Map!

**You''re ready to start BUILDING!** 🚀

Next week: DESIGN TIME! Let''s draw your product! 🎨',
     30,
     NULL,
     NULL)
) AS s(sprint_order, sprint_type, title, content, estimated_seconds, quiz_questions, lab_instructions)
WHERE m.track = 'junior' AND m.week = 3 AND m.day_number = 5;

-- Update sprint_count for weeks 2-3
UPDATE missions SET sprint_count = 4 WHERE track = 'junior' AND week IN (2, 3);
