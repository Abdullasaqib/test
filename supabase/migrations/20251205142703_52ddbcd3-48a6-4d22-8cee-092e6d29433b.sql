
-- Update Junior Track (Ages 9-11): Fun, simple, kid-friendly content
-- Week 1: Welcome to AI Building
UPDATE public.missions SET 
  title = '🎉 Welcome Future Builder!',
  subtitle = 'Your Amazing Journey Starts Today',
  micro_content = 'Hey there, future inventor! 🌟 You''re about to learn something SUPER cool - how to use AI (that''s like a really smart robot helper) to build your very own apps and businesses! Think about your favorite apps - games, drawing tools, or fun videos. Someone just like you dreamed those up! In this program, YOU''ll be the inventor. You''ll find problems to solve, build cool things with AI helpers, and maybe even start your own mini-business. How awesome is that?',
  lab_prompt = '🎨 Draw or write about your DREAM invention! What would it do? Who would use it? Don''t worry about HOW to build it yet - just dream BIG! Share your idea with your AI Coach friend and see what fun suggestions it has!',
  estimated_minutes = 20
WHERE track = 'junior' AND week = 1 AND day = 1;

UPDATE public.missions SET 
  title = '🔍 Problem Detective',
  subtitle = 'Finding Problems is a Superpower!',
  micro_content = 'Did you know that EVERY cool invention started because someone noticed a problem? 🕵️ The person who invented the umbrella noticed people getting wet in the rain. The person who invented video games wanted a more fun way to play! Today, you become a Problem Detective. Your mission: spot things that bug people, things that are too slow, or things that could be WAY more fun!',
  lab_prompt = '🔎 Be a detective today! Walk around your house or school and find 5 problems. Maybe it''s hard to find matching socks? Or your toys are always messy? Write them down and pick your FAVORITE problem. Tell your AI Coach about it!',
  estimated_minutes = 20
WHERE track = 'junior' AND week = 1 AND day = 2;

UPDATE public.missions SET 
  title = '💬 Ask Your AI Friend',
  subtitle = 'Meet Your Super Smart Helper',
  micro_content = 'Time to meet your new best friend - your AI Coach! 🤖 Think of AI like a super smart helper who knows TONS of stuff and loves to brainstorm with you. The cool thing is, the better you ask questions, the better answers you get! It''s like a magic genie - you need to make good wishes!',
  lab_prompt = '🗣️ Let''s practice talking to AI! Open the AI Coach and try these: "Help me think of fun problems kids have at school" then "What if we could make [your problem] into a game?" See how the AI helps you think bigger!',
  estimated_minutes = 15
WHERE track = 'junior' AND week = 1 AND day = 3;

UPDATE public.missions SET 
  title = '🎯 Pick Your Problem',
  subtitle = 'Choose Your Adventure',
  micro_content = 'Now comes the exciting part - picking THE problem you want to solve! 🎯 Good problems to pick are ones that: 1) Bug you or your friends a LOT, 2) Happen often (not just once), 3) You actually care about fixing! The best inventors solve problems they personally understand.',
  lab_prompt = '⭐ Look at your problem list from Day 2. Ask your AI Coach: "Which of these problems would be most fun to solve: [list your problems]?" Then pick ONE problem you''re excited about and create a colorful Problem Card!',
  estimated_minutes = 20
WHERE track = 'junior' AND week = 1 AND day = 4;

UPDATE public.missions SET 
  title = '🌟 Week 1 Champion!',
  subtitle = 'Celebrate Your First Steps',
  micro_content = 'WOW! Look at you go! 🎊 In just one week, you went from regular kid to PROBLEM DETECTIVE with an AI sidekick! You learned that great inventions start with noticing problems, and you picked YOUR special problem to solve. That''s exactly how real entrepreneurs start!',
  lab_prompt = '🏆 Reflection time! Tell your AI Coach: "I chose to solve [your problem] because..." Then ask it: "What might my solution look like?" Draw a quick picture of your dream solution!',
  estimated_minutes = 15
WHERE track = 'junior' AND week = 1 AND day = 5;

-- Week 2: AI Customer Discovery
UPDATE public.missions SET 
  title = '👋 Who Has This Problem?',
  subtitle = 'Finding Your Problem Buddies',
  micro_content = 'Your problem probably bugs other people too! 👥 These people are called "customers" - the people who would LOVE your solution. Today, we figure out WHO exactly has your problem. Is it kids your age? Parents? Teachers? The more you know about them, the better you can help them!',
  lab_prompt = '🎭 Create a "Customer Buddy" profile! Draw a picture of someone who has your problem. Give them a name, age, and hobbies. Ask your AI Coach: "What would a kid named [name] who has [problem] wish for?"',
  estimated_minutes = 20
WHERE track = 'junior' AND week = 2 AND day = 1;

UPDATE public.missions SET 
  title = '🎤 Interview Practice',
  subtitle = 'Become a Friendly Reporter',
  micro_content = 'The BEST way to understand your customers is to talk to them! 🎙️ But asking good questions is a skill. Bad question: "Do you like my idea?" (They''ll just say yes to be nice!) Good question: "Tell me about a time when [problem] really bugged you." See the difference?',
  lab_prompt = '📝 Ask your AI Coach: "Help me write 5 fun questions to ask kids about [your problem]." Then practice interviewing a family member or friend. Write down what surprised you!',
  estimated_minutes = 25
WHERE track = 'junior' AND week = 2 AND day = 2;

UPDATE public.missions SET 
  title = '🔬 What Did You Learn?',
  subtitle = 'Detective Notes Time',
  micro_content = 'Time to look at your interview clues! 🔍 Great detectives don''t just collect clues - they study them! What did people say that surprised you? Did everyone have the SAME problem or different versions? This is called "finding patterns" and it''s super important!',
  lab_prompt = '📊 Share your interview answers with your AI Coach: "Here''s what people said about [problem]: [answers]. What patterns do you see?" Create a fun poster showing what you learned!',
  estimated_minutes = 20
WHERE track = 'junior' AND week = 2 AND day = 3;

UPDATE public.missions SET 
  title = '💡 Solution Brainstorm',
  subtitle = 'Dreaming Up Answers',
  micro_content = 'NOW the fun part - thinking up solutions! 💡 Here''s a secret: the FIRST idea is rarely the best one. That''s why we brainstorm LOTS of ideas first, then pick the best one. No idea is too silly during brainstorming - sometimes the silliest ideas turn into the best ones!',
  lab_prompt = '🌈 Ask your AI Coach: "Give me 10 creative ways to solve [problem] that a kid could build!" Write them all down, even the wild ones. Circle your TOP 3 favorites. Which one makes you most excited?',
  estimated_minutes = 20
WHERE track = 'junior' AND week = 2 AND day = 4;

UPDATE public.missions SET 
  title = '📋 Your Big Idea Card',
  subtitle = 'Putting It All Together',
  micro_content = 'You''ve done SO much work! 📋 Now let''s put it all together into one awesome Big Idea Card. This is like a treasure map showing: your problem, who has it, what you learned from talking to them, and your solution idea. Real entrepreneurs call this their "value proposition"!',
  lab_prompt = '🗺️ Create your Big Idea Card! Fill in: "I help [who] solve [problem] by [solution]." Ask your AI Coach to make it sound even cooler. Decorate your card with drawings and stickers!',
  estimated_minutes = 25
WHERE track = 'junior' AND week = 2 AND day = 5;

-- Week 3: AI Market Research
UPDATE public.missions SET 
  title = '🏪 Who Else Is Solving This?',
  subtitle = 'Exploring the Competition',
  micro_content = 'Here''s a cool thing: if OTHER people are trying to solve your problem, that''s actually GOOD news! 🎉 It means the problem is real and people want solutions. Your job is to figure out what they''re doing well and what you could do BETTER or DIFFERENT!',
  lab_prompt = '🔍 Ask your AI Coach: "What apps or products exist that try to solve [problem]?" Look at 2-3 of them. What do you like? What''s missing? How could YOURS be more fun for kids?',
  estimated_minutes = 20
WHERE track = 'junior' AND week = 3 AND day = 1;

UPDATE public.missions SET 
  title = '✨ Your Special Superpower',
  subtitle = 'What Makes You Different',
  micro_content = 'Every superhero has something SPECIAL about them, right? 🦸 Your solution needs a superpower too! Maybe it''s more fun, easier to use, made BY kids FOR kids, or has a special feature no one else has. This is called your "unique value" - the thing that makes people choose YOU!',
  lab_prompt = '💪 Complete this sentence with your AI Coach: "My solution is special because unlike other solutions, mine..." Think of 3 superpowers your solution could have. Pick the BEST one!',
  estimated_minutes = 20
WHERE track = 'junior' AND week = 3 AND day = 2;

UPDATE public.missions SET 
  title = '💰 Would People Pay?',
  subtitle = 'Understanding Value',
  micro_content = 'Real businesses make money by solving problems! 💵 But before you can charge for something, you need to understand: how badly do people want this solved? Would they pay $1? $5? $20? Or maybe parents would pay for their kids? Understanding this helps you build a real business!',
  lab_prompt = '🤔 Ask your AI Coach: "How do kids'' apps usually make money?" Then ask 3 people: "How much would you pay for something that solves [problem]?" Write down their answers!',
  estimated_minutes = 20
WHERE track = 'junior' AND week = 3 AND day = 3;

UPDATE public.missions SET 
  title = '📊 Market Size Fun',
  subtitle = 'How Many People Need This?',
  micro_content = 'Imagine you''re selling lemonade. Would you rather sell to 10 people or 1000 people? 🍋 That''s why we figure out HOW MANY people have your problem. More people = bigger opportunity! We call this "market size" - don''t worry, we''ll make the math fun!',
  lab_prompt = '🔢 Ask your AI Coach: "About how many [your customer type] are there who might have [problem]?" Make a fun poster showing your market size. Draw stick figures to represent all those people!',
  estimated_minutes = 20
