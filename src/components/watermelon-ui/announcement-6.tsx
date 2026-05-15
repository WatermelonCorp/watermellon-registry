"use client";

import { Button } from "@/components/ui/button";

export default function Announcement6() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="bg-muted w-full px-4 py-3 text-sm max-w-7xl">
        <div className="grid w-full items-start gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <p className="text-muted-foreground leading-relaxed tracking-wide">
            This website uses cookies to enhance your experience, analyze
            traffic, and improve our services. Accepting cookies is optional but
            recommended. See our{" "}
            <span className="text-primary cursor-pointer underline underline-offset-4">
              cookie policy
            </span>
            .
          </p>

          <div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
            <Button variant="default" className="rounded-sm">
              Accept all
            </Button>

            <Button
              variant="outline"
              className="text-muted-foreground rounded-sm text-sm"
            >
              Reject all
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
