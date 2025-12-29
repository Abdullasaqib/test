import { TeamMemberProgress } from "@/hooks/useTeam";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, Zap, FileText, Mic, Trophy } from "lucide-react";

interface TeamProgressProps {
  memberProgress: TeamMemberProgress[];
  currentStudentId?: string;
}

export function TeamProgress({ memberProgress, currentStudentId }: TeamProgressProps) {
  const totalMissions = 60; // Total missions in program

  // Sort by XP for leaderboard effect
  const sortedMembers = [...memberProgress].sort((a, b) => b.total_xp - a.total_xp);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Team Leaderboard
          </CardTitle>
          <CardDescription>
            Compare progress with your teammates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedMembers.map((member, index) => {
              const isCurrentUser = member.student_id === currentStudentId;
              const progressPercent = Math.round((member.missions_completed / totalMissions) * 100);

              return (
                <div
                  key={member.student_id}
                  className={`p-4 rounded-lg border ${isCurrentUser ? 'bg-primary/5 border-primary/20' : 'bg-muted/30'}`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-yellow-500/20 text-yellow-600' :
                      index === 1 ? 'bg-gray-400/20 text-gray-600' :
                      index === 2 ? 'bg-orange-500/20 text-orange-600' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>

                    {/* Name + Badge */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{member.full_name}</span>
                        {isCurrentUser && <Badge variant="secondary" className="text-xs">You</Badge>}
                      </div>
                      <div className="mt-1">
                        <Progress value={progressPercent} className="h-1.5" />
                        <span className="text-xs text-muted-foreground">{progressPercent}% journey complete</span>
                      </div>
                    </div>

                    {/* XP */}
                    <div className="text-right">
                      <span className="font-bold text-primary">{member.total_xp}</span>
                      <span className="text-xs text-muted-foreground ml-1">XP</span>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      <span>{member.missions_completed} missions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      <span>{member.artifacts_count} artifacts</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mic className="h-3 w-3" />
                      <span>{member.pitch_attempts} pitches</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Team Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="pt-4 text-center">
            <Target className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
            <p className="text-2xl font-bold">
              {memberProgress.reduce((sum, m) => sum + m.missions_completed, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Team Missions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <Zap className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
            <p className="text-2xl font-bold">
              {memberProgress.reduce((sum, m) => sum + m.total_xp, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Total XP</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <FileText className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
            <p className="text-2xl font-bold">
              {memberProgress.reduce((sum, m) => sum + m.artifacts_count, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Artifacts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <Mic className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
            <p className="text-2xl font-bold">
              {memberProgress.reduce((sum, m) => sum + m.pitch_attempts, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Pitch Attempts</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
