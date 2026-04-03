"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { RxCross2 } from "react-icons/rx";

const Badge11 = () => {
  const [isActive, setIsActive] = useState(true);

  if (!isActive) return null;

  return (
    <Badge>
      Closable
      <button
        className="focus-visible:border-ring focus-visible:ring-ring/50 text-primary-foreground/60 hover:text-primary-foreground -my-px -ms-px -me-1 inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-lg p-0 transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
        aria-label="Close"
        onClick={() => setIsActive(false)}
      >
        <RxCross2 className="size-3" aria-hidden="true" />
      </button>
    </Badge>
  );
};

export default Badge11;
