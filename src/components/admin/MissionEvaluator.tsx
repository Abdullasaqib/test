import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Sparkles, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Copy, 
  RefreshCw,
  ArrowRight,
  Lightbulb
} from "lucide-react";

interface Mission {
  id: string;
  title: string;
  track: string;
  week: number;
  day: number;
  micro_content: string;
  lab_prompt: string;
  estimated_minutes: number;
  artifact_type: string | null;
}

interface Evaluation {
  id: string;
  mission_id: string;
  overall_score: number;
  skill_value_score: number;
  privacy_score: number;
  ai_integration_score: number;
  artifact_score: number;
  time_efficiency_score: number;
  progression_score: number;
  age_appropriateness_score: number;
  learning_outcome_score: number;
  flags: string[];
  suggestions: string[];
  improved_version: any;
}

interface MissionEvaluatorProps {
  mission: Mission;
  evaluation?: Evaluation;
  onClose: () => void;
}

const SCORE_LABELS = {
  skill_value_score: { label: "Skill Building Value", weight: "20%" },
  privacy_score: { label: "Privacy & Safety", weight: "10%" },
  ai_integration_score: { label: "AI Integration Quality", weight: "15%" },
  artifact_score: { label: "Artifact Quality", weight: "10%" },
  time_efficiency_score: { label: "Time Efficiency", weight: "10%" },
  progression_score: { label: "Progression Logic", weight: "10%" },
  age_appropriateness_score: { label: "Age Appropriateness", weight: "10%" },
  learning_outcome_score: { label: "Learning Outcome Clarity", weight: "15%" }
};

export function MissionEvaluator({ mission, evaluation, onClose }: MissionEvaluatorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [improvedVersion, setImprovedVersion] = useState<{
    micro_content: string;
    lab_prompt: string;
  } | null>(evaluation?.improved_version || null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (score >= 60) return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  const generateImprovedVersion = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("evaluate-curriculum", {
        body: {
          action: "generate_improved",
          mission,
          evaluation
        }
      });

      if (error) throw error;

      setImprovedVersion(data.improved_version);
      
      // Save to database
      await supabase
        .from("curriculum_evaluations")
        .update({ improved_version: data.improved_version })
        .eq("mission_id", mission.id);

      toast({
        title: "Improved Version Generated",
        description: "AI has created an improved version of this mission."
      });
    } catch (error: any) {
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const applyImprovedVersion = useMutation({
    mutationFn: async () => {
      if (!improvedVersion) return;
      
      const { error } = await supabase
        .from("missions")
        .update({
          micro_content: improvedVersion.micro_content,
          lab_prompt: improvedVersion.lab_prompt
        })
        .eq("id", mission.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-missions-review"] });
      toast({
        title: "Mission Updated",
        description: "The improved version has been applied."
      });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard" });
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{mission.title}</span>
            {evaluation && (
              <span className={`text-2xl ${getScoreColor(evaluation.overall_score)}`}>
                {evaluation.overall_score}/100
              </span>
            )}
          </DialogTitle>
          <div className="flex gap-2">
            <Badge variant="outline" className="capitalize">{mission.track}</Badge>
            <Badge variant="outline">Week {mission.week}</Badge>
            <Badge variant="outline">Day {mission.day}</Badge>
            <Badge variant="outline">{mission.estimated_minutes} min</Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="scores" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="scores">Scores</TabsTrigger>
            <TabsTrigger value="issues">Issues & Suggestions</TabsTrigger>
            <TabsTrigger value="content">Current Content</TabsTrigger>
            <TabsTrigger value="improved">Improved Version</TabsTrigger>
          </TabsList>

          <TabsContent value="scores" className="space-y-4 mt-4">
            {evaluation ? (
              <div className="grid gap-3">
                {(Object.keys(SCORE_LABELS) as Array<keyof typeof SCORE_LABELS>).map(key => {
                  const score = evaluation[key] as number;
                  const { label, weight } = SCORE_LABELS[key];
                  return (
                    <div key={key} className="flex items-center gap-4">
                      {getScoreIcon(score)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{label}</span>
                          <span className="text-xs text-muted-foreground">
                            {weight} weight
                          </span>
                        </div>
                        <Progress value={score} className="h-2" />
                      </div>
                      <span className={`text-sm font-bold w-12 text-right ${getScoreColor(score)}`}>
                        {score}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>This mission hasn't been evaluated yet.</p>
                <p className="text-sm">Run "Evaluate All" to generate scores.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="issues" className="space-y-4 mt-4">
            {evaluation?.flags && evaluation.flags.length > 0 ? (
              <Card className="border-red-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2 text-red-500">
                    <XCircle className="w-4 h-4" />
                    Issues Found ({evaluation.flags.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {evaluation.flags.map((flag, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm p-2 bg-red-500/10 rounded">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      <span>{flag}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Card className="border-green-500/20">
                <CardContent className="py-6 text-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No critical issues found</p>
                </CardContent>
              </Card>
            )}

            {evaluation?.suggestions && evaluation.suggestions.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2 text-blue-500">
                    <Lightbulb className="w-4 h-4" />
                    Suggestions ({evaluation.suggestions.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {evaluation.suggestions.map((suggestion, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm p-2 bg-blue-500/10 rounded">
                      <Sparkles className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="content" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Micro Content (Lesson)</label>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(mission.micro_content)}
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={mission.micro_content}
                  readOnly
                  className="min-h-[150px] text-sm"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Lab Prompt</label>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(mission.lab_prompt)}
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={mission.lab_prompt}
                  readOnly
                  className="min-h-[200px] text-sm"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="improved" className="space-y-4 mt-4">
            {!improvedVersion ? (
              <div className="text-center py-8">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary opacity-50" />
                <p className="text-muted-foreground mb-4">
                  Generate an AI-improved version of this mission
                </p>
                <Button onClick={generateImprovedVersion} disabled={isGenerating}>
                  {isGenerating ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-2" />
                  )}
                  {isGenerating ? "Generating..." : "Generate Improved Version"}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    AI-Improved Version
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={generateImprovedVersion}
                      disabled={isGenerating}
                    >
                      <RefreshCw className={`w-3 h-3 mr-1 ${isGenerating ? 'animate-spin' : ''}`} />
                      Regenerate
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => applyImprovedVersion.mutate()}
                      disabled={applyImprovedVersion.isPending}
                    >
                      <ArrowRight className="w-3 h-3 mr-1" />
                      Apply Changes
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-green-500">
                    Improved Micro Content
                  </label>
                  <Textarea
                    value={improvedVersion.micro_content}
                    onChange={(e) => setImprovedVersion({
                      ...improvedVersion,
                      micro_content: e.target.value
                    })}
                    className="min-h-[150px] text-sm mt-2 border-green-500/30"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-green-500">
                    Improved Lab Prompt
                  </label>
                  <Textarea
                    value={improvedVersion.lab_prompt}
                    onChange={(e) => setImprovedVersion({
                      ...improvedVersion,
                      lab_prompt: e.target.value
                    })}
                    className="min-h-[200px] text-sm mt-2 border-green-500/30"
                  />
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}