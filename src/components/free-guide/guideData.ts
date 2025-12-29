import { Bot, Brain, Palette, Code, Globe, PenTool, Video, BookOpen, Zap, Lightbulb } from "lucide-react";

export const aiToolsExpanded = [
  { 
    name: "ChatGPT", 
    icon: Bot, 
    description: "Conversational AI for brainstorming and writing", 
    ageRange: "All ages",
    link: "https://chat.openai.com",
    cost: "Free tier available, Plus $20/month",
    bestFor: "Brainstorming, writing, learning",
    parentNotes: "Enable SafeSearch in settings. Review outputs together initially.",
    useCases: [
      { title: "Brainstorm business ideas", prompt: "I'm a 12-year-old who loves video games and wants to start a business. Give me 10 creative business ideas I could start this month with less than $50." },
      { title: "Write marketing copy", prompt: "Help me write a 3-sentence description for my lemonade stand that makes it sound exciting and unique. My secret ingredient is fresh mint from my garden." },
      { title: "Learn a concept", prompt: "Explain how apps make money in a way a 10-year-old would understand. Give me 5 different ways with real examples." }
    ],
    proTip: "Ask ChatGPT to 'explain like I'm 10' or 'give me 5 options' for better results"
  },
  { 
    name: "Claude", 
    icon: Brain, 
    description: "Deep reasoning and analysis partner", 
    ageRange: "12+",
    link: "https://claude.ai",
    cost: "Free tier available, Pro $20/month",
    bestFor: "Complex analysis, longer projects, coding help",
    parentNotes: "More cautious than ChatGPT about certain topics. Good for research projects.",
    useCases: [
      { title: "Analyze a business plan", prompt: "I want to start a tutoring business for younger kids at my school. What are the 5 biggest challenges I might face and how can I solve each one?" },
      { title: "Get feedback on writing", prompt: "Here's my pitch for my app idea: [paste pitch]. Give me specific, actionable feedback to make it more convincing. Be tough but helpful." },
      { title: "Debug code", prompt: "My website button isn't working. Here's my code: [paste code]. Explain what's wrong like you're teaching a beginner." }
    ],
    proTip: "Claude is great for longer conversations where you need it to remember context"
  },
  { 
    name: "Midjourney", 
    icon: Palette, 
    description: "AI image generation for branding and visuals", 
    ageRange: "All ages",
    link: "https://midjourney.com",
    cost: "Starting at $10/month",
    bestFor: "Logo design, product mockups, marketing visuals",
    parentNotes: "Runs through Discord. Set up parental controls on Discord. Review image outputs together.",
    useCases: [
      { title: "Create a logo", prompt: "/imagine a minimal, modern logo for a kids' homework help app called 'StudyBuddy', using friendly blue colors, simple shapes, white background --v 6" },
      { title: "Design app mockups", prompt: "/imagine UI design for a mobile app homepage, a study planner for teenagers, clean modern design, purple and white color scheme --v 6 --ar 9:16" },
      { title: "Marketing graphics", prompt: "/imagine Instagram post design for a young entrepreneur, motivational quote background, gradient purple and blue, modern minimal style --v 6" }
    ],
    proTip: "Add '--v 6' for the latest quality and '--ar 16:9' for specific aspect ratios"
  },
  { 
    name: "Lovable", 
    icon: Code, 
    description: "Build complete apps with natural language", 
    ageRange: "14+",
    link: "https://lovable.dev",
    cost: "Free tier available",
    bestFor: "Building full web apps, landing pages, dashboards",
    parentNotes: "Creates real, deployable websites. Great for portfolio building.",
    useCases: [
      { title: "Build a landing page", prompt: "Create a landing page for my tutoring business called 'Math Mentor'. Include a hero section with a catchy headline, a list of 3 services I offer, testimonials section, and a contact form. Use a professional blue color scheme." },
      { title: "Create a simple app", prompt: "Build a habit tracker app where I can add daily habits, mark them complete, and see my streak for each habit. Include a motivational quote on the home screen." },
      { title: "Portfolio website", prompt: "Create a portfolio website for a teen entrepreneur. Include sections for About Me, My Projects (with image cards), Skills I'm learning, and a contact form." }
    ],
    proTip: "Describe what you want in plain English—Lovable handles the coding"
  },
  { 
    name: "Glide", 
    icon: Globe, 
    description: "No-code app builder perfect for beginners", 
    ageRange: "9+",
    link: "https://glideapps.com",
    cost: "Free tier available",
    bestFor: "Simple mobile apps, data-driven apps, school projects",
    parentNotes: "Very kid-friendly interface. Uses spreadsheets which teaches data concepts.",
    useCases: [
      { title: "School club directory", prompt: "Create an app that lists all the clubs at school with their meeting times, room numbers, and a way to sign up." },
      { title: "Homework tracker", prompt: "Build an app where I can add assignments, set due dates, and mark them done. Show overdue items in red." },
      { title: "Recipe collection", prompt: "Make an app to store my family's recipes with photos, ingredients, and step-by-step instructions." }
    ],
    proTip: "Start with a Glide template and customize it—it's faster than building from scratch"
  },
  { 
    name: "Canva AI", 
    icon: PenTool, 
    description: "Design graphics with AI assistance", 
    ageRange: "All ages",
    link: "https://canva.com",
    cost: "Free tier available, Pro $13/month",
    bestFor: "Social media graphics, presentations, posters",
    parentNotes: "Very safe platform with education mode available.",
    useCases: [
      { title: "Social media posts", prompt: "Use Magic Write: 'Write Instagram caption ideas for a young entrepreneur sharing their first product launch'" },
      { title: "Pitch deck slides", prompt: "Use Magic Design: Generate a professional pitch deck for a student startup with slides for problem, solution, market, and team" },
      { title: "Product mockups", prompt: "Use Magic Edit: Remove background from product photo and place on a professional gradient background" }
    ],
    proTip: "Use 'Magic Resize' to instantly convert one design into all social media sizes"
  },
  { 
    name: "Runway", 
    icon: Video, 
    description: "AI video generation and editing", 
    ageRange: "12+",
    link: "https://runwayml.com",
    cost: "Free tier (limited), Pro from $12/month",
    bestFor: "Video ads, product demos, creative content",
    parentNotes: "More advanced tool. Best with parental guidance initially.",
    useCases: [
      { title: "Product video", prompt: "Generate a 4-second video of a smartphone displaying an app on a desk with soft morning light" },
      { title: "Text-to-video ad", prompt: "Create a video showing: 'A teenager working on a laptop, looking excited, in a modern room with plants'" },
      { title: "Remove video background", prompt: "Use Green Screen: Remove background from my product demo video and add a professional gradient" }
    ],
    proTip: "Start with image-to-video using a Midjourney image for best results"
  },
  { 
    name: "Notion AI", 
    icon: BookOpen, 
    description: "Organize ideas and automate notes", 
    ageRange: "All ages",
    link: "https://notion.so",
    cost: "Free tier available, AI add-on $10/month",
    bestFor: "Business planning, note-taking, project management",
    parentNotes: "Great for developing organizational skills. Very safe platform.",
    useCases: [
      { title: "Business plan outline", prompt: "AI: Create a business plan template for a teen entrepreneur with sections for idea, target customer, how I'll make money, and first steps" },
      { title: "Summarize research", prompt: "AI: Summarize this article into 5 bullet points a 12-year-old would understand: [paste article]" },
      { title: "Weekly planning", prompt: "AI: Create a weekly schedule template for balancing school, my side business, and free time" }
    ],
    proTip: "Use Notion's templates gallery for ready-made business planning docs"
  },
  { 
    name: "Cursor", 
    icon: Zap, 
    description: "AI-powered code editor for advanced builders", 
    ageRange: "15+",
    link: "https://cursor.sh",
    cost: "Free tier available, Pro $20/month",
    bestFor: "Serious coding, complex apps, learning to program",
    parentNotes: "For teens ready to learn real coding. Requires some technical interest.",
    useCases: [
      { title: "Build a feature", prompt: "I have a React app. Add a dark mode toggle button that saves the user's preference to localStorage" },
      { title: "Debug code", prompt: "This function should sort my list by date but it's not working. Fix it and explain what was wrong: [paste code]" },
      { title: "Learn by doing", prompt: "I want to add user authentication to my app. Show me step by step how to add a login page with email and password" }
    ],
    proTip: "Use Cmd+K to ask the AI to edit specific code sections"
  },
  { 
    name: "Figma AI", 
    icon: Lightbulb, 
    description: "Design interfaces with AI suggestions", 
    ageRange: "12+",
    link: "https://figma.com",
    cost: "Free tier available",
    bestFor: "App design, wireframing, UI prototypes",
    parentNotes: "Industry-standard design tool. Great skill for future careers.",
    useCases: [
      { title: "Generate layouts", prompt: "FigJam AI: Create a wireframe for a mobile app homepage with a header, hero image, 3 feature cards, and a footer" },
      { title: "Write UI copy", prompt: "FigJam AI: Write button text and headlines for an e-commerce checkout flow that feels friendly and trustworthy" },
      { title: "Color palette", prompt: "FigJam AI: Suggest a 5-color palette for a teen mental health app that feels calm, modern, and hopeful" }
    ],
    proTip: "Use Figma's community for free templates you can remix"
  }
];

