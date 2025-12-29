import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export const CurriculumPreview = () => {
  const phases = [
    {
      title: "Discovery",
      description: "AI-assisted problem hunting & ideation",
      weeks: [
        {
          number: 1,
          title: "Welcome to AI Building",
          duration: "Week 1",
          highlight: "🤖 Meet your AI co-founder"
        },
        {
          number: 2,
          title: "Problem Hunters",
          duration: "Week 2",
          highlight: "🔍 Find problems worth solving"
        }
      ]
    },
    {
      title: "Validation",
      description: "Customer research & market analysis with AI",
      weeks: [
        {
          number: 3,
          title: "AI Customer Discovery",
          duration: "Week 3",
          highlight: "👥 AI-powered personas & interviews"
        },
        {
          number: 4,
          title: "AI Market Research",
          duration: "Week 4",
          highlight: "📊 Competitor analysis & validation"
        }
      ]
    },
    {
      title: "Building",
      description: "Vibe Coding mastery — describe it, AI builds it",
      weeks: [
        {
          number: 5,
          title: "MVP Builder",
          duration: "Week 5",
          highlight: "🏗️ VIBE CODING",
          isVibeCoding: true
        },
        {
          number: 6,
          title: "Launch Pad",
          duration: "Week 6",
          highlight: "🌐 VIBE CODING",
          isVibeCoding: true
        },
        {
          number: 7,
          title: "Vibe Coder Pro",
          duration: "Week 7",
          highlight: "✨ VIBE CODING",
          isVibeCoding: true
        }
      ]
    },
    {
      title: "Growth",
      description: "Launch, marketing & scaling with AI tools",
      weeks: [
        {
          number: 8,
          title: "Test Lab",
          duration: "Week 8",
          highlight: "🧪 User testing & iteration"
        },
        {
          number: 9,
          title: "Growth Hacker",
          duration: "Week 9",
          highlight: "📈 AI marketing strategies"
        },
        {
          number: 10,
          title: "Launch Day!",
          duration: "Week 10",
          highlight: "🚀 Ship it to the world"
        }
      ]
    },
    {
      title: "Pitch",
      description: "Demo Day preparation & investor presentations",
      weeks: [
        {
          number: 11,
          title: "Pitch Perfect",
          duration: "Week 11",
          highlight: "🎤 AI pitch deck builder"
        },
        {
          number: 12,
          title: "Demo Day",
          duration: "Week 12",
          highlight: "🏆 Present to investors"
        }
      ]
    }
  ];

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-5xl font-bold text-center mb-4 tracking-tight">
          12-WEEK <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">TRANSFORMATION</span>
        </h2>
        <p className="text-center text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
          A structured journey from idea to launch. Problem → Validation → Prototype → Growth → Pitch.
        </p>

        <div className="space-y-12">
          {phases.map((phase, phaseIndex) => (
            <div key={phase.title}>
              <div className="flex items-center gap-4 mb-2">
                <Badge className="text-lg px-4 py-2">Phase {phaseIndex + 1}</Badge>
                <h3 className="text-3xl font-bold">{phase.title}</h3>
              </div>
              <p className="text-muted-foreground mb-6 ml-1">{phase.description}</p>
              <div className={`grid gap-4 ${phase.weeks.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
                {phase.weeks.map((week: any) => (
                  <Card 
                    key={week.number} 
                    className={`p-6 hover:scale-105 transition-transform ${week.isVibeCoding ? 'border-primary/50 bg-primary/5' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${week.isVibeCoding ? 'bg-primary/20' : 'bg-primary/10'}`}>
                          <span className="font-bold text-primary">{week.number}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{week.title}</h4>
                          <p className={`text-sm ${week.isVibeCoding ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                            {week.highlight}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/pricing">
              Get Started — From $19
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
