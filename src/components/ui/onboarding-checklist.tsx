"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronRight, Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  isCompleted: boolean;
}

interface ChecklistProps {
  steps: Step[];
  title?: string;
}

export const OnboardingChecklist: React.FC<ChecklistProps> = ({ 
  steps, 
  title = "Getting started" 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [theme] = useState<'light' | 'dark'>('light');
  
  const completedCount = steps.filter(s => s.isCompleted).length;
  const totalSteps = steps.length;
  const springConfig = { type: "spring", stiffness: 300, damping: 30 } as const;

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-full bg-transparent flex flex-col items-center justify-center p-4 xs:p-6 sm:p-10 space-y-12 relative transition-colors duration-500">
        <motion.div
          layout
          transition={springConfig}
          className="w-full lg:w-100 max-w-100 bg-[#F5F5F7] dark:bg-[#161616] border border-[#E5E5E5] dark:border-white/10 rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header Section */}
          <div 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="p-3 sm:p-3.5 flex items-center justify-between cursor-pointer select-none"
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <motion.div
                animate={{ rotate: isExpanded ? 0 : 180 }}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[#A1A1A1] shrink-0"
              >
                <ChevronUp size={20} className="sm:hidden" />
                <ChevronUp size={22} className="hidden sm:block" />
              </motion.div>
              <span className="font-bold text-[#1A1A1A] dark:text-[#EDEDED] text-[14px] sm:text-[15px] truncate pr-1">
                {title}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-1">
              <div className="flex gap-0.5 xs:gap-[3px]">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-3.5 sm:h-4 w-[2.5px] sm:w-[3.5px] rounded-full transition-colors duration-500 ${
                      i < (completedCount / totalSteps) * 14 
                      ? 'bg-[#22C55E]' 
                      : 'bg-[#E5E5E7] dark:bg-[#2A2A2A]'
                    }`}
                  />
                ))}
              </div>
              
              <span className="text-[12px] sm:text-[13px] font-bold text-[#71717A] dark:text-[#888] min-w-7 sm:min-w-7.5 text-right">
                {completedCount}/{totalSteps}
              </span>
            </div>
          </div>

          {/* Expanded Checklist Items */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={springConfig}
                className="border-t-[1.4px] border-[#E9E8EF] dark:border-white/5 bg-white dark:bg-[#1C1C1C] rounded-t-4xl sm:rounded-t-[24px]"
              >
                <div className="p-1.5 sm:p-2 space-y-0.5 sm:y-1">
                  {steps.map((step) => (
                    <div 
                      key={step.id}
                      className="group flex items-center justify-between p-2.5 sm:p-3 px-3 sm:px-4 hover:bg-[#F9F9F9] dark:hover:bg-white/5 rounded-xl cursor-pointer transition-all active:scale-[0.98] sm:active:scale-100"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        {step.isCompleted ? (
                          <div className="w-5 h-4.5 sm:w-6 sm:h-5 rounded-full bg-[#00B613] shadow-sm shadow-[#238848] flex items-center justify-center shrink-0">
                            <Check size={10} strokeWidth={4} className="text-white sm:hidden" />
                            <Check size={12} strokeWidth={4} className="text-white hidden sm:block" />
                          </div>
                        ) : (
                          <div className={`w-5 h-4.5 sm:w-6 sm:h-5 rounded-full border-2 flex items-center justify-center text-[10px] sm:text-[12px] font-bold shrink-0 ${
                            step.id === 3 
                            ? 'bg-[#292929] dark:bg-[#EDEDED] border-[#292929] dark:border-[#EDEDED] shadow-sm shadow-[#1a1919] text-white dark:text-[#1A1A1A]' 
                            : 'border-[#E5E5E7] dark:border-[#333] text-[#A1A1A1] dark:text-[#555] shadow-sm shadow-[#8f8e8e]/40'
                          }`}>
                            {step.id}
                          </div>
                        )}
                        <span className={`text-[13px] sm:text-[14px] font-medium transition-colors truncate ${
                          step.isCompleted ? 'text-[#A1A1A1] dark:text-[#555]' : 'text-[#1A1A1A] dark:text-[#D4D4D4]'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                      
                      {!step.isCompleted && (
                        <ChevronRight size={14} className="text-[#D1D1D6] dark:text-[#444] shrink-0 sm:size-4" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};