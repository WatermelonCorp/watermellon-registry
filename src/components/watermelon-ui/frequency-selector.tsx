'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { Check, ChevronRight } from 'lucide-react';

/* ---------- Types ---------- */
export type FrequencyType = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

export interface FrequencyData {
  type: FrequencyType;
  subValue?: string;
}

interface FrequencySelectorProps {
  value: FrequencyData;
  onChange: (data: FrequencyData) => void;
  className?: string;
}

/* ---------- Motion Config ---------- */
const smoothSpring = {
  type: 'spring',
  bounce: 0.3,
  duration: 0.7,
} as const;

/* ---------- Data ---------- */
const FREQUENCIES: FrequencyType[] = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

const SUB_OPTIONS: Record<FrequencyType, string[]> = {
  Daily: [],
  Weekly: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  Monthly: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
  Yearly: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
};

export const FrequencySelector: React.FC<FrequencySelectorProps> = ({
  value,
  onChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempType, setTempType] = useState<FrequencyType>(value.type);
  const [tempSubValue, setTempSubValue] = useState<string | undefined>(
    value.subValue,
  );

  const handleOpen = () => {
    setTempType(value.type);
    setTempSubValue(value.subValue || SUB_OPTIONS[value.type][0]);
    setIsOpen(true);
  };

  const handleConfirm = () => {
    onChange({
      type: tempType,
      subValue: tempType === 'Daily' ? undefined : tempSubValue,
    });
    setIsOpen(false);
  };

  return (
    <LayoutGroup id="frequency-root">
      <div
        className={`flex w-full items-center justify-center p-4 antialiased select-none ${className}`}
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* ---------- CLOSED STATE ---------- */
            <motion.div
              layoutId="container"
              initial={{ filter: 'blur(4px)', opacity: 0 }}
              animate={{ filter: 'blur(0px)', opacity: 1 }}
              exit={{ filter: 'blur(4px)', opacity: 0 }}
              onClick={handleOpen}
              transition={smoothSpring}
              className="flex min-h-14 w-full max-w-md cursor-pointer items-center justify-between rounded-full bg-neutral-100 p-1 pl-4 sm:pl-6  gap-4 dark:bg-neutral-900"
            >
              <motion.span
                layout
                className="text-base font-bold text-neutral-500 sm:text-lg dark:text-neutral-400"
              >
                Frequency
              </motion.span>

              <motion.div
                layoutId="trigger-pill"
                transition={smoothSpring}
                className="flex min-h-12 flex-1 items-center justify-between gap-2 rounded-full border border-black/5 bg-white px-3 py-1.5 shadow-sm sm:flex-initial sm:gap-3 sm:px-4 dark:border-white/5 dark:bg-neutral-800"
              >
                <span className="text-base font-bold sm:text-lg">
                  {value.type}
                  {value.subValue ? `, ${value.subValue}` : ''}
                </span>

                <ChevronRight size={18} className="shrink-0 text-neutral-400" />
              </motion.div>
            </motion.div>
          ) : (
            /* ---------- OPEN STATE ---------- */
            <motion.div
              layoutId="container"
              initial={{ filter: 'blur(4px)', opacity: 0 }}
              animate={{ filter: 'blur(0px)', opacity: 1 }}
              exit={{ filter: 'blur(4px)', opacity: 0 }}
              transition={smoothSpring}
              className="flex w-full max-w-lg flex-col gap-3 rounded-[32px] border border-black/5 bg-neutral-100 p-2 shadow-xl dark:border-white/5 dark:bg-neutral-900"
            >
              {/* Top Row */}
              <div className="flex items-center gap-2">
                <motion.div
                  layoutId="trigger-pill"
                  transition={smoothSpring}
                  className="custom-scrollbar relative flex h-11 flex-1 items-center gap-2 overflow-x-auto rounded-full bg-white p-1 shadow-inner sm:h-13 sm:gap-2 dark:bg-neutral-800"
                >
                  {FREQUENCIES.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setTempType(type);
                        setTempSubValue(SUB_OPTIONS[type][0]);
                      }}
                      className="relative flex h-full flex-none items-center justify-center px-4 text-xs font-bold sm:flex-1 sm:min-w-fit sm:px-6 sm:text-[15px]"
                    >
                      {tempType === type && (
                        <motion.div
                          layoutId="active-tab"
                          transition={smoothSpring}
                          className="absolute inset-0 z-0 rounded-full bg-neutral-200 dark:bg-neutral-700"
                        />
                      )}

                      <span className="relative z-10">{type}</span>
                    </button>
                  ))}
                </motion.div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleConfirm}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white sm:h-12 sm:w-12 dark:bg-white dark:text-neutral-900"
                >
                  <Check size={18} />
                </motion.button>
              </div>

              {/* Sub Options */}
              <AnimatePresence mode="wait">
                {SUB_OPTIONS[tempType].length > 0 && (
                  <motion.div
                    layout
                    transition={smoothSpring}
                    className="overflow-hidden"
                  >
                    {SUB_OPTIONS[tempType].length > 0 && (
                      <motion.div
                        key={tempType}
                        layout
                        transition={smoothSpring}
                        className={`grid gap-2 rounded-2xl bg-white p-3 shadow-inner dark:bg-neutral-800 ${
                          tempType === 'Monthly'
                            ? 'grid-cols-7'
                            : tempType === 'Yearly'
                              ? 'grid-cols-4'
                              : 'grid-cols-7'
                        }`}
                      >
                        {SUB_OPTIONS[tempType].map((option) => (
                          <button
                            key={option}
                            onClick={() => setTempSubValue(option)}
                            className="relative flex h-8 items-center justify-center rounded-full text-[10px] font-bold sm:h-9 sm:text-sm"
                          >
                            {tempSubValue === option && (
                              <motion.div
                                layoutId="active-sub"
                                transition={smoothSpring}
                                className="absolute inset-0 z-0 rounded-full bg-neutral-200 dark:bg-neutral-700"
                              />
                            )}

                            <span className="relative z-10">{option}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
};
