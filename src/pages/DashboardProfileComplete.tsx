import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CountrySelect } from "@/components/ui/country-select";
import { CitySelect } from "@/components/ui/city-select";
import { useStudent } from "@/hooks/useStudent";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Globe, GraduationCap, School, MapPin } from "lucide-react";

const GRADES = [
  { value: "K", label: "Kindergarten" },
  { value: "1", label: "1st Grade" },
  { value: "2", label: "2nd Grade" },
  { value: "3", label: "3rd Grade" },
  { value: "4", label: "4th Grade" },
  { value: "5", label: "5th Grade" },
  { value: "6", label: "6th Grade" },
  { value: "7", label: "7th Grade" },
  { value: "8", label: "8th Grade" },
  { value: "9", label: "9th Grade" },
  { value: "10", label: "10th Grade" },
  { value: "11", label: "11th Grade" },
  { value: "12", label: "12th Grade" },
];

export default function DashboardProfileComplete() {
  const navigate = useNavigate();
  const { student, refetch } = useStudent();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    country: student?.country || "",
    city: student?.city || "",
    cityOther: "",
    schoolName: student?.school_name || "",
    grade: student?.grade || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.country || !formData.grade) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!student?.id) {
      toast.error("Student profile not found");
      return;
    }

    setIsSubmitting(true);
    try {
      const cityValue = formData.city === "other" ? formData.cityOther : formData.city;
      
      const { error } = await supabase
        .from("students")
        .update({
          country: formData.country,
          city: cityValue || null,
          school_name: formData.schoolName || null,
          grade: formData.grade,
          profile_completed_at: new Date().toISOString(),
        })
        .eq("id", student.id);

      if (error) throw error;

      toast.success("Profile completed! Welcome to NEXT_");
      await refetch();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Almost there! 🎯</h1>
          <p className="text-muted-foreground">
            Tell us a bit about yourself so we can personalize your founder journey
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Complete Your Founder Profile
            </CardTitle>
            <CardDescription>
              This helps us connect you with founders from your region and customize your experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Country <span className="text-destructive">*</span>
                </Label>
                <CountrySelect
                  value={formData.country}
                  onChange={(value) => setFormData({ ...formData, country: value, city: "" })}
                  placeholder="Select your country"
                />
              </div>

              {/* City */}
              {formData.country && (
                <div className="space-y-2">
                  <Label htmlFor="city" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    City
                  </Label>
                  <CitySelect
                    value={formData.city}
                    onChange={(value) => setFormData({ ...formData, city: value })}
                    countryCode={formData.country}
                    placeholder="Select your city"
                    otherValue={formData.cityOther}
                    onOtherChange={(value) => setFormData({ ...formData, cityOther: value })}
                  />
                </div>
              )}

              {/* School Name */}
              <div className="space-y-2">
                <Label htmlFor="schoolName" className="flex items-center gap-2">
                  <School className="h-4 w-4" />
                  School Name
                </Label>
                <Input
                  id="schoolName"
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  placeholder="Enter your school name"
                />
              </div>

              {/* Grade */}
              <div className="space-y-2">
                <Label htmlFor="grade" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Grade <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.grade}
                  onValueChange={(value) => setFormData({ ...formData, grade: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADES.map((grade) => (
                      <SelectItem key={grade.value} value={grade.value}>
                        {grade.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Complete Profile & Start Building"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
