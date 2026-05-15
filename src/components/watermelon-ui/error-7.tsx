"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Error7() {
  return (
    <div className="bg-background flex min-h-screen  w-full flex-col overflow-hidden border font-sans lg:flex-row">
      <div className="bg-muted relative h-screen w-full p-2 lg:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
          alt="Error illustration"
          className="h-full w-full rounded-lg object-cover shadow-sm"
        />
      </div>
      <div className="relative flex w-full flex-col justify-center px-8 py-16 lg:w-1/2 lg:p-20 xl:p-32">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: `
          repeating-linear-gradient(45deg, var(--primary) 0, var(--primary) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, var(--primary) 0, var(--primary) 1px, transparent 1px, transparent 20px)
        `,
            backgroundSize: "40px 40px",
          }}
        />
        <h1 className="text-foreground mb-2 flex items-center text-5xl font-semibold tracking-tight lg:text-6xl xl:text-7xl">
          Page not Found
        </h1>
        <div className="text-md text-muted-foreground mb-4 space-y-1 font-medium md:text-lg">
          <p>Oops... this page seems to have wandered off.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            asChild
            className="rounded shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.7),inset_0_-2px_4px_0_rgba(0,0,0,0.2)] sm:w-auto dark:shadow-[inset_0_-2px_4px_0_rgba(0,0,0,0.2),inset_0_2px_4px_0_rgba(255,255,255,0.5)]"
          >
            <a href="/">Back home</a>
          </Button>
          <Button
            variant="secondary"
            className="rounded shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.7),inset_0_-2px_4px_0_rgba(0,0,0,0.2)] sm:w-auto dark:shadow-[inset_0_-2px_4px_0_rgba(0,0,0,0.2),inset_0_2px_4px_0_rgba(255,255,255,0.2)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
}
