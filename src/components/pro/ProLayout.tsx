import { SidebarProvider } from "@/components/ui/sidebar";
import { ProSidebar } from "./ProSidebar";

interface ProLayoutProps {
  children: React.ReactNode;
}

export function ProLayout({ children }: ProLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#0A0F1C]">
        <ProSidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
