import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Users, Zap } from "lucide-react";
import type { CaseStudy } from "@/hooks/useCaseStudies";

interface TryItCardProps {
  project: CaseStudy;
}

export function TryItCard({ project }: TryItCardProps) {
  // No external URL to try for case studies
  return null;
}
