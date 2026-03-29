import React, { useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  MotionConfig,
  type Transition,
} from 'motion/react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface InlineActionProps {
  label: string;
  icon: React.ReactNode;
  actionText: string;
  onAction: () => Promise<void>;
  theme?: 'light' | 'dark' | 'system';
  className?: string;
}

export const InlineAction: React.FC<InlineActionProps> = ({
  label,
  icon,
  actionText,
  onAction,
  theme = 'system',
  className,
}) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleTrigger = async () => {
    if (status !== 'idle') return;
    setStatus('loading');
    try {
      await onAction();
      setStatus('success');
    } catch {
      setStatus('idle');
    }
  };

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => setStatus('idle'), 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const springTransition: Transition = {
    type: 'spring',
    stiffness: 400,
    damping: 35,
    mass: 1,
  };

  const forcedTheme =
    theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : '';

  return (
    <div
      className={cn(
        'flex w-full items-center justify-center px-4',
        forcedTheme,
        className,
      )}
    >
      <div className="flex w-full w-xs items-center justify-between overflow-hidden rounded-full border-[1.5px] border-[#F0F0F0] bg-white p-3 shadow-sm transition-colors duration-300 md:w-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="flex shrink-0 items-center justify-center rounded-full bg-[#F0F0F0] p-2.5 text-[#1F1F1F] transition-colors sm:p-3.5 dark:bg-zinc-800 dark:text-zinc-100">
            <div className="scale-90 sm:scale-100">{icon}</div>
          </div>
          <span className="truncate text-[15px] font-bold text-[#000000] transition-colors sm:text-[18px] dark:text-white">
            {label}
          </span>
        </div>
        <MotionConfig transition={springTransition}>
          <motion.div
            className={cn(
              'relative flex h-12 items-center overflow-hidden rounded-full bg-[#F0F0F0] px-2 py-2 dark:bg-zinc-800',
            )}
            animate={{
              width:
                status === 'success' ? 48 : status === 'loading' ? 120 : 120,
            }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {status === 'idle' && (
                <motion.button
                  key="idle"
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(4px)' }}
                  onClick={handleTrigger}
                  className="w-full rounded-full text-[13px] font-bold whitespace-nowrap text-[#000000] transition-colors sm:text-[15px] dark:text-white"
                >
                  {actionText}
                </motion.button>
              )}

              {status === 'loading' && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(4px)' }}
                  className="w-full"
                >
                  <div className="relative h-1.5 flex-1 rounded-full bg-zinc-300 dark:bg-zinc-600">
                    <motion.div
                      className="absolute top-0 bottom-0 w-[30%] rounded-full bg-[#212121] dark:bg-zinc-300"
                      initial={{ left: '0%' }}
                      animate={{ left: '70%' }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {status === 'success' && (
                <motion.div
                  key="success"
                  initial={{ filter: 'blur(4px)', opacity: 0 }}
                  animate={{ filter: 'blur(0px)', opacity: 1 }}
                  exit={{ filter: 'blur(4px)', opacity: 0 }}
                  className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#050505] transition-colors dark:bg-white"
                >
                  <motion.div
                    initial={{ x: '0%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                    className="absolute inset-0 z-10 h-full w-full skew-x-[-40deg] bg-linear-to-r from-transparent via-white/50 to-transparent dark:via-black/20"
                  />

                  <Check className="size-6 stroke-2 text-white dark:text-black" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </MotionConfig>
      </div>
    </div>
  );
};
