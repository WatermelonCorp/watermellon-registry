import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuCircleDotDashed } from 'react-icons/lu';
import { FaArrowRotateRight } from 'react-icons/fa6';
import { TbAlertOctagonFilled } from 'react-icons/tb';
import { Sun, Moon } from 'lucide-react'; // For the toggle button

interface InlineFeedbackProps {
  errorMessage?: string;
  loadingMessage?: string;
  onRetry?: () => void;
}

export const FeedbackAction: React.FC<InlineFeedbackProps> = ({
  errorMessage = "Sync Failed",
  loadingMessage = "Syncing",
  onRetry
}) => {
  const [status, setStatus] = useState<'error' | 'loading'>('error');
  const [darkMode, setDarkMode] = useState(false);

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
    <div className={`min-h-screen transition-colors duration-500 flex flex-col items-center justify-center p-4 ${darkMode ? 'bg-[#121214]' : 'bg-white'}`}>

      {/* Theme Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`mb-12 p-3 rounded-full transition-all ${darkMode ? 'bg-[#1C1C1E] text-yellow-400' : 'bg-[#F4F4F9] text-gray-600 shadow-sm'}`}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="flex items-center gap-3 h-14">
        {/* Status Container */}
        <motion.div
          layout
          initial={false}
          transition={{
            layout: {
              type: "spring",
              stiffness: 260,
              damping: 26,
              mass: 0.9,
            },
          }}
          className={`relative flex items-center h-[62px] rounded-full px-6 shadow-sm min-w-[160px] justify-center border-2 overflow-hidden transition-colors duration-300 ${status === 'error'
              ? darkMode ? 'bg-[#2A1616] border-[#422020]' : 'bg-[#F4F4F4] border-[#eceaea]/20'
              : darkMode ? 'bg-[#1C1C1E] border-[#2C2C2E]' : 'bg-[#F4F4F9] border-[#ebebef]/20'
            }`}
        >
          <AnimatePresence mode="popLayout">
            {status === 'error' ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 8, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(8px)' }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="flex items-center gap-2"
              >
                <TbAlertOctagonFilled size={28} className="text-[#FF332C]" />
                <span className={`font-bold text-xl tracking-tight ${darkMode ? 'text-[#FF453A]' : 'text-[#FF332C]'}`}>
                  {errorMessage}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 8, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(8px)' }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="relative flex items-center gap-2"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                  className="relative flex items-center justify-center"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.4,
                      ease: "easeInOut",
                    }}
                    style={{
                      boxShadow: darkMode
                        ? "0 0 14px rgba(255,255,255,0.15)"
                        : "0 0 12px rgba(181,180,188,0.9)",
                    }}
                  />

                  {/* Shining sweep */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear",
                    }}
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent 60%, rgba(255,255,255,0.9), transparent)",
                      maskImage: "radial-gradient(circle, transparent 55%, black 56%)",
                      WebkitMaskImage:
                        "radial-gradient(circle, transparent 55%, black 56%)",
                    }}
                  />

                  <LuCircleDotDashed
                    size={28}
                    strokeWidth={2.8}
                    className={`relative transition-colors ${darkMode ? 'text-gray-400' : 'text-[#B5B4BC]'}`}
                  />
                </motion.div>

                <span className={`font-bold text-xl transition-colors ${darkMode ? 'text-gray-200' : 'text-[#232328]'}`}>
                  {loadingMessage}
                </span>

                {/* Text Shining Sweep */}
                <motion.span
                  className="absolute inset-0"
                  initial={{ x: '-150%' }}
                  animate={{ x: '150%' }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: "linear",
                  }}
                  style={{
                    background: darkMode
                      ? 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.1), transparent 80%)'
                      : 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.35), transparent 80%)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Retry Button */}
        <AnimatePresence>
          {status === 'error' && (
            <motion.button
              initial={{ opacity: 0, scale: 0.85, x: -16 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.85, x: -16 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleRetry}
              className={`w-14 h-14 overflow-hidden rounded-full shadow-lg flex items-center justify-center transition-colors ${darkMode ? 'bg-white text-black' : 'bg-black text-white'
                }`}
            >
              <FaArrowRotateRight size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};