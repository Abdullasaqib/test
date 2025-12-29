// Demo data for school sales demonstrations
// Represents a "star student" - Alex Chen, age 13, Week 7 of Teen track

import type { Tables } from "@/integrations/supabase/types";

type Student = Tables<"students">;

// Valid UUIDs for demo mode
export const DEMO_STUDENT_ID = "00000000-0000-0000-0000-000000000001";
export const DEMO_USER_ID = "00000000-0000-0000-0000-000000000002";

export const DEMO_STUDENT: Partial<Student> & { id: string; full_name: string } = {
  id: DEMO_STUDENT_ID,
  user_id: DEMO_USER_ID,
  full_name: "Alex Chen",
  age: 13,
  program: "teen",
  country: "United States",
  city: "San Francisco",
  school_name: "Lincoln Middle School",
  grade: "8th Grade",
  idea_summary: "An app that helps students find study partners based on their schedule and subjects",
  pitch_total_xp: 850,
  pitch_level: 3,
  created_at: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(), // 50 days ago
};

export const DEMO_SKILL_SCORES = [
  { id: "00000000-0000-0000-0001-000000000001", student_id: DEMO_STUDENT_ID, skill: "PROBLEM_ANALYSIS", total_points: 85, missions_completed: 8, last_earned_at: new Date().toISOString() },
  { id: "00000000-0000-0000-0001-000000000002", student_id: DEMO_STUDENT_ID, skill: "AI_COLLABORATION", total_points: 92, missions_completed: 10, last_earned_at: new Date().toISOString() },
  { id: "00000000-0000-0000-0001-000000000003", student_id: DEMO_STUDENT_ID, skill: "CUSTOMER_RESEARCH", total_points: 78, missions_completed: 7, last_earned_at: new Date().toISOString() },
  { id: "00000000-0000-0000-0001-000000000004", student_id: DEMO_STUDENT_ID, skill: "DIGITAL_LITERACY", total_points: 88, missions_completed: 9, last_earned_at: new Date().toISOString() },
  { id: "00000000-0000-0000-0001-000000000005", student_id: DEMO_STUDENT_ID, skill: "ENTREPRENEURSHIP", total_points: 72, missions_completed: 6, last_earned_at: new Date().toISOString() },
  { id: "00000000-0000-0000-0001-000000000006", student_id: DEMO_STUDENT_ID, skill: "COMMUNICATION", total_points: 80, missions_completed: 8, last_earned_at: new Date().toISOString() },
  { id: "00000000-0000-0000-0001-000000000007", student_id: DEMO_STUDENT_ID, skill: "RESILIENCE", total_points: 65, missions_completed: 5, last_earned_at: new Date().toISOString() },
  { id: "00000000-0000-0000-0001-000000000008", student_id: DEMO_STUDENT_ID, skill: "SELF_MANAGEMENT", total_points: 70, missions_completed: 6, last_earned_at: new Date().toISOString() },
];

export const DEMO_PITCH_ATTEMPTS = [
  {
    id: "00000000-0000-0000-0002-000000000001",
    student_id: DEMO_STUDENT_ID,
    mission_id: null,
    video_url: null,
    transcript: "Hi, I'm Alex! I built StudyMatch because finding study partners at school is really hard...",
    duration_seconds: 95,
    investor_persona: "friendly",
    score: 82,
    scores: { communication: 85, confidence: 78, persuasion: 80, resilience: 82, business_thinking: 85 },
    questions_asked: [{ question: "How will you reach more students?", category: "growth" }],
    total_xp_earned: 120,
    ai_feedback: { opening: "Great energy!", strengths: ["Clear problem statement", "Relatable story"], improvements: ["Add market size"], overallComment: "Strong pitch!" },
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    is_public: false,
  },
  {
    id: "00000000-0000-0000-0002-000000000002",
    student_id: DEMO_STUDENT_ID,
    mission_id: null,
    video_url: null,
    transcript: "StudyMatch connects students who want to study together...",
    duration_seconds: 88,
    investor_persona: "analytical",
    score: 75,
    scores: { communication: 78, confidence: 72, persuasion: 74, resilience: 75, business_thinking: 76 },
    questions_asked: [{ question: "What are your user metrics?", category: "traction" }],
    total_xp_earned: 100,
    ai_feedback: { opening: "Good start", strengths: ["Data-driven approach"], improvements: ["More confidence"], overallComment: "Keep practicing!" },
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    is_public: false,
  },
];

