import * as React from "react";
import { cn } from "@/lib/utils";

const GlowingCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { glowColor?: string }
>(({ className, glowColor = "hsl(45, 95%, 55%)", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-xl neural-border",
      className
    )}
    style={{
      boxShadow: `0 10px 40px -10px ${glowColor}40`,
    }}
    {...props}
  />
));
GlowingCard.displayName = "GlowingCard";

export { GlowingCard };
