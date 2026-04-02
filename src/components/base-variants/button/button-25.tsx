"use client";

import { useState } from "react";

import { ImSpinner2 } from "react-icons/im";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const Button25 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<undefined | string>(undefined);

  const handleClick = async () => {
    setIsLoading(true);
    setStatus(undefined);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus(Math.random() > 0.5 ? "Submitted!" : "Rejected!");
    } catch (error) {
      setStatus("Rejected!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="link"
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        "cursor-pointer hover:no-underline flex items-center gap-2",
        {
          "text-green-600 dark:text-green-400": status === "Submitted!",
          "text-destructive": status === "Rejected!",
        }
      )}
    >
      {isLoading ? (
        <>
          <ImSpinner2 className="animate-spin" />
          Loading
        </>
      ) : status ? (
        status
      ) : (
        "Click me"
      )}
    </Button>
  );
};

export default Button25;
