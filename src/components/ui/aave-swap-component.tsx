"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ArrowUpDown } from "lucide-react";

/* ---------------- Types ---------------- */
interface TokenConfig {
  name: string;
  symbol: string;
  priceUSD: number;
  max?: number;
  logo: string;
}

interface AaveSwapComponentProps {
  from: TokenConfig;
  to: TokenConfig;
  background?: string;
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
export function AaveSwapComponent({ from, to, background = "#0c0c0c" }: AaveSwapComponentProps) {
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
    if (val !== from.max?.toString()) setIsMax(false);
    setInputVal(val);
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center p-4 font-sans"
      style={{ background }}
    >
      <div className="w-full max-w-[420px] space-y-1">
        {/* Top Card */}
        <motion.div
          layout
          className="rounded-[24px] border-[1.6px] border-[#2b2b2b] p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6D7FF9] shadow-lg shadow-blue-900/20">
                <img src={from.logo} className="w-6 invert" alt={from.symbol} />
              </div>
              <div>
                <div className="text-lg font-medium text-white">{from.name}</div>
                {from.max && (
                  <div className="text-sm text-[#8e8e8e]">
                    <RollingText value={`${from.max} ${from.symbol}`} />
                  </div>
                )}
              </div>
            </div>

            {from.max && (
              <button
                onClick={handleUseMax}
                className={`rounded-full px-4 py-1.5 text-base font-medium transition-all ${
                  isMax
                    ? "bg-[#2b2b2b] text-[#8e8e8e]"
                    : "bg-[#2b2b2b] text-white hover:bg-[#3b3b3b]"
                }`}
              >
                {isMax ? "Using Max" : "Use Max"}
              </button>
            )}
          </div>

          <div className="border-t border-[#2b2b2b]" />

          {/* Input */}
          <div className="relative flex flex-col items-center py-4">
            <input
              value={inputVal}
              onChange={handleInputChange}
              placeholder="0"
              className="w-full bg-transparent text-center text-6xl font-medium text-white outline-none"
            />

            <AnimatePresence mode="wait">
              {isError ? (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-2 rounded-lg px-3 py-1 text-lg font-medium text-[#ff4a4a]"
                >
                  Not Enough {from.symbol}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 flex items-center gap-2 font-medium text-[#8e8e8e]"
                >
                  <span>≈</span>
                  <RollingText value={`$${usdValue}`} />
                  <ArrowUpDown
                    size={16}
                    className="cursor-pointer transition-colors hover:text-white"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="relative z-10 flex h-1.5 items-center justify-center">
          <div className="rounded-full border border-[#2b2b2b] bg-[#0c0c0c] p-1.5">
            <ChevronDown size={24} className="text-[#8e8e8e]" />
          </div>
        </div>

        {/* Bottom Card */}
        <div className="flex items-center justify-between rounded-[24px] border-[1.6px] border-[#2b2b2b] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border">
              <img src={to.logo} className="w-10" alt={to.symbol} />
            </div>
            <div>
              <div className="text-lg font-medium text-white">{to.name}</div>
              <div className="text-sm text-[#8e8e8e]">
                Receive {to.symbol}
              </div>
            </div>
          </div>

          <div className="text-right text-2xl font-medium text-white">
            <RollingText value={numericInput === 0 ? "0" : outputVal} />
          </div>
        </div>

        {/* Divider */}
        <div className="relative z-10 flex h-1.5 items-center justify-center"/>

        {/* Clear */}
        <motion.button
          whileHover={{ backgroundColor: "#2b2b2b" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClear}
          className="mt-4 w-full rounded-full border-[1.2px] border-[#2b2b2b]/70 bg-[#1b1b1b] py-3 text-lg text-[#9AADAD]"
        >
          Clear
        </motion.button>
      </div>
    </div>
  );
}
