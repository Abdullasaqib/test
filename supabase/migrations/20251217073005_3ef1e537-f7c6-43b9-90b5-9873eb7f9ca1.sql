
-- Seed sprints for Lesson 3: What is Entrepreneurial Opportunity?
INSERT INTO certification_lesson_sprints (lesson_id, sprint_order, title, content, age_track, estimated_seconds, quiz_questions) VALUES
('29092fea-0087-4277-b28a-b2fc09a37382', 1, 'Problems Are Opportunities', 'Every successful business started by solving a problem someone had. Sara Blakely noticed her underwear lines showed through white pants—she invented Spanx and became a billionaire.

**Your Mission:** Think about problems you or people you know face daily. These are business opportunities waiting to be discovered.

The best problems to solve are:
- **Frequent** - happens often
- **Painful** - really bothers people  
- **Valuable** - people would pay to fix it', 'all', 300, '[{"question": "What makes a problem worth solving as a business?", "options": ["It only affects you", "It is frequent, painful, and valuable", "It is easy to ignore", "It requires no effort to fix"], "correctIndex": 1}]'),

('29092fea-0087-4277-b28a-b2fc09a37382', 2, 'Customer Segments', 'Not everyone has the same problems. A teenager and a grandparent face different challenges.

**Customer Segment** = A group of people who share similar characteristics and problems.

Example: "Busy parents with young kids" is a customer segment. They might need:
- Quick meal solutions
- Scheduling help
- Childcare options

**Your Task:** Pick a customer segment you understand well. What problems do they face?', 'all', 300, '[{"question": "What is a customer segment?", "options": ["Anyone who buys things", "A group sharing similar characteristics and problems", "Only rich people", "People who complain a lot"], "correctIndex": 1}]'),

('29092fea-0087-4277-b28a-b2fc09a37382', 3, 'Problem Generation Activity', 'Time to brainstorm! Use this framework:

**Step 1:** Pick your customer segment
**Step 2:** List 10 problems they face
**Step 3:** Rate each problem:
- Frequency (1-5): How often does it happen?
- Pain (1-5): How much does it bother them?
- Value (1-5): Would they pay to fix it?

**Pro Tip:** The best problems score 4+ on all three dimensions.', 'all', 360, '[{"question": "When rating problems, which combination indicates the best opportunity?", "options": ["Low frequency, high pain", "High on all three: frequency, pain, and value", "Only high frequency matters", "Problems only you experience"], "correctIndex": 1}]');

-- Seed sprints for Lesson 4: How to Find Business Opportunities
INSERT INTO certification_lesson_sprints (lesson_id, sprint_order, title, content, age_track, estimated_seconds, quiz_questions) VALUES
('cf024530-ce43-4fbe-ba6d-ad601b2f748e', 1, 'Jobs to Be Done Theory', 'People don''t buy products—they "hire" them to do a job.

**Example:** People don''t buy a drill because they want a drill. They buy it because they want a hole in the wall. The "job to be done" is making the hole.

**Milkshake Example:** McDonald''s discovered people bought milkshakes in the morning to make boring commutes more interesting. The "job" wasn''t nutrition—it was entertainment!

**Your Task:** Think about something you bought recently. What "job" did you hire it to do?', 'all', 300, '[{"question": "According to Jobs to Be Done theory, why do people buy products?", "options": ["Because they like shopping", "To hire the product to accomplish a specific job", "Products are always on sale", "They enjoy collecting things"], "correctIndex": 1}]'),

('cf024530-ce43-4fbe-ba6d-ad601b2f748e', 2, 'Disruptive Innovation', 'Some of the biggest companies started by being "worse" than existing options!

**Airbnb** started with air mattresses on floors—way worse than hotels. But it was cheaper and more personal.

**Netflix** started with slow mail delivery—worse than Blockbuster for instant rentals. But no late fees and huge selection.

**The Pattern:** Start simple, serve people ignored by big companies, then improve over time.', 'all', 300, '[{"question": "What is disruptive innovation?", "options": ["Building the best product immediately", "Starting simple and improving over time to challenge established companies", "Copying what big companies do", "Making expensive luxury products"], "correctIndex": 1}]'),

('cf024530-ce43-4fbe-ba6d-ad601b2f748e', 3, 'Opportunity Canvas', 'Use this canvas to evaluate your opportunity:

**1. Customer:** Who has this problem?
**2. Problem:** What frustrates them?
**3. Current Solutions:** What do they use now?
**4. Your Idea:** How would you solve it better?
**5. Unfair Advantage:** Why can YOU win?

**Example - Izzy Wheels:**
- Customer: Wheelchair users
- Problem: Wheelchairs look medical, not fashionable
- Solution: Designer wheel covers
- Advantage: Sisters who understand the frustration firsthand', 'all', 360, '[{"question": "Why is having an unfair advantage important?", "options": ["It is not important", "It explains why you specifically can win against competitors", "It makes you seem unfair", "It means cheating"], "correctIndex": 1}]');

-- Seed sprints for Lesson 5: Drafting Your Business Plan
INSERT INTO certification_lesson_sprints (lesson_id, sprint_order, title, content, age_track, estimated_seconds, quiz_questions) VALUES
('b2774948-5fb3-42f1-9aa5-acfc257e6d12', 1, 'The Lean Startup Canvas', 'Forget 50-page business plans. Modern founders use a **one-page canvas**.

**9 Key Boxes:**
1. **Problem** - Top 3 problems you solve
2. **Customer Segments** - Who has these problems
3. **Value Proposition** - Why you''re different
4. **Solution** - Your product/service
5. **Channels** - How customers find you
6. **Revenue Streams** - How you make money
7. **Cost Structure** - What you spend
8. **Key Metrics** - How you measure success
9. **Unfair Advantage** - What can''t be copied

**Pro Tip:** Fill this out in pencil—it will change as you learn!', 'all', 360, '[{"question": "Why do modern founders prefer a one-page canvas over long business plans?", "options": ["They are lazy", "Business plans are illegal", "It is flexible and changes as you learn", "Investors hate reading"], "correctIndex": 2}]'),

('b2774948-5fb3-42f1-9aa5-acfc257e6d12', 2, 'Revenue Models', 'How will your business make money? Here are common models:

**1. One-Time Purchase** - Customer pays once (Nike shoes)
**2. Subscription** - Monthly/yearly payments (Netflix)
**3. Freemium** - Free basic, paid premium (Spotify)
**4. Marketplace** - Take a cut of transactions (Uber)
**5. Advertising** - Free product, sell attention (Instagram)

**Your Task:** Which revenue model fits your idea?', 'all', 300, '[{"question": "What is a freemium revenue model?", "options": ["Everything is free forever", "Everything requires payment", "Basic is free, premium features cost money", "Only ads generate revenue"], "correctIndex": 2}]'),

('b2774948-5fb3-42f1-9aa5-acfc257e6d12', 3, 'Building Your Canvas', 'Time to create YOUR Lean Canvas!

**Start with what you know:**
1. Problem - Write 1-3 problems from your research
2. Customer Segments - Who experiences these most?
3. Solution - How will you solve it?

**Then think about business:**
4. Value Proposition - Finish this: "Unlike [competitors], we [your difference]"
5. Revenue - How will you charge?
6. Costs - What do you need to build it?

**Remember:** This is a hypothesis, not a final answer!', 'all', 360, '[{"question": "What should your Value Proposition explain?", "options": ["Your entire life story", "How you are different from competitors", "Technical specifications only", "Why you need investment"], "correctIndex": 1}]');

-- Seed sprints for Lesson 6: Your Elevator Pitch
INSERT INTO certification_lesson_sprints (lesson_id, sprint_order, title, content, age_track, estimated_seconds, quiz_questions) VALUES
('63d68e71-feda-439c-b73e-5ef2fbcf9cb5', 1, 'The 60-Second Story', 'An elevator pitch is your business idea explained in 60 seconds or less—the time of an elevator ride.

**The Formula:**
"For [customer] who [problem], [product name] is a [category] that [solution]. Unlike [competitor], we [unique difference]."

**Example:**
"For busy parents who struggle to cook healthy meals, MealBot is an app that suggests 15-minute recipes from ingredients you already have. Unlike meal kit services, we don''t require subscriptions or grocery deliveries."

**Key:** Practice until you can say it naturally, not memorized.', 'all', 300, '[{"question": "How long should an elevator pitch be?", "options": ["5 minutes", "60 seconds or less", "As long as needed", "30 minutes minimum"], "correctIndex": 1}]'),

('63d68e71-feda-439c-b73e-5ef2fbcf9cb5', 2, 'Problem-Solution Narrative', 'Great pitches tell a story:

**1. Hook** - Start with a surprising fact or question
"Did you know 40% of food in American homes goes to waste?"

**2. Problem** - Make them feel the pain
"Families throw away $1,500 of groceries every year because they forget what''s in their fridge."

**3. Solution** - Your hero moment
"FreshTrack uses AI to track your fridge contents and suggests recipes before food expires."

**4. Ask** - What do you need?
"We''re looking for 50 families to test our beta."', 'all', 300, '[{"question": "What is the purpose of a hook in your pitch?", "options": ["To confuse the audience", "To grab attention with a surprising fact or question", "To list all your features", "To ask for money immediately"], "correctIndex": 1}]'),

('63d68e71-feda-439c-b73e-5ef2fbcf9cb5', 3, 'Pitch Practice', 'Time to craft YOUR elevator pitch!

**Fill in the blanks:**

For _____________ (customer segment)
who _____________ (problem they face),
_____________ (your product name)
is a _____________ (category)
that _____________ (how you solve it).
Unlike _____________ (current alternatives),
we _____________ (your unique advantage).

**Tips for Delivery:**
- Speak slowly and clearly
- Make eye contact
- Show enthusiasm
- Practice with a timer

**Goal:** Pitch to 3 people this week!', 'all', 360, '[{"question": "What should you do after writing your elevator pitch?", "options": ["Never practice it", "Practice with real people and get feedback", "Only use it once", "Make it longer each time"], "correctIndex": 1}]');

-- Seed sprints for Lesson 9: Bring Your Prompt to Life with Base44
INSERT INTO certification_lesson_sprints (lesson_id, sprint_order, title, content, age_track, estimated_seconds, quiz_questions) VALUES
('f1ef9732-cf43-439a-878d-afe94b0a1c21', 1, 'From Prompt to Product', 'You''ve learned the BASE Framework. Now it''s time to BUILD.

**The Magic Moment:** When your prompt becomes a real, working product that people can use.

**Base44 Building Steps:**
1. Open Base44 (you have $48 in credits!)
2. Paste your refined prompt
3. Watch AI generate your app
4. Test it yourself
5. Make improvements

**Remember:** Your first version won''t be perfect. That''s okay! Founders iterate—they build, test, and improve.', 'all', 300, '[{"question": "What should you expect from your first version?", "options": ["Perfection", "It will need improvements and that is okay", "Immediate millions of users", "No changes ever needed"], "correctIndex": 1}]'),

('f1ef9732-cf43-439a-878d-afe94b0a1c21', 2, 'Testing Your Build', 'Your app is generated. Now test it like a real user would:

**Testing Checklist:**
✅ Does it solve the problem you described?
✅ Can you complete the main action easily?
✅ Does it look professional?
✅ Would you show this to a potential customer?

**Common Issues:**
- Missing features → Refine your prompt, be more specific
- Confusing layout → Add clarity to your End Goal
- Wrong style → Describe the look you want

**Pro Tip:** Screenshot what''s wrong and tell Base44 exactly what to change.', 'all', 300, '[{"question": "What should you do if features are missing from your build?", "options": ["Give up", "Refine your prompt to be more specific", "Blame the AI", "Start a completely different project"], "correctIndex": 1}]'),

('f1ef9732-cf43-439a-878d-afe94b0a1c21', 3, 'Iterate and Improve', 'Great founders never stop improving. Here''s how:

**The Build-Measure-Learn Loop:**
1. **Build** - Create a version
2. **Measure** - Get feedback from real users
3. **Learn** - Understand what works and what doesn''t
4. **Repeat** - Build the next version

**Getting Feedback:**
- Show to 5 potential users
- Ask: "What''s confusing?"
- Ask: "What would make this better?"
- Ask: "Would you use this?"

**Your Goal:** Get 3 people to try your app this week!', 'all', 360, '[{"question": "What is the Build-Measure-Learn loop?", "options": ["Build once and never change", "Continuously build, get feedback, learn, and improve", "Only measure profits", "Learn everything before building"], "correctIndex": 1}]');

-- Seed sprints for Lesson 10: Present Your Venture Opportunity
INSERT INTO certification_lesson_sprints (lesson_id, sprint_order, title, content, age_track, estimated_seconds, quiz_questions) VALUES
('7b2eed8c-cc58-4017-bbe5-84faa5181e81', 1, 'The Pitch Structure', 'You''ve built something real. Now present it to the world!

**5-Minute Pitch Structure:**
1. **Hook** (15 sec) - Grab attention
2. **Problem** (45 sec) - Show the pain
3. **Solution** (60 sec) - Demo your product
4. **Market** (30 sec) - Who needs this?
5. **Traction** (30 sec) - What have you achieved?
6. **Team** (30 sec) - Why you?
7. **Ask** (30 sec) - What do you need?

**Total:** 5 minutes that could change everything.', 'all', 300, '[{"question": "What is the first thing you should do in a pitch?", "options": ["Ask for money", "Show your resume", "Grab attention with a hook", "Explain technical details"], "correctIndex": 2}]'),

('7b2eed8c-cc58-4017-bbe5-84faa5181e81', 2, 'Demo Like a Pro', 'The product demo is your star moment. Make it count!

**Demo Best Practices:**
- Show, don''t tell ("Watch how easy this is...")
- Focus on ONE main flow
- Prepare for tech failures (have screenshots ready)
- Practice until it''s smooth

**What to Show:**
1. The problem (before state)
2. Using your solution (the action)
3. The result (after state)

**Time Limit:** Keep demos under 60 seconds. Leave them wanting more!', 'all', 300, '[{"question": "How long should your product demo be?", "options": ["10 minutes minimum", "Under 60 seconds", "As long as possible", "Skip the demo entirely"], "correctIndex": 1}]'),

('7b2eed8c-cc58-4017-bbe5-84faa5181e81', 3, 'Peer Presentation Practice', 'Before Demo Day, practice with peers!

**Peer Review Process:**
1. Present your 5-minute pitch
2. Peers take notes on:
   - What was clear?
   - What was confusing?
   - What excited them?
   - What questions do they have?
3. Get honest feedback
4. Improve and repeat

**Feedback Rules:**
- Be specific ("The market size was confusing" not "It was bad")
- Be kind but honest
- Focus on making it better

**Your Goal:** Practice your pitch 5 times before Demo Day!', 'all', 360, '[{"question": "What is the purpose of peer review before Demo Day?", "options": ["To discourage presenters", "To get honest feedback and improve your pitch", "To copy other ideas", "To waste time"], "correctIndex": 1}]');

-- Seed AI Coach knowledge base entries for Base44 curriculum
INSERT INTO ai_coach_knowledge (title, category, content, tags, priority) VALUES
('BASE Framework Reference', 'prompt-engineering', 'The BASE Framework helps create effective AI prompts: Be Specific (context, background, details), Address the Problem (what needs solving, for whom), Structure the Workflow (step-by-step actions), End Goal (desired outcome and format). Use this framework when prompting any AI tool.', ARRAY['base44', 'prompts', 'framework'], 1),
('Jobs to Be Done Theory', 'business-concepts', 'People hire products to do jobs. The job is the progress someone wants to make in a particular circumstance. Example: People buy drills to make holes, not to own drills. McDonald milkshake study showed commuters hired milkshakes for entertainment, not nutrition.', ARRAY['jtbd', 'customer-discovery', 'innovation'], 2),
('Disruptive Innovation', 'business-concepts', 'Start simple, serve underserved customers, improve over time. Airbnb started with air mattresses (worse than hotels), Netflix with slow mail (worse than Blockbuster for instant). The pattern: be cheaper/simpler for ignored customers, then improve to challenge incumbents.', ARRAY['innovation', 'strategy', 'growth'], 2),
('Lean Canvas Elements', 'business-planning', 'One-page business plan with 9 boxes: Problem (top 3), Customer Segments, Value Proposition (unlike X we Y), Solution, Channels (how customers find you), Revenue Streams, Cost Structure, Key Metrics, Unfair Advantage.', ARRAY['lean-startup', 'canvas', 'planning'], 1),
('Elevator Pitch Formula', 'pitching', 'Formula: For [customer] who [problem], [product] is a [category] that [solution]. Unlike [competitor], we [difference]. Keep to 60 seconds. Start with hook (surprising fact), show problem pain, present solution, make the ask.', ARRAY['pitch', 'communication', 'storytelling'], 1),
('Revenue Models Overview', 'business-concepts', 'Common models: One-time purchase (Nike), Subscription (Netflix), Freemium (Spotify), Marketplace/commission (Uber), Advertising (Instagram). Choose based on: customer willingness to pay, payment frequency, perceived fairness.', ARRAY['revenue', 'monetization', 'business-model'], 2),
('Build-Measure-Learn Loop', 'methodology', 'From Lean Startup: Build a version, Measure results with real users, Learn what works/doesn''t, Repeat. Ask users: What''s confusing? What would make it better? Would you use this? Goal: rapid iteration based on real feedback.', ARRAY['lean-startup', 'iteration', 'feedback'], 1),
('Demo Day Preparation', 'pitching', '5-minute structure: Hook (15s), Problem (45s), Solution demo (60s), Market (30s), Traction (30s), Team (30s), Ask (30s). Demo tips: show don''t tell, focus on one flow, prepare backup screenshots, keep under 60s.', ARRAY['demo-day', 'presentation', 'pitch'], 1),
('Weak vs Strong Prompts', 'prompt-engineering', 'Weak: vague, missing context, unclear goals. Strong: specific context, clear problem, structured steps, defined outcome. Example weak: "Make me an app". Example strong: "Build a study planner for high school students that lets them add classes, assignments with due dates, and sends reminders 24 hours before".', ARRAY['prompts', 'base44', 'ai-tools'], 1),
('Problem Worth Solving Criteria', 'customer-discovery', 'Rate problems on 3 dimensions (1-5 each): Frequency (how often), Pain (how much it bothers), Value (willingness to pay). Golden opportunities score 4+ on all three. Sara Blakely noticed underwear lines through white pants—high frequency, pain, value = Spanx.', ARRAY['problems', 'validation', 'opportunity'], 2),
('Customer Segment Definition', 'customer-discovery', 'Customer segment = group sharing similar characteristics and problems. Be specific: not "everyone" but "busy parents with kids under 5" or "college students living on campus". The more specific, the better you can understand and solve their problems.', ARRAY['customers', 'segments', 'targeting'], 2),
('Professional Context Prompting', 'prompt-engineering', 'When building for work: specify industry context, compliance needs, integration requirements, user roles. Example: "Build an expense tracker for small consulting firms that exports to QuickBooks, tracks project codes, and requires manager approval over $500".', ARRAY['professional', 'enterprise', 'b2b'], 3);
