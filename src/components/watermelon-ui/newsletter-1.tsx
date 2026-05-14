import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface Newsletter1Props {
  heading: string;
  subheading?: string;
  placeholder?: string;
  buttonText?: string;
  disclaimer?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Newsletter1({
  heading,
  subheading,
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  disclaimer,
  onSubmit,
}: Newsletter1Props) {
  return (
    <div className="bg-primary text-primary-foreground relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] px-6 py-16 text-center shadow-xl sm:rounded-[2.5rem] md:px-12 md:py-24 lg:py-28">
      <div className="pointer-events-none absolute top-0 left-0 opacity-20">
        <div className="border-primary-foreground absolute top-0 left-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] sm:h-[400px] sm:w-[400px]" />
        <div className="border-primary-foreground absolute top-0 left-0 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] sm:h-[480px] sm:w-[480px]" />
        <div className="border-primary-foreground absolute top-0 left-0 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] sm:h-[560px] sm:w-[560px]" />
      </div>

      <div className="pointer-events-none absolute right-0 bottom-0 opacity-20">
        <div className="border-primary-foreground absolute right-0 bottom-0 h-[300px] w-[300px] translate-x-1/2 translate-y-1/2 rounded-full border-[1.5px] sm:h-[400px] sm:w-[400px]" />
        <div className="border-primary-foreground absolute right-0 bottom-0 h-[350px] w-[350px] translate-x-1/2 translate-y-1/2 rounded-full border-[1.5px] sm:h-[480px] sm:w-[480px]" />
        <div className="border-primary-foreground absolute right-0 bottom-0 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full border-[1.5px] sm:h-[560px] sm:w-[560px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
        <h2 className="mb-4 max-w-xl text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
          {heading}
        </h2>

        {subheading && (
          <p className="mb-8 max-w-xl text-lg text-balance opacity-90 sm:text-xl">
            {subheading}
          </p>
        )}

        <form
          onSubmit={onSubmit}
          className="sm:bg-background mx-auto mt-8 mb-6 flex w-full flex-col items-center gap-3 shadow-lg sm:mt-10 sm:max-w-xl sm:flex-row sm:gap-0 sm:rounded-full sm:p-2"
        >
          <Input
            type="email"
            placeholder={placeholder}
            className="text-foreground bg-background placeholder:text-muted-foreground h-14 w-full rounded-full border-none px-6 text-base shadow-sm ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 sm:flex-1 sm:rounded-none sm:rounded-l-full sm:bg-transparent sm:shadow-none"
            required
          />
          <Button
            type="submit"
            className="h-14 w-full shrink-0 rounded-full px-8 text-base font-semibold shadow-sm transition-transform hover:scale-[1.02] sm:w-auto sm:shadow-none"
          >
            {buttonText}
          </Button>
        </form>

        {disclaimer && (
          <p className="mx-auto mt-2 max-w-md text-center text-xs font-medium text-balance opacity-80 sm:text-sm">
            {disclaimer}
          </p>
        )}
      </div>
    </div>
  );
}
