import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface RoleFitChartProps {
  roleFit: {
    ceo: number;
    cto: number;
    cmo: number;
    coo: number;
  };
}

const roles = [
  { key: 'ceo', label: 'CEO', description: 'Visionary Leader', color: 'bg-purple-500' },
  { key: 'cto', label: 'CTO', description: 'Product & Tech', color: 'bg-blue-500' },
  { key: 'cmo', label: 'CMO', description: 'Marketing & Growth', color: 'bg-green-500' },
  { key: 'coo', label: 'COO', description: 'Operations & Scale', color: 'bg-orange-500' },
];

export function RoleFitChart({ roleFit }: RoleFitChartProps) {
  const maxFit = Math.max(roleFit.ceo, roleFit.cto, roleFit.cmo, roleFit.coo, 1);
  const topRole = roles.find(r => roleFit[r.key as keyof typeof roleFit] === maxFit);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          Role Fit
          {topRole && (
            <span className="ml-auto text-xs font-normal text-muted-foreground">
              Best fit: {topRole.label}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {roles.map(role => {
          const value = roleFit[role.key as keyof typeof roleFit] || 0;
          const isTop = value === maxFit && maxFit > 0;
          
          return (
            <div key={role.key} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${role.color}`} />
                  <span className={isTop ? "font-semibold" : ""}>{role.label}</span>
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {role.description}
                  </span>
                </div>
                <span className={`font-medium ${isTop ? "text-primary" : ""}`}>{value}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${role.color} transition-all duration-500 ease-out rounded-full`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