export const weekendProjectsExpanded = [
  {
    title: "Build a Personal Portfolio Website",
    difficulty: "Beginner",
    time: "2-3 hours",
    tools: ["ChatGPT", "Lovable or Glide"],
    prerequisites: "None - perfect for complete beginners!",
    steps: [
      { 
        step: "Define your story", 
        prompt: "I'm [age] years old and interested in [interests]. Help me write a compelling 'About Me' section for my personal website that's 3-4 sentences long and sounds authentic, not boring.",
        details: "Paste this into ChatGPT and fill in your details. Save the output."
      },
      { 
        step: "Plan your sections", 
        prompt: "I want to create a personal website. Suggest 5 sections I should include and what content goes in each one. I'm a student who [describe your projects/interests].",
        details: "This gives you a blueprint for your site."
      },
      { 
        step: "Generate project descriptions", 
        prompt: "Help me write short, impressive descriptions for these 3 projects I've worked on: [list your projects]. Each description should be 2-3 sentences and highlight what I learned.",
        details: "Even school projects count! Make them sound professional."
      },
      { 
        step: "Create the website", 
        prompt: "Create a modern personal portfolio website for a [age]-year-old student. Include: About Me section, My Projects with 3 cards, Skills I'm learning, and a contact form. Use a [color] color scheme.",
        details: "Use this in Lovable to build your site instantly."
      },
      { 
        step: "Add visual polish", 
        prompt: "/imagine modern website hero image, abstract gradient background, purple and blue, soft lighting, minimal design --ar 16:9 --v 6",
        details: "Optional: Use Midjourney to create a custom hero image."
      },
      { 
        step: "Get feedback", 
        prompt: "Review my portfolio website copy and suggest 3 specific improvements to make it more engaging: [paste your copy]",
        details: "Ask ChatGPT to help you improve before publishing."
      },
      { 
        step: "Publish and share", 
        prompt: null,
        details: "Click 'Publish' in Lovable to get your live URL. Share it with friends and family!"
      }
    ],
    outcome: "A live portfolio website you can include on college applications, share with potential clients, or use to impress anyone you meet.",
    troubleshooting: [
      "Site looks weird on mobile? Ask the AI to 'make it responsive' or 'optimize for mobile'",
      "Colors don't look right? Specify exact colors like 'use #4F46E5 for primary color'",
      "Content feels generic? Add specific details—the more personal, the better"
    ],
    extensions: [
      "Add a blog section to share your learning journey",
      "Include testimonials from teachers or mentors",
      "Add an email signup form to collect interested visitors"
    ]
  },
  {
    title: "Create a Problem-Solving App for Your School",
    difficulty: "Intermediate",
    time: "3-4 hours",
    tools: ["ChatGPT", "Glide"],
    prerequisites: "Basic understanding of how apps work",
    steps: [
      { 
        step: "Identify a real problem", 
        prompt: "I'm a student at [type of school]. Help me brainstorm 10 real problems students face daily that could be solved with a simple app. For each problem, rate how annoying it is (1-10) and how hard it would be to solve (1-10).",
        details: "Pick the one with highest annoyance + lowest difficulty!"
      },
      { 
        step: "Define your solution", 
        prompt: "I want to build an app that solves [problem]. Define the 5 most essential features this app needs. Keep it simple—I'm building this in one weekend.",
        details: "Less is more. Start with core features only."
      },
      { 
        step: "Plan your data", 
        prompt: "I'm building a [type of app]. What data do I need to store? Create a simple spreadsheet structure with column names and example data for 5 rows.",
        details: "Glide uses Google Sheets as a database. This plans your structure."
      },
      { 
        step: "Create the spreadsheet", 
        prompt: null,
        details: "Open Google Sheets and create columns based on step 3. Add 5 example entries."
      },
      { 
        step: "Build in Glide", 
        prompt: null,
        details: "Connect your sheet to Glide. Use their templates and customize the layout."
      },
      { 
        step: "Write compelling copy", 
        prompt: "Write the text for my app's home screen. The app is called [name] and it helps students [benefit]. Include a catchy headline and 2-3 lines explaining what the app does.",
        details: "Good copy makes your app feel professional."
      },
      { 
        step: "Test with real users", 
        prompt: "I built an app that [does X]. Create a 5-question survey to get feedback from my classmates about whether they'd use it and how to improve it.",
        details: "Ask 3-5 classmates to try it and fill out your survey."
      },
      { 
        step: "Iterate based on feedback", 
        prompt: "Here's feedback on my app: [paste feedback]. What are the top 3 changes I should make based on this feedback?",
        details: "Real entrepreneurs improve based on user feedback!"
      }
    ],
    outcome: "A working app that solves a real problem for your classmates. This is real entrepreneurship experience!",
    troubleshooting: [
      "App not syncing with sheet? Refresh Glide and check your sheet permissions",
      "Layout looks cluttered? Use Glide's 'List' or 'Cards' layout for cleaner design",
      "Too many features? Cut features until you have only the essential 3"
    ],
    extensions: [
      "Add user accounts so students can save their own data",
      "Create an 'Admin' view for teachers or club leaders",
      "Add push notifications for important updates"
    ]
  },
  {
    title: "Design Your Dream Brand from Scratch",
    difficulty: "Beginner",
    time: "2 hours",
    tools: ["ChatGPT", "Midjourney", "Canva"],
    prerequisites: "A business idea (real or imagined)",
    steps: [
      { 
        step: "Define your brand personality", 
        prompt: "I'm starting a [type of business] for [target audience]. Help me define my brand personality using these categories: 1) Three personality traits, 2) If my brand was a person, who would they be?, 3) Three words my customers should feel when they see my brand.",
        details: "This becomes the foundation for all your branding decisions."
      },
      { 
        step: "Generate name options", 
        prompt: "Generate 15 creative business name ideas for a [description of business]. I want names that are: memorable, easy to spell, and convey [desired feeling]. For each name, explain why it works.",
        details: "Pick your top 3 and ask friends which they like best."
      },
      { 
        step: "Create tagline options", 
        prompt: "I'm launching [business name], a [what it does]. Generate 10 tagline options that are under 7 words each. Mix: 1) Benefit-focused taglines, 2) Emotional taglines, 3) Clever/playful taglines.",
        details: "Your tagline should instantly communicate value."
      },
      { 
        step: "Design your logo", 
        prompt: "/imagine minimal logo design for '[business name]', [industry], [desired style: modern/playful/professional], [colors], simple shapes, vector style, white background --v 6",
        details: "Generate 4-5 options in Midjourney and pick your favorite."
      },
      { 
        step: "Create brand colors", 
        prompt: "My business is [description] targeting [audience]. Suggest a 5-color brand palette with: primary color, secondary color, accent color, light background, dark text. Explain the psychology behind each choice.",
        details: "Save these hex codes for consistent use everywhere."
      },
      { 
        step: "Design social media posts", 
        prompt: null,
        details: "Open Canva, search 'Instagram post', and create 3 branded posts using your new colors and logo."
      },
      { 
        step: "Compile brand guidelines", 
        prompt: "Create a simple brand guidelines document outline for [business name] that I can fill in. Include sections for: logo usage, colors, fonts, tone of voice, and do's and don'ts.",
        details: "This keeps your brand consistent as you grow."
      }
    ],
    outcome: "A complete brand kit with logo, colors, tagline, and social media templates ready to launch.",
    troubleshooting: [
      "Midjourney logos not clean enough? Add 'vector, minimal, simple shapes' to your prompt",
      "Colors feel off together? Use Canva's color palette generator tool",
      "Name already taken? Check domain availability at namecheap.com before deciding"
    ],
    extensions: [
      "Create a brand story document explaining your 'why'",
      "Design email newsletter templates",
      "Create TikTok/Reels templates for consistent video content"
    ]
  },
  {
    title: "Write and Illustrate Your Own Story Book",
    difficulty: "Beginner",
    time: "2-3 hours",
    tools: ["ChatGPT", "Claude", "Midjourney"],
    prerequisites: "A story idea or theme you want to explore",
    steps: [
      { 
        step: "Brainstorm your story concept", 
        prompt: "I want to write a short illustrated story (8-10 pages) about [theme or basic idea]. Help me develop: 1) Main character with a specific personality trait, 2) A problem they face, 3) Three obstacles, 4) How they solve it, 5) What they learn.",
        details: "This is your story outline!"
      },
      { 
        step: "Create your character", 
        prompt: "Help me flesh out my main character [name]. They are [age] and [description]. Give me: 5 personality traits, their biggest fear, their secret talent, their favorite phrase, and what makes them unique.",
        details: "Rich characters make stories memorable."
      },
      { 
        step: "Write the first draft", 
        prompt: "Using this outline, write my story in simple, engaging language appropriate for [target age group]. Make each page 3-4 sentences. Include dialogue and descriptive language. Story outline: [paste your outline]",
        details: "Don't worry about perfection—you'll edit next."
      },
      { 
        step: "Edit and improve", 
        prompt: "Here's my story draft: [paste story]. Edit it to: 1) Make the dialogue sound more natural, 2) Add sensory details (what things look, sound, smell like), 3) Make the ending more satisfying. Keep the same length.",
        details: "Use Claude for thoughtful edits."
      },
      { 
        step: "Plan your illustrations", 
        prompt: "For my story, suggest what scene/image should go on each page that would be most visually interesting. Story: [paste story]",
        details: "Pick the most visual moment from each page."
      },
      { 
        step: "Generate illustrations", 
        prompt: "/imagine children's book illustration, [scene description], [art style: whimsical watercolor/digital cartoon/cozy illustrated], soft colors, storybook style --ar 4:3 --v 6",
        details: "Keep art style consistent by using the same style keywords."
      },
      { 
        step: "Compile your book", 
        prompt: null,
        details: "Use Canva's 'Book' templates to combine text and images. Export as PDF!"
      }
    ],
    outcome: "A complete illustrated story book you can share digitally or print and bind as a gift.",
    troubleshooting: [
      "Story feels flat? Add more conflict and obstacles for your character",
      "Illustrations look inconsistent? Use the same style keywords every time",
      "Book layout messy? Stick to one image per page spread"
    ],
    extensions: [
      "Record yourself reading it for an audiobook version",
      "Create a 'Making Of' video showing your process",
      "Turn it into a series with the same character"
    ]
  },
  {
    title: "Launch a YouTube Channel Strategy",
    difficulty: "Intermediate",
    time: "3 hours",
    tools: ["ChatGPT", "Canva", "Midjourney"],
    prerequisites: "An idea of what you want to make videos about",
    steps: [
      { 
        step: "Define your niche", 
        prompt: "I want to start a YouTube channel about [general topic]. Help me narrow down to a specific niche by answering: 1) What unique angle can I bring?, 2) Who exactly is my ideal viewer (age, interests, what they're searching for)?, 3) What 5 sub-topics within this area could I cover?",
        details: "Specific niches grow faster than general channels."
      },
      { 
        step: "Research what works", 
        prompt: "What are the 10 most successful YouTube video formats for [your niche]? For each format, give an example title that would work for my channel about [topic].",
        details: "Don't reinvent the wheel—learn from what already works."
      },
      { 
        step: "Plan your first 20 videos", 
        prompt: "Create 20 video ideas for a YouTube channel about [niche]. For each video, include: title (optimized for search), thumbnail text (3 words max), and a one-line hook that would make someone click.",
        details: "Having a content backlog prevents creator burnout."
      },
      { 
        step: "Design channel branding", 
        prompt: "/imagine YouTube channel banner, [your niche], modern design, [your colors], featuring [elements related to your content], professional quality --ar 16:9 --v 6",
        details: "Also create a profile picture with consistent style."
      },
      { 
        step: "Create thumbnail templates", 
        prompt: null,
        details: "Open Canva, search 'YouTube thumbnail'. Create 3 template styles you can reuse. Use big text, bright colors, and expressive faces."
      },
      { 
        step: "Write your channel description", 
        prompt: "Write a YouTube channel description (max 1000 characters) for a channel called [name] that teaches [topic] to [audience]. Include: what viewers will learn, posting schedule, and a call-to-action to subscribe. Make it friendly and energetic.",
        details: "This helps with YouTube search optimization."
      },
      { 
        step: "Script your intro", 
        prompt: "Write a 15-second YouTube channel intro script that: hooks viewers in the first 3 seconds, explains what the channel is about, and tells them to subscribe. Make it sound natural and energetic, not salesy.",
        details: "Short, punchy intros keep viewers watching."
      },
      { 
        step: "Create a content calendar", 
        prompt: "Create a 4-week content calendar for my YouTube channel. I can post [frequency]. Include: video topic, filming day, editing day, and upload day. Leave buffer time for re-shoots.",
        details: "Consistency is key to YouTube growth."
      }
    ],
    outcome: "A complete YouTube channel strategy with branding, 20 video ideas, thumbnails templates, and a content calendar.",
    troubleshooting: [
      "Thumbnails look amateur? Use 3 or fewer words and make faces/expressions visible",
      "Niche too broad? Pick the intersection of two interests",
      "Overwhelmed? Start with just 5 video ideas and expand from there"
    ],
    extensions: [
      "Create a Shorts/Reels strategy for cross-platform growth",
      "Write email scripts for potential brand collaborations",
      "Design merchandise mockups for future monetization"
    ]
  }
];

