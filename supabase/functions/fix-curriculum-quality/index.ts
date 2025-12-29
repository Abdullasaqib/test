import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface Sprint {
  id: string;
  title: string;
  content: string;
  sprint_type?: string;
  quiz_questions: QuizQuestion[];
  mission_id?: string;
  lesson_id?: string;
}

// Generate unique quiz questions using AI
async function generateQuizQuestions(
  sprintTitle: string,
  sprintContent: string,
  missionTitle: string,
  ageTrack: string
): Promise<QuizQuestion[]> {
  const ageContext = {
    'junior': 'for 8-12 year olds (simple language, fun examples)',
    'teen': 'for 13-17 year olds (engaging scenarios, relatable examples)',
    'explorer': 'for 9-11 year olds (curious and playful)',
    'creator': 'for 12-14 year olds (creative and hands-on)',
    'founder': 'for 15+ year olds (business-focused)',
    'college': 'for college students (academic rigor)',
    'professional': 'for working professionals (industry-focused)',
    'all': 'for general audiences'
  }[ageTrack] || 'for general audiences';

  const prompt = `Generate 1-2 high-quality multiple choice quiz questions based on this educational content.

Sprint Title: ${sprintTitle}
Mission/Lesson: ${missionTitle}
Content: ${sprintContent.substring(0, 1500)}

Requirements:
- Questions should test understanding, not just recall (Bloom's taxonomy levels 2-4)
- Each question must have exactly 4 options
- Make distractors plausible but clearly wrong upon reflection
- The correct answer should NOT always be the same position
- Target audience: ${ageContext}
- Questions should be specific to the content, not generic

Return ONLY valid JSON array:
[{"question": "...", "options": ["A", "B", "C", "D"], "correct": 0}]

Where "correct" is the 0-indexed position of the right answer. Randomize which position is correct.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert curriculum designer. Return ONLY valid JSON, no markdown.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8, // Higher for variety
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '[]';
    
    // Parse JSON, handling potential markdown wrapping
    let cleanedContent = content.trim();
    if (cleanedContent.startsWith('```')) {
      cleanedContent = cleanedContent.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
    }
    
    const questions = JSON.parse(cleanedContent);
    return Array.isArray(questions) ? questions : [];
  } catch (error) {
    console.error('Error generating quiz:', error);
    return [];
  }
}

