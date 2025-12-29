import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Quote, Target, Zap, Heart, Globe, Lightbulb } from 'lucide-react';
import { NEXTCertifiedBadge } from '@/components/movement';

export function BrandStory() {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Brand Story</h2>
        <p className="text-muted-foreground">Building What's NEXT_ — The origin, mission, and manifesto</p>
      </div>

      {/* The Manifesto */}
      <Card className="glass-card border-primary/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-gold/5" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-2">
            <Quote className="w-5 h-5 text-primary" />
            Building What's NEXT_
          </CardTitle>
        </CardHeader>
        <CardContent className="relative space-y-4">
          <blockquote className="text-xl md:text-2xl font-bold text-foreground leading-relaxed border-l-4 border-primary pl-6">
            "Nobody knew ChatGPT was coming. Nobody knew Lovable was coming. Nobody knows what's NEXT_. But we're preparing students to BUILD it."
          </blockquote>
          <p className="text-muted-foreground text-lg">
            We don't teach students to USE tools. We teach them to think like the people who CREATE the tools. The next Lovable, the next ChatGPT — it will be built by a NEXT_ graduate.
          </p>
          <div className="pt-4">
            <NEXTCertifiedBadge size="md" />
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* The Unknown Future */}
        <Card className="glass-card border-border/50 hover:border-primary/30 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-gold" />
              The Unknown Future
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <p>
              Two years ago, ChatGPT didn't exist. Eighteen months ago, Lovable meant nothing.
            </p>
            <p>
              The tools that will transform 2027 haven't been invented yet. <strong className="text-foreground">We can't teach what's coming — but we can teach how to BUILD it.</strong>
            </p>
            <p className="text-primary font-medium">
              NEXT_ = The blank canvas. The underscore is what YOU will create.
            </p>
          </CardContent>
        </Card>

        {/* The Great Equalizer */}
        <Card className="glass-card border-border/50 hover:border-gold/30 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              The Great Equalizer
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <p>
              AI doesn't care where you were born. It doesn't ask for your parents' bank account.
            </p>
            <p>
              A child in Lagos has the same AI tools as a child in London. <strong className="text-foreground">This is the biggest opportunity in human history — and it's available to everyone.</strong>
            </p>
            <p className="text-gold font-medium">
              We're giving every child a fair chance.
            </p>
          </CardContent>
        </Card>

        {/* Job Creators */}
        <Card className="glass-card border-border/50 hover:border-primary/30 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Job Creators, Not Job Seekers
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <p>
              We're not training employees. We're training employers.
            </p>
            <p>
              Every NEXT_ graduate doesn't just get a certificate. They get a <strong className="text-foreground">credential</strong> that says: "I can build whatever comes next."
            </p>
            <ul className="list-none space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Built and launched a <strong className="text-foreground">real product</strong>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Mastered <strong className="text-foreground">AI building tools</strong>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Developed <strong className="text-foreground">founder thinking</strong>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* The Credentials */}
        <Card className="glass-card border-border/50 hover:border-gold/30 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" />
              NEXT_ CERTIFIED — 3-Level System
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <p>
              <strong className="text-foreground">Three credentials that matter</strong> in the AI century:
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <p className="font-semibold text-foreground">Level 1: AI Foundations Certificate</p>
                <p className="text-sm">6 lessons • ~4 hours • Entry-level AI fluency</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                <p className="font-semibold text-primary">Level 2: AI Builder Certificate</p>
                <p className="text-sm">12 weeks • 180 missions • Full AI fluency</p>
              </div>
              <div className="p-3 bg-gold/10 rounded-lg border border-gold/20">
                <p className="font-semibold text-gold">Level 3: AI Launcher Certificate</p>
                <p className="text-sm">Live Cohort • Demo Day • Investor-ready</p>
              </div>
            </div>
            <p className="text-gold font-medium italic">
              "We don't know what's NEXT_. But we know who will build it."
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}