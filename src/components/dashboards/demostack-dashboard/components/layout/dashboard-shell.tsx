import type { CSSProperties, ReactNode } from 'react';
import { AppSidebar } from './app-sidebar';
import { TopNav } from './top-nav';
import { SidebarProvider } from '@/components/ui/sidebar';

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <SidebarProvider
      defaultOpen
      className="demostack-dashboard h-svh min-h-0 gap-2.5 overflow-hidden"
      style={
        {
          '--sidebar-width': '16rem',
          '--sidebar-width-icon': '4rem',
        } as CSSProperties
      }
    >
      <AppSidebar />
      <main className="relative flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="bg-background relative z-50 shrink-0 md:px-1.5 md:pt-1.5">
          <TopNav />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto md:px-1.5 md:pb-1.5">
          <div className="bg-background flex min-h-full w-full flex-col border-x border-b md:rounded-b-2xl">
            {children}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
