import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SKILL_CATEGORIES = [
  'CREATIVE_THINKING',
  'CRITICAL_REASONING', 
  'COMMUNICATION',
  'ENTREPRENEURIAL_MINDSET',
  'FINANCIAL_LITERACY',
  'COLLABORATION',
  'PERSISTENCE_GRIT',
  'AI_FLUENCY'
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { student_id } = await req.json();
    
    if (!student_id) {
      throw new Error('student_id is required');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Gather all student data in parallel
    const [
      { data: student },
      { data: skillScores },
      { data: missions },
      { data: reflections },
      { data: pitchAttempts },
      { data: artifacts },
      { data: behavioralSignals },
      { data: previousAssessments }
    ] = await Promise.all([
      supabase.from('students').select('*').eq('id', student_id).single(),
      supabase.from('skill_scores').select('*').eq('student_id', student_id),
      supabase.from('student_missions').select('*, missions(*)').eq('student_id', student_id).eq('status', 'completed'),
      supabase.from('reflections').select('*').eq('student_id', student_id).order('created_at', { ascending: false }).limit(20),
      supabase.from('pitch_attempts').select('*').eq('student_id', student_id).order('created_at', { ascending: false }),
      supabase.from('artifacts').select('*').eq('student_id', student_id),
      supabase.from('behavioral_signals').select('*').eq('student_id', student_id).order('recorded_at', { ascending: false }).limit(100),
      supabase.from('skill_assessments').select('*').eq('student_id', student_id)
    ]);

    if (!student) {
      throw new Error('Student not found');
    }

    // Calculate behavioral metrics
    const avgMood = reflections?.length 
      ? reflections.reduce((sum, r) => sum + (r.mood || 3), 0) / reflections.length 
      : 3;
    
    const totalMissions = missions?.length || 0;
    const totalArtifacts = artifacts?.length || 0;
    const totalPitches = pitchAttempts?.length || 0;
    
    // Calculate pitch performance
    const avgPitchScore = pitchAttempts?.length
      ? pitchAttempts.reduce((sum, p) => sum + (p.score || 0), 0) / pitchAttempts.length
      : 0;

    // Calculate skill totals from existing skill_scores
    const skillTotals: Record<string, number> = {};
    skillScores?.forEach(s => {
      skillTotals[s.skill] = s.total_points;
    });

    // Map old skill types to new categories
    const skillMapping: Record<string, string> = {
      'PROBLEM_ANALYSIS': 'CRITICAL_REASONING',
      'AI_COLLABORATION': 'AI_FLUENCY',
      'CUSTOMER_RESEARCH': 'ENTREPRENEURIAL_MINDSET',
      'DIGITAL_LITERACY': 'AI_FLUENCY',
      'ENTREPRENEURSHIP': 'ENTREPRENEURIAL_MINDSET',
      'COMMUNICATION': 'COMMUNICATION',
      'RESILIENCE': 'PERSISTENCE_GRIT',
      'SELF_MANAGEMENT': 'COLLABORATION'
    };

    // Build comprehensive prompt for AI analysis
    const analysisPrompt = `Analyze this student's skill development and provide personalized insights.

STUDENT DATA:
- Name: ${student.full_name}
- Age: ${student.age}
- Program: ${student.program}
- Missions Completed: ${totalMissions}
- Artifacts Created: ${totalArtifacts}
- Pitch Attempts: ${totalPitches}
- Average Pitch Score: ${avgPitchScore.toFixed(1)}%
- Average Mood: ${avgMood.toFixed(1)}/5

SKILL SCORES (from missions):
${Object.entries(skillTotals).map(([skill, points]) => `- ${skill}: ${points} points`).join('\n')}

RECENT REFLECTIONS (themes):
${reflections?.slice(0, 5).map(r => `- Learned: "${r.what_learned?.slice(0, 100)}..." Mood: ${r.mood}/5`).join('\n') || 'No reflections yet'}

BEHAVIORAL PATTERNS:
- Help requests: ${behavioralSignals?.filter(s => s.signal_type === 'help_requests').length || 0}
- Iteration count signals: ${behavioralSignals?.filter(s => s.signal_type === 'iteration_count').length || 0}
- Creative risk signals: ${behavioralSignals?.filter(s => s.signal_type === 'creative_risk').length || 0}

PITCH PERFORMANCE (if any):
${pitchAttempts?.slice(0, 3).map(p => {
  const scores = p.scores as Record<string, number> | null;
  return `- Score: ${p.score}%, Communication: ${scores?.communication || 'N/A'}, Confidence: ${scores?.confidence || 'N/A'}`;
}).join('\n') || 'No pitches yet'}

Based on this data, analyze the student's strengths, growth areas, and provide actionable coaching advice.`;

    // Call Lovable AI for analysis
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
          {
            role: 'system',
            content: `You are an expert educational psychologist and youth entrepreneurship coach. Analyze student data to identify their signature strengths, provide growth tips, and recommend next steps. Be encouraging but specific.`
          },
          { role: 'user', content: analysisPrompt }
        ],
        tools: [{
          type: 'function',
          function: {
            name: 'create_skill_intelligence',
            description: 'Create comprehensive skill intelligence profile for student',
            parameters: {
              type: 'object',
              properties: {
                skill_assessments: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      skill_category: { 
                        type: 'string', 
                        enum: SKILL_CATEGORIES 
                      },
                      current_level: { 
                        type: 'string', 
                        enum: ['emerging', 'developing', 'proficient', 'advanced'] 
                      },
                      behavioral_score: { type: 'number', minimum: 0, maximum: 100 },
                      performance_score: { type: 'number', minimum: 0, maximum: 100 },
                      momentum: { type: 'string', enum: ['rising', 'stable', 'declining'] },
                      momentum_change: { type: 'number', minimum: -50, maximum: 50 },
                      is_signature: { type: 'boolean' }
                    },
                    required: ['skill_category', 'current_level', 'behavioral_score', 'performance_score', 'momentum']
                  }
                },
                signature_strength_name: { type: 'string' },
                signature_strength_description: { type: 'string' },
                growth_tips: {
                  type: 'array',
                  items: { type: 'string' },
                  maxItems: 3
                },
                weekly_recommendations: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      type: { type: 'string', enum: ['challenge', 'lesson', 'mentor_match', 'team_role'] },
                      title: { type: 'string' },
                      description: { type: 'string' },
                      priority: { type: 'string', enum: ['high', 'medium', 'low'] }
                    }
                  },
                  maxItems: 4
                },
                learning_style: { type: 'string' },
                team_role_suggestion: { type: 'string' },
                engagement_score: { type: 'number', minimum: 0, maximum: 100 },
                at_risk_indicators: {
                  type: 'array',
                  items: { type: 'string' }
                }
              },
              required: ['skill_assessments', 'signature_strength_name', 'signature_strength_description', 'growth_tips', 'learning_style', 'team_role_suggestion', 'engagement_score']
            }
          }
        }],
        tool_choice: { type: 'function', function: { name: 'create_skill_intelligence' } }
      })
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', errorText);
      throw new Error('AI analysis failed');
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall?.function?.arguments) {
      throw new Error('Invalid AI response format');
    }

    const intelligence = JSON.parse(toolCall.function.arguments);
    console.log('Generated intelligence:', JSON.stringify(intelligence, null, 2));

    // Upsert skill assessments (combined_score is auto-calculated as generated column)
    for (const assessment of intelligence.skill_assessments) {
      console.log(`Upserting skill ${assessment.skill_category}: behavioral=${assessment.behavioral_score}, performance=${assessment.performance_score}`);
      
      const { error: upsertError } = await supabase.from('skill_assessments').upsert({
        student_id,
        skill_category: assessment.skill_category,
        current_level: assessment.current_level,
        behavioral_score: assessment.behavioral_score,
        performance_score: assessment.performance_score,
        momentum: assessment.momentum,
        momentum_change: assessment.momentum_change || 0,
        signature_strength: assessment.is_signature || false,
        last_assessment_at: new Date().toISOString()
      }, { onConflict: 'student_id,skill_category' });
      
      if (upsertError) {
        console.error(`Error upserting skill ${assessment.skill_category}:`, upsertError);
      }
    }

    // Upsert skill insights
    await supabase.from('skill_insights').upsert({
      student_id,
      signature_strength_name: intelligence.signature_strength_name,
      signature_strength_description: intelligence.signature_strength_description,
      growth_tips: intelligence.growth_tips || [],
      weekly_recommendations: intelligence.weekly_recommendations || [],
      learning_style: intelligence.learning_style,
      team_role_suggestion: intelligence.team_role_suggestion,
      engagement_score: intelligence.engagement_score,
      at_risk_indicators: intelligence.at_risk_indicators || [],
      updated_at: new Date().toISOString()
    }, { onConflict: 'student_id' });

    return new Response(JSON.stringify({ 
      success: true, 
      intelligence 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in analyze-skill-intelligence:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
