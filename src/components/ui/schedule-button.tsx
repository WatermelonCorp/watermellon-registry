"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { FaAngleDown } from "react-icons/fa6";
import { BsCalendar3 } from "react-icons/bs";

/*  Types  */
type IconRenderer = (props?: any) => React.ReactNode;

interface ScheduleButtonProps {
  themeToggleIcon?: {
    light?: IconRenderer;
    dark?: IconRenderer;
  };
  dropdownIcon?: IconRenderer;
  calendarIcon?: IconRenderer;
  cancelIcon?: IconRenderer;
}

/*  Component  */
export const ScheduleButton: React.FC<ScheduleButtonProps> = ({
  themeToggleIcon = {
    light: () => <Moon size={18} className="text-zinc-500" />,
    dark: () => <Sun size={18} className="text-yellow-400" />,
  },
  dropdownIcon = () => <FaAngleDown size={18} color="#AEADB4" />,
  calendarIcon = () => <BsCalendar3 size={20} />,
  cancelIcon = (props) => (
    <HugeiconsIcon
      icon={Cancel01Icon}
      size={26}
      strokeWidth={1.5}
      {...props}
    />
  ),
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () =>
    setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fefefe] dark:bg-zinc-950 p-4 transition-colors duration-500">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="mb-10 p-3 rounded-full bg-white dark:bg-zinc-900 border border-[#E6E6EA] dark:border-zinc-800 shadow-sm"
      >
        {theme === "light"
          ? themeToggleIcon.light?.()
          : themeToggleIcon.dark?.()}
      </button>

      {/* Main Container */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="
          w-full max-w-[420px]
          bg-white/90 dark:bg-zinc-900
          border-[1.6px] border-[#E6E6EA] dark:border-zinc-800
          rounded-[38px]
          px-6 pt-6 pb-5
          transition-colors
        "
      >
        {/* Textarea */}
        <textarea
          placeholder="What's up?"
          className="
            w-full h-20
            bg-transparent
            text-[18px] font-medium
            text-[#A1A1AA] dark:text-zinc-400
            placeholder-zinc-400
            outline-none resize-none
          "
        />

        <div className="mt-4">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              >
                {/* Date + Time */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center w-full bg-[#F0EFF6] dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="flex items-center w-full bg-[#FEFEFE] dark:bg-zinc-800 rounded-full border-[1.2px] border-[#E6E6EA] dark:border-[#E6E6EA]/20">
                      <button className="flex-1 px-4 py-2 text-[15px] font-medium text-zinc-600 dark:text-zinc-300 flex items-center justify-between">
                        25, Dec 2024
                        {dropdownIcon()}
                      </button>

                      <div className="w-px h-10 bg-[#DDDDE3] dark:bg-zinc-700" />

                      <button className="flex-1 px-4 py-2 text-[15px] font-medium text-zinc-600 dark:text-zinc-300 flex items-center justify-between">
                        9:30 AM
                        {dropdownIcon()}
                      </button>
                    </div>

                    <button
                      type="button"
                      title="Cancel"
                      onClick={() => setIsOpen(false)}
                      className="px-3 text-zinc-400 hover:text-zinc-600"
                    >
                      {cancelIcon({
                        className:
                          "dark:text-[#fefefe] text-[#B1B1BA]",
                      })}
                    </button>
                  </div>
                </div>

                {/* Schedule Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="
                    w-full py-3
                    bg-[#1F1F21] dark:bg-white/90
                    text-white dark:text-zinc-900
                    font-semibold rounded-full
                    shadow-[0_6px_16px_rgba(0,0,0,0.12)]
                  "
                >
                  Schedule
                </motion.button>

                <p className="mt-5 text-center text-[15px] text-[#86868D]">
                  Will be posted on 25 Dec, 9:30AM
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {!isOpen && (
            <motion.div layout className="flex justify-end gap-3">
              <button
                type="button"
                title="Schedule"
                onClick={() => setIsOpen(true)}
                className="
                  p-3 bg-[#F3F3F6] hover:bg-[#e6e6e9]
                  dark:bg-zinc-800 dark:text-zinc-300
                  text-[#86858E]
                  rounded-full
                "
              >
                {calendarIcon()}
              </button>

              <button
                className="
                  px-8 py-1 w-[105px]
                  bg-[#262629] hover:bg-[#262629]/90
                  dark:bg-white/90
                  text-white dark:text-zinc-900
                  font-semibold text-base
                  rounded-[38px]
                  shadow-sm
                "
              >
                Post
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

