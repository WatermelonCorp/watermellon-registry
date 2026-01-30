import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  Sun,
  Moon
} from 'lucide-react';
import { PiShareFatLight } from 'react-icons/pi';
import { LuClock } from 'react-icons/lu';
import { TbArrowUpRight, TbCircleDashed } from 'react-icons/tb';
import { BsCalendar4Week } from 'react-icons/bs';
import { HiMiniCalendar } from 'react-icons/hi2';

export interface DeploymentStep {
  id: string;
  label: string;
  status: 'success' | 'warning' | 'error' | 'loading';
  progress: number;
  duration: string;
  metrics?: {
    files: number;
    functions: number;
    assets: number;
    size: string;
  };
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

const SegmentedProgress = ({ progress, status, count = 22 }: { progress: number, status: string, count?: number }) => {
  const activeSegments = Math.floor(progress * count);
  return (
    <div className="flex gap-[2px]">
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i < activeSegments;
        let color = 'bg-[#1e1e1f]'; 
        if (isActive) {
          color = status === 'error' ? 'bg-red-500' : status === 'warning' ? 'bg-amber-500' : 'bg-[#22c55e]';
        }
        return <div key={i} className={`w-[4px] h-[10px] rounded-[1px] ${color}`} />;
      })}
    </div>
  );
};

const MetricTag = ({ label, value }: { label: string, value: string | number }) => (
  <div className="flex items-center gap-1.5 bg-[#161617] border border-[#2a2a2c] px-2 py-0.5 rounded-md">
    <span className="text-[#555] font-black text-[9px] uppercase border border-[#333] w-3.5 h-3.5 flex items-center justify-center rounded-[2px]">{label}</span>
    <span className="text-[#999] font-bold text-[10px]">{value}</span>
  </div>
);

