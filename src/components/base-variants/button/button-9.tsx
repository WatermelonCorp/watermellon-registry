"use client";

import { Button } from "@/components/ui/button";

const Button9 = () => {
  return (
    <Button disabled className="inline-flex items-center gap-0.5 ">
      <span >Loading</span>

      <span className="flex gap-[2px] translate-y-[4px]">
        <span className="size-1 rounded-full bg-current animate-bounce [animation-delay:-0.2s]" />
        <span className="size-1 rounded-full bg-current animate-bounce [animation-delay:-0.1s]" />
        <span className="size-1 rounded-full bg-current animate-bounce [animation-delay:0s]" />
      </span>
    </Button>
  );
};

export default Button9;
