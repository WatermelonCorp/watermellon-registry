'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { ChevronDown, ArrowUpDown } from 'lucide-react';
import NumberFlow from '@number-flow/react';

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

const MAX_LENGTH = 5;

export function AaveSwapComponent({ from, to }: AaveSwapComponentProps) {
  const [inputVal, setInputVal] = useState('0');
  const [isMax, setIsMax] = useState(false);

  const numericInput = useMemo(() => {
    const parsed = parseFloat(inputVal);
    return isNaN(parsed) ? 0 : parsed;
  }, [inputVal]);

  const usdValue = useMemo(
    () => numericInput * from.priceUSD,
    [numericInput, from.priceUSD],
  );

  const outputValue = useMemo(() => {
    if (numericInput === 0) return 0;
    return numericInput * (from.priceUSD / to.priceUSD);
  }, [numericInput, from.priceUSD, to.priceUSD]);

  const isError = useMemo(
    () => (from.max ? numericInput > from.max : false),
    [from.max, numericInput],
  );

  const handleUseMax = useCallback(() => {
    if (!from.max) return;
    setIsMax(true);
    setInputVal(from.max.toString());
  }, [from.max]);

  const handleClear = useCallback(() => {
    setIsMax(false);
    setInputVal('0');
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(/[^0-9.]/g, '');
      if (val.split('.').length > 2) return;

      if (val.length > MAX_LENGTH) {
        return;
      }

      if (val !== from.max?.toString()) setIsMax(false);

      if (val === '') {
        setInputVal('0');
      } else if (
        val.length > 1 &&
        val.startsWith('0') &&
        !val.startsWith('0.')
      ) {
        setInputVal(val.replace(/^0+/, ''));
      } else {
        setInputVal(val);
      }
    },
    [from.max],
  );

  const characters = useMemo(() => inputVal.split(''), [inputVal]);

  return (
    <div className="theme-injected flex h-full min-h-150 w-full select-none items-center justify-center bg-transparent p-2 font-sans transition-colors duration-300 sm:p-4">
      <MotionConfig
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 19,
          mass: 1.2,
        }}
      >
        <motion.div className="w-[95vw] max-w-105 space-y-1">
          <motion.div
            layout
            className="rounded-2xl border-[1.6px] border-border bg-card p-4 transition-colors sm:rounded-3xl sm:p-6"
          >
            <div className="mb-4 flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-3xl bg-primary sm:h-10 sm:w-10">
                  <img
                    src={from.logo}
                    className="w-5 sm:w-6"
                    alt={from.symbol}
                  />
                </div>
                <div className="min-w-0">
                  <div className="truncate font-sans text-base font-medium text-foreground sm:text-lg">
                    {from.name}
                  </div>
                  {from.max && (
                    <div className="truncate font-sans text-xs text-muted-foreground sm:text-sm">
                      <NumberFlow value={from.max} />
                    </div>
                  )}
                </div>
              </div>
              <motion.div layout>
                {from.max && (
                  <button
                    type="button"
                    onClick={handleUseMax}
                    className={`shrink-0 rounded-3xl px-3 py-1.5 font-sans text-xs font-medium transition-all sm:px-4 sm:text-base ${isMax || isError
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-muted text-foreground hover:bg-background'
                      }`}
                  >
                    {isError || isMax ? 'Using Max' : 'Use Max'}
                  </button>
                )}
              </motion.div>
            </div>

            <div className="border-t border-border" />

            <div className="relative flex flex-col items-center overflow-hidden py-6 sm:py-8">
              <div className="relative h-20 w-full overflow-hidden">
                <input
                  autoFocus
                  inputMode="decimal"
                  value={inputVal === '0' && !isMax ? '' : inputVal}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="absolute inset-0 z-20 w-full bg-transparent text-center font-sans text-4xl font-medium text-transparent caret-foreground outline-none sm:text-6xl"
                />

                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center font-sans text-4xl font-medium tabular-nums text-foreground sm:text-6xl">
                  <AnimatePresence mode="popLayout">
                    {inputVal === '0' ? (
                      <motion.span
                        key="placeholder"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{
                          type: 'spring',
                          stiffness: 240,
                          damping: 16,
                          mass: 0.8,
                        }}
                      >
                        0
                      </motion.span>
                    ) : (
                      characters.map((char, i) => (
                        <motion.span
                          key={`${i}-${char}`}
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 40 }}
                          transition={{
                            type: 'spring',
                            stiffness: 240,
                            damping: 16,
                            mass: 0.8,
                          }}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-1 h-6 sm:mt-2 sm:h-8">
                <AnimatePresence mode="popLayout">
                  {isError ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: [-2, 2, -1, 1, 0],
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        opacity: { duration: 0.25 },
                        duration: 0.25,
                        delay: 0.15,
                      }}
                      className="font-sans text-sm font-medium text-destructive sm:text-lg"
                    >
                      Not Enough {from.symbol}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="value"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="flex items-center gap-1 font-sans text-lg font-medium text-muted-foreground sm:text-base"
                    >
                      <motion.span layout>≈</motion.span>
                      <NumberFlow
                        value={usdValue}
                        format={{ style: 'currency', currency: 'USD' }}
                        transformTiming={{
                          duration: 750,
                          easing:
                            'linear(0 0%, 0.005927 1%, 0.022466 2%, 0.047872 3%, 0.080554 4%, 0.119068 5%, 0.162116 6%, 0.208536 7%, 0.2573 8%, 0.3075 9%, 0.358346 10%, 0.409157 11%, 0.45935 12%, 0.508438 13%, 0.556014 14%, 0.601751 15%, 0.645389 16%, 0.686733 17%, 0.72564 18%, 0.762019 19%, 0.795818 20%, 0.827026 21%, 0.855662 22%, 0.881772 23%, 0.905423 24%, 0.926704 25%, 0.945714 26%, 0.962568 27%, 0.977386 28%, 0.990295 29%, 1.001426 30%, 1.010911 31%, 1.018881 32%, 1.025465 33%, 1.030792 34%, 1.034982 35%, 1.038155 36%, 1.040423 37%, 1.041892 38%, 1.042662 39%, 1.042827 40%, 1.042473 41%, 1.04168 42%, 1.040522 43%, 1.039065 44%, 1.037371 45%, 1.035493 46%, 1.03348 47%, 1.031376 48%, 1.029217 49%, 1.027037 50%, 1.024864 51%, 1.022722 52%, 1.020631 53%, 1.018608 54%, 1.016667 55%, 1.014817 56%, 1.013067 57%, 1.011422 58%, 1.009887 59%, 1.008462 60%, 1.007148 61%, 1.005944 62%, 1.004847 63%, 1.003855 64%, 1.002964 65%, 1.002169 66%, 1.001466 67%, 1.000848 68%, 1.000311 69%, 0.999849 70%, 0.999457 71%, 0.999128 72%, 0.998858 73%, 0.99864 74%, 0.99847 75%, 0.998342 76%, 0.998253 77%, 0.998196 78%, 0.998169 79%, 0.998167 80%, 0.998186 81%, 0.998224 82%, 0.998276 83%, 0.998341 84%, 0.998415 85%, 0.998497 86%, 0.998584 87%, 0.998675 88%, 0.998768 89%, 0.998861 90%, 0.998954 91%, 0.999045 92%, 0.999134 93%, 0.99922 94%, 0.999303 95%, 0.999381 96%, 0.999455 97%, 0.999525 98%, 0.999589 99%, 0.99965 100%)',
                        }}
                        spinTiming={{ duration: 0 }}
                        className="flex items-center gap-1"
                      />
                      <ArrowUpDown size={14} className="" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <div className="relative z-10 -my-2 flex h-4 items-center justify-center">
            <div className="rounded-3xl border border-border bg-background p-1.5">
              <ChevronDown size={18} className="text-muted-foreground" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 rounded-2xl border-[1.6px] border-border bg-card p-4 sm:rounded-3xl sm:p-6">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <div className="h-9 w-9 shrink-0 overflow-hidden rounded-3xl border border-border bg-background sm:h-10 sm:w-10">
                <img
                  src={to.logo}
                  className="h-full w-full object-cover"
                  alt={to.symbol}
                />
              </div>
              <div className="min-w-0">
                <div className="truncate font-sans text-base font-medium text-foreground sm:text-lg">
                  {to.name}
                </div>
                <div className="truncate font-sans text-xs text-muted-foreground sm:text-sm">
                  Receive {to.symbol}
                </div>
              </div>
            </div>

            <div className="truncate text-right font-sans text-lg font-medium text-foreground sm:text-2xl">
              <NumberFlow
                value={outputValue}
                format={{ maximumFractionDigits: 2 }}
                spinTiming={{
                  duration: 600,
                  easing: 'ease-out',
                }}
              />
            </div>
          </div>

          <div className="pt-2 sm:pt-4">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleClear}
              className="w-full rounded-3xl border-[1.2px] border-border bg-muted py-3 font-sans text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            >
              Clear
            </motion.button>
          </div>
        </motion.div>
      </MotionConfig>
    </div>
  );
}
