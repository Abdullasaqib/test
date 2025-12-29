import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface MomentumTrackerProps {
  assessments: {
    skill_category: string;
    combined_score: number;
    momentum_change: number;
  }[];
}

export function MomentumTracker({ assessments }: MomentumTrackerProps) {
  // Simulate week-over-week data (in production, this would come from skill_history)
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Current'];
  
  const chartData = weeks.map((week, index) => {
    const multiplier = 0.6 + (index * 0.1);
    const data: Record<string, string | number> = { week };
    
    assessments?.forEach(a => {
      // Simulate historical data based on current score
      data[a.skill_category] = Math.round(a.combined_score * multiplier);
    });
    
    return data;
  });

  // Find fastest growing skill
  const fastestGrowing = assessments?.reduce((best, current) => {
    if (!best || current.momentum_change > best.momentum_change) {
      return current;
    }
    return best;
  }, assessments[0]);

  const colors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
    'hsl(var(--primary))',
    'hsl(var(--accent))',
    'hsl(var(--secondary))',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          Momentum Tracker
        </CardTitle>
        {fastestGrowing && (
          <CardDescription>
            Fastest growing: <span className="text-green-500 font-medium">
              {fastestGrowing.skill_category.replace(/_/g, ' ')} (+{fastestGrowing.momentum_change}%)
            </span>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="week" 
                tick={{ fontSize: 12 }}
                className="fill-muted-foreground"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                className="fill-muted-foreground"
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              {assessments?.slice(0, 4).map((a, i) => (
                <Line
                  key={a.skill_category}
                  type="monotone"
                  dataKey={a.skill_category}
                  stroke={colors[i]}
                  strokeWidth={2}
                  dot={{ fill: colors[i], strokeWidth: 2 }}
                  name={a.skill_category.replace(/_/g, ' ')}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
