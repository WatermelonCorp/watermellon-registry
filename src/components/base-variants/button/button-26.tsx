"use client";

import { useState } from "react";

import { FiSun, FiMoon } from "react-icons/fi";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const Button26 = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle dark mode"
      className={cn(
        isDark
          ? "border-blue-600 text-blue-600! hover:bg-blue-600/10 focus-visible:border-blue-600 focus-visible:ring-blue-600/20 dark:border-blue-400 dark:text-blue-400! dark:hover:bg-blue-400/10 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400/40"
          : "border-yellow-600 text-yellow-600! hover:bg-yellow-600/10 focus-visible:border-yellow-600 focus-visible:ring-yellow-600/20 dark:border-yellow-400 dark:text-yellow-400! dark:hover:bg-yellow-400/10 dark:focus-visible:border-yellow-400 dark:focus-visible:ring-yellow-400/40"
      )}
    >
      {isDark ? <FiMoon className="size-5" /> : <FiSun className="size-5" />}
    </Button>
  );
};

export default Button26;
