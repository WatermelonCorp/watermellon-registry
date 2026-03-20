'use client';

import { useState, useEffect, type FC, type ReactNode } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { ChevronUpIcon } from 'lucide-react';

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
      className="flex cursor-pointer items-center gap-3 px-3 py-3 transition-colors hover:bg-accent/40 sm:gap-4 sm:px-5"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground sm:h-12 sm:w-12">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm leading-tight font-bold text-foreground sm:text-base">
          {title}
        </p>
        <p className="truncate text-xs text-muted-foreground sm:text-sm">
          {desc}
        </p>
      </div>

      <span className="pt-1 text-xs whitespace-nowrap text-muted-foreground">
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
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <MotionConfig transition={{ type: 'spring', bounce: 0, duration: 0.6 }}>
      <motion.div
        layout
        className="theme-injected w-full max-w-xs overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-lg font-sans sm:max-w-sm font-sans"
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
              className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted shadow-sm sm:rounded-xl"
            >
              <motion.span className="pointer-events-none absolute inset-0 shadow-inner" />
              <motion.div animate={{ scale: open ? 0.7 : 1 }}>
                {headerIcon}
              </motion.div>
            </motion.div>

            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <motion.p
                layout
                className="truncate text-base font-bold tracking-tight text-foreground sm:text-lg"
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
                      ease: 'easeOut',
                    }}
                    className="truncate text-sm tracking-tight text-muted-foreground"
                  >
                    {subtitle}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-xs"
          >
            <ChevronUpIcon className="size-5" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-border"
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
