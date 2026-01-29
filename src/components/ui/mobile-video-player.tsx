import React, { useState, useRef, useEffect, useCallback, type ChangeEvent, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause } from 'lucide-react';

interface ModernVideoPlayerProps {
  src: string; 
  loop?: boolean;
  autoPlay?: boolean;
  poster?: string;
  className?: string; 
}

export const MobileVideoPlayer: React.FC<ModernVideoPlayerProps> = ({
  src,
  loop = true,
  autoPlay = false,
  poster,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverProgress, setHoverProgress] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const seekBarRef = useRef<HTMLDivElement | null>(null);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = (val / 100) * videoRef.current.duration;
      setProgress(val);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (seekBarRef.current) {
      const rect = seekBarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setHoverProgress(percentage);
      setHoverX(x);
    }
  };

  const formatTime = (timeInSeconds?: number) => {
    const total = timeInSeconds || 0;
    const mins = Math.floor(total / 60);
    const secs = Math.floor(total % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatHoverTime = (percent: number) => {
    const total = duration || 0;
    const seconds = (percent / 100) * total;
    return formatTime(seconds);
  };

  return (
    <div className={`min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 select-none font-sans ${className}`}>

      {/* Mobile Mockup with Bezels */}
      <div className="relative">
        <div className="relative w-[300px] h-[600px] bg-[#1a1a1a] rounded-[55px] p-[12px] shadow-2xl border-[1px] border-white/10">

          <div
            className="relative w-full h-full bg-black rounded-[43px] overflow-hidden cursor-pointer"
            onClick={togglePlay}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-[#1a1a1a] z-50 rounded-b-[20px]" />

            <video
              ref={videoRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              className="w-full h-full object-cover"
              src={src}
              loop={loop}
              autoPlay={autoPlay}
              poster={poster}
              playsInline
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%-15px)] pointer-events-none z-50">
              <AnimatePresence mode="wait">
                {!isPlaying ? (
                  <motion.div
                    key="play"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.2, opacity: 0 }}
                    className="flex items-center justify-center backdrop-blur-xl p-6 rounded-full border border-white/20"
                  >
                    <Play size={40} className="fill-white text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="pause"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="flex items-center justify-center backdrop-blur-xl p-6 rounded-full opacity-0 transition-opacity duration-300 border border-white/20"
                  >
                    <Pause size={40} className="fill-white text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>

      <div className="w-full max-w-[450px] mt-12 space-y-6">
        <div
          className="relative px-1"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setHoverProgress(null);
          }}
        >
          <AnimatePresence>
            {isHovered && hoverProgress !== null && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute z-30 pointer-events-none"
                style={{ left: hoverX }}
              >
                <div className="absolute bottom-12 -translate-x-1/2 bg-white text-black px-2 py-1 rounded text-xs font-bold font-mono">
                  {formatHoverTime(hoverProgress)}
                </div>
                <div className="absolute bottom-[-8px] -translate-x-1/2 w-[2px] h-[48px] bg-[#ff6b00]" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            ref={seekBarRef}
            animate={{ height: isHovered ? 32 : 6 }}
            className="relative w-full bg-white/10 rounded-lg overflow-hidden flex items-center"
          >
            <motion.div
              className="absolute h-full bg-[#C1C1C1]"
              style={{ width: `${progress}%` }}
            />
            <input
              title="seek"
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progress}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-40"
            />
          </motion.div>

          <div className="flex justify-between mt-4 text-xs font-mono text-white/90 tracking-widest">
            <span>{formatTime(videoRef.current?.currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
