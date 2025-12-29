import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProLayout } from "@/components/pro/ProLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStudent } from "@/hooks/useStudent";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { 
  Settings, 
  User,
  Briefcase,
  Mail,
  Loader2,
  Save,
} from "lucide-react";

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "E-commerce",
  "Media & Entertainment",
  "Real Estate",
  "Manufacturing",
  "Consulting",
  "Other",
];

export default function ProSettings() {
  const { student, refetch } = useStudent();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const studentAny = student as any;
  const [formData, setFormData] = useState({
    full_name: student?.full_name || "",
    industry: studentAny?.industry || "",
    job_title: studentAny?.job_title || "",
    company: studentAny?.company || "",
  });

  const handleSave = async () => {
    if (!student) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("students")
        .update({
          full_name: formData.full_name,
          industry: formData.industry,
          job_title: formData.job_title,
          company: formData.company,
        })
        .eq("id", student.id);

      if (error) throw error;

      await refetch();
      toast({ title: "Settings saved", description: "Your profile has been updated." });
    } catch (error) {
      console.error("Save error:", error);
      toast({ title: "Failed to save", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProLayout>
      <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white/60" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Settings</h1>
              <p className="text-white/60">Manage your account and preferences</p>
            </div>
          </div>
        </div>

        {/* Profile Settings */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="w-5 h-5 text-amber-400" />
              Profile Information
            </CardTitle>
            <CardDescription className="text-white/60">
              Update your personal details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/80">Full Name</Label>
              <Input
                id="name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">Email</Label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white/40" />
                <span className="text-white/60">{user?.email}</span>
              </div>
              <p className="text-xs text-white/40">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label className="text-white/80">Industry</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => setFormData({ ...formData, industry: value })}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((industry) => (
                    <SelectItem key={industry} value={industry.toLowerCase()}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="job_title" className="text-white/80">Job Title (Optional)</Label>
              <Input
                id="job_title"
                value={formData.job_title}
                onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                placeholder="e.g., Product Manager"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-white/80">Company (Optional)</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g., Acme Corp"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>

            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-amber-500 hover:bg-amber-600 text-black"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-amber-400" />
              Subscription
            </CardTitle>
            <CardDescription className="text-white/60">
              Manage your subscription plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <div>
                <h3 className="font-semibold text-white">Professional Builder</h3>
                <p className="text-sm text-white/60">8-week intensive program</p>
              </div>
              <span className="text-amber-400 font-bold">$749</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProLayout>
  );
}
