import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface JournalEntry {
    id: string | number;
    day: number;
    month: string;
    year?: number;
    content: React.ReactNode;
}

interface JournalNavigationProps {
    entries: JournalEntry[];
    initialIndex?: number;
    onEntryChange?: (entry: JournalEntry) => void;
}

export const JournalNavigation: React.FC<JournalNavigationProps> = ({
    entries,
    initialIndex = 0,
    onEntryChange,
}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [direction, setDirection] = useState(0);

    const handleNext = () => {
        if (currentIndex < entries.length - 1) {
            setDirection(1);
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            setCurrentIndex((prev) => prev - 1);
        }
    };

    useEffect(() => {
        if (onEntryChange) {
            onEntryChange(entries[currentIndex]);
        }
    }, [currentIndex, entries, onEntryChange]);

    const currentEntry = entries[currentIndex];

    const contentVariants = {
        enter: (direction: number) => ({
            y: direction > 0 ? 10 : -10,
            opacity: 0,
        }),
        center: { y: 0, opacity: 1 },
        exit: (direction: number) => ({
            y: direction > 0 ? -10 : 10,
            opacity: 0,
        }),
    };

    const ITEM_HEIGHT = 24;

    return (
        <div className="min-h-full w-full flex flex-col items-center justify-center p-6 transition-colors duration-500 bg-transparent">

            <div className="relative w-full max-w-90 h-85 rounded-[32px] shadow-sm flex overflow-hidden select-none border transition-colors duration-300 bg-[#F3EFE9] border-[#e5e4de]/50 dark:bg-neutral-900 dark:border-neutral-800">

                <div className="w-13.5 m-1 flex flex-col items-center justify-center relative z-10 rounded-full border transition-colors duration-300 overflow-hidden bg-[#FEFEFE] border-[#e5e4de]/50 dark:bg-neutral-800 dark:border-neutral-700">

                    <div className="absolute top-0 left-0 w-full h-20 z-20 pointer-events-none backdrop-blur-[0.5px] bg-linear-to-b from-[#FEFEFE] via-[#FEFEFE]/80 to-transparent dark:from-neutral-800 dark:via-neutral-800/80 dark:to-transparent" />

                    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-10">
                        <motion.div
                            animate={{ y: -(currentIndex * ITEM_HEIGHT) }}
                            transition={{ type: 'spring', stiffness: 260, damping: 32, mass: 0.6 }}
                            className="flex flex-col items-center gap-2"
                        >
                            {entries.map((entry, index) => {
                                const isActive = index === currentIndex;
                                return (
                                    <motion.button
                                        key={entry.id}
                                        onClick={() => setCurrentIndex(index)}
                                        animate={{ scale: isActive ? 1.2 : 1 }}
                                        className={`h-9.25 w-9.25 flex items-center justify-center rounded-full text-[16px] font-bold transition-colors cursor-pointer shrink-0 
                                            ${isActive
                                                ? 'text-[#1C1C1E] bg-[#F0ECE6] dark:text-white dark:bg-neutral-700'
                                                : 'text-[#B0AFB8] hover:bg-[#F0ECE6] dark:text-neutral-600 dark:hover:text-neutral-400'
                                            }`}
                                    >
                                        {entry.day.toString().padStart(2, '0')}
                                    </motion.button>
                                );
                            })}
                        </motion.div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-20 z-20 pointer-events-none backdrop-blur-[0.5px] bg-linear-to-t from-[#FEFEFE] via-[#FEFEFE]/80 to-transparent dark:from-neutral-800 dark:via-neutral-800/80 dark:to-transparent" />
                </div>

                <div className="flex-1 p-4 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <div className="overflow-hidden">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.h2
                                    key={currentEntry.month + currentEntry.day}
                                    custom={direction}
                                    variants={contentVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                    className="text-lg font-medium tracking-tight text-[#918D87] dark:text-neutral-400"
                                >
                                    {currentEntry.month} {currentEntry.day}
                                </motion.h2>
                            </AnimatePresence>
                        </div>

                        <div className="flex gap-2">
                            {[
                                { title: 'left', action: handlePrev, disabled: currentIndex === 0, icon: <ChevronLeft size={20} strokeWidth={2.5} /> },
                                { title: 'right', action: handleNext, disabled: currentIndex === entries.length - 1, icon: <ChevronRight size={20} strokeWidth={2.5} /> }
                            ].map((btn) => (
                                <button
                                    key={btn.title}
                                    title={btn.title}
                                    onClick={btn.action}
                                    disabled={btn.disabled}
                                    className="w-8 h-8 flex items-center justify-center rounded-full transition-colors bg-[#Fefefe] text-[#B8B8B5] hover:bg-[#Fefefe]/70 disabled:hover:bg-[#f2f1eb] dark:bg-neutral-800 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:disabled:opacity-20"
                                >
                                    {btn.icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="flex-1">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={currentEntry.id}
                                    custom={direction}
                                    variants={contentVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                    className="text-[18px] -tracking-wide leading-relaxed font-bold transition-colors text-[#292422] dark:text-neutral-200"
                                >
                                    {currentEntry.content}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};