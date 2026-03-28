'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Maximize2,
  X,
  Globe,
  GitBranch,
  GitCommit,
  Play,
  CheckCircle2,
  MoreVertical,
  Terminal,
  Search,
  Box,
  RotateCw,
  Copy,
  History,
  Settings,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { PiShareFatLight, PiCheckBold } from 'react-icons/pi';
import { LuClock } from 'react-icons/lu';
import { TbArrowUpRight, TbCircleDashed } from 'react-icons/tb';
import { BsCalendar4Week } from 'react-icons/bs';
import { HiMiniCalendar } from 'react-icons/hi2';
import { cn } from '@/lib/utils';

// --- Interfaces  ---
export interface DeploymentStep {
  id: string;
  label: string;
  status: 'success' | 'warning' | 'error' | 'loading' | 'pending';
  progress: number;
  duration: string;
  metrics?: { files: number; functions: number; assets: number; size: string };
  errors?: number;
  warnings?: number;
}

export interface DeploymentData {
  id: string;
  environment: string;
  status: 'Ready' | 'Building' | 'Error';
  createdTime: string;
  createdBy: { name: string; avatar: string };
  duration: string;
  lastActive: string;
  domains: string[];
  branch: string;
  commitMessage: string;
  commitHash: string;
  steps: DeploymentStep[];
}

// --- Components ---

const SegmentedProgress = ({
  progress,
  status,
  count = 22,
}: {
  progress: number;
  status: string;
  count?: number;
}) => {
  const activeSegments = Math.floor(progress * count);
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i < activeSegments;
        let color = 'bg-neutral-200 dark:bg-[#1e1e1f]';
        if (isActive) {
          color =
            status === 'error'
              ? 'bg-red-500'
              : status === 'warning'
                ? 'bg-amber-500'
                : 'bg-[#22c55e]';
        }
        return (
          <div
            key={i}
            className={cn(
              'h-2.5 w-1 rounded-[1px] transition-colors duration-150',
              color,
            )}
          />
        );
      })}
    </div>
  );
};

const MetricTag = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex items-center gap-1.5 rounded-md border border-neutral-200 bg-neutral-100 px-2 py-0.5 dark:border-[#2a2a2c] dark:bg-[#161617]">
    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[2px] border border-neutral-300 text-[9px] font-black text-neutral-400 uppercase dark:border-[#333] dark:text-[#555]">
      {label}
    </span>
    <span className="text-[10px] font-bold text-neutral-600 dark:text-[#999]">
      {value}
    </span>
  </div>
);

// --- Helper ---
const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
};

