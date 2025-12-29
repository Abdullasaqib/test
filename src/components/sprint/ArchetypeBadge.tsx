import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export interface ArchetypeInfo {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
}

export const FOUNDER_ARCHETYPES: Record<string, ArchetypeInfo> = {
  strategist: {
    id: 'strategist',
    name: 'The Strategist',
    emoji: '🧠',
    description: 'You think three steps ahead',
    color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-300',
  },
  innovator: {
    id: 'innovator',
    name: 'The Innovator',
    emoji: '💡',
    description: 'You see solutions others miss',
    color: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-300',
  },
  pragmatist: {
    id: 'pragmatist',
    name: 'The Pragmatist',
    emoji: '🎯',
    description: 'You focus on what works',
    color: 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-300',
  },
  disruptor: {
    id: 'disruptor',
    name: 'The Disruptor',
    emoji: '🔥',
    description: 'You challenge the status quo',
    color: 'from-red-500/20 to-orange-500/20 border-red-500/30 text-red-300',
  },
  collaborator: {
    id: 'collaborator',
    name: 'The Collaborator',
    emoji: '🤝',
    description: 'You build bridges, not walls',
    color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300',
  },
  visionary: {
    id: 'visionary',
    name: 'The Visionary',
    emoji: '🚀',
    description: 'You dream big and inspire others',
    color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-300',
  },
};

interface ArchetypeBadgeProps {
  archetype: string;
  size?: 'sm' | 'lg';
  showDescription?: boolean;
}

export function ArchetypeBadge({ archetype, size = 'sm', showDescription = false }: ArchetypeBadgeProps) {
  const info = FOUNDER_ARCHETYPES[archetype] || FOUNDER_ARCHETYPES.innovator;
  
  if (size === 'lg') {
    return (
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", bounce: 0.5, delay: 0.3 }}
        className={`inline-flex flex-col items-center gap-2 bg-gradient-to-br ${info.color} border px-6 py-4 rounded-2xl`}
      >
        <motion.span 
          className="text-4xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {info.emoji}
        </motion.span>
        <div className="text-center">
          <div className="font-bold text-lg">{info.name}</div>
          {showDescription && (
            <div className="text-sm opacity-80">{info.description}</div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <Badge className={`bg-gradient-to-r ${info.color} border gap-1.5 text-sm py-1 px-3`}>
      <span>{info.emoji}</span>
      {info.name}
    </Badge>
  );
}
