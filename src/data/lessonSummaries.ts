export interface LessonSummary {
  lessonNumber: number;
  title: string;
  keyTakeaways: string[];
  template: {
    title: string;
    content: string[];
  };
  quickPrompts: {
    label: string;
    prompt: string;
  }[];
  skillsUnlocked: string[];
  advancedTechniques?: string[];
  wowFactor?: string;
}

export const lessonSummaries: Record<string, LessonSummary> = {
  "lesson-1": {
    lessonNumber: 1,
    title: "The AI Power-Up",
    keyTakeaways: [
      "Build something real in 5 minutes with AI",
      "Chain-of-thought prompting: 'Think step by step...'",
      "Few-shot learning: Give examples to get better outputs",
      "Different AI tools for different superpowers",
      "Base44 → Full apps in conversation, ChatGPT → Thinking partner",
    ],
    template: {
      title: "AI Superpower Stack",
      content: [
        "ChatGPT/Claude → Your thinking partner",
        "Midjourney → Image wizard",
        "Base44 → Full-stack app builder",
        "Leonardo → Product mockups",
        "Chain: Idea → Design → Build → Deploy in 30 min",
      ],
    },
    quickPrompts: [
      { label: "Chain-of-thought", prompt: "Let's think step by step. I want to build [idea]. First, identify the core problem..." },
      { label: "Few-shot learning", prompt: "Here are 3 examples of great landing pages: [ex1], [ex2], [ex3]. Now create one for..." },
      { label: "5-min build", prompt: "Create a simple [app type] that [one feature]. Keep it minimal and working." },
    ],
    skillsUnlocked: ["Chain-of-Thought", "Few-Shot Learning", "Tool Selection"],
    advancedTechniques: ["Chain-of-thought prompting", "Few-shot learning", "Multi-tool workflows"],
    wowFactor: "Build a working app in 5 minutes live demo",
  },
  "lesson-2": {
    lessonNumber: 2,
    title: "Prompt Engineering Secrets",
    keyTakeaways: [
      "Persona stacking: Combine multiple expert personas",
      "Temperature control: Creativity vs precision",
      "Constraint engineering: Limits create better outputs",
      "The 'Act as' framework for any task",
      "Reverse prompting: Get AI to ask YOU questions",
    ],
    template: {
      title: "Advanced Prompt Architecture",
      content: [
        "PERSONA: \"Act as a [expert 1] and [expert 2]\"",
        "CONTEXT: \"I'm building [X] for [audience]\"",
        "TASK: \"Create/Analyze/Design...\"",
        "CONSTRAINTS: \"Under X words, using Y format\"",
        "META: \"Ask me 3 questions first before starting\"",
      ],
    },
    quickPrompts: [
      { label: "Persona stack", prompt: "Act as a senior product designer AND a startup founder. Analyze my app idea..." },
      { label: "Reverse prompt", prompt: "Before you help me design this feature, ask me 5 clarifying questions." },
      { label: "Constraint magic", prompt: "Explain [complex topic] in exactly 3 bullet points, each under 10 words." },
    ],
    skillsUnlocked: ["Persona Stacking", "Constraint Engineering", "Reverse Prompting"],
    advancedTechniques: ["Persona stacking", "Temperature control", "Reverse prompting"],
    wowFactor: "Beat the AI Challenge - find prompts that surprise you",
  },
  "lesson-3": {
    lessonNumber: 3,
    title: "The Multi-Tool Workflow",
    keyTakeaways: [
      "AI Pipeline: Output of one tool feeds into next",
      "Tool chaining: ChatGPT → Midjourney → Base44",
      "Validate idea in 30 minutes using 4 AI tools",
      "The Founder's Toolkit: right tool for each stage",
      "Iterate across tools, not just within one",
    ],
    template: {
      title: "AI Pipeline Blueprint",
      content: [
        "STAGE 1: ChatGPT → Brainstorm & validate idea",
        "STAGE 2: Midjourney → Create visuals & brand",
        "STAGE 3: Base44 → Build full-stack MVP",
        "STAGE 4: ChatGPT → Write copy & marketing",
        "STAGE 5: Deploy → Share & get real feedback",
      ],
    },
    quickPrompts: [
      { label: "Full pipeline", prompt: "I want to build [idea]. Give me a 5-step plan using ChatGPT, Midjourney, and Base44." },
      { label: "Tool chain", prompt: "Take this [content] and prepare it for [next tool]. Format it as..." },
      { label: "30-min validation", prompt: "Help me validate this business idea in 30 minutes. Start with 5 critical questions." },
    ],
    skillsUnlocked: ["Tool Chaining", "AI Pipelines", "Speed Validation"],
    advancedTechniques: ["Multi-tool workflows", "Output chaining", "Rapid iteration"],
    wowFactor: "Validate a real business idea in 30 minutes",
  },
  "lesson-4": {
    lessonNumber: 4,
    title: "Vibe Coding Mastery with Base44",
    keyTakeaways: [
      "Base44: The cutting-edge vibe coding platform",
      "Build full-stack apps with databases in conversation",
      "User authentication in one prompt",
      "API integration without coding knowledge",
      "Debug by describing symptoms, not reading errors",
    ],
    template: {
      title: "Base44 Power Prompts",
      content: [
        "\"Create a [app type] with user accounts\"",
        "\"Add a database to store [data type]\"",
        "\"Connect to [external API] for [feature]\"",
        "\"When users click [X], it should [action]\"",
        "\"Something's wrong: [symptom]. It should [expected]\"",
      ],
    },
    quickPrompts: [
      { label: "Full-stack app", prompt: "Create a [app type] with user signup, a dashboard, and a way to [main action]." },
      { label: "Add database", prompt: "Add a database to store [items]. Each item should have [field1], [field2], and a timestamp." },
      { label: "Debug by symptom", prompt: "The [feature] isn't working. I expect it to [expected behavior] but instead [actual behavior]." },
    ],
    skillsUnlocked: ["Vibe Coding", "Full-Stack Building", "Conversational Debugging"],
    advancedTechniques: ["Database design by conversation", "Auth flows", "API integration"],
    wowFactor: "Build a SaaS app with user accounts in 20 minutes",
  },
  "lesson-5": {
    lessonNumber: 5,
    title: "AI Design Studio",
    keyTakeaways: [
      "Consistent character design across images",
      "Style transfer: Apply any aesthetic to anything",
      "Brand kit generation: Logo, colors, fonts in one flow",
      "AI video generation basics with Runway & Pika",
      "Product mockups that look professionally shot",
    ],
    template: {
      title: "Design Mastery Formula",
      content: [
        "CHARACTER: \"same style, same person, [description]\"",
        "STYLE TRANSFER: \"[subject] in the style of [reference]\"",
        "BRAND KIT: \"Logo + colors + typography for [brand]\"",
        "MOCKUP: \"[product] in lifestyle setting, professional photo\"",
        "--seed [number] for consistency across images",
      ],
    },
    quickPrompts: [
      { label: "Brand kit", prompt: "Create a complete brand kit for [startup]: modern logo, 3 brand colors, and recommended fonts." },
      { label: "Consistent chars", prompt: "[Character description], in [setting]. Use seed 12345 for consistency." },
      { label: "Product mockup", prompt: "Create a professional product mockup: [product] on a minimal desk setup, soft lighting --ar 16:9" },
    ],
    skillsUnlocked: ["Brand Systems", "Consistent Design", "AI Video Basics"],
    advancedTechniques: ["Seed consistency", "Style transfer", "Multi-asset generation"],
    wowFactor: "Create a complete brand identity in 15 minutes",
  },
  "lesson-6": {
    lessonNumber: 6,
    title: "Ship It Challenge",
    keyTakeaways: [
      "The 48-hour build: Idea to deployed app",
      "Real deployment to shareable URLs",
      "Portfolio-ready project with case study",
      "First 10 users acquisition strategy",
      "LinkedIn-shareable proof of skills",
    ],
    template: {
      title: "48-Hour Build Sprint",
      content: [
        "HOUR 0-4: Ideate & validate with ChatGPT",
        "HOUR 4-8: Design brand & visuals with AI",
        "HOUR 8-24: Build MVP with Base44",
        "HOUR 24-36: Iterate based on self-testing",
        "HOUR 36-48: Deploy, document, & share",
      ],
    },
    quickPrompts: [
      { label: "Launch checklist", prompt: "□ Problem validated\n□ MVP built in Base44\n□ Brand assets created\n□ Deployed to live URL\n□ First users contacted\n□ Case study written" },
      { label: "Case study", prompt: "Help me write a case study for my project: [name]. Include: problem, solution, building journey, results." },
      { label: "First 10 users", prompt: "I built [app]. Give me 5 specific places to find my first 10 users who have [problem]." },
    ],
    skillsUnlocked: ["Rapid Building", "Product Launch", "User Acquisition"],
    advancedTechniques: ["Speed building", "MVP scoping", "Launch strategy"],
    wowFactor: "Deploy a real app and get your first users",
  },
};

