import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useMotionValueEvent } from 'motion/react';
import { TbPlayerPauseFilled, TbPlayerPlayFilled } from 'react-icons/tb';
import { Sun, Moon } from 'lucide-react'; 

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
    const [isDark, setIsDark] = useState(false); 

    const containerWidth = 392;
    const x = useMotionValue((4 / duration) * containerWidth);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
        if (!isPlaying) {
            const progress = latest / containerWidth;
            setCurrentTime(progress * duration);
        }
    });

    const activeProgress = useTransform(x, [0, containerWidth], ['0%', '100%']);
    const displayTime = Math.round(duration - currentTime);

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen font-sans antialiased transition-colors duration-500 ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#FEFEFE]'}`}>

            {/* Theme Toggle Button */}
            <button
                onClick={() => setIsDark(!isDark)}
                className={`mb-12 p-3 rounded-full transition-all active:scale-95 border ${isDark ? 'bg-[#1C1C1E] border-white/10 text-yellow-400' : 'bg-white border-black/5 text-gray-400 shadow-sm'
                    }`}
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* OUTER CONTAINER */}
            <div className={`w-[440px] rounded-[24px] shadow-sm pt-4 pb-3 px-2 relative transition-colors duration-300 ${isDark ? 'bg-[#1C1C1E]' : 'bg-[#E5E4F0]'
                }`}>

                {/* HEADER SECTION */}
                <div className="flex items-center justify-between px-2 pr-4 mb-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className={`transition-all active:scale-90 ${isDark ? 'text-white' : 'text-[#1C1C1E]'}`}
                        >
                            {isPlaying ? <TbPlayerPauseFilled size={22} /> : <TbPlayerPlayFilled size={22} />}
                        </button>
                        <span className={`text-[19px] font-normal tracking-tight transition-colors ${isDark ? 'text-[#A1A1AA]' : 'text-[#313138]'
                            }`}>
                            {fileName}
                        </span>
                    </div>
                    <span className={`text-[20px] font-semibold tabular-nums transition-colors ${isDark ? 'text-white' : 'text-[#27262D]'
                        }`}>
                        {displayTime}s
                    </span>
                </div>

                {/* INNER WAVEFORM CARD */}
                <div className={`rounded-[16px] h-[68px] relative flex items-center justify-center shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)]  overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#0A0A0A] border-[1.6px] border-[#0A0A0A]/70' : 'bg-[#fefefe] border-[1.6px] border-[#fefefe]/70'
                    }`}>

                    <div
                        className={`absolute inset-0 pointer-events-none transition-opacity ${isDark ? 'opacity-[0.1]' : 'opacity-[0.04]'}`}
                        style={{
                            backgroundImage: `linear-gradient(-45deg, ${isDark ? '#FFF' : '#000'} 25%, transparent 25%, transparent 50%, ${isDark ? '#FFF' : '#000'} 50%, ${isDark ? '#FFF' : '#000'} 75%, transparent 75%, transparent)`,
                            backgroundSize: '4px 4px',
                        }}
                    />

                    {/* WAVEFORM WRAPPER */}
                    <div className="relative h-[28px]" style={{ width: containerWidth }}>

                        {/* INACTIVE LAYER */}
                        <div className="absolute inset-0 flex justify-between items-center w-full">
                            {waveformHeights.map((h, i) => (
                                <div
                                    key={i}
                                    className={`w-[3px] rounded-full shrink-0 transition-colors ${isDark ? 'bg-[#27272A]' : 'bg-[#C9C8D2]'
                                        }`}
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
                                        className={`w-[3px] rounded-full shrink-0 transition-colors ${isDark ? 'bg-[#A1A1AA]' : 'bg-[#6A6971]'
                                            }`}
                                        style={{ height: h * 1.6 }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* SCRUBBER HANDLE */}
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: containerWidth }}
                    dragElastic={0}
                    dragMomentum={false}
                    onDragStart={() => setIsPlaying(false)}
                    style={{ x }}
                    className="absolute -top-8 left-6 -translate-y-1/2 w-[28px] h-[198px] -ml-[14px] flex flex-col items-center z-50 cursor-grab active:cursor-grabbing"
                >
                    {/* Top Hook Head */}
                    <div
                        className={`w-[22px] h-[18px] shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-colors ${isDark ? 'bg-white' : 'bg-[#1C1C1E]'
                            }`}
                        style={{
                            clipPath: `polygon(15% 0%, 85% 0%, 100% 20%, 100% 60%, 60% 100%, 40% 100%, 0% 60%, 0% 20%)`
                        }}
                    />
                    {/* Vertical Line */}
                    <div className={`w-[4px] flex-1 shadow-md rounded-b-full transition-colors ${isDark ? 'bg-white' : 'bg-[#1C1C1E]'
                        }`} />
                </motion.div>
            </div>
        </div>
    );
};