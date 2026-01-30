import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronRight, Check, Moon, Sun } from 'lucide-react';

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
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const completedCount = steps.filter(s => s.isCompleted).length;
  const totalSteps = steps.length;
  
  const springConfig = { type: "spring", stiffness: 300, damping: 30 } as const;

  return (
            <div
            className="transition-all duration-500"
            style={{
                filter: theme === 'dark' ? 'invert(0.9) hue-rotate(180deg)' : 'none',
                backgroundColor: theme === 'dark' ? '#000' : 'transparent'
            }}
        >
            <div className="min-h-screen bg-[#F5F5F7]/40 flex flex-col items-center justify-center p-10 space-y-12 relative">
                {/* Background Pattern */}
                <div className="fixed inset-0 pointer-events-none z-[-1] bg-[#FBFBFC] overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-[0.4]"
                        style={{
                            backgroundImage: `repeating-linear-gradient(
                        -45deg,
                        #E5E7EB 0px,
                        #E5E7EB 1px,
                        transparent 1px,
                        transparent 10px
                      )`
                        }}
                    />

                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `linear-gradient(to right, #D1D5DB 1px, transparent 1px)`,
                            backgroundSize: '240px 100%',
                            maskImage: 'linear-gradient(to bottom, black 5px, transparent 5px)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 5px, transparent 5px)',
                            maskSize: '100% 10px',
                            WebkitMaskSize: '100% 10px'
                        }}
                    />

                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `linear-gradient(to bottom, #D1D5DB 1px, transparent 1px)`,
                            backgroundSize: '100% 180px',
                            maskImage: 'linear-gradient(to right, black 5px, transparent 5px)',
                            WebkitMaskImage: 'linear-gradient(to right, black 5px, transparent 5px)',
                            maskSize: '10px 100%',
                            WebkitMaskSize: '10px 100%'
                        }}
                    />
                </div>

                {/* Theme Toggle  */}
                <button
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    className="absolute top-10 right-10 p-2 rounded-full border border-gray-300 bg-white shadow-sm z-50"
                    style={{ filter: theme === 'dark' ? 'invert(1) hue-rotate(180deg)' : 'none' }}
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>

    <motion.div
      layout
      transition={springConfig}
      className="w-full max-w-[380px] bg-[#F5F5F7] border border-[#E5E5E5] rounded-[16px] shadow-lg overflow-hidden"
    >
      {/* Header Section */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-3.5 flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: isExpanded ? 0 : 180 }}
            className="w-8 h-8 rounded-lg  flex items-center justify-center text-[#A1A1A1] "
          >
            <ChevronUp size={22} />
          </motion.div>
          <span className="font-bold text-[#1A1A1A] text-[15px]">{title}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Segmented Progress Bar */}
          <div className="flex gap-[3px]">
            {Array.from({ length: 14 }).map((_, i) => (
              <div 
                key={i} 
                className={`h-4 w-[3.5px] rounded-full transition-colors duration-500 ${
                  i < (completedCount / totalSteps) * 10 
                  ? 'bg-[#22C55E]' 
                  : 'bg-[#E5E5E7]'
                }`}
              />
            ))}
          </div>
          
          <span className="text-[13px] font-bold text-[#71717A] min-w-[30px]">
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
            className="border-t-[1.4px] border-[#E9E8EF] bg-white rounded-t-[24px]"
          >
            <div className="p-2 space-y-1">
              {steps.map((step) => (
                <div 
                  key={step.id}
                  className="group flex items-center justify-between p-3 px-4 hover:bg-[#F9F9F9] rounded-xl cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    {step.isCompleted ? (
                      <div className="w-6 h-5 rounded-full bg-[#00B613] shadow-sm shadow-[#238848] flex items-center justify-center">
                        <Check size={12} strokeWidth={4} className="text-white" />
                      </div>
                    ) : (
                      <div className={`w-6 h-5 rounded-full border-2 flex items-center justify-center text-[12px] font-bold ${
                        step.id === 3 ? 'bg-[#292929] border-[#292929] shadow-sm shadow-[#1a1919] text-white' : 'border-[#E5E5E7] text-[#A1A1A1] shadow-sm shadow-[#8f8e8e]/40'
                      }`}>
                        {step.id}
                      </div>
                    )}
                    <span className={`text-[14px] font-medium transition-colors ${
                      step.isCompleted ? 'text-[#A1A1A1]' : 'text-[#1A1A1A]'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  
                  {!step.isCompleted && (
                    <ChevronRight size={16} className="text-[#D1D1D6]" />
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