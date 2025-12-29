import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, Users, Plus, RefreshCw, FileText, Rocket } from "lucide-react";
import { format } from "date-fns";

interface EmailTemplate {
  id: string;
  name: string;
  sequence: string;
  subject: string;
  preview_text: string | null;
  html_content: string;
  order_in_sequence: number;
  is_active: boolean;
  created_at: string;
}

interface EmailCampaign {
  id: string;
  name: string;
  sequence: string;
  status: string;
  scheduled_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  total_recipients: number;
  sent_count: number;
  created_at: string;
}

const sequenceOptions = [
  { value: "parent_launch", label: "Parent Launch" },
  { value: "school_outreach", label: "School Outreach" },
  { value: "government", label: "Government" },
];

const statusColors: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  scheduled: "bg-blue-500/20 text-blue-400",
  sending: "bg-yellow-500/20 text-yellow-400",
  completed: "bg-green-500/20 text-green-400",
  pending: "bg-muted text-muted-foreground",
  sent: "bg-green-500/20 text-green-400",
  opened: "bg-blue-500/20 text-blue-400",
  clicked: "bg-purple-500/20 text-purple-400",
  failed: "bg-red-500/20 text-red-400",
  bounced: "bg-orange-500/20 text-orange-400",
};

export default function AdminEmailCampaigns() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [testEmail, setTestEmail] = useState("");
  const [newCampaignOpen, setNewCampaignOpen] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [campaignSequence, setCampaignSequence] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [bulkEmails, setBulkEmails] = useState("");

  // Fetch templates
  const { data: templates, isLoading: templatesLoading } = useQuery({
    queryKey: ["email-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("email_templates")
        .select("*")
        .order("sequence", { ascending: true })
        .order("order_in_sequence", { ascending: true });
      if (error) throw error;
      return data as EmailTemplate[];
    },
  });

  // Fetch campaigns
  const { data: campaigns, isLoading: campaignsLoading } = useQuery({
    queryKey: ["email-campaigns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("email_campaigns")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as EmailCampaign[];
    },
  });

  // Fetch leads for recipient selection
  const { data: leads } = useQuery({
    queryKey: ["leads-for-email"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Send test email mutation
  const sendTestMutation = useMutation({
    mutationFn: async ({ templateId, email }: { templateId: string; email: string }) => {
      const { data, error } = await supabase.functions.invoke("send-campaign-email", {
        body: { action: "send_test", templateId, recipientEmail: email },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({ title: "Test email sent!", description: "Check your inbox." });
      setTestEmail("");
    },
    onError: (error) => {
      toast({ title: "Failed to send test email", description: error.message, variant: "destructive" });
    },
  });

  // Create campaign mutation
  const createCampaignMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from("email_campaigns")
        .insert({
          name: campaignName,
          sequence: campaignSequence,
          status: "draft",
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({ title: "Campaign created!" });
      queryClient.invalidateQueries({ queryKey: ["email-campaigns"] });
      setNewCampaignOpen(false);
      setCampaignName("");
      setCampaignSequence("");
    },
    onError: (error) => {
      toast({ title: "Failed to create campaign", description: error.message, variant: "destructive" });
    },
  });

  // Send campaign mutation
  const sendCampaignMutation = useMutation({
    mutationFn: async ({ campaignId, recipients, templateId }: { campaignId: string; recipients: Array<{ email: string; name?: string }>; templateId: string }) => {
      const { data, error } = await supabase.functions.invoke("send-campaign-email", {
        body: { action: "send_bulk", campaignId, recipients, templateId },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast({ 
        title: "Campaign sent!", 
        description: `Sent ${data.sent} emails. ${data.failed} failed.` 
      });
      queryClient.invalidateQueries({ queryKey: ["email-campaigns"] });
    },
    onError: (error) => {
      toast({ title: "Failed to send campaign", description: error.message, variant: "destructive" });
    },
  });

  const handleSendCampaign = (campaignId: string, campaign: EmailCampaign) => {
    const emails = bulkEmails.split("\n").filter(e => e.trim()).map(line => {
      const [email, name] = line.split(",").map(s => s.trim());
      return { email, name };
    });

    if (emails.length === 0) {
      toast({ title: "No recipients", description: "Add email addresses to send to.", variant: "destructive" });
      return;
    }

    // Find first template matching the campaign sequence
    const template = templates?.find(t => t.sequence === campaign.sequence);
    if (!template) {
      toast({ title: "No template found", description: "Create a template for this sequence first.", variant: "destructive" });
      return;
    }

    sendCampaignMutation.mutate({ campaignId, recipients: emails, templateId: template.id });
  };

  const stats = {
    totalTemplates: templates?.length || 0,
    totalCampaigns: campaigns?.length || 0,
    totalSent: campaigns?.reduce((acc, c) => acc + (c.sent_count || 0), 0) || 0,
    totalLeads: leads?.length || 0,
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Email Campaigns</h1>
              <p className="text-muted-foreground">Manage email templates and send campaigns</p>
            </div>
            <Dialog open={newCampaignOpen} onOpenChange={setNewCampaignOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Campaign
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Campaign</DialogTitle>
                  <DialogDescription>Set up a new email campaign</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Campaign Name</Label>
                    <Input
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      placeholder="January Parent Launch"
                    />
                  </div>
                  <div>
                    <Label>Sequence</Label>
                    <Select value={campaignSequence} onValueChange={setCampaignSequence}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sequence" />
                      </SelectTrigger>
                      <SelectContent>
                        {sequenceOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    onClick={() => createCampaignMutation.mutate()}
                    disabled={!campaignName || !campaignSequence}
                    className="w-full"
                  >
                    Create Campaign
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/20">
                    <FileText className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.totalTemplates}</p>
                    <p className="text-sm text-muted-foreground">Templates</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/20">
                    <Rocket className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.totalCampaigns}</p>
                    <p className="text-sm text-muted-foreground">Campaigns</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-green-500/20">
                    <Send className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.totalSent}</p>
                    <p className="text-sm text-muted-foreground">Emails Sent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-yellow-500/20">
                    <Users className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.totalLeads}</p>
                    <p className="text-sm text-muted-foreground">Total Leads</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="templates" className="space-y-4">
            <TabsList>
              <TabsTrigger value="templates">Email Templates</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="send">Quick Send</TabsTrigger>
            </TabsList>

            {/* Templates Tab */}
            <TabsContent value="templates" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Template List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Email Templates</CardTitle>
                    <CardDescription>Pre-built email sequences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px]">
                      <div className="space-y-2">
                        {templatesLoading ? (
                          <p className="text-muted-foreground">Loading...</p>
                        ) : (
                          templates?.map((template) => (
                            <div
                              key={template.id}
                              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                                selectedTemplate?.id === template.id
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              }`}
                              onClick={() => setSelectedTemplate(template)}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">{template.name}</p>
                                  <p className="text-sm text-muted-foreground">{template.subject}</p>
                                </div>
                                <Badge className={statusColors[template.sequence] || "bg-muted"}>
                                  {template.sequence.replace("_", " ")}
                                </Badge>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Template Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Template Preview</CardTitle>
                    <CardDescription>
                      {selectedTemplate ? selectedTemplate.name : "Select a template to preview"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedTemplate ? (
                      <div className="space-y-4">
                        <div className="p-4 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground">Subject</p>
                          <p className="font-medium">{selectedTemplate.subject}</p>
                        </div>
                        <ScrollArea className="h-[300px] border rounded-lg">
                          <div
                            className="p-4"
                            dangerouslySetInnerHTML={{ __html: selectedTemplate.html_content }}
                          />
                        </ScrollArea>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Test email address"
                            value={testEmail}
                            onChange={(e) => setTestEmail(e.target.value)}
                          />
                          <Button
                            onClick={() => sendTestMutation.mutate({ templateId: selectedTemplate.id, email: testEmail })}
                            disabled={!testEmail || sendTestMutation.isPending}
                          >
                            {sendTestMutation.isPending ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <Send className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                        <Mail className="w-12 h-12" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Campaigns Tab */}
            <TabsContent value="campaigns">
              <Card>
                <CardHeader>
                  <CardTitle>All Campaigns</CardTitle>
                  <CardDescription>Track and manage email campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Sequence</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Recipients</TableHead>
                        <TableHead>Sent</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {campaignsLoading ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center text-muted-foreground">
                            Loading...
                          </TableCell>
                        </TableRow>
                      ) : campaigns?.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center text-muted-foreground">
                            No campaigns yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        campaigns?.map((campaign) => (
                          <TableRow key={campaign.id}>
                            <TableCell className="font-medium">{campaign.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{campaign.sequence.replace("_", " ")}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={statusColors[campaign.status]}>
                                {campaign.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{campaign.total_recipients}</TableCell>
                            <TableCell>{campaign.sent_count}</TableCell>
                            <TableCell>{format(new Date(campaign.created_at), "MMM d, yyyy")}</TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <Send className="w-4 h-4 mr-1" />
                                    Send
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-lg">
                                  <DialogHeader>
                                    <DialogTitle>Send Campaign: {campaign.name}</DialogTitle>
                                    <DialogDescription>
                                      Enter email addresses (one per line, optionally with name after comma)
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <Textarea
                                      placeholder="john@example.com, John Doe&#10;jane@example.com, Jane Smith"
                                      rows={10}
                                      value={bulkEmails}
                                      onChange={(e) => setBulkEmails(e.target.value)}
                                    />
                                    <div className="flex gap-2">
                                      <Button
                                        variant="outline"
                                        onClick={() => {
                                          const leadEmails = leads?.map(l => `${l.email}, ${l.name || ""}`).join("\n") || "";
                                          setBulkEmails(leadEmails);
                                        }}
                                      >
                                        <Users className="w-4 h-4 mr-2" />
                                        Import Leads ({leads?.length || 0})
                                      </Button>
                                      <Button
                                        onClick={() => handleSendCampaign(campaign.id, campaign)}
                                        disabled={sendCampaignMutation.isPending}
                                        className="flex-1"
                                      >
                                        {sendCampaignMutation.isPending ? (
                                          <>
                                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                            Sending...
                                          </>
                                        ) : (
                                          <>
                                            <Rocket className="w-4 h-4 mr-2" />
                                            Send Campaign
                                          </>
                                        )}
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Quick Send Tab */}
            <TabsContent value="send">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Send</CardTitle>
                    <CardDescription>Send an email using any template</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Select Template</Label>
                      <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a template" />
                        </SelectTrigger>
                        <SelectContent>
                          {templates?.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Recipient Email</Label>
                      <Input
                        type="email"
                        placeholder="recipient@example.com"
                        value={testEmail}
                        onChange={(e) => setTestEmail(e.target.value)}
                      />
                    </div>
                    <Button
                      onClick={() => {
                        if (selectedTemplateId && testEmail) {
                          sendTestMutation.mutate({ templateId: selectedTemplateId, email: testEmail });
                        }
                      }}
                      disabled={!selectedTemplateId || !testEmail || sendTestMutation.isPending}
                      className="w-full"
                    >
                      {sendTestMutation.isPending ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Email
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Leads</CardTitle>
                    <CardDescription>Import leads as recipients</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-2">
                        {leads?.slice(0, 20).map((lead) => (
                          <div
                            key={lead.id}
                            className="p-3 rounded-lg border border-border flex items-center justify-between"
                          >
                            <div>
                              <p className="font-medium">{lead.name || "Unknown"}</p>
                              <p className="text-sm text-muted-foreground">{lead.email}</p>
                            </div>
                            <Badge variant="outline">{lead.source}</Badge>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
