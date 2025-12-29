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
import { Search, DollarSign, CreditCard, Award, Download, Eye } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface Enrollment {
  id: string;
  user_id: string | null;
  student_id: string | null;
  application_id: string | null;
  pricing_tier_id: string | null;
  scholarship_id: string | null;
  status: string | null;
  payment_type: string | null;
  total_amount: number;
  amount_paid: number | null;
  discount_applied: number | null;
  created_at: string;
  enrolled_at: string | null;
  student?: { full_name: string; program: string };
  pricing_tier?: { name: string; program: string };
}

interface Payment {
  id: string;
  enrollment_id: string;
  amount: number;
  status: string | null;
  payment_number: number | null;
  paid_at: string | null;
  created_at: string;
}

export default function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [enrollmentPayments, setEnrollmentPayments] = useState<Payment[]>([]);

  useEffect(() => {
    fetchEnrollments();
    fetchPayments();
  }, []);

  async function fetchEnrollments() {
    try {
      const { data, error } = await supabase
        .from("enrollments")
        .select(`
          *,
          student:students(full_name, program),
          pricing_tier:pricing_tiers(name, program)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEnrollments(data || []);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      toast.error("Failed to load enrollments");
    } finally {
      setLoading(false);
    }
  }

  async function fetchPayments() {
    try {
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPayments(data || []);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  }

  async function updateEnrollmentStatus(id: string, status: string) {
    try {
      const { error } = await supabase
        .from("enrollments")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      toast.success(`Status updated to ${status}`);
      fetchEnrollments();
      setSelectedEnrollment(null);
    } catch (error) {
      console.error("Error updating enrollment:", error);
      toast.error("Failed to update status");
    }
  }

  const viewEnrollmentDetails = async (enrollment: Enrollment) => {
    setSelectedEnrollment(enrollment);
    const enrollmentPayments = payments.filter((p) => p.enrollment_id === enrollment.id);
    setEnrollmentPayments(enrollmentPayments);
  };

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesSearch =
      enrollment.student?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enrollment.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || enrollment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string | null) => {
    const styles: Record<string, string> = {
      pending_payment: "bg-yellow-500/20 text-yellow-600",
      active: "bg-green-500/20 text-green-600",
      completed: "bg-blue-500/20 text-blue-600",
      cancelled: "bg-red-500/20 text-red-600",
      paused: "bg-muted text-muted-foreground",
    };
    return styles[status || "pending_payment"] || styles.pending_payment;
  };

  const exportEnrollmentsCSV = () => {
    const headers = ["ID", "Student", "Program", "Status", "Payment Type", "Total", "Paid", "Created"];
    const rows = filteredEnrollments.map((e) => [
      e.id.slice(0, 8),
      e.student?.full_name || "N/A",
      e.pricing_tier?.program || e.student?.program || "N/A",
      e.status || "pending",
      e.payment_type || "N/A",
      e.total_amount,
      e.amount_paid || 0,
      e.created_at ? format(new Date(e.created_at), "yyyy-MM-dd") : "",
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `enrollments-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    toast.success("Enrollments exported successfully");
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const totalRevenue = enrollments.reduce((sum, e) => sum + (e.amount_paid || 0), 0);
  const pendingRevenue = enrollments.reduce((sum, e) => sum + (e.total_amount - (e.amount_paid || 0)), 0);
  const activeEnrollments = enrollments.filter((e) => e.status === "active").length;
  const scholarshipCount = enrollments.filter((e) => e.scholarship_id).length;

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Enrollment Management</h1>
          <p className="text-muted-foreground mt-1">
            Track payments, scholarships, and enrollment status
          </p>
        </div>
        <Button onClick={exportEnrollmentsCSV} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
            </div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-yellow-500" />
              <p className="text-2xl font-bold">${pendingRevenue.toLocaleString()}</p>
            </div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{activeEnrollments}</p>
            </div>
            <p className="text-sm text-muted-foreground">Active Enrollments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-500" />
              <p className="text-2xl font-bold">{scholarshipCount}</p>
            </div>
            <p className="text-sm text-muted-foreground">Scholarships</p>
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
                placeholder="Search by student name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending_payment">Pending Payment</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Enrollments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Enrollments ({filteredEnrollments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Payment Type</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEnrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{enrollment.student?.full_name || "N/A"}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {enrollment.student?.program || "N/A"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{enrollment.pricing_tier?.name || "N/A"}</TableCell>
                  <TableCell className="capitalize">{enrollment.payment_type || "N/A"}</TableCell>
                  <TableCell>${enrollment.total_amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      ${(enrollment.amount_paid || 0).toLocaleString()}
                      {enrollment.scholarship_id && (
                        <Award className="h-3 w-3 text-purple-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(enrollment.status)}`}>
                      {enrollment.status || "pending"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => viewEnrollmentDetails(enrollment)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredEnrollments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-muted-foreground">No enrollments found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Enrollment Detail Dialog */}
      <Dialog open={!!selectedEnrollment} onOpenChange={() => setSelectedEnrollment(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Enrollment Details</DialogTitle>
          </DialogHeader>
          {selectedEnrollment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Student</label>
                  <p className="font-medium">{selectedEnrollment.student?.full_name || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Program</label>
                  <p className="capitalize">{selectedEnrollment.student?.program || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Pricing Tier</label>
                  <p>{selectedEnrollment.pricing_tier?.name || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Payment Type</label>
                  <p className="capitalize">{selectedEnrollment.payment_type || "N/A"}</p>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>Total Amount</span>
                  <span className="font-bold">${selectedEnrollment.total_amount.toLocaleString()}</span>
                </div>
                {selectedEnrollment.discount_applied && selectedEnrollment.discount_applied > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount</span>
                    <span>-${selectedEnrollment.discount_applied.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between mb-2">
                  <span>Amount Paid</span>
                  <span className="font-bold text-green-600">${(selectedEnrollment.amount_paid || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Remaining</span>
                  <span className="font-bold text-yellow-600">
                    ${(selectedEnrollment.total_amount - (selectedEnrollment.amount_paid || 0)).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Payment History */}
              {enrollmentPayments.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Payment History</label>
                  <div className="space-y-2">
                    {enrollmentPayments.map((payment) => (
                      <div key={payment.id} className="flex justify-between items-center p-2 border rounded">
                        <div>
                          <p className="text-sm font-medium">Payment #{payment.payment_number || 1}</p>
                          <p className="text-xs text-muted-foreground">
                            {payment.paid_at ? format(new Date(payment.paid_at), "MMM d, yyyy") : "Pending"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${payment.amount.toLocaleString()}</p>
                          <Badge variant={payment.status === "paid" ? "default" : "secondary"} className="text-xs">
                            {payment.status || "pending"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Select
                  value={selectedEnrollment.status || "pending_payment"}
                  onValueChange={(value) => updateEnrollmentStatus(selectedEnrollment.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending_payment">Pending Payment</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
