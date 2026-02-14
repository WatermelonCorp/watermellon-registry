"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type FC } from "react";

/* ---------- Types ---------- */

type ThemeConfig = {
  bg: string;
  button: string;
  dot: string;
  progress: string;
};

interface CarouselNavigatorProps {
  totalSlides?: number;
  autoDelay?: number;
  themes?: ThemeConfig[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

/* ---------- Defaults ---------- */

const DEFAULT_TOTAL_SLIDES = 4;
const DEFAULT_AUTO_DELAY = 5000;

const DEFAULT_THEMES: ThemeConfig[] = [
  {
    bg: "bg-[#F4F4F9]",
    button: "bg-[#262629]",
    dot: "bg-[#D5D4E0]",
    progress: "bg-[#D5D4E0]",
  },
  {
    bg: "bg-[#E7F1FD]",
    button: "bg-[#016FFE]",
    dot: "bg-[#89BCF9]",
    progress: "bg-[#89BCF9]",
  },
  {
    bg: "bg-[#E0FAE7]",
    button: "bg-[#2EBE50]",
    dot: "bg-[#38E363]",
    progress: "bg-[#38E363]",
  },
  {
    bg: "bg-[#FCF5DB]",
    button: "bg-[#FEC400]",
    dot: "bg-[#FAD34C]",
    progress: "bg-[#FAD34C]",
  },
];

/* ---------- Component ---------- */

export const CarouselNavigator: FC<CarouselNavigatorProps> = ({
  totalSlides = DEFAULT_TOTAL_SLIDES,
  autoDelay = DEFAULT_AUTO_DELAY,
  themes = DEFAULT_THEMES,
  currentIndex,
  onIndexChange,
}) => {
  const theme = themes[currentIndex];

  const goPrev = () =>
    onIndexChange((currentIndex - 1 + totalSlides) % totalSlides);

  const goNext = () =>
    onIndexChange((currentIndex + 1) % totalSlides);

  return (
    <motion.div
      animate={{
        backgroundColor: theme.bg.replace("bg-[", "").replace("]", ""),
      }}
      className="flex items-center justify-center gap-1 px-4 py-3 transition-colors duration-500 rounded-full"
    >
      {/* LEFT */}
      <ArrowButton
        onClick={goPrev}
        themeColor={theme.button}
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={24} strokeWidth={3} />
      </ArrowButton>

      {/* DOTS */}
      <div className="flex items-center gap-2 px-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <Indicator
            key={i}
            isActive={i === currentIndex}
            theme={theme}
            autoDelay={autoDelay}
            onClick={() => onIndexChange(i)}
          />
        ))}
      </div>

      {/* RIGHT */}
      <ArrowButton onClick={goNext} themeColor={theme.button}>
        <ChevronRight size={24} strokeWidth={3} />
      </ArrowButton>
    </motion.div>
  );
};

/* ---------- Sub Components ---------- */

const ArrowButton = ({
  children,
  onClick,
  themeColor,
  disabled,
}: any) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-sm transition-colors duration-500
        ${disabled ? "bg-gray-300 opacity-50 " : themeColor}`}
    >
      {children}
    </motion.button>
  );
};

const Indicator = ({
  isActive,
  theme,
  autoDelay,
  onClick,
}: {
  isActive: boolean;
  theme: ThemeConfig;
  autoDelay: number;
  onClick: () => void;
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`relative h-3 rounded-full cursor-pointer focus:outline-none
        ${isActive ? `w-12 ${theme.progress}` : `w-3 ${theme.dot}`}
        transition-colors duration-500`}
    >
      {isActive && (
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: autoDelay / 1000, ease: "linear" }}
          className="absolute inset-0 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        />
      )}
    </motion.button>
  );
};