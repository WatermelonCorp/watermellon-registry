"use client";

import { useState } from "react";


import { Badge } from "@/components/ui/badge";
import { GoCheckCircleFill } from "react-icons/go";

const Badge22 = () => {
  const [selected, setSelected] = useState(false);

  return (
    <Badge
      variant={selected ? "secondary" : "outline"}
      onClick={() => setSelected((prev) => !prev)}
      className="theme-injected relative inline-flex items-center justify-center gap-1 cursor-pointer rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring/50 select-none"
    >
      {selected && (
        <GoCheckCircleFill
          className="size-3 text-green-600 dark:text-green-400 translate-y-[0.5px]"
          aria-hidden="true"
        />
      )}

      <span>{selected ? "Selected" : "Selectable"}</span>
    </Badge>
  );
};

export default Badge22;
