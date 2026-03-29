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
    <div className="theme-injected relative flex h-[400px] w-[320px] max-w-full items-center justify-center md:w-[520px]">
      <LayoutGroup>
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              key="trigger"
              layoutId="action-button"
              onClick={() => setIsOpen(true)}
              className="bg-primary text-primary-foreground relative h-12 w-64 cursor-pointer rounded-lg text-lg font-medium shadow-lg md:h-14 md:w-96 md:text-xl"
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
              className="absolute inset-0 z-10 flex items-center justify-center px-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ y: 100, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 100, opacity: 0, scale: 0.98 }}
                transition={springTransition}
                className="border-border bg-card text-card-foreground relative w-[280px] max-w-full overflow-hidden rounded-sm border p-5 md:w-[520px] md:p-6"
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground absolute top-5 right-5"
                >
                  <X size={24} />
                </button>

                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-sm md:h-10 md:w-10">
                    {icon ?? <Fingerprint size={28} />}
                  </div>
                  <h2 className="text-card-foreground text-xl font-semibold md:text-2xl">
                    {title}
                  </h2>
                </div>

                <p className="text-muted-foreground my-4 max-w-xs text-lg font-semibold md:my-6 md:text-xl">
                  {description}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-muted text-muted-foreground hover:bg-muted/90 h-11 flex-1 rounded-lg text-base font-medium md:h-13 md:text-lg"
                  >
                    {cancelLabel}
                  </button>

                  <motion.button
                    layoutId="action-button"
                    onClick={() => {
                      onConfirm?.();
                      setIsOpen(false);
                    }}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 flex-1 cursor-pointer rounded-lg text-base font-medium md:h-13 md:text-lg"
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
