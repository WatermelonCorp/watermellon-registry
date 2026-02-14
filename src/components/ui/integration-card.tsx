"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { IoClose } from 'react-icons/io5';

/* ---------- Types ---------- */
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

interface IntegrationsCardProps {
  items: IntegrationItem[];
  title: string;
}

/* ---------- Sub-components ---------- */
const FilterButton: React.FC<{ label: string }> = ({ label }) => (
  <button className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-100 dark:bg-[#141414] border border-zinc-200 dark:border-[#2a2a2a] text-zinc-500 dark:text-[#a3a3a3] text-[11px] hover:text-zinc-900 dark:hover:text-white transition shrink-0">
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
      className="flex gap-4 px-5 py-4 border-b border-zinc-100 dark:border-[#1f1f1f] last:rounded-b-[14px] last:border-b-[1.6px] hover:bg-zinc-50 dark:hover:bg-[#141414] transition-colors"
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-zinc-50 dark:bg-[#0f0f0f] border border-zinc-200 dark:border-[#2a2a2a] flex items-center justify-center shrink-0">
        {item.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="truncate">
            <h3 className="text-[14px] font-medium text-zinc-900 dark:text-[#EEEEEE] truncate">{item.name}</h3>
            <p className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-[#6b6b6b] mt-0.5 truncate">
              {item.entities}
            </p>
          </div>

          {item.available && (
            <span className="text-[9px] font-bold px-2 pt-1 py-0.5 rounded-full bg-green-50 dark:bg-[#142E17] text-green-600 dark:text-[#1bb022] border border-green-200 dark:border-[#1AA420]/70 shrink-0">
              AVAILABLE
            </span>
          )}
        </div>

        <p className="text-[12px] text-zinc-500 dark:text-[#8a8a8a] mt-2 max-w-full leading-relaxed">
          {item.description}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 gap-2">
          <div className="flex gap-1.5 flex-wrap">
            {item.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] rounded-full bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200 dark:border-[#2a2a2a] text-zinc-500 dark:text-[#9a9a9a]"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="text-[10px] text-zinc-400 dark:text-[#6b6b6b] whitespace-nowrap">
            {item.triggers} TRIGGERS / {item.actions} ACTIONS
          </span>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------- Main ---------- */
export const IntegrationsCard: React.FC<IntegrationsCardProps> = ({ items, title }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-transparent mt-18">
      
      <div className="w-full max-w-145 rounded-[22px] bg-white dark:bg-[#101010] border border-zinc-200 dark:border-[#1f1f1f] shadow-xl overflow-hidden transition-colors duration-300">

        {/* Header */}
        <header className="px-5 py-4 flex items-center justify-between">
          <h2 className="text-sm font-medium text-zinc-900 dark:text-white">{title}</h2>
          <button title='close' className="text-zinc-400 dark:text-[#6b6b6b] hover:text-zinc-900 dark:hover:text-white transition">
            <IoClose size={18} />
          </button>
        </header>

        {/* Filters & Search */}
        <div className="px-5 py-3 flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-zinc-50 dark:bg-[#171717] border-t border-b border-zinc-100 dark:border-[#1f1f1f] rounded-t-[14px]">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            <FilterButton label="All types" />
            <FilterButton label="All use cases" />
            <FilterButton label="More" />
          </div>

          <div className="flex-1 hidden md:block" />

          <div className="relative w-full md:w-60">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-[#6b6b6b]" />
            <input
              placeholder="Search for an app..."
              className="w-full bg-white dark:bg-[#121212] border border-zinc-200 dark:border-[#2a2a2a] rounded-lg pl-9 pr-2 py-1.5 text-[12px] text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-[#6b6b6b] focus:outline-none focus:border-zinc-400 dark:focus:border-[#3a3a3a]"
            />
          </div>
        </div>

        {/* List */}
        <div className="max-h-130 overflow-y-auto bg-white dark:bg-[#171717]">
          <AnimatePresence>
            {items.map(item => (
              <IntegrationCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="px-5 py-4 border-0 border-zinc-100 dark:border-[#1f1f1f] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400 dark:text-[#6b6b6b]">
          <span>1 – {items.length} of 6,500</span>

          <div className="flex items-center gap-2">
            <ChevronLeft size={14} className="cursor-pointer hover:text-zinc-900 dark:hover:text-white" />
            <span className="px-2 py-1 rounded-md bg-orange-50 dark:bg-[#2a160e] border border-orange-200 dark:border-[#3a1f14] text-orange-600 dark:text-[#f97316]">
              1
            </span>
            <span className="cursor-pointer hover:text-zinc-900 dark:hover:text-white">2</span>
            <span className="px-1">…</span>
            <span className="cursor-pointer hover:text-zinc-900 dark:hover:text-white">2167</span>
            <ChevronRight size={14} className="cursor-pointer hover:text-zinc-900 dark:hover:text-white" />
          </div>
        </footer>
      </div>
    </div>
  );
};