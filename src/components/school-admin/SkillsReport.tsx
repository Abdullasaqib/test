import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SKILL_LABELS } from "@/hooks/useSkills";
import { StudentSkillData, SchoolSkillAggregate } from "@/hooks/useSchoolSkills";

interface SkillsReportProps {
  schoolName: string;
  students: StudentSkillData[];
  aggregates: SchoolSkillAggregate[];
  totalStudents: number;
}

export function SkillsReport({ schoolName, students, aggregates, totalStudents }: SkillsReportProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCSV = () => {
    setIsGenerating(true);
    try {
      // Headers
      const skillHeaders = Object.values(SKILL_LABELS).map(s => s.name);
      const headers = ["Student Name", "Program", "Total XP", "Missions Completed", ...skillHeaders];
      
      // Rows
      const rows = students.map(student => {
        const skillScores = Object.keys(SKILL_LABELS).map(key => student.skills[key] || 0);
        return [
          student.student_name,
          student.program,
          student.total_points,
          student.missions_completed,
          ...skillScores
        ];
      });

      // Create CSV content
      const csvContent = [
        headers.join(","),
        ...rows.map(row => row.join(","))
      ].join("\n");

      // Download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${schoolName.replace(/\s+/g, '_')}_skills_report_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();

      toast.success("CSV report downloaded");
    } catch (error) {
      toast.error("Failed to generate report");
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePDFReport = () => {
    setIsGenerating(true);
    try {
      // Create printable HTML content
      const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Skills Report - ${schoolName}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
            h1 { color: #1a1a1a; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; }
            h2 { color: #374151; margin-top: 30px; }
            .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
            .date { color: #6b7280; font-size: 14px; }
            .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 20px 0; }
            .stat-card { background: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; }
            .stat-value { font-size: 28px; font-weight: bold; color: #3b82f6; }
            .stat-label { color: #6b7280; font-size: 12px; margin-top: 4px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
            th { background: #f9fafb; font-weight: 600; color: #374151; }
            .skill-bar { background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden; }
            .skill-fill { background: #3b82f6; height: 100%; }
            .khda-section { background: #f0fdf4; padding: 20px; border-radius: 8px; margin-top: 30px; }
            .khda-title { color: #166534; font-weight: 600; margin-bottom: 10px; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; text-align: center; }
            @media print { body { padding: 20px; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎓 Skills Development Report</h1>
            <div class="date">Generated: ${new Date().toLocaleDateString()}</div>
          </div>
          
          <p><strong>School:</strong> ${schoolName}</p>
          
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value">${totalStudents}</div>
              <div class="stat-label">Total Students</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${students.reduce((sum, s) => sum + s.total_points, 0)}</div>
              <div class="stat-label">Total XP Earned</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${students.length > 0 ? Math.round(students.reduce((sum, s) => sum + s.total_points, 0) / students.length) : 0}</div>
              <div class="stat-label">Average XP per Student</div>
            </div>
          </div>

          <h2>School-Wide Skills Performance</h2>
          <table>
            <thead>
              <tr>
                <th>Skill</th>
                <th>Average Score</th>
                <th>Students Active</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              ${aggregates.map(skill => `
                <tr>
                  <td>${skill.name}</td>
                  <td>${skill.average_score} XP</td>
                  <td>${skill.students_with_skill} / ${totalStudents}</td>
                  <td>
                    <div class="skill-bar">
                      <div class="skill-fill" style="width: ${Math.min(skill.average_score, 100)}%"></div>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="khda-section">
            <div class="khda-title">📋 KHDA Well-being Framework Alignment</div>
            <p>This report maps student skills to the KHDA Well-being Framework competencies:</p>
            <ul>
              <li><strong>Critical Thinking:</strong> Problem Analysis skills</li>
              <li><strong>Digital Literacy:</strong> AI Collaboration & Digital Literacy skills</li>
              <li><strong>Social Skills:</strong> Customer Research & Communication skills</li>
              <li><strong>Self-Management:</strong> Resilience & Self-Management skills</li>
              <li><strong>Personal Development:</strong> Entrepreneurship skills</li>
            </ul>
          </div>

          <h2>Individual Student Progress</h2>
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Program</th>
                <th>Total XP</th>
                <th>Missions</th>
                <th>Top Skill</th>
              </tr>
            </thead>
            <tbody>
              ${students.map(student => {
                const topSkill = Object.entries(student.skills).sort((a, b) => b[1] - a[1])[0];
                const topSkillName = topSkill ? SKILL_LABELS[topSkill[0]]?.name || topSkill[0] : 'N/A';
                return `
                  <tr>
                    <td>${student.student_name}</td>
                    <td>${student.program}</td>
                    <td>${student.total_points}</td>
                    <td>${student.missions_completed}</td>
                    <td>${topSkillName}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>

          <div class="footer">
            <p>Generated by Next Billion Lab · ${new Date().toLocaleDateString()}</p>
            <p>For questions, contact support@nextbillionlab.com</p>
          </div>
        </body>
        </html>
      `;

      // Open print dialog
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
      }

      toast.success("Report generated - use Print to PDF to save");
    } catch (error) {
      toast.error("Failed to generate report");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Export Reports
        </CardTitle>
        <CardDescription>
          Generate KHDA-compliant skills reports for accreditation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          onClick={generateCSV} 
          variant="outline" 
          className="w-full justify-start gap-2"
          disabled={isGenerating || students.length === 0}
        >
          {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          Download CSV (Raw Data)
        </Button>
        <Button 
          onClick={generatePDFReport} 
          variant="outline" 
          className="w-full justify-start gap-2"
          disabled={isGenerating || students.length === 0}
        >
          {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
          Generate PDF Report
        </Button>
        <p className="text-xs text-muted-foreground">
          Reports include KHDA framework mapping and individual student progress.
        </p>
      </CardContent>
    </Card>
  );
}
