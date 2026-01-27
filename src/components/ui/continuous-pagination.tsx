"use client";

import { useState, useEffect, type FC, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sun, Moon } from "lucide-react";

/* --- Types --- */

export interface ContinuousPaginationProps {
  totalPages?: number;
  defaultPage?: number;
  showThemeToggle?: boolean;
}

/* --- Sub-Components --- */

interface PageButtonProps {
  children: ReactNode;
  onClick: () => void;
}

const PageButton: FC<PageButtonProps> = ({ children, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="h-16 w-16 rounded-xl flex items-center justify-center text-[#706F78] dark:text-zinc-500 hover:text-[#65656c] dark:hover:text-zinc-300 border border-slate-500/20 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[0_4px_10px_rgba(0,0,0,0.12)]"
      whileHover={{
        scale: 1.08,
        y: -6,
        boxShadow: "0 6px 10px rgba(0,0,0,0.12)",
      }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {children}
    </motion.button>
  );
};

/* --- Main Component --- */

export const ContinuousPagination: FC<ContinuousPaginationProps> = ({
  totalPages = 5,
  defaultPage = 1,
  showThemeToggle = true,
}) => {
  const [active, setActive] = useState<number>(defaultPage);
  const [isDark, setIsDark] = useState<boolean>(false);

  // Theme Sync
  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  const paginate = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setActive(page);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 bg-white dark:bg-zinc-950 transition-colors duration-500 h-screen w-full">
      {/* Theme Toggle */}
      {showThemeToggle && (
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
      )}

      <div className="flex items-center justify-center gap-3 text-sm">
        {/* Prev */}
        <PageButton onClick={() => paginate(active - 1)}>
          <ChevronLeft size={28} />
        </PageButton>

        {/* Pages */}
        <div className="relative flex gap-3">
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            const isActive = page === active;

            return (
              <motion.button
                key={page}
                onClick={() => paginate(page)}
                className={`relative z-10 h-16 w-16 rounded-xl flex items-center justify-center text-sm font-medium transition-colors duration-300
                  border border-slate-500/20 dark:border-zinc-800 shadow-[0_4px_10px_rgba(0,0,0,0.12)]
                  ${isActive
                    ? "text-white"
                    : "text-gray-500 dark:text-zinc-500 hover:text-gray-800 dark:hover:text-zinc-300 bg-white dark:bg-zinc-900"
                  }`}
                whileHover={
                  !isActive
                    ? {
                        y: -6,
                        boxShadow: isDark
                          ? "0 10px 20px rgba(0,0,0,0.4)"
                          : "0 6px 10px rgba(0,0,0,0.12)",
                      }
                    : {}
                }
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                {/* Active background */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="active-bg"
                      className="absolute inset-0 rounded-xl overflow-hidden"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.8 }}
                    >
                      <div
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: isDark
                            ? `linear-gradient(135deg, #3f3f46 0%, #18181b 50%, #09090b 100%)`
                            : `linear-gradient(135deg, #2a2a2e 0%, #1a1a1c 50%, #0a0a0c 100%)`,
                          border: `1px solid ${isDark ? "#52525b" : "#3a3a3e"}`,
                          boxShadow: `
                            0 8px 16px -4px rgba(0,0,0,0.7),
                            inset 0 1px 1px 0 rgba(255, 255, 255, ${isDark ? "0.1" : "0.15"})
                          `,
                        }}
                      />
                      <motion.div
                        className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 5,
                          ease: "easeInOut",
                        }}
                      />
                      <span
                        className="absolute inset-0 rounded-[inherit] pointer-events-none"
                        style={{
                          boxShadow: "inset 0 -4px 8px 0 rgba(0, 0, 0, 0.6)",
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <span className="relative z-10 text-xl">{page}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Next */}
        <PageButton onClick={() => paginate(active + 1)}>
          <ChevronRight size={28} />
        </PageButton>
      </div>
    </div>
  );
};
