"use client";

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  <button className="flex items-center gap-2 px-3 py-1 rounded-md bg-muted/60 border border-border text-muted-foreground text-xs hover:text-foreground transition shrink-0">
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
      className="theme-injected flex gap-4 px-5 py-4 bg-card text-foreground border-b border-border last:rounded-b-lg last:border-b hover:bg-accent/40 transition-colors"
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-md bg-muted/50 border border-border flex items-center justify-center shrink-0">
        {item.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="truncate">
            <h3 className="text-sm font-medium text-foreground truncate">{item.name}</h3>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1 truncate">
              {item.entities}
            </p>
          </div>

          {item.available && (
            <span className="text-xs font-bold px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/30 shrink-0">
              AVAILABLE
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground mt-2 max-w-full leading-relaxed">
          {item.description}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 gap-2">
          <div className="flex gap-2 flex-wrap">
            {item.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-md bg-muted/60 border border-border text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="text-xs text-muted-foreground whitespace-nowrap">
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
    <div className="theme-injected min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 text-foreground">

      <div className="w-full max-w-5xl rounded-xl bg-card text-card-foreground border border-border shadow-lg overflow-hidden transition-colors duration-300">

        {/* Header */}
        <header className="px-5 py-4 flex items-center justify-between bg-card text-foreground border-b border-border">
          <h2 className="text-sm font-medium text-foreground">{title}</h2>
          <button title='close' className="text-muted-foreground hover:text-foreground transition">
            <IoClose size={18} />
          </button>
        </header>

        {/* Filters & Search */}
        <div className="px-5 py-3 flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-muted border-b border-border rounded-t-lg text-foreground">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            <FilterButton label="All types" />
            <FilterButton label="All use cases" />
            <FilterButton label="More" />
          </div>

          <div className="flex-1 hidden md:block" />

          <div className="relative w-full md:w-60">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search for an app..."
              className="w-full bg-background border border-border rounded-md pl-9 pr-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
        </div>

        {/* List */}
        <div className="max-h-96 overflow-y-auto bg-card text-card-foreground">
          <AnimatePresence>
            {items.map(item => (
              <IntegrationCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="px-5 py-4 bg-card border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>1 – {items.length} of 6,500</span>

          <div className="flex items-center gap-2">
            <ChevronLeft size={14} className="cursor-pointer hover:text-foreground" />
            <span className="px-2 py-1 rounded-md bg-accent border border-border text-foreground">
              1
            </span>
            <span className="cursor-pointer hover:text-foreground">2</span>
            <span className="px-1">…</span>
            <span className="cursor-pointer hover:text-foreground">2167</span>
            <ChevronRight size={14} className="cursor-pointer hover:text-foreground" />
          </div>
        </footer>
      </div>
    </div>
  );
};