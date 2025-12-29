import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { CursorWordmark } from "@/components/ui/cursor-wordmark";
import { Globe, Rocket, Users, Award, ArrowRight, Building, GraduationCap } from "lucide-react";
import { EqualOpportunityBanner, UnknownFutureSection, NEXTCertifiedBadge } from "@/components/movement";
import { SEOHead } from "@/components/seo/SEOHead";

const Manifesto = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="The Manifesto - Building What's NEXT_"
        description="The global movement to create tomorrow's job creators. NEXT_ CERTIFIED prepares students for a future that doesn't exist yet."
        canonical="/manifesto"
        keywords="AI education manifesto, future of education, job creators, NEXT certified, young founders movement"
      />
      <PublicHeader />
      
      {/* Hero Section */}
      <section className="relative border-b border-border/10 overflow-hidden flex items-center justify-center min-h-[70vh] pt-24 bg-gradient-to-br from-[#0A0F1C] via-[#111827] to-[#0A0F1C]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center space-y-8 max-w-4xl">
          <Badge className="bg-gold/20 border border-gold/30 text-gold text-sm px-4 py-1">
            THE MOVEMENT
          </Badge>
          
          <CursorWordmark word="BUILDING WHAT'S NEXT" size="lg" className="text-white" cursorClassName="text-gold" />
          
          <h1 className="text-2xl md:text-4xl font-medium text-foreground/80 leading-relaxed">
            The Global Movement to Create Tomorrow's Job Creators
          </h1>
          
          <NEXTCertifiedBadge size="lg" />
        </div>
      </section>

      {/* Equal Opportunity Banner */}
      <EqualOpportunityBanner />

      {/* The Story */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <article className="prose prose-lg prose-invert mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              THE STORY NOBODY SAW COMING
            </h2>
            
            <p className="text-xl text-foreground/80 leading-relaxed">
              Two years ago, most people had never heard of ChatGPT.
            </p>
            
            <p className="text-xl text-foreground/80 leading-relaxed">
              Eighteen months ago, "Lovable" and "Base44" meant nothing to anyone.
            </p>
            
            <p className="text-xl text-foreground/80 leading-relaxed">
              Today, these tools have transformed how the world works. Companies are being built in days, not years. Products are launching before their founders finish high school.
            </p>
            
            <p className="text-xl text-foreground/80 leading-relaxed">
              But here's what most people miss: <strong className="text-foreground">The founders of these world-changing tools didn't learn them in school.</strong> They learned to THINK like creators. They learned to see problems nobody else saw. They learned to build solutions nobody else imagined.
            </p>
            
            <div className="py-8 text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">
                The next ChatGPT will come from somewhere.
              </p>
              <p className="text-2xl md:text-3xl font-bold text-primary mt-2">
                The next Lovable. The next tool that changes everything.
              </p>
            </div>
            
            <p className="text-2xl font-bold text-gold text-center">
              The question is: Will your child build it? Or will they just learn to use it?
            </p>
          </article>
        </div>
      </section>

      {/* Unknown Future Visual */}
      <UnknownFutureSection />

      {/* The Great Equalizer */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-[#0D1321]">
        <div className="container mx-auto max-w-3xl">
          <article className="prose prose-lg prose-invert mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              THE GREAT EQUALIZER
            </h2>
            
            <p className="text-xl text-foreground/80 leading-relaxed">
              For the first time in human history, a child in Lagos has the same tools as a child in London.
            </p>
            
            <p className="text-xl text-foreground/80 leading-relaxed">
              AI doesn't ask for your parents' bank account. It doesn't care about your zip code. It only asks: <em className="text-foreground">What do you want to create?</em>
            </p>
            
            <p className="text-xl text-foreground/80 leading-relaxed">
              This is the biggest wealth-creating opportunity humanity has ever seen — and for the first time, <strong className="text-foreground">it's available to everyone.</strong>
            </p>
            
            <p className="text-xl text-foreground/80 leading-relaxed">
              But opportunity without readiness is worthless.
            </p>
            
            <p className="text-3xl font-bold text-gold text-center py-8">
              That's why we built NEXT_.
            </p>
          </article>
        </div>
      </section>

      {/* Job Creators */}
      <section className="py-20 px-6 bg-[#0D1321] border-y border-border/10">
        <div className="container mx-auto max-w-3xl">
          <article className="prose prose-lg prose-invert mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              JOB CREATORS, NOT JOB SEEKERS
            </h2>
            
            <p className="text-xl text-foreground/80 leading-relaxed">
              We're not training employees. We're training employers.
            </p>
            
            <p className="text-xl text-foreground/80 leading-relaxed">
              We're not teaching students to apply for jobs. We're teaching them to <strong className="text-foreground">create jobs</strong> — for themselves, for their communities, for their nations.
            </p>
            
            <p className="text-xl text-foreground/80 leading-relaxed">
              Every NEXT_ graduate doesn't just get a certificate. They get a <strong className="text-foreground">credential</strong> that says: <em>"I can build whatever comes next."</em>
            </p>
            
            <div className="flex justify-center py-8">
              <NEXTCertifiedBadge size="lg" />
            </div>
            
            <p className="text-xl text-foreground/80 leading-relaxed text-center">
              <strong className="text-primary">NEXT_ CERTIFIED</strong> isn't a certificate of completion. It's proof of readiness for a future that doesn't exist yet.
            </p>
          </article>
        </div>
      </section>

      {/* Not Tools, Thinking */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <article className="prose prose-lg prose-invert mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              NOT TOOLS. THINKING.
            </h2>
            
            <p className="text-xl text-foreground/80 leading-relaxed">
              We don't teach students to use Lovable.
            </p>
            
            <p className="text-xl text-foreground/80 leading-relaxed">
              We teach them to think like the person who <strong className="text-foreground">built</strong> Lovable.
            </p>
            
            <p className="text-xl text-foreground/80 leading-relaxed">
              We don't teach them to prompt ChatGPT.
            </p>
            
            <p className="text-xl text-foreground/80 leading-relaxed">
              We teach them to think like the team that <strong className="text-foreground">created</strong> ChatGPT.
            </p>
            
            <p className="text-xl text-foreground/80 leading-relaxed">
              Because the tools will change. Every year. Every month. Maybe every week.
            </p>
            
            <p className="text-2xl font-bold text-gold text-center py-8">
              But the thinking that creates those tools? That's timeless.
            </p>
          </article>
        </div>
      </section>

      {/* The Credential */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-[#0D1321]">
        <div className="container mx-auto max-w-3xl">
          <article className="prose prose-lg prose-invert mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              THE CREDENTIAL THAT MATTERS
            </h2>
            
            <p className="text-xl text-foreground/80 leading-relaxed text-center">
              <strong className="text-primary">NEXT_ CERTIFIED</strong> means:
            </p>
            
            <ul className="text-xl text-foreground/80 space-y-4 list-none pl-0">
              <li className="flex items-start gap-3">
                <span className="text-primary text-2xl">•</span>
                You can build with tools that didn't exist 2 years ago
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-2xl">•</span>
                You can adapt to technologies that haven't been invented yet
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-2xl">•</span>
                You can create solutions for problems nobody has solved
              </li>
            </ul>
            
            <p className="text-xl text-foreground/80 leading-relaxed text-center">
              It's the only credential that prepares students for a future we can't predict.
            </p>
            
            <p className="text-2xl font-bold text-foreground text-center py-4 italic">
              Because we don't know what's NEXT_. But we know who will build it.
            </p>
          </article>
        </div>
      </section>

      {/* For Parents, Schools, Governments */}
      <section className="py-20 px-6 bg-[#0D1321] border-y border-border/10">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-background/50 border-border/20 backdrop-blur-sm">
              <CardContent className="p-8 text-center space-y-4">
                <Users className="w-12 h-12 text-primary mx-auto" />
                <h3 className="text-2xl font-bold text-foreground">FOR PARENTS</h3>
                <p className="text-foreground/70">
                  Your child won't compete for jobs.
                </p>
                <p className="text-xl font-bold text-gold">
                  They'll create them.
                </p>
                <Button onClick={() => navigate('/academy/parents')} className="mt-4">
                  Learn More
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-background/50 border-border/20 backdrop-blur-sm">
              <CardContent className="p-8 text-center space-y-4">
                <GraduationCap className="w-12 h-12 text-primary mx-auto" />
                <h3 className="text-2xl font-bold text-foreground">FOR SCHOOLS</h3>
                <p className="text-foreground/70">
                  The schools that certify NEXT_ students will produce founders.
                </p>
                <p className="text-xl font-bold text-gold">
                  The schools that wait will explain why they didn't.
                </p>
                <Button onClick={() => navigate('/schools')} className="mt-4">
                  Partner With Us
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-background/50 border-border/20 backdrop-blur-sm">
              <CardContent className="p-8 text-center space-y-4">
                <Building className="w-12 h-12 text-primary mx-auto" />
                <h3 className="text-2xl font-bold text-foreground">FOR GOVERNMENTS</h3>
                <p className="text-foreground/70">
                  The nations that certify the most NEXT_ students will lead the AI economy.
                </p>
                <p className="text-xl font-bold text-gold">
                  The nations that wait will explain why they fell behind.
                </p>
                <Button onClick={() => navigate('/schools')} className="mt-4">
                  Request Briefing
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Movement */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            THE MOVEMENT
          </h2>
          
          <p className="text-xl text-foreground/80">
            This isn't a course. It's a <strong className="text-foreground">credential</strong>.
          </p>
          
          <p className="text-xl text-foreground/80">
            This isn't a program. It's a <strong className="text-foreground">movement</strong>.
          </p>
          
          <p className="text-xl text-foreground/80">
            <strong className="text-primary">NEXT_ CERTIFIED</strong> students around the world are proving they're ready for the unknown future.
          </p>
          
          <p className="text-xl text-foreground/80">
            They're in Singapore. In Dubai. In Lagos. In São Paulo. In London.
          </p>
          
          <p className="text-xl text-foreground/80">
            They don't know what's NEXT_.
          </p>
          
          <p className="text-3xl font-bold text-gold py-4">
            But they know they'll be the ones who build it.
          </p>
          
          <div className="pt-8 space-y-4">
            <NEXTCertifiedBadge size="lg" />
            <p className="text-foreground/60">
              The global standard for readiness in the AI century.
            </p>
            <CursorWordmark word="Building What's NEXT" size="md" className="text-foreground/40" cursorClassName="text-primary" />
          </div>
          
          <div className="pt-8">
            <Button 
              size="lg" 
              onClick={() => navigate('/pricing')}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold shadow-lg shadow-amber-500/25 border-0"
            >
              <ArrowRight className="mr-2" />
              Join the Movement
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/10 bg-[#0A0F1C]">
        <div className="container mx-auto text-center space-y-4">
          <CursorWordmark word="NEXT" size="sm" className="text-foreground/40" cursorClassName="text-primary" subtitle="BILLION LAB" />
          <p className="text-foreground/40 text-sm">
            © 2025 Next Billion Lab. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <Button variant="link" size="sm" onClick={() => navigate('/terms')} className="text-foreground/40 hover:text-foreground">
              Terms
            </Button>
            <Button variant="link" size="sm" onClick={() => navigate('/privacy')} className="text-foreground/40 hover:text-foreground">
              Privacy
            </Button>
            <Button variant="link" size="sm" onClick={() => navigate('/brand-identity')} className="text-foreground/40 hover:text-foreground">
              Brand
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Manifesto;
