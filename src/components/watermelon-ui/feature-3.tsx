"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Features3() {
  return (
    <section className="theme-injected bg-background w-full py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="text-muted-foreground bg-muted/50 inline-flex w-fit items-center gap-2 rounded-lg px-3 py-1 text-sm">
            <span className="bg-primary h-2 w-2 rounded-full" />
            Smart insights
          </div>

          <h2 className="text-5xl leading-tight font-semibold tracking-tight">
            Turn raw data into clear decisions
          </h2>

          <p className="text-muted-foreground max-w-lg">
            Analyze patterns, track performance, and uncover actionable insights
            to make faster and smarter decisions with confidence.
          </p>

          <div className=" ">
            <div className="space-y-2">
              {[
                "Monitor real-time performance across teams",
                "Compare productivity trends over time",
                "Identify bottlenecks and inefficiencies early",
                "Encourage consistent high-quality output",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="bg-primary/10 mt-1 flex h-6 w-6 items-center justify-center rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)]">
                    <div className="bg-primary h-2.5 w-2.5 rounded-full" />
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Button className="rounded-sm px-6 shadow-[inset_0_0px_2px_0px_rgba(0,0,0,0.1),inset_0_0px_4px_0px_rgba(0,0,0,0.1)]">
            Get started
          </Button>
        </div>

        <div className="bg-muted dark:bg-card/50 relative flex justify-center rounded-xl p-8 shadow-[inset_0_0px_4px_0px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0px_4px_0px_rgba(0,0,0,1)]">
          <div className="relative h-[380px] w-full max-w-md">
            <Card className="bg-background/80 dark:bg-card/80 ring-border/50 absolute top-0 left-0 w-[260px] rounded-lg p-0 shadow-md backdrop-blur-md">
              <CardContent className="space-y-2 p-4">
                <div className="text-muted-foreground text-xs">
                  Performance Overview
                </div>

                <div className="text-2xl font-semibold">
                  72<span className="text-muted-foreground text-sm">%</span>
                </div>

                <div className="flex gap-2 text-[10px]">
                  <span className="rounded-md bg-green-200 px-2 py-0.5 text-green-700">
                    Improving
                  </span>
                  <span className="rounded-md bg-blue-200 px-2 py-0.5 text-blue-700">
                    Stable
                  </span>
                </div>

                <div className="text-muted-foreground space-y-1 text-xs">
                  <div>Tasks Completed: 124</div>
                  <div>Avg Focus Time: 3.2h</div>
                  <div>Efficiency: +12%</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/90 dark:bg-card/80 ring-border/50 absolute top-28 right-0 z-50 w-[240px] rounded-lg p-0 shadow-lg backdrop-blur-md">
              <CardContent className="space-y-3 p-4">
                <div className="text-muted-foreground text-xs">
                  Activity Breakdown
                </div>

                <div className="text-muted-foreground text-sm">
                  <span className="text-foreground font-medium">
                    6h 45m tracked
                  </span>{" "}
                  today
                </div>

                <div className="flex h-2 w-full gap-1">
                  <div className="w-[40%] rounded-full bg-emerald-400" />
                  <div className="w-[35%] rounded-full bg-blue-400" />
                  <div className="w-[25%] rounded-full bg-orange-400" />
                </div>

                <div className="text-muted-foreground flex gap-3 text-[10px]">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Deep Work
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-blue-400" />
                    Collaboration
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-orange-400" />
                    Breaks
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/90 dark:bg-card/80 ring-border/50 absolute bottom-8 left-10 w-[260px] rounded-lg p-0 shadow-lg backdrop-blur-md">
              <CardContent className="space-y-3 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Insights Summary</span>
                  <span className="text-muted-foreground text-xs">Updated</span>
                </div>

                <div className="text-muted-foreground text-sm">
                  <span className="text-foreground font-medium">
                    +18% productivity
                  </span>{" "}
                  this week
                </div>

                <div className="flex gap-2 text-[10px]">
                  <span className="rounded-md bg-green-200 px-2 py-0.5 text-green-700">
                    Growth
                  </span>
                  <span className="rounded-md bg-purple-200 px-2 py-0.5 text-purple-700">
                    Optimized
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
