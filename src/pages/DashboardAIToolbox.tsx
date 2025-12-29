import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, BookOpen, HelpCircle, Star, Clock } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PromptLibrary, StuckGenerator, PromptHistory } from "@/components/ai-toolbox";
import { useAIToolbox } from "@/hooks/useAIToolbox";

export default function DashboardAIToolbox() {
  const navigate = useNavigate();
  const {
    prompts,
    favorites,
    favoritePrompts,
    history,
    loading,
    toggleFavorite,
    recordUsage,
    studentContext,
  } = useAIToolbox();
  const [activeTab, setActiveTab] = useState("library");

  const handleUsePrompt = (prompt: string) => {
    // Find the prompt ID if it exists in our library
    const foundPrompt = prompts.find((p) => p.prompt_template === prompt);
    if (foundPrompt) {
      recordUsage(foundPrompt.id, "AI Coach");
    }
    // Navigate to AI Coach with prompt pre-filled
    navigate("/dashboard/coach", { state: { prefillPrompt: prompt } });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Founder's Toolkit</h1>
            <p className="text-muted-foreground">
              Prompts, templates & shortcuts to build faster 🚀
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-lg">
            <TabsTrigger value="library" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Library</span>
            </TabsTrigger>
            <TabsTrigger value="stuck" className="gap-2">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">I'm Stuck</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2">
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">Favorites</span>
              {favorites.length > 0 && (
                <span className="text-xs bg-primary/20 px-1.5 rounded-full">
                  {favorites.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="mt-6">
            <PromptLibrary
              prompts={prompts}
              favorites={favorites}
              currentWeek={studentContext.currentWeek}
              onToggleFavorite={toggleFavorite}
              onUsePrompt={handleUsePrompt}
            />
          </TabsContent>

          <TabsContent value="stuck" className="mt-6">
            <StuckGenerator
              studentContext={studentContext}
              onUsePrompt={handleUsePrompt}
            />
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            {favoritePrompts.length === 0 ? (
              <div className="text-center py-12">
                <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
                <p className="text-muted-foreground text-sm">
                  Click the heart icon on any prompt to save it here
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoritePrompts.map((prompt) => (
                  <div key={prompt.id}>
                    {/* Using inline PromptCard rendering for favorites */}
                    <div className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{prompt.title}</span>
                        <button onClick={() => toggleFavorite(prompt.id)}>
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {prompt.description}
                      </p>
                      <button
                        className="w-full text-sm text-primary hover:underline"
                        onClick={() => handleUsePrompt(prompt.prompt_template)}
                      >
                        Use This →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <PromptHistory history={history} onUsePrompt={handleUsePrompt} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}