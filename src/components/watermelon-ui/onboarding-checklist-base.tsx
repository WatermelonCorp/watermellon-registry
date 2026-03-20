"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
    <div
      className={`theme-injected ${theme === 'dark' ? 'dark' : ''} bg-transparent text-foreground font-sans`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="min-h-full bg-transparent flex flex-col items-center justify-center p-4 xs:p-6 sm:p-10 space-y-12 relative transition-colors duration-500">
        <motion.div
          layout
          transition={springConfig}
          className="w-full max-w-xl bg-card text-card-foreground border border-border rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header Section */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-3 sm:p-4 flex items-center justify-between cursor-pointer select-none"
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <motion.div
                animate={{ rotate: isExpanded ? 0 : 180 }}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center text-muted-foreground shrink-0"
              >
                <ChevronUp size={20} className="sm:hidden" />
                <ChevronUp size={22} className="hidden sm:block" />
              </motion.div>
              <span className="font-bold text-foreground text-sm sm:text-base truncate pr-1">
                {title}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-1">
              <div className="flex gap-1">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-3 sm:h-4 w-1 rounded-full transition-colors duration-500 ${i < (completedCount / totalSteps) * 14
                        ? 'bg-primary'
                        : 'bg-muted'
                      }`}
                  />
                ))}
              </div>

              <span
                className="text-xs sm:text-sm font-bold text-muted-foreground min-w-7 sm:min-w-8 text-right"
                style={{ fontFamily: "var(--font-mono)" }}
              >
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
                className="border-t border-border bg-background rounded-t-xl"
              >
                <div className="p-2 space-y-1">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className="group flex items-center justify-between py-3 px-3 sm:px-4 hover:bg-accent/40 rounded-lg cursor-pointer transition-all active:scale-95 sm:active:scale-100"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        {step.isCompleted ? (
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary shadow-xs flex items-center justify-center shrink-0">
                            <Check size={10} strokeWidth={4} className="text-primary-foreground sm:hidden" />
                            <Check size={12} strokeWidth={4} className="text-primary-foreground hidden sm:block" />
                          </div>
                        ) : (
                          <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${step.id === 3
                              ? 'bg-foreground border-foreground shadow-xs text-background'
                              : 'border-border text-muted-foreground shadow-xs'
                            }`}>
                            {step.id}
                          </div>
                        )}
                        <span className={`text-sm font-medium transition-colors truncate ${step.isCompleted ? 'text-muted-foreground' : 'text-foreground'
                          }`}>
                          {step.title}
                        </span>
                      </div>

                      {!step.isCompleted && (
                        <ChevronRight size={14} className="text-muted-foreground shrink-0 sm:size-4" />
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