export const promptLibrary = {
  brainstorming: [
    { title: "Business Idea Generator", prompt: "I'm [age] years old and interested in [your interests]. Generate 10 unique business ideas I could start with less than $100. For each idea, rate: difficulty (1-5), potential earnings, and time needed per week." },
    { title: "Problem Finder", prompt: "Think about problems that [target group: students/parents/teachers] face daily. List 15 annoying problems, rate each by how painful it is (1-10) and how many people have it (few/some/many)." },
    { title: "Name Generator", prompt: "I need a name for my [type of business/project]. It should be: memorable, easy to spell, and convey [feeling/value]. Generate 20 options with explanations for why each works." },
    { title: "Competitor Analysis", prompt: "I want to create [product/service]. What are 5 similar products that already exist? For each, tell me: what they do well, what they do poorly, and how I could be different." },
    { title: "Target Audience Deep Dive", prompt: "My product is [description]. Create a detailed profile of my ideal customer: their age, daily routine, biggest frustrations, what they've tried before, and what would make them instantly interested in my solution." },
    { title: "USP (Unique Value) Finder", prompt: "My business is [description]. Help me find what makes me unique by comparing me to competitors and finding 3 things I could do that nobody else is doing." }
  ],
  writing: [
    { title: "Elevator Pitch", prompt: "Write a 30-second elevator pitch for [business/project]. It should cover: the problem, my solution, who it's for, and why I'm the right person to build it. Make it conversational, not salesy." },
    { title: "Landing Page Copy", prompt: "Write landing page copy for [product/service]. Include: headline (max 10 words), subheadline (max 20 words), 3 benefit bullet points, and a call-to-action button text. Make it speak directly to [target audience]." },
    { title: "Email Newsletter", prompt: "Write a welcome email for new subscribers to my [type of business]. It should: thank them, tell them what to expect, share one quick tip, and feel personal—not corporate." },
    { title: "Product Description", prompt: "Write a product description for [product] in under 100 words. Highlight: the main benefit, who it's for, one unique feature, and include a subtle call-to-action. Tone: [casual/professional/playful]." },
    { title: "Social Media Bio", prompt: "Write an Instagram bio (max 150 characters) for a [age]-year-old entrepreneur who [what you do]. Include: what you help people with, a hint of personality, and a call-to-action." },
    { title: "Testimonial Request", prompt: "Write a friendly message asking a customer to leave a review. Context: they just [used my product/service]. Make it short, sincere, and include specific questions about their experience." },
    { title: "Blog Post Outline", prompt: "Create a blog post outline about [topic] that would help [audience] solve [problem]. Include: catchy title, 5 main sections with subpoints, and a conclusion with a call-to-action." },
    { title: "Video Script", prompt: "Write a script for a 2-minute YouTube video about [topic]. Include: hook (first 5 seconds), main content (3 key points), and ending with subscribe CTA. Tone: [conversational/educational/entertaining]." }
  ],
  building: [
    { title: "App Feature Prioritizer", prompt: "I want to build an app that [does X]. List 10 possible features, then rank them by: 1) How essential (must-have vs nice-to-have), 2) How hard to build (1-5), 3) What should I build first, second, third?" },
    { title: "Database Structure", prompt: "I'm building [type of app]. What data do I need to store? Create a simple database structure with table names, columns, and example data." },
    { title: "User Flow Designer", prompt: "Design the user flow for [app/website]. What happens when a user: first opens the app, creates an account, uses the main feature, and comes back the next day? Describe each screen they see." },
    { title: "Error Message Writer", prompt: "Write user-friendly error messages for these situations in my [type of app]: login failed, no internet, empty state (no data yet), payment failed, feature unavailable. Make them helpful and not scary." },
    { title: "Feature Spec Writer", prompt: "Write a detailed specification for this feature: [feature description]. Include: what it does, how users interact with it, edge cases to handle, and how to know if it's working correctly." },
    { title: "Bug Fixer", prompt: "I'm building [type of project] and this isn't working: [describe problem]. Here's my code: [paste code]. Explain what's wrong, why it's wrong, and show me the fixed version with comments." }
  ],
  design: [
    { title: "Color Palette Creator", prompt: "Create a 5-color palette for a [type of product] targeting [audience]. Include: primary color, secondary color, accent color, background, and text color. Explain the psychology behind each choice. Provide hex codes." },
    { title: "Logo Prompt", prompt: "/imagine logo design for [business name], [industry], [style: minimal/playful/professional], [colors], simple memorable icon, vector style, white background --v 6" },
    { title: "UI Style Guide", prompt: "Create a basic UI style guide for my [type of app]. Include recommendations for: fonts (heading and body), button styles, spacing, border radius, and shadow effects. Target vibe: [modern/playful/professional]." },
    { title: "Thumbnail Generator", prompt: "/imagine YouTube thumbnail, bold text saying '[3 WORD TITLE]', [your niche] theme, bright contrasting colors, expressive face showing [emotion], clean background --ar 16:9 --v 6" },
    { title: "Social Media Template", prompt: "/imagine Instagram post design, [topic/theme], [brand colors], modern minimal layout, space for text overlay, engaging visual --v 6" },
    { title: "Icon Set Ideas", prompt: "I need icons for my [type of app]. Suggest 10 icons I need with descriptions of what each should look like. They should be consistent in style: [line/filled/rounded]." }
  ],
  learning: [
    { title: "Concept Explainer", prompt: "Explain [complex topic] like I'm [age] years old. Use a simple analogy from everyday life, give one real example, and tell me why this matters for someone building a business." },
    { title: "Skill Roadmap", prompt: "I want to learn [skill] as a [age]-year-old. Create a 4-week learning plan with: daily time commitment (max 30 min), specific resources (free only), and weekly projects to practice." },
    { title: "Mistake Avoider", prompt: "What are the 7 biggest mistakes [age]-year-olds make when [activity/building something]? For each mistake, explain: why it happens, how to spot it, and how to fix or avoid it." },
    { title: "Book Summarizer", prompt: "Summarize the book [book title] in a way a [age]-year-old would understand. Include: the main idea, 3 key lessons, and one action I can take today based on the book." },
    { title: "Tool Tutorial", prompt: "I'm new to [tool name]. Create a beginner tutorial that teaches me the 5 most important things I need to know to start using it productively. Include step-by-step instructions." },
    { title: "Interview Prep", prompt: "I'm [age] and preparing for [type of interview/competition]. Generate 10 tough questions I might be asked and help me prepare strong answers for each." }
  ],
  marketing: [
    { title: "Content Calendar", prompt: "Create a 2-week social media content calendar for my [type of business]. Include 3 posts per week with: post type (educational/behind-scenes/promotional), caption idea, and best posting time." },
    { title: "Hashtag Generator", prompt: "Generate 30 hashtags for a [type of business] on Instagram. Mix: 10 broad hashtags (100K+ posts), 10 medium hashtags (10K-100K), and 10 niche hashtags (under 10K)." },
    { title: "Viral Hook Writer", prompt: "Write 10 scroll-stopping first lines for TikTok/Reels about [topic]. Each should create curiosity or surprise in under 10 words." },
    { title: "Email Subject Lines", prompt: "Write 15 email subject lines for [purpose: newsletter/sale/update]. Mix: curiosity-driven, benefit-driven, and urgent. Keep each under 50 characters." },
    { title: "Customer Interview Questions", prompt: "I'm researching customers for my [product/service]. Create 10 open-ended questions to understand: their problems, current solutions, and what would make them buy mine." },
    { title: "Launch Checklist", prompt: "Create a comprehensive launch checklist for my [type of product]. Include everything I need to do: 2 weeks before, 1 week before, launch day, and 1 week after. Be specific." }
  ]
};