export const DeploymentCard: React.FC<{ data: DeploymentData }> = ({
  data: initialData,
}) => {
  const [data, setData] = useState(initialData);
  const [isCopied, setIsCopied] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [activePopover, setActivePopover] = useState<
    'more' | 'terminal' | 'search' | null
  >(null);
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const moreRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideMore =
        moreRef.current && !moreRef.current.contains(event.target as Node);
      const isOutsideTerminal =
        terminalRef.current &&
        !terminalRef.current.contains(event.target as Node);
      const isOutsideSearch =
        searchRef.current && !searchRef.current.contains(event.target as Node);

      if (isOutsideMore && isOutsideTerminal && isOutsideSearch) {
        setActivePopover(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (data.status !== 'Building') return;

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);

      setData((prevData) => {
        const newSteps = [...prevData.steps];
        const activeStepIndex = newSteps.findIndex(
          (s) =>
            s.status === 'loading' || (s.status === 'pending' && !s.metrics),
        );

        if (activeStepIndex !== -1) {
          const step = { ...newSteps[activeStepIndex] };
          if (step.progress < 1) {
            step.status = 'loading';
            step.progress += 0.05;
            step.duration = `${Math.floor(step.progress * 10)}s`;
          } else {
            step.progress = 1;
            step.status = 'success';
          }
          newSteps[activeStepIndex] = step;

          const allDone = newSteps.every(
            (s) => s.status === 'success' || s.metrics,
          );

          return {
            ...prevData,
            steps: newSteps,
            duration: formatDuration(elapsedSeconds),
            status: allDone ? 'Ready' : 'Building',
          };
        }
        return prevData;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [data.status, elapsedSeconds]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleVisit = () => {
    window.open(`https://${data.domains[0]}`, '_blank');
  };

  const resetSimulation = () => {
    setData(initialData);
    setElapsedSeconds(0);
  };

  const handleInvestigate = () => {
    setIsInvestigating(true);
    setTimeout(() => {
      setIsInvestigating(false);
      setData((prev) => ({
        ...prev,
        steps: prev.steps.map((s) => ({
          ...s,
          status: s.status === 'error' ? 'success' : s.status,
        })),
      }));
    }, 3000);
  };

  const handleRunSummary = () => {
    // Functional placeholder
  };

  return (
    <div className="relative px-2 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto w-full overflow-hidden rounded-[24px] border border-neutral-200 bg-gray-50 font-sans antialiased shadow-xl sm:max-w-140 dark:border-[#1F1F21] dark:bg-[#0F0F10]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3 sm:px-5 dark:border-[#1e1e1f]">
          <span className="text-[11px] font-bold tracking-tight text-neutral-400 uppercase dark:text-[#888]">
            Deployment Card
          </span>
          <div className="flex items-center gap-3 text-neutral-300 dark:text-[#555]">
            <RotateCw
              size={13}
              onClick={resetSimulation}
              className="cursor-pointer transition-colors duration-500 hover:text-neutral-900 active:rotate-180 dark:hover:text-white"
            />
            <Maximize2
              size={13}
              className="cursor-pointer transition-colors hover:text-neutral-900 dark:hover:text-white"
            />
            <X
              size={14}
              className="cursor-pointer transition-colors hover:text-neutral-900 dark:hover:text-white"
            />
          </div>
        </div>

        <div className="space-y-6 p-4 sm:p-6">
          {/* Title Area */}
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
            <h1 className="text-3xl font-medium tracking-tight break-all text-neutral-900 dark:text-white">
              {data.id}
            </h1>
            <div className="flex w-full gap-2 sm:w-auto">
              {/* Functional: Share Button */}
              <button
                onClick={handleShare}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-neutral-200 px-3 py-2 text-[12px] text-neutral-500 transition-all hover:bg-neutral-50 hover:text-neutral-900 active:scale-95 sm:flex-none dark:border-[#2a2a2c] dark:text-[#888] dark:hover:bg-neutral-900 dark:hover:text-white"
              >
                {isCopied ? (
                  <PiCheckBold size={16} className="text-green-500" />
                ) : (
                  <PiShareFatLight size={16} />
                )}
                {isCopied ? 'Copied' : 'Share'}
              </button>
              <button
                onClick={handleVisit}
                className="flex flex-1 items-center justify-center gap-1 rounded-full bg-[#FA692E] px-3 py-2 text-[12px] font-semibold text-white transition-transform hover:bg-[#f3703c] active:scale-95 sm:flex-none dark:text-black"
              >
                <TbArrowUpRight size={16} /> Visit
              </button>
            </div>
          </div>

          {/* Info Grid */}
          <div className="flex flex-col gap-6 sm:gap-8 md:flex-row">
            <div className="group relative aspect-16/10 w-full cursor-crosshair overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 md:w-64 dark:border-[#2a2a2c] dark:bg-black">
              <img
                title="site preview"
                src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=400"
                className="h-full w-full object-cover opacity-60 grayscale transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/60 to-transparent p-4 sm:justify-center sm:from-transparent">
                <div
                  className={cn(
                    'mb-1 h-1 w-8 rounded-full transition-colors duration-500',
                    data.status === 'Ready'
                      ? 'bg-[#22c55e]'
                      : 'animate-pulse bg-amber-500',
                  )}
                />
                <div className="text-sm leading-tight font-bold text-white">
                  The Coordination
                  <br />
                  Layer On All Chains
                </div>
              </div>
            </div>

            <div className="grid flex-1 grid-cols-[85px_1fr] items-center gap-y-3 text-[11px] sm:grid-cols-[100px_1fr]">
              <span className="flex items-center gap-1.5 text-[12px] font-medium tracking-wider text-neutral-400 dark:text-[#555]">
                <HiMiniCalendar /> Env
              </span>
              <span className="ml-2 font-medium text-neutral-700 dark:text-white/70">
                {data.environment}
              </span>

              <span className="flex items-center gap-1.5 text-[12px] font-medium tracking-wider text-neutral-400 dark:text-[#555]">
                <TbCircleDashed /> Status
              </span>
              <div className="ml-2 flex items-center gap-2">
                <span
                  className={cn(
                    'flex items-center gap-2 rounded-full border px-2 py-0.5 font-bold transition-colors duration-300',
                    data.status === 'Ready'
                      ? 'border-[#16A821]/30 bg-green-50 text-[#16A821] dark:bg-[#162C19]'
                      : 'border-amber-500/30 bg-amber-50 text-amber-500 dark:bg-[#2C1F16]',
                  )}
                >
                  <div
                    className={cn(
                      'h-1.5 w-1.5 animate-pulse rounded-full',
                      data.status === 'Ready' ? 'bg-[#16A821]' : 'bg-amber-500',
                    )}
                  />
                  {data.status}
                </span>
              </div>

              <span className="flex items-center gap-1.5 text-[12px] font-medium tracking-wider text-neutral-400 dark:text-[#555]">
                <BsCalendar4Week /> Created
              </span>
              <span className="ml-2 flex flex-wrap items-center gap-1 text-neutral-500 dark:text-[#878787]">
                {data.createdTime} by
                <span className="rounded-full border border-neutral-300 bg-neutral-100 px-1.5 py-0.5 text-[9px] font-black text-nowrap text-neutral-600 uppercase dark:border-[#5C5C5C] dark:bg-[#1A1A1C] dark:text-[#5C5C5C]">
                  {data.createdBy.name}
                </span>
              </span>

              <span className="flex items-center gap-1.5 text-[12px] font-medium tracking-wider text-neutral-400 dark:text-[#555]">
                <LuClock /> Duration
              </span>
              <div className="ml-2 flex flex-wrap items-center gap-3">
                <span className="font-mono text-neutral-500 dark:text-[#878787]">
                  {data.duration}
                </span>
                <span className="rounded-full border border-neutral-300 bg-neutral-100 px-1.5 py-0.5 text-[9px] font-black text-neutral-600 uppercase dark:border-[#5C5C5C] dark:bg-[#1A1A1C] dark:text-[#5C5C5C]">
                  {data.lastActive}
                </span>
              </div>
            </div>
          </div>

          <div className="my-2 border-t-[1.6px] border-dashed border-neutral-200 dark:border-[#222]" />

          {/* Domain & Source Section  */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-start justify-between gap-2 sm:items-center">
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="w-14 shrink-0 font-bold text-neutral-400 uppercase dark:text-[#555]">
                  Domains
                </span>
                <div
                  className="flex cursor-pointer items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-neutral-600 transition-colors hover:bg-neutral-100 active:scale-95 dark:border-[#2a2a2c] dark:bg-[#161617] dark:text-[#999] dark:hover:bg-[#1f1f20]"
                  onClick={() =>
                    window.open(`https://${data.domains[0]}`, '_blank')
                  }
                >
                  <Globe size={12} /> {data.domains[0]}{' '}
                  <span className="text-neutral-300 dark:text-[#444]">+33</span>
                </div>
                <div className="hidden rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 font-mono text-neutral-400 sm:block dark:border-[#2a2a2c] dark:bg-[#161617] dark:text-[#444]">
                  main-as..8z
                </div>
              </div>
              <CheckCircle2
                size={16}
                className="mt-1 shrink-0 text-[#22c55e] sm:mt-0"
              />
            </div>

            <div className="flex items-start justify-between gap-2 sm:items-center">
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="w-14 shrink-0 font-bold text-neutral-400 uppercase dark:text-[#555]">
                  Source
                </span>
                <div className="flex cursor-pointer items-center gap-1.5 rounded border border-neutral-700 bg-neutral-900 px-2 py-0.5 text-[10px] font-bold text-white hover:opacity-80 active:scale-95 dark:border-[#2a2a2c] dark:bg-[#161617]">
                  <GitBranch size={12} /> {data.branch}
                </div>
                <div className="flex items-center gap-3 text-neutral-400 sm:ml-2 dark:text-[#555]">
                  <span className="flex items-center gap-1">
                    <GitCommit size={14} /> 388
                  </span>
                  <span className="flex items-center gap-1">
                    <Box size={14} /> 90
                  </span>
                  <span className="cursor-help font-black tracking-tighter">
                    ...
                  </span>
                </div>
              </div>
              <CheckCircle2
                size={16}
                className="mt-1 shrink-0 text-[#22c55e] sm:mt-0"
              />
            </div>
          </div>

          {/* Status List */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-neutral-900 dark:text-white">
              Deployment Status
            </h3>
            {data.steps.map((step) => (
              <div
                key={step.id}
                className="flex flex-col justify-between gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3 sm:flex-row sm:items-center sm:gap-0 sm:p-2 dark:border-[#1e1e1f] dark:bg-[#121213]"
              >
                <div className="flex w-full items-center justify-between sm:w-auto">
                  <span
                    className={cn(
                      'w-auto shrink-0 text-[12px] font-medium transition-colors sm:w-32',
                      step.status === 'loading'
                        ? 'text-neutral-900 dark:text-white'
                        : 'text-neutral-500 dark:text-[#999]',
                    )}
                  >
                    {step.label}
                  </span>
                  <div className="flex items-center gap-3 sm:hidden">
                    <span className="text-[11px] text-neutral-400 dark:text-[#555]">
                      {step.duration}
                    </span>
                    <CheckCircle2
                      size={16}
                      className={cn(
                        step.status === 'error'
                          ? 'text-red-500'
                          : step.status === 'success'
                            ? 'text-[#22c55e]'
                            : 'text-neutral-300 dark:text-neutral-700',
                      )}
                    />
                  </div>
                </div>

                <div className="flex w-full flex-1 items-center gap-4 sm:ml-1 sm:w-auto">
                  {step.metrics ? (
                    <div className="flex w-full gap-2 sm:w-auto">
                      <MetricTag label="F" value={step.metrics.files} />
                      <MetricTag label="S" value={step.metrics.size} />
                    </div>
                  ) : (
                    <div className="flex w-full items-center gap-3 sm:w-auto">
                      <SegmentedProgress
                        progress={step.progress}
                        status={step.status}
                      />
                      {step.id === 'build' && (
                        <button
                          onClick={() => handleRunSummary()}
                          className="ml-auto flex items-center gap-1 rounded-md border border-neutral-300 px-2 py-0.5 text-[9px] font-bold text-neutral-400 transition-colors hover:bg-white active:scale-95 sm:ml-0 dark:border-[#2a2a2c] dark:text-[#555] dark:hover:bg-black"
                        >
                          <Play size={8} fill="currentColor" />{' '}
                          <span className="xs:inline hidden">RUN SUMMARY</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="ml-4 hidden shrink-0 items-center gap-3 sm:flex">
                  <span className="text-[11px] text-neutral-400 dark:text-[#555]">
                    {step.duration}
                  </span>
                  <CheckCircle2
                    size={16}
                    className={cn(
                      step.status === 'error'
                        ? 'text-red-500'
                        : step.status === 'success'
                          ? 'text-[#22c55e]'
                          : step.status === 'loading'
                            ? 'animate-pulse text-amber-500'
                            : 'text-neutral-300 dark:text-[#333]',
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative flex flex-col items-center justify-between gap-4 border-t border-neutral-200 bg-neutral-50 px-4 py-4 sm:flex-row sm:px-6 dark:border-[#1F1F21] dark:bg-[#0D0D0E]">
          <div className="flex w-full justify-center gap-4 text-neutral-300 sm:w-auto sm:justify-start dark:text-[#444]">
            <MoreVertical
              size={16}
              className={cn(
                'cursor-pointer transition-colors hover:text-neutral-900 active:scale-90 dark:hover:text-white',
                activePopover === 'more' ? 'text-[#FA692E]' : '',
              )}
              onClick={() =>
                setActivePopover(activePopover === 'more' ? null : 'more')
              }
            />
            <Terminal
              size={15}
              className={cn(
                'cursor-pointer transition-colors hover:text-neutral-900 active:scale-90 dark:hover:text-white',
                activePopover === 'terminal' ? 'text-[#FA692E]' : '',
              )}
              onClick={() =>
                setActivePopover(
                  activePopover === 'terminal' ? null : 'terminal',
                )
              }
            />
            <Search
              size={15}
              className={cn(
                'cursor-pointer transition-colors hover:text-neutral-900 active:scale-90 dark:hover:text-white',
                activePopover === 'search' ? 'text-[#FA692E]' : '',
              )}
              onClick={() =>
                setActivePopover(activePopover === 'search' ? null : 'search')
              }
            />
          </div>

          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-5">
            {data.steps.some(
              (s) => s.status === 'error' || s.status === 'warning',
            ) && (
              <div className="flex items-center gap-1 text-center text-[9px] font-bold tracking-widest uppercase sm:text-left">
                <span className="text-red-500 underline decoration-red-500/30">
                  1
                </span>{' '}
                <span className="font-medium text-neutral-400 dark:text-white/40">
                  Error,{' '}
                </span>
                <span className="text-amber-500 underline decoration-amber-500/30">
                  {' '}
                  3
                </span>{' '}
                <span className="font-medium text-neutral-400 dark:text-white/40">
                  Warnings detected
                </span>
                <AlertCircle
                  size={10}
                  className="ml-1 animate-pulse text-red-500"
                />
              </div>
            )}
            <button
              onClick={handleInvestigate}
              disabled={isInvestigating}
              className={cn(
                'relative w-full overflow-hidden rounded-full border border-neutral-200 px-5 py-2 text-[11px] font-bold text-neutral-900 transition-all active:scale-95 disabled:opacity-70 sm:w-auto dark:border-[#222] dark:text-neutral-100',
                isInvestigating
                  ? 'bg-neutral-100 dark:bg-[#1A1A1B]'
                  : 'bg-white dark:bg-[#121213]',
              )}
            >
              <AnimatePresence mode="wait">
                {isInvestigating ? (
                  <motion.div
                    key="inv"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    exit={{ y: -20 }}
                    className="flex items-center gap-2"
                  >
                    <RotateCw size={12} className="animate-spin" /> Analyzing...
                  </motion.div>
                ) : (
                  <motion.span
                    key="invest"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    exit={{ y: -20 }}
                  >
                    Investigate
                  </motion.span>
                )}
              </AnimatePresence>
              {isInvestigating && (
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="bg-primary/5 absolute inset-0"
                />
              )}
            </button>
          </div>

          {/* Global Popover Container (Mobile-Optimized) */}
          <AnimatePresence>
            {activePopover === 'more' && (
              <motion.div
                ref={moreRef}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: -10 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-4 bottom-full left-4 z-50 mb-2 w-auto overflow-hidden rounded-2xl border border-neutral-200 bg-white p-1 shadow-2xl sm:right-auto sm:left-6 sm:w-48 dark:border-[#222] dark:bg-[#121213]"
              >
                {[
                  {
                    icon: Copy,
                    label: 'Copy Deployment ID',
                    action: () => {
                      /* no-op */
                    },
                  },
                  {
                    icon: History,
                    label: 'View History',
                    action: () => {
                      /* no-op */
                    },
                  },
                  {
                    icon: ShieldCheck,
                    label: 'Security Audit',
                    action: () => {
                      /* no-op */
                    },
                  },
                  {
                    icon: Settings,
                    label: 'Configure',
                    action: () => {
                      /* no-op */
                    },
                  },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      item.action();
                      setActivePopover(null);
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[11px] text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/5 dark:hover:text-neutral-100"
                  >
                    <item.icon size={13} /> {item.label}
                  </button>
                ))}
              </motion.div>
            )}

            {activePopover === 'terminal' && (
              <motion.div
                ref={terminalRef}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: -10 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-4 bottom-full left-4 z-50 mb-2 w-auto overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl transition-colors duration-300 sm:right-auto sm:left-6 sm:w-80 dark:border-white/10 dark:bg-[#0D0D0E]"
              >
                <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50/50 px-3 py-2 dark:border-white/5 dark:bg-white/5">
                  <span className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
                    <Play
                      size={10}
                      className="fill-[#FA692E]/10 text-[#FA692E]"
                    />{' '}
                    Live Build Logs
                  </span>
                  <div className="flex gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                    <div className="h-1.5 w-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                    <div className="h-1.5 w-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                  </div>
                </div>
                <div className="no-scrollbar h-44 space-y-2 overflow-y-auto p-3 font-mono text-[10px]">
                  <p className="text-neutral-400 dark:text-neutral-600">
                    [{new Date().toLocaleTimeString()}] Fetching deployment
                    metadata...
                  </p>
                  <p className="font-medium text-[#16A821] dark:text-green-400">
                    ✔ Repository initialized
                  </p>
                  <p className="font-medium text-[#16A821] dark:text-green-400">
                    ✔ Environment variables decrypted
                  </p>
                  <p className="text-neutral-400 dark:text-neutral-600">
                    [{new Date().toLocaleTimeString()}] Running build script...
                  </p>
                  <p className="animate-pulse text-neutral-700 italic dark:text-neutral-300">
                    Building optimized production bundle...
                  </p>
                  <p className="rounded-sm bg-amber-500/10 px-1 text-amber-600 dark:text-amber-400">
                    Warning: Large assets detected in /public
                  </p>
                  <p className="font-medium text-[#16A821] dark:text-green-400">
                    ✔ Static components pre-rendered
                  </p>
                  <p className="font-bold text-[#FA692E]">
                    Ready for deployment at axiom.xyz
                  </p>
                </div>
              </motion.div>
            )}

            {activePopover === 'search' && (
              <motion.div
                ref={searchRef}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: -10 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-4 bottom-full left-4 z-50 mb-2 flex w-auto items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-2 shadow-2xl sm:right-auto sm:left-24 sm:w-64 dark:border-[#222] dark:bg-[#121213]"
              >
                <div className="p-2 text-neutral-400 dark:text-[#555]">
                  <Search size={14} />
                </div>
                <input
                  type="text"
                  autoFocus
                  placeholder="Search deployment context..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-none bg-transparent pr-4 text-[11px] text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-white"
                  onKeyDown={(e) => e.key === 'Enter' && setActivePopover(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};