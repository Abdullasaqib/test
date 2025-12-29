import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Save, Sparkles, RefreshCw, Eye } from "lucide-react";

interface ArtifactBuilderProps {
  artifactType: string;
  title: string;
  initialContent?: Record<string, string>;
  onSave: (content: Record<string, string>) => void;
  onAskCoach: (prompt: string) => void;
}

const ARTIFACT_CONFIGS: Record<string, { fields: { key: string; label: string; type: 'text' | 'textarea' }[] }> = {
  problem_card: {
    fields: [
      { key: 'problem', label: 'The Problem (2 sentences)', type: 'textarea' },
      { key: 'who', label: 'Who has this problem?', type: 'text' },
      { key: 'pain', label: 'How painful is it? (1-10)', type: 'text' },
    ],
  },
  customer_persona: {
    fields: [
      { key: 'name', label: 'Customer Name', type: 'text' },
      { key: 'age', label: 'Age', type: 'text' },
      { key: 'occupation', label: 'Occupation', type: 'text' },
      { key: 'pain_points', label: 'Pain Points', type: 'textarea' },
      { key: 'goals', label: 'Goals', type: 'textarea' },
    ],
  },
  landing_page: {
    fields: [
      { key: 'headline', label: 'Headline', type: 'text' },
      { key: 'subheadline', label: 'Subheadline', type: 'text' },
      { key: 'problem', label: 'Problem Statement', type: 'textarea' },
      { key: 'solution', label: 'Your Solution', type: 'textarea' },
      { key: 'cta', label: 'Call to Action', type: 'text' },
    ],
  },
  mvp_spec: {
    fields: [
      { key: 'core_feature', label: 'Core Feature', type: 'text' },
      { key: 'user_flow', label: 'User Flow (step by step)', type: 'textarea' },
      { key: 'tools', label: 'Tools to Build With', type: 'text' },
    ],
  },
  pitch_script: {
    fields: [
      { key: 'hook', label: 'Hook (first 10 seconds)', type: 'textarea' },
      { key: 'problem', label: 'Problem', type: 'textarea' },
      { key: 'solution', label: 'Solution', type: 'textarea' },
      { key: 'traction', label: 'Traction/Progress', type: 'textarea' },
      { key: 'ask', label: 'The Ask', type: 'textarea' },
    ],
  },
  pitch_deck: {
    fields: [
      { key: 'title_slide', label: 'Title & Tagline', type: 'text' },
      { key: 'problem_slide', label: 'Problem Slide', type: 'textarea' },
      { key: 'solution_slide', label: 'Solution Slide', type: 'textarea' },
      { key: 'demo_slide', label: 'Demo/Product Slide', type: 'textarea' },
      { key: 'market_slide', label: 'Market Size', type: 'textarea' },
      { key: 'team_slide', label: 'Team', type: 'textarea' },
    ],
  },
  reflection: {
    fields: [
      { key: 'learned', label: 'What I learned today', type: 'textarea' },
      { key: 'surprised', label: 'What surprised me', type: 'textarea' },
      { key: 'next', label: 'What I want to explore next', type: 'textarea' },
    ],
  },
};

export function ArtifactBuilder({ 
  artifactType, 
  title, 
  initialContent = {}, 
  onSave, 
  onAskCoach 
}: ArtifactBuilderProps) {
  const [content, setContent] = useState<Record<string, string>>(initialContent);
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const config = ARTIFACT_CONFIGS[artifactType] || ARTIFACT_CONFIGS.reflection;

  const handleFieldChange = (key: string, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(content);
    setIsSaving(false);
  };

  const handleAskCoachForField = (fieldLabel: string) => {
    onAskCoach(`Help me write the "${fieldLabel}" section for my ${title}`);
  };

  return (
    <Card className="border-2 border-dashed border-primary/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <Badge variant="secondary" className="mt-1 text-xs">
                {artifactType.replace(/_/g, ' ')}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreview(!isPreview)}
            >
              <Eye className="h-4 w-4 mr-1" />
              {isPreview ? 'Edit' : 'Preview'}
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-1" />
              )}
              Save
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isPreview ? (
          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            {config.fields.map((field) => (
              <div key={field.key}>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">
                  {field.label}
                </h4>
                <p className="text-foreground whitespace-pre-line">
                  {content[field.key] || <span className="text-muted-foreground italic">Not filled</span>}
                </p>
              </div>
            ))}
          </div>
        ) : (
          config.fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  {field.label}
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAskCoachForField(field.label)}
                  className="text-xs h-7 text-primary"
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  Need Help?
                </Button>
              </div>
              {field.type === 'textarea' ? (
                <Textarea
                  value={content[field.key] || ''}
                  onChange={(e) => handleFieldChange(field.key, e.target.value)}
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                  className="min-h-[80px]"
                />
              ) : (
                <Input
                  value={content[field.key] || ''}
                  onChange={(e) => handleFieldChange(field.key, e.target.value)}
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                />
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
