import { motion } from 'framer-motion';

interface Concept {
  name: string;
  philosophy: string;
  icon: string;
}

const CONCEPTS: Concept[] = [
  { name: 'Thinking', philosophy: 'was reimagined', icon: '🧠' },
  { name: 'Conversation', philosophy: 'was reimagined', icon: '💬' },
  { name: 'Search', philosophy: 'was reimagined', icon: '🔍' },
  { name: 'Creation', philosophy: 'was reimagined', icon: '✨' },
  { name: 'Building', philosophy: 'was reimagined', icon: '🏗️' },
  { name: 'Design', philosophy: 'was reimagined', icon: '🎨' },
  { name: 'Code', philosophy: 'was reimagined', icon: '⚡' },
  { name: "What's NEXT_", philosophy: 'will be built by YOU', icon: '🚀' },
];

export function AIToolShowcase() {
  // Double the concepts for seamless infinite scroll
  const duplicatedConcepts = [...CONCEPTS, ...CONCEPTS];

  return (
    <section className="py-12 overflow-hidden">
      <div className="text-center mb-8">
        <p className="text-muted-foreground text-lg mb-2">In 12 weeks, they'll think like the founders who...</p>
      </div>
      
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        {/* Scrolling container */}
        <motion.div
          className="flex gap-6"
          animate={{
            x: [0, -50 * CONCEPTS.length * 1.5],
          }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {duplicatedConcepts.map((concept, index) => (
            <div
              key={`${concept.name}-${index}`}
              className="flex-shrink-0 glass-card px-6 py-4 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow-blue group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl group-hover:scale-110 transition-transform">{concept.icon}</span>
                <div>
                  <p className="font-semibold text-foreground whitespace-nowrap">{concept.name}</p>
                  <p className="text-xs text-primary">{concept.philosophy}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
