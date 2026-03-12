import {
  ArrowLeft02Icon,
  ArrowRight04Icon,
  PlayIcon,
  PlusSignIcon,
  ZapIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

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
  title = "Configuration",
  configOptions = [
    { label: "Width", value: "300" },
    { label: "Height", value: "300" },
  ],
  primaryFeatureName = "Visual Change",
  secondaryFeatureName = "Transition",
  asymmetricOptionsName = "Asymmetric",
  tabs = ["Insertion", "Removal"],
  types = ["Spring", "Cubic"],
  easeOptions,
  sliderConfigs = [
    {
      name: "Opacity",
      insertion: ["0", "1"],
      removal: ["1", "0"],
    },
    {
      name: "Blur",
      insertion: ["16", "0"],
      removal: ["0", "16"],
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
  const [activeEase, setActiveEase] = useState<string>("Smooth");
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
    { icons: <SmoothCurve />, title: "Smooth" },
    { icons: <Bouncy />, title: "Bouncy" },
    { icons: <Snappy />, title: "Snappy" },
    { icons: <Custom />, title: "Custom" },
  ];

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900/50 rounded-3xl p-3 w-[350px] flex flex-col gap-3 transition-colors duration-300">
      <div className="w-full p-2 flex items-center justify-between gap-1">
        <div className="w-full flex items-center justify-between">
          <AnimatePresence mode="popLayout">
            {isMotion && (
              <motion.div
                layoutId="icon"
                key="icon"
                initial={{ opacity: 0, rotate: 45, filter: "blur(4px)" }}
                animate={{ opacity: 1, rotate: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, rotate: 45, filter: "blur(4px)" }}
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                onClick={() => setIsMotion(!isMotion)}
                className="p-2 bg-neutral-900 rounded-full cursor-pointer"
              >
                <HugeiconsIcon
                  icon={ArrowLeft02Icon}
                  className="size-4 rounded-full text-neutral-100 fill-neutral-50"
                />
              </motion.div>
            )}

            {!isMotion && (
              <motion.p
                initial={{
                  opacity: 0,
                  filter: "blur(4px)",
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  filter: "blur(4px)",
                  x: -20,
                }}
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                className="text-neutral-1000 dark:text-neutral-400 font-semibold tracking-tight"
              >
                {title}
              </motion.p>
            )}

            {isMotion && (
              <motion.p
                initial={{
                  opacity: 0,
                  filter: "blur(4px)",
                  x: 10,
                }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  filter: "blur(4px)",
                  x: 10,
                }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                className="text-neutral-1000 dark:text-neutral-400 font-semibold tracking-tight mr-24"
              >
                Motion
              </motion.p>
            )}

            {!isMotion && (
              <motion.div
                layoutId="icon"
                key="icon"
                initial={{ opacity: 0, rotate: 45, filter: "blur(4px)" }}
                animate={{ opacity: 1, rotate: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, rotate: 45, filter: "blur(4px)" }}
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                onClick={() => setIsMotion(!isMotion)}
                className="p-2 bg-neutral-900 rounded-full cursor-pointer"
              >
                <HugeiconsIcon
                  icon={ZapIcon}
                  className="size-4 rounded-full text-neutral-100 fill-neutral-50 "
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="p-2 bg-neutral-900 rounded-full cursor-pointer">
          <HugeiconsIcon
            icon={PlayIcon}
            className="size-4 rounded-full text-neutral-100 fill-neutral-50"
          />
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {!isMotion && (
          <motion.div
            key="config-panel"
            initial={{ opacity: 0, y: 50, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 50, filter: "blur(4px)" }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
            className="w-full h-full flex flex-col gap-3"
          >
            <div className="w-full p-3 flex flex-col items-center gap-3 bg-neutral-200 dark:bg-neutral-900 rounded-3xl transition-colors duration-300">
              <div className="flex w-full items-center gap-12">
                {configOptions.slice(0, 2).map((option, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-3 w-full bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-between gap-3 transition-colors duration-300"
                  >
                    <p className="text-neutral-1000 dark:text-neutral-400 font-semibold tracking-tight">
                      {option.label}
                    </p>
                    <p className="text-neutral-1000 dark:text-neutral-300 font-semibold tracking-tight">
                      {option.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full flex flex-col items-center gap-3 bg-neutral-200 dark:bg-neutral-900 rounded-3xl p-1 transition-colors duration-300">
              <div className="w-full flex flex-col items-center p-3">
                <div
                  onClick={handleFeatureToggle}
                  className="w-full px-4 py-3 bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-between gap-3 relative z-30 cursor-pointer transition-colors duration-300"
                >
                  <div className="relative h-6 flex-1 flex items-center">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={
                          isTransition
                            ? secondaryFeatureName
                            : primaryFeatureName
                        }
                        className="absolute flex text-neutral-700 dark:text-neutral-200 font-semibold tracking-tight"
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
                          .split("")
                          .map((char, index) => (
                            <motion.span
                              key={index}
                              variants={{
                                hidden: {
                                  opacity: 0,
                                  y: 10,
                                  filter: "blur(1px)",
                                },
                                visible: {
                                  opacity: 1,
                                  y: 0,
                                  filter: "blur(0px)",
                                },
                                exit: {
                                  opacity: 0,
                                  y: -10,
                                  filter: "blur(1px)",
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
                        filter: "blur(4px)",
                        y: -50,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        filter: "blur(0px)",
                        y: 0,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        filter: "blur(4px)",
                        y: -50,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="w-full overflow-hidden"
                    >
                      <div className="w-full px-4 py-3 bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-between gap-3 mt-3 transition-colors duration-300">
                        <p className="text-neutral-700 dark:text-neutral-200 font-semibold tracking-tight">
                          {asymmetricOptionsName}
                        </p>
                        <button
                          onClick={handleAsymmetricToggle}
                          className={`flex w-12 h-7 p-0.5 rounded-full transition-colors duration-300 ease-in-out cursor-pointer shadow-inner ${
                            isAsymmetric
                              ? "bg-neutral-800 dark:bg-neutral-100"
                              : "bg-neutral-300 dark:bg-neutral-600"
                          }`}
                        >
                          <motion.div
                            layout
                            initial={{ x: 0 }}
                            animate={{ x: isAsymmetric ? 20 : 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="size-6 bg-white dark:bg-neutral-900 rounded-full shadow-sm"
                          />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-full rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex flex-col items-center p-3 transition-colors duration-300">
                <AnimatePresence>
                  {isAsymmetric && (
                    <motion.div
                      key="asymmetric-tabs-container"
                      initial={{
                        height: 0,
                        opacity: 0,
                        filter: "blur(4px)",
                        y: -50,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        filter: "blur(0px)",
                        y: 0,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        filter: "blur(4px)",
                        y: -50,
                      }}
                      transition={{
                        type: "spring",
                        bounce: 0.45,
                        duration: 0.8,
                      }}
                      className="w-full overflow-hidden"
                    >
                      <div className="p-0.5 bg-neutral-200 dark:bg-neutral-900 rounded-2xl w-full flex items-center justify-between relative z-20 mb-3 transition-colors duration-300">
                        <button
                          onClick={() => handleTabChange(tabs[0])}
                          className="relative text-neutral-700 dark:text-neutral-200 font-semibold tracking-tight py-2 w-full text-center z-10"
                        >
                          {tabs[0]}
                          {activeTab === tabs[0] && (
                            <motion.span
                              layoutId="progressive-disclosure-tab"
                              className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-xl -z-10 shadow-sm"
                              transition={{
                                type: "spring",
                                bounce: 0.4,
                                duration: 0.5,
                              }}
                            />
                          )}
                        </button>
                        <button
                          onClick={() => handleTabChange(tabs[1])}
                          className="relative text-neutral-700 dark:text-neutral-200 font-semibold tracking-tight py-2 w-full text-center z-10"
                        >
                          {tabs[1]}
                          {activeTab === tabs[1] && (
                            <motion.span
                              layoutId="progressive-disclosure-tab"
                              className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-xl -z-10 shadow-sm"
                              transition={{
                                type: "spring",
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
                  const val1 = activeTab === tabs[0] ? config.insertion[0] : config.removal[0];
                  const val2 = activeTab === tabs[0] ? config.insertion[1] : config.removal[1];
                  
                  return (
                    <div key={idx} className="flex justify-between items-center w-full px-1 mb-3">
                      <p className="text-zinc-500 dark:text-zinc-400 tracking-tight font-semibold">
                        {config.name}
                      </p>
                      <div className="h-full w-[175px] bg-neutral-200 dark:bg-neutral-900 flex items-center justify-around rounded-2xl px-5 py-2 transition-colors duration-300">
                        <div className="relative w-6 h-6 flex items-center justify-center">
                          <AnimatePresence mode="popLayout">
                            <motion.p
                              key={`${config.name}-left-${val1}`}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute text-neutral-700 dark:text-neutral-200 font-semibold tracking-tight"
                            >
                              {val1}
                            </motion.p>
                          </AnimatePresence>
                        </div>

                        <HugeiconsIcon
                          icon={ArrowRight04Icon}
                          className="text-neutral-700 dark:text-neutral-400"
                        />

                        <div className="relative w-6 h-6 flex items-center justify-center">
                          <AnimatePresence mode="popLayout">
                            <motion.p
                              key={`${config.name}-right-${val2}`}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute text-neutral-700 dark:text-neutral-200 font-semibold tracking-tight"
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
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 text-center rounded-2xl bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 font-semibold tracking-tight mt-2 transition-colors duration-300"
                >
                  <HugeiconsIcon
                    icon={PlusSignIcon}
                    className="size-5 inline-block"
                  />{" "}
                  Add Property
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {isMotion && (
          <motion.div
            key="motion-panel"
            initial={{ opacity: 0, y: 50, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 50, filter: "blur(4px)" }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
            className="w-full h-full flex flex-col gap-3 items-center"
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key="asymmetric-tabs-container"
                initial={{
                  height: 0,
                  opacity: 0,
                  filter: "blur(4px)",
                  y: -50,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                  filter: "blur(0px)",
                  y: 0,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  filter: "blur(4px)",
                  y: -50,
                }}
                transition={{ type: "spring", bounce: 0.45, duration: 0.8 }}
                className="w-full overflow-hidden"
              >
                <div className="p-0.5 bg-neutral-200 dark:bg-neutral-900 rounded-2xl w-full flex items-center justify-between relative z-20 mb-3 transition-colors duration-300">
                  <button
                    onClick={() => handleTypeChange(types[0])}
                    className="relative text-neutral-700 dark:text-neutral-200 font-semibold tracking-tight py-2 w-full text-center z-10"
                  >
                    {types[0]}
                    {activeType === types[0] && (
                      <motion.span
                        layoutId="progressive-disclosure-tab"
                        className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-xl -z-10 shadow-sm"
                        transition={{
                          type: "spring",
                          bounce: 0.4,
                          duration: 0.5,
                        }}
                      />
                    )}
                  </button>
                  <button
                    onClick={() => handleTypeChange(types[1])}
                    className="relative text-neutral-700 dark:text-neutral-200 font-semibold tracking-tight py-2 w-full text-center z-10"
                  >
                    {types[1]}
                    {activeType === types[1] && (
                      <motion.span
                        layoutId="progressive-disclosure-tab"
                        className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-xl -z-10 shadow-sm"
                        transition={{
                          type: "spring",
                          bounce: 0.4,
                          duration: 0.5,
                        }}
                      />
                    )}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="grid grid-cols-2 gap-2 w-full">
              {resolvedEaseOptions.map((item) => {
                const isActive = activeEase === item.title;
                return (
                  <div
                    key={item.title}
                    onClick={() => handleEaseChange(item.title)}
                    className={`group w-full aspect-square rounded-[36px] flex flex-col items-center justify-between p-4 cursor-pointer transition-all duration-300 active:scale-[0.98] ${
                      isActive
                        ? "bg-neutral-300 dark:bg-neutral-700/80 shadow-sm text-neutral-900 dark:text-neutral-100 border-[6px]"
                        : "bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300/50 dark:hover:bg-neutral-700/50 text-neutral-1000 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
                    }`}
                  >
                    <div className="flex-1 flex items-center justify-center w-full relative transition-colors duration-300 p-2 scale-[1.10]">
                      {item.icons}
                    </div>
                    <p
                      className={`font-semibold tracking-tight text-center w-full transition-colors duration-300 ${isActive ? "text-[15px]" : "text-sm"}`}
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
      className="lucide lucide-chevrons-up-down-icon lucide-chevrons-up-down text-neutral-700 dark:text-neutral-400 cursor-pointer"
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
      className="w-[110px] h-auto text-current"
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
      className="w-[80px] h-auto text-current"
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
      className="w-[96px] h-auto text-current"
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
      className="w-[68px] h-auto text-current"
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
