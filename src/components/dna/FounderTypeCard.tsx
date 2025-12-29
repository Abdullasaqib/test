import { Palette, BarChart3, Rocket, Hammer, Target, Star, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FounderTypeCardProps {
  founderType: string;
  description: string | null;
  gradient: string;
}

const iconMap: Record<string, React.ElementType> = {
  'The Creative': Palette,
  'The Analyst': BarChart3,
  'The Hustler': Rocket,
  'The Builder': Hammer,
  'The Strategist': Target,
};

export function FounderTypeCard({ founderType, description, gradient }: FounderTypeCardProps) {
  const Icon = iconMap[founderType] || Star;

  return (
    <Card className={cn(
      "relative overflow-hidden border-0",
      "bg-gradient-to-br",
      gradient
    )}>
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute top-2 right-2">
        <Sparkles className="h-6 w-6 text-white/40" />
      </div>
      <CardContent className="relative p-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
            <Icon className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-white/70 uppercase tracking-wider">Your Founder Type</p>
            <h2 className="text-2xl font-bold">{founderType}</h2>
          </div>
        </div>
        {description && (
          <p className="text-white/90 text-sm leading-relaxed">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
