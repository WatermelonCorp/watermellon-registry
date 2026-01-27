"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export const QuickSwitcher: React.FC<QuickSwitcherProps> = ({
  defaultMode = "ask",
  askIcon,
  generateIcon,
  askLabel = "Ask Anything",
  generateLabel = "Generate Image",
  onActionClick,
}) => {
  const [mode, setMode] = useState<QuickSwitcherMode>(defaultMode);

  const toggleMode = () => {
    setMode((prev) => (prev === "ask" ? "generate" : "ask"));
  };

  const spring = {
    type: "spring",
    stiffness: 260,
    damping: 30,
    mass: 1.25,
  } as const;

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fcfcfc]">
      <motion.div
        layout
        transition={spring}
        className="
          flex items-center
          bg-[#F6F6F6]
          h-[64px]
          border border-[#F6F6F6]/50
          p-1
          rounded-full
          shadow-sm
          overflow-hidden
          min-w-[340px]
        "
      >
        {/* Left */}
        <div
          onClick={toggleMode}
          className="
            flex items-center
            bg-[#fefefe]
            shadow-sm
            rounded-full
            py-1.5 px-3
            cursor-pointer
            hover:bg-[#fefefeb1]
            transition-colors duration-200
          "
        >
          {/* Icon */}
          <div className="relative w-11 h-11 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode}
                initial={{ y: mode === "ask" ? 20 : -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: mode === "ask" ? -20 : 20, opacity: 0 }}
                transition={spring}
                className="absolute inset-0 flex items-center justify-center text-[#292929]"
              >
                {mode === "ask" ? askIcon : generateIcon}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrows */}
          <div className="flex flex-col text-gray-400 -space-y-1">
            <ChevronUp
              size={18}
              strokeWidth={3.5}
              className={mode === "ask" ? "text-[#262626]" : ""}
            />
            <ChevronDown
              size={18}
              strokeWidth={3.5}
              className={mode === "generate" ? "text-[#262626]" : ""}
            />
          </div>
        </div>

       {/* Center */}
<div className="flex-grow px-4 relative h-10 w-fit overflow-hidden flex items-center mx-2">
  <AnimatePresence mode="wait" initial={false}>
    <motion.input
      key={mode}
      type="text"
      placeholder={mode === "ask" ? askLabel : generateLabel}
      initial={{
        y: mode === "ask" ? 20 : -20,
        opacity: 0,
        filter: "blur(4px)",
      }}
      animate={{
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
      }}
      exit={{
        y: mode === "ask" ? -20 : 20,
        opacity: 0,
        filter: "blur(4px)",
      }}
      transition={spring}
      className="
        absolute w-full
        bg-transparent
        border-none
        outline-none
        text-xl font-semibold
        text-[#262626]
        placeholder:text-[#B0B0B0]
      "
    />
  </AnimatePresence>
</div>


        {/* Right */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          transition={spring}
          onClick={() => onActionClick?.(mode)}
          className="
            p-3.5
            bg-[#fefefe]
            border border-gray-100
            rounded-full
            shadow-sm
            text-[#262626]
            hover:bg-gray-50
            transition-colors
          "
        >
          <ArrowRight size={24} strokeWidth={2.5} />
        </motion.button>
      </motion.div>
    </div>
  );
};
