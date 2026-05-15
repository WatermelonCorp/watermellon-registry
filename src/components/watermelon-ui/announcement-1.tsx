"use client";

import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { HiRocketLaunch } from "react-icons/hi2";

export default function Announcement1() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="border-primary flex w-full items-center justify-between border-b px-4 py-1.5">
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <Badge variant="default" className="text-xs">
            NEW
          </Badge>

          <p className="text-muted-foreground flex items-center gap-2 truncate">
            New dashboard experience is live with faster load times and smoother
            navigation.
          </p>
          <div className="group flex items-center gap-1">
            <span className="text-primary before:bg-primary relative flex cursor-pointer items-center gap-1 truncate font-medium before:absolute before:-bottom-1 before:left-0 before:h-[1px] before:w-full before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-out group-hover:before:scale-x-100">
              Explore now
            </span>
            <HiRocketLaunch className="text-primary h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-primary hover:text-primary/50 cursor-pointer rounded-lg hover:bg-transparent hover:dark:bg-transparent"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
