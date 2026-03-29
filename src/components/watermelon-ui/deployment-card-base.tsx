"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Maximize2, X, Globe, GitBranch, GitCommit, Play, 
  CheckCircle2, MoreVertical, Terminal, Search, Box, RotateCw,
  Copy, History, Settings, ShieldCheck, AlertCircle
} from 'lucide-react';
import { PiShareFatLight, PiCheckBold } from 'react-icons/pi'; 
import { LuClock } from 'react-icons/lu';
import { TbArrowUpRight, TbCircleDashed } from 'react-icons/tb';
import { BsCalendar4Week } from 'react-icons/bs';
import { HiMiniCalendar } from 'react-icons/hi2';
import { cn } from "@/lib/utils";

// --- Interfaces  ---
export interface DeploymentStep {
  id: string;
  label: string;
  status: 'success' | 'warning' | 'error' | 'loading' | 'pending';
  progress: number;
  duration: string;
  metrics?: { files: number; functions: number; assets: number; size: string; };
  errors?: number;
  warnings?: number;
}

export interface DeploymentData {
  id: string;
  environment: string;
  status: 'Ready' | 'Building' | 'Error';
  createdTime: string;
  createdBy: { name: string; avatar: string; };
  duration: string;
  lastActive: string;
  domains: string[];
  branch: string;
  commitMessage: string;
  commitHash: string;
  steps: DeploymentStep[];
}

// --- Components ---

const SegmentedProgress = ({ progress, status, count = 22 }: { progress: number, status: string, count?: number }) => {
  const activeSegments = Math.floor(progress * count);
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i < activeSegments;
        let color = 'bg-muted/80'; 
        if (isActive) {
          color = status === 'error' ? 'bg-destructive' : status === 'warning' ? 'bg-chart-1' : 'bg-primary';
        }
        return <div key={i} className={cn("w-1 h-2.5 rounded-[1px] transition-colors duration-150", color)} />;
      })}
    </div>
  );
};

const MetricTag = ({ label, value }: { label: string, value: string | number }) => (
  <div className="flex items-center gap-2 bg-muted/60 border border-border px-2 py-1 rounded-md">
    <span className="text-muted-foreground font-black text-[9px] uppercase border border-border w-4 h-4 flex items-center justify-center rounded-sm">{label}</span>
    <span className="text-foreground font-bold text-[10px]">{value}</span>
  </div>
);

// --- Helper ---
const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
};

