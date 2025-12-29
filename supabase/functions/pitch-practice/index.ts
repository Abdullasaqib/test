import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Investor personas inspired by Shark Tank
const INVESTOR_PERSONAS = {
  mentor: {
    name: "The Mentor",
    style: "Barbara Corcoran",
    personality: "Warm and encouraging. Focuses on the founder's potential and personal story. Asks supportive questions while gently probing weaknesses.",
    difficulty: 1,
    xpMultiplier: 1.0,
  },
  visionary: {
    name: "The Visionary", 
    style: "Mark Cuban",
    personality: "Big-picture thinker. Excited by disruption and scale. Asks about market size, competition, and your unique advantage. Direct but fair.",
    difficulty: 2,
    xpMultiplier: 1.2,
  },
  brand_builder: {
    name: "The Brand Builder",
    style: "Daymond John",
    personality: "Focuses on branding, marketing, and customer connection. Wants to know your story and how you'll build a community around your product.",
    difficulty: 2,
    xpMultiplier: 1.2,
  },
  numbers: {
    name: "The Numbers Guy",
    style: "Kevin O'Leary",
    personality: "All about the money. Blunt and challenging. Demands clear financials, unit economics, and path to profitability. Calls out weak numbers.",
    difficulty: 3,
    xpMultiplier: 1.5,
  },
  retail_queen: {
    name: "The Retail Queen",
    style: "Lori Greiner",
    personality: "Product-focused expert. Evaluates if your product solves a real problem and if customers will actually buy it. Tough but insightful.",
    difficulty: 3,
    xpMultiplier: 1.5,
  },
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transcript, persona, studentContext } = await req.json();
    
    if (!transcript || !persona) {
      return new Response(
        JSON.stringify({ error: "Missing transcript or persona" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const investor = INVESTOR_PERSONAS[persona as keyof typeof INVESTOR_PERSONAS];
    if (!investor) {
      return new Response(
        JSON.stringify({ error: "Invalid investor persona" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are "${investor.name}" (inspired by ${investor.style} from Shark Tank), evaluating a young entrepreneur's pitch.

PERSONALITY: ${investor.personality}

DIFFICULTY LEVEL: ${investor.difficulty}/3 (${investor.difficulty === 1 ? 'Encouraging' : investor.difficulty === 2 ? 'Challenging' : 'Tough'})

Your task is to evaluate this pitch and provide structured feedback. You must be in character but remember these are young founders (ages 9-16) so be age-appropriate while still being educational.

STUDENT CONTEXT:
${studentContext ? `- Name: ${studentContext.name || 'Young Founder'}
- Age: ${studentContext.age || 'Teen'}
- Startup Idea: ${studentContext.idea || 'Not specified'}
- Stage: ${studentContext.stage || 'Early'}` : 'New founder, first pitch'}

SCORING CRITERIA (score each 0-15):
1. COMMUNICATION: Clarity of speech, structure, easy to follow
2. CONFIDENCE: Body language cues in speech, conviction, enthusiasm  
3. PERSUASION: Compelling story, clear value proposition, emotional connection
4. RESILIENCE: How well they handle the concept of challenges (based on what they mention)
5. BUSINESS_THINKING: Understanding of problem, solution, market, basic economics

Respond with a JSON object in this exact format:
{
  "scores": {
    "communication": <0-15>,
    "confidence": <0-15>,
    "persuasion": <0-15>,
    "resilience": <0-15>,
    "business_thinking": <0-15>
  },
  "totalScore": <sum of all scores>,
  "verdict": "<DEAL or NO_DEAL or MAYBE>",
  "feedback": {
    "opening": "<Your in-character opening reaction, 1-2 sentences>",
    "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
    "improvements": ["<improvement 1>", "<improvement 2>"],
    "overallComment": "<2-3 sentence summary in character>"
  },
  "questions": [
    {"question": "<follow-up question 1 in character>", "category": "<what skill this tests>"},
    {"question": "<follow-up question 2 in character>", "category": "<what skill this tests>"},
    {"question": "<follow-up question 3 in character>", "category": "<what skill this tests>"}
  ],
  "nextTip": "<One specific actionable tip for their next pitch>"
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Here is the pitch transcript to evaluate:\n\n"${transcript}"` }
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            error: "rate_limit",
            message: "Our AI investor is busy! Please wait a moment and try again."
          }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ 
            error: "credits_depleted",
            message: "AI evaluation is temporarily unavailable. Please try again later."
          }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error("No content in AI response");
    }

    let evaluation;
    try {
      evaluation = JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI evaluation");
    }

    // Calculate XP earned with difficulty multiplier
    const baseXP = evaluation.totalScore || 0;
    const xpEarned = Math.round(baseXP * investor.xpMultiplier);

    return new Response(
      JSON.stringify({
        ...evaluation,
        xpEarned,
        investor: {
          name: investor.name,
          style: investor.style,
          difficulty: investor.difficulty,
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in pitch-practice:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
