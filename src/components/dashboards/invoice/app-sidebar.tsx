"use client";

import {
  Archive,
  AlertCircle,
  Calendar,
  FileText,
  Inbox,
  Send,
  Star,
  Tag,
  Trash,
  Plus,
  ReceiptText,
} from "lucide-react";

import { cn } from "@/lib/utils";

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
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const data = {
  navMain: [
    {
      title: "General",
      items: [
        {
          title: "Invoice",
          icon: ReceiptText,
          url: "/invoice",
        },
        {
          title: "Inbox",
          icon: Inbox,
          url: "#",
        },
        {
          title: "Starred",
          icon: Star,
          url: "#",
        },
        {
          title: "Sent",
          icon: Send,
          url: "#",
        },
        {
          title: "Drafts",
          icon: FileText,
          url: "#",
        },
        {
          title: "Scheduled",
          icon: Calendar,
          url: "#",
        },
        {
          title: "Archive",
          icon: Archive,
          url: "#",
        },
        {
          title: "Spam",
          icon: AlertCircle,
          url: "#",
        },
        {
          title: "Trash",
          icon: Trash,
          url: "#",
        },
      ],
    },
    {
      title: "Labels",
      items: [
        {
          title: "Marketing",
          icon: Tag,
          url: "#",
        },
        {
          title: "Sales",
          icon: Tag,
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar {...props} className={cn("px-2", props.className)}>
      <SidebarHeader className="border-b px-0">
        <SidebarMenuButton
          className="
            flex items-center justify-center gap-2 px-8 py-3 font-sans text-base font-medium text-white/90 hover:text-white tracking-tight rounded-xl h-12 bg-gradient-to-b from-[#279596] to-[#318A8B] shadow-[inset_0_4px_6px_rgba(255,255,255,0.4),inset_0_-4px_6px_rgba(255,255,255,0.2),inset_0_0_0_1px_rgba(255,255,255,0.1)]
          "
        >
          <Plus className="size-6" strokeWidth={2.5} />
          <span>Compose Email</span>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="pt-2 px-0">
        <SearchForm />
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title} className="px-0 border-b-[1.5px]">
            <SidebarGroupLabel className="text-[15px] -ml-1.5 text-muted-foreground tracking-tight">{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url} className="h-10 text-[15px] text-neutral-600/90 data-[active=true]:bg-neutral-100 rounded-lg data-[active=true]:border-[1.5px] data-[active=true]:border-neutral-200/60 data-[active=true]:text-teal-800 tracking-tight hover:text-teal-800 pl-3">
                      <Link href={item.url}>
                        {item.icon && (
                          <item.icon className="size-5" strokeWidth={2.5} />
                        )}
                        <span className="font-medium ">{item.title}</span>
                      </Link>
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
