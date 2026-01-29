"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { Sun, Moon } from 'lucide-react';

type ButtonStatus = 'idle' | 'loading' | 'success' | 'saved';
type Size = 'sm' | 'md' | 'lg';
type Theme = 'light' | 'dark';

const SIZE_CONFIG = {
  sm: {
    height: 52,
    circleWidth: 52,
    idleWidth: 108,
    savedWidth: 128,
    text: 'text-[18px]',
    icon: 'text-2xl',
    spinner: 'w-7 h-7',
    gap: 'gap-2',
    padding: 'px-4',
  },
  md: {
    height: 56,
    circleWidth: 56,
    idleWidth: 120,
    savedWidth: 140,
    text: 'text-[20px]',
    icon: 'text-3xl',
    spinner: 'w-8 h-8',
    gap: 'gap-3',
    padding: 'px-5',
  },
  lg: {
    height: 68,
    circleWidth: 68,
    idleWidth: 144,
    savedWidth: 168,
    text: 'text-[22px]',
    icon: 'text-[28px]',
    spinner: 'w-9 h-9',
    gap: 'gap-4',
    padding: 'px-5',
  },
};

interface SaveToggleProps {
  size?: Size;
  idleText?: string;
  savedText?: string;
  initialTheme?: Theme;
  loadingDuration?: number;
  successDuration?: number;
  onStatusChange?: (status: ButtonStatus) => void;
}

export const SaveToggle: React.FC<SaveToggleProps> = ({
  size = 'md',
  idleText = 'Save',
  savedText = 'Saved',
  initialTheme = 'light',
  loadingDuration = 1000,
  successDuration = 800,
  onStatusChange,
}) => {
  const [status, setStatus] = useState<ButtonStatus>('idle');
  const [isDark, setIsDark] = useState(initialTheme === 'dark');
  const cfg = SIZE_CONFIG[size];

  /* ✅ FIX: stable width for idle + saved */
  const stableWidth = Math.max(cfg.idleWidth, cfg.savedWidth);

  /* --- Theme Sync --- */
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  /* --- Status callback --- */
  useEffect(() => {
    onStatusChange?.(status);
  }, [status, onStatusChange]);

  const handleClick = () => {
    if (status === 'idle') {
      setStatus('loading');

      setTimeout(() => {
        setStatus('success');

        setTimeout(() => {
          setStatus('saved');
        }, successDuration);
      }, loadingDuration);
    } else if (status === 'saved') {
      setStatus('idle');
    }
  };

  const isCircle = status === 'loading' || status === 'success';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500 gap-8">

      {/* Theme Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all active:scale-90 shadow-sm"
      >
        {isDark ? (
          <Sun className="text-yellow-400" size={20} />
        ) : (
          <Moon className="text-zinc-500" size={20} />
        )}
      </button>

      <motion.button
        onClick={handleClick}
        layout
        initial={false}
        animate={{
          width: isCircle ? cfg.circleWidth : stableWidth,
          height: cfg.height,
          backgroundColor: isCircle
            ? isDark ? '#18181B' : '#292725'
            : status === 'saved'
            ? isDark ? '#09090B' : '#ffffff'
            : isDark ? '#27272A' : '#E8E7E0',
          borderColor: status === 'saved'
            ? isDark ? '#3F3F46' : '#E5E5E5'
            : 'transparent',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 35,
          mass: 1,
        }}
        style={{ borderWidth: status === 'saved' ? '2px' : '0px' }}
        className="relative overflow-hidden rounded-full flex items-center justify-center focus:outline-none shadow-sm cursor-pointer select-none active:scale-[0.97] transition-transform w-full"
      >
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className={`font-bold tracking-tight pointer-events-none ${cfg.text} text-[#2C2A26] dark:text-zinc-200`}
            >
              {idleText}
            </motion.span>
          )}

          {status === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative flex items-center justify-center"
            >
              <motion.svg
                viewBox="0 0 26 26"
                className={cfg.spinner}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke={isDark ? '#52525B' : '#D0CCC6'}
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M12 2 A10 10 0 0 1 22 12"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </motion.svg>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.15 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex items-center justify-center"
            >
              <BsCheckCircleFill
                className={`${cfg.icon} text-[#D0CCC6] dark:text-zinc-400`}
              />
            </motion.div>
          )}

          {status === 'saved' && (
            <motion.div
              key="saved"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`flex items-center justify-center ${cfg.gap} ${cfg.padding}`}
            >
              <div className="flex items-center justify-center shrink-0">
                <BsCheckCircleFill
                  className={`${cfg.icon} text-[#585654] dark:text-zinc-300`}
                />
              </div>
              <span
                className={`font-bold tracking-tight whitespace-nowrap ${cfg.text} text-[#68686A] dark:text-zinc-400`}
              >
                {savedText}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
