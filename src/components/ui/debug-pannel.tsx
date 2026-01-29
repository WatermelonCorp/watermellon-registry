"use client";

import { motion, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/*  TYPES  */

interface InteractiveDebugPanelProps {
  title?: string;
  enableClickCount?: boolean;
  enableMouseTracking?: boolean;
  enableKeyTracking?: boolean;
  className?: string;
}

/*  MAIN COMPONENT  */

export const DebugPannel = ({
  title = "Debug Panel",
  enableClickCount = true,
  enableMouseTracking = true,
  enableKeyTracking = true,
  className,
}: InteractiveDebugPanelProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [count, setCount] = useState(0);
  const [keyPressed, setKeyPressed] = useState("");

  /* Key press tracking */
  useEffect(() => {
    if (!enableKeyTracking) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      setKeyPressed(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableKeyTracking]);

  return (
    <div
      onMouseMove={(e) => {
        if (!enableMouseTracking) return;
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
      onClick={() => {
        if (!enableClickCount) return;
        setCount((prev) => prev + 1);
      }}
      className={cn(
        "flex size-full flex-col items-center justify-center bg-[#121212] h-screen",
        className
      )}
    >
      <div className="-mt-36 mb-36 grid content-start justify-items-center gap-6 text-center">
        <span className="after:to-foreground relative max-w-[14ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
          {title}
        </span>
      </div>

      <InteractiveDebugPanel
        count={enableClickCount ? count : undefined}
        mouseX={enableMouseTracking ? mouseX : undefined}
        mouseY={enableMouseTracking ? mouseY : undefined}
        keyPressed={enableKeyTracking ? keyPressed : undefined}
      />
    </div>
  );
};

/* DEBUG PANEL */

export const InteractiveDebugPanel = ({
  className,
  ...props
}: Record<string, any> & { className?: string }) => {
  return (
    <div
      className={cn(
        "z-99 left-4 top-4 font-mono text-sm text-red-500",
        className
      )}
    >
      {"{"}
      {Object.entries(props)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => (
          <div key={key} className="ml-4">
            {key}:{" "}
            {value && typeof value === "object" && "get" in value ? (
              <motion.span>{value}</motion.span>
            ) : typeof value === "boolean" ? (
              value ? "true" : "false"
            ) : (
              String(value)
            )}
            ;
          </div>
        ))}
      {"}"}
    </div>
  );
};
