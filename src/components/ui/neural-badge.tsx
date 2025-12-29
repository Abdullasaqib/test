import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface NeuralBadgeProps {
  text: string;
  subtext?: string;
  className?: string;
}

export const NeuralBadge = ({ text, subtext, className }: NeuralBadgeProps) => {
  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      {/* Hexagon Shape */}
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="absolute animate-pulse-glow"
      >
        <defs>
          <linearGradient id="badge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(220, 80%, 50%)" />
            <stop offset="50%" stopColor="hsl(262, 83%, 58%)" />
            <stop offset="100%" stopColor="hsl(189, 94%, 50%)" />
          </linearGradient>
        </defs>
        <polygon
          points="100,10 170,50 170,130 100,170 30,130 30,50"
          fill="url(#badge-gradient)"
          opacity="0.8"
        />
      </svg>

      {/* Inner Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-32 h-32">
        <Trophy className="w-12 h-12 text-gold mb-2 neural-glow" />
        <div className="text-xs font-bold text-primary uppercase tracking-wide">{text}</div>
        {subtext && (
          <div className="text-[10px] text-muted-foreground uppercase">{subtext}</div>
        )}
      </div>
    </div>
  );
};
