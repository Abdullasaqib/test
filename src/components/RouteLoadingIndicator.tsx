import { motion } from "framer-motion";

export function RouteLoadingIndicator() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100]">
      <motion.div
        className="h-1 bg-gradient-to-r from-primary via-gold to-primary"
        initial={{ width: "0%", opacity: 1 }}
        animate={{ 
          width: ["0%", "30%", "60%", "80%", "90%"],
          opacity: 1
        }}
        transition={{ 
          duration: 2,
          ease: "easeOut",
          times: [0, 0.2, 0.5, 0.8, 1]
        }}
      />
    </div>
  );
}
