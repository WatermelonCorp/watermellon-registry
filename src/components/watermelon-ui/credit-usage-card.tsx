import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MoreVertical, Download, ChevronDown } from 'lucide-react';

interface UsageHistoryItem {
  date: string;
  model: string;
  credits: string;
  cost: string;
}

interface CreditUsageCardProps {
  usedCreditsPercent?: number;
  totalCreditsLabel?: string;
  creditsUsedLabel?: string;
  creditsLeftLabel?: string;
  usageHistory?: UsageHistoryItem[];
  onAutoSwitchChange?: (enabled: boolean) => void;
  onManagePlan?: () => void;
  onViewAll?: () => void;
}

export const CreditUsageCard: React.FC<CreditUsageCardProps> = ({
  usedCreditsPercent = 56.4,
  totalCreditsLabel = "100M CREDITS",
  creditsUsedLabel = "56.4M",
  creditsLeftLabel = "43.6M",
  usageHistory = [],
  onAutoSwitchChange,
  onManagePlan,
  onViewAll
}) => {
  const [autoSwitch, setAutoSwitch] = useState(true);
  const segments = 75;

  const handleToggleAutoSwitch = () => {
    const newState = !autoSwitch;
    setAutoSwitch(newState);
    onAutoSwitchChange?.(newState);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 font-sans bg-transparent transition-colors duration-500">
        
      <div className="w-full max-w-135 bg-white dark:bg-[#101010] rounded-4xl border border-[#DDD] dark:border-[#222] text-slate-700 dark:text-[#d4d4d4] font-mono shadow-xl overflow-hidden select-none transition-all duration-500">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-5 bg-gray-50/50 dark:bg-[#171717] px-4 sm:px-6 md:px-8">
          <div>
            <h3 className="text-[9px] uppercase tracking-[0.2em] text-[#7E7E7E] font-bold mb-1">Credits Used</h3>
            <span className="text-2xl sm:text-3xl font-medium inter text-slate-900 dark:text-[#F2F2F2]">{usedCreditsPercent}%</span>
          </div>

          <div className="flex items-center gap-2 mt-1 self-end sm:self-auto">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#787777] font-bold leading-tight text-right max-w-37.5">
              Auto-switch to cheaper model at limit
            </span>
            <button title='toggle'
              onClick={handleToggleAutoSwitch}
              className={`w-10 h-4.75 rounded-full relative transition-colors border-[1.4px] duration-200 flex items-center p-0.5 shrink-0 ${
                autoSwitch 
                ? 'bg-[#E8F5E9] dark:bg-[#182D1A] border-green-500/40 dark:border-green-400/40' 
                : 'bg-gray-200 dark:bg-[#333] border-gray-300 dark:border-[#404040]'
              }`}
            >
              <motion.div
                animate={{ x: autoSwitch ? 13.5 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`w-4 h-3 ${autoSwitch ? 'bg-green-500 dark:bg-[#2FD340]' : 'bg-gray-400 dark:bg-[#595353]'} rounded-full shadow-sm`}
              />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-px sm:gap-1 h-3 bg-gray-50/50 dark:bg-[#171717] px-4 sm:px-6 md:px-8">
          {[...Array(segments)].map((_, i) => {
            const isFilled = i < (usedCreditsPercent / 100) * segments;
            return (
              <div
                key={i}
                className={`flex-1 rounded-full transition-all duration-700 ${
                  isFilled ? 'bg-[#FF7A3F]' : 'bg-gray-200 dark:bg-[#222]'
                }`}
                style={{ opacity: isFilled ? 1 - (i * 0.004) : 1 }}
              />
            );
          })}
        </div>

        <div className="flex justify-between items-center py-4 text-[9px] sm:text-[10px] font-bold bg-gray-50/50 dark:bg-[#171717] px-4 sm:px-6 md:px-8">
          <span className="text-slate-500 dark:text-[#BEBEBE]">{creditsUsedLabel} <span className="text-slate-400 dark:text-[#717171]">/ {totalCreditsLabel}</span></span>
          <span className="text-slate-500 dark:text-[#BEBEBE]">{creditsLeftLabel} <span className="text-slate-400 dark:text-[#717171] hidden xs:inline">CREDITS LEFT</span></span>
        </div>

        <div className="w-full h-px border-b-2 border-dashed border-black/5 dark:border-white/10" />

        {/* History Header */}
        <div className="flex justify-between items-center pt-4 pb-4 bg-gray-50/50 dark:bg-[#171717] px-4 sm:px-6 md:px-8">
          <div className="flex items-center gap-2">
            <h4 className="text-sm sm:text-base font-medium text-slate-800 dark:text-[#E8E8E8] inter">Usage History</h4>
            <button
              onClick={onViewAll}
              title='view all' 
              className="px-2 py-0.5 rounded-full text-center border border-gray-300 dark:border-[#909090]/65 text-[9px] text-gray-500 dark:text-[#909090] hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors"
            >
              View all
            </button>
          </div>
          <button title='30days' className="flex items-center gap-1 sm:gap-2 px-2 py-1 rounded-xl border border-gray-300 dark:border-[#909090]/65 text-[9px] text-gray-500 dark:text-[#909090]">
            30 Days <ChevronDown size={10} />
          </button>
        </div>

        {/* Table Wrapper */}
        <div className="overflow-x-auto no-scrollbar bg-gray-50/50 dark:bg-[#171717]">
          <div className="min-w-120 space-y-0.5 border-b-[1.4px] border-gray-200 dark:border-[#303030]/60 px-4 sm:px-6 md:px-8 py-2">
            <div className="grid grid-cols-4 pb-2 text-[10px] uppercase tracking-[0.15em] text-slate-400 dark:text-[#737373] font-bold px-1">
              <span>Date</span>
              <span>Model</span>
              <span className="text-right">Credits</span>
              <span className="text-right">Cost</span>
            </div>
            {usageHistory.map((row, idx) => (
              <div key={idx} className="grid grid-cols-4 py-2 border-t-[1.5px] border-gray-100 dark:border-[#222222] text-[10.5px] text-slate-500 dark:text-[#999] hover:bg-white dark:hover:bg-[#161616] transition-colors px-1 group">
                <span className="group-hover:text-slate-900 dark:group-hover:text-white/80">{row.date}</span>
                <span className="group-hover:text-slate-900 dark:group-hover:text-white/80 truncate pr-2 font-medium">
                  {row.model}
                </span>
                <span className="text-right group-hover:text-slate-900 dark:group-hover:text-white/80">{row.credits}</span>
                <span className="text-right group-hover:text-slate-900 dark:group-hover:text-white/80 font-bold">{row.cost}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer*/}
        <div className="pt-4 pb-4 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-[#101010] px-4 sm:px-6 md:px-8">
          <div className="flex gap-3 text-slate-400 dark:text-[#888888] self-start sm:self-auto">
            < MoreVertical size={16} className="cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors" />
            <div className='h-4 w-px bg-gray-200 dark:bg-[#242424]'/>
            <Download size={16} className="cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors" />
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 py-1">
              <div className="w-4 h-4 rounded-full bg-[#6772E7] flex items-center justify-center text-[10px] text-white font-semibold">S</div>
              <span className="text-[9px] text-slate-400 dark:text-[#7f7d7d] font-bold uppercase tracking-tighter">Billing via Stripe</span>
            </div>
            <button title='plans'
              onClick={onManagePlan}
              className="px-3 py-1.5 rounded-full inter border border-gray-200 dark:border-[#222] text-[10px] sm:text-[11px] font-normal text-slate-600 dark:text-white/70 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all whitespace-nowrap"
            >
              Manage plan
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};