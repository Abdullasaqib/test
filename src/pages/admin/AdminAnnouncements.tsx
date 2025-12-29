import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Bell, Plus, Edit, Trash2, Send, Eye } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: string | null;
  target_programs: string[] | null;
  target_roles: string[] | null;
  target_cohort_id: string | null;
  published_at: string | null;
  expires_at: string | null;
  created_at: string;
}

const PROGRAMS = ["junior", "teen", "advanced"];
const PRIORITIES = [
  { value: "low", label: "Low", color: "bg-muted text-muted-foreground" },
  { value: "normal", label: "Normal", color: "bg-blue-500/20 text-blue-600" },
  { value: "high", label: "High", color: "bg-yellow-500/20 text-yellow-600" },
  { value: "urgent", label: "Urgent", color: "bg-red-500/20 text-red-600" },
];

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    priority: "normal",
    target_programs: [] as string[],
    expires_at: "",
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  async function fetchAnnouncements() {
    try {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      toast.error("Failed to load announcements");
    } finally {
      setLoading(false);
    }
  }

  const openCreateDialog = () => {
    setEditingAnnouncement(null);
    setFormData({
      title: "",
      content: "",
      priority: "normal",
      target_programs: [],
      expires_at: "",
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      priority: announcement.priority || "normal",
      target_programs: announcement.target_programs || [],
      expires_at: announcement.expires_at ? format(new Date(announcement.expires_at), "yyyy-MM-dd") : "",
    });
    setIsDialogOpen(true);
  };

  async function saveAnnouncement(publish: boolean = false) {
    try {
      const payload = {
        title: formData.title,
        content: formData.content,
        priority: formData.priority,
        target_programs: formData.target_programs.length > 0 ? formData.target_programs : null,
        expires_at: formData.expires_at ? new Date(formData.expires_at).toISOString() : null,
        ...(publish ? { published_at: new Date().toISOString() } : {}),
      };

      if (editingAnnouncement) {
        const { error } = await supabase
          .from("announcements")
          .update(payload)
          .eq("id", editingAnnouncement.id);

        if (error) throw error;
        toast.success("Announcement updated");
      } else {
        const { error } = await supabase
          .from("announcements")
          .insert(payload);

        if (error) throw error;
        toast.success(publish ? "Announcement published" : "Announcement saved as draft");
      }

      setIsDialogOpen(false);
      fetchAnnouncements();
    } catch (error) {
      console.error("Error saving announcement:", error);
      toast.error("Failed to save announcement");
    }
  }

  async function publishAnnouncement(id: string) {
    try {
      const { error } = await supabase
        .from("announcements")
        .update({ published_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;
      toast.success("Announcement published");
      fetchAnnouncements();
    } catch (error) {
      console.error("Error publishing announcement:", error);
      toast.error("Failed to publish announcement");
    }
  }

  async function deleteAnnouncement(id: string) {
    if (!confirm("Are you sure you want to delete this announcement?")) return;

    try {
      const { error } = await supabase
        .from("announcements")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Announcement deleted");
      fetchAnnouncements();
    } catch (error) {
      console.error("Error deleting announcement:", error);
      toast.error("Failed to delete announcement");
    }
  }

  const toggleProgram = (program: string) => {
    setFormData((prev) => ({
      ...prev,
      target_programs: prev.target_programs.includes(program)
        ? prev.target_programs.filter((p) => p !== program)
        : [...prev.target_programs, program],
    }));
  };

  const getPriorityBadge = (priority: string | null) => {
    const p = PRIORITIES.find((pr) => pr.value === priority) || PRIORITIES[1];
    return p.color;
  };

  const isPublished = (announcement: Announcement) => {
    return announcement.published_at && new Date(announcement.published_at) <= new Date();
  };

  const isExpired = (announcement: Announcement) => {
    return announcement.expires_at && new Date(announcement.expires_at) < new Date();
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const publishedCount = announcements.filter((a) => isPublished(a) && !isExpired(a)).length;
  const draftCount = announcements.filter((a) => !a.published_at).length;
  const expiredCount = announcements.filter((a) => isExpired(a)).length;

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage platform announcements
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          New Announcement
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-green-500" />
              <p className="text-2xl font-bold">{publishedCount}</p>
            </div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-yellow-500" />
              <p className="text-2xl font-bold">{draftCount}</p>
            </div>
            <p className="text-sm text-muted-foreground">Drafts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-muted-foreground">{expiredCount}</p>
            </div>
            <p className="text-sm text-muted-foreground">Expired</p>
          </CardContent>
        </Card>
      </div>

      {/* Announcements Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Announcements ({announcements.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {announcements.map((announcement) => (
                <TableRow key={announcement.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{announcement.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {announcement.content}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityBadge(announcement.priority)}`}>
                      {announcement.priority || "normal"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {announcement.target_programs?.length ? (
                      <div className="flex gap-1 flex-wrap">
                        {announcement.target_programs.map((p) => (
                          <Badge key={p} variant="secondary" className="text-xs capitalize">
                            {p}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">All</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {isExpired(announcement) ? (
                      <Badge variant="secondary">Expired</Badge>
                    ) : isPublished(announcement) ? (
                      <Badge variant="default">Published</Badge>
                    ) : (
                      <Badge variant="outline">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {format(new Date(announcement.created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {!isPublished(announcement) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => publishAnnouncement(announcement.id)}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(announcement)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteAnnouncement(announcement.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {announcements.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <p className="text-muted-foreground">No announcements yet</p>
                    <Button variant="link" onClick={openCreateDialog}>
                      Create your first announcement
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingAnnouncement ? "Edit Announcement" : "Create Announcement"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Announcement title..."
              />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Announcement content..."
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITIES.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Target Programs</Label>
              <p className="text-xs text-muted-foreground mb-2">Leave empty for all programs</p>
              <div className="flex gap-4">
                {PROGRAMS.map((program) => (
                  <div key={program} className="flex items-center space-x-2">
                    <Checkbox
                      id={program}
                      checked={formData.target_programs.includes(program)}
                      onCheckedChange={() => toggleProgram(program)}
                    />
                    <label htmlFor={program} className="text-sm capitalize cursor-pointer">
                      {program}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="expires">Expires At (optional)</Label>
              <Input
                id="expires"
                type="date"
                value={formData.expires_at}
                onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => saveAnnouncement(false)}>
              Save Draft
            </Button>
            <Button onClick={() => saveAnnouncement(true)}>
              <Send className="h-4 w-4 mr-2" />
              Publish Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
