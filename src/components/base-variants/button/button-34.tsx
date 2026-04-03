"use client";

import { useState } from "react";

import { IoCheckmarkOutline, IoCopyOutline } from "react-icons/io5";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const Button34 = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("Thank you for using Watermelon UI!");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button
      variant="outline"
      className="relative disabled:opacity-100"
      onClick={handleCopy}
      disabled={copied}
    >
      <span
        className={cn(
          "transition-all",
          copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
      >
        <IoCheckmarkOutline className="stroke-green-600 dark:stroke-green-400" />
      </span>
      <span
        className={cn(
          "absolute left-3 transition-all",
          copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
      >
        <IoCopyOutline />
      </span>
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
};

export default Button34;
