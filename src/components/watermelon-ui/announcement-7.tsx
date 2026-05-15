"use client";

import { Button } from "@/components/ui/button";
import { HiSparkles, HiXMark } from "react-icons/hi2";

export default function Announcement7() {
  return (
    <div className="w-full">
      <div className="bg-muted px-4 py-3 text-sm shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <HiSparkles className="text-primary mt-1 size-5 shrink-0" />

            <div className="space-y-1">
              <p className="text-foreground font-medium tracking-tight">
                New Feature Released: Smart Workspaces
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Organize your projects faster with our new smart workspace
                system. Automatically group tasks, notes, and assets based on
                your workflow.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
            <Button
              variant="default"
              className="flex items-center gap-2 rounded-lg"
            >
              <HiSparkles className="size-4" />
              Try it now
            </Button>

            <Button
              variant="ghost"
              className="text-muted-foreground flex items-center gap-2 rounded-lg"
            >
              <HiXMark className="size-4" />
              Dismiss
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
