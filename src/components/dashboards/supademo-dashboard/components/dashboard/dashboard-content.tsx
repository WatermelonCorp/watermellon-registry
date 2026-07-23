"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, ChevronRight, X } from "lucide-react";
import { BgFolderVector } from "../../assets/icons";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  dashboardActions,
  dashboardResources,
  dashboardTips,
  inspiredDemos,
} from "../../data";

export function DashboardContent() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-9 px-4 py-6 sm:p-7">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {dashboardActions.map((action) => (
          <DashboardActionCard key={action.title} action={action} />
        ))}
      </section>

      <DashboardTips />

      <div className="flex flex-col gap-8 lg:flex-row">
        <ResourcesSection />
        <InspirationList />
      </div>
    </div>
  );
}

function DashboardActionCard({
  action,
}: {
  action: (typeof dashboardActions)[number];
}) {
  const Icon = action.icon;

  return (
    <Card className="gap-8 rounded-2xl py-4 shadow-border ring-0">
      <CardContent className="flex flex-col items-start gap-8">
        <div className="relative flex size-11 items-center justify-center overflow-hidden rounded-lg">
          <img
            src={action.image}
            alt=""
            width={44}
            height={44}
            className="absolute inset-0 size-full object-cover"
          />
          <Icon className="text-primary-foreground relative z-10 size-6" />
        </div>
        <div className="flex w-full flex-col gap-1">
          <p className="font-medium">{action.title}</p>
          <p className="text-muted-foreground text-sm">{action.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardTips() {
  const [visible, setVisible] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!visible) {
    return null;
  }

  function scrollRight() {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  }

  return (
    <section className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Supademo Tips</h2>
          <p className="text-muted-foreground">
            Drive successful outcomes across multiple departments and
            interactive demos
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setVisible(false)}
          className="bg-card rounded-full border-0 shadow-border"
          aria-label="Close tips"
        >
          Close
          <X />
        </Button>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-2 scroll-smooth"
        >
          {dashboardTips.map((tip) => (
            <article
              key={tip.title}
              className="flex w-64 shrink-0 flex-col items-start gap-4"
            >
              <div className="relative h-44 w-64 overflow-hidden rounded-2xl">
                <img
                  src={tip.image}
                  alt=""
                  width={256}
                  height={176}
                  className="size-full object-cover"
                />
              </div>
              <div className="flex w-full flex-col gap-1">
                <h3 className="font-medium">{tip.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {tip.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="from-background via-background/70 absolute top-0 right-0 h-64 w-36 bg-gradient-to-l to-transparent" />
        <Button
          variant="outline"
          size="icon-lg"
          onClick={scrollRight}
          className="bg-card absolute top-28 right-0 z-10 rounded-full border-0 shadow-border"
          aria-label="Show more tips"
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>
    </section>
  );
}

function ResourcesSection() {
  return (
    <section className="flex flex-1 flex-col items-start gap-8 lg:max-w-lg">
      <h2 className="text-lg font-semibold">Resources</h2>
      <div className="grid w-full grid-cols-2 gap-4">
        {dashboardResources.map((resource) => {
          const Icon = resource.icon;

          return (
            <article
              key={resource.label}
              className="flex flex-col items-start gap-3"
            >
              <div className="bg-muted flex h-32 w-full items-center justify-center overflow-hidden rounded-xl shadow-border">
                <div className="relative flex size-20 items-center justify-center">
                  <BgFolderVector className="absolute inset-0 size-full" />
                  <Icon className="relative z-10 mt-4 size-6" />
                </div>
              </div>
              <h3 className="font-medium">{resource.label}</h3>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function InspirationList() {
  return (
    <section className="flex flex-1 flex-col items-start gap-8">
      <h2 className="text-lg font-semibold">Get Inspired</h2>
      <div className="flex w-full flex-col gap-2">
        {inspiredDemos.map((item) => (
          <article
            key={item.title}
            className="bg-muted flex h-18 w-full items-center justify-between rounded-2xl py-4 pr-8 pl-6 shadow-border"
          >
            <div className="flex items-center gap-4">
              <div className="relative size-10 shrink-0 overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  width={40}
                  height={40}
                  className="size-full object-cover"
                />
              </div>
              <h3 className="font-medium">{item.title}</h3>
            </div>
            <ArrowUpRight className="text-muted-foreground size-6" />
          </article>
        ))}
      </div>
    </section>
  );
}
