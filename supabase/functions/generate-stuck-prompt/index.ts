import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.81.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface StuckRequest {
  tryingToDo: string;
  whatTried: string;
  blockers: string[];
  studentContext: {
    currentWeek: number;
    program: string;
    ideaSummary?: string;
  };
  studentId?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { tryingToDo, whatTried, blockers, studentContext, studentId }: StuckRequest = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Check rate limit if studentId is provided
    if (studentId && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      
      const { data: limitCheck, error: limitError } = await supabase.rpc("check_ai_rate_limit", {
        p_student_id: studentId,
        p_feature: "stuck_prompt",
      });

      if (limitError) {
        console.error("Rate limit check error:", limitError);
      } else if (limitCheck && !limitCheck.allowed) {
        console.log("Rate limit exceeded for student:", studentId, limitCheck);
        return new Response(JSON.stringify({ 
          error: "Daily limit reached for prompt helper. Try again tomorrow!",
          rateLimitInfo: limitCheck
        }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const systemPrompt = `You are a helpful AI assistant for young entrepreneurs (ages 9-16) who are building their first startups.
Your job is to help them get unstuck by generating a perfect AI prompt they can use.

The student is in Week ${studentContext.currentWeek} of a 12-week program.
${studentContext.ideaSummary ? `Their business idea: ${studentContext.ideaSummary}` : ''}
Program track: ${studentContext.program}

Guidelines:
- Use simple, encouraging language appropriate for kids
- Be specific and actionable
- The generated prompt should be easy to copy and use with ChatGPT or similar
- Include placeholders like [YOUR PRODUCT] that they can fill in
- Keep prompts under 150 words
- Be encouraging - remind them that getting stuck is normal!`;

    const userMessage = `A student is stuck and needs help.

What they're trying to do: ${tryingToDo}
What they've already tried: ${whatTried}
What's blocking them: ${blockers.join(', ')}

Please generate:
1. A custom prompt they can use with AI to solve this problem
2. A brief explanation of why this prompt will help (2-3 sentences)
3. 2-3 suggested next steps after they get the AI response

Format your response as JSON:
{
  "generatedPrompt": "the custom prompt here",
  "explanation": "why this will help",
  "nextSteps": ["step 1", "step 2", "step 3"]
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
          { role: "user", content: userMessage }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON response
    let result;
    try {
      // Extract JSON from the response (handle markdown code blocks)
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content;
      result = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      // Return a fallback response
      result = {
        generatedPrompt: `Help me with ${tryingToDo}. I've already tried ${whatTried} but I'm stuck because ${blockers.join(' and ')}. Can you give me step-by-step guidance that a teenager could follow?`,
        explanation: "This prompt explains your situation clearly and asks for step-by-step help that's appropriate for your age level.",
        nextSteps: [
          "Copy this prompt and paste it into ChatGPT",
          "Read the response carefully and try the first suggestion",
          "If it doesn't work, come back and try the 'I'm Stuck' helper again"
        ]
      };
    }

    // Record usage if studentId provided
    if (studentId && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      await supabase.from("student_ai_usage").insert({
        student_id: studentId,
        feature: "stuck_prompt",
        tokens_input: 300,
        tokens_output: 400,
      });
      console.log("Recorded stuck prompt usage for student:", studentId);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in generate-stuck-prompt:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
