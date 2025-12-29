import { cn } from "@/lib/utils";

interface HolographicTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

export const HolographicText = ({ 
  children, 
  className = "", 
  as: Component = "span" 
}: HolographicTextProps) => {
  return (
    <Component className={cn("holographic-text", className)}>
      {children}
    </Component>
  );
};
