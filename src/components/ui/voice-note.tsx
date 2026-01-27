import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Play, Square, Sun, Moon } from 'lucide-react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { FaCheck } from 'react-icons/fa6';

enum RecorderState {
    IDLE = 'IDLE',
    RECORDING = 'RECORDING',
    REVIEWING = 'REVIEWING',
    PLAYING = 'PLAYING',
}

interface VoiceNoteRecorderProps {
    onSend?: (data: { duration: number; blob: Blob | null }) => void;
    onCancel?: () => void;
    maxDuration?: number;
}

export const VoiceNote: React.FC<VoiceNoteRecorderProps> = ({
    onSend,
    onCancel,
    maxDuration = 4,
}) => {
    const [state, setState] = useState<RecorderState>(RecorderState.IDLE);
    const [duration, setDuration] = useState(0);
    const [playbackTime, setPlaybackTime] = useState(0);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const isDark = theme === 'dark';
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const playbackTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const spring = { type: 'spring', stiffness: 400, damping: 30 } as const;

    const startRecording = () => {
        setState(RecorderState.RECORDING);
        setDuration(0);
        timerRef.current = setInterval(() => {
            setDuration(prev => {
                if (prev >= maxDuration) {
                    stopRecording();
                    return prev;
                }
                return prev + 1;
            });
        }, 1000);
    };

    const stopRecording = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setState(RecorderState.REVIEWING);
    };

    const cancelRecording = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
        setDuration(0);
        setPlaybackTime(0);
        setState(RecorderState.IDLE);
        onCancel?.();
    };

    const startPlayback = () => {
        setState(RecorderState.PLAYING);
        setPlaybackTime(duration);
        playbackTimerRef.current = setInterval(() => {
            setPlaybackTime(prev => {
                if (prev <= 0) {
                    stopPlayback();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const stopPlayback = () => {
        if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
        setPlaybackTime(0);
        setState(RecorderState.REVIEWING);
    };

    const handleSend = () => {
        onSend?.({ duration, blob: null });
        cancelRecording();
    };

    const formatTime = (s: number) => `${s.toString().padStart(2, '0')}s`;

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
        };
    }, []);

   
    const colors = {
        bg: isDark ? 'bg-[#0f0f12]' : 'bg-white',
        widgetBg: isDark ? 'bg-[#1a1a1e]' : 'bg-[#fefefe]',
        border: isDark ? 'border-[#2d2d33]' : 'border-[#E8E7EF]',
        text: isDark ? 'text-[#fefefe]' : 'text-slate-700',
        micIcon: isDark ? 'text-[#fefefe]' : 'text-slate-800',
        timeText: isDark ? 'text-[#fefefe]' : 'text-[#282828]',
        sendIcon: isDark ? '#fefefe' : '#272727',
        toggleBtn: isDark ? 'bg-[#1a1a1e] text-yellow-400 border-[#2d2d33]' : 'bg-white text-slate-600 border-[#E8E7EF]'
    };

    const actionBtnClass = `w-16 h-16 rounded-full border-[1.6px] shadow-sm flex items-center justify-center shrink-0 transition-colors duration-300 ${colors.widgetBg} ${colors.border}`;

    return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-8 space-y-12 transition-colors duration-500 ${colors.bg}`}>
        
        {/* Theme Toggle Button */}
        <motion.button 
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-full border shadow-sm transition-all ${colors.toggleBtn}`}
        >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>

        <div className="flex items-center gap-3">
            <AnimatePresence mode='popLayout'>
                {state !== RecorderState.IDLE && (
                    <motion.button
                        key="cancel-btn"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={spring}
                        onClick={cancelRecording}
                        className={actionBtnClass}
                    >
                        <X size={28} className={colors.text} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* CENTER WIDGET */}
            <motion.div
                layout
                transition={spring}
                className={`
                    relative flex items-center justify-center overflow-hidden shadow-sm transition-colors duration-300
                    ${state === RecorderState.IDLE ? 'w-16 h-16' : 'h-16 px-6'} 
                    rounded-full border-[1.6px] ${colors.border}
                    ${state === RecorderState.RECORDING ? (isDark ? 'bg-[#441010] border-none' : 'bg-[#FEE5E4] border-none') : colors.widgetBg}
                `}
            >
                {/* Progress Border for Recording */}
                <AnimatePresence>
                    {state === RecorderState.RECORDING && (
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <motion.rect
                                x="2"
                                y="2"
                                rx="30"
                                width="calc(100% - 4px)"
                                height="calc(100% - 4px)"
                                fill="none"
                                stroke="#ef4444"
                                strokeWidth="3"
                                pathLength={1}
                                strokeDasharray="1"
                                strokeDashoffset="1"
                                strokeLinecap="round"
                                initial={{ strokeDashoffset: 1 }}
                                animate={{ strokeDashoffset: 0 }}
                                transition={{
                                    duration: maxDuration,
                                    ease: "linear",
                                }}
                            />
                        </svg>
                    )}
                </AnimatePresence>

                <AnimatePresence mode="popLayout">
                    {/* IDLE MIC */}
                    {state === RecorderState.IDLE && (
                        <motion.button
                            key="mic-icon"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            onClick={startRecording}
                            className="flex items-center justify-center"
                        >
                            <Mic size={28} className={colors.micIcon} />
                        </motion.button>
                    )}

                    {/* RECORDING BARS */}
                    {state === RecorderState.RECORDING && (
                        <motion.div
                            key="recording-ui"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-1.5 z-10"
                        >
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <motion.div
                                    key={i}
                                    animate={{ height: [10, 22, 14, 28, 16][i % 5] }}
                                    transition={{
                                        duration: 0.4,
                                        repeat: Infinity,
                                        repeatType: 'reverse',
                                        delay: i * 0.04,
                                    }}
                                    className="w-1.5 rounded-full bg-[#FC3229]"
                                />
                            ))}
                        </motion.div>
                    )}

                    {/* REVIEW / PLAYBACK */}
                    {(state === RecorderState.REVIEWING || state === RecorderState.PLAYING) && (
                        <motion.div
                            key="review-ui"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="flex items-center gap-2 z-10"
                        >
                            <button
                                onClick={state === RecorderState.PLAYING ? stopPlayback : startPlayback}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
                                    ${state === RecorderState.PLAYING ? (isDark ? 'bg-red-900/40 text-red-400' : 'bg-red-100 text-red-500') : colors.micIcon}
                                `}
                            >
                                {state === RecorderState.PLAYING ? (
                                    <Square size={22} fill="currentColor" />
                                ) : (
                                    <Play size={22} fill="currentColor" />
                                )}
                            </button>
                            <span className={`text-[20px] font-bold tabular-nums transition-colors ${colors.timeText}`}>
                                {formatTime(state === RecorderState.PLAYING ? playbackTime : duration)}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* ACTION BUTTONS */}
            <AnimatePresence mode='popLayout'>
                {state === RecorderState.RECORDING && (
                    <motion.button
                        key="check-btn"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={spring}
                        onClick={stopRecording}
                        className={actionBtnClass}
                    >
                        <FaCheck size={26} className={colors.text} />
                    </motion.button>
                )}

                {(state === RecorderState.REVIEWING || state === RecorderState.PLAYING) && (
                    <motion.button
                        key="send-btn"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={spring}
                        onClick={handleSend}
                        className={actionBtnClass}
                    >
                        <RiSendPlaneFill size={26} color={colors.sendIcon} />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    </div>
    );
};