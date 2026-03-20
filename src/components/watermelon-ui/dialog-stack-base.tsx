'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ThumbsUp } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';

export interface StackItem {
  id: string;
  title: string;
  type: 'form' | 'steps';
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
    <div className="theme-injected font-sans relative flex min-h-[450px] flex-col items-center justify-center sm:min-h-[600px]">
      <motion.button
        onClick={() => setIsOpen(true)}
        whileTap={{ scale: 0.96 }}
        transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.3 }}
        className={`flex transform items-center gap-2 rounded-4xl border-2 border-border bg-card px-6 py-3 text-lg font-semibold text-foreground shadow-lg transition-all hover:-translate-y-2.5 sm:gap-3 sm:px-8 sm:py-4 sm:text-xl ${isOpen ? '-translate-y-2.5' : ''}`}
      >
        <div className="text-foreground">
          <HugeiconsIcon
            icon={trigger.icon}
            size={
              typeof window !== 'undefined' && window.innerWidth < 640 ? 24 : 28
            }
            strokeWidth={1.5}
          />
        </div>
        <span>{trigger.label}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 1, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ ease: 'easeOut', duration: 0.25 }}
            className="absolute top-1/2 left-1/2 z-50 flex w-160 -translate-x-1/2 -translate-y-1/2 items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetAndClose}
              className="absolute inset-0 backdrop-blur-sm"
            />

            <div className="relative flex min-h-[450px] w-xs items-center justify-center sm:min-h-[600px] sm:w-sm">
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
                        type: 'spring',
                        stiffness: 300,
                        damping: 28,
                      }}
                      className="absolute inset-x-0 top-0 flex h-fit flex-col overflow-hidden rounded-xl border-2 border-border bg-card shadow-2xl transition-colors sm:rounded-2xl"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between border-b border-border bg-muted/60 px-4 py-3 transition-colors sm:px-5 sm:py-3">
                        <h3 className="text-base font-medium text-muted-foreground sm:text-lg">
                          {item.title}
                        </h3>
                        <button
                          title="close"
                          onClick={handleHeaderClose}
                          className="rounded-full p-1 transition-colors hover:bg-muted"
                        >
                          <X
                            size={20}
                            className="text-muted-foreground sm:size-5.5"
                          />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="flex-1 px-5 pt-4 pb-8 sm:px-6 sm:pt-6 sm:pb-10">
                        {item.type === 'form' ? (
                          <div className="space-y-4 sm:space-y-5">
                            <div className="space-y-3">
                              <label className="block text-sm font-normal text-muted-foreground sm:text-base">
                                Email Address
                              </label>
                              <input
                                title="email"
                                type="text"
                                className="w-full rounded-lg border border-input bg-background px-3 py-3 text-foreground transition-colors focus:outline-none focus:border-ring sm:rounded-xl sm:px-4 sm:py-3"
                              />
                              <p className="text-xs text-muted-foreground sm:text-sm">
                                Use commas to add multiple emails.
                              </p>
                            </div>

                            <div className="space-y-3">
                              <label className="block text-sm font-normal text-muted-foreground sm:text-base">
                                Message
                              </label>
                              <textarea
                                title="message"
                                rows={
                                  typeof window !== 'undefined' &&
                                  window.innerWidth < 640
                                    ? 3
                                    : 4
                                }
                                className="w-full rounded-lg border border-input bg-background px-3 py-3 text-foreground transition-colors focus:outline-none focus:border-ring sm:rounded-xl sm:px-4 sm:py-3"
                              />
                            </div>

                            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-colors active:scale-[0.98] sm:rounded-2xl sm:py-4 hover:bg-primary/90">
                              {item.buttonText || 'Send'}{' '}
                              <ArrowRight size={18} />
                            </button>

                            <button
                              onClick={handleNext}
                              className="w-full text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                              How it works?
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-6 sm:space-y-8">
                            <h4 className="text-xl font-bold text-foreground sm:text-2xl">
                              3 easy steps
                            </h4>

                            <div className="space-y-5 sm:space-y-6">
                              {item.steps?.map((step, i) => (
                                <div
                                  key={i}
                                  className="group flex items-start gap-3 sm:gap-4"
                                >
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-foreground transition-colors sm:h-12 sm:w-12 sm:rounded-xl">
                                    <HugeiconsIcon
                                      icon={step.icon}
                                      size={
                                        typeof window !== 'undefined' &&
                                        window.innerWidth < 640
                                          ? 22
                                          : 27
                                      }
                                      strokeWidth={1.5}
                                    />
                                  </div>
                                  <p className="pt-1 text-sm leading-snug text-muted-foreground sm:text-base">
                                    {step.text}
                                  </p>
                                </div>
                              ))}
                            </div>

                            <button
                              onClick={handleBack}
                              className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-3 text-base font-medium text-primary-foreground transition-all active:scale-[0.98] sm:gap-4 sm:rounded-2xl sm:py-4 sm:text-lg hover:bg-primary/90"
                            >
                              Got It{' '}
                              <ThumbsUp size={20} className="sm:size-5.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
