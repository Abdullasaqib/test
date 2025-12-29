import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NeuralBackground } from "@/components/ui/neural-background";
import { OrganicBlob } from "@/components/ui/organic-blob";
import { ArrowRight, Globe, TrendingUp, Users, Building2, GraduationCap, CheckCircle, Rocket, Target, Calendar, Mail, Zap, Award, MapPin } from "lucide-react";

const AcademyPitch = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Section 1: Hero Opening Declaration */}
      <section className="relative border-b overflow-hidden flex items-center justify-center section-padding min-h-[80vh]">
        <NeuralBackground className="opacity-10" />
        <OrganicBlob color="hsl(var(--primary))" size={500} className="top-0 -left-40 opacity-30" animationDelay={0} />
        <OrganicBlob color="hsl(var(--accent))" size={400} className="bottom-0 -right-40 opacity-30" animationDelay={2} />
        
        <div className="container mx-auto px-6 relative z-10 text-center space-y-8 max-w-5xl">
          <Badge className="bg-card/50 backdrop-blur-sm border border-border text-primary">
            National Strategy Proposal
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            The next generation of tech billionaires isn't being born.
            <span className="block mt-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              It's being built.
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-muted-foreground font-light">
            The question is: <span className="text-foreground font-semibold">where?</span>
          </p>
          
          <div className="pt-8">
            <p className="text-lg text-muted-foreground uppercase tracking-widest">
              A Partnership Proposal for National Leaders
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: The Race Has Already Started */}
      <section className="bg-card/30 border-y">
        <div className="container mx-auto px-6 section-padding">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                China is graduating 5M engineers.<br />
                America dominates AI.<br />
                India is producing founders.
              </h2>
              <p className="text-2xl md:text-3xl text-muted-foreground font-light">
                Where does the UAE fit in the AI century?
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { country: "Singapore", stat: "Mandatory", desc: "Youth entrepreneurship in schools" },
                { country: "Israel", stat: "#1", desc: "Startups per capita globally" },
                { country: "Estonia", stat: "Age 6", desc: "Digital-first education begins" },
                { country: "China", stat: "200M", desc: "Students in AI education" },
              ].map((item, i) => (
                <Card key={i} className="bg-card/50 backdrop-blur-sm border border-border">
                  <CardContent className="p-6 text-center space-y-2">
                    <div className="text-sm text-muted-foreground uppercase tracking-wider">{item.country}</div>
                    <div className="text-3xl font-bold text-primary">{item.stat}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center pt-8">
              <p className="text-xl md:text-2xl text-foreground font-medium">
                Your nation is in a race—<span className="text-primary">whether you choose to run or not.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: The Manifesto */}
      <section className="container mx-auto px-6 section-padding">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <Badge className="bg-card/50 backdrop-blur-sm border border-border text-primary text-lg px-6 py-2">
              OUR BELIEF
            </Badge>
          </div>

          <div className="space-y-8 text-xl md:text-2xl leading-relaxed">
            <p className="text-foreground">
              <span className="text-primary font-bold">We believe</span> that nations that produce founders will lead the 21st century.
            </p>
            
            <p className="text-foreground">
              <span className="text-primary font-bold">We believe</span> that the children in your schools today will either build the companies of tomorrow—or work for companies built elsewhere.
            </p>
            
            <p className="text-foreground">
              <span className="text-primary font-bold">We believe</span> that youth unemployment is not a jobs problem. It's a mindset problem. And mindset can be trained.
            </p>
            
            <p className="text-foreground">
              <span className="text-primary font-bold">We believe</span> that with the right education, 100,000 young Emiratis can become 10,000 entrepreneurs, who become 1,000 successful founders, who create 100 companies that employ millions.
            </p>
          </div>

          <div className="text-center pt-8 border-t border-border">
            <p className="text-2xl md:text-3xl font-bold text-foreground">
              We're not asking for a budget line.
              <span className="block mt-2 text-primary">We're asking for a national commitment.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: The National Impact Model */}
      <section className="bg-card/30 border-y">
        <div className="container mx-auto px-6 section-padding">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <Badge className="bg-card/50 backdrop-blur-sm border border-border text-primary">
                PROJECTED IMPACT
              </Badge>
              <h2 className="section-headline">
                The National Impact Model
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Measurable outcomes aligned with national economic vision
              </p>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border border-border overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-4 px-6 text-muted-foreground font-medium">Metric</th>
                        <th className="text-center py-4 px-6 text-muted-foreground font-medium">Year 1</th>
                        <th className="text-center py-4 px-6 text-muted-foreground font-medium">Year 3</th>
                        <th className="text-center py-4 px-6 text-muted-foreground font-medium">Year 5</th>
                      </tr>
                    </thead>
                    <tbody className="text-lg">
                      {[
                        { metric: "Students Trained", y1: "10,000", y3: "50,000", y5: "200,000" },
                        { metric: "Businesses Launched", y1: "2,000", y3: "15,000", y5: "80,000" },
                        { metric: "Jobs Created", y1: "5,000", y3: "40,000", y5: "250,000" },
                        { metric: "GDP Contribution", y1: "$50M", y3: "$500M", y5: "$2B+" },
                        { metric: "Youth Unemployment Reduction", y1: "-2%", y3: "-8%", y5: "-15%" },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-border last:border-b-0">
                          <td className="py-4 px-6 font-medium text-foreground">{row.metric}</td>
                          <td className="py-4 px-6 text-center text-muted-foreground">{row.y1}</td>
                          <td className="py-4 px-6 text-center text-muted-foreground">{row.y3}</td>
                          <td className="py-4 px-6 text-center text-primary font-bold">{row.y5}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 5: Vision 2035 Press Release */}
      <section className="relative overflow-hidden">
        <NeuralBackground className="opacity-5" />
        <div className="container mx-auto px-6 section-padding relative z-10">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <Badge className="bg-card/50 backdrop-blur-sm border border-border text-accent">
                VISION 2035
              </Badge>
              <h2 className="section-headline">
                A Press Release from the Future
              </h2>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border border-border overflow-hidden">
              <CardContent className="p-8 md:p-12 space-y-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>DUBAI, UAE</span>
                  <span>•</span>
                  <span>JANUARY 15, 2035</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                  UAE Becomes World's #1 Source of Teen Entrepreneurs as Next Billion Lab Graduates Create $50B in Economic Value
                </h3>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">DUBAI</strong> — The UAE today announced that the nation has officially surpassed Silicon Valley in producing teen founders, with over 12,000 student-built companies now operating across the globe.
                  </p>
                  
                  <p>
                    The transformation began in 2025 when regional governments partnered with Next Billion Lab to integrate entrepreneurship education into national curricula. Ten years later, the results have exceeded all projections.
                  </p>

                  <div className="bg-primary/5 rounded-lg p-6 my-6 border-l-4 border-primary">
                    <p className="italic text-foreground">
                      "What we're seeing is unprecedented. A generation of young people who don't wait for jobs—they create them. This is the economic diversification we dreamed of."
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">— Minister of Economy, UAE</p>
                  </div>

                  <p>
                    Among the success stories: <strong className="text-foreground">Fatima Al-Rashid</strong>, who started her AI healthcare company at age 14 and now employs over 2,000 people across the Middle East. <strong className="text-foreground">Mohammed Hassan</strong>, whose sustainable energy startup raised $200M before he turned 20. <strong className="text-foreground">Sara Nasser</strong>, whose EdTech platform now serves 5 million students across Africa and Asia.
                  </p>

                  <p>
                    The program has created an estimated 250,000 jobs and contributed over $50 billion to regional GDP—transforming the UAE from an oil-dependent economy to the world's premier hub for young entrepreneurship.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 6: Implementation Blueprint */}
      <section className="bg-card/30 border-y">
        <div className="container mx-auto px-6 section-padding">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <Badge className="bg-card/50 backdrop-blur-sm border border-border text-primary">
                IMPLEMENTATION
              </Badge>
              <h2 className="section-headline">
                Ready to Deploy at National Scale
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  phase: "Phase 1",
                  timeline: "6 Months",
                  title: "National Pilot",
                  items: [
                    "1,000 students across 20 schools",
                    "Teacher training program",
                    "Curriculum localization",
                    "Success metrics established"
                  ]
                },
                {
                  phase: "Phase 2",
                  timeline: "Year 1-2",
                  title: "Expansion",
                  items: [
                    "Scale to 50,000 students",
                    "Ministry of Education integration",
                    "Arabic curriculum launch",
                    "National Demo Day established"
                  ]
                },
                {
                  phase: "Phase 3",
                  timeline: "Year 3-5",
                  title: "National Rollout",
                  items: [
                    "200,000+ students annually",
                    "Full curriculum integration",
                    "Regional hub establishment",
                    "International recognition"
                  ]
                }
              ].map((phase, i) => (
                <Card key={i} className="bg-card/50 backdrop-blur-sm border border-border relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="border-primary/50 text-primary">
                        {phase.phase}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{phase.timeline}</span>
                    </div>
                    <h3 className="text-xl font-bold">{phase.title}</h3>
                    <ul className="space-y-2">
                      {phase.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-4 gap-4 pt-8">
              {[
                { icon: Building2, label: "Ministry Integration" },
                { icon: GraduationCap, label: "Teacher Training" },
                { icon: Globe, label: "Arabic Localization" },
                { icon: Award, label: "National KPI Tracking" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
                  <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Why Us */}
      <section className="container mx-auto px-6 section-padding">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <Badge className="bg-card/50 backdrop-blur-sm border border-border text-primary">
              WHY NEXT BILLION LAB
            </Badge>
            <h2 className="section-headline">
              Proven. Scalable. Aligned.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border border-border">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Global Proof of Concept</h3>
                    <p className="text-muted-foreground">2,050+ students across 195 countries. $55M+ in revenue generated by students. This isn't theory—it's working.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">AI-Powered = Infinitely Scalable</h3>
                    <p className="text-muted-foreground">Our AI Coach provides 24/7 personalized guidance to every student without proportional cost increases.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border border-border">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">No-Code = Accessible to All</h3>
                    <p className="text-muted-foreground">Students don't need programming skills. Visual builders let them focus on business, not syntax.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Dubai Based = Regionally Aligned</h3>
                    <p className="text-muted-foreground">Built in the UAE, designed for the region. We understand the culture, values, and aspirations of Gulf youth.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 8: The Ask */}
      <section className="bg-card/30 border-y">
        <div className="container mx-auto px-6 section-padding">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <Badge className="bg-card/50 backdrop-blur-sm border border-border text-primary">
                THE ASK
              </Badge>
              <h2 className="section-headline">
                Lead a Movement, Not Just a Program
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card/50 backdrop-blur-sm border border-border">
                <CardHeader>
                  <CardTitle className="text-xl">What We Need</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    "National pilot commitment (1,000 students)",
                    "Ministry of Education integration pathway",
                    "Public endorsement from leadership"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">{i + 1}</span>
                      </div>
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border border-border">
                <CardHeader>
                  <CardTitle className="text-xl">What You Get</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    "Position your nation as global leader in youth entrepreneurship",
                    "Create 250,000+ jobs over 5 years",
                    "Build a pipeline of founders who diversify your economy",
                    "A generation that creates jobs, not seeks them"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Closing Statement */}
      <section className="relative overflow-hidden">
        <NeuralBackground className="opacity-10" />
        <OrganicBlob color="hsl(var(--primary))" size={400} className="top-0 -right-40 opacity-20" animationDelay={0} />
        <OrganicBlob color="hsl(var(--accent))" size={300} className="bottom-0 -left-40 opacity-20" animationDelay={1} />
        
        <div className="container mx-auto px-6 section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-6">
              <p className="text-2xl md:text-3xl text-muted-foreground font-light">
                In 2035, the world will ask:
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Which nation built the next generation of founders?
              </h2>
              <p className="text-2xl md:text-3xl font-bold text-primary">
                Will it be yours?
              </p>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border border-border p-8">
              <div className="space-y-6">
                <p className="text-lg text-foreground font-medium">
                  Schedule a confidential briefing with our leadership team
                </p>
                <Button size="lg" asChild>
                  <a href="mailto:partnerships@nextbillionlab.com?subject=Ministry%20Partnership%20Inquiry">
                    <Mail className="mr-2 h-5 w-5" />
                    Schedule a Ministry Briefing
                  </a>
                </Button>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>partnerships@nextbillionlab.com</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcademyPitch;
