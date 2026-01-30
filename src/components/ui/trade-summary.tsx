import React, { useState } from 'react';
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
    MoreVertical,
    Sun,
    Moon
} from 'lucide-react';

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

// --- Sub-components ---

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
    <button className="flex items-center gap-1.5 px-2 py-[4px] rounded-md bg-transparent  border border-[#2d2d2d] text-[#a3a3a3] text-[11px] hover:text-white transition-colors duration-200">
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
            className="group relative bg-transparent border-b border-[#1c1c1c] last:border-0 py-4 px-1 transition-all duration-300"
        >
            <div className="flex items-start gap-3.5">
                {/* Checkbox Area */}
                <div className="pt-1">
                    <div className="w-4 h-4 rounded border-2 border-[#2d2d2d] group-hover:border-[#4d4d4d] cursor-pointer transition-colors duration-200" />
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    {/* Header row */}
                    <div className="flex justify-between items-start mb-1">
                        <div>
                            <h3 className="text-base font-medium text-[#C4C4C4] tracking-tight">{trade.asset}</h3>
                            <div className="flex items-center gap-1.5 mt-0 text-[9px] font-bold text-[#5F5F5F] tracking-wider uppercase">
                                <span>{trade.session}</span>
                                <span>•</span>
                                <span>{trade.market}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <Sparkline data={trade.sparklineData} color={accentColor} />
                                <span className={`text-base font-bold ${isPositive ? 'text-[#15CA25]' : 'text-red-500'} tabular-nums`}>
                                    {isPositive ? '+' : ''}${Math.abs(trade.pnl).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                            <button title='more' className="text-[#f1f1f1]/70 hover:text-[#575656] duration-300 transition-colors">
                                <MoreHorizontal size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Strategy Description */}
                    <div className="mt-3">
                        <h4 className="text-[12px] font-medium text-[#C4C4C4]">{trade.strategy}</h4>
                        <p className="text-[12px] text-[#6A6A6A] mt-0.5 max-w-[500px] leading-relaxed">
                            {trade.description}
                        </p>
                    </div>

                    {/* Footer Tags Row */}
                    <div className="mt-4 flex justify-between items-center">
                        <div className="flex gap-1.5">
                            {trade.tags.map(tag => (
                                <span key={tag} className="px-2 py-0.5 rounded-full bg-[#1c1c1c] border border-[#828282]/70 text-[10px] text-[#828282] hover:text-white cursor-default transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-2.5">
                            <span className="text-[8px] px-2 pt-1 pb-0.5 bg-[#292232] rounded-full border-[0.5px] border-[#8b5cf6]/70 font-bold text-[#8b5cf6] uppercase tracking-widest">{trade.contracts} CONTRACTS</span>
                            <span className={`text-[8px] px-2 pt-1 pb-0.5  rounded-full border-[0.5px] border-[#15CA25]/70 font-bold ${trade.side === 'LONG' ? 'text-[#15CA25] bg-[#172C19]' : 'text-red-500'} uppercase tracking-widest`}>
                                {trade.side}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};


export const TradeSummary: React.FC<TradeSummaryProps> = ({ date, trades, onAddTrade }) => {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const totalPnl = trades.reduce((acc, curr) => acc + curr.pnl, 0);
    const isPositiveTotal = totalPnl >= 0;

    return (
        <div
            className="min-h-screen w-full flex flex-col items-center justify-center transition-colors duration-500 p-4 md:p-8 relative"
            style={{ backgroundColor: theme === 'dark' ? '#09090b' : '#f4f4f5' }}
        >
            {/* Theme Toggle Button */}
            <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`absolute top-6 right-6 p-2 rounded-full border transition-all duration-300 z-50 ${theme === 'dark' ? 'bg-[#171717] border-[#2d2d2d] text-yellow-500' : 'bg-white border-gray-200 text-slate-800 shadow-md'
                    }`}
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="w-full max-w-[520px]">
                <div
                    className="bg-[#0a0a0a] rounded-[24px] overflow-hidden shadow-2xl border border-[#1c1c1c] flex flex-col transition-all duration-500"
                    style={{
                        filter: theme === 'light' ? 'invert(1.92) hue-rotate(200deg)' : 'none'
                    }}
                >
                    {/* Top Header */}
                    <header className="px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm tracking-normal">
                            <span className="text-[#E4E4E4] font-medium text-[14px]">Today</span>
                            <span className="text-[#525252] text-xs font-bold">/</span>
                            <span className="text-[#a3a3a3] text-[9px] font-bold tracking-[0.2em] uppercase">{date}</span>
                            <span className="text-[#525252] mx-0.5">•</span>
                            <span className="text-[#a3a3a3] text-[9px] font-bold tracking-[0.2em] uppercase">{trades.length} TRADES</span>
                            <span className="text-[#525252] mx-0.5">•</span>
                            <span className={`font-bold text-[10px] ${isPositiveTotal ? 'text-[#15CA25]' : 'text-red-500'}`}>
                                {isPositiveTotal ? '+' : ''}{totalPnl.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                            </span>
                        </div>

                        <button
                            onClick={onAddTrade}
                            className="flex items-center gap-1.5 px-3 py-[8px] rounded-full bg-[#FA692E] hover:bg-[#ea6733] text-black/70 text-[12px] font-bold transition-all active:scale-95 shadow-md"
                        >
                            <Plus size={16} />
                            Add Trade
                        </button>
                    </header>

                    {/* Toolbar / Filters */}
                    <div className="px-4 pb-2.5 flex items-center gap-2 rounded-t-[22px] pt-4 bg-[#171717]">
                        <FilterButton label="All results" />
                        <FilterButton label="All strategies" />
                        <FilterButton label="More" />

                        <div className="flex-1 " />

                        <div className="relative group max-w-[200px] w-full">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#525252] group-focus-within:text-white/40 transition-colors" size={14} />
                            <input
                                type="text"
                                placeholder="Search trades..."
                                className="w-full bg-[#141414] border border-[#2d2d2d] rounded-[12px] pl-8 pr-3 py-1.5 text-[12px] text-white placeholder-[#525252] focus:outline-none focus:border-[#4d4d4d] transition-all"
                            />
                        </div>
                    </div>

                    {/* Trade List Container */}
                    <div className="px-4 flex-1 min-h-[400px] bg-[#171717] rounded-b-[22px] pb-2">
                        <AnimatePresence mode="popLayout">
                            {trades.map((trade) => (
                                <TradeCard key={trade.id} trade={trade} />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Footer Navigation */}
                    <footer className="px-4 py-4 bg-[#0a0a0a] flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button title='options' className="text-[#525252] hover:text-white transition-colors">
                                <MoreVertical size={18} />
                            </button>
                            <div className="h-3 w-[1px] bg-[#2d2d2d]" />
                            <button title='download' className="text-[#525252] hover:text-white transition-colors">
                                <Download size={18} />
                            </button>
                            <button title='refresh' className="text-[#525252] hover:text-white transition-colors">
                                <RefreshCcw size={16} />
                            </button>
                        </div>

                        <div className="flex items-center justify-end gap-3">
                            <button title='backward' className="text-[#2d2d2d] cursor-not-allowed">
                                <ChevronLeft size={18} />
                            </button>

                            <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest uppercase">
                                <span className="px-2 py-[7px] rounded-md bg-[#2C1B14] border border-[#BB4D25]/70 text-[#BB4D25]">JAN 12</span>
                                <span className="text-[#707070] hover:text-[#9e6969] cursor-pointer transition-colors">JAN 11</span>
                                <span className="text-[#707070] hover:text-[#a3a3a3] cursor-pointer transition-colors">JAN 10</span>
                            </div>

                            <button title='forward' className="text-[#707070] hover:text-white transition-colors">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};