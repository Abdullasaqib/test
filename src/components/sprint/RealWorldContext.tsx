import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, Briefcase, Building2, Globe, 
  ChevronDown, ChevronUp, Sparkles 
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RealWorldContextData {
  fun_facts?: string[];
  career_connections?: string[];
  company_examples?: string[];
  did_you_know?: string;
}

interface RealWorldContextProps {
  context: RealWorldContextData;
  trackIcon?: string;
  trackName?: string;
  defaultExpanded?: boolean;
}

export function RealWorldContext({ 
  context, 
  trackIcon, 
  trackName,
  defaultExpanded = true 
}: RealWorldContextProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const hasFunFacts = context.fun_facts && context.fun_facts.length > 0;
  const hasCareerConnections = context.career_connections && context.career_connections.length > 0;
  const hasCompanyExamples = context.company_examples && context.company_examples.length > 0;
  const hasContent = hasFunFacts || hasCareerConnections || hasCompanyExamples || context.did_you_know;

  if (!hasContent) return null;

  return (
    <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-purple-500/10 border-primary/20 overflow-hidden">
      <CardContent className="p-0">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-left p-4 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Globe className="h-4 w-4 text-primary" />
            </div>
            <div>
              <span className="font-semibold text-sm text-foreground">Real-World Context</span>
              {trackIcon && trackName && (
                <span className="text-xs text-muted-foreground ml-2">
                  {trackIcon} {trackName}
                </span>
              )}
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-4">
                {/* Did You Know - Featured */}
                {context.did_you_know && (
                  <motion.div 
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-start gap-3 bg-yellow-500/15 rounded-xl p-4 border border-yellow-500/20"
                  >
                    <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-yellow-400 uppercase tracking-wide">Did You Know?</span>
                      <p className="text-sm text-foreground mt-1 leading-relaxed">{context.did_you_know}</p>
                    </div>
                  </motion.div>
                )}

                {/* Fun Facts */}
                {hasFunFacts && (
                  <motion.div 
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Sparkles className="h-4 w-4 text-purple-400" />
                      Fun Facts
                    </div>
                    <ul className="space-y-2 ml-6">
                      {context.fun_facts!.map((fact, i) => (
                        <motion.li 
                          key={i} 
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 + i * 0.05 }}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span>{fact}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Career Connections */}
                {hasCareerConnections && (
                  <motion.div 
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Briefcase className="h-4 w-4 text-blue-400" />
                      Career Pathways
                    </div>
                    <div className="flex flex-wrap gap-2 ml-6">
                      {context.career_connections!.map((career, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                        >
                          <Badge variant="outline" className="text-xs bg-blue-500/10 border-blue-500/30 text-blue-300">
                            {career}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Company Examples */}
                {hasCompanyExamples && (
                  <motion.div 
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Building2 className="h-4 w-4 text-emerald-400" />
                      Companies Doing This
                    </div>
                    <div className="flex flex-wrap gap-2 ml-6">
                      {context.company_examples!.map((company, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.4 + i * 0.05 }}
                        >
                          <Badge variant="secondary" className="text-xs bg-emerald-500/10 border-emerald-500/30 text-emerald-300">
                            {company}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}