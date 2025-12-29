import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Rocket, School, User } from "lucide-react";

interface DemoActionBlockerProps {
  children: React.ReactNode;
  action?: string;
  onAttempt?: () => void;
}

export function DemoActionBlocker({ children, action = "this action", onAttempt }: DemoActionBlockerProps) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
    onAttempt?.();
  };

  return (
    <>
      <div onClick={handleClick} className="cursor-pointer">
        {children}
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" />
              Ready to Start Building?
            </DialogTitle>
            <DialogDescription className="text-left pt-2">
              You're viewing a demo of the NEXT_ platform. To {action}, you'll need to sign up!
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 pt-4">
            <Button asChild className="w-full" size="lg">
              <Link to="/ai-foundations" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Start as Individual Student
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full" size="lg">
              <Link to="/schools" className="flex items-center gap-2">
                <School className="h-4 w-4" />
                Start Free School Pilot
              </Link>
            </Button>
            
            <p className="text-xs text-muted-foreground text-center pt-2">
              Questions? <Link to="/schools" className="text-primary hover:underline">Contact us</Link>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
