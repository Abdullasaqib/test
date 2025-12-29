import { Zap, Star, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SuperpowerCardsProps {
  superpowers: string[];
  growthEdges: string[];
}

const superpowerIcons = [Zap, Star, Trophy];

export function SuperpowerCards({ superpowers, growthEdges }: SuperpowerCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Superpowers */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            Your Superpowers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {superpowers.length > 0 ? (
            superpowers.map((power, index) => {
              const Icon = superpowerIcons[index] || Star;
              return (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-background">
                  <div className="p-1.5 rounded-md bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{power}</span>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground">Complete more missions to discover your superpowers!</p>
          )}
        </CardContent>
      </Card>

      {/* Growth Edges */}
      <Card className="border-orange-500/20 bg-orange-500/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Star className="h-4 w-4 text-orange-500" />
            Growth Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {growthEdges.length > 0 ? (
            growthEdges.map((edge, index) => (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-background">
                <div className="p-1.5 rounded-md bg-orange-500/10">
                  <Star className="h-4 w-4 text-orange-500" />
                </div>
                <span className="text-sm font-medium">{edge}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Keep building to uncover areas for growth!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