WHERE track = 'junior' AND week = 3 AND day = 4;

UPDATE public.missions SET 
  title = '📝 Business Model Basics',
  subtitle = 'How Your Business Works',
  micro_content = 'A business model is like a recipe for your business! 🍰 It answers: Who do you help? What do you give them? How do they pay you? Don''t worry - it doesn''t need to be complicated. Even a lemonade stand has a business model!',
  lab_prompt = '📋 Create a simple Business Recipe with your AI Coach! Fill in: "I help [who] with [what]. They pay me by [how]. I''m different because [why]." Draw your business recipe like a real recipe card!',
  estimated_minutes = 25
WHERE track = 'junior' AND week = 3 AND day = 5;

-- Week 4: AI Solution Design
UPDATE public.missions SET 
  title = '✏️ Sketch Your Solution',
  subtitle = 'Drawing Your Dream App',
  micro_content = 'Before builders make a house, they draw pictures of it first! 🏠 That''s exactly what we''re doing today. We''re going to SKETCH what your solution looks like. Don''t worry about making it pretty - we just want to get our ideas on paper!',
  lab_prompt = '🎨 Draw 3 screens of your app or solution. What does someone see FIRST? What buttons are there? What happens when they click? Ask your AI Coach: "What screens should my [solution] have?"',
  estimated_minutes = 25
WHERE track = 'junior' AND week = 4 AND day = 1;

UPDATE public.missions SET 
  title = '🎮 Make It Fun!',
  subtitle = 'Adding Game Magic',
  micro_content = 'You know what makes apps AWESOME? When they feel like games! 🎮 Points, badges, levels, rewards - these all make people want to come back. Think about your favorite games. What makes them so fun? Can we add some of that magic to YOUR solution?',
  lab_prompt = '🏆 Ask your AI Coach: "How can I make [your solution] feel more like a game?" Add points, badges, or rewards to your sketch. What would users earn? What levels could they reach?',
  estimated_minutes = 20
WHERE track = 'junior' AND week = 4 AND day = 2;

UPDATE public.missions SET 
  title = '🎨 Colors and Style',
  subtitle = 'Making It Look Awesome',
  micro_content = 'Time to make your solution BEAUTIFUL! 🌈 Colors affect how people feel. Blue = calm and trustworthy. Red = exciting and urgent. Green = natural and healthy. What feeling do you want YOUR solution to give people?',
  lab_prompt = '🖍️ Pick 3 main colors for your solution. Ask your AI Coach: "What colors would be good for a [type of solution] for [audience]?" Create a colorful style guide with your chosen colors!',
  estimated_minutes = 20
WHERE track = 'junior' AND week = 4 AND day = 3;

UPDATE public.missions SET 
  title = '🗺️ User Journey Map',
  subtitle = 'Walking in Their Shoes',
  micro_content = 'Imagine someone using your solution for the FIRST time. 🚶 What do they see? What do they click? How do they feel? This is called a "user journey" and it helps you make sure your solution is easy and fun to use from start to finish!',
  lab_prompt = '🎬 Create a mini comic strip showing someone using your solution! Panel 1: They have the problem. Panel 2: They find your solution. Panel 3: They use it. Panel 4: They''re happy! Ask your AI Coach for help!',
  estimated_minutes = 25
WHERE track = 'junior' AND week = 4 AND day = 4;

UPDATE public.missions SET 
  title = '📄 Build Your Blueprint',
  subtitle = 'Ready to Build!',
  micro_content = 'You''ve done AMAZING work! 🎉 Now let''s put everything into a Blueprint - like instructions for building your solution. This will help you when we start ACTUALLY building next week. Real builders always follow a blueprint!',
  lab_prompt = '📐 Create your Solution Blueprint with your AI Coach! Include: what it does, who it''s for, the main screens, the colors, and one fun feature. Make it look official with a "Created by [your name]" at the bottom!',
  estimated_minutes = 25
WHERE track = 'junior' AND week = 4 AND day = 5;

-- Week 5: MVP Builder (Vibe Coding)
UPDATE public.missions SET 
  title = '🔨 Meet Glide!',
  subtitle = 'Your Building Tool',
  micro_content = 'TODAY IS THE DAY! 🎊 You''re going to start actually BUILDING your solution. We''re using a magical tool called Glide that turns spreadsheets into apps - no coding needed! Just drag, drop, and BOOM - you have an app!',
  lab_prompt = '🚀 Go to glideapps.com and sign up for free! Watch the quick tutorial. Ask your AI Coach: "Help me plan what data my [solution] app needs in a spreadsheet." Create your first Glide project!',
  estimated_minutes = 30
WHERE track = 'junior' AND week = 5 AND day = 1;

UPDATE public.missions SET 
  title = '📱 Your First Screen',
  subtitle = 'Building the Home Page',
  micro_content = 'Every great app starts with ONE screen! 📱 Today you''re building the home screen - the first thing people see when they open your app. Make it welcoming, clear, and exciting! Show them what your app does right away.',
  lab_prompt = '🏠 In Glide, create your home screen! Add a title, a picture, and buttons for the main things users can do. Ask your AI Coach: "What should be on the home screen of my [solution] app?"',
  estimated_minutes = 30
WHERE track = 'junior' AND week = 5 AND day = 2;

UPDATE public.missions SET 
  title = '➕ Add More Screens',
  subtitle = 'Expanding Your App',
  micro_content = 'Your app is growing! 🌱 Now let''s add more screens for different features. Think about what your users need to DO in your app. Each main action usually needs its own screen!',
  lab_prompt = '📱 Add 2-3 more screens to your Glide app. Maybe a list screen, a detail screen, or a form? Ask your AI Coach: "What other screens does my [solution] app need?" Build them!',
  estimated_minutes = 30
WHERE track = 'junior' AND week = 5 AND day = 3;

UPDATE public.missions SET 
  title = '🎯 Make It Work',
  subtitle = 'Adding Real Features',
  micro_content = 'An app isn''t just screens - it needs to DO something! 🎯 Today we connect everything so users can actually add data, click buttons that work, and see their information saved. This is where your app comes ALIVE!',
  lab_prompt = '⚡ Make your Glide app interactive! Add forms for users to enter data, lists that show their stuff, and buttons that do things. Test everything yourself. Ask your AI Coach if you get stuck!',
  estimated_minutes = 30
WHERE track = 'junior' AND week = 5 AND day = 4;

UPDATE public.missions SET 
  title = '🎨 Polish Time!',
  subtitle = 'Making It Pretty',
  micro_content = 'Your app WORKS! Now let''s make it BEAUTIFUL! 🌟 Add your colors from Week 4, fix any ugly spots, add nice icons, and make sure everything looks professional. First impressions matter!',
  lab_prompt = '💅 Beautify your Glide app! Add your brand colors, pick nice icons, add images, and make text easy to read. Share a screenshot with your AI Coach and ask: "How can I make this look even better?"',
  estimated_minutes = 25
WHERE track = 'junior' AND week = 5 AND day = 5;

-- Week 6: Launch Pad (Vibe Coding)
UPDATE public.missions SET 
  title = '🌐 What''s a Landing Page?',
  subtitle = 'Your App''s Billboard',
  micro_content = 'Before people download an app, they visit a webpage to learn about it! 🌐 This is called a "landing page" - like a billboard for your app. It tells people what your app does and makes them want to try it!',
  lab_prompt = '🔍 Look at landing pages for 3 apps you like. What do they all have? (Big title, pictures, list of features, download button). Ask your AI Coach: "What makes a great landing page for kids?"',
  estimated_minutes = 20
WHERE track = 'junior' AND week = 6 AND day = 1;

UPDATE public.missions SET 
  title = '🚀 Build Your Page!',
  subtitle = 'AI Makes It Easy',
  micro_content = 'Here''s the MAGIC part - you can use AI to build your landing page! 🪄 Just describe what you want, and the AI helps create it. Then you customize it to make it perfect. No coding needed!',
  lab_prompt = '✨ Use the Landing Page Generator! Tell it about your app, who it''s for, and why it''s awesome. Generate your page, then look at it. What do you want to change? You can refine it!',
  estimated_minutes = 30
WHERE track = 'junior' AND week = 6 AND day = 2;

UPDATE public.missions SET 
  title = '✍️ Words That Wow',
  subtitle = 'Writing Fun Descriptions',
  micro_content = 'The WORDS on your page are super important! ✍️ They need to: 1) Grab attention fast, 2) Explain your app simply, 3) Make people excited to try it! Good words can turn visitors into users!',
  lab_prompt = '📝 Ask your AI Coach: "Help me write a fun, catchy headline for my [solution] app landing page." Then write 3 bullet points about what makes your app awesome. Add them to your page!',
  estimated_minutes = 25
WHERE track = 'junior' AND week = 6 AND day = 3;

UPDATE public.missions SET 
  title = '📸 Picture Perfect',
  subtitle = 'Adding Great Images',
  micro_content = 'People LOVE pictures! 📸 Your landing page needs images that show off your app. Screenshots of your app, happy users, or fun illustrations all work great. A picture is worth a thousand words!',
  lab_prompt = '🖼️ Take screenshots of your Glide app. Ask your AI Coach: "What other images should I add to my landing page?" Add at least 3 images to your page. Make sure they show why your app is cool!',
  estimated_minutes = 25
WHERE track = 'junior' AND week = 6 AND day = 4;

UPDATE public.missions SET 
  title = '🎊 Launch Day Prep',
  subtitle = 'Getting Ready to Share',
  micro_content = 'Your landing page is ready! 🎊 Before we share it with the world, let''s do a final check. Does everything work? Is the text correct? Would YOU want to try this app if you saw this page?',
  lab_prompt = '✅ Final checklist! Test every link, read every word, look at every image. Ask a family member to look at your page - do they understand what your app does? Fix anything confusing!',
  estimated_minutes = 25
