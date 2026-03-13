"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { HiMinus, HiPlus } from "react-icons/hi";

export interface StepperProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (val: number) => void;
}

const digitVariants = {
  initial: (dir: number) => ({
    y: dir > 0 ? 20 : -20,
    opacity: 0,
    scale: 0.5,
    z: 0,
    filter: "blur(2px)",
  }),
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    z: 10,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    y: dir > 0 ? -20 : 20,
    opacity: 0,
    scale: 0.5,
    z: 0,
    filter: "blur(2px)",
  }),
};

export function Stepper({
  value,
  defaultValue = 0,
  min = 0,
  max = 999,
  onChange,
}: StepperProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const [direction, setDirection] = React.useState(0);

  const current = isControlled ? value! : internal;
  const digits = current.toString().split("");

  const digitTicksRef = React.useRef<number[]>([]);
  const prevDigitsRef = React.useRef<string[]>([]);

  const prevDigits = prevDigitsRef.current;
  const prevTicks = digitTicksRef.current;

  const len = digits.length;
  const prevLen = prevDigits.length;
  // eslint-disable-next-line react-hooks/refs
  const lenDiff = len - prevLen;

  // eslint-disable-next-line react-hooks/refs
  const nextTicks = digits.map((digit, i) => {
    const prevI = i - lenDiff;
    const prevDigit = prevI >= 0 ? prevDigits[prevI] : undefined;
    const prevTick = prevI >= 0 ? prevTicks[prevI] : 0;

    return digit !== prevDigit ? (prevTick ?? 0) + 1 : prevTick ?? 0;
  });

  React.useEffect(() => {
    digitTicksRef.current = nextTicks;
    prevDigitsRef.current = digits;
  }, [nextTicks, digits]);

  const step = (dir: number) => {
    const next = Math.min(max, Math.max(min, current + dir));
    if (next === current) return;
    setDirection(dir);
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="flex items-center gap-3 rounded-full border-2 border-[#E6E6EF] bg-transparent px-1 py-1 shadow-sm sm:gap-5 dark:border-zinc-800">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          onClick={() => step(-1)}
          disabled={current <= min}
          className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#F0EFF6] text-[#5A5A63] disabled:opacity-50 sm:h-14 sm:w-14 dark:bg-zinc-800 dark:text-zinc-400"
        >
          <HiMinus className="h-4 w-4 sm:h-5 sm:w-5" />
        </motion.button>

        <div className="relative flex shrink-0 items-center justify-center gap-1 text-xl font-bold text-[#242426] perspective-midrange transform-3d sm:h-8 sm:text-3xl dark:text-white">
          {digits.map((digit, index) => (
            <div
              key={`${index}-${len}`}
              className="relative w-3 transform-3d sm:h-8 sm:w-4"
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
                  className="absolute inset-0 flex items-center justify-center tabular-nums"
                >
                  {digit}
                </motion.span>
              </AnimatePresence>
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          onClick={() => step(1)}
          disabled={current >= max}
          className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#F0EFF6] text-[#5A5A63] disabled:opacity-50 sm:h-14 sm:w-14 dark:bg-zinc-800 dark:text-zinc-400"
        >
          <HiPlus className="h-4 w-4 sm:h-5 sm:w-5" />
        </motion.button>
      </div>
    </div>
  );
}
