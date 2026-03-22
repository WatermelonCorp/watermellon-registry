"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TbMessageFilled,
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
} from "react-icons/tb";

interface VoiceMessageProps {
  duration: number;
  transcription: string;
  waveformHeights?: number[];
  className?: string;
}

const DEFAULT_WAVEFORM = [
  8, 12, 16, 12, 10, 18, 24, 16, 14, 20, 12, 16, 22, 18, 14, 10, 16, 24, 18, 14,
  12, 10, 8, 12, 16, 14, 10,
];

export const TranscribeVoiceMessage: React.FC<VoiceMessageProps> = ({
  duration: initialDuration,
  transcription,
  waveformHeights = DEFAULT_WAVEFORM,
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTranscription, setShowTranscription] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    let frameId: number;
    const startTime = performance.now() - currentTime * 1000;

    const tick = (now: number) => {
      const nextTime = (now - startTime) / 1000;
      if (nextTime >= initialDuration) {
        setCurrentTime(initialDuration);
        setIsPlaying(false);
      } else {
        setCurrentTime(nextTime);
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, initialDuration, currentTime]);

  const handlePlayToggle = () => {
    if (currentTime >= initialDuration) setCurrentTime(0);
    setIsPlaying(!isPlaying);
  };

  const remainingTime = Math.ceil(initialDuration - currentTime);
  const progressPercent = currentTime / initialDuration;

  const words = transcription.split(" ");
  const totalChars = transcription.length;
  const isDone = currentTime >= initialDuration;

  const revealedCount = isDone
    ? totalChars
    : Math.floor(progressPercent * totalChars);

  return (
    <div
      className={`theme-injected flex w-full flex-col items-center justify-center p-2 antialiased select-none sm:p-4 ${className}`}
    >
      <div className="relative flex w-full max-w-fit items-center gap-2 sm:gap-4">
        <button
          title="Transcription"
          onClick={() => setShowTranscription(!showTranscription)}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 transition-all duration-300 sm:h-16 sm:w-16 ${
            showTranscription
              ? "border-border text-foreground bg-transparent"
              : "bg-muted text-foreground hover:bg-accent border-transparent"
          }`}
        >
          <TbMessageFilled size={22} className="sm:hidden" />
          <TbMessageFilled size={28} className="hidden sm:block" />
        </button>

        <div className="border-border bg-muted flex items-center gap-2 rounded-lg border px-3 py-2 shadow-sm transition-colors sm:gap-3 sm:px-4 sm:py-3">
          <button
            onClick={handlePlayToggle}
            className="text-foreground flex h-7 w-7 items-center justify-center transition-all active:scale-90 sm:h-8 sm:w-8"
          >
            {isPlaying ? (
              <motion.div
                initial={{ opacity: 0, scale: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
              >
                <TbPlayerPauseFilled size={24} className="sm:w-5.5" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
              >
                <TbPlayerPlayFilled
                  size={24}
                  className="ml-0.5 sm:ml-1 sm:w-5.5"
                />
              </motion.div>
            )}
          </button>

          <div className="relative flex h-8 items-center gap-0.5 sm:h-10 sm:gap-[3.5px]">
            {waveformHeights.map((h, i) => (
              <motion.div
                key={`bg-${i}`}
                initial={{ height: h * 0.7 }}
                animate={{ height: h }}
                transition={{ duration: 0.1 }}
                className="bg-muted-foreground/50 w-0.5 rounded-lg sm:w-1"
              />
            ))}

            <div
              className="absolute inset-0 flex items-center gap-0.5 sm:gap-[3.5px]"
              style={{
                clipPath: `inset(0 ${100 - progressPercent * 100}% 0 0)`,
              }}
            >
              {waveformHeights.map((h, i) => (
                <motion.div
                  key={`fg-${i}`}
                  initial={{ height: h * 0.7 }}
                  animate={{ height: h }}
                  transition={{ duration: 0.1 }}
                  className="bg-foreground w-0.5 rounded-lg sm:w-1"
                />
              ))}
            </div>
          </div>

          <div className="text-muted-foreground relative flex h-4 w-5 items-center justify-end text-xs font-bold sm:h-5 sm:w-[26px] sm:text-base">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={remainingTime}
                initial={{ y: -15, scale: 0, filter: "blur(8px)", opacity: 0 }}
                animate={{ y: 0, scale: 1, filter: "blur(0px)", opacity: 1 }}
                exit={{ y: 15, scale: 0, filter: "blur(8px)", opacity: 0 }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.7 }}
                className="inline-block tabular-nums"
              >
                {remainingTime}
              </motion.span>
            </AnimatePresence>
            <span>s</span>
          </div>
        </div>

        <AnimatePresence>
          {showTranscription && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 8, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.85, y: 8, filter: "blur(8px)" }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              className="pointer-events-none absolute bottom-[170%] left-0 z-20 origin-bottom-left"
            >
              <div className="relative">
                <motion.div
                  layout
                  transition={{ type: "spring", damping: 32, stiffness: 300 }}
                  className="border-border bg-card w-[calc(100vw-5rem)] max-w-60 overflow-hidden rounded-lg border px-4 py-4 shadow-xl sm:max-w-70 sm:px-6 sm:py-5"
                >
                  <p className="text-foreground flex flex-wrap text-sm leading-relaxed font-bold tracking-tight wrap-break-word sm:text-lg">
                    {(() => {
                      let globalIndex = 0;
                      return words.map((word, wIdx) => {
                        const wordChars = word.split("");
                        const wordNode = (
                          <span
                            key={wIdx}
                            className="mr-[0.25em] inline-flex whitespace-nowrap"
                          >
                            {wordChars.map((char, cIdx) => {
                              const isRevealed = globalIndex < revealedCount;
                              globalIndex++;
                              return (
                                <motion.span
                                  key={cIdx}
                                  initial={false}
                                  animate={{
                                    opacity: isRevealed ? 1 : 0,
                                  }}
                                  transition={{
                                    ease: "easeOut",
                                    duration: 0.1,
                                  }}
                                  className="inline-block"
                                >
                                  {char}
                                </motion.span>
                              );
                            })}
                          </span>
                        );
                        globalIndex++;
                        return wordNode;
                      });
                    })()}
                  </p>
                </motion.div>

                <div className="absolute -bottom-9 left-4 flex flex-col items-center gap-1.5">
                  <div className="bg-card ml-3 h-3.5 w-3.5 rounded-lg shadow-md sm:h-4 sm:w-4" />
                  <div className="bg-card h-1.5 w-1.5 rounded-lg shadow-md sm:h-2 sm:w-2" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
