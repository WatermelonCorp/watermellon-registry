'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  type Variants,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { X } from 'lucide-react';

export interface GalleryItem {
  id: string | number;
  url: string;
  title?: string;
}

export interface RadialCarouselProps {
  items: GalleryItem[];
  radius?: number;
  thumbnailSize?: number;
  centerSize?: number;
}

export const RadialCarousel: React.FC<RadialCarouselProps> = ({
  items,
  radius = 260,
  thumbnailSize = 110,
  centerSize = 400,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isPanning, setIsPanning] = useState(false);
  const [responsiveSizes, setResponsiveSizes] = useState({
    radius,
    thumbnailSize,
    centerSize,
  });

  useEffect(() => {
    const updateSizes = () => {
      const width = window.innerWidth;

      if (width < 400) {
        setResponsiveSizes({
          radius: Math.min(radius, 110),
          thumbnailSize: Math.min(thumbnailSize, 70),
          centerSize: Math.min(centerSize, 260),
        });
      } else if (width < 640) {
        setResponsiveSizes({
          radius: Math.min(radius, 140),
          thumbnailSize: Math.min(thumbnailSize, 80),
          centerSize: Math.min(centerSize, 300),
        });
      } else if (width < 1024) {
        setResponsiveSizes({
          radius: Math.min(radius, 200),
          thumbnailSize: Math.min(thumbnailSize, 90),
          centerSize: Math.min(centerSize, 340),
        });
      } else {
        setResponsiveSizes({ radius, thumbnailSize, centerSize });
      }
    };

    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, [radius, thumbnailSize, centerSize]);

  const rotation = useMotionValue(0);

  const smoothRotation = useSpring(rotation, {
    bounce: 0.15,
    duration: 0.1,
  });

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    setIsExpanded(false);
  };

  const containerVariants: Variants = {
    collapsed: { transition: { staggerChildren: 0.01, staggerDirection: -1 } },
    expanded: { transition: { staggerChildren: 0.03, delayChildren: 0.1 } },
  };

  return (
    <div className="relative flex h-[350px] w-full touch-pan-y items-center justify-center overflow-visible select-none sm:h-[450px]">
      <AnimatePresence mode="popLayout">
        {!isExpanded ? (
          <motion.div
            key="center-view"
            layout
            transition={{ type: 'spring', bounce: 0.15, duration: 0.15 }}
            className="relative z-10"
          >
            <motion.div
              layoutId={`card-${items[activeIndex].id}`}
              style={{
                width: responsiveSizes.centerSize,
                height: responsiveSizes.centerSize,
              }}
              className="relative overflow-hidden rounded-[32px] border border-neutral-200 bg-white p-3 shadow-2xl transition-colors duration-300 sm:rounded-[42px] sm:p-4 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <motion.img
                layoutId={`img-${items[activeIndex].id}`}
                src={items[activeIndex].url}
                alt={items[activeIndex].title}
                className="h-full w-full rounded-[28px] object-cover sm:rounded-[36px]"
                draggable={false}
              />

              <button
                onClick={toggleExpand}
                className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 shadow-xl backdrop-blur-xl transition-all duration-200 hover:scale-105 hover:bg-white active:scale-95 sm:top-8 sm:right-8 sm:h-10 sm:w-10 dark:bg-white/10 dark:hover:bg-white/20"
              >
                <X
                  size={20}
                  className="text-neutral-500 sm:hidden dark:text-white"
                />
                <X
                  size={28}
                  className="hidden text-neutral-500 sm:block dark:text-white"
                />
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="radial-view"
            variants={containerVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className={`relative flex h-full w-full cursor-grab items-center justify-center active:cursor-grabbing ${
              isPanning ? 'touch-none' : 'touch-pan-y'
            }`}
            onPanStart={() => setIsPanning(true)}
            onPanEnd={() => setIsPanning(false)}
            onPan={(_, info) => {
              rotation.set(rotation.get() + info.delta.x * 0.5);
            }}
          >
            {items.map((item, index) => {
              const baseAngle =
                (index / items.length) * (2 * Math.PI) - Math.PI / 2;
              return (
                <Item
                  key={item.id}
                  item={item}
                  baseAngle={baseAngle}
                  radius={responsiveSizes.radius}
                  thumbnailSize={responsiveSizes.thumbnailSize}
                  rotation={smoothRotation}
                  onClick={() => handleItemClick(index)}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface ItemProps {
  item: GalleryItem;
  baseAngle: number;
  radius: number;
  thumbnailSize: number;
  rotation: MotionValue<number>;
  onClick: () => void;
}

const Item: React.FC<ItemProps> = ({
  item,
  baseAngle,
  radius,
  thumbnailSize,
  rotation,
  onClick,
}) => {
  const x = useTransform(rotation, (r: number) => {
    const currentAngle = baseAngle + (r * Math.PI) / 180;
    return Math.cos(currentAngle) * radius;
  });

  const y = useTransform(rotation, (r: number) => {
    const currentAngle = baseAngle + (r * Math.PI) / 180;
    return Math.sin(currentAngle) * radius;
  });

  const rotate = useTransform(rotation, (r: number) => {
    const currentAngle = baseAngle + (r * Math.PI) / 180;
    return (currentAngle * 180) / Math.PI + 90;
  });

  const itemVariants: Variants = {
    collapsed: {
      opacity: 0,
      scale: 0.8,
      transition: { type: 'spring', bounce: 0.4, duration: 0.5 },
    },
    expanded: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', bounce: 0.4, duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      style={{ x, y, rotate }}
      onClick={onClick}
      className="absolute cursor-pointer"
    >
      <motion.div
        layoutId={`card-${item.id}`}
        style={{ width: thumbnailSize, height: thumbnailSize }}
        className="overflow-hidden rounded-[18px] border border-neutral-200 bg-white p-1 shadow-2xl ring-1 ring-black/5 transition-colors duration-300 sm:rounded-[24px] dark:border-neutral-800 dark:bg-neutral-900 dark:ring-white/5"
      >
        <motion.img
          layoutId={`img-${item.id}`}
          src={item.url}
          alt={item.title}
          className="h-full w-full rounded-[13px] object-cover sm:rounded-[18px]"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
};
