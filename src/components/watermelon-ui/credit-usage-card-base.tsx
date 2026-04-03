import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MoreVertical,
  Download,
  ChevronDown,
  Check,
  Printer,
  Share2,
  RefreshCw,
} from 'lucide-react';

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

const PERIOD_OPTIONS = ['7 Days', '14 Days', '30 Days', '90 Days', '12 Months'];

const popoverAnim = {
  initial: { opacity: 0, y: 4, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 4, scale: 0.98 },
  transition: { type: 'spring' as const, stiffness: 450, damping: 25 },
} as const;

export const CreditUsageCard: React.FC<CreditUsageCardProps> = ({
  usedCreditsPercent = 56.4,
  totalCreditsLabel = '100M CREDITS',
  creditsUsedLabel = '56.4M',
  creditsLeftLabel = '43.6M',
  usageHistory = [],
  onAutoSwitchChange,
  onManagePlan,
  onViewAll,
}) => {
  const [autoSwitch, setAutoSwitch] = useState(true);
  const [activePopover, setActivePopover] = useState<'more' | 'period' | null>(
    null,
  );
  const [selectedPeriod, setSelectedPeriod] = useState('30 Days');
  const [downloadDone, setDownloadDone] = useState(false);
  const segments = 75;

  const moreRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef<HTMLDivElement>(null);

  const handleToggleAutoSwitch = () => {
    const newState = !autoSwitch;
    setAutoSwitch(newState);
    onAutoSwitchChange?.(newState);
  };

  const handleDownload = () => {
    // Simulate CSV export
    const headers = ['Date', 'Model', 'Credits', 'Cost'];
    const rows = usageHistory.map((r) => [r.date, r.model, r.credits, r.cost]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'usage-history.csv';
    a.click();
    URL.revokeObjectURL(url);
    setDownloadDone(true);
    setTimeout(() => setDownloadDone(false), 2000);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setActivePopover((prev) => (prev === 'more' ? null : prev));
      }
      if (periodRef.current && !periodRef.current.contains(e.target as Node)) {
        setActivePopover((prev) => (prev === 'period' ? null : prev));
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="theme-injected flex w-full flex-col items-center justify-center bg-transparent p-4 font-sans transition-colors duration-500 sm:p-8 md:p-12">
      <div className="bg-card border-border text-foreground w-full max-w-135 overflow-hidden rounded-xl border font-sans shadow-lg transition-all duration-500 select-none">
        {/* Top Header */}
        <div className="bg-muted/50 flex flex-col items-start justify-between gap-4 px-4 py-5 sm:flex-row sm:items-center sm:px-6 md:px-8">
          <div>
            <h3 className="text-muted-foreground mb-1 text-[10px] font-bold tracking-[0.2em] uppercase">
              Credits Used
            </h3>
            <span className="text-foreground font-sans text-2xl font-medium sm:text-3xl">
              {usedCreditsPercent}%
            </span>
          </div>

          <div className="mt-1 flex items-center gap-2 self-end sm:self-auto">
            <span className="text-muted-foreground max-w-40 text-right text-[10px] leading-tight font-bold tracking-wider uppercase">
              Auto-switch to cheaper model at limit
            </span>
            <button
              title="toggle"
              onClick={handleToggleAutoSwitch}
              className={`relative flex h-5 w-10 shrink-0 items-center rounded-full border p-0.5 transition-colors duration-200 ${
                autoSwitch
                  ? 'bg-primary/15 border-primary/40'
                  : 'bg-muted border-border'
              }`}
            >
              <motion.div
                animate={{ x: autoSwitch ? 18.5 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`h-3.5 w-4 ${autoSwitch ? 'bg-primary' : 'bg-muted-foreground'} rounded-full shadow-xs`}
              />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-muted/50 flex h-3 gap-px px-4 sm:gap-1 sm:px-6 md:px-8">
          {[...Array(segments)].map((_, i) => {
            const isFilled = i < (usedCreditsPercent / 100) * segments;
            return (
              <div
                key={i}
                className={`flex-1 rounded-sm transition-all duration-700 ${
                  isFilled ? 'bg-primary' : 'bg-muted'
                }`}
                style={{ opacity: isFilled ? 1 - i * 0.004 : 1 }}
              />
            );
          })}
        </div>

        <div className="bg-muted/50 flex items-center justify-between px-4 py-4 text-xs font-bold sm:px-6 md:px-8">
          <span className="text-muted-foreground">
            {creditsUsedLabel}{' '}
            <span className="text-muted-foreground/70">
              / {totalCreditsLabel}
            </span>
          </span>
          <span className="text-muted-foreground">
            {creditsLeftLabel}{' '}
            <span className="text-muted-foreground/70 xs:inline hidden">
              CREDITS LEFT
            </span>
          </span>
        </div>

        <div className="border-border h-px w-full border-b border-dashed" />

        {/* History Header */}
        <div className="bg-muted/50 flex flex-row flex-wrap items-center justify-between gap-2 px-4 pt-4 pb-4 sm:flex-nowrap sm:px-6 md:px-8">
          <div className="flex flex-shrink-0 items-center gap-2">
            <h4 className="text-foreground font-sans text-sm font-medium whitespace-nowrap sm:text-base">
              Usage History
            </h4>
            <button
              onClick={onViewAll}
              title="view all"
              className="border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground shrink-0 rounded-md border px-2 py-1 text-center text-[9px] whitespace-nowrap transition-colors active:scale-95"
            >
              View all
            </button>
          </div>

          {/* Period selector */}
          <div ref={periodRef} className="relative flex-shrink-0">
            <button
              title="period"
              onClick={() =>
                setActivePopover((prev) =>
                  prev === 'period' ? null : 'period',
                )
              }
              className="border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-1 rounded-md border px-2 py-1 text-[9px] whitespace-nowrap transition-all sm:gap-2"
            >
              {selectedPeriod}{' '}
              <ChevronDown
                size={10}
                className={`transition-transform duration-200 ${activePopover === 'period' ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {activePopover === 'period' && (
                <motion.div
                  {...popoverAnim}
                  className="bg-popover text-popover-foreground border-border absolute top-full right-0 z-50 mt-2 w-36 overflow-hidden rounded-lg border py-1 shadow-xl"
                >
                  {PERIOD_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelectedPeriod(opt);
                        setActivePopover(null);
                      }}
                      className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs transition-colors ${selectedPeriod === opt ? 'bg-primary/10 text-primary' : 'hover:bg-accent'}`}
                    >
                      {opt}
                      {selectedPeriod === opt && <Check size={12} />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Table Wrapper */}
        <div className="no-scrollbar bg-muted/50 overflow-x-auto">
          <div className="border-border min-w-[500px] space-y-0.5 border-b px-4 py-2 sm:px-6 md:px-8">
            <div className="text-muted-foreground grid grid-cols-4 px-1 pb-2 text-[10px] font-bold tracking-wider uppercase">
              <span>Date</span>
              <span>Model</span>
              <span className="text-right">Credits</span>
              <span className="text-right">Cost</span>
            </div>
            {usageHistory.length > 0 ? (
              usageHistory.map((row, idx) => (
                <div
                  key={idx}
                  className="border-border/50 text-muted-foreground hover:bg-accent/30 group grid grid-cols-4 border-t px-1 py-2.5 text-[10.5px] transition-colors"
                >
                  <span className="group-hover:text-foreground">
                    {row.date}
                  </span>
                  <span className="group-hover:text-foreground truncate pr-2 font-medium">
                    {row.model}
                  </span>
                  <span className="group-hover:text-foreground text-right">
                    {row.credits}
                  </span>
                  <span className="group-hover:text-foreground text-right font-bold">
                    {row.cost}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-muted-foreground border-border/50 border-t py-8 text-center text-xs">
                No usage history available
              </div>
            )}
          </div>
        </div>

        {/* Footer*/}
        <div className="bg-card flex flex-col items-center justify-between gap-4 px-4 pt-4 pb-4 sm:flex-row sm:px-6 md:px-8">
          <div className="text-muted-foreground flex items-center gap-3 self-start sm:self-auto">
            {/* More Options */}
            <div ref={moreRef} className="relative flex items-center">
              <button
                title="more"
                onClick={() =>
                  setActivePopover((prev) => (prev === 'more' ? null : 'more'))
                }
                className="flex items-center justify-center"
              >
                <MoreVertical
                  size={16}
                  className="hover:text-foreground cursor-pointer transition-colors"
                />
              </button>
              <AnimatePresence>
                {activePopover === 'more' && (
                  <motion.div
                    {...popoverAnim}
                    className="bg-popover text-popover-foreground border-border absolute bottom-full left-0 z-50 mb-2 w-44 overflow-hidden rounded-lg border py-1 shadow-xl"
                  >
                    {[
                      {
                        label: 'Export CSV',
                        icon: <Download size={14} />,
                        action: handleDownload,
                      },
                      {
                        label: 'Print history',
                        icon: <Printer size={14} />,
                        action: () => {
                          window.print();
                          setActivePopover(null);
                        },
                      },
                      {
                        label: 'Share report',
                        icon: <Share2 size={14} />,
                        action: () => setActivePopover(null),
                      },
                      {
                        label: 'Refresh data',
                        icon: <RefreshCw size={14} />,
                        action: () => setActivePopover(null),
                      },
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        onClick={opt.action}
                        className="hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-3 px-3 py-2.5 text-left text-xs transition-colors"
                      >
                        <span className="text-muted-foreground/70">
                          {opt.icon}
                        </span>
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-border h-4 w-px" />

            {/* Download Button */}
            <button
              title="download"
              onClick={handleDownload}
              className="group relative flex items-center justify-center"
            >
              <motion.div
                animate={
                  downloadDone
                    ? { scale: [1, 1.25, 1], rotate: [0, 5, -5, 0] }
                    : {}
                }
                className={`flex items-center justify-center transition-colors ${downloadDone ? 'text-green-500' : 'hover:text-foreground'}`}
              >
                <Download size={16} />
              </motion.div>
            </button>
          </div>

          <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
            <div className="flex items-center gap-1.5 py-1">
              <div className="bg-primary text-primary-foreground flex h-4 w-4 items-center justify-center rounded-sm text-[10px] font-semibold">
                S
              </div>
              <span className="text-muted-foreground text-[9px] font-bold tracking-tighter uppercase">
                Billing via Stripe
              </span>
            </div>
            <button
              title="plans"
              onClick={onManagePlan}
              className="border-border text-foreground hover:bg-foreground hover:text-background rounded-md border px-3 py-2 font-sans text-xs font-normal whitespace-nowrap transition-all active:scale-95"
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
