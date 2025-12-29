import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, CheckCircle, XCircle, Sparkles, RefreshCw, Download, Filter } from "lucide-react";
import { CurriculumHeatmap } from "@/components/admin/CurriculumHeatmap";
import { MissionEvaluator } from "@/components/admin/MissionEvaluator";
import { QualityRubric } from "@/components/admin/QualityRubric";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface HeatmapMission {
  id: string;
  title: string;
  track: string;
  week: number;
  day: number;
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
  evaluated_at: string;
}

// Quality rules for automated checking
const PRIVACY_KEYWORDS = ["your name", "your age", "where you live", "your address", "your phone", "personal information"];
const FILLER_KEYWORDS = ["introduce yourself", "share about yourself", "tell us about you"];
const WEAK_ARTIFACT_PATTERNS = ["write down", "draw", "think about", "reflect on"];

function evaluateMissionLocally(mission: Mission): Partial<Evaluation> {
  const flags: string[] = [];
  const suggestions: string[] = [];
  
  const content = `${mission.micro_content} ${mission.lab_prompt}`.toLowerCase();
  
  // Privacy check
  let privacyScore = 100;
  PRIVACY_KEYWORDS.forEach(keyword => {
    if (content.includes(keyword)) {
      flags.push(`privacy_concern: "${keyword}"`);
      suggestions.push(`Remove or replace "${keyword}" - unnecessary personal info`);
      privacyScore -= 25;
    }
  });
  privacyScore = Math.max(0, privacyScore);
  
  // Filler content check
  let skillValueScore = 80;
  FILLER_KEYWORDS.forEach(keyword => {
    if (content.includes(keyword)) {
      flags.push(`low_value_task: "${keyword}"`);
      suggestions.push(`Replace "${keyword}" with a concrete skill-building activity`);
      skillValueScore -= 20;
    }
  });
  
  // Artifact quality check
  let artifactScore = mission.artifact_type ? 70 : 40;
  WEAK_ARTIFACT_PATTERNS.forEach(pattern => {
    if (content.includes(pattern) && !content.includes("template") && !content.includes("card")) {
      flags.push(`weak_artifact: "${pattern}" without structure`);
      suggestions.push(`Add a structured template or card format for "${pattern}"`);
      artifactScore -= 10;
    }
  });
  artifactScore = Math.max(0, artifactScore);
  
  // AI integration check
  let aiIntegrationScore = 50;
  if (content.includes("ai coach") || content.includes("prompt")) {
    aiIntegrationScore += 20;
  }
  if (content.includes("step 1") || content.includes("step 2")) {
    aiIntegrationScore += 15;
  }
  if (content.includes("template") || content.includes("example")) {
    aiIntegrationScore += 15;
  }
  aiIntegrationScore = Math.min(100, aiIntegrationScore);
  
  // Age appropriateness (basic check based on track)
  let ageAppropriatenessScore = 70;
  if (mission.track === "junior" && mission.estimated_minutes <= 25) {
    ageAppropriatenessScore = 90;
  } else if (mission.track === "teen" && mission.estimated_minutes >= 25 && mission.estimated_minutes <= 40) {
    ageAppropriatenessScore = 90;
  } else if (mission.track === "advanced" && mission.estimated_minutes >= 35) {
    ageAppropriatenessScore = 90;
  }
  
  // Time efficiency
  const timeEfficiencyScore = mission.estimated_minutes >= 15 && mission.estimated_minutes <= 50 ? 80 : 60;
  
  // Learning outcome check
  let learningOutcomeScore = 60;
  if (content.includes("learn") || content.includes("understand") || content.includes("discover")) {
    learningOutcomeScore += 20;
  }
  if (content.includes("build") || content.includes("create") || content.includes("design")) {
    learningOutcomeScore += 20;
  }
  learningOutcomeScore = Math.min(100, learningOutcomeScore);
  
  // Progression (would need context of previous missions for full check)
  const progressionScore = 70;
  
  // Calculate overall score
  const weights = {
    skill_value: 0.20,
    privacy: 0.10,
    ai_integration: 0.15,
    artifact: 0.10,
    time_efficiency: 0.10,
    progression: 0.10,
    age_appropriateness: 0.10,
    learning_outcome: 0.15
  };
  
  const overallScore = Math.round(
    skillValueScore * weights.skill_value +
    privacyScore * weights.privacy +
    aiIntegrationScore * weights.ai_integration +
    artifactScore * weights.artifact +
    timeEfficiencyScore * weights.time_efficiency +
    progressionScore * weights.progression +
    ageAppropriatenessScore * weights.age_appropriateness +
    learningOutcomeScore * weights.learning_outcome
  );
  
  return {
    overall_score: overallScore,
    skill_value_score: skillValueScore,
    privacy_score: privacyScore,
    ai_integration_score: aiIntegrationScore,
    artifact_score: artifactScore,
    time_efficiency_score: timeEfficiencyScore,
    progression_score: progressionScore,
    age_appropriateness_score: ageAppropriatenessScore,
    learning_outcome_score: learningOutcomeScore,
    flags,
    suggestions
  };
}

