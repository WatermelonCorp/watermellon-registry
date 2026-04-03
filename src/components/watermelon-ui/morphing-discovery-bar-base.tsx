"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { Search, X } from "lucide-react";

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

const transition = {
  type: "spring",
  bounce: 0.3,
  duration: 0.7,
} as const;

export const MorphingDiscoveryBar: React.FC<MorphingDiscoveryBarProps> = ({
  categories,
  className = "",
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
    <div
      className={`theme-injected flex w-full flex-col items-center justify-center bg-transparent p-2 transition-colors duration-500 sm:p-4 ${className}`}
    >
      <div className="flex h-20 w-full max-w-full items-center justify-center">
        <LayoutGroup>
          <motion.div
            layout
            transition={transition}
            className="flex max-w-full items-center gap-1.5 rounded-lg p-1.5 backdrop-blur-md sm:gap-3 sm:p-2"
          >
            <motion.div
              layout
              style={{ borderRadius: 12 }}
              transition={transition}
              className={`relative flex items-center overflow-hidden border shadow-sm transition-colors ${
                isSearching
                  ? "xs:w-64 h-12 w-[calc(100vw-80px)] sm:h-14 sm:w-80"
                  : "h-12 w-12 sm:h-14 sm:w-14"
              } border-border bg-background`}
            >
              <div className="flex h-full w-full justify-center items-center px-3 sm:px-4">
                <motion.div layout="position" transition={transition}>
                  <Search
                    size={18}
                    strokeWidth={3}
                    className="text-foreground shrink-0 transition-colors"
                  />
                </motion.div>

                <AnimatePresence mode="wait">
                  {isSearching && (
                    <motion.input
                      key="search-input"
                      ref={inputRef}
                      initial={{
                        opacity: 0,
                        scaleX: 0.6,
                        scaleY: 0.8,
                        filter: "blur(4px)",
                        transformOrigin: "left center",
                      }}
                      animate={{
                        opacity: 1,
                        scaleX: 1,
                        scaleY: 1,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        scaleX: 0.6,
                        scaleY: 0.8,
                        filter: "blur(4px)",
                      }}
                      transition={{ duration: 0.15 }}
                      placeholder="Search"
                      className="text-foreground placeholder:text-muted-foreground ml-2 w-full border-none bg-transparent text-sm font-medium outline-none sm:text-base"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  )}
                </AnimatePresence>

                {!isSearching && (
                  <motion.button
                    layoutId="search-click-overlay"
                    className="absolute inset-0 z-10 h-full w-full"
                    onClick={() => setIsSearching(true)}
                  />
                )}
              </div>
            </motion.div>

            <AnimatePresence mode="popLayout">
              {!isSearching ? (
                <motion.div
                  key="categories-list"
                  layout
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  transition={transition}
                  className="border-border bg-background flex items-center gap-1 overflow-hidden rounded-lg border p-1"
                >
                  {categories.map((cat) => {
                    const isActive = activeTab === cat.id;

                    return (
                      <motion.button
                        key={cat.id}
                        layout
                        onClick={() => setActiveTab(cat.id)}
                        className="relative z-0 flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold tracking-tight whitespace-nowrap transition-colors sm:gap-2 sm:px-6 sm:py-3 sm:text-lg"
                        style={{
                          color: isActive ? cat.activeTextColor : undefined,
                        }}
                      >
                        {!isActive && (
                          <span className="text-muted-foreground absolute inset-0 flex items-center justify-center" />
                        )}

                        {isActive && (
                          <motion.div
                            layoutId="pill-bg"
                            className="bg-foreground/10 absolute inset-0 z-0 rounded-lg shadow-sm"
                            // style={
                            //   {
                            //     '--active-bg': cat.activeColor,
                            //   } as React.CSSProperties
                            // }
                            transition={transition}
                          />
                        )}
                        <span
                          className={`relative z-10 scale-90 sm:scale-100 ${
                            !isActive ? "text-muted-foreground" : "text-primary"
                          }`}
                        >
                          {cat.icon}
                        </span>
                        <span
                          className={`relative z-10 ${
                            !isActive ? "text-muted-foreground" : "text-primary"
                          }`}
                        >
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
                  initial={{
                    width: 120,
                    x: -80,
                    scaleX: 1.5,
                    scaleY: 0.8,
                    opacity: 0,
                    filter: "blur(8px)",
                    transformOrigin: "left center",
                  }}
                  animate={{
                    width: 56,
                    x: 0,
                    scaleX: 1,
                    scaleY: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    width: 120,
                    x: -80,
                    scaleX: 1.5,
                    scaleY: 0.8,
                    opacity: 0,
                    filter: "blur(8px)",
                  }}
                  transition={transition}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setIsSearching(false);
                    setSearchValue("");
                  }}
                  className="border-border bg-background text-foreground flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border shadow-sm transition-colors sm:h-14 sm:w-14"
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
