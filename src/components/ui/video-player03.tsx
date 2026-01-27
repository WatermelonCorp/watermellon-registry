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

/**
 * UTILITIES
 */
const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

/**
 * PROPS
 */
export interface VideoPlayer03Props {
    src: string;
    poster?: string;
    autoPlay?: boolean;
    loop?: boolean;
    className?: string;
    onPlay?: () => void;
    onPause?: () => void;
}

export const VideoPlayer03: React.FC<VideoPlayer03Props> = ({
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

    const onTimeUpdate = () => {
        if (videoRef.current && !isScrubbing) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const onLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
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

    const toggleMute = () => {
        if (!videoRef.current) return;
        const newMuted = !isMuted;
        setIsMuted(newMuted);
        videoRef.current.muted = newMuted;
    };

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            containerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        setIsFullscreen(!isFullscreen);
    };

    const togglePiP = async () => {
        if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
        } else if (videoRef.current) {
            await videoRef.current.requestPictureInPicture();
        }
    };

    const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setCurrentTime(val);
        if (videoRef.current) {
            videoRef.current.currentTime = val;
        }
    };

    const handleSeekHover = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!seekRef.current || !duration) return;
        const rect = seekRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = Math.min(Math.max(x / rect.width, 0), 1);
        setHoverX(x);
        setHoverTime(percent * duration);
    };

    const handleMouseMove = () => {
        setIsHovering(true);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = window.setTimeout(() => {
            if (isPlaying) setIsHovering(false);
        }, 3000);
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
            className={`relative w-full max-w-6xl h-[90vh] aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl group flex items-center justify-center border border-black/5 ${className}`}
        >
            <video
                ref={videoRef}
                className="w-full h-full object-cover cursor-pointer"
                src={src}
                poster={poster}
                autoPlay={autoPlay}
                loop={loop}
                onClick={togglePlay}
                onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={onLoadedMetadata}
            />

            <AnimatePresence>
                {!isPlaying && (
                    <motion.div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <div className="bg-white/10 backdrop-blur-md rounded-full p-8 border border-white/20">
                            <Play className="w-12 h-12 text-white fill-white ml-1" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isHovering && (
                    <motion.div className="absolute bottom-6   w-[90%] bg-[#121212]/80 backdrop-blur-2xl border border-black/5 rounded-2xl p-4 flex flex-col gap-3 z-50 shadow-2xl">

                        {/* PROGRESS */}
                        <div
                            ref={seekRef}
                            onMouseMove={handleSeekHover}
                            onMouseLeave={() => setHoverTime(null)}
                            className="relative w-full"
                        >
                            <input title='timestamp'
                                type="range"
                                min={0}
                                max={duration}
                                step={0.1}
                                value={currentTime}
                                onChange={handleScrub}
                                onMouseDown={() => setIsScrubbing(true)}
                                onMouseUp={() => setIsScrubbing(false)}
                                className="absolute inset-0 w-full h-1.5 opacity-0 cursor-pointer z-10"
                            />

                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden relative">
                                <motion.div
                                    className="h-full bg-white absolute top-0 left-0 rounded-full"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>

                            <div
                                className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-white pointer-events-none"
                                style={{ left: `${progressPercent}%` }}
                            />
                            {hoverTime !== null && (
                                <div
                                    className="absolute -top-12 text-xs text-white/90 pointer-events-none"
                                    style={{ left: hoverX, transform: 'translateX(-50%)' }}
                                >
                                    {formatTime(hoverTime)} / {formatTime(duration)}
                                </div>
                            )}
                        </div>

                        {/* CONTROLS */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button onClick={togglePlay} className="hover:bg-white/10 p-2 rounded-lg">
                                    {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                                </button>

                                {/* VOLUME */}
                                <div
                                    className="flex items-center gap-1 relative"
                                    onMouseEnter={() => setShowVolumeSlider(true)}
                                    onMouseLeave={() => setShowVolumeSlider(false)}
                                >
                                    <button onClick={toggleMute} className="hover:bg-white/10 p-2 text-white rounded-lg">
                                        {isMuted ? <VolumeX /> : <Volume2 />}
                                    </button>

                                    <AnimatePresence>
                                        {showVolumeSlider && (
                                            <motion.input
                                                type="range"
                                                min={0}
                                                max={1}
                                                step={0.01}
                                                value={volume}
                                                onChange={onVolumeChange}
                                                className="w-20 h-1 accent-white"
                                            />
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="text-xs text-white/60">
                                    <span className="text-white">{formatTime(currentTime)}</span> / {formatTime(duration)}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button title='settings' className="hover:bg-white/10 p-2 rounded-lg text-white/70">
                                    <Settings />
                                </button>
                                <button title='pictureInpicture' onClick={togglePiP} className="hover:bg-white/10 p-2 rounded-lg text-white/70">
                                    <PictureInPicture2 />
                                </button>
                                <button onClick={toggleFullscreen} className="hover:bg-white/10 p-2 rounded-lg text-white/70">
                                    {isFullscreen ? <Minimize /> : <Maximize />}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
