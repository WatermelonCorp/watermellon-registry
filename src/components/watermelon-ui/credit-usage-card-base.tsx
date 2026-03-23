import React, { useState } from 'react';
import { motion } from 'motion/react';
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
    <div className="theme-injected min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 font-sans bg-transparent transition-colors duration-500">

      <div className="w-full max-w-4xl bg-card rounded-xl border border-border text-foreground font-sans shadow-lg overflow-hidden select-none transition-all duration-500">

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-5 bg-muted/50 px-4 sm:px-6 md:px-8">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">Credits Used</h3>
            <span className="text-2xl sm:text-3xl font-medium font-sans text-foreground">{usedCreditsPercent}%</span>
          </div>

          <div className="flex items-center gap-2 mt-1 self-end sm:self-auto">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold leading-tight text-right max-w-40">
              Auto-switch to cheaper model at limit
            </span>
            <button title='toggle'
              onClick={handleToggleAutoSwitch}
              className={`w-10 h-5 rounded-lg relative transition-colors border duration-200 flex items-center p-0.5 shrink-0 ${autoSwitch
                  ? 'bg-primary/15 border-primary/40'
                  : 'bg-muted border-border'
                }`}
            >
              <motion.div
                animate={{ x: autoSwitch ? 14 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`w-4 h-3 ${autoSwitch ? 'bg-primary' : 'bg-muted-foreground'} rounded-md shadow-xs`}
              />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-px sm:gap-1 h-3 bg-muted/50 px-4 sm:px-6 md:px-8">
          {[...Array(segments)].map((_, i) => {
            const isFilled = i < (usedCreditsPercent / 100) * segments;
            return (
              <div
                key={i}
                className={`flex-1 rounded-sm transition-all duration-700 ${isFilled ? 'bg-primary' : 'bg-muted'
                  }`}
                style={{ opacity: isFilled ? 1 - (i * 0.004) : 1 }}
              />
            );
          })}
        </div>

        <div className="flex justify-between items-center py-4 text-xs font-bold bg-muted/50 px-4 sm:px-6 md:px-8">
          <span className="text-muted-foreground">{creditsUsedLabel} <span className="text-muted-foreground/70">/ {totalCreditsLabel}</span></span>
          <span className="text-muted-foreground">{creditsLeftLabel} <span className="text-muted-foreground/70 hidden xs:inline">CREDITS LEFT</span></span>
        </div>

        <div className="w-full h-px border-b border-dashed border-border" />

        {/* History Header */}
        <div className="flex justify-between items-center pt-4 pb-4 bg-muted/50 px-4 sm:px-6 md:px-8">
          <div className="flex items-center gap-2">
            <h4 className="text-sm sm:text-base font-medium font-sans text-foreground">Usage History</h4>
            <button
              onClick={onViewAll}
              title='view all'
              className="px-2 py-1 rounded-md text-center border border-border text-xs text-muted-foreground hover:bg-accent transition-colors"
            >
              View all
            </button>
          </div>
          <button title='30days' className="flex items-center gap-1 sm:gap-2 px-2 py-1 rounded-md border border-border text-xs text-muted-foreground">
            30 Days <ChevronDown size={10} />
          </button>
        </div>

        {/* Table Wrapper */}
        <div className="overflow-x-auto no-scrollbar bg-muted/50">
          <div className="min-w-96 space-y-0.5 border-b border-border px-4 sm:px-6 md:px-8 py-2">
            <div className="grid grid-cols-4 pb-2 text-xs uppercase tracking-wider text-muted-foreground font-bold px-1">
              <span>Date</span>
              <span>Model</span>
              <span className="text-right">Credits</span>
              <span className="text-right">Cost</span>
            </div>
            {usageHistory.map((row, idx) => (
              <div key={idx} className="grid grid-cols-4 py-2 border-t border-border text-xs text-muted-foreground hover:bg-accent/50 transition-colors px-1 group">
                <span className="group-hover:text-foreground">{row.date}</span>
                <span className="group-hover:text-foreground truncate pr-2 font-medium">
                  {row.model}
                </span>
                <span className="text-right group-hover:text-foreground">{row.credits}</span>
                <span className="text-right group-hover:text-foreground font-bold">{row.cost}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer*/}
        <div className="pt-4 pb-4 flex flex-col sm:flex-row gap-4 justify-between items-center bg-card px-4 sm:px-6 md:px-8">
          <div className="flex gap-3 text-muted-foreground self-start sm:self-auto">
            <MoreVertical size={16} className="cursor-pointer hover:text-foreground transition-colors" />
            <div className='h-4 w-px bg-border' />
            <Download size={16} className="cursor-pointer hover:text-foreground transition-colors" />
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 py-1">
              <div className="w-4 h-4 rounded-md bg-primary flex items-center justify-center text-xs text-primary-foreground font-semibold">S</div>
              <span className="text-xs text-muted-foreground font-bold uppercase tracking-tight">Billing via Stripe</span>
            </div>
            <button title='plans'
              onClick={onManagePlan}
              className="px-3 py-2 rounded-md font-sans border border-border text-xs font-normal text-foreground hover:bg-foreground hover:text-background transition-all whitespace-nowrap"
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