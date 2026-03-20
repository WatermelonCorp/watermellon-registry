"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check } from 'lucide-react';

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
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const BudgetCard: React.FC<BudgetCardProps> = ({
  month: initialMonth,
  totalBudget,
  spentAmount,
  breakdown,
  onViewDetails,
  onMonthChange
}) => {
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const spentPercentage = Math.round((spentAmount / totalBudget) * 100);
  const remainingAmount = totalBudget - spentAmount;

  const smoothTransition = { duration: 1.5, ease: [0.19, 1, 0.22, 1] } as const;
  const cornerClass = "absolute w-5 h-5 border-black/20 dark:border-white/20";

  // Click outside logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMonthSelect = (m: string) => {
    setSelectedMonth(m);
    setIsDropdownOpen(false);
    if (onMonthChange) onMonthChange(m);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className="theme-injected relative w-full max-w-lg mx-auto"  
    > 
      {/* Corner Borders */}
      <div className={`${cornerClass} top-0 left-0 border-t-2 border-l-2 z-40`} />
      <div className={`${cornerClass} top-0 right-0 border-t-2 border-r-2 z-40`} />
      <div className={`${cornerClass} bottom-0 left-0 border-b-2 border-l-2 z-40`} />
      <div className={`${cornerClass} bottom-0 right-0 border-b-2 border-r-2 z-40`} />

      <div className="w-full bg-card border border-border overflow-visible font-sans text-foreground relative shadow-sm dark:shadow-2xl">

        {/* Top Section */}
        <div className="p-6 sm:p-8 pb-4">
          <div className="flex justify-between items-start mb-1">
            <p className="text-muted-foreground font-normal text-sm sm:text-lg">Monthly Budget</p>

            {/* --- Month Dropdown --- */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 sm:gap-4 px-3 py-1 bg-transparent border border-border text-muted-foreground font-normal text-sm sm:text-lg hover:bg-accent transition-colors min-w-32 justify-between"
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
                    className="absolute right-0 top-full z-50 w-48 bg-popover border border-border shadow-xl overflow-hidden"
                  >
                    <div className="max-h-60 overflow-y-auto custom-scrollbar py-1">
                      {months.map((m) => (
                        <button
                          key={m}
                          onClick={() => handleMonthSelect(m)}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors
                            ${selectedMonth === m
                              ? 'bg-accent text-foreground font-medium'
                              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                            }`}
                        >
                          {m}
                          {selectedMonth === m && <Check size={14} className="text-foreground" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <h2 className="text-5xl sm:text-6xl font-medium text-foreground tracking-tight leading-none mb-6 sm:mb-10">
            ${totalBudget.toLocaleString()}
          </h2>

          <div className="space-y-3">
            <p className="text-muted-foreground font-normal text-sm sm:text-lg">Monthly spending limit</p>
            <div className="h-2 w-full bg-secondary overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${spentPercentage}%` }}
                transition={smoothTransition}
                className="h-full bg-linear-to-r from-primary to-primary"
              />
            </div>
            <div className="flex justify-between items-end pt-1">
              <div className="space-y-1.5">
                <span className="text-muted-foreground text-xs sm:text-sm block font-normal capitalize">Spent</span>
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="text-base sm:text-xl text-foreground font-normal">${spentAmount.toLocaleString()}</span>
                  <span className="bg-secondary text-muted-foreground text-xs px-1.5 py-0.5 border border-border font-normal">
                    {spentPercentage}%
                  </span>
                </div>
              </div>
              <div className="text-right space-y-2">
                <span className="text-muted-foreground text-sm sm:text-base block font-normal capitalize">Remaining</span>
                <span className="text-base sm:text-xl text-foreground font-normal">${remainingAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-border w-full" />

        {/* Bottom Section  */}
        <div className="p-6 sm:p-8 pt-7 space-y-6">
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm sm:text-base block font-normal capitalize">Spending breakdown</p>
            <div className="flex gap-2 h-2">
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
                <div className='flex flex-col gap-1' key={idx}>
                  <p className="text-muted-foreground text-xs sm:text-sm block font-normal capitalize truncate">{item.label}</p>
                  <p className="text-sm sm:text-lg text-foreground font-normal">${item.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={onViewDetails} className="w-full py-3 bg-transparent border border-border text-sm font-normal text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};