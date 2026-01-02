import { useEffect, useState, useMemo } from "react";
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
import { Progress } from "@/components/ui/progress";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Eye, GraduationCap, Target, Clock, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface StudentWithProgress {
  id: string;
  user_id: string;
  full_name: string;
  age: number;
  program: string;
  country: string | null;
  city: string | null;
  school_name: string | null;
  grade: string | null;
  status: string | null;
  onboarding_completed: boolean | null;
  created_at: string;
  enrolled_at: string | null;
  cohort_id: string | null;
  missions_completed: number;
  total_missions: number;
  last_activity: string | null;
}

interface AggregatedStats {
  total: number;
  active: number;
  avgProgress: number;
  byProgram: { junior: number; teen: number; advanced: number };
}

const PAGE_SIZE = 50;

export default function AdminStudents() {
  const [students, setStudents] = useState<StudentWithProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [programFilter, setProgramFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<StudentWithProgress | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [stats, setStats] = useState<AggregatedStats>({
    total: 0,
    active: 0,
    avgProgress: 0,
    byProgram: { junior: 0, teen: 0, advanced: 0 },
  });

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, programFilter, statusFilter]);

  useEffect(() => {
    fetchStudents();
  }, [currentPage, debouncedSearch, programFilter, statusFilter]);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      // Get total counts by status and program in single query
      const { data: studentsData, error } = await supabase
        .from("students")
        .select("id, status, program");

      if (error) throw error;

      const students = studentsData || [];
      const total = students.length;
      const active = students.filter((s) => s.status === "active").length;
      const byProgram = {
        junior: students.filter((s) => s.program === "junior").length,
        teen: students.filter((s) => s.program === "teen").length,
        advanced: students.filter((s) => s.program === "advanced").length,
      };

      // Get mission completion stats in one aggregated query
      const { data: missionStats } = await supabase
        .from("student_missions")
        .select("student_id, status");

      const completedByStudent = new Map<string, number>();
      (missionStats || []).forEach((m) => {
        if (m.status === "completed") {
          completedByStudent.set(m.student_id, (completedByStudent.get(m.student_id) || 0) + 1);
        }
      });

      const totalMissions = 60; // Default missions per track
      let totalProgress = 0;
      completedByStudent.forEach((completed) => {
        totalProgress += (completed / totalMissions) * 100;
      });
      const avgProgress = total > 0 ? totalProgress / total : 0;

      setStats({ total, active, avgProgress, byProgram });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }

  async function fetchStudents() {
    try {
      setLoading(true);

      // Build base query with filters
      let query = supabase
        .from("students")
        .select("*", { count: "exact" });

      // Apply filters
      if (programFilter !== "all") {
        query = query.eq("program", programFilter);
      }
      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }
      if (debouncedSearch) {
        query = query.or(`full_name.ilike.%${debouncedSearch}%,school_name.ilike.%${debouncedSearch}%`);
      }

      // Get paginated results
      const offset = (currentPage - 1) * PAGE_SIZE;
      const { data: studentsData, error: studentsError, count } = await query
        .order("created_at", { ascending: false })
        .range(offset, offset + PAGE_SIZE - 1);

      if (studentsError) throw studentsError;

      setTotalCount(count || 0);

      if (!studentsData || studentsData.length === 0) {
        setStudents([]);
        return;
      }

      // Get student IDs for batch queries
      const studentIds = studentsData.map((s) => s.id);

      // Batch query: Get all mission completions for these students in ONE query
      const { data: missionData } = await supabase
        .from("student_missions")
        .select("student_id, status, updated_at")
        .in("student_id", studentIds);

      // Aggregate mission data in memory
      const missionStats = new Map<string, { completed: number; lastActivity: string | null }>();
      (missionData || []).forEach((m) => {
        const existing = missionStats.get(m.student_id) || { completed: 0, lastActivity: null };
        if (m.status === "completed") {
          existing.completed++;
        }
        if (!existing.lastActivity || m.updated_at > existing.lastActivity) {
          existing.lastActivity = m.updated_at;
        }
        missionStats.set(m.student_id, existing);
      });

      // Map students with aggregated data
      const studentsWithProgress: StudentWithProgress[] = studentsData.map((student) => {
        const stats = missionStats.get(student.id) || { completed: 0, lastActivity: null };
        return {
          ...student,
          missions_completed: stats.completed,
          total_missions: 60,
          last_activity: stats.lastActivity,
        };
      });

      setStudents(studentsWithProgress);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  }

  const getProgramBadge = (program: string) => {
    const styles: Record<string, string> = {
      junior: "bg-green-500/20 text-green-600",
      teen: "bg-blue-500/20 text-blue-600",
      advanced: "bg-purple-500/20 text-purple-600",
    };
    return styles[program] || "bg-muted text-muted-foreground";
  };

  const exportStudentsCSV = () => {
    const headers = ["Name", "Age", "Program", "Country", "School", "Status", "Missions Completed", "Progress %", "Joined"];
    const rows = students.map((s) => [
      s.full_name,
      s.age,
      s.program,
      s.country || "",
      s.school_name || "",
      s.status || "",
      s.missions_completed,
      ((s.missions_completed / s.total_missions) * 100).toFixed(1),
      s.created_at ? format(new Date(s.created_at), "yyyy-MM-dd") : "",
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `students-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    toast.success("Students exported successfully");
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  if (loading && students.length === 0) {
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
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="text-muted-foreground mt-1">
            Monitor student progress and activity
          </p>
        </div>
        <Button onClick={exportStudentsCSV} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-500" />
              <p className="text-2xl font-bold">{stats.active}</p>
            </div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <p className="text-2xl font-bold">{stats.avgProgress.toFixed(0)}%</p>
            </div>
            <p className="text-sm text-muted-foreground">Avg Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-sm">
                <span>Junior</span>
                <span>{stats.byProgram.junior}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Teen</span>
                <span>{stats.byProgram.teen}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Advanced</span>
                <span>{stats.byProgram.advanced}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or school..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={programFilter} onValueChange={setProgramFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="teen">Teen</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Students ({totalCount})</span>
            {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>School</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{student.full_name}</p>
                      <p className="text-xs text-muted-foreground">
                        Age {student.age} • {student.country || "N/A"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getProgramBadge(student.program)}`}>
                      {student.program}
                    </span>
                  </TableCell>
                  <TableCell>{student.school_name || "-"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={(student.missions_completed / student.total_missions) * 100}
                        className="w-16 h-2"
                      />
                      <span className="text-xs text-muted-foreground">
                        {student.missions_completed}/{student.total_missions}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {student.last_activity
                      ? format(new Date(student.last_activity), "MMM d, yyyy")
                      : "Never"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.status === "active" ? "default" : "secondary"}>
                      {student.status || "pending"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedStudent(student)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {students.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-muted-foreground">No students found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * PAGE_SIZE) + 1} - {Math.min(currentPage * PAGE_SIZE, totalCount)} of {totalCount}
              </p>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                  </PaginationItem>
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const page = currentPage <= 3
                      ? i + 1
                      : currentPage >= totalPages - 2
                        ? totalPages - 4 + i
                        : currentPage - 2 + i;
                    if (page < 1 || page > totalPages) return null;
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={page === currentPage}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  <PaginationItem>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student Detail Dialog */}
      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="font-medium">{selectedStudent.full_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Age</label>
                  <p>{selectedStudent.age}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Program</label>
                  <p className="capitalize">{selectedStudent.program}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Grade</label>
                  <p>{selectedStudent.grade || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Country</label>
                  <p>{selectedStudent.country || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">City</label>
                  <p>{selectedStudent.city || "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">School</label>
                  <p>{selectedStudent.school_name || "N/A"}</p>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Mission Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {selectedStudent.missions_completed} / {selectedStudent.total_missions}
                  </span>
                </div>
                <Progress
                  value={(selectedStudent.missions_completed / selectedStudent.total_missions) * 100}
                  className="h-3"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {((selectedStudent.missions_completed / selectedStudent.total_missions) * 100).toFixed(1)}% complete
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="text-muted-foreground">Joined</label>
                  <p>{selectedStudent.created_at ? format(new Date(selectedStudent.created_at), "MMM d, yyyy") : "N/A"}</p>
                </div>
                <div>
                  <label className="text-muted-foreground">Last Active</label>
                  <p>{selectedStudent.last_activity ? format(new Date(selectedStudent.last_activity), "MMM d, yyyy") : "Never"}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
