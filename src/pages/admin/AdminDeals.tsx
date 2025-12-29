import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  DollarSign,
  Users,
  Building2,
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  ArrowRight,
  GripVertical,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";

interface Deal {
  id: string;
  school_id: string | null;
  school_name: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  contact_role: string | null;
  stage: string;
  deal_value: number;
  student_count: number;
  license_type: string;
  source: string | null;
  priority: string;
  expected_close_date: string | null;
  actual_close_date: string | null;
  lost_reason: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface DealActivity {
  id: string;
  deal_id: string;
  activity_type: string;
  title: string;
  description: string | null;
  created_at: string;
}

const STAGES = [
  { id: "lead", label: "Lead", color: "bg-muted text-muted-foreground" },
  { id: "contacted", label: "Contacted", color: "bg-blue-500/20 text-blue-400" },
  { id: "demo", label: "Demo", color: "bg-purple-500/20 text-purple-400" },
  { id: "proposal", label: "Proposal", color: "bg-yellow-500/20 text-yellow-400" },
  { id: "negotiating", label: "Negotiating", color: "bg-orange-500/20 text-orange-400" },
  { id: "won", label: "Won", color: "bg-green-500/20 text-green-400" },
  { id: "lost", label: "Lost", color: "bg-red-500/20 text-red-400" },
];

const PRIORITIES = [
  { id: "low", label: "Low", color: "bg-muted text-muted-foreground" },
  { id: "medium", label: "Medium", color: "bg-yellow-500/20 text-yellow-400" },
  { id: "high", label: "High", color: "bg-red-500/20 text-red-400" },
];

const ACTIVITY_TYPES = [
  { id: "note", label: "Note", icon: MessageSquare },
  { id: "call", label: "Call", icon: Phone },
  { id: "email", label: "Email", icon: Mail },
  { id: "meeting", label: "Meeting", icon: Calendar },
];

export default function AdminDeals() {
  const { user } = useAuth();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activities, setActivities] = useState<DealActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activityDialogOpen, setActivityDialogOpen] = useState(false);
  const [draggedDeal, setDraggedDeal] = useState<Deal | null>(null);

  const [formData, setFormData] = useState({
    school_name: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    contact_role: "",
    deal_value: 0,
    student_count: 0,
    license_type: "standard",
    source: "",
    priority: "medium",
    expected_close_date: "",
    notes: "",
  });

  const [activityForm, setActivityForm] = useState({
    activity_type: "note",
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchDeals();
  }, []);

  async function fetchDeals() {
    try {
      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDeals(data || []);
    } catch (error) {
      console.error("Error fetching deals:", error);
      toast.error("Failed to load deals");
    } finally {
      setLoading(false);
    }
  }

  async function fetchActivities(dealId: string) {
    try {
      const { data, error } = await supabase
        .from("deal_activities")
        .select("*")
        .eq("deal_id", dealId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const dealData = {
        school_name: formData.school_name,
        contact_name: formData.contact_name || null,
        contact_email: formData.contact_email || null,
        contact_phone: formData.contact_phone || null,
        contact_role: formData.contact_role || null,
        deal_value: formData.deal_value,
        student_count: formData.student_count,
        license_type: formData.license_type,
        source: formData.source || null,
        priority: formData.priority,
        expected_close_date: formData.expected_close_date || null,
        notes: formData.notes || null,
        stage: "lead",
        created_by: user?.id,
      };

      const { error } = await supabase.from("deals").insert(dealData);
      if (error) throw error;

      toast.success("Deal created successfully");
      setDialogOpen(false);
      resetForm();
      fetchDeals();
    } catch (error: any) {
      console.error("Error creating deal:", error);
      toast.error(error.message || "Failed to create deal");
    }
  }

  async function handleStageChange(deal: Deal, newStage: string) {
    try {
      const updateData: any = { stage: newStage };
      if (newStage === "won") {
        updateData.actual_close_date = new Date().toISOString().split("T")[0];
      }

      const { error } = await supabase
        .from("deals")
        .update(updateData)
        .eq("id", deal.id);

      if (error) throw error;

      // Log activity
      await supabase.from("deal_activities").insert({
        deal_id: deal.id,
        activity_type: "stage_change",
        title: `Stage changed to ${STAGES.find((s) => s.id === newStage)?.label}`,
        description: `Deal moved from ${deal.stage} to ${newStage}`,
        created_by: user?.id,
      });

      toast.success(`Deal moved to ${STAGES.find((s) => s.id === newStage)?.label}`);
      fetchDeals();
    } catch (error: any) {
      console.error("Error updating deal:", error);
      toast.error("Failed to update deal");
    }
  }

  async function handleAddActivity(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDeal) return;

    try {
      const { error } = await supabase.from("deal_activities").insert({
        deal_id: selectedDeal.id,
        activity_type: activityForm.activity_type,
        title: activityForm.title,
        description: activityForm.description || null,
        created_by: user?.id,
      });

      if (error) throw error;

      toast.success("Activity added");
      setActivityDialogOpen(false);
      setActivityForm({ activity_type: "note", title: "", description: "" });
      fetchActivities(selectedDeal.id);
    } catch (error: any) {
      console.error("Error adding activity:", error);
      toast.error("Failed to add activity");
    }
  }

  function resetForm() {
    setFormData({
      school_name: "",
      contact_name: "",
      contact_email: "",
      contact_phone: "",
      contact_role: "",
      deal_value: 0,
      student_count: 0,
      license_type: "standard",
      source: "",
      priority: "medium",
      expected_close_date: "",
      notes: "",
    });
  }

  function openDealSheet(deal: Deal) {
    setSelectedDeal(deal);
    fetchActivities(deal.id);
    setSheetOpen(true);
  }

  function handleDragStart(deal: Deal) {
    setDraggedDeal(deal);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleDrop(stage: string) {
    if (draggedDeal && draggedDeal.stage !== stage) {
      handleStageChange(draggedDeal, stage);
    }
    setDraggedDeal(null);
  }

  const getDealsForStage = (stageId: string) =>
    deals.filter((d) => d.stage === stageId);

  const totalPipelineValue = deals
    .filter((d) => !["won", "lost"].includes(d.stage))
    .reduce((sum, d) => sum + (d.deal_value || 0), 0);

  const wonValue = deals
    .filter((d) => d.stage === "won")
    .reduce((sum, d) => sum + (d.deal_value || 0), 0);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">B2B Deal Pipeline</h1>
          <p className="text-muted-foreground mt-1">
            Manage school partnerships and sales opportunities
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              New Deal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Deal</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="school_name">School Name *</Label>
                <Input
                  id="school_name"
                  value={formData.school_name}
                  onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_name">Contact Name</Label>
                  <Input
                    id="contact_name"
                    value={formData.contact_name}
                    onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="contact_role">Role</Label>
                  <Input
                    id="contact_role"
                    value={formData.contact_role}
                    onChange={(e) => setFormData({ ...formData, contact_role: e.target.value })}
                    placeholder="e.g., Principal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_email">Email</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="contact_phone">Phone</Label>
                  <Input
                    id="contact_phone"
                    value={formData.contact_phone}
                    onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="deal_value">Deal Value ($)</Label>
                  <Input
                    id="deal_value"
                    type="number"
                    min={0}
                    value={formData.deal_value}
                    onChange={(e) => setFormData({ ...formData, deal_value: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="student_count">Students</Label>
                  <Input
                    id="student_count"
                    type="number"
                    min={0}
                    value={formData.student_count}
                    onChange={(e) => setFormData({ ...formData, student_count: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(v) => setFormData({ ...formData, priority: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PRIORITIES.map((p) => (
                        <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="license_type">License Type</Label>
                  <Select
                    value={formData.license_type}
                    onValueChange={(v) => setFormData({ ...formData, license_type: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pilot">Pilot ($9)</SelectItem>
                      <SelectItem value="standard">Standard ($45)</SelectItem>
                      <SelectItem value="volume">Volume ($35)</SelectItem>
                      <SelectItem value="enterprise">Enterprise ($30)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="expected_close_date">Expected Close</Label>
                  <Input
                    id="expected_close_date"
                    type="date"
                    value={formData.expected_close_date}
                    onChange={(e) => setFormData({ ...formData, expected_close_date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="source">Lead Source</Label>
                <Input
                  id="source"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  placeholder="e.g., Website, Referral, Conference"
                />
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Deal</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{deals.length}</p>
                <p className="text-sm text-muted-foreground">Total Deals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">${totalPipelineValue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Pipeline Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-500">${wonValue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Won Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">
                  {deals.reduce((sum, d) => sum + (d.student_count || 0), 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => (
          <div
            key={stage.id}
            className="flex-shrink-0 w-72"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(stage.id)}
          >
            <Card className="h-full">
              <CardHeader className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${stage.color}`}>
                      {stage.label}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {getDealsForStage(stage.id).length}
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    ${getDealsForStage(stage.id).reduce((sum, d) => sum + (d.deal_value || 0), 0).toLocaleString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-2">
                <ScrollArea className="h-[calc(100vh-380px)]">
                  <div className="space-y-2 pr-2">
                    {getDealsForStage(stage.id).map((deal) => (
                      <div
                        key={deal.id}
                        draggable
                        onDragStart={() => handleDragStart(deal)}
                        onClick={() => openDealSheet(deal)}
                        className="bg-card border border-border rounded-lg p-3 cursor-pointer hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{deal.school_name}</p>
                            {deal.contact_name && (
                              <p className="text-xs text-muted-foreground truncate">
                                {deal.contact_name}
                                {deal.contact_role && ` • ${deal.contact_role}`}
                              </p>
                            )}
                          </div>
                          <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-medium">
                            ${(deal.deal_value || 0).toLocaleString()}
                          </span>
                          <div className="flex items-center gap-1">
                            {deal.student_count > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {deal.student_count} students
                              </Badge>
                            )}
                            <Badge
                              className={`text-xs ${PRIORITIES.find((p) => p.id === deal.priority)?.color}`}
                            >
                              {deal.priority}
                            </Badge>
                          </div>
                        </div>
                        {deal.expected_close_date && (
                          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(deal.expected_close_date), "MMM d, yyyy")}
                          </div>
                        )}
                      </div>
                    ))}
                    {getDealsForStage(stage.id).length === 0 && (
                      <p className="text-center text-sm text-muted-foreground py-8">
                        No deals
                      </p>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Deal Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          {selectedDeal && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedDeal.school_name}</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-100px)] mt-6">
                <div className="space-y-6 pr-4">
                  {/* Deal Info */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Stage</span>
                      <Select
                        value={selectedDeal.stage}
                        onValueChange={(v) => {
                          handleStageChange(selectedDeal, v);
                          setSelectedDeal({ ...selectedDeal, stage: v });
                        }}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STAGES.map((s) => (
                            <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Deal Value</p>
                        <p className="font-medium">${(selectedDeal.deal_value || 0).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Students</p>
                        <p className="font-medium">{selectedDeal.student_count || 0}</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Contact Info */}
                    <div>
                      <p className="font-medium mb-2">Contact Information</p>
                      <div className="space-y-2 text-sm">
                        {selectedDeal.contact_name && (
                          <p>{selectedDeal.contact_name} {selectedDeal.contact_role && `(${selectedDeal.contact_role})`}</p>
                        )}
                        {selectedDeal.contact_email && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <a href={`mailto:${selectedDeal.contact_email}`} className="hover:underline">
                              {selectedDeal.contact_email}
                            </a>
                          </div>
                        )}
                        {selectedDeal.contact_phone && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            {selectedDeal.contact_phone}
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Notes */}
                    {selectedDeal.notes && (
                      <div>
                        <p className="font-medium mb-2">Notes</p>
                        <p className="text-sm text-muted-foreground">{selectedDeal.notes}</p>
                      </div>
                    )}

                    <Separator />

                    {/* Activity Timeline */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <p className="font-medium">Activity Timeline</p>
                        <Dialog open={activityDialogOpen} onOpenChange={setActivityDialogOpen}>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Plus className="h-4 w-4 mr-1" />
                              Add Activity
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Log Activity</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddActivity} className="space-y-4">
                              <div>
                                <Label>Activity Type</Label>
                                <div className="flex gap-2 mt-2">
                                  {ACTIVITY_TYPES.map((type) => (
                                    <Button
                                      key={type.id}
                                      type="button"
                                      variant={activityForm.activity_type === type.id ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => setActivityForm({ ...activityForm, activity_type: type.id })}
                                    >
                                      <type.icon className="h-4 w-4 mr-1" />
                                      {type.label}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="activity_title">Title</Label>
                                <Input
                                  id="activity_title"
                                  value={activityForm.title}
                                  onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="activity_description">Description</Label>
                                <Textarea
                                  id="activity_description"
                                  value={activityForm.description}
                                  onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })}
                                  rows={3}
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => setActivityDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button type="submit">Add Activity</Button>
                              </div>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>

                      <div className="space-y-4">
                        {activities.map((activity) => {
                          const activityType = ACTIVITY_TYPES.find((t) => t.id === activity.activity_type);
                          const Icon = activityType?.icon || MessageSquare;
                          return (
                            <div key={activity.id} className="flex gap-3">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                <Icon className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium">{activity.title}</p>
                                {activity.description && (
                                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                                )}
                                <p className="text-xs text-muted-foreground mt-1">
                                  {format(new Date(activity.created_at), "MMM d, yyyy 'at' h:mm a")}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                        {activities.length === 0 && (
                          <p className="text-center text-sm text-muted-foreground py-4">
                            No activities yet
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}