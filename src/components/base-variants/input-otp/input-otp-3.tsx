"use client";

import { useId } from "react";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

const InputOtp3 = () => {
  const id = useId();

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor={id}>Enter verification code</Label>
        <p className="text-muted-foreground text-xs">
          This code may include letters (A–Z) and numbers (0–9)
        </p>
      </div>

      <InputOTP id={id} maxLength={4} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
        <InputOTPGroup>
          <InputOTPSlot
            index={0}
            className="data-[active=true]:ring-primary/30! data-[active=true]:border-primary/50 h-14 w-14 border text-lg data-[active=true]:ring-2!"
          />
          <InputOTPSlot
            index={1}
            className="data-[active=true]:ring-primary/30! data-[active=true]:border-primary/50 h-14 w-14 border text-lg data-[active=true]:ring-2!"
          />
          <InputOTPSlot
            index={2}
            className="data-[active=true]:ring-primary/30! data-[active=true]:border-primary/50 h-14 w-14 border text-lg data-[active=true]:ring-2!"
          />
          <InputOTPSlot
            index={3}
            className="data-[active=true]:ring-primary/30! data-[active=true]:border-primary/50 h-14 w-14 border text-lg data-[active=true]:ring-2!"
          />
        </InputOTPGroup>
      </InputOTP>

      <p className="text-muted-foreground text-xs">
        Tip: Characters are not case-sensitive
      </p>
    </div>
  );
};

export default InputOtp3;
