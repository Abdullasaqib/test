import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Lightbulb,
  Brain,
  MessageSquare,
  Rocket,
  PiggyBank,
  Users,
  Heart,
  Sparkles,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const skills = [
  {
    id: "creative_thinking",
    name: "Creative Thinking",
    icon: Lightbulb,
    color: "from-amber-500 to-orange-500",
    description: "Generating novel ideas, connecting unrelated concepts, and thinking outside conventional boundaries.",
    outcomes: [
      "Generate 20+ unique solutions to a single problem",
      "Combine ideas from different industries",
      "Create original product concepts",
    ],
    assessment: "Measured through idea quantity, originality scores, and cross-domain connections in brainstorming activities.",
  },
  {
    id: "critical_reasoning",
    name: "Critical Reasoning",
    icon: Brain,
    color: "from-purple-500 to-indigo-500",
    description: "Analyzing problems, evaluating evidence, and making logical decisions based on data.",
    outcomes: [
      "Break complex problems into components",
      "Evaluate business model viability",
      "Identify assumptions and test them",
    ],
    assessment: "Measured through problem analysis depth, decision quality, and hypothesis testing in validation exercises.",
  },
  {
    id: "communication",
    name: "Communication & Storytelling",
    icon: MessageSquare,
    color: "from-blue-500 to-cyan-500",
    description: "Expressing ideas clearly, crafting compelling narratives, and persuading others effectively.",
    outcomes: [
      "Deliver a 60-second elevator pitch",
      "Write compelling product descriptions",
      "Present to simulated investors",
    ],
    assessment: "Measured through pitch scores, clarity ratings, and audience engagement in THE TANK sessions.",
  },
  {
    id: "entrepreneurial",
    name: "Entrepreneurial Mindset",
    icon: Rocket,
    color: "from-rose-500 to-pink-500",
    description: "Identifying opportunities, taking calculated risks, and creating value from nothing.",
    outcomes: [
      "Identify 10+ problems worth solving",
      "Validate ideas with real customers",
      "Launch a minimum viable product",
    ],
    assessment: "Measured through opportunity recognition, customer interviews completed, and products launched.",
  },
  {
    id: "financial",
    name: "Financial Literacy",
    icon: PiggyBank,
    color: "from-emerald-500 to-teal-500",
    description: "Understanding revenue, costs, pricing, and basic business economics.",
    outcomes: [
      "Create a simple business model",
      "Calculate unit economics",
      "Set appropriate pricing strategies",
    ],
    assessment: "Measured through business model completeness and financial reasoning in pitch presentations.",
  },
  {
    id: "collaboration",
    name: "Collaboration & Leadership",
    icon: Users,
    color: "from-sky-500 to-blue-500",
    description: "Working effectively in teams, leading projects, and coordinating with others.",
    outcomes: [
      "Lead a team through a project",
      "Delegate tasks appropriately",
      "Resolve conflicts constructively",
    ],
    assessment: "Measured through peer feedback, team project outcomes, and leadership behaviors observed.",
  },
  {
    id: "persistence",
    name: "Persistence & Grit",
    icon: Heart,
    color: "from-red-500 to-rose-500",
    description: "Overcoming setbacks, iterating on feedback, and maintaining motivation through challenges.",
    outcomes: [
      "Iterate on ideas after rejection",
      "Complete the full 12-week journey",
      "Recover from failed experiments",
    ],
    assessment: "Measured through iteration count, completion rates, and response to negative feedback.",
  },
  {
    id: "ai_fluency",
    name: "AI Fluency",
    icon: Sparkles,
    color: "from-violet-500 to-purple-500",
    description: "Using AI tools effectively, crafting prompts, and building with AI assistance.",
    outcomes: [
      "Write effective AI prompts",
      "Build apps using vibe coding",
      "Critically evaluate AI outputs",
    ],
    assessment: "Measured through prompt quality, apps built, and ability to refine AI-generated content.",
  },
];

export function SkillsFramework() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
          <Brain className="w-3 h-3 mr-1" />
          Core Competencies
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          8 Skills That Matter for the Future
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Every mission, every activity, every project builds these measurable competencies. 
          Schools receive detailed progress reports on each skill.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <Card key={skill.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${skill.color} text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{skill.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-xs font-semibold uppercase text-primary mb-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Learning Outcomes
                    </div>
                    <ul className="space-y-1">
                      {skill.outcomes.map((outcome, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-xs font-semibold uppercase text-muted-foreground mb-1">
                      How We Assess It
                    </div>
                    <p className="text-xs text-muted-foreground">{skill.assessment}</p>
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
