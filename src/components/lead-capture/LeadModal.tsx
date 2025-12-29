import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Sparkles, Gift } from "lucide-react";

interface LeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
}

export const LeadModal = ({ open, onOpenChange, source = "modal" }: LeadModalProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        email,
        name: name || null,
        source,
      });

      if (error) throw error;

      toast({
        title: "You're on the list!",
        description: "We'll send you the AI Builder Guide shortly.",
      });
      
      setEmail("");
      setName("");
      onOpenChange(false);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Gift className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-2xl">
            Get Your FREE AI Builder Guide
          </DialogTitle>
          <DialogDescription className="text-center">
            Learn how young entrepreneurs use AI tools to build real products. Plus, get updates on program launches.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name (Optional)</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="parent@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            {isSubmitting ? "Sending..." : "Get Free Guide"}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
