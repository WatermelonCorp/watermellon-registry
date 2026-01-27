import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';
import { BsMusicNoteList } from 'react-icons/bs';
import { HiOutlineAdjustments } from 'react-icons/hi';
import { MdFavorite } from "react-icons/md";
import { RiBubbleChartFill } from 'react-icons/ri';

export interface StepItem {
  id: number;
  label: string;
  icon: React.ElementType;
}

const defaultItems: StepItem[] = [
  { id: 1, label: 'Explore', icon: RiBubbleChartFill },
  { id: 2, label: 'Curate', icon: MdFavorite },
  { id: 3, label: 'Mix', icon: HiOutlineAdjustments },
  { id: 4, label: 'Play', icon: BsMusicNoteList },
];

interface StepPagerProps {
  steps?: StepItem[];
  initialStep?: number;
}

export const StepPager: React.FC<StepPagerProps> = ({
  steps = defaultItems,
  initialStep = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialStep);
  const [isDark, setIsDark] = useState(false);

  const nextStep = () => setActiveIndex((prev) => (prev + 1) % steps.length);
  const prevStep = () => setActiveIndex((prev) => (prev - 1 + steps.length) % steps.length);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-[#0F0F12] flex items-center justify-center relative">

        {/* 🌗 Toggle Button */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="absolute top-6 right-6 w-11 h-11 rounded-full bg-[#F6F5FA] dark:bg-[#1C1C22] flex items-center justify-center shadow-sm"
          title="Toggle theme"
        >
          {isDark ? <Sun size={18} className='dark:text-[#F4F4F5]' /> : <Moon size={18} />}
        </button>

        <div className="flex flex-col items-center gap-4 select-none">

          {/* Title */}
          <div className="h-8 flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={activeIndex}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-[26px] font-extrabold tracking-normal text-[#272727] dark:text-[#F4F4F5]"
              >
                {steps[activeIndex].label}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">

            {/* Prev */}
            <button title='left'
              onClick={prevStep}
              className="w-14 h-14 flex items-center justify-center rounded-full bg-[#F6F5FA] dark:bg-[#1C1C22] hover:bg-gray-200 dark:hover:bg-[#2A2A33] transition-colors text-[#81808A]"
            >
              <ChevronLeft size={26} strokeWidth={2.5} />
            </button>

            {/* Pager */}
            <div className="relative h-16 bg-[#fefefe] dark:bg-[#14141A] border-2 border-[#ECECEF] dark:border-[#2A2A33] rounded-full flex items-center px-4 gap-2.5 min-w-[140px] justify-center">
              {steps.map((step, index) => {
                const isActive = index === activeIndex;
                const Icon = step.icon;

                return (
                  <div key={step.id} className="relative flex items-center justify-center w-6 h-6">
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-[-8px] bg-transparent rounded-full shadow-sm z-0"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={isActive ? 'active' : 'inactive'}
                        className="z-10 relative flex items-center justify-center"
                        initial={{ opacity: 0, filter: 'blur(4px)', scale: isActive ? 0.8 : 1 }}
                        animate={{
                          opacity: 1,
                          filter: 'blur(0px)',
                          scale: isActive ? 1.1 : 1,
                          color: isActive ? "#262629" : "#CBD5E1",
                        }}
                        exit={{ opacity: 0, filter: 'blur(4px)' }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        {isActive ? <Icon size={26} className="dark:text-[#F4F4F5]" /> : <div className="w-2.5 h-2.5 rounded-full bg-current" />}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Next */}
            <button title='right'
              onClick={nextStep}
              className="w-14 h-14 flex items-center justify-center rounded-full bg-[#F6F5FA] dark:bg-[#1C1C22] hover:bg-gray-200 dark:hover:bg-[#2A2A33] transition-colors text-[#81808A]"
            >
              <ChevronRight size={26} strokeWidth={2.5} />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};