WHERE track = 'junior' AND week = 6 AND day = 5;

-- Week 7: Vibe Coder Pro
UPDATE public.missions SET 
  title = '🛠️ Feedback Fixes',
  subtitle = 'Making It Better',
  micro_content = 'Real builders listen to feedback and make things better! 🛠️ Today, you''ll show your app to 3 people and ask what they think. Then you''ll use AI to help you make smart improvements. This is called "iteration" - building, testing, improving!',
  lab_prompt = '👥 Show your app to 3 people. Ask: "What''s confusing?" and "What would you add?" Then ask your AI Coach: "People said [feedback]. How should I improve my app?" Make 2 improvements!',
  estimated_minutes = 30
WHERE track = 'junior' AND week = 7 AND day = 1;

UPDATE public.missions SET 
  title = '⚡ Supercharge Features',
  subtitle = 'Adding Cool Stuff',
  micro_content = 'Your app works, but can it be even COOLER? ⚡ Today we''re adding advanced features that make users say "WOW!" Maybe notifications, sharing, or special secret features. What would delight your users?',
  lab_prompt = '🌟 Ask your AI Coach: "What cool features could I add to my [solution] app that would surprise users?" Pick ONE feature and try to add it to your Glide app. Ask for help if you need it!',
  estimated_minutes = 30
WHERE track = 'junior' AND week = 7 AND day = 2;

UPDATE public.missions SET 
  title = '📱 Mobile Magic',
  subtitle = 'Perfect on Phones',
  micro_content = 'Most people use apps on their PHONES! 📱 Today we make sure your app looks amazing on small screens. Buttons need to be big enough to tap, text needs to be readable, and everything should fit nicely!',
  lab_prompt = '📲 Test your Glide app on a phone (or phone preview). Is everything easy to tap? Can you read all the text? Ask your AI Coach: "How do I make my app better on phones?" Fix any issues!',
  estimated_minutes = 25
WHERE track = 'junior' AND week = 7 AND day = 3;

UPDATE public.missions SET 
  title = '🔗 Connect Everything',
  subtitle = 'App + Landing Page',
  micro_content = 'Your app AND landing page need to work together! 🔗 When people click "Try the App" on your page, they should go to your app. When they''re in your app, they should be able to share your landing page. Let''s connect them!',
  lab_prompt = '🔗 Add your Glide app link to your landing page. Add a "Share" button in your app that links to your landing page. Test both! Ask your AI Coach if you need help with the links.',
  estimated_minutes = 25
WHERE track = 'junior' AND week = 7 AND day = 4;

UPDATE public.missions SET 
  title = '🎓 Vibe Coder Graduate!',
  subtitle = 'You Built Something Real!',
  micro_content = 'LOOK AT WHAT YOU DID! 🎓 In just 3 weeks, you went from an IDEA to a REAL APP with a REAL landing page! You''re now officially a Vibe Coder - someone who builds with AI. Most adults can''t do what you just did!',
  lab_prompt = '🏆 Celebrate! Take screenshots of your app and landing page. Tell your AI Coach: "I built [description]. Here''s what I learned..." Get your Vibe Coder badge! Share with family and friends!',
  estimated_minutes = 20
WHERE track = 'junior' AND week = 7 AND day = 5;

-- Week 8-12 for Junior (abbreviated updates)
UPDATE public.missions SET 
  title = '👥 First Users!',
  subtitle = 'Real People Using Your App',
  micro_content = 'Time to get REAL people using your app! 👥 Start with friends and family - they''re your first fans! Watch them use it, see where they get confused, and learn from how they interact with your creation.',
  lab_prompt = '📢 Invite 5 friends or family to try your app! Watch them use it without helping. Ask: "What did you like?" and "What was hard?" Write down everything you notice!',
  estimated_minutes = 25
WHERE track = 'junior' AND week = 8 AND day = 1;

UPDATE public.missions SET title = '📊 What Are They Doing?', subtitle = 'Understanding User Behavior', micro_content = 'Are people using your app the way you expected? 📊 Today we learn about tracking - seeing which parts of your app people use most and which parts they ignore. Data helps you make smart decisions!', lab_prompt = '📈 Check your Glide analytics if available, or ask your 5 testers: "Which screen did you use most?" and "Did you find the [feature]?" Create a simple chart of what you learned!', estimated_minutes = 20 WHERE track = 'junior' AND week = 8 AND day = 2;

UPDATE public.missions SET title = '🔧 Quick Fixes', subtitle = 'Solving User Problems', micro_content = 'Your users found problems - now let''s FIX them! 🔧 Good builders respond quickly to feedback. Pick the biggest problems and solve them today. Your users will love you for listening!', lab_prompt = '🛠️ List the top 3 problems users found. Ask your AI Coach: "How can I fix [problem] in my Glide app?" Make the fixes and let your testers know you listened!', estimated_minutes = 30 WHERE track = 'junior' AND week = 8 AND day = 3;

UPDATE public.missions SET title = '📝 User Stories', subtitle = 'Collecting Success Stories', micro_content = 'When people love your app, they have stories! 📝 These stories help convince OTHER people to try your app. "This app helped me organize my homework and my grades went up!" - that''s powerful!', lab_prompt = '🎤 Ask your happiest users: "How has this app helped you?" Write down their stories. Ask your AI Coach: "How can I turn these stories into testimonials for my landing page?"', estimated_minutes = 20 WHERE track = 'junior' AND week = 8 AND day = 4;

UPDATE public.missions SET title = '✨ Add Their Ideas', subtitle = 'Building What Users Want', micro_content = 'Your users probably have great ideas too! ✨ The best apps are built WITH users, not just FOR them. Pick the most requested feature and add it - your users will feel like part of the team!', lab_prompt = '💡 What feature did users ask for most? Ask your AI Coach: "How can I add [feature] to my Glide app?" Build it and announce it to your users. They''ll be so excited!', estimated_minutes = 30 WHERE track = 'junior' AND week = 8 AND day = 5;

-- Week 9: Growth Hacker
UPDATE public.missions SET title = '📣 Tell the World!', subtitle = 'Marketing Your App', micro_content = 'You have an amazing app - now people need to KNOW about it! 📣 Marketing is just telling people about your solution in a way that makes them want to try it. Today we learn the basics!', lab_prompt = '🎯 Ask your AI Coach: "What are fun ways a kid can market their app?" Pick 3 ideas you could actually do. Make a simple marketing plan: what will you do this week to spread the word?', estimated_minutes = 25 WHERE track = 'junior' AND week = 9 AND day = 1;

UPDATE public.missions SET title = '🎬 Make a Video', subtitle = 'Show Off Your App', micro_content = 'Videos are SUPER powerful for marketing! 🎬 A short video showing your app in action can convince people way better than just words. Plus, videos are fun to make!', lab_prompt = '📹 Create a 30-60 second video showing your app! Include: what problem it solves, how it works, and why it''s cool. Use your phone camera. Ask your AI Coach for tips on making it awesome!', estimated_minutes = 30 WHERE track = 'junior' AND week = 9 AND day = 2;

UPDATE public.missions SET title = '👫 Friend Power', subtitle = 'Word of Mouth', micro_content = 'The BEST marketing is when people tell their friends about your app! 👫 This is called "word of mouth" and it''s free! But how do you get people to share? Make it easy and rewarding!', lab_prompt = '🗣️ Add a "Share with Friends" button to your app. Ask your AI Coach: "How can I encourage my users to invite their friends?" Create a fun reward for users who bring new people!', estimated_minutes = 25 WHERE track = 'junior' AND week = 9 AND day = 3;

UPDATE public.missions SET title = '📧 Stay in Touch', subtitle = 'Keeping Users Engaged', micro_content = 'Once someone tries your app, you want them to come BACK! 📧 Sending friendly updates, announcing new features, and reminding them you exist keeps your app in their minds.', lab_prompt = '✉️ Write a friendly email to your users announcing something new or just saying thanks! Ask your AI Coach: "Help me write a fun email to my app users." Send it (or pretend send it)!', estimated_minutes = 20 WHERE track = 'junior' AND week = 9 AND day = 4;

UPDATE public.missions SET title = '📈 Track Your Growth', subtitle = 'Numbers That Matter', micro_content = 'Is your marketing working? 📈 Numbers tell the story! How many people visited your landing page? How many tried your app? How many kept using it? These numbers help you know what''s working.', lab_prompt = '📊 Create a Growth Tracker! List: # of landing page visitors, # of app users, # who came back. Ask your AI Coach: "What numbers should I track for my app?" Update your tracker!', estimated_minutes = 20 WHERE track = 'junior' AND week = 9 AND day = 5;

-- Week 10: Launch Day
UPDATE public.missions SET title = '🚀 Final Launch Checklist', subtitle = 'Ready for Liftoff', micro_content = 'Launch day is almost here! 🚀 Before a rocket launches, astronauts check EVERYTHING. Today we do our final checks: Is the app working? Landing page ready? Marketing plan set? Everything needs to be perfect!', lab_prompt = '✅ Go through the Launch Checklist with your AI Coach: App works? ✓ Landing page live? ✓ Share buttons work? ✓ Video ready? ✓ Family and friends notified? ✓ Fix anything not ready!', estimated_minutes = 25 WHERE track = 'junior' AND week = 10 AND day = 1;

UPDATE public.missions SET title = '💰 Money Talk', subtitle = 'How Will You Make Money?', micro_content = 'Real businesses make money! 💰 How will yours? Free with ads? Charge for premium features? Ask for donations? There''s no wrong answer, but you need a plan. Even kid businesses can earn real money!', lab_prompt = '💵 Decide how your app will make money. Ask your AI Coach: "What are kid-friendly ways to monetize an app about [topic]?" Write down your money plan and why you chose it.', estimated_minutes = 20 WHERE track = 'junior' AND week = 10 AND day = 2;

