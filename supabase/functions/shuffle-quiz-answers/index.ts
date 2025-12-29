import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  correctIndex?: number;
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): { shuffled: T[]; mapping: number[] } {
  const shuffled = [...array];
  const mapping = array.map((_, i) => i);
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    [mapping[i], mapping[j]] = [mapping[j], mapping[i]];
  }
  
  return { shuffled, mapping };
}

function shuffleQuizQuestion(question: QuizQuestion): QuizQuestion {
  if (!question.options || question.options.length < 2) {
    return question;
  }
  
  // Get the correct answer index (handle both 'correct' and 'correctIndex')
  const correctIndex = question.correct ?? question.correctIndex ?? 0;
  
  // Shuffle options
  const { shuffled, mapping } = shuffleArray(question.options);
  
  // Find new position of correct answer
  const newCorrectIndex = mapping.indexOf(correctIndex);
  
  return {
    ...question,
    options: shuffled,
    correct: newCorrectIndex,
    correctIndex: newCorrectIndex,
  };
}

function shuffleQuizQuestions(questions: QuizQuestion[]): QuizQuestion[] {
  return questions.map(q => shuffleQuizQuestion(q));
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting quiz answer shuffle...");
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const stats = {
      certification_lesson_sprints: { total: 0, updated: 0, questions: 0 },
      mission_sprints: { total: 0, updated: 0, questions: 0 },
      certification_lessons: { total: 0, updated: 0, questions: 0 },
    };

    // 1. Shuffle certification_lesson_sprints
    console.log("Processing certification_lesson_sprints...");
    const { data: lessonSprints, error: lsError } = await supabase
      .from('certification_lesson_sprints')
      .select('id, quiz_questions');
    
    if (lsError) throw lsError;
    stats.certification_lesson_sprints.total = lessonSprints?.length || 0;

    for (const sprint of lessonSprints || []) {
      if (sprint.quiz_questions && Array.isArray(sprint.quiz_questions) && sprint.quiz_questions.length > 0) {
        const shuffled = shuffleQuizQuestions(sprint.quiz_questions as QuizQuestion[]);
        stats.certification_lesson_sprints.questions += shuffled.length;
        
        const { error } = await supabase
          .from('certification_lesson_sprints')
          .update({ quiz_questions: shuffled })
          .eq('id', sprint.id);
        
        if (error) {
          console.error(`Error updating sprint ${sprint.id}:`, error);
        } else {
          stats.certification_lesson_sprints.updated++;
        }
      }
    }

    // 2. Shuffle mission_sprints
    console.log("Processing mission_sprints...");
    const { data: missionSprints, error: msError } = await supabase
      .from('mission_sprints')
      .select('id, quiz_questions');
    
    if (msError) throw msError;
    stats.mission_sprints.total = missionSprints?.length || 0;

    for (const sprint of missionSprints || []) {
      if (sprint.quiz_questions && Array.isArray(sprint.quiz_questions) && sprint.quiz_questions.length > 0) {
        const shuffled = shuffleQuizQuestions(sprint.quiz_questions as QuizQuestion[]);
        stats.mission_sprints.questions += shuffled.length;
        
        const { error } = await supabase
          .from('mission_sprints')
          .update({ quiz_questions: shuffled })
          .eq('id', sprint.id);
        
        if (error) {
          console.error(`Error updating mission sprint ${sprint.id}:`, error);
        } else {
          stats.mission_sprints.updated++;
        }
      }
    }

    // 3. Shuffle certification_lessons
    console.log("Processing certification_lessons...");
    const { data: lessons, error: clError } = await supabase
      .from('certification_lessons')
      .select('id, quiz_questions');
    
    if (clError) throw clError;
    stats.certification_lessons.total = lessons?.length || 0;

    for (const lesson of lessons || []) {
      if (lesson.quiz_questions && Array.isArray(lesson.quiz_questions) && lesson.quiz_questions.length > 0) {
        // Handle nested {value: {...}} structure
        const rawQuestions = lesson.quiz_questions as Array<{value?: QuizQuestion} | QuizQuestion>;
        const normalizedQuestions = rawQuestions.map(q => {
          if (q && typeof q === 'object' && 'value' in q && q.value) {
            return q.value;
          }
          return q as QuizQuestion;
        }).filter(q => q && q.question && q.options);

        if (normalizedQuestions.length > 0) {
          const shuffled = shuffleQuizQuestions(normalizedQuestions);
          stats.certification_lessons.questions += shuffled.length;
          
          const { error } = await supabase
            .from('certification_lessons')
            .update({ quiz_questions: shuffled })
            .eq('id', lesson.id);
          
          if (error) {
            console.error(`Error updating lesson ${lesson.id}:`, error);
          } else {
            stats.certification_lessons.updated++;
          }
        }
      }
    }

    const totalQuestions = 
      stats.certification_lesson_sprints.questions + 
      stats.mission_sprints.questions + 
      stats.certification_lessons.questions;

    console.log("Shuffle complete!", stats);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully shuffled ${totalQuestions} quiz questions`,
        stats,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("Error shuffling quiz answers:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
