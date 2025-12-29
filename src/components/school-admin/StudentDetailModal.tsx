import { SKILL_LABELS } from "@/hooks/useSkills";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Target, 
  Trophy, 
  FileText, 
  Mic, 
  Star,
  GraduationCap
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

interface StudentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentDetail: {
    student: {
      id: string;
      full_name: string;
      program: string;
      grade: string | null;
      age: number;
      created_at: string;
    } | undefined;
    skills: Record<string, number>;
    totalPoints: number;
    missionsCompleted: number;
    totalMissions: number;
    progressPercent: number;
    artifacts: { artifact_type: string }[];
    pitchAttempts: number;
    avgPitchScore: number;
    totalXP: number;
  } | null;
}

const programLabels: Record<string, string> = {
  junior: "Junior Builders",
  teen: "Teen Founders",
  advanced: "Advanced Venture",
};

export function StudentDetailModal({ isOpen, onClose, studentDetail }: StudentDetailModalProps) {
  if (!studentDetail?.student) return null;

  const { student, skills, totalPoints, missionsCompleted, totalMissions, progressPercent, artifacts, pitchAttempts, avgPitchScore, totalXP } = studentDetail;

  // Prepare radar chart data
  const radarData = Object.entries(SKILL_LABELS).map(([key, info]) => ({
    skill: info.name.split(' ')[0],
    fullName: info.name,
    score: skills[key] || 0,
    maxScore: 100,
  }));

  // Group artifacts by type
  const artifactCounts = artifacts.reduce((acc, a) => {
    acc[a.artifact_type] = (acc[a.artifact_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-xl">{student.full_name}</SheetTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary">{programLabels[student.program] || student.program}</Badge>
                {student.grade && <Badge variant="outline">Grade {student.grade}</Badge>}
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Progress Overview */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4" />
                Journey Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Missions Completed</span>
                  <span className="font-medium">{missionsCompleted} / {totalMissions}</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
                <div className="text-xs text-muted-foreground text-right">
                  {progressPercent}% complete
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Radar */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Star className="h-4 w-4" />
                Skills Profile ({totalPoints} XP)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {totalPoints > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis 
                        dataKey="skill" 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                      />
                      <PolarRadiusAxis 
                        angle={30} 
                        domain={[0, 100]} 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                      />
                      <Radar
                        name="Skills"
                        dataKey="score"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-32 flex items-center justify-center text-muted-foreground text-sm">
                  No skills earned yet
                </div>
              )}

              {/* Skill breakdown */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {Object.entries(SKILL_LABELS).map(([key, info]) => (
                  <div key={key} className="flex items-center justify-between text-xs p-2 bg-muted/50 rounded">
                    <span className="text-muted-foreground truncate">{info.name}</span>
                    <span className="font-medium">{skills[key] || 0}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Artifacts</span>
                </div>
                <p className="text-2xl font-bold">{artifacts.length}</p>
                {Object.entries(artifactCounts).length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {Object.entries(artifactCounts).map(([type, count]) => (
                      <Badge key={type} variant="outline" className="text-xs">
                        {type}: {count}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-1">
                  <Mic className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">THE TANK</span>
                </div>
                <p className="text-2xl font-bold">{pitchAttempts}</p>
                {pitchAttempts > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Avg Score: {avgPitchScore}% · {totalXP} XP
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* KHDA Skills Mapping */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                KHDA Framework Alignment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs">
                {[
                  { skill: "Problem Analysis", khda: "Critical Thinking", level: skills["PROBLEM_ANALYSIS"] || 0 },
                  { skill: "AI Collaboration", khda: "Digital Literacy", level: skills["AI_COLLABORATION"] || 0 },
                  { skill: "Customer Research", khda: "Social Skills", level: skills["CUSTOMER_RESEARCH"] || 0 },
                  { skill: "Communication", khda: "Communication", level: skills["COMMUNICATION"] || 0 },
                  { skill: "Self Management", khda: "Self-Management", level: skills["SELF_MANAGEMENT"] || 0 },
                ].map(item => (
                  <div key={item.skill} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <div>
                      <span className="font-medium">{item.skill}</span>
                      <span className="text-muted-foreground ml-2">→ {item.khda}</span>
                    </div>
                    <Badge variant={item.level > 50 ? "default" : item.level > 20 ? "secondary" : "outline"}>
                      {item.level > 50 ? "Proficient" : item.level > 20 ? "Developing" : "Emerging"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}
