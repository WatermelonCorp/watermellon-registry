'use client';

import React, { type FC, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';

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

type DragType = 'min' | 'max' | null;

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const DigitColumn: FC<DigitColumnProps> = ({ digit, height }) => {
  return (
    <div
      className="relative overflow-hidden"
      style={{ height: height, width: '0.65em' }}
    >
      <motion.div
        animate={{ y: -digit * height }}
        transition={{
          type: 'spring',
          stiffness: 140,
          damping: 22,
          mass: 0.6,
        }}
        className="absolute top-0 left-0 flex w-full flex-col items-center"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            style={{ height: height }}
            className="flex w-full items-center justify-center"
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
  prefix = '',
}) => {
  const formatted = prefix + value.toLocaleString();
  const height =
    typeof window !== 'undefined' && window.innerWidth < 640 ? 24 : 32;

  return (
    <div
      className={cn(
        'flex items-center leading-none font-bold text-[#010103] tabular-nums dark:text-neutral-100',
        'h-[24px] sm:h-[32px]',
      )}
    >
      {formatted.split('').map((char, index) => {
        const isNumber = !isNaN(parseInt(char, 10));

        if (!isNumber) {
          return (
            <span key={index} className="px-px">
              {char}
            </span>
          );
        }

        return <DigitColumn key={index} digit={Number(char)} height={height} />;
      })}
    </div>
  );
};

const RangeSlider: FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<DragType>(null);

  const percentFromValue = useCallback(
    (v: number) => ((v - min) / (max - min)) * 100,
    [min, max],
  );

  const valueFromX = useCallback(
    (x: number) => {
      if (!trackRef.current) return min;
      const rect = trackRef.current.getBoundingClientRect();
      const percent = Math.min(1, Math.max(0, (x - rect.left) / rect.width));
      const raw = min + percent * (max - min);
      return Math.round(raw / step) * step;
    },
    [min, max, step],
  );

  const minPercent = useMotionValue(0);
  const maxPercent = useMotionValue(0);

  const minP = percentFromValue(value[0]);
  const maxP = percentFromValue(value[1]);

  if (minPercent.get() !== minP) {
    minPercent.set(minP);
  }

  if (maxPercent.get() !== maxP) {
    maxPercent.set(maxP);
  }

  const rangeLeft = useTransform(minPercent, (v) => `${v}%`);
  const rangeWidth = useTransform([minPercent, maxPercent], (latest) => {
    const minV = Number(latest[0]);
    const maxV = Number(latest[1]);
    return `${maxV - minV}%`;
  });

  const thumbMinLeft = useTransform(minPercent, (v) => `calc(${v}% - 16px)`);
  const thumbMaxLeft = useTransform(maxPercent, (v) => `calc(${v}% - 16px)`);

  const handleMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;

    const newValue = valueFromX(e.clientX);

    if (dragging.current === 'min') {
      const clamped = Math.min(newValue, value[1] - step);
      onChange([clamped, value[1]]);
    } else {
      const clamped = Math.max(newValue, value[0] + step);
      onChange([value[0], clamped]);
    }
  };

  const stop = () => {
    dragging.current = null;
  };

  return (
    <div
      className="relative flex h-14 w-full touch-none items-center select-none"
      onPointerMove={handleMove}
      onPointerUp={stop}
      onPointerLeave={stop}
    >
      <div
        ref={trackRef}
        className="absolute h-2 w-full rounded-full bg-gray-200 dark:bg-neutral-800"
      >
        <motion.div
          className="absolute h-full rounded-full bg-neutral-800 dark:bg-neutral-300"
          style={{
            left: rangeLeft,
            width: rangeWidth,
          }}
        />
      </div>

      <motion.div
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          dragging.current = 'min';
        }}
        className="absolute h-8 w-8 cursor-grab rounded-full border-[6px] border-[#010103] bg-[#FEFEFE] shadow-2xl active:cursor-grabbing dark:border-neutral-300 dark:bg-neutral-800"
        style={{ left: thumbMinLeft }}
      />

      <motion.div
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          dragging.current = 'max';
        }}
        className="absolute h-8 w-8 cursor-grab rounded-full border-[6px] border-[#010103] bg-[#FEFEFE] shadow-2xl active:cursor-grabbing dark:border-neutral-300 dark:bg-neutral-800"
        style={{ left: thumbMaxLeft }}
      />
    </div>
  );
};

export const PriceRangeCard: FC<PriceRangeCardProps> = ({
  defaultRange = [800, 2400],
  min = 0,
  max = 5000,
  step = 20,
  prefix = '$',
  onApply,
  onCancel,
}) => {
  const [range, setRange] = useState<[number, number]>(defaultRange);

  return (
    <div className="w-full w-xs overflow-hidden rounded-[2rem] border border-[#F0F0F0] bg-[#FEFEFE] shadow-xl sm:w-sm sm:max-w-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex flex-col gap-4 p-5 sm:p-6">
        <h2 className="text-xl font-extrabold tracking-tight text-[#010103] dark:text-neutral-100">
          Price Range
        </h2>

        <RangeSlider
          min={min}
          max={max}
          step={step}
          value={range}
          onChange={setRange}
        />

        <div className="mt-2 flex flex-col gap-3 sm:gap-4">
          {(['From', 'To'] as const).map((label, i) => (
            <div
              key={label}
              className="flex flex-col gap-1 rounded-2xl bg-[#F4F4FB] p-4 dark:bg-neutral-800/50"
            >
              <span className="text-[10px] font-bold tracking-wider text-[#76767D] uppercase sm:text-xs dark:text-neutral-500">
                {label}
              </span>
              <div className="text-xl font-bold sm:text-2xl">
                <RollingNumber value={range[i]} prefix={prefix} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 px-5 pt-2 pb-6 sm:gap-4 sm:px-6">
        <button
          className="flex-1 rounded-full bg-[#000002] py-2.5 text-sm text-[#FEFEFE] active:scale-95 sm:text-base dark:bg-neutral-100 dark:text-neutral-950"
          onClick={() => onApply?.(range)}
        >
          Apply
        </button>

        <button
          onClick={() => {
            setRange(defaultRange);
            onCancel?.(defaultRange);
          }}
          className="flex-1 rounded-full border border-[#E4E4E9] py-2.5 text-sm font-bold text-[#69686F] hover:bg-gray-50 active:scale-95 sm:text-base dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
