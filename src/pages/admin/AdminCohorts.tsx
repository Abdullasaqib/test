import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Users, Calendar } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface Cohort {
  id: string;
  name: string;
  program: string;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
  student_count?: number;
}

const PROGRAMS = ["junior", "teen", "advanced"];
const STATUSES = ["upcoming", "active", "completed"];

export default function AdminCohorts() {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCohort, setEditingCohort] = useState<Cohort | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    program: "teen",
    status: "upcoming",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    fetchCohorts();
  }, []);

  async function fetchCohorts() {
    try {
      const { data: cohortsData, error } = await supabase
        .from("cohorts")
        .select("*")
        .order("start_date", { ascending: false });

      if (error) throw error;

      // Get student counts for each cohort
      const cohortsWithCounts = await Promise.all(
        (cohortsData || []).map(async (cohort) => {
          const { count } = await supabase
            .from("students")
            .select("*", { count: "exact", head: true })
            .eq("cohort_id", cohort.id);

          return { ...cohort, student_count: count || 0 };
        })
      );

      setCohorts(cohortsWithCounts);
    } catch (error) {
      console.error("Error fetching cohorts:", error);
      toast.error("Failed to load cohorts");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingCohort) {
        const { error } = await supabase
          .from("cohorts")
          .update(formData)
          .eq("id", editingCohort.id);

        if (error) throw error;
        toast.success("Cohort updated");
      } else {
        const { error } = await supabase.from("cohorts").insert(formData);

        if (error) throw error;
        toast.success("Cohort created");
      }

      setDialogOpen(false);
      resetForm();
      fetchCohorts();
    } catch (error: any) {
      console.error("Error saving cohort:", error);
      toast.error(error.message || "Failed to save cohort");
    }
  }

  function resetForm() {
    setFormData({
      name: "",
      program: "teen",
      status: "upcoming",
      start_date: "",
      end_date: "",
    });
    setEditingCohort(null);
  }

  function openEditDialog(cohort: Cohort) {
    setEditingCohort(cohort);
    setFormData({
      name: cohort.name,
      program: cohort.program,
      status: cohort.status,
      start_date: cohort.start_date,
      end_date: cohort.end_date,
    });
    setDialogOpen(true);
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      upcoming: "bg-blue-500/20 text-blue-600",
      active: "bg-green-500/20 text-green-600",
      completed: "bg-muted text-muted-foreground",
    };
    return styles[status] || styles.upcoming;
  };

  const getProgramBadge = (program: string) => {
    const styles: Record<string, string> = {
      junior: "bg-purple-500/20 text-purple-600",
      teen: "bg-orange-500/20 text-orange-600",
      advanced: "bg-cyan-500/20 text-cyan-600",
    };
    return styles[program] || "";
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cohort Management</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage program cohorts
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              New Cohort
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCohort ? "Edit Cohort" : "Create New Cohort"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Cohort Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Summer 2025"
                  required
                />
              </div>

              <div>
                <Label htmlFor="program">Program</Label>
                <Select
                  value={formData.program}
                  onValueChange={(v) =>
                    setFormData({ ...formData, program: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PROGRAMS.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p.charAt(0).toUpperCase() + p.slice(1)} Program
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(v) =>
                    setFormData({ ...formData, status: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) =>
                      setFormData({ ...formData, start_date: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) =>
                      setFormData({ ...formData, end_date: e.target.value })
                    }
                    required
                  />
                </div>
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
                  {editingCohort ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STATUSES.map((status) => {
          const count = cohorts.filter((c) => c.status === status).length;
          const totalStudents = cohorts
            .filter((c) => c.status === status)
            .reduce((acc, c) => acc + (c.student_count || 0), 0);
          return (
            <Card key={status}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {status} Cohorts
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{totalStudents}</p>
                    <p className="text-xs text-muted-foreground">Students</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Cohorts Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Cohorts ({cohorts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Students</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cohorts.map((cohort) => (
                <TableRow key={cohort.id}>
                  <TableCell className="font-medium">{cohort.name}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getProgramBadge(
                        cohort.program
                      )}`}
                    >
                      {cohort.program}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        cohort.status
                      )}`}
                    >
                      {cohort.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(cohort.start_date), "MMM d")} -{" "}
                      {format(new Date(cohort.end_date), "MMM d, yyyy")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {cohort.student_count}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(cohort)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {cohorts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <p className="text-muted-foreground">No cohorts created</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
