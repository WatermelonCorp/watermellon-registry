"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';

/* ---------- Types ---------- */
export type FrequencyType = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

export interface FrequencyData {
    type: FrequencyType;
    subValue?: string;
}

interface FrequencySelectorProps {
    value: FrequencyData;
    onChange: (data: FrequencyData) => void;
    className?: string;
}

/* ---------- Constants ---------- */
const smoothSpring = {
    type: 'spring',
    stiffness: 220,
    damping: 28,
    mass: 0.9,
    bounce: 0,
} as const;

const FREQUENCIES: FrequencyType[] = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

const SUB_OPTIONS: Record<FrequencyType, string[]> = {
    Daily: [],
    Weekly: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    Monthly: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
    Yearly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

export const FrequencySelector: React.FC<FrequencySelectorProps> = ({ value, onChange, className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tempType, setTempType] = useState<FrequencyType>(value.type);
    const [tempSubValue, setTempSubValue] = useState<string | undefined>(value.subValue);

    const handleOpen = () => {
        setTempType(value.type);
        setTempSubValue(value.subValue || SUB_OPTIONS[value.type][0]);
        setIsOpen(true);
    };

    const handleConfirm = () => {
        onChange({ type: tempType, subValue: tempType === 'Daily' ? undefined : tempSubValue });
        setIsOpen(false);
    };

    return (
        <div className={`w-full flex items-center justify-center p-2 sm:p-4 antialiased select-none ${className}`}>
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.div
                        layoutId="container"
                        onClick={handleOpen}
                        layout="position"
                        transition={smoothSpring}
                        // Responsive width: max-w set for mobile and desktop
                        className="flex items-center justify-between rounded-full p-1 pl-4 sm:pl-6 w-full max-w-90 sm:max-w-95 h-14 sm:h-15 cursor-pointer transition-colors bg-zinc-100 dark:bg-zinc-900"
                    >
                        <motion.span layout className="font-bold text-base sm:text-lg text-zinc-500 dark:text-zinc-400">
                            Frequency
                        </motion.span>
                        <motion.div
                            layoutId="trigger-pill"
                            layout="position"
                            transition={smoothSpring}
                            className="flex items-center rounded-full px-3 sm:px-4 h-11 sm:h-12 shadow-sm border gap-2 sm:gap-3 transition-colors bg-white border-black/5 dark:bg-zinc-800 dark:border-white/5"
                        >
                            <span className="font-bold text-sm sm:text-lg text-zinc-900 dark:text-white whitespace-nowrap">
                                {value.type}{value.subValue ? `, ${value.subValue}` : ''}
                            </span>
                            <div className="flex flex-col -space-y-1 -rotate-90 scale-75 shrink-0">
                                <ChevronRight size={22} strokeWidth={3} className="text-zinc-400 dark:text-zinc-600 -rotate-90" />
                                <ChevronRight size={22} strokeWidth={3} className="text-zinc-400 dark:text-zinc-600 rotate-90" />
                            </div>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        layoutId="container"
                        layout="position"
                        transition={smoothSpring}
                        // Fits mobile screens perfectly with max-width relative to viewport
                        className="rounded-[28px] sm:rounded-[32px] p-1.5 sm:p-2 overflow-hidden flex flex-col gap-2 w-full max-w-110 transition-colors bg-zinc-100 dark:bg-zinc-900 shadow-xl border border-black/5 dark:border-white/5"
                    >
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="flex-1 rounded-full flex p-1 h-12 sm:h-13 items-center relative transition-colors bg-white dark:bg-zinc-800 shadow-inner overflow-hidden">
                                <LayoutGroup id="tabs">
                                    {FREQUENCIES.map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => {
                                                setTempType(type);
                                                setTempSubValue(SUB_OPTIONS[type][0]);
                                            }}
                                            className={`relative flex-1 text-center h-full flex items-center justify-center font-bold text-xs sm:text-[17px] z-10 px-0.5 sm:px-1 transition-colors ${
                                                tempType === type 
                                                ? 'text-zinc-900 dark:text-white' 
                                                : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-600'
                                            }`}
                                        >
                                            {tempType === type && (
                                                <motion.div
                                                    layoutId="active-bg"
                                                    transition={smoothSpring}
                                                    className="absolute inset-0 rounded-full shadow-sm z-[-1] bg-zinc-100 dark:bg-zinc-700"
                                                />
                                            )}
                                            {type}
                                        </button>
                                    ))}
                                </LayoutGroup>
                            </div>

                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={handleConfirm}
                                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 transition-colors bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90"
                            >
                                <Check size={20} strokeWidth={3} />
                            </motion.button>
                        </div>

                        <AnimatePresence mode="wait">
                            {SUB_OPTIONS[tempType].length > 0 && (
                                <motion.div
                                    key={tempType}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={smoothSpring}
                                    className="px-0.5 pb-0.5"
                                >
                                    <div 
                                        className={`grid gap-1 rounded-[22px] p-2 transition-colors bg-white dark:bg-zinc-800 shadow-inner overflow-y-auto max-h-45 sm:max-h-none ${
                                            tempType === 'Monthly' ? 'grid-cols-6 sm:grid-cols-7' : 
                                            tempType === 'Yearly' ? 'grid-cols-3 sm:grid-cols-4' : 
                                            'grid-cols-4 sm:grid-cols-7'
                                        }`}
                                    >
                                        {SUB_OPTIONS[tempType].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => setTempSubValue(option)}
                                                className={`h-8 sm:h-9 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center
                                                     ${tempSubValue === option
                                                        ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-700 dark:text-white shadow-sm'
                                                        : 'text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300'
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};