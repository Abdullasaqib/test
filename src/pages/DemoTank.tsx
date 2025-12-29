import { DemoLayout } from "@/components/demo/DemoLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Trophy, TrendingUp, Target, Star } from "lucide-react";
import { DEMO_PITCH_ATTEMPTS, DEMO_TANK_XP } from "@/data/demoData";
import { DemoActionBlocker } from "@/components/demo/DemoActionBlocker";
import { TankLevelBadge } from "@/components/tank/TankLevelBadge";
import { motion } from "framer-motion";

export default function DemoTank() {
  const levelThresholds = [0, 150, 400, 800, 1500, 2500];
  const currentLevelIndex = 2; // Rising Pitcher
  const xpForNextLevel = levelThresholds[currentLevelIndex + 1] - DEMO_TANK_XP;
  const progressPercent = ((DEMO_TANK_XP - levelThresholds[currentLevelIndex]) / 
    (levelThresholds[currentLevelIndex + 1] - levelThresholds[currentLevelIndex])) * 100;

  return (
    <DemoLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              THE TANK
              <TankLevelBadge xp={DEMO_TANK_XP} />
            </h1>
            <p className="text-muted-foreground">
              Practice your pitch with AI investors
            </p>
          </div>
        </div>

        <Tabs defaultValue="practice" className="space-y-6">
          <TabsList>
            <TabsTrigger value="practice">Practice Pitch</TabsTrigger>
            <TabsTrigger value="history">My Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="practice" className="space-y-6">
            {/* Stats Row */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{DEMO_TANK_XP}</p>
                    <p className="text-xs text-muted-foreground">Total XP</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{DEMO_PITCH_ATTEMPTS.length}</p>
                    <p className="text-xs text-muted-foreground">Pitches</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Star className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">78</p>
                    <p className="text-xs text-muted-foreground">Avg Score</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Next Level</span>
                    <span className="text-muted-foreground">{xpForNextLevel} XP</span>
                  </div>
                  <Progress value={progressPercent} className="h-2" />
                </CardContent>
              </Card>
            </div>

            {/* Start Pitch CTA */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mic className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold mb-2">Ready to Practice?</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Choose an AI investor persona and deliver your 60-second pitch. 
                  Get instant feedback and improve your skills!
                </p>
                <DemoActionBlocker action="start your pitch practice">
                  <Button size="lg" className="gap-2">
                    <Target className="h-4 w-4" />
                    Start New Pitch
                  </Button>
                </DemoActionBlocker>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <h3 className="font-semibold">Recent Pitches</h3>
            {DEMO_PITCH_ATTEMPTS.map((pitch, i) => (
              <motion.div
                key={pitch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">{pitch.score}</span>
                        </div>
                        <div>
                          <p className="font-medium capitalize">{pitch.investor_persona} Investor</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(pitch.created_at).toLocaleDateString()} • {pitch.duration_seconds}s
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">+{pitch.total_xp_earned} XP</Badge>
                        <DemoActionBlocker action="view pitch details">
                          <Button variant="outline" size="sm">View</Button>
                        </DemoActionBlocker>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DemoLayout>
  );
}
