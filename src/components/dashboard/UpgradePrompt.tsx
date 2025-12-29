import { Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface UpgradePromptProps {
  feature: string;
  description?: string;
  className?: string;
  variant?: "overlay" | "inline" | "card";
}

export function UpgradePrompt({ 
  feature, 
  description, 
  className,
  variant = "card" 
}: UpgradePromptProps) {
  const navigate = useNavigate();

  if (variant === "overlay") {
    return (
      <div className={cn(
        "absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10",
        className
      )}>
        <div className="text-center p-6 max-w-md">
          <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Upgrade to unlock {feature}
          </h3>
          {description && (
            <p className="text-muted-foreground mb-4">{description}</p>
          )}
          <Button onClick={() => navigate("/pricing")}>
            <Sparkles className="h-4 w-4 mr-2" />
            View Plans
          </Button>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={cn(
        "flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border",
        className
      )}>
        <Lock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        <div className="flex-1">
          <span className="text-sm text-muted-foreground">
            Upgrade to access {feature}
          </span>
        </div>
        <Button size="sm" variant="outline" onClick={() => navigate("/pricing")}>
          Upgrade
        </Button>
      </div>
    );
  }

  return (
    <div className={cn(
      "rounded-lg border border-dashed border-border p-8 text-center",
      className
    )}>
      <Lock className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">{feature}</h3>
      {description && (
        <p className="text-muted-foreground mb-4 max-w-md mx-auto">
          {description}
        </p>
      )}
      <Button onClick={() => navigate("/pricing")}>
        <Sparkles className="h-4 w-4 mr-2" />
        Upgrade to Unlock
      </Button>
    </div>
  );
}
