"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      className="relative w-full max-w-130 mx-auto"
    > 
      {/* Corner Borders */}
      <div className={`${cornerClass} top-0 left-0 border-t-[1.6px] border-l-[1.6px] z-40`} />
      <div className={`${cornerClass} top-0 right-0 border-t-[1.6px] border-r-[1.6px] z-40`} />
      <div className={`${cornerClass} bottom-0 left-0 border-b-[1.6px] border-l-[1.6px] z-40`} />
      <div className={`${cornerClass} bottom-0 right-0 border-b-[1.6px] border-r-[1.6px] z-40`} />

      <div className="w-full bg-white dark:bg-[#0B0B0B] border-[1.6px] border-black/8 dark:border-[#e3d4d4]/10 overflow-visible font-sans text-black dark:text-white relative shadow-sm dark:shadow-2xl">
        
        {/* Top Section */}
        <div className="p-6 sm:p-8 pb-4">
          <div className="flex justify-between items-start mb-1">
            <p className="text-zinc-500 dark:text-[#686868] font-normal text-sm sm:text-[18px]">Monthly Budget</p>
            
            {/* --- Month Dropdown --- */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 sm:gap-4 px-3 py-1 bg-transparent border-[1.6px] border-zinc-200 dark:border-[#1e1d1d] text-zinc-500 dark:text-[#686868] font-normal text-sm sm:text-[18px] hover:bg-zinc-50 dark:hover:bg-[#1A1A1A] transition-colors min-w-30 justify-between"
              >
                {selectedMonth} 
                <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }}>
                  <ChevronDown size={16} className="text-zinc-400 dark:text-[#7d7c7c]" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 5, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full z-100 w-48 bg-white dark:bg-[#121212] border-[1.6px] border-black/8 dark:border-[#1e1d1d] shadow-xl overflow-hidden"
                  >
                    <div className="max-h-60 overflow-y-auto custom-scrollbar py-1">
                      {months.map((m) => (
                        <button
                          key={m}
                          onClick={() => handleMonthSelect(m)}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors
                            ${selectedMonth === m 
                              ? 'bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white font-medium' 
                              : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/2'
                            }`}
                        >
                          {m}
                          {selectedMonth === m && <Check size={14} className="text-zinc-900 dark:text-white" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <h2 className="text-[40px] sm:text-[60px] font-medium text-zinc-900 dark:text-[#F4F4F4] tracking-tight leading-none mb-6 sm:mb-10">
            ${totalBudget.toLocaleString()}
          </h2>

          <div className="space-y-3">
            <p className="text-zinc-500 dark:text-[#686868] font-normal text-sm sm:text-[18px]">Monthly spending limit</p>
            <div className="h-2 w-full bg-zinc-100 dark:bg-[#222222] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${spentPercentage}%` }}
                transition={smoothTransition}
                className="h-full bg-linear-to-r from-zinc-400 to-zinc-800 dark:from-[#424243] dark:to-white/90"
              />
            </div>
            <div className="flex justify-between items-end pt-1">
              <div className="space-y-1.5">
                <span className="text-zinc-400 dark:text-[#7e7d7d] text-[12px] sm:text-[14px] block font-normal capitalize">Spent</span>
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="text-[16px] sm:text-[20px] text-zinc-600 dark:text-[#B3B3B3] font-normal">${spentAmount.toLocaleString()}</span>
                  <span className="bg-gray-100 dark:bg-black dark:bg-linear-to-t dark:from-[#010101]/10 dark:to-white/10 text-zinc-500 dark:text-[#f1f1f1]/40 text-[12px] px-1.5 py-[1.75px] border border-black/5 dark:border-white/10 font-normal">
                    {spentPercentage}%
                  </span>
                </div>
              </div>
              <div className="text-right space-y-2">
                <span className="text-zinc-400 dark:text-[#7e7d7d] text-[14px] sm:text-[16px] block font-normal capitalize">Remaining</span>
                <span className="text-[16px] sm:text-[20px] text-zinc-600 dark:text-[#B3B3B3] font-normal">${remainingAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-black/5 dark:bg-white/5 w-full" />

        {/* Bottom Section  */}
        <div className="p-6 sm:p-8 pt-7 space-y-6">
          <div className="space-y-3">
            <p className="text-zinc-400 dark:text-[#7e7d7d] text-[14px] sm:text-[16px] block font-normal capitalize">Spending breakdown</p>
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
                  <p className="text-zinc-400 dark:text-[#7e7d7d] text-[12px] sm:text-[14px] block font-normal capitalize truncate">{item.label}</p>
                  <p className="text-[14px] sm:text-[18px] text-zinc-600 dark:text-[#B3B3B3] font-normal">${item.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={onViewDetails} className="w-full py-3 bg-transparent border-[1.6px] border-zinc-200 dark:border-[#1e1d1d]/90 text-[14px] font-normal text-zinc-800 dark:text-[#f1f1f1] hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};