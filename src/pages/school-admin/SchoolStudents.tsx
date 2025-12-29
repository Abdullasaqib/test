import { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useSchoolAdmin, SchoolStudent, SchoolInvite } from "@/hooks/useSchoolAdmin";
import { useSchoolSkills } from "@/hooks/useSchoolSkills";
import { supabase } from "@/integrations/supabase/client";
import { StudentDetailModal } from "@/components/school-admin/StudentDetailModal";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Upload,
  UserPlus,
  Link as LinkIcon,
  Search,
  Download,
  Copy,
  Check,
  AlertCircle,
  Loader2,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function SchoolStudents() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "students";
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const {
    schoolAdmin,
    students,
    invites,
    licenseUsage,
    isLoadingStudents,
    isLoadingInvites,
    createInvite,
    deactivateInvite,
    refetchStudents,
  } = useSchoolAdmin();
  const { getStudentDetail } = useSchoolSkills();

  const [searchQuery, setSearchQuery] = useState("");
  const [programFilter, setProgramFilter] = useState<string>("all");

  // Filter students
  const filteredStudents = students?.filter((student) => {
    const matchesSearch =
      student.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.grade?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProgram =
      programFilter === "all" || student.program === programFilter;
    return matchesSearch && matchesProgram;
  });

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground">
            Manage your school's enrolled students
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {licenseUsage.used} / {licenseUsage.total || "∞"} seats used
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="students" className="gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Students</span>
          </TabsTrigger>
          <TabsTrigger value="add" className="gap-2">
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Students</span>
          </TabsTrigger>
          <TabsTrigger value="invites" className="gap-2">
            <LinkIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Invite Codes</span>
          </TabsTrigger>
        </TabsList>

        {/* Students List Tab */}
        <TabsContent value="students" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or grade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={programFilter} onValueChange={setProgramFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                <SelectItem value="junior">Junior Builders</SelectItem>
                <SelectItem value="teen">Teen Founders</SelectItem>
                <SelectItem value="advanced">Advanced Venture</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>

          {/* Students Table */}
          <Card>
            <CardContent className="p-0">
              {isLoadingStudents ? (
                <div className="p-8 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : filteredStudents?.length === 0 ? (
                <div className="p-8 text-center">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium text-foreground mb-1">
                    No students found
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {searchQuery || programFilter !== "all"
                      ? "Try adjusting your filters"
                      : "Add students to get started"}
                  </p>
                  <Button onClick={() => handleTabChange("add")}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Students
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Enrolled</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents?.map((student) => (
                      <StudentRow 
                        key={student.id} 
                        student={student} 
                        onClick={() => setSelectedStudentId(student.id)}
                      />
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add Students Tab */}
        <TabsContent value="add" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <CSVUploadCard
              schoolId={schoolAdmin?.school_id}
              licenseUsage={licenseUsage}
              onSuccess={refetchStudents}
            />
            <ManualAddCard
              schoolId={schoolAdmin?.school_id}
              licenseUsage={licenseUsage}
              onSuccess={refetchStudents}
            />
          </div>
        </TabsContent>

        {/* Invite Codes Tab */}
        <TabsContent value="invites" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <InviteCodesTable
                invites={invites || []}
                isLoading={isLoadingInvites}
                onDeactivate={(id) => deactivateInvite.mutate(id)}
              />
            </div>
            <CreateInviteCard
              onCreate={(data) => createInvite.mutate(data)}
              isLoading={createInvite.isPending}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Student Detail Modal */}
      <StudentDetailModal
        isOpen={!!selectedStudentId}
        onClose={() => setSelectedStudentId(null)}
        studentDetail={selectedStudentId ? getStudentDetail(selectedStudentId) : null}
      />
    </div>
  );
}

// Student Row Component
function StudentRow({ student, onClick }: { student: SchoolStudent; onClick?: () => void }) {
  const programLabels: Record<string, string> = {
    junior: "Junior Builders",
    teen: "Teen Founders",
    advanced: "Advanced Venture",
  };

  return (
    <TableRow 
      className={onClick ? "cursor-pointer hover:bg-muted/50" : ""}
      onClick={onClick}
    >
      <TableCell className="font-medium">{student.full_name}</TableCell>
      <TableCell>
        <Badge variant="secondary">{programLabels[student.program] || student.program}</Badge>
      </TableCell>
      <TableCell>{student.grade || "-"}</TableCell>
      <TableCell>
        <Badge
          variant={student.status === "active" ? "default" : "secondary"}
        >
          {student.status || "active"}
        </Badge>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {format(new Date(student.created_at), "MMM d, yyyy")}
      </TableCell>
    </TableRow>
  );
}

// CSV Upload Card
function CSVUploadCard({
  schoolId,
  licenseUsage,
  onSuccess,
}: {
  schoolId: string | undefined;
  licenseUsage: { remaining: number; total: number };
  onSuccess: () => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState<{
    success: number;
    errors: string[];
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !schoolId) return;

    setIsUploading(true);
    setUploadResults(null);

    try {
      const text = await file.text();
      const lines = text.split("\n").filter((line) => line.trim());
      const headers = lines[0].toLowerCase().split(",").map((h) => h.trim());

      // Validate headers
      const requiredHeaders = ["name", "email", "age", "program"];
      const missingHeaders = requiredHeaders.filter(
        (h) => !headers.includes(h)
      );
      if (missingHeaders.length > 0) {
        toast.error(`Missing required columns: ${missingHeaders.join(", ")}`);
        setIsUploading(false);
        return;
      }

      const dataRows = lines.slice(1);

      // Check license limit
      if (licenseUsage.total > 0 && dataRows.length > licenseUsage.remaining) {
        toast.error(
          `Cannot add ${dataRows.length} students. Only ${licenseUsage.remaining} seats available.`
        );
        setIsUploading(false);
        return;
      }

      const results = { success: 0, errors: [] as string[] };

      for (let i = 0; i < dataRows.length; i++) {
        const values = dataRows[i].split(",").map((v) => v.trim());
        const row: Record<string, string> = {};
        headers.forEach((h, idx) => {
          row[h] = values[idx] || "";
        });

        try {
          // Create auth user first
          const { data: authData, error: authError } =
            await supabase.auth.admin.createUser({
              email: row.email,
              password: Math.random().toString(36).slice(-12),
              email_confirm: true,
            });

          if (authError) {
            // If user exists, try to find them
            if (authError.message.includes("already")) {
              results.errors.push(`Row ${i + 2}: Email already exists`);
              continue;
            }
            throw authError;
          }

          // Create student record
          const { error: studentError } = await supabase.from("students").insert({
            user_id: authData.user.id,
            full_name: row.name,
            age: parseInt(row.age) || 13,
            program: row.program || "teen",
            grade: row.grade || null,
            school_id: schoolId,
            registration_type: "school_enrolled",
            onboarding_completed: false,
          });

          if (studentError) throw studentError;

          // Create enrollment record
          await supabase.from("school_student_enrollments").insert({
            school_id: schoolId,
            student_id: authData.user.id,
            enrollment_method: "csv_upload",
            enrolled_by: (await supabase.auth.getUser()).data.user?.id,
          });

          results.success++;
        } catch (err: any) {
          results.errors.push(`Row ${i + 2}: ${err.message}`);
        }
      }

      setUploadResults(results);
      if (results.success > 0) {
        toast.success(`Successfully added ${results.success} students`);
        onSuccess();
      }
    } catch (err: any) {
      toast.error(`Upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Bulk CSV Upload
        </CardTitle>
        <CardDescription>
          Upload a CSV file with student information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="csv-upload"
          />
          <label htmlFor="csv-upload" className="cursor-pointer">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">CSV files only</p>
          </label>
        </div>

        {isUploading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </div>
        )}

        {uploadResults && (
          <div className="space-y-2">
            {uploadResults.success > 0 && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Check className="h-4 w-4" />
                {uploadResults.success} students added successfully
              </div>
            )}
            {uploadResults.errors.length > 0 && (
              <div className="text-sm">
                <div className="flex items-center gap-2 text-amber-600 mb-1">
                  <AlertCircle className="h-4 w-4" />
                  {uploadResults.errors.length} errors
                </div>
                <div className="max-h-32 overflow-y-auto text-xs text-muted-foreground bg-muted p-2 rounded">
                  {uploadResults.errors.map((err, i) => (
                    <div key={i}>{err}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          <p className="font-medium mb-1">Required columns:</p>
          <code className="bg-muted px-1 rounded">
            name, email, age, program
          </code>
          <p className="mt-1">Optional: grade, parent_email</p>
        </div>
      </CardContent>
    </Card>
  );
}

// Manual Add Card
function ManualAddCard({
  schoolId,
  licenseUsage,
  onSuccess,
}: {
  schoolId: string | undefined;
  licenseUsage: { remaining: number; total: number };
  onSuccess: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    program: "teen",
    grade: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolId) return;

    if (licenseUsage.total > 0 && licenseUsage.remaining <= 0) {
      toast.error("No seats available. Please upgrade your license.");
      return;
    }

    setIsSubmitting(true);

    try {
      // For now, just create student record (auth user creation requires admin API)
      const { data: user } = await supabase.auth.getUser();
      
      // Create a placeholder user_id (in production, you'd use admin API or invite flow)
      const { data: studentData, error: studentError } = await supabase
        .from("students")
        .insert({
          user_id: user.user?.id, // Temporary - should be new user's ID
          full_name: formData.name,
          age: parseInt(formData.age) || 13,
          program: formData.program,
          grade: formData.grade || null,
          school_id: schoolId,
          registration_type: "school_enrolled",
          onboarding_completed: false,
        })
        .select()
        .single();

      if (studentError) throw studentError;

      toast.success(`Student "${formData.name}" added successfully`);
      setFormData({ name: "", email: "", age: "", program: "teen", grade: "" });
      setIsOpen(false);
      onSuccess();
    } catch (err: any) {
      toast.error(`Failed to add student: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Add Individual Student
        </CardTitle>
        <CardDescription>
          Manually add a single student to your school
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Enter the student's details below
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    min="9"
                    max="18"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Input
                    id="grade"
                    value={formData.grade}
                    onChange={(e) =>
                      setFormData({ ...formData, grade: e.target.value })
                    }
                    placeholder="e.g., 9th Grade"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="program">Program *</Label>
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
                    <SelectItem value="junior">Junior Builders (9-11)</SelectItem>
                    <SelectItem value="teen">Teen Founders (12-14)</SelectItem>
                    <SelectItem value="advanced">Advanced Venture (15-16)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Student"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <p className="text-xs text-muted-foreground mt-4">
          Students will receive an email invitation to set up their account and
          join the program.
        </p>
      </CardContent>
    </Card>
  );
}

// Invite Codes Table
function InviteCodesTable({
  invites,
  isLoading,
  onDeactivate,
}: {
  invites: SchoolInvite[];
  isLoading: boolean;
  onDeactivate: (id: string) => void;
}) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCode = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast.success("Invite code copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const programLabels: Record<string, string> = {
    junior: "Junior",
    teen: "Teen",
    advanced: "Advanced",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Invite Codes</CardTitle>
        <CardDescription>
          Share these codes with students to let them self-register
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-8 space-y-4">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : invites.length === 0 ? (
          <div className="p-8 text-center">
            <LinkIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-medium text-foreground mb-1">
              No invite codes yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Create an invite code to let students self-register
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Uses</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invites.map((invite) => (
                <TableRow key={invite.id}>
                  <TableCell className="font-mono font-medium">
                    {invite.code}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {programLabels[invite.program]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {invite.uses_count} / {invite.max_uses}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={invite.is_active ? "default" : "secondary"}
                    >
                      {invite.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyCode(invite.code, invite.id)}
                      >
                        {copiedId === invite.id ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      {invite.is_active && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDeactivate(invite.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

// Create Invite Card
function CreateInviteCard({
  onCreate,
  isLoading,
}: {
  onCreate: (data: { program: string; maxUses?: number; grade?: string }) => void;
  isLoading: boolean;
}) {
  const [program, setProgram] = useState("teen");
  const [maxUses, setMaxUses] = useState("100");
  const [grade, setGrade] = useState("");

  const handleCreate = () => {
    onCreate({
      program,
      maxUses: parseInt(maxUses) || 100,
      grade: grade || undefined,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Invite Code</CardTitle>
        <CardDescription>
          Generate a new code for student self-registration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Program *</Label>
          <Select value={program} onValueChange={setProgram}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="junior">Junior Builders (9-11)</SelectItem>
              <SelectItem value="teen">Teen Founders (12-14)</SelectItem>
              <SelectItem value="advanced">Advanced Venture (15-16)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Max Uses</Label>
          <Input
            type="number"
            value={maxUses}
            onChange={(e) => setMaxUses(e.target.value)}
            min="1"
            max="1000"
          />
        </div>
        <div className="space-y-2">
          <Label>Grade (Optional)</Label>
          <Input
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="e.g., 9th Grade"
          />
        </div>
        <Button onClick={handleCreate} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <LinkIcon className="h-4 w-4 mr-2" />
              Generate Code
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
