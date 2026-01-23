"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Eye, Save, Send } from "lucide-react";
import { usePathname } from "next/navigation";

export const SiteHeader = () => {
  const pathname = usePathname();
  const getBreadcrumbLabel = () => {
    if (pathname.includes("invoice")) {
      return "Invoice";
    } else if (pathname.includes("inbox")) {
      return "Inbox";
    }
    return "Dashboard";
  };
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#" className="text-xl text-neutral-700 font-medium">{getBreadcrumbLabel()}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full flex gap-2 justify-end py-5">
        <Button
          className="h-10.5 rounded-lg text-neutral-600 tracking-tight  border-[1.5px] shadow-none bg-neutral-50"
          variant="outline"
        >
          <Eye className="size-4" />
          Hide preview
        </Button>
        <Button
          className="h-10.5 rounded-lg  text-neutral-600 tracking-tight border-[1.5px] shadow-none bg-neutral-50"
          variant="outline"
        >
          <Save className="size-4" />
          Save as Draft
        </Button>
        <Button className="h-10.5 rounded-lg  tracking-tight border-[1.5px] bg-neutral-900 text-white/90 font-medium text-sm shadow-[inset_0_4px_6px_rgba(255,255,255,0.4),inset_0_-4px_6px_rgba(255,255,255,0.2),inset_0_0_0_1px_rgba(255,255,255,0.1)] border-none">
          <Send className="size-4" />
          Send Invoice
        </Button>
      </div>
    </header>
  );
};