export const teenFounderStories = [
  {
    name: "Maya, 14",
    location: "California",
    business: "TutorMatch",
    description: "A peer tutoring app connecting students who need help with students who can teach",
    tools: ["ChatGPT", "Glide", "Canva"],
    journey: "Started when she noticed classmates struggling to find study partners. Built first version in Glide over a weekend.",
    outcome: "200+ students at her school using it. Earned $400/month from school administration who licensed it.",
    quote: "I didn't know how to code. I just described what I wanted and AI helped me build it.",
    advice: "Start with a problem you see every day. Your first version will be embarrassing—that's okay."
  },
  {
    name: "James, 12",
    location: "Texas",
    business: "HomeChore Hero",
    description: "A gamified chore tracking app for families",
    tools: ["ChatGPT", "Glide"],
    journey: "His parents were tired of nagging about chores. He turned it into a game with points and rewards.",
    outcome: "His family uses it daily. 50 other families downloaded his template. Featured in local news.",
    quote: "My mom said I could either complain about chores or fix the system. So I fixed it!",
    advice: "The best ideas come from problems in your own life. Ask your family what annoys them."
  },
  {
    name: "Sofia, 16",
    location: "Miami",
    business: "EcoTrack",
    description: "An app helping teens track and reduce their carbon footprint",
    tools: ["Lovable", "ChatGPT", "Midjourney"],
    journey: "Climate anxiety led her to research, then building. Pitched at a local startup competition.",
    outcome: "Won $2,000 at regional pitch competition. 1,000+ downloads. Partnership with local environmental group.",
    quote: "I wanted to do something about climate change but felt powerless. Building this app gave me agency.",
    advice: "Care deeply about your problem. That passion shows in everything you build."
  },
  {
    name: "Aiden, 13",
    location: "London",
    business: "StoryCraft",
    description: "An interactive storytelling platform where readers choose the plot",
    tools: ["ChatGPT", "Notion", "Canva"],
    journey: "Loved reading but found books too 'one-way'. Built a choose-your-own-adventure engine.",
    outcome: "10 complete stories published. 500 monthly readers. Learning to monetize through premium stories.",
    quote: "AI helped me write faster, but the creativity still comes from me. It's like having a super-powered writing partner.",
    advice: "Don't wait until it's perfect. Publish early and improve based on what readers say."
  },
  {
    name: "Priya, 15",
    location: "Singapore",
    business: "MindfulMinute",
    description: "A quick meditation and stress-relief app designed for students during exam season",
    tools: ["Lovable", "ChatGPT", "Runway"],
    journey: "Built during a stressful exam period as a way to cope. Classmates asked if they could use it too.",
    outcome: "School wellness program adopted it. Expanded to 3 other schools. Working with a child psychologist advisor.",
    quote: "I built it for myself first. That's why it actually works—it solved MY real problem.",
    advice: "Build something you'll use yourself. You'll care more about making it great."
  }
];

