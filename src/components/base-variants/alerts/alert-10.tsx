"use client";

import { useState } from "react";

import { MdError } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Alert10 = () => {
  const [isActive, setIsActive] = useState(true);

  if (!isActive) return null;

  return (
    <Alert className="border-accent-foreground/20 from-accent text-accent-foreground flex justify-between bg-gradient-to-b to-transparent to-50%">
      <MdError className="size-4" />
      <div className="flex flex-1 flex-col gap-1 leading-tight">
        <AlertTitle>Confirm your email to get started</AlertTitle>
        <AlertDescription className="text-accent-foreground/60">
          A verification link has been sent to your email. Open it to activate
          your account.
        </AlertDescription>
      </div>
      <button
        className="cursor-pointer self-start"
        onClick={() => setIsActive(false)}
      >
        <RxCross2 className="size-5" />
        <span className="sr-only">Close</span>
      </button>
    </Alert>
  );
};

export default Alert10;
