import { ProLayout } from "@/components/pro/ProLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  PlayCircle, 
  Trophy,
  Target,
  Clock,
  Flame,
  ArrowRight,
} from "lucide-react";

export default function ProSprints() {
  return (
    <ProLayout>
      <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Daily Sprint</h1>
              <p className="text-white/60">Build your founder muscles with daily challenges</p>
            </div>
          </div>
        </div>

        {/* Streak & Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
            <CardContent className="p-4 text-center">
              <Flame className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-400">0</div>
              <div className="text-sm text-white/60">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-400">0</div>
              <div className="text-sm text-white/60">Sprints Done</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">0</div>
              <div className="text-sm text-white/60">XP Earned</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-400">--</div>
              <div className="text-sm text-white/60">Avg Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Sprint */}
        <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 mb-3">
                  <Clock className="w-3 h-3 mr-1" />
                  Today's Challenge
                </Badge>
                <h2 className="text-2xl font-bold text-white mb-2">Founder Simulation</h2>
                <p className="text-white/60 mb-4 max-w-md">
                  Step into the shoes of a founder and make real decisions. 
                  Each sprint builds critical thinking skills.
                </p>
                <div className="flex items-center gap-4 text-sm text-white/50">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    3-5 min
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    +25 XP
                  </span>
                </div>
              </div>
              <Button className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-6 text-lg">
                <PlayCircle className="w-5 h-5 mr-2" />
                Start Sprint
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sprint Categories */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Sprint Categories</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: "Problem Discovery", description: "Identify real problems worth solving", progress: 0, total: 10 },
              { name: "Customer Validation", description: "Validate ideas with real users", progress: 0, total: 10 },
              { name: "Product Strategy", description: "Make smart product decisions", progress: 0, total: 10 },
              { name: "Growth & Launch", description: "Launch and grow your product", progress: 0, total: 10 },
            ].map((category, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:border-amber-500/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white">{category.name}</h3>
                    <span className="text-sm text-white/40">{category.progress}/{category.total}</span>
                  </div>
                  <p className="text-sm text-white/60 mb-3">{category.description}</p>
                  <Progress value={(category.progress / category.total) * 100} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Sprints */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Recent Sprints</CardTitle>
            <CardDescription className="text-white/60">Your sprint history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-white/40">
              <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Complete your first sprint to see your history here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProLayout>
  );
}
