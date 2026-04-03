"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import {
  Layers,
  Bell,
  LayoutGrid,
  Rocket,
  HelpCircle,
  Search,
  Plus,
  Minus,
  Check,
  Zap,
} from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [proOpen, setProOpen] = useState(false)
  useEffect(() => { requestAnimationFrame(() => setMounted(true)) }, [])

  const darkSidebarStyle = mounted && resolvedTheme === "dark"
    ? ({
      "--sidebar": "hsl(0 0% 5%)",
      "--sidebar-accent": "hsl(0 0% 15%)",
    } as React.CSSProperties)
    : undefined

  return (
    <>
      <Sidebar
        className="font-mono text-neutral-400 border-r border-neutral-200 dark:border-neutral-800/50"
        style={darkSidebarStyle}
        {...props}
      >
        <SidebarHeader className="p-4 gap-4">
          {/* Logo */}
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" className="hover:bg-transparent! px-0">
                <div className="flex size-8 items-center justify-center rounded-md bg-[#FF6000] text-white shrink-0 shadow-[0_0_15px_rgba(255,96,0,0.3)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h6v8h-6z" /><path d="M14 4h6v16h-6z" /><path d="M4 16h6v4h-6z" /></svg>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-[15px] tracking-wide truncate">OceanLabs</span>
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">Enterprise AI</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          {/* Search */}
          <div className="relative group-data-[collapsible=icon]:hidden">
            <SidebarInput
              placeholder="Search"
              className="h-9 bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700/40 text-neutral-700 dark:text-neutral-300 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 pl-9 pr-12 text-[13px] rounded-md transition-colors focus-visible:ring-0 focus-visible:border-neutral-400 dark:focus-visible:border-neutral-600 outline-none shadow-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400 dark:text-neutral-600" strokeWidth={2} />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-1 rounded bg-neutral-200 dark:bg-neutral-700 px-1.5 py-0.5 font-mono text-[10px] font-medium text-neutral-500 dark:text-neutral-400 shrink-0 uppercase tracking-tighter border-none">
              <span>⌘</span>K
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2">
          {/* Main Nav */}
          <SidebarGroup className="mt-2">
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton isActive className="group/menu-button h-9 gap-x-3 text-neutral-500 dark:text-neutral-400 font-medium text-[13px] hover:bg-neutral-100 dark:hover:bg-neutral-900! hover:text-neutral-900 dark:hover:text-white! dark:data-[active=true]:text-white! dark:data-[active=true]:bg-neutral-900! transition-colors duration-150">
                  <Layers className="size-5 opacity-70 group-hover/menu-button:opacity-100 group-data-[active=true]/menu-button:opacity-100 transition-opacity" strokeWidth={2} />
                  <span>Queue</span>
                  <span className="flex h-[15px] min-w-[13px] items-center justify-center rounded bg-[#FF6000] px-1.5 text-[8px] font-bold text-white leading-none border-none">
                    12
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="group/menu-button h-9 gap-x-3 text-neutral-500 dark:text-neutral-400 text-[13px] hover:bg-neutral-100 dark:hover:bg-neutral-900! hover:text-neutral-900 dark:hover:text-white! transition-colors duration-150">
                  <Bell className="size-5 opacity-70 group-hover/menu-button:opacity-100 group-data-[active=true]/menu-button:opacity-100 transition-opacity" strokeWidth={2} />
                  <span>Pings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="group/menu-button h-9 gap-x-3 text-neutral-500 dark:text-neutral-400 text-[13px] hover:bg-neutral-100 dark:hover:bg-neutral-900! hover:text-neutral-900 dark:hover:text-white! transition-colors duration-150">
                  <LayoutGrid className="size-5 opacity-70 group-hover/menu-button:opacity-100 group-data-[active=true]/menu-button:opacity-100 transition-opacity" strokeWidth={2} />
                  <span>AI Assistant</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          {/* Workspace */}
          <SidebarGroup className="mt-8">
            <SidebarGroupLabel className="px-2 mb-4 text-[10px] font-semibold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
              Workspace
            </SidebarGroupLabel>

            <Collapsible asChild defaultOpen className="group/collapsible">
              <SidebarMenuItem className="list-none">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="flex items-center gap-2.5 px-2 py-1.5 text-neutral-500 dark:text-neutral-400 mb-2 hover:bg-neutral-100 dark:hover:bg-neutral-900! hover:text-neutral-900 dark:hover:text-white! transition-colors duration-150 cursor-pointer group">
                    <div className="relative size-4 shrink-0 flex items-center justify-center">
                      <Plus className="size-4 opacity-70 group-hover:opacity-100 transition-opacity absolute group-data-[state=open]/collapsible:hidden" strokeWidth={2} />
                      <Minus className="size-4 opacity-70 group-hover:opacity-100 transition-opacity absolute hidden group-data-[state=open]/collapsible:block" strokeWidth={2} />
                    </div>
                    <span className="font-medium text-[13px] transition-colors">OceanLabs</span>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="relative ml-[0.85rem] pl-4 space-y-1.5 py-1 border-l border-neutral-200 dark:border-neutral-800">
                    <div className="absolute -left-[2px] -top-[3px] size-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="group/menu-button h-8 gap-x-4 text-neutral-600 dark:text-neutral-400 text-[13px] dark:hover:bg-neutral-900! dark:hover:text-white! hover:bg-neutral-100 hover:text-neutral-900 transition-colors duration-150 cursor-pointer">
                        <span className="size-3 rounded-full bg-[#007AFF] dark:shadow-[0_0_10px_rgba(0,122,255,0.4)] shrink-0"></span>
                        <span>PromptLab</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="group/menu-button h-8 gap-x-4 text-neutral-600 dark:text-neutral-400 text-[13px] hover:bg-neutral-100 dark:hover:bg-neutral-900! hover:text-neutral-900 dark:hover:text-white! transition-colors duration-150 cursor-pointer">
                        <span className="size-3 rounded-full bg-[#EAFF00] dark:shadow-[0_0_10px_rgba(234,255,0,0.4)] shrink-0"></span>
                        <span>EvalSuite</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="group/menu-button h-8 gap-x-4 text-neutral-600 dark:text-neutral-400 text-[13px] hover:bg-neutral-100 dark:hover:bg-neutral-900! hover:text-neutral-900 dark:hover:text-white! transition-colors duration-150 cursor-pointer">
                        <span className="size-3 rounded-full bg-[#FF6000] dark:shadow-[0_0_10px_rgba(255,96,0,0.4)] shrink-0"></span>
                        <span>VectorVault</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="group/menu-button h-8 gap-x-4 text-neutral-600 dark:text-neutral-400 text-[13px] hover:bg-neutral-100 dark:hover:bg-neutral-900! hover:text-neutral-900 dark:hover:text-white! transition-colors duration-150 cursor-pointer">
                        <span className="size-3 rounded-full bg-[#00F5D4] dark:shadow-[0_0_10px_rgba(0,245,212,0.4)] shrink-0"></span>
                        <span>DeployBay</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4 pb-6 space-y-6">
          <Card className="rounded-xl border border-neutral-200 dark:border-neutral-800/60 bg-white dark:bg-neutral-900/40 p-4 shadow-sm relative overflow-hidden gap-0 hidden md:flex">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#EAFF00]/10 blur-2xl rounded-full" />
            <CardHeader className="p-0 mb-3 relative">
              <Rocket className="size-[18px] text-lime-500 dark:text-[#EAFF00]" strokeWidth={2} />
            </CardHeader>
            <CardContent className="p-0 relative">
              <CardTitle className="font-semibold text-neutral-800 dark:text-neutral-100 mb-1.5 text-[13px] leading-none">You&apos;re on Starter access</CardTitle>
              <CardDescription className="text-neutral-500! dark:text-neutral-400! text-[11px] leading-relaxed mb-4">
                Upgrade to unlock more collaborators + larger runs.
              </CardDescription>
              <button onClick={() => setProOpen(true)} className="relative rounded-md border border-neutral-200 dark:border-neutral-700/80 bg-neutral-100 dark:bg-neutral-800/60 px-3.5 py-1.5 text-[11px] font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors duration-150 hover:border-neutral-300 dark:hover:border-neutral-600 shadow-sm outline-none">
                Unlock Pro
              </button>
            </CardContent>
          </Card>

          <SidebarMenu className="space-y-1">
            <SidebarMenuItem>
              <SidebarMenuButton className="group/menu-button h-9 gap-x-3 text-neutral-500 dark:text-neutral-400 text-[13px] hover:bg-neutral-100 dark:hover:bg-neutral-900! hover:text-neutral-900 dark:hover:text-white! transition-colors duration-150">
                <HelpCircle className="size-[18px] opacity-70 group-hover/menu-button:opacity-100 transition-opacity" strokeWidth={2} />
                <span>Support</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="mt-1">
              <SidebarMenuButton className="group/menu-button h-10 gap-x-3 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900/80! text-[13px] hover:text-neutral-900 dark:hover:text-white! transition-colors duration-150" size="lg">
                <div className="size-6 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 ring-1 ring-neutral-300/50 dark:ring-neutral-700/50 shrink-0">
                  <img src="https://i.pravatar.cc/150?u=stephen" alt="Stephen" className="h-full w-full object-cover" />
                </div>
                <span className="font-medium text-neutral-700 dark:text-neutral-200 group-hover/menu-button:text-neutral-900 dark:group-hover/menu-button:text-white transition-colors">Henry</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Pro Upgrade Dialog */}
      <Dialog open={proOpen} onOpenChange={setProOpen}>
        <DialogContent className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 font-mono max-w-sm rounded-2xl shadow-2xl p-0 overflow-hidden">
          {/* Header gradient banner */}
          <div className="relative bg-neutral-950 dark:bg-neutral-900 px-6 pt-8 pb-6 overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#EAFF00]/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-lime-500/10 blur-2xl rounded-full" />
            <Zap className="size-6 text-[#EAFF00] mb-3 relative" strokeWidth={2.5} />
            <DialogHeader className="relative">
              <DialogTitle className="text-white text-base font-bold tracking-tight">Upgrade to Pro</DialogTitle>
              <DialogDescription className="text-neutral-400 text-xs mt-1">
                Unlock the full OceanLabs experience for your team.
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Plan comparison */}
          <div className="px-6 py-5 space-y-3">
            {[
              { feature: "Collaborators", starter: "3 seats", pro: "Unlimited" },
              { feature: "Run history", starter: "7 days", pro: "90 days" },
              { feature: "AI actions / mo", starter: "500", pro: "Unlimited" },
              { feature: "Priority support", starter: "—", pro: "24 / 7" },
              { feature: "Custom domains", starter: "—", pro: "Included" },
            ].map(row => (
              <div key={row.feature} className="grid grid-cols-3 text-xs items-center">
                <span className="text-neutral-500 dark:text-neutral-400">{row.feature}</span>
                <span className="text-neutral-400 dark:text-neutral-600 text-center">{row.starter}</span>
                <span className="text-neutral-800 dark:text-neutral-100 font-semibold text-center flex items-center justify-center gap-1">
                  {row.pro !== "—" && <Check className="size-3 text-lime-500" />}{row.pro}
                </span>
              </div>
            ))}
          </div>

          <Separator className="bg-neutral-100 dark:bg-neutral-800 mx-6" />

          {/* Pricing + CTA */}
          <div className="px-6 py-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xl font-bold text-neutral-900 dark:text-white">$29<span className="text-xs font-normal text-neutral-400 dark:text-neutral-500"> / mo</span></p>
              <p className="text-[10px] text-neutral-400 dark:text-neutral-600 mt-0.5">per workspace · billed monthly</p>
            </div>
            <Button
              onClick={() => setProOpen(false)}
              className="bg-[#EAFF00] hover:bg-[#d4e800] text-neutral-950 font-bold text-xs px-5 h-9 rounded-lg shadow-lg transition-colors duration-150">
              Start Free Trial
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