UPDATE public.missions SET title = '🎉 LAUNCH DAY!', subtitle = 'Share With Everyone!', micro_content = 'THIS IS IT! 🎉 The day you''ve been working toward. Today you officially launch your app to the world. Share your landing page everywhere, tell everyone you know, and celebrate this huge achievement!', lab_prompt = '🚀 LAUNCH! Share your landing page link on every platform you can. Tell family group chats, friends, teachers, everyone! Track how many people visit. Celebrate every download!', estimated_minutes = 30 WHERE track = 'junior' AND week = 10 AND day = 3;

UPDATE public.missions SET title = '📊 Launch Day Results', subtitle = 'How Did It Go?', micro_content = 'Your app is LIVE! 📊 Now let''s see how launch day went. How many people visited? How many signed up? What are people saying? Every launch has surprises - the key is learning from them!', lab_prompt = '📈 Check your numbers! Landing page visits? App users? Any messages or feedback? Ask your AI Coach: "My launch got [results]. Is that good? What should I do next?" Write your learnings!', estimated_minutes = 20 WHERE track = 'junior' AND week = 10 AND day = 4;

UPDATE public.missions SET title = '📝 Launch Story', subtitle = 'Document Your Journey', micro_content = 'You just did something AMAZING! 📝 Let''s capture this moment. Write your launch story - how it felt, what worked, what surprised you. This is a story you''ll tell forever!', lab_prompt = '📖 Write "My Launch Story" with your AI Coach''s help. Include: how you felt on launch day, what worked well, what was challenging, and what you learned. Add photos and screenshots!', estimated_minutes = 25 WHERE track = 'junior' AND week = 10 AND day = 5;

-- Week 11: Pitch Perfect
UPDATE public.missions SET title = '🎤 What''s a Pitch?', subtitle = 'Tell Your Story Fast', micro_content = 'A pitch is telling your whole business story in just a few minutes! 🎤 Imagine you meet a famous investor in an elevator - you only have 60 seconds to explain your app and make them excited. That''s a pitch!', lab_prompt = '⏱️ Practice your "elevator pitch"! In 60 seconds, explain: what problem you solve, how your app works, and why it''s awesome. Time yourself! Ask your AI Coach for feedback.', estimated_minutes = 20 WHERE track = 'junior' AND week = 11 AND day = 1;

UPDATE public.missions SET title = '🎨 Create Your Deck', subtitle = 'Pictures That Tell Stories', micro_content = 'A pitch deck is like a picture book for your business! 🎨 Each slide tells part of your story. Problem. Solution. How it works. Who loves it. What''s next. Pictures help people understand and remember!', lab_prompt = '🖼️ Use the Pitch Deck Generator! Tell it about your app and it will create slides for you. Look at each slide - does it tell your story? Customize anything that doesn''t feel right.', estimated_minutes = 30 WHERE track = 'junior' AND week = 11 AND day = 2;

UPDATE public.missions SET title = '💪 Practice, Practice!', subtitle = 'Rehearse Your Pitch', micro_content = 'Great pitchers practice A LOT! 💪 The first time you pitch, you might forget words or talk too fast. That''s totally normal! The more you practice, the more confident you''ll feel. Let''s practice!', lab_prompt = '🎤 Practice your pitch 5 times! First to your AI Coach, then to a mirror, then to a stuffed animal, then to a family member, then record yourself. Each time, try to be smoother and more confident!', estimated_minutes = 30 WHERE track = 'junior' AND week = 11 AND day = 3;

UPDATE public.missions SET title = '🤔 Tough Questions', subtitle = 'Handling Q&A', micro_content = 'After your pitch, people ask questions - sometimes TOUGH ones! 🤔 "How will you make money?" "What if someone copies you?" "Why would anyone use this?" Being ready for these makes you look super prepared!', lab_prompt = '❓ Ask your AI Coach: "What tough questions might investors ask about my [solution] app?" Practice answering each one. Remember: it''s okay to say "I don''t know yet, but I''ll find out!"', estimated_minutes = 25 WHERE track = 'junior' AND week = 11 AND day = 4;

UPDATE public.missions SET title = '🦈 Meet the Sharks!', subtitle = 'Practice in THE TANK', micro_content = 'Time to face THE TANK! 🦈 This is like Shark Tank but for practice. You''ll pitch to AI investors who will give you feedback. Don''t worry - they''re here to help you get better, not to be mean!', lab_prompt = '🎯 Go to THE TANK and do your first pitch! Start with The Mentor (easiest). Listen to the feedback carefully. What scores did you get? What can you improve? Try again tomorrow!', estimated_minutes = 30 WHERE track = 'junior' AND week = 11 AND day = 5;

-- Week 12: Demo Day
UPDATE public.missions SET title = '🎯 Polish Your Pitch', subtitle = 'Make It Perfect', micro_content = 'Demo Day is almost here! 🎯 Today we make your pitch absolutely PERFECT. Every word matters, every slide needs to shine, every second should count. Let''s polish until it sparkles!', lab_prompt = '✨ Go through your pitch deck slide by slide with your AI Coach. Ask: "How can I make this slide better?" Practice your full pitch and time it. It should be under 5 minutes!', estimated_minutes = 30 WHERE track = 'junior' AND week = 12 AND day = 1;

UPDATE public.missions SET title = '🦈 Tank Challenge', subtitle = 'Beat All Investors', micro_content = 'Can you impress ALL the sharks? 🦈 Today you try to get great scores from every investor type in THE TANK. Each has different things they care about. Learn to adapt your pitch to different audiences!', lab_prompt = '🏆 Pitch to at least 3 different investors in THE TANK today! Try to score at least 75% with each. What feedback patterns do you see? Improve and pitch again!', estimated_minutes = 35 WHERE track = 'junior' AND week = 12 AND day = 2;

UPDATE public.missions SET title = '👥 Peer Practice', subtitle = 'Pitch to Friends', micro_content = 'The best feedback comes from other entrepreneurs! 👥 Today you''ll share your pitch with other kids in the program. Give helpful, kind feedback to each other. We all get better together!', lab_prompt = '👋 If possible, exchange pitches with another student (or pitch to family as pretend investors). Give each other 3 stars (things you loved) and 1 wish (something to improve). Incorporate feedback!', estimated_minutes = 25 WHERE track = 'junior' AND week = 12 AND day = 3;

UPDATE public.missions SET title = '🎬 Record Your Pitch', subtitle = 'Create Your Video', micro_content = 'It''s time to record your FINAL pitch video! 🎬 This is like your business movie trailer. It shows what you built, why it matters, and why you''re an amazing young entrepreneur. Make it count!', lab_prompt = '📹 Record your final 3-5 minute pitch video! Use your pitch deck, show your app, and speak with confidence. Watch it back - you''ll probably want to record it 2-3 times to get it right!', estimated_minutes = 40 WHERE track = 'junior' AND week = 12 AND day = 4;

UPDATE public.missions SET title = '🏆 YOU DID IT!', subtitle = 'Demo Day Celebration', micro_content = 'YOU ARE OFFICIALLY A YOUNG ENTREPRENEUR! 🏆 In just 12 weeks, you went from having an idea to building a REAL app, getting REAL users, and being able to pitch like a pro. That is INCREDIBLE!', lab_prompt = '🎉 CELEBRATION TIME! Submit your final pitch video. Fill out your graduation reflection. Share your journey on your landing page. You now have a real business to show the world!', estimated_minutes = 25 WHERE track = 'junior' AND week = 12 AND day = 5;

-- =====================================================
-- UPDATE ADVANCED TRACK (Ages 15-16): Professional, sophisticated content
-- =====================================================

-- Week 1: Welcome to AI Building
UPDATE public.missions SET 
  title = 'The AI Entrepreneurship Revolution',
  subtitle = 'Why This Moment Changes Everything',
  micro_content = 'You''re entering entrepreneurship at the most opportune moment in history. AI has collapsed the cost of building software by 90%, eliminated the need for traditional coding, and democratized access to capabilities that cost millions just five years ago. Understanding this paradigm shift isn''t optional—it''s the defining skill of your generation. In this program, you''ll develop a startup from concept to launch using AI tools that make you as capable as a well-funded team.',
  lab_prompt = 'Analyze 3 AI-built companies (Notion, Jasper, Copy.ai) and document their founding story. Use your AI Coach to research: When were they founded? What AI capabilities enabled them? How fast did they scale? Write a 500-word analysis on "Why AI-First Startups Win."',
  estimated_minutes = 45
WHERE track = 'advanced' AND week = 1 AND day = 1;

UPDATE public.missions SET 
  title = 'Problem-Solution Fit Theory',
  subtitle = 'The Science of Finding Real Problems',
  micro_content = 'Marc Andreessen said: "The #1 reason startups fail is they make something nobody wants." Problem-solution fit is the rigorous process of validating that: 1) A real problem exists, 2) People urgently want it solved, 3) They''ll pay for a solution. We''ll use frameworks like Jobs-to-be-Done, Problem Severity Matrix, and Willingness-to-Pay analysis to ensure you''re building something people actually need.',
  lab_prompt = 'Use your AI Coach to apply the Jobs-to-be-Done framework to 3 potential problem areas. For each, document: the functional job, emotional job, and social job. Rate problem severity (1-10) and frequency (daily/weekly/monthly). Identify your strongest problem-solution opportunity.',
  estimated_minutes = 50
WHERE track = 'advanced' AND week = 1 AND day = 2;

