"use client";

import { type FC, useState } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { Undo2 } from "lucide-react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa6";

/* ---------- Types ---------- */
export type FeedbackStatus = "idle" | "up" | "down";

export interface QuickFeedbackProps {
  defaultStatus?: FeedbackStatus;
  showThemeToggle?: boolean;
  feedbackText?: string;
  onFeedback?: (status: "up" | "down") => void;
  onUndo?: () => void;
}

/* ---------- Motion ---------- */
const containerTransition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 1,
} as const;

const contentTransition: Transition = {
  type: "tween",
  duration: 0.2,
  ease: "easeOut",
};

/* ---------- Component ---------- */
export const QuickFeedback: FC<QuickFeedbackProps> = ({
  defaultStatus = "idle",
  feedbackText = "Feedback Received!",
  onFeedback,
  onUndo,
}) => {
  const [status, setStatus] = useState<FeedbackStatus>(defaultStatus);

  const handleFeedback = (value: "up" | "down") => {
    setStatus(value);
    onFeedback?.(value);
  };

  const handleUndo = () => {
    setStatus("idle");
    onUndo?.();
  };

  return (
    <div className="relative flex w-full items-center justify-center bg-transparent transition-colors duration-500 px-4">
      <AnimatePresence mode="wait">
        {status === "idle" ? (
          <motion.div
            key="idle"
            layout
            className="flex gap-3 sm:gap-4 w-full justify-center max-w-68"
          >
            {/* Thumbs Up */}
            <motion.button
              layoutId="container-up"
              transition={containerTransition}
              onClick={() => handleFeedback("up")}
              className="
                flex h-16 sm:h-17 flex-1 sm:w-32
                items-center justify-center rounded-full
                bg-[#F3EFE9] dark:bg-zinc-900
                hover:bg-[#ebe7e1] dark:hover:bg-zinc-800
                border border-red-100 dark:border-zinc-800
                active:scale-95
              "
            >
              <FaThumbsUp className="h-7 w-7 sm:h-8 sm:w-8 text-[#020200de] dark:text-zinc-100" />
            </motion.button>

            {/* Thumbs Down */}
            <motion.button
              layoutId="container-down"
              transition={containerTransition}
              onClick={() => handleFeedback("down")}
              className="
                flex h-16 sm:h-17 flex-1 sm:w-32
                items-center justify-center rounded-full
                bg-[#F3EFE9] dark:bg-zinc-900
                hover:bg-[#ebe7e1] dark:hover:bg-zinc-800
                border border-transparent dark:border-zinc-800
                active:scale-95
              "
            >
              <FaThumbsDown className="h-7 w-7 sm:h-8 sm:w-8 text-[#020200de] dark:text-zinc-100 scale-x-[-1]" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="feedback"
            layoutId={status === "up" ? "container-up" : "container-down"}
            transition={containerTransition}
            className="
              flex h-16 sm:h-17 w-full max-w-112.5
              items-center justify-between rounded-full
              bg-[#F3EFE9] dark:bg-zinc-900
              border border-transparent dark:border-zinc-800
              pl-4 sm:pl-6 pr-2 sm:pr-4 overflow-hidden
            "
          >
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, ...contentTransition }}
              className="flex items-center gap-2 min-w-0"
            >
              {status === "up" ? (
                <FaThumbsUp className="h-6 w-6 sm:h-7 sm:w-7 shrink-0 text-[#020200] dark:text-zinc-100" />
              ) : (
                <FaThumbsDown className="h-6 w-6 sm:h-7 sm:w-7 shrink-0 text-[#020200] dark:text-zinc-100" />
              )}

              <span className="ml-1 sm:ml-2 truncate font-bold tracking-wide text-[#020200] dark:text-zinc-100 text-sm sm:text-lg">
                {feedbackText}
              </span>
            </motion.div>

            {/* Undo */}
            <motion.button
              onClick={handleUndo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={contentTransition}
              className="
                ml-2 flex items-center gap-1 sm:gap-2
                rounded-full bg-[#E0DCD4] dark:bg-zinc-800
                px-3 sm:px-4 py-2 sm:py-2.5 font-bold
                text-[#020200] dark:text-zinc-200
                hover:bg-[#d6d2ca] dark:hover:bg-zinc-700
                active:scale-95 transition text-xs sm:text-base
              "
            >
              <Undo2 size={16} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
              Undo
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};