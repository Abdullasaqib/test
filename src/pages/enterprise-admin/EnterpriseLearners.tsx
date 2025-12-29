import { useState } from "react";
import { EnterpriseAdminLayout } from "@/components/enterprise-admin/EnterpriseAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useEnterpriseAdmin } from "@/hooks/useEnterpriseAdmin";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UserPlus, Mail, Search, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function EnterpriseLearners() {
  const { currentOrg, learners, stats, isLoading } = useEnterpriseAdmin();
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isInviting, setIsInviting] = useState(false);
  const queryClient = useQueryClient();

  const filteredLearners = learners?.filter(learner => 
    learner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    learner.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    learner.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInvite = async () => {
    if (!inviteEmail || !currentOrg) return;
    
    if (stats.seatsRemaining <= 0) {
      toast.error("No seats remaining. Contact support to upgrade.");
      return;
    }

    setIsInviting(true);
    try {
      const { error } = await supabase
        .from('enterprise_learners')
        .insert({
          organization_id: currentOrg.id,
          email: inviteEmail,
          full_name: inviteName || null,
          status: 'invited'
        });

      if (error) throw error;

      toast.success(`Invitation sent to ${inviteEmail}`);
      setInviteEmail("");
      setInviteName("");
      queryClient.invalidateQueries({ queryKey: ['enterprise-learners'] });
    } catch (error: any) {
      toast.error(error.message || "Failed to invite learner");
    } finally {
      setIsInviting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "outline" | "destructive"; label: string }> = {
      invited: { variant: "outline", label: "Invited" },
      active: { variant: "default", label: "Active" },
      completed: { variant: "secondary", label: "Completed" },
      inactive: { variant: "destructive", label: "Inactive" },
    };
    const config = variants[status] || variants.invited;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (isLoading) {
    return (
      <EnterpriseAdminLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </EnterpriseAdminLayout>
    );
  }

  return (
    <EnterpriseAdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learners</h1>
          <p className="text-muted-foreground">
            Manage your organization's learners ({stats.totalLearners}/{currentOrg?.max_seats} seats used)
          </p>
        </div>

        {/* Invite Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Invite Learner
            </CardTitle>
            <CardDescription>
              Add team members to your AI Builder program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Email address"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="flex-1"
              />
              <Input
                placeholder="Full name (optional)"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleInvite} disabled={isInviting || !inviteEmail}>
                <Mail className="h-4 w-4 mr-2" />
                {isInviting ? "Sending..." : "Invite"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Learners Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Learners</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search learners..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredLearners && filteredLearners.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Enrolled</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLearners.map((learner) => (
                    <TableRow key={learner.id}>
                      <TableCell className="font-medium">
                        {learner.full_name || "—"}
                      </TableCell>
                      <TableCell>{learner.email}</TableCell>
                      <TableCell>{learner.department || "—"}</TableCell>
                      <TableCell>{getStatusBadge(learner.status)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(learner.enrolled_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Progress</DropdownMenuItem>
                            <DropdownMenuItem>Resend Invite</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                {searchQuery ? "No learners match your search" : "No learners yet. Invite your first team member above."}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </EnterpriseAdminLayout>
  );
}
