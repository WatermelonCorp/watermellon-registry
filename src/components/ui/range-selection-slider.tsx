"use client";

import React, {
  type FC,
  useState,
  useRef,
  useCallback,
} from "react";
import { motion } from "framer-motion";

/* ---------- Types ---------- */
interface DigitColumnProps {
  digit: number;
  height: number;
}

interface RollingNumberProps {
  value: number;
  prefix?: string;
  fontSizeClass?: string;
}

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export interface PriceRangeCardProps {
  defaultRange?: [number, number];
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  onApply?: (range: [number, number]) => void;
  onCancel?: (range: [number, number]) => void;
}

type DragType = "min" | "max" | null;

/* ---------- Utils ---------- */
function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ---------- Rolling Digits ---------- */
// We use a height that aligns with responsive text sizes
const DigitColumn: FC<DigitColumnProps> = ({ digit, height }) => {
  return (
    <div
      className="relative overflow-hidden"
      style={{ height: height, width: "0.65em" }}
    >
      <motion.div
        animate={{ y: -digit * height }}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 22,
          mass: 0.6,
        }}
        className="absolute left-0 top-0 flex flex-col items-center w-full"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            style={{ height: height }}
            className="flex items-center justify-center w-full"
          >
            {i}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export const RollingNumber: FC<RollingNumberProps> = ({
  value,
  prefix = "",
}) => {
  const formatted = prefix + value.toLocaleString();
  const hClass = "h-[24px] sm:h-[32px]";

  return (
    <div className={cn(
      "flex items-center font-bold leading-none tabular-nums text-[#010103] dark:text-zinc-100",
      hClass
    )}>
      {formatted.split("").map((char, index) => {
        const isNumber = !isNaN(parseInt(char, 10));
        
        if (!isNumber) {
          return (
            <span key={index} className="px-px">
              {char}
            </span>
          );
        }

        return (
          <DigitColumn 
            key={index} 
            digit={Number(char)} 
            height={typeof window !== 'undefined' && window.innerWidth < 640 ? 24 : 32} 
          />
        );
      })}
    </div>
  );
};

/* ---------- Range Slider ---------- */
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
      const percent = Math.min(1, Math.max(0, (x - rect.left) / rect.width));
      const raw = min + percent * (max - min);
      return Math.round(raw / step) * step;
    },
    [min, max, step]
  );

  const handleMove = (e: React.PointerEvent) => {
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
      className="relative flex h-14 w-full items-center touch-none select-none"
      onPointerMove={handleMove}
      onPointerUp={stop}
      onPointerLeave={stop}
    >
      <div
        ref={trackRef}
        className="absolute h-2 w-full rounded-full bg-gray-200 dark:bg-zinc-800"
      >
        <motion.div
          className="absolute h-full rounded-full bg-zinc-800 dark:bg-zinc-300"
          animate={{ left: `${minP}%`, width: `${maxP - minP}%` }}
        />
      </div>

      {(["min", "max"] as const).map((type) => {
        const left = type === "min" ? minP : maxP;

        return (
          <motion.div
            key={type}
            onPointerDown={(e) => {
              (e.target as HTMLElement).setPointerCapture(e.pointerId);
              setDragging(type);
            }}
            className={cn(
              "absolute h-8 w-8 rounded-full cursor-grab active:cursor-grabbing",
              "bg-[#FEFEFE] dark:bg-zinc-800",
              "border-[6px] border-[#010103] dark:border-zinc-300",
              "shadow-2xl",
              dragging === type && "z-20 scale-110"
            )}
            style={{ left: `calc(${left}% - 16px)` }}
          />
        );
      })}
    </div>
  );
};

/* ---------- Main ---------- */
export const PriceRangeCard: FC<PriceRangeCardProps> = ({
  defaultRange = [800, 2400],
  min = 0,
  max = 5000,
  step = 20,
  prefix = "$",
  onApply,
  onCancel,
}) => {
  const [range, setRange] = useState<[number, number]>(defaultRange);

  return (
    <div className="flex w-full items-center justify-center bg-transparent transition-colors duration-500 lg:px-4 py-6">
      <div className="w-full max-w-88 sm:max-w-sm overflow-hidden rounded-[2rem] border border-[#F0F0F0] dark:border-zinc-800 bg-[#FEFEFE] dark:bg-zinc-900 shadow-xl">
        <div className="flex flex-col gap-4 p-5 sm:p-6">
          <h2 className="text-xl font-extrabold tracking-tight text-[#010103] dark:text-zinc-100">
            Price Range
          </h2>

          <RangeSlider
            min={min}
            max={max}
            step={step}
            value={range}
            onChange={setRange}
          />

          <div className="flex flex-col gap-3 sm:gap-4 mt-2">
            {(["From", "To"] as const).map((label, i) => (
              <div
                key={label}
                className="rounded-2xl bg-[#F4F4FB] dark:bg-zinc-800/50 p-4 transition-colors flex flex-col gap-1"
              >
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#76767D] dark:text-zinc-500">
                  {label}
                </span>
                <div className="text-xl sm:text-2xl font-bold">
                  <RollingNumber value={range[i]} prefix={prefix} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 sm:gap-4 px-5 sm:px-6 pb-6 pt-2">
          <button
            className="flex-1 bg-[#000002] dark:bg-zinc-100 hover:bg-[#000002dd] dark:hover:bg-white text-[#FEFEFE] dark:text-zinc-950 py-2.5 rounded-full text-sm sm:text-base transition-all active:scale-95"
            onClick={() => onApply?.(range)}
          >
            Apply
          </button>
          

          <button
            onClick={() => {
              setRange(defaultRange);
              onCancel?.(defaultRange);
            }}
            className="flex-1 rounded-full border border-[#E4E4E9] dark:border-zinc-700 py-2.5 text-sm sm:text-base font-bold text-[#69686F] dark:text-zinc-400 transition-all active:scale-95 hover:bg-gray-50 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};