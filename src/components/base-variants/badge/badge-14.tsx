"use client";

import { Badge } from "@/components/ui/badge";

import { FiArrowRight } from "react-icons/fi";

const Badge14 = () => {
  return (
    <Badge asChild>
      <a
        href="#"
        className="group inline-flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-0"
      >
        Link
        <FiArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-1" />
      </a>
    </Badge>
  );
};

export default Badge14;
