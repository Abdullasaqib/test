import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOVABLE_AI_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { application_id } = await req.json();

    if (!application_id) {
      return new Response(
        JSON.stringify({ error: "Missing application_id" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // 1. Fetch application details
    console.log(`Fetching application: ${application_id}`);
    const { data: app, error: appError } = await supabase
      .from("applications")
      .select("*")
      .eq("id", application_id)
      .maybeSingle();

    if (appError || !app) {
      console.error("Application fetch error:", appError);
      return new Response(
        JSON.stringify({ error: "Application not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Update status to processing
    console.log("Updating status to processing");
    await supabase
      .from("applications")
      .update({ status: "processing" })
      .eq("id", application_id);

    // 3. Build AI scoring prompt
    const systemPrompt = `You are an expert startup judge evaluating pitch videos for the Founders Olympiad 2025, a global competition for student founders ages 13-19.

Your role is to provide fair, constructive, and encouraging feedback that helps young entrepreneurs improve their pitches while identifying the most promising ventures.

EVALUATION PHILOSOPHY:
- Be constructive and encouraging - these are students learning entrepreneurship
- Recognize age-appropriate achievements (a 13-year-old's feasibility differs from a 19-year-old's)
- Value passion and originality highly - these predict future success
- Consider cultural context - startups from different countries face different markets
- Reward evidence of action (user interviews, prototypes, early customers)`;

    const userPrompt = `Evaluate this 90-second pitch video for Round 1 of the Founders Olympiad 2025.

FOUNDER PROFILE:
- Name: ${app.founder_name}
- Age: ${app.age} years old
- Country: ${app.country}
- City: ${app.city || "Not specified"}
- School: ${app.school_name}
- Grade: ${app.grade || "Not specified"}

STARTUP:
- Name: ${app.startup_name}
- Pitch: ${app.pitch_description}
- Problem Statement: ${app.problem_statement}
- Solution: ${app.solution_description}
- Target Market: ${app.target_market || "Not specified"}

VIDEO DETAILS:
- Duration: ${app.video_duration} seconds
- URL: ${app.video_url}
- Submitted: ${new Date(app.video_submitted_at).toISOString()}

EVALUATION CRITERIA (100-point scale):

1. CLARITY (0-30 points):
   - Is the problem clearly defined and relatable?
   - Is the solution easy to understand?
   - Does the pitch flow logically?
   - Are key points communicated effectively?
   
2. FEASIBILITY (0-30 points):
   - Can this be built by a ${app.age}-year-old student?
   - Are the technical requirements reasonable?
   - Is the timeline realistic?
   - Does the founder show understanding of execution challenges?
   
3. PASSION (0-20 points):
   - Does the founder demonstrate genuine enthusiasm?
   - Is there evidence of personal commitment?
   - Does the delivery engage the viewer?
   - Is there authentic connection to the problem?
   
4. ORIGINALITY (0-20 points):
   - Is the idea unique or a fresh take on existing solutions?
   - Does it show creative problem-solving?
   - Is there innovation in the approach?
   - Does it stand out from typical student projects?

SCORING GUIDELINES:
- 90-100: Exceptional - Top 1% potential, ready for next level
- 80-89: Excellent - Strong contender, minor improvements needed
- 70-79: Good - Solid foundation, notable strengths and areas to develop
- 60-69: Average - Has potential, needs significant refinement
- 50-59: Below Average - Concept needs major rework
- Below 50: Needs fundamental reconsideration

Provide detailed, actionable feedback that:
- Celebrates specific strengths
- Identifies 2-3 concrete improvements
- Suggests next steps for development
- Maintains an encouraging, constructive tone`;

    // 4. Call Lovable AI with structured output using tool calling
    console.log("Calling Lovable AI for evaluation");
    const aiResponse = await fetch(LOVABLE_AI_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "evaluate_pitch",
              description: "Evaluate a startup pitch video and provide structured feedback",
              parameters: {
                type: "object",
                properties: {
                  overall_score: {
                    type: "number",
                    description: "Overall score out of 100",
                    minimum: 0,
                    maximum: 100,
                  },
                  clarity_score: {
                    type: "number",
                    description: "Clarity score out of 30",
                    minimum: 0,
                    maximum: 30,
                  },
                  feasibility_score: {
                    type: "number",
                    description: "Feasibility score out of 30",
                    minimum: 0,
                    maximum: 30,
                  },
                  passion_score: {
                    type: "number",
                    description: "Passion score out of 20",
                    minimum: 0,
                    maximum: 20,
                  },
                  originality_score: {
                    type: "number",
                    description: "Originality score out of 20",
                    minimum: 0,
                    maximum: 20,
                  },
                  feedback: {
                    type: "string",
                    description: "Comprehensive feedback paragraph (3-5 sentences)",
                  },
                  strengths: {
                    type: "array",
                    description: "List of 2-4 specific strengths",
                    items: { type: "string" },
                    minItems: 2,
                    maxItems: 4,
                  },
                  improvements: {
                    type: "array",
                    description: "List of 2-3 concrete areas for improvement",
                    items: { type: "string" },
                    minItems: 2,
                    maxItems: 3,
                  },
                  next_steps: {
                    type: "array",
                    description: "List of 2-3 actionable next steps",
                    items: { type: "string" },
                    minItems: 2,
                    maxItems: 3,
                  },
                },
                required: [
                  "overall_score",
                  "clarity_score",
                  "feasibility_score",
                  "passion_score",
                  "originality_score",
                  "feedback",
                  "strengths",
                  "improvements",
                  "next_steps",
                ],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "evaluate_pitch" } },
        temperature: 0.3, // Lower temperature for more consistent scoring
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("Lovable AI error:", aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded, please try again later" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service payment required" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "AI evaluation failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResponse.json();
    console.log("AI response received");

    // Parse the structured output from tool call
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall || toolCall.function.name !== "evaluate_pitch") {
      console.error("Invalid AI response format:", JSON.stringify(aiData));
      return new Response(
        JSON.stringify({ error: "Invalid AI response format" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const scores = JSON.parse(toolCall.function.arguments);
    console.log("Scores parsed:", scores);

    // 5. Calculate final score with bonuses
    let finalScore = scores.overall_score;

    // Early submission bonus (+5 points if submitted in first 7 days)
    const submittedDate = new Date(app.video_submitted_at);
    const roundStartDate = new Date("2025-02-15T00:00:00Z");
    const daysSinceStart = Math.floor(
      (submittedDate.getTime() - roundStartDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    let bonusDetails = [];
    if (daysSinceStart >= 0 && daysSinceStart <= 7) {
      finalScore += 5;
      bonusDetails.push({ type: "early_submission", points: 5, reason: "Submitted in first week" });
      console.log("Early submission bonus applied: +5 points");
    }

    // Video duration bonus (+3 points for optimal length 85-90 seconds)
    if (app.video_duration >= 85 && app.video_duration <= 90) {
      finalScore += 3;
      bonusDetails.push({ type: "optimal_duration", points: 3, reason: "Perfect pitch length (85-90s)" });
      console.log("Optimal duration bonus applied: +3 points");
    }

    // Cap final score at 100
    finalScore = Math.min(finalScore, 100);
    console.log(`Final score calculated: ${finalScore} (base: ${scores.overall_score})`);

    // 6. Update application with scores and feedback
    const feedbackData = {
      overall_score: scores.overall_score,
      clarity_score: scores.clarity_score,
      feasibility_score: scores.feasibility_score,
      passion_score: scores.passion_score,
      originality_score: scores.originality_score,
      feedback: scores.feedback,
      strengths: scores.strengths,
      improvements: scores.improvements,
      next_steps: scores.next_steps,
      bonuses: bonusDetails,
      evaluated_at: new Date().toISOString(),
    };

    console.log("Updating application with scores");
    const { error: updateError } = await supabase
      .from("applications")
      .update({
        ai_score: scores.overall_score,
        final_score: finalScore,
        ai_feedback: feedbackData,
        clarity_score: scores.clarity_score,
        feasibility_score: scores.feasibility_score,
        founder_confidence_score: scores.passion_score, // Map passion to founder_confidence
        status: "ai_scored",
        scored_at: new Date().toISOString(),
      })
      .eq("id", application_id);

    if (updateError) {
      console.error("Database update error:", updateError);
      return new Response(
        JSON.stringify({ error: updateError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Successfully scored application ${application_id}: ${finalScore}/100`);

    return new Response(
      JSON.stringify({
        success: true,
        application_id,
        final_score: finalScore,
        ai_score: scores.overall_score,
        feedback: feedbackData,
        message: "Pitch evaluated successfully",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in score-pitch-ai function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
