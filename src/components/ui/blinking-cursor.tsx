import { cn } from "@/lib/utils";

interface BlinkingCursorProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
}

const sizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-2xl",
  xl: "text-4xl",
  hero: "text-6xl md:text-8xl lg:text-9xl",
};

export const BlinkingCursor = ({ 
  className, 
  size = "md" 
}: BlinkingCursorProps) => {
  return (
    <span 
      className={cn(
        "cursor-blink font-mono font-bold",
        sizeClasses[size],
        // Only apply default color if no color class is provided
        !className?.includes("text-") && "text-gold",
        className
      )}
      aria-hidden="true"
    >
      _
    </span>
  );
};
