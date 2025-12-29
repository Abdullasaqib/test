import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

interface SkillData {
  name: string;
  value: number;
  fullMark: number;
}

interface SkillsRadarChartProps {
  data: SkillData[];
}

export function SkillsRadarChart({ data }: SkillsRadarChartProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid 
            stroke="hsl(var(--border))" 
            strokeOpacity={0.5}
          />
          <PolarAngleAxis
            dataKey="name"
            tick={{ 
              fill: "hsl(var(--muted-foreground))", 
              fontSize: 11,
              fontWeight: 500
            }}
            tickLine={false}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
            tickCount={5}
            axisLine={false}
          />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.25}
            strokeWidth={2}
            dot={{
              r: 4,
              fill: "hsl(var(--primary))",
              strokeWidth: 0
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
