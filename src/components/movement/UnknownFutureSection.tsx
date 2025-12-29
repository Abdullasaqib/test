import { motion } from "framer-motion";

const REIMAGINED_MOMENTS = [
  { concept: "Search", year: "2020", note: "was 'good enough'" },
  { concept: "Conversation", year: "2022", note: "was reimagined" },
  { concept: "Creation", year: "2023", note: "was reimagined" },
  { concept: "Building", year: "2024", note: "was reimagined" },
];

export function UnknownFutureSection() {
  return (
    <div className="text-center">
      <p className="text-muted-foreground mb-6 text-lg">
        Every breakthrough surprised us...
      </p>
      
      <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-6">
        {REIMAGINED_MOMENTS.map((moment, index) => (
          <motion.div
            key={moment.concept}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.15 }}
            className="px-4 py-2 rounded-full bg-muted border border-border"
          >
            <span className="font-medium text-foreground">{moment.concept}</span>
            <span className="text-xs text-muted-foreground ml-2">'{moment.year.slice(-2)}</span>
          </motion.div>
        ))}
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="px-6 py-2 rounded-full bg-primary/20 border border-primary/40"
        >
          <span className="text-2xl font-bold text-primary">?</span>
          <span className="text-xs text-primary/80 ml-2">'25+</span>
        </motion.div>
      </div>
      
      <p className="text-foreground font-medium">
        Nobody knows what's <span className="text-primary font-bold">NEXT_</span>
      </p>
      <p className="text-muted-foreground mt-1">
        But we're preparing your child to <span className="font-semibold text-foreground">BUILD</span> it.
      </p>
    </div>
  );
}
