"use client";

import { Button } from "@/components/ui/button";

import { FaCookie } from "react-icons/fa";

export default function Announcement9() {
  return (
    <div className="flex w-full items-center justify-center  px-4 py-6">
      <div className="bg-muted/50 text-foreground border-border w-full max-w-3xl rounded-lg border px-6 py-5 shadow-sm ">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <FaCookie className="text-primary mt-1 size-5 shrink-0" />

            <p className="text-muted-foreground leading-relaxed tracking-wide">
              We use cookies to improve your browsing experience, personalize
              content, and understand how our platform is used. You can choose
              to accept or decline, but enabling them helps us serve you better.
              Read more in our{" "}
              <span className="text-primary cursor-pointer underline underline-offset-4">
                privacy policy
              </span>
              .
            </p>
          </div>

          <div className="flex items-center gap-3 self-end">
            <Button
              variant="default"
              className="cursor-pointer rounded-sm shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-2px_5px_rgba(0,0,0,0.1),0_2px_20px_rgba(0,0,0,0.1)] text-shadow-2xs"
            >
              Accept all
            </Button>

            <Button
              variant="outline"
              className="text-muted-foreground cursor-pointer rounded-sm shadow-[inset_0_4px_2px_rgba(255,255,255,1),inset_0_-2px_5px_rgba(0,0,0,0.05),0_2px_20px_rgba(0,0,0,0.1)] text-shadow-2xs dark:shadow-[inset_0_4px_2px_rgba(255,255,255,0.05),inset_0_-2px_5px_rgba(0,0,0,0.2),0_2px_20px_rgba(0,0,0,0.1)]"
            >
              Reject all
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
