"use client";

import { useState, useMemo, type FC, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

/* --- Internal Components --- */
const AnimatedValue: FC<{ value: number }> = ({ value }) => (
    <AnimatePresence mode="popLayout">
        <motion.span
            key={value}
            initial={{ y: 12, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -12, opacity: 0, filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="block font-bold text-[#2B2B2B] dark:text-zinc-100 text-base xs:text-lg sm:text-xl lg:text-2xl"
        >
            {formatINR(value)}
        </motion.span>
    </AnimatePresence>
);

const Slider: FC<SliderProps> = ({ value, min, max, onChange }) => {
    const percent = ((value - min) / (max - min)) * 100;
    return (
        <div className="relative h-12 sm:h-14 border-b-[1.6px] border-[#E5E5E9] dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-full px-4">
            <div className="absolute inset-y-1/2 h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-full w-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <motion.div
                className="absolute inset-y-1/2 h-1.5 bg-black dark:bg-zinc-100 rounded-full -translate-y-1/2"
                style={{ width: `${percent * 0.9}%`, left: '5%' }}
                layout
            />
            <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 bg-white dark:bg-zinc-100 rounded-full border border-gray-200 dark:border-zinc-400 shadow-xl z-10"
                style={{ left: `calc(${5 + percent * 0.9}% - 12px)` }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            <input
                title="range"
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(+e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer z-20 w-full"
            />
        </div>
    );
};

const Donut: FC<DonutProps> = ({ invested, returns }) => {
    const total = invested + returns;
    const percent = total === 0 ? 0 : (returns / total) * 100;
    return (
        <div className="relative shrink-0 flex justify-center">
            <svg width="120" height="120" viewBox="0 0 140 140" className="xs:w-[140px] xs:h-[140px] sm:w-44 sm:h-44">
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
        <div className="flex w-full h-full items-center justify-center bg-transparent px-0 lg:px-4 py-4 md:py-0 mt-28">
            {/* Main Card  */}
            <div className="w-full max-w-lg bg-[#FEFEFE] dark:bg-zinc-900 rounded-[2rem] sm:rounded-[2.5rem] p-5 md:p-8 lg:py-10 xl:p-10 border-[1.6px] border-[#F0F0F0] dark:border-zinc-800 space-y-8 shadow-xl">

                {/* Top Section */}
                <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 items-center lg:items-start xl:items-center">
                    <Donut invested={invested} returns={returns} />

                    {/* Stats Section*/}
                    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-1 gap-6 w-full">
                        <div className="flex gap-3 sm:gap-4 items-start">
                            <span className="w-3.5 h-3.5 rounded-full bg-[#D4D3DE] dark:bg-zinc-800 mt-1.5 shrink-0" />
                            <div className="flex flex-col gap-0.5">
                                <p className="text-[#838385] dark:text-zinc-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">Invested</p>
                                <AnimatedValue value={invested} />
                            </div>
                        </div>
                        <div className="flex gap-3 sm:gap-4 items-start">
                            <span className="w-3.5 h-3.5 rounded-full bg-[#515158] dark:bg-zinc-400 mt-1.5 shrink-0" />
                            <div className="flex flex-col gap-0.5">
                                <p className="text-[#838385] dark:text-zinc-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">Returns</p>
                                <AnimatedValue value={returns} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sliders Section */}
                <div className="grid grid-cols-1 gap-4">
                    {[
                        { label: "Monthly Investment", val: formatINR(monthly), slider: <Slider min={monthlyRange.min} max={monthlyRange.max} value={monthly} onChange={setMonthly} /> },
                        { label: "Return Rate", val: `${rate}%`, slider: <Slider min={rateRange.min} max={rateRange.max} value={rate} onChange={setRate} /> },
                        { label: "Time Period", val: `${years} Years`, slider: <Slider min={yearsRange.min} max={yearsRange.max} value={years} onChange={setYears} /> }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-[#F4F4FB] dark:bg-zinc-800/40 rounded-2xl sm:rounded-3xl border border-[#E5E5E9] dark:border-zinc-800/50 transition-all hover:border-[#D4D3DE] dark:hover:border-zinc-700">
                            {item.slider}
                            <div className="flex justify-between items-center px-5 py-3">
                                <span className="text-[#717077] dark:text-zinc-400 font-bold text-[10px] sm:text-xs uppercase tracking-tight">{item.label}</span>
                                <span className="text-[#2B2B2B] dark:text-zinc-100 font-bold text-sm sm:text-base">{item.val}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};