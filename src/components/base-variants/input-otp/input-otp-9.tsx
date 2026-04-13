"use client";

import { useId } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

const InputOtp9 = () => {
  const id = useId();

  return (
    <div className="max-w-md space-y-1">
      <div className="text-center">
        <Label htmlFor={id} className="text-sm font-semibold">
          Enter 6 digit OTP
        </Label>
      </div>

      <InputOTP id={id} maxLength={6}>
        <div className="flex items-center justify-center gap-2">
          <InputOTPGroup className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="bg-muted/70 data-[active=true]:ring-primary/20 data-[active=true]:border-primary/50 h-8 w-8 rounded-lg border text-sm font-medium shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05),0px_2px_4px_0px_rgba(0,0,0,0.05)] transition-all data-[active=true]:ring-2 dark:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.25),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7),0px_2px_4px_0px_rgba(0,0,0,0.3)]"
              />
            ))}
          </InputOTPGroup>

          <InputOTPSeparator className="text-muted-foreground text-lg">
            —
          </InputOTPSeparator>

          <InputOTPGroup className="flex gap-1.5">
            {[3, 4, 5].map((i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="bg-muted/70 data-[active=true]:ring-primary/20 data-[active=true]:border-primary/50 h-8 w-8 rounded-lg border text-sm font-medium shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05),0px_2px_4px_0px_rgba(0,0,0,0.05)] transition-all data-[active=true]:ring-2 dark:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.25),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7),0px_2px_4px_0px_rgba(0,0,0,0.3)]"
              />
            ))}
          </InputOTPGroup>
        </div>
      </InputOTP>
    </div>
  );
};

export default InputOtp9;
