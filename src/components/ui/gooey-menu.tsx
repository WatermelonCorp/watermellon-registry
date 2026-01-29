import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

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

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden">
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
        className="relative flex items-center justify-center w-[600px] h-[300px]"
      >
        {/* Trigger */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          className="relative z-20 flex items-center justify-center w-[64px] h-[64px] bg-black rounded-full shadow-lg"
        >
          <svg width="32" height="32" viewBox="0 0 180 180" fill="none">
            <circle cx="90" cy="90" r="90" fill="black" />
            <path
              d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.356L137.352 160.6Z"
              fill="white"
            />
            <path
              d="M115.352 54H127.466V125.97H115.352V54Z"
              fill="white"
            />
          </svg>
        </motion.button>

        {/* Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 0, scale: 0.7 }}
              animate={{ opacity: 1, x: 190, scale: 1 }}
              exit={{ opacity: 0, x: 0, scale: 0.7 }}
              transition={{
                type: "spring",
                damping: 36,
                stiffness: 220,
              }}
              className="absolute bottom-32 z-10 w-[300px] bg-black rounded-[24px] p-6 mb-8 text-white shadow-xl origin-top"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-[18px] font-medium font-mono">
                  {title}
                </span>
                <span className="text-[#a09f9f] font-mono">
                  {version}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Errors</span>
                  <span className="text-[#EB5757] w-10 h-10 flex items-center justify-center rounded-full bg-[#EB5757]/15 font-mono text-xl">
                    {errors}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Route</span>
                  <span className="text-[#a09f9f] font-mono">
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