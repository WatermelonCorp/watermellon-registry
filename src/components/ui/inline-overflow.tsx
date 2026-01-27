"use client";

import { useState, useEffect, type FC } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Sun, Moon } from "lucide-react";

/* ---------- TYPES ---------- */

export interface InlineOverflowAction {
  label: string;
}

export interface InlineOverflowProps {
  visibleActions: InlineOverflowAction[];
  hiddenActions: InlineOverflowAction[];
  showThemeToggle?: boolean;
}

/* ---------- SUB COMPONENT ---------- */

const Action: FC<{ label: string }> = ({ label }) => {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className="h-12 px-6 rounded-full bg-white dark:bg-zinc-800
                 text-base font-bold border border-black/5 dark:border-zinc-700
                 text-black dark:text-zinc-100 whitespace-nowrap shrink-0 transition-colors"
    >
      {label}
    </motion.button>
  );
};

/* ---------- MAIN COMPONENT ---------- */

export const InlineOverflow: FC<InlineOverflowProps> = ({
  visibleActions,
  hiddenActions,
  showThemeToggle = true,
}) => {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Theme sync
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-zinc-950 transition-colors duration-500 gap-8 overflow-hidden">
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

      <LayoutGroup>
        <motion.div
          layout
          className="flex items-center gap-2 rounded-full
                     bg-[#F6F5EE] dark:bg-zinc-900 px-2 py-2
                     border border-black/5 dark:border-zinc-800 shadow-sm"
          transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.7 }}
        >
          {/* VISIBLE ACTIONS */}
          {visibleActions.map((action, i) => (
            <Action key={i} label={action.label} />
          ))}

          {/* HIDDEN ACTIONS */}
          <AnimatePresence mode="popLayout">
            {open &&
              hiddenActions.map((action, _i) => (
                <motion.div
                  layout
                  key={action.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Action label={action.label} />
                </motion.div>
              ))}
          </AnimatePresence>

          {/* TOGGLE BUTTON */}
          <motion.button
            layout
            onClick={() => setOpen(!open)}
            whileTap={{ scale: 0.9 }}
            className="flex h-12 w-12 items-center justify-center
                       rounded-full bg-white dark:bg-zinc-800
                       text-neutral-600 dark:text-zinc-400
                       border border-black/5 dark:border-zinc-700
                       hover:opacity-70 shrink-0"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {open ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <IoClose size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="dots"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="font-mono text-base tracking-wider"
                >
                  <HiOutlineDotsHorizontal size={26} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </LayoutGroup>
    </div>
  );
};