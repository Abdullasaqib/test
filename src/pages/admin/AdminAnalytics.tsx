import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  Users,
  Globe,
  School,
  Target,
  Zap,
  Trophy,
  MessageSquare,
  Lightbulb,
  FileText,
  Brain,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const COLORS = ["hsl(var(--primary))", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"];

export default function AdminAnalytics() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");
  const [stats, setStats] = useState({
    // Overview stats
    totalStudents: 0,
    totalMissionsCompleted: 0,
    totalArtifacts: 0,
    totalPitchAttempts: 0,
    // Trends
    signupsOverTime: [] as { date: string; count: number }[],
    missionsOverTime: [] as { date: string; count: number }[],
    // Completion rates
    missionCompletionByWeek: [] as { week: string; rate: number; completed: number; total: number }[],
    missionCompletionByTrack: [] as { name: string; rate: number }[],
    // Popular features
    featureUsage: [] as { name: string; usage: number; icon: string }[],
    // Existing
    studentsByProgram: [] as { name: string; value: number }[],
    topSchools: [] as { name: string; students: number }[],
    // Skills analytics
    skillsAnalytics: {
      totalAnalyses: 0,
      avgSkillScore: 0,
      topStrengths: [] as { skill: string; count: number }[],
      levelDistribution: [] as { level: string; count: number }[],
    },
  });

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  async function fetchAnalytics() {
    try {
      const daysAgo = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : timeRange === "90d" ? 90 : 365;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysAgo);

      // Fetch all data in parallel
      const [
        { data: students },
        { data: studentMissions },
        { data: artifacts },
        { data: pitchAttempts },
        { data: reflections },
        { data: chatConversations },
        { data: missions },
        { data: skillAssessments },
        { data: skillInsights },
      ] = await Promise.all([
        supabase.from("students").select("id, program, school_name, created_at"),
        supabase.from("student_missions").select("id, student_id, mission_id, status, started_at, completed_at"),
        supabase.from("artifacts").select("id, student_id, artifact_type, created_at"),
        supabase.from("pitch_attempts").select("id, student_id, score, created_at"),
        supabase.from("reflections").select("id, student_id, created_at"),
        supabase.from("chat_conversations").select("id, student_id, created_at"),
        supabase.from("missions").select("id, week, track"),
        supabase.from("skill_assessments").select("id, skill_category, combined_score, current_level, signature_strength"),
        supabase.from("skill_insights").select("id, signature_strength_name, engagement_score"),
      ]);

      // Overview stats
      const totalStudents = students?.length || 0;
      const totalMissionsCompleted = studentMissions?.filter(m => m.status === "completed").length || 0;
      const totalArtifacts = artifacts?.length || 0;
      const totalPitchAttempts = pitchAttempts?.length || 0;

      // Signups over time
      const signupCounts: Record<string, number> = {};
      students?.forEach((s) => {
        if (s.created_at) {
          const date = new Date(s.created_at);
          if (date >= startDate) {
            const key = date.toISOString().split("T")[0];
            signupCounts[key] = (signupCounts[key] || 0) + 1;
          }
        }
      });
      const signupsOverTime = Object.entries(signupCounts)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([date, count]) => ({
          date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          count,
        }));

      // Missions completed over time
      const missionCounts: Record<string, number> = {};
      studentMissions?.filter(m => m.status === "completed" && m.completed_at).forEach((m) => {
        const date = new Date(m.completed_at!);
        if (date >= startDate) {
          const key = date.toISOString().split("T")[0];
          missionCounts[key] = (missionCounts[key] || 0) + 1;
        }
      });
      const missionsOverTime = Object.entries(missionCounts)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([date, count]) => ({
          date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          count,
        }));

      // Mission completion by week
      const weekStats: Record<number, { completed: number; started: number }> = {};
      const missionWeekMap = new Map(missions?.map(m => [m.id, m.week]) || []);
      
      studentMissions?.forEach((sm) => {
        const week = missionWeekMap.get(sm.mission_id);
        if (week) {
          if (!weekStats[week]) weekStats[week] = { completed: 0, started: 0 };
          weekStats[week].started++;
          if (sm.status === "completed") weekStats[week].completed++;
        }
      });

      const missionCompletionByWeek = Object.entries(weekStats)
        .map(([week, data]) => ({
          week: `Week ${week}`,
          rate: data.started > 0 ? Math.round((data.completed / data.started) * 100) : 0,
          completed: data.completed,
          total: data.started,
        }))
        .sort((a, b) => parseInt(a.week.replace("Week ", "")) - parseInt(b.week.replace("Week ", "")));

      // Mission completion by track
      const trackStats: Record<string, { completed: number; started: number }> = {};
      const missionTrackMap = new Map(missions?.map(m => [m.id, m.track]) || []);
      
      studentMissions?.forEach((sm) => {
        const track = missionTrackMap.get(sm.mission_id);
        if (track) {
          if (!trackStats[track]) trackStats[track] = { completed: 0, started: 0 };
          trackStats[track].started++;
          if (sm.status === "completed") trackStats[track].completed++;
        }
      });

      const missionCompletionByTrack = Object.entries(trackStats).map(([name, data]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        rate: data.started > 0 ? Math.round((data.completed / data.started) * 100) : 0,
      }));

      // Feature usage (popular features)
      const featureUsage = [
        { name: "THE TANK", usage: totalPitchAttempts, icon: "trophy" },
        { name: "AI Coach", usage: chatConversations?.length || 0, icon: "message" },
        { name: "Artifacts", usage: totalArtifacts, icon: "file" },
        { name: "Reflections", usage: reflections?.length || 0, icon: "lightbulb" },
        { name: "Missions", usage: totalMissionsCompleted, icon: "target" },
      ].sort((a, b) => b.usage - a.usage);

      // Students by program
      const programCounts: Record<string, number> = {};
      students?.forEach((s) => {
        if (s.program) {
          programCounts[s.program] = (programCounts[s.program] || 0) + 1;
        }
      });
      const studentsByProgram = Object.entries(programCounts).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
      }));

      // Top schools
      const schoolCounts: Record<string, number> = {};
      students?.forEach((s) => {
        if (s.school_name) {
          schoolCounts[s.school_name] = (schoolCounts[s.school_name] || 0) + 1;
        }
      });
      const topSchools = Object.entries(schoolCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, students]) => ({ name, students }));

      // Skills analytics
      const totalAnalyses = skillInsights?.length || 0;
      const avgSkillScore = skillAssessments?.length 
        ? Math.round(skillAssessments.reduce((sum, a) => sum + (a.combined_score || 0), 0) / skillAssessments.length)
        : 0;

      // Top signature strengths
      const strengthCounts: Record<string, number> = {};
      skillAssessments?.filter(a => a.signature_strength).forEach(a => {
        const skill = a.skill_category?.replace(/_/g, ' ') || 'Unknown';
        strengthCounts[skill] = (strengthCounts[skill] || 0) + 1;
      });
      const topStrengths = Object.entries(strengthCounts)
        .map(([skill, count]) => ({ skill, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Level distribution
      const levelCounts: Record<string, number> = { Emerging: 0, Developing: 0, Proficient: 0, Advanced: 0 };
      skillAssessments?.forEach(a => {
        if (a.current_level) {
          const level = a.current_level.charAt(0).toUpperCase() + a.current_level.slice(1);
          if (levelCounts[level] !== undefined) {
            levelCounts[level]++;
          }
        }
      });
      const levelDistribution = Object.entries(levelCounts).map(([level, count]) => ({ level, count }));

      setStats({
        totalStudents,
        totalMissionsCompleted,
        totalArtifacts,
        totalPitchAttempts,
        signupsOverTime,
        missionsOverTime,
        missionCompletionByWeek,
        missionCompletionByTrack,
        featureUsage,
        studentsByProgram,
        topSchools,
        skillsAnalytics: {
          totalAnalyses,
          avgSkillScore,
          topStrengths,
          levelDistribution,
        },
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  }

  const getFeatureIcon = (icon: string) => {
    switch (icon) {
      case "trophy": return <Trophy className="h-4 w-4" />;
      case "message": return <MessageSquare className="h-4 w-4" />;
      case "file": return <FileText className="h-4 w-4" />;
      case "lightbulb": return <Lightbulb className="h-4 w-4" />;
      case "target": return <Target className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Platform metrics and insights
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalStudents}</p>
                <p className="text-xs text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalMissionsCompleted}</p>
                <p className="text-xs text-muted-foreground">Missions Done</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalArtifacts}</p>
                <p className="text-xs text-muted-foreground">Artifacts Created</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalPitchAttempts}</p>
                <p className="text-xs text-muted-foreground">Pitch Attempts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Signup Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Student Signups Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            {stats.signupsOverTime.length === 0 ? (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                No signup data for selected period
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.signupsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mission Completion by Week */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Mission Completion by Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              {stats.missionCompletionByWeek.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No mission data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.missionCompletionByWeek}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="week" className="text-xs" />
                    <YAxis className="text-xs" unit="%" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number, name: string) => [`${value}%`, "Completion Rate"]}
                    />
                    <Bar dataKey="rate" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Mission Completion by Track */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Completion Rate by Program
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              {stats.missionCompletionByTrack.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No track data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.missionCompletionByTrack} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" className="text-xs" unit="%" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" className="text-xs" width={80} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value}%`, "Completion Rate"]}
                    />
                    <Bar dataKey="rate" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Popular Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Popular Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.featureUsage.map((feature, index) => (
                <div
                  key={feature.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      index === 0 ? "bg-primary/20 text-primary" :
                      index === 1 ? "bg-purple-500/20 text-purple-500" :
                      index === 2 ? "bg-green-500/20 text-green-500" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {getFeatureIcon(feature.icon)}
                    </div>
                    <span className="font-medium">{feature.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{feature.usage}</span>
                    <span className="text-xs text-muted-foreground">uses</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Students by Program */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Students by Program
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              {stats.studentsByProgram.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No student data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.studentsByProgram}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {stats.studentsByProgram.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Schools */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <School className="h-5 w-5" />
              Top Schools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {stats.topSchools.length === 0 ? (
                <p className="text-muted-foreground text-center py-8 col-span-full">
                  No school data available
                </p>
              ) : (
                stats.topSchools.map((school, index) => (
                  <div
                    key={school.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full text-sm flex items-center justify-center font-medium ${
                        index === 0 ? "bg-primary/20 text-primary" :
                        index === 1 ? "bg-purple-500/20 text-purple-500" :
                        index === 2 ? "bg-green-500/20 text-green-500" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {index + 1}
                      </span>
                      <span className="font-medium truncate max-w-[150px]">
                        {school.name}
                      </span>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {school.students} students
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills Overview Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Skills Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-primary/5">
                <p className="text-3xl font-bold text-primary">{stats.skillsAnalytics.totalAnalyses}</p>
                <p className="text-xs text-muted-foreground">Total Analyses</p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/5">
                <p className="text-3xl font-bold text-green-600">{stats.skillsAnalytics.avgSkillScore}%</p>
                <p className="text-xs text-muted-foreground">Avg Skill Score</p>
              </div>
            </div>
            
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500" />
              Top Signature Strengths
            </h4>
            {stats.skillsAnalytics.topStrengths.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-4">
                No skill analysis data yet
              </p>
            ) : (
              <div className="space-y-2">
                {stats.skillsAnalytics.topStrengths.map((strength, index) => (
                  <div key={strength.skill} className="flex items-center justify-between p-2 rounded bg-muted/50">
                    <span className="text-sm">{strength.skill}</span>
                    <Badge variant="secondary">{strength.count} students</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Skill Level Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Skill Level Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              {stats.skillsAnalytics.levelDistribution.every(d => d.count === 0) ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No skill level data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.skillsAnalytics.levelDistribution} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" className="text-xs" />
                    <YAxis dataKey="level" type="category" className="text-xs" width={80} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
