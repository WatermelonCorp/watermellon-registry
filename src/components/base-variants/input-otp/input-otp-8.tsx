"use client";

import { useId } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

const InputOtp8 = () => {
  const id = useId();

  return (
    <div className="max-w-xs space-y-1">
      <div className="text-center">
        <Label htmlFor={id} className="text-base font-medium">
          Enter code
        </Label>
      </div>

      <InputOTP id={id} maxLength={4} className="w-full">
        <InputOTPGroup className="flex justify-between gap-2 *:data-[active=true]:ring-0 *:data-[slot=input-otp-slot]:rounded-none *:data-[slot=input-otp-slot]:border-0 *:data-[slot=input-otp-slot]:shadow-none *:dark:data-[slot=input-otp-slot]:bg-transparent">
          {[0, 1, 2, 3].map((i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className="text-muted-foreground before:bg-muted-foreground/30 after:bg-primary data-[filled=true]:text-primary relative h-12 w-12 text-center text-lg transition-colors duration-200 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 focus-visible:outline-none data-[active=true]:after:scale-x-100 data-[filled=true]:after:!scale-x-100 data-[filled=true]:after:scale-x-100 data-[filled=true]:after:transition-none"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};

export default InputOtp8;
