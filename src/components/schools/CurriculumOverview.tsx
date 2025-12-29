import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Users,
  Code,
  Rocket,
  Trophy,
  CheckCircle2,
  Clock,
  Target,
  Sparkles,
} from "lucide-react";

const phases = [
  {
    number: 1,
    name: "Discovery",
    weeks: "1-2",
    icon: Search,
    color: "from-blue-500 to-cyan-500",
    theme: "Find Problems Worth Solving",
    description: "Students learn to identify real problems in their world and understand what makes a problem worth solving.",
    skills: ["Creative Thinking", "Critical Reasoning", "AI Fluency"],
    outcomes: [
      "Identify 10+ real-world problems",
      "Validate problem significance",
      "Create Problem Discovery Cards",
    ],
    artifacts: ["Problem cards", "Interview notes", "Market research"],
  },
  {
    number: 2,
    name: "Validation",
    weeks: "3-4",
    icon: Users,
    color: "from-purple-500 to-indigo-500",
    theme: "Talk to Real Customers",
    description: "Students conduct customer research, validate assumptions, and refine their understanding of user needs.",
    skills: ["Communication", "Critical Reasoning", "Entrepreneurial Mindset"],
    outcomes: [
      "Conduct 5+ customer interviews",
      "Create detailed user personas",
      "Define value proposition",
    ],
    artifacts: ["Customer personas", "Interview recordings", "Value prop canvas"],
  },
  {
    number: 3,
    name: "Building",
    weeks: "5-7",
    icon: Code,
    color: "from-emerald-500 to-teal-500",
    theme: "Build Your First Product",
    description: "The core vibe coding phase. Students use AI tools to build functional products without writing traditional code.",
    skills: ["AI Fluency", "Creative Thinking", "Persistence"],
    outcomes: [
      "Build a working MVP",
      "Create an AI-powered landing page",
      "Master prompt engineering",
    ],
    artifacts: ["Working app/website", "Landing page", "Product demo video"],
  },
  {
    number: 4,
    name: "Growth",
    weeks: "8-10",
    icon: Rocket,
    color: "from-orange-500 to-amber-500",
    theme: "Launch & Get Users",
    description: "Students launch their products, acquire real users, and learn the basics of growth and marketing.",
    skills: ["Entrepreneurial Mindset", "Communication", "Financial Literacy"],
    outcomes: [
      "Launch to real users",
      "Get first 10 customers",
      "Create marketing materials",
    ],
    artifacts: ["Live product", "User testimonials", "Marketing plan"],
  },
  {
    number: 5,
    name: "Pitch",
    weeks: "11-12",
    icon: Trophy,
    color: "from-rose-500 to-pink-500",
    theme: "Present to Investors",
    description: "Students prepare investor-ready pitch decks and practice presenting in THE TANK simulation.",
    skills: ["Communication", "Financial Literacy", "Collaboration"],
    outcomes: [
      "Create professional pitch deck",
      "Deliver 3-minute investor pitch",
      "Complete Demo Day presentation",
    ],
    artifacts: ["Pitch deck", "Pitch video", "Business plan"],
  },
];

const weeklyStructure = [
  { day: "Day 1", title: "Micro-Lesson", description: "5-10 min video + concept introduction", icon: "📚" },
  { day: "Day 2", title: "Lab Execution", description: "Hands-on building with AI tools", icon: "🔨" },
  { day: "Day 3", title: "Iteration", description: "Refine and improve based on feedback", icon: "🔄" },
  { day: "Day 4", title: "Deep Dive", description: "Advanced concepts and edge cases", icon: "🎯" },
  { day: "Day 5", title: "Reflection", description: "Document learnings and plan next steps", icon: "✨" },
];

export function CurriculumOverview() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
          <Target className="w-3 h-3 mr-1" />
          12-Week Journey
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          From Idea to Launch in 12 Weeks
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A structured journey through 5 phases, each building essential skills while creating real deliverables.
        </p>
      </div>

      {/* Weekly Structure */}
      <Card className="p-6 mb-12 bg-muted/30">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Weekly Structure (5 Days × 30-45 min)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {weeklyStructure.map((day) => (
            <div key={day.day} className="text-center p-4 bg-background rounded-lg">
              <div className="text-2xl mb-2">{day.icon}</div>
              <div className="font-semibold text-sm">{day.day}</div>
              <div className="text-primary text-sm font-medium">{day.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{day.description}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Phases */}
      <div className="space-y-6">
        {phases.map((phase) => {
          const Icon = phase.icon;
          return (
            <Card key={phase.number} className="overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Phase Header */}
                <div className={`p-6 bg-gradient-to-br ${phase.color} text-white lg:w-64 flex-shrink-0`}>
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="w-8 h-8" />
                    <div>
                      <div className="text-sm opacity-80">Phase {phase.number}</div>
                      <div className="text-xl font-bold">{phase.name}</div>
                    </div>
                  </div>
                  <Badge className="bg-white/20 text-white border-white/30">
                    Weeks {phase.weeks}
                  </Badge>
                  <p className="mt-4 text-sm opacity-90">{phase.theme}</p>
                </div>

                {/* Phase Content */}
                <div className="p-6 flex-1">
                  <p className="text-muted-foreground mb-4">{phase.description}</p>

                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Skills */}
                    <div>
                      <div className="text-xs font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Skills Developed
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {phase.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Outcomes */}
                    <div>
                      <div className="text-xs font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        Measurable Outcomes
                      </div>
                      <ul className="space-y-1">
                        {phase.outcomes.map((outcome, i) => (
                          <li key={i} className="flex items-start gap-1 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Artifacts */}
                    <div>
                      <div className="text-xs font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Deliverables
                      </div>
                      <ul className="space-y-1">
                        {phase.artifacts.map((artifact, i) => (
                          <li key={i} className="text-xs text-muted-foreground">
                            • {artifact}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
