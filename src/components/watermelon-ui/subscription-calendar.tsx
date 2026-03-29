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
      className="relative w-full max-w-105 rounded-[26px] border border-zinc-200 bg-white p-4 shadow-2xl transition-all duration-500 sm:p-5 dark:border-[#1f1f1f] dark:bg-[#0f0f10]"
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden sm:gap-3">
          <h2 className="truncate text-[12px] font-medium text-zinc-800 sm:text-[13px] dark:text-[#D8D8D8]">
            {month}, {year}
          </h2>
          <span className="xs:inline-block hidden cursor-default rounded-full border border-zinc-200 bg-transparent px-3 py-0.5 text-[10px] whitespace-nowrap text-zinc-500 dark:border-white/20 dark:text-[#a3a3a3]">
            Today
          </span>
          <div className="ml-1 flex items-center gap-1 sm:gap-2">
            <button
              title="backward"
              onClick={onPrevMonth}
              className="shrink-0 rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-[#7c7b7b] dark:hover:bg-white/5 dark:hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              title="forward"
              onClick={onNextMonth}
              className="shrink-0 rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-[#7c7b7b] dark:hover:bg-white/5 dark:hover:text-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <button
          title="add event"
          onClick={() => setIsAdding(true)}
          className="flex h-7 w-10 shrink-0 items-center justify-center rounded-full bg-[#fa6a2e] text-white shadow-[0_0_15px_rgba(250,106,46,0.2)] transition-transform hover:scale-105 active:scale-95 sm:h-7 sm:w-11 dark:text-black"
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
              className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-[25px] bg-white/95 p-4 backdrop-blur-md sm:p-6 dark:bg-black/95"
            >
              <button
                onClick={() => setIsAdding(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                <X size={20} />
              </button>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-[#fa6a2e] dark:bg-orange-900/30">
                <Plus size={24} />
              </div>
              <h3 className="mb-1 text-sm font-bold text-zinc-900 dark:text-white">
                Quick Add Subscription
              </h3>
              <p className="mb-6 text-center text-[10px] text-zinc-500 dark:text-zinc-400">
                Enter the details of your new recurring payment.
              </p>
              <div className="flex w-full flex-col gap-2">
                <input
                  type="text"
                  placeholder="Service Name (e.g. Netflix)"
                  className="w-full rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-[11px] outline-none focus:border-[#fa6a2e] dark:border-zinc-800 dark:focus:border-[#fa6a2e]"
                />
                <div className="xs:flex-row flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Amount"
                    className="flex-1 rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-[11px] outline-none focus:border-[#fa6a2e] dark:border-zinc-800 dark:focus:border-[#fa6a2e]"
                  />
                  <input
                    type="text"
                    placeholder="Date"
                    className="xs:w-20 w-full rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-[11px] outline-none focus:border-[#fa6a2e] dark:border-zinc-800 dark:focus:border-[#fa6a2e]"
                  />
                </div>
                <button
                  onClick={() => setIsAdding(false)}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#fa6a2e] py-2 text-[11px] font-bold text-white transition-opacity hover:opacity-90"
                >
                  <Check size={14} /> Add Subscription
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isSearching && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-[25px] bg-white/95 p-4 backdrop-blur-md sm:p-6 dark:bg-black/95"
            >
              <button
                onClick={() => setIsSearching(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                <X size={20} />
              </button>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 dark:bg-zinc-800/30">
                <Search size={24} />
              </div>
              <h3 className="mb-1 text-sm font-bold text-zinc-900 dark:text-white">
                Search Subscriptions
              </h3>
              <div className="mt-4 w-full">
                <input
                  autoFocus
                  type="text"
                  placeholder="Type to search..."
                  className="w-full rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-[11px] outline-none focus:border-[#fa6a2e] dark:border-zinc-800 dark:focus:border-[#fa6a2e]"
                />
              </div>
              <div className="mt-4 flex max-h-32 w-full flex-col gap-2 overflow-y-auto">
                <p className="text-center text-[10px] text-zinc-400">
                  Start typing to see results
                </p>
              </div>
            </motion.div>
          )}

          {isSummaryOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-[25px] bg-white/95 p-4 backdrop-blur-md sm:p-6 dark:bg-black/95"
            >
              <button
                onClick={() => setIsSummaryOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                <X size={20} />
              </button>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-500 dark:bg-purple-900/30">
                <TbCube size={24} />
              </div>
              <h3 className="mb-1 text-sm font-bold text-zinc-900 dark:text-white">
                Monthly Summary
              </h3>
              <div className="mt-4 grid w-full grid-cols-2 gap-3">
                <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900/50">
                  <div className="text-[9px] text-zinc-500">Active</div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-white">
                    {subscriptionsCount}
                  </div>
                </div>
                <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900/50">
                  <div className="text-[9px] text-zinc-500">New</div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-white">
                    {newCount}
                  </div>
                </div>
                <div className="col-span-2 rounded-lg bg-orange-50 p-3 dark:bg-orange-950/20">
                  <div className="text-[9px] text-orange-600">Total Spend</div>
                  <div className="text-sm font-bold text-orange-600">
                    ${monthlyTotal.toFixed(2)}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <div className="mb-2 grid grid-cols-7 gap-1 text-[8px] font-semibold tracking-wider text-zinc-500 sm:text-[9px] dark:text-[#d4d4d4]">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (
              <div
                key={d}
                className="rounded-full border-zinc-100 bg-zinc-50 py-1.5 text-center dark:border-[#222] dark:bg-[#2A2A2A]/50"
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
                      ? 'border-zinc-100 bg-zinc-50 text-zinc-300 dark:border-[#161616] dark:bg-[#0e0e0f] dark:text-[#333]'
                      : 'border-zinc-100 bg-zinc-50/50 text-zinc-700 hover:border-zinc-300 dark:border-[#222] dark:bg-[#2A2A2A]/50 dark:text-[#d4d4d4] dark:hover:border-[#333]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute inset-0 z-0 rounded-xl border-[1.5px] border-[#b3522f] bg-orange-50 dark:bg-[#32211A]"
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
      </div>

      {/* Footer Info*/}
      <div className="mt-5 flex items-center justify-between gap-2 text-[8px] font-semibold tracking-widest text-zinc-400 sm:text-[9px] dark:text-[#555]">
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="flex cursor-default items-center gap-1.5 transition-colors hover:text-[#a855f7]">
            <span className="h-1 w-1 rounded-full bg-[#a855f7] sm:h-1.5 sm:w-1.5" />
            MONTHLY
          </span>
          <span className="flex cursor-default items-center gap-1.5 transition-colors hover:text-[#facc15]">
            <span className="h-1 w-1 rounded-full bg-[#facc15] sm:h-1.5 sm:w-1.5" />
            YEARLY
          </span>
        </div>

        <span className="whitespace-nowrap text-zinc-500 dark:text-[#666]">
          <span className="text-zinc-900 dark:text-[#ccc7c7]">
            {subscriptionsCount}
          </span>{' '}
          SUBS /{' '}
          <span className="text-zinc-900 dark:text-[#ccc7c7]">{newCount}</span>{' '}
          NEW
        </span>
      </div>

      {/* Bottom Bar*/}
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-zinc-100 pt-4 dark:border-[#1a1a1b]">
        <div className="flex gap-3 text-zinc-400 sm:gap-4 dark:text-[#555]">
          <Search
            size={16}
            onClick={() => setIsSearching(true)}
            className="shrink-0 cursor-pointer transition-colors hover:text-zinc-900 dark:hover:text-white"
          />
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="relative flex items-center justify-center transition-colors hover:text-zinc-900 dark:hover:text-white"
          >
            {isDownloading ? (
              <Loader2 size={16} className="animate-spin text-[#fa6a2e]" />
            ) : (
              <Download size={16} className="shrink-0 cursor-pointer" />
            )}
          </button>
          <TbCube
            size={16}
            onClick={() => setIsSummaryOpen(true)}
            className="shrink-0 cursor-pointer transition-colors hover:text-zinc-900 dark:hover:text-white"
          />
        </div>

        <div className="truncate text-[9px] font-medium text-zinc-500 sm:text-[10px] dark:text-[#666]">
          MONTHLY TOTAL :{' '}
          <span className="ml-1 text-[11px] font-bold text-zinc-900 sm:text-[12px] dark:text-white">
            ${monthlyTotal.toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};