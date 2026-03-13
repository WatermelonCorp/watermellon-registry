import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  type Transition,
  MotionConfig,
} from "motion/react";
import { Mic, X, Play, Square } from "lucide-react";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";

export const RecorderState = {
  IDLE: "IDLE",
  RECORDING: "RECORDING",
  REVIEWING: "REVIEWING",
  PLAYING: "PLAYING",
} as const;

export type RecorderState = (typeof RecorderState)[keyof typeof RecorderState];

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

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const playbackTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const spring: Transition = { type: "spring", stiffness: 400, damping: 40 };

  const startRecording = () => {
    setState(RecorderState.RECORDING);
    setDuration(0);
    timerRef.current = setInterval(() => {
      setDuration((prev) => {
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
      setPlaybackTime((prev) => {
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
  };

  const [barHeights, setBarHeights] = useState<number[][]>([]);

  useEffect(() => {
    const heights = [...Array(6)].map(() => [
      8 + Math.random() * 6,
      18 + Math.random() * 10,
      12 + Math.random() * 8,
      24 + Math.random() * 12,
      10 + Math.random() * 6,
    ]);
    requestAnimationFrame(() => setBarHeights(heights));
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
    };
  }, []);

  const actionBtnClass = `w-16 h-16 rounded-full border-[1.6px]  flex items-center justify-center shrink-0 transition-colors duration-300 bg-[#fefefe] dark:bg-neutral-900 border-[#E8E7EF] dark:border-white/5`;

  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center space-y-12 bg-transparent p-8 transition-colors duration-500">
      <div className="flex items-center gap-3">
        <MotionConfig transition={spring}>
          <AnimatePresence mode="popLayout">
            {state !== RecorderState.IDLE && (
              <motion.button
                key="cancel-btn"
                initial={{ opacity: 0, filter: "blur(4px)", x: "95px" }}
                animate={{ opacity: 1, filter: "blur(0)", x: "0px" }}
                exit={{ opacity: 1, filter: "blur(4px)", x: "95px" }}
                onClick={cancelRecording}
                className={actionBtnClass}
              >
                <X size={28} className="text-slate-700 dark:text-neutral-100" />
              </motion.button>
            )}
          </AnimatePresence>

          <motion.div
            animate={{
              width: state === RecorderState.IDLE ? "65px" : "110px",
            }}
            className={`relative z-20 flex items-center justify-center overflow-hidden transition-colors duration-300 ${
              state === RecorderState.IDLE ? "h-16 w-16" : "h-16 px-6"
            } rounded-full border-[1.6px] ${
              state === RecorderState.RECORDING
                ? "border-none bg-[#FEE5E4] dark:bg-[#441010]"
                : "border-[#E8E7EF] bg-[#fefefe] dark:border-[#2d2d33] dark:bg-[#1a1a1e]"
            } `}
            style={{
              borderRadius: 32,
            }}
          >
            <AnimatePresence mode="popLayout">
              {state === RecorderState.RECORDING && (
                <motion.svg
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={{ opacity: 1, filter: "blur(0)" }}
                  exit={{ opacity: 0, filter: "blur(8px)" }}
                >
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
                </motion.svg>
              )}
            </AnimatePresence>

            <AnimatePresence mode="popLayout" initial={false}>
              {state === RecorderState.IDLE && (
                <motion.button
                  key="mic-icon"
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={{ opacity: 1, filter: "blur(0)" }}
                  exit={{ opacity: 0, filter: "blur(8px)" }}
                  onClick={startRecording}
                  className="flex items-center justify-center"
                >
                  <Mic
                    size={28}
                    className="text-slate-800 dark:text-neutral-100"
                  />
                </motion.button>
              )}

              {state === RecorderState.RECORDING && (
                <motion.div
                  key="recording-ui"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="z-10 flex items-center gap-1.5"
                >
                  {barHeights.map((heights, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: heights }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.08,
                      }}
                      style={{ originY: 1 }}
                      className="w-1.5 rounded-full bg-[#FC3229]"
                    />
                  ))}
                </motion.div>
              )}

              {(state === RecorderState.REVIEWING ||
                state === RecorderState.PLAYING) && (
                <motion.div
                  key="review-ui"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="z-10 flex items-center gap-2"
                >
                  <motion.button
                    key={
                      state === RecorderState.PLAYING ? "stop-btn" : "play-btn"
                    }
                    onClick={
                      state === RecorderState.PLAYING
                        ? stopPlayback
                        : startPlayback
                    }
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                      state === RecorderState.PLAYING
                        ? "bg-transparent text-red-500 dark:text-red-400"
                        : "text-slate-800 dark:text-neutral-100"
                    } `}
                    initial={{ opacity: 0, filter: "blur(4px)", scale: 0.25 }}
                    animate={{ opacity: 1, filter: "blur(0)", scale: 1 }}
                    exit={{ opacity: 0, filter: "blur(4px)", scale: 0.25 }}
                  >
                    {state === RecorderState.PLAYING ? (
                      <Square size={22} fill="currentColor" />
                    ) : (
                      <Play size={22} fill="currentColor" />
                    )}
                  </motion.button>
                  <span className="flex items-center gap-0.5 justify-center text-[20px] font-bold text-[#282828] tabular-nums transition-colors dark:text-neutral-100">
                    <AnimatedNumber
                      value={
                        state === RecorderState.PLAYING
                          ? playbackTime
                          : duration
                      }
                    />
                    <motion.span layout>s</motion.span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence mode="popLayout">
            {(state === RecorderState.RECORDING ||
              state === RecorderState.REVIEWING ||
              state === RecorderState.PLAYING) && (
              <motion.button
                initial={{ opacity: 0, filter: "blur(4px)", x: -95 }}
                animate={{ opacity: 1, filter: "blur(0)", x: 0 }}
                exit={{ opacity: 0, filter: "blur(4px)", x: -95 }}
                className={actionBtnClass}
              >
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={
                      state === RecorderState.RECORDING
                        ? "check-btn"
                        : state === RecorderState.REVIEWING ||
                          state === RecorderState.PLAYING
                        ? "send-btn"
                        : "cancel-btn"
                    }
                    initial={{ opacity: 0, filter: "blur(4px)", scale: 0.25 }}
                    animate={{ opacity: 1, filter: "blur(0)", scale: 1 }}
                    exit={{ opacity: 0, filter: "blur(4px)", scale: 0.25 }}
                    onClick={
                      state === RecorderState.RECORDING
                        ? stopRecording
                        : state === RecorderState.PLAYING
                        ? startRecording
                        : handleSend
                    }
                  >
                    {state === RecorderState.RECORDING && (
                      <FaCheck
                        size={26}
                        className="text-slate-700 dark:text-neutral-100"
                      />
                    )}

                    {(state === RecorderState.REVIEWING ||
                      state === RecorderState.PLAYING) && (
                      <RiSendPlaneFill
                        size={26}
                        className="text-[#272727] dark:text-neutral-100"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            )}
          </AnimatePresence>
        </MotionConfig>
      </div>
    </div>
  );
};

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

const digitVariants = {
  initial: (dir: number) => ({
    y: dir > 0 ? 8 : -8,
    opacity: 0,
    scale: 0.5,
    z: 0,
    filter: "blur(2px)",
  }),
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    z: 10,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    y: dir > 0 ? -8 : 8,
    opacity: 0,
    scale: 0.5,
    z: 0,
    filter: "blur(2px)",
  }),
};

export function AnimatedNumber({ value, className }: AnimatedNumberProps) {
  const [direction, setDirection] = React.useState(0);
  const prevValueRef = React.useRef(value);

  React.useEffect(() => {
    const prev = prevValueRef.current;
    if (value > prev) setDirection(1);
    else if (value < prev) setDirection(-1);
    prevValueRef.current = value;
  }, [value]);

  const digits = value.toString().split("");

  const [prevDigits, setPrevDigits] = React.useState<string[]>([]);
  const [prevTicks, setPrevTicks] = React.useState<number[]>([]);

  const len = digits.length;
  const lenDiff = len - prevDigits.length;

  const nextTicks = digits.map((digit, i) => {
    const prevI = i - lenDiff;
    const prevDigit = prevI >= 0 ? prevDigits[prevI] : undefined;
    const prevTick = prevI >= 0 ? prevTicks[prevI] : 0;
    return digit !== prevDigit ? (prevTick ?? 0) + 1 : prevTick ?? 0;
  });

  React.useEffect(() => {
    setPrevTicks(nextTicks);
    setPrevDigits(digits);
  }, [digits, nextTicks]);

  return (
    <div
      className={`relative flex items-center justify-center gap-1 tabular-nums ${
        className ?? ""
      }`}
    >
      {digits.map((digit, index) => (
        <div key={`${index}-${len}`} className="relative w-3">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.span
              layout
              key={nextTicks[index]}
              custom={direction}
              variants={digitVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 16,
                mass: 1.2,
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
