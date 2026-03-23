"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
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
        <div className="theme-injected min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-10 font-sans transition-colors duration-500 bg-transparent">

            <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={spring}
                className="w-full max-w-105 rounded-3xl bg-card border border-border shadow-2xl p-4 sm:p-5 transition-all duration-500">
                <div className="flex items-center justify-between mb-4 gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                        <h2 className="text-xs sm:text-sm font-medium text-foreground truncate">
                            {month}, {year}
                        </h2>
                        <span className="hidden xs:inline-block px-3 py-1 rounded-full border border-input text-[10px] bg-transparent text-muted-foreground cursor-default whitespace-nowrap">
                            Today
                        </span>
                        <div className="flex items-center gap-1 sm:gap-2 ml-1">
                            <button title='backward'
                                onClick={onPrevMonth}
                                className="p-1 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-foreground shrink-0"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button title='forward'
                                onClick={onNextMonth}
                                className="p-1 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-foreground shrink-0"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                    <button title='add event' className="w-10 h-7 sm:w-11 sm:h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg shrink-0">
                        <Plus size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2 text-[8px] sm:text-[9px] font-semibold text-muted-foreground tracking-wider">
                    {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => (
                        <div key={d} className="text-center py-1.5 bg-muted/60 border border-border rounded-full">{d}</div>
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
                                        ? 'bg-muted/40 border-border text-muted-foreground/60'
                                        : 'bg-muted/60 border-border text-foreground hover:border-input'
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute inset-0 rounded-xl border border-primary/50 bg-primary/10 z-0"
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
                <div className="mt-5 flex items-center justify-between text-[8px] sm:text-[9px] font-semibold tracking-widest text-muted-foreground gap-2">
                    <div className="flex items-center gap-2 sm:gap-4">
                        <span className="flex items-center gap-1.5 hover:text-chart-2 transition-colors cursor-default">
                            <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-chart-2" />
                            MONTHLY
                        </span>
                        <span className="flex items-center gap-1.5 hover:text-chart-4 transition-colors cursor-default">
                            <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-chart-4" />
                            YEARLY
                        </span>
                    </div>

                    <span className="text-muted-foreground whitespace-nowrap">
                        <span className="text-foreground">{subscriptionsCount}</span> SUBS / <span className="text-foreground">{newCount}</span> NEW
                    </span>
                </div>

                {/* Bottom Bar*/}
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-2">
                    <div className="flex gap-3 sm:gap-4 text-muted-foreground">
                        <Search size={16} className="hover:text-foreground transition-colors cursor-pointer shrink-0" />
                        <Download size={16} className="hover:text-foreground transition-colors cursor-pointer shrink-0" />
                        <TbCube size={16} className="hover:text-foreground transition-colors cursor-pointer shrink-0" />
                    </div>

                    <div className="text-[9px] sm:text-[10px] font-medium text-muted-foreground truncate">
                        MONTHLY TOTAL :{' '}
                        <span className="text-foreground text-[11px] sm:text-[12px] ml-1 font-bold">${monthlyTotal.toFixed(2)}</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};