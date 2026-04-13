"use client";

import { useId } from "react";

import { withMask } from "use-mask-input";
import { HiIdentification } from "react-icons/hi2";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InputMask1 = () => {
  const id = useId();

  return (
    <div className="w-full max-w-xs space-y-3">
      <Label htmlFor={id} className="flex items-center gap-2">
        License Code
      </Label>

      <div className="relative">
        <Input
          id={id}
          type="text"
          placeholder="AB12 CDE"
          className="focus-visible:ring-primary/20 focus-visible:border-primary/50 bg-muted/50 pl-10 focus-visible:ring-2"
          ref={withMask("AA99 AAA", {
            placeholder: "_",
            showMaskOnHover: false,
          })}
        />
        <HiIdentification className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
      </div>

      <p className="text-muted-foreground text-xs">
        Enter your code in the required format
      </p>
    </div>
  );
};

export default InputMask1;
