import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { HiBadgeCheck } from 'react-icons/hi';
import { IoCloseSharp } from 'react-icons/io5';
import { FaInbox, FaMoon, FaSun } from 'react-icons/fa6';
import { RiBubbleChartFill } from 'react-icons/ri';
import { BsFileTextFill, BsSendFill, BsTagFill } from 'react-icons/bs';
import { TbClockHour12Filled } from 'react-icons/tb';

/*  DEFAULT DATA  */

const DEFAULT_STEPS = [
  { id: 1, label: "Importing Survey Data", icon: FaInbox },
  { id: 2, label: "Refining Responses", icon: RiBubbleChartFill },
  { id: 3, label: "Labelling Responses", icon: BsTagFill },
  { id: 4, label: "Analyzing Sentiment", icon: TbClockHour12Filled },
  { id: 5, label: "Creating Reports", icon: BsFileTextFill },
  { id: 6, label: "Sharing Survey Report", icon: BsSendFill },
];

/*  TYPES  */

type StepItem = {
  id: number;
  label: string;
  icon: React.ComponentType<any>;
};

type RunActionButtonProps = {
  steps?: StepItem[];
};

/*  COMPONENT  */

export  function RunActionButton({
  steps = DEFAULT_STEPS, 
}: RunActionButtonProps) {
  const [status, setStatus] = useState<'idle' | 'running' | 'done'>('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const [isDark, setIsDark] = useState(false);

  const startAction = () => {
    setStatus('running');
    setCurrentStep(0);
  };

  const reset = () => {
    setStatus('idle');
    setCurrentStep(0);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (status === 'running') {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) return prev + 1;
          setStatus('done');
          return prev;
        });
      }, 1200);
    }

    return () => clearInterval(interval);
  }, [status, steps.length]);

  return (
    <div className={isDark ? 'invert hue-rotate-180' : ''}>
      <div className="relative flex items-center justify-center min-h-screen bg-white">

        {/*  Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center border bg-white shadow-sm z-20"
          title="Toggle theme"
        >
          {isDark ? <FaSun /> : <FaMoon />}
        </button>

        <motion.div layout className="relative flex items-center justify-center">
          <AnimatePresence mode="wait">

            {status === 'idle' && (
              <motion.button
                key="idle"
                layoutId="button-container"
                onClick={startAction}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-2 px-6 py-4 bg-[#F4F4F9] hover:bg-[#eaeaef] rounded-full transition-colors"
              >
                <Zap className="w-7 h-7 fill-current text-[#26262B]" />
                <span className="font-bold text-[18px] text-[#26262B]">
                  Run Action
                </span>
              </motion.button>
            )}

            {status === 'running' && (
              <motion.div
                key="running"
                layoutId="button-container"
                initial={{ width: 160 }}
                animate={{ width: 340 }}
                className="relative flex items-center h-[64px] px-2 bg-white rounded-full overflow-hidden"
              >
                {/* Dashed Border */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 340 64"
                  preserveAspectRatio="none"
                >
                  <rect
                    x="1.5"
                    y="1.5"
                    width="337"
                    height="61"
                    rx="32"
                    ry="32"
                    fill="none"
                    stroke="#D6D6DD"
                    strokeWidth="3"
                    strokeDasharray="8 8"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-32"
                      dur="1.2s"
                      repeatCount="indefinite"
                    />
                  </rect>
                </svg>

                {/* Icon */}
                <div className="absolute left-4 flex items-center justify-center w-12 h-12 rounded-xl z-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {React.createElement(steps[currentStep].icon, {
                        className: "w-7 h-7 text-[#28272A]",
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Text */}
                <div className="flex-1 ml-4 pl-12 pr-10 z-10">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentStep}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="block font-bold text-[18px] text-[#28272A] whitespace-nowrap"
                    >
                      {steps[currentStep].label}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Cancel */}
                <button
                  title="close"
                  onClick={reset}
                  className="absolute right-4 p-1.5 bg-[#D6D5E2] hover:bg-[#c3c2cd] rounded-full transition-colors z-10"
                >
                  <IoCloseSharp
                    className="w-[20px] h-[20px] text-[#fefefe]"
                    strokeWidth={4}
                  />
                </button>
              </motion.div>
            )}

            {status === 'done' && (
              <motion.button
                key="done"
                layoutId="button-container"
                onClick={reset}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-6 py-4 bg-[#EAF9EA] rounded-full"
              >
                <HiBadgeCheck className="w-7 h-7 text-[#22c55e]" />
                <span className="font-bold text-[18px] text-[#22c55e]">
                  Action Done
                </span>
              </motion.button>
            )}

          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}