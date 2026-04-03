import { ArrowRight04Icon, PlusSignIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface LayeredProgressiveDisclosureProps {
  title?: string;
  configOptions?: { label: string; value: string | number }[];
  primaryFeatureName?: string;
  secondaryFeatureName?: string;
  asymmetricOptionsName?: string;
  tabs?: [string, string];
  onAddProperty?: () => void;
  onFeatureToggle?: (isActive: boolean) => void;
  onAsymmetricToggle?: (isActive: boolean) => void;
  onTabChange?: (tab: string) => void;
}

export default function LayeredProgressiveDisclosure({
  title = 'Configuration',
  configOptions = [
    { label: 'Width', value: '300' },
    { label: 'Height', value: '300' },
  ],
  primaryFeatureName = 'Visual Change',
  secondaryFeatureName = 'Transition',
  asymmetricOptionsName = 'Asymmetric',
  tabs = ['Insertion', 'Removal'],
  onAddProperty,
  onFeatureToggle,
  onAsymmetricToggle,
  onTabChange,
}: LayeredProgressiveDisclosureProps) {
  const [isAsymmetric, setIsAsymmetric] = useState(false);
  const [isTransition, setIsTransition] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  const handleFeatureToggle = () => {
    const newState = !isTransition;
    setIsTransition(newState);
    onFeatureToggle?.(newState);
  };

  const handleAsymmetricToggle = () => {
    const newState = !isAsymmetric;
    setIsAsymmetric(newState);
    onAsymmetricToggle?.(newState);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="theme-injected flex min-w-[300px] flex-col gap-3 rounded-3xl border border-border bg-card p-3 font-sans transition-colors duration-300">
      <p className="ml-2 font-sans font-semibold tracking-tight text-muted-foreground">
        {title}
      </p>
      <div className="flex w-full flex-col items-center gap-3 rounded-3xl border border-border bg-muted p-3 transition-colors duration-300">
        <div className="flex w-full items-center gap-12">
          {configOptions.slice(0, 2).map((option, idx) => (
            <div
              key={idx}
              className="flex w-full items-center justify-between gap-3 rounded-2xl border border-border bg-background px-4 py-3 transition-colors duration-300"
            >
              <p className="font-sans font-semibold tracking-tight text-muted-foreground">
                {option.label}
              </p>
              <p className="font-sans font-semibold tracking-tight text-muted-foreground">
                {option.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-3 rounded-3xl border border-border bg-muted p-1 transition-colors duration-300">
        <div className="flex w-full flex-col items-center p-3">
          <div
            onClick={handleFeatureToggle}
            className="relative z-30 flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border border-border bg-background px-4 py-3 transition-colors duration-300"
          >
            <div className="relative flex h-6 flex-1 items-center">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={isTransition ? secondaryFeatureName : primaryFeatureName}
                  className="absolute flex font-sans font-semibold tracking-tight text-foreground"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.02 },
                    },
                    exit: {
                      transition: { staggerChildren: 0.005 },
                    },
                  }}
                >
                  {(isTransition ? secondaryFeatureName : primaryFeatureName)
                    .split('')
                    .map((char, index) => (
                      <motion.span
                        key={index}
                        variants={{
                          hidden: { opacity: 0, y: 10, filter: 'blur(1px)' },
                          visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
                          exit: { opacity: 0, y: -10, filter: 'blur(1px)' },
                        }}
                        className="whitespace-pre"
                      >
                        {char}
                      </motion.span>
                    ))}
                </motion.div>
              </AnimatePresence>
            </div>
            <UnfoldMore />
          </div>

          <AnimatePresence>
            {isTransition && (
              <motion.div
                key="asymmetric-toggle-container"
                initial={{ height: 0, opacity: 0, filter: 'blur(4px)', y: -50 }}
                animate={{
                  height: 'auto',
                  opacity: 1,
                  filter: 'blur(0px)',
                  y: 0,
                }}
                exit={{ height: 0, opacity: 0, filter: 'blur(4px)', y: -50 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full overflow-hidden"
              >
                <div className="mt-3 flex w-full items-center justify-between gap-3 rounded-2xl border border-border bg-background px-4 py-3 transition-colors duration-300">
                  <p className="font-sans font-semibold tracking-tight text-foreground">
                    {asymmetricOptionsName}
                  </p>
                  <button
                    onClick={handleAsymmetricToggle}
                    className={`flex h-7 w-12 cursor-pointer rounded-full p-0.5 shadow-inner transition-colors duration-300 ease-in-out ${
                      isAsymmetric
                        ? 'bg-primary'
                        : 'bg-input'
                    }`}
                  >
                    <motion.div
                      layout
                      initial={{ x: 0 }}
                      animate={{ x: isAsymmetric ? 20 : 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="size-6 rounded-full bg-background shadow-sm"
                    />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex w-full flex-col items-center rounded-2xl border border-border bg-background p-3 transition-colors duration-300">
          <AnimatePresence>
            {isAsymmetric && (
              <motion.div
                key="asymmetric-tabs-container"
                initial={{ height: 0, opacity: 0, filter: 'blur(4px)', y: -50 }}
                animate={{
                  height: 'auto',
                  opacity: 1,
                  filter: 'blur(0px)',
                  y: 0,
                }}
                exit={{ height: 0, opacity: 0, filter: 'blur(4px)', y: -50 }}
                transition={{ type: 'spring', bounce: 0.45, duration: 0.8 }}
                className="w-full overflow-hidden"
              >
                <div className="relative z-20 mb-3 flex w-full items-center justify-between rounded-2xl border border-border bg-muted p-0.5 transition-colors duration-300">
                  <button
                    onClick={() => handleTabChange(tabs[0])}
                    className="relative z-10 w-full py-2 text-center font-sans font-semibold tracking-tight text-foreground"
                  >
                    {tabs[0]}
                    {activeTab === tabs[0] && (
                      <motion.span
                        layoutId="progressive-disclosure-tab"
                        className="absolute inset-0 -z-10 rounded-xl border border-border bg-background shadow-sm"
                        transition={{
                          type: 'spring',
                          bounce: 0.4,
                          duration: 0.5,
                        }}
                      />
                    )}
                  </button>
                  <button
                    onClick={() => handleTabChange(tabs[1])}
                    className="relative z-10 w-full py-2 text-center font-sans font-semibold tracking-tight text-foreground"
                  >
                    {tabs[1]}
                    {activeTab === tabs[1] && (
                      <motion.span
                        layoutId="progressive-disclosure-tab"
                        className="absolute inset-0 -z-10 rounded-xl border border-border bg-background shadow-sm"
                        transition={{
                          type: 'spring',
                          bounce: 0.4,
                          duration: 0.5,
                        }}
                      />
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mb-3 flex w-full items-center justify-between px-1">
            <p className="font-sans font-semibold tracking-tight text-muted-foreground">
              Opacity
            </p>
            <div className="flex h-full w-43.75 items-center justify-around rounded-2xl border border-border bg-muted px-5 py-2 transition-colors duration-300">
              <div className="relative flex h-6 w-6 items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.p
                    key={activeTab === tabs[0] ? '0' : '1'}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute font-sans font-semibold tracking-tight text-foreground"
                  >
                    {activeTab === tabs[0] ? '0' : '1'}
                  </motion.p>
                </AnimatePresence>
              </div>

              <HugeiconsIcon
                icon={ArrowRight04Icon}
                className="text-muted-foreground"
              />

              <div className="relative flex h-6 w-6 items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.p
                    key={activeTab === tabs[0] ? '1' : '0'}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute font-sans font-semibold tracking-tight text-foreground"
                  >
                    {activeTab === tabs[0] ? '1' : '0'}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mb-3 flex w-full items-center justify-between px-1">
            <p className="font-sans font-semibold tracking-tight text-muted-foreground">
              {' '}
              Blur
            </p>
            <div className="flex h-full w-43.75 items-center justify-around rounded-2xl border border-border bg-muted px-5 py-2 transition-colors duration-300">
              <div className="relative flex h-6 w-6 items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.p
                    key={activeTab === tabs[0] ? '16' : '0'}
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.2 }}
                    className="absolute font-sans font-semibold tracking-tight text-foreground"
                  >
                    {activeTab === tabs[0] ? '16' : '0'}
                  </motion.p>
                </AnimatePresence>
              </div>

              <HugeiconsIcon
                icon={ArrowRight04Icon}
                className="text-muted-foreground"
              />

              <div className="relative flex h-6 w-6 items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.p
                    key={activeTab === tabs[0] ? '0' : '16'}
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.2 }}
                    className="absolute font-sans font-semibold tracking-tight text-foreground"
                  >
                    {activeTab === tabs[0] ? '0' : '16'}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <button
            onClick={onAddProperty}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-center font-sans font-semibold tracking-tight text-primary-foreground transition-colors duration-300"
          >
            <HugeiconsIcon
              icon={PlusSignIcon}
              className="inline-block size-5"
            />{' '}
            Add Property
          </button>
        </div>
      </div>
    </div>
  );
}

const UnfoldMore = ({ onClick }: { onClick?: () => void }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-chevrons-up-down-icon lucide-chevrons-up-down cursor-pointer text-muted-foreground"
    >
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </svg>
  );
};
