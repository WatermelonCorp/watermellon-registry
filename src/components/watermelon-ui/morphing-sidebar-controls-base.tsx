import {
  ArrowLeft02Icon,
  ArrowRight04Icon,
  PlayIcon,
  PlusSignIcon,
  ZapIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface MorphingSidebarControlsProps {
  title?: string;
  configOptions?: { label: string; value: string | number }[];
  primaryFeatureName?: string;
  secondaryFeatureName?: string;
  asymmetricOptionsName?: string;
  tabs?: [string, string];
  types?: string[];
  easeOptions?: { icons: React.ReactNode; title: string }[];
  sliderConfigs?: {
    name: string;
    insertion: [string | number, string | number];
    removal: [string | number, string | number];
  }[];
  onAddProperty?: () => void;
  onFeatureToggle?: (isActive: boolean) => void;
  onAsymmetricToggle?: (isActive: boolean) => void;
  onTabChange?: (tab: string) => void;
  onTypeChange?: (type: string) => void;
  onEaseChange?: (easeTitle: string) => void;
}

export default function MorphingSidebarControls({
  title = 'Configuration',
  configOptions = [
    { label: 'Width', value: '300' },
    { label: 'Height', value: '300' },
  ],
  primaryFeatureName = 'Visual Change',
  secondaryFeatureName = 'Transition',
  asymmetricOptionsName = 'Asymmetric',
  tabs = ['Insertion', 'Removal'],
  types = ['Spring', 'Cubic'],
  easeOptions,
  sliderConfigs = [
    {
      name: 'Opacity',
      insertion: ['0', '1'],
      removal: ['1', '0'],
    },
    {
      name: 'Blur',
      insertion: ['16', '0'],
      removal: ['0', '16'],
    },
  ],
  onAddProperty,
  onFeatureToggle,
  onAsymmetricToggle,
  onTabChange,
  onTypeChange,
  onEaseChange,
}: MorphingSidebarControlsProps) {
  const [isAsymmetric, setIsAsymmetric] = useState(false);
  const [isTransition, setIsTransition] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const [activeType, setActiveType] = useState<string>(types[0]);
  const [activeEase, setActiveEase] = useState<string>('Smooth');
  const [isMotion, setIsMotion] = useState(false);

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

  const handleTypeChange = (type: string) => {
    setActiveType(type);
    onTypeChange?.(type);
  };

  const handleEaseChange = (easeTitle: string) => {
    setActiveEase(easeTitle);
    onEaseChange?.(easeTitle);
  };

  const resolvedEaseOptions = easeOptions || [
    { icons: <SmoothCurve />, title: 'Smooth' },
    { icons: <Bouncy />, title: 'Bouncy' },
    { icons: <Snappy />, title: 'Snappy' },
    { icons: <Custom />, title: 'Custom' },
  ];

  return (
    <div className="theme-injected flex w-[350px] flex-col gap-3 rounded-3xl border border-border bg-card p-3 font-sans transition-colors duration-300">
      <div className="flex w-full items-center justify-between gap-1 p-2">
        <div className="flex w-full items-center justify-between">
          <AnimatePresence mode="popLayout">
            {isMotion && (
              <motion.div
                layoutId="icon"
                key="left-button"
                initial={{ opacity: 0, rotate: 45, filter: 'blur(4px)' }}
                animate={{ opacity: 1, rotate: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, rotate: 45, filter: 'blur(4px)' }}
                transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                onClick={() => setIsMotion(!isMotion)}
                className="cursor-pointer rounded-full bg-primary p-2"
              >
                <HugeiconsIcon
                  icon={ArrowLeft02Icon}
                  className="size-4 rounded-full fill-primary-foreground text-primary-foreground"
                />
              </motion.div>
            )}

            {!isMotion && (
              <motion.p
                key="title"
                initial={{
                  opacity: 0,
                  filter: 'blur(4px)',
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  filter: 'blur(0px)',
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  filter: 'blur(4px)',
                  x: -20,
                }}
                transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                className="font-sans font-semibold tracking-tight text-muted-foreground"
              >
                {title}
              </motion.p>
            )}

            {isMotion && (
              <motion.p
                key="motion-text"
                initial={{
                  opacity: 0,
                  filter: 'blur(4px)',
                  x: 10,
                }}
                animate={{
                  opacity: 1,
                  filter: 'blur(0px)',
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  filter: 'blur(4px)',
                  x: 10,
                }}
                transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
                className="mr-24 font-sans font-semibold tracking-tight text-muted-foreground"
              >
                Motion
              </motion.p>
            )}

            {!isMotion && (
              <motion.div
                layoutId="icon"
                key="right-button"
                initial={{ opacity: 0, rotate: 45, filter: 'blur(4px)' }}
                animate={{ opacity: 1, rotate: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, rotate: 45, filter: 'blur(4px)' }}
                transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                onClick={() => setIsMotion(!isMotion)}
                className="cursor-pointer rounded-full bg-primary p-2"
              >
                <HugeiconsIcon
                  icon={ZapIcon}
                  className="size-4 rounded-full fill-primary-foreground text-primary-foreground"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="cursor-pointer rounded-full bg-primary p-2">
          <HugeiconsIcon
            icon={PlayIcon}
            className="size-4 rounded-full fill-primary-foreground text-primary-foreground"
          />
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {!isMotion && (
          <motion.div
            key="config-panel"
            initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 50, filter: 'blur(4px)' }}
            transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
            className="flex h-full w-full flex-col gap-3"
          >
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
                        key={
                          isTransition
                            ? secondaryFeatureName
                            : primaryFeatureName
                        }
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
                        {(isTransition
                          ? secondaryFeatureName
                          : primaryFeatureName
                        )
                          .split('')
                          .map((char, index) => (
                            <motion.span
                              key={index}
                              variants={{
                                hidden: {
                                  opacity: 0,
                                  y: 10,
                                  filter: 'blur(1px)',
                                },
                                visible: {
                                  opacity: 1,
                                  y: 0,
                                  filter: 'blur(0px)',
                                },
                                exit: {
                                  opacity: 0,
                                  y: -10,
                                  filter: 'blur(1px)',
                                },
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
                      initial={{
                        height: 0,
                        opacity: 0,
                        filter: 'blur(4px)',
                        y: -50,
                      }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                        filter: 'blur(0px)',
                        y: 0,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        filter: 'blur(4px)',
                        y: -50,
                      }}
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
                      initial={{
                        height: 0,
                        opacity: 0,
                        filter: 'blur(4px)',
                        y: -50,
                      }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                        filter: 'blur(0px)',
                        y: 0,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        filter: 'blur(4px)',
                        y: -50,
                      }}
                      transition={{
                        type: 'spring',
                        bounce: 0.45,
                        duration: 0.8,
                      }}
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

                {sliderConfigs.map((config, idx) => {
                  const val1 =
                    activeTab === tabs[0]
                      ? config.insertion[0]
                      : config.removal[0];
                  const val2 =
                    activeTab === tabs[0]
                      ? config.insertion[1]
                      : config.removal[1];

                  return (
                    <div
                      key={idx}
                      className="mb-3 flex w-full items-center justify-between px-1"
                    >
                      <p className="font-sans font-semibold tracking-tight text-muted-foreground">
                        {config.name}
                      </p>
                      <div className="flex h-full w-43.75 items-center justify-around rounded-2xl border border-border bg-muted px-5 py-2 transition-colors duration-300">
                        <div className="relative flex h-6 w-6 items-center justify-center">
                          <AnimatePresence mode="popLayout">
                            <motion.p
                              key={`${config.name}-left-${val1}`}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute font-sans font-semibold tracking-tight text-foreground"
                            >
                              {val1}
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
                              key={`${config.name}-right-${val2}`}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute font-sans font-semibold tracking-tight text-foreground"
                            >
                              {val2}
                            </motion.p>
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  );
                })}

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
          </motion.div>
        )}

        {isMotion && (
          <motion.div
            key="motion-panel"
            initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 50, filter: 'blur(4px)' }}
            transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
            className="flex h-full w-full flex-col items-center gap-3"
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key="asymmetric-tabs-container"
                initial={{
                  height: 0,
                  opacity: 0,
                  filter: 'blur(4px)',
                  y: -50,
                }}
                animate={{
                  height: 'auto',
                  opacity: 1,
                  filter: 'blur(0px)',
                  y: 0,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  filter: 'blur(4px)',
                  y: -50,
                }}
                transition={{ type: 'spring', bounce: 0.45, duration: 0.8 }}
                className="w-full overflow-hidden"
              >
                <div className="relative z-20 mb-3 flex w-full items-center justify-between rounded-2xl border border-border bg-muted p-0.5 transition-colors duration-300">
                  <button
                    onClick={() => handleTypeChange(types[0])}
                    className="relative z-10 w-full py-2 text-center font-sans font-semibold tracking-tight text-foreground"
                  >
                    {types[0]}
                    {activeType === types[0] && (
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
                    onClick={() => handleTypeChange(types[1])}
                    className="relative z-10 w-full py-2 text-center font-sans font-semibold tracking-tight text-foreground"
                  >
                    {types[1]}
                    {activeType === types[1] && (
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
            </AnimatePresence>
            <div className="grid w-full grid-cols-2 gap-2">
              {resolvedEaseOptions.map((item) => {
                const isActive = activeEase === item.title;
                return (
                  <div
                    key={item.title}
                    onClick={() => handleEaseChange(item.title)}
                    className={`group flex aspect-square w-full cursor-pointer flex-col items-center justify-between rounded-3xl p-4 transition-all duration-300 active:scale-[0.98] ${
                      isActive
                        ? 'border-[6px] border-border bg-background text-foreground shadow-sm'
                        : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    <div className="relative flex w-full flex-1 scale-[1.10] items-center justify-center p-2 transition-colors duration-300">
                      {item.icons}
                    </div>
                    <p
                      className={`w-full text-center font-semibold tracking-tight transition-colors duration-300 ${isActive ? 'text-[15px]' : 'text-sm'}`}
                    >
                      {item.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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

const SmoothCurve = () => {
  return (
    <svg
      viewBox="0 0 259 86"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-[110px] text-current"
    >
      <path
        d="M153.002 15.5012C104.002 22.5 127.002 69 74.5026 78.5015C28.0407 86.9103 6.00195 41.5015 6.00195 41.5015"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M207.502 16.1061C241.002 13.6062 253.002 56.1062 253.002 56.1062"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <circle cx="182.002" cy="18.5" r="18.5" fill="currentColor" />
    </svg>
  );
};

const Bouncy = () => {
  return (
    <svg
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-[80px] text-current"
    >
      <path
        d="M6 255.946C6 255.946 7.10863 157.446 76.3574 157.446C150.857 157.446 150.857 255.946 150.857 255.946"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M152.856 254.446C152.856 254.446 151.018 183.676 177.018 123.446"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M224.85 60.4463C246.228 45.3003 273.94 37.0901 309.858 40.9464"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <circle cx="192.857" cy="87.9463" r="26" fill="currentColor" />
    </svg>
  );
};

const Snappy = () => {
  return (
    <svg
      viewBox="0 0 316 164"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-[96px] text-current"
    >
      <circle cx="229.5" cy="90" r="33" fill="currentColor" />
      <path
        d="M54 93.5H181"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M106.5 120L192.5 120"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M81 66H185.5"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M147 41L210 41"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  );
};

const Custom = () => {
  return (
    <svg
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-[68px] text-current"
    >
      <circle cx="151.5" cy="164.5" r="62.5" fill="currentColor" />
      <path
        d="M152.373 169.767C155.282 168.181 156.354 164.536 154.767 161.627C153.181 158.718 149.536 157.646 146.627 159.233L149.5 164.5L152.373 169.767ZM97.1269 186.233L91.8595 189.106L97.6057 199.64L102.873 196.767L100 191.5L97.1269 186.233ZM149.5 164.5L146.627 159.233L97.1269 186.233L100 191.5L102.873 196.767L152.373 169.767L149.5 164.5Z"
        fill="white"
      />
      <circle cx="78.5" cy="201.5" r="11.5" fill="currentColor" />
      <circle cx="146.5" cy="83.5" r="11.5" fill="currentColor" />
      <circle cx="199.5" cy="99.5" r="11.5" fill="currentColor" />
      <circle cx="93.5" cy="99.5" r="11.5" fill="currentColor" />
      <circle cx="227.5" cy="150.5" r="11.5" fill="currentColor" />
      <circle cx="70.5" cy="150.5" r="11.5" fill="currentColor" />
      <circle cx="219.5" cy="201.5" r="11.5" fill="currentColor" />
    </svg>
  );
};
