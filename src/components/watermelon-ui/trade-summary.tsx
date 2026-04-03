'use client';

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
  MoreVertical,
  X,
  Check,
  Loader2,
  Trash2,
  Copy,
  Edit2,
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
const Sparkline: React.FC<{ data: number[]; color: string }> = ({
  data,
  color,
}) => {
  const width = 80;
  const height = 24;
  const padding = 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - padding - ((d - min) / range) * (height - 2 * padding);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
    >
      <motion.polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
    </svg>
  );
};

const FilterButton: React.FC<{ label: string }> = ({ label }) => (
  <button className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-transparent px-2 py-1 text-[11px] whitespace-nowrap text-zinc-500 transition-colors duration-200 hover:text-zinc-900 dark:border-[#2d2d2d] dark:text-[#a3a3a3] dark:hover:text-white">
    {label}
    <ChevronDown size={12} className="mt-0.5" />
  </button>
);

const TradeCard: React.FC<{
  trade: TradeItem;
  isSelected: boolean;
  onSelect: () => void;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}> = ({ trade, isSelected, onSelect, isMenuOpen, onMenuToggle }) => {
  const isPositive = trade.pnl >= 0;
  const accentColor = isPositive ? '#22c55e' : '#ef4444';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -1 }}
      className={`group relative border-b border-gray-100 bg-transparent px-1 py-4 transition-all duration-300 last:border-0 dark:border-[#1c1c1c] ${isSelected ? 'rounded-xl bg-zinc-50/50 dark:bg-white/[0.02]' : ''}`}
    >
      <div className="flex items-start gap-2.5 sm:gap-3.5">
        <div className="pt-1">
          <button
            onClick={onSelect}
            className={`flex h-4 w-4 items-center justify-center rounded border-2 transition-all duration-200 ${isSelected ? 'border-[#FA692E] bg-[#FA692E] dark:border-[#FA692E]' : 'border-gray-200 group-hover:border-gray-400 dark:border-[#2d2d2d] dark:group-hover:border-[#4d4d4d]'}`}
          >
            {isSelected && <Check size={10} className="text-white" />}
          </button>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-start justify-between gap-2">
            <div className="truncate">
              <h3 className="truncate text-sm font-medium tracking-tight text-zinc-800 sm:text-base dark:text-[#C4C4C4]">
                {trade.asset}
              </h3>
              <div className="mt-0 flex items-center gap-1 text-[8px] font-bold tracking-wider text-zinc-400 uppercase sm:gap-1.5 sm:text-[9px] dark:text-[#5F5F5F]">
                <span>{trade.session}</span>
                <span>•</span>
                <span className="truncate">{trade.market}</span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="xs:block hidden">
                  <Sparkline data={trade.sparklineData} color={accentColor} />
                </div>
                <span
                  className={`text-sm font-bold sm:text-base ${isPositive ? 'text-[#15CA25]' : 'text-red-500'} tabular-nums`}
                >
                  {isPositive ? '+' : ''}$
                  {Math.abs(trade.pnl).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="relative">
                <button
                  title="more"
                  onClick={onMenuToggle}
                  className={`text-zinc-400 transition-colors duration-300 hover:text-zinc-600 dark:text-[#f1f1f1]/70 dark:hover:text-[#575656] ${isMenuOpen ? 'text-zinc-900 dark:text-white' : ''}`}
                >
                  <MoreHorizontal size={16} />
                </button>
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -5 }}
                      className="absolute top-full right-0 z-50 mt-1 w-32 origin-top-right rounded-xl border border-zinc-200 bg-white shadow-xl backdrop-blur-md dark:border-zinc-800 dark:bg-[#1a1a1a]/95"
                    >
                      <div className="p-1.5">
                        <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white">
                          <Edit2 size={12} /> Edit Trade
                        </button>
                        <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white">
                          <Copy size={12} /> Duplicate
                        </button>
                        <div className="my-1 h-px bg-zinc-100 dark:bg-zinc-800" />
                        <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10">
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mt-2 sm:mt-3">
            <h4 className="text-[11px] font-medium text-zinc-700 sm:text-[12px] dark:text-[#C4C4C4]">
              {trade.strategy}
            </h4>
            <p className="mt-0.5 line-clamp-2 max-w-full text-[11px] leading-relaxed text-zinc-500 sm:line-clamp-none sm:text-[12px] dark:text-[#6A6A6A]">
              {trade.description}
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-1.5">
              {trade.tags.map((tag) => (
                <span
                  key={tag}
                  className="cursor-default rounded-full border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[9px] text-zinc-500 transition-colors hover:bg-zinc-200 sm:text-[10px] dark:border-[#828282]/70 dark:bg-[#1c1c1c] dark:text-[#828282] dark:hover:text-white"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between gap-2 sm:justify-end">
              <span className="rounded-full border-[0.5px] border-purple-200 bg-purple-50 px-2 pt-1 pb-0.5 text-[8px] font-bold tracking-widest text-purple-600 uppercase dark:border-[#8b5cf6]/70 dark:bg-[#292232] dark:text-[#8b5cf6]">
                {trade.contracts} CTRS
              </span>
              <span
                className={`rounded-full border-[0.5px] px-2 pt-1 pb-0.5 text-[8px] font-bold tracking-widest uppercase ${
                  trade.side === 'LONG'
                    ? 'border-green-200 bg-green-50 text-[#15CA25] dark:border-[#15CA25]/70 dark:bg-[#172C19]'
                    : 'border-red-200 bg-red-50 text-red-500 dark:border-red-500/70 dark:bg-red-900/20'
                }`}
              >
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
export const TradeSummary: React.FC<TradeSummaryProps> = ({
  date,
  trades,
  onAddTrade,
}) => {
  const DATES = ['JAN 12', 'JAN 11', 'JAN 10'];
  const [isAddingTrade, setIsAddingTrade] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [activeDate, setActiveDate] = React.useState(DATES[0]);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [activeMenuId, setActiveMenuId] = React.useState<string | null>(null);
  const [isGlobalMenuOpen, setIsGlobalMenuOpen] = React.useState(false);

  const totalPnl = trades.reduce((acc, curr) => acc + curr.pnl, 0);
  const isPositiveTotal = totalPnl >= 0;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 2000);
  };

  return (
    <div className="w-full max-w-130">
      <div className="flex flex-col overflow-hidden rounded-[24px] border border-zinc-200 bg-white shadow-xl transition-all duration-500 dark:border-[#1c1c1c] dark:bg-[#0a0a0a]">
        {/* Top Header */}
        <header className="flex flex-wrap items-center justify-between gap-2 px-3 py-3 sm:px-4">
          <div className="flex flex-wrap items-center gap-1.5 text-sm tracking-normal sm:gap-2">
            <span className="text-[12px] font-medium text-zinc-900 sm:text-[14px] dark:text-[#E4E4E4]">
              Today
            </span>
            <span className="text-xs font-bold text-zinc-300 dark:text-[#525252]">
              /
            </span>
            <span className="text-[8px] font-bold tracking-widest text-zinc-500 uppercase sm:text-[9px] sm:tracking-[0.2em] dark:text-[#a3a3a3]">
              {date}
            </span>
            <span className="mx-0.5 text-zinc-300 dark:text-[#525252]">•</span>
            <span
              className={`text-[10px] font-bold sm:text-[11px] ${isPositiveTotal ? 'text-[#15CA25]' : 'text-red-500'}`}
            >
              {isPositiveTotal ? '+' : ''}
              {totalPnl.toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
              })}
            </span>
          </div>

          <button
            onClick={() => setIsAddingTrade(true)}
            className="flex items-center gap-1.5 rounded-full bg-[#FA692E] px-3 py-1.5 text-[10px] font-bold text-white shadow-md transition-all hover:bg-[#ea6733] active:scale-95 sm:py-2 sm:text-[12px] dark:text-black/70"
          >
            <Plus size={14} className="sm:h-4 sm:w-4" />
            Add Trade
          </button>
        </header>

        <AnimatePresence>
          {isAddingTrade && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[60] flex items-center justify-center bg-zinc-950/20 px-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative w-full max-w-sm rounded-[24px] border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-[#0a0a0a]"
              >
                <button
                  onClick={() => setIsAddingTrade(false)}
                  className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                >
                  <X size={20} />
                </button>
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    Record New Trade
                  </h3>
                  <p className="mt-1 text-[10px] text-zinc-500">
                    Add manually executed trades to your journal.
                  </p>
                </div>
                <div className="grid gap-3">
                  <input
                    type="text"
                    placeholder="Asset (e.g. E-Mini S&P 500)"
                    className="w-full rounded-xl border border-zinc-200 bg-transparent px-3 py-2 text-[11px] outline-none focus:border-[#FA692E] dark:border-zinc-800 dark:focus:border-[#FA692E]"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Side (LONG/SHORT)"
                      className="w-full rounded-xl border border-zinc-200 bg-transparent px-3 py-2 text-[11px] outline-none focus:border-[#FA692E] dark:border-zinc-800 dark:focus:border-[#FA692E]"
                    />
                    <input
                      type="text"
                      placeholder="Contracts"
                      className="w-full rounded-xl border border-zinc-200 bg-transparent px-3 py-2 text-[11px] outline-none focus:border-[#FA692E] dark:border-zinc-800 dark:focus:border-[#FA692E]"
                    />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Brief description of the setup..."
                    className="w-full rounded-xl border border-zinc-200 bg-transparent px-3 py-2 text-[11px] outline-none focus:border-[#FA692E] dark:border-zinc-800 dark:focus:border-[#FA692E]"
                  />
                </div>
                <button
                  onClick={() => {
                    setIsAddingTrade(false);
                    onAddTrade?.();
                  }}
                  className="mt-6 w-full rounded-xl bg-[#FA692E] py-2.5 text-[11px] font-bold text-white shadow-lg transition-all hover:bg-[#ea6733] active:scale-[0.98]"
                >
                  Save Entry
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toolbar / Filters */}
        <div className="flex flex-col items-stretch gap-3 rounded-t-[22px] bg-zinc-50 px-3 pt-4 pb-2.5 sm:flex-row sm:items-center sm:px-4 dark:bg-[#171717]">
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <FilterButton label="All results" />
            <FilterButton label="All strategies" />
            <FilterButton label="More" />
          </div>

          <div className="group relative flex-1">
            <Search
              className="absolute top-1/2 left-2.5 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-zinc-600 dark:text-[#525252] dark:group-focus-within:text-white/40"
              size={14}
            />
            <input
              type="text"
              placeholder="Search trades..."
              className="w-full rounded-2xl border border-zinc-200 bg-white py-1.5 pr-3 pl-8 text-[12px] text-zinc-900 placeholder-zinc-400 transition-all focus:border-zinc-400 focus:outline-none dark:border-[#2d2d2d] dark:bg-[#141414] dark:text-white dark:placeholder-[#525252] dark:focus:border-[#4d4d4d]"
            />
          </div>
        </div>

        {/* Trade List Container */}
        <div className="min-h-87.5 flex-1 overflow-y-auto rounded-b-[22px] bg-zinc-50 px-3 pb-2 sm:min-h-100 sm:px-4 dark:bg-[#171717]">
          <AnimatePresence mode="popLayout">
            {trades.map((trade) => (
              <TradeCard
                key={trade.id}
                trade={trade}
                isSelected={selectedIds.includes(trade.id)}
                onSelect={() => toggleSelect(trade.id)}
                isMenuOpen={activeMenuId === trade.id}
                onMenuToggle={() =>
                  setActiveMenuId(activeMenuId === trade.id ? null : trade.id)
                }
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <footer className="flex flex-col items-center justify-between gap-4 bg-white px-3 py-4 sm:flex-row sm:px-4 dark:bg-[#0a0a0a]">
          <div className="flex w-full items-center justify-center gap-4 sm:w-auto sm:justify-start">
            <div className="relative">
              <button
                title="options"
                onClick={() => setIsGlobalMenuOpen(!isGlobalMenuOpen)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-[#525252] dark:hover:bg-white/5 dark:hover:text-white ${isGlobalMenuOpen ? 'bg-zinc-100 text-zinc-900 dark:bg-white/5 dark:text-white' : ''}`}
              >
                <MoreVertical size={18} />
              </button>
              <AnimatePresence>
                {isGlobalMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 5 }}
                    className="absolute bottom-full left-0 z-50 mb-1 w-36 origin-bottom-left rounded-xl border border-zinc-200 bg-white shadow-xl backdrop-blur-md dark:border-zinc-800 dark:bg-[#1a1a1a]/95"
                  >
                    <div className="p-1.5">
                      <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white">
                        Analytics Settings
                      </button>
                      <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white">
                        Export Config
                      </button>
                      <div className="my-1 h-px bg-zinc-100 dark:bg-zinc-800" />
                      <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white">
                        History Labels
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="h-4 w-px bg-zinc-200 dark:bg-[#2d2d2d]" />
            <button
              title="download"
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-[#525252] dark:hover:bg-white/5 dark:hover:text-white"
            >
              {isDownloading ? (
                <Loader2 size={18} className="animate-spin text-[#FA692E]" />
              ) : (
                <Download size={18} />
              )}
            </button>
            <button
              title="refresh"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-[#525252] dark:hover:bg-white/5 dark:hover:text-white"
            >
              <RefreshCcw
                size={18}
                className={isRefreshing ? 'animate-spin text-[#FA692E]' : ''}
              />
            </button>
          </div>

          <div className="flex w-full items-center justify-center gap-3 sm:w-auto sm:justify-end">
            <button
              title="backward"
              onClick={() => {
                const currentIndex = DATES.indexOf(activeDate);
                if (currentIndex > 0) setActiveDate(DATES[currentIndex - 1]);
              }}
              disabled={DATES.indexOf(activeDate) === 0}
              className={`transition-colors ${DATES.indexOf(activeDate) === 0 ? 'cursor-not-allowed text-zinc-200 dark:text-[#2d2d2d]' : 'text-zinc-400 hover:text-zinc-900 dark:text-[#707070] dark:hover:text-white'}`}
            >
              < MoreVertical size={0} className="hidden" /> {/* HACK: ensuring Lucide imports stay if I accidentally mess up elsewhere, but really just for ChevronLeft */}
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2 text-[9px] font-bold tracking-widest uppercase sm:gap-3 sm:text-[10px]">
              {DATES.map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveDate(day)}
                  className={`relative flex px-2 py-1.75 transition-colors ${activeDate === day ? 'text-orange-600 dark:text-[#BB4D25]' : 'text-zinc-400 hover:text-zinc-600 dark:text-[#707070] dark:hover:text-[#a3a3a3]'}`}
                >
                  {activeDate === day && (
                    <motion.div
                      layoutId="activeDayGlow"
                      className="absolute inset-0 rounded-md border border-orange-200 bg-orange-50 dark:border-[#BB4D25]/70 dark:bg-[#2C1B14]"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{day}</span>
                </button>
              ))}
            </div>
            <button
              title="forward"
              onClick={() => {
                const currentIndex = DATES.indexOf(activeDate);
                if (currentIndex < DATES.length - 1)
                  setActiveDate(DATES[currentIndex + 1]);
              }}
              disabled={DATES.indexOf(activeDate) === DATES.length - 1}
              className={`transition-colors ${DATES.indexOf(activeDate) === DATES.length - 1 ? 'cursor-not-allowed text-zinc-200 dark:text-[#2d2d2d]' : 'text-zinc-400 hover:text-zinc-900 dark:text-[#707070] dark:hover:text-white'}`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};