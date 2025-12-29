import { ProLayout } from "@/components/pro/ProLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Mic, 
  PlayCircle, 
  Award,
  TrendingUp,
  Clock,
  Users,
} from "lucide-react";

const investors = [
  { name: "The Analyst", style: "Data-driven, focuses on metrics and market size", difficulty: "Medium" },
  { name: "The Visionary", style: "Big picture thinker, wants to see the vision", difficulty: "Easy" },
  { name: "The Skeptic", style: "Challenges assumptions, finds weaknesses", difficulty: "Hard" },
  { name: "The Operator", style: "Focused on execution and operations", difficulty: "Medium" },
  { name: "The Customer", style: "Evaluates from user perspective", difficulty: "Medium" },
];

export default function ProTank() {
  return (
    <ProLayout>
      <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">THE TANK</h1>
              <p className="text-white/60">Practice your pitch against AI investors</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">0</div>
              <div className="text-sm text-white/60">Pitches</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-400">0</div>
              <div className="text-sm text-white/60">XP Earned</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-400">--</div>
              <div className="text-sm text-white/60">Avg Score</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">1</div>
              <div className="text-sm text-white/60">Level</div>
            </CardContent>
          </Card>
        </div>

        {/* Start Pitch CTA */}
        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mic className="w-10 h-10 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Ready to Pitch?</h2>
            <p className="text-white/60 mb-6 max-w-md mx-auto">
              Practice your pitch against our AI investors. Get real-time feedback 
              and improve your presentation skills.
            </p>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-6 text-lg">
              <PlayCircle className="w-5 h-5 mr-2" />
              Start Pitch Session
            </Button>
          </CardContent>
        </Card>

        {/* Investor Personas */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">AI Investor Personas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {investors.map((investor, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:border-purple-500/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{investor.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          investor.difficulty === "Easy" 
                            ? "border-emerald-500/30 text-emerald-400" 
                            : investor.difficulty === "Hard"
                            ? "border-red-500/30 text-red-400"
                            : "border-amber-500/30 text-amber-400"
                        }`}
                      >
                        {investor.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-white/60">{investor.style}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tips */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Pitch Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-amber-400 text-sm font-bold">1</span>
              </div>
              <p className="text-white/70">Start with the problem, not your solution</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-amber-400 text-sm font-bold">2</span>
              </div>
              <p className="text-white/70">Use specific numbers and examples</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-amber-400 text-sm font-bold">3</span>
              </div>
              <p className="text-white/70">Keep it under 2 minutes for initial practice</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProLayout>
  );
}
