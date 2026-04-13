"use client";

import { useId } from "react";

import { HiCalendarDays } from "react-icons/hi2";

import { usePaymentInputs } from "react-payment-inputs";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InputMask5 = () => {
  const id = useId();
  const { getExpiryDateProps } = usePaymentInputs();

  return (
    <div className="w-full max-w-xs space-y-3">
      <Label htmlFor={id} className="flex items-center gap-2">
        Expiry Date
      </Label>
      <div className="group bg-muted/20  focus-within:ring-primary/20 focus-within:border-primary/50 flex items-center gap-2 overflow-hidden rounded-md border focus-within:ring-2">
        <div className="border-border dark:border-border/50 bg-muted flex h-8 w-12 items-center justify-center border-r">
          <HiCalendarDays className="text-muted-foreground group-focus-within:text-foreground size-4 transition-all duration-200 group-focus-within:scale-110" />
        </div>

        <Input
          {...getExpiryDateProps()}
          id={id}
          placeholder="MM / YY"
          className="border-0 bg-transparent dark:bg-transparent p-0 shadow-none focus-visible:border-0 focus-visible:ring-0"
        />
      </div>

      <p className="text-muted-foreground text-xs">
        Enter the expiry date as shown on your card
      </p>
    </div>
  );
};

export default InputMask5;
