'use client';

import React, { useState, useEffect, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
  type Transition,
} from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTheme } from 'next-themes';
import {
  Book02Icon,
  Brain02Icon,
  DropletFreeIcons,
  RunningShoesIcon,
  SwimmingIcon,
} from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';

export interface CardItem {
  id: number;
  title: string;
  description: string;
  icon: (theme: 'light' | 'dark') => ReactNode;
}

interface CardCarouselProps {
  items?: CardItem[];
}

const DEFAULT_CARDS: CardItem[] = [
  {
    id: 1,
    title: 'Reading',
    description: 'Sharpen your mind & escape to new adventures.',
    icon: (theme) => (
      <HugeiconsIcon
        icon={Book02Icon}
        size={52}
        color={theme === 'light' ? '#000000' : '#ffffff'}
        strokeWidth={1.5}
      />
    ),
  },
  {
    id: 2,
    title: 'Drink Water',
    description: 'Stay hydrated & energized. Your body will thank you!',
    icon: (theme) => (
      <HugeiconsIcon
        icon={DropletFreeIcons}
        size={52}
        color={theme === 'light' ? '#000000' : '#ffffff'}
        strokeWidth={1.5}
      />
    ),
  },
  {
    id: 3,
    title: 'Running',
    description: 'Feel the endorphins! Get a quick energy boost.',
    icon: (theme) => (
      <HugeiconsIcon
        icon={RunningShoesIcon}
        size={52}
        color={theme === 'light' ? '#000000' : '#ffffff'}
        strokeWidth={1.5}
      />
    ),
  },
  {
    id: 4,
    title: 'Swimming',
    description: 'Low-impact workout. Refreshing & invigorating.',
    icon: (theme) => (
      <HugeiconsIcon
        icon={SwimmingIcon}
        size={52}
        color={theme === 'light' ? '#000000' : '#ffffff'}
        strokeWidth={1.5}
      />
    ),
  },
  {
    id: 5,
    title: 'Meditation',
    description: 'Find inner peace. Just 5 minutes can de-stress.',
    icon: (theme) => (
      <HugeiconsIcon
        icon={Brain02Icon}
        size={52}
        color={theme === 'light' ? '#000000' : '#ffffff'}
        strokeWidth={1.5}
      />
    ),
  },
];

const ITEM_WIDTH = 320;
const GAP = 16;
const CONTAINER_WIDTH = ITEM_WIDTH + GAP;
const DRAG_BUFFER = 50;
const VELOCITY_THRESHOLD = 500;

const SPRING_OPTIONS: Transition = {
  type: 'spring',
  stiffness: 330,
  damping: 30,
};


interface CarouselCardProps {
  item: CardItem;
  index: number;
  x: ReturnType<typeof useMotionValue<number>>;
  itemCount: number;
  currentTheme: 'light' | 'dark';
}

const CarouselCard: React.FC<CarouselCardProps> = ({
  item,
  index,
  x,
  itemCount,
  currentTheme,
}) => {
  const nextIndex = Math.min(index + 1, itemCount - 1);
  const prevIndex = Math.max(index - 1, 0);

  const range = [
    (-100 * (index + 1) * CONTAINER_WIDTH) / 100,
    (-100 * index * CONTAINER_WIDTH) / 100,
    (-100 * (index - 1) * CONTAINER_WIDTH) / 100,
  ];
  const outputRange = [nextIndex ? 90 : 90, 0, prevIndex ? -90 : -90];

  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      style={{
        width: ITEM_WIDTH,
        height: 420,
        rotateY,
        flexShrink: 0,
      }}
      transition={SPRING_OPTIONS}
      className="flex cursor-grab flex-col items-start rounded-[40px] border-[1.6px] border-[#ECECEC] bg-[#FEFEFE] p-8 transition-colors active:cursor-grabbing sm:p-10 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[20px] border-[1.6px] border-[#ECECEC] bg-[#FEFEFE] shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-colors sm:mb-10 sm:h-24 sm:w-24 sm:rounded-[24px] dark:border-zinc-800 dark:bg-zinc-900">
        {item.icon(currentTheme)}
      </div>

      <h2 className="mb-2 text-2xl font-bold text-[#010101] sm:text-[32px] dark:text-zinc-100">
        {item.title}
      </h2>

      <p className="mb-5 text-lg text-[#77767B] sm:text-[22px] dark:text-zinc-400">
        {item.description}
      </p>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="rounded-full bg-[#262626] px-6 py-2.5 text-sm text-[#F2F2F2] shadow-sm sm:px-7 sm:py-3 sm:text-base dark:bg-zinc-100 dark:text-zinc-900"
      >
        Get Started
      </motion.button>
    </motion.div>
  );
};

export const CardSwipe: React.FC<CardCarouselProps> = ({
  items = DEFAULT_CARDS,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  const x = useMotionValue(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = resolvedTheme === 'dark' ? 'dark' : 'light';

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      setCurrentIndex((prev) => Math.min(prev + 1, items.length - 1));
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const leftConstraint = -((ITEM_WIDTH + GAP) * (items.length - 1));

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="relative overflow-hidden"
        style={{ width: ITEM_WIDTH, height: 420 }}
      >
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{ left: leftConstraint, right: 0 }}
          style={{
            gap: GAP,
            perspective: 1000,
            perspectiveOrigin: currentIndex * ITEM_WIDTH + ITEM_WIDTH / 2,
            x,
          }}
          onDragEnd={handleDragEnd}
          animate={{ x: -(currentIndex * CONTAINER_WIDTH) }}
          transition={SPRING_OPTIONS}
        >
          {items.map((item, index) => (
            <CarouselCard
              key={item.id}
              item={item}
              index={index}
              x={x}
              itemCount={items.length}
              currentTheme={currentTheme}
            />
          ))}
        </motion.div>
      </div>

      <div className="mt-4 flex gap-3 sm:mt-6">
        {items.map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-2 w-2 cursor-pointer rounded-full bg-zinc-200 transition-colors duration-200',
              currentIndex === i && 'bg-zinc-400',
            )}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSwipe;
  