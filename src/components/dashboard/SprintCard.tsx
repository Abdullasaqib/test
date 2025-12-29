import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flame, Zap, Clock, CheckCircle2, Trophy, Lock, ArrowUpRight, Lightbulb, Sparkles, Eye, Brain } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSprints } from "@/hooks/useSprints";
import { Skeleton } from "@/components/ui/skeleton";
import { PillarBadge } from "@/components/sprint/PillarBadge";
import { FOUNDER_ARCHETYPES } from "@/components/sprint/ArchetypeBadge";
import { motion } from "framer-motion";

export function SprintCard() {
  const navigate = useNavigate();
  const { loading, dailyChallenge, todayCompleted, streak, sprintAccess, trackProgress, recentAttempts } = useSprints();

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-orange-500/20 overflow-hidden">
        <CardContent className="p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  const categoryColors: Record<string, string> = {
    decision: 'bg-blue-500/20 text-blue-400',
    scenario: 'bg-purple-500/20 text-purple-400',
    thought: 'bg-emerald-500/20 text-emerald-400',
  };

  const categoryLabels: Record<string, string> = {
    decision: 'Quick Decision',
    scenario: 'Scenario Sprint',
    thought: 'Thought Problem',
  };

  // Calculate total progress across all tracks
  const totalCompleted = trackProgress.reduce((sum, tp) => sum + tp.challenges_completed, 0);

  // Get today's result from recent attempts
  const todayResult = todayCompleted && recentAttempts.length > 0 ? recentAttempts[0] : null;
  const archetypeInfo = todayResult?.archetype ? FOUNDER_ARCHETYPES[todayResult.archetype] : null;

  // Calculate dominant archetype from recent attempts
  const getDominantArchetype = () => {
    if (recentAttempts.length === 0) return null;
    const counts: Record<string, number> = {};
    recentAttempts.forEach(a => {
      if (a.archetype) {
        counts[a.archetype] = (counts[a.archetype] || 0) + 1;
      }
    });
    let max = 0;
    let dominant = null;
    for (const [arch, count] of Object.entries(counts)) {
      if (count > max) {
        max = count;
        dominant = arch;
      }
    }
    return dominant ? { archetype: dominant, count: max, total: recentAttempts.length } : null;
  };

  const dominantData = getDominantArchetype();
  const dominantArchetype = dominantData?.archetype ? FOUNDER_ARCHETYPES[dominantData.archetype] : null;

  // No access - show upgrade prompt
  if (!sprintAccess.hasAccess) {
    return (
      <Card className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-orange-500/20 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-400" />
              <span className="font-semibold text-foreground">Founder Simulation</span>
            </div>
            <Badge variant="outline" className="gap-1 border-muted-foreground/30">
              <Lock className="h-3 w-3" />
              Locked
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Build founder instincts with AI-evaluated daily challenges. Upgrade to unlock!
          </p>
          <Button 
            onClick={() => navigate('/pricing')}
            className="w-full"
            variant="outline"
          >
            Upgrade to Unlock
            <ArrowUpRight className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Limited access - out of sprints
  if (!sprintAccess.isUnlimited && sprintAccess.sprintsRemaining <= 0) {
    return (
      <Card className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-orange-500/20 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-400" />
              <span className="font-semibold text-foreground">Founder Simulation</span>
            </div>
            <Badge variant="outline" className="gap-1 text-amber-400 border-amber-400/30">
              {sprintAccess.sprintsUsedThisMonth}/{sprintAccess.monthlyLimit} used
            </Badge>
          </div>
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground mb-4">
              You've used all your sprints this month! Upgrade to FULL FOUNDATION for unlimited access.
            </p>
            <Button 
              onClick={() => navigate('/pricing')}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
            >
              Get Unlimited Sprints
              <ArrowUpRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-orange-500/20 overflow-hidden relative">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <CardContent className="p-5 md:p-6 relative z-10">
        {/* Header with streak */}
        <div className="flex items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              className="flex-shrink-0"
            >
              <Zap className="h-5 w-5 text-orange-400" />
            </motion.div>
            <span className="font-semibold text-foreground text-sm md:text-base truncate">Founder Simulation</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            {!sprintAccess.isUnlimited && (
              <Badge variant="outline" className="text-xs gap-1 border-muted-foreground/30 hidden sm:flex">
                {sprintAccess.sprintsRemaining} left
              </Badge>
            )}
            <div className="flex items-center gap-1 md:gap-1.5 bg-orange-500/10 px-2 py-1 rounded-full">
              <Flame className="h-3.5 w-3.5 md:h-4 md:w-4 text-orange-500" />
              <span className="font-bold text-orange-400 text-xs md:text-sm">{streak?.current_streak || 0}</span>
            </div>
          </div>
        </div>

        {todayCompleted ? (
          <div className="space-y-4">
            {/* Today's Result Summary */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center"
                >
                  <CheckCircle2 className="h-6 w-6 text-green-400" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Simulation Complete! 🎉
                  </h3>
                  {archetypeInfo && (
                    <p className="text-sm text-muted-foreground">
                      You thought like {archetypeInfo.emoji} {archetypeInfo.name}
                    </p>
                  )}
                </div>
              </div>
              {todayResult?.xp_earned && (
                <div className="text-right">
                  <div className="text-xl font-bold text-yellow-400">+{todayResult.xp_earned}</div>
                  <div className="text-xs text-muted-foreground">XP earned</div>
                </div>
              )}
            </div>

            {/* Archetype Pattern Insight */}
            {dominantData && dominantData.count >= 2 && dominantArchetype && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`bg-gradient-to-r ${dominantArchetype.color} rounded-lg p-3 border`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{dominantArchetype.emoji}</span>
                  <p className="text-sm">
                    You've been a <strong>{dominantArchetype.name}</strong> {dominantData.count} out of {dominantData.total} simulations!
                  </p>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/dashboard/sprint')}
                className="flex-1"
              >
                <Eye className="h-4 w-4 mr-1" />
                View Results
              </Button>
              <Button 
                size="sm" 
                onClick={() => navigate('/dashboard/sprint?bonus=true')}
                className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
              >
                <Sparkles className="h-4 w-4 mr-1" />
                Bonus Round
              </Button>
            </div>

            {/* Streak Reminder */}
            <p className="text-xs text-muted-foreground text-center">
              Come back tomorrow to keep your 🔥{streak?.current_streak || 0} streak alive!
            </p>

            {/* Mini Founder DNA Preview - Use DNA profile if available, otherwise use archetype */}
            {dominantArchetype && (
              <div className="pt-3 border-t border-border/50">
                <Link to="/dashboard/dna" className="flex items-center justify-between hover:bg-background/50 rounded-lg p-2 -mx-2 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{dominantArchetype.emoji}</span>
                    <div>
                      <p className="text-xs text-muted-foreground">Your Founder Style</p>
                      <p className="font-medium text-sm">{dominantArchetype.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">From Daily Practice</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-primary">
                    <Brain className="h-3 w-3" />
                    View DNA →
                  </div>
                </Link>
              </div>
            )}
          </div>
        ) : dailyChallenge ? (
          <>
            {/* Challenge preview */}
            <div className="space-y-3">
              {/* Track & Pillar badges */}
              <div className="flex items-center gap-2 flex-wrap">
                {dailyChallenge.track && (
                  <Badge variant="secondary" className="gap-1.5 bg-background/50">
                    <span className="text-base">{dailyChallenge.track.icon}</span>
                    {dailyChallenge.track.name}
                  </Badge>
                )}
                {dailyChallenge.pillar && (
                  <PillarBadge pillar={dailyChallenge.pillar} size="sm" />
                )}
                <Badge className={categoryColors[dailyChallenge.category]}>
                  {categoryLabels[dailyChallenge.category]}
                </Badge>
              </div>
              
              <h3 className="font-bold text-base md:text-lg text-foreground leading-tight line-clamp-2">
                {dailyChallenge.title}
              </h3>
              
              <p className="text-xs text-orange-400/80 italic">
                Can you make the right call?
              </p>
              
              <p className="text-sm text-muted-foreground line-clamp-2">
                {dailyChallenge.scenario}
              </p>

              {/* Fun Fact Preview */}
              {dailyChallenge.real_world_context?.fun_facts?.[0] && (
                <div className="flex items-start gap-2 bg-yellow-500/10 rounded-lg p-2.5 mt-2">
                  <Lightbulb className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-yellow-200/90 line-clamp-2">
                    {dailyChallenge.real_world_context.fun_facts[0]}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold">+{dailyChallenge.xp_reward} XP</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {dailyChallenge.estimated_minutes} min
                </div>
              </div>
            </div>

            <Link to="/dashboard/sprint" className="block mt-4">
              <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/20">
                <Sparkles className="h-4 w-4 mr-2" />
                Play Now
              </Button>
            </Link>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground">No challenges available right now.</p>
          </div>
        )}

        {/* Streak stats - compact (only show when not completed today) */}
        {!todayCompleted && streak && streak.total_challenges_completed > 0 && (
          <div className="mt-4 pt-4 border-t border-border/50 grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-lg font-bold text-foreground">{streak.total_challenges_completed}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div>
              <div className="text-lg font-bold text-orange-400">{streak.longest_streak}</div>
              <div className="text-xs text-muted-foreground">Best Streak</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-400">{streak.total_xp_earned}</div>
              <div className="text-xs text-muted-foreground">Total XP</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}