"use client";

import { useId } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

const InputOtp10 = () => {
  const id = useId();

  return (
    <div className="space-y-3">
      <Label htmlFor={id}>Split verification code</Label>

      <InputOTP id={id} maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot
            index={0}
            className="data-[active=true]:ring-primary/30! data-[active=true]:border-primary/50 h-8 w-8 border text-sm data-[active=true]:ring-2!"
          />
          <InputOTPSlot
            index={1}
            className="data-[active=true]:ring-primary/30! data-[active=true]:border-primary/50 h-8 w-8 border text-sm data-[active=true]:ring-2!"
          />
          <InputOTPSlot
            index={2}
            className="data-[active=true]:ring-primary/30! data-[active=true]:border-primary/50 h-8 w-8 border text-sm data-[active=true]:ring-2!"
          />
        </InputOTPGroup>

        <div
          role="separator"
          className="flex flex-col items-center justify-center gap-[3px] px-2"
        >
          <span className="bg-primary h-2 w-2 rounded-full" />
        </div>

        <InputOTPGroup>
          <InputOTPSlot
            index={3}
            className="data-[active=true]:ring-primary/30! data-[active=true]:border-primary/50 h-8 w-8 border text-sm data-[active=true]:ring-2!"
          />
          <InputOTPSlot
            index={4}
            className="data-[active=true]:ring-primary/30! data-[active=true]:border-primary/50 h-8 w-8 border text-sm data-[active=true]:ring-2!"
          />
          <InputOTPSlot
            index={5}
            className="data-[active=true]:ring-primary/30! data-[active=true]:border-primary/50 h-8 w-8 border text-sm data-[active=true]:ring-2!"
          />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};

export default InputOtp10;
