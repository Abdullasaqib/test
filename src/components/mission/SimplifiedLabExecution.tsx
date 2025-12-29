import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { FlaskConical, Clock, ArrowLeft, CheckCircle2, Sparkles, Save } from "lucide-react";
import { Mission } from "@/hooks/useMission";
import { AICoachPanel } from "./AICoachPanel";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface SimplifiedLabExecutionProps {
  mission: Mission;
  onComplete: (stepResponses: Record<string, string>) => void;
  onBack: () => void;
  onAskCoach: (prompt: string) => void;
}

const DRAFT_KEY_PREFIX = "mission_simple_draft_";

export function SimplifiedLabExecution({ mission, onComplete, onBack, onAskCoach }: SimplifiedLabExecutionProps) {
  const [response, setResponse] = useState("");
  const [startTime] = useState(Date.now());
  const [showCoachPanel, setShowCoachPanel] = useState(false);
  const [coachPrompt, setCoachPrompt] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const draftKey = `${DRAFT_KEY_PREFIX}${mission.id}`;
  const estimatedMinutes = mission.estimated_minutes || 20;

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        if (parsed.response) {
          setResponse(parsed.response);
          toast.success("Your draft was restored!", { duration: 3000 });
        }
      } catch (e) {
        console.error("Failed to parse draft:", e);
      }
    }
  }, [draftKey]);

  // Auto-save draft with debounce
  const saveDraft = useCallback(() => {
    if (response.trim()) {
      const draft = {
        response,
        savedAt: Date.now(),
      };
      localStorage.setItem(draftKey, JSON.stringify(draft));
      setLastSaved(new Date());
    }
  }, [draftKey, response]);

  useEffect(() => {
    const timeoutId = setTimeout(saveDraft, 2000);
    return () => clearTimeout(timeoutId);
  }, [response, saveDraft]);

  // Clear draft on successful completion
  const handleLabComplete = () => {
    localStorage.removeItem(draftKey);
    onComplete({ main_response: response });
  };

  const handleAskCoachClick = (prompt?: string) => {
    setCoachPrompt(prompt || `Help me with this mission: ${mission.title}`);
    setShowCoachPanel(true);
  };

  const handleInsertSuggestion = (text: string) => {
    const newValue = response ? `${response}\n\n${text}` : text;
    setResponse(newValue);
    setShowCoachPanel(false);
  };

  const elapsedMinutes = Math.floor((Date.now() - startTime) / 60000);
  const progressPercent = Math.min((response.length / 200) * 100, 100); // Simple progress based on response length
  const canComplete = response.trim().length >= 20;

  // Parse lab_prompt to render nicely
  const formatLabPrompt = (text: string) => {
    return text.split('\n').map((line, index) => {
      // Check for numbered lists
      if (/^\d+[.)]\s/.test(line)) {
        return (
          <li key={index} className="ml-4 mb-2">
            {line.replace(/^\d+[.)]\s/, '')}
          </li>
        );
      }
      // Check for bullet points
      if (/^[-•]\s/.test(line)) {
        return (
          <li key={index} className="ml-4 mb-2 list-disc">
            {line.replace(/^[-•]\s/, '')}
          </li>
        );
      }
      // Empty lines
      if (!line.trim()) {
        return <br key={index} />;
      }
      // Regular paragraph
      return <p key={index} className="mb-2">{line}</p>;
    });
  };

  return (
    <div className="space-y-6">
      {/* Lab Header */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Lesson
            </Button>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-1">
                <Clock className="h-3 w-3" />
                {elapsedMinutes} min
              </Badge>
              <Badge variant="secondary">
                ~{estimatedMinutes} min
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-4">
            <div className="p-3 rounded-full bg-primary/10">
              <FlaskConical className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">{mission.title} – Lab</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Week {mission.week}, Day {mission.day}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{canComplete ? "Ready to submit!" : "Keep going..."}</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Mission Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            📋 Your Mission
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 rounded-lg p-4 text-foreground leading-relaxed">
            {formatLabPrompt(mission.lab_prompt)}
          </div>
          
          {(mission as any).ai_tool_used && (
            <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-primary">💡 Tool Tip:</span>{" "}
                Use <span className="font-medium">{(mission as any).ai_tool_used}</span> for this mission!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Response Area */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            ✏️ Your Work
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Write your response here... Share your ideas, findings, or work from this mission!"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="min-h-[200px] resize-y"
          />
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Save className="h-3 w-3" />
              {lastSaved 
                ? `Draft saved at ${lastSaved.toLocaleTimeString()}`
                : "Draft auto-saves as you type"
              }
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAskCoachClick()}
              className="text-primary hover:text-primary"
            >
              <Sparkles className="h-4 w-4 mr-1" />
              Need help? Ask Coach
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Complete Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className={canComplete ? "border-green-500/30 bg-green-500/5" : ""}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                {canComplete ? (
                  <p className="text-green-600 dark:text-green-400 font-medium">
                    ✨ Great work! Ready to continue?
                  </p>
                ) : (
                  <p className="text-muted-foreground">
                    Write at least a few sentences about your work to continue.
                  </p>
                )}
              </div>
              <Button 
                onClick={handleLabComplete} 
                disabled={!canComplete}
                size="lg"
                className="gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                Complete Mission
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Floating AI Coach Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleAskCoachClick()}
        className="fixed bottom-6 right-6 z-40 shadow-lg border-primary/30 bg-background hover:bg-primary/10"
      >
        <Sparkles className="h-4 w-4 mr-2 text-primary" />
        AI Coach
      </Button>

      {/* AI Coach Panel */}
      <AICoachPanel
        isOpen={showCoachPanel}
        onClose={() => setShowCoachPanel(false)}
        missionTitle={mission.title}
        currentStepTitle="Lab Work"
        initialPrompt={coachPrompt}
        onInsertSuggestion={handleInsertSuggestion}
      />
    </div>
  );
}