"use client";

import { useEffect, useId, useState } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const InputOtp2 = () => {
  const id = useId();
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds === 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const handleResend = () => {
    setSeconds(30);
  };

  return (
    <div className="space-y-2">
      <div className="text-center">
        <Label htmlFor={id} className="text-base font-semibold">
          Verify Code
        </Label>
        <p className="text-muted-foreground text-start text-sm">
          Enter the 4-digit code sent to you
        </p>
      </div>

      <InputOTP id={id} maxLength={4} className="w-full">
        <InputOTPGroup className="flex justify-between gap-3">
          {[0, 1, 2, 3].map((i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className="data-[active=true]:ring-primary/30! data-[active=true]:border-primary/50 h-14 w-14 rounded-sm! border text-lg data-[active=true]:ring-2!"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <div className="flex items-center justify-start text-sm">
        <span className="text-muted-foreground">
          {seconds > 0
            ? `Resend in 00:${seconds.toString().padStart(2, "0")}`
            : "Didn't receive code?"}
        </span>

        <Button
          variant={"link"}
          onClick={handleResend}
          disabled={seconds > 0}
          className="p-0 pl-1"
        >
          Resend
        </Button>
      </div>
    </div>
  );
};

export default InputOtp2;
