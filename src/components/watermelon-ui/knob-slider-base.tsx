"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useId,
} from "react";
import {
  motion,
  MotionValue,
  useSpring,
  useTransform,
  motionValue,
} from "motion/react";
import useMeasure from "react-use-measure";

const DIGIT_SPRING = {
  type: "spring" as const,
  stiffness: 280,
  damping: 24,
  mass: 0.3,
};

function Digit({ value, place }: { value: number; place: number }) {
  const digit = Math.floor(value / place) % 10;
  const mv = useMemo(() => motionValue(digit), [digit]);
  const spring = useSpring(mv, DIGIT_SPRING);

  useEffect(() => {
    spring.set(digit);
  }, [digit, spring]);

  return (
    <div
      className="relative inline-block 
      
      overflow-hidden tabular-nums"
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

function SlidingNumber({ value, blur }: { value: number; blur: number }) {
  const str = Math.abs(value).toString();
  const int = parseInt(str, 10);
  const places = str.split("").map((_, i) => Math.pow(10, str.length - i - 1));

  return (
    <motion.div
      animate={{ filter: `blur(${blur}px)` }}
      transition={{ duration: 0.15 }}
      className="text-foreground flex items-center justify-center font-bold tracking-tight tabular-nums"
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

  const [prev, setPrev] = useState(value);
  const blur = Math.min(10, Math.abs(value - prev));
  useEffect(() => {
    setPrev(value);
  }, [value]);

  const updateFromPointer = useCallback(
    (x: number, y: number) => {
      if (!knobRef.current) return;

      const rect = knobRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      let angle = (Math.atan2(y - cy, x - cx) * 180) / Math.PI + 90;
      if (angle < 0) angle += 360;

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
      className="theme-injected bg-background relative flex cursor-pointer items-center justify-center rounded-lg transition-colors duration-300 select-none"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="text-muted-foreground pointer-events-none absolute inset-0 h-full w-full"
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

      <div
        className="pointer-events-none absolute inset-0"
        style={{ transform: `rotate(${currentAngle}deg)` }}
      >
        <div
          className="border-b-muted-foreground absolute left-1/2 -translate-x-1/2 border-r-transparent border-l-transparent"
          style={{
            top: size * 0.12,
            borderLeftWidth: size * 0.025,
            borderRightWidth: size * 0.025,
            borderBottomWidth: size * 0.045,
            borderStyle: "solid",
          }}
        />
      </div>

      <div
        className="bg-background relative flex items-center justify-center rounded-full shadow-lg transition-colors duration-300"
        style={{
          width: innerSize,
          height: innerSize,
        }}
      >
        <div className="border-border absolute inset-0 rounded-full border" />

        <div
          className="text-muted-foreground"
          style={{ fontSize: innerSize * 0.28 }}
        >
          <SlidingNumber value={value} blur={blur} />
        </div>
      </div>
    </div>
  );
};
