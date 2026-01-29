"use client";

import React, { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence, type PanInfo, type Variants } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Book02Icon,
  Brain02Icon,
  DropletFreeIcons,
  RunningShoesIcon,
  SwimmingIcon,
} from "@hugeicons/core-free-icons";

/*  TYPES  */

export interface CardItem {
  id: number;
  title: string;
  description: string;
  icon: (theme: "light" | "dark") => ReactNode;
}

interface CardSwipeProps {
  items?: CardItem[];
  defaultTheme?: "light" | "dark";
}

/*  DEFAULT CARDS  */

const DEFAULT_CARDS: CardItem[] = [
  {
    id: 1,
    title: "Reading",
    description: "Sharpen your mind & escape to new adventures.",
    icon: (theme) => (
      <HugeiconsIcon
        icon={Book02Icon}
        size={44}
        color={theme === "light" ? "#000000" : "#ffffff"}
        strokeWidth={1.5}
      />
    ),
  },
  {
    id: 2,
    title: "Drink Water",
    description: "Stay hydrated & energized. Your body will thank you!",
    icon: (theme) => (
      <HugeiconsIcon
        icon={DropletFreeIcons}
        size={44}
        color={theme === "light" ? "#000000" : "#ffffff"}
        strokeWidth={1.5}
      />
    ),
  },
  {
    id: 3,
    title: "Running",
    description: "Feel the endorphins! Get a quick energy boost.",
    icon: (theme) => (
      <HugeiconsIcon
        icon={RunningShoesIcon}
        size={44}
        color={theme === "light" ? "#000000" : "#ffffff"}
        strokeWidth={1.5}
      />
    ),
  },
  {
    id: 4,
    title: "Swimming",
    description: "Low-impact workout. Refreshing & invigorating.",
    icon: (theme) => (
      <HugeiconsIcon
        icon={SwimmingIcon}
        size={44}
        color={theme === "light" ? "#000000" : "#ffffff"}
        strokeWidth={1.5}
      />
    ),
  },
  {
    id: 5,
    title: "Meditation",
    description: "Find inner peace. Just 5 minutes can de-stress.",
    icon: (theme) => (
      <HugeiconsIcon
        icon={Brain02Icon}
        size={44}
        color={theme === "light" ? "#000000" : "#ffffff"}
        strokeWidth={1.5}
      />
    ),
  },
];

/*  COMPONENT  */

export const CardSwipe: React.FC<CardSwipeProps> = ({
  items = DEFAULT_CARDS,
  defaultTheme = "light",
}) => {
  const [index, setIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const [theme, setTheme] = useState<"light" | "dark">(defaultTheme);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  const variants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      filter: "blur(4px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      filter: "blur(4px)",
    }),
  };

  const swipeConfidenceThreshold = 10000;

  const swipePower = (offset: number, velocity: number) =>
    Math.abs(offset) * velocity;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + items.length) % items.length);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FEFEFE] dark:bg-zinc-950 p-4 font-sans transition-colors duration-500">
      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="mb-8 p-3 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm hover:scale-110 transition-all"
      >
        {theme === "light" ? (
          <Moon size={20} className="text-gray-600" />
        ) : (
          <Sun size={20} className="text-yellow-400" />
        )}
      </button>

      {/* Card */}
      <div className="relative w-full max-w-[360px] h-[420px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.4 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, info: PanInfo) => {
              const swipe = swipePower(info.offset.x, info.velocity.x);
              if (swipe < -swipeConfidenceThreshold) paginate(1);
              else if (swipe > swipeConfidenceThreshold) paginate(-1);
            }}
            className="absolute w-full bg-[#FEFEFE] dark:bg-zinc-900 border-[1.6px] border-[#ECECEC] dark:border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[40px] p-10 flex flex-col items-start transition-colors"
          >
            <div className="w-20 h-20 bg-[#FEFEFE] dark:bg-zinc-900 border-[1.6px] border-[#ECECEC] dark:border-zinc-800 shadow-[0_6px_20px_rgba(0,0,0,0.08)] rounded-[22px] flex items-center justify-center mb-10 transition-colors">
              {items[index].icon(theme)}
            </div>

            <h2 className="text-[32px] font-bold text-[#010101] dark:text-zinc-100 mb-2">
              {items[index].title}
            </h2>

            <p className="text-[#77767B] dark:text-zinc-400 text-[22px] mb-10">
              {items[index].description}
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-7 py-3 bg-[#262626] dark:bg-zinc-100 dark:text-zinc-900 text-[#F2F2F2] rounded-full shadow-sm"
            >
              Get Started
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex gap-3 mt-6">
        {items.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: 10,
              backgroundColor:
                i === index
                  ? theme === "light"
                    ? "#ADACB9"
                    : "#ffffff"
                  : theme === "light"
                  ? "#E5E4F0"
                  : "#3f3f46",
            }}
            transition={{ duration: 0.3 }}
            className="h-2.5 rounded-full cursor-pointer"
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
          />
        ))}
      </div>
    </div>
  );
};
