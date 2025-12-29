import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target,
  ArrowRight,
  Calendar,
  CreditCard,
  RefreshCw
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  Funnel,
  FunnelChart,
  LabelList
} from "recharts";
import { Button } from "@/components/ui/button";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";

interface RevenueMetrics {
  mrr: number;
  arr: number;
  totalRevenue: number;
  totalPending: number;
  activeSubscriptions: number;
  churnedThisMonth: number;
  newThisMonth: number;
  growthRate: number;
}

interface TierRevenue {
  tierName: string;
  revenue: number;
  count: number;
  color: string;
}

interface MonthlyRevenue {
  month: string;
  revenue: number;
  enrollments: number;
}

interface FunnelStage {
  stage: string;
  value: number;
  fill: string;
}

const TIER_COLORS = {
  "FIRST STEP": "hsl(var(--chart-1))",
  "FULL FOUNDATION": "hsl(var(--chart-2))",
  "ACCELERATOR": "hsl(var(--chart-3))",
  "Schools Pilot": "hsl(var(--chart-4))",
  "Schools Standard": "hsl(var(--chart-5))",
  "default": "hsl(var(--muted))"
};

export default function AdminRevenue() {
  const [metrics, setMetrics] = useState<RevenueMetrics>({
    mrr: 0,
    arr: 0,
    totalRevenue: 0,
    totalPending: 0,
    activeSubscriptions: 0,
    churnedThisMonth: 0,
    newThisMonth: 0,
    growthRate: 0
  });
  const [tierRevenue, setTierRevenue] = useState<TierRevenue[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue[]>([]);
  const [funnelData, setFunnelData] = useState<FunnelStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRevenueData = async () => {
    try {
      // Fetch enrollments with pricing tiers
      const { data: enrollments, error: enrollmentsError } = await supabase
        .from("enrollments")
        .select(`
          *,
          pricing_tier:pricing_tiers(name, current_price, monthly_price, billing_period)
        `);

      if (enrollmentsError) throw enrollmentsError;

      // Fetch payments
      const { data: payments, error: paymentsError } = await supabase
        .from("payments")
        .select("*");

      if (paymentsError) throw paymentsError;

      // Fetch leads count
      const { count: leadsCount } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true });

      // Fetch applications count
      const { count: applicationsCount } = await supabase
        .from("applications")
        .select("*", { count: "exact", head: true });

      // Fetch active students count
      const { count: studentsCount } = await supabase
        .from("students")
        .select("*", { count: "exact", head: true });

      // Calculate metrics
      const now = new Date();
      const thisMonthStart = startOfMonth(now);
      const lastMonthStart = startOfMonth(subMonths(now, 1));
      const lastMonthEnd = endOfMonth(subMonths(now, 1));

      // Active enrollments (paid status)
      const activeEnrollments = enrollments?.filter(e => e.status === 'active' || e.status === 'paid') || [];
      
      // Calculate MRR from active subscriptions
      let mrr = 0;
      activeEnrollments.forEach(enrollment => {
        const tier = enrollment.pricing_tier as any;
        if (tier?.monthly_price) {
          mrr += tier.monthly_price;
        } else if (tier?.current_price && tier?.billing_period === 'yearly') {
          mrr += tier.current_price / 12;
        } else if (enrollment.total_amount) {
          // One-time payments spread over 12 months
          mrr += enrollment.total_amount / 12;
        }
      });

      // Total revenue from payments
      const totalRevenue = payments
        ?.filter(p => p.status === 'paid' || p.status === 'succeeded')
        .reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

      // Pending revenue
      const totalPending = enrollments
        ?.filter(e => e.status === 'pending_payment')
        .reduce((sum, e) => sum + (e.total_amount || 0), 0) || 0;

      // This month's new enrollments
      const newThisMonth = enrollments?.filter(e => 
        new Date(e.created_at || '') >= thisMonthStart
      ).length || 0;

      // Churned this month (cancelled status)
      const churnedThisMonth = enrollments?.filter(e => 
        e.status === 'cancelled' && 
        new Date(e.updated_at || '') >= thisMonthStart
      ).length || 0;

      // Last month revenue for growth calculation
      const lastMonthRevenue = payments
        ?.filter(p => {
          const paidAt = new Date(p.paid_at || p.created_at || '');
          return paidAt >= lastMonthStart && paidAt <= lastMonthEnd && 
                 (p.status === 'paid' || p.status === 'succeeded');
        })
        .reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

      const thisMonthRevenue = payments
        ?.filter(p => {
          const paidAt = new Date(p.paid_at || p.created_at || '');
          return paidAt >= thisMonthStart && 
                 (p.status === 'paid' || p.status === 'succeeded');
        })
        .reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

      const growthRate = lastMonthRevenue > 0 
        ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 
        : 0;

      setMetrics({
        mrr: Math.round(mrr),
        arr: Math.round(mrr * 12),
        totalRevenue,
        totalPending,
        activeSubscriptions: activeEnrollments.length,
        churnedThisMonth,
        newThisMonth,
        growthRate: Math.round(growthRate * 10) / 10
      });

      // Calculate revenue by tier
      const tierMap = new Map<string, { revenue: number; count: number }>();
      activeEnrollments.forEach(enrollment => {
        const tier = enrollment.pricing_tier as any;
        const tierName = tier?.name || 'Unknown';
        const current = tierMap.get(tierName) || { revenue: 0, count: 0 };
        tierMap.set(tierName, {
          revenue: current.revenue + (enrollment.amount_paid || enrollment.total_amount || 0),
          count: current.count + 1
        });
      });

      const tierRevenueData: TierRevenue[] = Array.from(tierMap.entries()).map(([name, data]) => ({
        tierName: name,
        revenue: data.revenue,
        count: data.count,
        color: TIER_COLORS[name as keyof typeof TIER_COLORS] || TIER_COLORS.default
      }));
      setTierRevenue(tierRevenueData);

      // Calculate monthly revenue (last 6 months)
      const monthlyData: MonthlyRevenue[] = [];
      for (let i = 5; i >= 0; i--) {
        const monthStart = startOfMonth(subMonths(now, i));
        const monthEnd = endOfMonth(subMonths(now, i));
        
        const monthRevenue = payments
          ?.filter(p => {
            const paidAt = new Date(p.paid_at || p.created_at || '');
            return paidAt >= monthStart && paidAt <= monthEnd && 
                   (p.status === 'paid' || p.status === 'succeeded');
          })
          .reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

        const monthEnrollments = enrollments?.filter(e => {
          const createdAt = new Date(e.created_at || '');
          return createdAt >= monthStart && createdAt <= monthEnd;
        }).length || 0;

        monthlyData.push({
          month: format(monthStart, 'MMM yyyy'),
          revenue: monthRevenue,
          enrollments: monthEnrollments
        });
      }
      setMonthlyRevenue(monthlyData);

      // Calculate funnel data
      const funnelStages: FunnelStage[] = [
        { stage: "Leads", value: leadsCount || 0, fill: "hsl(var(--chart-1))" },
        { stage: "Applications", value: applicationsCount || 0, fill: "hsl(var(--chart-2))" },
        { stage: "Enrollments", value: enrollments?.length || 0, fill: "hsl(var(--chart-3))" },
        { stage: "Active Students", value: studentsCount || 0, fill: "hsl(var(--chart-4))" }
      ];
      setFunnelData(funnelStages);

    } catch (error) {
      console.error("Error fetching revenue data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchRevenueData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Revenue Dashboard</h1>
          <p className="text-muted-foreground">Real-time revenue intelligence and conversion metrics</p>
        </div>
        <Button onClick={handleRefresh} disabled={refreshing} variant="outline">
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.mrr.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              From {metrics.activeSubscriptions} active subscriptions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Recurring Revenue</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.arr.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Projected annual revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs">
              {metrics.growthRate >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={metrics.growthRate >= 0 ? "text-green-500" : "text-red-500"}>
                {metrics.growthRate >= 0 ? "+" : ""}{metrics.growthRate}%
              </span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Revenue</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting payment completion
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Month</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">+{metrics.newThisMonth}</div>
            <p className="text-xs text-muted-foreground">New enrollments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churned This Month</CardTitle>
            <Users className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">-{metrics.churnedThisMonth}</div>
            <p className="text-xs text-muted-foreground">Cancelled subscriptions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${metrics.newThisMonth - metrics.churnedThisMonth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {metrics.newThisMonth - metrics.churnedThisMonth >= 0 ? '+' : ''}{metrics.newThisMonth - metrics.churnedThisMonth}
            </div>
            <p className="text-xs text-muted-foreground">Net new customers</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Revenue Overview</TabsTrigger>
          <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
          <TabsTrigger value="breakdown">Tier Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Trend</CardTitle>
              <CardDescription>Revenue and enrollment trends over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis yAxisId="left" className="text-xs" />
                  <YAxis yAxisId="right" orientation="right" className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Revenue ($)"
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                  <Bar 
                    yAxisId="right"
                    dataKey="enrollments" 
                    fill="hsl(var(--muted))" 
                    name="Enrollments"
                    radius={[4, 4, 0, 0]}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funnel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>Track conversion from leads to active students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Funnel Visualization */}
                <div className="space-y-4">
                  {funnelData.map((stage, index) => {
                    const maxValue = Math.max(...funnelData.map(s => s.value));
                    const widthPercent = maxValue > 0 ? (stage.value / maxValue) * 100 : 0;
                    const conversionRate = index > 0 && funnelData[index - 1].value > 0
                      ? ((stage.value / funnelData[index - 1].value) * 100).toFixed(1)
                      : null;

                    return (
                      <div key={stage.stage} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{stage.stage}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{stage.value.toLocaleString()}</span>
                            {conversionRate && (
                              <Badge variant="secondary" className="text-xs">
                                {conversionRate}% conv.
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="h-10 bg-muted rounded-lg overflow-hidden">
                          <div 
                            className="h-full rounded-lg transition-all duration-500 flex items-center justify-end pr-3"
                            style={{ 
                              width: `${widthPercent}%`,
                              backgroundColor: stage.fill,
                              minWidth: '40px'
                            }}
                          >
                            {index < funnelData.length - 1 && (
                              <ArrowRight className="h-4 w-4 text-white/80" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Conversion Metrics */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Conversion Rates</h4>
                  <div className="space-y-3">
                    {funnelData.slice(1).map((stage, index) => {
                      const prevStage = funnelData[index];
                      const rate = prevStage.value > 0 
                        ? ((stage.value / prevStage.value) * 100).toFixed(1)
                        : 0;
                      const isGood = Number(rate) > 20;

                      return (
                        <div key={stage.stage} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2 text-sm">
                            <span>{prevStage.stage}</span>
                            <ArrowRight className="h-3 w-3 text-muted-foreground" />
                            <span>{stage.stage}</span>
                          </div>
                          <Badge variant={isGood ? "default" : "secondary"}>
                            {rate}%
                          </Badge>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Conversion</span>
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        {funnelData[0].value > 0 
                          ? ((funnelData[funnelData.length - 1].value / funnelData[0].value) * 100).toFixed(1)
                          : 0}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      From Lead to Active Student
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Tier</CardTitle>
                <CardDescription>Breakdown of revenue across pricing tiers</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {tierRevenue.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={tierRevenue}
                        dataKey="revenue"
                        nameKey="tierName"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ tierName, percent }) => `${tierName} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {tierRevenue.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No revenue data yet
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tier Performance</CardTitle>
                <CardDescription>Revenue and customer count by tier</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tierRevenue.length > 0 ? tierRevenue.map((tier) => (
                    <div key={tier.tierName} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: tier.color }}
                        />
                        <div>
                          <p className="font-medium">{tier.tierName}</p>
                          <p className="text-xs text-muted-foreground">{tier.count} customers</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${tier.revenue.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">
                          ${tier.count > 0 ? Math.round(tier.revenue / tier.count) : 0} avg
                        </p>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center text-muted-foreground py-8">
                      No tier data available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
