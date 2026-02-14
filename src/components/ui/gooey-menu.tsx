"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GooeyMenuProps {
  title?: string;
  version?: string;
  errors?: number;
  route?: string;
}

export function GooeyMenu({
  title = "Next.js",
  version = "v13.4.8",
  errors = 3,
  route = "Static",
}: GooeyMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative flex items-center justify-center h-full min-h-125 w-full bg-transparent transition-colors duration-300 overflow-hidden px-4">
      {/* Gooey Filter */}
      <svg className="absolute h-0 w-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div
        style={{ filter: "url(#goo)" }}
        className="relative flex items-center justify-center w-full max-w-150 h-75"
      >
        {/* Trigger */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          className={`relative z-20 flex items-center justify-center w-16 h-16 bg-black dark:bg-white rounded-full shadow-lg border-none outline-none transition-all ${
            isOpen && !isMobile ? "sm:mr-10" : "mr-0"
          }`}
        >
          <svg width="32" height="32" viewBox="0 0 180 180" fill="none">
            <circle cx="90" cy="90" r="90" className="fill-black dark:fill-white" />
            <path
              d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.356L137.352 160.6Z"
              className="fill-white dark:fill-black"
            />
            <path
              d="M115.352 54H127.466V125.97H115.352V54Z"
              className="fill-white dark:fill-black"
            />
          </svg>
        </motion.button>

        {/* Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.7 }}
              animate={{ 
                opacity: 1, 
                x: isMobile ? 0 : 190, 
                y: isMobile ? -160 : 0, 
                scale: 1 
              }}
              exit={{ opacity: 0, x: 0, y: 0, scale: 0.7 }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 220,
              }}
              className="absolute z-10 w-70 sm:w-75 bg-black dark:bg-[#1a1a1a] rounded-3xl p-6 text-white shadow-xl origin-center lg:origin-left border border-white/5"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-[16px] sm:text-[18px] font-medium font-mono truncate mr-2">
                  {title}
                </span>
                <span className="text-[#a09f9f] font-mono text-xs sm:text-sm">
                  {version}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base">Errors</span>
                  <span className="text-[#EB5757] w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#EB5757]/15 font-mono text-lg sm:text-xl border border-[#EB5757]/10">
                    {errors}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base">Route</span>
                  <span className="text-[#a09f9f] font-mono text-sm sm:text-base">
                    {route}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}