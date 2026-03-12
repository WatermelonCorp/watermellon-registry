"use client";

import { useState, type FC } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

export interface InlineOverflowAction {
  label: string;
}

export interface InlineOverflowProps {
  visibleActions: InlineOverflowAction[];
  hiddenActions: InlineOverflowAction[];
  showThemeToggle?: boolean;
}

const Action: FC<{ label: string }> = ({ label }) => {
  return (
    <motion.button
      layout="position"
      initial={{ opacity: 0, scale: 0, filter: "blur(4px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", bounce: 0.35, duration: 0.7 }}
      className="curosr-pointer h-9 shrink-0 cursor-pointer rounded-full border border-black/5 bg-white px-3.5 text-sm font-bold whitespace-nowrap text-neutral-950 transition-colors sm:h-12 sm:px-6 sm:text-base dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
    >
      {label}
    </motion.button>
  );
};

export const InlineOverflow: FC<InlineOverflowProps> = ({
  visibleActions,
  hiddenActions,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className="no-scrollbar relative flex max-w-[calc(100vw-1.5rem)] items-center gap-1.5 overflow-hidden border border-black/5 bg-[#F6F5EE] px-1.5 py-1.5 shadow-sm sm:gap-2 sm:px-2 sm:py-2 dark:border-neutral-800 dark:bg-neutral-900"
      style={{
        borderRadius: 32,
      }}
      transition={{ type: "spring", bounce: 0.35, duration: 0.7 }}
    >
      {visibleActions.map((action, i) => (
        <Action key={i} label={action.label} />
      ))}

      <AnimatePresence mode="popLayout" initial={false}>
        {open &&
          hiddenActions.map((action) => (
            <motion.div
              key={action.label}
              exit={{ opacity: 0, scale: 0, filter: "blur(4px)" }}
              transition={{ type: "spring", bounce: 0.35, duration: 0.7 }}
            >
              <Action label={action.label} />
            </motion.div>
          ))}
      </AnimatePresence>
      <motion.button
        layout
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.9 }}
        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-white text-neutral-600 hover:opacity-70 sm:h-12 sm:w-12 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
        transition={{ type: "spring", bounce: 0.35, duration: 0.7 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {open ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, scale: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0, filter: "blur(4px)" }}
              transition={{ type: "spring", bounce: 0.35, duration: 0.7 }}
            >
              <IoClose className="size-5 sm:size-6" />
            </motion.div>
          ) : (
            <motion.div
              key="dots"
              initial={{ opacity: 0, scale: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0, filter: "blur(4px)" }}
              transition={{ type: "spring", bounce: 0.35, duration: 0.7 }}
              className="font-mono text-base tracking-wider"
            >
              <HiOutlineDotsHorizontal className="size-5 sm:size-7" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};
