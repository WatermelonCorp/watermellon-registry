"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
    motion,
    useMotionValue,
    useTransform,
    useMotionValueEvent
} from 'motion/react';
import { TbPlayerPauseFilled, TbPlayerPlayFilled } from 'react-icons/tb';

interface WaveformScrubProps {
    duration?: number;
    fileName?: string;
    waveformHeights?: number[];
}

const DEFAULT_WAVEFORM = [
    4, 7, 9, 6, 11, 14, 12, 8, 5, 10, 15, 13, 11, 9, 6,
    10, 12, 9, 7, 5, 8, 12, 10, 7, 6, 9, 13, 11, 8, 6, 5,
    11, 8, 6, 5, 11, 8, 6, 5, 8, 5, 10, 15, 13, 11, 9,
];

export const WaveformScrub: React.FC<WaveformScrubProps> = ({
    duration = 29,
    fileName = 'Mom.mp3',
    waveformHeights = DEFAULT_WAVEFORM,
}) => {
    const [currentTime, setCurrentTime] = useState(4);
    const [isPlaying, setIsPlaying] = useState(false);
    const [containerWidth, setContainerWidth] = useState(0);

    const waveformRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const updateWidth = () => {
            if (waveformRef.current) {
                const width = waveformRef.current.offsetWidth;
                setContainerWidth(width);
                x.set((currentTime / duration) * width);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, [duration, currentTime, x]);

    useEffect(() => {
        if (isPlaying && currentTime < duration) {
            timerRef.current = setInterval(() => {
                setCurrentTime(prev => {
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
    }, [isPlaying, duration, containerWidth, x]);

    useMotionValueEvent(x, 'change', latest => {
        if (!isPlaying && containerWidth > 0) {
            const progress = latest / containerWidth;
            setCurrentTime(progress * duration);
        }
    });

    const activeProgress = useTransform(
        x,
        [0, containerWidth || 1],
        ['0%', '100%']
    );

    const displayTime = Math.round(duration - currentTime);

    return (
        <div className="w-full px-4 transition-colors duration-500">
            <div className="flex flex-col items-center justify-center min-h-full bg-transparent py-10">

                <div className="w-full max-w-110 rounded-3xl shadow-sm pt-4 pb-3 px-2 relative
                        bg-neutral-200 dark:bg-neutral-900 transition-colors duration-300">

                    {/* Header */}
                    <div className="flex items-center justify-between px-2 pr-4 mb-4">
                        <div className="flex items-center gap-4 overflow-hidden">
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="active:scale-90 text-neutral-900 dark:text-white"
                            >
                                {isPlaying
                                    ? <TbPlayerPauseFilled size={22} />
                                    : <TbPlayerPlayFilled size={22} />}
                            </button>

                            <span className="text-lg font-medium tracking-tight truncate
                               text-neutral-800 dark:text-neutral-400">
                                {fileName}
                            </span>
                        </div>

                        <span className="text-lg font-semibold tabular-nums
                             text-neutral-900 dark:text-white">
                            {displayTime}s
                        </span>
                    </div>

                    {/* Waveform Card */}
                    <div className="rounded-3xl h-17 relative flex items-center justify-center
                          bg-white dark:bg-neutral-950
                          border border-neutral-200 dark:border-neutral-800
                          overflow-hidden transition-colors">

                        {/* Subtle pattern */}
                        <div className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-10
                            bg-[linear-gradient(-45deg,black_25%,transparent_25%,transparent_50%,black_50%,black_75%,transparent_75%,transparent)]
                            dark:bg-[linear-gradient(-45deg,white_25%,transparent_25%,transparent_50%,white_50%,white_75%,transparent_75%,transparent)]
                            bg-size-[4px_4px]" />

                        <div ref={waveformRef} className="relative h-7 w-full mx-6">

                            {/* Inactive */}
                            <div className="absolute inset-0 flex justify-between items-center w-full">
                                {waveformHeights.map((h, i) => (
                                    <div
                                        key={i}
                                        className="w-0.5 sm:w-0.75 rounded-full
                               bg-neutral-300 dark:bg-neutral-800"
                                        style={{ height: h * 1.6 }}
                                    />
                                ))}
                            </div>

                            {/* Active */}
                            <motion.div
                                style={{ width: activeProgress }}
                                className="absolute inset-y-0 left-0 overflow-hidden z-10 pointer-events-none"
                            >
                                <div
                                    className="flex justify-between items-center h-full"
                                    style={{ width: containerWidth }}
                                >
                                    {waveformHeights.map((h, i) => (
                                        <div
                                            key={i}
                                            className="w-0.5 sm:w-0.75 rounded-full
                                 bg-neutral-700 dark:bg-neutral-400"
                                            style={{ height: h * 1.6 }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Scrubber */}
                    <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: containerWidth }}
                        dragElastic={0}
                        dragMomentum={false}
                        onDragStart={() => setIsPlaying(false)}
                        style={{ x, left: 24 }}
                        className="absolute top-12 -translate-y-1/2 w-7 h-50 -ml-3.5
                       flex flex-col items-center z-50 cursor-grab active:cursor-grabbing"
                    >
                        <div
                            className="w-5.5 h-4.5 shadow-lg
                         bg-neutral-900 dark:bg-white"
                            style={{
                                clipPath:
                                    'polygon(15% 0%, 85% 0%, 100% 20%, 100% 60%, 60% 100%, 40% 100%, 0% 60%, 0% 20%)'
                            }}
                        />
                        <div className="w-1 flex-1 rounded-b-full shadow
                            bg-neutral-900 dark:bg-white" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};