"use client";

import React, { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAudioWaveform } from "@/hooks/use-audio-waveform";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Utility function to format time
export const formatTime = (seconds: number): string => {
  if (!isFinite(seconds) || isNaN(seconds)) {
    return "0:00";
  }
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// Controls Component
interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onStop?: () => void;
  onSkipBackward?: () => void;
  onSkipForward?: () => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  onPlayPause,
  onStop,
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

// Main Audio Player With Waveform Component
export interface AudioPlayerWithWaveformProps {
  source: File | Blob | string;
  title?: string;
  artist?: string;
  showTitle?: boolean;
  showControls?: boolean;
  showPlaybackSpeed?: boolean;
  waveColor?: string;
  progressColor?: string;
  height?: number;
  barWidth?: number;
  barGap?: number;
  barRadius?: number;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
  className?: string;
  variant?: "default" | "compact";
}

export const AudioPlayerWithWaveform: React.FC<
  AudioPlayerWithWaveformProps
> = ({
  source,
  title,
  artist,
  showTitle = true,
  showControls = true,
  showPlaybackSpeed = true,
  waveColor = "#e5e7eb",
  progressColor = "#3b82f6",
  height = 64,
  barWidth = 4,
  barGap = 8,
  barRadius = 30,
  onPlay,
  onPause,
  onEnd,
  onError,
  className,
  variant = "default",
}) => {
  const [audioUrl, setAudioUrl] = useState<string>("");

  // Convert source to URL
  React.useEffect(() => {
    if (source instanceof File || source instanceof Blob) {
      const url = URL.createObjectURL(source);
      setAudioUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof source === "string") {
      setAudioUrl(source);
    }
  }, [source]);

  const {
    waveformRef,
    isPlaying,
    isLoading,
    duration,
    currentTime,
    playPause,
    stop,
    setPlaybackRate,
  } = useAudioWaveform(audioUrl, {
    waveColor,
    progressColor,
    height,
    barWidth,
    barGap,
    barRadius,
    onPlay,
    onPause,
    onEnd,
    onError,
  });

  if (variant === "compact") {
    return (
      <div className={cn("rounded-lg border bg-card p-4", className)}>
        <div className="space-y-3">
          {showTitle && (title || artist) && (
            <div>
              {title && <p className="font-medium text-sm truncate">{title}</p>}
              {artist && (
                <p className="text-xs text-muted-foreground truncate">
                  {artist}
                </p>
              )}
            </div>
          )}

          <div className="relative">
            <div
              ref={waveformRef}
              className={cn("w-full rounded-lg", isLoading && "opacity-50")}
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {showControls && (
                <Controls
                  isPlaying={isPlaying}
                  onPlayPause={playPause}
                  onStop={stop}
                  disabled={isLoading}
                  size="sm"
                />
              )}
              <div className="text-xs text-muted-foreground font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            {showPlaybackSpeed && (
              <Select
                onValueChange={(value) => setPlaybackRate(parseFloat(value))}
                defaultValue="1"
              >
                <SelectTrigger className="w-20 h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">0.5x</SelectItem>
                  <SelectItem value="0.75">0.75x</SelectItem>
                  <SelectItem value="1">1x</SelectItem>
                  <SelectItem value="1.25">1.25x</SelectItem>
                  <SelectItem value="1.5">1.5x</SelectItem>
                  <SelectItem value="2">2x</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("rounded-lg border bg-card p-6", className)}>
      <div className="space-y-4">
        {showTitle && (title || artist) && (
          <div className="text-center">
            {title && <h3 className="font-semibold text-lg">{title}</h3>}
            {artist && (
              <p className="text-sm text-muted-foreground">{artist}</p>
            )}
          </div>
        )}

        <div className="relative">
          <div
            ref={waveformRef}
            className={cn("w-full rounded-lg", isLoading && "opacity-50")}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm">Loading waveform...</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground font-mono">
            {formatTime(currentTime)}
          </div>
          <div className="text-sm text-muted-foreground font-mono">
            {formatTime(duration)}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          {showControls && (
            <Controls
              isPlaying={isPlaying}
              onPlayPause={playPause}
              onStop={stop}
              disabled={isLoading}
              size="lg"
            />
          )}
        </div>

        {showPlaybackSpeed && (
          <div className="flex items-center justify-center gap-2">
            <label className="text-sm text-muted-foreground">
              Playback Speed:
            </label>
            <Select
              onValueChange={(value) => setPlaybackRate(parseFloat(value))}
              defaultValue="1"
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.5">0.5x</SelectItem>
                <SelectItem value="0.75">0.75x</SelectItem>
                <SelectItem value="1">1x</SelectItem>
                <SelectItem value="1.25">1.25x</SelectItem>
                <SelectItem value="1.5">1.5x</SelectItem>
                <SelectItem value="2">2x</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};