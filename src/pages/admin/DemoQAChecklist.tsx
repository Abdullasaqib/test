import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Circle, 
  Copy, 
  ExternalLink, 
  RotateCcw,
  Sparkles,
  Target,
  MessageSquare,
  BarChart3,
  Flag
} from "lucide-react";
import { toast } from "sonner";

interface ChecklistItem {
  id: string;
  label: string;
  path?: string;
}

interface ChecklistSection {
  title: string;
  icon: React.ReactNode;
  items: ChecklistItem[];
}

const CHECKLIST_SECTIONS: ChecklistSection[] = [
  {
    title: "Demo Dashboard",
    icon: <Sparkles className="h-4 w-4" />,
    items: [
      { id: "demo-welcome", label: "Welcome message shows 'Alex Chen'", path: "/demo" },
      { id: "demo-mission", label: "Today's Mission card displays correctly", path: "/demo" },
      { id: "demo-journey", label: "Journey timeline shows Week 7 progress", path: "/demo" },
      { id: "demo-tank-card", label: "THE TANK card shows level and stats", path: "/demo" },
      { id: "demo-credential", label: "Credential progress card is visible", path: "/demo" },
    ],
  },
  {
    title: "Demo Tank",
    icon: <Target className="h-4 w-4" />,
    items: [
      { id: "tank-level", label: "Level badge displays 'Seed Stage'", path: "/demo/tank" },
      { id: "tank-stats", label: "Pitch attempts and XP show correctly", path: "/demo/tank" },
      { id: "tank-cta", label: "Record Pitch CTA is visible", path: "/demo/tank" },
      { id: "tank-blocker", label: "Action blocker appears on interaction", path: "/demo/tank" },
    ],
  },
  {
    title: "Demo Coach",
    icon: <MessageSquare className="h-4 w-4" />,
    items: [
      { id: "coach-greeting", label: "AI Coach greeting message shows", path: "/demo/coach" },
      { id: "coach-quick-actions", label: "Quick action buttons are visible", path: "/demo/coach" },
      { id: "coach-input", label: "Message input is functional", path: "/demo/coach" },
      { id: "coach-blocker", label: "Action blocker on send attempt", path: "/demo/coach" },
    ],
  },
  {
    title: "Demo Skills",
    icon: <BarChart3 className="h-4 w-4" />,
    items: [
      { id: "skills-radar", label: "Radar chart renders with demo data", path: "/demo/skills" },
      { id: "skills-top", label: "Top 3 strengths are highlighted", path: "/demo/skills" },
      { id: "skills-all", label: "All skill categories display scores", path: "/demo/skills" },
    ],
  },
  {
    title: "Demo Banner & Navigation",
    icon: <Flag className="h-4 w-4" />,
    items: [
      { id: "banner-visible", label: "Demo banner is visible at top", path: "/demo" },
      { id: "banner-cta-school", label: "'Start Free School Pilot' button works", path: "/demo" },
      { id: "banner-cta-booking", label: "'Book Demo Call' button opens modal", path: "/demo" },
      { id: "banner-minimize", label: "Banner can be minimized/restored", path: "/demo" },
      { id: "sidebar-nav", label: "Sidebar navigation works between pages", path: "/demo" },
    ],
  },
];

const STORAGE_KEY = "demo-qa-checklist";

export default function DemoQAChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetChecklist = () => {
    setCheckedItems({});
    toast.success("Checklist reset");
  };

  const copyDemoLink = () => {
    const url = `${window.location.origin}/demo`;
    navigator.clipboard.writeText(url);
    toast.success("Demo link copied!");
  };

  const totalItems = CHECKLIST_SECTIONS.reduce((acc, section) => acc + section.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = Math.round((checkedCount / totalItems) * 100);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Demo QA Checklist</h1>
            <p className="text-muted-foreground">
              Verify all demo features before presentations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={copyDemoLink}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Demo Link
            </Button>
            <Button variant="outline" size="sm" onClick={resetChecklist}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button size="sm" asChild>
              <a href="/demo" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Demo
              </a>
            </Button>
          </div>
        </div>

        {/* Progress */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <Badge variant={progress === 100 ? "default" : "secondary"}>
                {checkedCount} / {totalItems} items
              </Badge>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            {progress === 100 && (
              <p className="text-sm text-green-500 mt-2 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                All checks passed! Demo is ready.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Checklist Sections */}
        <div className="grid gap-4 md:grid-cols-2">
          {CHECKLIST_SECTIONS.map((section) => {
            const sectionChecked = section.items.filter((item) => checkedItems[item.id]).length;
            const sectionComplete = sectionChecked === section.items.length;

            return (
              <Card key={section.title}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      {section.icon}
                      {section.title}
                    </CardTitle>
                    <Badge variant={sectionComplete ? "default" : "outline"} className="text-xs">
                      {sectionChecked}/{section.items.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 group"
                    >
                      <Checkbox
                        id={item.id}
                        checked={checkedItems[item.id] || false}
                        onCheckedChange={() => toggleItem(item.id)}
                      />
                      <div className="flex-1 min-w-0">
                        <label
                          htmlFor={item.id}
                          className={`text-sm cursor-pointer ${
                            checkedItems[item.id] ? "text-muted-foreground line-through" : ""
                          }`}
                        >
                          {item.label}
                        </label>
                      </div>
                      {item.path && (
                        <a
                          href={item.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ExternalLink className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                        </a>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Links</CardTitle>
            <CardDescription>Jump to specific demo pages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Demo Dashboard", path: "/demo" },
                { label: "Demo Tank", path: "/demo/tank" },
                { label: "Demo Coach", path: "/demo/coach" },
                { label: "Demo Skills", path: "/demo/skills" },
                { label: "Schools Page", path: "/schools" },
                { label: "Academy", path: "/academy" },
              ].map((link) => (
                <Button key={link.path} variant="outline" size="sm" asChild>
                  <a href={link.path} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
