import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useSprints } from "@/hooks/useSprints";
import { TrackProgressCard } from "@/components/sprint/TrackProgressCard";
import { ArrowLeft, Flame, Star, Trophy, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function DashboardSprintTracks() {
  const navigate = useNavigate();
  const { 
    industryTracks, 
    trackProgress, 
    streak, 
    loading,
    studentTrackInterests 
  } = useSprints();

  // Calculate total stats
  const totalXP = trackProgress.reduce((sum, tp) => sum + (tp.total_xp || 0), 0);
  const totalChallenges = trackProgress.reduce((sum, tp) => sum + (tp.challenges_completed || 0), 0);

  // Get tracks with progress
  const tracksWithProgress = industryTracks.map(track => {
    const progress = trackProgress.find(tp => tp.track_id === track.id) || {
      challenges_completed: 0,
      discover_completed: 0,
      design_completed: 0,
      build_completed: 0,
      explore_completed: 0,
      total_xp: 0
    };
    const isInterested = studentTrackInterests.includes(track.id);
    return { track, progress, isInterested };
  });

  // Sort: interested tracks first, then by progress
  const sortedTracks = tracksWithProgress.sort((a, b) => {
    if (a.isInterested && !b.isInterested) return -1;
    if (!a.isInterested && b.isInterested) return 1;
    return b.progress.challenges_completed - a.progress.challenges_completed;
  });

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container max-w-4xl py-8 space-y-6">
          <Skeleton className="h-8 w-48" />
          <div className="grid gap-4">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container max-w-4xl py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/dashboard/sprint')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Your Founder Stats</h1>
            <p className="text-muted-foreground">Track your progress across all industry simulations</p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
              <CardContent className="p-4 text-center">
                <Star className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-400">{totalXP}</div>
                <div className="text-xs text-muted-foreground">Total XP</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
              <CardContent className="p-4 text-center">
                <Flame className="h-6 w-6 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-400">{streak?.current_streak || 0}</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
              <CardContent className="p-4 text-center">
                <Target className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">{totalChallenges}</div>
                <div className="text-xs text-muted-foreground">Simulations</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border-purple-500/30">
              <CardContent className="p-4 text-center">
                <Trophy className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">{streak?.longest_streak || 0}</div>
                <div className="text-xs text-muted-foreground">Best Streak</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Your Tracks */}
        {studentTrackInterests.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              Your Selected Tracks
              <Badge variant="secondary" className="text-xs">{studentTrackInterests.length} tracks</Badge>
            </h2>
            <div className="grid gap-4">
              {sortedTracks
                .filter(t => t.isInterested)
                .map((item, i) => (
                  <motion.div
                    key={item.track.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <TrackProgressCard 
                      track={item.track} 
                      progress={item.progress}
                      totalChallenges={30}
                    />
                  </motion.div>
                ))
            }
            </div>
          </div>
        )}

        {/* Other Tracks */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            {studentTrackInterests.length > 0 ? 'Other Tracks' : 'All Industry Tracks'}
          </h2>
          <div className="grid gap-4">
            {sortedTracks
              .filter(t => !t.isInterested)
              .map((item, i) => (
                <motion.div
                  key={item.track.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <TrackProgressCard 
                    track={item.track} 
                    progress={item.progress}
                    totalChallenges={30}
                  />
                </motion.div>
              ))
          }
          </div>
        </div>

        {/* Back Button */}
        <div className="pt-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard/sprint')}
            className="w-full"
          >
            Back to Founder Simulation
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
