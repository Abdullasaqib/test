import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Save, DollarSign, RefreshCw } from "lucide-react";

interface PricingTier {
  id: string;
  name: string;
  slug: string;
  type: string;
  original_price: number | null;
  current_price: number;
  monthly_price: number | null;
  billing_period: string;
  trial_days: number;
  badge_text: string | null;
  is_active: boolean;
  display_order: number;
}

export default function AdminPricing() {
  const queryClient = useQueryClient();
  const [editingTier, setEditingTier] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<PricingTier>>({});

  const { data: tiers = [], isLoading } = useQuery({
    queryKey: ["admin-pricing-tiers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pricing_tiers")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as PricingTier[];
    },
  });

  const updateTierMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<PricingTier> }) => {
      const { error } = await supabase
        .from("pricing_tiers")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pricing-tiers"] });
      queryClient.invalidateQueries({ queryKey: ["pricing-tiers"] });
      setEditingTier(null);
      toast.success("Pricing updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update pricing: " + error.message);
    },
  });

  const startEditing = (tier: PricingTier) => {
    setEditingTier(tier.id);
    setEditValues({
      original_price: tier.original_price,
      current_price: tier.current_price,
      monthly_price: tier.monthly_price,
      trial_days: tier.trial_days,
      badge_text: tier.badge_text,
      is_active: tier.is_active,
    });
  };

  const saveEditing = () => {
    if (!editingTier) return;
    updateTierMutation.mutate({ id: editingTier, updates: editValues });
  };

  const cancelEditing = () => {
    setEditingTier(null);
    setEditValues({});
  };

  const b2cTiers = tiers.filter((t) => t.type === "b2c");
  const b2bTiers = tiers.filter((t) => t.type === "b2b");

  const renderTierCard = (tier: PricingTier) => {
    const isEditing = editingTier === tier.id;

    return (
      <Card key={tier.id} className="relative">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{tier.name}</CardTitle>
            <div className="flex items-center gap-2">
              {tier.badge_text && (
                <Badge variant="outline">{tier.badge_text}</Badge>
              )}
              <Badge variant={tier.is_active ? "default" : "secondary"}>
                {tier.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{tier.slug}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {isEditing ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`original-${tier.id}`}>Original Price ($)</Label>
                  <Input
                    id={`original-${tier.id}`}
                    type="number"
                    value={editValues.original_price ?? ""}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        original_price: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                    placeholder="e.g., 39"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Shown crossed out</p>
                </div>
                <div>
                  <Label htmlFor={`current-${tier.id}`}>Current Price ($)</Label>
                  <Input
                    id={`current-${tier.id}`}
                    type="number"
                    value={editValues.current_price ?? ""}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        current_price: Number(e.target.value),
                      })
                    }
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">Selling price</p>
                </div>
              </div>

              {tier.billing_period === "yearly" && (
                <div>
                  <Label htmlFor={`monthly-${tier.id}`}>Monthly Price ($)</Label>
                  <Input
                    id={`monthly-${tier.id}`}
                    type="number"
                    value={editValues.monthly_price ?? ""}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        monthly_price: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                    placeholder="e.g., 29"
                  />
                </div>
              )}

              <div>
                <Label htmlFor={`trial-${tier.id}`}>Trial Days</Label>
                <Input
                  id={`trial-${tier.id}`}
                  type="number"
                  value={editValues.trial_days ?? 0}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      trial_days: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor={`badge-${tier.id}`}>Badge Text</Label>
                <Input
                  id={`badge-${tier.id}`}
                  value={editValues.badge_text ?? ""}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      badge_text: e.target.value || null,
                    })
                  }
                  placeholder="e.g., RECOMMENDED, LIMITED OFFER"
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id={`active-${tier.id}`}
                  checked={editValues.is_active}
                  onCheckedChange={(checked) =>
                    setEditValues({ ...editValues, is_active: checked })
                  }
                />
                <Label htmlFor={`active-${tier.id}`}>Active</Label>
              </div>

              <div className="flex gap-2">
                <Button onClick={saveEditing} disabled={updateTierMutation.isPending}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={cancelEditing}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Original:</span>
                  <span className={tier.original_price ? "line-through" : ""}>
                    {tier.original_price ? `$${tier.original_price}` : "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Current:</span>
                  <span className="text-xl font-bold">${tier.current_price}</span>
                </div>
                {tier.monthly_price && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Monthly:</span>
                    <span>${tier.monthly_price}/mo</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Trial:</span>
                  <span>{tier.trial_days} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Billing:</span>
                  <span>{tier.billing_period}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={() => startEditing(tier)}>
                Edit Pricing
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <DollarSign className="h-8 w-8" />
            Pricing Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage pricing tiers for B2C and B2B customers
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => queryClient.invalidateQueries({ queryKey: ["admin-pricing-tiers"] })}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <Tabs defaultValue="b2c">
          <TabsList className="mb-6">
            <TabsTrigger value="b2c">B2C Individual ({b2cTiers.length})</TabsTrigger>
            <TabsTrigger value="b2b">B2B Schools ({b2bTiers.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="b2c">
            <div className="grid md:grid-cols-3 gap-6">
              {b2cTiers.map(renderTierCard)}
            </div>
          </TabsContent>

          <TabsContent value="b2b">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {b2bTiers.map(renderTierCard)}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
