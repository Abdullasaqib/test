import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Printer, BookOpen, Sparkles } from "lucide-react";
import { LessonSummary, getSummaryByOrder, getAllSummaries } from "@/data/lessonSummaries";

interface LessonSummaryCardProps {
  lessonOrder: number;
  showActions?: boolean;
}

export function LessonSummaryCard({ lessonOrder, showActions = true }: LessonSummaryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const summary = getSummaryByOrder(lessonOrder);

  if (!summary) return null;

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = generatePrintHTML(summary);
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  return (
    <Card ref={cardRef} className="border-border/50 bg-card/50 overflow-hidden">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <Badge variant="outline" className="mb-1">Lesson {summary.lessonNumber}</Badge>
              <h3 className="font-semibold">{summary.title}</h3>
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">KEY TAKEAWAYS</h4>
          <ul className="space-y-1">
            {summary.keyTakeaways.map((takeaway, i) => (
              <li key={i} className="text-sm flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Template Box */}
        <div className="mb-4 p-3 rounded-lg bg-muted/50 border border-border/50">
          <h4 className="text-sm font-medium mb-2">{summary.template.title}</h4>
          <div className="font-mono text-xs space-y-0.5">
            {summary.template.content.map((line, i) => (
              <div key={i} className={line === "" ? "h-2" : ""}>{line}</div>
            ))}
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">QUICK PROMPTS</h4>
          <div className="space-y-2">
            {summary.quickPrompts.map((prompt, i) => (
              <div key={i} className="text-sm">
                <span className="text-primary font-medium">{i + 1}. {prompt.label}:</span>
                <div className="mt-0.5 pl-4 text-muted-foreground font-mono text-xs">
                  "{prompt.prompt}"
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Unlocked */}
        <div className="flex flex-wrap gap-2">
          {summary.skillsUnlocked.map((skill, i) => (
            <Badge key={i} className="bg-primary/10 text-primary border-primary/20">
              <Sparkles className="h-3 w-3 mr-1" />
              {skill}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        {showActions && (
          <div className="mt-4 pt-4 border-t border-border/50 flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDownloadPDF} className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Component to download all summary cards as one PDF
interface AllSummaryCardsDownloadProps {
  onDownload?: () => void;
}

export function AllSummaryCardsDownload({ onDownload }: AllSummaryCardsDownloadProps) {
  const handleDownloadAll = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const allSummaries = getAllSummaries();
    const htmlContent = generateAllPrintHTML(allSummaries);
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
      onDownload?.();
    };
  };

  return (
    <Button variant="outline" onClick={handleDownloadAll} className="gap-2">
      <Printer className="h-4 w-4" />
      Download All Summary Cards
    </Button>
  );
}

// Generate print HTML for a single summary
function generatePrintHTML(summary: LessonSummary): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Lesson ${summary.lessonNumber}: ${summary.title} - NEXT_ Summary Card</title>
      <style>
        ${getPrintStyles()}
      </style>
    </head>
    <body>
      ${generateSummaryCardHTML(summary)}
    </body>
    </html>
  `;
}

// Generate print HTML for all summaries
function generateAllPrintHTML(summaries: LessonSummary[]): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>AI Foundations Certificate - All Summary Cards - NEXT_</title>
      <style>
        ${getPrintStyles()}
        .summary-card { page-break-after: always; }
        .summary-card:last-child { page-break-after: avoid; }
      </style>
    </head>
    <body>
      ${summaries.map(s => generateSummaryCardHTML(s)).join('')}
    </body>
    </html>
  `;
}

// Generate HTML for a single summary card
function generateSummaryCardHTML(summary: LessonSummary): string {
  return `
    <div class="summary-card">
      <div class="header">
        <div class="logo">NEXT_</div>
        <div class="lesson-badge">LESSON ${summary.lessonNumber}</div>
      </div>
      
      <h1 class="title">${summary.title}</h1>
      
      <div class="section">
        <h2>KEY TAKEAWAYS</h2>
        <ul>
          ${summary.keyTakeaways.map(t => `<li>✓ ${t}</li>`).join('')}
        </ul>
      </div>
      
      <div class="template-box">
        <h3>${summary.template.title}</h3>
        <div class="template-content">
          ${summary.template.content.map(line => `<div>${line || '&nbsp;'}</div>`).join('')}
        </div>
      </div>
      
      <div class="section">
        <h2>QUICK PROMPTS</h2>
        ${summary.quickPrompts.map((p, i) => `
          <div class="prompt">
            <strong>${i + 1}. ${p.label}:</strong>
            <div class="prompt-text">"${p.prompt}"</div>
          </div>
        `).join('')}
      </div>
      
      <div class="skills">
        <span class="skills-label">Skills Unlocked:</span>
        ${summary.skillsUnlocked.map(s => `<span class="skill-badge">✨ ${s}</span>`).join('')}
      </div>
      
      <div class="footer">
        <div>AI Foundations Certificate • NEXT_ CERTIFIED</div>
        <div>nextbillionlab.com</div>
      </div>
    </div>
  `;
}

// Print-optimized styles
function getPrintStyles(): string {
  return `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1a1a2e;
      background: #fff;
      padding: 40px;
    }
    .summary-card {
      max-width: 600px;
      margin: 0 auto;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 2px solid #e5e5e5;
    }
    .logo {
      font-size: 24px;
      font-weight: 800;
      color: #3b82f6;
    }
    .lesson-badge {
      background: #3b82f6;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }
    .title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 24px;
      color: #1a1a2e;
    }
    .section {
      margin-bottom: 20px;
    }
    .section h2 {
      font-size: 12px;
      font-weight: 600;
      color: #666;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .section ul {
      list-style: none;
    }
    .section li {
      padding: 4px 0;
      font-size: 14px;
      line-height: 1.5;
    }
    .template-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 20px;
    }
    .template-box h3 {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    .template-content {
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 11px;
      line-height: 1.6;
      color: #475569;
    }
    .prompt {
      margin-bottom: 12px;
      font-size: 14px;
    }
    .prompt-text {
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 11px;
      color: #475569;
      padding-left: 16px;
      margin-top: 4px;
    }
    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid #e5e5e5;
    }
    .skills-label {
      font-size: 12px;
      color: #666;
      font-weight: 500;
    }
    .skill-badge {
      background: #dbeafe;
      color: #1d4ed8;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 500;
    }
    .footer {
      margin-top: 32px;
      padding-top: 16px;
      border-top: 2px solid #e5e5e5;
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: #666;
    }
    @media print {
      body { padding: 20px; }
      .summary-card { max-width: 100%; }
    }
  `;
}
