import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const TAGLINES = [
  {
    type: 'Primary',
    tagline: "BUILDING WHAT'S NEXT_",
    usage: 'Hero headlines, major marketing campaigns. Our core positioning statement.',
    badge: 'primary'
  },
  {
    type: 'Credential',
    tagline: 'NEXT_ CERTIFIED — Ready for the unknown future',
    usage: 'Certificate pages, achievement shares, LinkedIn profiles. The credential that matters.',
    badge: 'amber'
  },
  {
    type: 'Mission',
    tagline: 'Every child deserves a fair chance at the biggest opportunity in human history',
    usage: 'About pages, government pitches, social impact content. Our deep purpose.',
    badge: 'green'
  },
  {
    type: 'Action',
    tagline: 'The future is unknown. Build it anyway.',
    usage: 'CTAs, social posts, motivational content. Drives action despite uncertainty.',
    badge: 'orange'
  },
  {
    type: 'Equal Opportunity',
    tagline: "AI doesn't care where you were born. It cares what you create.",
    usage: 'Social impact messaging, government/school presentations, founding story.',
    badge: 'blue'
  },
  {
    type: 'Job Creation',
    tagline: 'Job CREATORS, not job seekers.',
    usage: 'Parent-facing content, outcomes messaging, economic impact pitches.',
    badge: 'secondary'
  },
  {
    type: 'FOMO',
    tagline: '50,000 certified. Are you ready?',
    usage: 'Ads, enrollment CTAs, urgency messaging. Update number as we grow.',
    badge: 'red'
  },
  {
    type: 'Government',
    tagline: 'The countries that certify the most NEXT_ students will lead the AI economy.',
    usage: 'B2G pitches, ministry presentations, national competitiveness messaging.',
    badge: 'purple'
  }
];

const BADGE_STYLES: Record<string, string> = {
  primary: 'bg-primary text-primary-foreground',
  amber: 'bg-gold text-background',
  secondary: 'bg-muted text-muted-foreground',
  green: 'bg-emerald-500 text-white',
  blue: 'bg-blue-500 text-white',
  orange: 'bg-orange-500 text-white',
  red: 'bg-red-500 text-white',
  purple: 'bg-purple-500 text-white'
};

export function TaglineSystem() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyTagline = (tagline: string, index: number) => {
    navigator.clipboard.writeText(tagline);
    setCopiedIndex(index);
    toast.success('Tagline copied!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Tagline System</h2>
        <p className="text-muted-foreground">NEXT_ movement messaging for every context—click to copy</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {TAGLINES.map((item, index) => (
          <Card 
            key={item.type} 
            className="glass-card border border-border/50 hover:border-primary/50 transition-colors cursor-pointer group"
            onClick={() => copyTagline(item.tagline, index)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge className={BADGE_STYLES[item.badge]}>
                  {item.type}
                </Badge>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xl font-semibold text-foreground">
                "{item.tagline}"
              </p>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground/80">Use for:</strong> {item.usage}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Combination Examples */}
      <Card className="glass-card border border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Combination Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Pricing Page Hero:</p>
            <p className="text-foreground">
              <span className="text-2xl font-bold">BUILDING WHAT'S <span className="text-primary">NEXT_</span></span>
              <br />
              <span className="text-muted-foreground">Nobody knows what's coming. But we're preparing your child to BUILD it.</span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">LinkedIn Certificate Share:</p>
            <p className="text-foreground">
              🚀 I'm now <span className="text-primary font-semibold">NEXT_ CERTIFIED</span>
              <br />
              The future is unknown. But I'm ready to build it.
              <br />
              <span className="text-muted-foreground">#NEXTCertified #BuildingWhatsNext</span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Government Pitch:</p>
            <p className="text-foreground">
              The countries that certify the most NEXT_ students will lead the AI economy.
              <br />
              <span className="text-muted-foreground">The countries that wait will explain why they fell behind.</span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Social Impact:</p>
            <p className="text-foreground">
              AI doesn't care where you were born. It cares what you create.
              <br />
              <span className="text-muted-foreground">We're giving every child a fair chance at the biggest opportunity in human history.</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
