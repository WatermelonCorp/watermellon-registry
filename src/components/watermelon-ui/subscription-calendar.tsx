"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Search,
    Download
} from 'lucide-react';
import { TbCube } from 'react-icons/tb';

/* ---------- Types ---------- */
export interface SubscriptionDay {
    date: number;
    isMuted?: boolean;
    isLogo?: React.ReactNode[];
    indicators?: React.ReactNode[];
}

export interface SubscriptionCalendarProps {
    month: string;
    year: number;
    days: SubscriptionDay[];
    monthlyTotal: number;
    subscriptionsCount: number;
    newCount: number;
    onPrevMonth?: () => void;
    onNextMonth?: () => void;
}

/* ---------- Motion ---------- */
const spring = {
    type: 'spring',
    stiffness: 420,
    damping: 28,
    mass: 0.6
} as const;

/* ---------- Main Component ---------- */
export const SubscriptionCalendar: React.FC<SubscriptionCalendarProps> = ({
    month,
    year,
    days,
    monthlyTotal,
    subscriptionsCount,
    newCount,
    onPrevMonth,
    onNextMonth
}) => {
    const [selectedId, setSelectedId] = useState<string | null>("day-28");

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-10 font-sans transition-colors duration-500 bg-transparent">
            
            <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={spring}
                className="w-full max-w-105 rounded-[26px] bg-white dark:bg-[#0f0f10] border border-zinc-200 dark:border-[#1f1f1f] shadow-2xl p-4 sm:p-5 transition-all duration-500">
                <div className="flex items-center justify-between mb-4 gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                        <h2 className="text-[12px] sm:text-[13px] font-medium text-zinc-800 dark:text-[#D8D8D8] truncate">
                            {month}, {year}
                        </h2>
                        <span className="hidden xs:inline-block px-3 py-0.5 rounded-full border border-zinc-200 dark:border-white/20 text-[10px] bg-transparent text-zinc-500 dark:text-[#a3a3a3] cursor-default whitespace-nowrap">
                            Today
                        </span>
                        <div className="flex items-center gap-1 sm:gap-2 ml-1">
                            <button title='backward'
                                onClick={onPrevMonth}
                                className="p-1 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-md transition-colors text-zinc-400 dark:text-[#7c7b7b] hover:text-zinc-900 dark:hover:text-white shrink-0"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button title='forward'
                                onClick={onNextMonth}
                                className="p-1 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-md transition-colors text-zinc-400 dark:text-[#7c7b7b] hover:text-zinc-900 dark:hover:text-white shrink-0"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                    <button title='add event' className="w-10 h-7 sm:w-11 sm:h-7 rounded-full bg-[#fa6a2e] text-white dark:text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-[0_0_15px_rgba(250,106,46,0.2)] shrink-0">
                        <Plus size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2 text-[8px] sm:text-[9px] font-semibold text-zinc-500 dark:text-[#d4d4d4] tracking-wider">
                    {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => (
                        <div key={d} className="text-center py-1.5 bg-zinc-50 dark:bg-[#2A2A2A]/50 border-zinc-100 dark:border-[#222] rounded-full">{d}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                    {days.map((day, idx) => {
                        const uniqueId = `day-${day.date}-${idx}`;
                        const isActive = selectedId === uniqueId;

                        return (
                            <motion.button
                                key={uniqueId}
                                layout
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedId(uniqueId)}
                                transition={spring}
                                className={`
                                    relative aspect-square sm:h-12 rounded-xl border text-[10px] sm:text-[11px] font-medium transition-colors
                                    flex flex-col items-center justify-center
                                    ${day.isMuted
                                        ? 'bg-zinc-50 dark:bg-[#0e0e0f] border-zinc-100 dark:border-[#161616] text-zinc-300 dark:text-[#333]'
                                        : 'bg-zinc-50/50 dark:bg-[#2A2A2A]/50 border-zinc-100 dark:border-[#222] text-zinc-700 dark:text-[#d4d4d4] hover:border-zinc-300 dark:hover:border-[#333]'
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute inset-0 rounded-xl border-[1.5px] border-[#b3522f] bg-orange-50 dark:bg-[#32211A] z-0"
                                        transition={spring}
                                    />
                                )}

                                <div className='flex flex-col justify-start items-center gap-0.5 sm:gap-1 relative z-10'>
                                    <span>{day.date}</span>
                                    <span className="scale-75 sm:scale-100">{day.isLogo}</span>
                                </div>

                                {day.indicators && (
                                    <div className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 flex gap-0.5">
                                        {day.indicators}
                                    </div>
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Footer Info*/}
                <div className="mt-5 flex items-center justify-between text-[8px] sm:text-[9px] font-semibold tracking-widest text-zinc-400 dark:text-[#555] gap-2">
                    <div className="flex items-center gap-2 sm:gap-4">
                        <span className="flex items-center gap-1.5 hover:text-[#a855f7] transition-colors cursor-default">
                            <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#a855f7]" />
                            MONTHLY
                        </span>
                        <span className="flex items-center gap-1.5 hover:text-[#facc15] transition-colors cursor-default">
                            <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#facc15]" />
                            YEARLY
                        </span>
                    </div>

                    <span className="text-zinc-500 dark:text-[#666] whitespace-nowrap">
                        <span className="text-zinc-900 dark:text-[#ccc7c7]">{subscriptionsCount}</span> SUBS / <span className="text-zinc-900 dark:text-[#ccc7c7]">{newCount}</span> NEW
                    </span>
                </div>

                {/* Bottom Bar*/}
                <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-[#1a1a1b] flex items-center justify-between gap-2">
                    <div className="flex gap-3 sm:gap-4 text-zinc-400 dark:text-[#555]">
                        <Search size={16} className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer shrink-0" />
                        <Download size={16} className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer shrink-0" />
                        <TbCube size={16} className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer shrink-0" />
                    </div>

                    <div className="text-[9px] sm:text-[10px] font-medium text-zinc-500 dark:text-[#666] truncate">
                        MONTHLY TOTAL :{' '}
                        <span className="text-zinc-900 dark:text-white text-[11px] sm:text-[12px] ml-1 font-bold">${monthlyTotal.toFixed(2)}</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};