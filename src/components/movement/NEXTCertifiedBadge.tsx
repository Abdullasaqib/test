import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface NEXTCertifiedBadgeProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function NEXTCertifiedBadge({ size = "md", className }: NEXTCertifiedBadgeProps) {
  const sizes = {
    sm: {
      container: "px-3 py-1.5",
      icon: "h-4 w-4",
      text: "text-sm",
      subtitle: "text-xs"
    },
    md: {
      container: "px-4 py-2",
      icon: "h-5 w-5",
      text: "text-base",
      subtitle: "text-xs"
    },
    lg: {
      container: "px-6 py-3",
      icon: "h-6 w-6",
      text: "text-lg",
      subtitle: "text-sm"
    }
  };

  const s = sizes[size];

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-2 rounded-full",
        "bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20",
        "border border-primary/30",
        s.container,
        className
      )}
    >
      <Award className={cn("text-primary", s.icon)} />
      <div className="flex flex-col leading-tight">
        <span className={cn("font-bold text-primary", s.text)}>
          NEXT_ CERTIFIED
        </span>
        <span className={cn("text-muted-foreground", s.subtitle)}>
          Ready for the unknown future
        </span>
      </div>
    </div>
  );
}
