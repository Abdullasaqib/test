import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Globe, Users, School, GraduationCap, MapPin, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { COUNTRIES } from "@/data/countries";

interface StudentDemographics {
  id: string;
  full_name: string;
  country: string | null;
  city: string | null;
  school_name: string | null;
  grade: string | null;
  program: string | null;
  created_at: string;
}

interface CountryStats {
  country: string;
  countryName: string;
  count: number;
}

interface GradeStats {
  grade: string;
  count: number;
}

interface SchoolStats {
  school_name: string;
  count: number;
  country: string;
}

const CHART_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(210, 70%, 50%)",
  "hsl(280, 70%, 50%)",
  "hsl(30, 70%, 50%)",
];

export default function AdminFounders() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<StudentDemographics[]>([]);
  const [countryStats, setCountryStats] = useState<CountryStats[]>([]);
  const [gradeStats, setGradeStats] = useState<GradeStats[]>([]);
  const [schoolStats, setSchoolStats] = useState<SchoolStats[]>([]);
  const [programFilter, setProgramFilter] = useState<string>("all");

  // Summary stats
  const totalFounders = students.length;
  const withProfileComplete = students.filter(s => s.country && s.grade).length;
  const uniqueCountries = new Set(students.map(s => s.country).filter(Boolean)).size;
  const uniqueSchools = new Set(students.map(s => s.school_name).filter(Boolean)).size;

  useEffect(() => {
    fetchData();
  }, [programFilter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch students with demographics
      let query = supabase
        .from("students")
        .select("id, full_name, country, city, school_name, grade, program, created_at")
        .order("created_at", { ascending: false });

      if (programFilter !== "all") {
        query = query.eq("program", programFilter);
      }

      const { data: studentsData, error } = await query;
      if (error) throw error;

      setStudents(studentsData || []);

      // Calculate country stats
      const countryMap = new Map<string, number>();
      studentsData?.forEach(s => {
        if (s.country) {
          countryMap.set(s.country, (countryMap.get(s.country) || 0) + 1);
        }
      });
      
      const countryStatsArray = Array.from(countryMap.entries())
        .map(([country, count]) => ({
          country,
          countryName: COUNTRIES.find(c => c.code === country)?.name || country,
          count,
        }))
        .sort((a, b) => b.count - a.count);
      setCountryStats(countryStatsArray);

      // Calculate grade stats
      const gradeMap = new Map<string, number>();
      studentsData?.forEach(s => {
        if (s.grade) {
          gradeMap.set(s.grade, (gradeMap.get(s.grade) || 0) + 1);
        }
      });
      
      const gradeOrder = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
      const gradeStatsArray = Array.from(gradeMap.entries())
        .map(([grade, count]) => ({ grade: `Grade ${grade}`, count }))
        .sort((a, b) => {
          const aIndex = gradeOrder.indexOf(a.grade.replace("Grade ", ""));
          const bIndex = gradeOrder.indexOf(b.grade.replace("Grade ", ""));
          return aIndex - bIndex;
        });
      setGradeStats(gradeStatsArray);

      // Calculate school stats
      const schoolMap = new Map<string, { count: number; country: string }>();
      studentsData?.forEach(s => {
        if (s.school_name) {
          const existing = schoolMap.get(s.school_name);
          schoolMap.set(s.school_name, {
            count: (existing?.count || 0) + 1,
            country: s.country || "",
          });
        }
      });
      
      const schoolStatsArray = Array.from(schoolMap.entries())
        .map(([school_name, data]) => ({
          school_name,
          count: data.count,
          country: data.country,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
      setSchoolStats(schoolStatsArray);

    } catch (error) {
      console.error("Error fetching founder data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCountryFlag = (code: string) => {
    const country = COUNTRIES.find(c => c.code === code);
    return country?.flag || "🌍";
  };

  const getCountryName = (code: string) => {
    const country = COUNTRIES.find(c => c.code === code);
    return country?.name || code;
  };

  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Globe className="h-8 w-8 text-primary" />
              Founders Dashboard
            </h1>
            <p className="text-muted-foreground">
              Geographic and demographic intelligence for your founder community
            </p>
          </div>
          
          <Select value={programFilter} onValueChange={setProgramFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Programs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Programs</SelectItem>
              <SelectItem value="junior">Junior (9-11)</SelectItem>
              <SelectItem value="teen">Teen (12-14)</SelectItem>
              <SelectItem value="advanced">Advanced (15+)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Founders</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalFounders}</div>
              <p className="text-xs text-muted-foreground">
                {withProfileComplete} with complete profiles ({totalFounders > 0 ? Math.round((withProfileComplete / totalFounders) * 100) : 0}%)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Countries</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueCountries}</div>
              <p className="text-xs text-muted-foreground">
                Global founder community
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Schools</CardTitle>
              <School className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueSchools}</div>
              <p className="text-xs text-muted-foreground">
                Schools represented
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Top Country</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-2">
                {countryStats[0] ? (
                  <>
                    <span>{getCountryFlag(countryStats[0].country)}</span>
                    <span className="text-lg">{countryStats[0].countryName}</span>
                  </>
                ) : (
                  "N/A"
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {countryStats[0]?.count || 0} founders
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Country Distribution Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Founders by Country
              </CardTitle>
              <CardDescription>Geographic distribution of your founder community</CardDescription>
            </CardHeader>
            <CardContent>
              {countryStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={countryStats.slice(0, 8)}
                      dataKey="count"
                      nameKey="countryName"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ countryName, percent }) => 
                        `${countryName} (${(percent * 100).toFixed(0)}%)`
                      }
                    >
                      {countryStats.slice(0, 8).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No country data available yet
                </div>
              )}
            </CardContent>
          </Card>

          {/* Grade Distribution Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Founders by Grade
              </CardTitle>
              <CardDescription>Distribution across grade levels</CardDescription>
            </CardHeader>
            <CardContent>
              {gradeStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={gradeStats}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="grade" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--popover))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No grade data available yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Countries Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Top Countries
              </CardTitle>
              <CardDescription>Countries with most founders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Country</TableHead>
                    <TableHead className="text-right">Founders</TableHead>
                    <TableHead className="text-right">% of Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {countryStats.slice(0, 10).map((stat) => (
                    <TableRow key={stat.country}>
                      <TableCell className="flex items-center gap-2">
                        <span className="text-lg">{getCountryFlag(stat.country)}</span>
                        {stat.countryName}
                      </TableCell>
                      <TableCell className="text-right font-medium">{stat.count}</TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {totalFounders > 0 ? Math.round((stat.count / totalFounders) * 100) : 0}%
                      </TableCell>
                    </TableRow>
                  ))}
                  {countryStats.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">
                        No country data yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Top Schools Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="h-5 w-5" />
                Top Schools
              </CardTitle>
              <CardDescription>Schools with most enrolled founders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>School</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead className="text-right">Students</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schoolStats.map((stat, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {stat.school_name}
                      </TableCell>
                      <TableCell>
                        {stat.country && (
                          <span className="flex items-center gap-1">
                            <span>{getCountryFlag(stat.country)}</span>
                            <span className="text-muted-foreground text-sm">
                              {getCountryName(stat.country)}
                            </span>
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary">{stat.count}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {schoolStats.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">
                        No school data yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Recent Founders Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Recent Founders
            </CardTitle>
            <CardDescription>Latest founders with their demographics</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>School</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Program</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.slice(0, 20).map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.full_name}</TableCell>
                    <TableCell>
                      {student.country ? (
                        <span className="flex items-center gap-1">
                          <span>{getCountryFlag(student.country)}</span>
                          {getCountryName(student.country)}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>{student.city || <span className="text-muted-foreground">—</span>}</TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {student.school_name || <span className="text-muted-foreground">—</span>}
                    </TableCell>
                    <TableCell>
                      {student.grade ? (
                        <Badge variant="outline">Grade {student.grade}</Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {student.program ? (
                        <Badge variant="secondary" className="capitalize">
                          {student.program}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {students.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No founders yet
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
