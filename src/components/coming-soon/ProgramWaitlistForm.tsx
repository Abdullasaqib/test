import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, CheckCircle2, Sparkles } from "lucide-react";

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "textarea" | "select";
  placeholder: string;
  required?: boolean;
  options?: string[];
}

interface ProgramWaitlistFormProps {
  programName: string;
  source: string;
  interestedProgram: string;
  fields: FormField[];
  ctaText?: string;
  className?: string;
}

export const ProgramWaitlistForm = ({
  programName,
  source,
  interestedProgram,
  fields,
  ctaText = "Join the Waitlist",
  className = "",
}: ProgramWaitlistFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const email = formData.email;
      const name = formData.name || formData.full_name || null;
      
      // Collect additional fields as notes
      const additionalFields = Object.entries(formData)
        .filter(([key]) => key !== "email" && key !== "name" && key !== "full_name")
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");

      const { error } = await supabase.from("leads").insert({
        email,
        name,
        source,
        interested_program: interestedProgram,
        notes: additionalFields || null,
        status: "new",
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("You're on the list! We'll notify you when we launch.");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-2xl p-8 text-center ${className}`}>
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">You're In!</h3>
        <p className="text-white/70">
          We'll email you as soon as {programName} opens for enrollment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name} className="text-white/80 text-sm">
            {field.label} {field.required && <span className="text-amber-400">*</span>}
          </Label>
          {field.type === "textarea" ? (
            <Textarea
              id={field.name}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              required={field.required}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-amber-500/50 min-h-[100px]"
            />
          ) : field.type === "select" ? (
            <select
              id={field.name}
              value={formData[field.name] || ""}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              required={field.required}
              className="w-full bg-white/5 border border-white/20 text-white rounded-md px-3 py-2 focus:border-amber-500/50 focus:outline-none"
            >
              <option value="" className="bg-[#0A0F1C]">{field.placeholder}</option>
              {field.options?.map((option) => (
                <option key={option} value={option} className="bg-[#0A0F1C]">
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <Input
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              required={field.required}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-amber-500/50"
            />
          )}
        </div>
      ))}
      
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold py-6 text-lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Joining...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            {ctaText}
          </>
        )}
      </Button>
    </form>
  );
};
