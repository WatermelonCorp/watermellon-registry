"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";

export interface PaginationProps {
  totalPages?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (page: number) => void;
}

export function Pagination({
  totalPages = 15,
  value,
  defaultValue = 1,
  onChange,
}: PaginationProps) {
  const isControlled = value !== undefined;
  const [page, setPage] = React.useState(defaultValue);
  const [direction, setDirection] = React.useState(0);

  const currentPage = isControlled ? value! : page;

  const paginate = (dir: number) => {
    const next = Math.min(totalPages, Math.max(1, currentPage + dir));
    if (next === currentPage) return;

    setDirection(dir);
    if (!isControlled) setPage(next);
    onChange?.(next);
  };

  return (
    <div className="flex justify-center w-full">
      <div
        className="flex items-center gap-2 sm:gap-3
        px-1 py-1 rounded-full
        bg-[#F0EFF6] dark:bg-zinc-900
        border border-[#f0eff6dd] dark:border-zinc-800"
      >
        {/* Left */}
        <motion.button
          whileHover={{ backgroundColor: "#000", color: "#fff" }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          onClick={() => paginate(-1)}
          disabled={currentPage === 1}
          className={`w-11 h-11 sm:w-14 sm:h-14
            rounded-full bg-white dark:bg-zinc-800
            text-[#030303] dark:text-white shadow
            flex items-center justify-center
            ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <HiOutlineArrowLeft className="w-5 h-5 sm:w-7 sm:h-7" />
        </motion.button>

        {/* Counter */}
        <div
          className="flex items-center pr-1 mr-1
          text-base sm:text-xl font-bold select-none
          text-[#59585F] dark:text-zinc-400"
        >
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={currentPage}
                initial={{ y: direction > 0 ? 12 : -12, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: direction > 0 ? -12 : 12, opacity: 0, filter: "blur(4px)" }}
                transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.45 }}
                className="absolute inset-0 flex items-center justify-center text-[#030303] dark:text-white"
              >
                {currentPage}
              </motion.span>
            </AnimatePresence>
          </div>

          <span className="ml-1 h-7 sm:h-8 flex items-center">
            of {totalPages}
          </span>
        </div>

        {/* Right */}
        <motion.button
          whileHover={{ backgroundColor: "#000", color: "#fff" }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          onClick={() => paginate(1)}
          disabled={currentPage === totalPages}
          className={`w-11 h-11 sm:w-14 sm:h-14
            rounded-full bg-white dark:bg-zinc-800
            text-[#030303] dark:text-white shadow
            flex items-center justify-center
            ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <HiOutlineArrowRight className="w-5 h-5 sm:w-7 sm:h-7" />
        </motion.button>
      </div>
    </div>
  );
}