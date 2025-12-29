import { Card } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Briefcase } from "lucide-react";

export const FutureOfWork = () => {
  const stats = [
    {
      icon: Users,
      stat: "65%",
      description: "of today's students will work in jobs that don't exist yet",
      source: "World Economic Forum"
    },
    {
      icon: Briefcase,
      stat: "85M",
      description: "jobs will be displaced by AI by 2025",
      source: "World Economic Forum"
    },
    {
      icon: DollarSign,
      stat: "$15.7T",
      description: "added to global GDP by AI by 2030",
      source: "PwC"
    },
    {
      icon: TrendingUp,
      stat: "97M",
      description: "new jobs created in AI/automation",
      source: "McKinsey"
    }
  ];

  const timeline = [
    { year: "2020", event: "Remote work goes mainstream" },
    { year: "2022", event: "DALL-E and AI art emerge" },
    { year: "2023", event: "ChatGPT reaches 100M users in 60 days" },
    { year: "2024", event: "AI coding assistants become standard" },
    { year: "2025", event: "Your child's window of opportunity", highlight: true },
    { year: "2030", event: "Early adopters lead, late adopters struggle" }
  ];

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-5xl font-bold text-center mb-4 tracking-tight">
          THE WORLD IS <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">CHANGING</span>
        </h2>
        <p className="text-center text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
          The future of work is being rewritten. Is your child ready?
        </p>

        {/* Statistics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((item) => {
            const IconComponent = item.icon;
            return (
              <Card key={item.stat} className="p-6 text-center hover:scale-105 transition-transform">
                <IconComponent className="w-10 h-10 text-primary mx-auto mb-4" />
                <div className="text-4xl font-bold text-primary mb-2">{item.stat}</div>
                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                <p className="text-xs text-muted-foreground italic">— {item.source}</p>
              </Card>
            );
          })}
        </div>

        {/* Industry Leaders Say */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Industry Leaders Say</h3>
          <div className="space-y-6">
            <Card className="p-8 bg-muted/30">
              <p className="text-lg italic mb-4">
                "The future belongs to those who can work alongside AI, not compete against it."
              </p>
              <p className="text-sm text-muted-foreground">— Satya Nadella, CEO of Microsoft</p>
            </Card>
            <Card className="p-8 bg-muted/30">
              <p className="text-lg italic mb-4">
                "Software is eating the world, and those who understand how to build it will own the future."
              </p>
              <p className="text-sm text-muted-foreground">— Marc Andreessen, Andreessen Horowitz</p>
            </Card>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">The Disruption Timeline</h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border" />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div 
                  key={item.year}
                  className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <Card 
                    className={`w-5/12 p-6 ${item.highlight ? 'bg-primary/10 border-primary' : ''}`}
                  >
                    <div className={`text-2xl font-bold mb-2 ${item.highlight ? 'text-primary' : ''}`}>
                      {item.year}
                    </div>
                    <p className="text-muted-foreground">{item.event}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bridge Statement */}
        <Card className="p-12 bg-gradient-to-br from-primary/20 to-transparent border-primary/50">
          <p className="text-3xl font-bold text-center leading-relaxed">
            The question isn't whether AI will change everything.
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              The question is: will your child be ready to lead that change?
            </span>
          </p>
        </Card>
      </div>
    </section>
  );
};
