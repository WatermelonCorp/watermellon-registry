"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup, type Transition } from "framer-motion";

export interface ToolbarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  shortcut: string[];
  showDot?: boolean;
}

interface TooltipNavbarProps {
  items: ToolbarItem[];
}

const sharedLayoutTransition: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.8,
};

export function TooltipNavbar({ items }: TooltipNavbarProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeIndex = useMemo(
    () => items.findIndex((item) => item.id === hoveredId),
    [hoveredId, items]
  );

  const activeItem = items[activeIndex];

  return (
    <div className="flex items-center justify-center h-full w-full bg-transparent selection:bg-neutral-200 p-4">
      <div className="relative z-10 flex flex-col items-center w-full max-w-fit">
        <div className="relative flex items-center w-full justify-center">
          <LayoutGroup>
            <div
              className="relative flex items-center p-1.5 sm:p-2 px-2 sm:px-3 bg-neutral-900/95 dark:bg-[#1a1a1a]/95 gap-1 sm:gap-1.5 backdrop-blur-md border border-neutral-800 rounded-full shadow-2xl"
              onMouseLeave={() => setHoveredId(null)}
            >
              {items.map((item) => (
                <button
                  key={item.id}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onClick={() => setHoveredId(item.id)}
                  className={`
                    relative z-20 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full
                    transition-colors duration-200 outline-none group
                    ${hoveredId === item.id ? "text-white" : "text-neutral-500"}
                  `}
                >
                  {hoveredId === item.id && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-neutral-800 dark:bg-[#353535] rounded-full z-[-1]"
                      transition={sharedLayoutTransition}
                    />
                  )}

                  <span className="relative flex items-center justify-center scale-90 sm:scale-100">
                    {item.icon}
                    {item.showDot && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-neutral-900" />
                    )}
                  </span>
                </button>
              ))}

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredId && activeItem && (
                  <motion.div
                    key="tooltip"
                    initial={{ opacity: 0, y: 5, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.9 }}
                    transition={sharedLayoutTransition}
                    className="absolute bottom-full mb-3 flex justify-center pointer-events-none z-50 origin-bottom"
                    style={{
                      left: `calc(${(activeIndex / items.length) * 100}% + ${
                        activeIndex === 0 ? "4%" : activeIndex === items.length - 1 ? "-4%" : "0%"
                      })`,
                      transform: 'translateX(-50%)',
                      width: 'auto',
                    }}
                  >
                    <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-neutral-900 dark:bg-[#0c0c0c] border border-neutral-800 rounded-lg shadow-xl whitespace-nowrap">
                      <motion.span
                        layout="position"
                        className="text-[12px] sm:text-[14px] font-medium text-neutral-100"
                      >
                        {activeItem.label}
                      </motion.span>

                      {activeItem.shortcut.length > 0 && (
                        <motion.div layout="position" className="flex gap-1">
                          {activeItem.shortcut.map((key, idx) => (
                            <kbd
                              key={idx}
                              className="hidden xs:flex min-w-[1.2rem] h-4 sm:h-4.5 items-center justify-center bg-neutral-800 border border-neutral-700/50 px-1 rounded-lg text-[9px] sm:text-[10px] font-bold text-neutral-400 uppercase"
                            >
                              {key}
                            </kbd>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </LayoutGroup>
        </div>
      </div>
    </div>
  );
}