export const DeploymentCard: React.FC<{ data: DeploymentData }> = ({ data }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  return (
   <div 
     className="min-h-screen flex flex-col items-center py-20 px-4 transition-colors duration-500 relative"
     style={{ backgroundColor: theme === 'dark' ? '#070707' : '#f0f0f1' }}
   >
     {/* Theme Toggle Button */}
     <button 
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={`absolute top-10 right-10 p-2.5 rounded-xl border transition-all duration-300 z-50 ${
            theme === 'dark' ? 'bg-[#0F0F10] border-[#1F1F21] text-yellow-500' : 'bg-white border-gray-200 text-slate-800 shadow-lg'
        }`}
     >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
     </button>

    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
       style={{
          filter: theme === 'light' ? 'invert(0.94) hue-rotate(180deg)' : 'none'
                }}
      className="w-full max-w-[560px] mx-auto bg-[#0F0F10] rounded-[24px] border border-[#1F1F21] overflow-hidden shadow-2xl font-sans antialiased transition-all duration-500"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-3 border-b border-[#1e1e1f]">
        <span className="text-[#888] text-[11px] font-bold tracking-tight">Deployment Card</span>
        <div className="flex items-center gap-3 text-[#555]">
          <Maximize2 size={13} className="hover:text-white cursor-pointer" />
          <X size={14} className="hover:text-white cursor-pointer" />
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Title Area */}
        <div className="flex justify-between items-center ">
          <h1 className="text-white text-3xl font-medium tracking-tight">{data.id}</h1>
          <div className="flex gap-2 justify-center items-center">
            <button title='share' className="p-1.5 gap-2 px-3 text-[12px] rounded-full flex justify-center items-center border border-[#2a2a2c] text-[#888] hover:text-white transition-colors"><PiShareFatLight size={16} />Share</button>
            <button className="flex items-center justify-center p-1.5 gap-1 px-3 text-[12px] rounded-full bg-[#FA692E] hover:bg-[#f3703c] text-black font-medium text-center  transition-transform">
              <TbArrowUpRight size={16} /> Visit
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="flex gap-8">
          <div className="relative w-64 aspect-[16/10] rounded-xl border border-[#2a2a2c] overflow-hidden bg-black group">
            <img title='project' src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=400" className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500" />
            <div className="absolute inset-0 p-4 flex flex-col justify-center">
               <div className="w-8 h-1 bg-[#22c55e] mb-1 rounded-full" />
               <div className="text-white font-bold text-sm leading-tight">The Coordination<br/>Layer On All Chains</div>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-[90px_1fr] gap-y-3 text-[11px] items-center">
          
             <span className="text-[#555] text-[12px] w-[100px] gap-2 font-medium captalize tracking-wider flex items-center"><HiMiniCalendar/> Environment</span>
            <span className="text-white/70 font-normal ml-6">{data.environment}</span>
           
            
            <span className="text-[#555] text-[12px] font-medium captalize tracking-wider flex items-center gap-1.5"><TbCircleDashed/> Status</span>
            <div className="flex items-center gap-2">
              <span className="text-[#16A821] font-bold px-2 py-0.5 rounded-full flex items-center justify-between gap-2 bg-[#162C19] border border-[#16A821]/40">
              <div className="w-1.5 h-1.5 rounded-full bg-[#16A821] animate-pulse" />
              Ready
              </span>
            </div>

           <span className="text-[#555] text-[12px] font-medium captalize tracking-wider flex items-center gap-1.5"><BsCalendar4Week/> Created</span>
            <span className="text-[#878787]">{data.createdTime} by 
                <span className="bg-[#1A1A1C] ml-2.5 px-1.5 py-0.5 border-[#5C5C5C] border rounded-full text-[9px] text-[#5C5C5C] font-bold">{data.createdBy.name}
                </span>
                </span>

            <span className="text-[#555] text-[12px] font-medium captalize tracking-wider flex items-center gap-1.5"><LuClock/> Duration</span>
            <div className="flex items-center gap-3">
              <span className="text-[#878787]">{data.duration}</span>
              <span className="bg-[#1A1A1C] px-1.5 py-0.5 border-[#5C5C5C] border rounded-full text-[9px] text-[#5C5C5C] font-bold">{data.lastActive}</span>
            </div>
          </div>
        </div>

        <div className="border-t-[1.6px] border-dashed border-[#222] my-2" />

        {/* Domain & Source Section */}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-[#555] font-bold uppercase w-14">Domains</span>
              <div className="flex items-center gap-2 px-3 py-1 bg-[#161617] border border-[#2a2a2c] rounded-full text-[#999]">
                <Globe size={12} /> {data.domains[0]} <span className="text-[#444]">+33</span>
              </div>
              <div className="px-3 py-1 bg-[#161617] border border-[#2a2a2c] rounded-full text-[#444] font-mono">main-as..8z</div>
            </div>
            <CheckCircle2 size={16} className="text-[#22c55e]" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-[#555] font-bold uppercase w-14">Source</span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#161617] border border-[#2a2a2c] rounded text-white font-bold text-[10px]">
                <GitBranch size={12} /> {data.branch}
              </div>
              <div className="flex items-center gap-3 ml-2 text-[#555]">
                <span className="flex items-center gap-1"><GitCommit size={14} /> 388</span>
                <span className="flex items-center gap-1"><Box size={14} /> 90</span>
                <span className="font-black tracking-tighter">...</span>
              </div>
            </div>
            <CheckCircle2 size={16} className="text-[#22c55e]" />
          </div>
        </div>

        {/* Status List */}
        <div className="space-y-3">
          <h3 className="text-white text-sm font-medium">Deployment Status</h3>
          {data.steps.map((step) => (
            <div key={step.id} className="flex items-center justify-between p-2 bg-[#121213] border border-[#1e1e1f] rounded-xl">
              <span className="text-[#999] text-[12px] font-medium w-32">{step.label}</span>
              <div className="flex-1 flex items-center gap-4">
                {step.metrics ? (
                  <div className="flex gap-2">
                    <MetricTag label="F" value={step.metrics.files} />
                    <MetricTag label="S" value={step.metrics.size} />
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <SegmentedProgress progress={step.progress} status={step.status} />
                    {step.id === 'build' && <button className="text-[9px] font-bold text-[#555] border border-[#2a2a2c] px-2 py-0.5 rounded-md flex items-center gap-1"><Play size={8} fill="currentColor"/> Run summary</button>}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#555] text-[11px]">{step.duration}</span>
                <CheckCircle2 size={16} className="text-[#22c55e]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#0D0D0E] px-6 py-4 border-t border-[#1F1F21] flex justify-between items-center">
        <div className="flex gap-4 text-[#444]">
          <MoreVertical size={16} className="hover:text-white cursor-pointer" />
          <Terminal size={16} className="hover:text-white cursor-pointer" />
          <Search size={16} className="hover:text-white cursor-pointer" />
        </div>
        <div className="flex items-center gap-5">
          <div className="text-[9px] font-medium tracking-widest">
            <span className="text-red-500 underline">1</span> <span className='text-white/40 font-normal'>ERROR, </span>
            <span className="text-amber-500 underline"> 3</span> <span className='text-white/40 font-normal'>WARNINGS, </span><span className='text-white/40 font-normal'>DETECTED</span>

          </div>
          <button className="px-4 py-1.5 rounded-full border border-[#2a2a2c] text-white text-[11px] font-normal hover:bg-[#161617] transition-all">
            Investigate
          </button>
        </div>
      </div>
    </motion.div>
  </div>
  );
};