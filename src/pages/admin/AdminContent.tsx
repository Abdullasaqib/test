import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Video,
  FileText,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const PROGRAMS = ["junior", "teen", "advanced"];
const RESOURCE_TYPES = ["video", "article", "template", "tool"];
const RESOURCE_CATEGORIES = ["tools", "templates", "tutorials", "inspiration"];

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState("curriculum");
  const [curriculumWeeks, setCurriculumWeeks] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [liveClasses, setLiveClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog states
  const [weekDialogOpen, setWeekDialogOpen] = useState(false);
  const [resourceDialogOpen, setResourceDialogOpen] = useState(false);
  const [classDialogOpen, setClassDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form states
  const [weekForm, setWeekForm] = useState({
    week_number: 1,
    title: "",
    description: "",
    program: "teen",
    video_url: "",
    template_url: "",
    homework_description: "",
  });

  const [resourceForm, setResourceForm] = useState({
    title: "",
    description: "",
    url: "",
    resource_type: "video",
    category: "tutorials",
    program: "teen",
    week_number: null as number | null,
    is_featured: false,
  });

  const [classForm, setClassForm] = useState({
    title: "",
    description: "",
    program: "teen",
    scheduled_at: "",
    duration_minutes: 60,
    zoom_link: "",
    week_number: null as number | null,
    class_type: "lesson",
  });

  useEffect(() => {
    fetchAllContent();
  }, []);

  async function fetchAllContent() {
    try {
      const [weeksRes, resourcesRes, classesRes] = await Promise.all([
        supabase.from("curriculum_weeks").select("*").order("program").order("week_number"),
        supabase.from("resources").select("*").order("created_at", { ascending: false }),
        supabase.from("live_classes").select("*").order("scheduled_at", { ascending: false }),
      ]);

      if (weeksRes.error) throw weeksRes.error;
      if (resourcesRes.error) throw resourcesRes.error;
      if (classesRes.error) throw classesRes.error;

      setCurriculumWeeks(weeksRes.data || []);
      setResources(resourcesRes.data || []);
      setLiveClasses(classesRes.data || []);
    } catch (error) {
      console.error("Error fetching content:", error);
      toast.error("Failed to load content");
    } finally {
      setLoading(false);
    }
  }

  // Curriculum Week handlers
  async function handleWeekSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editingItem) {
        const { error } = await supabase
          .from("curriculum_weeks")
          .update(weekForm)
          .eq("id", editingItem.id);
        if (error) throw error;
        toast.success("Week updated");
      } else {
        const { error } = await supabase.from("curriculum_weeks").insert(weekForm);
        if (error) throw error;
        toast.success("Week created");
      }
      setWeekDialogOpen(false);
      resetWeekForm();
      fetchAllContent();
    } catch (error: any) {
      toast.error(error.message || "Failed to save week");
    }
  }

  async function deleteWeek(id: string) {
    if (!confirm("Delete this curriculum week?")) return;
    try {
      const { error } = await supabase.from("curriculum_weeks").delete().eq("id", id);
      if (error) throw error;
      toast.success("Week deleted");
      fetchAllContent();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete");
    }
  }

  function resetWeekForm() {
    setWeekForm({
      week_number: 1,
      title: "",
      description: "",
      program: "teen",
      video_url: "",
      template_url: "",
      homework_description: "",
    });
    setEditingItem(null);
  }

  function editWeek(week: any) {
    setEditingItem(week);
    setWeekForm({
      week_number: week.week_number,
      title: week.title,
      description: week.description || "",
      program: week.program,
      video_url: week.video_url || "",
      template_url: week.template_url || "",
      homework_description: week.homework_description || "",
    });
    setWeekDialogOpen(true);
  }

  // Resource handlers
  async function handleResourceSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editingItem) {
        const { error } = await supabase
          .from("resources")
          .update(resourceForm)
          .eq("id", editingItem.id);
        if (error) throw error;
        toast.success("Resource updated");
      } else {
        const { error } = await supabase.from("resources").insert(resourceForm);
        if (error) throw error;
        toast.success("Resource created");
      }
      setResourceDialogOpen(false);
      resetResourceForm();
      fetchAllContent();
    } catch (error: any) {
      toast.error(error.message || "Failed to save resource");
    }
  }

  async function deleteResource(id: string) {
    if (!confirm("Delete this resource?")) return;
    try {
      const { error } = await supabase.from("resources").delete().eq("id", id);
      if (error) throw error;
      toast.success("Resource deleted");
      fetchAllContent();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete");
    }
  }

  function resetResourceForm() {
    setResourceForm({
      title: "",
      description: "",
      url: "",
      resource_type: "video",
      category: "tutorials",
      program: "teen",
      week_number: null,
      is_featured: false,
    });
    setEditingItem(null);
  }

  function editResource(resource: any) {
    setEditingItem(resource);
    setResourceForm({
      title: resource.title,
      description: resource.description || "",
      url: resource.url,
      resource_type: resource.resource_type,
      category: resource.category,
      program: resource.program || "teen",
      week_number: resource.week_number,
      is_featured: resource.is_featured || false,
    });
    setResourceDialogOpen(true);
  }

  // Live Class handlers
  async function handleClassSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const classData = {
        ...classForm,
        scheduled_at: new Date(classForm.scheduled_at).toISOString(),
      };
      if (editingItem) {
        const { error } = await supabase
          .from("live_classes")
          .update(classData)
          .eq("id", editingItem.id);
        if (error) throw error;
        toast.success("Class updated");
      } else {
        const { error } = await supabase.from("live_classes").insert(classData);
        if (error) throw error;
        toast.success("Class created");
      }
      setClassDialogOpen(false);
      resetClassForm();
      fetchAllContent();
    } catch (error: any) {
      toast.error(error.message || "Failed to save class");
    }
  }

  async function deleteClass(id: string) {
    if (!confirm("Delete this live class?")) return;
    try {
      const { error } = await supabase.from("live_classes").delete().eq("id", id);
      if (error) throw error;
      toast.success("Class deleted");
      fetchAllContent();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete");
    }
  }

  function resetClassForm() {
    setClassForm({
      title: "",
      description: "",
      program: "teen",
      scheduled_at: "",
      duration_minutes: 60,
      zoom_link: "",
      week_number: null,
      class_type: "lesson",
    });
    setEditingItem(null);
  }

  function editClass(liveClass: any) {
    setEditingItem(liveClass);
    setClassForm({
      title: liveClass.title,
      description: liveClass.description || "",
      program: liveClass.program,
      scheduled_at: liveClass.scheduled_at.slice(0, 16),
      duration_minutes: liveClass.duration_minutes,
      zoom_link: liveClass.zoom_link,
      week_number: liveClass.week_number,
      class_type: liveClass.class_type || "lesson",
    });
    setClassDialogOpen(true);
  }

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
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage curriculum, resources, and live classes
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="curriculum" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Curriculum
          </TabsTrigger>
          <TabsTrigger value="resources" className="gap-2">
            <FileText className="h-4 w-4" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="classes" className="gap-2">
            <Video className="h-4 w-4" />
            Live Classes
          </TabsTrigger>
        </TabsList>

        {/* Curriculum Tab */}
        <TabsContent value="curriculum" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={weekDialogOpen} onOpenChange={setWeekDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetWeekForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Week
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>{editingItem ? "Edit Week" : "Add Week"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleWeekSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Week Number</Label>
                      <Input
                        type="number"
                        min={1}
                        value={weekForm.week_number}
                        onChange={(e) => setWeekForm({ ...weekForm, week_number: parseInt(e.target.value) })}
                        required
                      />
                    </div>
                    <div>
                      <Label>Program</Label>
                      <Select value={weekForm.program} onValueChange={(v) => setWeekForm({ ...weekForm, program: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {PROGRAMS.map((p) => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={weekForm.title}
                      onChange={(e) => setWeekForm({ ...weekForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={weekForm.description}
                      onChange={(e) => setWeekForm({ ...weekForm, description: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Video URL</Label>
                    <Input
                      value={weekForm.video_url}
                      onChange={(e) => setWeekForm({ ...weekForm, video_url: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Template URL</Label>
                    <Input
                      value={weekForm.template_url}
                      onChange={(e) => setWeekForm({ ...weekForm, template_url: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Homework Description</Label>
                    <Textarea
                      value={weekForm.homework_description}
                      onChange={(e) => setWeekForm({ ...weekForm, homework_description: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setWeekDialogOpen(false)}>Cancel</Button>
                    <Button type="submit">{editingItem ? "Update" : "Create"}</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Week</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {curriculumWeeks.map((week) => (
                    <TableRow key={week.id}>
                      <TableCell className="font-medium">Week {week.week_number}</TableCell>
                      <TableCell>{week.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{week.program}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {week.video_url && <Badge variant="secondary">Video</Badge>}
                          {week.template_url && <Badge variant="secondary">Template</Badge>}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => editWeek(week)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteWeek(week.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={resourceDialogOpen} onOpenChange={setResourceDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetResourceForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Resource
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>{editingItem ? "Edit Resource" : "Add Resource"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleResourceSubmit} className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={resourceForm.title}
                      onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>URL</Label>
                    <Input
                      value={resourceForm.url}
                      onChange={(e) => setResourceForm({ ...resourceForm, url: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Type</Label>
                      <Select value={resourceForm.resource_type} onValueChange={(v) => setResourceForm({ ...resourceForm, resource_type: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {RESOURCE_TYPES.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Select value={resourceForm.category} onValueChange={(v) => setResourceForm({ ...resourceForm, category: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {RESOURCE_CATEGORIES.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={resourceForm.description}
                      onChange={(e) => setResourceForm({ ...resourceForm, description: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setResourceDialogOpen(false)}>Cancel</Button>
                    <Button type="submit">{editingItem ? "Update" : "Create"}</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell className="font-medium">{resource.title}</TableCell>
                      <TableCell><Badge variant="outline">{resource.resource_type}</Badge></TableCell>
                      <TableCell><Badge variant="secondary">{resource.category}</Badge></TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => editResource(resource)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteResource(resource.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Live Classes Tab */}
        <TabsContent value="classes" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={classDialogOpen} onOpenChange={setClassDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetClassForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Class
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>{editingItem ? "Edit Class" : "Add Class"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleClassSubmit} className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={classForm.title}
                      onChange={(e) => setClassForm({ ...classForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Program</Label>
                      <Select value={classForm.program} onValueChange={(v) => setClassForm({ ...classForm, program: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {PROGRAMS.map((p) => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Duration (min)</Label>
                      <Input
                        type="number"
                        min={15}
                        value={classForm.duration_minutes}
                        onChange={(e) => setClassForm({ ...classForm, duration_minutes: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Scheduled At</Label>
                    <Input
                      type="datetime-local"
                      value={classForm.scheduled_at}
                      onChange={(e) => setClassForm({ ...classForm, scheduled_at: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Zoom Link</Label>
                    <Input
                      value={classForm.zoom_link}
                      onChange={(e) => setClassForm({ ...classForm, zoom_link: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={classForm.description}
                      onChange={(e) => setClassForm({ ...classForm, description: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setClassDialogOpen(false)}>Cancel</Button>
                    <Button type="submit">{editingItem ? "Update" : "Create"}</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Scheduled</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {liveClasses.map((liveClass) => (
                    <TableRow key={liveClass.id}>
                      <TableCell className="font-medium">{liveClass.title}</TableCell>
                      <TableCell><Badge variant="outline">{liveClass.program}</Badge></TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(liveClass.scheduled_at), "MMM d, h:mm a")}
                        </div>
                      </TableCell>
                      <TableCell>{liveClass.duration_minutes} min</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => editClass(liveClass)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteClass(liveClass.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
