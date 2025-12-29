import { useState } from "react";
import { EnterpriseAdminLayout } from "@/components/enterprise-admin/EnterpriseAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEnterpriseAdmin } from "@/hooks/useEnterpriseAdmin";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Building2, Users, Calendar, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EnterpriseSettings() {
  const { currentOrg, adminRole, isLoading } = useEnterpriseAdmin();
  const [isSaving, setIsSaving] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const queryClient = useQueryClient();

  const handleSave = async () => {
    if (!currentOrg) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('enterprise_organizations')
        .update({
          primary_contact_name: contactName || currentOrg.primary_contact_name,
          primary_contact_email: contactEmail || currentOrg.primary_contact_email,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentOrg.id);

      if (error) throw error;

      toast.success("Settings saved");
      queryClient.invalidateQueries({ queryKey: ['enterprise-organizations'] });
    } catch (error: any) {
      toast.error(error.message || "Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <EnterpriseAdminLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </EnterpriseAdminLayout>
    );
  }

  return (
    <EnterpriseAdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your organization settings
          </p>
        </div>

        {/* Organization Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Organization Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Organization Name</Label>
                <p className="font-medium">{currentOrg?.name}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Industry</Label>
                <p className="font-medium">{currentOrg?.industry || "Not specified"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* License Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              License Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-muted-foreground">Status</Label>
                <div className="mt-1">
                  <Badge variant={currentOrg?.is_active ? "default" : "destructive"}>
                    {currentOrg?.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Max Seats</Label>
                <p className="font-medium">{currentOrg?.max_seats}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Start Date</Label>
                <p className="font-medium">
                  {currentOrg?.license_start_date 
                    ? new Date(currentOrg.license_start_date).toLocaleDateString()
                    : "Not set"}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">End Date</Label>
                <p className="font-medium">
                  {currentOrg?.license_end_date 
                    ? new Date(currentOrg.license_end_date).toLocaleDateString()
                    : "Not set"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Primary Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Primary Contact
            </CardTitle>
            <CardDescription>
              Main point of contact for your organization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Name</Label>
                <Input
                  id="contactName"
                  placeholder={currentOrg?.primary_contact_name || "Contact name"}
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder={currentOrg?.primary_contact_email || "contact@company.com"}
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={handleSave} disabled={isSaving || adminRole !== 'owner'}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
            {adminRole !== 'owner' && (
              <p className="text-sm text-muted-foreground">
                Only organization owners can update settings
              </p>
            )}
          </CardContent>
        </Card>

        {/* Your Role */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Your Access Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {adminRole?.toUpperCase() || "ADMIN"}
            </Badge>
          </CardContent>
        </Card>
      </div>
    </EnterpriseAdminLayout>
  );
}
