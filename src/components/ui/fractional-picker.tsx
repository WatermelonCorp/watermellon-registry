"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface RulerItemProps {
  value: number;
  x: MotionValue<number>;
  itemWidth: number;
  max: number;
}

function RulerItem({ value, x, itemWidth, max }: RulerItemProps) {
  const distance = useTransform(x, (latest) => {
    const itemPos = value * itemWidth;
    return Math.abs(itemPos + latest);
  });

  const opacity = useTransform(distance, [0, itemWidth], [1, 0.3]);
  const scale = useTransform(distance, [0, itemWidth * 0.8], [1.1, 0.9]);

  return (
    <div className="flex h-full shrink-0 flex-col" style={{ width: itemWidth }}>
      <div className="relative flex h-full w-full flex-col items-center justify-end">
        <motion.span
          className="text-foreground mb-1 text-4xl font-semibold tabular-nums select-none"
          style={{ opacity, scale }}
        >
          {value}
        </motion.span>

        <div className="relative flex h-8 w-full items-end">
          <div className="absolute left-1/2 z-10 h-8 w-[4px] -translate-x-1/2 rounded-t-full bg-neutral-400 dark:bg-neutral-200" />
          <div className="flex w-full translate-x-1/2 justify-evenly">
            {value !== max &&
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`${value}-sub-${i}`}
                  className="h-4 w-[4px] rounded-t-full bg-neutral-200 dark:bg-neutral-600"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FractionalPicker({
  min = 0,
  max = 20,
  defaultValue = 0,
  itemWidth = 80,
  onChange,
  className,
}: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const x = useMotionValue(-defaultValue * itemWidth);
  const [activeValue, setActiveValue] = useState(defaultValue);

  const snap = () => {
    const currentX = x.get();
    console.log(currentX);
    const closestValue = Math.round(currentX / itemWidth) * itemWidth;
    animate(x, closestValue, {
      type: "spring",
      stiffness: 400,
      damping: 40,
    });
  };

  useEffect(() => {
    return x.on("change", (latest) => {
      const val = Math.abs(Math.round(latest / itemWidth));
      if (val !== activeValue && val >= min && val <= max) {
        setActiveValue(val);
        onChange?.(val);
      }
    });
  }, [x, itemWidth, activeValue, onChange, min, max]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "bg-background border-border relative max-w-[600px] overflow-hidden rounded-4xl border shadow-sm",
        className
      )}
      style={{ height: 120 }}
    >
      <div className="pointer-events-none absolute top-0 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center">
        <div
          className="h-6 w-10 rounded-b-xl bg-neutral-200"
          style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 20% 100%)" }}
        />
        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-200" />
      </div>

      <motion.div
        drag="x"
        style={{
          x,
          paddingLeft: containerWidth / 2 - itemWidth / 2,
          paddingRight: containerWidth / 2 - itemWidth / 2,
        }}
        dragConstraints={{
          left: -max * itemWidth,
          right: -min * itemWidth,
        }}
        dragElastic={0.1}
        onDragEnd={snap}
        className="flex h-full cursor-grab items-end active:cursor-grabbing"
      >
        {Array.from({ length: max - min + 1 }, (_, i) => (
          <RulerItem
            key={i + min}
            value={i + min}
            x={x}
            itemWidth={itemWidth}
            max={max}
          />
        ))}
      </motion.div>

      <div className="from-background via-background/60 pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r to-transparent" />
      <div className="from-background via-background/60 pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l to-transparent" />
    </div>
  );
}
