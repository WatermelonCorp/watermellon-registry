"use client";

import { useState } from "react";

import { MdError } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Alert3 = () => {
  const [isActive, setIsActive] = useState(true);

  if (!isActive) return null;

  return (
    <Alert className="flex justify-between">
      <MdError />
      <div className="flex-1 flex-col justify-center gap-1">
        <AlertTitle>You have a new message!</AlertTitle>
        <AlertDescription>12 unread messages waiting for you.</AlertDescription>
      </div>
      <button className="cursor-pointer self-start" onClick={() => setIsActive(false)}>
        <RxCross2 className="size-4" />
        <span className="sr-only">Close</span>
      </button>
    </Alert>
  );
};

export default Alert3;
