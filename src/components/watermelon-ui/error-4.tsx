"use client";

import type { FC } from "react";
import { Button } from "@/components/ui/button";

interface NotFoundContentProps {
  heading: string;
  description: string;
}

const NotFoundContent: FC<NotFoundContentProps> = ({
  heading,
  description,
}) => (
  <div className="space-y-2 text-center">
    <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
      {heading}
    </h1>
    <p className="text-muted-foreground mx-auto max-w-xs text-sm leading-relaxed sm:text-base">
      {description}
    </p>
  </div>
);

interface NotFoundActionsProps {
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary: () => void;
  onSecondary: () => void;
}

const NotFoundActions: FC<NotFoundActionsProps> = ({
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
}) => (
  <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
    <Button
      onClick={onPrimary}
      className="w-full rounded shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.7),inset_0_-2px_4px_0_rgba(0,0,0,0.2)] sm:w-auto dark:shadow-[inset_0_-2px_4px_0_rgba(0,0,0,0.2),inset_0_2px_4px_0_rgba(255,255,255,0.5)]"
    >
      {primaryLabel}
    </Button>
    <Button
      variant="secondary"
      onClick={onSecondary}
      className="w-full rounded shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.7),inset_0_-2px_4px_0_rgba(0,0,0,0.2)] sm:w-auto dark:shadow-[inset_0_-2px_4px_0_rgba(0,0,0,0.2),inset_0_2px_4px_0_rgba(255,255,255,0.2)]"
    >
      {secondaryLabel}
    </Button>
  </div>
);

interface NotFoundPageProps {
  heading?: string;
  description?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  errorCode?: string;
  errorLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

const NotFoundPage: FC<NotFoundPageProps> = ({
  heading = "Route not found",
  description = "The destination you're looking for has been moved, renamed, or no longer exists. It may have been relocated during a recent update.",
  primaryActionLabel = "Return to dashboard",
  secondaryActionLabel = "Report this issue",
  onPrimaryAction = () => window.history.back(),
  onSecondaryAction = () => {},
}) => (
  <div className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none">
      <svg
        viewBox="0 0 800 400"
        className="text-muted-foreground w-full max-w-2xl -translate-y-6 opacity-15 dark:opacity-20"
      >
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="transparent"
          stroke="currentColor"
          strokeOpacity={1}
          strokeWidth={2}
          strokeDasharray="12 8"
          className="font-bold tracking-wider"
          style={{
            fontFamily: "Helvetica",
            fontSize: "24rem",
            fontWeight: "bold",
          }}
        >
          404
        </text>
      </svg>
    </div>

    <div className="relative z-10 flex max-w-md flex-col items-center gap-8">
      <NotFoundContent heading={heading} description={description} />

      <NotFoundActions
        primaryLabel={primaryActionLabel}
        secondaryLabel={secondaryActionLabel}
        onPrimary={onPrimaryAction}
        onSecondary={onSecondaryAction}
      />
    </div>
  </div>
);

export { NotFoundPage };
