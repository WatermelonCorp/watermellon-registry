"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";

interface GooeyMenuProps {
  data: GooeyMenuData[];
}

interface GooeyMenuData {
  key: string;
  label: string;
  value: string;
  labelClass: string;
  valueClass: string;
}

const DIMENSIONS = {
  min: 40,
  max: 200,
};

const DEFAULT_DATA: GooeyMenuData[] = [
  {
    key: "title",
    label: "Next.js",
    value: "v13.4.8",
    labelClass: "text-sm font-medium text-neutral-500",
    valueClass: "text-sm text-neutral-500",
  },
  {
    key: "errors",
    label: "Errors",
    value: "20",
    labelClass: "text-sm font-medium",
    valueClass:
      "text-sm flex items-center justify-center rounded-full border border-[#EB5757]/10 bg-[#EB5757]/15 p-1 px-2 font-mono text-red-500 bg-red-500/20",
  },
  {
    key: "route",
    label: "Route",
    value: "Static",
    labelClass: "text-sm font-medium",
    valueClass: "text-sm text-[#a09f9f]",
  },
];

const menuVariants: Variants = {
  closed: {
    y: 0,
    borderRadius: 20,
    width: DIMENSIONS.min,
    height: DIMENSIONS.min,
    z: -10,
    transition: {
      // duration: 0.4,
      // ease: [0.22, 1, 0.36, 1],
      type: "spring",
      stiffness: 300,
      damping: 30,
      y: { delay: 0.15 },
      width: { delay: 0 },
      height: { delay: 0 },
    },
  },
  open: {
    y: -50,
    borderRadius: 10,
    width: DIMENSIONS.max,
    height: "auto",
    transition: {
      // duration: 0.4,
      // ease: [0.22, 1, 0.36, 1],
      type: "spring",
      stiffness: 300,
      damping: 30,
      width: { delay: 0.15 },
      height: { delay: 0.15 },
      borderRadius: { delay: 0.15 },
    },
  },
};

export function GooeyMenu({ data = DEFAULT_DATA }: GooeyMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex h-full min-h-125 w-full items-center justify-center  bg-transparent">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0"
        version="1.1"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="4.4"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7"
              result="SkiperGooeyFilter"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div style={{ filter: "url(#goo)" }} className="absolute">
        <motion.button
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-20 flex size-10 cursor-pointer items-center justify-center rounded-full border-none bg-black dark:bg-neutral-800"
        >
          <svg width="32" height="32" viewBox="0 0 180 180" fill="none">
            <path
              d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.356L137.352 160.6Z"
              className="fill-white dark:fill-white"
            />
            <path
              d="M115.352 54H127.466V125.97H115.352V54Z"
              className="fill-white dark:fill-white"
            />
          </svg>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="menu-content"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute bottom-0 overflow-hidden bg-black dark:bg-neutral-800"
            >
              <motion.div
                className="grid w-[200px] space-y-2 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                transition={{ duration: 0.2, delay: 0.15 }}
              >
                {data.map((item, index) => (
                  <motion.div
                    key={item.key}
                    className="flex items-center justify-between text-white"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{
                      duration: 0.25,
                      delay: 0.1 + index * 0.05,
                    }}
                  >
                    <span className={item.labelClass}>{item.label}</span>
                    <span className={item.valueClass}>{item.value}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
