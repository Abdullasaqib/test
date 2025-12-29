import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CursorWordmark } from "@/components/ui/cursor-wordmark";

const PublicFooter = () => {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-border/50 py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <CursorWordmark 
              word="NEXT" 
              size="sm" 
              className="text-foreground" 
              cursorClassName="text-primary" 
              subtitle="BILLION LAB" 
            />
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Button variant="link" onClick={() => navigate('/pricing')} className="text-muted-foreground hover:text-foreground p-0 h-auto">Pricing</Button>
            <Button variant="link" onClick={() => navigate('/how-it-works')} className="text-muted-foreground hover:text-foreground p-0 h-auto">How It Works</Button>
            <Button variant="link" onClick={() => navigate('/masterclasses')} className="text-muted-foreground hover:text-foreground p-0 h-auto">Masterclasses</Button>
            <Button variant="link" onClick={() => navigate('/academy/parents')} className="text-muted-foreground hover:text-foreground p-0 h-auto">For Parents</Button>
            <Button variant="link" onClick={() => navigate('/schools')} className="text-muted-foreground hover:text-foreground p-0 h-auto">For Schools</Button>
            <Button variant="link" onClick={() => navigate('/partners')} className="text-muted-foreground hover:text-foreground p-0 h-auto">Partners</Button>
            <Button variant="link" onClick={() => navigate('/blog')} className="text-muted-foreground hover:text-foreground p-0 h-auto">Blog</Button>
            <Button variant="link" onClick={() => navigate('/manifesto')} className="text-muted-foreground hover:text-foreground p-0 h-auto">Manifesto</Button>
            <Button variant="link" onClick={() => navigate('/privacy')} className="text-muted-foreground hover:text-foreground p-0 h-auto">Privacy</Button>
            <Button variant="link" onClick={() => navigate('/terms')} className="text-muted-foreground hover:text-foreground p-0 h-auto">Terms</Button>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 NEXT_ Billion Lab. All rights reserved.</p>
            <p>
              Questions? <a href="mailto:hello@nextbillionlab.com" className="text-primary hover:underline">hello@nextbillionlab.com</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { PublicFooter };
export default PublicFooter;