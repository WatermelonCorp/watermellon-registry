import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { LuCircleDotDashed } from 'react-icons/lu';
import { FaArrowRotateRight } from 'react-icons/fa6';
import { TbAlertOctagonFilled } from 'react-icons/tb';
import { cn } from '@/lib/utils';

interface InlineFeedbackProps {
  errorMessage?: string;
  loadingMessage?: string;
  onRetry?: () => void;
}

export const FeedbackAction: React.FC<InlineFeedbackProps> = ({
  errorMessage = 'Sync Failed',
  loadingMessage = 'Syncing',
  onRetry,
}) => {
  const [status, setStatus] = useState<'error' | 'loading'>('error');

  const handleRetry = () => {
    setStatus('loading');
    onRetry?.();
  };

  useEffect(() => {
    if (status === 'loading') {
      const timer = setTimeout(() => {
        setStatus('error');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="flex h-14 items-center gap-3">
      <MotionConfig
        transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
      >
        <motion.div
          animate={{ width: 'auto' }}
          layout
          initial={false}
          className={cn(
            'relative z-20 flex items-center justify-center overflow-hidden border px-6 py-4',
            status === 'error'
              ? 'border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900'
              : 'border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900',
          )}
          style={{
            borderRadius: 32,
          }}
        >
          <motion.div
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(8px)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="flex items-center gap-2"
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                key={status}
                initial={{ opacity: 0, scale: 0.25, filter: 'blur(2px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.25, filter: 'blur(2px)' }}
                transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              >
                {status === 'error' ? (
                  <TbAlertOctagonFilled
                    size={26}
                    className={cn('text-red-500 dark:text-red-500')}
                  />
                ) : (
                  <LuCircleDotDashed
                    size={26}
                    strokeWidth={2.8}
                    className={cn(
                      'animate-spin text-neutral-700 dark:text-neutral-200',
                    )}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <AnimatedText
              text={status === 'error' ? errorMessage : loadingMessage}
              className={cn(
                'text-xl font-semibold',
                status === 'error'
                  ? 'text-red-500'
                  : 'text-neutral-700 dark:text-neutral-200',
              )}
            />
          </motion.div>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {status === 'error' && (
            <motion.button
              initial={{
                opacity: 0,
                x: -55,
                filter: 'blur(4px)',
                scale: 0.8,
              }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 1, x: -55, filter: 'blur(4px)', scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleRetry}
              className={cn(
                'z-10 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black',
              )}
            >
              <FaArrowRotateRight size={22} />
            </motion.button>
          )}
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
};

function AnimatedText({
  text,
  className,
  delayStep = 0.014,
}: {
  text: string;
  className?: string;
  delayStep?: number;
}) {
  const chars = text.split('');

  return (
    <span style={{ display: 'inline-flex' }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          layout
          key={text}
          style={{ display: 'inline-flex', willChange: 'transform' }}
        >
          {chars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: 10, opacity: 0, scale: 0.5, filter: 'blur(2px)' }}
              animate={{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ y: -10, opacity: 0, scale: 0.5, filter: 'blur(2px)' }}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 16,
                mass: 1.2,
                delay: i * delayStep,
              }}
              style={{
                display: 'inline-block',
                whiteSpace: char === ' ' ? 'pre' : undefined,
              }}
              className={className}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
