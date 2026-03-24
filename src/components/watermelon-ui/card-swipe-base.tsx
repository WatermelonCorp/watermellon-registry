'use client';

import React, { useState, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
  type Transition,
} from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
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
  icon: () => ReactNode;
}

interface CardCarouselProps {
  items?: CardItem[];
}

const DEFAULT_CARDS: CardItem[] = [
  {
    id: 1,
    title: 'Reading',
    description: 'Sharpen your mind & escape to new adventures.',
    icon: () => (
      <HugeiconsIcon
        icon={Book02Icon}
        size={52}
        color="currentColor"
        strokeWidth={1.5}
      />
    ),
  },
  {
    id: 2,
    title: 'Drink Water',
    description: 'Stay hydrated & energized. Your body will thank you!',
    icon: () => (
      <HugeiconsIcon
        icon={DropletFreeIcons}
        size={52}
        color="currentColor"
        strokeWidth={1.5}
      />
    ),
  },
  {
    id: 3,
    title: 'Running',
    description: 'Feel the endorphins! Get a quick energy boost.',
    icon: () => (
      <HugeiconsIcon
        icon={RunningShoesIcon}
        size={52}
        color="currentColor"
        strokeWidth={1.5}
      />
    ),
  },
  {
    id: 4,
    title: 'Swimming',
    description: 'Low-impact workout. Refreshing & invigorating.',
    icon: () => (
      <HugeiconsIcon
        icon={SwimmingIcon}
        size={52}
        color="currentColor"
        strokeWidth={1.5}
      />
    ),
  },
  {
    id: 5,
    title: 'Meditation',
    description: 'Find inner peace. Just 5 minutes can de-stress.',
    icon: () => (
      <HugeiconsIcon
        icon={Brain02Icon}
        size={52}
        color="currentColor"
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
}

const CarouselCard: React.FC<CarouselCardProps> = ({
  item,
  index,
  x,
  itemCount,
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
      className="border-border bg-card dark:border-border dark:bg-card flex cursor-grab flex-col items-start rounded-4xl border-[1.6px] p-8 transition-colors active:cursor-grabbing sm:p-10"
    >
      <div className="border-border bg-card text-foreground dark:border-border dark:bg-card dark:text-foreground mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border-[1.6px] shadow-md transition-colors sm:mb-10 sm:h-24 sm:w-24 sm:rounded-3xl">
        {item.icon()}
      </div>

      <h2 className="text-foreground dark:text-foreground mb-2 font-sans text-2xl font-bold sm:text-[32px]">
        {item.title}
      </h2>

      <p className="text-muted-foreground dark:text-muted-foreground mb-5 font-sans text-lg sm:text-[22px]">
        {item.description}
      </p>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground rounded-full px-6 py-2.5 font-sans text-sm shadow-sm sm:px-7 sm:py-3 sm:text-base"
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

  const x = useMotionValue(0);

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
    <div className="theme-injected flex flex-col items-center justify-center">
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
            />
          ))}
        </motion.div>
      </div>

      <div className="mt-4 flex gap-3 sm:mt-6">
        {items.map((_, i) => (
          <div
            key={i}
            className={cn(
              'bg-secondary h-2 w-2 cursor-pointer rounded-full transition-colors duration-200',
              currentIndex === i && 'bg-primary',
            )}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSwipe;
