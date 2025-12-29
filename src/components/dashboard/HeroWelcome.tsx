import { Badge } from "@/components/ui/badge";
import { Zap, Sun, Moon, Sunset } from "lucide-react";

interface TierBadgeInfo {
  name: string;
  color: string;
}

interface HeroWelcomeProps {
  firstName: string;
  tierBadge?: TierBadgeInfo | null;
}

export function HeroWelcome({ firstName, tierBadge }: HeroWelcomeProps) {
  const hour = new Date().getHours();
  
  const getGreeting = () => {
    if (hour < 12) {
      return { text: "Good morning", icon: Sun };
    } else if (hour < 17) {
      return { text: "Good afternoon", icon: Sunset };
    } else {
      return { text: "Good evening", icon: Moon };
    }
  };

  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
          <GreetingIcon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            {greeting.text}, {firstName}!
          </h1>
          <p className="text-sm text-muted-foreground tracking-wide">
            You're building what's NEXT_
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {tierBadge && (
          <Badge variant="secondary" className={`${tierBadge.color} gap-1 px-3 py-1.5 font-semibold`}>
            {tierBadge.name}
          </Badge>
        )}
        <Zap className="h-5 w-5 text-primary animate-pulse" />
      </div>
    </div>
  );
}
