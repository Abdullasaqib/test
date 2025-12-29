import { useSchoolAdmin } from "@/hooks/useSchoolAdmin";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Download, Building2, Users, Award } from "lucide-react";

export default function SchoolReports() {
  const { schoolAdmin, students, isLoading } = useSchoolAdmin();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  const reportTypes = [
    {
      id: "school-summary",
      title: "School Summary Report",
      description: "Overview of all students, programs, and aggregate skill progress",
      icon: Building2,
      format: "PDF",
    },
    {
      id: "student-progress",
      title: "Individual Student Reports",
      description: "Detailed skill breakdown and progress for each student",
      icon: Users,
      format: "PDF/CSV",
    },
    {
      id: "khda-compliance",
      title: "KHDA Compliance Report",
      description: "Skills mapped to KHDA Well-being Framework standards",
      icon: Award,
      format: "PDF",
    },
    {
      id: "ib-mapping",
      title: "IB Learner Profile Mapping",
      description: "Competencies aligned with IB Learner Profile attributes",
      icon: Award,
      format: "PDF",
    },
    {
      id: "attendance",
      title: "Engagement Report",
      description: "Mission completion rates, login frequency, time spent",
      icon: FileText,
      format: "CSV",
    },
    {
      id: "artifacts",
      title: "Student Artifacts Gallery",
      description: "Collection of landing pages, pitch decks, and projects created",
      icon: FileText,
      format: "ZIP",
    },
  ];

  const handleGenerateReport = (reportId: string) => {
    // TODO: Implement report generation
    console.log("Generating report:", reportId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground">
          Generate reports for accreditation, parents, and internal tracking
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{students?.length || 0}</div>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">--</div>
            <p className="text-sm text-muted-foreground">Avg. Mission Completion</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">--</div>
            <p className="text-sm text-muted-foreground">Artifacts Created</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Types */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reportTypes.map((report) => (
          <Card key={report.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="p-2 bg-primary/10 rounded-lg w-fit">
                  <report.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs bg-muted px-2 py-1 rounded">
                  {report.format}
                </span>
              </div>
              <CardTitle className="text-base">{report.title}</CardTitle>
              <CardDescription className="text-sm">
                {report.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleGenerateReport(report.id)}
              >
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* KHDA/IB Info */}
      <Card>
        <CardHeader>
          <CardTitle>Accreditation Compliance</CardTitle>
          <CardDescription>
            Our skills framework is designed to align with major accreditation standards
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">KHDA Well-being Framework</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Our 8 core skills directly map to KHDA's Well-being Framework categories,
              helping schools demonstrate measurable student development in:
            </p>
            <div className="flex flex-wrap gap-2">
              {["Thinking Skills", "Social Skills", "Self-Management", "Communication", "Digital Literacy"].map((tag) => (
                <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">IB Learner Profile</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Program activities develop IB Learner Profile attributes through
              real-world entrepreneurship challenges:
            </p>
            <div className="flex flex-wrap gap-2">
              {["Inquirers", "Thinkers", "Communicators", "Risk-takers", "Reflective"].map((tag) => (
                <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
