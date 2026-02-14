import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, ThumbsUp } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";

export interface StackItem {
  id: string;
  title: string;
  type: "form" | "steps";
  steps?: { icon: any; text: string }[];
  buttonText?: string;
}

interface DialogStackProps {
  stack: StackItem[];
  trigger: {
    label: string;
    icon: any;
  };
}

export const DialogStack: React.FC<DialogStackProps> = ({ stack, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex < stack.length - 1) setActiveIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeIndex > 0) setActiveIndex((prev) => prev - 1);
  };

  const resetAndClose = () => {
    setIsOpen(false);
    setTimeout(() => setActiveIndex(0), 300);
  };

  const handleHeaderClose = () => {
    if (activeIndex > 0) {
      handleBack();
    } else {
      resetAndClose();
    }
  };

  return (
    <div className="min-h-[450px] sm:min-h-[600px] flex flex-col items-center justify-center">
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="px-6 sm:px-8 py-3 sm:py-4 flex items-center gap-2 sm:gap-3 border-[1.7px] rounded-full shadow-sm font-semibold hover:shadow-lg transition-all text-lg sm:text-[20px] bg-white dark:bg-[#161618] border-[#F2F2F2] dark:border-[#27272A] text-[#040306] dark:text-white"
      >
        <div className="text-[#040306] dark:text-[#FAFAFA]">
          <HugeiconsIcon
            icon={trigger.icon}
            size={
              typeof window !== "undefined" && window.innerWidth < 640 ? 24 : 28
            }
            strokeWidth={1.5}
          />
        </div>
        <span>{trigger.label}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetAndClose}
              className="absolute inset-0 backdrop-blur-[2px] bg-white/10 dark:bg-black/40"
            />

            <div className="relative w-xs sm:w-sm flex items-center justify-center min-h-[450px] sm:min-h-[500px]">
              <AnimatePresence mode="popLayout" initial={false}>
                {stack.map((item, index) => {
                  const isUnder = index < activeIndex;
                  if (index > activeIndex) return null;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ y: 50, opacity: 0, scale: 0.95 }}
                      animate={{
                        y: isUnder ? -35 : 0,
                        scale: isUnder ? 0.94 : 1,
                        opacity: isUnder ? 0.5 : 1,
                        zIndex: index,
                      }}
                      exit={{ y: 50, opacity: 0, scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 28,
                      }}
                      className="absolute inset-x-0 top-0 bg-white dark:bg-[#161618] rounded-[20px] sm:rounded-[24px] shadow-2xl border-[1.6px] border-[#E9E9EB] dark:border-[#27272A] flex flex-col overflow-hidden h-fit transition-colors"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between bg-[#FAFAFC] dark:bg-[#1C1C1F] border-b-[1.5px] border-[#E8E8ED] dark:border-[#2D2D30] px-4 sm:px-5 py-2.5 sm:py-3 transition-colors">
                        <h3 className="text-base sm:text-lg font-medium text-[#7D7D84] dark:text-[#A1A1AA]">
                          {item.title}
                        </h3>
                        <button
                          title="close"
                          onClick={handleHeaderClose}
                          className="p-1 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-white/5"
                        >
                          <X
                            size={20}
                            className="sm:size-[22px] text-[#7F7E85] dark:text-[#A1A1AA]"
                          />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="flex-1 px-5 sm:px-6 pb-8 sm:pb-10 pt-4 sm:pt-6">
                        {item.type === "form" ? (
                          <div className="space-y-4 sm:space-y-5">
                            <div className="space-y-2.5 sm:space-y-3">
                              <label className="block text-sm sm:text-base font-normal text-[#535357] dark:text-[#A1A1AA]">
                                Email Address
                              </label>
                              <input
                                title="email"
                                type="text"
                                className="w-full p-3 sm:p-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-[1.5px] focus:outline-none transition-colors border-[#E6E6E6] dark:border-[#333338] bg-[#fefefe] dark:bg-[#1F1F23] text-black dark:text-white"
                              />
                              <p className="text-[12px] sm:text-[14px] text-[#9A999C]">
                                Use commas to add multiple emails.
                              </p>
                            </div>
                            <div className="space-y-2.5 sm:space-y-3">
                              <label className="block text-sm sm:text-base font-normal text-[#535357] dark:text-[#A1A1AA]">
                                Message
                              </label>
                              <textarea
                                title="message"
                                rows={
                                  typeof window !== "undefined" &&
                                  window.innerWidth < 640
                                    ? 3
                                    : 4
                                }
                                className="w-full p-3 sm:p-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-[1.5px] focus:outline-none transition-colors border-[#E6E6E6] dark:border-[#333338] bg-[#fefefe] dark:bg-[#1F1F23] text-black dark:text-white"
                              />
                            </div>
                            <button className="w-full bg-[#000002] dark:bg-[#fefefe] text-[#fefefe] dark:text-[#000002] py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors active:scale-[0.98]">
                              {item.buttonText || "Send"}{" "}
                              <ArrowRight size={18} />
                            </button>
                            <button
                              onClick={handleNext}
                              className="w-full font-medium text-[14px] sm:text-[15px] text-[#535357] dark:text-[#71717A] hover:text-black dark:hover:text-white transition-colors"
                            >
                              How it works?
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-6 sm:space-y-8">
                            <h4 className="text-xl sm:text-2xl font-bold text-[#1a1a1a] dark:text-[#FAFAFA]">
                              3 easy steps
                            </h4>
                            <div className="space-y-5 sm:space-y-6">
                              {item.steps?.map((step, i) => (
                                <div
                                  key={i}
                                  className="flex gap-3 sm:gap-4 items-start group"
                                >
                                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl border flex items-center justify-center shrink-0 transition-colors bg-[#F4F4F4] dark:bg-[#242427] border-gray-100 dark:border-[#333338] text-[#2b2b2b] dark:text-[#E4E4E7]">
                                    <HugeiconsIcon
                                      icon={step.icon}
                                      size={
                                        typeof window !== "undefined" &&
                                        window.innerWidth < 640
                                          ? 22
                                          : 27
                                      }
                                      strokeWidth={1.5}
                                    />
                                  </div>
                                  <p className="text-sm sm:text-base leading-snug pt-0.5 sm:pt-1 text-[#3C3B40] dark:text-[#D4D4D8]">
                                    {step.text}
                                  </p>
                                </div>
                              ))}
                            </div>
                            <button
                              onClick={handleBack}
                              className="w-full bg-[#000002] dark:bg-[#fefefe] text-[#fefefe] dark:text-[#000002] py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-medium flex items-center justify-center gap-3 sm:gap-4 active:scale-[0.98] transition-all"
                            >
                              Got It{" "}
                              <ThumbsUp size={20} className="sm:size-[22px]" />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
