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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, MessageSquare, Mail, Flame, Sun, Snowflake, Users, TrendingUp, Target, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface Lead {
  id: string;
  email: string;
  name: string | null;
  source: string;
  interested_program: string | null;
  created_at: string;
}

interface SalesConversation {
  id: string;
  session_id: string;
  lead_score: number | null;
  status: string | null;
  child_age: number | null;
  interested_program: string | null;
  parent_name: string | null;
  qualified_at: string | null;
  created_at: string;
  updated_at: string;
}

interface SalesMessage {
  id: string;
  conversation_id: string;
  role: string;
  content: string;
  created_at: string;
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [conversations, setConversations] = useState<SalesConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedConversation, setSelectedConversation] = useState<SalesConversation | null>(null);
  const [conversationMessages, setConversationMessages] = useState<SalesMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [leadsRes, convsRes] = await Promise.all([
        supabase.from("leads").select("*").order("created_at", { ascending: false }),
        supabase.from("sales_conversations").select("*").order("created_at", { ascending: false }),
      ]);

      if (leadsRes.error) throw leadsRes.error;
      if (convsRes.error) throw convsRes.error;

      setLeads(leadsRes.data || []);
      setConversations(convsRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load leads data");
    } finally {
      setLoading(false);
    }
  }

  async function fetchConversationMessages(conversationId: string) {
    setLoadingMessages(true);
    try {
      const { data, error } = await supabase
        .from("sales_messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setConversationMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load conversation");
    } finally {
      setLoadingMessages(false);
    }
  }

  const handleViewConversation = async (conv: SalesConversation) => {
    setSelectedConversation(conv);
    await fetchConversationMessages(conv.id);
  };

  const getLeadScoreBadge = (score: number | null) => {
    if (!score) return { icon: Snowflake, label: "Cold", color: "bg-blue-500/20 text-blue-600" };
    if (score >= 50) return { icon: Flame, label: "Hot", color: "bg-red-500/20 text-red-600" };
    if (score >= 25) return { icon: Sun, label: "Warm", color: "bg-yellow-500/20 text-yellow-600" };
    return { icon: Snowflake, label: "Cold", color: "bg-blue-500/20 text-blue-600" };
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesSource = sourceFilter === "all" || lead.source === sourceFilter;
    return matchesSearch && matchesSource;
  });

  const filteredConversations = conversations.filter((conv) => {
    const matchesStatus = statusFilter === "all" || conv.status === statusFilter;
    return matchesStatus;
  });

  // Stats
  const totalLeads = leads.length;
  const totalConversations = conversations.length;
  const qualifiedLeads = conversations.filter((c) => c.status === "qualified").length;
  const hotLeads = conversations.filter((c) => (c.lead_score || 0) >= 50).length;

  const uniqueSources = [...new Set(leads.map((l) => l.source))];

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
        <h1 className="text-3xl font-bold">Leads & Sales</h1>
        <p className="text-muted-foreground mt-1">
          Manage leads and AI sales conversations
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalLeads}</p>
                <p className="text-sm text-muted-foreground">Total Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <MessageSquare className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalConversations}</p>
                <p className="text-sm text-muted-foreground">Conversations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <UserCheck className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{qualifiedLeads}</p>
                <p className="text-sm text-muted-foreground">Qualified</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10">
                <Flame className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{hotLeads}</p>
                <p className="text-sm text-muted-foreground">Hot Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="conversations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="conversations">
            <MessageSquare className="h-4 w-4 mr-2" />
            Sales Conversations
          </TabsTrigger>
          <TabsTrigger value="leads">
            <Mail className="h-4 w-4 mr-2" />
            Email Leads
          </TabsTrigger>
        </TabsList>

        {/* Sales Conversations Tab */}
        <TabsContent value="conversations" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="engaged">Engaged</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversations ({filteredConversations.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Session</TableHead>
                    <TableHead>Lead Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Child Age</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConversations.map((conv) => {
                    const scoreBadge = getLeadScoreBadge(conv.lead_score);
                    const ScoreIcon = scoreBadge.icon;
                    return (
                      <TableRow key={conv.id}>
                        <TableCell>
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {conv.session_id.slice(0, 8)}...
                          </code>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${scoreBadge.color}`}>
                              <ScoreIcon className="h-3 w-3" />
                              {conv.lead_score || 0}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={conv.status === "qualified" ? "default" : "secondary"}>
                            {conv.status || "new"}
                          </Badge>
                        </TableCell>
                        <TableCell>{conv.child_age || "-"}</TableCell>
                        <TableCell>
                          {conv.interested_program ? (
                            <Badge variant="outline">{conv.interested_program}</Badge>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {format(new Date(conv.created_at), "MMM d, h:mm a")}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewConversation(conv)}
                          >
                            <MessageSquare className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {filteredConversations.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <p className="text-muted-foreground">No conversations yet</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Leads Tab */}
        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by email or name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    {uniqueSources.map((source) => (
                      <SelectItem key={source} value={source}>
                        {source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Leads ({filteredLeads.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.email}</TableCell>
                      <TableCell>{lead.name || "-"}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{lead.source}</Badge>
                      </TableCell>
                      <TableCell>
                        {lead.interested_program ? (
                          <Badge variant="secondary">{lead.interested_program}</Badge>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {format(new Date(lead.created_at), "MMM d, yyyy")}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredLeads.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <p className="text-muted-foreground">No leads found</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Conversation Detail Dialog */}
      <Dialog open={!!selectedConversation} onOpenChange={() => setSelectedConversation(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Conversation Details
              {selectedConversation && (
                <Badge className="ml-2">
                  Score: {selectedConversation.lead_score || 0}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedConversation && (
            <div className="space-y-4">
              {/* Conversation Meta */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">Child Age</p>
                  <p className="font-medium">{selectedConversation.child_age || "Unknown"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Program</p>
                  <p className="font-medium capitalize">{selectedConversation.interested_program || "Unknown"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge variant={selectedConversation.status === "qualified" ? "default" : "secondary"}>
                    {selectedConversation.status || "new"}
                  </Badge>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="h-[400px] pr-4">
                {loadingMessages ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {conversationMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {format(new Date(msg.created_at), "h:mm a")}
                          </p>
                        </div>
                      </div>
                    ))}
                    {conversationMessages.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">
                        No messages in this conversation
                      </p>
                    )}
                  </div>
                )}
              </ScrollArea>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
