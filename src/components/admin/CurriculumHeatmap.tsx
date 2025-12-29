import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Mission {
  id: string;
  title: string;
  track: string;
  week: number;
  day: number;
}

interface Evaluation {
  overall_score: number;
  flags?: string[];
}

interface CurriculumHeatmapProps {
  missions: Mission[];
  evaluations: Map<string, Evaluation>;
  onSelectMission: (mission: Mission) => void;
}

export function CurriculumHeatmap({ missions, evaluations, onSelectMission }: CurriculumHeatmapProps) {
  // Group missions by track and week
  const groupedMissions = useMemo(() => {
    const groups: Record<string, Record<number, Mission[]>> = {
      junior: {},
      teen: {},
      advanced: {}
    };
    
    missions.forEach(mission => {
      if (!groups[mission.track]) groups[mission.track] = {};
      if (!groups[mission.track][mission.week]) groups[mission.track][mission.week] = [];
      groups[mission.track][mission.week].push(mission);
    });
    
    // Sort missions by day within each week
    Object.keys(groups).forEach(track => {
      Object.keys(groups[track]).forEach(week => {
        groups[track][parseInt(week)].sort((a, b) => a.day - b.day);
      });
    });
    
    return groups;
  }, [missions]);

  const getScoreColor = (score: number | undefined) => {
    if (score === undefined) return "bg-muted";
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreEmoji = (score: number | undefined) => {
    if (score === undefined) return "⬜";
    if (score >= 80) return "🟢";
    if (score >= 60) return "🟡";
    return "🔴";
  };

  const tracks = ["junior", "teen", "advanced"];
  const weeks = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quality Heatmap by Track & Week</CardTitle>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-green-500" /> 80+ Good
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-yellow-500" /> 60-79 Needs Work
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-red-500" /> &lt;60 Critical
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-muted" /> Not Evaluated
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="space-y-6">
            {tracks.map(track => (
              <div key={track} className="space-y-2">
                <h3 className="font-semibold capitalize">{track} Track</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="text-left text-xs text-muted-foreground p-1 w-16">Week</th>
                        {[1, 2, 3, 4, 5].map(day => (
                          <th key={day} className="text-center text-xs text-muted-foreground p-1">
                            Day {day}
                          </th>
                        ))}
                        <th className="text-center text-xs text-muted-foreground p-1 w-20">
                          Avg
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {weeks.map(week => {
                        const weekMissions = groupedMissions[track]?.[week] || [];
                        const weekScores = weekMissions
                          .map(m => evaluations.get(m.id)?.overall_score)
                          .filter((s): s is number => s !== undefined);
                        const weekAvg = weekScores.length > 0
                          ? Math.round(weekScores.reduce((a, b) => a + b, 0) / weekScores.length)
                          : undefined;
                        
                        return (
                          <tr key={week} className="border-t border-border/50">
                            <td className="text-xs text-muted-foreground p-1">
                              Week {week}
                            </td>
                            {[1, 2, 3, 4, 5].map(day => {
                              const mission = weekMissions.find(m => m.day === day);
                              const evaluation = mission ? evaluations.get(mission.id) : undefined;
                              const score = evaluation?.overall_score;
                              const hasFlags = evaluation?.flags && evaluation.flags.length > 0;
                              
                              return (
                                <td key={day} className="p-1 text-center">
                                  {mission ? (
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          onClick={() => onSelectMission(mission)}
                                          className={`w-10 h-10 rounded-lg ${getScoreColor(score)} 
                                            hover:ring-2 hover:ring-primary transition-all
                                            flex items-center justify-center text-white font-bold text-sm
                                            ${hasFlags ? 'ring-2 ring-red-500' : ''}`}
                                        >
                                          {score ?? "?"}
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent side="top" className="max-w-xs">
                                        <div className="space-y-1">
                                          <p className="font-semibold">{mission.title}</p>
                                          <p className="text-xs">Score: {score ?? "Not evaluated"}</p>
                                          {hasFlags && (
                                            <p className="text-xs text-red-400">
                                              ⚠️ {evaluation?.flags?.length} issues found
                                            </p>
                                          )}
                                        </div>
                                      </TooltipContent>
                                    </Tooltip>
                                  ) : (
                                    <span className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center text-muted-foreground text-xs">
                                      -
                                    </span>
                                  )}
                                </td>
                              );
                            })}
                            <td className="p-1 text-center">
                              <span className={`px-2 py-1 rounded text-xs font-medium
                                ${weekAvg !== undefined 
                                  ? weekAvg >= 80 
                                    ? 'bg-green-500/20 text-green-500' 
                                    : weekAvg >= 60 
                                      ? 'bg-yellow-500/20 text-yellow-500'
                                      : 'bg-red-500/20 text-red-500'
                                  : 'bg-muted text-muted-foreground'}`}
                              >
                                {weekAvg ?? "-"}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}