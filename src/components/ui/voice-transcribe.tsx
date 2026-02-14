"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    const progressPercent = (currentTime / initialDuration) * 100;
    const words = transcription.split(' ');
    const revealedWordCount = Math.floor((currentTime / initialDuration) * words.length);
    const visibleTranscription = words.slice(0, Math.max(1, revealedWordCount)).join(' ');

    return (
        <div className={`w-full flex flex-col items-center justify-center p-2 sm:p-4 antialiased select-none ${className}`}>
            <div className="relative flex items-center gap-2 sm:gap-4 w-full max-w-fit">

                {/* Transcription Icon Toggle */}
                <button title='Transcription' 
                    onClick={() => setShowTranscription(!showTranscription)}
                    className={`shrink-0 w-11 h-11 sm:w-16 sm:h-16 flex items-center justify-center rounded-full transition-all duration-300 border-2 ${
                        showTranscription 
                            ? 'bg-transparent text-zinc-900 border-zinc-200 dark:text-white dark:border-white/20' 
                            : 'bg-zinc-100 text-zinc-900 border-transparent hover:bg-zinc-200 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700'
                    }`}
                >
                    <TbMessageFilled size={22} className="sm:hidden" />
                    <TbMessageFilled size={28} className="hidden sm:block" />
                </button>

                {/* Main Player Pill */}
                <div className="flex items-center gap-2 sm:gap-3 rounded-full px-3 sm:px-4 py-2 sm:py-3 shadow-sm transition-colors bg-zinc-100 dark:bg-zinc-800 border border-black/5 dark:border-white/5">
                    <button
                        onClick={handlePlayToggle}
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-all active:scale-90 text-zinc-900 dark:text-white"
                    >
                        {isPlaying ? <TbPlayerPauseFilled size={20} className="sm:w-5.5" /> : <TbPlayerPlayFilled size={20} className="ml-0.5 sm:ml-1 sm:w-5.5" />}
                    </button>

                    {/* Waveform Visualization */}
                    <div className="flex items-center gap-0.5 sm:gap-[3.5px] h-8 sm:h-10 overflow-hidden">
                        {waveformHeights.map((h, i) => {
                            const barProgress = (i / waveformHeights.length) * 100;
                            const isPlayed = barProgress < progressPercent;

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
                                    className="w-0.5 sm:w-1 rounded-full [--tw-played-color:#111827] dark:[--tw-played-color:#FFFFFF] [--tw-unplayed-color:#ADACB8] dark:[--tw-unplayed-color:#3F3F46]"
                                />
                            );
                        })}
                    </div>

                    {/* Timer */}
                    <span className="font-bold text-xs sm:text-base w-5 sm:w-6 text-right tabular-nums text-zinc-500 dark:text-zinc-400">
                        {remainingTime}s
                    </span>
                </div>

                {/* Transcription Bubble  */}
                <AnimatePresence>
                    {showTranscription && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                            className="absolute bottom-[170%] sm:bottom-[170%] left-0 z-20 pointer-events-none origin-bottom-left"
                        >
                            <div className="relative">
                                {/* Main Bubble */}
                                <div className="rounded-2xl sm:rounded-[28px] p-4 sm:p-6 w-[calc(100vw-5rem)] max-w-60 sm:max-w-70 shadow-xl border bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-white/10">
                                    <p className="text-sm sm:text-lg leading-relaxed font-bold tracking-tight text-zinc-900 dark:text-white">
                                        {visibleTranscription}
                                        <motion.span
                                            animate={{ opacity: [1, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.8 }}
                                            className="inline-block w-0.5 h-[1.1em] ml-0.5 align-middle bg-zinc-400 dark:bg-zinc-500"
                                        />
                                    </p>
                                </div>

                                {/* Speech Bubble Connectors */}
                                <div className="absolute -bottom-9 left-4 flex flex-col gap-1.5 items-center">
                                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-3 rounded-full shadow-md bg-zinc-50 dark:bg-zinc-800" />
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shadow-md bg-zinc-50 dark:bg-zinc-800" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};