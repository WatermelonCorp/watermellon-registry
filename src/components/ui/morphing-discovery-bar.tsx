"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { Search, X } from 'lucide-react';

/* ---------- Types ---------- */
export interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeColor: string;
  activeTextColor: string;
}

export interface MorphingDiscoveryBarProps {
  categories: Category[];
  className?: string;
}

/* ---------- Motion Settings ---------- */
const transition = {
  type: "spring",
  stiffness: 520,
  damping: 32,
  mass: 1
} as const;

export const MorphingDiscoveryBar: React.FC<MorphingDiscoveryBarProps> = ({
  categories,
  className = ""
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState(categories[0]?.id);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearching) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isSearching]);

  return (
    <div className={`w-full flex flex-col items-center justify-center transition-colors duration-500 p-2 sm:p-4 bg-transparent ${className}`}>
      {/* Container height adjusted for mobile flow */}
      <div className="flex items-center justify-center h-20 w-full max-w-full">
        <LayoutGroup>
          <motion.div
            layout
            transition={transition}
            className="flex items-center gap-1.5 sm:gap-3 p-1.5 sm:p-2 rounded-[32px] backdrop-blur-md max-w-full"
          >
            {/* SEARCH COMPONENT */}
            <motion.div
              layout
              transition={transition}
              className={`relative flex items-center shadow-sm border overflow-hidden transition-colors rounded-[28px] ${isSearching
                ? 'w-[calc(100vw-80px)] xs:w-64 sm:w-80 h-12 sm:h-14'
                : 'w-12 h-12 sm:w-14 sm:h-14'
                } bg-white border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800`}
            >
              <div className="flex items-center w-full px-3 sm:px-4 h-full">
                <motion.div layout="position" transition={transition}>
                  <Search
                    size={18}
                    strokeWidth={3}
                    className="shrink-0 transition-colors text-neutral-900 dark:text-neutral-400"
                  />
                </motion.div>

                <AnimatePresence mode="wait">
                  {isSearching && (
                    <motion.input
                      key="search-input"
                      ref={inputRef}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      transition={{ duration: 0.15 }}
                      placeholder="Search"
                      className="bg-transparent border-none outline-none w-full text-sm sm:text-base font-medium ml-2 text-neutral-900 placeholder:text-neutral-400 dark:text-white dark:placeholder:text-neutral-600"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  )}
                </AnimatePresence>

                {!isSearching && (
                  <motion.button
                    layoutId="search-click-overlay"
                    className="absolute inset-0 z-10 w-full h-full"
                    onClick={() => setIsSearching(true)}
                  />
                )}
              </div>
            </motion.div>

            {/* CATEGORIES */}
            <AnimatePresence mode="popLayout">
              {!isSearching ? (
                <motion.div
                  key="categories-list"
                  layout
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  transition={transition}
                  className="flex items-center gap-1 rounded-full p-1 border bg-[#ffffff] border-[#F0F0F0] dark:bg-neutral-900 dark:border-neutral-800 overflow-hidden"
                >
                  {categories.map((cat) => {
                    const isActive = activeTab === cat.id;

                    return (
                      <motion.button
                        key={cat.id}
                        layout
                        onClick={() => setActiveTab(cat.id)}
                        className={`relative px-3 sm:px-6 py-2 sm:py-3 rounded-full flex items-center gap-1.5 sm:gap-2 transition-colors whitespace-nowrap font-bold text-xs sm:text-lg tracking-tight z-0`}
                        style={{
                          color: isActive ? cat.activeTextColor : undefined
                        }}
                      >
                        {!isActive && <span className="absolute inset-0 flex items-center justify-center text-neutral-600 dark:text-neutral-400" />}

                        {isActive && (
                          <motion.div
                            layoutId="pill-bg"
                            className="absolute inset-0 z-[-1] rounded-full shadow-sm bg-[(--active-bg)] dark:bg-neutral-800 dark:border dark:border-neutral-700"
                            style={{
                              // @ts-ignore
                              '--active-bg': cat.activeColor
                            } as React.CSSProperties}
                            transition={transition}
                          />
                        )}
                        <span className="relative z-10 scale-90 sm:scale-100">{cat.icon}</span>
                        <span className={`relative z-10 ${!isActive ? 'text-neutral-600 dark:text-neutral-400' : ''}`}>
                          {cat.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.button
                  key="close-action"
                  layout
                  initial={{ scale: 0.8, opacity: 0, rotate: -90 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.8, opacity: 0, rotate: -90 }}
                  transition={transition}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setIsSearching(false);
                    setSearchValue("");
                  }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-sm border shrink-0 transition-colors bg-white border-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:border-neutral-800 dark:text-white"
                >
                  <X size={18} strokeWidth={2.5} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
};