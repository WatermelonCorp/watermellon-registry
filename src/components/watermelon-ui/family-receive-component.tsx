'use client';

import React, { useState } from 'react';
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  type Transition,
} from 'motion/react';
import { X, Fingerprint } from 'lucide-react';

export interface FamilyReceiveComponentProps {
  triggerLabel?: string;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  icon?: React.ReactNode;
}

const springTransition: Transition = {
  type: 'spring',
  bounce: 0,
  duration: 0.4,
};

export const FamilyReceiveComponent: React.FC<FamilyReceiveComponentProps> = ({
  triggerLabel = 'Receive',
  title = 'Confirm',
  description = 'Are you sure you want to receive hell load of money?',
  confirmLabel = 'Receive',
  cancelLabel = 'Cancel',
  onConfirm,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex h-[400px] w-[320px] max-w-full items-center justify-center md:w-[520px]">
      <LayoutGroup>
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              key="trigger"
              layoutId="action-button"
              onClick={() => setIsOpen(true)}
              className="relative h-12 w-64 cursor-pointer rounded-full bg-[#00A6F4] text-lg font-medium text-white shadow-lg md:h-14 md:w-96 md:text-xl"
              whileTap={{ scale: 0.95 }}
              transition={springTransition}
            >
              {triggerLabel}
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex items-center justify-center px-4"
            >
              <motion.div
                initial={{ y: 100, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 100, opacity: 0, scale: 0.98 }}
                transition={springTransition}
                className="relative w-[280px] max-w-full overflow-hidden rounded-[24px] border border-zinc-200 bg-white p-5 text-zinc-900 shadow-2xl md:w-[520px] md:rounded-[32px] md:p-6 dark:border-white/5 dark:bg-[#080808] dark:text-white"
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-5 right-5 text-zinc-400 transition-colors hover:text-zinc-950 dark:text-zinc-500 dark:hover:text-white"
                >
                  <X size={24} />
                </button>

                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-zinc-100 md:h-10 md:w-10 dark:bg-white/10">
                    {icon ?? (
                      <Fingerprint size={28} className="text-[#00A6F4]" />
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-zinc-900 md:text-2xl dark:text-white">
                    {title}
                  </h2>
                </div>

                <p className="my-4 max-w-xs text-lg font-semibold text-zinc-500 md:my-6 md:text-xl dark:text-[#727373]">
                  {description}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="h-11 flex-1 rounded-full bg-zinc-100 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200 md:h-13 md:text-lg dark:bg-[#121212] dark:text-gray-300 dark:hover:bg-[#1a1a1a]"
                  >
                    {cancelLabel}
                  </button>

                  <motion.button
                    layoutId="action-button"
                    onClick={() => {
                      onConfirm?.();
                      setIsOpen(false);
                    }}
                    className="h-11 flex-1 cursor-pointer rounded-full bg-[#00A6F4] text-sm font-medium text-white hover:bg-[#0095db] md:h-13 md:text-lg"
                    transition={springTransition}
                  >
                    {confirmLabel}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
};
