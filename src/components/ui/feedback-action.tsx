import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LuCircleDotDashed } from 'react-icons/lu';
import { FaArrowRotateRight } from 'react-icons/fa6';
import { TbAlertOctagonFilled } from 'react-icons/tb';

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
    <div className="min-h-full flex items-center justify-center p-4 transition-colors bg-transparent dark:bg-neutral-950">
      <div className="flex items-center gap-3 h-14">
        {/* STATUS PILL */}
        <motion.div
          layout
          initial={false}
          transition={{
            layout: {
              type: 'spring',
              stiffness: 260,
              damping: 26,
              mass: 0.9,
            },
          }}
          className={`relative flex items-center h-15.5 px-6 min-w-40 justify-center rounded-full border overflow-hidden shadow-sm transition-colors ${status === 'error'
            ? 'bg-neutral-100 border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800'
            : 'bg-neutral-100 border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800'
            }`}
        >
          <AnimatePresence mode="popLayout">
            {status === 'error' ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 8, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(8px)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="flex items-center gap-2"
              >
                <TbAlertOctagonFilled
                  size={26}
                  className="text-red-500 dark:text-red-400"
                />
                <span className="font-bold text-xl tracking-tight text-red-500 dark:text-red-400">
                  {errorMessage}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 8, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(8px)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="relative flex items-center gap-2"
              >
                {/* SPINNER */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                  className="relative flex items-center justify-center"
                >
                  {/* glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{ opacity: [0.25, 0.6, 0.25] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.4,
                      ease: 'easeInOut',
                    }}
                    style={{
                      boxShadow:
                        '0 0 12px rgba(255,255,255,0.12)',
                    }}
                  />

                  {/* sweep */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: 'linear',
                    }}
                    style={{
                      background:
                        'conic-gradient(from 0deg, transparent 60%, rgba(255,255,255,0.6), transparent)',
                      maskImage:
                        'radial-gradient(circle, transparent 55%, black 56%)',
                      WebkitMaskImage:
                        'radial-gradient(circle, transparent 55%, black 56%)',
                    }}
                  />

                  <LuCircleDotDashed
                    size={26}
                    strokeWidth={2.8}
                    className="text-neutral-500 dark:text-neutral-400"
                  />
                </motion.div>

                <span className="font-bold text-xl text-neutral-900 dark:text-neutral-200">
                  {loadingMessage}
                </span>

                {/* TEXT SHINE */}
                <motion.span
                  className="absolute inset-0 pointer-events-none dark:opacity-60"
                  initial={{ x: '-150%' }}
                  animate={{ x: '150%' }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: 'linear',
                  }}
                  style={{
                    background:
                      'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.35), transparent 80%)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* RETRY BUTTON */}
        <AnimatePresence>
          {status === 'error' && (
            <motion.button
              initial={{ opacity: 0, scale: 0.85, x: -16 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.85, x: -16 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleRetry}
              className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center bg-black text-white dark:bg-neutral-100 dark:text-black"
            >
              <FaArrowRotateRight size={22} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};