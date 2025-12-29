import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CursorWordmark } from "@/components/ui/cursor-wordmark";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "Product Tour", href: "/product-tour" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Masterclasses", href: "/masterclasses" },
  { label: "Parents", href: "/academy/parents" },
  { label: "Schools", href: "/schools" },
  { label: "Partners", href: "/partners" },
];

const certificateLinks = [
  { label: "AI Foundations Certificate", href: "/certification/ai-foundations" },
  { label: "AI Builder Certificate", href: "/certification/ai-builder" },
  { label: "AI Launcher Certificate", href: "/certification/ai-launcher" },
  { label: "Vibe Coding Essentials", href: "/certification/vibe-coding-essentials" },
];

export const PublicHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      if (location.pathname === path || (path === "/academy" && location.pathname === "/academy")) {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(href);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#0A0F1C]/90 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <button
          onClick={() => navigate("/academy")}
          className="flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          <CursorWordmark word="NEXT" size="md" className="text-white" cursorClassName="text-gold" subtitle="BILLION LAB" />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.slice(0, 2).map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-white/70 hover:text-white transition-colors text-sm font-medium"
            >
              {link.label}
            </button>
          ))}
          
          {/* Certificates Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-white/70 hover:text-white transition-colors text-sm font-medium outline-none">
              Certificates
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#0A0F1C] border border-white/10 z-50">
              {certificateLinks.map((cert) => (
                <DropdownMenuItem
                  key={cert.label}
                  onClick={() => handleNavClick(cert.href)}
                  className="text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  {cert.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navLinks.slice(2).map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-white/70 hover:text-white transition-colors text-sm font-medium"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => navigate("/login")}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            Login
          </Button>
          <Button
            onClick={() => navigate("/pricing")}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold shadow-lg shadow-amber-500/25 border-0"
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0A0F1C]/95 backdrop-blur-md border-t border-white/10">
          <div className="container mx-auto px-6 py-4 space-y-2">
            {navLinks.slice(0, 2).map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left text-white/70 hover:text-white transition-colors py-2 text-base font-medium"
              >
                {link.label}
              </button>
            ))}
            
            {/* Certificates Section */}
            <div className="py-2">
              <span className="text-white/50 text-sm font-medium">Certificates</span>
              <div className="pl-4 mt-1 space-y-1">
                {certificateLinks.map((cert) => (
                  <button
                    key={cert.label}
                    onClick={() => handleNavClick(cert.href)}
                    className="block w-full text-left text-white/70 hover:text-white transition-colors py-1.5 text-sm"
                  >
                    {cert.label}
                  </button>
                ))}
              </div>
            </div>

            {navLinks.slice(2).map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left text-white/70 hover:text-white transition-colors py-2 text-base font-medium"
              >
                {link.label}
              </button>
            ))}
            <Button
              variant="outline"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/login");
              }}
              className="w-full border-white/30 text-white hover:bg-white/10 mt-2"
            >
              Login
            </Button>
            <Button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/pricing");
              }}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold mt-2"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
