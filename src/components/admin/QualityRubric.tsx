import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const RUBRIC_DATA = [
  {
    parameter: "Skill Building Value",
    weight: "20%",
    description: "Does the mission build real entrepreneurship/AI skills?",
    excellent: "Teaches concrete, measurable skill with clear application",
    good: "Builds relevant skill but could be more specific",
    poor: "Filler content, introduces yourself, generic activities"
  },
  {
    parameter: "Learning Outcome Clarity",
    weight: "15%",
    description: "Does the mission have a clear, measurable learning goal?",
    excellent: "Student can articulate what they learned and demonstrate it",
    good: "Learning goal is implied but not explicit",
    poor: "No clear outcome, vague objectives"
  },
  {
    parameter: "AI Integration Quality",
    weight: "15%",
    description: "Does it use AI meaningfully, not as a gimmick?",
    excellent: "AI is essential to the task with specific prompts provided",
    good: "AI is used but prompts are generic",
    poor: "AI mentioned but not integrated, or just 'ask AI'"
  },
  {
    parameter: "Privacy & Safety",
    weight: "10%",
    description: "Does it avoid asking for personal info unnecessarily?",
    excellent: "No personal data requested, safe for children",
    good: "Minimal personal context needed for activity",
    poor: "Asks for name, age, location, or other PII"
  },
  {
    parameter: "Artifact Quality",
    weight: "10%",
    description: "Does the output build toward a real deliverable?",
    excellent: "Produces a structured artifact with template/format",
    good: "Creates output but format is unstructured",
    poor: "'Write down' or 'draw' without guidelines"
  },
  {
    parameter: "Time Efficiency",
    weight: "10%",
    description: "Is the estimated time worth the learning outcome?",
    excellent: "High learning density, every minute counts",
    good: "Reasonable time-to-value ratio",
    poor: "Too long for outcome, or too short to be meaningful"
  },
  {
    parameter: "Age Appropriateness",
    weight: "10%",
    description: "Is content complexity right for the track?",
    excellent: "Perfect match for age group, appropriate tools",
    good: "Mostly appropriate with minor adjustments needed",
    poor: "Too complex or too simple for the age group"
  },
  {
    parameter: "Progression Logic",
    weight: "10%",
    description: "Does it build on previous missions logically?",
    excellent: "Clear connection to prior learning, scaffolded",
    good: "Standalone but fits the week theme",
    poor: "Random placement, doesn't connect to journey"
  }
];

const AUTOMATED_FLAGS = [
  {
    category: "Privacy Concerns",
    severity: "critical",
    keywords: ["your name", "your age", "where you live", "your address", "your phone"],
    action: "Remove or replace with role-play scenario"
  },
  {
    category: "Filler Content",
    severity: "warning",
    keywords: ["introduce yourself", "share about yourself", "tell us about you"],
    action: "Replace with concrete skill-building activity"
  },
  {
    category: "Weak Artifacts",
    severity: "warning",
    keywords: ["write down", "draw", "think about", "reflect on"],
    action: "Add structured template or card format"
  },
  {
    category: "Generic AI Use",
    severity: "info",
    keywords: ["ask ai", "use ai to", "try ai"],
    action: "Provide specific prompt template for students"
  }
];

export function QualityRubric() {
  return (
    <div className="space-y-6">
      {/* Scoring Rubric */}
      <Card>
        <CardHeader>
          <CardTitle>Quality Scoring Rubric</CardTitle>
          <p className="text-sm text-muted-foreground">
            Each mission is scored on 8 parameters. Scores are weighted to calculate the overall quality score.
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parameter</TableHead>
                <TableHead className="w-16">Weight</TableHead>
                <TableHead className="text-green-500">
                  <CheckCircle className="w-4 h-4 inline mr-1" />
                  80-100
                </TableHead>
                <TableHead className="text-yellow-500">
                  <AlertTriangle className="w-4 h-4 inline mr-1" />
                  60-79
                </TableHead>
                <TableHead className="text-red-500">
                  <XCircle className="w-4 h-4 inline mr-1" />
                  0-59
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RUBRIC_DATA.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div>
                      <span className="font-medium">{row.parameter}</span>
                      <p className="text-xs text-muted-foreground">{row.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{row.weight}</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-green-600">{row.excellent}</TableCell>
                  <TableCell className="text-xs text-yellow-600">{row.good}</TableCell>
                  <TableCell className="text-xs text-red-600">{row.poor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Automated Flags */}
      <Card>
        <CardHeader>
          <CardTitle>Automated Quality Flags</CardTitle>
          <p className="text-sm text-muted-foreground">
            The system automatically scans mission content for these patterns and flags issues.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {AUTOMATED_FLAGS.map((flag, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg border ${
                  flag.severity === "critical"
                    ? "border-red-500/30 bg-red-500/5"
                    : flag.severity === "warning"
                    ? "border-yellow-500/30 bg-yellow-500/5"
                    : "border-blue-500/30 bg-blue-500/5"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {flag.severity === "critical" && (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  {flag.severity === "warning" && (
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  )}
                  {flag.severity === "info" && (
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                  )}
                  <span className="font-medium">{flag.category}</span>
                  <Badge
                    variant="outline"
                    className={
                      flag.severity === "critical"
                        ? "border-red-500 text-red-500"
                        : flag.severity === "warning"
                        ? "border-yellow-500 text-yellow-500"
                        : "border-blue-500 text-blue-500"
                    }
                  >
                    {flag.severity}
                  </Badge>
                </div>
                <div className="text-sm space-y-1">
                  <p className="text-muted-foreground">
                    <span className="font-medium">Keywords:</span>{" "}
                    {flag.keywords.map((kw, j) => (
                      <code key={j} className="mx-1 px-1 py-0.5 bg-muted rounded text-xs">
                        {kw}
                      </code>
                    ))}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium">Recommended action:</span> {flag.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle>Mission Quality Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-green-500 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Do's
              </h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Provide specific AI prompts students can use</li>
                <li>• Use structured templates (Problem Card, Customer Persona Card)</li>
                <li>• Include clear step-by-step instructions</li>
                <li>• Connect to real-world entrepreneurship scenarios</li>
                <li>• Match complexity to age track (junior/teen/advanced)</li>
                <li>• Build on previous week's learning</li>
                <li>• Produce tangible artifacts for portfolio</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-red-500 flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                Don'ts
              </h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Ask for personal information (name, age, location)</li>
                <li>• Use generic "introduce yourself" activities</li>
                <li>• Say "write down" without a template</li>
                <li>• Use vague instructions like "think about"</li>
                <li>• Include filler content that doesn't build skills</li>
                <li>• Reference AI without specific prompts</li>
                <li>• Create disconnected, random activities</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}