import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { CaseStudy } from "@/hooks/useCaseStudies";

interface ShowcaseProjectModalProps {
  project: CaseStudy | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function getProjectEmoji(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes("pet") || lower.includes("dog") || lower.includes("cat")) return "🐕";
  if (lower.includes("homework") || lower.includes("study") || lower.includes("learn")) return "📚";
  if (lower.includes("recipe") || lower.includes("food") || lower.includes("cook")) return "🍳";
  if (lower.includes("eco") || lower.includes("green") || lower.includes("sustainable")) return "🌱";
  if (lower.includes("pitch") || lower.includes("present") || lower.includes("speak")) return "🎤";
  if (lower.includes("game") || lower.includes("play")) return "🎮";
  if (lower.includes("music") || lower.includes("song")) return "🎵";
  if (lower.includes("art") || lower.includes("draw") || lower.includes("paint")) return "🎨";
  return "🚀";
}

export function ShowcaseProjectModal({ project, open, onOpenChange }: ShowcaseProjectModalProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const navigate = useNavigate();

  if (!project) return null;

  const emoji = getProjectEmoji(project.title);

  // Generate a simple placeholder landing page
  const placeholderHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${project.title}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: system-ui, -apple-system, sans-serif; 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .container {
          background: white;
          border-radius: 24px;
          padding: 48px;
          max-width: 500px;
          text-align: center;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .emoji { font-size: 80px; margin-bottom: 24px; }
        h1 { 
          font-size: 32px; 
          color: #1a1a2e; 
          margin-bottom: 16px;
          font-weight: 700;
        }
        .creator {
          color: #6b7280;
          font-size: 16px;
          margin-bottom: 24px;
        }
        .problem {
          background: #fef3c7;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 16px;
          color: #92400e;
          font-size: 14px;
        }
        .solution {
          background: #d1fae5;
          border-radius: 12px;
          padding: 16px;
          color: #065f46;
          font-size: 14px;
          margin-bottom: 24px;
        }
        .label {
          font-weight: 600;
          margin-bottom: 8px;
          display: block;
        }
        .cta {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
        }
        .tools {
          margin-top: 24px;
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .tool {
          background: #f3f4f6;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          color: #4b5563;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="emoji">${emoji}</div>
        <h1>${project.title}</h1>
        <p class="creator">Built by ${project.student_name}, age ${project.student_age || "?"}</p>
        ${project.problem_story ? `
          <div class="problem">
            <span class="label">😤 The Problem</span>
            ${project.problem_story}
          </div>
        ` : ''}
        ${project.outcome_story ? `
          <div class="solution">
            <span class="label">✨ The Result</span>
            ${project.outcome_story}
          </div>
        ` : ''}
        <button class="cta">Try ${project.title}!</button>
        ${project.tools_used && project.tools_used.length > 0 ? `
          <div class="tools">
            ${project.tools_used.map(tool => `<span class="tool">${tool}</span>`).join('')}
          </div>
        ` : ''}
      </div>
    </body>
    </html>
  `;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-2 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{emoji}</span>
              <div>
                <DialogTitle className="text-lg">{project.title}</DialogTitle>
                <p className="text-sm text-muted-foreground">
                  Built by {project.student_name}, age {project.student_age || "?"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === "desktop" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("desktop")}
                  className="h-8 px-3"
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "mobile" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("mobile")}
                  className="h-8 px-3"
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Preview Area */}
        <div className={`bg-muted/50 flex justify-center p-4 ${viewMode === "mobile" ? "bg-muted" : ""}`}>
          <div
            className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
              viewMode === "mobile" 
                ? "w-[375px] h-[600px]" 
                : "w-full h-[500px]"
            }`}
          >
            <iframe
              srcDoc={placeholderHtml}
              title={`${project.title} Preview`}
              className="w-full h-full border-0"
              sandbox="allow-scripts"
            />
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 border-t bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">
                Want to build something like this? 🚀
              </p>
              <p className="text-sm text-muted-foreground">
                You could create YOUR own app in just a few weeks!
              </p>
            </div>
            <Button 
              onClick={() => {
                onOpenChange(false);
                navigate("/dashboard/certification");
              }}
              className="gap-2"
            >
              <Rocket className="h-4 w-4" />
              Start Building!
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
