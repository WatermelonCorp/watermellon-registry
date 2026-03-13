"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
} from "react";
import {
  motion,
  MotionValue,
  useSpring,
  useTransform,
  useMotionValue,
} from "motion/react";
import useMeasure from "react-use-measure";

/* ───────── Sliding Number ───────── */

const DIGIT_SPRING = {
  type: "spring" as const,
  stiffness: 280,
  damping: 24,
  mass: 0.3,
};

function Digit({ value, place }: { value: number; place: number }) {
  const digit = Math.floor(value / place) % 10;
  const mv = useMotionValue(digit);
  const spring = useSpring(mv, DIGIT_SPRING);

  useEffect(() => {
    spring.set(digit);
  }, [digit, spring]);

  return (
    <div
      className="relative inline-block overflow-hidden tabular-nums"
      style={{ width: "0.6em" }}
    >
      <div className="invisible">0</div>
      {Array.from({ length: 10 }, (_, i) => (
        <SlotDigit key={i} mv={spring} number={i} />
      ))}
    </div>
  );
}

function SlotDigit({
  mv,
  number,
}: {
  mv: MotionValue<number>;
  number: number;
}) {
  const id = useId();
  const [ref, bounds] = useMeasure();

  const y = useTransform(mv, (latest) => {
    if (!bounds.height) return 0;
    const offset = (10 + number - (latest % 10)) % 10;
    let pos = offset * bounds.height;
    if (offset > 5) pos -= 10 * bounds.height;
    return pos;
  });

  if (!bounds.height)
    return (
      <span ref={ref} className="invisible absolute">
        {number}
      </span>
    );

  return (
    <motion.span
      ref={ref}
      style={{ y }}
      layoutId={`${id}-${number}`}
      transition={DIGIT_SPRING}
      className="absolute inset-0 flex items-center justify-center"
    >
      {number}
    </motion.span>
  );
}

function SlidingNumber({
  value,
  blur,
}: {
  value: number;
  blur: number;
}) {
  const str = Math.abs(value).toString();
  const int = parseInt(str, 10);
  const places = str
    .split("")
    .map((_, i) => Math.pow(10, str.length - i - 1));

  return (
    <motion.div
      animate={{ filter: `blur(${blur}px)` }}
      transition={{ duration: 0.15 }}
      className="flex items-center justify-center font-bold tabular-nums tracking-tight"
      style={{
        fontFamily: "ui-rounded, SF Pro Rounded, system-ui, sans-serif",
      }}
    >
      {places.map((place, i) => (
        <Digit key={`${place}-${i}`} value={int} place={place} />
      ))}
    </motion.div>
  );
}

/* ───────── Knob ───────── */

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
  const [dragging, setDragging] = useState(false);

  const tickCount = 72;
  const innerSize = size * 0.68;

  /* Blur intensity */
  const prev = useRef(value);
  const [blur, setBlur] = useState(0);

  useEffect(() => {
    setBlur(Math.min(10, Math.abs(value - prev.current)));
    prev.current = value;
  }, [value]);

  /* Convert pointer → snapped value */
  const updateFromPointer = useCallback(
    (x: number, y: number) => {
      if (!knobRef.current) return;

      const rect = knobRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      let angle = (Math.atan2(y - cy, x - cx) * 180) / Math.PI + 90;
      if (angle < 0) angle += 360;

      /* Snap to nearest tick */
      const tickAngle = 360 / tickCount;
      const snappedAngle = Math.round(angle / tickAngle) * tickAngle;

      const percent = snappedAngle / 360;
      const newValue = Math.round(percent * (max - min) + min);

      onChange(newValue);
    },
    [min, max, onChange]
  );

  useEffect(() => {
    const move = (e: MouseEvent) =>
      dragging && updateFromPointer(e.clientX, e.clientY);
    const up = () => setDragging(false);

    if (dragging) {
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    }

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [dragging, updateFromPointer]);

  const currentAngle = ((value - min) / (max - min)) * 360;

  return (
    <div
      ref={knobRef}
      onMouseDown={(e) => {
        setDragging(true);
        updateFromPointer(e.clientX, e.clientY);
      }}
      className="relative flex items-center justify-center rounded-full
                 bg-neutral-100 dark:bg-neutral-900
                 cursor-pointer select-none
                 transition-colors duration-300"
      style={{ width: size, height: size }}
    >
      {/* Tick Ring */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full pointer-events-none
                   text-neutral-400 dark:text-neutral-600"
      >
        {Array.from({ length: tickCount }).map((_, i) => {
          const angle = (i * 360) / tickCount;
          return (
            <line
              key={i}
              x1="50"
              y1="4"
              x2="50"
              y2="9"
              transform={`rotate(${angle} 50 50)`}
              stroke="currentColor"
              strokeWidth="0.7"
              strokeLinecap="round"
              opacity="0.7"
            />
          );
        })}
      </svg>

      {/* Arrow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `rotate(${currentAngle}deg)` }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2
                     border-l-transparent border-r-transparent
                     border-b-neutral-500 dark:border-b-neutral-300"
          style={{
            top: size * 0.12,
            borderLeftWidth: size * 0.025,
            borderRightWidth: size * 0.025,
            borderBottomWidth: size * 0.045,
            borderStyle: "solid",
          }}
        />
      </div>

      {/* Inner Knob */}
      <div
        className="relative rounded-full flex items-center justify-center
                   bg-white dark:bg-neutral-800
                   shadow-lg dark:shadow-black/40
                   transition-colors duration-300"
        style={{
          width: innerSize,
          height: innerSize,
        }}
      >
        <div className="absolute inset-0 rounded-full border border-neutral-200 dark:border-neutral-700" />

        <div
          className="text-neutral-600 dark:text-neutral-300"
          style={{ fontSize: innerSize * 0.28 }}
        >
          <SlidingNumber value={value} blur={blur} />
        </div>
      </div>
    </div>
  );
};