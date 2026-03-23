"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { X, ArrowRight } from "lucide-react";

export interface PasteData {
  name: string;
  image: string;
}

interface QuickPasteProps {
  onPaste: (value: string) => PasteData | null;
  onClear?: () => void;
  onContinue?: (data: PasteData) => void;
  placeholder?: string;
  submitText?: string;
  className?: string;
}

export const QuickPaste: React.FC<QuickPasteProps> = ({
  onPaste,
  onClear,
  onContinue,
  placeholder = "Email Address",
  submitText = "Paste",
  className = "",
}) => {
  const [pastedData, setPastedData] = useState<PasteData | null>(null);
  const [inputValue, setInputValue] = useState("");

  const handlePaste = () => {
    const data = onPaste(inputValue);
    if (data) {
      setPastedData(data);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handlePaste();
    }
  };

  const handleClear = () => {
    setPastedData(null);
    setInputValue("");
    onClear?.();
  };

  const springConfig = { type: "spring" as const, bounce: 0.1, duration: 0.4 };

  return (
    <div
      className={`theme-injected flex w-full flex-col items-center justify-center p-4 antialiased select-none ${className}`}
    >
      <div className="w-full max-w-100">
        <LayoutGroup>
          <motion.div
            layout
            transition={springConfig}
            className="bg-muted flex min-h-16 items-center rounded-lg p-1.5 shadow-sm transition-colors duration-300"
          >
            <AnimatePresence mode="popLayout">
              {pastedData ? (
                <motion.div
                  key="pasted"
                  className="flex w-full items-center justify-between pr-1"
                >
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      filter: "blur(4px)",
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      filter: "blur(4px)",
                      x: -20,
                    }}
                    transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                    className="border-border bg-background flex items-center rounded-lg border py-1.5 pr-4 pl-1.5 shadow-sm transition-colors"
                  >
                    <img
                      src={pastedData.image}
                      alt={pastedData.name}
                      className="border-border mr-3 h-9 w-9 rounded-lg border object-cover shadow-sm"
                    />
                    <span className="text-muted-foreground mr-3 max-w-30 truncate text-[15px] font-bold tracking-tight transition-colors sm:max-w-none sm:text-[16px]">
                      {pastedData.name}
                    </span>
                    <button
                      title="remove"
                      onClick={handleClear}
                      className="bg-muted text-foreground hover:bg-destructive hover:text-destructive-foreground flex h-5 w-5 items-center justify-center rounded-lg transition-colors"
                    >
                      <X size={14} strokeWidth={3} />
                    </button>
                  </motion.div>

                  <motion.button
                    title="continue"
                    layoutId="shared-action-button"
                    transition={springConfig}
                    style={{ borderRadius: 9999 }}
                    onClick={() => onContinue?.(pastedData)}
                    className="bg-foreground text-background ml-2 flex h-11 w-11 shrink-0 items-center justify-center shadow-lg active:scale-95"
                  >
                    <motion.div
                      layout="position"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center"
                    >
                      <ArrowRight size={22} strokeWidth={2.5} />
                    </motion.div>
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, filter: "blur(4px)", x: 0 }}
                  animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                  exit={{ opacity: 0, filter: "blur(4px)", x: 0 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                  className="flex w-full items-center justify-between pr-1 pl-4"
                >
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="text-foreground placeholder:text-muted-foreground mr-2 w-full border-none bg-transparent text-[16px] font-semibold transition-colors outline-none sm:text-[18px]"
                  />
                  <motion.button
                    layoutId="shared-action-button"
                    type="button"
                    transition={springConfig}
                    style={{ borderRadius: 9999 }}
                    onClick={handlePaste}
                    className="bg-primary text-primary-foreground flex h-11 shrink-0 items-center justify-center px-5 text-[14px] font-bold tracking-tight shadow-md hover:opacity-90 active:scale-95 sm:px-7 sm:text-[15px]"
                  >
                    <motion.span
                      layout="position"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="whitespace-nowrap"
                    >
                      {submitText}
                    </motion.span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
};
