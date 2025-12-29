import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ColorSwatch {
  name: string;
  hex: string;
  hsl: string;
  usage: string;
  category: 'primary' | 'secondary' | 'utility';
}

const BRAND_COLORS: ColorSwatch[] = [
  { name: 'Deep Navy', hex: '#0A0F1C', hsl: '222 50% 8%', usage: 'Primary background', category: 'primary' },
  { name: 'Electric Blue', hex: '#3B82F6', hsl: '217 91% 60%', usage: 'Primary brand color, CTAs, links', category: 'primary' },
  { name: 'Warm Gold', hex: '#F59E0B', hsl: '38 92% 50%', usage: 'Highlights, achievements, premium features', category: 'primary' },
  { name: 'Card Surface', hex: '#111827', hsl: '221 39% 11%', usage: 'Card backgrounds, elevated surfaces', category: 'secondary' },
  { name: 'Border', hex: '#1F2937', hsl: '215 28% 17%', usage: 'Borders, dividers', category: 'secondary' },
  { name: 'Muted Text', hex: '#9CA3AF', hsl: '218 11% 65%', usage: 'Secondary text, labels', category: 'secondary' },
  { name: 'Success', hex: '#10B981', hsl: '160 84% 39%', usage: 'Success states, completion', category: 'utility' },
  { name: 'Warning', hex: '#F97316', hsl: '25 95% 53%', usage: 'Warnings, attention', category: 'utility' },
  { name: 'Error', hex: '#EF4444', hsl: '0 84% 60%', usage: 'Errors, destructive actions', category: 'utility' },
  { name: 'White', hex: '#FFFFFF', hsl: '0 0% 100%', usage: 'Primary text on dark backgrounds', category: 'utility' },
];

export function ColorPalette() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (hex: string, name: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    toast({
      title: 'Copied!',
      description: `${name} (${hex}) copied to clipboard`,
    });
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const categories = [
    { key: 'primary', label: 'Core Brand' },
    { key: 'secondary', label: 'Surfaces & Borders' },
    { key: 'utility', label: 'Utility Colors' },
  ];

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Color Palette</h2>
        <p className="text-muted-foreground">Deep Navy Dark Mode theme — click any color to copy</p>
      </div>

      {categories.map((category) => (
        <div key={category.key} className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b border-border/50 pb-2">
            {category.label}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BRAND_COLORS.filter(c => c.category === category.key).map((color) => (
              <button
                key={color.hex}
                onClick={() => copyToClipboard(color.hex, color.name)}
                className="group relative glass-card border border-border/50 rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-glow-blue transition-all duration-200 text-left"
              >
                <div 
                  className="h-20 w-full" 
                  style={{ backgroundColor: color.hex }}
                />
                <div className="p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{color.name}</span>
                    {copiedColor === color.hex ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  <p className="text-sm font-mono text-primary">{color.hex}</p>
                  <p className="text-xs text-muted-foreground">{color.usage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Gradients */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground border-b border-border/50 pb-2">
          Gradients
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="glass-card rounded-xl overflow-hidden border border-border/50">
            <div className="h-24 bg-gradient-to-r from-primary via-primary/80 to-gold" />
            <div className="p-4">
              <p className="font-semibold text-foreground">Primary Gradient</p>
              <p className="text-xs text-muted-foreground font-mono">from-primary via-primary/80 to-gold</p>
            </div>
          </div>
          <div className="glass-card rounded-xl overflow-hidden border border-border/50">
            <div className="h-24 bg-gradient-to-br from-background via-card to-primary/20" />
            <div className="p-4">
              <p className="font-semibold text-foreground">Subtle Gradient</p>
              <p className="text-xs text-muted-foreground font-mono">from-background via-card to-primary/20</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
