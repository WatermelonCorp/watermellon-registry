import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useMotionValueEvent } from 'framer-motion';
import { TbPlayerPauseFilled, TbPlayerPlayFilled } from 'react-icons/tb';

interface WaveformScrubProps {
    duration?: number;
    fileName?: string;
    waveformHeights?: number[];
}

const DEFAULT_WAVEFORM = [
    4, 7, 9, 6, 11, 14, 12, 8, 5, 10, 15, 13, 11, 9, 6,
    10, 12, 9, 7, 5, 8, 12, 10, 7, 6, 9, 13, 11, 8, 6, 5, 11, 8, 6, 5, 11, 8, 6, 5, 8, 5, 10, 15, 13, 11, 9,
];

export const WaveformScrub: React.FC<WaveformScrubProps> = ({
    duration = 29,
    fileName = 'Mom.mp3',
    waveformHeights = DEFAULT_WAVEFORM,
}) => {
    const [currentTime, setCurrentTime] = useState(4);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isDark] = useState(false); 
    const [containerWidth, setContainerWidth] = useState(0);

    const waveformRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  
    useEffect(() => {
        const updateWidth = () => {
            if (waveformRef.current) {
                const newWidth = waveformRef.current.offsetWidth;
                setContainerWidth(newWidth);
                x.set((currentTime / duration) * newWidth);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, [duration, currentTime]);

 
    useEffect(() => {
        if (isPlaying && currentTime < duration) {
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
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [isPlaying, duration, x, containerWidth]);

   
    useMotionValueEvent(x, 'change', (latest) => {
        if (!isPlaying && containerWidth > 0) {
            const progress = latest / containerWidth;
            setCurrentTime(progress * duration);
        }
    });

    const activeProgress = useTransform(x, [0, containerWidth || 1], ['0%', '100%']);
    const displayTime = Math.round(duration - currentTime);

    return (
        <div className={`{ transition-colors duration-500 w-full px-4`}>
            <div className="flex flex-col items-center justify-center min-h-full font-sans antialiased bg-transparent py-10">

                {/* OUTER CONTAINER */}
                <div className="w-full max-w-110 rounded-3xl shadow-sm pt-4 pb-3 px-2 relative transition-colors duration-300 bg-[#E5E4F0] dark:bg-[#1C1C1E]">

                    {/* HEADER SECTION */}
                    <div className="flex items-center justify-between px-2 pr-4 mb-4">
                        <div className="flex items-center gap-4 overflow-hidden">
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="transition-all active:scale-90 text-[#1C1C1E] dark:text-white shrink-0"
                            >
                                {isPlaying ? <TbPlayerPauseFilled size={22} /> : <TbPlayerPlayFilled size={22} />}
                            </button>
                            <span className="text-[17px] sm:text-[19px] font-normal tracking-tight transition-colors text-[#313138] dark:text-[#A1A1AA] truncate">
                                {fileName}
                            </span>
                        </div>
                        <span className="text-[18px] sm:text-[20px] font-semibold tabular-nums transition-colors text-[#27262D] dark:text-white shrink-0">
                            {displayTime}s
                        </span>
                    </div>

                    {/* INNER WAVEFORM CARD */}
                    <div className="rounded-3xl h-17 relative flex items-center justify-center shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)] overflow-hidden transition-colors duration-300 bg-[#fefefe] dark:bg-[#0A0A0A] border-[1.6px] border-[#fefefe]/70 dark:border-[#0A0A0A]/70">

                        <div 
                            className="absolute inset-0 pointer-events-none transition-opacity opacity-[0.04] dark:opacity-[0.1]"
                            style={{
                                backgroundImage: `linear-gradient(-45deg, ${isDark ? '#FFF' : '#000'} 25%, transparent 25%, transparent 50%, ${isDark ? '#FFF' : '#000'} 50%, ${isDark ? '#FFF' : '#000'} 75%, transparent 75%, transparent)`,
                                backgroundSize: '4px 4px',
                            }}
                        />

                        {/* WAVEFORM WRAPPER  */}
                        <div ref={waveformRef} className="relative h-7 w-full mx-6">

                            {/* INACTIVE LAYER */}
                            <div className="absolute inset-0 flex justify-between items-center w-full">
                                {waveformHeights.map((h, i) => (
                                    <div
                                        key={i}
                                        className="w-0.5 sm:w-0.75 rounded-full shrink-0 transition-colors bg-[#C9C8D2] dark:bg-[#27272A]"
                                        style={{ height: h * 1.6 }}
                                    />
                                ))}
                            </div>

                            {/* ACTIVE LAYER */}
                            <motion.div
                                style={{ width: activeProgress }}
                                className="absolute inset-y-0 left-0 overflow-hidden z-10 pointer-events-none"
                            >
                                <div className="flex justify-between items-center h-full" style={{ width: containerWidth }}>
                                    {waveformHeights.map((h, i) => (
                                        <div
                                            key={i}
                                            className="w-0.5 sm:w-0.75 rounded-full shrink-0 transition-colors bg-[#6A6971] dark:bg-[#A1A1AA]"
                                            style={{ height: h * 1.6 }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* SCRUBBER HANDLE  */}
                    <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: containerWidth }}
                        dragElastic={0}
                        dragMomentum={false}
                        onDragStart={() => setIsPlaying(false)}
                        style={{ x, left: 24 }} 
                        className="absolute top-12 -translate-y-1/2 w-7 h-50 -ml-3.5 flex flex-col items-center z-50 cursor-grab active:cursor-grabbing"
                    >
                        <div
                            className="w-5.5 h-4.5 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-colors bg-[#1C1C1E] dark:bg-white"
                            style={{ clipPath: `polygon(15% 0%, 85% 0%, 100% 20%, 100% 60%, 60% 100%, 40% 100%, 0% 60%, 0% 20%)` }}
                        />
                        <div className="w-1 flex-1 shadow-md rounded-b-full transition-colors bg-[#1C1C1E] dark:bg-white" />
                    </motion.div>
                </div>

            </div>
        </div>
    );
};