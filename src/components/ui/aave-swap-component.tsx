"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUpDown } from "lucide-react";

/* ---------------- Types ---------------- */
export interface TokenConfig {
  name: string;
  symbol: string;
  priceUSD: number;
  max?: number;
  logo: string;
}

interface AaveSwapComponentProps {
  from: TokenConfig;
  to: TokenConfig;
}

/* ---------------- Rolling Text ---------------- */
function RollingText({
  value,
  className,
}: {
  value: string | number;
  className?: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -14, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={className}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

/* ---------------- Component ---------------- */
export function AaveSwapComponent({ from, to }: AaveSwapComponentProps) {
  const [inputVal, setInputVal] = useState("0");
  const [isMax, setIsMax] = useState(false);

  const numericInput = parseFloat(inputVal) || 0;

  const usdValue = (numericInput * from.priceUSD).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const outputVal = (numericInput * (from.priceUSD / to.priceUSD)).toLocaleString(
    "en-US",
    { maximumFractionDigits: 3 }
  );

  const isError = from.max ? numericInput > from.max : false;

  const handleUseMax = () => {
    if (!from.max) return;
    setIsMax(true);
    setInputVal(from.max.toString());
  };

  const handleClear = () => {
    setIsMax(false);
    setInputVal("0");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, "");
    const parts = val.split('.');
    if (parts.length > 2) return;
    
    if (val !== from.max?.toString()) setIsMax(false);
    setInputVal(val === "" ? "0" : val);
  };

  return (
    <div className="flex h-full min-h-150 w-full items-center justify-center p-2 sm:p-4 font-sans select-none bg-transparent transition-colors duration-300">
      <div className="w-[95vw] max-w-105 space-y-1">
        {/* Top Card */}
        <motion.div
          layout
          className="rounded-[28px] sm:rounded-[32px] border-[1.6px] border-gray-200 dark:border-[#2b2b2b] p-4 sm:p-6 bg-gray-50 dark:bg-[#0e0e0e] transition-colors"
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-[#6D7FF9] shadow-lg shadow-blue-900/10 dark:shadow-blue-900/20">
                <img src={from.logo} className="w-5 sm:w-6 dark:invert" alt={from.symbol} />
              </div>
              <div className="min-w-0">
                <div className="text-base sm:text-lg font-medium text-gray-900 dark:text-white truncate">{from.name}</div>
                {from.max && (
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-[#8e8e8e] truncate">
                    <RollingText value={`${from.max} ${from.symbol}`} />
                  </div>
                )}
              </div>
            </div>

            {from.max && (
              <button
                type="button"
                onClick={handleUseMax}
                className={`rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-base font-medium transition-all shrink-0 ${
                  isMax
                    ? "bg-gray-200 dark:bg-[#2b2b2b] text-gray-400 dark:text-[#8e8e8e]"
                    : "bg-gray-200 dark:bg-[#2b2b2b] text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-[#3b3b3b]"
                }`}
              >
                {isMax ? "Using Max" : "Use Max"}
              </button>
            )}
          </div>

          <div className="border-t border-gray-200 dark:border-[#2b2b2b]" />

          {/* Input Area */}
          <div className="relative flex flex-col items-center py-6 sm:py-8 overflow-hidden">
            <input
              autoFocus
              inputMode="decimal"
              value={inputVal === "0" && !isMax ? "" : inputVal}
              onChange={handleInputChange}
              placeholder="0"
              className="w-full bg-transparent text-center text-4xl xs:text-5xl sm:text-6xl font-medium text-gray-900 dark:text-white outline-none placeholder:text-gray-300 dark:placeholder:text-[#2b2b2b]"
            />

            <div className="h-6 sm:h-8 mt-1 sm:mt-2">
              <AnimatePresence mode="wait">
                {isError ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-lg px-2 py-0.5 text-sm sm:text-lg font-medium text-red-500 dark:text-[#ff4a4a]"
                  >
                    Not Enough {from.symbol}
                  </motion.div>
                ) : (
                  <motion.div
                    key="value"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base font-medium text-gray-500 dark:text-[#8e8e8e]"
                  >
                    <span>≈</span>
                    <RollingText value={`$${usdValue}`} />
                    <ArrowUpDown
                      size={14}
                      className="cursor-pointer transition-colors hover:text-gray-900 dark:hover:text-white shrink-0 sm:size-4"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Divider / Arrow Icon */}
        <div className="relative z-10 flex h-4 items-center justify-center -my-2">
          <div className="rounded-full border border-gray-200 dark:border-[#2b2b2b] bg-white dark:bg-[#0c0c0c] p-1.5 sm:p-2 shadow-xl transition-colors">
            <ChevronDown size={18} className="text-gray-400 dark:text-[#8e8e8e] sm:size-5.5" />
          </div>
        </div>

        {/* Bottom Card */}
        <div className="flex items-center justify-between rounded-[28px] sm:rounded-[32px] border-[1.6px] border-gray-200 dark:border-[#2b2b2b] p-4 sm:p-6 bg-gray-50 dark:bg-[#0e0e0e] transition-colors gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 dark:border-[#2b2b2b] overflow-hidden bg-white dark:bg-transparent">
              <img src={to.logo} className="w-full h-full object-cover" alt={to.symbol} />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-medium text-gray-900 dark:text-white truncate">{to.name}</div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-[#8e8e8e] truncate">
                Receive {to.symbol}
              </div>
            </div>
          </div>

          <div className="text-right text-lg sm:text-2xl font-medium text-gray-900 dark:text-white pl-1 sm:pl-2 truncate">
            <RollingText value={numericInput === 0 ? "0" : outputVal} />
          </div>
        </div>

        {/* Clear Button */}
        <div className="pt-2 sm:pt-4">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleClear}
            className="w-full rounded-full border-[1.2px] border-gray-200 dark:border-[#2b2b2b]/70 bg-gray-100 dark:bg-[#1b1b1b] py-3 sm:py-3.5 text-base sm:text-lg text-gray-500 dark:text-[#9AADAD] transition-colors hover:bg-gray-200 dark:hover:bg-[#2b2b2b]"
          >
            Clear
          </motion.button>
        </div>
      </div>
    </div>
  );
}