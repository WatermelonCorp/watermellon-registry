"use client";

import { Button } from "@/components/ui/button";
import { HiXMark } from "react-icons/hi2";
import { MdArrowOutward } from "react-icons/md";

export default function Announcement8() {
  return (
    <div className="flex h-full w-full items-center justify-center text-sm  ">
      <div className="bg-muted flex w-full items-center justify-between gap-3 px-4 py-2 ">
        <p className="text-muted-foreground flex flex-1 items-center justify-center gap-1 text-center text-sm">
          Smart Workspaces are live.{" "}
          <span className="text-primary group flex cursor-pointer items-center justify-center underline underline-offset-4">
            See what’s new
            <MdArrowOutward className="mt-0.5 ml-0.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </p>

        <Button
          variant="link"
          className="text-muted-foreground hover:text-foreground transition"
        >
          <HiXMark className="size-4" />
        </Button>
      </div>
    </div>
  );
}
