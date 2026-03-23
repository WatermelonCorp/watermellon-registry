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

type IconRendererProps = {
  className?: string;
};

type IconRenderer = (props?: IconRendererProps) => React.ReactNode;

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
    x: direction > 0 ? 200 : -200,
    filter: 'brightness(2)',
    scale: 0.75,
    opacity: 0,
    rotate: direction > 0 ? 30 : -30,
  }),
  center: {
    x: 0,
    filter: 'brightness(1)',
    scale: 1,
    opacity: 1,
    rotate: -3,
    zIndex: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    filter: 'brightness(2)',
    scale: 0.75,
    opacity: 0,
    rotate: direction > 0 ? -30 : 30,
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
  const rotate = useTransform(dragX, [-200, 200], [-18, 18]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x < -120) paginate(1);
    else if (info.offset.x > 120) paginate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center theme-injected">
      {/* Slider */}
      <div className="relative flex aspect-square w-40 items-center justify-center -rotate-6 sm:w-3xs">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", bounce: 0.2, duration: 0.5 },
              scale: { duration: 0.35 },
              opacity: { duration: 0.25 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            style={{ rotate, x: dragX }}
            onDragEnd={handleDragEnd}
            className="absolute h-full w-full overflow-hidden rounded-4xl border-[1.2px] border-border bg-card p-2 shadow-md dark:border-border dark:bg-card"
          >
            <div className="relative h-full w-full overflow-hidden rounded-3xl bg-muted">
              <img
                src={slides[index].img}
                alt=""
                className="object-cover w-full h-full pointer-events-none"
              />

              {/* Favourite Button */}
              <button
                type="button"
                title="Favourite"
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-border/30 bg-card/90 shadow-md backdrop-blur-md dark:border-border/30 dark:bg-card/90"
              >
                {favouriteIcon({
                  className: "text-foreground dark:text-foreground",
                })}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Background Card */}
        <div className="absolute -z-10 h-[95%] w-[95%] scale-95 rounded-4xl border-[6px] border-card bg-card opacity-50 dark:border-card dark:bg-card" />
      </div>

      {/* Pagination */}
      <div className="mt-8 flex -rotate-6 gap-2.5 pl-8">
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
            className={`h-2.5 w-2.5 cursor-pointer rounded-full ${
              i === index ? "bg-primary" : "bg-secondary"
            }`}
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