UPDATE public.missions SET 
  title = 'Prompt Engineering Fundamentals',
  subtitle = 'The New Literacy',
  micro_content = 'Prompt engineering is the skill of communicating effectively with AI systems to achieve precise outputs. This is rapidly becoming as fundamental as writing or Excel proficiency. Mastering prompt structure, context-setting, few-shot learning, and iterative refinement will multiply your productivity 10x and determine your effectiveness in an AI-augmented workforce.',
  lab_prompt = 'Complete a prompt engineering challenge: 1) Write a basic prompt for market research, 2) Improve it using role-play ("Act as a Y Combinator partner"), 3) Add context and constraints, 4) Add examples (few-shot learning), 5) Compare outputs at each stage. Document what you learned about prompt quality vs. output quality.',
  estimated_minutes = 45
WHERE track = 'advanced' AND week = 1 AND day = 3;

UPDATE public.missions SET 
  title = 'Competitive Intelligence & Market Analysis',
  subtitle = 'Understanding the Landscape',
  micro_content = 'Before building anything, you must understand the competitive landscape. Who else is solving this problem? What''s their approach? Where are the gaps? AI tools can accelerate competitive research that would traditionally take weeks. You''ll learn to identify direct competitors, indirect competitors, and substitute solutions while mapping their strengths and vulnerabilities.',
  lab_prompt = 'Conduct a comprehensive competitive analysis using your AI Coach. Identify 5+ competitors in your problem space. For each, document: founding date, funding raised, pricing model, key features, target market, and 3 weaknesses. Create a Competitive Matrix showing where opportunities exist.',
  estimated_minutes = 50
WHERE track = 'advanced' AND week = 1 AND day = 4;

UPDATE public.missions SET 
  title = 'Your Investment Thesis',
  subtitle = 'Why Now, Why You, Why This',
  micro_content = 'Every serious startup needs an investment thesis—a compelling narrative explaining why this opportunity exists NOW, why YOU are positioned to capture it, and why THIS approach will win. Investors and advisors evaluate startups through this lens. A strong thesis demonstrates deep market understanding and strategic clarity.',
  lab_prompt = 'Draft your Investment Thesis with your AI Coach. Structure: 1) Market Opportunity (size, growth, trends), 2) Why Now (what''s changed to create this opportunity), 3) Your Unique Insight (what do you see that others don''t), 4) Why You (your unfair advantage), 5) Vision (where this goes in 5 years). Polish until it''s presentation-ready.',
  estimated_minutes = 50
WHERE track = 'advanced' AND week = 1 AND day = 5;

-- Week 2: AI Customer Discovery
UPDATE public.missions SET 
  title = 'Customer Segmentation Strategy',
  subtitle = 'Defining Your Beachhead Market',
  micro_content = 'The fatal mistake of most founders is trying to serve everyone. Geoffrey Moore''s "Crossing the Chasm" teaches us to identify a beachhead market—a specific segment small enough to dominate but large enough to matter. We''ll segment by demographics, psychographics, behavior, and need-state to find your ideal first customers.',
  lab_prompt = 'Create detailed customer segments using AI. Identify at least 4 potential segments. For each: demographics, psychographics, pain point intensity, willingness to pay, accessibility, and growth potential. Score each segment (1-10) across these dimensions. Select your beachhead market and justify your choice in writing.',
  estimated_minutes = 50
WHERE track = 'advanced' AND week = 2 AND day = 1;

UPDATE public.missions SET 
  title = 'User Research Methodology',
  subtitle = 'Customer Discovery That Actually Works',
  micro_content = 'The Mom Test by Rob Fitzpatrick reveals why most customer interviews fail: people lie to be polite. Effective customer discovery asks about past behavior, not future intentions. You never mention your idea until you''ve extracted the raw truth about their problems, current solutions, and the cost of their pain.',
  lab_prompt = 'Design a 15-question customer interview guide applying Mom Test principles. Questions should uncover: 1) Past behavior around the problem, 2) Current workarounds, 3) Money/time already spent, 4) Decision-making process. Use AI to role-play 3 mock interviews before conducting real ones.',
  estimated_minutes = 45
WHERE track = 'advanced' AND week = 2 AND day = 2;

UPDATE public.missions SET 
  title = 'Qualitative Data Analysis',
  subtitle = 'Finding Patterns in Interviews',
  micro_content = 'Raw interview data is useless without systematic analysis. Affinity mapping, thematic coding, and insight synthesis transform scattered notes into actionable intelligence. AI can accelerate this process, but human judgment is essential for identifying the insights that matter.',
  lab_prompt = 'Conduct 5 customer interviews and upload transcripts/notes to your AI Coach. Use AI to: 1) Identify recurring themes, 2) Code responses by category, 3) Quantify frequency of pain points, 4) Surface surprising insights. Create an Insights Document with supporting quotes.',
  estimated_minutes = 60
WHERE track = 'advanced' AND week = 2 AND day = 3;

UPDATE public.missions SET 
  title = 'Building Customer Personas',
  subtitle = 'From Data to Actionable Profiles',
  micro_content = 'Customer personas synthesize research into actionable profiles that guide product and marketing decisions. Great personas include behavioral patterns, goals, frustrations, and decision criteria—not just demographics. They should feel like real people you could have a conversation with.',
  lab_prompt = 'Create 2-3 detailed customer personas based on your research. Each should include: name/photo, demographic background, behavioral patterns, goals and motivations, pain points (with quotes), current solutions, decision criteria, and "A day in the life" narrative. Use AI to ensure completeness and authenticity.',
  estimated_minutes = 50
WHERE track = 'advanced' AND week = 2 AND day = 4;

UPDATE public.missions SET 
  title = 'Value Proposition Design',
  subtitle = 'Crafting Your Unique Promise',
  micro_content = 'Your value proposition is the promise of value you deliver to customers. Using the Value Proposition Canvas, you''ll map customer jobs, pains, and gains against your product''s pain relievers and gain creators. The goal: a compelling, differentiated promise that makes competitors irrelevant.',
  lab_prompt = 'Complete a full Value Proposition Canvas with your AI Coach. Customer side: jobs, pains, gains. Product side: products/services, pain relievers, gain creators. Ensure strong fit between sides. Craft 3 different value proposition statements and test them with your AI Coach as a skeptical customer.',
  estimated_minutes = 55
WHERE track = 'advanced' AND week = 2 AND day = 5;

-- Week 3: AI Market Research
UPDATE public.missions SET 
  title = 'TAM, SAM, SOM Analysis',
  subtitle = 'Sizing Your Market Opportunity',
  micro_content = 'Investors obsess over market size because it determines the ceiling of your opportunity. TAM (Total Addressable Market), SAM (Serviceable Addressable Market), and SOM (Serviceable Obtainable Market) create a realistic picture of your opportunity. We''ll use both top-down and bottom-up methods for credible estimates.',
  lab_prompt = 'Calculate TAM, SAM, SOM for your startup using both top-down (industry reports, public data) and bottom-up (# of customers × average revenue) methods. Document your assumptions and sources. Use AI to find relevant industry data and validate your methodology. Present numbers that are credible and defensible.',
  estimated_minutes = 55
WHERE track = 'advanced' AND week = 3 AND day = 1;

UPDATE public.missions SET 
  title = 'Competitive Moat Strategy',
  subtitle = 'Building Defensibility',
  micro_content = 'Warren Buffett''s "moat" concept is essential for startups: what prevents competitors from destroying your business? Moats include network effects, switching costs, brand, scale economics, data advantages, and regulatory barriers. Without a moat, your success invites destruction.',
  lab_prompt = 'Analyze moat potential for your startup using AI. Evaluate each moat type (1-10): network effects, switching costs, brand, economies of scale, data/AI advantage, regulatory. Identify your 2 strongest potential moats and develop a 12-month strategy to build them. Document specific actions you''ll take.',
  estimated_minutes = 50
WHERE track = 'advanced' AND week = 3 AND day = 2;

UPDATE public.missions SET 
  title = 'Business Model Innovation',
  subtitle = 'Revenue Strategies That Scale',
  micro_content = 'The business model determines how you capture value. We''ll explore subscription, marketplace, freemium, transaction-based, advertising, licensing, and hybrid models. The best business model aligns with customer behavior, creates recurring revenue, and scales efficiently.',
  lab_prompt = 'Use Business Model Canvas to map your startup with AI assistance. Explore 3 different business model options. For each: revenue streams, pricing strategy, cost structure, unit economics (CAC, LTV, margin). Calculate break-even and path to profitability. Select and justify your optimal model.',
  estimated_minutes = 55
WHERE track = 'advanced' AND week = 3 AND day = 3;

UPDATE public.missions SET 
  title = 'Financial Projections',
  subtitle = 'Modeling Your First 3 Years',
  micro_content = 'Financial projections aren''t about predicting the future—they''re about demonstrating you understand your business mechanics. Revenue forecasting, cost modeling, cash flow analysis, and key assumptions reveal whether you think like a real operator or just a dreamer.',
  lab_prompt = 'Build a 3-year financial projection model with AI. Include: monthly revenue forecast (Year 1), annual (Years 2-3), all cost categories, customer acquisition costs, churn rates, and runway calculation. Document your assumptions. Create best-case, base-case, and worst-case scenarios.',
  estimated_minutes = 60
WHERE track = 'advanced' AND week = 3 AND day = 4;

UPDATE public.missions SET 
  title = 'Go-to-Market Strategy',
  subtitle = 'How You''ll Win Your First 1000 Customers',
  micro_content = 'A brilliant product with a weak go-to-market strategy loses to an average product with brilliant distribution. We''ll analyze acquisition channels (paid, organic, viral, sales), develop a channel prioritization framework, and create a realistic plan to reach your first 1000 customers.',
  lab_prompt = 'Develop a comprehensive GTM strategy with AI. Identify 10+ potential channels. For each: estimated CAC, conversion rate, scalability, competition level. Prioritize top 3 channels with detailed execution plans. Create a 90-day launch plan with weekly milestones and KPIs.',
  estimated_minutes = 55
