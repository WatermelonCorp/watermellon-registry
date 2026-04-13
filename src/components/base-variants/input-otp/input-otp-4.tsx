"use client";

import { useId } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

const InputOtp4 = () => {
  const id = useId();

  const handleResend = () => {
    // trigger resend logic here
  };

  return (
    <div className="space-y-2">
      <div className="leading-tight">
        <Label htmlFor={id} className="text-sm font-semibold">
          Enter verification code
        </Label>
        <p className="text-muted-foreground text-xs">
          We’ve sent a 4-digit code to your device
        </p>
      </div>

      <InputOTP id={id} maxLength={4} className="w-full">
        <InputOTPGroup className="flex justify-center">
          {[0, 1, 2, 3].map((i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className="data-[active=true]:ring-primary/30! data-[active=true]:border-primary/50 bg-muted/50 dark:bg-muted/50 h-14 w-14 border text-lg"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <div className="flex items-center text-sm">
        <button
          onClick={handleResend}
          className="text-primary font-medium transition hover:underline"
        >
          Resend
        </button>
      </div>
    </div>
  );
};

export default InputOtp4;

// shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] data-[active=true]:ring-2! dark:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.2)]
