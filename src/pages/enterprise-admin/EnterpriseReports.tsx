import { EnterpriseAdminLayout } from "@/components/enterprise-admin/EnterpriseAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEnterpriseAdmin } from "@/hooks/useEnterpriseAdmin";
import { Download, FileSpreadsheet, FileText, Calendar } from "lucide-react";
import { toast } from "sonner";

export default function EnterpriseReports() {
  const { currentOrg, learners, stats, isLoading } = useEnterpriseAdmin();

  const handleDownloadCSV = () => {
    if (!learners || learners.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = ["Name", "Email", "Department", "Job Title", "Status", "Enrolled At", "Completed At"];
    const rows = learners.map(l => [
      l.full_name || "",
      l.email,
      l.department || "",
      l.job_title || "",
      l.status,
      new Date(l.enrolled_at).toLocaleDateString(),
      l.completed_at ? new Date(l.completed_at).toLocaleDateString() : ""
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentOrg?.slug || 'enterprise'}-learners-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Report downloaded");
  };

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

  const reports = [
    {
      title: "Learner Roster",
      description: "Complete list of all enrolled learners with status",
      icon: FileSpreadsheet,
      action: handleDownloadCSV,
      actionLabel: "Download CSV",
    },
    {
      title: "Completion Summary",
      description: "Overview of program completion rates and milestones",
      icon: FileText,
      action: () => toast.info("Coming soon"),
      actionLabel: "Generate",
    },
    {
      title: "Monthly Activity",
      description: "Engagement and progress metrics by month",
      icon: Calendar,
      action: () => toast.info("Coming soon"),
      actionLabel: "Generate",
    },
  ];

  return (
    <EnterpriseAdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Download reports and analytics for your organization
          </p>
        </div>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Current Snapshot</CardTitle>
            <CardDescription>As of {new Date().toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{stats.totalLearners}</p>
                <p className="text-sm text-muted-foreground">Total Learners</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.activeLearners}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.completedLearners}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {stats.totalLearners > 0 
                    ? Math.round((stats.completedLearners / stats.totalLearners) * 100) 
                    : 0}%
                </p>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reports.map((report) => (
            <Card key={report.title}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <report.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                  </div>
                </div>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={report.action} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  {report.actionLabel}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </EnterpriseAdminLayout>
  );
}
