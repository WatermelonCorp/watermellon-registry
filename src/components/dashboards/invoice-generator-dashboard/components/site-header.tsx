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
import { Eye, EyeOff, Save, Send } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const SiteHeader = ({
  currentView,
  onTogglePreview,
  isPreviewHidden
}: {
  currentView?: string;
  onTogglePreview?: () => void;
  isPreviewHidden?: boolean;
}) => {
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
          className="group h-9 rounded-lg text-muted-foreground tracking-tight border-border shadow-none bg-background hidden lg:flex transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm active:scale-95"
          variant="outline"
          onClick={onTogglePreview}
        >
          {isPreviewHidden ? (
            <>
              <Eye className="size-4 transition-transform duration-300 group-hover:scale-110" />
              Show preview
            </>
          ) : (
            <>
              <EyeOff className="size-4 transition-transform duration-300 group-hover:scale-110" />
              Hide preview
            </>
          )}
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="group h-9 rounded-lg text-muted-foreground tracking-tight border-border shadow-none bg-background hidden sm:flex transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm active:scale-95"
              variant="outline"
            >
              <Save className="size-4 transition-transform duration-300 group-hover:scale-110" />
              Save as Draft
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-4">
            <div className="flex flex-col gap-2">
              <h4 className="font-medium leading-none tracking-tight">Draft Saved</h4>
              <p className="text-sm text-muted-foreground">
                Your invoice has been saved as a draft locally.
              </p>
            </div>
          </PopoverContent>
        </Popover>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="group h-9 rounded-lg px-3 sm:px-4 tracking-tight border-[1.5px] bg-neutral-900 text-white/90 font-medium text-sm shadow-[inset_0_4px_6px_rgba(255,255,255,0.4),inset_0_-4px_6px_rgba(255,255,255,0.2),inset_0_0_0_1px_rgba(255,255,255,0.1)] border-none dark:bg-neutral-800 hover:bg-neutral-800 dark:hover:bg-neutral-700 transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-lg">
              <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="hidden sm:inline">Send Invoice</span>
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-[425px]"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle>Send Invoice</DialogTitle>
              <DialogDescription>
                Review the details below before sending this invoice to the client.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Client Email</Label>
                <Input id="email" defaultValue="client@email.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject Line</Label>
                <Input id="subject" defaultValue="Invoice INV-0001 from Your Company" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-neutral-900 border-none dark:bg-neutral-800 hover:bg-neutral-800 dark:hover:bg-neutral-700 text-white">Confirm & Send</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};