export const parentGuide = {
  overview: {
    title: "AI Safety & Supervision Guide for Parents",
    intro: "Your child is about to enter an exciting world of AI-powered creation. This guide helps you support them safely and effectively."
  },
  safetySettings: [
    { tool: "ChatGPT", steps: ["Go to Settings → Data Controls", "Enable 'Chat History & Training' OFF for privacy", "For under-13s, create a supervised account", "Review conversations periodically"] },
    { tool: "Discord (for Midjourney)", steps: ["Enable 'Safe Direct Messaging'", "Set server to 'Keep Me Safe' in Privacy Settings", "Disable DMs from server members", "Join age-appropriate servers only"] },
    { tool: "General Tips", steps: ["Use a family-shared email for account creation", "Enable screen time limits (iOS/Android settings)", "Set up a shared 'creation space' for co-working", "Bookmark approved tool URLs to prevent phishing"] }
  ],
  ageBoundaries: [
    { ageGroup: "9-11", recommendations: ["Always co-create—sit together during AI sessions", "Review all outputs before sharing publicly", "Stick to visual tools like Canva, Glide", "10-15 minute sessions with breaks", "Focus on fun, creative projects"] },
    { ageGroup: "12-14", recommendations: ["Check in during sessions, review outcomes", "Discuss what AI can/can't be trusted with", "Introduce code-adjacent tools like Lovable", "25-30 minute focused sessions", "Encourage school or community-focused projects"] },
    { ageGroup: "15-16", recommendations: ["Trust with increasing autonomy", "Discuss ethics: AI bias, misinformation, copyright", "Allow more complex tools like Cursor", "Set goals together, check weekly progress", "Support real business exploration"] }
  ],
  ethicsConversations: [
    { topic: "AI isn't always right", talkingPoints: ["AI makes mistakes—always verify important facts", "It can 'hallucinate' fake information confidently", "Critical thinking is MORE important with AI, not less"] },
    { topic: "Creating vs. copying", talkingPoints: ["AI should help you create, not create FOR you", "The ideas and direction should be yours", "Give credit when AI helped significantly"] },
    { topic: "Data and privacy", talkingPoints: ["Never share personal info (address, school name) with AI", "AI companies may use your conversations for training", "Think before pasting private information"] },
    { topic: "Using AI ethically", talkingPoints: ["Don't use AI to cheat on school work", "Don't use AI to create fake content about real people", "Consider impact: would you be proud to share how you made this?"] }
  ],
  redFlags: [
    "Spending more time prompting than creating",
    "Becoming frustrated when AI doesn't understand them",
    "Trying to access age-inappropriate content through AI",
    "Believing everything AI says without questioning",
    "Hiding their AI usage or creations from you"
  ],
  supportTips: [
    "Celebrate the PROCESS, not just outcomes (praise good prompts!)",
    "Ask 'what did you learn?' not just 'what did you make?'",
    "Share your own AI experiments—learn together",
    "Connect their projects to real-world applications",
    "Help them find an audience for their creations"
  ]
};

export const printableResources = [
  {
    title: "Weekly AI Learning Tracker",
    description: "Track daily AI practice, projects, and progress for 4 weeks",
    contents: ["Daily prompt practice log", "Project milestone tracker", "Skills learned checklist", "Weekly reflection prompts", "Goal setting section"]
  },
  {
    title: "Project Planning Worksheet",
    description: "Plan any AI project from idea to launch",
    contents: ["Problem statement section", "Solution brainstorm area", "Feature priority matrix", "Week-by-week timeline", "Launch checklist"]
  },
  {
    title: "Prompt Engineering Cheat Card",
    description: "Pocket-sized reference for writing better prompts",
    contents: ["The PERFECT prompt formula", "5 prompt starters that always work", "Common mistakes to avoid", "Quick fix phrases", "Examples by category"]
  },
  {
    title: "My First AI Project Certificate",
    description: "Celebrate completing your first AI-built project",
    contents: ["Space for project name", "Skills demonstrated", "Date completed", "Signed by parent/mentor", "QR code to share project"]
  }
];
