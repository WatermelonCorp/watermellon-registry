"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { X } from "@aliimam/icons";

export default function Badge05() {
  const [active, setActive] = React.useState(false);

  const [isActive, setIsActive] = useState(true);

  if (!isActive) return null;

  return (
    <div className="flex gap-2">
      <Badge
        variant={active ? "default" : "outline"}
        onClick={() => setActive(!active)}
        className="cursor-pointer select-none transition-colors"
      >
        {active ? "Selected" : "Click to Select"}
      </Badge>
      <Badge className="gap-0">
        Removable
        <button
          className="-my-px -ms-px -mx-1.5 inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-[inherit] p-0 text-primary-foreground/60 transition-[color,box-shadow] outline-none hover:text-primary-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          onClick={() => setIsActive(false)}
        >
          <X size={12} aria-hidden="true" />
        </button>
      </Badge>
      <Badge variant="outline" className="gap-0 rounded-md px-2 py-1">
        Tag
        <button
          className="-my-[5px] -ms-0.5 -me-2 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-[inherit] p-0 text-foreground/60 transition-[color,box-shadow] outline-none hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          onClick={() => setIsActive(false)}
          aria-label="Delete"
        >
          <X size={14} aria-hidden="true" />
        </button>
      </Badge>
    </div>
  );
}
