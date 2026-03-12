"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import type { IconType } from "react-icons";

export type Step = {
  id: string;
  label: string;
  icon: IconType;
};

interface StepIndicatorProps {
  steps: Step[];
  tooltipDelay?: number;
  onStepChange?: (index: number) => void;
}

export const StepIndicator = ({
  steps,
  tooltipDelay = 0,
  onStepChange,
}: StepIndicatorProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [coords, setCoords] = useState({ clipPath: "", translateX: 0 });

  const measureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [isEntering, setIsEntering] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const calculatePosition = (index: number) => {
    const activeLabel = measureRefs.current[index];
    const activeButton = buttonRefs.current[index];

    if (!activeLabel || !activeButton) return null;

    const labelLeft = activeLabel.offsetLeft;
    const labelWidth = activeLabel.offsetWidth;
    const labelCenter = labelLeft + labelWidth / 2;

    const buttonLeft = activeButton.offsetLeft;
    const buttonWidth = activeButton.offsetWidth;
    const buttonCenter = buttonLeft + buttonWidth / 2;

    const totalWidth = measureRefs.current.reduce(
      (acc, el) => acc + (el?.offsetWidth || 0),
      0
    );

    const cLeft = (labelLeft / totalWidth) * 100;
    const cRight = 100 - ((labelLeft + labelWidth) / totalWidth) * 100;

    return {
      clipPath: `inset(0 ${cRight}% 0 ${cLeft}% round 9999px)`,
      translateX: buttonCenter - labelCenter,
    };
  };

  const handleShow = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const performUpdate = () => {
      const newCoords = calculatePosition(index);
      if (newCoords) {
        setCoords(newCoords);
        setActiveIndex(index);
      }
    };

    if (activeIndex === null) {
      setIsEntering(true);
      if (tooltipDelay > 0) {
        timeoutRef.current = setTimeout(performUpdate, tooltipDelay);
      } else {
        performUpdate();
      }
    } else {
      setIsEntering(false);
      performUpdate();
    }
  };

  const handleHide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveIndex(null);
    setCoords({ clipPath: "", translateX: 0 });
    setIsEntering(true);
  };

  return (
    <div className="flex w-full items-center justify-center bg-white py-20 dark:bg-zinc-950">
      <div className="w-full max-w-[420px]">
        <div
          className="relative flex h-3 w-full items-center gap-3 px-1"
          onMouseLeave={handleHide}
        >
          <AnimatePresence>
            {activeIndex !== null && coords.clipPath !== "" && (
              <motion.div
                className="pointer-events-none absolute bottom-10 left-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="flex bg-black dark:bg-white"
                  animate={{
                    clipPath: coords.clipPath,
                    x: coords.translateX,
                  }}
                  transition={{
                    type: "spring",
                    bounce: 0,
                    duration: isEntering ? 0 : 0.4,
                  }}
                  onUpdate={() => {
                    if (isEntering) setIsEntering(false);
                  }}
                >
                  <div className="inline-flex items-center justify-center">
                    {steps.map((step, index) => (
                      <motion.div
                        key={`real-${step.id}`}
                        animate={{
                          opacity: activeIndex === index ? 1 : 0,
                          filter:
                            activeIndex === index ? "blur(0px)" : "blur(4px)",
                        }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center justify-center gap-2 px-4 py-2 whitespace-nowrap text-white dark:text-black"
                      >
                        <step.icon className="size-5" />
                        <span className="text-lg font-semibold">
                          {step.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {steps.map((step, index) => (
            <button
              key={step.id}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              onMouseEnter={() => handleShow(index)}
              onFocus={() => handleShow(index)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  handleHide();
                }
              }}
              onClick={() => onStepChange?.(index)}
              className="group relative h-3 flex-1 cursor-pointer outline-none"
            >
              <div
                className={cn(
                  "absolute inset-0 rounded-full bg-zinc-200 transition-colors duration-300 dark:bg-zinc-800",
                  "group-focus-visible:ring-2 group-focus-visible:ring-zinc-400 group-focus-visible:ring-offset-4 dark:group-focus-visible:ring-offset-zinc-950",
                  activeIndex === index && "bg-zinc-800 dark:bg-zinc-100"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 flex h-0 overflow-hidden whitespace-nowrap opacity-0"
        aria-hidden="true"
      >
        {steps.map((step, index) => (
          <div
            key={`measure-${step.id}`}
            ref={(el) => {
              measureRefs.current[index] = el;
            }}
            className="flex items-center justify-center gap-2 px-4 py-2"
          >
            <step.icon className="size-5" />
            <span className="text-lg font-semibold">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
