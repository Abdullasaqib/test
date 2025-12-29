import { EnterpriseAdminSidebar } from "./EnterpriseAdminSidebar";

interface EnterpriseAdminLayoutProps {
  children: React.ReactNode;
}

export function EnterpriseAdminLayout({ children }: EnterpriseAdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <EnterpriseAdminSidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
