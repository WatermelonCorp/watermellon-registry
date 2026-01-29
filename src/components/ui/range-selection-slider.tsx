"use client";

import { useState, useRef, useCallback, useEffect, type FC } from "react";
import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";

/* --- Types --- */
interface DigitColumnProps {
  digit: string;
}

interface RollingNumberProps {
  value: number;
  prefix?: string;
}

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

interface PriceRangeCardProps {
  defaultRange?: [number, number];
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  showThemeToggle?: boolean;
  onApply?: (range: [number, number]) => void;
  onCancel?: (range: [number, number]) => void;
}

type DragType = "min" | "max" | null;

/* --- Utils --- */
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/* --- Rolling Number Components --- */
const DigitColumn: FC<DigitColumnProps> = ({ digit }) => {
  const digitHeight = 28;
  const num = Number(digit);

  if (Number.isNaN(num)) {
    return (
      <span className="inline-block w-[0.54em] text-center text-[#010103] dark:text-zinc-100 font-bold">
        {digit}
      </span>
    );
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: digitHeight, width: "0.6em" }}
    >
      <motion.div
        initial={false}
        animate={{ y: -num * digitHeight }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className="absolute top-0 left-0 flex flex-col"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{ height: digitHeight }}
            className="flex items-center justify-center font-bold text-[#010103] dark:text-white"
          >
            {i}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const RollingNumber: FC<RollingNumberProps> = ({ value, prefix = "" }) => {
  const chars = (prefix + value.toLocaleString()).split("");

  return (
    <div className="flex items-center font-bold leading-none tabular-nums text-[#010103] dark:text-zinc-100">
      {chars.map((char, index) => (
        <motion.span
          key={index + char}
          layout
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex"
        >
          <DigitColumn digit={char} />
        </motion.span>
      ))}
    </div>
  );
};

/* --- Range Slider --- */
const RangeSlider: FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
}) => {
  const [dragging, setDragging] = useState<DragType>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (v: number) => ((v - min) / (max - min)) * 100,
    [min, max]
  );

  const valueFromX = useCallback(
    (x: number) => {
      if (!trackRef.current) return min;
      const rect = trackRef.current.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
      const raw = min + p * (max - min);
      return Math.round(raw / step) * step;
    },
    [min, max, step]
  );

  const move = (e: React.PointerEvent) => {
    if (!dragging) return;
    const v = valueFromX(e.clientX);

    if (dragging === "min") {
      onChange([Math.min(v, value[1] - step), value[1]]);
    } else {
      onChange([value[0], Math.max(v, value[0] + step)]);
    }
  };

  const stop = () => setDragging(null);

  const minP = getPercent(value[0]);
  const maxP = getPercent(value[1]);

  return (
    <div
      className="relative w-full h-[48px] flex items-center touch-none"
      onPointerMove={move}
      onPointerUp={stop}
      onPointerLeave={stop}
    >
      <div
        ref={trackRef}
        className="absolute w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-full"
      >
        <motion.div
          className="absolute h-full bg-[#010103] dark:bg-zinc-100 rounded-full"
          animate={{ left: `${minP}%`, width: `${maxP - minP}%` }}
        />
      </div>

      {(["min", "max"] as const).map((type) => {
        const left = type === "min" ? minP : maxP;

        return (
          <motion.div
            key={type}
            className={cn(
              "absolute w-[32px] h-[32px] bg-[#FEFEFE] dark:bg-zinc-100 border-[7px] shadow-2xl border-[#010103] dark:border-zinc-300 rounded-full cursor-grab active:cursor-grabbing",
              dragging === type && "scale-110 z-20"
            )}
            style={{ left: `calc(${left}% - 16px)` }}
            onPointerDown={() => setDragging(type)}
          />
        );
      })}
    </div>
  );
};

/* --- Main Component --- */
export const PriceRangeCard: FC<PriceRangeCardProps> = ({
  defaultRange = [800, 2400],
  min = 0,
  max = 5000,
  step = 20,
  prefix = "$",
  showThemeToggle = true,
  onApply,
  onCancel,
}) => {
  const [range, setRange] = useState<[number, number]>(defaultRange);
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-white dark:bg-zinc-950 transition-colors duration-500">
      
      {showThemeToggle && (
        <button
          onClick={() => setIsDark(!isDark)}
          className="mb-8 p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm active:scale-90 transition-all"
        >
          {isDark ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-zinc-500" size={20} />}
        </button>
      )}

      <div className="bg-[#FEFEFE] dark:bg-zinc-900 rounded-3xl w-[360px] flex flex-col gap-[18px] border border-[#F0F0F0] dark:border-zinc-800 shadow-lg overflow-hidden">
        <div className="border border-[#F0F0F0] dark:border-zinc-800 p-[18px] px-4 rounded-3xl shadow-xs">
          <h2 className="text-xl text-[#010103] dark:text-zinc-100 font-bold">
            Price Range
          </h2>

          <RangeSlider min={min} max={max} step={step} value={range} onChange={setRange} />

          <div className="flex flex-col gap-4">
            {(["From", "To"] as const).map((label, i) => (
              <div
                key={label}
                className="bg-[#F4F4FB] dark:bg-zinc-800/50 rounded-2xl p-4 transition-colors"
              >
                <span className="text-xs text-[#76767D] dark:text-zinc-500 font-semibold uppercase">
                  {label}
                </span>
                <div className="text-2xl font-bold">
                  <RollingNumber value={range[i]} prefix={prefix} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mb-[18px] px-6">
          <button
            className="flex-1 bg-[#000002] dark:bg-zinc-100 hover:bg-[#000002dd] dark:hover:bg-white text-[#FEFEFE] dark:text-zinc-950 py-2.5 rounded-3xl transition-all active:scale-95"
            onClick={() => onApply?.(range)}
          >
            Apply
          </button>

          <button
            className="flex-1 border-[1.6px] border-[#E4E4E9] dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 text-[#69686F] dark:text-zinc-400 font-semibold py-2.5 rounded-3xl transition-all active:scale-95"
            onClick={() => {
              setRange(defaultRange);
              onCancel?.(defaultRange);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

