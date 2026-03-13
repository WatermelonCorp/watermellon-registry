"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
  TbRotateClockwise2,
} from "react-icons/tb";
import { useTheme } from "next-themes";

interface WaveformScrubProps {
  duration?: number;
  fileName?: string;
  waveformHeights?: number[];
}

const DEFAULT_WAVEFORM = [
  4, 7, 9, 6, 11, 14, 12, 8, 5, 10, 15, 13, 11, 9, 6, 10, 12, 9, 7, 5, 8, 12,
  10, 7, 6, 9, 13, 11, 8, 6, 5, 11, 8, 6, 5, 11, 8, 6, 5, 8, 5, 10, 15, 13, 11,
  9,
];

export const WaveformScrub: React.FC<WaveformScrubProps> = ({
  duration = 30,
  fileName = "Mom.mp3",
  waveformHeights = DEFAULT_WAVEFORM,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { theme } = useTheme();
  const [containerWidth, setContainerWidth] = useState(0);

  const waveformRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isDark = theme === "dark";

  const currentTimeRef = useRef(currentTime);
  useEffect(() => {
    currentTimeRef.current = currentTime;
  }, [currentTime]);

  const isFinished = currentTime >= duration;

  useEffect(() => {
    const updateWidth = () => {
      if (waveformRef.current) {
        const newWidth = waveformRef.current.offsetWidth;
        setContainerWidth(newWidth);
        x.set((currentTime / duration) * newWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [duration, currentTime, x]);

  useEffect(() => {
    if (isPlaying && currentTimeRef.current < duration) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const next = Math.min(prev + 0.1, duration);
          x.set((next / duration) * containerWidth);
          if (next >= duration) setIsPlaying(false);
          return next;
        });
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, duration, x, containerWidth]);

  useMotionValueEvent(x, "change", (latest) => {
    if (!isPlaying && containerWidth > 0) {
      const progress = latest / containerWidth;
      setCurrentTime(progress * duration);
    }
  });

  const activeProgress = useTransform(
    x,
    [0, containerWidth || 1],
    ["0%", "100%"]
  );
  const displayTime = Math.round(duration - currentTime);

  const handleTogglePlay = () => {
    if (isFinished) {
      setCurrentTime(0);
      x.set(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full px-4">
      <div className="flex min-h-full flex-col items-center justify-center bg-transparent py-10 font-sans antialiased">
        <div className="w-full max-w-110 rounded-[24px] bg-neutral-100 px-2 pt-4 pb-3 shadow-sm transition-colors duration-300 dark:bg-neutral-900">
          <div className="mb-4 flex items-center justify-between px-2 pr-4">
            <div className="flex items-center gap-2 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.button
                  key={isFinished ? "reset" : isPlaying ? "pause" : "play"}
                  initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                  transition={{
                    type: "spring",
                    duration: 0.3,
                    bounce: 0,
                  }}
                  onClick={handleTogglePlay}
                  className="shrink-0 cursor-pointer text-neutral-500 dark:text-neutral-100 z-20"
                >
                  {isFinished ? (
                    <TbRotateClockwise2 size={22} />
                  ) : isPlaying ? (
                    <TbPlayerPauseFilled size={22} />
                  ) : (
                    <TbPlayerPlayFilled size={22} />
                  )}
                </motion.button>
              </AnimatePresence>
              <span className="truncate text-[17px] font-normal tracking-tight text-neutral-500 transition-colors sm:text-[19px] dark:text-neutral-100">
                {fileName}
              </span>
            </div>
            <span className="shrink-0 text-[18px] font-semibold text-neutral-500 tabular-nums transition-colors sm:text-[20px] dark:text-neutral-100">
              {displayTime}s
            </span>
          </div>

          <div className="relative flex h-17 items-center justify-center rounded-3xl border-[1.6px] border-[#fefefe]/70 bg-[#fefefe] shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)] dark:border-[#0A0A0A]/70 dark:bg-neutral-800">
            <motion.div
              style={{
                width: activeProgress,
                backgroundImage: `linear-gradient(-45deg, ${isDark ? "#FFF" : "#000"
                  } 25%, transparent 25%, transparent 50%, ${isDark ? "#FFF" : "#000"
                  } 50%, ${isDark ? "#FFF" : "#000"
                  } 75%, transparent 75%, transparent)`,
                backgroundSize: "4px 4px",
              }}
              animate={{
                backgroundPositionX: ["0px", "4px"],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.5,
                ease: "linear",
              }}
              className="pointer-events-none absolute inset-y-0 left-0 rounded-l-3xl opacity-[0.04] transition-opacity dark:opacity-[0.1]"
            />

            <div ref={waveformRef} className="relative mx-2 h-7 w-full">
              <div className="absolute inset-0 flex w-full items-center justify-between">
                {waveformHeights.map((h, i) => (
                  <div
                    key={i}
                    className="w-1 shrink-0 rounded-full bg-neutral-200 transition-colors sm:w-0.75 dark:bg-neutral-400"
                    style={{ height: h * 1.6 }}
                  />
                ))}
              </div>

              <motion.div
                style={{ width: activeProgress }}
                className="pointer-events-none absolute inset-y-0 left-0 z-10 overflow-hidden"
              >
                <div
                  className="flex h-full items-center justify-between"
                  style={{ width: containerWidth }}
                >
                  {waveformHeights.map((h, i) => (
                    <div
                      key={i}
                      className="w-1 shrink-0 rounded-full bg-neutral-800 transition-colors sm:w-0.75 dark:bg-neutral-100"
                      style={{ height: h * 1.6 }}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: containerWidth }}
                dragElastic={0}
                dragMomentum={false}
                onDragStart={() => setIsPlaying(false)}
                style={{ x, left: -10 }}
                className="absolute top-full z-10 flex h-40 -translate-y-[85%] cursor-grab flex-col items-center active:cursor-grabbing"
              >
                <div
                  className="h-4.5 w-5.5 bg-[#1C1C1E] shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-colors dark:bg-white"
                  style={{
                    clipPath: `polygon(15% 0%, 85% 0%, 100% 20%, 100% 60%, 60% 100%, 40% 100%, 0% 60%, 0% 20%)`,
                  }}
                />
                <div className="w-1 flex-1 rounded-b-full bg-[#1C1C1E] shadow-md transition-colors dark:bg-white" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
