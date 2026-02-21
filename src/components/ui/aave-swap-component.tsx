"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import NumberFlow from "@number-flow/react";

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

export function AaveSwapComponent({ from, to }: AaveSwapComponentProps) {
  const [inputVal, setInputVal] = useState("0");
  const [isMax, setIsMax] = useState(false);

  const numericInput = parseFloat(inputVal || "0");

  const usdValue = numericInput * from.priceUSD;

  const outputValue =
    numericInput === 0 ? 0 : numericInput * (from.priceUSD / to.priceUSD);

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
    const parts = val.split(".");
    if (parts.length > 2) return;

    if (val !== from.max?.toString()) setIsMax(false);
    setInputVal(val === "" ? "0" : val);
  };

  return (
    <div className="flex h-full min-h-150 w-full items-center justify-center bg-transparent p-2 font-sans transition-colors duration-300 select-none sm:p-4">
      <motion.div className="w-[95vw] max-w-105 space-y-1">
        <motion.div
          layout
          className="rounded-[28px] border-[1.6px] border-gray-200 bg-gray-50 p-4 transition-colors sm:rounded-[32px] sm:p-6 dark:border-[#2b2b2b] dark:bg-[#0e0e0e]"
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6D7FF9] shadow-lg shadow-blue-900/10 sm:h-10 sm:w-10 dark:shadow-blue-900/20">
                <img
                  src={from.logo}
                  className="w-5 sm:w-6 dark:invert"
                  alt={from.symbol}
                />
              </div>
              <div className="min-w-0">
                <div className="truncate text-base font-medium text-gray-900 sm:text-lg dark:text-white">
                  {from.name}
                </div>
                {from.max && (
                  <div className="truncate text-xs text-gray-500 sm:text-sm dark:text-[#8e8e8e]">
                    <NumberFlow value={from.max} />
                  </div>
                )}
              </div>
            </div>

            {from.max && (
              <button
                type="button"
                onClick={handleUseMax}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all sm:px-4 sm:text-base ${
                  isMax
                    ? "bg-gray-200 text-gray-400 dark:bg-[#2b2b2b] dark:text-[#8e8e8e]"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-[#2b2b2b] dark:text-white dark:hover:bg-[#3b3b3b]"
                }`}
              >
                {isMax ? "Using Max" : "Use Max"}
              </button>
            )}
          </div>

          <div className="border-t border-gray-200 dark:border-[#2b2b2b]" />

          <div className="relative flex flex-col items-center overflow-hidden py-6 sm:py-8">
            <div className="relative w-full">
              <input
                autoFocus
                inputMode="decimal"
                value={inputVal === "0" && !isMax ? "" : inputVal}
                onChange={handleInputChange}
                placeholder="0"
                className="xs:text-5xl w-full bg-transparent text-center text-4xl font-medium text-transparent caret-black outline-none placeholder:text-transparent sm:text-6xl dark:caret-white"
              />

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <NumberFlow
                  value={parseFloat(inputVal || "0")}
                  format={{
                    maximumFractionDigits: 18,
                  }}
                  className="xs:text-5xl text-4xl font-medium text-gray-900 sm:text-6xl dark:text-white"
                />
              </div>
            </div>

            <div className="mt-1 h-6 sm:mt-2 sm:h-8">
              <AnimatePresence mode="popLayout">
                {isError ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                      rotate: isError ? [-2, 2, -2, 2, 0] : 0,
                    }}
                    exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                    transition={{
                      rotate: { duration: 0.3, ease: "easeOut", delay: 0.2 },
                    }}
                    className="rounded-lg px-2 py-0.5 text-sm font-medium text-red-500 sm:text-lg dark:text-[#ff4a4a]"
                  >
                    Not Enough {from.symbol}
                  </motion.div>
                ) : (
                  <motion.div
                    key="value"
                    initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                    className="flex items-center gap-1 text-sm font-medium text-gray-500 sm:gap-2 sm:text-base dark:text-neutral-500"
                  >
                    <span>≈</span>
                    <NumberFlow
                      value={usdValue}
                      format={{
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }}
                    />
                    <ArrowUpDown
                      size={14}
                      className="shrink-0 cursor-pointer transition-colors hover:text-gray-900 sm:size-4 dark:hover:text-white"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <div className="relative z-10 -my-2 flex h-4 items-center justify-center">
          <div className="rounded-full border border-gray-200 bg-white p-1.5 shadow-xl transition-colors sm:p-2 dark:border-[#2b2b2b] dark:bg-[#0c0c0c]">
            <ChevronDown
              size={18}
              className="text-gray-400 sm:size-5.5 dark:text-[#8e8e8e]"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 rounded-[28px] border-[1.6px] border-gray-200 bg-gray-50 p-4 transition-colors sm:rounded-[32px] sm:p-6 dark:border-[#2b2b2b] dark:bg-[#0e0e0e]">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white sm:h-10 sm:w-10 dark:border-[#2b2b2b] dark:bg-transparent">
              <img
                src={to.logo}
                className="h-full w-full object-cover"
                alt={to.symbol}
              />
            </div>
            <div className="min-w-0">
              <div className="truncate text-base font-medium text-gray-900 sm:text-lg dark:text-white">
                {to.name}
              </div>
              <div className="truncate text-xs text-gray-500 sm:text-sm dark:text-[#8e8e8e]">
                Receive {to.symbol}
              </div>
            </div>
          </div>

          <div className="truncate pl-1 text-right text-lg font-medium text-gray-900 sm:pl-2 sm:text-2xl dark:text-white">
            <NumberFlow
              value={outputValue}
              format={{ maximumFractionDigits: 6 }}
            />
          </div>
        </div>

        <div className="pt-2 sm:pt-4">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleClear}
            className="w-full rounded-full border-[1.2px] border-gray-200 bg-gray-100 py-3 text-base text-gray-500 transition-colors hover:bg-gray-200 sm:py-3.5 sm:text-lg dark:border-[#2b2b2b]/70 dark:bg-[#1b1b1b] dark:text-[#9AADAD] dark:hover:bg-[#2b2b2b]"
          >
            Clear
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
