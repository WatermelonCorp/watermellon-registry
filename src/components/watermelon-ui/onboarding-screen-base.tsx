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
    <div
      className="theme-injected text-foreground flex min-h-full w-full flex-col items-center justify-center bg-transparent font-sans transition-colors duration-500"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={spring}
        className="bg-card text-card-foreground border-border flex w-full max-w-sm flex-col overflow-hidden rounded-3xl border p-2 shadow-lg transition-colors duration-500 md:max-w-5xl md:flex-row"
      >
        {/* Left Section */}
        <div className="bg-muted/30 border-border md:border-r-border flex flex-[1.2] flex-col justify-center rounded-2xl border px-8 py-10 transition-colors duration-500 md:rounded-l-2xl md:rounded-r-none md:border-r md:px-16">
          <div className="mx-auto w-full max-w-sm">
            <div className="mb-8 flex justify-center md:justify-start">
              <div className="bg-muted rounded-xl p-2">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-foreground"
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

            <h1 className="text-foreground mb-2 text-2xl font-semibold tracking-tight transition-colors">
              {title}
            </h1>
            <p className="text-muted-foreground mb-8 text-sm transition-colors">
              {subtitle}
            </p>

            {/* Stepper */}
            <div className="mb-10 flex gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-muted relative h-1 flex-1 overflow-hidden rounded-full"
                >
                  <motion.div
                    animate={{ width: i <= currentStep ? '100%' : '0%' }}
                    transition={progressSpring}
                    className="bg-primary absolute top-0 left-0 h-full"
                  />
                </div>
              ))}
            </div>

            <div className="mb-10 space-y-6 text-left">
              <div className="space-y-2">
                <label className="text-muted-foreground flex items-center gap-2 text-xs font-semibold tracking-wider whitespace-nowrap uppercase transition-colors">
                  {businessNameLabel} <Info size={14} className="opacity-50" />
                </label>
                <input
                  placeholder={businessNamePlaceholder}
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="bg-background border-border text-foreground focus:ring-ring/30 w-full rounded-xl border px-5 py-3 text-sm transition-all outline-none focus:ring-2"
                />
              </div>

              <div className="space-y-2">
                <label className="text-muted-foreground flex items-center gap-2 text-xs font-semibold tracking-wider whitespace-nowrap uppercase transition-colors">
                  {legalNameLabel} <Info size={14} className="opacity-50" />
                </label>
                <input
                  placeholder={legalNamePlaceholder}
                  value={legalName}
                  onChange={(e) => setLegalName(e.target.value)}
                  className="bg-background border-border text-foreground focus:ring-ring/30 w-full rounded-xl border px-5 py-3 text-sm transition-all outline-none focus:ring-2"
                />
              </div>
            </div>

            <div className="flex flex-nowrap items-center gap-2 md:gap-4">
              <motion.button
                onClick={handleBack}
                whileTap={{ scale: 0.95 }}
                className="bg-background border-border text-muted-foreground shrink-0 rounded-xl border p-4 transition-colors"
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button
                onClick={handleNext}
                whileTap={{ scale: 0.98 }}
                className="bg-primary text-primary-foreground flex min-w-fit flex-1 items-center justify-center rounded-xl px-8 py-4 text-sm font-bold whitespace-nowrap shadow-md transition-colors"
              >
                {currentStep === totalSteps ? finishButtonText : nextButtonText}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-muted/40 border-border relative hidden flex-1 flex-col items-center justify-center rounded-r-2xl border p-12 transition-colors duration-500 md:flex md:rounded-l-none md:border-l-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border-border text-foreground z-10 -mb-5 rounded-xl border px-4 py-2 text-center text-xs font-medium whitespace-nowrap shadow-md transition-colors"
          >
            <p>{tooltipMainText}</p>
            <p className="text-xs font-normal whitespace-nowrap opacity-60">
              {tooltipSubText}
            </p>
          </motion.div>

          <motion.div
            layout
            className="border-border bg-card relative my-8 flex aspect-square w-full max-w-72 flex-col items-center justify-center rounded-3xl border-2 p-8 shadow-sm transition-all"
          >
            <div className="bg-muted text-muted-foreground mb-6 flex h-16 w-16 items-center justify-center rounded-xl shadow-inner">
              <ImagePlus size={24} strokeWidth={1.5} />
            </div>

            <div className="mb-6 flex items-center gap-2 whitespace-nowrap">
              <span className="text-foreground text-sm font-bold transition-colors">
                {businessName || 'Your Brand'}
              </span>
              <HiBadgeCheck size={18} className="text-primary shrink-0" />
            </div>

            <div className="w-full space-y-2 opacity-20">
              <div className="bg-foreground h-1.5 w-full rounded-full" />
              <div className="bg-foreground mx-auto h-1.5 w-2/3 rounded-full" />
            </div>
          </motion.div>

          <p className="text-muted-foreground max-w-xs text-center text-xs leading-relaxed transition-colors">
            {rightSectionDescription}
          </p>
        </div>
      </motion.div>
    </div>
  );
};