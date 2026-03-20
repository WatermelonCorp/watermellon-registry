"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type PanInfo,
  MotionValue,
} from "motion/react";
import { useTheme } from "next-themes";

interface WeightWidgetProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export const WeightWidget: React.FC<WeightWidgetProps> = ({
  initialValue = 25,
  min = 0,
  max = 100,
  onChange,
}) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pixelsPerUnit = 80;

  const x = useMotionValue(-initialValue * pixelsPerUnit);
  const springConfig = { bounce: 0.45 };
  const springX = useSpring(x, springConfig);

  const [displayValue, setDisplayValue] = useState(initialValue);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  useEffect(() => {
    const unsubscribe = springX.on("change", (latest) => {
      const val = Math.abs(latest / pixelsPerUnit);
      const roundedVal = Math.round(val);
      if (roundedVal !== displayValue) {
        setDisplayValue(roundedVal);
        if (onChange) onChange(roundedVal);
      }
    });
    return () => unsubscribe();
  }, [springX, pixelsPerUnit, onChange, displayValue]);

  const dragStartX = React.useRef(x.get());

  const handlePanStart = () => {
    dragStartX.current = x.get();
  };

  const handlePan = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const maxOffset = pixelsPerUnit;
    const boundedOffset = Math.max(
      -maxOffset,
      Math.min(maxOffset, info.offset.x * 0.6)
    );
    const newX = dragStartX.current + boundedOffset;

    const minX = -max * pixelsPerUnit;
    const maxX = -min * pixelsPerUnit;
    x.set(Math.max(minX, Math.min(maxX, newX)));
  };

  const handlePanEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const baseValue = Math.round(dragStartX.current / -pixelsPerUnit);
    let direction = 0;

    if (info.offset.x < -20 || info.velocity.x < -100) direction = 1;
    else if (info.offset.x > 20 || info.velocity.x > 100) direction = -1;

    const targetValue = Math.max(min, Math.min(max, baseValue + direction));
    x.set(-targetValue * pixelsPerUnit);
  };

  const visibleRange = useMemo(() => {
    const items = [];
    const buffer = 5;
    for (
      let i = Math.max(min, displayValue - buffer);
      i <= Math.min(max, displayValue + buffer);
      i += 0.5
    ) {
      items.push(i);
    }
    return items;
  }, [min, max, displayValue]);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="theme-injected border-border bg-card relative flex h-[220px] w-[220px] touch-none flex-col items-center overflow-hidden rounded-lg border-2 font-sans shadow-lg transition-colors duration-300 select-none sm:h-[260px] sm:w-[260px]">
      <div className="text-muted-foreground mt-5 text-base font-semibold tracking-wide capitalize transition-colors sm:mt-6 sm:text-xl">
        Weight
      </div>

      <div className="relative flex w-full flex-1 items-start justify-center">
        <motion.div
          onPanStart={handlePanStart}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
          className="absolute flex h-full w-full cursor-grab items-start active:cursor-grabbing"
          style={{ x: springX, left: "50%" }}
        >
          {visibleRange.map((i) => (
            <DialItem
              key={i}
              value={i}
              pixelsPerUnit={pixelsPerUnit}
              scrollX={springX}
              isDark={isDark}
            />
          ))}
        </motion.div>

        <div className="pointer-events-none absolute bottom-0 z-20 mb-1 flex flex-col items-center sm:mb-0">
          <div className="bg-muted-foreground mb-1.5 h-[5px] w-[5px] rounded-lg transition-colors sm:h-[6.5px] sm:w-[6.5px]" />
          <svg
            className="text-muted-foreground h-6 w-2 transition-colors sm:h-9 sm:w-[10px]"
            viewBox="0 0 10 36"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M 5 2 L 9 36 L 1 36 Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const DialItem: React.FC<{
  value: number;
  pixelsPerUnit: number;
  scrollX: MotionValue<number>;
  isDark: boolean;
}> = ({ value, pixelsPerUnit, scrollX, isDark }) => {
  const isHalf = value % 1 !== 0;
  const itemX = value * pixelsPerUnit;
  const distance = useTransform(scrollX, (s: number) => Math.abs(s + itemX));

  const opacity = useTransform(
    distance,
    [0, pixelsPerUnit * 2, pixelsPerUnit * 3],
    [1, 0.1, 0]
  );

  // const color = useTransform(
  //   distance,
  //   [0, pixelsPerUnit],
  //   isDark
  //     ? [
  //         'oklch(var(--background) / 0.8)',
  //         'oklch(var(--background) / 0)',
  //       ]
  //     : [
  //         'oklch(var(--foreground) / 0.9)',
  //         'oklch(var(--muted-foreground) / 0.5)',
  //       ],
  // );

  const scale = useTransform(distance, [0, pixelsPerUnit * 2], [1, 0.85]);

  const yOffset = useTransform(
    distance,
    [
      0,
      pixelsPerUnit * 0.5,
      pixelsPerUnit,
      pixelsPerUnit * 1.5,
      pixelsPerUnit * 2,
      pixelsPerUnit * 2.5,
      pixelsPerUnit * 3,
    ],
    [0, 2, 7, 17, 32, 54, 88]
  );

  const rotate = useTransform(scrollX, (s: number) => {
    const d = s + itemX;
    return (d / pixelsPerUnit) * 12;
  });

  return (
    <motion.div
      className="absolute top-0 flex flex-col items-center"
      style={{
        left: itemX,
        x: "-50%",
        opacity,
        scale,
        y: yOffset,
        rotate,
        transformOrigin: "center 140px",
      }}
    >
      <motion.span
        className={`text-[56px] font-bold text-muted-foreground tracking-tight sm:text-[68px] ${
          isHalf ? "invisible" : ""
        }`}
        // style={{ color }}
      >
        {Math.floor(value)}
      </motion.span>

      <div className="mt-2 flex flex-col items-center sm:mt-4">
        <div
          className={`h-5 w-[2.5px] rounded-lg transition-colors sm:h-7 sm:w-[3px] ${
            isDark ? "bg-foreground/20" : "bg-foreground/20"
          }`}
        />
      </div>
    </motion.div>
  );
};
