import { Badge } from "@/components/ui/badge";
import { Search, Lightbulb, Wrench, BookOpen } from "lucide-react";

type Pillar = 'discover' | 'design' | 'build' | 'explore';

interface PillarBadgeProps {
  pillar: Pillar;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const pillarConfig: Record<Pillar, { 
  label: string; 
  icon: typeof Search; 
  colors: string;
  description: string;
}> = {
  discover: {
    label: 'DISCOVER',
    icon: Search,
    colors: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    description: 'Find real problems worth solving',
  },
  design: {
    label: 'DESIGN',
    icon: Lightbulb,
    colors: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    description: 'Create solutions that work',
  },
  build: {
    label: 'BUILD',
    icon: Wrench,
    colors: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    description: 'Make it real with AI tools',
  },
  explore: {
    label: 'EXPLORE',
    icon: BookOpen,
    colors: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    description: 'Deepen your knowledge',
  },
};

export function PillarBadge({ pillar, size = 'md', showLabel = true }: PillarBadgeProps) {
  const config = pillarConfig[pillar];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-3.5 w-3.5',
    lg: 'h-4 w-4',
  };

  return (
    <Badge 
      variant="outline" 
      className={`${config.colors} ${sizeClasses[size]} gap-1.5 font-medium`}
    >
      <Icon className={iconSizes[size]} />
      {showLabel && config.label}
    </Badge>
  );
}

export function getPillarInfo(pillar: Pillar) {
  return pillarConfig[pillar];
}

export { pillarConfig };
