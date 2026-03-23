"use client";

import { useState, type FC, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";

/* --- Types --- */

export interface ContinuousPaginationProps {
  totalPages?: number;
  defaultPage?: number;
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
      className="text-muted-foreground hover:text-foreground border-border bg-background flex h-10 w-10 items-center justify-center rounded-lg border shadow-[0_4px_10px_hsl(var(--foreground)/0.1)] sm:h-16 sm:w-16"
      whileHover={{
        scale: 1.08,
        y: -6,
        boxShadow: "0 6px 10px hsl(var(--foreground)/0.12)",
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
}) => {
  const [active, setActive] = useState<number>(defaultPage);
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const paginate = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setActive(page);
  };

  return (
    <div className="theme-injected flex items-center justify-center gap-1.5 text-sm sm:gap-3">
      {/* Prev */}
      <PageButton onClick={() => paginate(active - 1)}>
        <ChevronLeft className="h-5 w-5 sm:h-7 sm:w-7" />
      </PageButton>

      {/* Pages */}
      <div className="relative flex gap-1.5 sm:gap-3">
        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          const isActive = page === active;

          return (
            <motion.button
              key={page}
              onClick={() => paginate(page)}
              className={`border-border relative z-10 flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium shadow-[0_4px_10px_hsl(var(--foreground)/0.1)] transition-colors duration-300 sm:h-16 sm:w-16 ${
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground bg-background"
              }`}
              whileHover={
                !isActive
                  ? {
                      y: -6,
                      boxShadow: isDark
                        ? "0 10px 20px hsl(var(--foreground)/0.4)"
                        : "0 6px 10px hsl(var(--foreground)/0.12)",
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
                    className="absolute inset-0 overflow-hidden rounded-lg"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 24,
                      mass: 0.8,
                    }}
                  >
                    <div className="bg-primary border-border absolute inset-0 rounded-lg border shadow-[0_8px_16px_-4px_hsl(var(--foreground)/0.7),inset_0_1px_1px_0_hsl(var(--background)/0.15)]" />
                    <motion.div
                      className="via-background/10 absolute -inset-full skew-x-12 bg-linear-to-tr from-transparent to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 5,
                        ease: "easeInOut",
                      }}
                    />
                    <span
                      className="pointer-events-none absolute inset-0 rounded-[inherit]"
                      style={{
                        boxShadow:
                          "inset 0 -4px 8px 0 hsl(var(--foreground)/0.6)",
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <span className="relative z-10 text-lg font-semibold sm:text-xl">
                {page}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Next */}
      <PageButton onClick={() => paginate(active + 1)}>
        <ChevronRight className="h-5 w-5 sm:h-7 sm:w-7" />
      </PageButton>
    </div>
  );
};
