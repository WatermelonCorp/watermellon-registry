"use client";

import React from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAudioPlayback } from "@/hooks/use-audio-playback";

// Utility function to format time
export const formatTime = (seconds: number): string => {
  if (!isFinite(seconds) || isNaN(seconds)) {
    return "0:00";
  }
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// Progress Bar Component
interface ProgressBarProps {
  currentTime: number;
  duration: number;
  isLoaded: boolean;
  onSeek?: (time: number) => void;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  isLoaded,
  onSeek,
  className,
}) => {
  const getProgressPercentage = (): number => {
    if (duration === 0 || !isFinite(duration) || isNaN(duration)) return 0;
    if (!isFinite(currentTime) || isNaN(currentTime)) return 0;
    return Math.min(100, Math.max(0, (currentTime / duration) * 100));
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!onSeek || !isLoaded || duration === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;

    onSeek(Math.max(0, Math.min(duration, newTime)));
  };

  return (
    <div className={cn("flex-1", className)}>
      <div
        className={cn(
          "group relative h-2 rounded-full bg-secondary",
          onSeek && "cursor-pointer"
        )}
        onClick={handleClick}
      >
        <div
          className="h-2 rounded-full bg-primary transition-all duration-100"
          style={{ width: `${getProgressPercentage()}%` }}
        />
        {onSeek && (
          <div
            className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `calc(${getProgressPercentage()}% - 8px)` }}
          />
        )}
      </div>
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>{formatTime(currentTime)}</span>
        <span>{isLoaded ? formatTime(duration) : "Loading..."}</span>
      </div>
    </div>
  );
};

// Controls Component
interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkipBackward?: () => void;
  onSkipForward?: () => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  onPlayPause,
  onSkipBackward,
  onSkipForward,
  disabled = false,
  size = "md",
  className,
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {onSkipBackward && (
        <button
          onClick={onSkipBackward}
          disabled={disabled}
          className={cn(
            "flex items-center justify-center rounded-full transition-colors hover:bg-secondary disabled:opacity-50",
            sizeClasses[size]
          )}
        >
          <SkipBack size={iconSizes[size]} />
        </button>
      )}

      <button
        onClick={onPlayPause}
        disabled={disabled}
        className={cn(
          "flex items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50",
          sizeClasses[size]
        )}
      >
        {isPlaying ? (
          <Pause size={iconSizes[size]} />
        ) : (
          <Play size={iconSizes[size]} />
        )}
      </button>

      {onSkipForward && (
        <button
          onClick={onSkipForward}
          disabled={disabled}
          className={cn(
            "flex items-center justify-center rounded-full transition-colors hover:bg-secondary disabled:opacity-50",
            sizeClasses[size]
          )}
        >
          <SkipForward size={iconSizes[size]} />
        </button>
      )}
    </div>
  );
};

// Main Audio Player Component
export interface AudioPlayerProps {
  source: File | Blob | string;
  title?: string;
  artist?: string;
  coverImage?: string;
  showTitle?: boolean;
  showProgress?: boolean;
  showControls?: boolean;
  showVolume?: boolean;
  allowSeek?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
  className?: string;
  variant?: "default" | "minimal" | "compact";
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  source,
  title,
  artist,
  coverImage,
  showTitle = true,
  showProgress = true,
  showControls = true,
  showVolume = false,
  allowSeek = true,
  autoPlay = false,
  loop = false,
  onPlay,
  onPause,
  onEnd,
  onError,
  className,
  variant = "default",
}) => {
  const {
    isPlaying,
    audioUrl,
    playbackTime,
    duration,
    audioLoaded,
    audioRef,
    togglePlayback,
    seek,
  } = useAudioPlayback(source, { onPlay, onPause, onEnd, onError });

  // Apply autoPlay and loop
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = loop;
      if (autoPlay && audioLoaded) {
        togglePlayback();
      }
    }
  }, [audioLoaded, autoPlay, loop]);

  const handleSeek = allowSeek ? seek : undefined;

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        {showControls && (
          <Controls
            isPlaying={isPlaying}
            onPlayPause={togglePlayback}
            disabled={!audioLoaded}
            size="sm"
          />
        )}
        {showProgress && (
          <ProgressBar
            currentTime={playbackTime}
            duration={duration}
            isLoaded={audioLoaded}
            onSeek={handleSeek}
          />
        )}
        <audio ref={audioRef} src={audioUrl} preload="metadata" />
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("rounded-lg border bg-card p-4", className)}>
        <div className="flex items-center gap-3">
          {coverImage && (
            <img
              src={coverImage}
              alt={title || "Audio"}
              className="h-12 w-12 rounded object-cover"
            />
          )}
          <div className="flex-1 min-w-0">
            {showTitle && (title || artist) && (
              <div className="mb-2">
                {title && (
                  <p className="font-medium truncate text-sm">{title}</p>
                )}
                {artist && (
                  <p className="text-xs text-muted-foreground truncate">
                    {artist}
                  </p>
                )}
              </div>
            )}
            <div className="flex items-center gap-3">
              {showControls && (
                <Controls
                  isPlaying={isPlaying}
                  onPlayPause={togglePlayback}
                  disabled={!audioLoaded}
                  size="sm"
                />
              )}
              {showProgress && (
                <ProgressBar
                  currentTime={playbackTime}
                  duration={duration}
                  isLoaded={audioLoaded}
                  onSeek={handleSeek}
                />
              )}
            </div>
          </div>
        </div>
        <audio ref={audioRef} src={audioUrl} preload="metadata" />
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("rounded-lg border bg-card p-6", className)}>
      <div className="space-y-4">
        {coverImage && (
          <div className="flex justify-center">
            <img
              src={coverImage}
              alt={title || "Audio"}
              className="h-48 w-48 rounded-lg object-cover shadow-lg"
            />
          </div>
        )}

        {showTitle && (title || artist) && (
          <div className="text-center">
            {title && <h3 className="font-semibold text-lg">{title}</h3>}
            {artist && (
              <p className="text-sm text-muted-foreground">{artist}</p>
            )}
          </div>
        )}

        {showProgress && (
          <ProgressBar
            currentTime={playbackTime}
            duration={duration}
            isLoaded={audioLoaded}
            onSeek={handleSeek}
          />
        )}

        <div className="flex items-center justify-center gap-4">
          {showControls && (
            <Controls
              isPlaying={isPlaying}
              onPlayPause={togglePlayback}
              disabled={!audioLoaded}
              size="lg"
            />
          )}
          {showVolume && (
            <div className="flex items-center gap-2">
              <Volume2 size={20} className="text-muted-foreground" />
            </div>
          )}
        </div>
      </div>

      <audio ref={audioRef} src={audioUrl} preload="metadata" />
    </div>
  );
};