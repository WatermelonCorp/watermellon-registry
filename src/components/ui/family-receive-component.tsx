"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Fingerprint } from "lucide-react";

interface FamilyReceiveComponentProps {
  triggerLabel?: string;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  icon?: React.ReactNode;
}

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
    <div className="flex h-screen  w-full items-end pb-44 justify-center bg-[#1a1a1a] font-sans">
      {/* Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            layoutId="action-button"
            onClick={() => setIsOpen(true)}
            className="h-14 w-96 rounded-full bg-[#00A6F4] text-xl font-normal text-white shadow-lg"
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {triggerLabel}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom Sheet */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end pb-40 justify-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-[520px] overflow-hidden rounded-[32px] bg-[#080808] p-6 text-white border border-white/5"
            >
              {/* Close */}
              <button
                title="close"
                onClick={() => setIsOpen(false)}
                className="absolute right-5 top-5 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00aeef]/10 text-[#00aeef]">
                  {icon ?? <Fingerprint size={28} />}
                </div>
                <h2 className="text-2xl font-semibold text-[#EDEDED]">
                  {title}
                </h2>
              </div>

              {/* Content */}
              <p className="my-6 text-xl max-w-xs font-semibold text-[#727373] leading-snug">
                {description}
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 h-[52px] rounded-full bg-[#121212] text-lg font-medium text-gray-300"
                >
                  {cancelLabel}
                </button>

                <motion.button
                  layoutId="action-button"
                  onClick={() => {
                    onConfirm?.();
                    setIsOpen(false);
                  }}
                  className="flex-1 h-[52px] rounded-full bg-[#00A6F4] text-lg font-medium text-white"
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                  {confirmLabel}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
