"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  HiMiniSquares2X2,
  HiMiniClock,
  HiMiniExclamationTriangle,
} from "react-icons/hi2";

export default function Features5() {
  return (
    <section className="theme-injected bg-background w-full py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="text-muted-foreground bg-muted/50 inline-flex w-fit items-center gap-2 rounded-lg px-3 py-1 text-sm">
            <span className="bg-primary h-2 w-2 rounded-full" />
            Workflow control
          </div>
          <h2 className="text-5xl leading-tight font-semibold tracking-tight">
            Run your system, not just tasks
          </h2>
          <p className="text-muted-foreground max-w-lg">
            Coordinate actions, automate decisions, and keep everything moving
            without constant manual input or switching between tools.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg">
              <div className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-md">
                <HiMiniSquares2X2 className="h-4 w-4" />
              </div>

              <div>
                <div className="text-sm font-medium">Flow visibility</div>
                <div className="text-muted-foreground text-xs">
                  Track how tasks move across stages
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-md">
                <HiMiniClock className="h-4 w-4" />
              </div>

              <div>
                <div className="text-sm font-medium">Execution speed</div>
                <div className="text-muted-foreground text-xs">
                  See how fast actions get completed
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-md">
                <HiMiniExclamationTriangle className="h-4 w-4" />
              </div>

              <div>
                <div className="text-sm font-medium">Smart alerts</div>
                <div className="text-muted-foreground text-xs">
                  Catch issues before they grow
                </div>
              </div>
            </div>
          </div>
          <Button className="rounded-sm px-6 shadow-[inset_0_0px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.08)]">
            Start building
          </Button>
        </div>

        <div className="bg-muted dark:bg-card/50 relative flex justify-center rounded-xl p-8 shadow-[inset_0_0px_6px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_0px_6px_rgba(0,0,0,1)]">
          <div className="relative h-[380px] w-full max-w-md">
            <Card className="bg-background/80 dark:bg-card/80 ring-border/50 border-border/50 absolute top-0 left-0 w-[260px] rounded-lg border p-0 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md">
              <CardContent className="space-y-2 p-4">
                <div className="text-muted-foreground text-xs">
                  Incoming Flow
                </div>

                <div className="text-lg font-semibold">New order detected</div>

                <div className="flex gap-2 text-[10px]">
                  <span className="bg-primary/10 text-primary rounded-md px-2 py-0.5">
                    Live
                  </span>
                  <span className="bg-muted rounded-md px-2 py-0.5">
                    Trigger
                  </span>
                </div>

                <div className="text-muted-foreground space-y-1 text-xs">
                  <div>Source: API / Webhook</div>
                  <div>Region: Global</div>
                  <div>Status: Active</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/90 dark:bg-card/80 ring-border/50 border-border/50 absolute top-28 right-0 z-50 w-[240px] rounded-lg border p-0 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-md">
              <CardContent className="space-y-3 p-4">
                <div className="text-muted-foreground text-xs">
                  Decision Layer
                </div>

                <div className="text-foreground text-sm font-medium">
                  Routing & validation
                </div>

                <div className="flex h-2 w-full gap-1 overflow-hidden rounded-full">
                  <div className="bg-primary w-[50%]" />
                  <div className="w-[30%] bg-blue-400" />
                  <div className="w-[20%] bg-orange-400" />
                </div>

                <div className="text-muted-foreground flex gap-3 text-[10px]">
                  <span>Priority</span>
                  <span>Checks</span>
                  <span>Filters</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/90 dark:bg-card/80 ring-border/50 border-border/50 absolute bottom-8 left-10 w-[260px] rounded-lg border p-0 shadow-[0_12px_40px_rgba(0,0,0,0.16)] backdrop-blur-md">
              <CardContent className="space-y-3 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Execution</span>
                  <span className="text-muted-foreground text-xs">Synced</span>
                </div>

                <div className="text-muted-foreground text-sm">
                  Action completed and pushed across connected services
                </div>

                <div className="flex gap-2 text-[10px]">
                  <span className="rounded-md bg-green-500/10 px-2 py-0.5 text-green-500">
                    Success
                  </span>
                  <span className="rounded-md bg-purple-500/10 px-2 py-0.5 text-purple-500">
                    Distributed
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
