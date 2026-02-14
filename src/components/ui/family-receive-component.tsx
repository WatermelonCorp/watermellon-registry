"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Fingerprint } from "lucide-react";

/* ---------- Types ---------- */
export interface FamilyReceiveComponentProps {
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
    <div className="flex h-96 w-full items-end pb-44 justify-center bg-transparent font-sans px-4">
      {/* Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            layoutId="action-button"
            onClick={() => setIsOpen(true)}
            className="h-14 w-96 max-w-full rounded-full bg-[#00A6F4] text-xl font-normal text-white shadow-lg"
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {triggerLabel}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom Sheet Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-999 flex items-end pb-40 justify-center w-full px-4 bg-black/20 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-130 max-w-full overflow-hidden rounded-[32px] bg-[#080808] p-6 text-white border border-white/5 shadow-2xl"
            >
              {/* Close Button */}
              <button
                type="button"
                title="close"
                onClick={() => setIsOpen(false)}
                className="absolute right-5 top-5 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00aeef]/10 text-[#00aeef]">
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
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 h-13 rounded-full bg-[#121212] text-lg font-medium text-gray-300 hover:bg-zinc-800 transition-colors"
                >
                  {cancelLabel}
                </button>

                <motion.button
                  layoutId="action-button"
                  type="button"
                  onClick={() => {
                    onConfirm?.();
                    setIsOpen(false);
                  }}
                  className="flex-1 h-13 rounded-full bg-[#00A6F4] text-lg font-medium text-white hover:bg-[#0095db] transition-colors"
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