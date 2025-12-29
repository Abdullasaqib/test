import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Trophy, Sparkles } from "lucide-react";
import { CaseStudyModal } from "./CaseStudyModal";
import type { Tables } from "@/integrations/supabase/types";

type CaseStudy = Tables<"case_studies">;

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  variant?: "default" | "featured";
}

function getProjectEmoji(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes("pet") || lower.includes("dog") || lower.includes("cat")) return "🐕";
  if (lower.includes("homework") || lower.includes("study") || lower.includes("learn")) return "📚";
  if (lower.includes("recipe") || lower.includes("food") || lower.includes("cook")) return "🍳";
  if (lower.includes("eco") || lower.includes("green") || lower.includes("recycle")) return "🌱";
  if (lower.includes("pitch") || lower.includes("present") || lower.includes("speak")) return "🎤";
  if (lower.includes("game") || lower.includes("play")) return "🎮";
  if (lower.includes("music") || lower.includes("song")) return "🎵";
  if (lower.includes("language") || lower.includes("speak") || lower.includes("chat")) return "💬";
  return "🚀";
}

function getProgramBadgeColor(program: string | null) {
  switch (program) {
    case "junior":
      return "bg-green-500/10 text-green-600 border-green-500/20";
    case "teen":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    case "advanced":
      return "bg-purple-500/10 text-purple-600 border-purple-500/20";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function CaseStudyCard({ caseStudy, variant = "default" }: CaseStudyCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const emoji = getProjectEmoji(caseStudy.title);
  const firstName = caseStudy.student_name?.split(" ")[0] || "Founder";

  if (variant === "featured") {
    return (
      <>
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5 hover:shadow-lg transition-all cursor-pointer group" onClick={() => setModalOpen(true)}>
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Left - Emoji & Info */}
              <div className="p-6 md:p-8 flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center text-4xl shrink-0 group-hover:scale-110 transition-transform">
                    {emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getProgramBadgeColor(caseStudy.program)}>
                        {caseStudy.program} track
                      </Badge>
                      {caseStudy.is_featured && (
                        <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 gap-1">
                          <Sparkles className="h-3 w-3" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-bold">{caseStudy.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      by {caseStudy.student_name}, age {caseStudy.student_age}
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {caseStudy.problem_found}
                </p>

                {/* Outcome Highlight */}
                {caseStudy.outcome && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 mb-4">
                    <Trophy className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">
                      {caseStudy.outcome}
                    </span>
                  </div>
                )}

                {/* Tools */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {caseStudy.tools_used?.slice(0, 4).map((tool) => (
                    <Badge key={tool} variant="secondary" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>

                <Button className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Read Full Story
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <CaseStudyModal
          caseStudy={caseStudy}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      </>
    );
  }

  return (
    <>
      <Card 
        className="overflow-hidden hover:shadow-md transition-all cursor-pointer group border-border/50 hover:border-primary/30"
        onClick={() => setModalOpen(true)}
      >
        <CardContent className="p-5">
          <div className="flex items-start gap-4 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
              {emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge className={`${getProgramBadgeColor(caseStudy.program)} text-xs`}>
                  {caseStudy.program}
                </Badge>
              </div>
              <h3 className="font-semibold truncate">{caseStudy.title}</h3>
              <p className="text-xs text-muted-foreground">
                {firstName}, {caseStudy.student_age}
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {caseStudy.problem_found}
          </p>

          {/* Outcome */}
          {caseStudy.outcome && (
            <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 mb-3">
              <Trophy className="h-3.5 w-3.5" />
              <span className="font-medium truncate">{caseStudy.outcome}</span>
            </div>
          )}

          {/* Tools Preview */}
          <div className="flex flex-wrap gap-1">
            {caseStudy.tools_used?.slice(0, 3).map((tool) => (
              <Badge key={tool} variant="outline" className="text-xs">
                {tool}
              </Badge>
            ))}
            {(caseStudy.tools_used?.length || 0) > 3 && (
              <Badge variant="outline" className="text-xs">
                +{(caseStudy.tools_used?.length || 0) - 3}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <CaseStudyModal
        caseStudy={caseStudy}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
