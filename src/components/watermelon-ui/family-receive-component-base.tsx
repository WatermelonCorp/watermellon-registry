"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  type Transition,
} from "motion/react";
import { X, Fingerprint } from "lucide-react";

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
  type: "spring",
  bounce: 0,
  duration: 0.4,
};

export const FamilyReceiveComponent: React.FC<FamilyReceiveComponentProps> = ({
  triggerLabel = "Receive",
  title = "Confirm",
  description = "Are you sure you want to receive hell load of money?",
  confirmLabel = "Receive",
  cancelLabel = "Cancel",
  onConfirm,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="theme-injected relative h-[400px] w-full overflow-hidden">
      <LayoutGroup>
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              key="trigger"
              layoutId="action-button"
              onClick={() => setIsOpen(true)}
              className="bg-primary text-primary-foreground absolute bottom-0 left-1/2 h-14 w-96 max-w-full -translate-x-1/2 cursor-pointer  text-xl rounded-lg font-medium"
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
              className="absolute inset-0 z-50 flex items-end justify-center px-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ y: 100, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 100, opacity: 0, scale: 0.98 }}
                transition={springTransition}
                className="border-border bg-card text-card-foreground relative w-[520px] max-w-full overflow-hidden rounded-sm border p-6 "
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground absolute top-5 right-5"
                >
                  <X size={24} />
                </button>

                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-primary/10 text-primary rounded-sm flex h-10 w-10 items-center justify-center">
                    {icon ?? <Fingerprint size={28} />}
                  </div>
                  <h2 className="text-card-foreground text-2xl font-semibold">
                    {title}
                  </h2>
                </div>

                <p className="text-muted-foreground my-6 max-w-xs text-xl font-semibold">
                  {description}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-muted text-muted-foreground hover:bg-muted/90 h-13 flex-1 text-lg rounded-lg font-medium"
                  >
                    {cancelLabel}
                  </button>

                  <motion.button
                    layoutId="action-button"
                    onClick={() => {
                      onConfirm?.();
                      setIsOpen(false);
                    }}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 h-13 flex-1 cursor-pointer rounded-lg  text-lg font-medium"
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
