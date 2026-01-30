import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { IoClose } from 'react-icons/io5';


export interface IntegrationItem {
  id: string;
  name: string;
  entities: string;
  description: string;
  tags: string[];
  triggers: number;
  actions: number;
  available: boolean;
  icon: React.ReactNode;
}



const FilterButton: React.FC<{ label: string }> = ({ label }) => (
  <button className="flex items-center gap-1.5 px-3 py-[4px] rounded-lg bg-[#141414] border border-[#2a2a2a] text-[#a3a3a3] text-[11px] hover:text-white transition shrink-0">
    {label}
    <ChevronDown size={12} />
  </button>
);

const IntegrationCard: React.FC<{ item: IntegrationItem }> = ({ item }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ backgroundColor: '#141414' }}
      className="flex gap-4 px-5 py-4  border-b border-[#1f1f1f] last:rounded-b-[14px] last:border-b-[1.6px]"
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-[#0f0f0f] border border-[#2a2a2a] flex items-center justify-center shrink-0">
        {item.icon}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[14px] font-medium text-[#EEEEEE]">{item.name}</h3>
            <p className="text-[10px] uppercase tracking-wider text-[#6b6b6b] mt-0.5">
              {item.entities}
            </p>
          </div>

          {item.available && (
            <span className="text-[9px] font-bold px-2 pt-1 py-0.5 rounded-full bg-[#142E17] text-[#1bb022] border border-[#1AA420]/70">
              AVAILABLE
            </span>
          )}
        </div>

        <p className="text-[12px] text-[#8a8a8a] mt-2 max-w-[560px] leading-relaxed">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-1.5 flex-wrap">
            {item.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#9a9a9a]"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="text-[10px] text-[#6b6b6b] whitespace-nowrap">
            {item.triggers} TRIGGERS / {item.actions} ACTIONS
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const IntegrationsCard: React.FC<{ items: IntegrationItem[], title : string }> = ({ items, title }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 transition-colors duration-500 relative"
      style={{ backgroundColor: theme === 'dark' ? '#0b0b0c' : '#f0f0f1' }}
    >
      {/* Theme Toggle Button */}
      <button 
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={`absolute top-8 right-8 p-2.5 rounded-xl border transition-all duration-300 z-50 ${
          theme === 'dark' ? 'bg-[#101010] border-[#1f1f1f] text-yellow-500' : 'bg-white border-gray-200 text-slate-800 shadow-lg'
        }`}
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div 
        className="w-full max-w-[540px] rounded-[22px] bg-[#101010] border border-[#1f1f1f] shadow-2xl overflow-hidden transition-all duration-500"
         style={{
             filter: theme === 'light' ? 'invert(1.92) hue-rotate(200deg)' : 'none'
             }}>

        {/* Header */}
        <header className="px-5 py-4 flex items-center justify-between">
          <h2 className="text-sm font-medium text-white">{title}</h2>
          <button title='close' className="text-[#6b6b6b] hover:text-white transition">
            <IoClose size={18} />
          </button>
        </header>

        {/* Filters */}
        <div className="px-5 py-3 flex items-center gap-2 rounded-t-[14px] bg-[#171717] border-t border-b border-[#1f1f1f]">
          <FilterButton label="All types" />
          <FilterButton label="All use cases" />
          <FilterButton label="More" />

          <div className="flex-1" />

          <div className="relative w-[240px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b6b6b]" />
            <input
              placeholder="Search for an app..."
              className="w-full bg-[#121212] border border-[#2a2a2a] rounded-lg pl-9 pr-2 py-1.5 text-[12px] text-white placeholder-[#6b6b6b] focus:outline-none focus:border-[#3a3a3a]"
            />
          </div>
        </div>

        {/* List */}
        <div className="max-h-[520px] overflow-y-auto bg-[#171717]">
          <AnimatePresence>
            {items.map(item => (
              <IntegrationCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="px-5 py-4 border-0 border-[#1f1f1f] flex items-center justify-between text-[11px] text-[#6b6b6b]">
          <span>1 – 3 of 6,500</span>

          <div className="flex items-center gap-2">
            <ChevronLeft size={14} />
            <span className="px-2 py-1 rounded-md bg-[#2a160e] border border-[#3a1f14] text-[#f97316]">
              1
            </span>
            <span>2</span>
            <span>…</span>
            <span>2167</span>
            <ChevronRight size={14} />
          </div>
        </footer>
      </div>
    </div>
  );
};