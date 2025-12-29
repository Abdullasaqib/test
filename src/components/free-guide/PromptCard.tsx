import { motion } from "framer-motion";
import { CopyButton } from "./CopyButton";

interface PromptCardProps {
  title: string;
  prompt: string;
  index: number;
  color?: string;
}

export const PromptCard = ({ title, prompt, index, color = "primary" }: PromptCardProps) => {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    green: "bg-green-500/10 text-green-400",
    accent: "bg-accent/10 text-accent",
    purple: "bg-purple-500/10 text-purple-400",
    blue: "bg-blue-500/10 text-blue-400",
    orange: "bg-orange-500/10 text-orange-400"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="font-medium text-white text-sm">{title}</h4>
        <CopyButton text={prompt} />
      </div>
      <p className="text-white/50 text-xs leading-relaxed font-mono bg-white/5 p-2 rounded border border-white/5">
        {prompt}
      </p>
    </motion.div>
  );
};
