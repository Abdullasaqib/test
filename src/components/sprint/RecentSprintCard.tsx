import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Sparkles, Brain } from "lucide-react";
import { ArchetypeBadge, FOUNDER_ARCHETYPES } from "./ArchetypeBadge";

interface RecentSprintCardProps {
  attempt: {
    id: string;
    score: number | null;
    xp_earned: number | null;
    completed_at: string;
    response: string;
    ai_feedback: string | null;
    skills_awarded: string[] | null;
    archetype?: string | null;
    challenge?: {
      title: string;
      scenario?: string;
      question?: string;
      track?: {
        icon: string;
        name: string;
      };
    };
  };
  index: number;
}

export function RecentSprintCard({ attempt, index }: RecentSprintCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="rounded-lg bg-muted/50 overflow-hidden"
    >
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 hover:bg-muted/70 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          {attempt.challenge?.track && (
            <span className="text-lg">{attempt.challenge.track.icon}</span>
          )}
          <div>
            <p className="font-medium text-sm">{attempt.challenge?.title || 'Challenge'}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(attempt.completed_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={attempt.score && attempt.score >= 70 ? "default" : "secondary"}>
            {attempt.score || 0}/100
          </Badge>
          <span className="text-sm text-yellow-400 font-medium">
            +{attempt.xp_earned} XP
          </span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border"
          >
            <div className="p-4 space-y-4">
              {/* Your Response */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Your Response
                </h4>
                <p className="text-sm text-foreground/80 bg-background/50 rounded-lg p-3">
                  {attempt.response}
                </p>
              </div>

              {/* AI Feedback */}
              {attempt.ai_feedback && (
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
                    <Brain className="h-3 w-3" />
                    Mentor Feedback
                  </h4>
                  <p className="text-sm text-muted-foreground bg-primary/5 rounded-lg p-3">
                    {attempt.ai_feedback}
                  </p>
                </div>
              )}

              {/* Skills & Archetype */}
              <div className="flex flex-wrap items-center gap-2">
                {attempt.skills_awarded && attempt.skills_awarded.length > 0 && (
                  <>
                    {attempt.skills_awarded.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="bg-purple-500/10 text-purple-300 text-xs">
                        <Sparkles className="h-3 w-3 mr-1" />
                        {skill}
                      </Badge>
                    ))}
                  </>
                )}
                {attempt.archetype && (
                  <ArchetypeBadge archetype={attempt.archetype} size="sm" />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
