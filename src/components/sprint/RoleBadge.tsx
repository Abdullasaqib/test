import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface RoleInfo {
  id: string;
  title: string;
  emoji: string;
  description: string;
  typical_decisions: string[];
  color: string;
}

export const FOUNDER_ROLES: Record<string, RoleInfo> = {
  CEO: {
    id: 'CEO',
    title: 'Chief Executive Officer',
    emoji: '👔',
    description: 'You see the big picture and make the tough calls',
    typical_decisions: ['Company vision', 'Major partnerships', 'Funding decisions'],
    color: 'from-blue-600/20 to-indigo-600/20 border-blue-500/40 text-blue-300',
  },
  CMO: {
    id: 'CMO',
    title: 'Chief Marketing Officer',
    emoji: '📣',
    description: 'You make people fall in love with the product',
    typical_decisions: ['Brand messaging', 'Marketing campaigns', 'Customer acquisition'],
    color: 'from-pink-500/20 to-rose-500/20 border-pink-500/40 text-pink-300',
  },
  CFO: {
    id: 'CFO',
    title: 'Chief Financial Officer',
    emoji: '💰',
    description: 'Every dollar counts, and you know where they go',
    typical_decisions: ['Budget allocation', 'Financial forecasting', 'Pricing strategy'],
    color: 'from-emerald-500/20 to-green-500/20 border-emerald-500/40 text-emerald-300',
  },
  CTO: {
    id: 'CTO',
    title: 'Chief Technology Officer',
    emoji: '💻',
    description: 'You decide what gets built and when it ships',
    typical_decisions: ['Technical architecture', 'Build vs buy', 'Launch decisions'],
    color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-300',
  },
  COO: {
    id: 'COO',
    title: 'Chief Operating Officer',
    emoji: '⚙️',
    description: 'You keep everything running smoothly',
    typical_decisions: ['Supply chain', 'Process optimization', 'Vendor management'],
    color: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-300',
  },
};

interface RoleBadgeProps {
  role: string;
  size?: 'sm' | 'md' | 'lg';
  showDescription?: boolean;
  className?: string;
}

export function RoleBadge({ role, size = 'sm', showDescription = false, className }: RoleBadgeProps) {
  const info = FOUNDER_ROLES[role];
  if (!info) return null;

  if (size === 'lg') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          `inline-flex flex-col items-center gap-2 bg-gradient-to-br ${info.color} border px-6 py-4 rounded-2xl`,
          className
        )}
      >
        <motion.span 
          className="text-4xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {info.emoji}
        </motion.span>
        <div className="text-center">
          <div className="font-bold text-lg">{role}</div>
          <div className="text-sm opacity-80">{info.title}</div>
          {showDescription && (
            <div className="text-xs opacity-60 mt-1">{info.description}</div>
          )}
        </div>
      </motion.div>
    );
  }

  if (size === 'md') {
    return (
      <div className={cn(
        `inline-flex items-center gap-2 bg-gradient-to-r ${info.color} border px-3 py-1.5 rounded-lg`,
        className
      )}>
        <span className="text-lg">{info.emoji}</span>
        <div>
          <div className="font-semibold text-sm">{role}</div>
          {showDescription && (
            <div className="text-xs opacity-70">{info.title}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Badge className={cn(`bg-gradient-to-r ${info.color} border gap-1.5 text-xs py-0.5 px-2`, className)}>
      <span>{info.emoji}</span>
      {role}
    </Badge>
  );
}

interface RoleContextCardProps {
  role: string;
}

export function RoleContextCard({ role }: RoleContextCardProps) {
  const info = FOUNDER_ROLES[role];
  if (!info) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        `bg-gradient-to-r ${info.color} border rounded-lg p-4 mb-4`
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{info.emoji}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">{role}</span>
            <span className="text-sm opacity-70">— {info.title}</span>
          </div>
          <p className="text-sm opacity-80">{info.description}</p>
        </div>
      </div>
    </motion.div>
  );
}