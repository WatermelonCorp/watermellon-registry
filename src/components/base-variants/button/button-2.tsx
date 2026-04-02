"use client";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";

const Button2 = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="outline" className="inline-flex items-center gap-2">
        <FiArrowLeft className="size-4" />
        Prev
      </Button>

      <Button variant="outline" className="inline-flex items-center gap-2">
        Next
        <FiArrowRight className="size-4" />
      </Button>
    </div>
  );
};

export default Button2;