WHERE track = 'advanced' AND week = 3 AND day = 5;

-- Week 4: AI Solution Design
UPDATE public.missions SET 
  title = 'Product Requirements Document',
  subtitle = 'Specifying What You''ll Build',
  micro_content = 'A PRD (Product Requirements Document) translates vision into specification. It defines user stories, feature requirements, success metrics, and technical constraints. Well-written PRDs align teams, prevent scope creep, and ensure you build what customers actually need.',
  lab_prompt = 'Write a comprehensive PRD with AI assistance. Structure: 1) Executive Summary, 2) Problem Statement, 3) User Stories (at least 10), 4) Feature Requirements (must-have vs. nice-to-have), 5) Success Metrics, 6) Technical Constraints, 7) Timeline. Follow industry-standard formatting.',
  estimated_minutes = 60
WHERE track = 'advanced' AND week = 4 AND day = 1;

UPDATE public.missions SET 
  title = 'Information Architecture',
  subtitle = 'Organizing User Flows',
  micro_content = 'Information architecture determines how users navigate your product. Card sorting, tree testing, and user flow mapping ensure your structure matches user mental models. Poor IA creates friction; great IA makes products feel intuitive.',
  lab_prompt = 'Create complete information architecture with AI. Include: sitemap, user flows for 3 key tasks, navigation structure, and content hierarchy. Test your IA by describing it to your AI Coach acting as a confused first-time user. Iterate until the flows are intuitive.',
  estimated_minutes = 50
WHERE track = 'advanced' AND week = 4 AND day = 2;

UPDATE public.missions SET 
  title = 'Wireframe Design',
  subtitle = 'Low-Fidelity Prototyping',
  micro_content = 'Wireframes are the blueprints of your product. They establish layout, hierarchy, and interaction patterns before visual design. Starting with wireframes prevents the costly mistake of falling in love with pretty mockups that don''t work.',
  lab_prompt = 'Create wireframes for all key screens (8-12 screens) using AI assistance to describe ideal layouts. Sketch by hand or use a simple tool like Whimsical/Figma. Focus on: layout, content hierarchy, interaction elements, and responsive considerations. Document the UX rationale for key decisions.',
  estimated_minutes = 55
WHERE track = 'advanced' AND week = 4 AND day = 3;

UPDATE public.missions SET 
  title = 'Design System Creation',
  subtitle = 'Building Consistent UI',
  micro_content = 'A design system ensures visual consistency across your product. Typography scales, color palettes, spacing systems, and component libraries create a cohesive experience. This systematization also enables faster development as your product grows.',
  lab_prompt = 'Create a design system specification with AI. Include: color palette (with accessibility checks), typography scale, spacing system, component styles (buttons, forms, cards, etc.), and iconography approach. Reference successful design systems like Stripe or Linear for inspiration.',
  estimated_minutes = 50
WHERE track = 'advanced' AND week = 4 AND day = 4;

UPDATE public.missions SET 
  title = 'Technical Architecture Planning',
  subtitle = 'Choosing Your Stack',
  micro_content = 'Technical decisions made early have long-lasting consequences. We''ll evaluate AI-powered development platforms (Lovable, Cursor, Replit), consider scalability requirements, and plan for technical debt. The goal: make informed choices that balance speed with sustainability.',
  lab_prompt = 'Develop a technical architecture plan with AI. Evaluate: AI development platforms, database needs, API integrations, hosting requirements, and security considerations. Document your stack choices with rationale. Create a technical roadmap showing what to build now vs. later.',
  estimated_minutes = 55
WHERE track = 'advanced' AND week = 4 AND day = 5;

-- Weeks 5-7: Vibe Coding Mastery (Advanced)
UPDATE public.missions SET title = 'Advanced AI Development Setup', subtitle = 'Configuring Your Build Environment', micro_content = 'Professional AI-assisted development requires a properly configured environment. We''ll set up Lovable or Cursor with proper project structure, version control concepts, and development workflow. This foundation enables rapid iteration while maintaining code quality.', lab_prompt = 'Set up your professional development environment. Create a Lovable project with: proper file structure, design system implementation, and component architecture. Use AI to establish coding patterns you''ll follow. Document your setup for reference.', estimated_minutes = 55 WHERE track = 'advanced' AND week = 5 AND day = 1;

UPDATE public.missions SET title = 'Building Your Data Model', subtitle = 'Database Architecture', micro_content = 'Your data model is the backbone of your application. Entity relationships, data types, and indexing strategies determine both functionality and performance. We''ll design a scalable database schema that supports your product requirements.', lab_prompt = 'Design your complete database schema with AI. Create ERD (entity relationship diagram), define all tables/collections, establish relationships, and plan for common queries. Consider: user data, application data, analytics events. Implement in your development platform.', estimated_minutes = 60 WHERE track = 'advanced' AND week = 5 AND day = 2;

UPDATE public.missions SET title = 'Authentication & User Management', subtitle = 'Secure User Systems', micro_content = 'User authentication and authorization are critical infrastructure. We''ll implement secure signup/login, session management, and role-based access control using AI-assisted development. Security vulnerabilities here are catastrophic.', lab_prompt = 'Implement a complete auth system using AI. Include: secure signup/login, password requirements, session handling, protected routes, and user profile management. Test edge cases: invalid inputs, expired sessions, unauthorized access. Document your security approach.', estimated_minutes = 60 WHERE track = 'advanced' AND week = 5 AND day = 3;

UPDATE public.missions SET title = 'Core Feature Development', subtitle = 'Building the Main Experience', micro_content = 'Today we build the core feature that delivers your primary value proposition. Every element should support the job your customers are hiring your product to do. Ruthless focus on the core experience beats feature sprawl every time.', lab_prompt = 'Build your core feature using AI-assisted development. Focus on: the primary user flow, clean UX that matches your wireframes, error handling, and loading states. Get feedback from your AI Coach on UX quality. Ship something you''re proud of.', estimated_minutes = 70 WHERE track = 'advanced' AND week = 5 AND day = 4;

UPDATE public.missions SET title = 'API Integration', subtitle = 'Connecting External Services', micro_content = 'Modern products leverage external APIs to add powerful capabilities. Payment processing, email, analytics, and third-party data all come through APIs. Understanding REST APIs, authentication methods, and error handling is essential for building sophisticated products.', lab_prompt = 'Integrate at least one external API into your product (Stripe, SendGrid, or similar). Use AI to understand the API documentation, implement proper authentication, handle errors gracefully, and test edge cases. Document your integration approach.', estimated_minutes = 60 WHERE track = 'advanced' AND week = 5 AND day = 5;

UPDATE public.missions SET title = 'Landing Page Development', subtitle = 'High-Converting Marketing Pages', micro_content = 'Your landing page is often the first touchpoint with potential customers. Conversion-optimized design, compelling copy, and clear CTAs transform visitors into users. We''ll apply landing page best practices from the highest-converting startups.', lab_prompt = 'Build a professional landing page using the Landing Page Generator and your own refinements. Include: compelling headline, clear value proposition, social proof, feature showcase, FAQ, and optimized CTA. A/B test 2 headline variations with AI feedback.', estimated_minutes = 55 WHERE track = 'advanced' AND week = 6 AND day = 1;

UPDATE public.missions SET title = 'Conversion Copywriting', subtitle = 'Words That Sell', micro_content = 'Copywriting is salesmanship in print. Great copy speaks to customer pain, presents your solution as inevitable, and creates urgency to act. We''ll learn frameworks like PAS (Problem-Agitate-Solve), AIDA, and before-after-bridge to write copy that converts.', lab_prompt = 'Rewrite all landing page copy using proven frameworks. Create: 3 headline variations (PAS, benefit-driven, curiosity), benefit-focused bullet points, objection-handling FAQ, and high-urgency CTA. Use AI to score each version for conversion potential. Select the strongest version.', estimated_minutes = 50 WHERE track = 'advanced' AND week = 6 AND day = 2;

UPDATE public.missions SET title = 'SEO Foundation', subtitle = 'Organic Growth Strategy', micro_content = 'SEO compounds over time, making it one of the highest-ROI marketing investments. On-page optimization, keyword strategy, and technical SEO create a foundation for sustainable organic traffic. Start early and benefit forever.', lab_prompt = 'Implement SEO best practices with AI. Research: 20+ keywords for your space (volume + difficulty). Optimize: meta tags, URL structure, heading hierarchy, image alt text, internal linking. Create: content strategy document for ongoing SEO growth.', estimated_minutes = 55 WHERE track = 'advanced' AND week = 6 AND day = 3;

UPDATE public.missions SET title = 'Analytics Implementation', subtitle = 'Measuring What Matters', micro_content = 'You can''t improve what you can''t measure. Analytics implementation captures user behavior, conversion events, and engagement patterns. We''ll set up tracking that answers the critical questions about your product''s performance.', lab_prompt = 'Implement analytics using Plausible, Mixpanel, or Google Analytics. Track: page views, user flows, conversion events (signup, activation, key actions), and engagement metrics. Create a dashboard showing your key metrics. Document what each metric tells you.', estimated_minutes = 50 WHERE track = 'advanced' AND week = 6 AND day = 4;

UPDATE public.missions SET title = 'Performance Optimization', subtitle = 'Speed Wins', micro_content = 'Page speed directly impacts conversion rates—every 100ms of latency costs sales. Image optimization, code splitting, caching, and efficient data fetching create fast experiences. We''ll audit and optimize your product for maximum performance.', lab_prompt = 'Run performance audits (Lighthouse) and optimize based on findings. Target: 90+ performance score. Optimize: images, CSS/JS bundles, third-party scripts, and rendering. Document before/after metrics and specific optimizations made.', estimated_minutes = 55 WHERE track = 'advanced' AND week = 6 AND day = 5;

