'use client';

import { useState, type FC } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IoCheckmarkCircle } from 'react-icons/io5';

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
    <motion.div
      layout="position"
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="relative flex h-16 min-w-[320px] items-center justify-center overflow-hidden rounded-full border border-[#ecebeb2b] bg-[#F6F6F6] pl-7 pr-2 shadow-sm dark:bg-zinc-900"
    >
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{
              duration: copyDuration / 1000,
              ease: 'linear',
            }}
            className="absolute inset-0 bg-[#F0F0F0] dark:bg-zinc-800"
          />
        )}
      </AnimatePresence>

      <div className="z-10 flex w-full items-center justify-between gap-7">
        <AnimatePresence mode="popLayout">
          {!copied ? (
            <motion.div
              key="copy"
              initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.95 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.95 }}
              transition={{
                type: 'spring',
                bounce: 0,
                duration: 0.4,
              }}
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
                  type: 'spring',
                  stiffness: 350,
                  damping: 18,
                }}
                className="relative cursor-pointer overflow-hidden rounded-full bg-[#FEFEFE] px-[26px] py-2.5 text-base font-semibold text-black shadow-[0_6px_12px_rgba(0,0,0,0.08)] dark:bg-zinc-100"
              >
                <motion.span
                  initial={{ x: '-120%' }}
                  whileHover={{ x: '120%' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-black/5 to-transparent"
                />

                <span className="relative z-10">Copy</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="copied"
              initial={{ opacity: 0, filter: 'blur(4px)', scale: 1.1 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(4px)', scale: 1.1 }}
              transition={{
                type: 'spring',
                bounce: 0,
                duration: 0.4,
              }}
              className="flex w-full items-center justify-center gap-2 text-black dark:text-white"
            >
              <IoCheckmarkCircle size={28} />
              <span className="text-lg font-bold">Code Copied!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
