import { useSchoolAdmin } from "@/hooks/useSchoolAdmin";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Building2, Mail, Phone, Globe, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function SchoolSettings() {
  const { schoolAdmin, license, isLoading } = useSchoolAdmin();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your school profile and license information
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* School Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              School Profile
            </CardTitle>
            <CardDescription>
              Your school's information and branding
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>School Name</Label>
              <Input value={schoolAdmin?.school?.name || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>School Code</Label>
              <Input value={schoolAdmin?.school?.code || ""} disabled />
            </div>
            <div className="flex items-center gap-4">
              {schoolAdmin?.school?.logo_url ? (
                <img
                  src={schoolAdmin.school.logo_url}
                  alt="School logo"
                  className="h-16 w-16 rounded-lg object-cover"
                />
              ) : (
                <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <Button variant="outline" size="sm">
                Change Logo
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Contact support to update your school profile information.
            </p>
          </CardContent>
        </Card>

        {/* License Information */}
        <Card>
          <CardHeader>
            <CardTitle>License Information</CardTitle>
            <CardDescription>
              Your current subscription and limits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {license ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Plan</span>
                  <Badge variant="secondary" className="capitalize">
                    {license.license_type}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge
                    variant={license.status === "active" ? "default" : "secondary"}
                  >
                    {license.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Max Students</span>
                  <span className="font-medium">{license.max_students}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Enrolled</span>
                  <span className="font-medium">{license.enrolled_students || 0}</span>
                </div>
                {license.starts_at && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Start Date</span>
                    <span className="text-sm">
                      {format(new Date(license.starts_at), "MMM d, yyyy")}
                    </span>
                  </div>
                )}
                {license.expires_at && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Expires</span>
                    <span className="text-sm">
                      {format(new Date(license.expires_at), "MMM d, yyyy")}
                    </span>
                  </div>
                )}
                <Button variant="outline" className="w-full mt-4">
                  Upgrade License
                </Button>
              </>
            ) : (
              <div className="text-center py-4">
                <Calendar className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  No active license found
                </p>
                <Button className="mt-4">Get Started</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Admin Users */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Admin Users</CardTitle>
            <CardDescription>
              Users with access to this school dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Current User</p>
                  <p className="text-sm text-muted-foreground">
                    {schoolAdmin?.role || "admin"} • {schoolAdmin?.is_primary ? "Primary" : "Secondary"}
                  </p>
                </div>
                <Badge>{schoolAdmin?.role || "Admin"}</Badge>
              </div>
            </div>
            <Button variant="outline" className="mt-4">
              Invite Admin User
            </Button>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              Contact our support team for assistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a
                    href="mailto:schools@nextbillionlab.com"
                    className="text-sm text-primary hover:underline"
                  >
                    schools@nextbillionlab.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">+971 XX XXX XXXX</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Documentation</p>
                  <a href="#" className="text-sm text-primary hover:underline">
                    View School Guide
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
