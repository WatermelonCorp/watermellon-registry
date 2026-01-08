import { useState, useRef, useEffect } from "react";

export interface UseAudioPlaybackOptions {
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
}

export interface UseAudioPlaybackReturn {
  isPlaying: boolean;
  audioUrl: string;
  playbackTime: number;
  duration: number;
  audioLoaded: boolean;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  togglePlayback: () => Promise<void>;
  stop: () => void;
  seek: (time: number) => void;
  setPlaybackRate: (rate: number) => void;
  resetAudio: () => void;
}

export const useAudioPlayback = (
  source: File | Blob | string | null,
  options?: UseAudioPlaybackOptions
): UseAudioPlaybackReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [playbackTime, setPlaybackTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioLoaded, setAudioLoaded] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  // Update audio URL when source changes
  useEffect(() => {
    // Clean up previous object URL
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    setAudioLoaded(false);
    setDuration(0);
    setPlaybackTime(0);
    setIsPlaying(false);

    if (source instanceof File || source instanceof Blob) {
      const url = URL.createObjectURL(source);
      objectUrlRef.current = url;
      setAudioUrl(url);
    } else if (typeof source === "string") {
      setAudioUrl(source);
    } else {
      setAudioUrl("");
    }
  }, [source]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const updatePlaybackTime = () => {
    if (audioRef.current && isPlaying && !audioRef.current.paused) {
      setPlaybackTime(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(updatePlaybackTime);
    }
  };

  const togglePlayback = async () => {
    if (!audioRef.current || !audioLoaded) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        options?.onPause?.();
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
        updatePlaybackTime();
        options?.onPlay?.();
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
      options?.onError?.(error as Error);
    }
  };

  const stop = () => {
    if (!audioRef.current) return;
    
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setPlaybackTime(0);
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const seek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(time, duration));
    setPlaybackTime(audioRef.current.currentTime);
  };

  const setPlaybackRate = (rate: number) => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = rate;
  };

  const resetAudio = () => {
    stop();
    
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    setDuration(0);
    setAudioLoaded(false);
    setAudioUrl("");
  };

  // Audio event handlers
  const handleLoadedMetadata = () => {
    if (
      audioRef.current &&
      !isNaN(audioRef.current.duration) &&
      isFinite(audioRef.current.duration)
    ) {
      setDuration(audioRef.current.duration);
      setAudioLoaded(true);
    }
  };

  const handleCanPlay = () => {
    if (
      audioRef.current &&
      !isNaN(audioRef.current.duration) &&
      isFinite(audioRef.current.duration)
    ) {
      setDuration(audioRef.current.duration);
      setAudioLoaded(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && isPlaying) {
      setPlaybackTime(audioRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setPlaybackTime(0);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    options?.onEnd?.();
  };

  const handleError = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    console.error("Audio error:", e);
    setAudioLoaded(false);
    setIsPlaying(false);
    options?.onError?.(new Error("Error loading audio file"));
  };

  // Attach event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError as any);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError as any);
    };
  }, [isPlaying, options]);

  return {
    isPlaying,
    audioUrl,
    playbackTime,
    duration,
    audioLoaded,
    audioRef,
    togglePlayback,
    stop,
    seek,
    setPlaybackRate,
    resetAudio,
  };
};