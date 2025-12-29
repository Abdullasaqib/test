import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Edit,
  Search,
  Users,
  Briefcase,
  Globe,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

interface MentorProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  bio: string | null;
  expertise: string[];
  industries: string[];
  company: string | null;
  job_title: string | null;
  max_teams: number;
  is_accepting_teams: boolean;
  is_active: boolean;
  created_at: string;
  assigned_teams_count?: number;
}

export default function AdminMentors() {
  const [mentors, setMentors] = useState<MentorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMentor, setEditingMentor] = useState<MentorProfile | null>(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    bio: "",
    expertise: "",
    industries: "",
    company: "",
    job_title: "",
    max_teams: 5,
  });

  useEffect(() => {
    fetchMentors();
  }, []);

  async function fetchMentors() {
    try {
      const { data, error } = await supabase
        .from("mentor_profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Get assigned teams count for each mentor
      const mentorsWithCounts = await Promise.all(
        (data || []).map(async (mentor) => {
          const { count } = await supabase
            .from("team_mentor_assignments")
            .select("*", { count: "exact", head: true })
            .eq("mentor_id", mentor.id)
            .eq("status", "active");

          return { ...mentor, assigned_teams_count: count || 0 };
        })
      );

      setMentors(mentorsWithCounts);
    } catch (error) {
      console.error("Error fetching mentors:", error);
      toast.error("Failed to load mentors");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const mentorData = {
        full_name: formData.full_name,
        email: formData.email,
        bio: formData.bio || null,
        expertise: formData.expertise
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        industries: formData.industries
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        company: formData.company || null,
        job_title: formData.job_title || null,
        max_teams: formData.max_teams,
      };

      if (editingMentor) {
        const { error } = await supabase
          .from("mentor_profiles")
          .update(mentorData)
          .eq("id", editingMentor.id);

        if (error) throw error;
        toast.success("Mentor updated");
      } else {
        // For new mentors, we need to create a user first or link to existing
        toast.error("Creating new mentors requires user registration first");
        return;
      }

      setDialogOpen(false);
      resetForm();
      fetchMentors();
    } catch (error: any) {
      console.error("Error saving mentor:", error);
      toast.error(error.message || "Failed to save mentor");
    }
  }

  async function toggleMentorStatus(mentor: MentorProfile, field: "is_active" | "is_accepting_teams") {
    try {
      const { error } = await supabase
        .from("mentor_profiles")
        .update({ [field]: !mentor[field] })
        .eq("id", mentor.id);

      if (error) throw error;
      toast.success("Mentor status updated");
      fetchMentors();
    } catch (error: any) {
      console.error("Error updating mentor:", error);
      toast.error(error.message || "Failed to update mentor");
    }
  }

  function resetForm() {
    setFormData({
      full_name: "",
      email: "",
      bio: "",
      expertise: "",
      industries: "",
      company: "",
      job_title: "",
      max_teams: 5,
    });
    setEditingMentor(null);
  }

  function openEditDialog(mentor: MentorProfile) {
    setEditingMentor(mentor);
    setFormData({
      full_name: mentor.full_name,
      email: mentor.email,
      bio: mentor.bio || "",
      expertise: mentor.expertise.join(", "),
      industries: mentor.industries.join(", "),
      company: mentor.company || "",
      job_title: mentor.job_title || "",
      max_teams: mentor.max_teams,
    });
    setDialogOpen(true);
  }

  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mentor Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage mentors and their assignments
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-2xl font-bold">{mentors.length}</p>
            <p className="text-sm text-muted-foreground">Total Mentors</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-2xl font-bold">
              {mentors.filter((m) => m.is_active).length}
            </p>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-2xl font-bold">
              {mentors.filter((m) => m.is_accepting_teams).length}
            </p>
            <p className="text-sm text-muted-foreground">Accepting Teams</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-2xl font-bold">
              {mentors.reduce((acc, m) => acc + (m.assigned_teams_count || 0), 0)}
            </p>
            <p className="text-sm text-muted-foreground">Total Assignments</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Mentors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Mentors ({filteredMentors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mentor</TableHead>
                <TableHead>Expertise</TableHead>
                <TableHead>Teams</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Accepting</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMentors.map((mentor) => (
                <TableRow key={mentor.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{mentor.full_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {mentor.job_title && mentor.company
                          ? `${mentor.job_title} at ${mentor.company}`
                          : mentor.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {mentor.expertise.slice(0, 2).map((exp) => (
                        <Badge key={exp} variant="secondary" className="text-xs">
                          {exp}
                        </Badge>
                      ))}
                      {mentor.expertise.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{mentor.expertise.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {mentor.assigned_teams_count} / {mentor.max_teams}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={mentor.is_active}
                      onCheckedChange={() => toggleMentorStatus(mentor, "is_active")}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={mentor.is_accepting_teams}
                      onCheckedChange={() =>
                        toggleMentorStatus(mentor, "is_accepting_teams")
                      }
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(mentor)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredMentors.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <p className="text-muted-foreground">No mentors found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingMentor ? "Edit Mentor" : "Add Mentor"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="job_title">Job Title</Label>
                <Input
                  id="job_title"
                  value={formData.job_title}
                  onChange={(e) =>
                    setFormData({ ...formData, job_title: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="expertise">Expertise (comma-separated)</Label>
              <Input
                id="expertise"
                value={formData.expertise}
                onChange={(e) =>
                  setFormData({ ...formData, expertise: e.target.value })
                }
                placeholder="e.g., Marketing, Finance, Product"
              />
            </div>

            <div>
              <Label htmlFor="industries">Industries (comma-separated)</Label>
              <Input
                id="industries"
                value={formData.industries}
                onChange={(e) =>
                  setFormData({ ...formData, industries: e.target.value })
                }
                placeholder="e.g., SaaS, EdTech, FinTech"
              />
            </div>

            <div>
              <Label htmlFor="max_teams">Max Teams</Label>
              <Input
                id="max_teams"
                type="number"
                min={1}
                max={20}
                value={formData.max_teams}
                onChange={(e) =>
                  setFormData({ ...formData, max_teams: parseInt(e.target.value) })
                }
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingMentor ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
