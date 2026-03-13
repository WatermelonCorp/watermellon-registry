"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    Minimize,
    PictureInPicture2,
    Settings,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export interface VideoPlayer02Props {
    src: string;
    poster?: string;
    autoPlay?: boolean;
    loop?: boolean;
    className?: string;
    onPlay?: () => void;
    onPause?: () => void;
}

export const VideoPlayer02: React.FC<VideoPlayer02Props> = ({
    src,
    poster,
    autoPlay = false,
    loop = false,
    className = '',
    onPlay,
    onPause,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const seekRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isHovering, setIsHovering] = useState(true);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [isScrubbing, setIsScrubbing] = useState(false);
    const [hoverTime, setHoverTime] = useState<number | null>(null);
    const [hoverX, setHoverX] = useState(0);

    const hideTimerRef = useRef<number | null>(null);

    const togglePlay = useCallback(() => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
            onPause?.();
        } else {
            videoRef.current.play();
            onPlay?.();
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying, onPlay, onPause]);

    const handleMouseMove = () => {
        setIsHovering(true);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = window.setTimeout(() => {
            if (isPlaying) setIsHovering(false);
        }, 3000);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setVolume(val);
        if (videoRef.current) {
            videoRef.current.volume = val;
            setIsMuted(val === 0);
        }
    };

    useEffect(() => {
        const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', onFsChange);
        return () => document.removeEventListener('fullscreenchange', onFsChange);
    }, []);

    const progressPercent = useMemo(() => {
        return duration ? (currentTime / duration) * 100 : 0;
    }, [currentTime, duration]);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setIsHovering(false)}
            className={cn(
                "relative w-full h-[70vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group flex items-center justify-center",
                className
            )}
        >
            <video
                ref={videoRef}
                className="w-full h-full object-cover cursor-pointer"
                src={src}
                poster={poster}
                autoPlay={autoPlay}
                loop={loop}
                onClick={togglePlay}
                onTimeUpdate={() => !isScrubbing && setCurrentTime(videoRef.current?.currentTime || 0)}
                onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
            />

            {/* Central Play Button Overlay */}
            <AnimatePresence>
                {!isPlaying && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                    >
                        <div className="bg-white/10 backdrop-blur-xl rounded-full p-6 sm:p-8 border border-white/20">
                            <Play className="w-8 h-8 sm:w-12 sm:h-12 text-white fill-white ml-1" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Control Bar */}
            <AnimatePresence>
                {isHovering && (
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        className="absolute bottom-4 sm:bottom-6 w-[95%] sm:w-[90%] bg-white/10 dark:bg-[#121212]/80 backdrop-blur-2xl border border-white/10 dark:border-black/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col gap-2 sm:gap-3 z-50 shadow-2xl"
                    >
                        {/* PROGRESS BAR */}
                        <div
                            ref={seekRef}
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                setHoverX(x);
                                setHoverTime((x / rect.width) * duration);
                            }}
                            onMouseLeave={() => setHoverTime(null)}
                            className="relative w-full h-4 flex items-center cursor-pointer group/seek"
                        >
                            <input title='current time'
                                type="range"
                                min={0}
                                max={duration}
                                step={0.1}
                                value={currentTime}
                                onChange={(e) => {
                                    const val = parseFloat(e.target.value);
                                    setCurrentTime(val);
                                    if (videoRef.current) videoRef.current.currentTime = val;
                                }}
                                onMouseDown={() => setIsScrubbing(true)}
                                onMouseUp={() => setIsScrubbing(false)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />

                            <div className="h-1 sm:h-1.5 w-full bg-white/20 rounded-full overflow-hidden relative">
                                <motion.div
                                    className="h-full bg-white absolute top-0 left-0 rounded-full"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>

                            {/* Scrubber Knob */}
                            <div
                                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover/seek:scale-100 transition-transform"
                                style={{ left: `${progressPercent}%`, marginLeft: '-6px' }}
                            />

                            {/* Hover Timestamp Tooltip */}
                            {hoverTime !== null && (
                                <div
                                    className="absolute -top-10 px-2 py-1 bg-white text-black text-[10px] font-bold rounded hidden sm:block"
                                    style={{ left: hoverX, transform: 'translateX(-50%)' }}
                                >
                                    {formatTime(hoverTime)}
                                </div>
                            )}
                        </div>

                        {/* BUTTONS & CONTROLS */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 sm:gap-4">
                                <button onClick={togglePlay} className="hover:bg-white/10 p-2 rounded-lg text-white transition-colors">
                                    {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />}
                                </button>

                                {/* VOLUME CONTROL */}
                                <div
                                    className="hidden sm:flex items-center justify-start gap-1"
                                    onMouseEnter={() => setShowVolumeSlider(true)}
                                    onMouseLeave={() => setShowVolumeSlider(false)}
                                >
                                    <button onClick={() => {
                                        setIsMuted(!isMuted);
                                        if (videoRef.current) videoRef.current.muted = !isMuted;
                                    }} className="hover:bg-white/10 p-2 text-white rounded-lg">
                                        {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                    </button>

                                    <AnimatePresence>
                                        {showVolumeSlider && (
                                            <motion.div
                                                initial={{ width: 0, opacity: 0 }}
                                                animate={{ width: 80, opacity: 1 }}
                                                exit={{ width: 0, opacity: 0 }}
                                                className="overflow-hidden h-full"
                                            >
                                                <input title='volume'
                                                    type="range" min={0} max={1} step={0.01}
                                                    value={volume} onChange={onVolumeChange}
                                                    className="w-20 h-1.75 accent-white  cursor-pointer"
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="text-[10px] sm:text-xs text-white/70 font-mono">
                                    <span className="text-white">{formatTime(currentTime)}</span>
                                    <span className="mx-1">/</span>
                                    {formatTime(duration)}
                                </div>
                            </div>

                            <div className="flex items-center gap-1 sm:gap-2">
                                <button title='setting' className="hover:bg-white/10 p-2 rounded-lg text-white/70 hidden sm:block">
                                    <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                                <button title='picture in picture' onClick={() => videoRef.current?.requestPictureInPicture()} className="hover:bg-white/10 p-2 rounded-lg text-white/70">
                                    <PictureInPicture2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                                <button onClick={toggleFullscreen} className="hover:bg-white/10 p-2 rounded-lg text-white/70">
                                    {isFullscreen ? <Minimize className="w-4 h-4 sm:w-5 sm:h-5" /> : <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};