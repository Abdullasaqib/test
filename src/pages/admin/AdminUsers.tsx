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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Shield, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface UserWithRoles {
  id: string;
  email: string;
  created_at: string;
  roles: string[];
  student?: {
    full_name: string;
    program: string;
    status: string;
  };
}

const ROLE_OPTIONS = [
  "student",
  "mentor",
  "admin",
  "investor",
  "guardian",
  "school_admin",
  "club_advisor",
];

export default function AdminUsers() {
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<UserWithRoles | null>(null);
  const [newRole, setNewRole] = useState<string>("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      // Fetch students with their user info
      const { data: students, error: studentsError } = await supabase
        .from("students")
        .select("user_id, full_name, program, status");

      if (studentsError) throw studentsError;

      // Fetch all user roles
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id, role");

      if (rolesError) throw rolesError;

      // Group roles by user_id
      const rolesByUser: Record<string, string[]> = {};
      roles?.forEach((r) => {
        if (!rolesByUser[r.user_id]) {
          rolesByUser[r.user_id] = [];
        }
        rolesByUser[r.user_id].push(r.role);
      });

      // Build user list from students
      const userList: UserWithRoles[] = (students || []).map((student) => ({
        id: student.user_id,
        email: "", // Will be populated if needed
        created_at: "",
        roles: rolesByUser[student.user_id] || [],
        student: {
          full_name: student.full_name,
          program: student.program,
          status: student.status || "active",
        },
      }));

      // Add users who have roles but aren't students
      Object.keys(rolesByUser).forEach((userId) => {
        if (!userList.find((u) => u.id === userId)) {
          userList.push({
            id: userId,
            email: "",
            created_at: "",
            roles: rolesByUser[userId],
          });
        }
      });

      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  async function addRole(userId: string, role: string) {
    try {
      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: userId, role: role as any });

      if (error) throw error;

      toast.success(`Added ${role} role`);
      fetchUsers();
      setNewRole("");
    } catch (error: any) {
      console.error("Error adding role:", error);
      toast.error(error.message || "Failed to add role");
    }
  }

  async function removeRole(userId: string, role: string) {
    try {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role", role as any);

      if (error) throw error;

      toast.success(`Removed ${role} role`);
      fetchUsers();
    } catch (error: any) {
      console.error("Error removing role:", error);
      toast.error(error.message || "Failed to remove role");
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.student?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole =
      roleFilter === "all" || user.roles.includes(roleFilter);

    return matchesSearch && matchesRole;
  });

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: "bg-red-500/20 text-red-600",
      mentor: "bg-purple-500/20 text-purple-600",
      student: "bg-blue-500/20 text-blue-600",
      investor: "bg-green-500/20 text-green-600",
      guardian: "bg-orange-500/20 text-orange-600",
      school_admin: "bg-cyan-500/20 text-cyan-600",
      club_advisor: "bg-pink-500/20 text-pink-600",
    };
    return colors[role] || "bg-muted text-muted-foreground";
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
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage users and their roles
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {ROLE_OPTIONS.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.student?.full_name || "Unknown User"}
                  </TableCell>
                  <TableCell>
                    {user.student?.program || "-"}
                  </TableCell>
                  <TableCell>
                    {user.student?.status && (
                      <Badge variant="outline">{user.student.status}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((role) => (
                        <span
                          key={role}
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(
                            role
                          )}`}
                        >
                          {role.replace("_", " ")}
                        </span>
                      ))}
                      {user.roles.length === 0 && (
                        <span className="text-muted-foreground text-sm">
                          No roles
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedUser(user)}
                        >
                          <Shield className="h-4 w-4 mr-1" />
                          Manage Roles
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Manage Roles - {user.student?.full_name || "User"}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          {/* Current Roles */}
                          <div>
                            <h4 className="text-sm font-medium mb-2">
                              Current Roles
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {user.roles.map((role) => (
                                <div
                                  key={role}
                                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                                    role
                                  )}`}
                                >
                                  {role.replace("_", " ")}
                                  <button
                                    onClick={() => removeRole(user.id, role)}
                                    className="ml-1 hover:text-destructive"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                              {user.roles.length === 0 && (
                                <span className="text-muted-foreground text-sm">
                                  No roles assigned
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Add New Role */}
                          <div>
                            <h4 className="text-sm font-medium mb-2">
                              Add Role
                            </h4>
                            <div className="flex gap-2">
                              <Select
                                value={newRole}
                                onValueChange={setNewRole}
                              >
                                <SelectTrigger className="flex-1">
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  {ROLE_OPTIONS.filter(
                                    (r) => !user.roles.includes(r)
                                  ).map((role) => (
                                    <SelectItem key={role} value={role}>
                                      {role.replace("_", " ")}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Button
                                onClick={() => {
                                  if (newRole) addRole(user.id, newRole);
                                }}
                                disabled={!newRole}
                              >
                                <UserPlus className="h-4 w-4 mr-1" />
                                Add
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <p className="text-muted-foreground">No users found</p>
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
