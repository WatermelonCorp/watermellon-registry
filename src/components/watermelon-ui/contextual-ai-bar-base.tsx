'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export interface ContextualAIBarProps {
  defaultExpanded?: boolean;
  placeholder?: string;
  tools?: React.ReactNode[];
  musicIcon: React.ReactNode;
  sparkleIcon: React.ReactNode;
}

export const ContextualAIBar: React.FC<ContextualAIBarProps> = ({
  defaultExpanded = false,
  placeholder = 'Refine with AI',
  tools = [],
  musicIcon,
  sparkleIcon,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const spring = {
    type: 'spring',
    stiffness: 220,
    damping: 16,
    mass: 1.2,
  } as const;

  return (
    <motion.div
      layout
      transition={spring}
      className="theme-injected relative flex w-full max-w-[calc(100vw-32px)] sm:max-w-md items-center justify-between overflow-hidden rounded-4xl border border-border bg-card p-1 font-sans shadow-sm"
    >
      <motion.div
        layout
        className="flex shrink-0 items-center gap-1 rounded-4xl bg-background p-1 shadow-md"
      >
        <motion.button
          onClick={() => setIsExpanded(false)}
          whileTap={{ scale: 0.9 }}
          className="relative rounded-4xl p-2.5 outline-none"
        >
          {!isExpanded && (
            <motion.div
              layoutId="active-pill"
              transition={spring}
              className="absolute inset-0 rounded-4xl bg-muted"
            />
          )}

          <div className="relative z-10">{musicIcon}</div>
        </motion.button>

        <motion.button
          onClick={() => setIsExpanded(true)}
          whileTap={{ scale: 0.9 }}
          className="relative rounded-4xl p-2.5 outline-none"
        >
          {isExpanded && (
            <motion.div
              layoutId="active-pill"
              transition={spring}
              className="absolute inset-0 rounded-4xl bg-muted"
            />
          )}

          <div className="relative z-10">{sparkleIcon}</div>
        </motion.button>
      </motion.div>

      <AnimatePresence mode="popLayout" initial={false}>
        {!isExpanded ? (
          <motion.div
            key="tools"
            initial={{ opacity: 0, filter: 'blur(4px)', x: 22 }}
            animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
            exit={{ opacity: 0, filter: 'blur(4px)', x: 30 }}
            transition={spring}
            className="flex flex-1 items-center justify-end gap-3 sm:gap-5 px-4"
          >
            {tools.map((tool, index) => (
              <ToolIcon key={index}>{tool}</ToolIcon>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={spring}
            className="flex flex-1 items-center gap-1 sm:gap-2 pl-2 sm:pl-4"
          >
            <input
              autoFocus
              type="text"
              placeholder={placeholder}
              className="w-full flex-1 border-none bg-transparent font-sans text-lg sm:text-xl text-foreground placeholder:text-muted-foreground outline-none"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              transition={spring}
              className="shrink-0 rounded-4xl border border-border bg-background p-2.5 sm:p-3 text-foreground shadow-md transition-colors hover:bg-muted"
            >
              <ArrowRight size={20} className="sm:w-[22px] sm:h-[22px]" strokeWidth={2.5} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ToolIcon = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.92 }}
    transition={{
      type: 'spring',
      stiffness: 300,
      damping: 26,
      mass: 1.1,
    }}
    className="cursor-pointer text-foreground"
  >
    {children}
  </motion.div>
);
