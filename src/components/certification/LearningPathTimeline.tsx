import { CheckCircle2, Circle, Lock, PlayCircle } from "lucide-react";

interface Phase {
  name: string;
  weeks: string;
  description: string;
  color: string;
}

interface LearningPathTimelineProps {
  currentPhase?: number;
  completedPhases?: number[];
}

const phases: Phase[] = [
  {
    name: "DISCOVER",
    weeks: "Weeks 1-2",
    description: "Find problems worth solving",
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "VALIDATE",
    weeks: "Weeks 3-4",
    description: "Test with real customers",
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "BUILD",
    weeks: "Weeks 5-7",
    description: "Create your MVP with AI",
    color: "from-amber-500 to-orange-500"
  },
  {
    name: "LAUNCH",
    weeks: "Weeks 8-10",
    description: "Get your first users",
    color: "from-green-500 to-emerald-500"
  },
  {
    name: "PITCH",
    weeks: "Weeks 11-12",
    description: "Present at Demo Day",
    color: "from-red-500 to-rose-500"
  }
];

export function LearningPathTimeline({ 
  currentPhase = 0, 
  completedPhases = [] 
}: LearningPathTimelineProps) {
  const getPhaseStatus = (index: number) => {
    if (completedPhases.includes(index)) return 'completed';
    if (index === currentPhase) return 'current';
    if (index < currentPhase) return 'available';
    return 'locked';
  };

  const getStatusIcon = (status: string, color: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case 'current':
        return <PlayCircle className={`h-6 w-6 bg-gradient-to-r ${color} text-white rounded-full`} />;
      case 'available':
        return <Circle className="h-6 w-6 text-primary" />;
      default:
        return <Lock className="h-6 w-6 text-muted-foreground" />;
    }
  };

  return (
    <div className="relative">
      {/* Desktop Timeline */}
      <div className="hidden md:flex items-start justify-between relative">
        {/* Connecting Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
        <div 
          className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 transition-all duration-500"
          style={{ width: `${(currentPhase / (phases.length - 1)) * 100}%` }}
        />

        {phases.map((phase, index) => {
          const status = getPhaseStatus(index);
          
          return (
            <div 
              key={phase.name}
              className={`
                relative flex flex-col items-center text-center w-1/5
                ${status === 'locked' ? 'opacity-50' : ''}
              `}
            >
              {/* Node */}
              <div className={`
                relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 bg-background
                ${status === 'completed' ? 'border-green-500' : ''}
                ${status === 'current' ? 'border-primary ring-4 ring-primary/20' : ''}
                ${status === 'available' ? 'border-primary/50' : ''}
                ${status === 'locked' ? 'border-muted' : ''}
              `}>
                {status === 'completed' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : status === 'current' ? (
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${phase.color} animate-pulse`} />
                ) : (
                  <div className="w-3 h-3 rounded-full bg-muted" />
                )}
              </div>

              {/* Label */}
              <div className="mt-3 space-y-1">
                <div className={`
                  text-xs font-bold tracking-wider
                  ${status === 'current' ? `bg-gradient-to-r ${phase.color} bg-clip-text text-transparent` : ''}
                  ${status === 'completed' ? 'text-green-500' : ''}
                  ${status === 'locked' ? 'text-muted-foreground' : 'text-foreground'}
                `}>
                  {phase.name}
                </div>
                <div className="text-[10px] text-muted-foreground font-medium">
                  {phase.weeks}
                </div>
                <div className="text-xs text-muted-foreground max-w-[100px]">
                  {phase.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Timeline */}
      <div className="md:hidden space-y-3">
        {phases.map((phase, index) => {
          const status = getPhaseStatus(index);
          
          return (
            <div 
              key={phase.name}
              className={`
                flex items-center gap-3 p-3 rounded-lg border
                ${status === 'completed' ? 'bg-green-500/5 border-green-500/20' : ''}
                ${status === 'current' ? 'bg-primary/5 border-primary/30' : ''}
                ${status === 'locked' ? 'bg-muted/30 border-border/50 opacity-60' : 'border-border/50'}
              `}
            >
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full
                ${status === 'completed' ? 'bg-green-500' : ''}
                ${status === 'current' ? `bg-gradient-to-r ${phase.color}` : ''}
                ${status !== 'completed' && status !== 'current' ? 'bg-muted' : ''}
              `}>
                {status === 'completed' ? (
                  <CheckCircle2 className="h-4 w-4 text-white" />
                ) : (
                  <span className="text-xs font-bold text-white">{index + 1}</span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${status === 'current' ? 'text-primary' : ''}`}>
                    {phase.name}
                  </span>
                  <span className="text-xs text-muted-foreground">{phase.weeks}</span>
                </div>
                <p className="text-xs text-muted-foreground">{phase.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
