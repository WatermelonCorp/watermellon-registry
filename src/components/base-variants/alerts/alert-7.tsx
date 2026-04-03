"use client";

import { useState, useEffect } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Alert7 = () => {
  const [isActive, setIsActive] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(50), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isActive) return null;

  return (
    <Alert className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <div className="flex w-full items-start gap-3">
        <MdOutlineFileUpload className="size-5 shrink-0" />

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex flex-col gap-1">
            <AlertTitle>Uploading your &apos;watermelon.png&apos;</AlertTitle>
            <AlertDescription>
              Please wait While we upload your image.
            </AlertDescription>
          </div>

          <Progress
            value={progress}
            className="*:h-1.5 *:bg-cyan-600/20 dark:*:bg-cyan-400/20 [&_[data-slot=progress-indicator]]:bg-cyan-600! dark:[&_[data-slot=progress-indicator]]:bg-cyan-400!"
            aria-label="Upload Progress"
          />

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="h-7 rounded-md px-2">
              Cancel
            </Button>
            <Button
              variant="ghost"
              disabled
              className="h-7 rounded-md px-2 text-cyan-600 hover:bg-cyan-600/10 hover:text-cyan-600 dark:text-cyan-400 dark:hover:bg-cyan-400/10 dark:hover:text-cyan-400"
            >
              Upload another
            </Button>
          </div>
        </div>

        <button
          className="size-4 shrink-0 cursor-pointer"
          onClick={() => setIsActive(false)}
        >
          <RxCross2 className="size-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </Alert>
  );
};

export default Alert7;
