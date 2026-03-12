import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TbMessageFilled, TbPlayerPauseFilled, TbPlayerPlayFilled } from 'react-icons/tb';
import { LuSun, LuMoon } from 'react-icons/lu';

interface VoiceMessageProps {
    duration: number;
    transcription: string;
    waveformHeights?: number[];
}

const DEFAULT_WAVEFORM = [
    8, 12, 16, 12, 10, 18, 24, 16, 14, 20, 12, 16, 22, 18, 14, 10, 16, 24, 18, 14, 12, 10, 8, 12, 16, 14, 10
];

export const TranscribeVoiceMessage: React.FC<VoiceMessageProps> = ({
    duration: initialDuration,
    transcription,
    waveformHeights = DEFAULT_WAVEFORM
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [showTranscription, setShowTranscription] = useState(false);
    const [isDark, setIsDark] = useState(false);

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

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, currentTime, initialDuration]);

    const handlePlayToggle = () => {
        if (currentTime >= initialDuration) {
            setCurrentTime(0);
        }
        setIsPlaying(!isPlaying);
    };

    const remainingTime = Math.ceil(initialDuration - currentTime);
    const progressPercent = (currentTime / initialDuration) * 100;
    const words = transcription.split(' ');
    const revealedWordCount = Math.floor((currentTime / initialDuration) * words.length);
    const visibleTranscription = words.slice(0, Math.max(1, revealedWordCount)).join(' ');

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500 ${isDark ? 'bg-[#0F0F12]' : 'bg-white'}`}>
            
            {/* Theme Toggle Button */}
            <button 
                onClick={() => setIsDark(!isDark)}
                className={`-mb-44 border p-3 rounded-2xl transition-all active:scale-95 ${isDark ? 'bg-[#1C1C21] text-yellow-400 border border-white/5' : 'bg-[#F6F5FA] text-gray-500 border border-black/5'}`}
            >
                {isDark ? <LuSun size={20} /> : <LuMoon size={20} />}
            </button>

            <div className="relative flex items-center gap-4 group">

                {/* Transcription Icon Toggle */}
                <button title='transcription'
                    onClick={() => setShowTranscription(!showTranscription)}
                    className={`w-16 h-16 flex items-center justify-center rounded-full transition-all duration-300 ${
                        showTranscription 
                            ? (isDark ? 'bg-transparent text-white border-2 border-white/20' : 'bg-transparent text-[#262629] border-2 border-[#e0e0e6]') 
                            : (isDark ? 'bg-[#1C1C21] text-white hover:bg-[#25252b]' : 'bg-[#F6F5FA] text-[#262629] hover:bg-gray-200')
                    }`}
                >
                    <TbMessageFilled size={28} />
                </button>

                {/* Main Player Pill */}
                <div className={`flex items-center gap-3 rounded-full px-4 py-3 min-w-[100px] shadow-sm transition-colors ${isDark ? 'bg-[#1C1C21]' : 'bg-[#F6F5FA]'}`}>
                    <button
                        onClick={handlePlayToggle}
                        className={`w-8 h-8 flex items-center justify-center transition-all active:scale-90 ${isDark ? 'text-white' : 'text-[#262629]'}`}
                    >
                        {isPlaying ? (
                            <TbPlayerPauseFilled size={24} />
                        ) : (
                            <TbPlayerPlayFilled size={24} className="ml-1" />
                        )}
                    </button>

                    {/* Waveform Visualization */}
                    <div className="flex items-center gap-[3.5px] flex-1 h-10">
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
                                            ? (isDark ? '#FFFFFF' : '#111827') 
                                            : (isDark ? '#3F3F46' : '#ADACB8')
                                    }}
                                    transition={{ duration: 0.1 }}
                                    className="w-[4px] rounded-full"
                                />
                            );
                        })}
                    </div>

                    {/* Timer */}
                    <span className={`font-bold text-base w-6 text-right tabular-nums transition-colors ${isDark ? 'text-gray-400' : 'text-[#68676F]'}`}>
                        {remainingTime}s
                    </span>
                </div>

                {/* Transcription Bubble */}
                <AnimatePresence>
                    {showTranscription && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                            className="absolute bottom-[170%] left-0 z-10 pointer-events-none origin-bottom-left"
                        >
                            <div className="relative">
                                {/* Main Bubble */}
                                <div className={`rounded-[28px] p-6 px-5 max-w-[280px] shadow-sm border transition-colors ${isDark ? 'bg-[#1C1C21] border-white/5' : 'bg-[#F4F4F9] border-white/50'}`}>
                                    <p className={`text-[18px] leading-[1.6] font-bold tracking-tight transition-colors ${isDark ? 'text-white' : 'text-[#29292E]'}`}>
                                        {visibleTranscription}
                                        <motion.span
                                            animate={{ opacity: [1, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.8 }}
                                            className={`inline-block w-[2px] h-[1.1em] ml-0.5 align-middle ${isDark ? 'bg-white/40' : 'bg-gray-400'}`}
                                        />
                                    </p>
                                </div>

                                {/* Speech Bubble Connectors*/}
                                <div className="absolute -bottom-9 left-4 flex flex-col gap-1.5 items-center">
                                    <div className={`w-5 h-5 ml-4 rounded-full shadow-md transition-colors ${isDark ? 'bg-[#1C1C21]' : 'bg-[#F4F4F9]'}`} />
                                    <div className={`w-3 h-3 rounded-full shadow-md transition-colors ${isDark ? 'bg-[#1C1C21]' : 'bg-[#F4F4F9]'}`} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
