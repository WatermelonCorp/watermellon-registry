"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { FaAngleDown } from "react-icons/fa6";
import { BsCalendar3 } from "react-icons/bs";

const springConfig = { type: "spring", stiffness: 450, damping: 35 } as const;

export const ScheduleButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      transition={springConfig}
      className="w-xs sm:w-sm bg-white dark:bg-zinc-900 border-[1.6px] border-[#E6E6EA] dark:border-zinc-800 rounded-[32px] px-6 pt-6 pb-5 shadow-sm overflow-hidden"
    >
      {/* Input Area */}
      <textarea
        placeholder="What's up?"
        className="w-full h-20 bg-transparent text-[18px] font-medium text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 outline-none resize-none"
      />

      <div className="mt-4">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="schedule-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={springConfig}
            >
              {/* Date & Time Picker */}
              <div className="flex items-center w-full bg-[#F0EFF6] dark:bg-zinc-800 rounded-[20px] sm:rounded-full p-1 sm:p-0.5 mb-4 gap-1 sm:gap-0">
                <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center bg-white dark:bg-zinc-900 rounded-[16px] sm:rounded-full border border-[#E6E6EA] dark:border-zinc-700 overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-[#E6E6EA] dark:divide-zinc-700">
                  <button className="flex-1 px-4 py-2.5 sm:py-2 text-[14px] font-medium text-zinc-600 dark:text-zinc-300 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    25, Dec 2024
                    <FaAngleDown size={14} className="text-zinc-400" />
                  </button>
                  <button className="flex-1 px-4 py-2.5 sm:py-2 text-[14px] font-medium text-zinc-600 dark:text-zinc-300 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    9:30 AM
                    <FaAngleDown size={14} className="text-zinc-400" />
                  </button>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-2.5 sm:px-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                >
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={20}
                    strokeWidth={2}
                  />
                </button>
              </div>

              {/* Action Button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-[#1F1F21] dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold rounded-full shadow-lg"
              >
                Schedule
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mt-4 text-center text-[14px] text-zinc-500 font-medium"
              >
                Will be posted on 25 Dec, 9:30AM
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed-view"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={springConfig}
              className="flex justify-end items-center gap-3"
            >
              <button
                onClick={() => setIsOpen(true)}
                className="p-3 bg-[#F3F3F6] dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors"
              >
                <BsCalendar3 size={18} />
              </button>

              <button className="px-8 py-2.5 bg-[#1F1F21] dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold rounded-full shadow-sm">
                Post
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
