'use client';

import { useRef, useState, useEffect, useCallback, type FC } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  animate,
  type Transition,
} from 'motion/react';

interface ScrubSliderProps {
  initialValue?: number;
  tickCount?: number;
}

interface AnimatedNumberProps {
  value: number;
}

const SPRING: Transition = {
  stiffness: 200,
  damping: 25,
};

const AnimatedNumber: FC<AnimatedNumberProps> = ({ value }) => {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const controls = animate(display, value, {
      duration: 0.2,
      onUpdate(latest) {
        setDisplay(Math.round(latest));
      },
    });

    return controls.stop;
  }, [value, display]);

  return <>{display}</>;
};

export const ScrubSlider: FC<ScrubSliderProps> = ({
  initialValue = 0,
  tickCount = 32,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const smoothX = useSpring(x, SPRING);

  const [value, setValue] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);
  const [step, setStep] = useState(0);
  const [sliderLeft, setSliderLeft] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);

  const padding = 16;

  useEffect(() => {
    if (!sliderRef.current) return;

    const measure = () => {
      const rect = sliderRef.current!.getBoundingClientRect();

      const width = rect.width - padding * 2;
      const newStep = width / (tickCount - 1);

      setSliderLeft(rect.left);
      setSliderWidth(width);
      setStep(newStep);

      x.set(initialValue * newStep + padding);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(sliderRef.current);

    return () => resizeObserver.disconnect();
  }, [tickCount, initialValue, x]);

  const updateValue = useCallback(
    (clientX: number) => {
      if (!step) return;

      let posX = clientX - sliderLeft - padding;

      posX = Math.max(0, Math.min(posX, sliderWidth));

      const snappedIndex = Math.round(posX / step);
      const snappedX = snappedIndex * step;

      setValue(snappedIndex);
      x.set(snappedX + padding);
    },
    [step, sliderLeft, sliderWidth, x],
  );

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!isDragging) return;
      updateValue(e.clientX);
    };

    const up = () => setIsDragging(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, [isDragging, updateValue]);

  useEffect(() => {
    const move = (e: TouchEvent) => {
      if (!isDragging) return;
      updateValue(e.touches[0].clientX);
    };

    const end = () => setIsDragging(false);

    window.addEventListener('touchmove', move);
    window.addEventListener('touchend', end);

    return () => {
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', end);
    };
  }, [isDragging, updateValue]);

  return (
    <div className="relative w-full max-w-md select-none">
      <motion.div
        style={{ left: smoothX }}
        className="pointer-events-none absolute -top-12 z-30 -translate-x-1/2"
      >
        <motion.div
          animate={{
            y: isDragging ? -4 : 0,
            scale: isDragging ? 1.05 : 1,
          }}
          transition={SPRING}
          className="rounded-xl bg-gray-900 px-3 py-1.5 text-2xl font-semibold text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900"
        >
          <AnimatedNumber value={value} />
          °C
        </motion.div>
      </motion.div>

      <div
        ref={sliderRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          updateValue(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          updateValue(e.touches[0].clientX);
        }}
        className="relative h-24 cursor-pointer touch-none overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="absolute inset-4">
          {Array.from({ length: tickCount }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-1 -translate-x-1/2 rounded-full bg-gray-300 dark:bg-zinc-700"
              style={{
                left: i * step,
              }}
            />
          ))}
        </div>

        <motion.div
          style={{ left: smoothX }}
          animate={{
            scaleY: isDragging ? 1.15 : 1,
          }}
          transition={SPRING}
          className="absolute top-4 bottom-4 w-1 -translate-x-1/2 rounded-full bg-black dark:bg-white"
        />
      </div>
    </div>
  );
};
