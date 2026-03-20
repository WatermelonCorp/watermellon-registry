'use client';

import { useState, type FC } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

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
      initial={{ opacity: 0, scale: 0, filter: 'blur(4px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', bounce: 0.35, duration: 0.7 }}
      className="h-9 shrink-0 cursor-pointer rounded-4xl border border-border bg-card px-4 text-sm font-bold whitespace-nowrap text-foreground transition-colors hover:bg-accent/40 sm:h-12 sm:px-6 sm:text-base"
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
      className="theme-injected no-scrollbar relative flex max-w-full items-center gap-2 overflow-hidden rounded-4xl border border-border bg-muted/40 px-2 py-2 text-foreground shadow-sm font-sans"
      style={{ fontFamily: 'var(--font-sans)' }}
      transition={{ type: 'spring', bounce: 0.35, duration: 0.7 }}
    >
      {visibleActions.map((action, i) => (
        <Action key={i} label={action.label} />
      ))}

      <AnimatePresence mode="popLayout" initial={false}>
        {open &&
          hiddenActions.map((action) => (
            <motion.div
              key={action.label}
              exit={{ opacity: 0, scale: 0, filter: 'blur(4px)' }}
              transition={{ type: 'spring', bounce: 0.35, duration: 0.7 }}
            >
              <Action label={action.label} />
            </motion.div>
          ))}
      </AnimatePresence>
      <motion.button
        layout
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.9 }}
        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-4xl border border-border bg-card text-muted-foreground hover:bg-accent/40 sm:h-12 sm:w-12"
        transition={{ type: 'spring', bounce: 0.35, duration: 0.7 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {open ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, scale: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0, filter: 'blur(4px)' }}
              transition={{ type: 'spring', bounce: 0.35, duration: 0.7 }}
            >
              <IoClose className="size-5 sm:size-6" />
            </motion.div>
          ) : (
            <motion.div
              key="dots"
              initial={{ opacity: 0, scale: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0, filter: 'blur(4px)' }}
              transition={{ type: 'spring', bounce: 0.35, duration: 0.7 }}
              className="font-mono text-base tracking-wider"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <HiOutlineDotsHorizontal className="size-5 sm:size-7" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};
