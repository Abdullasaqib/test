import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Sparkles, School, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DemoBookingModal } from "./DemoBookingModal";

export function DemoBanner() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  if (isMinimized) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsMinimized(false)}
        className="fixed top-4 right-4 z-50 bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
      >
        <Sparkles className="h-5 w-5" />
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground py-3 px-4 shadow-lg"
      >
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Demo Mode</span>
            </div>
            <p className="text-sm hidden sm:block">
              Explore as <span className="font-semibold">Alex Chen</span> — a student in Week 7 of the program
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-0"
              onClick={() => setShowBookingModal(true)}
            >
              <Calendar className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Book Demo Call</span>
              <span className="sm:hidden">Book Call</span>
            </Button>
            
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-0"
            >
              <Link to="/schools" className="flex items-center gap-2">
                <School className="h-4 w-4" />
                <span className="hidden sm:inline">Start Free School Pilot</span>
                <span className="sm:hidden">School Pilot</span>
              </Link>
            </Button>
            
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Minimize banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
      
      <DemoBookingModal open={showBookingModal} onOpenChange={setShowBookingModal} />
    </AnimatePresence>
  );
}
