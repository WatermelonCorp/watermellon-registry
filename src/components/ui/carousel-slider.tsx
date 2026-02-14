"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type PanInfo,
  type Variants,
} from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { FavouriteIcon } from "@hugeicons/core-free-icons";

/* ---------------- Types ---------------- */

export interface Slide {
  id: number;
  img: string;
}

type IconRenderer = (props?: any) => React.ReactNode;

interface CarouselSliderProps {
  slides?: Slide[];
  favouriteIcon?: IconRenderer;
}

/* ---------------- Defaults ---------------- */

const DEFAULT_SLIDES: Slide[] = [
  { id: 1, img: "https://prourls.link/ORXBVr" },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=500&auto=format&fit=crop",
  },
];

/* ---------------- Animation Variants ---------------- */

const variants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 260 : -260,
    scale: 0.9,
    opacity: 0,
    rotate: direction > 0 ? 8 : -8,
  }),
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    rotate: -3,
    zIndex: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -260 : 260,
    scale: 0.85,
    opacity: 0,
    rotate: direction > 0 ? -18 : 18,
    zIndex: 0,
  }),
};

/* ---------------- Component ---------------- */

export const CarouselSlider: React.FC<CarouselSliderProps> = ({
  slides = DEFAULT_SLIDES,
  favouriteIcon = (props) => (
    <HugeiconsIcon
      icon={FavouriteIcon}
      size={26}
      strokeWidth={1.5}
      {...props}
    />
  ),
}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const dragX = useMotionValue(0);
  const rotate = useTransform(dragX, [-200, 200], [-12, 12]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -120) paginate(1);
    else if (info.offset.x > 120) paginate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Slider */}
      <div className="relative w-48 sm:w-3xs aspect-square flex items-center justify-center -rotate-[6deg]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 280, damping: 28 },
              scale: { duration: 0.35 },
              opacity: { duration: 0.25 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            style={{ rotate, x: dragX }}
            onDragEnd={handleDragEnd}
            className="absolute w-full h-full bg-[#FDFDFD] dark:bg-zinc-900 rounded-[40px] p-2 shadow-md border-[1.2px] border-[#E6E6EA] dark:border-zinc-800 overflow-hidden"
          >
            <div className="w-full h-full rounded-[32px] overflow-hidden bg-zinc-100 relative">
              <img
                src={slides[index].img}
                alt=""
                className="object-cover w-full h-full pointer-events-none"
              />

              {/* Favourite Button */}
              <button
                type="button"
                title="Favourite"
                className="absolute top-4 right-4 w-10 h-10 bg-[#EDEDED] dark:bg-zinc-900/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md border border-white/20"
              >
                {favouriteIcon({
                  className: "text-[#2b2b2b] dark:text-white/90",
                })}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Background Card */}
        <div className="absolute -z-10 w-[95%] h-[95%] bg-white dark:bg-zinc-900 rounded-[40px] border-[6px] border-white dark:border-zinc-800 scale-95 opacity-50" />
      </div>

      {/* Pagination */}
      <div className="flex gap-2.5 mt-8 pl-8 -rotate-[6deg]">
        {slides.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: i === index ? 1.2 : 1,
              opacity: i === index ? 1 : 0.4,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="w-2.5 h-2.5 rounded-full bg-[#CCC7B8] cursor-pointer"
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
