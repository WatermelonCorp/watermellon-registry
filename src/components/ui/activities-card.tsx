"use client";

import { useState, useEffect, type FC, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUpIcon, Sun, Moon } from "lucide-react";

/* ---------- TYPES ---------- */

export interface ActivityItemType {
  icon: ReactNode;
  title: string;
  desc: string;
  time: string;
}

export interface ActivitiesCardProps {
  headerIcon: ReactNode;
  title: string;
  subtitle: string;
  activities: ActivityItemType[];
}

/* ---------- SUB COMPONENT ---------- */

const ActivityItem: FC<ActivityItemType> = ({ icon, title, desc, time }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-4 px-5 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-100/50 dark:border-zinc-700 bg-gradient-to-b from-[#f4f4f7]/90 to-[#E9EAF0]/90 dark:from-zinc-800 dark:to-zinc-900 text-gray-400 dark:text-zinc-500">
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[17px] font-bold text-[#3E3E43] dark:text-zinc-200 leading-tight truncate">
          {title}
        </p>
        <p className="text-[15px] text-[#909092] dark:text-zinc-500 truncate">
          {desc}
        </p>
      </div>

      <span className="text-[13px] text-[#9F9FA1] dark:text-zinc-600 whitespace-nowrap pt-1">
        {time}
      </span>
    </motion.div>
  );
};

/* ---------- MAIN COMPONENT ---------- */

export const ActivitiesCard: FC<ActivitiesCardProps> = ({
  headerIcon,
  title,
  subtitle,
  activities,
}) => {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-zinc-950 transition-colors duration-500 p-4">
      {/* THEME TOGGLE */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="mb-8 p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all active:scale-90"
      >
        {isDark ? (
          <Sun className="text-yellow-400" size={20} />
        ) : (
          <Moon className="text-zinc-500" size={20} />
        )}
      </button>

      <motion.div
        layout
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        className="w-full max-w-[460px] overflow-hidden rounded-[24px] bg-[#FEFEFE] dark:bg-zinc-900 border-2 border-[#e7e6e6]/60 dark:border-zinc-800 shadow-lg"
      >
        {/* HEADER */}
        <motion.button
          layout
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between px-5 py-3.5 transition-colors"
        >
          <div className="flex items-center gap-4 text-left">
            {/* ICON */}
            <motion.div
              animate={{
                width: open ? 48 : 72,
                height: open ? 48 : 72,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative flex shrink-0 items-center justify-center rounded-xl border border-gray-100/50 dark:border-zinc-700 bg-gradient-to-b from-[#f4f4f7] via-[#efeef2] to-[#E9EAF0] dark:from-zinc-800 dark:to-zinc-900 shadow-sm overflow-hidden"
            >
              <motion.span
                className="absolute rounded-[inherit] pointer-events-none inset-0"
                style={{
                  boxShadow: isDark
                    ? `inset 1px 1px 2px rgba(255, 255, 255, 0.05), inset -1px -1px 2px rgba(0, 0, 0, 0.4)`
                    : `inset 1px 1px 2px rgba(255, 255, 255, 0.8), inset -1px -1px 2px rgba(165, 172, 190, 0.2)`,
                }}
              />
              <motion.div animate={{ scale: open ? 0.7 : 1 }}>
                {headerIcon}
              </motion.div>
            </motion.div>

            {/* TEXT */}
            <div className="flex flex-col justify-center">
              <motion.p className="font-bold text-neutral-900 dark:text-zinc-100 text-[18px]">
                {title}
              </motion.p>
              {!open && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[#BFBFC2] dark:text-zinc-500 text-[16px]"
                >
                  {subtitle}
                </motion.p>
              )}
            </div>
          </div>

          {/* CHEVRON */}
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#9C97A8]/70 to-[#7A7596]/70 dark:from-zinc-700 dark:to-zinc-800 shadow-xs"
          >
            <ChevronUpIcon className="h-6 w-6 text-white" />
          </motion.div>
        </motion.button>

        {/* CONTENT */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t-2 border-[#e7e6e6]/60 dark:border-zinc-800"
            >
              <div className="py-2">
                {activities.map((item, i) => (
                  <ActivityItem key={i} {...item} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
