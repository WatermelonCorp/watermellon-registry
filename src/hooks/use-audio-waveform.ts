import { useEffect, useRef, useState } from "react";
import type WaveSurfer from "wavesurfer.js";

export interface UseAudioWaveformOptions {
  waveColor?: string;
  progressColor?: string;
  height?: number;
  barWidth?: number;
  barGap?: number;
  barRadius?: number;
  normalize?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
  onReady?: () => void;
}

export interface UseAudioWaveformReturn {
  waveformRef: React.RefObject<HTMLDivElement | null>;
  isPlaying: boolean;
  isLoading: boolean;
  duration: number;
  currentTime: number;
  playPause: () => void;
  stop: () => void;
  seek: (time: number) => void;
  setPlaybackRate: (rate: number) => void;
}

export const useAudioWaveform = (
  audioUrl: string | null,
  options: UseAudioWaveformOptions = {}
): UseAudioWaveformReturn => {
  const {
    waveColor = "#e5e7eb",
    progressColor = "#3b82f6",
    height = 64,
    barWidth = 4,
    barGap = 8,
    barRadius = 30,
    normalize = true,
    onPlay,
    onPause,
    onEnd,
    onError,
    onReady,
  } = options;

  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!waveformRef.current || !audioUrl) return;

    let wavesurfer: WaveSurfer | null = null;

    // Dynamic import of WaveSurfer
    import("wavesurfer.js").then((WaveSurferModule) => {
      const WaveSurfer = WaveSurferModule.default;

      if (!waveformRef.current) return;

      wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor,
        progressColor,
        height,
        barWidth,
        barGap,
        barRadius,
        cursorWidth: 2,
        cursorColor: progressColor,
        normalize,
        backend: "WebAudio",
        mediaControls: false,
      });

      wavesurferRef.current = wavesurfer;

      // Load audio
      wavesurfer.load(audioUrl);

      // Event listeners
      wavesurfer.on("ready", () => {
        setIsLoading(false);
        setDuration(wavesurfer!.getDuration());
        onReady?.();
      });

      wavesurfer.on("play", () => {
        setIsPlaying(true);
        onPlay?.();
      });

      wavesurfer.on("pause", () => {
        setIsPlaying(false);
        onPause?.();
      });

      wavesurfer.on("finish", () => {
        setIsPlaying(false);
        setCurrentTime(0);
        onEnd?.();
      });

      wavesurfer.on("audioprocess", () => {
        setCurrentTime(wavesurfer!.getCurrentTime());
      });

      wavesurfer.on("seeking", () => {
        setCurrentTime(wavesurfer!.getCurrentTime());
      });

      wavesurfer.on("error", (error) => {
        console.error("WaveSurfer error:", error);
        setIsLoading(false);
        onError?.(new Error(String(error)));
      });
    });

    // Cleanup
    return () => {
      if (wavesurfer) {
        wavesurfer.destroy();
      }
      wavesurferRef.current = null;
    };
  }, [
    audioUrl,
    waveColor,
    progressColor,
    height,
    barWidth,
    barGap,
    barRadius,
    normalize,
  ]);

  const playPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };

  const stop = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.stop();
      setCurrentTime(0);
    }
  };

  const seek = (time: number) => {
    if (wavesurferRef.current && duration > 0) {
      const seekPosition = Math.max(0, Math.min(time / duration, 1));
      wavesurferRef.current.seekTo(seekPosition);
    }
  };

  const setPlaybackRate = (rate: number) => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setPlaybackRate(rate);
    }
  };

  return {
    waveformRef,
    isPlaying,
    isLoading,
    duration,
    currentTime,
    playPause,
    stop,
    seek,
    setPlaybackRate,
  };
};