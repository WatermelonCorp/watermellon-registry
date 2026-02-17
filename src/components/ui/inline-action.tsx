import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface InlineActionProps {
  label: string;
  icon: React.ReactNode;
  actionText: string;
  onAction: () => Promise<void>;
  theme?: "light" | "dark" | "system";
  className?: string;
}

export const InlineAction: React.FC<InlineActionProps> = ({
  label,
  icon,
  actionText,
  onAction,
  theme = "system",
  className,
}) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleTrigger = async () => {
    if (status !== "idle") return;
    setStatus("loading");
    try {
      await onAction();
      setStatus("success");
    } catch (error) {
      setStatus("idle");
    }
  };

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => setStatus("idle"), 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const springTransition = {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 0.8,
  } as const;

  const forcedTheme = theme === "dark" ? "dark" : theme === "light" ? "light" : "";

  return (
    <div className={cn("flex items-center justify-center w-full px-4", forcedTheme, className)}>
      <motion.div
        layout
        transition={springTransition}
        className="flex items-center bg-white dark:bg-zinc-900 border-[1.5px] border-[#F0F0F0] dark:border-zinc-800 shadow-sm rounded-full p-1.25 w-full max-w-100 justify-between transition-colors duration-300 overflow-hidden"
      >
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-3 px-1 sm:px-2 min-w-0">
          <div className="shrink-0 text-[#1F1F1F] dark:text-zinc-100 bg-[#F0F0F0] dark:bg-zinc-800 p-2.5 sm:p-3.5 rounded-full flex items-center justify-center transition-colors">
            <div className="scale-90 sm:scale-100">
                {icon}
            </div>
          </div>
          <span className="font-bold text-[#000000] dark:text-white text-[15px] sm:text-[18px] transition-colors truncate">
            {label}
          </span>
        </div>

        {/* Right Section */}
        <div className={cn(
            "flex justify-end pr-1 transition-all duration-300",
            status === "success" ? "w-12.5" : "w-25 sm:w-30"
        )}>
          <AnimatePresence mode="popLayout">
            {status === "idle" && (
              <motion.button
                key="idle"
                initial={{ opacity: 0, filter: "blur(8px)", scale: 0.9 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(8px)", scale: 0.9 }}
                transition={springTransition}
                onClick={handleTrigger}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#F0F0F0] dark:bg-zinc-800 hover:bg-[#EAEAEA] dark:hover:bg-zinc-700 text-[#000000] dark:text-white font-bold py-2 rounded-full text-[13px] sm:text-[15px] transition-colors whitespace-nowrap px-2"
              >
                {actionText}
              </motion.button>
            )}

            {status === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, filter: "blur(8px)", scale: 0.8 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(8px)", scale: 0.8 }}
                transition={springTransition}
                className="w-full h-8.5 sm:h-9.5 bg-[#F0F0F0] dark:bg-zinc-800 rounded-full flex items-center justify-center px-4 transition-colors"
              >
                <div className="h-1.5 w-full bg-[#212121] dark:bg-zinc-600 rounded-full overflow-hidden relative">
                  <motion.div
                    className="absolute top-0 bottom-0 my-[0.5px] w-[30%] bg-[#F0F0F0] dark:bg-zinc-300 rounded-full"
                    initial={{ left: "0%" }}
                    animate={{ left: "65%" }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            )}

            {status === "success" && (
              <motion.div
                key="success"
                initial={{ scale: 0, filter: "blur(10px)" }}
                animate={{ scale: 1, filter: "blur(0px)" }}
                exit={{ scale: 0, filter: "blur(10px)" }}
                transition={springTransition}
                className="relative overflow-hidden w-9 h-8.5 sm:w-10 sm:h-9.5 bg-[#050505] dark:bg-white rounded-full flex items-center justify-center transition-colors"
              >
                <motion.div
                  initial={{ x: "-150%" }}
                  animate={{ x: "150%" }}
                  transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/50 dark:via-black/20 to-transparent skew-x-[-20deg] z-10"
                />
                
                <motion.svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-white dark:text-black sm:w-4.5 sm:h-4.5"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <polyline points="20 6 9 17 4 12" />
                </motion.svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};