export const DEMO_CURRENT_MISSION = {
  id: "00000000-0000-0000-0003-000000000001",
  week: 7,
  day: 3,
  day_number: 33,
  phase: 3,
  track: "teen",
  title: "Launch Your Landing Page",
  subtitle: "Share your product with the world",
  micro_content: "Today you'll create a simple landing page that explains your product and captures interested users.",
  lab_prompt: "Use an AI tool to create a landing page for StudyMatch. Include: a headline, value proposition, features, and email signup.",
  video_url: null,
  estimated_minutes: 30,
  artifact_type: "landing_page",
};

export const DEMO_MISSION_STEPS = [
  { id: "00000000-0000-0000-0004-000000000001", mission_id: "00000000-0000-0000-0003-000000000001", step_number: 1, title: "Write Your Headline", instruction: "Create a catchy headline that explains what your product does in one sentence.", prompt_help: "Help me write a headline for my app...", input_type: "text", input_placeholder: "Enter your headline...", example_output: null, is_required: true },
  { id: "00000000-0000-0000-0004-000000000002", mission_id: "00000000-0000-0000-0003-000000000001", step_number: 2, title: "Build with AI", instruction: "Use an AI tool to generate your landing page content.", prompt_help: "Generate a landing page for...", input_type: "textarea", input_placeholder: "Paste your AI-generated content...", example_output: null, is_required: true },
  { id: "00000000-0000-0000-0004-000000000003", mission_id: "00000000-0000-0000-0003-000000000001", step_number: 3, title: "Share Your Link", instruction: "Once your page is live, share the link!", prompt_help: null, input_type: "url", input_placeholder: "https://...", example_output: null, is_required: false },
];

export const DEMO_COMPLETED_MISSIONS = 32;
export const DEMO_TOTAL_MISSIONS = 60;

export const DEMO_CERTIFICATION_PROGRESS = {
  enrollment: {
    id: "00000000-0000-0000-0005-000000000001",
    student_id: DEMO_STUDENT_ID,
    certification_id: "prompt-engineering-fundamentals",
    enrolled_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    completed_at: null,
    certificate_number: null,
  },
  completedLessons: 4,
  totalLessons: 6,
};

export const DEMO_AI_COACH_MESSAGES = [
  { role: "assistant", content: "Hey Alex! 👋 I see you're working on your landing page for StudyMatch. That's exciting - Week 7 is all about going public with your idea! What's on your mind?" },
  { role: "user", content: "I'm not sure what to write for my headline. How do I make it catchy?" },
  { role: "assistant", content: "Great question! A strong headline should:\n\n1. **State the benefit** - What problem do you solve?\n2. **Be specific** - Who is it for?\n3. **Create curiosity** - Make them want to learn more\n\nFor StudyMatch, try: \"Find Your Perfect Study Partner in 30 Seconds\"\n\nOr: \"Never Study Alone Again\"\n\nWhat resonates with you? 🎯" },
];

// Tank level names for demo
export const DEMO_TANK_LEVEL = "Rising Pitcher";
export const DEMO_TANK_XP = 850;

// Demo streak data
export const DEMO_STREAK = {
  current_streak: 12,
  longest_streak: 18,
  last_challenge_date: new Date().toISOString().split('T')[0],
  total_challenges_completed: 47,
  total_xp_earned: 2850,
  streak_freezes_available: 2,
};

// Demo sprint access (FULL FOUNDATION equivalent)
export const DEMO_SPRINT_ACCESS = {
  hasAccess: true,
  isUnlimited: true,
  sprintsRemaining: Infinity,
  sprintsUsedThisMonth: 15,
  monthlyLimit: -1,
};

