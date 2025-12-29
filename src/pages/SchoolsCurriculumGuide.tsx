import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Download,
  BookOpen,
  Target,
  Award,
  BarChart3,
  FileText,
  Printer,
  GraduationCap,
  CheckCircle2,
  Clock,
  Users,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SkillsFramework } from "@/components/schools/SkillsFramework";
import { CurriculumOverview } from "@/components/schools/CurriculumOverview";
import { StandardsAlignment } from "@/components/schools/StandardsAlignment";

export default function SchoolsCurriculumGuide() {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  const quickStats = [
    { label: "Duration", value: "12 Weeks", icon: Clock },
    { label: "Daily Time", value: "30-45 min", icon: Target },
    { label: "Age Groups", value: "9-16 years", icon: Users },
    { label: "Core Skills", value: "8 Competencies", icon: Sparkles },
  ];

  const assessmentMethods = [
    {
      name: "Artifact Portfolio",
      description: "Students create 15+ tangible deliverables throughout the program, from problem cards to working apps to pitch decks.",
      weight: "40%",
    },
    {
      name: "Skills Progression",
      description: "AI-powered tracking of 8 core competencies with weekly progress updates and personalized insights.",
      weight: "25%",
    },
    {
      name: "THE TANK Performance",
      description: "Pitch practice sessions scored on clarity, confidence, problem-solution fit, and handling Q&A.",
      weight: "20%",
    },
    {
      name: "Reflection & Growth",
      description: "Daily reflections, iteration counts, and demonstrated persistence through challenges.",
      weight: "15%",
    },
  ];

  const schoolReports = [
    { name: "Weekly Progress Summary", description: "Individual and class-wide completion rates, skill gains, and highlights" },
    { name: "Skills Distribution Report", description: "Visualization of class-wide competency development with benchmarks" },
    { name: "At-Risk Student Alerts", description: "Early identification of students needing additional support" },
    { name: "Parent Communication Pack", description: "Ready-to-send updates showcasing student achievements" },
    { name: "Standards Alignment Map", description: "How student progress maps to ISTE, P21, and other standards" },
    { name: "Demo Day Certificates", description: "Personalized completion certificates with skill achievements" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-50 print:hidden">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={() => navigate("/schools")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Schools
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print Guide
            </Button>
            <Button size="sm" onClick={() => navigate("/schools/pricing")}>
              View School Pricing
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-primary/10 via-background to-background print:py-8">
        <div className="max-w-5xl mx-auto">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <BookOpen className="w-3 h-3 mr-1" />
            Curriculum Documentation
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            School Curriculum Guide
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
            Complete documentation of our AI-First Entrepreneurship Bootcamp including 
            skills framework, learning outcomes, standards alignment, and assessment methodology.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="p-4 text-center">
                  <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-16">
        {/* Table of Contents */}
        <Card className="p-6 mb-12 print:break-after-page">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Table of Contents
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <a href="#skills" className="flex items-center gap-2 text-primary hover:underline">
                <CheckCircle2 className="w-4 h-4" />
                1. Core Competencies (8 Skills)
              </a>
              <a href="#curriculum" className="flex items-center gap-2 text-primary hover:underline">
                <CheckCircle2 className="w-4 h-4" />
                2. 12-Week Curriculum Overview
              </a>
              <a href="#standards" className="flex items-center gap-2 text-primary hover:underline">
                <CheckCircle2 className="w-4 h-4" />
                3. Standards Alignment
              </a>
            </div>
            <div className="space-y-2">
              <a href="#assessment" className="flex items-center gap-2 text-primary hover:underline">
                <CheckCircle2 className="w-4 h-4" />
                4. Assessment Methodology
              </a>
              <a href="#reports" className="flex items-center gap-2 text-primary hover:underline">
                <CheckCircle2 className="w-4 h-4" />
                5. School Reports & Analytics
              </a>
              <a href="#faq" className="flex items-center gap-2 text-primary hover:underline">
                <CheckCircle2 className="w-4 h-4" />
                6. FAQ for Educators
              </a>
            </div>
          </div>
        </Card>

        {/* Skills Framework Section */}
        <div id="skills" className="print:break-after-page">
          <SkillsFramework />
        </div>

        {/* Curriculum Overview Section */}
        <div id="curriculum" className="print:break-after-page">
          <CurriculumOverview />
        </div>

        {/* Standards Alignment Section */}
        <div id="standards" className="print:break-after-page">
          <StandardsAlignment />
        </div>

        {/* Assessment Methodology */}
        <section id="assessment" className="py-16 print:break-after-page">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <BarChart3 className="w-3 h-3 mr-1" />
              Assessment
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How We Measure Progress
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Multi-dimensional assessment that captures both tangible outputs and skill development.
            </p>
          </div>

          <div className="space-y-4">
            {assessmentMethods.map((method) => (
              <Card key={method.name} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{method.name}</h3>
                    <p className="text-muted-foreground">{method.description}</p>
                  </div>
                  <Badge className="text-lg px-4 py-2 bg-primary/10 text-primary">
                    {method.weight}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* School Reports */}
        <section id="reports" className="py-16 print:break-after-page">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <FileText className="w-3 h-3 mr-1" />
              Reporting
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Reports for Schools
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive analytics and reports to track progress and communicate with stakeholders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {schoolReports.map((report) => (
              <Card key={report.name} className="p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">{report.name}</h4>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ for Educators */}
        <section id="faq" className="py-16">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <GraduationCap className="w-3 h-3 mr-1" />
              For Educators
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Do teachers need entrepreneurship or coding experience?",
                a: "No. The platform does the teaching. Teachers facilitate discussions, check in on progress, and celebrate wins. We provide a 2-hour training session and ongoing support."
              },
              {
                q: "How much class time does this require?",
                a: "Students work independently for 30-45 minutes daily, 5 days a week. This can be homework, study hall, or a dedicated elective. Teachers typically spend 15-20 minutes weekly reviewing class progress."
              },
              {
                q: "What technology do students need?",
                a: "A laptop or tablet with internet access. Chromebooks work fine. All tools are web-based with no software installation required."
              },
              {
                q: "Can this integrate with existing curriculum?",
                a: "Yes. Many schools integrate with business/economics, technology, or innovation electives. The program also works as a standalone after-school or summer program."
              },
              {
                q: "How is student data protected?",
                a: "We are COPPA and FERPA compliant. Student data is encrypted, never sold, and we minimize personal information collection. Parents can request data deletion."
              },
              {
                q: "What happens after the 12 weeks?",
                a: "Students keep their portfolio and creations. Advanced students can join ongoing cohorts, enter competitions, or continue building with mentor support."
              },
            ].map((faq, i) => (
              <Card key={i} className="p-6">
                <h4 className="font-bold mb-2">{faq.q}</h4>
                <p className="text-muted-foreground">{faq.a}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Card className="p-8 text-center bg-gradient-to-br from-primary/10 via-background to-background print:hidden">
          <Award className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Ready to Partner?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join the first wave of schools preparing students for the AI economy. 
            Limited pilot spots available.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/schools/pricing")}>
              View School Pricing
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.location.href = "mailto:partnerships@nextbillionlab.com"}>
              Contact Us
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
