import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Filter, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { useCaseStudies } from "@/hooks/useCaseStudies";
import { useStudentPricingTier } from "@/hooks/useStudentPricingTier";
import { cn } from "@/lib/utils";

export default function CaseStudies() {
  const navigate = useNavigate();
  const [programFilter, setProgramFilter] = useState<string>("all");
  const { data: caseStudies = [], isLoading } = useCaseStudies({
    program: programFilter === "all" ? undefined : programFilter,
    depth: 'full'
  });
  const { canAccess, tier } = useStudentPricingTier();

  const hasAccess = tier ? canAccess("case_studies") : false;

  const programLabels: Record<string, string> = {
    junior: "Junior (9-11)",
    teen: "Teen (12-14)",
    advanced: "Advanced (15-16)",
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <main className="pt-24 pb-20">
        <section className="container mx-auto px-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Real Founders. Real Projects.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what students just like you have built with AI tools. 
              Each case study includes the exact prompts they used.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={programFilter} onValueChange={setProgramFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Programs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                <SelectItem value="junior">Junior (9-11)</SelectItem>
                <SelectItem value="teen">Teen (12-14)</SelectItem>
                <SelectItem value="advanced">Advanced (15-16)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : caseStudies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No case studies found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className={cn(
                      "relative overflow-hidden transition-all hover:shadow-lg cursor-pointer group",
                      !hasAccess && "opacity-75"
                    )}
                    onClick={() => hasAccess && navigate(`/case-studies/${study.slug}`)}
                  >
                    {!hasAccess && (
                      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="text-center p-4">
                          <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm font-medium">Upgrade to access</p>
                          <Button 
                            size="sm" 
                            className="mt-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/pricing");
                            }}
                          >
                            View Plans
                          </Button>
                        </div>
                      </div>
                    )}

                    {study.is_featured && (
                      <Badge className="absolute top-4 right-4 z-5">
                        Featured
                      </Badge>
                    )}

                    <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-6xl">
                        {study.program === "junior" && "🚀"}
                        {study.program === "teen" && "⚡"}
                        {study.program === "advanced" && "🎯"}
                      </span>
                    </div>

                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">
                          {programLabels[study.program]}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Age {study.student_age}
                        </span>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {study.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {study.problem_found}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {study.tools_used.slice(0, 3).map((tool) => (
                          <Badge key={tool} variant="secondary" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                        {study.tools_used.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{study.tools_used.length - 3}
                          </Badge>
                        )}
                      </div>

                      {study.outcome && (
                        <p className="text-sm font-medium text-primary">
                          📈 {study.outcome}
                        </p>
                      )}

                      {hasAccess && (
                        <div className="flex items-center text-sm text-primary mt-4 group-hover:translate-x-1 transition-transform">
                          Read full case study
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