// Demo pricing tier (FULL FOUNDATION equivalent)
export const DEMO_PRICING_TIER = {
  id: "00000000-0000-0000-0006-000000000001",
  name: "FULL FOUNDATION",
  slug: "yearly-founder",
  type: "b2c" as const,
  current_price: 99,
  original_price: 149,
  monthly_price: 29,
  upfront_price: 99,
  billing_period: "yearly" as const,
  duration_months: 12,
  trial_days: 0,
  is_featured: true,
  badge_text: "BEST VALUE",
  certificates_included: ["prompt-engineering-fundamentals", "ai-founders-certificate"],
  features: {
    ai_coach_daily: 50,
    tank_weekly: -1,
    sprint_daily: -1,
    curriculum_access: "full" as const,
    case_studies: true,
    live_classes: false,
  },
};

// Demo track progress
export const DEMO_TRACK_PROGRESS = [
  {
    track_id: "00000000-0000-0000-0007-000000000001",
    challenges_completed: 12,
    discover_completed: 4,
    design_completed: 3,
    build_completed: 3,
    explore_completed: 2,
    total_xp: 1450,
  },
];

// Demo industry tracks
export const DEMO_INDUSTRY_TRACKS = [
  {
    id: "00000000-0000-0000-0007-000000000001",
    name: "AI + Technology",
    slug: "ai-technology",
    icon: "🤖",
    description: "Build apps and tools using AI",
    color_theme: "blue",
    skill_focus_areas: ["AI Prompting", "Product Design", "App Building"],
    is_active: true,
  },
  {
    id: "00000000-0000-0000-0007-000000000002",
    name: "AI + Healthcare",
    slug: "ai-healthcare",
    icon: "🏥",
    description: "Solve health problems with technology",
    color_theme: "green",
    skill_focus_areas: ["Health Tech", "Data Analysis", "User Research"],
    is_active: true,
  },
];

// Demo recent challenge attempts
export const DEMO_RECENT_ATTEMPTS = [
  {
    id: "00000000-0000-0000-0008-000000000001",
    challenge_id: "00000000-0000-0000-0009-000000000001",
    response: "I would focus on user retention by implementing a streak system and gamification...",
    score: 85,
    ai_feedback: "Excellent strategic thinking! You identified the core growth lever.",
    skills_awarded: ["ENTREPRENEURSHIP", "DIGITAL_LITERACY"],
    xp_earned: 45,
    time_spent_seconds: 180,
    completed_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    archetype: "The Strategist",
  },
  {
    id: "00000000-0000-0000-0008-000000000002",
    challenge_id: "00000000-0000-0000-0009-000000000002",
    response: "I analyzed the competitor landscape and found a gap in serving small businesses...",
    score: 78,
    ai_feedback: "Good market analysis! Consider adding more specific data points.",
    skills_awarded: ["CUSTOMER_RESEARCH"],
    xp_earned: 35,
    time_spent_seconds: 240,
    completed_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    archetype: "The Analyst",
  },
];

// Demo daily challenge
export const DEMO_DAILY_CHALLENGE = {
  id: "00000000-0000-0000-0009-000000000001",
  title: "Growth Strategy Sprint",
  scenario: "Your app StudyMatch just hit 100 users! But you noticed many users only open it once. As the CEO, you need to decide how to increase engagement.",
  question: "What's your strategy to turn these one-time users into daily active users?",
  success_criteria: ["Identifies user retention as key metric", "Proposes actionable strategy", "Considers user motivation"],
  category: "decision" as const,
  pillar: "build" as const,
  difficulty_level: "medium" as const,
  estimated_minutes: 5,
  age_range: "12-14",
  skills_developed: ["ENTREPRENEURSHIP", "DIGITAL_LITERACY", "PROBLEM_ANALYSIS"],
  xp_reward: 45,
  response_type: "freeform" as const,
  role_type: "CEO" as const,
  role_metadata: {
    role_title: "Chief Executive Officer",
    role_description: "As CEO, you're responsible for the overall vision and growth strategy of your startup.",
    role_emoji: "👔",
    typical_decisions: ["Product direction", "Growth strategy", "Team priorities"],
  },
  real_world_context: {
    fun_facts: ["Instagram gained 1 million users in just 2 months after launch!"],
    career_connections: ["Product Manager", "Growth Hacker", "Startup Founder"],
    company_examples: ["Duolingo uses streaks to boost daily engagement by 3x"],
    did_you_know: "The average app loses 77% of its users within the first 3 days",
  },
};
