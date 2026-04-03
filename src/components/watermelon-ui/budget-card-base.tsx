'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check, X } from 'lucide-react';

interface BreakdownItem {
  label: string;
  amount: number;
  color: string;
}

interface BudgetCardProps {
  month: string;
  totalBudget: number;
  spentAmount: number;
  breakdown: BreakdownItem[];
  onViewDetails?: () => void;
  onMonthChange?: (month: string) => void;
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const BudgetCard: React.FC<BudgetCardProps> = ({
  month: initialMonth,
  totalBudget,
  spentAmount,
  breakdown,
  onViewDetails,
  onMonthChange,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const spentPercentage = Math.round((spentAmount / totalBudget) * 100);
  const remainingAmount = totalBudget - spentAmount;

  const smoothTransition = { duration: 1.5, ease: [0.19, 1, 0.22, 1] } as const;
  const cornerClass = 'absolute w-5 h-5 border-black/20 dark:border-white/20';

  // Mock Transactions for base view (themed)
  const transactions = [
    {
      id: 1,
      date: 'Jul 12',
      name: 'Whole Foods',
      category: 'Groceries',
      amount: 84.5,
    },
    {
      id: 2,
      date: 'Jul 10',
      name: 'Rent Payment',
      category: 'Rent',
      amount: 1600.0,
    },
    {
      id: 3,
      date: 'Jul 08',
      name: 'Chevron Gas',
      category: 'Other',
      amount: 52.3,
    },
  ];

  // Click outside logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMonthSelect = (m: string) => {
    setSelectedMonth(m);
    setIsDropdownOpen(false);
    if (onMonthChange) onMonthChange(m);
  };

  return (
    <div className="theme-injected relative mx-auto w-full max-w-lg">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className="relative w-full"
      >
        {/* Corner Borders */}
        <div
          className={`${cornerClass} top-0 left-0 z-40 border-t-2 border-l-2`}
        />
        <div
          className={`${cornerClass} top-0 right-0 z-40 border-t-2 border-r-2`}
        />
        <div
          className={`${cornerClass} bottom-0 left-0 z-40 border-b-2 border-l-2`}
        />
        <div
          className={`${cornerClass} right-0 bottom-0 z-40 border-r-2 border-b-2`}
        />

        <div className="bg-card border-border text-foreground relative w-full overflow-visible border font-sans shadow-sm dark:shadow-2xl">
          {/* Top Section */}
          <div className="p-6 pb-4 sm:p-8">
            <div className="mb-1 flex items-start justify-between">
              <p className="text-muted-foreground text-sm font-normal sm:text-lg">
                Monthly Budget
              </p>

              {/* --- Month Dropdown --- */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="border-border text-muted-foreground hover:bg-accent flex min-w-32 items-center justify-between gap-2 border bg-transparent px-3 py-1 text-sm font-normal transition-colors sm:gap-4 sm:text-lg"
                >
                  {selectedMonth}
                  <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }}>
                    <ChevronDown size={16} className="text-muted-foreground" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 5, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="bg-popover border-border absolute top-full right-0 z-50 w-48 overflow-hidden border shadow-xl"
                    >
                      <div className="custom-scrollbar max-h-60 overflow-y-auto py-1">
                        {months.map((m) => (
                          <button
                            key={m}
                            onClick={() => handleMonthSelect(m)}
                            className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                              selectedMonth === m
                                ? 'bg-accent text-accent-foreground font-medium'
                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                            }`}
                          >
                            {m}
                            {selectedMonth === m && (
                              <Check
                                size={14}
                                className="text-accent-foreground"
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <h2 className="text-foreground mb-6 text-5xl leading-none font-medium tracking-tight sm:mb-10 sm:text-6xl">
              ${totalBudget.toLocaleString()}
            </h2>

            <div className="space-y-3">
              <p className="text-muted-foreground text-sm font-normal sm:text-lg">
                Monthly spending limit
              </p>
              <div className="bg-secondary h-2 w-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${spentPercentage}%` }}
                  transition={smoothTransition}
                  className="bg-primary h-full"
                />
              </div>
              <div className="flex items-end justify-between pt-1">
                <div className="space-y-1.5">
                  <span className="text-muted-foreground block text-xs font-normal capitalize sm:text-sm">
                    Spent
                  </span>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <span className="text-foreground text-base font-normal sm:text-xl">
                      ${spentAmount.toLocaleString()}
                    </span>
                    <span className="bg-secondary text-muted-foreground border-border border px-1.5 py-0.5 text-xs font-normal">
                      {spentPercentage}%
                    </span>
                  </div>
                </div>
                <div className="space-y-2 text-right">
                  <span className="text-muted-foreground block text-sm font-normal capitalize sm:text-base">
                    Remaining
                  </span>
                  <span className="text-foreground text-base font-normal sm:text-xl">
                    ${remainingAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-border h-px w-full" />

          {/* Bottom Section  */}
          <div className="space-y-6 p-6 pt-7 sm:p-8">
            <div className="space-y-3">
              <p className="text-muted-foreground block text-sm font-normal capitalize sm:text-base">
                Spending breakdown
              </p>
              <div className="flex h-2 gap-2">
                {breakdown.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ ...smoothTransition, delay: 0.5 + idx * 0.1 }}
                    className="h-full origin-left"
                    style={{ flex: item.amount, background: item.color }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {breakdown.map((item, idx) => (
                  <div className="flex flex-col gap-1" key={idx}>
                    <p className="text-muted-foreground block truncate text-xs font-normal capitalize sm:text-sm">
                      {item.label}
                    </p>
                    <p className="text-foreground text-sm font-normal sm:text-lg">
                      ${item.amount.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                setIsDetailsOpen(true);
                if (onViewDetails) onViewDetails();
              }}
              className="border-border text-foreground hover:bg-accent hover:text-accent-foreground w-full border bg-transparent py-3 text-sm font-normal transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </motion.div>

      {/* --- Details Modal (Themed) --- */}
      <AnimatePresence>
        {isDetailsOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailsOpen(false)}
              className="bg-background/60 absolute inset-0 backdrop-blur-md"
            />
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-card border-border text-foreground relative flex max-h-[90%] w-full max-w-lg flex-col overflow-hidden border font-sans shadow-2xl"
            >
              {/* Modal Header */}
              <div className="border-border flex items-center justify-between border-b p-6">
                <div>
                  <h3 className="text-lg font-semibold">Budget Details</h3>
                  <p className="text-muted-foreground text-xs">
                    Deep dive into your {selectedMonth} spending
                  </p>
                </div>
                <button
                  onClick={() => setIsDetailsOpen(false)}
                  className="hover:bg-accent rounded-full p-2 transition-colors"
                >
                  <X size={20} className="text-muted-foreground" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="custom-scrollbar flex-1 space-y-8 overflow-y-auto p-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-accent/50 border-border rounded-lg border p-3 transition-colors sm:p-4">
                    <p className="text-muted-foreground mb-1 truncate text-[9px] font-medium tracking-wide uppercase sm:text-[10px]">
                      Total Budget
                    </p>
                    <p className="text-lg leading-tight font-medium sm:text-xl">
                      ${totalBudget.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-accent/50 border-border rounded-lg border p-3 transition-colors sm:p-4">
                    <p className="text-muted-foreground mb-1 truncate text-[9px] font-medium tracking-wide uppercase sm:text-[10px]">
                      Amount Spent
                    </p>
                    <p className="text-lg leading-tight font-medium sm:text-xl">
                      ${spentAmount.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="space-y-4">
                  <h4 className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
                    Category Breakdown
                  </h4>
                  <div className="space-y-4">
                    {breakdown.map((item, idx) => {
                      const percentage =
                        spentAmount > 0
                          ? Math.round((item.amount / spentAmount) * 100)
                          : 0;
                      return (
                        <div key={idx} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{item.label}</span>
                            <span className="text-muted-foreground">
                              {percentage}%
                            </span>
                          </div>
                          <div className="bg-secondary h-1.5 w-full overflow-hidden rounded-full">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              className="h-full rounded-full"
                              style={{ background: item.color }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Transactions History */}
                <div className="space-y-4">
                  <h4 className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
                    Recent Transactions
                  </h4>
                  <div className="border-border divide-border divide-y border-t">
                    {transactions.map((t) => (
                      <div
                        key={t.id}
                        className="hover:bg-accent/50 group -mx-2 flex items-center justify-between gap-2 overflow-hidden rounded-md px-2 py-3 transition-colors sm:gap-4"
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                          <div className="bg-accent text-muted-foreground flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold">
                            {t.name[0]}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium tracking-tight uppercase">
                              {t.name}
                            </p>
                            <p className="text-muted-foreground truncate text-[10px]">
                              {t.category} • {t.date}
                            </p>
                          </div>
                        </div>
                        <span className="flex-shrink-0 text-sm font-medium">
                          -${t.amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-border border-t p-6">
                <button
                  onClick={() => setIsDetailsOpen(false)}
                  className="bg-primary text-primary-foreground w-full py-3 font-medium transition-transform hover:opacity-90 active:scale-[0.98]"
                >
                  Close Insights
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};