import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  BookOpen,
  Clock,
  Beaker,
  ChevronDown,
  ChevronRight,
  Play,
  Eye,
  Layers,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Mission {
  id: string;
  title: string;
  subtitle: string | null;
  track: string;
  week: number;
  day: number;
  day_number: number;
  phase: number;
  estimated_minutes: number;
  micro_content: string;
  lab_prompt: string;
  ai_tool_used: string | null;
  artifact_type: string | null;
}

const TRACKS = ["junior", "teen", "advanced"];
const WEEKS = Array.from({ length: 12 }, (_, i) => i + 1);
const PHASES = [
  { num: 1, name: "Discovery", weeks: "1-2" },
  { num: 2, name: "Validation", weeks: "3-4" },
  { num: 3, name: "Building", weeks: "5-7" },
  { num: 4, name: "Growth", weeks: "8-10" },
  { num: 5, name: "Pitch", weeks: "11-12" },
];

export default function AdminCurriculum() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<string>("all");
  const [selectedWeek, setSelectedWeek] = useState<string>("all");
  const [selectedPhase, setSelectedPhase] = useState<string>("all");
  const [expandedWeeks, setExpandedWeeks] = useState<Record<string, boolean>>({});
  const [previewMission, setPreviewMission] = useState<Mission | null>(null);

  const { data: missions, isLoading } = useQuery({
    queryKey: ["admin-all-missions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("missions")
        .select("*")
        .order("track")
        .order("week")
        .order("day");

      if (error) throw error;
      return data as Mission[];
    },
  });

  const filteredMissions = useMemo(() => {
    if (!missions) return [];

    return missions.filter((mission) => {
      const matchesSearch =
        searchQuery === "" ||
        mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mission.micro_content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mission.lab_prompt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTrack = selectedTrack === "all" || mission.track === selectedTrack;
      const matchesWeek = selectedWeek === "all" || mission.week === parseInt(selectedWeek);
      const matchesPhase = selectedPhase === "all" || mission.phase === parseInt(selectedPhase);

      return matchesSearch && matchesTrack && matchesWeek && matchesPhase;
    });
  }, [missions, searchQuery, selectedTrack, selectedWeek, selectedPhase]);

  const groupedMissions = useMemo(() => {
    const grouped: Record<string, Record<number, Mission[]>> = {};

    filteredMissions.forEach((mission) => {
      if (!grouped[mission.track]) {
        grouped[mission.track] = {};
      }
      if (!grouped[mission.track][mission.week]) {
        grouped[mission.track][mission.week] = [];
      }
      grouped[mission.track][mission.week].push(mission);
    });

    return grouped;
  }, [filteredMissions]);

  const stats = useMemo(() => {
    if (!missions) return { total: 0, byTrack: {}, byPhase: {} };

    const byTrack: Record<string, number> = {};
    const byPhase: Record<number, number> = {};

    missions.forEach((m) => {
      byTrack[m.track] = (byTrack[m.track] || 0) + 1;
      byPhase[m.phase] = (byPhase[m.phase] || 0) + 1;
    });

    return { total: missions.length, byTrack, byPhase };
  }, [missions]);

  const toggleWeek = (key: string) => {
    setExpandedWeeks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTestMission = (mission: Mission) => {
    // Navigate to mission page with test params
    navigate(`/dashboard/mission?test=true&missionId=${mission.id}`);
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Curriculum Manager</h1>
          <p className="text-muted-foreground">
            Browse and test all {stats.total} missions across tracks
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Layers className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Missions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        {TRACKS.map((track) => (
          <Card key={track}>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  track === "junior" ? "bg-green-500/10" :
                  track === "teen" ? "bg-blue-500/10" : "bg-purple-500/10"
                }`}>
                  <BookOpen className={`h-5 w-5 ${
                    track === "junior" ? "text-green-500" :
                    track === "teen" ? "text-blue-500" : "text-purple-500"
                  }`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.byTrack[track] || 0}</p>
                  <p className="text-xs text-muted-foreground capitalize">{track} Track</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search missions, content, prompts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={selectedTrack} onValueChange={setSelectedTrack}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Track" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tracks</SelectItem>
                {TRACKS.map((t) => (
                  <SelectItem key={t} value={t} className="capitalize">
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedWeek} onValueChange={setSelectedWeek}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Week" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Weeks</SelectItem>
                {WEEKS.map((w) => (
                  <SelectItem key={w} value={w.toString()}>
                    Week {w}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPhase} onValueChange={setSelectedPhase}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Phases</SelectItem>
                {PHASES.map((p) => (
                  <SelectItem key={p.num} value={p.num.toString()}>
                    {p.name} (W{p.weeks})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Mission Browser */}
      <Tabs defaultValue="junior" className="space-y-4">
        <TabsList>
          {TRACKS.map((track) => (
            <TabsTrigger key={track} value={track} className="capitalize">
              {track} ({stats.byTrack[track] || 0})
            </TabsTrigger>
          ))}
        </TabsList>

        {TRACKS.map((track) => (
          <TabsContent key={track} value={track} className="space-y-4">
            <ScrollArea className="h-[600px] pr-4">
              {WEEKS.map((week) => {
                const weekMissions = groupedMissions[track]?.[week] || [];
                if (weekMissions.length === 0 && (selectedWeek !== "all" || selectedPhase !== "all" || searchQuery)) {
                  return null;
                }
                
                const weekKey = `${track}-${week}`;
                const isExpanded = expandedWeeks[weekKey] ?? week === 1;
                const phase = PHASES.find((p) => {
                  const [start, end] = p.weeks.split("-").map(Number);
                  return week >= start && week <= end;
                });

                return (
                  <Card key={weekKey} className="mb-4">
                    <CardHeader
                      className="cursor-pointer hover:bg-muted/50 transition-colors py-3"
                      onClick={() => toggleWeek(weekKey)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {isExpanded ? (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          )}
                          <CardTitle className="text-base">
                            Week {week}
                          </CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {phase?.name}
                          </Badge>
                        </div>
                        <Badge variant="secondary">
                          {weekMissions.length} missions
                        </Badge>
                      </div>
                    </CardHeader>
                    {isExpanded && (
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          {weekMissions.length === 0 ? (
                            <p className="text-sm text-muted-foreground py-4 text-center">
                              No missions found for this week
                            </p>
                          ) : (
                            weekMissions
                              .sort((a, b) => a.day - b.day)
                              .map((mission) => (
                                <div
                                  key={mission.id}
                                  className="flex items-start gap-4 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-sm font-bold text-primary">
                                      {mission.day}
                                    </span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-medium text-sm truncate">
                                        {mission.title}
                                      </h4>
                                      {mission.ai_tool_used && (
                                        <Badge variant="outline" className="text-xs">
                                          {mission.ai_tool_used}
                                        </Badge>
                                      )}
                                    </div>
                                    {mission.subtitle && (
                                      <p className="text-xs text-muted-foreground mb-2">
                                        {mission.subtitle}
                                      </p>
                                    )}
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                      <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {mission.estimated_minutes} min
                                      </span>
                                      {mission.artifact_type && (
                                        <span className="flex items-center gap-1">
                                          <Beaker className="h-3 w-3" />
                                          {mission.artifact_type}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => setPreviewMission(mission)}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleTestMission(mission)}
                                    >
                                      <Play className="h-4 w-4 mr-1" />
                                      Test
                                    </Button>
                                  </div>
                                </div>
                              ))
                          )}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>

      {/* Mission Preview Dialog */}
      <Dialog open={!!previewMission} onOpenChange={() => setPreviewMission(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {previewMission && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="capitalize">
                    {previewMission.track}
                  </Badge>
                  <Badge variant="secondary">
                    Week {previewMission.week}, Day {previewMission.day}
                  </Badge>
                  {previewMission.ai_tool_used && (
                    <Badge>{previewMission.ai_tool_used}</Badge>
                  )}
                </div>
                <DialogTitle className="text-xl">
                  {previewMission.title}
                </DialogTitle>
                {previewMission.subtitle && (
                  <p className="text-muted-foreground">{previewMission.subtitle}</p>
                )}
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{previewMission.estimated_minutes} minutes</span>
                  </div>
                  {previewMission.artifact_type && (
                    <div className="flex items-center gap-2">
                      <Beaker className="h-4 w-4 text-muted-foreground" />
                      <span>Creates: {previewMission.artifact_type}</span>
                    </div>
                  )}
                </div>

                {/* Micro Content */}
                <div>
                  <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Micro-Lesson Content
                  </h3>
                  <div className="bg-muted/50 rounded-lg p-4 text-sm whitespace-pre-wrap">
                    {previewMission.micro_content}
                  </div>
                </div>

                {/* Lab Prompt */}
                <div>
                  <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Beaker className="h-4 w-4 text-accent" />
                    Lab Prompt
                  </h3>
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-sm whitespace-pre-wrap">
                    {previewMission.lab_prompt}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setPreviewMission(null)}>
                    Close
                  </Button>
                  <Button onClick={() => handleTestMission(previewMission)}>
                    <Play className="h-4 w-4 mr-2" />
                    Test This Mission
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
