"use client";

import { useState, useRef, useEffect, type FC, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

// --- Types ---
export interface Step {
  id: string;
  label: string;
  icon: ReactNode;
}

interface StepIndicatorProps {
  steps?: Step[];          
  currentStep?: number;    
  onStepChange?: (index: number) => void;
}

export const StepIndicator: FC<StepIndicatorProps> = ({
  steps = [], 
  currentStep = 0, 
  onStepChange
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [isDark, setIsDark] = useState<boolean>(false);

  // Theme Sync
  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  // Responsive Width Tracking
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const activeIndex = hoveredIndex !== null ? hoveredIndex : currentStep;
  const safeIndex = Math.min(Math.max(activeIndex, 0), steps.length - 1);

  const calculatePosition = (index: number) => {
    if (!containerWidth || steps.length === 0) return 0;
    const stepWidth = containerWidth / steps.length;
    return index * stepWidth + stepWidth / 2;
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-zinc-950 transition-colors duration-500">
      
      {/* THEME TOGGLE */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className="mb-16 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all active:scale-90 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        {isDark ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-zinc-600" size={20} />}
      </button>

      <div
        className="relative flex flex-col items-center w-full max-w-[420px]"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {/* Animated Tooltip */}
        <div className="relative w-full h-14 mb-4 flex items-center">
          {containerWidth > 0 && steps.length > 0 && (
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key="tooltip-track"
                className="absolute top-0 left-0"
                animate={{ x: calculatePosition(safeIndex) }}
                transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.8 }}
              >
                <motion.div
                  layout
                  key={`step-label-${safeIndex}`}
                  style={{ x: "-50%" }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 dark:bg-white text-zinc-50 dark:text-zinc-950 shadow-xl"
                  initial={{ opacity: 0, y: 10, scale: 0.9, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, scale: 0.9, filter: "blur(8px)" }}
                  transition={{
                    layout: { type: "spring", stiffness: 240, damping: 22 },
                    opacity: { duration: 0.2 },
                    filter: { duration: 0.3 }
                  }}
                >
                  <motion.span layout="position" className="flex items-center">
                    {steps[safeIndex].icon}
                  </motion.span>

                  <motion.span
                    layout="position"
                    className="text-lg font-bold whitespace-nowrap"
                  >
                    {steps[safeIndex].label}
                  </motion.span>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Progress Segments */}
        <div ref={containerRef} className="flex w-full gap-3 px-1 h-3 items-center">
          {steps.map((step, index) => {
            const isSelected = index === activeIndex;
            const isCompleted = index <= currentStep;

            return (
              <div
                key={step.id}
                className="relative flex-1 h-3 cursor-pointer group"
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => onStepChange?.(index)}
              >
                {/* Background Track */}
                <div className="absolute inset-0 rounded-full bg-zinc-100 dark:bg-zinc-800 transition-colors" />

                {/* Fill Layer */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={false}
                  animate={{ 
                    backgroundColor: isSelected 
                      ? (isDark ? "#ffffff" : "#09090b") 
                      : isCompleted
                        ? (isDark ? "#3f3f46" : "#d4d4d8")
                        : (isDark ? "#27272a" : "#f4f4f5"),
                    scaleY: isSelected ? 1.2 : 1 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};