import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { FaCheck } from "react-icons/fa6";
import { cn } from "@/lib/utils";

export interface StepData {
  id: string;
  label: string;
  type: "text" | "toggle";
  placeholder?: string;
}

interface ProgressiveInputStackProps {
  steps: StepData[];
  initialData?: Record<string, string | boolean>;
  onSubmit?: (data: Record<string, string | boolean>) => void;
}

export const ProgressiveInputStack: React.FC<ProgressiveInputStackProps> = ({
  steps,
  initialData,
  onSubmit,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState<Record<string, string | boolean>>(
    initialData ||
      steps.reduce(
        (acc, step) => ({
          ...acc,
          [step.id]: step.type === "toggle" ? false : "",
        }),
        {}
      )
  );

  const springTransition = {
    type: "spring" as const,
    stiffness: 800,
    damping: 45,
    mass: 2,
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onSubmit?.(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const updateField = (id: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="flex min-h-[200px] w-full flex-col items-center justify-center bg-white p-6 transition-colors duration-500 dark:bg-zinc-950">
      <div className="w-full max-w-[350px]">
        <div className="relative flex w-full flex-col gap-8">
          <div className="relative h-[60px] w-full">
            <AnimatePresence mode="popLayout">
              {steps.map((step, index) => {
                if (index > currentStep) return null;

                const position = currentStep - index;
                const isTop = index === currentStep;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, scale: 1.2, y: 15, z: steps.length }}
                    animate={{
                      opacity: 1,
                      scale: 1 - position * 0.05,
                      y: -position * 12,
                      z: steps.length - position,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 1.2,
                      y: 15,
                    }}
                    transition={springTransition}
                    className={cn(
                      "absolute inset-0 flex h-[60px] items-center rounded-2xl border border-[#E9E8EE] bg-white px-4 shadow-sm transition-colors dark:border-zinc-700 dark:bg-zinc-900",
                      !isTop && "pointer-events-none opacity-50"
                    )}
                  >
                    {step.type === "text" && (
                      <input
                        autoFocus={isTop}
                        type="text"
                        value={formData[step.id] as string}
                        onChange={(e) => updateField(step.id, e.target.value)}
                        placeholder={step.placeholder}
                        className="w-full bg-transparent text-lg font-semibold text-[#242426] outline-none placeholder:text-[#85858B]/70 dark:text-zinc-200 dark:placeholder:text-zinc-500"
                      />
                    )}

                    {step.type === "toggle" && (
                      <div className="flex w-full items-center justify-between">
                        <span className="truncate text-lg font-semibold text-[#85858B] dark:text-zinc-400">
                          {step.label}
                        </span>

                        <button
                          onClick={() =>
                            updateField(step.id, !formData[step.id])
                          }
                          className={cn(
                            "relative flex h-7 w-12 items-center rounded-full p-1 transition-colors",
                            formData[step.id]
                              ? "bg-black dark:bg-zinc-200"
                              : "bg-zinc-200 dark:bg-zinc-800"
                          )}
                        >
                          <motion.div
                            animate={{
                              x: formData[step.id] ? 20 : 0,
                            }}
                            transition={springTransition}
                            className="h-5 w-5 rounded-full bg-white shadow"
                          />
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="flex items-center">
            <AnimatePresence>
              {currentStep > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={handleBack}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                  className="flex items-center justify-center rounded-full bg-zinc-200 p-4 transition hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                >
                  <ArrowLeft size={24} />
                </motion.button>
              )}
            </AnimatePresence>

            <motion.button
              onClick={handleNext}
              className="ml-auto flex h-12 items-center gap-2 overflow-hidden rounded-full bg-black px-5 font-semibold text-white transition hover:opacity-90 dark:bg-zinc-200 dark:text-black"
            >
              <AnimatePresence mode="popLayout">
                {currentStep === steps.length - 1 ? (
                  <motion.div
                    key="done"
                    initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    className="flex items-center gap-2"
                  >
                    <FaCheck size={18} />
                    Done
                  </motion.div>
                ) : (
                  <motion.div
                    key="next"
                    initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ArrowRight size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
