"use client";

import { useState, useEffect, type FC } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { Undo2, Sun, Moon } from "lucide-react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa6";

/* --- Types --- */
type FeedbackStatus = "idle" | "up" | "down";

interface QuickFeedbackProps {
  defaultStatus?: FeedbackStatus;
  showThemeToggle?: boolean;
  feedbackText?: string;
  onFeedback?: (status: "up" | "down") => void;
  onUndo?: () => void;
}

const containerTransition: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 1,
};

const contentTransition: Transition = {
  type: "tween",
  duration: 0.2,
  ease: "easeOut",
};

export const QuickFeedback: FC<QuickFeedbackProps> = ({
  defaultStatus = "idle",
  showThemeToggle = true,
  feedbackText = "Feedback Received!",
  onFeedback,
  onUndo,
}) => {
  const [status, setStatus] = useState<FeedbackStatus>(defaultStatus);
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  const handleFeedback = (value: "up" | "down") => {
    setStatus(value);
    onFeedback?.(value);
  };

  const handleUndo = () => {
    setStatus("idle");
    onUndo?.();
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full bg-[#FEFEFE] dark:bg-zinc-950 transition-colors duration-500">
      
      {/* Theme Toggle */}
      {showThemeToggle && (
        <button
          onClick={() => setIsDark(!isDark)}
          className="mb-12 p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all active:scale-90"
        >
          {isDark ? (
            <Sun className="text-yellow-400" size={20} />
          ) : (
            <Moon className="text-zinc-500" size={20} />
          )}
        </button>
      )}

      <AnimatePresence mode="wait">
        {status === "idle" ? (
          <motion.div key="idle-container" layout className="flex gap-[16px]">
            
            {/* Thumbs Up */}
            <motion.button
              layoutId="container-up"
              onClick={() => handleFeedback("up")}
              transition={containerTransition}
              className="
                group relative flex h-[68px] w-[128px]
                items-center justify-center
                rounded-full bg-[#F3EFE9] dark:bg-zinc-900
                hover:bg-[#ebe7e1] dark:hover:bg-zinc-800
                border border-transparent dark:border-zinc-800
                transition-colors
                active:scale-95
              "
            >
              <FaThumbsUp className="h-[32px] w-[32px] text-[#020200de] dark:text-zinc-100 transition-transform duration-200" />
            </motion.button>

            {/* Thumbs Down */}
            <motion.button
              layoutId="container-down"
              onClick={() => handleFeedback("down")}
              transition={containerTransition}
              className="
                group relative flex h-[68px] w-[128px]
                items-center justify-center
                rounded-full bg-[#F3EFE9] dark:bg-zinc-900
                hover:bg-[#ebe7e1] dark:hover:bg-zinc-800
                border border-transparent dark:border-zinc-800
                transition-colors
                active:scale-95
              "
            >
              <FaThumbsUp className="h-[32px] w-[32px] text-[#020200de] dark:text-zinc-100 rotate-180 transition-transform duration-200" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="feedback-container"
            layoutId={status === "up" ? "container-up" : "container-down"}
            transition={containerTransition}
            className="
              flex h-[68px] min-w-[340px]
              items-center justify-between
              rounded-full bg-[#F3EFE9] dark:bg-zinc-900
              border border-transparent dark:border-zinc-800
              pl-[24px] pr-[16px] overflow-hidden
            "
          >
            {/* Left */}
            <motion.div
              className="flex items-center gap-[10px]"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, ...contentTransition }}
            >
              {status === "up" ? (
                <FaThumbsUp className="h-[28px] w-[28px] text-[#020200] dark:text-zinc-100" />
              ) : (
                <FaThumbsDown className="h-[28px] w-[28px] text-[#020200] dark:text-zinc-100" />
              )}

              <span className="text-[18px] ml-[8px] font-bold tracking-wide text-[#020200] dark:text-zinc-100 whitespace-nowrap">
                {feedbackText}
              </span>
            </motion.div>

            {/* Undo */}
            <motion.button
              onClick={handleUndo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...contentTransition }}
              className="
                ml-[16px] flex items-center gap-[8px]
                rounded-full bg-[#E0DCD4] dark:bg-zinc-800
                px-[16px] py-[10px]
                font-bold text-[#020200] dark:text-zinc-200
                hover:bg-[#d6d2ca] dark:hover:bg-zinc-700
                active:scale-95
                transition-all
              "
            >
              <Undo2 className="h-[20px] w-[20px] text-[#020200] dark:text-zinc-200" strokeWidth={2.5} />
              Undo
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
