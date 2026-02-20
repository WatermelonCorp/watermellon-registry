"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "./ui/breadcrumb";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { Eye, Save, Send } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export const SiteHeader = ({ currentView }: { currentView?: string }) => {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink
                href="#"
                className="text-xl text-foreground font-semibold"
              >
                {currentView}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-2 py-5">
        <ModeToggle />
        <Button
          className="h-9 rounded-lg text-muted-foreground tracking-tight border-border shadow-none bg-background hidden sm:flex"
          variant="outline"
        >
          <Eye className="size-4" />
          Hide preview
        </Button>
        <Button
          className="h-9 rounded-lg text-muted-foreground tracking-tight border-border shadow-none bg-background hidden sm:flex"
          variant="outline"
        >
          <Save className="size-4" />
          Save as Draft
        </Button>
        <Button className="h-9 rounded-lg px-3 sm:px-4 tracking-tight border-[1.5px] bg-neutral-900 text-white/90 font-medium text-sm shadow-[inset_0_4px_6px_rgba(255,255,255,0.4),inset_0_-4px_6px_rgba(255,255,255,0.2),inset_0_0_0_1px_rgba(255,255,255,0.1)] border-none dark:bg-neutral-800">
          <Send className="size-4" />
          <span className="hidden sm:inline">Send Invoice</span>
        </Button>
      </div>
    </header>
    );
};
