import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InvestorPersona {
  id: string;
  name: string;
  style: string;
  tagline: string;
  personality: string;
  difficulty: number;
  color: string;
  emoji: string;
}

export const INVESTORS: InvestorPersona[] = [
  {
    id: "mentor",
    name: "The Mentor",
    style: "Barbara Corcoran",
    tagline: "I believe in YOU",
    personality: "Warm, encouraging, focuses on founder potential",
    difficulty: 1,
    color: "from-pink-500 to-rose-500",
    emoji: "🤗",
  },
  {
    id: "visionary",
    name: "The Visionary",
    style: "Mark Cuban",
    tagline: "Think BIGGER",
    personality: "Big-picture, excited by disruption and scale",
    difficulty: 2,
    color: "from-blue-500 to-cyan-500",
    emoji: "🚀",
  },
  {
    id: "brand_builder",
    name: "The Brand Builder",
    style: "Daymond John",
    tagline: "What's your story?",
    personality: "Branding expert, community builder",
    difficulty: 2,
    color: "from-purple-500 to-violet-500",
    emoji: "👑",
  },
  {
    id: "numbers",
    name: "The Numbers Guy",
    style: "Kevin O'Leary",
    tagline: "Show me the MONEY",
    personality: "Blunt, demanding, all about financials",
    difficulty: 3,
    color: "from-green-500 to-emerald-500",
    emoji: "💰",
  },
  {
    id: "retail_queen",
    name: "The Retail Queen",
    style: "Lori Greiner",
    tagline: "Will it SELL?",
    personality: "Product expert, customer-focused",
    difficulty: 3,
    color: "from-amber-500 to-orange-500",
    emoji: "👸",
  },
];

interface InvestorSelectProps {
  selectedInvestor: string | null;
  onSelect: (id: string) => void;
}

export function InvestorSelect({ selectedInvestor, onSelect }: InvestorSelectProps) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Choose Your Investor</h2>
        <p className="text-muted-foreground">Who will you pitch to today?</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {INVESTORS.map((investor) => {
          const isSelected = selectedInvestor === investor.id;
          
          return (
            <Card
              key={investor.id}
              className={cn(
                "relative cursor-pointer transition-all duration-300 overflow-hidden group",
                isSelected && "ring-2 ring-primary scale-[1.02]",
                !isSelected && "hover:scale-[1.02] hover:shadow-lg"
              )}
              onClick={() => onSelect(investor.id)}
            >
              {/* Gradient background */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-10 transition-opacity",
                investor.color,
                isSelected && "opacity-20"
              )} />
              
              <CardContent className="p-5 relative">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{investor.emoji}</span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < investor.difficulty 
                            ? "fill-amber-400 text-amber-400" 
                            : "text-muted-foreground/30"
                        )}
                      />
                    ))}
                  </div>
                </div>
                
                <h3 className="font-bold text-lg">{investor.name}</h3>
                <p className="text-sm text-muted-foreground italic mb-2">
                  "{investor.tagline}"
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  {investor.personality}
                </p>
                
                <Badge variant="outline" className="text-xs">
                  {investor.style}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
