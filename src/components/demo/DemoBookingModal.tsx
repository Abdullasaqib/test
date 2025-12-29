import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DemoBookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DemoBookingModal({ open, onOpenChange }: DemoBookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school_name: "",
    role: "",
    estimated_students: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("leads").insert({
        email: formData.email,
        name: formData.name,
        source: "demo_booking",
        status: "new",
        metadata: {
          school_name: formData.school_name,
          role: formData.role,
          estimated_students: formData.estimated_students,
          booking_requested: new Date().toISOString(),
        },
      });

      if (error) throw error;

      setIsSuccess(true);
      toast.success("Demo request submitted!");
    } catch (error) {
      console.error("Error submitting demo request:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset form after close animation
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        name: "",
        email: "",
        school_name: "",
        role: "",
        estimated_students: "",
      });
    }, 300);
  };

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center py-6">
            <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <DialogTitle className="text-xl mb-2">Request Submitted!</DialogTitle>
            <DialogDescription className="mb-6">
              We'll reach out within 24 hours to schedule your personalized demo call.
            </DialogDescription>
            <Button onClick={handleClose} className="w-full">
              Back to Demo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Book a Demo Call
          </DialogTitle>
          <DialogDescription>
            See how NEXT_ can transform your school's entrepreneurship program.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Smith"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@school.edu"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="school">School / Organization</Label>
            <Input
              id="school"
              value={formData.school_name}
              onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
              placeholder="Lincoln High School"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Your Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="administrator">Administrator</SelectItem>
                <SelectItem value="principal">Principal</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="counselor">Counselor</SelectItem>
                <SelectItem value="curriculum_director">Curriculum Director</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="students">Estimated Number of Students</Label>
            <Select
              value={formData.estimated_students}
              onValueChange={(value) => setFormData({ ...formData, estimated_students: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-25">1-25 students</SelectItem>
                <SelectItem value="26-50">26-50 students</SelectItem>
                <SelectItem value="51-100">51-100 students</SelectItem>
                <SelectItem value="101-250">101-250 students</SelectItem>
                <SelectItem value="251-500">251-500 students</SelectItem>
                <SelectItem value="500+">500+ students</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Request Demo Call"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
