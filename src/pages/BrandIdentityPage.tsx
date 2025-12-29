// Brand Identity Page - Fresh standalone version
import { ArrowLeft, Sparkles, Zap, Brain, Rocket, Target, Palette, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Inlined AI Tools Marquee
const AIToolsMarquee = () => {
  const tools = [
    { icon: Brain, name: 'AI Coach', desc: 'Personal mentor' },
    { icon: Rocket, name: 'Landing Page Generator', desc: 'Build pages in seconds' },
    { icon: Target, name: 'Pitch Deck Creator', desc: 'Investor-ready decks' },
    { icon: Zap, name: 'THE TANK', desc: 'Practice your pitch' },
    { icon: Palette, name: 'Logo Generator', desc: 'Brand identity' },
    { icon: MessageSquare, name: 'Stuck Helper', desc: 'Never get blocked' },
  ];

  return (
    <div className="py-8 border-y border-border/30 overflow-hidden">
      <div className="flex animate-marquee gap-8">
        {[...tools, ...tools].map((tool, i) => (
          <div key={i} className="flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 whitespace-nowrap">
            <tool.icon className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">{tool.name}</span>
            <span className="text-muted-foreground text-sm">• {tool.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inlined Brand Story
const BrandStory = () => (
  <section className="space-y-8">
    <div className="flex items-center gap-3">
      <Sparkles className="w-6 h-6 text-primary" />
      <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
    </div>
    
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary">Origin</h3>
        <p className="text-muted-foreground leading-relaxed">
          Next Billion Lab was born from a simple observation: the world's best entrepreneurs 
          didn't learn business from textbooks. They learned by doing. We're bringing that 
          same hands-on approach to the next generation—powered by AI.
        </p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary">Mission</h3>
        <p className="text-muted-foreground leading-relaxed">
          To empower 1 million young founders to build real businesses using AI tools, 
          developing the skills they need to thrive in an AI-first world.
        </p>
      </div>
    </div>
    
    <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
      <h3 className="text-xl font-semibold text-foreground mb-3">The Promise</h3>
      <p className="text-lg text-muted-foreground italic">
        "Every student who completes our program will have built and launched a real product."
      </p>
    </div>
  </section>
);

// Inlined Tagline System
const TaglineSystem = () => {
  const taglines = [
    { type: 'Primary', text: 'Build the Future.', usage: 'Logo lockups, headers' },
    { type: 'Manifesto', text: "Jobs won't be taken by AI. They'll be taken by people who know AI.", usage: 'Hero sections, campaigns' },
    { type: 'Descriptive', text: 'AI Entrepreneurship for Young Founders', usage: 'Subtitles, meta descriptions' },
    { type: 'Emotional', text: 'From Student to Founder in 12 Weeks', usage: 'Marketing materials' },
    { type: 'Aspirational', text: "The next generation of tech billionaires isn't being born. It's being built.", usage: 'Landing pages' },
  ];

  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold text-foreground">Tagline System</h2>
      
      <div className="space-y-4">
        {taglines.map((t, i) => (
          <div key={i} className="p-4 rounded-lg bg-card/50 border border-border/50 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <span className="text-xs font-medium text-primary uppercase tracking-wider w-24">{t.type}</span>
            <span className="text-lg font-semibold text-foreground flex-1">"{t.text}"</span>
            <span className="text-sm text-muted-foreground">{t.usage}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

// Inlined Color Palette
const ColorPalette = () => {
  const colors = [
    { name: 'Deep Navy', hex: '#0A0F1C', var: '--background', usage: 'Backgrounds' },
    { name: 'Electric Blue', hex: '#3B82F6', var: '--primary', usage: 'Primary actions, links' },
    { name: 'Warm Gold', hex: '#F59E0B', var: '--gold', usage: 'CTAs, highlights' },
    { name: 'Pure White', hex: '#FFFFFF', var: '--foreground', usage: 'Text, icons' },
    { name: 'Muted Gray', hex: '#6B7280', var: '--muted-foreground', usage: 'Secondary text' },
  ];

  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold text-foreground">Color Palette</h2>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {colors.map((c, i) => (
          <div key={i} className="rounded-xl overflow-hidden border border-border/50">
            <div 
              className="h-24" 
              style={{ backgroundColor: c.hex }}
            />
            <div className="p-4 bg-card/50">
              <p className="font-semibold text-foreground">{c.name}</p>
              <p className="text-sm text-muted-foreground font-mono">{c.hex}</p>
              <p className="text-xs text-muted-foreground mt-1">{c.usage}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default function BrandIdentityPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">Next Billion Lab</h1>
              <p className="text-sm text-muted-foreground">Brand & Identity Guide</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Hero */}
        <section className="text-center py-12 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent rounded-3xl" />
          
          <div className="relative">
            <div className="mb-6">
              <span className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-primary to-gold bg-clip-text text-transparent">
                1→1B
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Brand & Identity
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              The complete brand guide for Next Billion Lab. Story, voice, visuals, and assets.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="px-4 py-2 rounded-full bg-card/50 border border-border/50">
                <span className="text-muted-foreground">Primary:</span>{' '}
                <span className="text-primary font-semibold">Electric Blue</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-card/50 border border-border/50">
                <span className="text-muted-foreground">Accent:</span>{' '}
                <span className="text-gold font-semibold">Warm Gold</span>
              </div>
            </div>
          </div>
        </section>

        <AIToolsMarquee />
        
        <div className="border-t border-border/30" />
        <BrandStory />
        
        <div className="border-t border-border/30" />
        <TaglineSystem />
        
        <div className="border-t border-border/30" />
        <ColorPalette />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Next Billion Lab. All rights reserved.</p>
          <p className="mt-2 text-primary font-medium">Build the Future.</p>
        </div>
      </footer>
    </div>
  );
}