// Get summary by lesson order (1-6)
export function getSummaryByOrder(lessonOrder: number): LessonSummary | null {
  return lessonSummaries[`lesson-${lessonOrder}`] || null;
}

// Get all summaries as array
export function getAllSummaries(): LessonSummary[] {
  return Object.values(lessonSummaries);
}

// Age-specific content variations
export const ageTrackContent = {
  explorer: { // 9-11
    sessionLength: "15-20 min",
    projectTypes: ["pet tracker", "joke generator", "birthday countdown", "virtual pet"],
    language: "playful, visual, emojis",
    complexity: "fun and simple",
  },
  creator: { // 12-14
    sessionLength: "25-30 min", 
    projectTypes: ["homework tracker", "club manager", "study helper", "event planner"],
    language: "balanced, engaging",
    complexity: "practical and useful",
  },
  founder: { // 15-16
    sessionLength: "35-45 min",
    projectTypes: ["marketplace MVP", "SaaS prototype", "landing page", "startup dashboard"],
    language: "professional, business-focused",
    complexity: "startup-ready",
  },
};

export type AgeTrack = keyof typeof ageTrackContent;

export function getAgeTrack(age: number): AgeTrack {
  if (age <= 11) return "explorer";
  if (age <= 14) return "creator";
  return "founder";
}
