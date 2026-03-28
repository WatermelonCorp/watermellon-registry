import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronDown, Check } from 'lucide-react';

type FocusOption = {
  id: string;
  label: string;
};

interface OnboardingSetupProps {
  title: string;
  subtitle: string;
  focusOptions: FocusOption[];
  selectedFocus: string;
  onFocusChange: (id: string) => void;
  revenue: string;
  onRevenueChange: (value: string) => void;
  role: string;
  onRoleChange: (value: string) => void;
  step: number;
  totalSteps: number;
  onContinue: () => void;
  imageUrl: string;
}

const spring = {
  type: 'spring',
  stiffness: 320,
  damping: 30,
  mass: 0.7,
} as const;

export const OnboardingSetup: React.FC<OnboardingSetupProps> = ({
  title,
  subtitle,
  focusOptions,
  selectedFocus,
  onFocusChange,
  revenue,
  onRevenueChange,
  role,
  onRoleChange,
  step,
  totalSteps,
  onContinue,
  imageUrl,
}) => {
  const [isRevenueOpen, setIsRevenueOpen] = useState(false);
  const revenueRef = useRef<HTMLDivElement>(null);

  const revenueOptions = ['$100k – $200k', '$200k – $500k', '$500k+'];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        revenueRef.current &&
        !revenueRef.current.contains(event.target as Node)
      ) {
        setIsRevenueOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center bg-transparent py-0 transition-all duration-500`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={spring}
        className="relative z-10 grid w-full max-w-5xl grid-cols-1 rounded-[24px] border-2 border-[#EFEDF5] bg-[#F5F5F7] shadow-xl lg:grid-cols-[1.2fr_0.8fr] dark:border-[#1a1a1a] dark:bg-[#0A0A0A]"
      >
        {/* LEFT CONTENT */}
        <div className="inter order-2 flex flex-col lg:order-1">
          <div className="m-1.5 flex h-full flex-col rounded-[18px] bg-white p-5 shadow-sm sm:p-8 dark:bg-[#111]">
            <h1 className="text-[22px] font-medium text-[#111] sm:text-[24px] dark:text-[#EEE]">
              {title}
            </h1>
            <p className="mt-1 text-[12px] text-[#99999B] dark:text-[#666]">
              {subtitle}
            </p>

            <div className="my-5 border-t-[1.6px] border-dashed border-gray-200 dark:border-[#222]" />

            {/* Focus Options */}
            <div className="grow">
              <p className="mb-4 text-[13px] font-normal tracking-tight text-[#8F8E92]">
                Your main focus
              </p>

              <div className="flex flex-wrap gap-2">
                {focusOptions.map((option) => {
                  const active = option.id === selectedFocus;
                  return (
                    <motion.button
                      key={option.id}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onFocusChange(option.id)}
                      className={`relative flex grow items-center justify-center gap-2 rounded-xl border-[1.5px] px-4 py-2.5 text-[12px] font-medium transition-all duration-200 sm:grow-0 sm:justify-start ${
                        active
                          ? 'border-[#F87742]/40 bg-[#FFF0E9] text-[#F87742] dark:border-[#F87742]/50 dark:bg-[#2A1A14]'
                          : 'border-[#E5E7EB] bg-white text-[#4B5563] hover:border-[#D1D5DB] dark:border-[#222] dark:bg-[#111] dark:text-[#999] dark:hover:border-[#333]'
                      } `}
                    >
                      {active && (
                        <CheckCircle2
                          size={18}
                          fill="#FA692E"
                          className="text-white dark:text-[#2A1A14]"
                        />
                      )}
                      {option.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Revenue & Role Row */}
            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <label className="text-[13px] font-normal text-[#979799]">
                  Monthly revenue
                </label>
                <div className="relative mt-2" ref={revenueRef}>
                  <button
                    type="button"
                    onClick={() => setIsRevenueOpen(!isRevenueOpen)}
                    className="relative h-10 w-full rounded-full border border-[#EEEDF3] bg-white pr-12 pl-6 text-left text-[13px] whitespace-nowrap text-[#111] transition-all outline-none focus:ring-1 focus:ring-[#d6d5db] dark:border-[#222] dark:bg-[#111] dark:text-[#999] dark:focus:ring-[#333]"
                  >
                    <span className="block truncate">
                      {revenue || 'Select revenue'}
                    </span>
                    <motion.div
                      animate={{ rotate: isRevenueOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1/2 right-5 flex -translate-y-1/2 items-center"
                    >
                      <ChevronDown size={14} className="text-[#979799]" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isRevenueOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute z-[100] mt-1.5 w-full overflow-hidden rounded-xl border border-[#EEEDF3] bg-white py-1 shadow-2xl dark:border-[#222] dark:bg-[#111]"
                      >
                        {revenueOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              onRevenueChange(option);
                              setIsRevenueOpen(false);
                            }}
                            className="group flex w-full items-center justify-between px-4 py-2.5 text-left text-[13px] transition-colors hover:bg-[#F5F5F7] dark:hover:bg-[#1a1a1a]"
                          >
                            <span
                              className={
                                revenue === option
                                  ? 'font-medium text-[#111] dark:text-[#EEE]'
                                  : 'text-[#666] dark:text-[#999]'
                              }
                            >
                              {option}
                            </span>
                            {revenue === option && (
                              <Check
                                size={14}
                                className="text-[#111] dark:text-[#EEE]"
                              />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div>
                <label className="text-[13px] font-normal text-[#979799]">
                  Your role
                </label>
                <input
                  value={role}
                  onChange={(e) => onRoleChange(e.target.value)}
                  placeholder="e.g. Sales Manager"
                  className="mt-2 h-10 w-full rounded-full border border-[#EEEDF3] bg-white px-6 text-left text-[13px] text-[#111] transition-all outline-none placeholder:text-[#A2A2A4] focus:ring-1 focus:ring-[#d6d5db] dark:border-[#222] dark:bg-[#111] dark:text-[#EEE] dark:placeholder:text-[#444] dark:focus:ring-[#333]"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 p-5 pt-2 sm:px-8 sm:pb-8">
            <div className="flex items-center gap-2 text-[11px] font-medium text-[#8B8B8D]">
              <span className="whitespace-nowrap">
                STEP {step} / {totalSteps}
              </span>
              <div className="ml-2 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-4 w-1 rounded-full transition-colors ${i < Math.ceil((step / totalSteps) * 5) ? 'bg-[#ff6a32]' : 'bg-[#E5E5ED] dark:bg-[#222]'}`}
                  />
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={spring}
              onClick={onContinue}
              className="xs:w-auto h-10 w-full rounded-full bg-[#0F0F0F] px-8 text-[13px] font-medium text-[#D7D7D7] shadow-lg transition-all active:shadow-sm sm:w-auto dark:bg-[#EEE] dark:text-black"
            >
              Continue
            </motion.button>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="relative order-1 h-48 overflow-hidden rounded-t-[24px] sm:h-64 md:h-auto md:min-h-full lg:order-2 lg:rounded-t-none lg:rounded-r-[24px]">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={imageUrl}
              src={imageUrl}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={spring}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-black/5 dark:bg-black/20" />
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};