import { useSkills, SKILL_LABELS } from "@/hooks/useSkills";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Target, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

export function SkillsRadar() {
  const { getSkillsForRadar, totalPoints, totalMissionsWithSkills, isLoading } = useSkills();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    );
  }

  const skillsData = getSkillsForRadar();
  const hasAnySkills = totalPoints > 0;

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Target className="h-4 w-4" />
            Skills Progress
          </CardTitle>
          {hasAnySkills && (
            <Badge variant="secondary" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              {totalPoints} XP
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {hasAnySkills ? (
          <>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillsData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                  <PolarGrid 
                    stroke="hsl(var(--muted-foreground))" 
                    strokeOpacity={0.2}
                  />
                  <PolarAngleAxis
                    dataKey="name"
                    tick={{ 
                      fill: "hsl(var(--muted-foreground))", 
                      fontSize: 10,
                    }}
                    tickLine={false}
                  />
                  <Radar
                    name="Skills"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-center text-muted-foreground mt-2">
              {totalMissionsWithSkills} mission{totalMissionsWithSkills !== 1 ? 's' : ''} completed
            </p>
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Target className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">No skills earned yet</p>
            <p className="text-xs mt-1">Complete missions to build your skills</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
