import { EnterpriseAdminLayout } from "@/components/enterprise-admin/EnterpriseAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEnterpriseAdmin } from "@/hooks/useEnterpriseAdmin";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Clock, Target, TrendingUp } from "lucide-react";

export default function EnterpriseProgress() {
  const { learners, stats, isLoading } = useEnterpriseAdmin();

  if (isLoading) {
    return (
      <EnterpriseAdminLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </EnterpriseAdminLayout>
    );
  }

  // Mock progress data (would come from actual curriculum progress in production)
  const weeklyProgress = [
    { week: 1, label: "IDEATE", completed: 12, total: 15 },
    { week: 2, label: "IDEATE", completed: 10, total: 15 },
    { week: 3, label: "VALIDATE", completed: 8, total: 15 },
    { week: 4, label: "VALIDATE", completed: 6, total: 15 },
    { week: 5, label: "BUILD", completed: 4, total: 15 },
    { week: 6, label: "BUILD", completed: 3, total: 15 },
    { week: 7, label: "LAUNCH", completed: 2, total: 15 },
    { week: 8, label: "LAUNCH", completed: 1, total: 15 },
  ];

  return (
    <EnterpriseAdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Progress Overview</h1>
          <p className="text-muted-foreground">
            Track your team's learning journey
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42%</div>
              <Progress value={42} className="h-2 mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg. Time/Week</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2 hrs</div>
              <p className="text-xs text-muted-foreground">Per learner</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedLearners}</div>
              <p className="text-xs text-muted-foreground">AI Builder Pro</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+12%</div>
              <p className="text-xs text-muted-foreground">vs last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress Breakdown</CardTitle>
            <CardDescription>
              How many learners have completed each week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyProgress.map((week) => (
                <div key={week.week} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium">Week {week.week}</div>
                  <Badge variant="outline" className="w-20 justify-center">
                    {week.label}
                  </Badge>
                  <div className="flex-1">
                    <Progress 
                      value={(week.completed / week.total) * 100} 
                      className="h-3"
                    />
                  </div>
                  <div className="w-16 text-sm text-muted-foreground text-right">
                    {week.completed}/{week.total}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>
              Learners with the highest engagement and completion rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            {learners && learners.length > 0 ? (
              <div className="space-y-3">
                {learners.slice(0, 5).map((learner, idx) => (
                  <div key={learner.id} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{learner.full_name || learner.email}</p>
                      <p className="text-xs text-muted-foreground">{learner.department || "No department"}</p>
                    </div>
                    <Badge variant={learner.status === 'completed' ? 'default' : 'secondary'}>
                      {learner.status === 'completed' ? 'Completed' : 'In Progress'}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-muted-foreground">
                No learners yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </EnterpriseAdminLayout>
  );
}
