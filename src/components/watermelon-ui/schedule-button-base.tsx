'use client';

import { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon } from '@hugeicons/core-free-icons';
import { FaAngleDown } from 'react-icons/fa6';
import { BsCalendar3 } from 'react-icons/bs';

export const ScheduleButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MotionConfig transition={{ type: 'spring', bounce: 0.25, duration: 0.7 }}>
      <div className="relative theme-injected font-sans">
        <div
          className="relative z-10 w-80 border border-border bg-card rounded-3xl"
          // style={{ borderRadius: 25 }}
        >
          <div className="p-2">
            <textarea
              placeholder="What's up?"
              className="w-full resize-none bg-transparent p-2 font-sans text-foreground outline-none selection:bg-black/20 dark:selection:bg-white/20"
            />
          </div>

          <div className="relative pt-10">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="absolute top-0 size-full px-2"
                  initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
                >
                  <div className="relative flex h-10 items-center justify-between overflow-hidden rounded-3xl border border-border bg-muted">
                    <div className="flex w-[90%] items-center justify-between rounded-3xl bg-card">
                      <div className="flex h-10 w-full items-center justify-between border-r border-border p-2 font-sans text-sm text-muted-foreground">
                        <span>25, Dec 2024</span>
                        <FaAngleDown size={14} className="text-muted-foreground" />
                      </div>
                      <div className="flex h-10 w-full items-center justify-between p-2 font-sans text-sm text-muted-foreground">
                        <span>9:30 AM</span>
                        <FaAngleDown size={14} className="text-muted-foreground" />
                      </div>
                    </div>
                    <button
                      className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                      onClick={() => setIsOpen(false)}
                    >
                      <HugeiconsIcon
                        icon={Cancel01Icon}
                        size={20}
                        strokeWidth={2}
                      />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative flex items-center justify-end gap-2 p-2">
              <motion.button
                layoutId="container"
                className="flex size-10 items-center justify-center border border-border bg-muted text-muted-foreground"
                style={{
                  borderRadius: 25,
                  opacity: isOpen ? 0 : 1,
                }}
                onClick={() => setIsOpen(true)}
              >
                <motion.span
                  layout="size"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    type: 'spring',
                    bounce: 0,
                    delay: 0.175,
                    duration: 0.4,
                  }}
                >
                  <BsCalendar3 size={18} />
                </motion.span>
              </motion.button>

              <motion.button
                className="origin-right font-sans font-semibold bg-primary px-8 py-2 text-primary-foreground "
                style={{ borderRadius: 25 }}
                animate={{
                  scale: isOpen ? 0.9 : 1,
                  transition: {
                    type: 'spring',
                    bounce: 0,
                    delay: isOpen ? 0.175 : 0,
                    duration: 0.4,
                  },
                }}
              >
                Post
              </motion.button>

              <AnimatePresence>
                {isOpen && (
                  <div className="absolute inset-0 z-20 flex size-full items-center justify-center p-2">
                    <motion.button
                      layoutId="container"
                      className="h-10 w-full font-sans font-semibold bg-primary px-8 py-2 text-primary-foreground"
                      style={{ borderRadius: 25 }}
                    >
                      <motion.span
                        layout="size"
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                        transition={{
                          type: 'spring',
                          bounce: 0,
                          delay: 0.175,
                          duration: 0.4,
                        }}
                      >
                        Schedule
                      </motion.span>
                    </motion.button>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -62 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -62 }}
              className="absolute -bottom-10 flex w-full items-center justify-center rounded-3xl rounded-tl-none rounded-tr-none border border-border bg-muted p-3 pt-8"
            >
              <p className="font-sans text-xs font-medium text-muted-foreground">
                Will be posted on 25 Dec 2024 at 9:30 AM
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
};
