import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Shuffle, Lightbulb, Target, Brain, Rocket } from "lucide-react";
import { useState, useMemo } from "react";

interface StudentSkillProfile {
  student_id: string;
  student_name: string;
  program: string;
  total_points: number;
  skills: Record<string, number>;
  missions_completed: number;
}

interface SmartTeamGroupingProps {
  students: StudentSkillProfile[];
}

interface Team {
  name: string;
  members: (StudentSkillProfile & { role: string })[];
  balance_score: number;
}

const FOUNDER_ROLES = [
  { role: 'Visionary', skills: ['ENTREPRENEURSHIP', 'COMMUNICATION'], icon: <Rocket className="w-4 h-4" /> },
  { role: 'Builder', skills: ['DIGITAL_LITERACY', 'AI_COLLABORATION'], icon: <Brain className="w-4 h-4" /> },
  { role: 'Analyst', skills: ['PROBLEM_ANALYSIS', 'SELF_MANAGEMENT'], icon: <Target className="w-4 h-4" /> },
  { role: 'Connector', skills: ['CUSTOMER_RESEARCH', 'RESILIENCE'], icon: <Lightbulb className="w-4 h-4" /> },
];

export function SmartTeamGrouping({ students }: SmartTeamGroupingProps) {
  const [suggestedTeams, setSuggestedTeams] = useState<Team[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Determine a student's best role based on their skill strengths
  const getStudentRole = (student: StudentSkillProfile) => {
    let bestRole = FOUNDER_ROLES[0];
    let bestScore = 0;

    FOUNDER_ROLES.forEach(roleConfig => {
      const score = roleConfig.skills.reduce((sum, skill) => sum + (student.skills[skill] || 0), 0);
      if (score > bestScore) {
        bestScore = score;
        bestRole = roleConfig;
      }
    });

    return bestRole;
  };

  // Generate smart team suggestions
  const generateTeams = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const availableStudents = [...students].filter(s => s.total_points > 0);
      
      // Sort by total points to distribute skill levels evenly
      availableStudents.sort((a, b) => b.total_points - a.total_points);
      
      const teams: Team[] = [];
      const teamSize = Math.min(4, Math.max(2, Math.floor(availableStudents.length / 3)));
      const numTeams = Math.ceil(availableStudents.length / teamSize);
      
      // Initialize teams
      for (let i = 0; i < numTeams; i++) {
        teams.push({
          name: `Team ${String.fromCharCode(65 + i)}`, // Team A, B, C...
          members: [],
          balance_score: 0,
        });
      }
      
      // Distribute students to teams using round-robin for balance
      availableStudents.forEach((student, index) => {
        const teamIndex = index % numTeams;
        const role = getStudentRole(student);
        teams[teamIndex].members.push({
          ...student,
          role: role.role,
        });
      });
      
      // Calculate balance scores
      teams.forEach(team => {
        const roles = team.members.map(m => m.role);
        const uniqueRoles = new Set(roles).size;
        const totalXP = team.members.reduce((sum, m) => sum + m.total_points, 0);
        team.balance_score = Math.round((uniqueRoles / Math.min(4, team.members.length)) * 100);
      });
      
      setSuggestedTeams(teams.filter(t => t.members.length > 0));
      setIsGenerating(false);
    }, 500);
  };

  if (students.length < 4) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Smart Team Grouping
          </CardTitle>
          <CardDescription>
            Need at least 4 students with activity to suggest teams
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            As more students complete missions, team suggestions will become available.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Smart Team Grouping
            </CardTitle>
            <CardDescription>
              AI-suggested teams based on complementary strengths
            </CardDescription>
          </div>
          <Button 
            onClick={generateTeams} 
            disabled={isGenerating}
            size="sm"
            className="gap-2"
          >
            <Shuffle className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Generating...' : suggestedTeams.length > 0 ? 'Regenerate' : 'Generate Teams'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {suggestedTeams.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Click "Generate Teams" to get smart team suggestions</p>
            <p className="text-sm mt-1">Teams are balanced by skill diversity and experience level</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {suggestedTeams.map((team, teamIndex) => (
              <div 
                key={teamIndex}
                className="p-4 rounded-lg border bg-muted/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{team.name}</h4>
                  <Badge 
                    variant={team.balance_score >= 75 ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {team.balance_score}% balanced
                  </Badge>
                </div>
                <div className="space-y-2">
                  {team.members.map((member, memberIndex) => {
                    const roleConfig = FOUNDER_ROLES.find(r => r.role === member.role);
                    return (
                      <div 
                        key={memberIndex}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {roleConfig?.icon}
                        </div>
                        <span className="flex-1 truncate">{member.student_name}</span>
                        <Badge variant="outline" className="text-xs">
                          {member.role}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Total XP: {team.members.reduce((sum, m) => sum + m.total_points, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
