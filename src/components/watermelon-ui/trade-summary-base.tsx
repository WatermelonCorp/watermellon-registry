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
const Sparkline: React.FC<{ data: number[]; lineClassName: string }> = ({
  data,
  lineClassName,
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
      className={`overflow-visible ${lineClassName}`}
    >
      <motion.polyline
        fill="none"
        stroke="currentColor"
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
  <button className="border-border text-muted-foreground hover:text-foreground flex items-center gap-1.5 rounded-md border bg-transparent px-2 py-1 text-[11px] whitespace-nowrap transition-colors duration-200">
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
  const accentClass = isPositive ? 'text-chart-2' : 'text-destructive';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -1 }}
      className={`group border-border relative border-b bg-transparent px-1 py-4 transition-all duration-300 last:border-0 ${isSelected ? 'bg-muted/40' : ''}`}
    >
      <div className="flex items-start gap-2.5 sm:gap-3.5">
        <div className="pt-1">
          <button
            onClick={onSelect}
            className={`flex h-4 w-4 items-center justify-center rounded border-2 transition-all duration-200 ${isSelected ? 'bg-primary border-primary' : 'border-border group-hover:border-input'}`}
          >
            {isSelected && <Check size={10} className="text-primary-foreground" />}
          </button>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-start justify-between gap-2">
            <div className="truncate">
              <h3 className="text-foreground truncate text-sm font-medium tracking-tight sm:text-base">
                {trade.asset}
              </h3>
              <div className="text-muted-foreground mt-0 flex items-center gap-1 text-[8px] font-bold tracking-wider uppercase sm:gap-1.5 sm:text-[9px]">
                <span>{trade.session}</span>
                <span>•</span>
                <span className="truncate">{trade.market}</span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="xs:block hidden">
                  <Sparkline
                    data={trade.sparklineData}
                    lineClassName={accentClass}
                  />
                </div>
                <span
                  className={`text-sm font-bold sm:text-base ${isPositive ? 'text-chart-2' : 'text-destructive'} tabular-nums`}
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
                  className={`text-muted-foreground hover:text-foreground transition-colors duration-300 ${isMenuOpen ? 'text-foreground' : ''}`}
                >
                  <MoreHorizontal size={16} />
                </button>
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -5 }}
                      className="bg-card/95 border-border absolute top-full right-0 z-50 mt-1 w-32 origin-top-right rounded-xl border shadow-xl backdrop-blur-md"
                    >
                      <div className="p-1.5">
                        <button className="text-muted-foreground hover:bg-muted hover:text-foreground flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] transition-colors">
                          <Edit2 size={12} /> Edit Trade
                        </button>
                        <button className="text-muted-foreground hover:bg-muted hover:text-foreground flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] transition-colors">
                          <Copy size={12} /> Duplicate
                        </button>
                        <div className="bg-border my-1 h-px" />
                        <button className="hover:bg-destructive/10 text-destructive flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] transition-colors">
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
            <h4 className="text-foreground text-[11px] font-medium sm:text-[12px]">
              {trade.strategy}
            </h4>
            <p className="text-muted-foreground mt-1 line-clamp-2 max-w-full text-[11px] leading-relaxed sm:line-clamp-none sm:text-[12px]">
              {trade.description}
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-1.5">
              {trade.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-muted border-border text-muted-foreground hover:bg-secondary hover:text-secondary-foreground cursor-default rounded-full border px-2 py-1 text-[9px] transition-colors sm:text-[10px]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between gap-2 sm:justify-end">
              <span className="bg-secondary border-border text-secondary-foreground rounded-full border px-2 py-1 text-[8px] font-bold tracking-widest uppercase">
                {trade.contracts} CTRS
              </span>
              <span
                className={`rounded-full border-[0.5px] px-2 pt-1 pb-0.5 text-[8px] font-bold tracking-widest uppercase ${
                  trade.side === 'LONG'
                    ? 'text-chart-2 bg-chart-2/10 border-chart-2/40'
                    : 'text-destructive bg-destructive/10 border-destructive/40'
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
    <div className="theme-injected w-full max-w-130">
      <div className="bg-card border-border flex flex-col overflow-hidden rounded-3xl border shadow-xl transition-all duration-500">
        {/* Top Header */}
        <header className="flex flex-wrap items-center justify-between gap-2 px-3 py-3 sm:px-4">
          <div className="flex flex-wrap items-center gap-1.5 text-sm tracking-normal sm:gap-2">
            <span className="text-foreground text-xs font-medium sm:text-sm">
              Today
            </span>
            <span className="text-border text-xs font-bold">/</span>
            <span className="text-muted-foreground text-[8px] font-bold tracking-widest uppercase sm:text-[9px] sm:tracking-[0.2em]">
              {date}
            </span>
            <span className="text-border mx-0.5">•</span>
            <span
              className={`text-[10px] font-bold sm:text-[11px] ${isPositiveTotal ? 'text-chart-2' : 'text-destructive'}`}
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
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-1.5 rounded-full px-3 py-2 text-[10px] font-bold shadow-md transition-all active:scale-95 sm:text-[12px]"
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
              className="absolute inset-0 z-[60] flex items-center justify-center bg-black/20 px-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-card border-border relative w-full max-w-sm rounded-3xl border p-6 shadow-2xl"
              >
                <button
                  onClick={() => setIsAddingTrade(false)}
                  className="text-muted-foreground hover:text-foreground absolute top-4 right-4"
                >
                  <X size={20} />
                </button>
                <div className="mb-6">
                  <h3 className="text-foreground text-sm font-bold">
                    Record New Trade
                  </h3>
                  <p className="text-muted-foreground mt-1 text-[10px]">
                    Add manually executed trades to your journal.
                  </p>
                </div>
                <div className="grid gap-3">
                  <input
                    type="text"
                    placeholder="Asset (e.g. E-Mini S&P 500)"
                    className="border-input bg-transparent w-full rounded-xl border px-3 py-2 text-[11px] outline-none focus:ring-1 focus:ring-primary"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Side (LONG/SHORT)"
                      className="border-input bg-transparent w-full rounded-xl border px-3 py-2 text-[11px] outline-none focus:ring-1 focus:ring-primary"
                    />
                    <input
                      type="text"
                      placeholder="Contracts"
                      className="border-input bg-transparent w-full rounded-xl border px-3 py-2 text-[11px] outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Brief description of the setup..."
                    className="border-input bg-transparent w-full rounded-xl border px-3 py-2 text-[11px] outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <button
                  onClick={() => {
                    setIsAddingTrade(false);
                    onAddTrade?.();
                  }}
                  className="bg-primary text-primary-foreground mt-6 w-full rounded-xl py-2.5 text-[11px] font-bold shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                >
                  Save Entry
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toolbar / Filters */}
        <div className="bg-muted/60 flex flex-col items-stretch gap-3 rounded-t-3xl px-3 pt-4 pb-3 sm:flex-row sm:items-center sm:px-4">
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <FilterButton label="All results" />
            <FilterButton label="All strategies" />
            <FilterButton label="More" />
          </div>

          <div className="group relative flex-1">
            <Search
              className="text-muted-foreground group-focus-within:text-foreground absolute top-1/2 left-2.5 -translate-y-1/2 transition-colors"
              size={14}
            />
            <input
              type="text"
              placeholder="Search trades..."
              className="bg-background border-input text-foreground placeholder:text-muted-foreground focus:border-ring w-full rounded-2xl border py-2 pr-3 pl-8 text-[12px] transition-all focus:outline-none"
            />
          </div>
        </div>

        {/* Trade List Container */}
        <div className="bg-muted/60 min-h-87.5 flex-1 overflow-y-auto rounded-b-3xl px-3 pb-2 sm:min-h-100 sm:px-4">
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
        <footer className="bg-card flex flex-col items-center justify-between gap-4 px-3 py-4 sm:flex-row sm:px-4">
          <div className="flex w-full items-center justify-center gap-4 sm:w-auto sm:justify-start">
            <div className="relative">
              <button
                title="options"
                onClick={() => setIsGlobalMenuOpen(!isGlobalMenuOpen)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${isGlobalMenuOpen ? 'bg-muted text-foreground' : ''}`}
              >
                <MoreVertical size={18} />
              </button>
              <AnimatePresence>
                {isGlobalMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 5 }}
                    className="bg-card/95 border-border absolute bottom-full left-0 z-50 mb-1 w-36 origin-bottom-left rounded-xl border shadow-xl backdrop-blur-md"
                  >
                    <div className="p-1.5">
                      <button className="text-muted-foreground hover:bg-muted hover:text-foreground flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] transition-colors">
                        Analytics Settings
                      </button>
                      <button className="text-muted-foreground hover:bg-muted hover:text-foreground flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] transition-colors">
                        Export Config
                      </button>
                      <div className="bg-border my-1 h-px" />
                      <button className="text-muted-foreground hover:bg-muted hover:text-foreground flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] transition-colors">
                        History Labels
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="bg-border h-4 w-px" />
            <button
              title="download"
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {isDownloading ? (
                <Loader2 size={18} className="text-primary animate-spin" />
              ) : (
                <Download size={18} />
              )}
            </button>
            <button
              title="refresh"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <RefreshCcw
                size={18}
                className={isRefreshing ? 'text-primary animate-spin' : ''}
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
              className={`transition-colors ${DATES.indexOf(activeDate) === 0 ? 'text-border cursor-not-allowed' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2 text-[9px] font-bold tracking-widest uppercase sm:gap-3 sm:text-[10px]">
              {DATES.map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveDate(day)}
                  className={`relative flex px-2 py-2 transition-colors ${activeDate === day ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {activeDate === day && (
                    <motion.div
                      layoutId="activeDayGlowBase"
                      className="bg-primary/10 border-primary/40 absolute inset-0 rounded-md border"
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
              className={`transition-colors ${DATES.indexOf(activeDate) === DATES.length - 1 ? 'text-border cursor-not-allowed' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};