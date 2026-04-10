"use client";

import { useId } from "react";

import { withMask } from "use-mask-input";
import { HiClock } from "react-icons/hi2";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InputMask6 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-3">
      <Label htmlFor={id} className="flex items-center gap-2">
        Time
      </Label>

      <div className="group bg-muted/20 focus-within:ring-primary/20 focus-within:border-primary/50 flex items-center gap-2 rounded-md border px-3 focus-within:ring-2">
        <HiClock className="text-muted-foreground group-focus-within:text-foreground size-4 transition-all duration-200 group-focus-within:scale-110" />

        <Input
          id={id}
          type="text"
          placeholder="HH:MM:SS"
          ref={withMask("datetime", {
            placeholder: "_",
            inputFormat: "HH:MM:ss",
            outputFormat: "HH:MM:ss",
            showMaskOnHover: false,
          })}
          className="border-0 bg-transparent p-0 shadow-none focus-visible:border-0 focus-visible:ring-0"
        />
      </div>

      <p className="text-muted-foreground text-xs">
        Enter time in 24-hour format (e.g. 14:30:00)
      </p>
    </div>
  );
};

export default InputMask6;
