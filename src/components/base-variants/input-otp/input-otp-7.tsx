"use client";

import { useId } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

const InputOtp7 = () => {
  const id = useId();

  return (
    <div className="space-y-2">
      <div className="space-y-1 text-center">
        <Label htmlFor={id} className="text-sm font-semibold">
          Enter 6-digit OTP
        </Label>
      </div>

      <InputOTP id={id} maxLength={6} className="w-full">
        <div className="flex items-center justify-center">
          <InputOTPGroup className="flex shadow-xs">
            {[0, 1, 2].map((i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="bg-muted/50 data-[active=true]:ring-primary/20 data-[active=true]:border-primary/50 h-8 w-8 border text-sm shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] transition-all data-[active=true]:scale-105 data-[active=true]:ring-2! dark:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.25),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)]"
              />
            ))}
          </InputOTPGroup>

          <InputOTPSeparator className="text-primary text-lg">
            –
          </InputOTPSeparator>

          <InputOTPGroup className="flex shadow-xs">
            {[3, 4, 5].map((i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="bg-muted/50 data-[active=true]:ring-primary/20 data-[active=true]:border-primary/50 h-8 w-8 border text-sm shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] transition-all data-[active=true]:scale-105 data-[active=true]:ring-2! dark:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.25),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)]"
              />
            ))}
          </InputOTPGroup>
        </div>
      </InputOTP>
    </div>
  );
};

export default InputOtp7;
