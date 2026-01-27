"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { Sun, MoonIcon } from "lucide-react";

/*  Types  */

interface FractionalPickerProps {
  min?: number;
  max?: number;
  initialValue?: number;
  onChange?: (val: number) => void;
  containerWidth?: number;
  itemWidth?: number;
}

/*  Constants  */

const TICK_COUNT_PER_INTERVAL = 10;

/*  Ruler Item  */

const RulerItem: React.FC<{
  num: number;
  x: any;
  itemWidth: number;
  centerOffset: number;
}> = ({ num, x, itemWidth, centerOffset }) => {
  const distance = useTransform(x, (latestX: number) => {
    const itemPos = num * itemWidth + latestX + centerOffset;
    return Math.abs(itemPos - centerOffset);
  });

  const scale = useTransform(distance, [0, itemWidth * 1.5], [1.1, 0.85]);
  const opacity = useTransform(distance, [0, itemWidth * 2], [1, 0.8]);

  /* light / dark aware text color */
  const color = useTransform(distance, [0, itemWidth], [
    "rgb(148,163,184)" ,   
    "rgb(148,163,184)", 
  ]);

  const fontWeight = useTransform(distance, [0, itemWidth / 2], [600, 400]);

  return (
    <div
      className="flex flex-col items-center flex-shrink-0"
      style={{ width: itemWidth }}
    >
      <motion.span
        className="text-[26px] select-none pointer-events-none mb-6 tabular-nums
                   dark:text-red-100"
        style={{ scale, opacity, color, fontWeight: fontWeight as any }}
      >
        {num}
      </motion.span>

      {/* Ticks */}
      <div className="flex w-full justify-between items-end px-[1px]">
        {Array.from({ length: TICK_COUNT_PER_INTERVAL }).map((_, i) => (
          <div
            key={i}
            className={`w-[1.5px] rounded-full transition-colors
              ${i === 0
                ? "h-6 bg-gray-300 dark:bg-zinc-600"
                : "h-3 bg-gray-200 dark:bg-zinc-700"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

/*  Main Component  */

export const FractionalPicker: React.FC<FractionalPickerProps> = ({
  min = 0,
  max = 100,
  initialValue = 13,
  onChange,
  containerWidth = 500,
  itemWidth = 70,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  const centerOffset = containerWidth / 2;

  const x = useMotionValue(-(initialValue * itemWidth));
  const [currentValue, setCurrentValue] = useState(initialValue);

  /* ---- theme sync  ---- */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  /* ---- value sync ---- */
  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      const val = Math.round(Math.abs(latest / itemWidth));
      if (val !== currentValue && val >= min && val <= max) {
        setCurrentValue(val);
        onChange?.(val);
      }
    });
    return () => unsubscribe();
  }, [x, itemWidth, currentValue, onChange, min, max]);

  const snap = () => {
    const current = x.get();
    const snapped = Math.round(current / itemWidth) * itemWidth;
    const clamped = Math.max(
      Math.min(snapped, -min * itemWidth),
      -max * itemWidth
    );

    animate(x, clamped, {
      type: "spring",
      stiffness: 250,
      damping: 30,
      mass: 0.8,
    });
  };

  return (
    <div className="relative group flex justify-center items-center w-full h-screen
                    bg-gray-50 dark:bg-zinc-950 text-white transition-colors duration-500">

      {/* Theme Toggle  */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="absolute top-10 p-3 rounded-full bg-white dark:bg-zinc-900
                   border border-gray-200 dark:border-zinc-800 shadow-sm
                   hover:scale-110 transition-all z-50"
      >
        {theme === "light" ? <MoonIcon className="text-black "/> : <Sun className="text-white"/>}
      </button>

      <div
        className="relative h-[130px] bg-white dark:bg-zinc-900
                   rounded-[32px] border-[1.6px]
                   border-[#e5e5e5] dark:border-zinc-800
                   shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                   dark:shadow-[0_8px_30px_rgb(0,0,0,0.6)]
                   overflow-hidden"
        style={{ width: containerWidth }}
      >
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center">
          <div className="w-10 h-5 bg-[#DEDEE5] dark:bg-zinc-700 rounded-b-[10px] shadow-sm" />
          <div className="w-2 h-2 bg-[#DEDEE5] dark:bg-zinc-700 rounded-full mt-2" />
        </div>

        {/* Side Fade */}
        <div className="absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-white dark:from-zinc-900 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent z-20 pointer-events-none" />

        {/* Ruler */}
        <motion.div
          drag="x"
          dragConstraints={{
            left: -(max * itemWidth),
            right: -(min * itemWidth),
          }}
          dragElastic={0.1}
          onDragEnd={snap}
          style={{ x }}
          className="h-full flex items-end cursor-grab active:cursor-grabbing"
        >
          <div style={{ minWidth: centerOffset - itemWidth / 2 }} />

          {numbers.map((num) => (
            <RulerItem
              key={num}
              num={num}
              x={x}
              itemWidth={itemWidth}
              centerOffset={centerOffset}
            />
          ))}

          <div style={{ minWidth: centerOffset - itemWidth / 2 }} />
        </motion.div>
      </div>

      {/* Reflection */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2
                      w-[80%] h-4 bg-black/5 dark:bg-black/40
                      blur-xl rounded-full opacity-50" />
    </div>
  );
};
