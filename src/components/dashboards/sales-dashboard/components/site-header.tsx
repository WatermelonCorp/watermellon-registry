"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "./ui/breadcrumb";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { Badge } from "./ui/badge";
import { Bell, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

export const SiteHeader = ({ currentView }: { currentView?: string }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const getBreadcrumbLabel = () => {
    if (currentView) {
      return currentView;
    }
    if (pathname.includes("company")) {
      return "Companies";
    } else if (pathname.includes("dealsboard")) {
      return "Deals Board";
    }
    return "Dashboard";
  };

  return (
    <header className="flex h-16 justify-between pr-5  border-neutral-200 dark:border-none">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 my-auto data-[orientation=vertical]:h-4"
        />
        <div className="flex items-center gap-2">
          <Breadcrumb>
            <BreadcrumbItem className="flex items-center gap-1">
              <BreadcrumbLink href="#">{getBreadcrumbLabel()}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Badge variant="secondary" className="text-xs">
            <div className="size-1.5 rounded-full bg-green-600" />
            Active
          </Badge>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="rounded-full size-7 flex justify-center items-center border-y border-neutral-200 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer">
          <Search className="size-4" />
        </div>
        <div className="rounded-full size-7 flex justify-center items-center border-y border-neutral-200 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer">
          <Bell className="size-4" />
        </div>
        <div className="rounded-full h-fit flex justify-center items-center border-y border-neutral-200 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white p-1 md:pr-2.5 gap-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer">
          <img
            src={
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="user"
            height={20}
            width={20}
            className="rounded-full"
          />
          <span className="text-xs hidden sm:inline">John doe</span>
        </div>
      </div>
    </header>
  );
};
