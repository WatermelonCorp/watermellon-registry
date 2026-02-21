"use client";

import { useState, useEffect, type FC, type ReactNode } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { ChevronUpIcon } from "lucide-react";

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

const ActivityItem: FC<ActivityItemType> = ({ icon, title, desc, time }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex cursor-pointer items-center gap-3 px-3 py-3 transition-colors hover:bg-neutral-50 sm:gap-4 sm:px-5 dark:hover:bg-neutral-800/50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-100/50 bg-gradient-to-b from-[#f4f4f7]/90 to-[#E9EAF0]/90 text-gray-400 sm:h-12 sm:w-12 dark:border-neutral-700 dark:from-neutral-800 dark:to-neutral-900 dark:text-neutral-500">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] leading-tight font-bold text-[#3E3E43] sm:text-[17px] dark:text-neutral-200">
          {title}
        </p>
        <p className="truncate text-[13px] text-[#909092] sm:text-[15px] dark:text-neutral-500">
          {desc}
        </p>
      </div>

      <span className="pt-1 text-[11px] whitespace-nowrap text-[#9F9FA1] sm:text-[13px] dark:text-neutral-600">
        {time}
      </span>
    </motion.div>
  );
};

export const ActivitiesCard: FC<ActivitiesCardProps> = ({
  headerIcon,
  title,
  subtitle,
  activities,
}) => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.6 }}>
      <motion.div
        layout
        className="w-xs overflow-hidden rounded-xl border-2 border-[#e7e6e6]/60 bg-[#FEFEFE] shadow-lg sm:w-sm sm:rounded-[20px] dark:border-neutral-800 dark:bg-neutral-900"
      >
        <motion.button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between gap-2 px-3 py-2 transition-colors sm:gap-3 sm:px-4 sm:py-3.5"
        >
          <div className="flex min-w-0 flex-1 items-center gap-3 text-left sm:gap-4">
            <motion.div
              initial={{
                width: isMobile ? 48 : 60,
                height: isMobile ? 48 : 60,
              }}
              animate={{
                width: open ? (isMobile ? 36 : 48) : isMobile ? 48 : 60,
                height: open ? (isMobile ? 36 : 48) : isMobile ? 48 : 60,
              }}
              className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-100/50 bg-gradient-to-b from-[#f4f4f7] via-[#efeef2] to-[#E9EAF0] shadow-sm sm:rounded-xl dark:border-neutral-700 dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-900"
            >
              <motion.span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),_inset_-1px_-1px_2px_rgba(165,172,190,0.2)] dark:shadow-[inset_1px_1px_1px_rgba(255,255,255,0.1),inset_-1px_-1px_3px_rgba(0,0,0,0.6)]" />
              <motion.div animate={{ scale: open ? 0.7 : 1 }}>
                {headerIcon}
              </motion.div>
            </motion.div>

            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <motion.p
                layout
                className="truncate text-[16px] font-bold tracking-tight text-neutral-900 sm:text-[17px] dark:text-neutral-100"
              >
                {title}
              </motion.p>
              <AnimatePresence mode="popLayout" initial={false}>
                {!open && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    className="truncate text-[14px] tracking-tight text-[#BFBFC2] sm:text-[15px] dark:text-neutral-500"
                  >
                    {subtitle}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#9C97A8]/70 to-[#7A7596]/70 shadow-xs dark:from-neutral-700 dark:to-neutral-800"
          >
            <ChevronUpIcon className="size-5 text-white" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t-2 border-[#e7e6e6]/60 dark:border-neutral-800"
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
    </MotionConfig>
  );
};
