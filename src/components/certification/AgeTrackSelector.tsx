import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Rocket, Trophy, Clock } from "lucide-react";
import { AgeTrack, ageTrackContent } from "@/data/lessonSummaries";

interface AgeTrackSelectorProps {
  currentTrack: AgeTrack;
  onTrackChange: (track: AgeTrack) => void;
  studentAge?: number;
}

const trackInfo = {
  explorer: {
    name: "Explorer",
    ageRange: "Ages 9-11",
    icon: Sparkles,
    description: "Fun projects with playful guidance",
    color: "from-green-500 to-emerald-500",
    badge: "bg-green-500/10 text-green-500 border-green-500/30",
  },
  creator: {
    name: "Creator",
    ageRange: "Ages 12-14",
    icon: Rocket,
    description: "Practical apps with real-world use",
    color: "from-blue-500 to-cyan-500",
    badge: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  },
  founder: {
    name: "Founder",
    ageRange: "Ages 15-17",
    icon: Trophy,
    description: "Startup-ready MVPs and business focus",
    color: "from-purple-500 to-pink-500",
    badge: "bg-purple-500/10 text-purple-500 border-purple-500/30",
  },
};

export function AgeTrackSelector({ currentTrack, onTrackChange, studentAge }: AgeTrackSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Choose Your Challenge Level</h3>
        {studentAge && (
          <Badge variant="outline">Your age: {studentAge}</Badge>
        )}
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        {(Object.keys(trackInfo) as AgeTrack[]).map((track) => {
          const info = trackInfo[track];
          const content = ageTrackContent[track];
          const isSelected = currentTrack === track;
          
          return (
            <motion.div
              key={track}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={`cursor-pointer transition-all ${
                  isSelected 
                    ? "ring-2 ring-primary shadow-lg" 
                    : "hover:shadow-md border-border/50"
                }`}
                onClick={() => onTrackChange(track)}
              >
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${info.color} text-white`}>
                      <info.icon className="h-5 w-5" />
                    </div>
                    {isSelected && (
                      <Badge className="bg-primary/10 text-primary">Selected</Badge>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg">{info.name}</h4>
                    <p className="text-sm text-muted-foreground">{info.ageRange}</p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {info.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {content.sessionLength} per sprint
                  </div>
                  
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Example projects:</p>
                    <div className="flex flex-wrap gap-1">
                      {content.projectTypes.slice(0, 2).map((project) => (
                        <Badge key={project} variant="outline" className="text-xs">
                          {project}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
