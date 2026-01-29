"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { FaCheck } from 'react-icons/fa6';
import { Sun, Moon } from 'lucide-react';

export interface StepData {
  id: string;
  label: string;
  type: 'text' | 'toggle';
  placeholder?: string;
}

interface ProgressiveInputStackProps {
  steps: StepData[];
  initialData?: Record<string, string | boolean>;
  onSubmit?: (data: Record<string, string | boolean>) => void;
  initialTheme?: 'light' | 'dark';
}

export const ProgressiveInputStack: React.FC<ProgressiveInputStackProps> = ({
  steps,
  initialData,
  onSubmit,
  initialTheme = 'light',
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string | boolean>>(
    initialData || steps.reduce((acc, step) => ({ ...acc, [step.id]: step.type === 'toggle' ? false : '' }), {})
  );
  const [isDark, setIsDark] = useState(initialTheme === 'dark');

  const springTransition = {
    type: 'spring' as const,
    stiffness: 400,
    damping: 35,
    mass: 1,
  };

  // Sync theme
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onSubmit?.(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const updateField = (id: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500 ${isDark ? 'bg-zinc-950' : 'bg-white'}`}>
      <div className="w-full max-w-[400px]">
        {/* Header with Theme Toggle */}
        <div className="flex items-center justify-between mb-6 px-2">
          <h1 className={`text-3xl font-bold tracking-tight ${isDark ? 'text-zinc-200' : 'text-[#222222]'}`}>
            Invite a friend
          </h1>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all shadow-sm active:scale-90"
          >
            {isDark ? (
              <Sun className="text-yellow-400" size={20} />
            ) : (
              <Moon className="text-zinc-500" size={20} />
            )}
          </button>
        </div>

        <div className="relative w-full flex flex-col gap-8">
          {/* The Stack */}
          <div className="relative h-[60px] w-full perspective-1000">
            <AnimatePresence mode="popLayout">
              {steps.map((step, index) => {
                const isVisible = index <= currentStep;
                if (!isVisible) return null;
                const position = currentStep - index;
                const isTop = index === currentStep;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{
                      opacity: 1,
                      scale: 1 - position * 0.05,
                      y: -position * 10,
                      zIndex: steps.length - position,
                    }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={springTransition}
                    className={`absolute inset-0 border-2 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] p-4 flex items-center transition-colors duration-200 ${
                      !isTop ? 'pointer-events-none opacity-50' : 'opacity-100'
                    } ${isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-[#E9E8EE]'}`}
                  >
                    {step.type === 'text' ? (
                      <input
                        autoFocus={isTop}
                        type="text"
                        value={formData[step.id] as string}
                        onChange={(e) => updateField(step.id, e.target.value)}
                        placeholder={step.placeholder}
                        className={`w-full text-lg font-bold capitalize outline-none ${
                          isDark ? 'text-zinc-200 bg-zinc-900 placeholder-zinc-400' : 'text-[#242426] placeholder-[#85858B]/70'
                        }`}
                      />
                    ) : (
                      <div className="flex items-center justify-between w-full">
                        <span className={`text-lg font-bold ${isDark ? 'text-zinc-400' : 'text-[#85858B]'}`}>
                          {step.label}
                        </span>
                        <button
                          title="switch"
                          onClick={() => updateField(step.id, !formData[step.id])}
                          className={`w-12 h-7.5 rounded-full transition-colors relative shadow-sm flex items-center p-1 ${
                            formData[step.id] ? (isDark ? 'bg-zinc-200' : 'bg-[#242426]') : 'bg-[#ececf1] : dark:bg-[#242426]'
                          }`}
                        >
                          <motion.div
                            animate={{ x: formData[step.id] ? 20 : 0 }}
                            transition={springTransition}
                            className="w-5 h-5 bg-white rounded-full shadow-sm"
                          />
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between px-2">
            <div>
              <AnimatePresence>
                {currentStep > 0 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={handleBack}
                    className={`w-[50px] h-[50px] flex items-center justify-center rounded-full transition-colors duration-200 ${
                      isDark ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700' : 'bg-[#E5E4EE] text-[#000002] hover:bg-[#dad9e3]'
                    }`}
                  >
                    <ArrowLeft size={24} strokeWidth={2.5} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              layout
              transition={springTransition}
              onClick={handleNext}
              className={`h-12 px-4 flex items-center gap-2 rounded-full font-bold shadow-md overflow-hidden ${
                isDark ? 'bg-zinc-200 text-zinc-900 hover:opacity-90' : 'bg-[#000002] text-white hover:opacity-90'
              }`}
            >
              <AnimatePresence mode="popLayout">
                {currentStep === steps.length - 1 ? (
                  <motion.span
                    key="done"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={springTransition}
                    className="flex items-center gap-2"
                  >
                    <FaCheck size={22} strokeWidth={4} />
                    <span className="text-xl">Done</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="next"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={springTransition}
                    className="flex items-center gap-2"
                  >
                    <span className="text-xl">Next</span>
                    <ArrowRight size={22} strokeWidth={3} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};