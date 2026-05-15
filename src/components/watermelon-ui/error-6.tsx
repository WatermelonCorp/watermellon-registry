"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaArrowRight } from "react-icons/fa6";

interface ErrorHeroProps {
  code?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
}

function BackgroundGrid() {
  return (
    <div className="mask-size-2xl mask-radial-from-muted absolute inset-0 z-0 overflow-hidden rounded-lg mask-radial-to-transparent mask-radial-at-center">
      <div className="grid h-full w-full grid-cols-12 grid-rows-6">
        {Array.from({ length: 72 }).map((_, index) => (
          <div
            key={index}
            className="border-border/50 hover:bg-primary/20 border transition-colors duration-300"
          />
        ))}
      </div>
    </div>
  );
}

function ErrorContent({
  title,
  description,
  buttonLabel,
}: Omit<ErrorHeroProps, "code">) {
  return (
    <div className="pointer-events-none relative z-0 flex max-w-md flex-col items-center justify-center gap-5 text-center sm:items-start sm:text-start">
      <div className="space-y-1">
        <h1 className="text-foreground text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>

        <p className="text-muted-foreground max-w-sm text-sm leading-normal sm:text-base">
          {description}
        </p>
      </div>

      <Button
        className="group pointer-events-auto rounded px-5 shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.7),inset_0_-2px_4px_0_rgba(0,0,0,0.2)] dark:shadow-[inset_0_-2px_4px_0_rgba(0,0,0,0.2),inset_0_2px_4px_0_rgba(255,255,255,0.5)]"
        size="lg"
      >
        <span>{buttonLabel}</span>

        <span className="flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1">
          <FaArrowRight className="size-4 fill-current" />
        </span>
      </Button>
    </div>
  );
}

function ErrorCode({ code }: Pick<ErrorHeroProps, "code">) {
  return (
    <div className="pointer-events-none relative z-10 flex items-center justify-center">
      <span className="text-foreground/70 translate-y-10 text-[7rem] leading-none font-light tracking-tight select-none sm:translate-y-0 sm:text-[9rem] md:text-[11rem] lg:text-[13rem]">
        {code}
      </span>
    </div>
  );
}

export default function SystemErrorPanel({
  code = "404",
  title = "This destination isn’t accessible.",
  description = "The resource you attempted to open may have been moved, archived, or temporarily disconnected from the network.",
  buttonLabel = "Return to Dashboard",
}: ErrorHeroProps) {
  return (
    <div className="p-4 h-full ">
      <Card className="bg-muted mx-auto  relative overflow-hidden rounded-4xl px-4 sm:px-8 lg:px-14  w-full">
        <BackgroundGrid />

        <div className="pointer-events-none relative z-10 grid min-h-[420px] grid-cols-1 gap-10 sm:grid-cols-2 sm:items-center">
          <div className="order-2 sm:order-1">
            <ErrorContent
              title={title}
              description={description}
              buttonLabel={buttonLabel}
            />
          </div>

          <div className="order-1 sm:order-2">
            <ErrorCode code={code} />
          </div>
        </div>
      </Card>
    </div>
  );
}
