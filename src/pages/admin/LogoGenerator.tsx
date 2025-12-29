import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Download, RefreshCw, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface GeneratedLogo {
  image: string;
  description: string;
  variation: string;
}

const LOGO_VARIATIONS = [
  {
    id: "icon-wordmark",
    name: "Icon + Wordmark",
    prompt: "Include the full text 'NEXT BILLION LAB' below or beside a growth symbol icon showing 1→1B exponential curve"
  },
  {
    id: "icon-only",
    name: "Icon Only",
    prompt: "Create just the symbol/icon showing the 1→1B growth concept, no text. Should work as a favicon or app icon"
  },
  {
    id: "horizontal",
    name: "Horizontal Layout",
    prompt: "Horizontal layout with icon on left and 'NEXT BILLION LAB' text on right, suitable for website headers"
  },
  {
    id: "stacked",
    name: "Stacked Layout",
    prompt: "Square/stacked format with icon above and 'NEXT BILLION LAB' text below, good for social media profiles"
  }
];

export default function LogoGenerator() {
  const [logos, setLogos] = useState<GeneratedLogo[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const { toast } = useToast();

  const generateLogo = async (variation: typeof LOGO_VARIATIONS[0]) => {
    setLoading(variation.id);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-logo', {
        body: { 
          prompt: customPrompt ? `${variation.prompt}\n\nAdditional instructions: ${customPrompt}` : variation.prompt,
          variation: variation.name
        }
      });

      if (error) throw error;
      
      if (data.error) {
        throw new Error(data.error);
      }

      setLogos(prev => [...prev, data]);
      toast({
        title: "Logo generated!",
        description: `${variation.name} variation created successfully.`
      });
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate logo. Please try again.",
        variant: "destructive"
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
    link.download = `nbl-logo-${logo.variation.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.click();
  };

  const clearLogos = () => {
    setLogos([]);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Next Billion Lab Logo Generator
          </h1>
          <p className="text-muted-foreground">
            Generate "1→1B" growth symbol logo variations using AI
          </p>
        </div>

        {/* Custom Prompt */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Custom Instructions (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Add any specific instructions for the logo design... (e.g., 'make it more playful', 'use geometric shapes', 'include a rocket element')"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="min-h-[80px]"
            />
          </CardContent>
        </Card>

        {/* Variation Buttons */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Generate Logo Variations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {LOGO_VARIATIONS.map((variation) => (
                <Button
                  key={variation.id}
                  onClick={() => generateLogo(variation)}
                  disabled={loading !== null}
                  variant="outline"
                  className="h-auto py-4 flex flex-col gap-2"
                >
                  {loading === variation.id ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Sparkles className="h-5 w-5" />
                  )}
                  <span className="text-sm font-medium">{variation.name}</span>
                </Button>
              ))}
            </div>
            <div className="flex gap-4 mt-4">
              <Button 
                onClick={generateAll} 
                disabled={loading !== null}
                className="flex-1"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Sparkles className="h-4 w-4 mr-2" />
                )}
                Generate All Variations
              </Button>
              {logos.length > 0 && (
                <Button variant="outline" onClick={clearLogos}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Generated Logos Grid */}
        {logos.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Generated Logos ({logos.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {logos.map((logo, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-muted flex items-center justify-center p-4">
                      <img 
                        src={logo.image} 
                        alt={`Logo variation: ${logo.variation}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="font-semibold text-foreground">{logo.variation}</h3>
                      {logo.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {logo.description}
                        </p>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => downloadLogo(logo)}
                        className="w-full"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {logos.length === 0 && !loading && (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <Sparkles className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No logos generated yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Click on a variation above to generate your first logo
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
