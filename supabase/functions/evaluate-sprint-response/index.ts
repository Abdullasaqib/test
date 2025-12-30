import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

import { checkRateLimit } from "../_shared/security.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { challengeId, studentId, response, timeSpentSeconds } = await req.json();

    if (!challengeId || !studentId || !response) {
      throw new Error('Missing required fields: challengeId, studentId, response');
    }

    // Rate limiting: 5 requests per minute per student
    const rateLimitKey = `sprint_eval_${studentId}`;
    const rateLimit = checkRateLimit(rateLimitKey, 5, 60000);

    if (!rateLimit.allowed) {
      const resetIn = Math.ceil((rateLimit.resetAt - Date.now()) / 1000);
      return new Response(
        JSON.stringify({
          error: `Rate limit exceeded. Please wait ${resetIn} seconds.`,
          message: `You're improved very fast! Please wait ${resetIn}s before next submission.`
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch the challenge
    const { data: challenge, error: challengeError } = await supabase
      .from('challenges')
      .select('*')
      .eq('id', challengeId)
      .single();

    if (challengeError || !challenge) {
      throw new Error('Challenge not found');
    }

    console.log('Evaluating response for challenge:', challenge.title);
    console.log('Response type:', challenge.response_type);
    console.log('Role type:', challenge.role_type);

    // Detect if this is a multiple-choice challenge
    const isMultipleChoice = challenge.response_type === 'multiple_choice';
    let selectedOption = '';
    let reasoning = response;

    if (isMultipleChoice) {
      // Parse the MC response format: "Selected: A - Option text\nReasoning: ..."
      const selectedMatch = response.match(/^Selected:\s*([A-D])\s*-\s*(.+?)(?:\n|$)/);
      const reasoningMatch = response.match(/Reasoning:\s*(.+)$/s);

      if (selectedMatch) {
        selectedOption = selectedMatch[1];
        console.log('Selected option:', selectedOption);
      }
      if (reasoningMatch) {
        reasoning = reasoningMatch[1].trim();
        console.log('Reasoning:', reasoning);
      }
    }

    // Build role context if role-based challenge
    let roleContext = '';
    if (challenge.role_type && challenge.role_metadata) {
      const roleMeta = challenge.role_metadata;
      roleContext = `
ROLE CONTEXT:
The student is acting as the ${roleMeta.role_title || challenge.role_type} (${roleMeta.role_emoji || ''}).
Role Description: ${roleMeta.role_description || 'A key leadership position'}
Typical Decisions: ${roleMeta.typical_decisions?.join(', ') || 'Strategic decisions'}

Evaluate their response considering whether they demonstrated appropriate ${challenge.role_type} thinking and priorities.
`;
    }

    // Use Lovable AI to evaluate the response
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');

    // Build evaluation prompt based on response type
    let evaluationPrompt: string;

    // Build the structured feedback instruction
    const feedbackInstruction = `
IMPORTANT: Provide STRUCTURED feedback in this format:
- "praise": One short sentence (max 15 words) celebrating what they did well. Be specific!
- "insight": One founder tip or insight (max 20 words) they can use next time.
- "next_challenge": One actionable suggestion (max 15 words) for their next challenge.

Examples of GOOD feedback:
- praise: "You spotted the customer pain point immediately!"
- insight: "Great founders also think about timing and market readiness."
- next_challenge: "Try asking 'what would competitors do?' next time."

Examples of BAD feedback (too generic):
- "Good job!" (not specific)
- "You need to think more about the problem." (not actionable)
`;

    if (isMultipleChoice) {
      const options = challenge.response_options?.options || [];
      const optionsText = options.map((opt: { id: string; text: string }) =>
        `${opt.id}: ${opt.text}`
      ).join('\n');

      evaluationPrompt = `You are an expert mentor evaluating a young founder's multiple-choice response to a business challenge.

CHALLENGE:
Title: ${challenge.title}
Scenario: ${challenge.scenario}
Question: ${challenge.question}

OPTIONS PROVIDED:
${optionsText}

STUDENT'S CHOICE: Option ${selectedOption}
STUDENT'S REASONING: "${reasoning}"

SUCCESS CRITERIA (what makes each option stronger/weaker):
${JSON.stringify(challenge.success_criteria, null, 2)}

SKILLS BEING DEVELOPED: ${JSON.stringify(challenge.skills_developed)}
${roleContext}

Evaluate this response. Consider:
1. Was their choice reasonable given the situation? (40% of score)
2. Is their reasoning quality - do they explain WHY well? (60% of score)

A good answer shows thoughtful reasoning, not just picking the "right" option.
${feedbackInstruction}

Respond in this exact JSON format:
{
  "score": <number 0-100>,
  "praise": "<short specific praise>",
  "insight": "<one founder tip>",
  "next_challenge": "<actionable suggestion>",
  "skills_demonstrated": ["skill1", "skill2"],
  "archetype": "<one of: strategist, innovator, pragmatist, disruptor, collaborator, visionary>"${challenge.role_type ? `,
  "role_feedback": "<1 sentence about how they performed as a ${challenge.role_type}>"` : ''}
}`;
    } else {
      evaluationPrompt = `You are an expert mentor evaluating a young founder's response to a business challenge.

CHALLENGE:
Title: ${challenge.title}
Scenario: ${challenge.scenario}
Question: ${challenge.question}

SUCCESS CRITERIA (what a good answer should include):
${JSON.stringify(challenge.success_criteria, null, 2)}

SKILLS BEING DEVELOPED: ${JSON.stringify(challenge.skills_developed)}
${roleContext}

STUDENT'S RESPONSE:
"${response}"

Evaluate this response and provide:
1. A score from 0-100 based on how well it meets the success criteria
2. Structured feedback (see below)
3. Which skills from the list they demonstrated
4. A founder archetype that best matches their thinking style

FOUNDER ARCHETYPES (pick the one that best fits their response):
- "strategist": Thinks methodically, considers multiple angles, plans ahead
- "innovator": Creative solutions, unique perspectives, thinks outside the box
- "pragmatist": Practical, focused on what works, efficient solutions
- "disruptor": Challenges assumptions, bold ideas, unconventional approaches
- "collaborator": Team-focused, considers stakeholders, builds consensus
- "visionary": Big-picture thinking, ambitious goals, inspiring ideas
${feedbackInstruction}

Respond in this exact JSON format:
{
  "score": <number 0-100>,
  "praise": "<short specific praise>",
  "insight": "<one founder tip>",
  "next_challenge": "<actionable suggestion>",
  "skills_demonstrated": ["skill1", "skill2"],
  "archetype": "<one of: strategist, innovator, pragmatist, disruptor, collaborator, visionary>"${challenge.role_type ? `,
  "role_feedback": "<1 sentence about how they performed as a ${challenge.role_type}>"` : ''}
}

Be encouraging but honest. A score of 70+ means they addressed most criteria. 85+ means excellent. Below 50 means they missed key points.`;
    }

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are a supportive mentor for young entrepreneurs. Always respond with valid JSON.' },
          { role: 'user', content: evaluationPrompt }
        ],
        temperature: 0.7,
        max_tokens: 600,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);

      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({
            error: 'rate_limit',
            message: 'Our AI mentor is busy! Please wait a moment and try again.',
            retryAfter: true
          }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({
            error: 'credits_depleted',
            message: 'AI evaluation is temporarily unavailable. Please try again later.'
          }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error('Failed to evaluate response with AI');
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices[0].message.content;

    console.log('AI evaluation:', aiContent);

    // Parse the AI response
    let evaluation;
    try {
      // Extract JSON from the response (handle markdown code blocks)
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        evaluation = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Fallback evaluation with structured feedback
      evaluation = {
        score: 70,
        praise: "Great effort on this challenge!",
        insight: "Founders learn by doing - you're on the right track.",
        next_challenge: "Try thinking about what competitors might do.",
        skills_demonstrated: challenge.skills_developed.slice(0, 2),
        archetype: "innovator"
      };
    }

    // Ensure archetype has a valid value
    const validArchetypes = ['strategist', 'innovator', 'pragmatist', 'disruptor', 'collaborator', 'visionary'];
    if (!evaluation.archetype || !validArchetypes.includes(evaluation.archetype)) {
      evaluation.archetype = 'innovator';
    }

    // Build structured feedback object
    const structuredFeedback = {
      praise: evaluation.praise || evaluation.feedback || "Great effort!",
      insight: evaluation.insight || "",
      next_challenge: evaluation.next_challenge || ""
    };

    // Calculate XP based on score
    const baseXP = challenge.xp_reward;
    const xpEarned = Math.round((evaluation.score / 100) * baseXP);

    // Save the attempt with archetype and role_feedback
    const { data: attempt, error: attemptError } = await supabase
      .from('challenge_attempts')
      .insert({
        student_id: studentId,
        challenge_id: challengeId,
        response: response,
        score: evaluation.score,
        ai_feedback: JSON.stringify(structuredFeedback),
        skills_awarded: evaluation.skills_demonstrated,
        xp_earned: xpEarned,
        time_spent_seconds: timeSpentSeconds || null,
        archetype: evaluation.archetype,
        role_feedback: evaluation.role_feedback || null,
      })
      .select()
      .single();

    if (attemptError) {
      console.error('Failed to save attempt:', attemptError);
      throw new Error('Failed to save attempt');
    }

    // Update skill_scores for each skill demonstrated
    console.log('Updating skill scores for:', evaluation.skills_demonstrated);
    for (const skill of evaluation.skills_demonstrated || []) {
      const skillPoints = Math.round(xpEarned / (evaluation.skills_demonstrated?.length || 1));

      // Check if skill score exists
      const { data: existingSkill } = await supabase
        .from('skill_scores')
        .select('*')
        .eq('student_id', studentId)
        .eq('skill', skill)
        .single();

      if (existingSkill) {
        await supabase
          .from('skill_scores')
          .update({
            total_points: existingSkill.total_points + skillPoints,
            missions_completed: existingSkill.missions_completed + 1,
            last_earned_at: new Date().toISOString(),
          })
          .eq('id', existingSkill.id);
      } else {
        await supabase
          .from('skill_scores')
          .insert({
            student_id: studentId,
            skill: skill,
            total_points: skillPoints,
            missions_completed: 1,
            last_earned_at: new Date().toISOString(),
          });
      }
    }

    // Track archetype history for Founder DNA
    if (evaluation.archetype) {
      // Get existing archetype counts
      const { data: existingProfile } = await supabase
        .from('strength_profiles')
        .select('*')
        .eq('student_id', studentId)
        .single();

      if (existingProfile) {
        // Update archetype counts (stored as JSON in signature_strengths)
        const archetypeCounts = (existingProfile.signature_strengths as Record<string, number>) || {};
        archetypeCounts[evaluation.archetype] = (archetypeCounts[evaluation.archetype] || 0) + 1;

        // Find dominant archetype
        let dominantArchetype = evaluation.archetype;
        let maxCount = 0;
        for (const [arch, count] of Object.entries(archetypeCounts)) {
          if (count > maxCount) {
            maxCount = count;
            dominantArchetype = arch;
          }
        }

        await supabase
          .from('strength_profiles')
          .update({
            signature_strengths: archetypeCounts,
            founder_type: dominantArchetype,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingProfile.id);
      } else {
        // Create new profile
        await supabase
          .from('strength_profiles')
          .insert({
            student_id: studentId,
            signature_strengths: { [evaluation.archetype]: 1 },
            founder_type: evaluation.archetype,
          });
      }
    }

    // Update streak
    const today = new Date().toISOString().split('T')[0];

    const { data: existingStreak } = await supabase
      .from('student_streaks')
      .select('*')
      .eq('student_id', studentId)
      .single();

    if (existingStreak) {
      const lastDate = existingStreak.last_challenge_date;
      let newStreak = existingStreak.current_streak;

      if (lastDate) {
        const lastDateObj = new Date(lastDate);
        const todayObj = new Date(today);
        const diffDays = Math.floor((todayObj.getTime() - lastDateObj.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
          // Same day, streak stays the same
        } else if (diffDays === 1) {
          // Consecutive day, increment streak
          newStreak += 1;
        } else if (diffDays > 1) {
          // Streak broken, check for freeze
          if (existingStreak.streak_frozen_until && new Date(existingStreak.streak_frozen_until) >= todayObj) {
            // Freeze active, keep streak
          } else {
            // Reset streak
            newStreak = 1;
          }
        }
      } else {
        newStreak = 1;
      }

      const longestStreak = Math.max(newStreak, existingStreak.longest_streak);

      await supabase
        .from('student_streaks')
        .update({
          current_streak: newStreak,
          longest_streak: longestStreak,
          last_challenge_date: today,
          total_challenges_completed: existingStreak.total_challenges_completed + 1,
          total_xp_earned: existingStreak.total_xp_earned + xpEarned,
        })
        .eq('student_id', studentId);
    } else {
      // Create new streak record
      await supabase
        .from('student_streaks')
        .insert({
          student_id: studentId,
          current_streak: 1,
          longest_streak: 1,
          last_challenge_date: today,
          total_challenges_completed: 1,
          total_xp_earned: xpEarned,
        });
    }

    // Get updated streak
    const { data: updatedStreak } = await supabase
      .from('student_streaks')
      .select('*')
      .eq('student_id', studentId)
      .single();

    return new Response(
      JSON.stringify({
        success: true,
        attempt: {
          id: attempt.id,
          score: evaluation.score,
          feedback: structuredFeedback,
          skills_awarded: evaluation.skills_demonstrated,
          xp_earned: xpEarned,
          archetype: evaluation.archetype,
          roleFeedback: evaluation.role_feedback || null,
        },
        streak: updatedStreak,
        challenge: {
          xp_reward: challenge.xp_reward,
        },
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in evaluate-sprint-response:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
