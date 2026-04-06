"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Button20 = () => {
  return (
    <a
      href="#"
      className={cn(
        buttonVariants({ variant: "link" }),
        "relative !no-underline after:bg-primary after:absolute after:bottom-1.5 after:left-1/2 after:h-px after:w-[80%] after:-translate-x-1/2 after:scale-x-0 after:origin-center after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100"
      )}
    >
      Message Us
    </a>
  );
};

export default Button20;
