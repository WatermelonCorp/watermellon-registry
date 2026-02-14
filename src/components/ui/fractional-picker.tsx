"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

/* ---------------- Types ---------------- */

export interface FractionalPickerProps {
  min?: number;
  max?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  width?: number;
  itemWidth?: number;
  className?: string;
}

/* ---------------- Constants ---------------- */

const TICK_COUNT = 10;

/* ---------------- Ruler Item ---------------- */

interface RulerItemProps {
  value: number;
  x: MotionValue<number>;
  itemWidth: number;
  center: number;
}

function RulerItem({ value, x, itemWidth, center }: RulerItemProps) {
  const distance = useTransform(x, (latest) => {
    const pos = value * itemWidth + latest + center;
    return Math.abs(pos - center);
  });

  const scale = useTransform(distance, [0, itemWidth * 1.5], [1.1, 0.85]);
  const opacity = useTransform(distance, [0, itemWidth * 2], [1, 0.75]);

  return (
    <div className="flex flex-col items-center shrink-0" style={{ width: itemWidth }}>
      <motion.span
        className="mb-5 text-[26px] tabular-nums text-foreground select-none"
        style={{ scale, opacity }}
      >
        {value}
      </motion.span>

      <div className="flex relative w-full justify-between px-px">
        {Array.from({ length: TICK_COUNT }).map((_, i) => (
          <div
            key={`${value}-tick-${i}`}
            className={cn(
              "w-[1.5px] rounded-full bg-muted",
              i === 0 ? "h-6 ml-1" : "mt-2.5  h-3"
            )}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------- Component ---------------- */

export function FractionalPicker({
  min = 0,
  max = 100,
  value,
  defaultValue = min,
  onChange,
  width = 420,
  itemWidth = 70,
  className,
}: FractionalPickerProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);

  const currentValue = isControlled ? value : internal;

  const center = width / 2;
  const x = useMotionValue(-currentValue * itemWidth);

  React.useEffect(() => {
    animate(x, -currentValue * itemWidth, {
      type: "spring",
      stiffness: 260,
      damping: 28,
    });
  }, [currentValue, itemWidth, x]);

  React.useEffect(() => {
    return x.on("change", (latest) => {
      const next = Math.round(-latest / itemWidth);
      if (next >= min && next <= max && next !== currentValue) {
        if (!isControlled) setInternal(next);
        onChange?.(next);
      }
    });
  }, [x, itemWidth, min, max, currentValue, isControlled, onChange]);

  const snap = () => {
    const snapped = Math.round(x.get() / itemWidth) * itemWidth;
    animate(x, snapped, { type: "spring", stiffness: 260, damping: 30 });
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-background shadow-sm",
        className
      )}
      style={{ width, height: 130 }}
    >
      {/* Pointer */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-10">
        <div className="h-5 w-10 rounded-b-xl bg-gray-200 mx-auto" />
        <div className="mt-2 h-2 w-2 rounded-full bg-gray-200 mx-auto" />
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-linear-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-linear-to-l from-background to-transparent z-10" />

      {/* Ruler */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -max * itemWidth, right: -min * itemWidth }}
        dragElastic={0.08}
        onDragEnd={snap}
        style={{ x }}
        className="flex h-full items-end cursor-grab active:cursor-grabbing"
      >
        <div style={{ minWidth: center - itemWidth / 2 }} />

        {Array.from({ length: max - min + 1 }, (_, i) => (
          <RulerItem
            key={i}
            value={i + min}
            x={x}
            itemWidth={itemWidth}
            center={center}
          />
        ))}

        <div style={{ minWidth: center - itemWidth / 2 }} />
      </motion.div>
    </div>
  );
}
