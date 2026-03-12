"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TbMessageFilled, TbPlayerPauseFilled, TbPlayerPlayFilled } from 'react-icons/tb';

interface VoiceMessageProps {
    duration: number;
    transcription: string;
    waveformHeights?: number[];
    className?: string;
}

const DEFAULT_WAVEFORM = [
    8, 12, 16, 12, 10, 18, 24, 16, 14, 20, 12, 16, 22, 18, 14, 10, 16, 24, 18, 14, 12, 10, 8, 12, 16, 14, 10
];

export const TranscribeVoiceMessage: React.FC<VoiceMessageProps> = ({
    duration: initialDuration,
    transcription,
    waveformHeights = DEFAULT_WAVEFORM,
    className = ""
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [showTranscription, setShowTranscription] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (isPlaying && currentTime < initialDuration) {
            timerRef.current = setInterval(() => {
                setCurrentTime((prev) => {
                    const next = prev + 0.1;
                    if (next >= initialDuration) {
                        setIsPlaying(false);
                        return initialDuration;
                    }
                    return next;
                });
            }, 100);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [isPlaying, currentTime, initialDuration]);

    const handlePlayToggle = () => {
        if (currentTime >= initialDuration) setCurrentTime(0);
        setIsPlaying(!isPlaying);
    };

    const remainingTime = Math.ceil(initialDuration - currentTime);
    const progressPercent = currentTime / initialDuration;

    const chars = transcription.split('');
    const totalChars = chars.length;
    const isDone = currentTime >= initialDuration;

    // When done, reveal everything with no fade zone trickery
    const revealedCount = isDone ? totalChars : Math.floor(progressPercent * totalChars);
    const fadeZone = 5;

    const getCharStyle = (i: number): React.CSSProperties | null => {
        const distFromFrontier = revealedCount - i;

        // Completely hidden — don't render
        if (distFromFrontier <= 0) return null;

        // Done: all chars fully visible, no blur at all
        if (isDone) {
            return { opacity: 1, filter: 'none', display: 'inline' };
        }

        // Frontier fade zone
        if (distFromFrontier <= fadeZone) {
            const t = distFromFrontier / fadeZone;
            return {
                opacity: t,
                filter: `blur(${((1 - t) * 5).toFixed(2)}px)`,
                display: 'inline',
                transition: 'opacity 0.07s ease-out, filter 0.07s ease-out',
            };
        }

        return { opacity: 1, filter: 'none', display: 'inline' };
    };

    return (
        <div className={`w-full flex flex-col items-center justify-center p-2 sm:p-4 antialiased select-none ${className}`}>
            <div className="relative flex items-center gap-2 sm:gap-4 w-full max-w-fit">

                {/* Transcription Icon Toggle */}
                <button title='Transcription'
                    onClick={() => setShowTranscription(!showTranscription)}
                    className={`shrink-0 w-11 h-11 sm:w-16 sm:h-16 flex items-center justify-center rounded-full transition-all duration-300 border-2 ${showTranscription
                        ? 'bg-transparent text-neutral-900 border-neutral-200 dark:text-white dark:border-white/20'
                        : 'bg-neutral-100 text-neutral-900 border-transparent hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700'
                        }`}
                >
                    <TbMessageFilled size={22} className="sm:hidden" />
                    <TbMessageFilled size={28} className="hidden sm:block" />
                </button>

                {/* Main Player Pill */}
                <div className="flex items-center gap-2 sm:gap-3 rounded-full px-3 sm:px-4 py-2 sm:py-3 shadow-sm transition-colors bg-neutral-100 dark:bg-neutral-800 border border-black/5 dark:border-white/5">
                    <button
                        onClick={handlePlayToggle}
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-all active:scale-90 text-neutral-900 dark:text-white"
                    >
                        {isPlaying
                            ? <TbPlayerPauseFilled size={20} className="sm:w-5.5" />
                            : <TbPlayerPlayFilled size={20} className="ml-0.5 sm:ml-1 sm:w-5.5" />
                        }
                    </button>

                    {/* Waveform */}
                    <div className="flex items-center gap-0.5 sm:gap-[3.5px] h-8 sm:h-10 overflow-hidden">
                        {waveformHeights.map((h, i) => {
                            const barProgress = (i / waveformHeights.length) * 100;
                            const isPlayed = barProgress < progressPercent * 100;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ height: h * 0.7 }}
                                    animate={{
                                        height: h,
                                        backgroundColor: isPlayed
                                            ? 'var(--tw-played-color)'
                                            : 'var(--tw-unplayed-color)'
                                    }}
                                    transition={{ duration: 0.1 }}
                                    className="w-0.5 sm:w-1 rounded-full
                                    [--tw-played-color:var(--color-neutral-900)]
                                    dark:[--tw-played-color:var(--color-white)]
                                    [--tw-unplayed-color:var(--color-neutral-400)]
                                    dark:[--tw-unplayed-color:var(--color-neutral-700)]"
                                />
                            );
                        })}
                    </div>

                    {/* Timer */}
                    <span className="font-bold text-xs sm:text-base w-5 sm:w-6 text-right tabular-nums text-neutral-500 dark:text-neutral-400">
                        {remainingTime}s
                    </span>
                </div>

                {/* Transcription Bubble */}
                <AnimatePresence>
                    {showTranscription && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.85, y: 8 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                            className="absolute bottom-[170%] left-0 z-20 pointer-events-none origin-bottom-left"
                        >
                            <div className="relative">
                                <motion.div
                                    layout
                                    transition={{ type: 'spring', damping: 32, stiffness: 300 }}
                                    className="rounded-2xl sm:rounded-[28px] px-4 py-4 sm:px-6 sm:py-5 w-[calc(100vw-5rem)] max-w-60 sm:max-w-70 shadow-xl border bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-white/10 overflow-hidden"
                                >
                                    <p className="text-sm sm:text-lg leading-relaxed font-bold tracking-tight text-neutral-900 dark:text-white wrap-break-word">
                                        {chars.map((char, i) => {
                                            const style = getCharStyle(i);
                                            if (!style) return null;
                                            return (
                                                <span key={i} style={style}>{char}</span>
                                            );
                                        })}
                                    </p>
                                </motion.div>

                                {/* Speech Bubble Connectors */}
                                <div className="absolute -bottom-9 left-4 flex flex-col gap-1.5 items-center">
                                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-3 rounded-full shadow-md bg-neutral-50 dark:bg-neutral-800" />
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shadow-md bg-neutral-50 dark:bg-neutral-800" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};