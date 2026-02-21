"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";

export interface PaginationProps {
  totalPages?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (page: number) => void;
}

const digitVariants = {
  initial: (dir: number) => ({
    y: dir > 0 ? 20 : -20,
    opacity: 0,
    scale: 0.5,
    filter: "blur(2px)",
  }),
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    y: dir > 0 ? -20 : 20,
    opacity: 0,
    scale: 0.5,
    filter: "blur(2px)",
  }),
};

export function Pagination({
  totalPages = 15,
  value,
  defaultValue = 1,
  onChange,
}: PaginationProps) {
  const isControlled = value !== undefined;

  const [internalPage, setInternalPage] = React.useState(defaultValue);
  const [direction, setDirection] = React.useState(0);

  const currentPage = isControlled ? value! : internalPage;

  const digits = currentPage.toString().split("");

  const digitTicksRef = React.useRef<number[]>([]);
  const prevDigitsRef = React.useRef<string[]>([]);

  const prevDigits = prevDigitsRef.current;
  const prevTicks = digitTicksRef.current;

  const len = digits.length;
  const prevLen = prevDigits.length;
  const lenDiff = len - prevLen;

  const nextTicks = digits.map((digit, i) => {
    const prevI = i - lenDiff;
    const prevDigit = prevI >= 0 ? prevDigits[prevI] : undefined;
    const prevTick = prevI >= 0 ? prevTicks[prevI] : 0;

    return digit !== prevDigit ? (prevTick ?? 0) + 1 : prevTick ?? 0;
  });

  digitTicksRef.current = nextTicks;
  prevDigitsRef.current = digits;

  const paginate = (dir: number) => {
    const next = Math.min(totalPages, Math.max(1, currentPage + dir));

    if (next === currentPage) return;

    setDirection(dir);

    if (!isControlled) {
      setInternalPage(next);
    }

    onChange?.(next);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="flex items-center gap-2 rounded-full border border-[#f0eff6dd] bg-[#F0EFF6] px-1 py-1 sm:gap-3 dark:border-zinc-800 dark:bg-zinc-900">
        <motion.button
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          onClick={() => paginate(-1)}
          disabled={currentPage === 1}
          className={`flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#030303] shadow transition-colors duration-200 hover:bg-zinc-800 hover:text-zinc-100 sm:h-14 sm:w-14 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-800 hover:dark:text-zinc-100 ${
            currentPage === 1
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
        >
          <HiOutlineArrowLeft className="h-5 w-5 sm:h-7 sm:w-7" />
        </motion.button>

        <div className="mr-1 flex items-center pr-1 text-base font-bold text-[#59585F] select-none sm:text-xl dark:text-zinc-400">
          <div className="flex h-7 items-center justify-center sm:h-8">
            {digits.map((digit, index) => (
              <div
                key={`${index}-${len}`}
                className="relative h-7 overflow-hidden w-[1ch]"
              >
                <AnimatePresence
                  mode="popLayout"
                  initial={false}
                  custom={direction}
                >
                  <motion.span
                    key={nextTicks[index]}
                    custom={direction}
                    variants={digitVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 16,
                      mass: 1.2,
                    }}
                    className="absolute inset-0 flex items-center justify-center text-zinc-600 tabular-nums dark:text-zinc-200"
                  >
                    {digit}
                  </motion.span>
                </AnimatePresence>
              </div>
            ))}
          </div>

          <span className="ml-1 flex h-7 items-center sm:h-8 dark:text-zinc-300">
            of {totalPages}
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          onClick={() => paginate(1)}
          disabled={currentPage === totalPages}
          className={`flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#030303] shadow transition-colors duration-200 hover:bg-zinc-800 hover:text-zinc-100 sm:h-14 sm:w-14 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-800 hover:dark:text-zinc-100 ${
            currentPage === 1
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
        >
          <HiOutlineArrowRight className="h-5 w-5 sm:h-7 sm:w-7" />
        </motion.button>
      </div>
    </div>
  );
}
