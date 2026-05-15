"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HiArrowRight } from "react-icons/hi2";

export default function Announcement5() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative isolate flex w-full items-center justify-center overflow-hidden border-b px-10 py-2 backdrop-blur">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-900" />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/40 via-white/10 to-transparent opacity-40" />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/20 via-transparent to-black/10 opacity-30 blur-2xl" />

        <div className="flex w-full max-w-4xl min-w-0 flex-row items-center gap-2 text-center">
          <p className="truncate text-sm leading-snug font-medium text-zinc-900 sm:text-base dark:text-zinc-100">
            A major update just landed — experience a faster, smoother, and more
            refined interface.
          </p>

          <div className="group flex items-center">
            <Button className="rounded-full bg-black px-4 py-1.5 text-sm text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
              Explore update
              <HiArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 rounded-lg text-zinc-700 hover:bg-transparent hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-transparent dark:hover:text-white"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
