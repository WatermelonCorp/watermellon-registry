"use client";

import { useRef, useState, useEffect, type FC } from "react";
import { motion, useMotionValue, useSpring, type Spring } from "framer-motion";
import { Sun, Moon } from "lucide-react";

/* --- Types & Props --- */
interface ScrubSliderProps {
  initialValue?: number;
  tickCount?: number;
}

interface AnimatedNumberProps {
  value: number;
}

const SPRING: Spring = {
  stiffness: 420,
  damping: 28,
};

/* --- Sub-Component --- */
const AnimatedNumber: FC<AnimatedNumberProps> = ({ value }) => {
  return <>{value}</>;
};

/* --- Main Component --- */
export const ScrubSlider: FC<ScrubSliderProps> = ({ initialValue = 0, tickCount = 32 }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const smoothX = useSpring(x, SPRING);

  const [isDark, setIsDark] = useState<boolean>(false);
  const [value, setValue] = useState<number>(initialValue);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  const updateValue = (clientX: number) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const padding = 16;
    const width = rect.width - padding * 2;

    let posX = clientX - rect.left - padding;
    posX = Math.max(0, Math.min(posX, width));

    const step = width / (tickCount - 1);
    const snappedIndex = Math.round(posX / step);
    const snappedX = snappedIndex * step;

    setValue(snappedIndex);
    x.set(snappedX + padding);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-zinc-950 transition-colors duration-500">
      
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="mb-12 p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm active:scale-90 transition-all"
      >
        {isDark ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-zinc-500" size={20} />}
      </button>

      <div className="relative w-full max-w-md select-none">
        {/* VALUE BUBBLE */}
        <motion.div
          style={{ left: smoothX }}
          className="absolute -top-12 z-30 -translate-x-1/2 pointer-events-none"
        >
          <motion.div
            animate={{
              y: isDragging ? -4 : 0,
              scale: isDragging ? 1.05 : 1,
            }}
            transition={SPRING}
            className="px-3 py-1.5 rounded-xl bg-gray-900 dark:bg-zinc-100 text-gray-50 dark:text-zinc-950 text-2xl font-semibold shadow-sm"
          >
            <AnimatedNumber value={value} />°C
          </motion.div>
        </motion.div>

        {/* SLIDER */}
        <div
          ref={sliderRef}
          onMouseDown={(e) => {
            setIsDragging(true);
            updateValue(e.clientX);
          }}
          onMouseMove={(e) => isDragging && updateValue(e.clientX)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={(e) => {
            setIsDragging(true);
            updateValue(e.touches[0].clientX);
          }}
          onTouchMove={(e) => updateValue(e.touches[0].clientX)}
          onTouchEnd={() => setIsDragging(false)}
          className="relative h-24 rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md cursor-pointer overflow-hidden touch-none"
        >
          {/* TICKS */}
          <div className="absolute inset-4 flex">
            {Array.from({ length: tickCount }).map((_, i) => (
              <div key={i} className="flex-1 flex justify-center">
                <div className="w-0.5 h-full bg-gray-300 dark:bg-zinc-700 rounded-full" />
              </div>
            ))}
          </div>

          {/* ACTIVE LINE */}
          <motion.div
            style={{ left: smoothX }}
            className="absolute top-4 bottom-4 w-1 bg-black dark:bg-zinc-100 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