UPDATE public.missions SET title = 'User Testing Protocol', subtitle = 'Systematic Feedback Collection', micro_content = 'Usability testing reveals problems you''re too close to see. A structured testing protocol with specific tasks, observation guidelines, and synthesis methods transforms anecdotal feedback into actionable insights. Remote testing tools make this scalable.', lab_prompt = 'Create a usability testing protocol with AI. Define: 5 specific tasks to test, observation checklist, interview questions, and synthesis template. Conduct 5 user tests (friends/family okay for now). Compile findings into prioritized improvements.', estimated_minutes = 60 WHERE track = 'advanced' AND week = 7 AND day = 1;

UPDATE public.missions SET title = 'Iteration Sprint', subtitle = 'Rapid Improvement Cycle', micro_content = 'The build-measure-learn cycle is the engine of product development. Today we complete a full iteration sprint: prioritize improvements from testing, implement the highest-impact changes, and validate that they worked. Speed of iteration beats perfection.', lab_prompt = 'Complete a full iteration sprint. From your user testing: prioritize top 5 improvements by impact/effort. Implement top 3 using AI assistance. Test with 2 users to validate improvements worked. Document your iteration process for future reference.', estimated_minutes = 65 WHERE track = 'advanced' AND week = 7 AND day = 2;

UPDATE public.missions SET title = 'Error Handling & Edge Cases', subtitle = 'Building Robust Software', micro_content = 'Production software must handle errors gracefully. Empty states, loading states, error messages, and edge cases separate amateur products from professional ones. Thoughtful error handling builds user trust and reduces support burden.', lab_prompt = 'Audit and improve error handling throughout your product. Check: form validation, API error handling, empty states, loading indicators, offline behavior. Use AI to identify edge cases you might have missed. Implement user-friendly error messages for all scenarios.', estimated_minutes = 55 WHERE track = 'advanced' AND week = 7 AND day = 3;

UPDATE public.missions SET title = 'Security Audit', subtitle = 'Protecting Your Users', micro_content = 'Security vulnerabilities destroy companies. Input sanitization, authentication security, data encryption, and access control protect your users and your reputation. A security audit identifies vulnerabilities before malicious actors do.', lab_prompt = 'Conduct a security audit with AI assistance. Check: input validation, XSS prevention, SQL injection protection, authentication security, API rate limiting, data encryption, and access controls. Document vulnerabilities found and fixes implemented.', estimated_minutes = 55 WHERE track = 'advanced' AND week = 7 AND day = 4;

UPDATE public.missions SET title = 'Production Deployment', subtitle = 'Going Live Professionally', micro_content = 'Production deployment requires more than pressing "publish." Environment configuration, domain setup, SSL certificates, error monitoring, and deployment pipelines ensure reliable, professional operation. We''ll deploy with confidence.', lab_prompt = 'Complete production deployment checklist. Configure: custom domain, SSL certificate, environment variables, error monitoring (Sentry), and backup strategy. Document your deployment process. Verify everything works in production environment.', estimated_minutes = 50 WHERE track = 'advanced' AND week = 7 AND day = 5;

-- Week 8-10: Growth (Advanced)
UPDATE public.missions SET title = 'Beta Launch Strategy', subtitle = 'Controlled Release for Learning', micro_content = 'Beta launches limit initial exposure to gather learnings before broad release. Invite-only access, feedback loops, and rapid iteration define the beta phase. The goal: validate product-market fit with real users before scaling.', lab_prompt = 'Design and execute your beta launch. Create: beta invitation system (limit 50 users), onboarding flow, feedback collection mechanisms, and success metrics. Launch to your first 20 beta users. Document their initial reactions and usage patterns.', estimated_minutes = 55 WHERE track = 'advanced' AND week = 8 AND day = 1;

UPDATE public.missions SET title = 'Activation Optimization', subtitle = 'Getting Users to "Aha"', micro_content = 'User activation—the moment users experience core value—determines whether they become long-term customers. We''ll identify your activation metric, map the activation path, and optimize every step to maximize the percentage of users who reach "aha."', lab_prompt = 'Optimize your activation flow with AI. Define: your "aha moment" metric. Map: every step from signup to activation. Identify: friction points and drop-off locations. Implement: 3 improvements to increase activation rate. Measure: before/after activation percentage.', estimated_minutes = 55 WHERE track = 'advanced' AND week = 8 AND day = 2;

UPDATE public.missions SET title = 'Retention Analysis', subtitle = 'Keeping Users Engaged', micro_content = 'Retention is the most important metric for long-term success. Cohort analysis, retention curves, and engagement tracking reveal whether you''re building something people continue to use. Poor retention invalidates everything else.', lab_prompt = 'Build a retention analysis system. Create: cohort analysis by signup date, retention curve visualization, engagement score definition. Analyze: where users drop off and why. Develop: 3 retention improvement hypotheses with implementation plans.', estimated_minutes = 55 WHERE track = 'advanced' AND week = 8 AND day = 3;

UPDATE public.missions SET title = 'Customer Feedback Synthesis', subtitle = 'Learning from Users at Scale', micro_content = 'As users increase, feedback systems must scale. NPS surveys, in-app feedback widgets, support ticket analysis, and user interviews combine qualitative and quantitative insights. Systematic synthesis turns noise into signal.', lab_prompt = 'Implement scalable feedback systems. Set up: NPS survey, in-app feedback mechanism, support channel. Collect feedback from 20+ users. Use AI to synthesize feedback into themes. Create a prioritized roadmap based on user needs.', estimated_minutes = 50 WHERE track = 'advanced' AND week = 8 AND day = 4;

UPDATE public.missions SET title = 'Product Iteration', subtitle = 'Building Based on Data', micro_content = 'Data-driven product development uses metrics and feedback to guide decisions. Today we complete an iteration cycle: analyze data, identify opportunities, build improvements, measure impact. This cycle becomes your operating rhythm.', lab_prompt = 'Complete a data-driven iteration cycle. Analyze: usage data, feedback themes, activation/retention metrics. Identify: highest-impact improvement opportunity. Build: the improvement using AI assistance. Measure: impact on key metrics within 48 hours if possible.', estimated_minutes = 60 WHERE track = 'advanced' AND week = 8 AND day = 5;

UPDATE public.missions SET title = 'Growth Channel Experiments', subtitle = 'Finding Scalable Acquisition', micro_content = 'Finding scalable growth channels requires systematic experimentation. We''ll run structured tests across paid acquisition, content marketing, viral loops, and partnerships. The goal: identify 1-2 channels that can drive predictable, cost-effective growth.', lab_prompt = 'Run growth experiments across 3 channels. For each: hypothesis, test design, success metrics, results. Channels to test: content/SEO, social media, community/partnerships. Use AI to design experiments and analyze results. Document your channel rankings by ROI.', estimated_minutes = 55 WHERE track = 'advanced' AND week = 9 AND day = 1;

UPDATE public.missions SET title = 'Content Marketing Engine', subtitle = 'Building Organic Growth', micro_content = 'Content marketing compounds over time. A systematic content engine—keyword research, content calendar, production workflow, and distribution strategy—creates sustainable organic growth. Start building your content machine today.', lab_prompt = 'Build a content marketing system. Research: 30 keywords with AI. Create: content calendar (12 pieces). Produce: 2 pieces of valuable content (blog posts, guides). Set up: distribution across relevant channels. Track: traffic and engagement.', estimated_minutes = 60 WHERE track = 'advanced' AND week = 9 AND day = 2;

UPDATE public.missions SET title = 'Viral Mechanics', subtitle = 'Building for Word-of-Mouth', micro_content = 'Viral growth happens by design, not luck. Built-in referral systems, shareable content, network effects, and social proof mechanisms multiply each user''s acquisition value. We''ll engineer virality into your product.', lab_prompt = 'Design viral mechanics for your product with AI. Implement: referral system with incentives, shareable elements (results, achievements, content), and social proof displays. Calculate: your viral coefficient (invites per user × conversion rate). Optimize until coefficient > 0.5.', estimated_minutes = 55 WHERE track = 'advanced' AND week = 9 AND day = 3;

UPDATE public.missions SET title = 'Paid Acquisition Fundamentals', subtitle = 'Scalable Customer Acquisition', micro_content = 'Paid acquisition provides predictable, scalable growth when economics work. Understanding ad platforms, targeting, creative testing, and unit economics enables profitable customer acquisition. We''ll set up your first campaigns.', lab_prompt = 'Design paid acquisition campaigns with AI. Create: ideal customer profile for targeting, 3 ad creative variations, landing page A/B test. Calculate: maximum allowable CAC based on LTV. If possible, run a small test campaign (even $20) and analyze results.', estimated_minutes = 55 WHERE track = 'advanced' AND week = 9 AND day = 4;

UPDATE public.missions SET title = 'Growth Dashboard', subtitle = 'Tracking Your Metrics', micro_content = 'A growth dashboard provides real-time visibility into your business health. Key metrics—traffic, signups, activation, retention, revenue—displayed clearly enable data-driven decisions. Build a dashboard you''ll actually use daily.', lab_prompt = 'Create your growth dashboard. Include: traffic sources, signup trends, activation rate, retention curves, engagement metrics, and revenue (if applicable). Use Notion, Google Sheets, or a dashboard tool. Set up: daily/weekly review routine.', estimated_minutes = 50 WHERE track = 'advanced' AND week = 9 AND day = 5;

