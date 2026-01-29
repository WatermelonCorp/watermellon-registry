"use client";

import { useState, useEffect, type FC } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { Sun, Moon } from "lucide-react";

/* --- Types --- */

export interface InlineCopyToastProps {
  code: string;
  copyDuration?: number;
}

/* --- Component --- */

export const InlineToast: FC<InlineCopyToastProps> = ({
  code,
  copyDuration = 2000,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);

  // Theme Sync logic
  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, copyDuration);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-zinc-950 transition-colors duration-500 gap-8">
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all active:scale-90 shadow-sm"
      >
        {isDark ? (
          <Sun className="text-yellow-400" size={20} />
        ) : (
          <Moon className="text-zinc-500" size={20} />
        )}
      </button>

      <motion.div
        layout="position"
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="relative flex h-16 min-w-[320px] items-center justify-center overflow-hidden rounded-full border border-[#ecebeb2b] bg-[#F6F6F6] dark:bg-zinc-900 pl-7 pr-4 shadow-sm"
      >
        {/* Background loading */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{
                duration: 2,
                ease: "linear",
              }}
              className="absolute inset-0 bg-[#F0F0F0] dark:bg-zinc-800"
            />
          )}
        </AnimatePresence>

        {/* CONTENT */}
        <div className="relative z-10 flex w-full items-center justify-between gap-7">
          <AnimatePresence mode="wait">
            {!copied ? (
              <motion.div
                key="copy"
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.25 }}
                className="flex w-full items-center justify-between"
              >
                <span className="text-xl font-bold tracking-wide text-[#868686] dark:text-zinc-500">
                  {code}
                </span>

                <motion.button
                  onClick={handleCopy}
                  whileHover={{ y: -1, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 18,
                  }}
                  className="relative overflow-hidden rounded-full bg-[#FEFEFE] dark:bg-zinc-100 px-[26px] py-2.5 text-base font-semibold text-black cursor-pointer shadow-[0_6px_12px_rgba(0,0,0,0.08)]"
                >
                  <motion.span
                    initial={{ x: "-120%" }}
                    whileHover={{ x: "120%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent"
                  />

                  <span className="relative z-10">Copy</span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="copied"
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex w-full items-center justify-center gap-2 text-black dark:text-white"
              >
                <IoCheckmarkCircle size={28} />
                <span className="text-lg font-bold">Code Copied!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};