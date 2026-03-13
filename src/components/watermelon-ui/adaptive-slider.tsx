"use client";

import { useState, useMemo, type FC, type ChangeEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

interface AdaptiveSliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

interface ColorSettings {
  text: string;
  gradient: string;
  thumbBorder: string;
}

const DEFAULT_MIN = 50;
const DEFAULT_MAX = 350;
const DEFAULT_STEP = 25;
const DEFAULT_VALUE = 200;

const getColorSettings = (
  value: number,
  min: number,
  max: number
): ColorSettings => {
  const percentage = (value - min) / (max - min);

  if (percentage < 0.5) {
    return {
      text: "#10B981",
      gradient: "linear-gradient(to right, #FEB101, #FE7C09)",
      thumbBorder: "#10B981",
    };
  } else if (percentage < 0.7) {
    return {
      text: "#FE55B7",
      gradient: "linear-gradient(to right, #FE55B74D, #FE55B7)",
      thumbBorder: "#F97316",
    };
  } else {
    return {
      text: "#D946EF",
      gradient: "linear-gradient(to right, #DAB0FE, #4946FF)",
      thumbBorder: "#D946EF",
    };
  }
};

export const AdaptiveSlider: FC<AdaptiveSliderProps> = ({
  value,
  min = DEFAULT_MIN,
  max = DEFAULT_MAX,
  step = DEFAULT_STEP,
  defaultValue = DEFAULT_VALUE,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState<number>(defaultValue);

  const calories = value ?? internalValue;

  const colorSettings = useMemo(
    () => getColorSettings(calories, min, max),
    [calories, min, max]
  );

  const percentage = ((calories - min) / (max - min)) * 100;

  const dots = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="z-30 h-1.5 w-1.5 rounded-full bg-[#C4B9FA] transition-colors dark:bg-neutral-600"
          style={{ opacity: 0.8 }}
        />
      )),
    []
  );

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setInternalValue(val);
    onChange?.(val);
  };

  return (
    <motion.div className="flex h-[60vh] w-xs flex-col items-center justify-center rounded-[36px] bg-[#FEFEFE] p-6 shadow-2xl shadow-black/5 transition-colors select-none sm:w-sm sm:p-12 dark:bg-neutral-900 dark:shadow-none">
      <span className="mb-2 text-xl font-bold text-[#878787] sm:text-2xl dark:text-neutral-500">
        Calories
      </span>

      <div className="mb-8 flex items-baseline gap-2">
        <AnimatedText
          value={calories.toString()}
          className="overflow-hidden text-5xl font-extrabold tracking-tight sm:text-6xl"
        />
        <motion.span
          layout
          className="text-4xl font-extrabold text-[#010101] transition-colors sm:text-5xl dark:text-neutral-100"
        >
          kCal
        </motion.span>
      </div>

      <div className="group relative flex h-13 w-full items-center overflow-hidden rounded-full bg-[#f1f3f5] transition-colors dark:bg-neutral-800">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4 transition-colors sm:px-8">
          {dots}
        </div>

        <motion.div
          className="pointer-events-none absolute top-0 left-0 h-full rounded-full"
          animate={{
            width: `calc((${percentage} / 100) * (100% - 52px) + 52px)`,
            background: colorSettings.gradient,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        <input
          title="range"
          type="range"
          min={min}
          max={max}
          step={step}
          value={calories}
          onChange={handleSliderChange}
          className="absolute inset-0 z-50 h-13 w-full cursor-pointer opacity-0"
        />

        <motion.div
          className="pointer-events-none absolute top-0 z-40 flex size-13 items-center justify-center rounded-full border-none"
          animate={{
            left: `calc((${percentage} / 100) * (100% - 52px))`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="size-10 rounded-full bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const AnimatedText = ({
  value,
  className,
}: {
  value: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex text-lg tracking-tight will-change-transform",
        className
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {value.split("").map((char, index) => {
          const displayChar = char === " " ? "\u00A0" : char;

          return (
            <motion.span
              key={char + index}
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  // delay: 0.03 * index,
                },
              }}
              exit={{ opacity: 0, y: 0, scale: 1, transition: { duration: 0 } }}
            >
              {displayChar}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
