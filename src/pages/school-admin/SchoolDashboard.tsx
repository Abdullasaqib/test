import { useSchoolAdmin } from "@/hooks/useSchoolAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserPlus,
  TrendingUp,
  Award,
  AlertCircle,
  AlertTriangle,
  Download,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { differenceInDays } from "date-fns";

export default function SchoolDashboard() {
  const { schoolAdmin, students, licenseUsage, isLoading } = useSchoolAdmin();

  // Fetch real progress data for all school students
  const { data: progressData } = useQuery({
    queryKey: ["school-progress", schoolAdmin?.school_id],
    queryFn: async () => {
      if (!students?.length) return { avgProgress: 0, certificatesEarned: 0, atRiskStudents: [] };
      
      const studentIds = students.map(s => s.id);
      
      // Get certification progress for all students
      const { data: progress } = await supabase
        .from("certification_progress")
        .select("student_id, lesson_id, completed_at")
        .in("student_id", studentIds);

      // Get total lessons in AI Foundations (10 lessons now)
      const totalLessons = 10;
      
      // Calculate per-student progress
      const studentProgress: Record<string, number> = {};
      (progress || []).forEach(p => {
        if (p.completed_at) {
          studentProgress[p.student_id] = (studentProgress[p.student_id] || 0) + 1;
        }
      });

      // Calculate average progress
      const progressValues = Object.values(studentProgress);
      const avgProgress = progressValues.length > 0
        ? Math.round((progressValues.reduce((a, b) => a + b, 0) / (students.length * totalLessons)) * 100)
        : 0;

      // Count certificates earned (students who completed all 10 lessons)
      const certificatesEarned = progressValues.filter(p => p >= totalLessons).length;

      // Find at-risk students (inactive based on created_at date or no progress)
      const atRiskStudents = students.filter(student => {
        const createdDate = student.created_at ? new Date(student.created_at) : null;
        const daysSinceCreated = createdDate ? differenceInDays(new Date(), createdDate) : 999;
        const hasProgress = studentProgress[student.id] > 0;
        // At-risk: created 7+ days ago with no progress
        return daysSinceCreated >= 7 && !hasProgress;
      }).slice(0, 5);

      return { avgProgress, certificatesEarned, atRiskStudents };
    },
    enabled: !!students?.length,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalStudents = students?.length || 0;
  const activeStudents = students?.filter((s) => s.status === "active").length || 0;
  const programBreakdown = {
    junior: students?.filter((s) => s.program === "junior").length || 0,
    teen: students?.filter((s) => s.program === "teen").length || 0,
    advanced: students?.filter((s) => s.program === "advanced").length || 0,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {schoolAdmin?.school?.name}
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your students' progress
          </p>
        </div>
        <Link to="/school-admin/students">
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Students
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              {licenseUsage.total > 0
                ? `${licenseUsage.remaining} seats available`
                : "Unlimited seats"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Students
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeStudents}</div>
            <p className="text-xs text-muted-foreground">
              {totalStudents > 0
                ? `${Math.round((activeStudents / totalStudents) * 100)}% engagement`
                : "No students yet"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              License Usage
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{licenseUsage.percentage}%</div>
            <Progress value={licenseUsage.percentage} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Progress
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressData?.avgProgress ?? 0}%</div>
            <Progress value={progressData?.avgProgress ?? 0} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Program Breakdown & Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Students by Program</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Junior Builders (9-11)</span>
                <span className="font-medium">{programBreakdown.junior}</span>
              </div>
              <Progress
                value={totalStudents > 0 ? (programBreakdown.junior / totalStudents) * 100 : 0}
                className="h-2"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Teen Founders (12-14)</span>
                <span className="font-medium">{programBreakdown.teen}</span>
              </div>
              <Progress
                value={totalStudents > 0 ? (programBreakdown.teen / totalStudents) * 100 : 0}
                className="h-2"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Advanced Venture (15-16)</span>
                <span className="font-medium">{programBreakdown.advanced}</span>
              </div>
              <Progress
                value={totalStudents > 0 ? (programBreakdown.advanced / totalStudents) * 100 : 0}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/school-admin/students" className="block">
              <Button variant="outline" className="w-full justify-start">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Students (CSV or Manual)
              </Button>
            </Link>
            <Link to="/school-admin/students?tab=invites" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Award className="h-4 w-4 mr-2" />
                Generate Invite Codes
              </Button>
            </Link>
            <Link to="/school-admin/reports" className="block">
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Skills Reports
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Alert for low seats */}
      {licenseUsage.remaining <= 10 && licenseUsage.total > 0 && (
        <Card className="border-amber-500/50 bg-amber-500/10">
          <CardContent className="flex items-center gap-4 py-4">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <div>
              <p className="font-medium text-foreground">
                Running low on student seats
              </p>
              <p className="text-sm text-muted-foreground">
                You have {licenseUsage.remaining} seats remaining. Contact us to
                upgrade your license.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
