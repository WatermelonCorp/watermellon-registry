"use client";

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
const Sparkline: React.FC<{ data: number[], lineClassName: string }> = ({ data, lineClassName }) => {
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
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={`overflow-visible ${lineClassName}`}>
            <motion.polyline
                fill="none"
            stroke="currentColor"
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
    <button className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-transparent border border-border text-muted-foreground text-[11px] whitespace-nowrap hover:text-foreground transition-colors duration-200">
        {label}
        <ChevronDown size={12} className="mt-0.5" />
    </button>
);

const TradeCard: React.FC<{ trade: TradeItem }> = ({ trade }) => {
    const isPositive = trade.pnl >= 0;
    const accentClass = isPositive ? 'text-chart-2' : 'text-destructive';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            whileHover={{ y: -1 }}
            className="group relative bg-transparent border-b border-border last:border-0 py-4 px-1 transition-all duration-300"
        >
            <div className="flex items-start gap-2.5 sm:gap-3.5">
                <div className="pt-1">
                    <div className="w-4 h-4 rounded border-2 border-border group-hover:border-input cursor-pointer transition-colors duration-200" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1 gap-2">
                        <div className="truncate">
                            <h3 className="text-sm sm:text-base font-medium text-foreground tracking-tight truncate">{trade.asset}</h3>
                            <div className="flex items-center gap-1 sm:gap-1.5 mt-0 text-[8px] sm:text-[9px] font-bold text-muted-foreground tracking-wider uppercase">
                                <span>{trade.session}</span>
                                <span>•</span>
                                <span className="truncate">{trade.market}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="hidden xs:block">
                                    <Sparkline data={trade.sparklineData} lineClassName={accentClass} />
                                </div>
                                <span className={`text-sm sm:text-base font-bold ${isPositive ? 'text-chart-2' : 'text-destructive'} tabular-nums`}>
                                    {isPositive ? '+' : ''}${Math.abs(trade.pnl).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                            <button title='more' className="text-muted-foreground hover:text-foreground duration-300 transition-colors">
                                <MoreHorizontal size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="mt-2 sm:mt-3">
                        <h4 className="text-[11px] sm:text-[12px] font-medium text-foreground">{trade.strategy}</h4>
                        <p className="text-[11px] sm:text-[12px] text-muted-foreground mt-1 max-w-full leading-relaxed line-clamp-2 sm:line-clamp-none">
                            {trade.description}
                        </p>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div className="flex flex-wrap gap-1.5">
                            {trade.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 rounded-full bg-muted border border-border text-[9px] sm:text-[10px] text-muted-foreground hover:bg-secondary hover:text-secondary-foreground cursor-default transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 justify-between sm:justify-end">
                            <span className="text-[8px] px-2 py-1 bg-secondary rounded-full border border-border font-bold text-secondary-foreground uppercase tracking-widest">{trade.contracts} CTRS</span>
                            <span className={`text-[8px] px-2 pt-1 pb-0.5 rounded-full border-[0.5px] font-bold uppercase tracking-widest ${trade.side === 'LONG'
                                    ? 'text-chart-2 bg-chart-2/10 border-chart-2/40'
                                    : 'text-destructive bg-destructive/10 border-destructive/40'
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
        <div className="theme-injected font-sans min-h-screen w-full flex flex-col items-center justify-center transition-colors duration-500 p-2 sm:p-4 md:p-8 bg-transparent mt-36">
            <div className="w-full max-w-130">
                <div className="bg-card rounded-3xl overflow-hidden shadow-xl border border-border flex flex-col transition-all duration-500">

                    {/* Top Header */}
                    <header className="px-3 sm:px-4 py-3 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-sm tracking-normal">
                            <span className="text-foreground font-medium text-xs sm:text-sm">Today</span>
                            <span className="text-border text-xs font-bold">/</span>
                            <span className="text-muted-foreground text-[8px] sm:text-[9px] font-bold tracking-widest sm:tracking-[0.2em] uppercase">{date}</span>
                            <span className="text-border mx-0.5">•</span>
                            <span className={`font-bold text-[10px] sm:text-[11px] ${isPositiveTotal ? 'text-chart-2' : 'text-destructive'}`}>
                                {isPositiveTotal ? '+' : ''}{totalPnl.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                            </span>
                        </div>

                        <button
                            onClick={onAddTrade}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] sm:text-[12px] font-bold transition-all active:scale-95 shadow-md"
                        >
                            <Plus size={14} className="sm:w-4 sm:h-4" />
                            Add Trade
                        </button>
                    </header>

                    {/* Toolbar / Filters */}
                    <div className="px-3 sm:px-4 pb-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-t-3xl pt-4 bg-muted/60">
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
                            <FilterButton label="All results" />
                            <FilterButton label="All strategies" />
                            <FilterButton label="More" />
                        </div>

                        <div className="relative group flex-1">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" size={14} />
                            <input
                                type="text"
                                placeholder="Search trades..."
                                className="w-full bg-background border border-input rounded-2xl pl-8 pr-3 py-2 text-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-ring transition-all"
                            />
                        </div>
                    </div>

                    {/* Trade List Container */}
                    <div className="px-3 sm:px-4 flex-1 min-h-87.5 sm:min-h-100 bg-muted/60 rounded-b-3xl pb-2 overflow-y-auto">
                        <AnimatePresence mode="popLayout">
                            {trades.map((trade) => (
                                <TradeCard key={trade.id} trade={trade} />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Footer Navigation */}
                    <footer className="px-3 sm:px-4 py-4 bg-card flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start">
                            <button title='options' className="text-muted-foreground hover:text-foreground transition-colors">
                                <MoreVertical size={18} />
                            </button>
                            <div className="h-3 w-px bg-border" />
                            <button title='download' className="text-muted-foreground hover:text-foreground transition-colors">
                                <Download size={18} />
                            </button>
                            <button title='refresh' className="text-muted-foreground hover:text-foreground transition-colors">
                                <RefreshCcw size={16} />
                            </button>
                        </div>

                        <div className="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
                            <button title='backward' className="text-border cursor-not-allowed">
                                <ChevronLeft size={18} />
                            </button>
                            <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">
                                <span className="px-2 py-2 rounded-md bg-primary/10 border border-primary/40 text-primary">JAN 12</span>
                                <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">JAN 11</span>
                                <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">JAN 10</span>
                            </div>
                            <button title='forward' className="text-muted-foreground hover:text-foreground transition-colors">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};