import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Wrench, Trophy, BookOpen } from "lucide-react";
import type { CaseStudy } from "@/hooks/useCaseStudies";
import { StoryModal } from "./StoryModal";

interface KidFriendlyCardProps {
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
  
  if (lower.includes("pet")) return `${count} pets found! 🐕`;
  if (lower.includes("homework") || lower.includes("study")) return `${count} students helped! 📚`;
  if (lower.includes("recipe") || lower.includes("food")) return `${count} meals made! 🍽️`;
  if (lower.includes("eco") || lower.includes("green")) return `${count} eco-purchases! 🌍`;
  if (lower.includes("pitch")) return `${count} pitches practiced! 🎤`;
  
  if (count < 50) return `${count} happy users! ⭐`;
  if (count < 200) return `${count} people love it! 💖`;
  return `${count}+ users! 🔥`;
}

export function KidFriendlyCard({ project }: KidFriendlyCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  
  const emoji = getProjectEmoji(project.title);
  const userContext = formatUserCount(project.users_count, project.title);
  
  const problemShort = shortenText(project.problem_story, 15);
  const buildShort = shortenText(project.build_journey, 20);
  const outcomeShort = shortenText(project.outcome_story, 12);
  
  const firstName = project.student_name?.split(" ")[0] || "This founder";

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30 bg-card">
        <CardContent className="p-5">
          {/* Header with emoji avatar */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl">
              {emoji}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-foreground">{project.title}</h3>
              <p className="text-sm text-muted-foreground">
                {project.student_name}, age {project.student_age || "?"}
              </p>
            </div>
            {userContext && (
              <Badge variant="secondary" className="text-xs">
                {userContext}
              </Badge>
            )}
          </div>

          {/* Story sections - bigger text, shorter content */}
          <div className="space-y-3">
            {problemShort && (
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">The Problem</span>
                  <p className="text-base text-foreground">{problemShort}</p>
                </div>
              </div>
            )}

            {buildShort && (
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Wrench className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">How They Built It</span>
                  <p className="text-base text-foreground">{buildShort}</p>
                </div>
              </div>
            )}

            {outcomeShort && (
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                  <Trophy className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">The Win!</span>
                  <p className="text-base text-foreground">{outcomeShort}</p>
                </div>
              </div>
            )}
          </div>

          {/* Tools badges */}
          {project.tools_used && project.tools_used.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {project.tools_used.slice(0, 3).map((tool) => (
                <Badge key={tool} variant="outline" className="text-xs">
                  {tool}
                </Badge>
              ))}
            </div>
          )}

          {/* Story-focused CTA */}
          <Button 
            variant="outline"
            className="w-full mt-4 gap-2" 
            onClick={() => setModalOpen(true)}
          >
            <BookOpen className="h-4 w-4" />
            Read {firstName}'s Story 📖
          </Button>
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
