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
      className={`theme-injected relative flex w-full flex-col items-center justify-center bg-transparent py-0 font-sans transition-all duration-500`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={spring}
        className="border-border bg-background relative z-10 grid w-full max-w-5xl grid-cols-1 rounded-2xl border-2 shadow-xl lg:grid-cols-[1.2fr_0.8fr]"
      >
        {/* LEFT CONTENT */}
        <div className="order-2 flex flex-col lg:order-1">
          <div className="bg-card m-1 flex h-full flex-col rounded-lg p-6 shadow-sm sm:p-8">
            <h1 className="text-foreground text-xl font-semibold sm:text-2xl">
              {title}
            </h1>
            <p className="text-muted-foreground mt-2 text-xs">{subtitle}</p>

            <div className="border-border my-4 border-t border-dashed" />

            {/* Focus Options */}
            <div className="grow">
              <p className="text-muted-foreground mb-3 text-xs font-medium tracking-tight">
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
                      className={`relative flex grow items-center justify-center gap-2 rounded-md border px-4 py-2 text-xs font-medium transition-all duration-200 sm:grow-0 sm:justify-start ${
                        active
                          ? 'bg-primary/10 border-primary/40 text-primary'
                          : 'bg-card border-border text-foreground/70 hover:border-border/80'
                      } `}
                    >
                      {active && (
                        <CheckCircle2
                          size={18}
                          fill="currentColor"
                          className="text-primary"
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
                <label className="text-muted-foreground text-xs font-medium">
                  Monthly revenue
                </label>
                <div className="relative mt-2" ref={revenueRef}>
                  <button
                    type="button"
                    onClick={() => setIsRevenueOpen(!isRevenueOpen)}
                    className="border-border bg-card text-foreground focus-visible:ring-ring relative h-10 w-full rounded-full border pr-12 pl-6 text-left text-sm whitespace-nowrap transition-all outline-none focus-visible:ring-1"
                  >
                    <span className="block truncate">
                      {revenue || 'Select revenue'}
                    </span>
                    <motion.div
                      animate={{ rotate: isRevenueOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1/2 right-5 flex -translate-y-1/2 items-center"
                    >
                      <ChevronDown
                        size={14}
                        className="text-muted-foreground"
                      />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isRevenueOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="bg-card border-border absolute z-[100] mt-1.5 w-full overflow-hidden rounded-xl border py-1 shadow-2xl"
                      >
                        {revenueOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              onRevenueChange(option);
                              setIsRevenueOpen(false);
                            }}
                            className="hover:bg-muted/50 group flex w-full items-center justify-between px-4 py-2.5 text-left text-[13px] transition-colors"
                          >
                            <span
                              className={
                                revenue === option
                                  ? 'text-foreground font-medium'
                                  : 'text-muted-foreground'
                              }
                            >
                              {option}
                            </span>
                            {revenue === option && (
                              <Check size={14} className="text-foreground" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div>
                <label className="text-muted-foreground text-xs font-medium">
                  Your role
                </label>
                <input
                  value={role}
                  onChange={(e) => onRoleChange(e.target.value)}
                  placeholder="e.g. Sales Manager"
                  className="border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-ring mt-2 h-10 w-full rounded-full border px-6 text-left text-sm transition-all outline-none focus-visible:ring-1"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 p-6 pt-4 sm:px-8 sm:pb-8">
            <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
              <span className="whitespace-nowrap">
                STEP {step} / {totalSteps}
              </span>
              <div className="ml-2 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-3 w-1 rounded-full transition-colors ${i < Math.ceil((step / totalSteps) * 5) ? 'bg-primary' : 'bg-border'}`}
                  />
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={spring}
              onClick={onContinue}
              className="xs:w-auto bg-foreground text-background h-9 w-full rounded-full px-6 text-sm font-medium shadow-lg transition-all active:shadow-sm sm:w-auto"
            >
              Continue
            </motion.button>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="relative order-1 h-48 overflow-hidden rounded-t-2xl sm:h-64 md:h-auto md:min-h-full lg:order-2 lg:rounded-t-none lg:rounded-r-2xl">
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