"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sun, Moon } from "lucide-react";
import React, { useEffect, useState, FC } from "react";

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
}) => {
  const [index, setIndex] = useState(0);
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  const theme = themes[index];

  /* Dark / Light mode */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", themeMode === "dark");
  }, [themeMode]);

  /* Auto slide */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % totalSlides);
    }, autoDelay);

    return () => clearInterval(timer);
  }, [index, totalSlides, autoDelay]);

  const goPrev = () =>
    setIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  const goNext = () =>
    setIndex((prev) => (prev + 1) % totalSlides);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-50 dark:bg-zinc-950 transition-colors duration-500">
      {/* Theme Toggle */}
      <button
        onClick={() =>
          setThemeMode(themeMode === "light" ? "dark" : "light")
        }
        className="mb-10 p-3 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm hover:scale-110 transition-all"
      >
        {themeMode === "light" ? (
          <Moon size={20} className="text-gray-600" />
        ) : (
          <Sun size={20} className="text-yellow-400" />
        )}
      </button>

      {/* Navigator */}
      <motion.div
        animate={{
          backgroundColor: theme.bg.replace("bg-[", "").replace("]", ""),
        }}
        className="flex items-center justify-center gap-1 px-4 py-3 rounded-full transition-colors duration-500"
      >
        {/* LEFT */}
        <ArrowButton
          onClick={goPrev}
          themeColor={theme.button}
          disabled={index === 0}
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </ArrowButton>

        {/* DOTS */}
        <div className="flex items-center gap-2 px-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <Indicator
              key={i}
              isActive={i === index}
              theme={theme}
              autoDelay={autoDelay}
              onClick={() => setIndex(i)}  
            />
          ))}
        </div>

        {/* RIGHT */}
        <ArrowButton onClick={goNext} themeColor={theme.button}>
          <ChevronRight size={24} strokeWidth={3} />
        </ArrowButton>
      </motion.div>
    </div>
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