"use client";

import { useId } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

const InputOtp5 = () => {
  const id = useId();

  return (
    <div className="max-w-sm space-y-2">
      <Label htmlFor={id} className="text-base font-semibold">
        Enter OTP
      </Label>

      <InputOTP id={id} maxLength={4} className="w-full">
        <InputOTPGroup className="flex justify-center gap-3">
          {[0, 1, 2, 3].map((i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className="data-[active=true]:ring-primary/30! data-[active=true]:border-primary/50 bg-muted h-14 w-14 rounded-sm! border text-lg transition-all data-[active=true]:scale-110 data-[active=true]:ring-2!"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};

export default InputOtp5;
