import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pitch_description, problem_statement, solution_description, user_id } = await req.json();
    
    console.log("Scoring application for user:", user_id);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Prepare AI prompt for scoring
    const systemPrompt = `You are an expert startup evaluator for a youth accelerator program. 
Evaluate startup applications on three dimensions:
1. Clarity (0-10): How clear and well-articulated is the idea?
2. Feasibility (0-10): How realistic is the execution plan?
3. Founder Confidence (0-10): How convinced and ready does the founder seem?

Provide scores and constructive feedback that helps young founders improve.`;

    const userPrompt = `Evaluate this startup application:

PITCH: ${pitch_description}

PROBLEM: ${problem_statement}

SOLUTION: ${solution_description}

Provide:
1. A clarity score (0-10)
2. A feasibility score (0-10)
3. A founder confidence score (0-10)
4. Brief constructive feedback (2-3 sentences) highlighting strengths and areas for improvement

Format your response as JSON:
{
  "clarity_score": <number>,
  "feasibility_score": <number>,
  "founder_confidence_score": <number>,
  "feedback": "<string>"
}`;

    // Call Lovable AI
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errorText);
      throw new Error(`AI gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices?.[0]?.message?.content;
    
    if (!aiContent) {
      throw new Error("No content in AI response");
    }

    console.log("AI response:", aiContent);

    // Parse AI response
    let scores;
    try {
      // Try to extract JSON from the response
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        scores = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback if JSON parsing fails
        scores = {
          clarity_score: 7.0,
          feasibility_score: 7.0,
          founder_confidence_score: 7.0,
          feedback: aiContent
        };
      }
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      scores = {
        clarity_score: 7.0,
        feasibility_score: 7.0,
        founder_confidence_score: 7.0,
        feedback: aiContent
      };
    }

    // Calculate overall score
    const overallScore = (
      (scores.clarity_score + scores.feasibility_score + scores.founder_confidence_score) / 3
    ).toFixed(1);

    // Update application with scores
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase credentials not configured");
    }

    const updateResponse = await fetch(`${supabaseUrl}/rest/v1/applications?user_id=eq.${user_id}&status=eq.submitted`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${supabaseServiceKey}`,
        "apikey": supabaseServiceKey || "",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        ai_score: parseFloat(overallScore),
        clarity_score: scores.clarity_score,
        feasibility_score: scores.feasibility_score,
        founder_confidence_score: scores.founder_confidence_score,
        ai_feedback: { feedback: scores.feedback },
        status: 'ai_scored',
        scored_at: new Date().toISOString(),
      }),
    });

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.error("Update error:", updateResponse.status, errorText);
      throw new Error("Failed to update application");
    }

    console.log("Application scored successfully");

    return new Response(
      JSON.stringify({ 
        success: true,
        overall_score: overallScore,
        scores 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in score-application:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
