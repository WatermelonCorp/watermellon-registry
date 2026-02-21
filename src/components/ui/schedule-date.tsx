"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";

interface DateRange {
    start: Date | null;
    end: Date | null;
}

interface ScheduleDateProps {
    onApply?: (range: DateRange) => void;
    onCancel?: () => void;
}

const PRESETS = [
    { label: 'Today', id: 'today' },
    { label: 'Yesterday', id: 'yesterday' },
    { label: 'Last 7 Days', id: '7d' },
    { label: 'Last 30 Days', id: '30d' },
    { label: 'Last 365 Days', id: '365d' },
    { label: 'Week to Date', id: 'wtd' },
    { label: 'Month to Date', id: 'mtd' },
    { label: 'Year to Date', id: 'ytd' },
    { label: 'Custom', id: 'custom' },
];

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export const ScheduleDate: React.FC<ScheduleDateProps> = ({ onApply, onCancel }) => {
    const [selectedPreset, setSelectedPreset] = useState('custom');
    const [viewDate, setViewDate] = useState(new Date(2025, 9, 1));
    const [range, setRange] = useState<DateRange>({
        start: new Date(2025, 9, 15),
        end: new Date(2025, 9, 25),
    });

    const handleDateClick = (date: Date) => {
        if (!range.start || (range.start && range.end)) {
            setRange({ start: date, end: null });
            setSelectedPreset('custom');
        } else {
            if (date < range.start) {
                setRange({ start: date, end: range.start });
            } else {
                setRange({ ...range, end: date });
            }
        }
    };

    const renderMonthGrid = (monthDate: Date, showLeftNav = false, showRightNav = false) => {
        const year = monthDate.getFullYear();
        const month = monthDate.getMonth();
        const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const monthName = monthDate.toLocaleString('default', { month: 'long', year: 'numeric' });

        return (
            <div className="flex-1 min-w-56">
                <div className="flex items-center justify-between mb-4 px-2">
                    {showLeftNav ? (
                        <button title='left' onClick={() => setViewDate(new Date(year, month - 1, 1))}
                            className="text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white transition-colors p-1">
                            <ChevronLeft size={18} strokeWidth={2.5} />
                        </button>
                    ) : <div className="w-7" />}
                    <span className="text-[13px] font-semibold text-neutral-800 dark:text-neutral-200 tracking-tight">{monthName}</span>
                    {showRightNav ? (
                        <button title='right' onClick={() => setViewDate(new Date(year, month + 1, 1))}
                            className="text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white transition-colors p-1">
                            <ChevronRight size={18} strokeWidth={2.5} />
                        </button>
                    ) : <div className="w-7" />}
                </div>

                <div className="grid grid-cols-7 gap-y-1 text-center relative">
                    {DAYS.map(d => (
                        <span key={d} className="text-[11px] font-medium text-neutral-400 dark:text-neutral-600 mb-2">{d}</span>
                    ))}
                    {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} className="h-8" />)}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const currentDayDate = new Date(year, month, day);
                        const isStart = range.start?.toDateString() === currentDayDate.toDateString();
                        const isEnd = range.end?.toDateString() === currentDayDate.toDateString();
                        const isInRange = range.start && range.end && currentDayDate > range.start && currentDayDate < range.end;

                        return (
                            <div key={day} onClick={() => handleDateClick(currentDayDate)} className="relative h-8 flex items-center justify-center group cursor-pointer">
                                {(isInRange || isStart || isEnd) && (
                                    <div className={cn(
                                        "absolute h-8 z-0",
                                        "bg-neutral-100 dark:bg-neutral-900/50 border-y border-neutral-200 dark:border-white/5",
                                        isStart ? 'left-1/2 rounded-l-lg border-l' : 'left-0',
                                        isEnd ? 'right-1/2 rounded-r-lg border-r' : 'right-0',
                                        isInRange && !isStart && !isEnd ? 'w-full' : ''
                                    )} />
                                )}
                                {(isStart || isEnd) ? (
                                    <div className="absolute w-8 h-8 rounded-lg bg-linear-to-b from-neutral-700 to-neutral-900 dark:from-neutral-800 dark:to-indigo-900/50 border border-neutral-600 dark:border-white/10 shadow-xl z-10 flex flex-col items-center justify-center">
                                        <span className="text-white text-xs font-bold">{day}</span>
                                        <motion.div layoutId="activeThumb" className="absolute bottom-1 w-2 h-[1.5px] bg-blue-400 dark:bg-indigo-500 rounded-full shadow-[0_0_8px_#6366f1]" />
                                    </div>
                                ) : (
                                    <span className={cn("relative z-10 text-[13px] font-normal transition-colors",
                                        isInRange ? 'text-neutral-900 dark:text-white' : 'text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white'
                                    )}>
                                        {day}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col w-full max-w-195 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden font-sans text-neutral-600 dark:text-neutral-400 shadow-2xl mx-auto ">
            <div className="flex flex-col md:flex-row min-h-0 md:min-h-105 w-full">
                {/* Sidebar */}
                <aside className="w-full md:w-52 border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 py-3 flex flex-row md:flex-col gap-1 overflow-x-auto no-scrollbar shrink-0 bg-neutral-50/50 dark:bg-neutral-950/20">
                    {PRESETS.map((preset, idx) => (
                        <React.Fragment key={preset.id}>
                            {[2, 5, 8].includes(idx) && <div className="hidden md:block h-px bg-neutral-200 dark:bg-neutral-800 my-1 mx-3" />}
                            <button
                                onClick={() => setSelectedPreset(preset.id)}
                                className={cn(
                                    "flex items-center justify-between mx-2 md:mx-3 px-3 py-1.5 rounded-lg text-xs md:text-[13px] transition-all duration-200 group whitespace-nowrap",
                                    selectedPreset === preset.id
                                        ? (preset.id === 'custom'
                                            ? 'bg-linear-to-b from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-medium'
                                            : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white')
                                        : 'hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-neutral-200'
                                )}
                            >
                                <span>{preset.label}</span>
                                {selectedPreset === preset.id && preset.id === 'custom' && (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-2"><Check size={12} /></motion.div>
                                )}
                            </button>
                        </React.Fragment>
                    ))}
                </aside>
                {/* Main Content */}
                <main className="flex-1 min-w-0 p-4 md:p-5 flex flex-col gap-6 bg-white dark:bg-transparent overflow-hidden">
                    {/* Inputs Area */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">
                        <DateInput label="Start date" date={range.start} />
                        <DateInput label="End date" date={range.end} />
                    </div>

                    {/* Calendars Container */}
                    <div className="flex flex-row gap-8 lg:gap-10 items-start overflow-x-auto overflow-y-hidden no-scrollbar pb-2 snap-x snap-mandatory">

                        {/* Left Month */}
                        <div className="shrink-0 snap-start">
                            {renderMonthGrid(viewDate, true, false)}
                        </div>

                        {/* Divider */}
                        <div className="hidden lg:block shrink-0 w-px bg-neutral-200 dark:bg-neutral-800 h-40 self-center opacity-50" />

                        {/* Right Month */}
                        <div className="shrink-0 snap-start">
                            {renderMonthGrid(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1), false, true)}
                        </div>
                    </div>
                </main>
            </div>

            <footer className="h-16 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 flex items-center justify-end px-6 gap-3 shrink-0">
                <button onClick={onCancel} className="px-4 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white transition-colors">Cancel</button>
                <button onClick={() => onApply?.(range)} className="px-5 py-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black text-xs font-semibold hover:opacity-90 transition-all shadow-lg active:scale-95">Apply</button>
            </footer>
        </div>
    );
};

const DateInput = ({ label, date }: { label: string, date: Date | null }) => (
    <div className="flex-1 flex flex-col gap-1.5">
        <label className="text-[12px] font-normal text-neutral-400 dark:text-neutral-500 ml-1">{label}</label>
        <div className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-3 py-2 text-xs md:text-[13px] text-neutral-600 dark:text-neutral-300 cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
            <span>{date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select Date'}</span>
            <ChevronDown size={14} className="text-neutral-400 dark:text-neutral-500" />
        </div>
    </div>
);