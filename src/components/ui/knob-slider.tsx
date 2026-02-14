"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "motion/react";

interface KnobSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: number;
}

export const KnobSlider: React.FC<KnobSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  size = 320,
}) => {
  const knobRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const tickCount = 60;
  const startAngle = 0;
  const endAngle = 360;

  const calculateValueFromAngle = useCallback(
    (angle: number) => {
      let normalizedAngle = (angle + 360) % 360;
      const range = endAngle - startAngle;
      const valueRange = max - min;
      const rawValue =
        ((normalizedAngle - startAngle) / range) * valueRange + min;
      return Math.max(min, Math.min(max, Math.round(rawValue)));
    },
    [min, max],
  );

  const handleInteraction = useCallback(
    (clientX: number, clientY: number) => {
      if (!knobRef.current) return;
      const rect = knobRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      if (angle < 0) angle += 360;
      const newValue = calculateValueFromAngle(angle);
      onChange(newValue);
    },
    [onChange, calculateValueFromAngle],
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) handleInteraction(e.clientX, e.clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging)
        handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onEnd = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onEnd);
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", onEnd);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [isDragging, handleInteraction]);

  const currentAngle = useMemo(() => {
    return ((value - min) / (max - min)) * (endAngle - startAngle) + startAngle;
  }, [value, min, max]);

  return (
    <div
      className={`flex items-center justify-center selection:bg-transparent [--tick-active:#84838A] dark:[--tick-active:#E4E4E7] [--tick-inactive:#D5D4DD] dark:[--tick-inactive:#27272a] [--knob-bg:#FEFEFE] dark:[--knob-bg:#1a1a1c] [--text-color:#85848D] dark:[--text-color:#E4E4E7] [--knob-shadow:15px_15px_25px_rgba(0,0,0,0.1),-5px_-5px_15px_rgba(255,255,255,0.8),inset_0_1px_2px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(0,0,0,0.05)] dark:[--knob-shadow:15px_15px_30px_rgba(0,0,0,0.6),-5px_-5px_15px_rgba(255,255,255,0.02),inset_0_1px_1px_rgba(255,255,255,0.05)]`}
    >
      <div
        className="relative flex items-center justify-center select-none touch-none"
        style={{ width: size, height: size }}
      >
        <div className="absolute rounded-full border-[1.8px] w-[95%] h-[95%] transition-colors duration-300 bg-[#fcfdfe] border-[#EEEDF2] dark:bg-[#151517] dark:border-[#222225]" />

        <svg
          className="absolute inset-0 pointer-events-none z-50"
          viewBox="0 0 100 100"
        >
          {Array.from({ length: tickCount }).map((_, i) => {
            const angle = (i * 360) / tickCount;
            const active = (angle / 360) * (max - min) + min <= value;
            return (
              <line
                key={i}
                x1="50"
                y1="10"
                x2="50"
                y2="13"
                transform={`rotate(${angle} 50 50)`}
                stroke={active ? "var(--tick-active)" : "var(--tick-inactive)"}
                strokeWidth="0.7"
                strokeLinecap="round"
                className="transition-colors duration-200"
              />
            );
          })}
        </svg>

        <div
          ref={knobRef}
          onMouseDown={(e) => {
            setIsDragging(true);
            handleInteraction(e.clientX, e.clientY);
          }}
          onTouchStart={(e) => {
            setIsDragging(true);
            handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
          }}
          className="relative border-[1.8px] flex items-center justify-center rounded-full cursor-grab active:cursor-grabbing z-20 transition-all duration-300 active:scale-[0.98] border-neutral-300 dark:border-[#2c2c2e]"
          style={{
            width: "60%",
            height: "60%",
            backgroundColor: "var(--knob-bg)",
            boxShadow: "var(--knob-shadow)",
          }}
        >
          <div className="flex flex-col items-center justify-center pointer-events-none overflow-hidden h-full w-full">
            <BlurredNumber value={value} color="var(--text-color)" />
          </div>
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ rotate: currentAngle }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          >
            <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-1 h-6 rounded-full shadow-md bg-[#84848D] dark:bg-[#E4E4E7]" />
          </motion.div>
        </div>

        <div
          className="absolute rounded-full pointer-events-none transition-colors duration-300 bg-[#F4F4FB] dark:bg-[#121214]"
          style={{ width: "88%", height: "88%" }}
        />
      </div>
    </div>
  );
};

const BlurredNumber: React.FC<{ value: number; color: string }> = ({
  value,
  color,
}) => {
  return (
    <div className="relative h-24 w-full flex items-center justify-center">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)", scale: 0.9 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)", scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 600,
            damping: 40,
            opacity: { duration: 0.1 },
            filter: { duration: 0.1 },
          }}
          className="absolute text-[78px] font-bold font-sans tabular-nums transition-colors duration-300"
          style={{ color: color, textShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
        >
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
