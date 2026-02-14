"use client";

import { useState, useMemo, type FC, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- Types ---------- */
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

/* ---------- Defaults ---------- */
const DEFAULT_MIN = 50;
const DEFAULT_MAX = 350;
const DEFAULT_STEP = 25;
const DEFAULT_VALUE = 200;

/* ---------- Color Logic ---------- */
const getColorSettings = (
    value: number,
    min: number,
    max: number,
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

/* ---------- Component ---------- */
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
        [calories, min, max],
    );

    const percentage = ((calories - min) / (max - min)) * 100;

    const dots = useMemo(
        () =>
            Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#C4B9FA] dark:bg-zinc-600 z-30 transition-colors"
                    style={{ opacity: 0.8 }}
                />
            )),
        [],
    );

    const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value);
        setInternalValue(val);
        onChange?.(val);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#FEFEFE] dark:bg-zinc-900 rounded-[36px] p-6 sm:p-12 shadow-2xl shadow-black/5 dark:shadow-none w-xs sm:w-sm flex flex-col items-center justify-center select-none h-[60vh] transition-colors"
        >
            {/* Label */}
            <span className="text-[#878787] dark:text-zinc-500 font-bold text-xl sm:text-2xl mb-2">
                Calories
            </span>

            {/* Value */}
            <div className="flex items-baseline gap-2 mb-8">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={calories}
                        initial={{ y: 5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        style={{
                            background: colorSettings.gradient,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                        className="text-5xl sm:text-6xl font-extrabold tracking-tight"
                    >
                        {calories}
                    </motion.span>
                </AnimatePresence>
                <span className="text-[#010101] dark:text-zinc-100 font-extrabold text-4xl sm:text-5xl transition-colors">
                    kCal
                </span>
            </div>

            {/* Slider */}
            <div className="relative w-full h-13 bg-[#f1f3f5] dark:bg-zinc-800 rounded-full flex items-center group transition-colors overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-8 pointer-events-none transition-colors">
                    {dots}
                </div>

                <motion.div
                    className="absolute left-0 top-0 h-full rounded-full pointer-events-none"
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
                    className="absolute inset-0 z-50 w-full h-13 opacity-0 cursor-pointer"
                />

                <motion.div
                    className="absolute top-0 pointer-events-none size-13 rounded-full flex items-center z-40 justify-center border-none"
                    animate={{
                        left: `calc((${percentage} / 100) * (100% - 52px))`,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                >
                    <div className="size-10 bg-white rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]" />
                </motion.div>
            </div>
        </motion.div>
    );
};