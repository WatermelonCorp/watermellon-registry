"use client";

import { useState, useEffect } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const Alert9 = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(50), 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Alert className="theme-injected flex gap-3">
      <Avatar className="rounded-full">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="Shadcn"
          className="rounded-full"
        />
        <AvatarFallback className="text-xs">VP</AvatarFallback>
      </Avatar>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-1">
          <AlertTitle>@Shadcn assigned you a task</AlertTitle>
          <AlertDescription>
            Finalize the dashboard UI and submit it before tomorrow’s review
            meeting.
          </AlertDescription>
        </div>

        <Progress
          value={progress}
          className="*:bg-yellow-600/20 *:h-2 [&_[data-slot=progress-indicator]]:bg-yellow-600! dark:[&_[data-slot=progress-indicator]]:bg-yellow-400! *:dark:bg-yellow-400/20"
          aria-label="Task progress"
        />
      </div>
    </Alert>
  );
};

export default Alert9;
