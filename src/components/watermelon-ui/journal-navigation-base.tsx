"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface JournalEntry {
  id: string | number;
  day: number;
  month: string;
  year?: number;
  content: React.ReactNode;
}

interface JournalNavigationProps {
  entries: JournalEntry[];
  initialIndex?: number;
  onEntryChange?: (entry: JournalEntry) => void;
}

export const JournalNavigation: React.FC<JournalNavigationProps> = ({
  entries,
  initialIndex = 0,
  onEntryChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  const directionRef = useRef(direction);
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const handleNext = () => {
    if (currentIndex < entries.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (onEntryChange) {
      onEntryChange(entries[currentIndex]);
    }
  }, [currentIndex, entries, onEntryChange]);

  const currentEntry = entries[currentIndex];

  const contentVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 3 : -3,
      opacity: 0,
    }),
    center: { y: 0, opacity: 1 },
    exit: (direction: number) => ({
      y: direction > 0 ? 3 : -3,
      opacity: 0,
    }),
  };

  const charVariants = {
    enter: () => ({
      y: directionRef.current > 0 ? 3 : -3,
      opacity: 0,
      filter: "blur(2px)",
    }),
    center: (globalIndex: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        bounce: 0.1,
        duration: 0.3,
        delay: globalIndex * 0.01,
      },
    }),
    exit: (globalIndex: number) => ({
      y: directionRef.current > 0 ? 3 : -3,
      opacity: 0,
      filter: "blur(2px)",
      transition: {
        type: "spring" as const,
        bounce: 0.1,
        duration: 0.3,
        delay: globalIndex * 0.01,
      },
    }),
  };

  const ITEM_HEIGHT = 45;

  return (
    <div className="theme-injected  flex min-h-full w-full flex-col items-center justify-center p-6 transition-colors duration-500">
      <div className="border-border bg-muted relative flex h-85 w-full max-w-90 overflow-hidden rounded-lg border shadow-sm transition-colors duration-300 select-none">
        <div className="border-border bg-background relative z-10 m-1 flex w-13.5 flex-col items-center justify-center overflow-hidden rounded-lg border transition-colors duration-300">
          <div className="from-background via-background/80 pointer-events-none absolute top-0 left-0 z-20 h-20 w-full bg-linear-to-b to-transparent backdrop-blur-[0.5px]" />

          <div
            className="absolute top-1/2 left-0 z-10 w-full"
            style={{ marginTop: "-18.5px" }}
          >
            <motion.div
              drag="y"
              dragConstraints={{
                top: -((entries.length - 1) * ITEM_HEIGHT),
                bottom: 0,
              }}
              onDragEnd={(_, info) => {
                const yOffset = info.offset.y;
                const velocity = info.velocity.y;
                const absOffset = Math.abs(yOffset);

                let itemsToMove = Math.floor((absOffset + 15) / ITEM_HEIGHT);

                if (Math.abs(velocity) > 200 && itemsToMove === 0) {
                  itemsToMove = 1;
                }

                const directionMultiplier = yOffset < 0 ? 1 : -1;
                let newIndex = currentIndex + directionMultiplier * itemsToMove;

                if (newIndex < 0) newIndex = 0;
                if (newIndex >= entries.length) newIndex = entries.length - 1;

                if (newIndex > currentIndex) setDirection(1);
                else if (newIndex < currentIndex) setDirection(-1);

                if (newIndex !== currentIndex) {
                  setCurrentIndex(newIndex);
                }
              }}
              animate={{ y: -(currentIndex * ITEM_HEIGHT) }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 32,
                mass: 0.6,
              }}
              className="flex cursor-grab flex-col items-center gap-2 active:cursor-grabbing"
            >
              {entries.map((entry, index) => {
                const isActive = index === currentIndex;
                return (
                  <motion.button
                    key={entry.id}
                    onClick={() => {
                      if (index > currentIndex) setDirection(1);
                      else if (index < currentIndex) setDirection(-1);
                      if (index !== currentIndex) {
                        setCurrentIndex(index);
                      }
                    }}
                    animate={{ scale: isActive ? 1.2 : 1 }}
                    className={`flex h-9.25 w-9.25 shrink-0 items-center justify-center rounded-lg text-[16px] font-bold transition-colors ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {entry.day.toString().padStart(2, "0")}
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          <div className="from-background via-background/80 pointer-events-none absolute bottom-0 left-0 z-20 h-20 w-full bg-linear-to-t to-transparent backdrop-blur-[0.5px]" />
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="mb-6 flex items-center justify-between">
            <div className="text-muted-foreground relative flex items-center overflow-hidden text-lg font-medium tracking-tight tabular-nums">
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.span
                  key={currentEntry.month}
                  custom={direction}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="mr-1 inline-block whitespace-nowrap"
                >
                  {currentEntry.month}
                </motion.span>
              </AnimatePresence>
              <div className="flex">
                {currentEntry.day
                  .toString()
                  .split("")
                  .map((digit, i) => (
                    <AnimatePresence
                      mode="popLayout"
                      custom={direction}
                      key={i}
                    >
                      <motion.span
                        key={`${i}-${digit}`}
                        custom={direction}
                        variants={contentVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="inline-block"
                      >
                        {digit}
                      </motion.span>
                    </AnimatePresence>
                  ))}
              </div>
            </div>

            <div className="flex gap-2">
              {[
                {
                  title: "left",
                  action: handlePrev,
                  disabled: currentIndex === 0,
                  icon: <ChevronLeft size={20} strokeWidth={2.5} />,
                },
                {
                  title: "right",
                  action: handleNext,
                  disabled: currentIndex === entries.length - 1,
                  icon: <ChevronRight size={20} strokeWidth={2.5} />,
                },
              ].map((btn) => (
                <button
                  key={btn.title}
                  title={btn.title}
                  onClick={btn.action}
                  disabled={btn.disabled}
                  className="bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground flex h-8 w-8 items-center justify-center rounded-lg transition-colors disabled:opacity-50"
                >
                  {btn.icon}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="relative flex-1">
              <AnimatePresence>
                <motion.div
                  key={currentEntry.id + "-stagger"}
                  variants={{
                    enter: { opacity: 1 },
                    center: { opacity: 1 },
                    exit: { opacity: 1, transition: { duration: 1.5 } },
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-foreground absolute top-0 left-0 w-full text-[18px] leading-relaxed font-bold -tracking-wide transition-colors"
                >
                  {typeof currentEntry.content === "string" ||
                  Array.isArray(currentEntry.content) ? (
                    <motion.div className="space-y-4">
                      {(Array.isArray(currentEntry.content)
                        ? currentEntry.content
                        : [currentEntry.content as string]
                      ).map((paragraph, pIndex, arr) => {
                        const priorLength = arr
                          .slice(0, pIndex)
                          .join("").length;
                        const segments = paragraph.split(/(\s+)/);

                        return (
                          <motion.p key={`p-${pIndex}-${currentEntry.id}`}>
                            {segments.map((segment: string, index: number) => {
                              if (/\s+/.test(segment)) {
                                return (
                                  <motion.span
                                    key={index}
                                    className="whitespace-pre"
                                  >
                                    {segment}
                                  </motion.span>
                                );
                              }

                              const previousLengths = segments
                                .slice(0, index)
                                .join("").length;

                              return (
                                <motion.span
                                  key={`word-${index}-${currentEntry.id}`}
                                  className="inline-block"
                                >
                                  {Array.from(segment).map(
                                    (char: string, charIndex: number) => {
                                      const globalIndex =
                                        priorLength +
                                        previousLengths +
                                        charIndex;

                                      return (
                                        <motion.span
                                          key={`char-${charIndex}-${currentEntry.id}`}
                                          custom={globalIndex}
                                          variants={charVariants}
                                          initial="enter"
                                          animate="center"
                                          exit="exit"
                                          className="relative inline-block"
                                        >
                                          {char}
                                        </motion.span>
                                      );
                                    }
                                  )}
                                </motion.span>
                              );
                            })}
                          </motion.p>
                        );
                      })}
                    </motion.div>
                  ) : (
                    currentEntry.content
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
