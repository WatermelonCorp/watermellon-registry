"use client";

import { useId } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

const InputOtp1 = () => {
  const id = useId();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="text-center">
        <Label htmlFor={id} className="text-base font-semibold">
          Enter OTP
        </Label>
      </div>

      <InputOTP
        id={id}
        maxLength={4}
        pattern={REGEXP_ONLY_DIGITS}
        className="w-full"
      >
        <InputOTPGroup className="flex w-full justify-center gap-3">
          <InputOTPSlot
            index={0}
            className="data-[active=true]:ring-primary/30! data-[active=true]:border-primary/50 h-14 w-14 rounded-sm! border text-lg data-[active=true]:ring-2!"
          />
          <InputOTPSlot
            index={1}
            className="data-[active=true]:ring-primary/30! data-[active=true]:border-primary/50 h-14 w-14 rounded-sm! border text-lg data-[active=true]:ring-2!"
          />
          <InputOTPSlot
            index={2}
            className="data-[active=true]:ring-primary/30! data-[active=true]:border-primary/50 h-14 w-14 rounded-sm! border text-lg data-[active=true]:ring-2!"
          />
          <InputOTPSlot
            index={3}
            className="data-[active=true]:ring-primary/30! data-[active=true]:border-primary/50 h-14 w-14 rounded-sm! border text-lg data-[active=true]:ring-2!"
          />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};

export default InputOtp1;