export default function AdminCurriculumReview() {
  const [selectedTrack, setSelectedTrack] = useState<string>("all");
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all missions
  const { data: missions, isLoading: missionsLoading } = useQuery({
    queryKey: ["admin-missions-review"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("missions")
        .select("*")
        .order("track")
        .order("week")
        .order("day");
      if (error) throw error;
      return data as Mission[];
    }
  });

  // Fetch existing evaluations
  const { data: evaluations, isLoading: evaluationsLoading } = useQuery({
    queryKey: ["curriculum-evaluations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("curriculum_evaluations")
        .select("*");
      if (error) throw error;
      return data as Evaluation[];
    }
  });

  // Create evaluation map for quick lookup
  const evaluationMap = useMemo(() => {
    const map = new Map<string, Evaluation>();
    evaluations?.forEach(e => map.set(e.mission_id, e));
    return map;
  }, [evaluations]);

  // Calculate stats
  const stats = useMemo(() => {
    if (!missions || !evaluations) return null;
    
    const evaluated = evaluations.length;
    const total = missions.length;
    
    const byTrack = {
      junior: { total: 0, evaluated: 0, avgScore: 0, scores: [] as number[] },
      teen: { total: 0, evaluated: 0, avgScore: 0, scores: [] as number[] },
      advanced: { total: 0, evaluated: 0, avgScore: 0, scores: [] as number[] }
    };
    
    missions.forEach(m => {
      const track = m.track as keyof typeof byTrack;
      if (byTrack[track]) {
        byTrack[track].total++;
        const ev = evaluationMap.get(m.id);
        if (ev) {
          byTrack[track].evaluated++;
          byTrack[track].scores.push(ev.overall_score);
        }
      }
    });
    
    Object.keys(byTrack).forEach(track => {
      const t = byTrack[track as keyof typeof byTrack];
      t.avgScore = t.scores.length > 0 
        ? Math.round(t.scores.reduce((a, b) => a + b, 0) / t.scores.length)
        : 0;
    });
    
    const allScores = evaluations.map(e => e.overall_score);
    const overallAvg = allScores.length > 0
      ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
      : 0;
    
    // Count issues
    const criticalIssues = evaluations.filter(e => e.flags?.some(f => f.includes("privacy"))).length;
    const warnings = evaluations.filter(e => e.flags?.length > 0).length;
    const lowScoreMissions = evaluations.filter(e => e.overall_score < 60).length;
    
    return {
      evaluated,
      total,
      overallAvg,
      byTrack,
      criticalIssues,
      warnings,
      lowScoreMissions
    };
  }, [missions, evaluations, evaluationMap]);

  // Batch evaluate all missions
  const batchEvaluateMutation = useMutation({
    mutationFn: async () => {
      if (!missions) return;
      
      const evaluationsToInsert = missions.map(mission => {
        const evaluation = evaluateMissionLocally(mission);
        return {
          mission_id: mission.id,
          ...evaluation,
          evaluated_at: new Date().toISOString()
        };
      });
      
      const { error } = await supabase
        .from("curriculum_evaluations")
        .upsert(evaluationsToInsert, { onConflict: "mission_id" });
      
      if (error) throw error;
      return evaluationsToInsert;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["curriculum-evaluations"] });
      toast({
        title: "Evaluation Complete",
        description: `Evaluated ${missions?.length} missions successfully.`
      });
      setIsEvaluating(false);
    },
    onError: (error) => {
      toast({
        title: "Evaluation Failed",
        description: error.message,
        variant: "destructive"
      });
      setIsEvaluating(false);
    }
  });

  const handleBatchEvaluate = () => {
    setIsEvaluating(true);
    batchEvaluateMutation.mutate();
  };

  // Filter missions by track
  const filteredMissions = useMemo(() => {
    if (!missions) return [];
    if (selectedTrack === "all") return missions;
    return missions.filter(m => m.track === selectedTrack);
  }, [missions, selectedTrack]);

  // Get critical missions (low score or flagged)
  const criticalMissions = useMemo(() => {
    if (!filteredMissions) return [];
    return filteredMissions
      .map(m => ({ mission: m, evaluation: evaluationMap.get(m.id) }))
      .filter(({ evaluation }) => evaluation && (evaluation.overall_score < 60 || evaluation.flags?.length > 0))
      .sort((a, b) => (a.evaluation?.overall_score || 0) - (b.evaluation?.overall_score || 0));
  }, [filteredMissions, evaluationMap]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-green-500/20 text-green-500">Good</Badge>;
    if (score >= 60) return <Badge className="bg-yellow-500/20 text-yellow-500">Needs Work</Badge>;
    return <Badge className="bg-red-500/20 text-red-500">Critical</Badge>;
  };

  if (missionsLoading || evaluationsLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Curriculum Quality Review</h1>
          <p className="text-muted-foreground">
            Evaluate and improve all {missions?.length} missions across tracks
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleBatchEvaluate}
            disabled={isEvaluating}
          >
            {isEvaluating ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            {isEvaluating ? "Evaluating..." : "Evaluate All"}
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(stats.overallAvg)}`}>
                  {stats.overallAvg}/100
                </div>
                <p className="text-sm text-muted-foreground mt-1">Overall Quality Score</p>
                <Progress value={stats.overallAvg} className="mt-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-500">
                  {stats.evaluated}/{stats.total}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Missions Evaluated</p>
                <Progress value={(stats.evaluated / stats.total) * 100} className="mt-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-500">
                  {stats.criticalIssues}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Critical Issues</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground">
                  <XCircle className="w-3 h-3 text-red-500" />
                  Privacy concerns, low-value tasks
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-500">
                  {stats.lowScoreMissions}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Low Score Missions</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground">
                  <AlertTriangle className="w-3 h-3 text-yellow-500" />
                  Below 60/100 threshold
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Track Scores */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(["junior", "teen", "advanced"] as const).map(track => (
            <Card key={track}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg capitalize flex items-center justify-between">
                  {track} Track
                  {getScoreBadge(stats.byTrack[track].avgScore)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${getScoreColor(stats.byTrack[track].avgScore)}`}>
                  {stats.byTrack[track].avgScore}/100
                </div>
                <p className="text-xs text-muted-foreground">
                  {stats.byTrack[track].evaluated}/{stats.byTrack[track].total} evaluated
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Main Content */}
      <Tabs defaultValue="heatmap" className="space-y-4">
        <TabsList>
          <TabsTrigger value="heatmap">Quality Heatmap</TabsTrigger>
          <TabsTrigger value="critical">Critical Issues ({criticalMissions.length})</TabsTrigger>
          <TabsTrigger value="rubric">Evaluation Rubric</TabsTrigger>
        </TabsList>

        <TabsContent value="heatmap" className="space-y-4">
          <div className="flex items-center gap-4">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={selectedTrack} onValueChange={setSelectedTrack}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by track" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tracks</SelectItem>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="teen">Teen</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <CurriculumHeatmap 
            missions={filteredMissions} 
            evaluations={evaluationMap}
            onSelectMission={(m) => {
              const fullMission = filteredMissions.find(fm => fm.id === m.id);
              if (fullMission) setSelectedMission(fullMission);
            }}
          />
        </TabsContent>

        <TabsContent value="critical" className="space-y-4">
          <div className="space-y-4">
            {criticalMissions.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-semibold">No Critical Issues</h3>
                  <p className="text-sm text-muted-foreground">
                    All evaluated missions meet quality standards.
                  </p>
                </CardContent>
              </Card>
            ) : (
              criticalMissions.map(({ mission, evaluation }) => (
                <Card key={mission.id} className="border-red-500/20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{mission.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {mission.track} • Week {mission.week} • Day {mission.day}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-2xl font-bold ${getScoreColor(evaluation?.overall_score || 0)}`}>
                          {evaluation?.overall_score}/100
                        </span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedMission(mission)}
                        >
                          Review
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {evaluation?.flags?.map((flag, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                          <span>{flag}</span>
                        </div>
                      ))}
                      {evaluation?.suggestions?.slice(0, 2).map((suggestion, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Sparkles className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                          <span>{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="rubric">
          <QualityRubric />
        </TabsContent>
      </Tabs>

      {/* Mission Evaluator Dialog */}
      {selectedMission && (
        <MissionEvaluator
          mission={selectedMission}
          evaluation={evaluationMap.get(selectedMission.id)}
          onClose={() => setSelectedMission(null)}
        />
      )}
    </div>
  );
}