import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MoreVertical, Download, ChevronDown, Moon, Sun } from 'lucide-react';

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
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const segments = 75;

  const handleToggleAutoSwitch = () => {
    const newState = !autoSwitch;
    setAutoSwitch(newState);
    onAutoSwitchChange?.(newState);
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center p-10 font-sans transition-colors duration-500"
      style={{ 
        backgroundColor: theme === 'dark' ? '#0A0A0A' : '#F5F5F7',
      }}
    >
      {/* Theme Toggle Button */}
      <div className="mb-6 flex justify-end w-full max-w-[540px]">
        <button title='theme'
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`p-2 rounded-xl border transition-all duration-300 ${
            theme === 'dark' 
            ? 'bg-[#101010] border-[#222] text-yellow-500' 
            : 'bg-white border-[#DDD] text-slate-700 shadow-md'
          }`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <div 
        className="w-full max-w-[540px] bg-[#101010] rounded-[20px] border border-[#222] text-[#d4d4d4] font-mono shadow-2xl overflow-hidden select-none transition-all duration-500"
        style={{
          filter: theme === 'light' ? 'invert(1.92) hue-rotate(200deg)' : 'none'
        }}
      >
        {/* Top Header */}
        <div className="flex justify-between items-start py-5 bg-[#171717] px-6">
          <div>
            <h3 className="text-[9px] uppercase tracking-[0.2em] text-[#7E7E7E] font-bold mb-1">Credits Used</h3>
            <span className="text-3xl font-medium inter text-[#F2F2F2]">{usedCreditsPercent}%</span>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] uppercase  tracking-wider text-[#787777] font-bold leading-tight text-right w-full">
              Auto-switch to cheaper model at limit
            </span>
            <button title='toggle'
              onClick={handleToggleAutoSwitch}
              className={`w-10 h-[19px] rounded-full relative transition-colors border-[1.4px] duration-200 flex items-center p-[2px] ${autoSwitch ? 'bg-[#182D1A] border-green-400/40' : 'bg-[#333] border-[#404040]'
                }`}
            >
              <motion.div
                animate={{ x: autoSwitch ? 13.5 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`w-4 h-3 ${autoSwitch ? 'bg-[#2FD340]' : 'bg-[#595353]'} rounded-full shadow-sm`}
              />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-[4px] h-[12px]  bg-[#171717] px-6">
          {[...Array(segments)].map((_, i) => {
            const isFilled = i < (usedCreditsPercent / 100) * segments;
            return (
              <div
                key={i}
                className={`flex-1 rounded-full transition-all duration-700 ${isFilled ? 'bg-[#FF7A3F]' : 'bg-[#222]'}`}
                style={{ opacity: isFilled ? 1 - (i * 0.004) : 1 }}
              />
            );
          })}
        </div>

        <div className="flex justify-between items-center py-4 text-[10px] font-bold bg-[#171717] px-6">
          <span className="text-[#BEBEBE]">{creditsUsedLabel} <span className="text-[#717171]">/ {totalCreditsLabel}</span></span>
          <span className="text-[#BEBEBE]">{creditsLeftLabel} <span className="text-[#717171]">CREDITS LEFT</span></span>
        </div>

        <div className="w-full h-px border-b-2 border-dashed border-white/10" />

        {/* History Header */}
        <div className="flex justify-between items-center pt-4 pb-4 bg-[#171717] px-6">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-medium text-[#E8E8E8] inter">Usage History</h4>
            <button
              onClick={onViewAll}
              title='view all' 
              className="px-2.5 py-0.5 rounded-full text-center border border-[#909090]/65 hover:border-[#909090]/85 text-[10px] text-[#909090] hover:text-[#f1f1f1]/70 hover:bg-[#1a1a1a] transition-colors"
            >
              View all
            </button>
          </div>
          <button title='30days' className="flex items-center gap-2 px-2 py-1 rounded-[8px] border border-[#909090]/65 hover:border-[#909090]/85 text-[10px] text-[#909090] hover:text-[#f1f1f1]/70 hover:bg-[#1a1a1a]">
            30 Days <ChevronDown size={12} />
          </button>
        </div>

        {/* Table */}
        <div className="space-y-0.5 border-b-[1.4px] rounded-b-[24px] bg-[#171717] border-[#303030]/60 px-6 py-2">
          <div className="grid grid-cols-4 pb-2 text-[10px] uppercase tracking-[0.15em] text-[#737373] font-bold px-1">
            <span>Date</span>
            <span>Model</span>
            <span className="text-right">Credits</span>
            <span className="text-right">Cost</span>
          </div>
          {usageHistory.map((row, idx) => (
            <div key={idx} className="grid grid-cols-4 py-2 border-t-[1.5px] border-[#222222] text-[10.5px] text-[#999] hover:bg-[#161616] transition-colors px-1  group">
              <span className="text-[#a2a1a1] group-hover:text-white/80">{row.date}</span>
              <span className="text-[#a2a1a1] group-hover:text-white/80 transition-colors whitespace-nowrap min-w-max font-medium">
                {row.model}
              </span>
              <span className="text-right text-[#a2a1a1] group-hover:text-white/80">{row.credits}</span>
              <span className="text-right text-[#a2a1a1] group-hover:text-white/80 font-bold">{row.cost}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className=" pt-4 pb-4 flex justify-between items-center bg-[#101010] px-6">
          <div className="flex gap-3 text-[#888888]">
            <MoreVertical size={16} className="cursor-pointer hover:text-white transition-colors" />
            <div className='h-4 w-0.2 border-[0.2px] border-[#242424]'/>
            <Download size={16} className="cursor-pointer hover:text-white transition-colors" />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1">
              <div className="w-4 h-4 rounded-full bg-[#6772E7] flex items-center justify-center text-[12px] text-white font-semibold">S</div>
              <span className="text-[10px] text-[#7f7d7d] font-bold">Credit billing is via Stripe</span>
            </div>
            <button title='plans'
              onClick={onManagePlan}
              className="px-3 py-1.5 rounded-full inter border border-[#222] text-[11px] font-normal text-white/70 hover:bg-white hover:text-black transition-all"
            >
              Manage plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};