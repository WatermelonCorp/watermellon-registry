"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Maximize2, X, Globe, GitBranch, GitCommit, Play, 
  CheckCircle2, MoreVertical, Terminal, Search, Box, RotateCw 
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
        let color = 'bg-neutral-200 dark:bg-[#1e1e1f]'; 
        if (isActive) {
          color = status === 'error' ? 'bg-red-500' : status === 'warning' ? 'bg-amber-500' : 'bg-[#22c55e]';
        }
        return <div key={i} className={cn("w-1 h-2.5 rounded-[1px] transition-colors duration-150", color)} />;
      })}
    </div>
  );
};

const MetricTag = ({ label, value }: { label: string, value: string | number }) => (
  <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-[#161617] border border-neutral-200 dark:border-[#2a2a2c] px-2 py-0.5 rounded-md">
    <span className="text-neutral-400 dark:text-[#555] font-black text-[9px] uppercase border border-neutral-300 dark:border-[#333] w-3.5 h-3.5 flex items-center justify-center rounded-xs">{label}</span>
    <span className="text-neutral-600 dark:text-[#999] font-bold text-[10px]">{value}</span>
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[95%] sm:max-w-140 mx-auto bg-gray-50 dark:bg-[#0F0F10] rounded-3xl border border-neutral-200 dark:border-[#1F1F21] overflow-hidden shadow-xl font-sans antialiased"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 sm:px-5 py-3 border-b border-neutral-100 dark:border-[#1e1e1f]">
        <span className="text-neutral-400 dark:text-[#888] text-[11px] font-bold tracking-tight uppercase">Deployment Card</span>
        <div className="flex items-center gap-3 text-neutral-300 dark:text-[#555]">
          <RotateCw size={13} onClick={resetSimulation} className="hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors"/>
          <Maximize2 size={13} className="hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors" />
          <X size={14} className="hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Title Area */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <h1 className="text-neutral-900 dark:text-white text-3xl font-medium tracking-tight break-all">{data.id}</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            {/* Functional: Share Button */}
            <button 
              onClick={handleShare}
              className="flex-1 sm:flex-none justify-center p-1.5 gap-2 px-3 text-[12px] rounded-full flex items-center border border-neutral-200 dark:border-[#2a2a2c] text-neutral-500 dark:text-[#888] hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white transition-all"
            >
              {isCopied ? <PiCheckBold size={16} className="text-green-500"/> : <PiShareFatLight size={16} />}
              {isCopied ? "Copied" : "Share"}
            </button>
            <button 
              onClick={handleVisit}
              className="flex-1 sm:flex-none justify-center flex items-center p-1.5 gap-1 px-3 text-[12px] rounded-full bg-[#FA692E] hover:bg-[#f3703c] text-white dark:text-black font-semibold transition-transform active:scale-95"
            >
              <TbArrowUpRight size={16} /> Visit
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
          <div className="relative w-full md:w-64 aspect-16/10 rounded-xl border border-neutral-200 dark:border-[#2a2a2c] overflow-hidden bg-neutral-100 dark:bg-black group">
            <img title='site preview' src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=400" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute inset-0 p-4 flex flex-col justify-end sm:justify-center bg-linear-to-t from-black/60 to-transparent sm:from-transparent">
               <div className={cn("w-8 h-1 mb-1 rounded-full transition-colors duration-500", data.status === 'Ready' ? 'bg-[#22c55e]' : 'bg-amber-500 animate-pulse')} />
               <div className="text-white font-bold text-sm leading-tight">The Coordination<br/>Layer On All Chains</div>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-[85px_1fr] sm:grid-cols-[100px_1fr] gap-y-3 text-[11px] items-center">
            <span className="text-neutral-400 dark:text-[#555] text-[12px] font-medium tracking-wider flex items-center gap-1.5"><HiMiniCalendar/> Env</span>
            <span className="text-neutral-700 dark:text-white/70 font-medium ml-2">{data.environment}</span>
            
            <span className="text-neutral-400 dark:text-[#555] text-[12px] font-medium tracking-wider flex items-center gap-1.5"><TbCircleDashed/> Status</span>
            <div className="flex items-center gap-2 ml-2">
              {/* Dynamic Status Display */}
              <span className={cn(
                "font-bold px-2 py-0.5 rounded-full flex items-center gap-2 border transition-colors duration-300",
                data.status === 'Ready' 
                  ? "text-[#16A821] bg-green-50 dark:bg-[#162C19] border-[#16A821]/30" 
                  : "text-amber-500 bg-amber-50 dark:bg-[#2C1F16] border-amber-500/30"
              )}>
                <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", data.status === 'Ready' ? "bg-[#16A821]" : "bg-amber-500")} />
                {data.status}
              </span>
            </div>

            <span className="text-neutral-400 dark:text-[#555] text-[12px] font-medium tracking-wider flex items-center gap-1.5"><BsCalendar4Week/> Created</span>
            <span className="text-neutral-500 dark:text-[#878787] ml-2 flex flex-wrap items-center gap-1">
              {data.createdTime} by 
              <span className="bg-neutral-100 dark:bg-[#1A1A1C] px-1.5 py-0.5 border-neutral-300 dark:border-[#5C5C5C] border rounded-full text-[9px] text-neutral-600 dark:text-[#5C5C5C] font-black text-nowrap uppercase">{data.createdBy.name}</span>
            </span>

            <span className="text-neutral-400 dark:text-[#555] text-[12px] font-medium tracking-wider flex items-center gap-1.5"><LuClock/> Duration</span>
            <div className="flex flex-wrap items-center gap-3 ml-2">
              {/* Dynamic Duration */}
              <span className="text-neutral-500 dark:text-[#878787] font-mono">{data.duration}</span>
              <span className="bg-neutral-100 dark:bg-[#1A1A1C] px-1.5 py-0.5 border-neutral-300 dark:border-[#5C5C5C] border rounded-full text-[9px] text-neutral-600 dark:text-[#5C5C5C] font-black uppercase">{data.lastActive}</span>
            </div>
          </div>
        </div>

        <div className="border-t-[1.6px] border-dashed border-neutral-200 dark:border-[#222] my-2" />

        {/* Domain & Source Section  */}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-start sm:items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              <span className="text-neutral-400 dark:text-[#555] font-bold uppercase w-14 shrink-0">Domains</span>
              <div className="flex items-center gap-2 px-3 py-1 bg-neutral-50 dark:bg-[#161617] border border-neutral-200 dark:border-[#2a2a2c] rounded-full text-neutral-600 dark:text-[#999] hover:bg-neutral-100 dark:hover:bg-[#1f1f20] cursor-pointer transition-colors" onClick={() => window.open(`https://${data.domains[0]}`, '_blank')}>
                <Globe size={12} /> {data.domains[0]} <span className="text-neutral-300 dark:text-[#444]">+33</span>
              </div>
              <div className="hidden sm:block px-3 py-1 bg-neutral-50 dark:bg-[#161617] border border-neutral-200 dark:border-[#2a2a2c] rounded-full text-neutral-400 dark:text-[#444] font-mono">main-as..8z</div>
            </div>
            <CheckCircle2 size={16} className="text-[#22c55e] shrink-0 mt-1 sm:mt-0" />
          </div>

          <div className="flex items-start sm:items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              <span className="text-neutral-400 dark:text-[#555] font-bold uppercase w-14 shrink-0">Source</span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-neutral-900 dark:bg-[#161617] border border-neutral-700 dark:border-[#2a2a2c] rounded text-white font-bold text-[10px]">
                <GitBranch size={12} /> {data.branch}
              </div>
              <div className="flex items-center gap-3 sm:ml-2 text-neutral-400 dark:text-[#555]">
                <span className="flex items-center gap-1"><GitCommit size={14} /> 388</span>
                <span className="flex items-center gap-1"><Box size={14} /> 90</span>
                <span className="font-black tracking-tighter">...</span>
              </div>
            </div>
            <CheckCircle2 size={16} className="text-[#22c55e] shrink-0 mt-1 sm:mt-0" />
          </div>
        </div>

        {/* Status List */}
        <div className="space-y-3">
          <h3 className="text-neutral-900 dark:text-white text-sm font-medium">Deployment Status</h3>
          {data.steps.map((step) => (
            <div key={step.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-2 bg-neutral-50 dark:bg-[#121213] border border-neutral-200 dark:border-[#1e1e1f] rounded-xl gap-3 sm:gap-0">
              
              <div className="flex justify-between items-center w-full sm:w-auto">
                <span className={cn("text-[12px] font-medium w-auto sm:w-32 shrink-0 transition-colors", step.status === 'loading' ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-[#999]')}>{step.label}</span>
                <div className="flex sm:hidden items-center gap-3">
                    <span className="text-neutral-400 dark:text-[#555] text-[11px]">{step.duration}</span>
                    <CheckCircle2 size={16} className={cn(step.status === 'error' ? 'text-red-500' : step.status === 'success' ? 'text-[#22c55e]' : 'text-neutral-300 dark:text-neutral-700')} />
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
                        className="text-[9px] font-bold text-neutral-400 dark:text-[#555] border border-neutral-300 dark:border-[#2a2a2c] px-2 py-0.5 rounded-md flex items-center gap-1 hover:bg-white dark:hover:bg-black transition-colors ml-auto sm:ml-0"
                      >
                        <Play size={8} fill="currentColor"/> <span className="hidden xs:inline">RUN SUMMARY</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              <div className="hidden sm:flex items-center gap-3 shrink-0 ml-4">
                <span className="text-neutral-400 dark:text-[#555] text-[11px]">{step.duration}</span>
                <CheckCircle2 size={16} className={cn(
                  step.status === 'error' ? 'text-red-500' : 
                  step.status === 'success' ? 'text-[#22c55e]' : 
                  step.status === 'loading' ? 'text-amber-500 animate-pulse' :
                  'text-neutral-300 dark:text-[#333]'
                )} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-neutral-50 dark:bg-[#0D0D0E] px-4 sm:px-6 py-4 border-t border-neutral-200 dark:border-[#1F1F21] flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-4 text-neutral-300 dark:text-[#444] w-full sm:w-auto justify-center sm:justify-start">
          <MoreVertical size={16} className="hover:text-neutral-900 dark:hover:text-white cursor-pointer" />
          <Terminal size={16} className="hover:text-neutral-900 dark:hover:text-white cursor-pointer" />
          <Search size={16} className="hover:text-neutral-900 dark:hover:text-white cursor-pointer" />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto">
          {(data.steps.some(s => s.status === 'error' || s.status === 'warning')) && (
            <div className="text-[9px] font-bold tracking-widest uppercase text-center sm:text-left">
              <span className="text-red-500 underline decoration-red-500/30">1</span> <span className='text-neutral-400 dark:text-white/40 font-medium'>Error, </span>
              <span className="text-amber-500 underline decoration-amber-500/30"> 3</span> <span className='text-neutral-400 dark:text-white/40 font-medium'>Warnings detected</span>
            </div>
          )}
          <button
            className="w-full sm:w-auto px-4 py-1.5 rounded-full border border-neutral-900 dark:border-[#2a2a2c] bg-neutral-900 dark:bg-transparent text-white text-[11px] font-medium hover:bg-neutral-800 dark:hover:bg-[#161617] transition-all"
          >
            Investigate
          </button>
        </div>
      </div>
    </motion.div>
  );
};