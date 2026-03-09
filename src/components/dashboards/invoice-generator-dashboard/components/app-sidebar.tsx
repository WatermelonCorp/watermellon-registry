"use client";
import * as React from "react";
import {
  Plus,
  Send,
  X
} from "lucide-react";

import { SearchForm } from "./search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import { sidebarData } from "../data";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onNavigate?: (view: string) => void;
  currentView?: string;
}

export function AppSidebar({ onNavigate, currentView, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props} className="px-4 md:px-2">
      <SidebarHeader className="border-b px-2 md:px-0 border-border">
        <Dialog>
          <DialogTrigger asChild>
            <SidebarMenuButton
              className="
                flex items-center justify-center gap-2 px-8 py-3 font-sans text-base font-medium text-white/90 hover:text-white tracking-tight rounded-xl h-12 bg-linear-to-b from-[#279596] to-[#318A8B] shadow-[inset_0_4px_6px_rgba(255,255,255,0.4),inset_0_-4px_6px_rgba(255,255,255,0.2),inset_0_0_0_1px_rgba(255,255,255,0.1)] transition-colors duration-300 ease-in-out cursor-pointer active:text-white
              "
            >
              <Plus className="size-6" strokeWidth={2.5} />
              <span>Compose Email</span>
            </SidebarMenuButton>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px] p-0 overflow-hidden bg-background border-border shadow-xl">
            <DialogHeader className="px-6 py-4 border-b border-border bg-muted/30">
              <DialogTitle className="text-lg font-semibold tracking-tight text-foreground">New Message</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col">
              <div className="flex items-center border-b border-border px-4 py-2 hover:bg-muted/10 transition-colors">
                <span className="text-sm font-medium text-muted-foreground w-12 shrink-0">To:</span>
                <Input 
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none h-8 px-2 text-sm text-foreground placeholder:text-muted-foreground/50 rounded-none bg-transparent" 
                  placeholder="recipient@example.com"
                  autoFocus
                />
              </div>
              <div className="flex items-center border-b border-border px-4 py-2 hover:bg-muted/10 transition-colors">
                <span className="text-sm font-medium text-muted-foreground w-12 shrink-0">Subject:</span>
                <Input 
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none h-8 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 rounded-none bg-transparent" 
                  placeholder="Enter subject" 
                />
              </div>
              <div className="p-4">
                <Textarea 
                  className="min-h-[250px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none resize-none px-2 text-sm text-foreground placeholder:text-muted-foreground/50 rounded-none bg-transparent" 
                  placeholder="Write your message here..."
                />
              </div>
              <div className="flex items-center justify-between border-t border-border px-6 py-4 bg-muted/10">
                <Button variant="ghost" className="h-9 px-4 text-muted-foreground hover:text-foreground">
                  <X className="size-4 " />
                  Discard
                </Button>
                <div className="flex gap-2">
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-9 px-4">Save Draft</Button>
                  </DialogTrigger>
                  <Button className="h-9 px-5 bg-[#279596] hover:bg-[#207e7f] text-white tracking-tight font-medium shadow-sm transition-colors">
                    <Send className="size-4" />
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </SidebarHeader>
      <SidebarContent className="pt-2 px-2 md:px-0">
        <SearchForm />
        {sidebarData.navMain.map((item) => (
          <SidebarGroup key={item.title} className="px-2 md:px-0 border-b-[1.5px] border-border">
            <SidebarGroupLabel className="text-[15px] -ml-1.5 text-muted-foreground tracking-tight">{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={currentView === subItem.title}
                      disabled={subItem.isDisabled}
                      className="h-10 text-[15px] text-muted-foreground/90 data-[active=true]:bg-accent data-[active=true]:text-teal-800 dark:data-[active=true]:text-teal-400 rounded-lg data-[active=true]:border-[1.5px] data-[active=true]:border-border tracking-tight hover:text-teal-800 dark:hover:text-teal-400 disabled:opacity-50 disabled:cursor-not-allowed pl-3"
                    >
                      <a
                        href={subItem.url}
                        onClick={(e) => {
                          if (subItem.isDisabled) {
                            e.preventDefault();
                            return;
                          }
                          if (onNavigate) {
                            e.preventDefault();
                            onNavigate(subItem.title);
                            return;
                          }
                        }}
                      >
                        {subItem.icon && (
                          <subItem.icon className="size-5" strokeWidth={2.5} />
                        )}
                        <span className="font-medium ">{subItem.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
