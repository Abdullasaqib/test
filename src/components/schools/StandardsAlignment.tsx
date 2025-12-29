import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  BookOpen,
  Globe,
  Brain,
  Heart,
  Layers,
} from "lucide-react";

const standards = [
  {
    name: "ISTE Standards for Students",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
    description: "International Society for Technology in Education standards for digital age learning.",
    alignments: [
      { code: "1.1", standard: "Empowered Learner", how: "Students use AI tools to set and achieve personal learning goals" },
      { code: "1.3", standard: "Knowledge Constructor", how: "Students curate information from AI and human sources to build products" },
      { code: "1.4", standard: "Innovative Designer", how: "Students use design thinking process throughout the 12-week journey" },
      { code: "1.5", standard: "Computational Thinker", how: "Students break down problems and build solutions using vibe coding" },
      { code: "1.6", standard: "Creative Communicator", how: "Students create pitch decks, landing pages, and present in THE TANK" },
      { code: "1.7", standard: "Global Collaborator", how: "Students work in teams and consider global market opportunities" },
    ],
  },
  {
    name: "P21 Framework (21st Century Skills)",
    icon: Layers,
    color: "from-purple-500 to-indigo-500",
    description: "Partnership for 21st Century Learning framework for career and life skills.",
    alignments: [
      { code: "4Cs", standard: "Critical Thinking", how: "Problem validation, market analysis, business model evaluation" },
      { code: "4Cs", standard: "Communication", how: "Customer interviews, pitch presentations, storytelling" },
      { code: "4Cs", standard: "Collaboration", how: "Team projects, peer feedback, mentor interactions" },
      { code: "4Cs", standard: "Creativity", how: "Ideation exercises, product design, innovation challenges" },
      { code: "Life", standard: "Initiative & Self-Direction", how: "Self-paced missions with personal milestones" },
      { code: "Career", standard: "Productivity & Accountability", how: "Weekly deliverables, project completion tracking" },
    ],
  },
  {
    name: "SEL Competencies (CASEL)",
    icon: Heart,
    color: "from-rose-500 to-pink-500",
    description: "Collaborative for Academic, Social, and Emotional Learning core competencies.",
    alignments: [
      { code: "SEL-1", standard: "Self-Awareness", how: "Founder DNA analysis reveals personal strengths and growth areas" },
      { code: "SEL-2", standard: "Self-Management", how: "12-week journey requires planning, goal-setting, and persistence" },
      { code: "SEL-3", standard: "Social Awareness", how: "Customer research requires empathy and understanding diverse perspectives" },
      { code: "SEL-4", standard: "Relationship Skills", how: "Team collaboration, mentor sessions, peer feedback exchanges" },
      { code: "SEL-5", standard: "Responsible Decision-Making", how: "Business ethics, privacy considerations, impact assessment" },
    ],
  },
  {
    name: "Common Core Connections",
    icon: BookOpen,
    color: "from-emerald-500 to-teal-500",
    description: "Connections to Common Core State Standards in ELA and Math.",
    alignments: [
      { code: "CCSS.ELA", standard: "Writing (W.4-8.1)", how: "Persuasive writing in pitch decks and marketing materials" },
      { code: "CCSS.ELA", standard: "Speaking & Listening (SL.4-8.4)", how: "Pitch presentations with clear evidence and reasoning" },
      { code: "CCSS.ELA", standard: "Research (W.4-8.7)", how: "Market research using multiple sources including AI" },
      { code: "CCSS.Math", standard: "Ratios & Proportions", how: "Unit economics, pricing calculations, conversion rates" },
      { code: "CCSS.Math", standard: "Statistics & Probability", how: "Customer survey analysis, market sizing estimates" },
    ],
  },
];

const trackDifferentiation = [
  {
    track: "Junior",
    ages: "9-11",
    color: "bg-emerald-500",
    characteristics: [
      "Simpler vocabulary and shorter sessions (20-30 min)",
      "Visual-first learning with drawings and diagrams",
      "Glide for app building (most accessible)",
      "Playful tone with gamification elements",
      "Focus on creativity and imagination",
    ],
  },
  {
    track: "Teen",
    ages: "12-14",
    color: "bg-blue-500",
    characteristics: [
      "Balanced complexity (30-40 min sessions)",
      "Mix of visual and written deliverables",
      "Base44/Bubble for app building",
      "Encouraging but more professional tone",
      "Introduction to business concepts",
    ],
  },
  {
    track: "Advanced",
    ages: "15-16",
    color: "bg-purple-500",
    characteristics: [
      "Professional language (40-50 min sessions)",
      "Investor-grade deliverables expected",
      "Lovable/Cursor for advanced building",
      "Industry-standard terminology",
      "Complex business model analysis",
    ],
  },
];

export function StandardsAlignment() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
          <BookOpen className="w-3 h-3 mr-1" />
          Standards Alignment
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Aligned with Recognized Standards
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our curriculum maps to internationally recognized educational frameworks, 
          making it easy to integrate with existing school standards.
        </p>
      </div>

      {/* Standards Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-16">
        {standards.map((standard) => {
          const Icon = standard.icon;
          return (
            <Card key={standard.name} className="overflow-hidden">
              <div className={`p-4 bg-gradient-to-r ${standard.color} text-white`}>
                <div className="flex items-center gap-3">
                  <Icon className="w-6 h-6" />
                  <div>
                    <h3 className="font-bold">{standard.name}</h3>
                    <p className="text-sm opacity-90">{standard.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {standard.alignments.map((alignment, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <Badge variant="outline" className="flex-shrink-0 text-xs">
                        {alignment.code}
                      </Badge>
                      <div>
                        <span className="font-medium">{alignment.standard}:</span>
                        <span className="text-muted-foreground ml-1">{alignment.how}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Age-Track Differentiation */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            Age-Appropriate Differentiation
          </h3>
          <p className="text-muted-foreground">
            Same competencies, different complexity levels based on developmental stage.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {trackDifferentiation.map((track) => (
            <Card key={track.track} className="overflow-hidden">
              <div className={`${track.color} text-white p-4 text-center`}>
                <div className="text-2xl font-bold">{track.track}</div>
                <div className="text-sm opacity-90">Ages {track.ages}</div>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {track.characteristics.map((char, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
