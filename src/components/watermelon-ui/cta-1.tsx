import React from "react";
import { Button } from "@/components/ui/button";

export interface CTAProps {
  /**
   * The main icon displayed on the left side of the CTA block.
   */
  icon?: React.ReactNode;
  /**
   * The primary heading text.
   */
  title: string;
  /**
   * The secondary description text.
   */
  description?: string;
  /**
   * The text to display inside the action button.
   */
  buttonText: string;
  /**
   * An optional URL for the action button. If provided, the button acts as an anchor tag.
   */
  buttonLink?: string;
  /**
   * An optional icon to display inside the action button.
   */
  buttonIcon?: React.ReactNode;
  /**
   * An optional click handler for the action button, useful if buttonLink is not provided.
   */
  onButtonClick?: () => void;
}

export function Cta1({
  title,
  description,
  buttonText,
  buttonLink,
  buttonIcon,
  onButtonClick,
}: CTAProps) {
  return (
    <section className="w-full max-w-5xl  py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-card-foreground bg-primary/10 border-primary/20 relative isolate flex flex-col items-center justify-between gap-8 overflow-hidden rounded-xl border p-8 shadow-sm md:flex-row md:gap-12 md:px-10 md:py-20">
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

          <div className="flex max-w-sm flex-col items-center gap-6 text-center md:flex-row md:items-center md:gap-8 md:text-left">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">
                {title}
              </h2>
              {description && (
                <p className="text-muted-foreground max-w-[600px] text-base">
                  {description}
                </p>
              )}
            </div>
          </div>

          <div className="mt-2 flex w-full shrink-0 justify-center md:mt-0 md:w-auto">
            {buttonLink ? (
              <Button
                asChild
                size="lg"
                className="h-12 w-full px-8 text-base shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-2px_5px_rgba(0,0,0,0.1),0_8px_20px_rgba(0,0,0,0.1)] md:w-auto dark:border-white/20 dark:bg-white/10 dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.3),0_8px_20px_rgba(0,0,0,0.25)]"
              >
                <a href={buttonLink}>
                  {buttonText}
                  {buttonIcon && (
                    <span className="ml-2 flex items-center">{buttonIcon}</span>
                  )}
                </a>
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={onButtonClick}
                className="h-12 w-full px-8 text-base shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-2px_5px_rgba(0,0,0,0.1),0_8px_20px_rgba(0,0,0,0.1)] md:w-auto dark:border-white/20 dark:bg-white/10 dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.3),0_8px_20px_rgba(0,0,0,0.25)]"
              >
                {buttonText}
                {buttonIcon && (
                  <span className="ml-2 flex items-center">{buttonIcon}</span>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
