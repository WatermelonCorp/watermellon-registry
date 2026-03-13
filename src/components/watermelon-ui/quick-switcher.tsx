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
      className="flex h-[68px] min-w-[320px] items-center rounded-full border border-gray-200/50 bg-[#F2F2F2] p-1.5 shadow-sm sm:min-w-[380px] dark:border-neutral-800/50 dark:bg-neutral-900"
    >
      <button
        onClick={toggleMode}
        className="group flex h-full items-center rounded-full bg-white pr-4 pl-2 shadow-sm transition-colors hover:bg-neutral-100 active:scale-95 dark:bg-neutral-800 dark:hover:bg-neutral-700"
      >
        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={mode}
              initial={{ opacity: 0, filter: "blur(4px)", scale: 0.5 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(4px)", scale: 0.5 }}
              transition={transition}
              className="flex items-center justify-center text-neutral-900 dark:text-neutral-100"
            >
              {mode === "ask" ? askIcon : generateIcon}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="ml-1 flex flex-col">
          <ChevronUp
            size={14}
            strokeWidth={4}
            className={`transition-colors ${"text-neutral-300 dark:text-neutral-500"}`}
          />
          <ChevronDown
            size={14}
            strokeWidth={4}
            className={`transition-colors ${"text-neutral-300 dark:text-neutral-500"}`}
          />
        </div>
      </button>

      <div className="relative flex h-full flex-grow items-center overflow-hidden px-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {value.length <= 0 && (
            <AnimatedText
              text={mode === "ask" ? askLabel : generateLabel}
              className="pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 truncate text-[18px] font-semibold whitespace-nowrap text-neutral-400 sm:text-[20px] dark:text-neutral-500"
            />
          )}
        </AnimatePresence>

        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="w-full flex-1 border-none bg-transparent text-[18px] font-semibold text-neutral-900 placeholder-transparent ring-0 outline-none focus:ring-0 focus:outline-none sm:text-[20px] dark:text-neutral-100"
        />
      </div>

      <motion.button
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.9 }}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-white text-neutral-900 shadow-sm transition-colors hover:bg-neutral-100 active:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:active:bg-neutral-800"
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
