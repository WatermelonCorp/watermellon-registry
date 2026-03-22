"use client";

import React, { useState, type ChangeEvent } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { ArrowRight, ChevronUp, ChevronDown } from "lucide-react";

export type QuickSwitcherMode = "ask" | "generate";

export interface QuickSwitcherProps {
  defaultMode?: QuickSwitcherMode;
  askIcon: React.ReactNode;
  generateIcon: React.ReactNode;
  askLabel?: string;
  generateLabel?: string;
  onActionClick?: (mode: QuickSwitcherMode) => void;
}

const transition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

export const QuickSwitcher: React.FC<QuickSwitcherProps> = ({
  defaultMode = "ask",
  askIcon,
  generateIcon,
  askLabel = "Ask Anything",
  generateLabel = "Generate Image",
  onActionClick,
}) => {
  const [mode, setMode] = useState<QuickSwitcherMode>(defaultMode);
  const [value, setValue] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = () => {
    onActionClick?.(mode);
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "ask" ? "generate" : "ask"));
  };

  return (
    <motion.div
      layout
      className="theme-injected border-border bg-muted flex h-[68px] min-w-[320px] items-center rounded-lg border p-1.5 shadow-sm sm:min-w-[380px]"
    >
      <button
        onClick={toggleMode}
        className="group bg-background hover:bg-background/80 cursor-pointer dark:bg-foreground  flex h-full items-center rounded-lg pr-4 pl-2 shadow-sm transition-colors active:scale-95"
      >
        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={mode}
              initial={{ opacity: 0, filter: "blur(4px)", scale: 0.5 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(4px)", scale: 0.5 }}
              transition={transition}
              className="text-foreground dark:text-background flex items-center justify-center"
            >
              {mode === "ask" ? askIcon : generateIcon}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="ml-1 flex flex-col">
          <ChevronUp
            size={14}
            strokeWidth={4}
            className="text-muted-foreground dark:text-background transition-colors"
          />
          <ChevronDown
            size={14}
            strokeWidth={4}
            className="text-muted-foreground dark:text-background transition-colors"
          />
        </div>
      </button>

      <div className="relative flex h-full flex-grow items-center overflow-hidden px-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {value.length <= 0 && (
            <AnimatedText
              text={mode === "ask" ? askLabel : generateLabel}
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 truncate text-[18px] font-semibold whitespace-nowrap sm:text-[20px]"
            />
          )}
        </AnimatePresence>

        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="text-foreground w-full flex-1 border-none bg-transparent text-[18px] font-semibold placeholder-transparent ring-0 outline-none focus:ring-0 focus:outline-none sm:text-[20px]"
        />
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        className="border-border bg-background dark:bg-foreground dark:text-background text-foreground hover:bg-accent active:bg-muted flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border shadow-sm transition-colors"
        onClick={onSubmit}
      >
        <ArrowRight size={22} strokeWidth={2.5} />
      </motion.button>
    </motion.div>
  );
};

function AnimatedText({
  text,
  className,
  delayStep = 0.014,
}: {
  text: string;
  className?: string;
  delayStep?: number;
}) {
  const chars = text.split("");

  return (
    <span className={className} style={{ display: "inline-flex" }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={text}
          style={{ display: "inline-flex", willChange: "transform" }}
        >
          {chars.map((char, i) => (
            <motion.span
              key={i}
              initial={{
                y: 10,
                opacity: 0,
                scale: 0.5,
                filter: "blur(2px)",
              }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                y: -10,
                opacity: 0,
                scale: 0.5,
                filter: "blur(2px)",
              }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 16,
                mass: 1.2,
                delay: i * delayStep,
              }}
              style={{
                display: "inline-block",
                whiteSpace: char === " " ? "pre" : undefined,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
