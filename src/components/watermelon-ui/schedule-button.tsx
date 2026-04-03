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
      <div className="relative flex flex-col items-center">
        <motion.div
          layout
          className="relative z-10 w-80 border bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-sm"
          style={{ borderRadius: 25 }}
        >
          <div className="p-2">
            <textarea
              placeholder="What's up?"
              className="w-full resize-none bg-transparent p-2 text-neutral-800 outline-none dark:text-neutral-100 selection:bg-black/20 dark:selection:bg-white/20 font-sans"
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
                  <div className="relative flex h-10 items-center justify-between overflow-hidden rounded-full border bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
                    <div className="flex flex-1 items-center justify-between overflow-hidden rounded-full bg-white dark:bg-neutral-900">
                      <div className="flex h-10 w-full items-center justify-between border-r p-2 px-3 text-sm text-neutral-600 dark:border-neutral-700 dark:text-neutral-300">
                        <span className="truncate">25, Dec 2024</span>
                        <FaAngleDown
                          size={12}
                          className="shrink-0 text-neutral-400"
                        />
                      </div>
                      <div className="flex h-10 w-full items-center justify-between p-2 px-3 text-sm text-neutral-600 dark:text-neutral-300">
                        <span className="truncate">9:30 AM</span>
                        <FaAngleDown
                          size={12}
                          className="shrink-0 text-neutral-400"
                        />
                      </div>
                    </div>
                    <button
                      title="close"
                      className="flex h-10 w-10 shrink-0 items-center justify-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <HugeiconsIcon
                        icon={Cancel01Icon}
                        size={18}
                        strokeWidth={2}
                      />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative flex items-center justify-end gap-2 p-2 px-3">
              <motion.button
                layoutId="container"
                className="flex size-10 items-center justify-center border bg-neutral-100 text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800"
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
                className="origin-right bg-neutral-900 px-8 py-2 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold"
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
                  <div className="absolute inset-0 z-20 flex size-full items-center justify-center p-2 px-3">
                    <motion.button
                      layoutId="container"
                      className="h-10 w-full bg-neutral-900 px-8 py-2 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold"
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
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              layout
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{
                type: 'spring',
                bounce: 0,
                duration: 0.5,
                delay: 0.1,
              }}
              className="relative z-0 mt-[-25px] flex w-80 items-center justify-center rounded-b-[25px] border border-t-0 bg-neutral-100 p-3 pt-8 pb-3 dark:border-neutral-700 dark:bg-neutral-800"
            >
              <p className="text-[11px] font-medium text-neutral-500 text-center">
                Will be posted on 25 Dec 2024 at 9:30 AM
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
};
