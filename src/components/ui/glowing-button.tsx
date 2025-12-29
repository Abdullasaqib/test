import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const glowingButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        neural: "bg-card text-[hsl(var(--gold))] border-2 border-[hsl(var(--gold))] hover:scale-105 shadow-[0_0_20px_hsl(45,95%,55%,0.3)] hover:shadow-[0_0_40px_hsl(45,95%,55%,0.5)] hover:bg-[hsl(var(--gold))] hover:text-card",
        cyber: "bg-[hsl(var(--gold))] text-card hover:scale-105 shadow-[0_0_20px_hsl(45,95%,55%,0.4)] hover:shadow-[0_0_40px_hsl(45,95%,55%,0.6)]",
        holographic: "bg-gradient-holographic text-card hover:scale-105 shadow-lg bg-[length:200%_100%] animate-shimmer font-bold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "neural",
      size: "default",
    },
  }
);

export interface GlowingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glowingButtonVariants> {
  asChild?: boolean;
}

const GlowingButton = React.forwardRef<HTMLButtonElement, GlowingButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(glowingButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
GlowingButton.displayName = "GlowingButton";

export { GlowingButton, glowingButtonVariants };
