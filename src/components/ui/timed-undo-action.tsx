"use client";

import { useEffect, useState, type FC, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMiniArrowUturnLeft } from "react-icons/hi2";
import { Sun, Moon } from "lucide-react";

/* ---------- TYPES ---------- */

export interface TimedUndoActionProps {
  initialSeconds?: number;
  deleteLabel?: string;
  undoLabel?: string;
  icon?: ReactNode;
  showThemeToggle?: boolean;
}

/* ---------- MAIN COMPONENT ---------- */

export const TimedUndoAction: FC<TimedUndoActionProps> = ({
  initialSeconds = 10,
  deleteLabel = "Delete Account",
  undoLabel = "Cancel Deletion",
  icon = <HiMiniArrowUturnLeft size={18} strokeWidth={0.5} />,
  showThemeToggle = true,
}) => {
  const [undo, setUndo] = useState(false);
  const [count, setCount] = useState(initialSeconds - 1);
  const [isDark, setIsDark] = useState(false);

  // Theme Sync
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Countdown logic
  useEffect(() => {
    if (!undo) return;

    if (count === 0) {
      setUndo(false);
      setCount(initialSeconds);
      return;
    }

    const timer = setTimeout(() => {
      setCount((c) => c - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [undo, count, initialSeconds]);

  const startUndo = () => {
    setUndo(true);
    setCount(initialSeconds);
  };

  const cancelUndo = () => {
    setUndo(false);
    setCount(initialSeconds);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-zinc-950 transition-colors duration-500 gap-12">
      {/* THEME TOGGLE */}
      {showThemeToggle && (
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all active:scale-90"
        >
          {isDark ? (
            <Sun className="text-yellow-400" size={20} />
          ) : (
            <Moon className="text-zinc-500" size={20} />
          )}
        </button>
      )}

      <motion.div
        layout="position"
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        className="relative"
      >
        <AnimatePresence mode="wait">
          {!undo ? (
            /* DELETE BUTTON */
            <motion.button
              key="delete"
              onClick={startUndo}
              initial={{ opacity: 0, y: 4, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -4, filter: "blur(6px)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="h-14 px-10 rounded-full bg-[#FE3429] dark:bg-red-600
                         text-white text-lg font-semibold shadow-lg shadow-red-500/20 dark:shadow-red-900/30 cursor-pointer"
            >
              {deleteLabel}
            </motion.button>
          ) : (
            /* UNDO BUTTON */
            <motion.button
              key="undo"
              onClick={cancelUndo}
              initial={{ opacity: 0, y: 4, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -4, filter: "blur(6px)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-3.5 h-14 pl-3 pr-3 rounded-full
                         bg-[#FEF0F1] dark:bg-red-950/30 text-[#FE3429] dark:text-red-400
                         border border-red-100 dark:border-red-900/30 font-semibold shadow-sm cursor-pointer"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FE3429] dark:bg-red-500 text-white shadow-sm">
                {icon}
              </span>

              <span className="text-lg font-bold">{undoLabel}</span>

              {/* COUNTDOWN */}
              <div className="relative ml-2 h-8 w-10 overflow-hidden rounded-full bg-[#FE3429] dark:bg-red-500 text-white shadow-inner">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={count}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 320, damping: 20 }}
                    className="absolute inset-0 flex items-center justify-center text-base font-mono"
                  >
                    {count}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
