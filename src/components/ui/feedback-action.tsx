import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuCircleDotDashed } from 'react-icons/lu';
import { FaArrowRotateRight } from 'react-icons/fa6';
import { TbAlertOctagonFilled } from 'react-icons/tb';

interface InlineFeedbackProps {
  errorMessage?: string;
  loadingMessage?: string;
  onRetry?: () => void;
  theme?: 'light' | 'dark';
}

export const FeedbackAction: React.FC<InlineFeedbackProps> = ({
  errorMessage = 'Sync Failed',
  loadingMessage = 'Syncing',
  onRetry,
  theme = 'light',
}) => {
  const [status, setStatus] = useState<'error' | 'loading'>('error');

  const isDark = theme === 'dark';

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
    <div
      className={`min-h-full flex items-center justify-center p-4 transition-colors ${
        isDark ? 'bg-[#0E0E11]' : 'bg-transparent'
      }`}
    >
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
          className={`relative flex items-center h-15.5 px-6 min-w-40 justify-center rounded-full border overflow-hidden shadow-sm transition-colors ${
            status === 'error'
              ? isDark
                ? 'bg-[#1A0F10] border-[#3A1F22]'
                : 'bg-[#F4F4F4] border-[#ECEAEA]'
              : isDark
              ? 'bg-[#141418] border-[#26262C]'
              : 'bg-[#F4F4F9] border-[#EBEBEF]'
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
                  className={isDark ? 'text-[#FF453A]' : 'text-[#FF332C]'}
                />
                <span
                  className={`font-bold text-xl tracking-tight ${
                    isDark ? 'text-[#FF6B63]' : 'text-[#FF332C]'
                  }`}
                >
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
                      boxShadow: isDark
                        ? '0 0 12px rgba(255,255,255,0.12)'
                        : '0 0 12px rgba(0,0,0,0.08)',
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
                      background: isDark
                        ? 'conic-gradient(from 0deg, transparent 60%, rgba(255,255,255,0.6), transparent)'
                        : 'conic-gradient(from 0deg, transparent 60%, rgba(0,0,0,0.25), transparent)',
                      maskImage:
                        'radial-gradient(circle, transparent 55%, black 56%)',
                      WebkitMaskImage:
                        'radial-gradient(circle, transparent 55%, black 56%)',
                    }}
                  />

                  <LuCircleDotDashed
                    size={26}
                    strokeWidth={2.8}
                    className={isDark ? 'text-[#9A9AA4]' : 'text-[#6B6B76]'}
                  />
                </motion.div>

                <span
                  className={`font-bold text-xl ${
                    isDark ? 'text-[#E5E5EB]' : 'text-[#232328]'
                  }`}
                >
                  {loadingMessage}
                </span>

                {/* TEXT SHINE */}
                <motion.span
                  className="absolute inset-0"
                  initial={{ x: '-150%' }}
                  animate={{ x: '150%' }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: 'linear',
                  }}
                  style={{
                    background: isDark
                      ? 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.08), transparent 80%)'
                      : 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.45), transparent 80%)',
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
              className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center ${
                isDark ? 'bg-[#F5F5F7] text-black' : 'bg-black text-white'
              }`}
            >
              <FaArrowRotateRight size={22} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