// Expand thin content using AI
async function expandContent(
  sprintTitle: string,
  currentContent: string,
  sprintType: string,
  missionTitle: string,
  ageTrack: string
): Promise<string> {
  const ageContext = {
    'junior': 'for 8-12 year olds - use simple language, emojis, fun examples',
    'teen': 'for 13-17 year olds - engaging and relatable',
    'explorer': 'for 9-11 year olds - curious and playful',
    'creator': 'for 12-14 year olds - creative and hands-on',
    'founder': 'for 15+ year olds - business-focused',
    'college': 'for college students - academic rigor and depth',
    'professional': 'for working professionals - industry examples',
    'all': 'for general audiences'
  }[ageTrack] || 'for general audiences';

  const typeGuidance = {
    'content': 'educational content that teaches a concept clearly. Include 2-3 key points, examples, and a memorable takeaway.',
    'lab': 'hands-on activity instructions with 3-5 clear steps. Be specific about what the student should do.',
    'reflection': 'thought-provoking questions that encourage self-reflection and application of learning.',
    'quiz': 'brief introduction to the quiz topic and what will be assessed.'
  }[sprintType] || 'educational content';

  const prompt = `Expand this thin educational content into a rich, engaging sprint.

Sprint Title: ${sprintTitle}
Sprint Type: ${sprintType}
Mission: ${missionTitle}
Current Content: ${currentContent || '(empty)'}

Requirements:
- Target audience: ${ageContext}
- Content type: ${typeGuidance}
- Length: 200-400 words
- Be specific to the topic, not generic
- Include actionable insights or steps
- Make it engaging and memorable

Return ONLY the expanded content text, no JSON or markdown formatting.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert curriculum writer. Return only the content text.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || currentContent;
  } catch (error) {
    console.error('Error expanding content:', error);
    return currentContent;
  }
}

// Check if quiz questions are duplicates or weak
function isWeakQuiz(questions: QuizQuestion[]): boolean {
  if (!questions || questions.length === 0) return true;
  
  // Exact duplicate questions that appear across many sprints
  const duplicatePatterns = [
    'what is the first step to solving a problem',
    'what distinguishes a scalable business model',
    'why is market validation important before building',
    'what makes an mvp successful',
    'what is the primary goal of a pitch',
  ];
  
  // Generic weak patterns
  const weakPatterns = [
    'which of the following is correct',
    'what should you do first',
    'which is the best',
  ];
  
  return questions.some(q => {
    const lowerQ = q.question.toLowerCase();
    // Check for exact duplicates
    if (duplicatePatterns.some(pattern => lowerQ.includes(pattern))) {
      return true;
    }
    // Check for generic weak questions
    if (weakPatterns.some(pattern => lowerQ.includes(pattern))) {
      return true;
    }
    return false;
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { mode = 'all', limit = 50, offset = 0 } = await req.json();
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    const stats = {
      quizzesFixed: 0,
      contentExpanded: 0,
      sprintsProcessed: 0,
      errors: [] as string[],
    };

    console.log(`Starting curriculum fix - mode: ${mode}, limit: ${limit}, offset: ${offset}`);

    // Process mission_sprints
    if (mode === 'all' || mode === 'mission_sprints') {
      const { data: missionSprints, error: msError } = await supabase
        .from('mission_sprints')
        .select(`
          id, title, content, sprint_type, quiz_questions, mission_id,
          missions!inner(title, track)
        `)
        .range(offset, offset + limit - 1);

      if (msError) {
        console.error('Error fetching mission_sprints:', msError);
        stats.errors.push(`mission_sprints fetch: ${msError.message}`);
      } else if (missionSprints) {
        console.log(`Processing ${missionSprints.length} mission sprints`);
        
        for (const sprint of missionSprints) {
          stats.sprintsProcessed++;
          const missionData = sprint.missions as any;
          const track = missionData?.track || 'teen';
          const missionTitle = missionData?.title || '';
          
          let updates: any = {};
          
          // Fix weak quizzes
          const questions = sprint.quiz_questions as QuizQuestion[] || [];
          const contentLength = sprint.content?.length || 0;
          
          if (isWeakQuiz(questions) || questions.length === 0) {
            console.log(`Generating quiz for sprint: ${sprint.title} (content length: ${contentLength})`);
            
            // Use content if available, otherwise use title
            const contentForQuiz = contentLength > 20 ? sprint.content : `This sprint covers ${sprint.title} in the context of ${missionTitle}`;
            
            const newQuestions = await generateQuizQuestions(
              sprint.title,
              contentForQuiz!,
              missionTitle,
              track
            );
            
            console.log(`Generated ${newQuestions.length} questions for ${sprint.title}`);
            
            if (newQuestions.length > 0) {
              updates.quiz_questions = newQuestions;
              stats.quizzesFixed++;
            }
          }
          
          // Expand thin content
          if (!sprint.content || sprint.content.length < 100) {
            console.log(`Expanding content for sprint: ${sprint.title}`);
            const expandedContent = await expandContent(
              sprint.title,
              sprint.content || '',
              sprint.sprint_type || 'content',
              missionTitle,
              track
            );
            if (expandedContent && expandedContent.length > (sprint.content?.length || 0)) {
              updates.content = expandedContent;
              stats.contentExpanded++;
            }
          }
          
          // Update if changes
          if (Object.keys(updates).length > 0) {
            const { error: updateError } = await supabase
              .from('mission_sprints')
              .update(updates)
              .eq('id', sprint.id);
            
            if (updateError) {
              stats.errors.push(`mission_sprint ${sprint.id}: ${updateError.message}`);
            }
          }
          
          // Small delay to avoid rate limiting
          await new Promise(r => setTimeout(r, 200));
        }
      }
    }

    // Process certification_lesson_sprints
    if (mode === 'all' || mode === 'lesson_sprints') {
      const { data: lessonSprints, error: lsError } = await supabase
        .from('certification_lesson_sprints')
        .select(`
          id, title, content, age_track, quiz_questions, lesson_id,
          certification_lessons!inner(title)
        `)
        .range(offset, offset + limit - 1);

      if (lsError) {
        console.error('Error fetching lesson_sprints:', lsError);
        stats.errors.push(`lesson_sprints fetch: ${lsError.message}`);
      } else if (lessonSprints) {
        console.log(`Processing ${lessonSprints.length} lesson sprints`);
        
        for (const sprint of lessonSprints) {
          stats.sprintsProcessed++;
          const lessonData = sprint.certification_lessons as any;
          const lessonTitle = lessonData?.title || '';
          
          let updates: any = {};
          
          // Fix weak quizzes
          const questions = sprint.quiz_questions as QuizQuestion[] || [];
          if (isWeakQuiz(questions) && sprint.content && sprint.content.length > 50) {
            console.log(`Generating quiz for lesson sprint: ${sprint.title}`);
            const newQuestions = await generateQuizQuestions(
              sprint.title,
              sprint.content,
              lessonTitle,
              sprint.age_track || 'all'
            );
            if (newQuestions.length > 0) {
              updates.quiz_questions = newQuestions;
              stats.quizzesFixed++;
            }
          }
          
          // Expand thin content
          if (!sprint.content || sprint.content.length < 100) {
            console.log(`Expanding content for lesson sprint: ${sprint.title}`);
            const expandedContent = await expandContent(
              sprint.title,
              sprint.content || '',
              'content',
              lessonTitle,
              sprint.age_track || 'all'
            );
            if (expandedContent && expandedContent.length > (sprint.content?.length || 0)) {
              updates.content = expandedContent;
              stats.contentExpanded++;
            }
          }
          
          // Update if changes
          if (Object.keys(updates).length > 0) {
            const { error: updateError } = await supabase
              .from('certification_lesson_sprints')
              .update(updates)
              .eq('id', sprint.id);
            
            if (updateError) {
              stats.errors.push(`lesson_sprint ${sprint.id}: ${updateError.message}`);
            }
          }
          
          await new Promise(r => setTimeout(r, 200));
        }
      }
    }

    // Process certification_lessons (lesson-level quizzes)
    if (mode === 'all' || mode === 'lessons') {
      const { data: lessons, error: lessonsError } = await supabase
        .from('certification_lessons')
        .select('id, title, content, description, quiz_questions')
        .range(offset, offset + limit - 1);

      if (lessonsError) {
        console.error('Error fetching lessons:', lessonsError);
        stats.errors.push(`lessons fetch: ${lessonsError.message}`);
      } else if (lessons) {
        console.log(`Processing ${lessons.length} lessons`);
        
        for (const lesson of lessons) {
          stats.sprintsProcessed++;
          
          let updates: any = {};
          
          // Fix weak quizzes
          const questions = lesson.quiz_questions as QuizQuestion[] || [];
          if (isWeakQuiz(questions) && (lesson.content || lesson.description)) {
            console.log(`Generating quiz for lesson: ${lesson.title}`);
            const newQuestions = await generateQuizQuestions(
              lesson.title,
              lesson.content || lesson.description || '',
              lesson.title,
              'all'
            );
            if (newQuestions.length > 0) {
              updates.quiz_questions = newQuestions;
              stats.quizzesFixed++;
            }
          }
          
          // Update if changes
          if (Object.keys(updates).length > 0) {
            const { error: updateError } = await supabase
              .from('certification_lessons')
              .update(updates)
              .eq('id', lesson.id);
            
            if (updateError) {
              stats.errors.push(`lesson ${lesson.id}: ${updateError.message}`);
            }
          }
          
          await new Promise(r => setTimeout(r, 200));
        }
      }
    }

    console.log('Curriculum fix completed:', stats);

    return new Response(JSON.stringify({
      success: true,
      message: 'Curriculum quality fix completed',
      stats
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in fix-curriculum-quality:', error);
    return new Response(JSON.stringify({ 
      error: errorMessage,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
