import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { List, ChevronDown, ChevronUp } from "lucide-react";

interface TOCItem {
  id: string;
  title: string;
  icon: string;
}

const tocItems: TOCItem[] = [
  { id: "tools", title: "10 AI Tools", icon: "🧠" },
  { id: "projects", title: "Weekend Projects", icon: "🚀" },
  { id: "prompts", title: "50+ Prompts", icon: "💬" },
  { id: "stories", title: "Teen Founder Stories", icon: "🌟" },
  { id: "roadmaps", title: "Age Roadmaps", icon: "🎯" },
  { id: "parents", title: "Parent Guide", icon: "👨‍👩‍👧" },
  { id: "printables", title: "Printable Resources", icon: "📄" },
];

export const TableOfContents = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = tocItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tocItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsExpanded(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-20 z-40 mb-8"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div className="flex items-center gap-3">
                <List className="w-5 h-5 text-primary" />
                <span className="font-medium text-white">Table of Contents</span>
                <span className="text-white/40 text-sm hidden sm:inline">
                  — Jump to any section
                </span>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-white/50" />
              ) : (
                <ChevronDown className="w-5 h-5 text-white/50" />
              )}
            </button>

            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-white/10"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-4">
                  {tocItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center gap-2 p-3 rounded-xl text-left transition-all ${
                        activeSection === item.id
                          ? "bg-primary/20 text-primary"
                          : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span className="text-sm font-medium">{item.title}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
