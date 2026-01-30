import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Search,
    Download,
    Sun,
    Moon
} from 'lucide-react';
import { TbCube } from 'react-icons/tb';


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


const spring = {
    type: 'spring',
    stiffness: 420,
    damping: 28,
    mass: 0.6
} as const;



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
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    return (
        <div 
            className="min-h-screen flex flex-col items-center justify-center p-10 font-sans transition-colors duration-500 relative"
            style={{ backgroundColor: theme === 'dark' ? '#0b0b0c' : '#f1f1f2' }}
        >
            {/* Theme Toggle Button */}
            <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`absolute top-10 right-10 p-2.5 rounded-xl border transition-all duration-300 z-50 ${
                    theme === 'dark' ? 'bg-[#0f0f10] border-[#1f1f1f] text-yellow-500' : 'bg-white border-gray-200 text-slate-800 shadow-lg'
                }`}
            >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={spring}
                className="w-[420px] rounded-[26px] bg-[#0f0f10] border border-[#1f1f1f] shadow-[0_40px_120px_rgba(0,0,0,0.65)] p-5 transition-all duration-500"
               style={{
                 filter: theme === 'light' ? 'invert(1.92) hue-rotate(200deg)' : 'none'
                }}>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-[13px] font-medium text-[#D8D8D8]">
                            {month}, {year}
                        </h2>
                        <span className="px-3 py-0.5 rounded-full border border-white/20 text-[10px] bg-transparent text-[#a3a3a3] cursor-default">
                            Today
                        </span>
                        <div className="flex items-center gap-2 ml-1">
                            <button title='backward'
                                onClick={onPrevMonth}
                                className="p-1 hover:bg-white/5 rounded-md transition-colors text-[#7c7b7b] hover:text-white"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button title='forward'
                                onClick={onNextMonth}
                                className="p-1 hover:bg-white/5 rounded-md transition-colors text-[#7c7b7b] hover:text-white"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                    <button title='add event' className="w-11 h-7 rounded-full bg-[#fa6a2e] text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-[0_0_15px_rgba(250,106,46,0.2)]">
                        <Plus size={16} />
                    </button>
                </div>

                {/* Weekdays */}
                <div className="grid grid-cols-7 gap-1 mb-2 text-[9px] font-semibold  text-[#d4d4d4] tracking-wider">
                    {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => (
                        <div key={d} className="text-center py-1.5 bg-[#2A2A2A]/50 border-[#222] rounded-full">{d}</div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1.5">
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
                  relative h-[48px] rounded-xl border text-[11px] font-medium transition-colors
                  ${day.isMuted
                                        ? 'bg-[#0e0e0f] border-[#161616] text-[#333]'
                                        : 'bg-[#2A2A2A]/50 border-[#222] text-[#d4d4d4] hover:border-[#333]'
                                    }`}
                            >
                                {/* Active Highlight Overlay */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute inset-0 rounded-xl border-[1.5px] border-[#b3522f] bg-[#32211A] z-0"
                                        transition={spring}
                                    />
                                )}

                                <div className='flex flex-col justify-start items-center gap-1'>
                                    <span className="relative z-10">{day.date}</span>
                                    <span className="relative z-10">{day.isLogo}</span>
                                </div>


                                {/* Indicators */}
                                {day.indicators && (
                                    <div className="absolute top-1.5 right-1.5 flex gap-0.5">
                                        {day.indicators}
                                    </div>
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Footer Info */}
                <div className="mt-5 flex items-center justify-between text-[9px] font-semibold tracking-widest text-[#555]">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5 hover:text-[#a855f7] transition-colors cursor-default">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
                            MONTHLY
                        </span>
                        <span className="flex items-center gap-1.5 hover:text-[#facc15] transition-colors cursor-default">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#facc15]" />
                            YEARLY
                        </span>
                    </div>

                    <span className="text-[#666]">
                        <span className="text-[#ccc7c7]">{subscriptionsCount}</span> SUBSCRIPTIONS / <span className="text-[#ccc7c7]">{newCount}</span> NEW
                    </span>
                </div>

                {/* Bottom Bar */}
                <div className="mt-4 pt-4 border-t border-[#1a1a1b] flex items-center justify-between">
                    <div className="flex gap-4 text-[#555]">
                        <Search size={16} className="hover:text-white transition-colors cursor-pointer" />
                        <Download size={16} className="hover:text-white transition-colors cursor-pointer" />
                        <TbCube size={16} className="hover:text-white transition-colors cursor-pointer" />
                    </div>

                    <div className="text-[10px] font-medium text-[#666]">
                        MONTHLY TOTAL :{' '}
                        <span className="text-white text-[12px] ml-1">${monthlyTotal.toFixed(2)}</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};