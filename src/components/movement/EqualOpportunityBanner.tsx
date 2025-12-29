import { Globe } from "lucide-react";

interface EqualOpportunityBannerProps {
  variant?: "default" | "compact";
}

export function EqualOpportunityBanner({ variant = "default" }: EqualOpportunityBannerProps) {
  if (variant === "compact") {
    return (
      <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-3 flex items-center gap-3">
        <Globe className="h-5 w-5 text-primary flex-shrink-0" />
        <p className="text-sm text-foreground">
          <span className="font-medium">AI doesn't care where you were born.</span>{" "}
          <span className="text-muted-foreground">It cares what you can create.</span>
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 p-6 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,hsl(var(--primary)/0.15),transparent_50%)]" />
      
      <div className="relative flex flex-col md:flex-row items-center gap-4 md:gap-6">
        <div className="flex-shrink-0">
          <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center">
            <Globe className="h-7 w-7 text-primary" />
          </div>
        </div>
        
        <div className="text-center md:text-left">
          <p className="text-lg md:text-xl font-semibold text-foreground mb-1">
            AI doesn't care where you were born. It cares what you can create.
          </p>
          <p className="text-muted-foreground">
            We're giving every child a fair chance at the biggest opportunity in human history.
          </p>
        </div>
      </div>
    </div>
  );
}
