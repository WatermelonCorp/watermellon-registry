import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  type Transition,
  MotionConfig,
} from "motion/react";
import { Check } from "lucide-react";
import { RiBubbleChartFill } from "react-icons/ri";

interface SwitchDisclosureProps {
  title?: string;
  subOptionLabel?: string;
  defaultEnabled?: boolean;
  defaultSubOptionChecked?: boolean;
  onToggleChange?: (enabled: boolean) => void;
  onSubOptionChange?: (checked: boolean) => void;
}

const springConfig: Transition = {
  type: "spring",
  stiffness: 800,
  damping: 80,
  mass: 5,
};
export const SwitchDisclosure: React.FC<SwitchDisclosureProps> = ({
  title = "Predictive Completion",
  subOptionLabel = "Enable Inline Suggestions",
  defaultEnabled = false,
  defaultSubOptionChecked = false,
  onToggleChange,
  onSubOptionChange,
}) => {
  const [isEnabled, setIsEnabled] = useState(defaultEnabled);
  const [isSubOptionChecked, setIsSubOptionChecked] = useState(
    defaultSubOptionChecked
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
        className={`w-[340px] overflow-hidden rounded-[35px] bg-transparent p-[5px] transition-colors duration-300 will-change-transform  ${
          isEnabled
            ? "border-[1.5px] border-[#EBEBF0] dark:border-neutral-800 dark:bg-neutral-900"
            : "border border-transparent shadow-none"
        }`}
        style={{
          borderRadius: 32,
        }}
      >
        <div className="flex flex-col">
          <motion.div
            layout
            className="dark:bg-nuetral-800 flex cursor-pointer items-center justify-between rounded-[35px] bg-[#F6F5FA]  dark:bg-neutral-800 p-3 shadow-sm"
            onClick={handleToggle}
          >
            <div className="flex items-center gap-3">
              <div
                className={`rounded-full p-2 text-[#ADACB8] transition-colors dark:text-neutral-500`}
              >
                <RiBubbleChartFill size={24} />
              </div>
              <span className="text-lg font-bold tracking-tight text-[#28272A] dark:text-neutral-100">
                {title}
              </span>
            </div>

            <div
              className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${
                isEnabled ? "bg-[#EE2563]" : "bg-gray-200 dark:bg-neutral-700"
              }`}
            >
              <motion.div
                transition={springConfig}
                className="absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow-sm"
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
                        ? "border-[#28272A] bg-[#28272A] dark:border-neutral-100 dark:bg-neutral-100"
                        : "border-[#EBEBF0] bg-white group-hover:border-gray-300 dark:border-neutral-800 dark:bg-neutral-950 dark:group-hover:border-neutral-700"
                    }`}
                  >
                    <AnimatePresence>
                      {isSubOptionChecked && (
                        <motion.div
                          initial={{
                            scale: 1.2,
                            opacity: 0,
                            filter: "blur(4px)",
                          }}
                          animate={{
                            scale: 1,
                            opacity: 1,
                            filter: "blur(0px)",
                          }}
                          exit={{ scale: 0.5, opacity: 0, filter: "blur(4px)" }}
                          whileTap={{ scale: 1.01 }}
                        >
                          <Check
                            size={14}
                            className="text-white dark:text-neutral-900"
                            strokeWidth={4}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <span className="text-[17px] font-semibold text-[#6C6B72] transition-colors group-hover:text-gray-800 dark:text-neutral-400 dark:group-hover:text-neutral-200">
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
