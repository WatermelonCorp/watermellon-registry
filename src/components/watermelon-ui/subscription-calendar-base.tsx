'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Download,
  X,
  Loader2,
  Check,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
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
  mass: 0.6,
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
  onNextMonth,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>('day-28');
  const [isAdding, setIsAdding] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 2000);
  };

  return (
    <motion.div
      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={spring}
      className="theme-injected bg-card border-border relative w-full max-w-105 rounded-3xl border p-4 shadow-2xl transition-all duration-500 sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden sm:gap-3">
          <h2 className="text-foreground truncate text-xs font-medium sm:text-sm">
            {month}, {year}
          </h2>
          <span className="xs:inline-block border-input text-muted-foreground hidden cursor-default rounded-full border bg-transparent px-3 py-1 text-[10px] whitespace-nowrap">
            Today
          </span>
          <div className="ml-1 flex items-center gap-1 sm:gap-2">
            <button
              title="backward"
              onClick={onPrevMonth}
              className="hover:bg-muted text-muted-foreground hover:text-foreground shrink-0 rounded-md p-1 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              title="forward"
              onClick={onNextMonth}
              className="hover:bg-muted text-muted-foreground hover:text-foreground shrink-0 rounded-md p-1 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <button
          title="add event"
          onClick={() => setIsAdding(true)}
          className="bg-primary text-primary-foreground flex h-7 w-10 shrink-0 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 sm:h-7 sm:w-11"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="">
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="bg-card/95 absolute inset-0 z-50 flex flex-col items-center justify-center rounded-[23px] p-4 backdrop-blur-md sm:p-6"
            >
              <button
                onClick={() => setIsAdding(false)}
                className="text-muted-foreground hover:text-foreground absolute top-4 right-4"
              >
                <X size={20} />
              </button>
              <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <Plus size={24} />
              </div>
              <h3 className="text-foreground mb-1 text-sm font-bold">
                Quick Add Subscription
              </h3>
              <p className="text-muted-foreground mb-6 text-center text-[10px]">
                Enter the details of your new recurring payment.
              </p>
              <div className="flex w-full flex-col gap-2">
                <input
                  type="text"
                  placeholder="Service Name (e.g. Netflix)"
                  className="border-input bg-transparent w-full rounded-lg border px-3 py-2 text-[11px] outline-none focus:ring-1 focus:ring-primary"
                />
                <div className="flex flex-col gap-2 xs:flex-row">
                  <input
                    type="text"
                    placeholder="Amount"
                    className="border-input bg-transparent flex-1 rounded-lg border px-3 py-2 text-[11px] outline-none focus:ring-1 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="Date"
                    className="border-input bg-transparent w-full rounded-lg border px-3 py-2 text-[11px] outline-none focus:ring-1 focus:ring-primary xs:w-20"
                  />
                </div>
                <button
                  onClick={() => setIsAdding(false)}
                  className="bg-primary text-primary-foreground mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-[11px] font-bold transition-opacity hover:opacity-90"
                >
                  <Check size={14} /> Add Subscription
                </button>
              </div>
            </motion.div>
          )}

          {isSearching && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="bg-card/95 absolute inset-0 z-50 flex flex-col items-center justify-center rounded-[23px] p-4 backdrop-blur-md sm:p-6"
            >
              <button
                onClick={() => setIsSearching(false)}
                className="text-muted-foreground hover:text-foreground absolute top-4 right-4"
              >
                <X size={20} />
              </button>
              <div className="bg-muted text-muted-foreground mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <Search size={24} />
              </div>
              <h3 className="text-foreground mb-1 text-sm font-bold">
                Search Subscriptions
              </h3>
              <div className="mt-4 w-full">
                <input
                  autoFocus
                  type="text"
                  placeholder="Type to search..."
                  className="border-input bg-transparent w-full rounded-lg border px-3 py-2 text-[11px] outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="mt-4 w-full text-center">
                <p className="text-muted-foreground text-[10px]">Start typing to see results</p>
              </div>
            </motion.div>
          )}

          {isSummaryOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="bg-card/95 absolute inset-0 z-50 flex flex-col items-center justify-center rounded-[23px] p-4 backdrop-blur-md sm:p-6"
            >
              <button
                onClick={() => setIsSummaryOpen(false)}
                className="text-muted-foreground hover:text-foreground absolute top-4 right-4"
              >
                <X size={20} />
              </button>
              <div className="bg-chart-2/10 text-chart-2 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <TbCube size={24} />
              </div>
              <h3 className="text-foreground mb-1 text-sm font-bold">
                Monthly Summary
              </h3>
              <div className="mt-4 grid w-full grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-muted-foreground text-[9px]">Active</div>
                  <div className="text-foreground text-sm font-bold">{subscriptionsCount}</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-muted-foreground text-[9px]">New</div>
                  <div className="text-foreground text-sm font-bold">{newCount}</div>
                </div>
                <div className="bg-primary/10 border-primary/20 col-span-2 rounded-lg border p-3 text-center">
                  <div className="text-primary text-[9px] font-medium">Total Spend</div>
                  <div className="text-primary text-base font-bold">${monthlyTotal.toFixed(2)}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-muted-foreground mb-2 grid grid-cols-7 gap-1 text-[8px] font-semibold tracking-wider sm:text-[9px]">
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (
          <div
            key={d}
            className="bg-muted/60 border-border rounded-full border py-1.5 text-center"
          >
            {d}
          </div>
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
              className={`relative flex aspect-square flex-col items-center justify-center rounded-xl border text-[10px] font-medium transition-colors sm:h-12 sm:text-[11px] ${
                day.isMuted
                  ? 'bg-muted/40 border-border text-muted-foreground/60'
                  : 'bg-muted/60 border-border text-foreground hover:border-input'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeGlow"
                  className="border-primary/50 bg-primary/10 absolute inset-0 z-0 rounded-xl border"
                  transition={spring}
                />
              )}

              <div className="relative z-10 flex flex-col items-center justify-start gap-0.5 sm:gap-1">
                <span>{day.date}</span>
                <span className="scale-75 sm:scale-100">{day.isLogo}</span>
              </div>

              {day.indicators && (
                <div className="absolute top-1 right-1 flex gap-0.5 sm:top-1.5 sm:right-1.5">
                  {day.indicators}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
      </div>
      {/* Footer Info*/}
      <div className="text-muted-foreground mt-5 flex items-center justify-between gap-2 text-[8px] font-semibold tracking-widest sm:text-[9px]">
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="hover:text-chart-2 flex cursor-default items-center gap-1.5 transition-colors">
            <span className="bg-chart-2 h-1 w-1 rounded-full sm:h-1.5 sm:w-1.5" />
            MONTHLY
          </span>
          <span className="hover:text-chart-4 flex cursor-default items-center gap-1.5 transition-colors">
            <span className="bg-chart-4 h-1 w-1 rounded-full sm:h-1.5 sm:w-1.5" />
            YEARLY
          </span>
        </div>

        <span className="text-muted-foreground whitespace-nowrap">
          <span className="text-foreground">{subscriptionsCount}</span> SUBS /{' '}
          <span className="text-foreground">{newCount}</span> NEW
        </span>
      </div>

      {/* Bottom Bar*/}
      <div className="border-border mt-4 flex items-center justify-between gap-2 border-t pt-4">
        <div className="text-muted-foreground flex gap-3 sm:gap-4">
          <Search
            size={16}
            onClick={() => setIsSearching(true)}
            className="hover:text-foreground shrink-0 cursor-pointer transition-colors"
          />
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="hover:text-foreground flex items-center justify-center transition-colors"
          >
            {isDownloading ? (
              <Loader2 size={16} className="text-primary animate-spin" />
            ) : (
              <Download size={16} className="shrink-0 cursor-pointer" />
            )}
          </button>
          <TbCube
            size={16}
            onClick={() => setIsSummaryOpen(true)}
            className="hover:text-foreground shrink-0 cursor-pointer transition-colors"
          />
        </div>

        <div className="text-muted-foreground truncate text-[9px] font-medium sm:text-[10px]">
          MONTHLY TOTAL :{' '}
          <span className="text-foreground ml-1 text-[11px] font-bold sm:text-[12px]">
            ${monthlyTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};