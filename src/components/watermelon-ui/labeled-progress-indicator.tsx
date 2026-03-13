"use client";

import { useEffect, useState, type FC } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";

/* ---------- TYPES ---------- */

export interface LabeledProgressIndicatorProps {
  labels: string[];
  progress?: string; // ex: "55%"
  intervalMs?: number;
  showThemeToggle?: boolean;
}

/* ---------- MAIN COMPONENT ---------- */

export const LabeledProgressIndicator: FC<LabeledProgressIndicatorProps> = ({
  labels,
  progress = "55%",
  intervalMs = 1300,
  showThemeToggle = true,
}) => {
  const [labelIndex, setLabelIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);

  // Theme sync
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Label rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setLabelIndex((prev) => (prev + 1) % labels.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [labels.length, intervalMs]);

  return (
    <div className="flex flex-col justify-center items-center gap-8 bg-white dark:bg-zinc-950 h-screen w-full transition-colors duration-500">
      {/* THEME TOGGLE */}
      {showThemeToggle && (
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900
                     border border-zinc-200 dark:border-zinc-800
                     transition-all active:scale-90 shadow-sm"
        >
          {isDark ? (
            <Sun className="text-yellow-400" size={20} />
          ) : (
            <Moon className="text-zinc-500" size={20} />
          )}
        </button>
      )}

      <div className="flex flex-col items-center gap-5">
        {/* LABEL */}
        <div className="h-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={labelIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="text-3xl font-bold tracking-wide
                         text-[#B5B5B5] dark:text-zinc-500"
            >
              {labels[labelIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* PROGRESS BAR */}
        <div className="relative h-4 w-[320px] rounded-full
                        bg-[#F0F0F0] dark:bg-zinc-900 overflow-hidden
                        border border-black/5 dark:border-white/5 shadow-inner">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: progress }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative h-full overflow-hidden rounded-full
                       bg-[#016FFE] dark:bg-blue-600"
          >
            {/* SHIMMER */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-y-0 w-full
                         bg-gradient-to-r
                         from-transparent
                         via-white/30 dark:via-cyan-300/40
                         to-transparent"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
