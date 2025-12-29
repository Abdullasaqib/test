import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Wrench, Trophy, Quote, Heart } from "lucide-react";
import type { CaseStudy } from "@/hooks/useCaseStudies";

interface StoryModalProps {
  project: CaseStudy;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function getProjectEmoji(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes("pet") || lower.includes("dog") || lower.includes("cat")) return "🐕";
  if (lower.includes("homework") || lower.includes("study") || lower.includes("learn")) return "📚";
  if (lower.includes("recipe") || lower.includes("food") || lower.includes("cook")) return "🍳";
  if (lower.includes("eco") || lower.includes("green") || lower.includes("sustainable")) return "🌱";
  if (lower.includes("pitch") || lower.includes("present") || lower.includes("speak")) return "🎤";
  if (lower.includes("game") || lower.includes("play")) return "🎮";
  if (lower.includes("music") || lower.includes("song")) return "🎵";
  if (lower.includes("art") || lower.includes("draw") || lower.includes("paint")) return "🎨";
  return "🚀";
}

export function StoryModal({ project, open, onOpenChange }: StoryModalProps) {
  const emoji = getProjectEmoji(project.title);
  const firstName = project.student_name?.split(" ")[0] || "This founder";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader className="text-center pb-4">
          {/* Big emoji header */}
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center text-5xl mb-3">
            {emoji}
          </div>
          <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
          <p className="text-muted-foreground">
            by {project.student_name}, age {project.student_age || "?"}
          </p>
        </DialogHeader>

        <div className="space-y-5">
          {/* The Problem */}
          {project.problem_story && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-yellow-200 dark:bg-yellow-800 flex items-center justify-center">
                  <Lightbulb className="h-4 w-4 text-yellow-700 dark:text-yellow-300" />
                </div>
                <span className="font-bold text-yellow-700 dark:text-yellow-300">😤 The Problem</span>
              </div>
              <p className="text-yellow-900 dark:text-yellow-100 leading-relaxed">
                {project.problem_story}
              </p>
            </div>
          )}

          {/* The Journey */}
          {project.build_journey && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center">
                  <Wrench className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                </div>
                <span className="font-bold text-blue-700 dark:text-blue-300">🛠️ The Journey</span>
              </div>
              <p className="text-blue-900 dark:text-blue-100 leading-relaxed">
                {project.build_journey}
              </p>
            </div>
          )}

          {/* The Win */}
          {project.outcome_story && (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-green-200 dark:bg-green-800 flex items-center justify-center">
                  <Trophy className="h-4 w-4 text-green-700 dark:text-green-300" />
                </div>
                <span className="font-bold text-green-700 dark:text-green-300">🏆 The Win!</span>
              </div>
              <p className="text-green-900 dark:text-green-100 leading-relaxed">
                {project.outcome_story}
              </p>
            </div>
          )}

          {/* Creator Quote */}
          {project.creator_quote && (
            <div className="bg-muted/50 rounded-xl p-4 border">
              <div className="flex items-start gap-3">
                <Quote className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="italic text-foreground leading-relaxed">
                    "{project.creator_quote}"
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">— {firstName}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tools Used */}
          {project.tools_used && project.tools_used.length > 0 && (
            <div className="pt-2">
              <p className="text-sm font-medium text-muted-foreground mb-2">🔧 Tools Used</p>
              <div className="flex flex-wrap gap-2">
                {project.tools_used.map((tool) => (
                  <Badge key={tool} variant="secondary">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Simple footer - no sales pressure */}
        <div className="pt-4 flex justify-center">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => onOpenChange(false)}
          >
            <Heart className="h-4 w-4" />
            Love This Story
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
