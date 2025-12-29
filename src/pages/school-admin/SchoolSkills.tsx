import { useState } from "react";
import { useSchoolAdmin } from "@/hooks/useSchoolAdmin";
import { useSchoolSkills } from "@/hooks/useSchoolSkills";
import { SKILL_LABELS } from "@/hooks/useSkills";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { StudentDetailModal } from "@/components/school-admin/StudentDetailModal";
import { SkillsReport } from "@/components/school-admin/SkillsReport";
import { AtRiskIndicators } from "@/components/school-admin/AtRiskIndicators";
import { SmartTeamGrouping } from "@/components/school-admin/SmartTeamGrouping";
import { BarChart3, TrendingUp, Award, Users, Zap, Trophy, AlertTriangle } from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

export default function SchoolSkills() {
  const { schoolAdmin, isLoadingStudents } = useSchoolAdmin();
  const { 
    studentSkillsList, 
    schoolSkillAggregates, 
    topPerformers,
    getStudentDetail,
    isLoading,
    totalStudents,
    totalSkillPoints,
    avgSkillPoints,
  } = useSchoolSkills();

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  if (isLoadingStudents || isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-80" />
          ))}
        </div>
      </div>
    );
  }

  // Prepare radar chart data
  const radarData = schoolSkillAggregates.map(skill => ({
    skill: skill.name.split(' ')[0],
    fullName: skill.name,
    score: skill.average_score,
    students: skill.students_with_skill,
  }));

  // Prepare bar chart data
  const barData = schoolSkillAggregates.map(skill => ({
    name: skill.name.split(' ')[0],
    fullName: skill.name,
    value: skill.average_score,
    students: skill.students_with_skill,
    color: skill.color,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Skills Analytics</h1>
        <p className="text-muted-foreground">
          Track student skill development across all 8 core competencies
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Total Students</span>
            </div>
            <p className="text-2xl font-bold">{totalStudents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Total XP Earned</span>
            </div>
            <p className="text-2xl font-bold">{totalSkillPoints.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Avg XP per Student</span>
            </div>
            <p className="text-2xl font-bold">{avgSkillPoints}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-1">
              <Award className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Skills Tracked</span>
            </div>
            <p className="text-2xl font-bold">8</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* School-Wide Radar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              School-Wide Skills Profile
            </CardTitle>
            <CardDescription>
              Average skill scores across all students
            </CardDescription>
          </CardHeader>
          <CardContent>
            {totalStudents > 0 ? (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis 
                      dataKey="skill" 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                    />
                    <PolarRadiusAxis 
                      angle={30} 
                      domain={[0, Math.max(...radarData.map(d => d.score), 50)]}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    />
                    <Radar
                      name="Average Score"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-72 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No skill data yet</p>
                  <p className="text-sm">Students earn skills by completing missions</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Skill Distribution Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Skill Distribution
            </CardTitle>
            <CardDescription>
              Average XP earned per skill category
            </CardDescription>
          </CardHeader>
          <CardContent>
            {totalStudents > 0 ? (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} layout="vertical">
                    <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      width={80}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                    />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-popover border rounded-lg shadow-lg p-2 text-sm">
                              <p className="font-medium">{data.fullName}</p>
                              <p className="text-muted-foreground">Avg: {data.value} XP</p>
                              <p className="text-muted-foreground">{data.students} students active</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {barData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-72 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No skill data yet</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Performers + Reports */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Top Performers */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Top Performers
            </CardTitle>
            <CardDescription>
              Students with highest total skill points
            </CardDescription>
          </CardHeader>
          <CardContent>
            {topPerformers.length > 0 ? (
              <div className="space-y-3">
                {topPerformers.map((student, index) => {
                  const topSkill = Object.entries(student.skills).sort((a, b) => b[1] - a[1])[0];
                  const topSkillName = topSkill ? SKILL_LABELS[topSkill[0]]?.name : 'N/A';
                  
                  return (
                    <button
                      key={student.student_id}
                      onClick={() => setSelectedStudentId(student.student_id)}
                      className="w-full flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{student.student_name}</p>
                        <p className="text-xs text-muted-foreground">
                          Top skill: {topSkillName}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{student.total_points} XP</p>
                        <p className="text-xs text-muted-foreground">
                          {student.missions_completed} missions
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No student data yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reports Export */}
        <SkillsReport 
          schoolName={schoolAdmin?.school?.name || "School"}
          students={studentSkillsList}
          aggregates={schoolSkillAggregates}
          totalStudents={totalStudents}
        />
      </div>

      {/* At-Risk & Team Grouping Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <AtRiskIndicators 
          students={studentSkillsList}
          avgMissions={totalStudents > 0 ? studentSkillsList.reduce((sum, s) => sum + s.missions_completed, 0) / totalStudents : 0}
          onViewStudent={setSelectedStudentId}
        />
        <SmartTeamGrouping students={studentSkillsList} />
      </div>

      {/* Skills Framework */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Core Skills Framework
          </CardTitle>
          <CardDescription>
            Mapped to KHDA Well-being Framework and IB Learner Profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(SKILL_LABELS).map(([key, skill]) => {
              const aggregate = schoolSkillAggregates.find(s => s.skill === key);
              const khdaMapping: Record<string, string> = {
                PROBLEM_ANALYSIS: "Critical Thinking",
                AI_COLLABORATION: "Digital Literacy",
                CUSTOMER_RESEARCH: "Social Skills",
                DIGITAL_LITERACY: "Technology",
                ENTREPRENEURSHIP: "Self-Management",
                COMMUNICATION: "Communication",
                RESILIENCE: "Personal Development",
                SELF_MANAGEMENT: "Self-Management",
              };
              
              return (
                <div key={key} className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-foreground mb-1">{skill.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{skill.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {khdaMapping[key]}
                    </Badge>
                    {aggregate && (
                      <span className="text-xs font-medium text-primary">
                        {aggregate.students_with_skill} active
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Student Detail Modal */}
      <StudentDetailModal
        isOpen={!!selectedStudentId}
        onClose={() => setSelectedStudentId(null)}
        studentDetail={selectedStudentId ? getStudentDetail(selectedStudentId) : null}
      />
    </div>
  );
}
