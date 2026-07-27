"use client"

import * as React from "react"

import { AppSidebar } from "./app-sidebar"
import { OrganizationProvider } from "./organization-provider"
import { TopNav } from "./top-nav"
import { SidebarProvider } from "@/components/ui/sidebar"

type DashboardShellProps = {
  activeSection?: string
  activeSubsection?: string
  children?: React.ReactNode
}

export function DashboardShell({
  activeSection = "dashboard",
  activeSubsection,
  children,
}: DashboardShellProps) {
  return (
    <SidebarProvider
      defaultOpen={true}
      style={
        {
          "--sidebar-width": "18.125rem",
          "--sidebar-width-icon": "5rem",
        } as React.CSSProperties
      }
    >
      <OrganizationProvider>
        <main className="bg-background flex h-screen w-full min-w-0 overflow-hidden">
          <AppSidebar
            activeSection={activeSection}
            activeSubsection={activeSubsection}
          />
          <section className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
            <TopNav />
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-6 pb-20 md:px-6 md:pt-8 md:pb-6">
              {children}
            </div>
          </section>
        </main>
      </OrganizationProvider>
    </SidebarProvider>
  )
}
