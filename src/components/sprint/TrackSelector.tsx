import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Star, ChevronRight, Sparkles, Target } from "lucide-react";
import { motion } from "framer-motion";

import type { IndustryTrack, TrackProgress } from "@/hooks/useSprints";

interface TrackSelectorProps {
  tracks: IndustryTrack[];
  progress: TrackProgress[];
  selectedTracks: string[];
  onToggleTrack: (trackId: string) => void;
  onContinue: () => void;
  maxSelections?: number;
}

const colorThemes: Record<string, { bg: string; border: string; text: string; badge: string; glow: string }> = {
  emerald: {
    bg: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-500/30 hover:border-emerald-500/50",
    text: "text-emerald-400",
    badge: "bg-emerald-500/20 text-emerald-300",
    glow: "shadow-emerald-500/20",
  },
  green: {
    bg: "from-green-500/10 to-lime-500/10",
    border: "border-green-500/30 hover:border-green-500/50",
    text: "text-green-400",
    badge: "bg-green-500/20 text-green-300",
    glow: "shadow-green-500/20",
  },
  pink: {
    bg: "from-pink-500/10 to-rose-500/10",
    border: "border-pink-500/30 hover:border-pink-500/50",
    text: "text-pink-400",
    badge: "bg-pink-500/20 text-pink-300",
    glow: "shadow-pink-500/20",
  },
  blue: {
    bg: "from-blue-500/10 to-cyan-500/10",
    border: "border-blue-500/30 hover:border-blue-500/50",
    text: "text-blue-400",
    badge: "bg-blue-500/20 text-blue-300",
    glow: "shadow-blue-500/20",
  },
  purple: {
    bg: "from-purple-500/10 to-violet-500/10",
    border: "border-purple-500/30 hover:border-purple-500/50",
    text: "text-purple-400",
    badge: "bg-purple-500/20 text-purple-300",
    glow: "shadow-purple-500/20",
  },
  orange: {
    bg: "from-orange-500/10 to-amber-500/10",
    border: "border-orange-500/30 hover:border-orange-500/50",
    text: "text-orange-400",
    badge: "bg-orange-500/20 text-orange-300",
    glow: "shadow-orange-500/20",
  },
};

// Track taglines for "why this matters"
const trackTaglines: Record<string, string> = {
  healthcare: "AI is saving lives. Learn how you could too.",
  sustainability: "The planet needs innovators. That could be you.",
  fashion: "AI is reshaping style. Design the future.",
  aviation: "From drones to events — AI makes the impossible happen.",
  gaming: "Games aren't just fun — they're billion-dollar businesses.",
};

export function TrackSelector({
  tracks,
  progress,
  selectedTracks,
  onToggleTrack,
  onContinue,
  maxSelections = 3,
}: TrackSelectorProps) {
  const getTrackProgress = (trackId: string) => {
    return progress.find((p) => p.track_id === trackId) || {
      challenges_completed: 0,
      discover_completed: 0,
      design_completed: 0,
      build_completed: 0,
      explore_completed: 0,
      total_xp: 0,
    };
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 mb-2"
        >
          <Target className="h-8 w-8 text-orange-400" />
        </motion.div>
        <h2 className="text-3xl font-bold">Choose Your Adventure</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Select up to {maxSelections} industries you want to explore. 
          We'll personalize your daily challenges to match your interests!
        </p>
      </div>

      {/* Track Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tracks.map((track, index) => {
          const isSelected = selectedTracks.includes(track.id);
          const theme = colorThemes[track.color_theme] || colorThemes.orange;
          const trackProgress = getTrackProgress(track.id);
          const progressPercent = Math.min(100, (trackProgress.challenges_completed / 30) * 100);
          const tagline = trackTaglines[track.slug] || "Explore real-world AI applications.";

          return (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, type: "spring", bounce: 0.3 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 bg-gradient-to-br ${theme.bg} ${theme.border} overflow-hidden relative ${
                  isSelected ? `ring-2 ring-primary ring-offset-2 ring-offset-background shadow-xl ${theme.glow}` : "hover:shadow-lg"
                }`}
                onClick={() => onToggleTrack(track.id)}
              >
                {/* Selection indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-lg z-10"
                  >
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </motion.div>
                )}

                <CardContent className="p-5">
                  {/* Icon and Name */}
                  <div className="flex items-start gap-4 mb-3">
                    <motion.div 
                      className="text-4xl"
                      animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {track.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-foreground">{track.name}</h3>
                      {trackProgress.challenges_completed > 0 && (
                        <span className="text-xs text-muted-foreground">
                          {trackProgress.challenges_completed}/30 completed
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className={`text-sm ${theme.text} font-medium mb-3`}>
                    {tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {track.description.split('—')[0]}
                  </p>

                  {/* Progress bar */}
                  {trackProgress.challenges_completed > 0 && (
                    <div className="mb-4">
                      <Progress value={progressPercent} className="h-1.5" />
                    </div>
                  )}

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {track.skill_focus_areas.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className={`text-xs ${theme.badge}`}>
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* XP earned */}
                  {trackProgress.total_xp > 0 && (
                    <div className="flex items-center gap-1.5 text-xs">
                      <Star className="h-3.5 w-3.5 text-yellow-400" />
                      <span className="text-yellow-400 font-semibold">{trackProgress.total_xp} XP earned</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Continue Button */}
      <motion.div 
        className="flex flex-col items-center gap-3 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {selectedTracks.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {selectedTracks.length} of {maxSelections} tracks selected
          </p>
        )}
        <Button
          onClick={onContinue}
          disabled={selectedTracks.length === 0}
          size="lg"
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 px-8"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Start My Journey
          <ChevronRight className="h-5 w-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}