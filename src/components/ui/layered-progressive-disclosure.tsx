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
    <div className="flex min-w-[350px] flex-col gap-3 rounded-3xl bg-neutral-100 p-3 transition-colors duration-300 dark:bg-neutral-900/50">
      <p className="ml-2 font-semibold tracking-tight text-neutral-500 dark:text-neutral-400">
        {title}
      </p>
      <div className="flex w-full flex-col items-center gap-3 rounded-3xl bg-neutral-200 p-3 transition-colors duration-300 dark:bg-neutral-900">
        <div className="flex w-full items-center gap-12">
          {configOptions.slice(0, 2).map((option, idx) => (
            <div
              key={idx}
              className="flex w-full items-center justify-between gap-3 rounded-2xl bg-neutral-100 px-4 py-3 transition-colors duration-300 dark:bg-neutral-800"
            >
              <p className="font-semibold tracking-tight text-neutral-500 dark:text-neutral-400">
                {option.label}
              </p>
              <p className="font-semibold tracking-tight text-neutral-500 dark:text-neutral-300">
                {option.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-3 rounded-3xl bg-neutral-200 p-1 transition-colors duration-300 dark:bg-neutral-900">
        <div className="flex w-full flex-col items-center p-3">
          <div
            onClick={handleFeatureToggle}
            className="relative z-30 flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl bg-neutral-100 px-4 py-3 transition-colors duration-300 dark:bg-neutral-800"
          >
            <div className="relative flex h-6 flex-1 items-center">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={isTransition ? secondaryFeatureName : primaryFeatureName}
                  className="absolute flex font-semibold tracking-tight text-neutral-700 dark:text-neutral-200"
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
                <div className="mt-3 flex w-full items-center justify-between gap-3 rounded-2xl bg-neutral-100 px-4 py-3 transition-colors duration-300 dark:bg-neutral-800">
                  <p className="font-semibold tracking-tight text-neutral-700 dark:text-neutral-200">
                    {asymmetricOptionsName}
                  </p>
                  <button
                    onClick={handleAsymmetricToggle}
                    className={`flex h-7 w-12 cursor-pointer rounded-full p-0.5 shadow-inner transition-colors duration-300 ease-in-out ${
                      isAsymmetric
                        ? 'bg-neutral-800 dark:bg-neutral-100'
                        : 'bg-neutral-300 dark:bg-neutral-600'
                    }`}
                  >
                    <motion.div
                      layout
                      initial={{ x: 0 }}
                      animate={{ x: isAsymmetric ? 20 : 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="size-6 rounded-full bg-white shadow-sm dark:bg-neutral-900"
                    />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex w-full flex-col items-center rounded-2xl bg-neutral-100 p-3 transition-colors duration-300 dark:bg-neutral-800">
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
                <div className="relative z-20 mb-3 flex w-full items-center justify-between rounded-2xl bg-neutral-200 p-0.5 transition-colors duration-300 dark:bg-neutral-900">
                  <button
                    onClick={() => handleTabChange(tabs[0])}
                    className="relative z-10 w-full py-2 text-center font-semibold tracking-tight text-neutral-700 dark:text-neutral-200"
                  >
                    {tabs[0]}
                    {activeTab === tabs[0] && (
                      <motion.span
                        layoutId="progressive-disclosure-tab"
                        className="absolute inset-0 -z-10 rounded-xl bg-neutral-100 shadow-sm dark:bg-neutral-800"
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
                    className="relative z-10 w-full py-2 text-center font-semibold tracking-tight text-neutral-700 dark:text-neutral-200"
                  >
                    {tabs[1]}
                    {activeTab === tabs[1] && (
                      <motion.span
                        layoutId="progressive-disclosure-tab"
                        className="absolute inset-0 -z-10 rounded-xl bg-neutral-100 shadow-sm dark:bg-neutral-800"
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
            <p className="font-semibold tracking-tight text-zinc-500 dark:text-zinc-400">
              Opacity
            </p>
            <div className="flex h-full w-[175px] items-center justify-around rounded-2xl bg-neutral-200 px-5 py-2 transition-colors duration-300 dark:bg-neutral-900">
              <div className="relative flex h-6 w-6 items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.p
                    key={activeTab === tabs[0] ? '0' : '1'}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute font-semibold tracking-tight text-neutral-700 dark:text-neutral-200"
                  >
                    {activeTab === tabs[0] ? '0' : '1'}
                  </motion.p>
                </AnimatePresence>
              </div>

              <HugeiconsIcon
                icon={ArrowRight04Icon}
                className="text-neutral-700 dark:text-neutral-400"
              />

              <div className="relative flex h-6 w-6 items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.p
                    key={activeTab === tabs[0] ? '1' : '0'}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute font-semibold tracking-tight text-neutral-700 dark:text-neutral-200"
                  >
                    {activeTab === tabs[0] ? '1' : '0'}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mb-3 flex w-full items-center justify-between px-1">
            <p className="font-semibold tracking-tight text-zinc-500 dark:text-zinc-400">
              {' '}
              Blur
            </p>
            <div className="flex h-full w-[175px] items-center justify-around rounded-2xl bg-neutral-200 px-5 py-2 transition-colors duration-300 dark:bg-neutral-900">
              <div className="relative flex h-6 w-6 items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.p
                    key={activeTab === tabs[0] ? '16' : '0'}
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.2 }}
                    className="absolute font-semibold tracking-tight text-neutral-700 dark:text-neutral-200"
                  >
                    {activeTab === tabs[0] ? '16' : '0'}
                  </motion.p>
                </AnimatePresence>
              </div>

              <HugeiconsIcon
                icon={ArrowRight04Icon}
                className="text-neutral-700 dark:text-neutral-400"
              />

              <div className="relative flex h-6 w-6 items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.p
                    key={activeTab === tabs[0] ? '0' : '16'}
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.2 }}
                    className="absolute font-semibold tracking-tight text-neutral-700 dark:text-neutral-200"
                  >
                    {activeTab === tabs[0] ? '0' : '16'}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <button
            onClick={onAddProperty}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-neutral-900 px-5 py-2.5 text-center font-semibold tracking-tight text-neutral-100 transition-colors duration-300 dark:bg-neutral-100 dark:text-neutral-900"
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
      className="lucide lucide-chevrons-up-down-icon lucide-chevrons-up-down cursor-pointer text-neutral-700 dark:text-neutral-400"
    >
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </svg>
  );
};
