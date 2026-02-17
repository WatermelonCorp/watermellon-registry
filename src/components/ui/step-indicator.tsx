"use client";

import { useState, useRef, useEffect, type FC, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Step {
  id: string;
  label: string;
  icon: ReactNode;
}

interface StepIndicatorProps {
  steps?: Step[];
  currentStep?: number;
  onStepChange?: (index: number) => void;
}

export const StepIndicator: FC<StepIndicatorProps> = ({
  steps = [],
  onStepChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [lastHoveredIndex, setLastHoveredIndex] = useState<number | null>(null);

  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    update();

    const resizeObserver = new ResizeObserver(update);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const stepWidth = steps.length > 0 ? containerWidth / steps.length : 0;

  const positionIndex =
    lastHoveredIndex === null
      ? -1
      : Math.min(Math.max(lastHoveredIndex, 0), steps.length - 1);

  const tooltipCenter =
    positionIndex === -1 ? 0 : stepWidth * positionIndex + stepWidth / 2;

  const getClipPath = () => {
    if (!containerWidth || stepWidth === 0)
      return "inset(0 50% 0 50% round 999px)";

    const left = tooltipCenter - stepWidth / 2;
    const right = containerWidth - (tooltipCenter + stepWidth / 2);

    return `inset(0px ${right}px 0px ${left}px round 999px)`;
  };

  return (
    <div className="flex w-full items-center justify-center bg-white dark:bg-zinc-950">
      <div className="w-full max-w-[420px]">
        <div
          ref={containerRef}
          className="relative flex h-3 w-full items-center gap-3 px-1"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="pointer-events-none absolute bottom-full left-0 h-14 w-full">
            <motion.div
              className="absolute inset-0 h-9 rounded-full bg-black dark:bg-white"
              initial={false}
              animate={{
                clipPath: getClipPath(),
                opacity: hoveredIndex === null ? 0 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 30,
              }}
            >
              <div className="relative h-full w-full">
                {steps.map((step, index) => {
                  const center = stepWidth * index;

                  return (
                    <motion.div
                      key={step.id}
                      className="absolute top-0"
                      animate={{ x: center }}
                      style={{ x: "-100%" }}
                    >
                      <AnimatePresence mode="popLayout">
                        {hoveredIndex === index && (
                          <motion.div
                            initial={{
                              opacity: 0,
                              scale: 0.9,
                              filter: "blur(6px)",
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              filter: "blur(0px)",
                            }}
                            exit={{
                              opacity: 0,
                              scale: 0.9,
                              filter: "blur(6px)",
                            }}
                            transition={{
                              duration: 0.4,
                            }}
                            className="flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-white shadow-lg dark:bg-white dark:text-black"
                          >
                            {step.icon}

                            <span className="font-semibold whitespace-nowrap">
                              {step.label}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {steps.map((step, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={step.id}
                className="group relative h-3 flex-1 cursor-pointer"
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  setLastHoveredIndex(index);
                }}
                onClick={() => onStepChange?.(index)}
              >
                <div className="absolute inset-0 rounded-full bg-zinc-200 dark:bg-zinc-800" />

                <motion.div
                  className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-white"
                  initial={false}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    scaleY: isHovered ? 1.25 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
