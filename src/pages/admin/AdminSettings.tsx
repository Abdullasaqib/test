import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Bell,
  Shield,
  Database,
  Mail,
  Globe,
  Download,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

const DEFAULT_TEMPLATES: EmailTemplate[] = [
  {
    id: "welcome",
    name: "Welcome Email",
    subject: "Welcome to NEXT BILLION LAB!",
    body: `Hi {{name}},

Welcome to NEXT BILLION LAB! We're excited to have you join our community of young entrepreneurs.

Your journey to building your first startup begins now. Here's what you can expect:
- Daily 30-minute missions to build your business
- AI-powered coaching and guidance
- Real-world skills that matter

Log in to your dashboard to start your first mission!

Best,
The NEXT BILLION LAB Team`,
  },
  {
    id: "application_received",
    name: "Application Received",
    subject: "Application Received - NEXT BILLION LAB",
    body: `Hi {{name}},

Thank you for applying to NEXT BILLION LAB! We've received your application for the {{program}} program.

What happens next:
1. Our AI will score your application within 24 hours
2. You'll receive feedback on your pitch
3. Top applicants will be invited to the next round

Good luck!

The NEXT BILLION LAB Team`,
  },
  {
    id: "acceptance",
    name: "Acceptance Letter",
    subject: "Congratulations! You're Accepted to NEXT BILLION LAB",
    body: `Hi {{name}},

Congratulations! 🎉

We're thrilled to inform you that you've been accepted to the NEXT BILLION LAB {{program}} program!

Your startup idea "{{startup_name}}" impressed us, and we can't wait to help you bring it to life.

Next steps:
1. Complete your enrollment by {{deadline}}
2. Set up your student account
3. Get ready for Day 1!

Welcome to the next generation of founders.

The NEXT BILLION LAB Team`,
  },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    platformName: "NEXT BILLION LAB",
    supportEmail: "support@nextbillionlab.com",
    newApplicationAlerts: true,
    mentorBookingAlerts: true,
    weeklyReports: false,
    requireEmailVerification: true,
    twoFactorAuth: false,
    sessionTimeout: 60,
  });

  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState<string | null>(null);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [templates, setTemplates] = useState<EmailTemplate[]>(DEFAULT_TEMPLATES);

  const saveSettings = async () => {
    setSaving(true);
    // In a real app, save to database
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success("Settings saved successfully");
    setSaving(false);
  };

  const exportApplicationsCSV = async () => {
    setExporting("applications");
    try {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const headers = [
        "ID", "Founder Name", "Email", "Age", "Country", "City", "School",
        "Startup Name", "Problem", "Solution", "Pitch", "Status", "Score", "Rank", "Created"
      ];
      
      const rows = (data || []).map((app) => [
        app.id.slice(0, 8),
        app.founder_name,
        app.email,
        app.age,
        app.country,
        app.city || "",
        app.school_name || "",
        app.startup_name,
        `"${(app.problem_statement || "").replace(/"/g, '""')}"`,
        `"${(app.solution_description || "").replace(/"/g, '""')}"`,
        `"${(app.pitch_description || "").replace(/"/g, '""')}"`,
        app.status,
        app.final_score || "",
        app.rank || "",
        app.created_at ? format(new Date(app.created_at), "yyyy-MM-dd") : "",
      ]);

      const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
      downloadCSV(csv, `applications-${format(new Date(), "yyyy-MM-dd")}.csv`);
      toast.success("Applications exported successfully");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export applications");
    } finally {
      setExporting(null);
    }
  };

  const exportStudentsCSV = async () => {
    setExporting("students");
    try {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const headers = ["ID", "Name", "Age", "Program", "Country", "City", "School", "Grade", "Status", "Joined"];
      
      const rows = (data || []).map((student) => [
        student.id.slice(0, 8),
        student.full_name,
        student.age,
        student.program,
        student.country || "",
        student.city || "",
        student.school_name || "",
        student.grade || "",
        student.status || "",
        student.created_at ? format(new Date(student.created_at), "yyyy-MM-dd") : "",
      ]);

      const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
      downloadCSV(csv, `students-${format(new Date(), "yyyy-MM-dd")}.csv`);
      toast.success("Students exported successfully");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export students");
    } finally {
      setExporting(null);
    }
  };

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const openTemplateEditor = (template: EmailTemplate) => {
    setSelectedTemplate({ ...template });
    setEmailDialogOpen(true);
  };

  const saveTemplate = () => {
    if (!selectedTemplate) return;
    
    setTemplates((prev) =>
      prev.map((t) => (t.id === selectedTemplate.id ? selectedTemplate : t))
    );
    setEmailDialogOpen(false);
    toast.success("Email template saved");
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure platform settings and preferences
          </p>
        </div>
        <Button onClick={saveSettings} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>Basic platform configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Platform Name</Label>
                <p className="text-sm text-muted-foreground">
                  The name displayed across the platform
                </p>
              </div>
              <Input
                value={settings.platformName}
                onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                className="w-[250px]"
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Support Email</Label>
                <p className="text-sm text-muted-foreground">
                  Contact email for support inquiries
                </p>
              </div>
              <Input
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-[250px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Configure email and push notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>New Application Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when new applications are submitted
                </p>
              </div>
              <Switch
                checked={settings.newApplicationAlerts}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, newApplicationAlerts: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Mentor Booking Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about mentor booking requests
                </p>
              </div>
              <Switch
                checked={settings.mentorBookingAlerts}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, mentorBookingAlerts: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly Summary Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Receive weekly platform activity summaries
                </p>
              </div>
              <Switch
                checked={settings.weeklyReports}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, weeklyReports: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>Security and access control settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Require Email Verification</Label>
                <p className="text-sm text-muted-foreground">
                  Users must verify email before accessing platform
                </p>
              </div>
              <Switch
                checked={settings.requireEmailVerification}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, requireEmailVerification: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, twoFactorAuth: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Session Timeout (minutes)</Label>
                <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
              </div>
              <Input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) =>
                  setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) || 60 })
                }
                className="w-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Templates
            </CardTitle>
            <CardDescription>Configure automated email communications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {templates.map((template) => (
              <div key={template.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>{template.name}</Label>
                    <p className="text-sm text-muted-foreground">{template.subject}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => openTemplateEditor(template)}>
                    Edit Template
                  </Button>
                </div>
                {template.id !== templates[templates.length - 1].id && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Management
            </CardTitle>
            <CardDescription>Database and data export options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Export Applications</Label>
                <p className="text-sm text-muted-foreground">Download all applications as CSV</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={exportApplicationsCSV}
                disabled={exporting === "applications"}
              >
                <Download className="h-4 w-4 mr-2" />
                {exporting === "applications" ? "Exporting..." : "Export CSV"}
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Export Students</Label>
                <p className="text-sm text-muted-foreground">Download student roster as CSV</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={exportStudentsCSV}
                disabled={exporting === "students"}
              >
                <Download className="h-4 w-4 mr-2" />
                {exporting === "students" ? "Exporting..." : "Export CSV"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Template Editor Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Email Template</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  value={selectedTemplate.subject}
                  onChange={(e) =>
                    setSelectedTemplate({ ...selectedTemplate, subject: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="body">Email Body</Label>
                <p className="text-xs text-muted-foreground mb-2">
                  Available variables: {"{{name}}"}, {"{{program}}"}, {"{{startup_name}}"}, {"{{deadline}}"}
                </p>
                <Textarea
                  id="body"
                  value={selectedTemplate.body}
                  onChange={(e) =>
                    setSelectedTemplate({ ...selectedTemplate, body: e.target.value })
                  }
                  rows={12}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveTemplate}>Save Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
