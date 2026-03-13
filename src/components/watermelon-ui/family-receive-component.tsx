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
    <div className="relative h-[400px] w-full overflow-hidden">
      <LayoutGroup>
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              key="trigger"
              layoutId="action-button"
              onClick={() => setIsOpen(true)}
              className="absolute bottom-0 left-1/2 h-14 w-96 max-w-full -translate-x-1/2 rounded-full bg-[#00A6F4] text-xl font-medium text-white cursor-pointer"
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
              className="absolute inset-0 z-50 flex items-end justify-center px-4  backdrop-blur-sm"
            >
              <motion.div
                initial={{ y: 100, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 100, opacity: 0, scale: 0.98 }}
                transition={springTransition}
                className="relative w-[520px] max-w-full overflow-hidden rounded-[32px] border border-white/5 bg-[#080808] p-6 text-white shadow-2xl"
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-5 right-5 text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>

                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00aeef]/10 text-[#00aeef]">
                    {icon ?? <Fingerprint size={28} />}
                  </div>
                  <h2 className="text-2xl font-semibold text-[#EDEDED]">
                    {title}
                  </h2>
                </div>

                <p className="my-6 max-w-xs text-xl font-semibold text-[#727373]">
                  {description}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="h-13 flex-1 rounded-full bg-[#121212] text-lg font-medium text-gray-300 hover:bg-zinc-800"
                  >
                    {cancelLabel}
                  </button>

                  <motion.button
                    layoutId="action-button"
                    onClick={() => {
                      onConfirm?.();
                      setIsOpen(false);
                    }}
                    className="h-13 flex-1 rounded-full bg-[#00A6F4] text-lg font-medium text-white hover:bg-[#0095db] cursor-pointer"
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
