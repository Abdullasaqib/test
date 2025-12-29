import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, AlertTriangle } from 'lucide-react';

const LOGO_RULES = {
  dos: [
    'Use on dark backgrounds (preferred)',
    'Use on light backgrounds with dark version',
    'Maintain minimum clear space (equal to logo height on all sides)',
    'Use full color version when possible',
    'Keep proportions when resizing'
  ],
  donts: [
    'Stretch or distort the logo',
    'Add drop shadows or effects',
    'Place on busy backgrounds',
    'Rotate the logo',
    'Change the colors',
    'Use low-resolution versions',
    'Crop any part of the logo'
  ]
};

const MIN_SIZES = [
  { context: 'Print', size: '25mm / 1 inch' },
  { context: 'Digital', size: '120px width' },
  { context: 'Favicon', size: '32x32px (icon only)' },
  { context: 'Social Profile', size: '180x180px' }
];

const BACKGROUNDS = [
  { name: 'Deep Navy', bg: 'bg-background', text: 'text-foreground', logo: 'Full color (preferred)' },
  { name: 'Card Surface', bg: 'bg-card', text: 'text-foreground', logo: 'Full color' },
  { name: 'Primary Blue', bg: 'bg-primary', text: 'text-primary-foreground', logo: 'White version' },
  { name: 'Gold Accent', bg: 'bg-gold', text: 'text-background', logo: 'Dark version' },
  { name: 'White', bg: 'bg-white', text: 'text-background', logo: 'Dark version' },
  { name: 'Light Gray', bg: 'bg-slate-100', text: 'text-background', logo: 'Dark version' }
];

export function UsageGuidelines() {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Usage Guidelines</h2>
        <p className="text-muted-foreground">Rules for logo usage, sizing, and placement</p>
      </div>

      {/* Logo Do's and Don'ts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-card border-green-500/30 bg-green-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Check className="w-5 h-5" />
              Logo Do's
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {LOGO_RULES.dos.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="glass-card border-red-500/30 bg-red-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <X className="w-5 h-5" />
              Logo Don'ts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {LOGO_RULES.donts.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                  <X className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Minimum Sizes */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-gold" />
            Minimum Sizes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MIN_SIZES.map((item) => (
              <div key={item.context} className="text-center p-4 glass-card rounded-lg border border-border/50">
                <p className="font-semibold text-foreground">{item.context}</p>
                <p className="text-sm text-primary">{item.size}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Background Usage */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle>Background Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {BACKGROUNDS.map((item) => (
              <div 
                key={item.name} 
                className={`${item.bg} ${item.text} p-6 rounded-lg border border-border/50 text-center`}
              >
                <p className="font-bold text-lg mb-1">Next Billion Lab</p>
                <p className="text-xs opacity-75">{item.name}</p>
                <p className="text-xs mt-2 font-medium">{item.logo}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Clear Space */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle>Clear Space</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Always maintain a minimum clear space around the logo equal to the height of the "N" in "Next". 
            This ensures the logo is never crowded by other elements.
          </p>
          <div className="bg-card/50 p-8 rounded-lg border-2 border-dashed border-primary/30 text-center">
            <div className="inline-block border-2 border-primary border-dashed p-4">
              <span className="text-2xl font-bold text-primary">Next Billion Lab</span>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Dashed line represents minimum clear space
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
