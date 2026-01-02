import { useMemo, useRef } from "react";

interface QuizQuestion {
  question: string;
  options: string[];
  correct?: number;
  correctIndex?: number;
}

interface ShuffledQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

// Fisher-Yates shuffle with stable seed based on question text
function seededShuffle<T>(array: T[], seed: string): { shuffled: T[]; mapping: number[] } {
  const shuffled = [...array];
  const mapping = array.map((_, i) => i);

  // Simple hash function to create a seed from string
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  // Seeded random function
  const seededRandom = () => {
    hash = Math.sin(hash) * 10000;
    return hash - Math.floor(hash);
  };

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    [mapping[i], mapping[j]] = [mapping[j], mapping[i]];
  }

  return { shuffled, mapping };
}

/**
 * Hook to shuffle quiz questions' options on the client side.
 * Uses a stable seed based on the question text to ensure consistent shuffling
 * within a session but different order across different sessions.
 */
export function useShuffledQuiz(questions: QuizQuestion[]): ShuffledQuestion[] {
  // Store seed in ref so it persists across renders even if questions update
  const sessionSeedRef = useRef(Math.random().toString(36).substring(7));

  return useMemo(() => {
    if (!questions || questions.length === 0) return [];

    // Use the stable seed
    const sessionSeed = sessionSeedRef.current;

    return questions.map((q) => {
      if (!q.options || q.options.length < 2) {
        return {
          question: q.question,
          options: q.options || [],
          correctIndex: q.correct ?? q.correctIndex ?? 0,
        };
      }

      // Use question text + session seed for consistent but random shuffle
      const seed = q.question + sessionSeed;
      const { shuffled, mapping } = seededShuffle(q.options, seed);

      // Find new position of correct answer
      const originalCorrect = q.correct ?? q.correctIndex ?? 0;
      const newCorrectIndex = mapping.indexOf(originalCorrect);

      return {
        question: q.question,
        options: shuffled,
        correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
      };
    });
  }, [questions]);
}
