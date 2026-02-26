"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { Check, ChevronRight } from "lucide-react";

/* ---------- Types ---------- */
export type FrequencyType = "Daily" | "Weekly" | "Monthly" | "Yearly";

export interface FrequencyData {
    type: FrequencyType;
    subValue?: string;
}

interface FrequencySelectorProps {
    value: FrequencyData;
    onChange: (data: FrequencyData) => void;
    className?: string;
}

/* ---------- Motion Config ---------- */
const smoothSpring = {
    type: "spring",
    stiffness: 200,
    damping: 26,
    mass: 0.8,
    bounce: 0,
} as const;

/* ---------- Data ---------- */
const FREQUENCIES: FrequencyType[] = [
    "Daily",
    "Weekly",
    "Monthly",
    "Yearly",
];

const SUB_OPTIONS: Record<FrequencyType, string[]> = {
    Daily: [],
    Weekly: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    Monthly: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
    Yearly: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

export const FrequencySelector: React.FC<FrequencySelectorProps> = ({
    value,
    onChange,
    className = "",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tempType, setTempType] = useState<FrequencyType>(value.type);
    const [tempSubValue, setTempSubValue] = useState<string | undefined>(
        value.subValue
    );

    const handleOpen = () => {
        setTempType(value.type);
        setTempSubValue(value.subValue || SUB_OPTIONS[value.type][0]);
        setIsOpen(true);
    };

    const handleConfirm = () => {
        onChange({
            type: tempType,
            subValue: tempType === "Daily" ? undefined : tempSubValue,
        });
        setIsOpen(false);
    };

    return (
        <LayoutGroup id="frequency-root">
            <div
                className={`w-full flex items-center justify-center p-4 antialiased select-none ${className}`}
            >
                <AnimatePresence mode="wait">
                    {!isOpen ? (
                        /* ---------- CLOSED STATE ---------- */
                        <motion.div
                            layoutId="container"
                            onClick={handleOpen}
                            transition={smoothSpring}
                            className="flex items-center justify-between rounded-full p-1 pl-6 w-full max-w-md h-14 cursor-pointer bg-neutral-100 dark:bg-neutral-900"
                        >
                            <motion.span
                                layout
                                className="font-bold text-lg text-neutral-500 dark:text-neutral-400"
                            >
                                Frequency
                            </motion.span>

                            <motion.div
                                layoutId="trigger-pill"
                                transition={smoothSpring}
                                className="flex items-center rounded-full px-4 h-12 shadow-sm border gap-3 bg-white dark:bg-neutral-800 border-black/5 dark:border-white/5"
                            >
                                <span className="font-bold text-lg">
                                    {value.type}
                                    {value.subValue
                                        ? `, ${value.subValue}`
                                        : ""}
                                </span>

                                <ChevronRight
                                    size={20}
                                    className="text-neutral-400"
                                />
                            </motion.div>
                        </motion.div>
                    ) : (
                        /* ---------- OPEN STATE ---------- */
                        <motion.div
                            layoutId="container"
                            transition={smoothSpring}
                            className="rounded-[32px] p-2 flex flex-col gap-3 w-full max-w-lg bg-neutral-100 dark:bg-neutral-900 shadow-xl border border-black/5 dark:border-white/5"
                        >
                            {/* Top Row */}
                            <div className="flex items-center gap-2">
                                <motion.div
                                    layoutId="trigger-pill"
                                    transition={smoothSpring}
                                    className="flex-1 rounded-full flex p-1 h-13 items-center relative bg-white dark:bg-neutral-800 shadow-inner overflow-hidden"
                                >
                                    {FREQUENCIES.map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => {
                                                setTempType(type);
                                                setTempSubValue(SUB_OPTIONS[type][0]);
                                            }}
                                            className="relative flex-1 h-full flex items-center justify-center font-bold text-[15px]"
                                        >
                                            {tempType === type && (
                                                <motion.div
                                                    layoutId="active-tab"
                                                    transition={smoothSpring}
                                                    className="absolute inset-0 rounded-full bg-neutral-200 dark:bg-neutral-700 z-0"
                                                />
                                            )}

                                            <span className="relative z-10">
                                                {type}
                                            </span>
                                        </button>
                                    ))}
                                </motion.div>

                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleConfirm}
                                    className="w-12 h-12 rounded-full flex items-center justify-center bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                                >
                                    <Check size={20} />
                                </motion.button>
                            </div>

                            {/* Sub Options */}
                            <AnimatePresence mode="wait">
                                {SUB_OPTIONS[tempType].length > 0 && (
                                    <motion.div
                                        layout
                                        transition={smoothSpring}
                                        className="overflow-hidden"
                                    >
                                        {SUB_OPTIONS[tempType].length > 0 && (
                                            <motion.div
                                                key={tempType}
                                                layout
                                                transition={smoothSpring}
                                                className={`grid gap-2 rounded-2xl p-3 bg-white dark:bg-neutral-800 shadow-inner ${tempType === "Monthly"
                                                    ? "grid-cols-7"
                                                    : tempType === "Yearly"
                                                        ? "grid-cols-4"
                                                        : "grid-cols-7"
                                                    }`}
                                            >
                                                {SUB_OPTIONS[tempType].map((option) => (
                                                    <button
                                                        key={option}
                                                        onClick={() => setTempSubValue(option)}
                                                        className="relative h-9 rounded-full text-sm font-bold flex items-center justify-center"
                                                    >
                                                        {tempSubValue === option && (
                                                            <motion.div
                                                                layoutId="active-sub"
                                                                transition={smoothSpring}
                                                                className="absolute inset-0 rounded-full bg-neutral-200 dark:bg-neutral-700 z-0"
                                                            />
                                                        )}

                                                        <span className="relative z-10">
                                                            {option}
                                                        </span>
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </LayoutGroup>
    );
};