import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { DemoSidebar } from "./DemoSidebar";

interface DemoLayoutProps {
  children: React.ReactNode;
}

export function DemoLayout({ children }: DemoLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full pt-12"> {/* pt-12 for demo banner */}
        <DemoSidebar />
        <SidebarInset className="flex flex-col w-full">
          <header className="sticky top-12 z-30 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1" />
          </header>
          <main className="flex-1 overflow-auto">
            <div className="container max-w-7xl mx-auto px-4 py-6">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
