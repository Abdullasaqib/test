import { useState } from 'react';
import { Loader2, Download, Sparkles, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

import nextWordmark from '@/assets/next-wordmark.svg';
import nextWordmarkWhite from '@/assets/next-wordmark-white.svg';
import nextIcon from '@/assets/next-icon.svg';
import nextStacked from '@/assets/next-stacked.svg';

interface GeneratedLogo {
  image: string;
  description: string;
  variation: string;
}

const LOGO_VARIATIONS = [
  { id: 'wordmark', name: 'Wordmark', prompt: 'NEXT_ wordmark with blinking underscore cursor accent in gold' },
  { id: 'icon-only', name: 'Icon Only', prompt: 'Just the underscore _ symbol as a minimal icon, gold on dark background' },
  { id: 'full-name', name: 'Full Name', prompt: 'NEXT BILLION LAB_ with underscore accent at the end' },
  { id: 'stacked', name: 'Stacked', prompt: 'NEXT_ on top line, BILLION LAB below, stacked vertically' },
];

const EXISTING_LOGOS = [
  { name: 'Primary Wordmark', path: nextWordmark, description: 'NEXT_ wordmark (blue text, gold underscore)' },
  { name: 'White Wordmark', path: nextWordmarkWhite, description: 'NEXT_ for dark backgrounds' },
  { name: 'Icon', path: nextIcon, description: 'Underscore icon for app/favicon use' },
  { name: 'Stacked', path: nextStacked, description: 'Two-line stacked version' },
];

export function LogoGeneratorSection() {
  const [logos, setLogos] = useState<GeneratedLogo[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');

  const generateLogo = async (variation: typeof LOGO_VARIATIONS[0]) => {
    setLoading(variation.id);
    try {
      const { data, error } = await supabase.functions.invoke('generate-logo', {
        body: { 
          prompt: customPrompt,
          variation: variation.prompt 
        },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setLogos(prev => [...prev, {
        image: data.image,
        description: data.description,
        variation: variation.name
      }]);

      toast({
        title: 'Logo Generated!',
        description: `${variation.name} variation created successfully`,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to generate logo';
      toast({
        title: 'Generation Failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setLoading(null);
    }
  };

  const generateAll = async () => {
    for (const variation of LOGO_VARIATIONS) {
      await generateLogo(variation);
    }
  };

  const downloadLogo = (logo: GeneratedLogo) => {
    const link = document.createElement('a');
    link.href = logo.image;
    link.download = `next-${logo.variation.toLowerCase().replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadExistingLogo = async (logo: typeof EXISTING_LOGOS[0]) => {
    try {
      const response = await fetch(logo.path);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `next-${logo.name.toLowerCase().replace(/\s+/g, '-')}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Downloaded!',
        description: `${logo.name} saved successfully`,
      });
    } catch {
      toast({
        title: 'Download failed',
        description: 'Could not download the logo',
        variant: 'destructive',
      });
    }
  };

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Logo System</h2>
        <p className="text-muted-foreground">
          The NEXT_ brand identity — the underscore represents the moment before creation
        </p>
      </div>

      {/* Existing Logos - Primary Section */}
      <Card className="glass-card border-primary/30">
        <CardHeader>
          <CardTitle>Official Logos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXISTING_LOGOS.map((logo) => (
              <div
                key={logo.name}
                className="glass-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all"
              >
                <div className={`h-32 flex items-center justify-center p-6 ${logo.name.includes('White') || logo.name === 'Icon' ? 'bg-card' : 'bg-background'}`}>
                  <img
                    src={logo.path}
                    alt={logo.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="p-4 space-y-2 border-t border-border/50">
                  <p className="font-semibold text-foreground">{logo.name}</p>
                  <p className="text-sm text-muted-foreground">{logo.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => downloadExistingLogo(logo)}
                  >
                    <Download className="w-3 h-3 mr-2" />
                    Download SVG
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Logo Generator */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold" />
            AI Logo Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Generate custom NEXT_ brand variations using AI — experiment with styles while keeping the underscore concept
          </p>
          
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Custom Instructions (Optional)
            </label>
            <Input
              placeholder="Add specific style instructions... (e.g., 'neon glow', 'retro pixel', '3D metallic')"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="bg-card/50 border-border/50"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {LOGO_VARIATIONS.map((variation) => (
              <Button
                key={variation.id}
                variant="outline"
                onClick={() => generateLogo(variation)}
                disabled={loading !== null}
                className="border-border/50 hover:border-primary/50"
              >
                {loading === variation.id ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                {variation.name}
              </Button>
            ))}
            <Button
              onClick={generateAll}
              disabled={loading !== null}
              className="ml-auto bg-gold hover:bg-gold/90 text-background"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              Generate All
            </Button>
          </div>
        </CardContent>
      </Card>

      {logos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Generated Logos</h3>
            <Button variant="ghost" size="sm" onClick={() => setLogos([])}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {logos.map((logo, index) => (
              <div key={index} className="glass-card rounded-xl overflow-hidden border border-border/50">
                <div className="bg-card/50 p-4 flex items-center justify-center min-h-[200px]">
                  <img
                    src={logo.image}
                    alt={`Generated ${logo.variation} logo`}
                    className="max-h-48 object-contain"
                  />
                </div>
                <div className="p-4 space-y-2 border-t border-border/50">
                  <p className="font-medium text-foreground">{logo.variation}</p>
                  {logo.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">{logo.description}</p>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => downloadLogo(logo)}
                  >
                    <Download className="w-3 h-3 mr-2" />
                    Download PNG
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
