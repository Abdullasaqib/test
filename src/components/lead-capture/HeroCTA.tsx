import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

interface HeroCTAProps {
  className?: string;
}

export const HeroCTA = ({ className }: HeroCTAProps) => {
  return (
    <Link to="/free-guide">
      <Button 
        variant="outline" 
        size="lg" 
        className={className}
      >
        <Gift className="mr-2 h-4 w-4" />
        Free AI Builder Guide
      </Button>
    </Link>
  );
};
