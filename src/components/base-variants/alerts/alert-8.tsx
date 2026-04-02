"use client";

import { useState } from "react";

import { MdError } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const Alert8 = () => {
  const [isActive, setIsActive] = useState(true);

  if (!isActive) return null;

  return (
    <Alert className="theme-injected flex justify-between border-none bg-primary text-primary-foreground">
      <MdError className="size-4" />
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex-1 flex-col justify-center gap-1">
          <AlertTitle>Update ready to install</AlertTitle>
          <AlertDescription className="text-primary-foreground/70 text-wrap!">
            A new version is available with performance improvements and a
            refreshed dashboard experience.
          </AlertDescription>
        </div>
        <div className="flex items-center gap-4">
          <Button className="h-7 cursor-pointer rounded-lg bg-secondary/10 px-2 hover:bg-secondary/20 focus-visible:bg-secondary/20">
            Remind me later
          </Button>
          <Button
            variant="secondary"
            className="h-7 cursor-pointer rounded-lg px-2"
          >
            Update now
          </Button>
        </div>
      </div>
      <button
        className="size-5 cursor-pointer"
        onClick={() => setIsActive(false)}
      >
        <RxCross2 className="size-5" />
        <span className="sr-only">Close</span>
      </button>
    </Alert>
  );
};

export default Alert8;
