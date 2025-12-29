import { motion } from "framer-motion";

interface SprintProgressIndicatorProps {
  currentSprint: number;
  totalSprints: number;
  currentLesson: number;
  totalLessons: number;
}

export function SprintProgressIndicator({
  currentSprint,
  totalSprints,
  currentLesson,
  totalLessons,
}: SprintProgressIndicatorProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Sprint Progress Dots */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalSprints }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{
              scale: index + 1 === currentSprint ? 1.2 : 1,
              opacity: index + 1 <= currentSprint ? 1 : 0.4,
            }}
            className={`h-2 rounded-full transition-colors ${
              index + 1 < currentSprint
                ? "bg-green-500 w-2"
                : index + 1 === currentSprint
                ? "bg-primary w-4"
                : "bg-muted w-2"
            }`}
          />
        ))}
      </div>
      
      {/* Text indicator */}
      <span className="text-xs text-muted-foreground hidden sm:inline">
        Sprint {currentSprint}/{totalSprints} • Lesson {currentLesson}/{totalLessons}
      </span>
    </div>
  );
}