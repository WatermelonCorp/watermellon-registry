"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { HiArrowRight } from "react-icons/hi2";

export default function Announcement4() {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="border-primary/20 bg-primary/10 shadow-sxs relative isolate flex w-full items-center justify-center overflow-hidden rounded-sm border px-4 py-1.5 tracking-tight">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
            }}
            className="from-primary to-primary/60 aspect-[577/310] w-[36rem] bg-gradient-to-r opacity-30"
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
            }}
            className="from-primary to-primary/60 aspect-[577/310] w-[36rem] bg-gradient-to-r opacity-30"
          />
        </div>

        <div className="relative z-10 flex-col items-center space-y-2 text-sm sm:flex sm:flex-row sm:gap-3 sm:space-y-0">
          <div className="text-foreground text-md flex items-center gap-3 font-medium">
            A better version is here — faster, cleaner, and built to scale with
            you.
          </div>

          <div className="group flex items-center gap-3">
            <div className="bg-primary hidden size-1 rounded-full sm:block" />

            <Button className="text-foreground tetx-shadow-sm rounded-sm border border-white/20 bg-white/30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-2px_5px_rgba(0,0,0,0.1),0_8px_20px_rgba(0,0,0,0.1)] dark:border-white/20 dark:bg-white/10 dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.3),0_8px_20px_rgba(0,0,0,0.25)]">
              See what’s new
              <HiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-foreground hover:text-foreground/70 absolute right-2 rounded-lg hover:bg-transparent dark:hover:bg-transparent"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
