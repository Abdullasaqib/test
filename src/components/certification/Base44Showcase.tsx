import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Users, Database, Zap, Clock, Star } from "lucide-react";

interface Base44ShowcaseProps {
  onStartBuilding?: () => void;
}

const showcaseApps = [
  {
    name: "HabitFlow",
    creator: "Maya, 14",
    description: "Track daily habits with streaks and charts",
    features: ["User auth", "Database", "Charts"],
    buildTime: "25 min",
    users: 47,
    category: "Productivity",
  },
  {
    name: "StudyBuddy",
    creator: "Jake, 12",
    description: "Organize homework and track assignments",
    features: ["Task lists", "Due dates", "Calendar"],
    buildTime: "20 min",
    users: 89,
    category: "Education",
  },
  {
    name: "PetCarePro",
    creator: "Sofia, 15",
    description: "SaaS for pet sitters to manage bookings",
    features: ["Auth", "Payments", "Scheduling"],
    buildTime: "45 min",
    users: 23,
    category: "SaaS",
  },
  {
    name: "ClubManager",
    creator: "Alex, 13",
    description: "Manage school club members and events",
    features: ["Members", "Events", "Notifications"],
    buildTime: "30 min",
    users: 156,
    category: "Community",
  },
];

const capabilities = [
  {
    icon: Users,
    title: "User Authentication",
    description: "Signup, login, password reset—in one prompt",
  },
  {
    icon: Database,
    title: "Real Databases",
    description: "Store and query data with relationships",
  },
  {
    icon: Zap,
    title: "API Integration",
    description: "Connect to external services seamlessly",
  },
];

export function Base44Showcase({ onStartBuilding }: Base44ShowcaseProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="secondary" className="bg-gradient-to-r from-primary/20 to-accent/20">
          Real Apps Built by Students
        </Badge>
        <h2 className="text-3xl font-bold">What You Can Build with Base44</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          These apps were built by students just like you—no coding experience required.
          Just conversation and creativity.
        </p>
      </div>

      {/* Capabilities */}
      <div className="grid md:grid-cols-3 gap-4">
        {capabilities.map((cap, i) => (
          <motion.div
            key={cap.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="h-full border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-5 text-center space-y-3">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary">
                  <cap.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold">{cap.title}</h3>
                <p className="text-sm text-muted-foreground">{cap.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Showcase Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {showcaseApps.map((app, i) => (
          <motion.div
            key={app.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-all border-border/50 hover:border-primary/30">
              <CardContent className="p-5 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{app.name}</h3>
                      <Badge variant="outline" className="text-xs">{app.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">by {app.creator}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground">{app.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {app.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {app.buildTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {app.users} users
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    View
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center space-y-4 pt-4">
        <p className="text-lg text-muted-foreground">
          Ready to build something amazing?
        </p>
        <Button size="lg" onClick={onStartBuilding} className="gap-2">
          Start Building Now
          <Zap className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
