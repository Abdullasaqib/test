import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingDown, Clock, MessageCircle } from "lucide-react";

interface AtRiskStudent {
  student_id: string;
  student_name: string;
  program: string;
  total_points: number;
  missions_completed: number;
  last_activity?: string;
  risk_indicators: string[];
}

interface AtRiskIndicatorsProps {
  students: {
    student_id: string;
    student_name: string;
    program: string;
    total_points: number;
    missions_completed: number;
    last_activity?: string;
  }[];
  avgMissions: number;
  onViewStudent: (studentId: string) => void;
}

export function AtRiskIndicators({ students, avgMissions, onViewStudent }: AtRiskIndicatorsProps) {
  // Identify at-risk students
  const atRiskStudents: AtRiskStudent[] = students
    .map(s => {
      const indicators: string[] = [];
      
      // Low mission completion
      if (s.missions_completed < avgMissions * 0.5) {
        indicators.push('Low mission completion');
      }
      
      // Very low XP
      if (s.total_points < 50) {
        indicators.push('Minimal skill progress');
      }
      
      // No recent activity (simulated - would need actual timestamps)
      if (s.missions_completed === 0) {
        indicators.push('No activity');
      }
      
      // Low engagement
      if (s.total_points > 0 && s.missions_completed > 0 && 
          s.total_points / s.missions_completed < 10) {
        indicators.push('Low engagement quality');
      }
      
      return {
        ...s,
        risk_indicators: indicators
      };
    })
    .filter(s => s.risk_indicators.length > 0)
    .sort((a, b) => b.risk_indicators.length - a.risk_indicators.length)
    .slice(0, 5);

  if (atRiskStudents.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <AlertTriangle className="h-5 w-5" />
            No At-Risk Students
          </CardTitle>
          <CardDescription>
            All students are progressing well
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your students are meeting or exceeding expectations. Keep up the great work!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-yellow-500/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-600">
          <AlertTriangle className="h-5 w-5" />
          At-Risk Students ({atRiskStudents.length})
        </CardTitle>
        <CardDescription>
          Students who may need additional support
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {atRiskStudents.map(student => (
            <button
              key={student.student_id}
              onClick={() => onViewStudent(student.student_id)}
              className="w-full p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20 hover:bg-yellow-500/10 transition-colors text-left"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{student.student_name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{student.program} program</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm">{student.total_points} XP</p>
                  <p className="text-xs text-muted-foreground">{student.missions_completed} missions</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {student.risk_indicators.map((indicator, i) => (
                  <Badge 
                    key={i} 
                    variant="outline" 
                    className="text-xs bg-yellow-500/10 text-yellow-600 border-yellow-500/30"
                  >
                    {indicator}
                  </Badge>
                ))}
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
