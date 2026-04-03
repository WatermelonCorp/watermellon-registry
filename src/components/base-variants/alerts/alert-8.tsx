"use client";

import { useState } from "react";

import { MdError } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const Alert8 = () => {
  const [isActive, setIsActive] = useState(true);

  if (!isActive) return null;

  return (
    <Alert className="bg-primary text-primary-foreground flex flex-col gap-3 border-none sm:flex-row sm:items-start">
      <div className="flex w-full items-start gap-3">
        <MdError className="size-4 shrink-0" />

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex flex-col gap-1">
            <AlertTitle>Update ready to install</AlertTitle>
            <AlertDescription className="text-primary-foreground/70 text-wrap!">
              A new version is available with performance improvements and a
              refreshed dashboard experience.
            </AlertDescription>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Button className="bg-secondary/10 hover:bg-secondary/20 focus-visible:bg-secondary/20 h-7 rounded-lg px-2">
              Later
            </Button>
            <Button variant="secondary" className="h-7 rounded-lg px-2">
              Update now
            </Button>
          </div>
        </div>

        <button
          className="size-5 shrink-0 cursor-pointer"
          onClick={() => setIsActive(false)}
        >
          <RxCross2 className="size-5" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </Alert>
  );
};

export default Alert8;
