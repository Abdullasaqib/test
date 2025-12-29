import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Edit, Trash2, BookOpen, Eye, EyeOff, Star, Sparkles, Image, Loader2 } from "lucide-react";
import { CaseStudy } from "@/hooks/useCaseStudies";

const INDUSTRIES = [
  'Education', 'Health & Wellness', 'Environment', 'Gaming', 
  'Social Impact', 'Local Business', 'Creative Arts', 'Pet Care',
  'Food & Nutrition', 'Sports & Fitness', 'Entertainment', 'Productivity'
];

export default function AdminCaseStudies() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [editingStudy, setEditingStudy] = useState<CaseStudy | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState<string | null>(null);
  const [generatedPreview, setGeneratedPreview] = useState<any>(null);
  
  const [generateOptions, setGenerateOptions] = useState({
    program: "teen",
    industry: "",
    seedDetails: "",
  });

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    student_name: "",
    student_age: "",
    program: "teen",
    problem_found: "",
    design_journey: "",
    code_journey: "",
    launch_story: "",
    key_learnings: "",
    tools_used: "",
    outcome: "",
    is_featured: false,
    is_published: true,
  });

  const { data: caseStudies = [], isLoading } = useQuery({
    queryKey: ["admin-case-studies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data || []).map((study) => ({
        ...study,
        program: study.program as CaseStudy["program"],
        prompts_used: (study.prompts_used || []) as CaseStudy["prompts_used"],
        tools_used: study.tools_used || [],
      })) as CaseStudy[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from("case_studies").insert(data);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-case-studies"] });
      queryClient.invalidateQueries({ queryKey: ["case-studies"] });
      setIsDialogOpen(false);
      setIsGenerateDialogOpen(false);
      setGeneratedPreview(null);
      resetForm();
      toast.success("Case study created");
    },
    onError: (error) => {
      toast.error("Failed to create: " + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase
        .from("case_studies")
        .update({
          ...data,
          student_age: data.student_age ? Number(data.student_age) : null,
          tools_used: data.tools_used.split(",").map((t) => t.trim()).filter(Boolean),
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-case-studies"] });
      queryClient.invalidateQueries({ queryKey: ["case-studies"] });
      setIsDialogOpen(false);
      setEditingStudy(null);
      resetForm();
      toast.success("Case study updated");
    },
    onError: (error) => {
      toast.error("Failed to update: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("case_studies").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-case-studies"] });
      queryClient.invalidateQueries({ queryKey: ["case-studies"] });
      toast.success("Case study deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete: " + error.message);
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      student_name: "",
      student_age: "",
      program: "teen",
      problem_found: "",
      design_journey: "",
      code_journey: "",
      launch_story: "",
      key_learnings: "",
      tools_used: "",
      outcome: "",
      is_featured: false,
      is_published: true,
    });
  };

  const openEdit = (study: CaseStudy) => {
    setEditingStudy(study);
    setFormData({
      title: study.title,
      slug: study.slug,
      student_name: study.student_name,
      student_age: study.student_age?.toString() || "",
      program: study.program,
      problem_found: study.problem_found || "",
      design_journey: study.design_journey || "",
      code_journey: study.code_journey || "",
      launch_story: study.launch_story || "",
      key_learnings: study.key_learnings || "",
      tools_used: study.tools_used.join(", "),
      outcome: study.outcome || "",
      is_featured: study.is_featured,
      is_published: study.is_published,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudy) {
      updateMutation.mutate({ id: editingStudy.id, data: formData });
    } else {
      createMutation.mutate({
        ...formData,
        student_age: formData.student_age ? Number(formData.student_age) : null,
        tools_used: formData.tools_used.split(",").map((t) => t.trim()).filter(Boolean),
        prompts_used: [],
      });
    }
  };

  const handleGenerateWithAI = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-case-study', {
        body: {
          program: generateOptions.program,
          industry: generateOptions.industry || undefined,
          seedDetails: generateOptions.seedDetails || undefined,
        }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setGeneratedPreview(data.caseStudy);
      toast.success("Case study generated! Review and save.");
    } catch (error: any) {
      console.error('Generation error:', error);
      toast.error(error.message || "Failed to generate case study");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveGenerated = () => {
    if (!generatedPreview) return;
    
    createMutation.mutate({
      title: generatedPreview.title,
      slug: generatedPreview.slug,
      student_name: generatedPreview.student_name,
      student_age: generatedPreview.student_age,
      program: generatedPreview.program,
      problem_found: generatedPreview.problem_found,
      design_journey: generatedPreview.design_journey,
      code_journey: generatedPreview.code_journey,
      launch_story: generatedPreview.launch_story,
      key_learnings: generatedPreview.key_learnings,
      tools_used: generatedPreview.tools_used,
      prompts_used: generatedPreview.prompts_used,
      outcome: generatedPreview.outcome,
      is_published: false,
      is_featured: false,
    });
  };

  const handleGenerateThumbnail = async (study: CaseStudy) => {
    setIsGeneratingThumbnail(study.id);
    try {
      const { data, error } = await supabase.functions.invoke('generate-case-study-thumbnail', {
        body: {
          title: study.title,
          problem_found: study.problem_found,
          tools_used: study.tools_used,
          program: study.program,
        }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      // Update the case study with the thumbnail URL
      const { error: updateError } = await supabase
        .from("case_studies")
        .update({ thumbnail_url: data.thumbnail_url })
        .eq("id", study.id);

      if (updateError) throw updateError;

      queryClient.invalidateQueries({ queryKey: ["admin-case-studies"] });
      toast.success("Thumbnail generated!");
    } catch (error: any) {
      console.error('Thumbnail generation error:', error);
      toast.error(error.message || "Failed to generate thumbnail");
    } finally {
      setIsGeneratingThumbnail(null);
    }
  };

  const togglePublished = async (study: CaseStudy) => {
    await supabase
      .from("case_studies")
      .update({ is_published: !study.is_published })
      .eq("id", study.id);
    queryClient.invalidateQueries({ queryKey: ["admin-case-studies"] });
    toast.success(study.is_published ? "Unpublished" : "Published");
  };

  const toggleFeatured = async (study: CaseStudy) => {
    await supabase
      .from("case_studies")
      .update({ is_featured: !study.is_featured })
      .eq("id", study.id);
    queryClient.invalidateQueries({ queryKey: ["admin-case-studies"] });
    toast.success(study.is_featured ? "Unfeatured" : "Featured");
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-8 w-8" />
            Case Studies
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage student success stories ({caseStudies.length} total)
          </p>
        </div>
        <div className="flex gap-2">
          {/* Generate with AI Dialog */}
          <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Sparkles className="h-4 w-4 mr-2" />
                Generate with AI
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Generate Case Study with AI
                </DialogTitle>
              </DialogHeader>
              
              {!generatedPreview ? (
                <div className="space-y-4">
                  <div>
                    <Label>Program Track</Label>
                    <Select
                      value={generateOptions.program}
                      onValueChange={(v) => setGenerateOptions({ ...generateOptions, program: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="junior">Junior (9-11 years)</SelectItem>
                        <SelectItem value="teen">Teen (12-14 years)</SelectItem>
                        <SelectItem value="advanced">Advanced (15-16 years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Industry Category (optional)</Label>
                    <Select
                      value={generateOptions.industry}
                      onValueChange={(v) => setGenerateOptions({ ...generateOptions, industry: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Random industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Random</SelectItem>
                        {INDUSTRIES.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Seed Details (optional)</Label>
                    <Textarea
                      value={generateOptions.seedDetails}
                      onChange={(e) => setGenerateOptions({ ...generateOptions, seedDetails: e.target.value })}
                      placeholder="Add any specific details you want included, like 'student from Singapore who loves robotics' or 'project should involve sustainability'"
                      rows={3}
                    />
                  </div>

                  <Button 
                    onClick={handleGenerateWithAI} 
                    disabled={isGenerating}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Case Study
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{generatedPreview.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {generatedPreview.student_name}, {generatedPreview.student_age} • {generatedPreview.program}
                      </p>
                    </div>
                    
                    <div>
                      <Label className="text-xs text-muted-foreground">Problem Found</Label>
                      <p className="text-sm">{generatedPreview.problem_found}</p>
                    </div>
                    
                    <div>
                      <Label className="text-xs text-muted-foreground">Design Journey</Label>
                      <p className="text-sm">{generatedPreview.design_journey}</p>
                    </div>
                    
                    <div>
                      <Label className="text-xs text-muted-foreground">Build Journey</Label>
                      <p className="text-sm">{generatedPreview.code_journey}</p>
                    </div>
                    
                    <div>
                      <Label className="text-xs text-muted-foreground">Launch Story</Label>
                      <p className="text-sm">{generatedPreview.launch_story}</p>
                    </div>
                    
                    <div>
                      <Label className="text-xs text-muted-foreground">Key Learnings</Label>
                      <p className="text-sm">{generatedPreview.key_learnings}</p>
                    </div>
                    
                    <div>
                      <Label className="text-xs text-muted-foreground">Outcome</Label>
                      <p className="text-sm font-medium">{generatedPreview.outcome}</p>
                    </div>
                    
                    <div>
                      <Label className="text-xs text-muted-foreground">Tools Used</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {generatedPreview.tools_used?.map((tool: string) => (
                          <Badge key={tool} variant="outline" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {generatedPreview.prompts_used?.length > 0 && (
                      <div>
                        <Label className="text-xs text-muted-foreground">Prompts Used</Label>
                        <div className="space-y-2 mt-1">
                          {generatedPreview.prompts_used.map((p: any, i: number) => (
                            <div key={i} className="bg-background rounded p-2 text-xs">
                              <span className="font-medium">{p.tool}:</span> {p.prompt}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setGeneratedPreview(null)}
                      className="flex-1"
                    >
                      Regenerate
                    </Button>
                    <Button 
                      onClick={handleSaveGenerated}
                      disabled={createMutation.isPending}
                      className="flex-1"
                    >
                      {createMutation.isPending ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : null}
                      Save Case Study
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Manual Create Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setEditingStudy(null);
              resetForm();
            }
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Manually
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingStudy ? "Edit Case Study" : "New Case Study"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Slug</Label>
                    <Input
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="pet-finder-app"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Student Name</Label>
                    <Input
                      value={formData.student_name}
                      onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Age</Label>
                    <Input
                      type="number"
                      value={formData.student_age}
                      onChange={(e) => setFormData({ ...formData, student_age: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Program</Label>
                    <Select
                      value={formData.program}
                      onValueChange={(v) => setFormData({ ...formData, program: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="junior">Junior (9-11)</SelectItem>
                        <SelectItem value="teen">Teen (12-14)</SelectItem>
                        <SelectItem value="advanced">Advanced (15-16)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Problem Found</Label>
                  <Textarea
                    value={formData.problem_found}
                    onChange={(e) => setFormData({ ...formData, problem_found: e.target.value })}
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Design Journey</Label>
                  <Textarea
                    value={formData.design_journey}
                    onChange={(e) => setFormData({ ...formData, design_journey: e.target.value })}
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Code/Build Journey</Label>
                  <Textarea
                    value={formData.code_journey}
                    onChange={(e) => setFormData({ ...formData, code_journey: e.target.value })}
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Launch Story</Label>
                  <Textarea
                    value={formData.launch_story}
                    onChange={(e) => setFormData({ ...formData, launch_story: e.target.value })}
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Key Learnings</Label>
                  <Textarea
                    value={formData.key_learnings}
                    onChange={(e) => setFormData({ ...formData, key_learnings: e.target.value })}
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Tools Used (comma-separated)</Label>
                  <Input
                    value={formData.tools_used}
                    onChange={(e) => setFormData({ ...formData, tools_used: e.target.value })}
                    placeholder="Glide, ChatGPT, Canva"
                  />
                </div>

                <div>
                  <Label>Outcome</Label>
                  <Input
                    value={formData.outcome}
                    onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                    placeholder="45 users, 2 pets reunited"
                  />
                </div>

                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.is_published}
                      onCheckedChange={(c) => setFormData({ ...formData, is_published: c })}
                    />
                    <Label>Published</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.is_featured}
                      onCheckedChange={(c) => setFormData({ ...formData, is_featured: c })}
                    />
                    <Label>Featured</Label>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  {editingStudy ? "Update" : "Create"} Case Study
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <Card key={study.id}>
              <CardHeader className="pb-2">
                {study.thumbnail_url && (
                  <img 
                    src={study.thumbnail_url} 
                    alt={study.title}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                )}
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{study.title}</CardTitle>
                  <div className="flex gap-1">
                    {study.is_featured && (
                      <Badge variant="default">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    {!study.is_published && (
                      <Badge variant="secondary">Draft</Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {study.student_name}, {study.student_age} • {study.program}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {study.problem_found}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {study.tools_used.slice(0, 3).map((tool) => (
                    <Badge key={tool} variant="outline" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" variant="outline" onClick={() => openEdit(study)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleGenerateThumbnail(study)}
                    disabled={isGeneratingThumbnail === study.id}
                  >
                    {isGeneratingThumbnail === study.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Image className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => togglePublished(study)}
                  >
                    {study.is_published ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleFeatured(study)}
                  >
                    <Star className={`h-4 w-4 ${study.is_featured ? "fill-current" : ""}`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      if (confirm("Delete this case study?")) {
                        deleteMutation.mutate(study.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
