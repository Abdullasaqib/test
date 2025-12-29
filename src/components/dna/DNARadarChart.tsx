import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Target } from "lucide-react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

interface DNARadarChartProps {
  analysisData: Record<string, unknown>;
}

export function DNARadarChart({ analysisData }: DNARadarChartProps) {
  const skillTotals = (analysisData.skillTotals as Record<string, number>) || {};
  const pitchAvg = (analysisData.pitchAvg as Record<string, number>) || {};

  // Combine skills and pitch data for comprehensive radar
  const radarData = [
    // Core skills (normalize to 0-100)
    { name: 'Problem', value: Math.min((skillTotals.PROBLEM_ANALYSIS || 0), 100) },
    { name: 'AI', value: Math.min((skillTotals.AI_COLLABORATION || 0), 100) },
    { name: 'Research', value: Math.min((skillTotals.CUSTOMER_RESEARCH || 0), 100) },
    { name: 'Digital', value: Math.min((skillTotals.DIGITAL_LITERACY || 0), 100) },
    { name: 'Business', value: Math.min((skillTotals.ENTREPRENEURSHIP || 0), 100) },
    { name: 'Comms', value: Math.min((skillTotals.COMMUNICATION || 0), 100) },
    { name: 'Grit', value: Math.min((skillTotals.RESILIENCE || 0), 100) },
    { name: 'Focus', value: Math.min((skillTotals.SELF_MANAGEMENT || 0), 100) },
    // Pitch dimensions (scale from 0-15 to 0-100)
    { name: 'Confidence', value: Math.min((pitchAvg.confidence || 0) * 6.67, 100) },
    { name: 'Persuasion', value: Math.min((pitchAvg.persuasion || 0) * 6.67, 100) },
  ];

  const hasData = radarData.some(d => d.value > 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          Your Strength Map 🗺️
        </CardTitle>
        <CardDescription className="text-xs">
          All your powers in one view!
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                <PolarGrid stroke="hsl(var(--muted-foreground))" strokeOpacity={0.2} />
                <PolarAngleAxis
                  dataKey="name"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                  tickLine={false}
                />
                <Radar
                  name="Strengths"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">
            Complete missions to see your powers grow! 🌱
          </div>
        )}
      </CardContent>
    </Card>
  );
}
