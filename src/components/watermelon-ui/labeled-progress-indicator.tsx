'use client';

import { motion, AnimatePresence } from 'motion/react';

import { useState, useEffect, type FC } from 'react';

export interface LabeledProgressIndicatorProps {
  labels: string[];
  progress?: string;
  intervalMs?: number;
  showThemeToggle?: boolean;
}

export const LabeledProgressIndicator: FC<LabeledProgressIndicatorProps> = ({
  labels,
  progress = '55%',
  intervalMs = 2000,
}) => {
  const [labelIndex, setLabelIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLabelIndex((prev) => (prev + 1) % labels.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [labels.length, intervalMs]);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative flex w-full items-center justify-center perspective-[800px] transform-3d">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={labelIndex}
            initial={{
              opacity: 0,
              y: 10,
              scale: 2,
              filter: 'blur(4px)',
              rotateX: -60,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              rotateX: 0,
            }}
            exit={{
              opacity: 0,
              filter: 'blur(4px)',
              rotateX: 90,
              scale: 0.9,
            }}
            transition={{
              type: 'spring',
              stiffness: 600,
              damping: 100,
              mass: 10,
            }}
            className="origon-bottom flex w-full items-center justify-center text-3xl font-bold text-[#B5B5B5] will-change-transform transform-3d dark:text-zinc-400"
          >
            {labels[labelIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="h-4 w-[320px] overflow-hidden rounded-full border border-black/5 bg-[#F0F0F0] shadow-inner dark:border-white/5 dark:bg-zinc-900">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: progress }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative h-full overflow-hidden rounded-full bg-[#016FFE] dark:bg-blue-600"
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{
              duration: intervalMs / 1000,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-y-0 w-full bg-linear-to-r from-zinc-900/10 via-sky-300 to-zinc-900/10"
          />
        </motion.div>
      </div>
    </div>
  );
};
