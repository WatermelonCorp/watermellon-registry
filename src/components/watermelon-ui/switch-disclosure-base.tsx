import React, { useState } from 'react';
import {
  motion,
  AnimatePresence,
  type Transition,
  MotionConfig,
} from 'motion/react';
import { Check } from 'lucide-react';
import { RiBubbleChartFill } from 'react-icons/ri';

interface SwitchDisclosureProps {
  title?: string;
  subOptionLabel?: string;
  defaultEnabled?: boolean;
  defaultSubOptionChecked?: boolean;
  onToggleChange?: (enabled: boolean) => void;
  onSubOptionChange?: (checked: boolean) => void;
}

const springConfig: Transition = {
  type: 'spring',
  stiffness: 800,
  damping: 80,
  mass: 5,
};
export const SwitchDisclosure: React.FC<SwitchDisclosureProps> = ({
  title = 'Predictive Completion',
  subOptionLabel = 'Enable Inline Suggestions',
  defaultEnabled = false,
  defaultSubOptionChecked = false,
  onToggleChange,
  onSubOptionChange,
}) => {
  const [isEnabled, setIsEnabled] = useState(defaultEnabled);
  const [isSubOptionChecked, setIsSubOptionChecked] = useState(
    defaultSubOptionChecked,
  );

  const handleToggle = () => {
    const next = !isEnabled;
    setIsEnabled(next);
    onToggleChange?.(next);
  };

  const handleSubOptionToggle = () => {
    const next = !isSubOptionChecked;
    setIsSubOptionChecked(next);
    onSubOptionChange?.(next);
  };

  return (
    <MotionConfig transition={springConfig}>
      <motion.div
        layout
        initial={false}
        style={{ fontFamily: 'var(--font-sans)' }}
        className={`theme-injected w-80 sm:w-96 overflow-hidden rounded-3xl p-1 transition-colors duration-300 will-change-transform ${
          isEnabled
            ? 'border border-border bg-card text-card-foreground shadow-sm'
            : 'border border-transparent bg-transparent text-foreground shadow-none'
        }`}
      >
        <div className="flex flex-col">
          <motion.div
            layout
            className="flex cursor-pointer items-center justify-between rounded-3xl border border-border bg-muted/40 p-3 shadow-xs"
            onClick={handleToggle}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full p-2 text-muted-foreground transition-colors">
                <RiBubbleChartFill size={24} />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                {title}
              </span>
            </div>

            <div
              className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${
                isEnabled ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <motion.div
                transition={springConfig}
                className="absolute top-1 left-1 h-5 w-5 rounded-full bg-background shadow-sm"
                animate={{ x: isEnabled ? 20 : 0 }}
              />
            </div>
          </motion.div>

          <AnimatePresence mode="popLayout" initial={false}>
            {isEnabled && (
              <motion.div className="flex gap-4" layout>
                <motion.div
                  initial={{ y: 10, opacity: 0, scale: 1.1 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  className="group flex cursor-pointer items-center gap-3 p-4"
                  onClick={handleSubOptionToggle}
                >
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-lg border-2 transition-all ${
                      isSubOptionChecked
                        ? 'border-foreground bg-foreground'
                        : 'border-border bg-background group-hover:border-ring/40'
                    }`}
                  >
                    <AnimatePresence>
                      {isSubOptionChecked && (
                        <motion.div
                          initial={{
                            scale: 1.2,
                            opacity: 0,
                            filter: 'blur(4px)',
                          }}
                          animate={{
                            scale: 1,
                            opacity: 1,
                            filter: 'blur(0px)',
                          }}
                          exit={{ scale: 0.5, opacity: 0, filter: 'blur(4px)' }}
                          whileTap={{ scale: 1.01 }}
                        >
                          <Check
                            size={14}
                            className="text-background"
                            strokeWidth={4}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <span className="text-base sm:text-lg font-semibold text-muted-foreground transition-colors group-hover:text-foreground">
                    {subOptionLabel}
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </MotionConfig>
  );
};
