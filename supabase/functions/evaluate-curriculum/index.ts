import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, mission, evaluation } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (action === "generate_improved") {
      // Generate an improved version of the mission using AI
      const systemPrompt = `You are an expert curriculum designer for a youth entrepreneurship program (ages 9-15). Your task is to improve educational missions.

QUALITY CRITERIA:
1. NO personal information requests (name, age, location)
2. Clear, measurable learning outcomes
3. Specific AI prompts provided (not "ask AI")
4. Structured artifact templates (cards, worksheets)
5. Age-appropriate language and complexity
6. Step-by-step instructions
7. Builds real entrepreneurship skills
8. Connected to real-world applications

TRACK GUIDELINES:
- Junior (9-11): Simpler language, 15-25 min tasks, visual outputs, playful tone
- Teen (12-14): Moderate complexity, 25-40 min, documents/prototypes, balanced tone
- Advanced (15-16): Professional language, 35-50 min, investor-grade outputs

OUTPUT FORMAT:
Return a JSON object with:
{
  "micro_content": "The improved lesson content (what students learn)",
  "lab_prompt": "The improved hands-on activity instructions"
}`;

      const userPrompt = `Improve this ${mission.track} track mission (Week ${mission.week}, Day ${mission.day}):

CURRENT MISSION:
Title: ${mission.title}
Estimated Time: ${mission.estimated_minutes} minutes
Artifact Type: ${mission.artifact_type || "none"}

CURRENT MICRO CONTENT:
${mission.micro_content}

CURRENT LAB PROMPT:
${mission.lab_prompt}

${evaluation?.flags?.length > 0 ? `
ISSUES TO FIX:
${evaluation.flags.join("\n")}

SUGGESTIONS:
${evaluation.suggestions?.join("\n") || "None"}
` : ""}

Create an improved version that:
1. Removes any personal information requests
2. Adds specific AI prompts students can copy/paste
3. Uses structured templates (e.g., "Problem Discovery Card" with fields)
4. Has clear step-by-step instructions
5. Produces a tangible artifact
6. Is appropriate for the ${mission.track} age group

Return only valid JSON.`;

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
            { role: "user", content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 2000
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("AI gateway error:", response.status, errorText);
        
        if (response.status === 429) {
          return new Response(
            JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
            { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        if (response.status === 402) {
          return new Response(
            JSON.stringify({ error: "AI credits depleted. Please add funds." }),
            { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        throw new Error(`AI gateway error: ${response.status}`);
      }

      const aiResponse = await response.json();
      const content = aiResponse.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error("No content in AI response");
      }

      // Parse JSON from response (handle potential markdown code blocks)
      let improved_version;
      try {
        // Remove markdown code blocks if present
        const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, content];
        const jsonStr = jsonMatch[1].trim();
        improved_version = JSON.parse(jsonStr);
      } catch (parseError) {
        console.error("Failed to parse AI response:", content);
        throw new Error("Failed to parse AI response as JSON");
      }

      return new Response(
        JSON.stringify({ improved_version }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Unknown action" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("evaluate-curriculum error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});