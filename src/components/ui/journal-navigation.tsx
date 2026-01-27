import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';

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
    const [isDark, setIsDark] = useState(false);

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
        center: {
            y: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            y: direction > 0 ? -10 : 10,
            opacity: 0,
        }),
    };

    const ITEM_HEIGHT = 24;

    return (
        <div className={`min-h-screen w-full flex flex-col items-center justify-center p-6 transition-colors duration-500 ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#fefefe]'}`}>
            
            {/* Theme Toggle */}
            <button 
                onClick={() => setIsDark(!isDark)}
                className={`mb-8 p-3 rounded-full border transition-all active:scale-90 ${isDark ? 'bg-[#1C1C1E] border-white/10 text-yellow-400' : 'bg-white border-black/5 text-gray-400 shadow-sm'}`}
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className={`relative w-full max-w-[360px] h-[340px] rounded-[32px] shadow-sm flex overflow-hidden select-none border transition-colors duration-300 ${
                isDark ? 'bg-[#1A1A1C] border-white/5' : 'bg-[#F3EFE9] border-[#e5e4de]/50'
            }`}>

                {/* vertical left area */}
                <div className={`w-[54px] m-1 flex flex-col items-center justify-center relative z-10 rounded-full border transition-colors duration-300 overflow-hidden ${
                    isDark ? 'bg-[#242426] border-white/5' : 'bg-[#FEFEFE] border-[#e5e4de]/50'
                }`}>

                    {/* Top Blur Overlay */}
                    <div className={`absolute top-0 left-0 w-full h-20 z-20 pointer-events-none backdrop-blur-[0.5px] ${
                        isDark ? 'bg-gradient-to-b from-[#242426] via-[#242426]/80 to-transparent' : 'bg-gradient-to-b from-[#FEFEFE] via-[#FEFEFE]/80 to-transparent'
                    }`} />

                    {/* Vertical Track Wrapper */}
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
                                        className={`h-[37px] w-[37px] flex items-center justify-center rounded-full text-[16px] font-bold transition-colors cursor-pointer shrink-0 ${
                                            isActive 
                                            ? (isDark ? 'text-white bg-white/10' : 'text-[#1C1C1E] bg-[#F0ECE6]') 
                                            : (isDark ? 'text-gray-600 hover:text-gray-400' : 'text-[#B0AFB8] hover:bg-[#F0ECE6]')
                                        }`}
                                    >
                                        {entry.day.toString().padStart(2, '0')}
                                    </motion.button>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Bottom Blur Overlay */}
                    <div className={`absolute bottom-0 left-0 w-full h-20 z-20 pointer-events-none backdrop-blur-[0.5px] ${
                        isDark ? 'bg-gradient-to-t from-[#242426] via-[#242426]/80 to-transparent' : 'bg-gradient-to-t from-[#FEFEFE] via-[#FEFEFE]/80 to-transparent'
                    }`} />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-4 flex flex-col">
                    {/* Header */}
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
                                    className={`text-lg font-medium tracking-tight ${isDark ? 'text-gray-500' : 'text-[#918D87]'}`}
                                >
                                    {currentEntry.month} {currentEntry.day}
                                </motion.h2>
                            </AnimatePresence>
                        </div>

                        <div className="flex gap-2">
                            {[ 
                                { title: 'left', action: handlePrev, disabled: currentIndex === 0, icon: <ChevronLeft size={20} strokeWidth={2.5}/> },
                                { title: 'right', action: handleNext, disabled: currentIndex === entries.length - 1, icon: <ChevronRight size={20} strokeWidth={2.5}/> }
                            ].map((btn) => (
                                <button key={btn.title} title={btn.title}
                                    onClick={btn.action}
                                    disabled={btn.disabled}
                                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                                        isDark 
                                        ? 'bg-white/5 text-gray-500 hover:bg-white/10 disabled:opacity-20' 
                                        : 'bg-[#Fefefe] text-[#B8B8B5] hover:bg-[#Fefefe]/70 disabled:hover:bg-[#f2f1eb]'
                                    }`}
                                >
                                    {btn.icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="flex-1 overflow-hidden">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentEntry.id}
                                custom={direction}
                                variants={contentVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                className={`text-[18px] -tracking-wide leading-relaxed font-bold transition-colors ${
                                    isDark ? 'text-gray-200' : 'text-[#292422]'
                                }`}
                            >
                                {currentEntry.content}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};