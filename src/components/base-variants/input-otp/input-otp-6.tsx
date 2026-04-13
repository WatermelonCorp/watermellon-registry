"use client";

import { useId } from "react";
import { HiShieldCheck } from "react-icons/hi2";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

const InputOtp6 = () => {
  const id = useId();

  return (
    <div className="max-w-sm space-y-2">
      <div className="flex items-center justify-start gap-2">
        <HiShieldCheck className="text-primary h-5 w-5" />
        <Label htmlFor={id} className="text-base font-semibold">
          Secure verification
        </Label>
      </div>

      <InputOTP id={id} maxLength={4} className="w-full">
        <InputOTPGroup className="flex justify-center gap-3">
          {[0, 1, 2, 3].map((i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className="bg-background hover:border-primary/60 data-[active=true]:border-primary data-[active=true]:ring-primary/30 h-10 w-10 rounded-lg border text-lg font-medium transition-all focus-visible:outline-none data-[active=true]:ring-2"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};

export default InputOtp6;
