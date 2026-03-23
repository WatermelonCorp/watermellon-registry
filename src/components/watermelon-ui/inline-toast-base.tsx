"use client";

import { useState, type FC } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IoCheckmarkCircle } from "react-icons/io5";

export interface InlineCopyToastProps {
  code: string;
  copyDuration?: number;
}

export const InlineToast: FC<InlineCopyToastProps> = ({
  code,
  copyDuration = 2000,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, copyDuration);
  };

  return (
    <div className="theme-injected bg-background flex flex-col items-center justify-center gap-8 transition-colors duration-500">
      <motion.div
        layout="position"
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="border-border bg-muted relative flex h-16 min-w-[320px] items-center justify-center overflow-hidden rounded-lg border pr-4 pl-7 shadow-sm"
      >
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{
                duration: copyDuration / 1000,
                ease: "linear",
              }}
              className="bg-muted absolute inset-0"
            />
          )}
        </AnimatePresence>

        <div className="z-10 flex w-full items-center justify-between gap-7">
          <AnimatePresence mode="popLayout">
            {!copied ? (
              <motion.div
                key="copy"
                initial={{ opacity: 0, filter: "blur(4px)", scale: 0.95 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(4px)", scale: 0.95 }}
                transition={{
                  type: "spring",
                  bounce: 0,
                  duration: 0.4,
                }}
                className="flex w-full items-center justify-between"
              >
                <span className="text-muted-foreground/50 text-xl font-bold tracking-wide">
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
                  className="bg-background text-foreground relative cursor-pointer overflow-hidden rounded-lg px-[26px] py-2.5 text-base font-semibold shadow-md"
                >
                  <motion.span
                    initial={{ x: "-120%" }}
                    whileHover={{ x: "120%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="via-foreground/10 pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-transparent"
                  />

                  <span className="relative z-10">Copy</span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="copied"
                initial={{ opacity: 0, filter: "blur(4px)", scale: 1.1 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(4px)", scale: 1.1 }}
                transition={{
                  type: "spring",
                  bounce: 0,
                  duration: 0.4,
                }}
                className="text-foreground flex w-full items-center justify-center gap-2"
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
