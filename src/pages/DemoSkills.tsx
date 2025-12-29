import { DemoLayout } from "@/components/demo/DemoLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, Award, BarChart3 } from "lucide-react";
import { DEMO_SKILL_SCORES, DEMO_COMPLETED_MISSIONS, DEMO_STUDENT } from "@/data/demoData";
import { SKILL_LABELS } from "@/hooks/useSkills";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import { motion } from "framer-motion";

export default function DemoSkills() {
  const totalPoints = DEMO_SKILL_SCORES.reduce((sum, s) => sum + s.total_points, 0);
  const avgScore = Math.round(totalPoints / DEMO_SKILL_SCORES.length);

  const radarData = DEMO_SKILL_SCORES.map(score => ({
    skill: SKILL_LABELS[score.skill]?.name || score.skill,
    score: score.total_points,
    fullMark: 100,
  }));

  const topSkills = [...DEMO_SKILL_SCORES]
    .sort((a, b) => b.total_points - a.total_points)
    .slice(0, 3);

  return (
    <DemoLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Skills Intelligence</h1>
          <p className="text-muted-foreground">
            {DEMO_STUDENT.full_name}'s skill development across {DEMO_COMPLETED_MISSIONS} missions
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalPoints}</p>
                <p className="text-xs text-muted-foreground">Total XP</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Target className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{DEMO_COMPLETED_MISSIONS}</p>
                <p className="text-xs text-muted-foreground">Missions Done</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Award className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{avgScore}</p>
                <p className="text-xs text-muted-foreground">Avg Skill Score</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <BarChart3 className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">Skills Tracked</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Skills Radar
                <Badge variant="secondary">Week 7</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(var(--muted-foreground))" strokeOpacity={0.3} />
                    <PolarAngleAxis
                      dataKey="skill"
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Top Strengths</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {topSkills.map((skill, i) => {
                const info = SKILL_LABELS[skill.skill];
                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {i === 0 && <span className="text-yellow-500">🥇</span>}
                        {i === 1 && <span className="text-gray-400">🥈</span>}
                        {i === 2 && <span className="text-amber-600">🥉</span>}
                        <span className="font-medium">{info?.name || skill.skill}</span>
                      </div>
                      <span className="text-sm font-bold">{skill.total_points}</span>
                    </div>
                    <Progress value={skill.total_points} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {info?.description} • {skill.missions_completed} missions
                    </p>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* All Skills Grid */}
        <Card>
          <CardHeader>
            <CardTitle>All Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {DEMO_SKILL_SCORES.map((skill, i) => {
                const info = SKILL_LABELS[skill.skill];
                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-4 rounded-lg bg-muted/50 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{info?.name}</span>
                      <Badge variant="outline">{skill.total_points}</Badge>
                    </div>
                    <Progress value={skill.total_points} className="h-1.5" />
                    <p className="text-xs text-muted-foreground">
                      {skill.missions_completed} missions completed
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DemoLayout>
  );
}
