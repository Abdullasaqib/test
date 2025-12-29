import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface StudentData {
  student: any;
  skillScores: any[];
  reflections: any[];
  pitchAttempts: any[];
  artifacts: any[];
  missionsCompleted: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { studentId } = await req.json();
    
    if (!studentId) {
      return new Response(JSON.stringify({ error: 'Student ID required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Gather all student data
    const [studentRes, skillsRes, reflectionsRes, pitchRes, artifactsRes, missionsRes] = await Promise.all([
      supabase.from('students').select('*').eq('id', studentId).single(),
      supabase.from('skill_scores').select('*').eq('student_id', studentId),
      supabase.from('reflections').select('*').eq('student_id', studentId).order('created_at', { ascending: false }).limit(10),
      supabase.from('pitch_attempts').select('*').eq('student_id', studentId).order('created_at', { ascending: false }).limit(5),
      supabase.from('artifacts').select('*').eq('student_id', studentId),
      supabase.from('student_missions').select('*').eq('student_id', studentId).eq('status', 'completed'),
    ]);

    const studentData: StudentData = {
      student: studentRes.data,
      skillScores: skillsRes.data || [],
      reflections: reflectionsRes.data || [],
      pitchAttempts: pitchRes.data || [],
      artifacts: artifactsRes.data || [],
      missionsCompleted: missionsRes.data?.length || 0,
    };

    // Calculate skill totals
    const skillTotals: Record<string, number> = {};
    studentData.skillScores.forEach((s: any) => {
      skillTotals[s.skill] = s.total_points;
    });

    // Calculate pitch averages
    let pitchAvg = { communication: 0, confidence: 0, persuasion: 0, resilience: 0, business_thinking: 0 };
    if (studentData.pitchAttempts.length > 0) {
      studentData.pitchAttempts.forEach((p: any) => {
        const scores = p.scores || {};
        pitchAvg.communication += scores.communication || 0;
        pitchAvg.confidence += scores.confidence || 0;
        pitchAvg.persuasion += scores.persuasion || 0;
        pitchAvg.resilience += scores.resilience || 0;
        pitchAvg.business_thinking += scores.business_thinking || 0;
      });
      const count = studentData.pitchAttempts.length;
      pitchAvg = {
        communication: Math.round(pitchAvg.communication / count),
        confidence: Math.round(pitchAvg.confidence / count),
        persuasion: Math.round(pitchAvg.persuasion / count),
        resilience: Math.round(pitchAvg.resilience / count),
        business_thinking: Math.round(pitchAvg.business_thinking / count),
      };
    }

    // Extract reflection themes
    const reflectionText = studentData.reflections
      .map((r: any) => `${r.what_learned || ''} ${r.what_surprised || ''} ${r.what_next || ''}`)
      .join(' ');

    // Build prompt for AI analysis
    const analysisPrompt = `You are analyzing a young entrepreneur (age ${studentData.student?.age || 'unknown'}) in an entrepreneurship program. Based on their performance data, determine their Founder DNA profile.

DATA:
- Missions Completed: ${studentData.missionsCompleted}
- Artifacts Created: ${studentData.artifacts.length} (types: ${[...new Set(studentData.artifacts.map((a: any) => a.artifact_type))].join(', ') || 'none'})
- Pitch Attempts: ${studentData.pitchAttempts.length}

SKILL SCORES (0-100 scale, higher = stronger):
${Object.entries(skillTotals).map(([k, v]) => `- ${k}: ${v}`).join('\n') || '- No skills tracked yet'}

PITCH PERFORMANCE (0-15 per dimension):
- Communication: ${pitchAvg.communication}
- Confidence: ${pitchAvg.confidence}
- Persuasion: ${pitchAvg.persuasion}
- Resilience: ${pitchAvg.resilience}
- Business Thinking: ${pitchAvg.business_thinking}

RECENT REFLECTION THEMES:
${reflectionText.slice(0, 500) || 'No reflections yet'}

Based on this data, analyze the student and provide their Founder DNA profile.`;

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are an expert youth entrepreneurship coach who helps young founders discover their strengths.' },
          { role: 'user', content: analysisPrompt }
        ],
        tools: [{
          type: 'function',
          function: {
            name: 'create_founder_profile',
            description: 'Create a detailed founder DNA profile based on student performance data',
            parameters: {
              type: 'object',
              properties: {
                founder_type: {
                  type: 'string',
                  enum: ['The Creative', 'The Analyst', 'The Hustler', 'The Builder', 'The Strategist'],
                  description: 'Primary founder archetype'
                },
                founder_type_description: {
                  type: 'string',
                  description: 'One sentence description of why this type fits the student (speak directly to them using "you")'
                },
                superpowers: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Top 3 strengths as short phrases (e.g., "Creative Problem Solver", "Data-Driven Thinker")'
                },
                growth_edges: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Top 2 areas to develop as encouraging phrases (e.g., "Building Confidence in Pitching")'
                },
                role_fit: {
                  type: 'object',
                  properties: {
                    ceo: { type: 'number', description: 'Fit percentage 0-100 for CEO role' },
                    cto: { type: 'number', description: 'Fit percentage 0-100 for CTO/Product role' },
                    cmo: { type: 'number', description: 'Fit percentage 0-100 for CMO/Marketing role' },
                    coo: { type: 'number', description: 'Fit percentage 0-100 for COO/Operations role' }
                  },
                  required: ['ceo', 'cto', 'cmo', 'coo']
                },
                personalized_insight: {
                  type: 'string',
                  description: 'A warm, encouraging 2-3 sentence insight about the student potential and unique qualities. Speak directly to them.'
                },
                recommended_focus: {
                  type: 'string',
                  description: 'One specific, actionable recommendation for what to work on next. Keep it encouraging and specific.'
                }
              },
              required: ['founder_type', 'founder_type_description', 'superpowers', 'growth_edges', 'role_fit', 'personalized_insight', 'recommended_focus']
            }
          }
        }],
        tool_choice: { type: 'function', function: { name: 'create_founder_profile' } }
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI Gateway error:', aiResponse.status, errorText);
      throw new Error(`AI analysis failed: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error('No tool call response from AI');
    }

    const profile = JSON.parse(toolCall.function.arguments);
    
    // Upsert the strength profile
    const { data: savedProfile, error: saveError } = await supabase
      .from('strength_profiles')
      .upsert({
        student_id: studentId,
        founder_type: profile.founder_type,
        founder_type_description: profile.founder_type_description,
        superpowers: profile.superpowers,
        growth_edges: profile.growth_edges,
        role_fit: profile.role_fit,
        personalized_insight: profile.personalized_insight,
        recommended_focus: profile.recommended_focus,
        analysis_data: { skillTotals, pitchAvg, missionsCompleted: studentData.missionsCompleted, artifactCount: studentData.artifacts.length },
        updated_at: new Date().toISOString(),
      }, { onConflict: 'student_id' })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving profile:', saveError);
      throw saveError;
    }

    return new Response(JSON.stringify({ profile: savedProfile }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-student-strengths:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
