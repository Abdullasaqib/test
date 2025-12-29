import { cn } from "@/lib/utils";
import { BlinkingCursor } from "./blinking-cursor";

interface CursorWordmarkProps {
  word?: "NEXT" | "BUILD" | "LAUNCH" | "CREATE" | string;
  className?: string;
  cursorClassName?: string;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  animated?: boolean;
  subtitle?: string;
  subtitleClassName?: string;
}

const sizeClasses = {
  sm: "text-sm",
  md: "text-xl",
  lg: "text-3xl",
  xl: "text-5xl",
  hero: "text-6xl md:text-8xl lg:text-9xl",
};

const subtitleSizeClasses = {
  sm: "text-[8px]",
  md: "text-[10px]",
  lg: "text-xs",
  xl: "text-sm",
  hero: "text-sm md:text-base lg:text-lg",
};

export const CursorWordmark = ({
  word = "NEXT",
  className,
  cursorClassName,
  size = "md",
  animated = true,
  subtitle,
  subtitleClassName,
}: CursorWordmarkProps) => {
  return (
    <span className="inline-flex flex-col items-center">
      <span 
        className={cn(
          "inline-flex items-baseline font-bold tracking-tight",
          sizeClasses[size],
          className
        )}
      >
        <span>{word}</span>
        <BlinkingCursor 
          className={cn(
            animated ? "cursor-blink" : "",
            cursorClassName
          )} 
          size={size}
        />
      </span>
      {subtitle && (
        <span 
          className={cn(
            "uppercase tracking-[0.3em] font-medium opacity-60",
            subtitleSizeClasses[size],
            subtitleClassName
          )}
        >
          {subtitle}
        </span>
      )}
    </span>
  );
};
