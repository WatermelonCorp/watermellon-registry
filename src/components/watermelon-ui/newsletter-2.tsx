import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface Newsletter2Props {
  heading?: string;
  description?: string;
  label?: string;
  placeholder?: string;
  buttonText?: string;
  disclaimer?: React.ReactNode;
}

const Newsletter2: React.FC<Newsletter2Props> = ({
  heading = "Subscribe to our newsletter",
  description = "Join our newsletter to get exclusive insights, timely updates, and expert tips that help you take control of your finances.",
  label = "Stay Informed",
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  disclaimer = (
    <>
      By subscribing you agree to our{" "}
      <a href="#" className="underline transition-colors hover:text-white">
        Privacy Policy
      </a>
    </>
  ),
}) => {
  return (
    <section className="flex h-full w-full items-center justify-center py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="from-primary to-primary/50 dark:to-primary/70 flex flex-col items-center justify-between gap-10 rounded-3xl bg-gradient-to-b p-8 text-white md:p-12 lg:flex-row lg:gap-16 lg:p-16">
          <div className="flex w-full max-w-xl flex-col space-y-5">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {heading}
            </h2>
            <p className="max-w-md text-base leading-relaxed text-orange-50 md:text-lg">
              {description}
            </p>
          </div>

          <div className="w-full max-w-md flex-1 lg:w-auto">
            <div className="flex flex-col space-y-3">
              {label && (
                <label className="mb-1 block text-sm font-semibold text-white md:text-base">
                  {label}
                </label>
              )}

              <form className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Input
                    type="email"
                    placeholder={placeholder}
                    className="bg-background/50 dark:bg-background/70 focus-visible:ring-primary/30 focus-visible:border-primary/50 h-12 rounded-xl pl-3 text-base backdrop-blur-2xl sm:h-14 sm:w-full "
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-primary/20 h-12 rounded-xl px-6 font-semibold text-white shadow-[0px_0px_4px_1px_rgba(0,0,0,0.05),inset_0_0px_4px_1px_rgba(255,255,255,0.45),inset_0_1px_0px_0px_rgba(255,255,255,0.35)] transition-all active:scale-[0.96] sm:h-14 sm:px-8"
                >
                  {buttonText}
                </Button>
              </form>

              {disclaimer && (
                <p className="text-foreground/60 mt-3 text-xs md:text-sm">
                  {disclaimer}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter2;
