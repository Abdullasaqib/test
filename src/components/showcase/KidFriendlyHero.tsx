import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Sparkles, Star, BookOpen } from "lucide-react";
import type { CaseStudy } from "@/hooks/useCaseStudies";
import { StoryModal } from "./StoryModal";

interface KidFriendlyHeroProps {
  project: CaseStudy;
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

function shortenText(text: string | null, maxWords: number): string {
  if (!text) return "";
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}

function formatUserCount(count: number | null, title: string): string {
  if (!count) return "";
  const lower = title.toLowerCase();
  
  if (lower.includes("pet")) return `🐕 ${count} pets reunited with their families!`;
  if (lower.includes("homework") || lower.includes("study")) return `📚 ${count} students got help!`;
  if (lower.includes("recipe") || lower.includes("food")) return `🍽️ ${count} delicious meals created!`;
  if (lower.includes("eco") || lower.includes("green")) return `🌍 ${count} eco-friendly purchases!`;
  if (lower.includes("pitch")) return `🎤 ${count} confident pitches delivered!`;
  
  if (count < 50) return `⭐ ${count} happy users and counting!`;
  if (count < 200) return `💖 ${count} people love this app!`;
  return `🔥 ${count}+ users - it's going viral!`;
}

export function KidFriendlyHero({ project }: KidFriendlyHeroProps) {
  const [modalOpen, setModalOpen] = useState(false);
  
  const emoji = getProjectEmoji(project.title);
  const userContext = formatUserCount(project.users_count, project.title);
  
  const problemShort = shortenText(project.problem_story, 20);
  const outcomeShort = shortenText(project.outcome_story, 15);
  
  const firstName = project.student_name?.split(" ")[0] || "This founder";

  return (
    <>
      <Card className="overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Visual side */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center md:w-48">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center text-7xl shadow-lg">
                  {emoji}
                </div>
                <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-yellow-950 gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  Project of the Week!
                </Badge>
              </div>
              
              {userContext && (
                <p className="mt-4 text-sm font-medium text-center text-muted-foreground">
                  {userContext}
                </p>
              )}
            </div>

            {/* Story side */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{project.title}</h2>
                <p className="text-muted-foreground">
                  Built by <span className="font-semibold text-foreground">{project.student_name}</span>, 
                  age {project.student_age || "?"}
                </p>
              </div>

              {problemShort && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="font-semibold text-yellow-700 dark:text-yellow-400">The Problem They Solved</span>
                  </div>
                  <p className="text-base text-yellow-900 dark:text-yellow-100">{problemShort}</p>
                </div>
              )}

              {outcomeShort && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="font-semibold text-green-700 dark:text-green-400">What Happened!</span>
                  </div>
                  <p className="text-base text-green-900 dark:text-green-100">{outcomeShort}</p>
                </div>
              )}

              {project.creator_quote && (
                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                  "{shortenText(project.creator_quote, 25)}"
                </blockquote>
              )}

              <Button 
                size="lg" 
                variant="outline"
                className="gap-2"
                onClick={() => setModalOpen(true)}
              >
                <BookOpen className="h-4 w-4" />
                Read {firstName}'s Full Story 📖
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <StoryModal 
        project={project}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
