'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { Check, ChevronRight } from 'lucide-react';

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

const smoothSpring = {
  type: 'spring',
  bounce: 0.3,
  duration: 0.7,
} as const;

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
        className={`theme-injected flex w-full items-center justify-center p-4 antialiased select-none ${className}`}
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              layoutId="container"
              initial={{ filter: 'blur(4px)', opacity: 0 }}
              animate={{ filter: 'blur(0px)', opacity: 1 }}
              exit={{ filter: 'blur(4px)', opacity: 0 }}
              onClick={handleOpen}
              transition={smoothSpring}
              className="bg-muted border-border flex min-h-14 w-full max-w-md cursor-pointer items-center justify-between rounded-lg border p-1 pl-4 sm:pl-6"
            >
              <motion.span
                layout
                className="text-muted-foreground text-base font-bold sm:text-lg"
              >
                Frequency
              </motion.span>

              <motion.div
                layoutId="trigger-pill"
                transition={smoothSpring}
                className="border-border bg-background flex min-h-12 flex-1 items-center justify-between gap-2 rounded-lg border px-3 py-1.5 shadow-sm sm:flex-initial sm:gap-3 sm:px-4"
              >
                <span className="text-foreground text-base font-bold sm:text-lg">
                  {value.type}
                  {value.subValue ? `, ${value.subValue}` : ''}
                </span>

                <ChevronRight size={18} className="text-muted-foreground shrink-0" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              layoutId="container"
              initial={{ filter: 'blur(4px)', opacity: 0 }}
              animate={{ filter: 'blur(0px)', opacity: 1 }}
              exit={{ filter: 'blur(4px)', opacity: 0 }}
              transition={smoothSpring}
              className="border-border bg-muted flex w-full max-w-lg flex-col gap-3 rounded-lg border p-2 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  layoutId="trigger-pill"
                  transition={smoothSpring}
                  className="custom-scrollbar bg-background relative flex h-11 flex-1 items-center gap-2 overflow-x-auto rounded-lg p-1 shadow-inner sm:h-13 sm:gap-2"
                >
                  {FREQUENCIES.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setTempType(type);
                        setTempSubValue(SUB_OPTIONS[type][0]);
                      }}
                      className="text-foreground relative flex h-full flex-none items-center justify-center px-4 text-xs font-bold sm:flex-1 sm:min-w-fit sm:px-6 sm:text-[15px]"
                    >
                      {tempType === type && (
                        <motion.div
                          layoutId="active-tab"
                          transition={smoothSpring}
                          className="bg-muted border-border  absolute inset-0 z-0 rounded-lg border"
                        />
                      )}

                      <span className="relative z-10">{type}</span>
                    </button>
                  ))}
                </motion.div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleConfirm}
                  className="bg-foreground text-background flex h-10 w-10 items-center justify-center rounded-lg sm:h-12 sm:w-12"
                >
                  <Check size={18} />
                </motion.button>
              </div>

              <AnimatePresence mode="wait">
                {SUB_OPTIONS[tempType].length > 0 && (
                  <motion.div
                    layout
                    transition={smoothSpring}
                    className="overflow-hidden"
                  >
                    <motion.div
                      key={tempType}
                      layout
                      transition={smoothSpring}
                      className={`bg-background grid gap-2 rounded-lg p-3 shadow-inner ${
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
                          className="text-foreground relative flex h-8 items-center justify-center rounded-lg text-[10px] font-bold sm:h-9 sm:text-sm"
                        >
                          {tempSubValue === option && (
                            <motion.div
                              layoutId="active-sub"
                              transition={smoothSpring}
                              className="bg-muted border-border absolute inset-0 z-0 rounded-lg border"
                            />
                          )}

                          <span className="relative z-10">{option}</span>
                        </button>
                      ))}
                    </motion.div>
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
