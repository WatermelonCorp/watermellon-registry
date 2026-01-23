"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "./ui/breadcrumb";
// import { Separator } from "./ui/separator";
// import { SidebarTrigger } from "./ui/sidebar";
import { Badge } from "./ui/badge";
import { Bell, Search } from "lucide-react";

export const SiteHeader = () => {
  // Mock pathname for demo
  const pathname = "/dashboard";

  const getBreadcrumbLabel = () => {
    if (pathname.includes("company")) {
      return "Companies";
    } else if (pathname.includes("dealsboard")) {
      return "Deals Board";
    }
    return "Dashboard";
  };

  return (
    <header className="flex h-16 justify-between pr-5 border-l">
      <div className="flex items-center gap-2 px-4">
        {/* <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        /> */}
        <div className="flex items-center gap-2">
          <Breadcrumb>
            <BreadcrumbItem className="flex items-center gap-1">
              <BreadcrumbLink href="#">{getBreadcrumbLabel()}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Badge variant="secondary" className=" text-xs">
            <div className="size-1.5 rounded-full bg-green-600" />
            Active
          </Badge>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="rounded-full size-7 flex justify-center items-center border-y border-neutral-600 bg-neutral-800 text-white">
          <Search className="size-4" />
        </div>
        <div className="rounded-full size-7 flex justify-center items-center border-y border-neutral-600 bg-neutral-800 text-white">
          <Bell className="size-4" />
        </div>
        <div className="rounded-full h-fit flex justify-center items-center border-y border-neutral-600 bg-neutral-800 text-white p-1 pr-2.5 gap-2">
          <img
            src={
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="user"
            height={20}
            width={20}
            className="rounded-full"
          />
          <span className="text-xs">John doe </span>
        </div>
      </div>
    </header>
  );
};
