import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, RefreshCw, Trash2, Search, Activity, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { format, subHours, subDays } from "date-fns";
import { errorLogger } from "@/utils/errorLogger";

type Severity = 'info' | 'warning' | 'error' | 'critical';
type Category = 'general' | 'module_load' | 'network' | 'render' | 'auth';

interface ErrorLog {
  id: string;
  timestamp: string;
  severity: Severity;
  category: Category;
  message: string;
  stack?: string;
  route?: string;
  url?: string;
  user_agent?: string;
  user_id?: string;
  context?: Record<string, unknown>;
}

const severityColors: Record<Severity, string> = {
  critical: "bg-destructive text-destructive-foreground",
  error: "bg-red-500/20 text-red-400 border-red-500/30",
  warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  info: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const severityIcons: Record<Severity, React.ReactNode> = {
  critical: <AlertTriangle className="h-4 w-4 text-destructive" />,
  error: <AlertCircle className="h-4 w-4 text-red-400" />,
  warning: <AlertTriangle className="h-4 w-4 text-yellow-400" />,
  info: <CheckCircle2 className="h-4 w-4 text-blue-400" />,
};

export default function AdminSystemHealth() {
  const queryClient = useQueryClient();
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<string>("24h");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedError, setSelectedError] = useState<ErrorLog | null>(null);

  // Get time filter date
  const getTimeFilterDate = () => {
    switch (timeFilter) {
      case "1h": return subHours(new Date(), 1);
      case "24h": return subHours(new Date(), 24);
      case "7d": return subDays(new Date(), 7);
      case "30d": return subDays(new Date(), 30);
      default: return subHours(new Date(), 24);
    }
  };

  // Fetch error logs
  const { data: errorLogs, isLoading, refetch } = useQuery({
    queryKey: ['system-error-logs', severityFilter, categoryFilter, timeFilter, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('system_error_logs')
        .select('*')
        .gte('timestamp', getTimeFilterDate().toISOString())
        .order('timestamp', { ascending: false })
        .limit(500);

      if (severityFilter !== 'all') {
        query = query.eq('severity', severityFilter);
      }
      if (categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter);
      }
      if (searchQuery) {
        query = query.or(`message.ilike.%${searchQuery}%,route.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as ErrorLog[];
    },
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });

  // Fetch stats
  const { data: stats } = useQuery({
    queryKey: ['system-health-stats'],
    queryFn: async () => {
      const last24h = subHours(new Date(), 24).toISOString();
      
      const { data: allErrors } = await supabase
        .from('system_error_logs')
        .select('severity, category')
        .gte('timestamp', last24h);

      const moduleLoadStats = errorLogger.getModuleLoadStats();

      return {
        total: allErrors?.length || 0,
        critical: allErrors?.filter(e => e.severity === 'critical').length || 0,
        errors: allErrors?.filter(e => e.severity === 'error').length || 0,
        warnings: allErrors?.filter(e => e.severity === 'warning').length || 0,
        moduleLoadFailures: allErrors?.filter(e => e.category === 'module_load').length || 0,
        networkErrors: allErrors?.filter(e => e.category === 'network').length || 0,
        moduleLoadStats,
      };
    },
    refetchInterval: 30000,
  });

  // Delete old logs mutation
  const deleteOldLogs = useMutation({
    mutationFn: async (days: number) => {
      const cutoffDate = subDays(new Date(), days).toISOString();
      const { error } = await supabase
        .from('system_error_logs')
        .delete()
        .lt('timestamp', cutoffDate);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Old logs deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['system-error-logs'] });
      queryClient.invalidateQueries({ queryKey: ['system-health-stats'] });
    },
    onError: () => {
      toast.error('Failed to delete logs');
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">System Health</h1>
          <p className="text-muted-foreground">Monitor errors and system performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => deleteOldLogs.mutate(7)}
            disabled={deleteOldLogs.isPending}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear 7d+ Old
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total (24h)</p>
                <p className="text-3xl font-bold">{stats?.total || 0}</p>
              </div>
              <Activity className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className={stats?.critical && stats.critical > 0 ? "border-destructive" : ""}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className={`text-3xl font-bold ${stats?.critical && stats.critical > 0 ? 'text-destructive' : ''}`}>
                  {stats?.critical || 0}
                </p>
              </div>
              <AlertTriangle className={`h-8 w-8 ${stats?.critical && stats.critical > 0 ? 'text-destructive' : 'text-muted-foreground'}`} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Module Load</p>
                <p className="text-3xl font-bold">{stats?.moduleLoadFailures || 0}</p>
              </div>
              <Loader2 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Network Errors</p>
                <p className="text-3xl font-bold">{stats?.networkErrors || 0}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Module Load Stats */}
      {stats?.moduleLoadStats && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Module Load Analytics (Session)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{stats.moduleLoadStats.totalAttempts}</p>
                <p className="text-sm text-muted-foreground">Total Attempts</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-400">{stats.moduleLoadStats.failures}</p>
                <p className="text-sm text-muted-foreground">Failures</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400">{stats.moduleLoadStats.recoveries}</p>
                <p className="text-sm text-muted-foreground">Recoveries</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Error Logs</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="module_load">Module Load</SelectItem>
                <SelectItem value="network">Network</SelectItem>
                <SelectItem value="render">Render</SelectItem>
                <SelectItem value="auth">Auth</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>

            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages or routes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Logs List */}
          <ScrollArea className="h-[400px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : errorLogs?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                <CheckCircle2 className="h-12 w-12 mb-2" />
                <p>No errors found</p>
              </div>
            ) : (
              <div className="space-y-2">
                {errorLogs?.map((log) => (
                  <Dialog key={log.id}>
                    <DialogTrigger asChild>
                      <div
                        className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 cursor-pointer transition-colors"
                        onClick={() => setSelectedError(log)}
                      >
                        {severityIcons[log.severity]}
                        <Badge variant="outline" className={severityColors[log.severity]}>
                          {log.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {log.category}
                        </Badge>
                        <span className="flex-1 truncate text-sm">{log.message}</span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {log.route && <span className="mr-2">{log.route}</span>}
                          {format(new Date(log.timestamp), 'MMM d, HH:mm')}
                        </span>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh]">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          {severityIcons[log.severity]}
                          Error Details
                        </DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="max-h-[60vh]">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Severity</p>
                              <Badge className={severityColors[log.severity]}>{log.severity}</Badge>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Category</p>
                              <Badge variant="secondary">{log.category}</Badge>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Timestamp</p>
                              <p className="text-sm">{format(new Date(log.timestamp), 'PPpp')}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Route</p>
                              <p className="text-sm">{log.route || 'N/A'}</p>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Message</p>
                            <p className="text-sm bg-muted p-2 rounded">{log.message}</p>
                          </div>

                          {log.stack && (
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Stack Trace</p>
                              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto whitespace-pre-wrap">
                                {log.stack}
                              </pre>
                            </div>
                          )}

                          {log.url && (
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">URL</p>
                              <p className="text-xs text-muted-foreground break-all">{log.url}</p>
                            </div>
                          )}

                          {log.context && Object.keys(log.context).length > 0 && (
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Context</p>
                              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                                {JSON.stringify(log.context, null, 2)}
                              </pre>
                            </div>
                          )}

                          {log.user_agent && (
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">User Agent</p>
                              <p className="text-xs text-muted-foreground break-all">{log.user_agent}</p>
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
