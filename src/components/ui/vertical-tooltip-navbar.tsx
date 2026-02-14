"use client";

import React, { useState, useMemo, useEffect } from "react";
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

export function VerticalTooltipNavbar({ items }: TooltipNavbarProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const activeIndex = useMemo(
    () => items.findIndex((item) => item.id === hoveredId),
    [hoveredId, items]
  );

  const activeItem = items[activeIndex];

  return (
    <div className="flex items-center justify-center h-full w-full bg-transparent selection:bg-neutral-200 p-4">
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative flex items-center">
          <LayoutGroup>
            <div
              className="relative flex flex-col items-center p-2 bg-black dark:bg-[#111] gap-2 sm:gap-4 backdrop-blur-md border border-neutral-800 rounded-full shadow-2xl"
              onMouseLeave={() => setHoveredId(null)}
            >
              {items.map((item) => (
                <button
                  key={item.id}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onClick={() => setHoveredId(item.id)} 
                  className={`
                    relative z-20 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full
                    transition-colors duration-200 outline-none group text-white
                  `}
                >
                  {hoveredId === item.id && (
                    <motion.div
                      layoutId="nav-pill-vertical"
                      className="absolute inset-0 bg-neutral-800 dark:bg-[#353535] rounded-full z-[-1]"
                      transition={sharedLayoutTransition}
                    />
                  )}

                  <span className="relative flex items-center justify-center scale-90 sm:scale-100">
                    {item.icon}
                    {item.showDot && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-black" />
                    )}
                  </span>
                </button>
              ))}

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredId && activeItem && (
                  <motion.div
                    key="tooltip"
                    initial={{ opacity: 0, x: isMobile ? -5 : 10, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: isMobile ? -5 : 10, scale: 0.9 }}
                    transition={sharedLayoutTransition}
                    className={`absolute flex items-center pointer-events-none z-50 ${
                      isMobile ? "left-full ml-4" : "right-full mr-4"
                    }`}
                    style={{
                    
                      top: `calc(${activeIndex * (isMobile ? 48 : 60)}px + ${isMobile ? '12px' : '14px'})`,
                    }}
                  >
                    <div className="flex items-center gap-2 px-3 py-2 bg-black dark:bg-[#0c0c0c] border border-neutral-800 rounded-xl shadow-2xl whitespace-nowrap">
                      <motion.span
                        layout="position"
                        className="text-[13px] sm:text-[14px] font-medium text-neutral-100"
                      >
                        {activeItem.label}
                      </motion.span>

                      {activeItem.shortcut.length > 0 && (
                        <motion.div layout="position" className="flex gap-1">
                          {activeItem.shortcut.map((key, idx) => (
                            <kbd
                              key={idx}
                              className="hidden xs:flex min-w-[1.2rem] h-4.5 items-center justify-center bg-neutral-800 border border-neutral-700/50 px-1 rounded-lg text-[10px] font-bold text-neutral-400 uppercase"
                            >
                              {key}
                            </kbd>
                          ))}
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Tooltip Arrow  */}
                    <div className={`w-2 h-2 bg-black dark:bg-transparent rotate-45 absolute ${isMobile ? '-left-1' : '-right-1'}`} />
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