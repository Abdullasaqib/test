import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Play, CheckCircle, XCircle, Star } from "lucide-react";
import { toast } from "sonner";

interface Application {
  id: string;
  founder_name: string;
  email: string;
  startup_name: string;
  country: string;
  school_name: string | null;
  grade: string | null;
  status: string;
  round: number;
  final_score: number | null;
  rank: number | null;
  is_top_20: boolean;
  is_top_10: boolean;
  created_at: string;
  video_url: string | null;
  pitch_description: string;
  problem_statement: string;
  solution_description: string;
}

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "registered", label: "Registered" },
  { value: "submitted", label: "Submitted" },
  { value: "ai_scored", label: "AI Scored" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
];

export default function AdminApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roundFilter, setRoundFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [scoring, setScoring] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    try {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  }

  async function scoreApplication(appId: string) {
    setScoring(true);
    try {
      const { data, error } = await supabase.functions.invoke("score-application", {
        body: { applicationId: appId },
      });

      if (error) throw error;

      toast.success("Application scored successfully");
      fetchApplications();
    } catch (error: any) {
      console.error("Error scoring application:", error);
      toast.error(error.message || "Failed to score application");
    } finally {
      setScoring(false);
    }
  }

  async function updateStatus(appId: string, status: string) {
    try {
      const { error } = await supabase
        .from("applications")
        .update({ status: status as any })
        .eq("id", appId);

      if (error) throw error;

      toast.success(`Status updated to ${status}`);
      fetchApplications();
      setSelectedApp(null);
    } catch (error: any) {
      console.error("Error updating status:", error);
      toast.error(error.message || "Failed to update status");
    }
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.founder_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.startup_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesRound =
      roundFilter === "all" || app.round.toString() === roundFilter;

    return matchesSearch && matchesStatus && matchesRound;
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      draft: "bg-muted text-muted-foreground",
      registered: "bg-purple-500/20 text-purple-600",
      submitted: "bg-yellow-500/20 text-yellow-600",
      ai_scored: "bg-blue-500/20 text-blue-600",
      accepted: "bg-green-500/20 text-green-600",
      rejected: "bg-red-500/20 text-red-600",
    };
    return styles[status] || styles.draft;
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Application Pipeline</h1>
        <p className="text-muted-foreground mt-1">
          Review and manage student applications
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {STATUS_OPTIONS.filter((s) => s.value !== "all").map((status) => {
          const count = applications.filter(
            (a) => a.status === status.value
          ).length;
          return (
            <Card key={status.value}>
              <CardContent className="pt-4">
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-sm text-muted-foreground">{status.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, startup, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={roundFilter} onValueChange={setRoundFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Round" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rounds</SelectItem>
                <SelectItem value="1">Round 1</SelectItem>
                <SelectItem value="2">Round 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applications ({filteredApplications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Founder</TableHead>
                <TableHead>Startup</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Rank</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{app.founder_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {app.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{app.startup_name}</TableCell>
                  <TableCell>{app.country}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {app.final_score ? (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {app.final_score.toFixed(1)}
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    {app.rank ? (
                      <div className="flex items-center gap-1">
                        #{app.rank}
                        {app.is_top_10 && (
                          <Badge variant="default" className="ml-1">
                            Top 10
                          </Badge>
                        )}
                        {app.is_top_20 && !app.is_top_10 && (
                          <Badge variant="secondary" className="ml-1">
                            Top 20
                          </Badge>
                        )}
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedApp(app)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {app.status === "submitted" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => scoreApplication(app.id)}
                          disabled={scoring}
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Score
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredApplications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-muted-foreground">
                      No applications found
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Application Detail Dialog */}
      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-6">
              {/* Founder Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Founder
                  </label>
                  <p className="font-medium">{selectedApp.founder_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <p>{selectedApp.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Country
                  </label>
                  <p>{selectedApp.country}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    School
                  </label>
                  <p>{selectedApp.school_name || "-"}</p>
                </div>
              </div>

              {/* Startup Info */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Startup Name
                </label>
                <p className="font-medium text-lg">{selectedApp.startup_name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Problem Statement
                </label>
                <p className="mt-1">{selectedApp.problem_statement}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Solution
                </label>
                <p className="mt-1">{selectedApp.solution_description}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Pitch Description
                </label>
                <p className="mt-1">{selectedApp.pitch_description}</p>
              </div>

              {/* Video */}
              {selectedApp.video_url && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Pitch Video
                  </label>
                  <a
                    href={selectedApp.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline block mt-1"
                  >
                    View Video
                  </a>
                </div>
              )}

              {/* Score */}
              {selectedApp.final_score && (
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <Star className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold">
                      {selectedApp.final_score.toFixed(1)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      AI Score • Rank #{selectedApp.rank}
                    </p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  variant="default"
                  className="flex-1"
                  onClick={() => updateStatus(selectedApp.id, "accepted")}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Accept
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => updateStatus(selectedApp.id, "rejected")}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
