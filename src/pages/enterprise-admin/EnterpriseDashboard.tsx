import { EnterpriseAdminLayout } from "@/components/enterprise-admin/EnterpriseAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEnterpriseAdmin } from "@/hooks/useEnterpriseAdmin";
import { Users, UserCheck, GraduationCap, Inbox, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function EnterpriseDashboard() {
  const { currentOrg, stats, isLoading } = useEnterpriseAdmin();

  if (isLoading) {
    return (
      <EnterpriseAdminLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="h-32 bg-muted rounded" />)}
          </div>
        </div>
      </EnterpriseAdminLayout>
    );
  }

  const completionRate = stats.totalLearners > 0 
    ? Math.round((stats.completedLearners / stats.totalLearners) * 100)
    : 0;

  return (
    <EnterpriseAdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{currentOrg?.name}</h1>
          <p className="text-muted-foreground">Enterprise Learning Dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLearners}</div>
              <p className="text-xs text-muted-foreground">
                {stats.seatsRemaining} seats remaining
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <UserCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeLearners}</div>
              <p className="text-xs text-muted-foreground">Currently learning</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <GraduationCap className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedLearners}</div>
              <p className="text-xs text-muted-foreground">Certified builders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Inbox className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.invitedLearners}</div>
              <p className="text-xs text-muted-foreground">Awaiting activation</p>
            </CardContent>
          </Card>
        </div>

        {/* Completion Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Program Completion Rate
            </CardTitle>
            <CardDescription>
              {stats.completedLearners} of {stats.totalLearners} learners have completed the program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={completionRate} className="h-3" />
            <p className="mt-2 text-sm text-muted-foreground">{completionRate}% completion</p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <a 
              href="/enterprise-admin/learners" 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Invite Learners
            </a>
            <a 
              href="/enterprise-admin/reports" 
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors"
            >
              Download Report
            </a>
          </CardContent>
        </Card>
      </div>
    </EnterpriseAdminLayout>
  );
}
