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
import { Switch } from "@/components/ui/switch";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Plus, Edit, Search, Users, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface School {
  id: string;
  name: string;
  code: string | null;
  country: string | null;
  city: string | null;
  contact_name: string | null;
  contact_email: string | null;
  plan_type: string;
  max_students: number | null;
  is_active: boolean;
  created_at: string;
  student_count: number;
}

interface AggregatedStats {
  total: number;
  active: number;
  totalStudents: number;
  uniqueCountries: number;
}

const PLAN_TYPES = ["basic", "premium", "enterprise"];
const PAGE_SIZE = 50;

export default function AdminSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [stats, setStats] = useState<AggregatedStats>({
    total: 0,
    active: 0,
    totalStudents: 0,
    uniqueCountries: 0,
  });
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    country: "",
    city: "",
    contact_name: "",
    contact_email: "",
    plan_type: "basic",
    max_students: 50,
  });

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchSchools();
  }, [currentPage, debouncedSearch]);

  async function fetchStats() {
    try {
      // Get all schools for stats in one query
      const { data: schoolsData, error: schoolsError } = await supabase
        .from("schools")
        .select("id, name, is_active, country");

      if (schoolsError) throw schoolsError;

      const allSchools = schoolsData || [];
      const schoolNames = allSchools.map((s) => s.name);

      // Get student counts grouped by school_name in ONE query
      const { data: studentCounts, error: studentError } = await supabase
        .from("students")
        .select("school_name");

      if (studentError) throw studentError;

      // Count students per school
      const countMap = new Map<string, number>();
      (studentCounts || []).forEach((s) => {
        if (s.school_name && schoolNames.includes(s.school_name)) {
          countMap.set(s.school_name, (countMap.get(s.school_name) || 0) + 1);
        }
      });

      const totalStudents = Array.from(countMap.values()).reduce((a, b) => a + b, 0);
      const uniqueCountries = new Set(allSchools.map((s) => s.country).filter(Boolean)).size;

      setStats({
        total: allSchools.length,
        active: allSchools.filter((s) => s.is_active).length,
        totalStudents,
        uniqueCountries,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }

  async function fetchSchools() {
    try {
      setLoading(true);

      // Build query with search filter
      let query = supabase
        .from("schools")
        .select("*", { count: "exact" });

      if (debouncedSearch) {
        query = query.or(`name.ilike.%${debouncedSearch}%,country.ilike.%${debouncedSearch}%,city.ilike.%${debouncedSearch}%`);
      }

      // Get paginated results
      const offset = (currentPage - 1) * PAGE_SIZE;
      const { data: schoolsData, error: schoolsError, count } = await query
        .order("created_at", { ascending: false })
        .range(offset, offset + PAGE_SIZE - 1);

      if (schoolsError) throw schoolsError;

      setTotalCount(count || 0);

      if (!schoolsData || schoolsData.length === 0) {
        setSchools([]);
        return;
      }

      // Get all school names for student count lookup
      const schoolNames = schoolsData.map((s) => s.name);

      // Get student counts for these schools in ONE query
      const { data: studentData } = await supabase
        .from("students")
        .select("school_name")
        .in("school_name", schoolNames);

      // Count students per school
      const countMap = new Map<string, number>();
      (studentData || []).forEach((s) => {
        if (s.school_name) {
          countMap.set(s.school_name, (countMap.get(s.school_name) || 0) + 1);
        }
      });

      // Map schools with counts
      const schoolsWithCounts: School[] = schoolsData.map((school) => ({
        ...school,
        student_count: countMap.get(school.name) || 0,
      }));

      setSchools(schoolsWithCounts);
    } catch (error) {
      console.error("Error fetching schools:", error);
      toast.error("Failed to load schools");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const schoolData = {
        name: formData.name,
        code: formData.code || null,
        country: formData.country || null,
        city: formData.city || null,
        contact_name: formData.contact_name || null,
        contact_email: formData.contact_email || null,
        plan_type: formData.plan_type,
        max_students: formData.max_students || null,
      };

      if (editingSchool) {
        const { error } = await supabase
          .from("schools")
          .update(schoolData)
          .eq("id", editingSchool.id);

        if (error) throw error;
        toast.success("School updated");
      } else {
        const { error } = await supabase.from("schools").insert(schoolData);

        if (error) throw error;
        toast.success("School created");
      }

      setDialogOpen(false);
      resetForm();
      fetchSchools();
      fetchStats();
    } catch (error: any) {
      console.error("Error saving school:", error);
      toast.error(error.message || "Failed to save school");
    }
  }

  async function toggleSchoolActive(school: School) {
    try {
      const { error } = await supabase
        .from("schools")
        .update({ is_active: !school.is_active })
        .eq("id", school.id);

      if (error) throw error;
      toast.success("School status updated");
      fetchSchools();
      fetchStats();
    } catch (error: any) {
      console.error("Error updating school:", error);
      toast.error(error.message || "Failed to update school");
    }
  }

  function resetForm() {
    setFormData({
      name: "",
      code: "",
      country: "",
      city: "",
      contact_name: "",
      contact_email: "",
      plan_type: "basic",
      max_students: 50,
    });
    setEditingSchool(null);
  }

  function openEditDialog(school: School) {
    setEditingSchool(school);
    setFormData({
      name: school.name,
      code: school.code || "",
      country: school.country || "",
      city: school.city || "",
      contact_name: school.contact_name || "",
      contact_email: school.contact_email || "",
      plan_type: school.plan_type,
      max_students: school.max_students || 50,
    });
    setDialogOpen(true);
  }

  const getPlanBadge = (plan: string) => {
    const styles: Record<string, string> = {
      basic: "bg-muted text-muted-foreground",
      premium: "bg-purple-500/20 text-purple-600",
      enterprise: "bg-yellow-500/20 text-yellow-600",
    };
    return styles[plan] || styles.basic;
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  if (loading && schools.length === 0) {
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
          <h1 className="text-3xl font-bold">School Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage partner schools and institutions
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add School
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingSchool ? "Edit School" : "Add New School"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">School Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="code">School Code</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    placeholder="e.g., SCHOOL001"
                  />
                </div>
                <div>
                  <Label htmlFor="plan_type">Plan Type</Label>
                  <Select
                    value={formData.plan_type}
                    onValueChange={(v) =>
                      setFormData({ ...formData, plan_type: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PLAN_TYPES.map((plan) => (
                        <SelectItem key={plan} value={plan}>
                          {plan.charAt(0).toUpperCase() + plan.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_name">Contact Name</Label>
                  <Input
                    id="contact_name"
                    value={formData.contact_name}
                    onChange={(e) =>
                      setFormData({ ...formData, contact_name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="contact_email">Contact Email</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) =>
                      setFormData({ ...formData, contact_email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="max_students">Max Students</Label>
                <Input
                  id="max_students"
                  type="number"
                  min={1}
                  value={formData.max_students}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      max_students: parseInt(e.target.value),
                    })
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
                  {editingSchool ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total Schools</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-2xl font-bold">{stats.active}</p>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-2xl font-bold">{stats.totalStudents}</p>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-2xl font-bold">{stats.uniqueCountries}</p>
            <p className="text-sm text-muted-foreground">Countries</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, country, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Schools Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Schools ({totalCount})</span>
            {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>School</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schools.map((school) => (
                <TableRow key={school.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{school.name}</p>
                      {school.code && (
                        <p className="text-xs text-muted-foreground">
                          {school.code}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {school.city || school.country ? (
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {[school.city, school.country].filter(Boolean).join(", ")}
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanBadge(
                        school.plan_type
                      )}`}
                    >
                      {school.plan_type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {school.student_count}
                      {school.max_students && ` / ${school.max_students}`}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={school.is_active}
                      onCheckedChange={() => toggleSchoolActive(school)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(school)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {schools.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <p className="text-muted-foreground">No schools found</p>
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
    </div>
  );
}
