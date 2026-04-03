'use client';

import { useState, useMemo, type FC, type ChangeEvent } from 'react';
import { motion } from 'motion/react';
import NumberFlow from '@number-flow/react';

/* --- Types --- */
interface SliderProps {
  value: number;
  min: number;
  max: number;
  onChange: (val: number) => void;
}

interface DonutProps {
  invested: number;
  returns: number;
}

export interface ReturnsCalculatorProps {
  initialMonthly?: number;
  initialRate?: number;
  initialYears?: number;
  monthlyRange?: { min: number; max: number };
  rateRange?: { min: number; max: number };
  yearsRange?: { min: number; max: number };
}

/* --- Internal Components --- */
const AnimatedValue: FC<{
  value: number | string;
  prefix?: string;
  suffix?: string;
  className?: string;
}> = ({ value, prefix, suffix, className }) => {
  return (
    <NumberFlow
      value={Number(value)}
      locales="en-IN"
      prefix={prefix}
      suffix={suffix}
      transformTiming={{
        easing: 'ease-out',
        duration: 500,
      }}
      className={`font-bold text-[#2B2B2B] dark:text-zinc-100 ${className || 'xs:text-lg text-base sm:text-xl lg:text-2xl'}`}
    />
  );
};

const Slider: FC<SliderProps> = ({ value, min, max, onChange }) => {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative h-12 rounded-full border-b-[1.6px] border-[#E5E5E9] bg-white px-4 sm:h-14 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="absolute inset-y-1/2 left-1/2 h-1.5 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-200 dark:bg-zinc-700" />
      <motion.div
        className="absolute inset-y-1/2 h-1.5 -translate-y-1/2 rounded-full bg-black dark:bg-zinc-100"
        style={{ width: `${percent * 0.9}%`, left: '5%' }}
      />
      <motion.div
        className="absolute top-1/2 z-10 h-6 w-6 -translate-y-1/2 rounded-full border border-gray-200 bg-white shadow-xl sm:h-7 sm:w-7 dark:border-zinc-400 dark:bg-zinc-100"
        style={{ left: `calc(${5 + percent * 0.9}% - 12px)` }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
      />
      <input
        title="range"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(+e.target.value)
        }
        className="absolute inset-0 z-20 w-full cursor-pointer opacity-0"
      />
    </div>
  );
};

const Donut: FC<DonutProps> = ({ invested, returns }) => {
  const total = invested + returns;
  const pReturns = total === 0 ? 0 : returns / total;
  const pInvested = total === 0 ? 1 : invested / total;

  const C = 2 * Math.PI * 54;

  const gap = 16;
  const showGap = pReturns > 0 && pInvested > 0;
  const actualGap = showGap ? gap : 0;

  const investedLength = Math.max(0, pInvested * C - actualGap);
  const returnLength = Math.max(0, pReturns * C - actualGap);

  return (
    <div className="relative flex shrink-0 justify-center">
      <svg
        width="120"
        height="120"
        viewBox="0 0 140 140"
        className="xs:w-[140px] xs:h-[140px] -rotate-90 sm:h-44 sm:w-44"
      >
        <motion.circle
          cx="70"
          cy="70"
          r="54"
          fill="none"
          stroke="#515158"
          className="dark:stroke-zinc-400"
          strokeWidth="20"
          strokeLinecap="round"
          animate={{
            strokeDasharray: `${investedLength - 6} ${C}`,
            strokeDashoffset: -(actualGap / 1.5),
          }}
          transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
        />
        <motion.circle
          cx="70"
          cy="70"
          r="54"
          fill="none"
          stroke="#D4D3DE"
          className="dark:stroke-zinc-800"
          strokeWidth="12"
          strokeLinecap={showGap ? 'round' : 'butt'}
          animate={{
            strokeDasharray: `${returnLength} ${C}`,
            strokeDashoffset: -(pInvested * C + actualGap / 2),
          }}
          transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
        />
      </svg>
    </div>
  );
};

export const ReturnsCalculator: FC<ReturnsCalculatorProps> = ({
  initialMonthly = 40000,
  initialRate = 6,
  initialYears = 15,
  monthlyRange = { min: 5000, max: 100000 },
  rateRange = { min: 1, max: 15 },
  yearsRange = { min: 1, max: 30 },
}) => {
  const [monthly, setMonthly] = useState(initialMonthly);
  const [rate, setRate] = useState(initialRate);
  const [years, setYears] = useState(initialYears);

  const invested = monthly * 12 * years;
  const returns = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    if (r === 0) return 0;
    return Math.round(monthly * ((Math.pow(1 + r, n) - 1) / r) - invested);
  }, [monthly, rate, years, invested]);

  return (
    <div className="w-full max-w-lg space-y-8 rounded-[2rem] border-[1.6px] border-[#F0F0F0] bg-[#FEFEFE] p-5 shadow-xl sm:rounded-[2.5rem] md:p-8 lg:py-10 xl:p-10 dark:border-zinc-800 dark:bg-zinc-900">
      {/* Top Section */}
      <div className="flex flex-col items-center gap-8 lg:items-start lg:gap-12 xl:flex-row xl:items-center">
        <Donut invested={invested} returns={returns} />

        {/* Stats Section*/}
        <div className="xs:grid-cols-2 grid w-full grid-cols-1 gap-6 lg:grid-cols-1">
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full bg-[#D4D3DE] dark:bg-zinc-800" />
            <div className="flex flex-col gap-0.5">
              <p className="text-xs font-semibold tracking-wider text-[#838385] uppercase sm:text-sm dark:text-zinc-500">
                Invested
              </p>
              <AnimatedValue value={invested} prefix="₹" />
            </div>
          </div>
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full bg-[#515158] dark:bg-zinc-400" />
            <div className="flex flex-col gap-0.5">
              <p className="text-xs font-semibold tracking-wider text-[#838385] uppercase sm:text-sm dark:text-zinc-500">
                Returns
              </p>
              <AnimatedValue value={returns} prefix="₹" />
            </div>
          </div>
        </div>
      </div>

      {/* Sliders Section */}
      <div className="grid grid-cols-1 gap-4">
        {[
          {
            label: 'Monthly Investment',
            val: (
              <AnimatedValue
                value={monthly}
                prefix="₹"
                className="text-sm sm:text-base"
              />
            ),
            slider: (
              <Slider
                min={monthlyRange.min}
                max={monthlyRange.max}
                value={monthly}
                onChange={setMonthly}
              />
            ),
          },
          {
            label: 'Return Rate',
            val: (
              <AnimatedValue
                value={rate}
                suffix="%"
                className="text-sm sm:text-base"
              />
            ),
            slider: (
              <Slider
                min={rateRange.min}
                max={rateRange.max}
                value={rate}
                onChange={setRate}
              />
            ),
          },
          {
            label: 'Time Period',
            val: (
              <AnimatedValue
                value={years}
                suffix=" Years"
                className="text-sm sm:text-base"
              />
            ),
            slider: (
              <Slider
                min={yearsRange.min}
                max={yearsRange.max}
                value={years}
                onChange={setYears}
              />
            ),
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-[#E5E5E9] bg-[#F4F4FB] transition-all hover:border-[#D4D3DE] sm:rounded-4xl dark:border-zinc-800/50 dark:bg-zinc-800/40 dark:hover:border-zinc-700"
          >
            {item.slider}
            <div className="flex items-center justify-between px-5 py-3">
              <span className="text-[10px] font-bold tracking-tight text-[#717077] uppercase sm:text-xs dark:text-zinc-400">
                {item.label}
              </span>
              {item.val}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};