export const DeploymentCard: React.FC<{ data: DeploymentData }> = ({ data: initialData }) => {

  const [data, setData] = useState(initialData);
  const [isCopied, setIsCopied] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0); 
  const [activePopover, setActivePopover] = useState<'more' | 'terminal' | 'search' | null>(null);
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const moreRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideMore = moreRef.current && !moreRef.current.contains(event.target as Node);
      const isOutsideTerminal = terminalRef.current && !terminalRef.current.contains(event.target as Node);
      const isOutsideSearch = searchRef.current && !searchRef.current.contains(event.target as Node);

      if (isOutsideMore && isOutsideTerminal && isOutsideSearch) {
        setActivePopover(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (data.status !== 'Building') return;

    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);

      setData(prevData => {
        const newSteps = [...prevData.steps];
        const activeStepIndex = newSteps.findIndex(s => s.status === 'loading' || (s.status === 'pending' && !s.metrics));

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

          const allDone = newSteps.every(s => s.status === 'success' || s.metrics);
          
          return {
            ...prevData,
            steps: newSteps,
            duration: formatDuration(elapsedSeconds),
            status: allDone ? 'Ready' : 'Building'
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
      setData(prev => ({
        ...prev,
        steps: prev.steps.map(s => ({ ...s, status: s.status === 'error' ? 'success' : s.status }))
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
        className="theme-injected w-full sm:max-w-140 mx-auto bg-card rounded-xl border border-border overflow-hidden shadow-lg font-sans antialiased"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 sm:px-5 py-3 border-b border-border">
          <span className="text-muted-foreground text-[11px] font-bold tracking-tight uppercase">Deployment Card</span>
          <div className="flex items-center gap-3 text-muted-foreground">
            <RotateCw size={13} onClick={resetSimulation} className="hover:text-foreground cursor-pointer transition-colors active:rotate-180 duration-500"/>
            <Maximize2 size={13} className="hover:text-foreground cursor-pointer transition-colors" />
            <X size={14} className="hover:text-foreground cursor-pointer transition-colors" />
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Title Area */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <h1 className="text-foreground text-3xl font-medium tracking-tight break-all">{data.id}</h1>
            <div className="flex gap-2 w-full sm:w-auto">
              {/* Functional: Share Button */}
              <button 
                onClick={handleShare}
                className="flex-1 sm:flex-none justify-center py-2 gap-2 px-3 text-[12px] rounded-md flex items-center border border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all active:scale-95"
              >
                {isCopied ? <PiCheckBold size={16} className="text-primary"/> : <PiShareFatLight size={16} />}
                {isCopied ? "Copied" : "Share"}
              </button>
              <button 
                onClick={handleVisit}
                className="flex-1 sm:flex-none justify-center flex items-center py-2 gap-1 px-3 text-[12px] rounded-md bg-primary hover:opacity-90 text-primary-foreground font-semibold transition-transform active:scale-95"
              >
                <TbArrowUpRight size={16} /> Visit
              </button>
            </div>
          </div>

          {/* Info Grid */}
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
            <div className="relative w-full md:w-64 aspect-16/10 rounded-lg border border-border overflow-hidden bg-muted group cursor-crosshair">
              <img title='site preview' src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=400" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 p-4 flex flex-col justify-end sm:justify-center bg-linear-to-t from-black/60 to-transparent sm:from-transparent">
                 <div className={cn("w-8 h-1 mb-1 rounded-md transition-colors duration-500", data.status === 'Ready' ? 'bg-primary' : 'bg-chart-1 animate-pulse')} />
                 <div className="text-white font-bold text-sm leading-tight">The Coordination<br/>Layer On All Chains</div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-3 text-[11px] items-center">
              <span className="text-muted-foreground text-[12px] font-medium tracking-wider flex items-center gap-2"><HiMiniCalendar/> Env</span>
              <span className="text-foreground font-medium ml-2">{data.environment}</span>
              
              <span className="text-muted-foreground text-[12px] font-medium tracking-wider flex items-center gap-2"><TbCircleDashed/> Status</span>
              <div className="flex items-center gap-2 ml-2">
                {/* Dynamic Status Display */}
                <span className={cn(
                  "font-bold px-2 py-1 rounded-md flex items-center gap-2 border transition-colors duration-300",
                  data.status === 'Ready' 
                    ? "text-primary bg-primary/10 border-primary/30" 
                    : "text-chart-1 bg-chart-1/10 border-chart-1/30"
                )}>
                  <div className={cn("w-2 h-2 rounded-full animate-pulse", data.status === 'Ready' ? "bg-primary" : "bg-chart-1")} />
                  {data.status}
                </span>
              </div>

              <span className="text-muted-foreground text-[12px] font-medium tracking-wider flex items-center gap-2"><BsCalendar4Week/> Created</span>
              <span className="text-muted-foreground ml-2 flex flex-wrap items-center gap-1">
                {data.createdTime} by 
                <span className="bg-muted px-2 py-1 border-border border rounded-md text-[9px] text-muted-foreground font-black text-nowrap uppercase">{data.createdBy.name}</span>
              </span>

              <span className="text-muted-foreground text-[12px] font-medium tracking-wider flex items-center gap-2"><LuClock/> Duration</span>
              <div className="flex flex-wrap items-center gap-3 ml-2">
                {/* Dynamic Duration */}
                <span className="text-muted-foreground font-mono">{data.duration}</span>
                <span className="bg-muted px-2 py-1 border-border border rounded-md text-[9px] text-muted-foreground font-black uppercase">{data.lastActive}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-dashed border-border my-2" />

          {/* Domain & Source Section  */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-start sm:items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="text-muted-foreground font-bold uppercase w-14 shrink-0">Domains</span>
                <div className="flex items-center gap-2 px-3 py-1 bg-muted/40 border border-border rounded-md text-foreground hover:bg-accent cursor-pointer transition-colors active:scale-95" onClick={() => window.open(`https://${data.domains[0]}`, '_blank')}>
                  <Globe size={12} /> {data.domains[0]} <span className="text-muted-foreground">+33</span>
                </div>
                <div className="hidden sm:block px-3 py-1 bg-muted/40 border border-border rounded-md text-muted-foreground font-mono">main-as..8z</div>
              </div>
              <CheckCircle2 size={16} className="text-primary shrink-0 mt-1 sm:mt-0" />
            </div>

            <div className="flex items-start sm:items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="text-muted-foreground font-bold uppercase w-14 shrink-0">Source</span>
                <div className="flex items-center gap-2 px-2 py-1 bg-foreground border border-border rounded-md text-background font-bold text-[10px] cursor-pointer hover:opacity-80 active:scale-95">
                  <GitBranch size={12} /> {data.branch}
                </div>
                <div className="flex items-center gap-3 sm:ml-2 text-muted-foreground">
                  <span className="flex items-center gap-1"><GitCommit size={14} /> 388</span>
                  <span className="flex items-center gap-1"><Box size={14} /> 90</span>
                  <span className="font-black tracking-tighter cursor-help">...</span>
                </div>
              </div>
              <CheckCircle2 size={16} className="text-primary shrink-0 mt-1 sm:mt-0" />
            </div>
          </div>

          {/* Status List */}
          <div className="space-y-3">
            <h3 className="text-foreground text-sm font-medium">Deployment Status</h3>
            {data.steps.map((step) => (
              <div key={step.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-2 bg-muted/40 border border-border rounded-lg gap-3 sm:gap-0">
                
                <div className="flex justify-between items-center w-full sm:w-auto">
                  <span className={cn("text-[12px] font-medium w-auto sm:w-32 shrink-0 transition-colors", step.status === 'loading' ? 'text-foreground' : 'text-muted-foreground')}>{step.label}</span>
                  <div className="flex sm:hidden items-center gap-3">
                      <span className="text-muted-foreground text-[11px]">{step.duration}</span>
                      <CheckCircle2 size={16} className={cn(step.status === 'error' ? 'text-destructive' : step.status === 'success' ? 'text-primary' : 'text-muted-foreground')} />
                  </div>
                </div>

                <div className="flex-1 flex items-center gap-4 sm:ml-1 w-full sm:w-auto">
                  {step.metrics ? (
                    <div className="flex gap-2 w-full sm:w-auto">
                      <MetricTag label="F" value={step.metrics.files} />
                      <MetricTag label="S" value={step.metrics.size} />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <SegmentedProgress progress={step.progress} status={step.status} />
                      {step.id === 'build' && (
                        <button 
                          onClick={() => handleRunSummary()}
                          className="text-[9px] font-bold text-muted-foreground border border-border px-2 py-1 rounded-md flex items-center gap-1 hover:bg-accent transition-colors ml-auto sm:ml-0 active:scale-95"
                        >
                          <Play size={8} fill="currentColor"/> <span className="hidden xs:inline">RUN SUMMARY</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="hidden sm:flex items-center gap-3 shrink-0 ml-4">
                  <span className="text-muted-foreground text-[11px]">{step.duration}</span>
                  <CheckCircle2 size={16} className={cn(
                    step.status === 'error' ? 'text-destructive' : 
                    step.status === 'success' ? 'text-primary' : 
                    step.status === 'loading' ? 'text-chart-1 animate-pulse' :
                    'text-muted-foreground'
                  )} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-muted/40 px-4 sm:px-6 py-4 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 relative">
          <div className="flex gap-4 text-muted-foreground w-full sm:w-auto justify-center sm:justify-start">
            <MoreVertical 
              size={16} 
              className={cn("hover:text-foreground cursor-pointer transition-colors active:scale-90", activePopover === 'more' ? "text-primary" : "")} 
              onClick={() => setActivePopover(activePopover === 'more' ? null : 'more')}
            />
            <Terminal 
              size={15} 
              className={cn("hover:text-foreground cursor-pointer transition-colors active:scale-90", activePopover === 'terminal' ? "text-primary" : "")} 
              onClick={() => setActivePopover(activePopover === 'terminal' ? null : 'terminal')}
            />
            <Search 
              size={15} 
              className={cn("hover:text-foreground cursor-pointer transition-colors active:scale-90", activePopover === 'search' ? "text-primary" : "")} 
              onClick={() => setActivePopover(activePopover === 'search' ? null : 'search')}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto">
            {(data.steps.some(s => s.status === 'error' || s.status === 'warning')) && (
              <div className="text-[9px] font-bold tracking-widest uppercase text-center sm:text-left flex items-center gap-1">
                <span className="text-destructive underline decoration-destructive/30">1</span>
                <span className="text-muted-foreground font-medium"> Error, </span>
                <span className="text-chart-1 underline decoration-chart-1/30">3</span>
                <span className="text-muted-foreground font-medium"> Warnings detected</span>
                <AlertCircle size={10} className="text-destructive animate-pulse ml-1" />
              </div>
            )}
            <button
              onClick={handleInvestigate}
              disabled={isInvestigating}
              className={cn(
                "w-full sm:w-auto px-4 py-2 rounded-md border border-border text-background text-[11px] font-medium transition-all relative overflow-hidden active:scale-95 disabled:opacity-70",
                isInvestigating ? "bg-muted-foreground" : "bg-foreground"
              )}
            >
              <AnimatePresence mode="wait">
                {isInvestigating ? (
                  <motion.div key="inv" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }} className="flex items-center gap-2">
                    <RotateCw size={12} className="animate-spin" /> Analyzing...
                  </motion.div>
                ) : (
                  <motion.span key="invest" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }}>
                    Investigate
                  </motion.span>
                )}
              </AnimatePresence>
              {isInvestigating && (
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="absolute inset-0 bg-white/10"
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
                className="absolute bottom-full left-4 right-4 sm:left-6 sm:right-auto mb-2 w-auto sm:w-48 bg-card border border-border rounded-xl shadow-2xl p-1 z-50 overflow-hidden"
              >
                {[
                  { icon: Copy, label: "Copy Deployment ID", action: () => { /* no-op */ } },
                  { icon: History, label: "View History", action: () => { /* no-op */ } },
                  { icon: ShieldCheck, label: "Security Audit", action: () => { /* no-op */ } },
                  { icon: Settings, label: "Configure", action: () => { /* no-op */ } },
                ].map((item, i) => (
                  <button 
                    key={i}
                    onClick={() => { item.action(); setActivePopover(null); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[11px] text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                  >
                    <item.icon size={12} /> {item.label}
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
                className="absolute bottom-full left-4 right-4 sm:left-6 sm:right-auto mb-2 w-auto sm:w-80 bg-white dark:bg-[#0D0D0E] border border-border dark:border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden transition-colors duration-300"
              >
                <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/30 dark:bg-white/5">
                   <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                     <Play size={10} className="text-primary fill-primary/20"/> Live Build Logs
                   </span>
                   <div className="flex gap-1.5">
                     <div className="w-1.5 h-1.5 rounded-full bg-border dark:bg-white/10" />
                     <div className="w-1.5 h-1.5 rounded-full bg-border dark:bg-white/10" />
                     <div className="w-1.5 h-1.5 rounded-full bg-border dark:bg-white/10" />
                   </div>
                </div>
                <div className="p-3 font-mono text-[10px] space-y-2 h-44 overflow-y-auto no-scrollbar">
                   <p className="text-muted-foreground/60">[{new Date().toLocaleTimeString()}] Fetching deployment metadata...</p>
                   <p className="text-emerald-600 dark:text-emerald-400 font-medium">✔ Repository initialized</p>
                   <p className="text-emerald-600 dark:text-emerald-400 font-medium">✔ Environment variables decrypted</p>
                   <p className="text-muted-foreground/60">[{new Date().toLocaleTimeString()}] Running build script...</p>
                   <p className="text-foreground/80 italic animate-pulse">Building optimized production bundle...</p>
                   <p className="text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1 rounded-sm">Warning: Large assets detected in /public</p>
                   <p className="text-emerald-600 dark:text-emerald-400 font-medium">✔ Static components pre-rendered</p>
                   <p className="text-primary font-bold">Ready for deployment at axiom.xyz</p>
                </div>
              </motion.div>
            )}

            {activePopover === 'search' && (
              <motion.div 
                ref={searchRef}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: -10 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full left-4 right-4 sm:left-24 sm:right-auto mb-2 w-auto sm:w-64 bg-card border border-border rounded-xl shadow-2xl p-2 z-50 flex items-center gap-2"
              >
                <div className="p-1 text-muted-foreground"><Search size={14}/></div>
                <input 
                  type="text"
                  autoFocus
                  placeholder="Search deployment context..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-[11px] text-foreground placeholder:text-muted-foreground flex-1 pr-4"
                  onKeyDown={(e) => e.key === 'Enter' && (setActivePopover(null))}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};