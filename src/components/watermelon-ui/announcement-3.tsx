"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { HiArrowRight } from "react-icons/hi2";

export default function Announcement3() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="border-primary bg-primary/90 relative flex w-full items-center justify-center border-t border-b px-4 py-1.5 font-mono tracking-tight">
        <div className="flex-col items-center space-y-1 text-sm sm:flex sm:flex-row sm:gap-3 sm:space-y-0">
          <div className="text-primary-foreground text-md flex items-center gap-3">
            Hackathon registrations are now open — build fast, ship faster, and
            win big
          </div>
          <div className="group flex items-center gap-3">
            <div className="hidden size-1 rounded-full bg-white sm:block" />

            <Button className="rounded-none bg-white text-black hover:bg-white/95 dark:bg-white dark:hover:bg-white/95">
              Join now
              <HiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:text-primary-foreground/70 absolute right-2 rounded-lg hover:bg-transparent dark:hover:bg-transparent"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
