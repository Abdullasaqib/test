import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  RefreshCw,
  Shield,
  Sparkles,
  Target,
  Zap,
  Clock,
  BookOpen,
  HelpCircle,
  TrendingUp,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface TrackStats {
  track: string;
  total: number;
  avgMinutes: number;
  thinContent: number;
  evaluated: number;
  avgScore: number;
  privacyIssues: number;
  quizCoverage: number;
}

interface CertStats {
  name: string;
  slug: string;
  lessons: number;
  sprints: number;
  totalMinutes: number;
  missingQuizzes: number;
  thinContent: number;
}

export default function AdminCurriculumAudit() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");
  const [fixingTrack, setFixingTrack] = useState<string | null>(null);

  // Fetch all missions
  const { data: missions = [], isLoading: loadingMissions } = useQuery({
    queryKey: ["curriculum-audit-missions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("missions")
        .select("id, title, track, week, day, estimated_minutes, micro_content, lab_prompt, artifact_type")
        .order("track")
        .order("week")
        .order("day");
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch evaluations
  const { data: evaluations = [], isLoading: loadingEvals } = useQuery({
    queryKey: ["curriculum-audit-evaluations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("curriculum_evaluations")
        .select("mission_id, overall_score, privacy_score, flags");
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch certification lessons
  const { data: certLessons = [], isLoading: loadingCerts } = useQuery({
    queryKey: ["curriculum-audit-cert-lessons"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("certification_lessons")
        .select(`
          id, title, certification_id, estimated_minutes, content, quiz_questions,
          certifications(name, slug)
        `);
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch certification sprints
  const { data: certSprints = [], isLoading: loadingSprints } = useQuery({
    queryKey: ["curriculum-audit-cert-sprints"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("certification_lesson_sprints")
        .select("id, lesson_id, title, content, quiz_questions, estimated_seconds");
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch mission sprints
  const { data: missionSprints = [], isLoading: loadingMissionSprints } = useQuery({
    queryKey: ["curriculum-audit-mission-sprints"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mission_sprints")
        .select("id, mission_id, title, content, quiz_questions");
      if (error) throw error;
      return data || [];
    },
  });

  // Calculate track stats
  const trackStats = useMemo<TrackStats[]>(() => {
    const tracks = ["junior", "teen", "advanced", "college", "professional"];
    return tracks.map((track) => {
      const trackMissions = missions.filter((m) => m.track === track);
      const trackEvals = evaluations.filter((e) =>
        trackMissions.some((m) => m.id === e.mission_id)
      );
      const thinContent = trackMissions.filter(
        (m) => !m.micro_content || m.micro_content.length < 200
      ).length;
      const privacyIssues = trackEvals.filter((e) => {
        const flags = e.flags as { category?: string }[] | null;
        return flags?.some((f) => f.category === "privacy");
      }).length;

      // Calculate quiz coverage for this track
      const trackSprintsWithQuiz = missionSprints.filter((s) => {
        const mission = trackMissions.find((m) => m.id === s.mission_id);
        return mission && s.quiz_questions && Array.isArray(s.quiz_questions) && s.quiz_questions.length > 0;
      }).length;
      const totalTrackSprints = missionSprints.filter((s) =>
        trackMissions.some((m) => m.id === s.mission_id)
      ).length;

      return {
        track,
        total: trackMissions.length,
        avgMinutes: trackMissions.length
          ? Math.round(
              trackMissions.reduce((sum, m) => sum + (m.estimated_minutes || 15), 0) /
                trackMissions.length
            )
          : 0,
        thinContent,
        evaluated: trackEvals.length,
        avgScore: trackEvals.length
          ? Math.round(
              trackEvals.reduce((sum, e) => sum + (e.overall_score || 0), 0) / trackEvals.length
            )
          : 0,
        privacyIssues,
        quizCoverage: totalTrackSprints > 0 ? Math.round((trackSprintsWithQuiz / totalTrackSprints) * 100) : 100,
      };
    });
  }, [missions, evaluations, missionSprints]);

  // Calculate certification stats
  const certStats = useMemo<CertStats[]>(() => {
    const certMap = new Map<string, CertStats>();
    
    certLessons.forEach((lesson) => {
      const cert = lesson.certifications as { name: string; slug: string } | null;
      if (!cert) return;
      
      if (!certMap.has(cert.slug)) {
        certMap.set(cert.slug, {
          name: cert.name,
          slug: cert.slug,
          lessons: 0,
          sprints: 0,
          totalMinutes: 0,
          missingQuizzes: 0,
          thinContent: 0,
        });
      }
      
      const stats = certMap.get(cert.slug)!;
      stats.lessons++;
      stats.totalMinutes += lesson.estimated_minutes || 0;
      
      const content = lesson.content || "";
      if (content.length < 200) stats.thinContent++;
      
      const lessonSprints = certSprints.filter((s) => s.lesson_id === lesson.id);
      stats.sprints += lessonSprints.length;
      
      lessonSprints.forEach((sprint) => {
        if (!sprint.quiz_questions || !Array.isArray(sprint.quiz_questions) || sprint.quiz_questions.length === 0) {
          stats.missingQuizzes++;
        }
        if (!sprint.content || sprint.content.length < 150) {
          stats.thinContent++;
        }
      });
    });
    
    return Array.from(certMap.values());
  }, [certLessons, certSprints]);

  // Overall summary metrics
  const summary = useMemo(() => {
    const totalMissions = missions.length;
    const totalEvaluated = evaluations.length;
    const totalThinContent = trackStats.reduce((sum, t) => sum + t.thinContent, 0);
    const totalPrivacyIssues = trackStats.reduce((sum, t) => sum + t.privacyIssues, 0);
    const avgOverallScore = evaluations.length
      ? Math.round(evaluations.reduce((sum, e) => sum + (e.overall_score || 0), 0) / evaluations.length)
      : 0;

    const totalCertSprints = certSprints.length;
    const sprintsWithQuiz = certSprints.filter(
      (s) => s.quiz_questions && Array.isArray(s.quiz_questions) && s.quiz_questions.length > 0
    ).length;
    const certQuizCoverage = totalCertSprints > 0 ? Math.round((sprintsWithQuiz / totalCertSprints) * 100) : 100;

    const totalMissionSprints = missionSprints.length;
    const missionSprintsWithQuiz = missionSprints.filter(
      (s) => s.quiz_questions && Array.isArray(s.quiz_questions) && s.quiz_questions.length > 0
    ).length;
    const missionQuizCoverage = totalMissionSprints > 0 ? Math.round((missionSprintsWithQuiz / totalMissionSprints) * 100) : 100;

    return {
      totalMissions,
      totalEvaluated,
      evaluationCoverage: totalMissions > 0 ? Math.round((totalEvaluated / totalMissions) * 100) : 0,
      totalThinContent,
      totalPrivacyIssues,
      avgOverallScore,
      certQuizCoverage,
      missionQuizCoverage,
      totalCertLessons: certLessons.length,
      totalCertSprints,
    };
  }, [missions, evaluations, trackStats, certSprints, missionSprints, certLessons]);

  // Fix thin content mutation
  const fixThinContentMutation = useMutation({
    mutationFn: async (track: string) => {
      setFixingTrack(track);
      const { data, error } = await supabase.functions.invoke("fix-curriculum-quality", {
        body: { mode: "expand_content", track },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast.success(`Fixed ${data.expanded_count || 0} thin content items`);
      queryClient.invalidateQueries({ queryKey: ["curriculum-audit-missions"] });
      setFixingTrack(null);
    },
    onError: (error) => {
      toast.error(`Failed to fix content: ${error.message}`);
      setFixingTrack(null);
    },
  });

  // Fix quizzes mutation
  const fixQuizzesMutation = useMutation({
    mutationFn: async (target: "missions" | "certifications") => {
      const { data, error } = await supabase.functions.invoke("fix-curriculum-quality", {
        body: { mode: "fix_quizzes", target },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast.success(`Fixed ${data.fixed_quizzes || 0} quiz questions`);
      queryClient.invalidateQueries({ queryKey: ["curriculum-audit-cert-sprints"] });
      queryClient.invalidateQueries({ queryKey: ["curriculum-audit-mission-sprints"] });
    },
    onError: (error) => {
      toast.error(`Failed to fix quizzes: ${error.message}`);
    },
  });

  // Batch evaluate mutation
  const batchEvaluateMutation = useMutation({
    mutationFn: async () => {
      // Evaluate missions locally and upsert to DB
      const evaluationsToUpsert = missions.map((mission) => ({
        mission_id: mission.id,
        overall_score: calculateLocalScore(mission),
        privacy_score: mission.micro_content?.toLowerCase().includes("share") ? 70 : 100,
        flags: detectFlags(mission),
        evaluated_at: new Date().toISOString(),
        evaluated_by: "system",
      }));

      const { error } = await supabase
        .from("curriculum_evaluations")
        .upsert(evaluationsToUpsert, { onConflict: "mission_id" });
      if (error) throw error;
      return { count: evaluationsToUpsert.length };
    },
    onSuccess: (data) => {
      toast.success(`Evaluated ${data.count} missions`);
      queryClient.invalidateQueries({ queryKey: ["curriculum-audit-evaluations"] });
    },
    onError: (error) => {
      toast.error(`Evaluation failed: ${error.message}`);
    },
  });

  // Export functions
  const exportToCSV = () => {
    const headers = ["Track", "Total Missions", "Avg Minutes", "Thin Content", "Evaluated", "Avg Score", "Privacy Issues", "Quiz Coverage %"];
    const rows = trackStats.map((t) => [
      t.track,
      t.total,
      t.avgMinutes,
      t.thinContent,
      t.evaluated,
      t.avgScore,
      t.privacyIssues,
      t.quizCoverage,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `curriculum-audit-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast.success("Exported to CSV");
  };

  const exportToJSON = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      summary,
      trackStats,
      certStats,
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `curriculum-audit-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    toast.success("Exported to JSON");
  };

  const isLoading = loadingMissions || loadingEvals || loadingCerts || loadingSprints || loadingMissionSprints;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Curriculum Audit Dashboard</h1>
          <p className="text-muted-foreground">Track-by-track quality analysis with one-click fixes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Download className="w-4 h-4 mr-2" />
            CSV
          </Button>
          <Button variant="outline" size="sm" onClick={exportToJSON}>
            <FileText className="w-4 h-4 mr-2" />
            JSON
          </Button>
          <Button
            size="sm"
            onClick={() => batchEvaluateMutation.mutate()}
            disabled={batchEvaluateMutation.isPending}
          >
            {batchEvaluateMutation.isPending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Run Full Scan
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <SummaryCard
          icon={BookOpen}
          label="Total Missions"
          value={summary.totalMissions}
          color="text-blue-400"
        />
        <SummaryCard
          icon={Target}
          label="Evaluated"
          value={`${summary.evaluationCoverage}%`}
          subValue={`${summary.totalEvaluated}/${summary.totalMissions}`}
          color="text-green-400"
        />
        <SummaryCard
          icon={TrendingUp}
          label="Avg Score"
          value={summary.avgOverallScore}
          color={summary.avgOverallScore >= 80 ? "text-green-400" : summary.avgOverallScore >= 60 ? "text-yellow-400" : "text-red-400"}
        />
        <SummaryCard
          icon={AlertTriangle}
          label="Thin Content"
          value={summary.totalThinContent}
          color={summary.totalThinContent > 20 ? "text-red-400" : "text-yellow-400"}
        />
        <SummaryCard
          icon={Shield}
          label="Privacy Issues"
          value={summary.totalPrivacyIssues}
          color={summary.totalPrivacyIssues > 10 ? "text-red-400" : "text-green-400"}
        />
        <SummaryCard
          icon={HelpCircle}
          label="Quiz Coverage"
          value={`${summary.certQuizCoverage}%`}
          subValue="Certs"
          color={summary.certQuizCoverage >= 90 ? "text-green-400" : "text-yellow-400"}
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Track Overview</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="issues">Critical Issues</TabsTrigger>
          <TabsTrigger value="actions">Bulk Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {trackStats.map((track) => (
              <TrackCard
                key={track.track}
                stats={track}
                onFix={() => fixThinContentMutation.mutate(track.track)}
                isFixing={fixingTrack === track.track}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {certStats.map((cert) => (
              <CertCard key={cert.slug} stats={cert} />
            ))}
          </div>
          {certStats.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="py-8 text-center text-muted-foreground">
                No certification data found
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <CriticalIssuesPanel
            trackStats={trackStats}
            certStats={certStats}
            summary={summary}
          />
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <BulkActionsPanel
            onFixQuizzes={(target) => fixQuizzesMutation.mutate(target)}
            onFixContent={(track) => fixThinContentMutation.mutate(track)}
            isFixingQuizzes={fixQuizzesMutation.isPending}
            isFixingContent={!!fixingTrack}
            trackStats={trackStats}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper components
function SummaryCard({
  icon: Icon,
  label,
  value,
  subValue,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subValue?: string;
  color: string;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-muted ${color}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className={`text-xl font-bold ${color}`}>{value}</p>
            {subValue && <p className="text-xs text-muted-foreground">{subValue}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TrackCard({
  stats,
  onFix,
  isFixing,
}: {
  stats: TrackStats;
  onFix: () => void;
  isFixing: boolean;
}) {
  const scoreColor = stats.avgScore >= 80 ? "text-green-400" : stats.avgScore >= 60 ? "text-yellow-400" : "text-red-400";
  const healthPercent = Math.round(
    ((stats.total - stats.thinContent) / (stats.total || 1)) * 100
  );

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="capitalize text-sm">
              {stats.track}
            </Badge>
            <span className="text-muted-foreground text-sm">
              {stats.total} missions • ~{stats.avgMinutes} min avg
            </span>
          </div>
          {stats.thinContent > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={onFix}
              disabled={isFixing}
            >
              {isFixing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              Fix {stats.thinContent} Thin
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Evaluated</p>
            <p className="font-medium">{stats.evaluated}/{stats.total}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Avg Score</p>
            <p className={`font-medium ${scoreColor}`}>{stats.avgScore || "—"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Content Health</p>
            <div className="flex items-center gap-2">
              <Progress value={healthPercent} className="h-2 flex-1" />
              <span className="text-xs">{healthPercent}%</span>
            </div>
          </div>
          <div>
            <p className="text-muted-foreground">Privacy Issues</p>
            <p className={`font-medium ${stats.privacyIssues > 5 ? "text-red-400" : "text-green-400"}`}>
              {stats.privacyIssues}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Quiz Coverage</p>
            <p className={`font-medium ${stats.quizCoverage >= 90 ? "text-green-400" : "text-yellow-400"}`}>
              {stats.quizCoverage}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CertCard({ stats }: { stats: CertStats }) {
  const health = stats.lessons > 0 && stats.sprints > 0 
    ? Math.round(((stats.sprints - stats.missingQuizzes - stats.thinContent) / stats.sprints) * 100)
    : 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{stats.name}</CardTitle>
        <CardDescription>
          {stats.lessons} lessons • {stats.sprints} sprints • {stats.totalMinutes} min
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Content Health</span>
            <div className="flex items-center gap-2">
              <Progress value={health} className="h-2 w-24" />
              <span className={health >= 80 ? "text-green-400" : "text-yellow-400"}>{health}%</span>
            </div>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1">
              <AlertCircle className={`w-4 h-4 ${stats.missingQuizzes > 0 ? "text-yellow-400" : "text-green-400"}`} />
              <span>{stats.missingQuizzes} missing quizzes</span>
            </div>
            <div className="flex items-center gap-1">
              <AlertTriangle className={`w-4 h-4 ${stats.thinContent > 0 ? "text-yellow-400" : "text-green-400"}`} />
              <span>{stats.thinContent} thin content</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CriticalIssuesPanel({
  trackStats,
  certStats,
  summary,
}: {
  trackStats: TrackStats[];
  certStats: CertStats[];
  summary: ReturnType<typeof useMemo>;
}) {
  const issues = [];

  // Check for critical issues
  trackStats.forEach((t) => {
    if (t.thinContent > t.total * 0.3) {
      issues.push({
        severity: "high",
        category: "Content",
        message: `${t.track} track has ${t.thinContent} missions with thin content (>${Math.round(t.thinContent / t.total * 100)}%)`,
        action: `Fix ${t.track} thin content`,
      });
    }
    if (t.privacyIssues > 10) {
      issues.push({
        severity: "high",
        category: "Privacy",
        message: `${t.track} track has ${t.privacyIssues} privacy-related flags`,
        action: "Review privacy concerns",
      });
    }
    if (t.quizCoverage < 70) {
      issues.push({
        severity: "medium",
        category: "Quizzes",
        message: `${t.track} track has only ${t.quizCoverage}% quiz coverage`,
        action: "Generate missing quizzes",
      });
    }
  });

  certStats.forEach((c) => {
    if (c.missingQuizzes > c.sprints * 0.3) {
      issues.push({
        severity: "medium",
        category: "Quizzes",
        message: `${c.name} has ${c.missingQuizzes} sprints without quizzes`,
        action: "Generate quizzes",
      });
    }
    if (c.lessons === 0) {
      issues.push({
        severity: "high",
        category: "Content",
        message: `${c.name} certification has no lessons`,
        action: "Create lessons",
      });
    }
  });

  return (
    <div className="space-y-4">
      {issues.length === 0 ? (
        <Card className="border-green-500/30 bg-green-500/5">
          <CardContent className="py-8 flex flex-col items-center gap-2">
            <CheckCircle2 className="w-12 h-12 text-green-400" />
            <p className="text-green-400 font-medium">No critical issues found!</p>
            <p className="text-muted-foreground text-sm">All curriculum metrics are within healthy ranges.</p>
          </CardContent>
        </Card>
      ) : (
        issues.map((issue, i) => (
          <Card key={i} className={issue.severity === "high" ? "border-red-500/30" : "border-yellow-500/30"}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {issue.severity === "high" ? (
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                )}
                <div>
                  <Badge variant="outline" className="mb-1">{issue.category}</Badge>
                  <p className="text-sm">{issue.message}</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                {issue.action}
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

function BulkActionsPanel({
  onFixQuizzes,
  onFixContent,
  isFixingQuizzes,
  isFixingContent,
  trackStats,
}: {
  onFixQuizzes: (target: "missions" | "certifications") => void;
  onFixContent: (track: string) => void;
  isFixingQuizzes: boolean;
  isFixingContent: boolean;
  trackStats: TrackStats[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-400" />
            Fix Missing Quizzes
          </CardTitle>
          <CardDescription>
            Auto-generate quiz questions for sprints that don't have any
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => onFixQuizzes("certifications")}
            disabled={isFixingQuizzes}
          >
            {isFixingQuizzes ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
            Fix Certification Quizzes
          </Button>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => onFixQuizzes("missions")}
            disabled={isFixingQuizzes}
          >
            {isFixingQuizzes ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
            Fix Mission Quizzes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Expand Thin Content
          </CardTitle>
          <CardDescription>
            Use AI to expand missions with less than 200 characters of content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {trackStats.map((t) => (
            <Button
              key={t.track}
              className="w-full justify-between"
              variant="outline"
              onClick={() => onFixContent(t.track)}
              disabled={isFixingContent || t.thinContent === 0}
            >
              <span className="capitalize">{t.track}</span>
              <Badge variant={t.thinContent > 0 ? "destructive" : "secondary"}>
                {t.thinContent} thin
              </Badge>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// Local evaluation helpers
function calculateLocalScore(mission: { micro_content?: string | null; lab_prompt?: string | null; artifact_type?: string | null }) {
  let score = 100;
  const content = mission.micro_content || "";
  const lab = mission.lab_prompt || "";
  
  if (content.length < 100) score -= 30;
  else if (content.length < 200) score -= 15;
  
  if (!lab || lab.length < 50) score -= 20;
  if (!mission.artifact_type) score -= 10;
  
  // Privacy check
  if (content.toLowerCase().includes("share your") || content.toLowerCase().includes("post your")) {
    score -= 10;
  }
  
  return Math.max(0, score);
}

function detectFlags(mission: { micro_content?: string | null; title?: string }) {
  const flags: { category: string; message: string }[] = [];
  const content = (mission.micro_content || "").toLowerCase();
  
  if (content.includes("share your") || content.includes("post your") || content.includes("upload your")) {
    flags.push({ category: "privacy", message: "May ask students to share personal work publicly" });
  }
  
  if (content.length < 100) {
    flags.push({ category: "content", message: "Very thin content - needs expansion" });
  }
  
  return flags;
}
