"use client";

import { useState, useMemo, useEffect, type FC, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";

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

/* --- Utils --- */
const formatINR = (n: number): string => "₹" + n.toLocaleString("en-IN");

/* --- Internal Components (Styling Intact) --- */
const AnimatedValue: FC<{ value: number }> = ({ value }) => (
  <AnimatePresence mode="popLayout">
    <motion.span
      key={value}
      initial={{ y: 16, opacity: 0, filter: "blur(6px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      exit={{ y: -16, opacity: 0, filter: "blur(6px)" }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className="block font-semibold text-[#2B2B2B] dark:text-zinc-100 text-[18px]"
    >
      {formatINR(value)}
    </motion.span>
  </AnimatePresence>
);

const Slider: FC<SliderProps> = ({ value, min, max, onChange }) => {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative h-14 border-[1.6px] border-t-0 border-[#E5E5E9] dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-full px-4">
      <div className="absolute inset-y-1/2 h-1 bg-gray-200 dark:bg-zinc-700 rounded-full w-[90%] -translate-y-1/2" />
      <motion.div
        className="absolute inset-y-1/2 h-1 bg-black dark:bg-zinc-100 rounded-full -translate-y-1/2"
        style={{ width: `${percent}%` }}
        layout
      />
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-7 h-7 bg-white dark:bg-zinc-100 rounded-full border border-gray-200 dark:border-zinc-400 shadow-xl"
        style={{ left: `calc(${percent}% - 12px)` }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
      <input
        title="range"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(+e.target.value)}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
  );
};

const Donut: FC<DonutProps> = ({ invested, returns }) => {
  const total = invested + returns;
  const percent = total === 0 ? 0 : (returns / total) * 100;
  return (
    <svg width="160" height="160" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r="54" fill="none" stroke="#D4D3DE" className="dark:stroke-zinc-800" strokeWidth="12" />
      <motion.circle
        cx="70" cy="70" r="54" fill="none" stroke="#515158" className="dark:stroke-zinc-400" strokeWidth="12"
        strokeDasharray={339}
        strokeDashoffset={339 - (339 * percent) / 100}
        strokeLinecap="round"
        animate={{ strokeDashoffset: 339 - (339 * percent) / 100 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      />
    </svg>
  );
};

/* --- MAIN REUSABLE COMPONENT --- */
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
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  const invested = monthly * 12 * years;
  const returns = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    if (r === 0) return 0;
    return Math.round(monthly * ((Math.pow(1 + r, n) - 1) / r) - invested);
  }, [monthly, rate, years, invested]);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Theme Toggle Inside Component */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm active:scale-90 transition-all"
      >
        {isDark ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-zinc-500" size={20} />}
      </button>

      <div className="w-[456px] bg-[#FEFEFE] dark:bg-zinc-900 rounded-[38px] p-[24px] border-[1.6px] border-[#FEFEFEEE] dark:border-zinc-800 space-y-[24px] shadow-sm">
        <div className="flex gap-[16px] items-center">
          <Donut invested={invested} returns={returns} />
          <div className="space-y-[16px] text-sm">
            <div className="flex gap-[12px] items-start justify-start">
              <span className="w-[16px] h-[16px] rounded-full bg-[#D4D3DE] dark:bg-zinc-800 mt-[4px]" />
              <div className="flex flex-col gap-[4px]">
                <p className="text-[#838385] dark:text-zinc-500 text-[16px] font-medium">Invested Amount</p>
                <AnimatedValue value={invested} />
              </div>
            </div>
            <div className="flex gap-[12px] items-start justify-start">
              <span className="w-[16px] h-[16px] rounded-full bg-[#515158] dark:bg-zinc-400 mt-[4px]" />
              <div className="flex flex-col gap-[4px]">
                <p className="text-[#838385] dark:text-zinc-500 text-[16px] font-medium">Total Returns</p>
                <AnimatedValue value={returns} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-[18px]">
          <div className="bg-[#F4F4FB] dark:bg-zinc-800/50 rounded-[28px] border-[1.6px] border-[#E5E5E9] dark:border-[#E5E5E9]/20 pb-[4px] flex flex-col gap-[12px]">
            <Slider min={monthlyRange.min} max={monthlyRange.max} value={monthly} onChange={setMonthly} />
            <div className="flex justify-between px-[16px] mb-[8px] text-sm">
              <span className="text-[#717077] dark:text-zinc-400 font-semibold text-[14px]">Monthly Investment</span>
              <span className="text-[#7A7980] dark:text-zinc-500 font-medium text-[14px]">{formatINR(monthly)}</span>
            </div>
          </div>

          <div className="bg-[#F4F4FB] dark:bg-zinc-800/50 rounded-[28px] border-[1.6px] border-[#E5E5E9] dark:border-[#E5E5E9]/20 pb-[4px] flex flex-col gap-[12px]">
            <Slider min={rateRange.min} max={rateRange.max} value={rate} onChange={setRate} />
            <div className="flex justify-between px-[16px] pb-[12px]">
              <span className="text-[#717077] dark:text-zinc-400 font-semibold text-[14px]">Expected Returns</span>
              <span className="text-[#7A7980] dark:text-zinc-500 font-medium text-[14px]">{rate}%</span>
            </div>
          </div>

          <div className="bg-[#F4F4FB] dark:bg-zinc-800/50 rounded-[28px] border-[1.6px] border-[#E5E5E9] dark:border-[#E5E5E9]/20 pb-[4px] flex flex-col gap-[12px]">
            <Slider min={yearsRange.min} max={yearsRange.max} value={years} onChange={setYears} />
            <div className="flex justify-between px-[16px] pb-[12px]">
              <span className="text-[#717077] dark:text-zinc-400 font-semibold text-[14px]">Time Period</span>
              <span className="text-[#7A7980] dark:text-zinc-500 font-medium text-[14px]">{years} years</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};