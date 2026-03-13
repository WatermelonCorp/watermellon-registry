"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown,
    Search,
    Plus,
    MoreHorizontal,
    Download,
    RefreshCcw,
    ChevronLeft,
    ChevronRight,
    MoreVertical
} from 'lucide-react';

/* ---------- Types ---------- */
export interface TradeItem {
    id: string;
    asset: string;
    session: string;
    market: string;
    strategy: string;
    description: string;
    pnl: number;
    sparklineData: number[];
    tags: string[];
    contracts: number;
    side: 'LONG' | 'SHORT';
}

interface TradeSummaryProps {
    date: string;
    trades: TradeItem[];
    onAddTrade?: () => void;
}

/* ---------- Sub-components ---------- */
const Sparkline: React.FC<{ data: number[], color: string }> = ({ data, color }) => {
    const width = 80;
    const height = 24;
    const padding = 2;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - padding - ((d - min) / range) * (height - 2 * padding);
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
            <motion.polyline
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            />
        </svg>
    );
};

const FilterButton: React.FC<{ label: string }> = ({ label }) => (
    <button className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-transparent border border-gray-200 dark:border-[#2d2d2d] text-zinc-500 dark:text-[#a3a3a3] text-[11px] whitespace-nowrap hover:text-zinc-900 dark:hover:text-white transition-colors duration-200">
        {label}
        <ChevronDown size={12} className="mt-0.5" />
    </button>
);

const TradeCard: React.FC<{ trade: TradeItem }> = ({ trade }) => {
    const isPositive = trade.pnl >= 0;
    const accentColor = isPositive ? '#22c55e' : '#ef4444';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            whileHover={{ y: -1 }}
            className="group relative bg-transparent border-b border-gray-100 dark:border-[#1c1c1c] last:border-0 py-4 px-1 transition-all duration-300"
        >
            <div className="flex items-start gap-2.5 sm:gap-3.5">
                <div className="pt-1">
                    <div className="w-4 h-4 rounded border-2 border-gray-200 dark:border-[#2d2d2d] group-hover:border-gray-400 dark:group-hover:border-[#4d4d4d] cursor-pointer transition-colors duration-200" />
                </div>

                <div className="flex-1 min-w-0"> 
                    <div className="flex justify-between items-start mb-1 gap-2">
                        <div className="truncate">
                            <h3 className="text-sm sm:text-base font-medium text-zinc-800 dark:text-[#C4C4C4] tracking-tight truncate">{trade.asset}</h3>
                            <div className="flex items-center gap-1 sm:gap-1.5 mt-0 text-[8px] sm:text-[9px] font-bold text-zinc-400 dark:text-[#5F5F5F] tracking-wider uppercase">
                                <span>{trade.session}</span>
                                <span>•</span>
                                <span className="truncate">{trade.market}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="hidden xs:block">
                                    <Sparkline data={trade.sparklineData} color={accentColor} />
                                </div>
                                <span className={`text-sm sm:text-base font-bold ${isPositive ? 'text-[#15CA25]' : 'text-red-500'} tabular-nums`}>
                                    {isPositive ? '+' : ''}${Math.abs(trade.pnl).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                            <button title='more' className="text-zinc-400 dark:text-[#f1f1f1]/70 hover:text-zinc-600 dark:hover:text-[#575656] duration-300 transition-colors">
                                <MoreHorizontal size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="mt-2 sm:mt-3">
                        <h4 className="text-[11px] sm:text-[12px] font-medium text-zinc-700 dark:text-[#C4C4C4]">{trade.strategy}</h4>
                        <p className="text-[11px] sm:text-[12px] text-zinc-500 dark:text-[#6A6A6A] mt-0.5 max-w-full leading-relaxed line-clamp-2 sm:line-clamp-none">
                            {trade.description}
                        </p>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div className="flex flex-wrap gap-1.5">
                            {trade.tags.map(tag => (
                                <span key={tag} className="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-[#1c1c1c] border border-zinc-200 dark:border-[#828282]/70 text-[9px] sm:text-[10px] text-zinc-500 dark:text-[#828282] hover:bg-zinc-200 dark:hover:text-white cursor-default transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 justify-between sm:justify-end">
                            <span className="text-[8px] px-2 pt-1 pb-0.5 bg-purple-50 dark:bg-[#292232] rounded-full border-[0.5px] border-purple-200 dark:border-[#8b5cf6]/70 font-bold text-purple-600 dark:text-[#8b5cf6] uppercase tracking-widest">{trade.contracts} CTRS</span>
                            <span className={`text-[8px] px-2 pt-1 pb-0.5 rounded-full border-[0.5px] font-bold uppercase tracking-widest ${
                                trade.side === 'LONG' 
                                ? 'text-[#15CA25] bg-green-50 dark:bg-[#172C19] border-green-200 dark:border-[#15CA25]/70' 
                                : 'text-red-500 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-500/70'
                            }`}>
                                {trade.side}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

/* ---------- Main ---------- */
export const TradeSummary: React.FC<TradeSummaryProps> = ({ date, trades, onAddTrade }) => {
    const totalPnl = trades.reduce((acc, curr) => acc + curr.pnl, 0);
    const isPositiveTotal = totalPnl >= 0;

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center transition-colors duration-500 p-2 sm:p-4 md:p-8 bg-transparent mt-36">
            <div className="w-full max-w-130">
                <div className="bg-white dark:bg-[#0a0a0a] rounded-[24px] overflow-hidden shadow-xl border border-zinc-200 dark:border-[#1c1c1c] flex flex-col transition-all duration-500">
                    
                    {/* Top Header */}
                    <header className="px-3 sm:px-4 py-3 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-sm tracking-normal">
                            <span className="text-zinc-900 dark:text-[#E4E4E4] font-medium text-[12px] sm:text-[14px]">Today</span>
                            <span className="text-zinc-300 dark:text-[#525252] text-xs font-bold">/</span>
                            <span className="text-zinc-500 dark:text-[#a3a3a3] text-[8px] sm:text-[9px] font-bold tracking-widest sm:tracking-[0.2em] uppercase">{date}</span>
                            <span className="text-zinc-300 dark:text-[#525252] mx-0.5">•</span>
                            <span className={`font-bold text-[10px] sm:text-[11px] ${isPositiveTotal ? 'text-[#15CA25]' : 'text-red-500'}`}>
                                {isPositiveTotal ? '+' : ''}{totalPnl.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                            </span>
                        </div>

                        <button
                            onClick={onAddTrade}
                            className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-full bg-[#FA692E] hover:bg-[#ea6733] text-white dark:text-black/70 text-[10px] sm:text-[12px] font-bold transition-all active:scale-95 shadow-md"
                        >
                            <Plus size={14} className="sm:w-4 sm:h-4" />
                            Add Trade
                        </button>
                    </header>

                    {/* Toolbar / Filters */}
                    <div className="px-3 sm:px-4 pb-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-t-[22px] pt-4 bg-zinc-50 dark:bg-[#171717]">
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
                            <FilterButton label="All results" />
                            <FilterButton label="All strategies" />
                            <FilterButton label="More" />
                        </div>
                        
                        <div className="relative group flex-1">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-[#525252] group-focus-within:text-zinc-600 dark:group-focus-within:text-white/40 transition-colors" size={14} />
                            <input
                                type="text"
                                placeholder="Search trades..."
                                className="w-full bg-white dark:bg-[#141414] border border-zinc-200 dark:border-[#2d2d2d] rounded-2xl pl-8 pr-3 py-1.5 text-[12px] text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#525252] focus:outline-none focus:border-zinc-400 dark:focus:border-[#4d4d4d] transition-all"
                            />
                        </div>
                    </div>

                    {/* Trade List Container */}
                    <div className="px-3 sm:px-4 flex-1 min-h-87.5 sm:min-h-100 bg-zinc-50 dark:bg-[#171717] rounded-b-[22px] pb-2 overflow-y-auto">
                        <AnimatePresence mode="popLayout">
                            {trades.map((trade) => (
                                <TradeCard key={trade.id} trade={trade} />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Footer Navigation */}
                    <footer className="px-3 sm:px-4 py-4 bg-white dark:bg-[#0a0a0a] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start">
                            <button title='options' className="text-zinc-400 dark:text-[#525252] hover:text-zinc-900 dark:hover:text-white transition-colors">
                                <MoreVertical size={18} />
                            </button>
                            <div className="h-3 w-px bg-zinc-200 dark:bg-[#2d2d2d]" />
                            <button title='download' className="text-zinc-400 dark:text-[#525252] hover:text-zinc-900 dark:hover:text-white transition-colors">
                                <Download size={18} />
                            </button>
                            <button title='refresh' className="text-zinc-400 dark:text-[#525252] hover:text-zinc-900 dark:hover:text-white transition-colors">
                                <RefreshCcw size={16} />
                            </button>
                        </div>

                        <div className="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
                            <button title='backward' className="text-zinc-200 dark:text-[#2d2d2d] cursor-not-allowed">
                                <ChevronLeft size={18} />
                            </button>
                            <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">
                                <span className="px-2 py-1.75 rounded-md bg-orange-50 dark:bg-[#2C1B14] border border-orange-200 dark:border-[#BB4D25]/70 text-orange-600 dark:text-[#BB4D25]">JAN 12</span>
                                <span className="text-zinc-400 dark:text-[#707070] hover:text-zinc-600 dark:hover:text-[#9e6969] cursor-pointer transition-colors">JAN 11</span>
                                <span className="text-zinc-400 dark:text-[#707070] hover:text-zinc-600 dark:hover:text-[#a3a3a3] cursor-pointer transition-colors">JAN 10</span>
                            </div>
                            <button title='forward' className="text-zinc-400 dark:text-[#707070] hover:text-zinc-900 dark:hover:text-white transition-colors">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};