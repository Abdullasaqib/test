import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Sparkles, X } from "lucide-react";

interface CTABannerProps {
  source?: string;
  onClose?: () => void;
  showClose?: boolean;
}

export const CTABanner = ({ source = "banner", onClose, showClose = false }: CTABannerProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        email,
        source,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "You're on the list!",
        description: "Check your email for the AI Builder Guide.",
      });
    } catch (error) {
      console.error("Lead capture error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
        <Sparkles className="w-8 h-8 text-primary mx-auto mb-2" />
        <p className="font-semibold text-foreground">Thanks! Check your email.</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 relative">
      {showClose && onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-foreground mb-1">
          Free: AI Builder Starter Guide
        </h3>
        <p className="text-sm text-muted-foreground">
          Learn how young founders use AI to build real products
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          required
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Get Free Guide"
          )}
        </Button>
      </form>
    </div>
  );
};
