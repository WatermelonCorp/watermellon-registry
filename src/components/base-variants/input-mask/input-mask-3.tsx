"use client";

import { useId } from "react";

import { HiLockClosed } from "react-icons/hi2";

import { usePaymentInputs } from "react-payment-inputs";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InputMask3 = () => {
  const id = useId();
  const { getCVCProps } = usePaymentInputs();

  return (
    <div className="w-full max-w-xs space-y-3">
      <Label htmlFor={id} className="flex items-center gap-2">
        Security Code
      </Label>

      <div className="relative">
        <Input
          {...getCVCProps()}
          id={id}
          placeholder="123"
          className="focus-visible:ring-primary/20 focus-visible:border-primary/50 bg-muted/50 pl-8 focus-visible:ring-2"
        />
        <HiLockClosed className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
      </div>

      <p className="text-muted-foreground text-xs">
        3 or 4 digit code on your card
      </p>
    </div>
  );
};

export default InputMask3;
