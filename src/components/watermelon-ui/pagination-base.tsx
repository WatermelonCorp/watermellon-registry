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

  const [prevDigits, setPrevDigits] = React.useState<string[]>([]);
  const [prevTicks, setPrevTicks] = React.useState<number[]>([]);

  const len = digits.length;
  const lenDiff = len - prevDigits.length;

  const nextTicks = digits.map((digit, i) => {
    const prevI = i - lenDiff;
    const prevDigit = prevI >= 0 ? prevDigits[prevI] : undefined;
    const prevTick = prevI >= 0 ? prevTicks[prevI] : 0;

    return digit !== prevDigit ? (prevTick ?? 0) + 1 : (prevTick ?? 0);
  });

  React.useEffect(() => {
    setPrevTicks(nextTicks);
    setPrevDigits(digits);
  }, [digits, nextTicks]);

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
    <div className="theme-injected flex w-full justify-center">
      <div className="border-border bg-muted flex items-center gap-2 rounded-lg border px-1 py-1 sm:gap-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          onClick={() => paginate(-1)}
          disabled={currentPage === 1}
          className={`bg-background dark:bg-foreground dark:text-background dark:hover:bg-foreground/80 text-foregroundhover:text-foreground/80 hover:text-accent-foreground flex h-11 w-11 items-center justify-center rounded-lg shadow transition-colors duration-200 sm:h-14 sm:w-14 ${
            currentPage === 1
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
        >
          <HiOutlineArrowLeft className="h-5 w-5 sm:h-7 sm:w-7" />
        </motion.button>

        <div className="text-muted-foreground mr-1 flex items-center pr-1 text-base font-bold select-none sm:text-xl">
          <div className="flex h-7 items-center justify-center sm:h-8">
            {digits.map((digit, index) => (
              <div
                key={`${index}-${len}`}
                className="relative h-7 w-[1ch] overflow-hidden"
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
                    className="text-muted-foreground absolute inset-0 flex items-center justify-center tabular-nums"
                  >
                    {digit}
                  </motion.span>
                </AnimatePresence>
              </div>
            ))}
          </div>

          <span className="text-muted-foreground ml-1 flex h-7 items-center sm:h-8">
            of {totalPages}
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          onClick={() => paginate(1)}
          disabled={currentPage === totalPages}
          className={`bg-background dark:bg-foreground dark:text-background dark:hover:bg-foreground/80 text-foreground hover:bg-background/80 hover:text-foreground/80 flex h-11 w-11 items-center justify-center rounded-lg shadow transition-colors duration-200 sm:h-14 sm:w-14 ${
            currentPage === totalPages
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
