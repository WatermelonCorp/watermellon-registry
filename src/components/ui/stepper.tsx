"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMinus, HiPlus } from "react-icons/hi";

export interface StepperProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (val: number) => void;
}

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

  const step = (dir: number) => {
    const next = Math.min(max, Math.max(min, current + dir));
    if (next === current) return;

    setDirection(dir);
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const digits = current.toString().split("");

  return (
    <div className="flex justify-center w-full">
      <div
        className="flex items-center gap-3 sm:gap-5
        px-1 py-1 rounded-full bg-transparent
        border-2 border-[#E6E6EF] dark:border-zinc-800 shadow-sm"
      >
        {/* Minus */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          onClick={() => step(-1)}
          disabled={current <= min}
          className="w-11 h-11 sm:w-14 sm:h-14
          rounded-full bg-[#F0EFF6] dark:bg-zinc-800
          text-[#5A5A63] dark:text-zinc-400
          flex items-center justify-center shrink-0
          disabled:opacity-50"
        >
          <HiMinus className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>

        {/* Digits */}
        <div
          className="relative h-7 sm:h-8
          flex items-center justify-center
          text-xl sm:text-2xl font-bold
          text-[#242426] dark:text-white shrink-0"
        >
          {digits.map((digit, index) => (
            <div
              key={`${index}-${digits.length}`}
              className="relative w-3 sm:w-4 h-7 sm:h-8 overflow-hidden"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={digit}
                  initial={{
                    y: direction > 0 ? 12 : -12,
                    opacity: 0,
                    filter: "blur(2px)",
                  }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{
                    y: direction > 0 ? -12 : 12,
                    opacity: 0,
                    filter: "blur(2px)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 22,
                    mass: 0.45,
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {digit}
                </motion.span>
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Plus */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          onClick={() => step(1)}
          disabled={current >= max}
          className="w-11 h-11 sm:w-14 sm:h-14
          rounded-full bg-[#F0EFF6] dark:bg-zinc-800
          text-[#5A5A63] dark:text-zinc-400
          flex items-center justify-center shrink-0
          disabled:opacity-50"
        >
          <HiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      </div>
    </div>
  );
}