UPDATE public.missions SET title = 'Public Launch Preparation', subtitle = 'Coordinated Launch Execution', micro_content = 'A coordinated launch maximizes initial traction. Launch checklists, timeline coordination, PR/media outreach, and community activation create a launch that compounds attention. We''ll plan your public launch like a professional product team.', lab_prompt = 'Create comprehensive launch plan. Include: 2-week timeline, channel-by-channel activities, launch day checklist, backup plans, and success metrics. Identify: 10 communities/publications to reach out to. Prepare: all assets needed for launch day.', estimated_minutes = 55 WHERE track = 'advanced' AND week = 10 AND day = 1;

UPDATE public.missions SET title = 'Press & Media Strategy', subtitle = 'Earning Coverage', micro_content = 'Earned media—press coverage, podcast appearances, social mentions—provides credibility and reach that paid media can''t buy. Understanding what makes stories newsworthy, building journalist relationships, and crafting pitches enables media coverage.', lab_prompt = 'Develop media outreach strategy with AI. Identify: 20 relevant journalists/creators. Craft: compelling story angle. Write: 3 personalized pitch emails. Create: press kit (company story, founder bio, product screenshots, key stats). Send at least 5 pitches.', estimated_minutes = 50 WHERE track = 'advanced' AND week = 10 AND day = 2;

UPDATE public.missions SET title = 'Launch Day Execution', subtitle = 'Maximizing Launch Impact', micro_content = 'Launch day requires coordinated execution across all channels. Community posts, social media, email, direct outreach, and PR all activate simultaneously. Monitor, engage, and adapt in real-time to maximize launch impact.', lab_prompt = 'EXECUTE YOUR LAUNCH. Follow your launch plan precisely. Post across all channels. Respond to every comment and question. Track: traffic, signups, social mentions, press coverage. Document: what worked, what didn''t, what surprised you.', estimated_minutes = 90 WHERE track = 'advanced' AND week = 10 AND day = 3;

UPDATE public.missions SET title = 'Post-Launch Analysis', subtitle = 'Learning from Results', micro_content = 'The day after launch is as important as launch day. Analyzing results while they''re fresh, capturing learnings, and planning next steps transforms a moment into momentum. Data-driven reflection maximizes return on launch effort.', lab_prompt = 'Conduct comprehensive launch analysis. Document: all metrics (traffic, signups, activation, engagement). Analyze: channel performance, message resonance, unexpected results. Create: "Launch Retrospective" with 5 key learnings and 5 action items for the coming week.', estimated_minutes = 50 WHERE track = 'advanced' AND week = 10 AND day = 4;

UPDATE public.missions SET title = 'Momentum Building', subtitle = 'Sustaining Post-Launch Growth', micro_content = 'Launch success means nothing if you can''t sustain momentum. Converting launch attention into sustained growth requires immediate follow-up, relationship building, and growth system activation. The real work begins now.', lab_prompt = 'Build post-launch momentum. Execute: follow-up with all launch contacts, publish first piece of content capturing learnings, activate best-performing growth channel. Plan: next 30 days of activities. Set: weekly growth targets.', estimated_minutes = 55 WHERE track = 'advanced' AND week = 10 AND day = 5;

-- Week 11-12: Pitch (Advanced)
UPDATE public.missions SET title = 'Pitch Deck Architecture', subtitle = 'Structure That Convinces', micro_content = 'The best pitch decks follow a narrative structure that builds inevitability. Problem → Market Opportunity → Solution → Traction → Business Model → Team → Ask. Each slide builds on the previous, leading to the conclusion that investing is obvious.', lab_prompt = 'Create your investor-grade pitch deck using the Pitch Deck Generator. Ensure: compelling narrative arc, data-backed claims, clean visual design. Include: problem, solution, market size, traction, business model, competition, team, ask. Get AI feedback on each slide.', estimated_minutes = 60 WHERE track = 'advanced' AND week = 11 AND day = 1;

UPDATE public.missions SET title = 'Financial Storytelling', subtitle = 'Numbers That Matter', micro_content = 'Investors evaluate you through financial literacy. Understanding your unit economics, growth metrics, and funding requirements demonstrates you can build a real business. Financial storytelling makes dry numbers compelling.', lab_prompt = 'Prepare your financial narrative with AI. Calculate and present: CAC, LTV, LTV/CAC ratio, payback period, gross margin, burn rate, runway. Create: 3-year financial projection with clear assumptions. Practice explaining: why your economics work at scale.', estimated_minutes = 55 WHERE track = 'advanced' AND week = 11 AND day = 2;

UPDATE public.missions SET title = 'The Ask', subtitle = 'Funding Strategy', micro_content = 'Your "ask" must be specific, justified, and tied to milestones. How much are you raising? What valuation? How will funds be deployed? What milestones will you hit? A clear ask demonstrates business maturity and makes investor decision-making easy.', lab_prompt = 'Develop your fundraising strategy with AI. Define: funding amount needed, proposed valuation range, use of funds breakdown, milestones funds will achieve. Calculate: how long runway the raise provides. Create: a clear, confident "ask" slide and verbal pitch.', estimated_minutes = 50 WHERE track = 'advanced' AND week = 11 AND day = 3;

UPDATE public.missions SET title = 'Q&A Preparation', subtitle = 'Handling Tough Questions', micro_content = 'Investor Q&A separates prepared founders from pretenders. Anticipating questions, preparing data-backed responses, and handling curveballs with composure demonstrates you''ve thought deeply about your business. Preparation eliminates anxiety.', lab_prompt = 'Prepare for investor Q&A. Use AI to generate 30 likely investor questions across: market, competition, team, financials, risks. Write concise, confident answers for each. Practice rapid-fire Q&A with AI acting as a skeptical investor. Time your responses (30-60 seconds each).', estimated_minutes = 55 WHERE track = 'advanced' AND week = 11 AND day = 4;

UPDATE public.missions SET title = 'Pitch Delivery Mastery', subtitle = 'Presenting with Impact', micro_content = 'Content is only half the battle—delivery determines conviction. Pacing, eye contact, vocal variety, and confidence in handling objections transform a good deck into a fundable pitch. We''ll refine your delivery to investor-meeting standard.', lab_prompt = 'Master your pitch delivery in THE TANK. Complete: 5 full pitch runs with different investors. Target: 85%+ scores across all investors. Record yourself pitching. Analyze: pacing, filler words, body language. Iterate until your delivery matches your content quality.', estimated_minutes = 60 WHERE track = 'advanced' AND week = 11 AND day = 5;

UPDATE public.missions SET title = 'Demo Refinement', subtitle = 'Product Demonstration Excellence', micro_content = 'A live product demo proves you can build, not just talk. Smooth demo flow, highlighting key features, and recovering from issues gracefully shows operational competence. Your demo should make the product feel inevitable.', lab_prompt = 'Perfect your product demo. Script: 3-minute demo flow hitting key features. Practice: smooth transitions, clear explanations. Prepare: backup plan for technical issues. Record: 3 demo runs. Select: the best one for Demo Day.', estimated_minutes = 50 WHERE track = 'advanced' AND week = 12 AND day = 1;

UPDATE public.missions SET title = 'Final Pitch Rehearsal', subtitle = 'Full Run-Through', micro_content = 'Elite performers rehearse until excellence is automatic. Today is your final full rehearsal—pitch, demo, Q&A in sequence. Every stumble you catch today is one you won''t make on Demo Day.', lab_prompt = 'Complete 3 full pitch runs: deck presentation (5 min) + live demo (3 min) + Q&A (5 min). Use AI as a tough but fair investor panel. Time every section precisely. Note: any hesitation, unclear explanation, or weak answer. Fix everything before tomorrow.', estimated_minutes = 70 WHERE track = 'advanced' AND week = 12 AND day = 2;

UPDATE public.missions SET title = 'Demo Day Preparation', subtitle = 'Final Checks', micro_content = 'Demo Day preparation ensures zero preventable failures. Technical checks, backup plans, mental preparation, and logistics review create the conditions for your best performance. Champions prepare differently.', lab_prompt = 'Complete Demo Day checklist. Technical: test all equipment, prepare offline backup of slides/demo. Content: final deck review, printed notes. Mental: visualization, confidence rituals. Logistics: know schedule, arrive early plan. Sleep well tonight.', estimated_minutes = 40 WHERE track = 'advanced' AND week = 12 AND day = 3;

UPDATE public.missions SET title = 'Demo Day Execution', subtitle = 'Your Moment', micro_content = 'This is what you''ve built toward. All the research, building, iteration, and practice culminates in this moment. Trust your preparation. Speak with conviction. Show what you''ve built. Make your opportunity compelling. This is your moment.', lab_prompt = 'EXECUTE YOUR DEMO DAY PITCH. Record your final pitch video with: full deck presentation, live product demo, and closing statement. This is your portfolio piece. Make it represent the best of what you''ve learned and built.', estimated_minutes = 60 WHERE track = 'advanced' AND week = 12 AND day = 4;

UPDATE public.missions SET title = 'Founder Graduation', subtitle = 'What''s Next', micro_content = 'You''ve completed an intensive entrepreneurship program that most adults never experience. You have a live product, real users, and the skills to pitch investors. This isn''t an ending—it''s the beginning of your founder journey. The question now: what will you build next?', lab_prompt = 'Complete your graduation portfolio. Submit: final pitch video, product links, key metrics, journey reflection. Document: top 10 learnings from the program. Write: your vision for the next 12 months. You are now a founder. Act like one.', estimated_minutes = 45 WHERE track = 'advanced' AND week = 12 AND day = 5;

-- Update estimated_minutes for all tracks
UPDATE public.missions SET estimated_minutes = CASE 
  WHEN estimated_minutes > 30 THEN 25
  WHEN estimated_minutes > 25 THEN 20
  ELSE 15
END WHERE track = 'junior';

UPDATE public.missions SET estimated_minutes = CASE 
  WHEN estimated_minutes > 50 THEN 55
  WHEN estimated_minutes > 40 THEN 45
  ELSE 40
END WHERE track = 'advanced';
