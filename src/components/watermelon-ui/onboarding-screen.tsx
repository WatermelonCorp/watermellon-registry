'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Info, ImagePlus } from 'lucide-react';
import { HiBadgeCheck } from 'react-icons/hi';

interface OnboardingProps {
  title?: string;
  subtitle?: string;
  businessNameLabel?: string;
  businessNamePlaceholder?: string;
  legalNameLabel?: string;
  legalNamePlaceholder?: string;
  nextButtonText?: string;
  finishButtonText?: string;
  tooltipMainText?: string;
  tooltipSubText?: string;
  rightSectionDescription?: string;
  onComplete?: (data: { businessName: string; legalName: string }) => void;
}

export const OnboardingScreen: React.FC<OnboardingProps> = ({
  title = 'Business Details',
  subtitle = 'Tell us about your brand to start creating campaigns.',
  businessNameLabel = 'Business name',
  businessNamePlaceholder = 'Enter your name',
  legalNameLabel = 'Business Legal name',
  legalNamePlaceholder = 'Enter your business legal name',
  nextButtonText = 'Create business account',
  finishButtonText = 'Finish Setup',
  tooltipMainText = 'Click here to add your profile image.',
  tooltipSubText = 'You can always do this later.',
  rightSectionDescription = "With your creator profile ready, it's time to set up your business account.",
  onComplete,
}) => {
  const [businessName, setBusinessName] = useState('Acme Inc');
  const [legalName, setLegalName] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = 3;
  const spring = { type: 'spring', stiffness: 300, damping: 30 } as const;
  const progressSpring = {
    type: 'spring',
    stiffness: 100,
    damping: 20,
  } as const;

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
    else onComplete?.({ businessName, legalName });
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center bg-transparent transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={spring}
        className="flex w-full max-w-sm flex-col overflow-hidden rounded-[32px] border bg-white p-2 shadow-xl transition-colors duration-500 md:h-150 md:max-w-5xl md:flex-row dark:bg-[#0A0A0A]"
      >
        {/* Left Section */}
        <div className="flex flex-[1.2] flex-col justify-center rounded-[26px] border border-black/5 bg-[#FAFAFA] px-8 py-10 transition-colors duration-500 md:rounded-l-[26px] md:rounded-r-none md:border-r-0 md:px-16 dark:border-white/10 dark:bg-[#131313]">
          <div className="mx-auto w-full max-w-sm">
            <div className="mb-8 flex justify-center md:justify-start">
              <div className="rounded-xl bg-black/5 p-2 dark:bg-white/5">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-black dark:text-white"
                >
                  <path
                    d="M7 8H5C3.34315 8 2 9.34315 2 11V13C2 14.6569 3.34315 16 5 16H7M17 8H19C20.6569 8 22 9.34315 22 11V13C22 14.6569 20.6569 16 19 16H17M8 12H16"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <h1 className="mb-2 text-2xl font-semibold tracking-tight text-[#1A1A1A] transition-colors dark:text-[#d8d8d8]">
              {title}
            </h1>
            <p className="mb-8 text-sm text-gray-500 transition-colors dark:text-gray-400">
              {subtitle}
            </p>

            {/* Stepper */}
            <div className="mb-10 flex gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="relative h-1 flex-1 overflow-hidden rounded-full bg-black/5 dark:bg-white/10"
                >
                  <motion.div
                    animate={{ width: i <= currentStep ? '100%' : '0%' }}
                    transition={progressSpring}
                    className="absolute top-0 left-0 h-full bg-emerald-400"
                  />
                </div>
              ))}
            </div>

            <div className="mb-10 space-y-6 text-left">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-semibold tracking-wider whitespace-nowrap text-[#808080] uppercase transition-colors dark:text-[#6C6C6C]">
                  {businessNameLabel} <Info size={14} className="opacity-50" />
                </label>
                <input
                  placeholder={businessNamePlaceholder}
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full rounded-2xl border-[1.5px] border-black/20 bg-white px-5 py-3.5 text-sm text-black transition-all outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-[#1D1D1D] dark:bg-[#121212] dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-semibold tracking-wider whitespace-nowrap text-[#808080] uppercase transition-colors dark:text-[#6C6C6C]">
                  {legalNameLabel} <Info size={14} className="opacity-50" />
                </label>
                <input
                  placeholder={legalNamePlaceholder}
                  value={legalName}
                  onChange={(e) => setLegalName(e.target.value)}
                  className="w-full rounded-2xl border-[1.5px] border-black/20 bg-white px-5 py-3.5 text-sm text-black transition-all outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-[#1D1D1D] dark:bg-[#121212] dark:text-white"
                />
              </div>
            </div>

            <div className="flex flex-nowrap items-center gap-2 md:gap-4">
              <motion.button
                onClick={handleBack}
                whileTap={{ scale: 0.95 }}
                className="shrink-0 rounded-2xl border border-black/10 bg-white p-4 text-[#666666] transition-colors dark:border-[#282828] dark:bg-[#121212] dark:text-[#999999]"
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button
                onClick={handleNext}
                whileTap={{ scale: 0.98 }}
                className="flex min-w-fit flex-1 items-center justify-center rounded-2xl bg-[#1A1A1A] px-8 py-4 text-sm font-bold whitespace-nowrap text-white shadow-xl transition-colors dark:bg-[#EDEDED] dark:text-[#101010]"
              >
                {currentStep === totalSteps ? finishButtonText : nextButtonText}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative hidden flex-1 flex-col items-center justify-center rounded-[26px] border border-black/5 bg-[#F4F4F4] p-12 transition-colors duration-500 md:flex md:rounded-l-none md:rounded-r-[26px] md:border-l-0 dark:border-white/5 dark:bg-[#1C1C1C]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-10 -mb-5 rounded-2xl border border-[#E5E5E5] bg-white px-4 py-2 text-center text-xs font-medium whitespace-nowrap text-black shadow-lg transition-colors dark:border-[#2D2D2D] dark:bg-[#2B292E] dark:text-white"
          >
            <p>{tooltipMainText}</p>
            <p className="text-[10px] font-normal whitespace-nowrap opacity-60">
              {tooltipSubText}
            </p>
          </motion.div>

          <motion.div
            layout
            className="relative my-8 flex aspect-square w-full max-w-72 flex-col items-center justify-center rounded-[32px] border-2 border-[#E5E5E5] bg-white p-8 shadow-sm transition-all dark:border-[#303030] dark:bg-zinc-900/50"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 shadow-inner dark:bg-zinc-800">
              <ImagePlus size={24} strokeWidth={1.5} />
            </div>

            <div className="mb-6 flex items-center gap-2 whitespace-nowrap">
              <span className="text-sm font-bold text-[#1A1A1A] transition-colors dark:text-white">
                {businessName || 'Your Brand'}
              </span>
              <HiBadgeCheck size={18} className="shrink-0 text-orange-400" />
            </div>

            <div className="w-full space-y-2 opacity-20">
              <div className="h-1.5 w-full rounded-full bg-black dark:bg-white" />
              <div className="mx-auto h-1.5 w-2/3 rounded-full bg-black dark:bg-white" />
            </div>
          </motion.div>

          <p className="max-w-64 text-center text-xs leading-relaxed text-gray-500 transition-colors dark:text-gray-400">
            {rightSectionDescription}
          </p>
        </div>
      </motion.div>
    </div>
  );
};