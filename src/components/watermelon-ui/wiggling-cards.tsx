import React, { useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  type PanInfo,
} from 'motion/react';
import {
  ArrowUpRight,
  ShoppingCart,
  Users,
  CreditCard,
  BarChart3,
} from 'lucide-react';
import { FaArrowUpLong } from 'react-icons/fa6';

export interface CardData {
  id: number;
  icon: React.ElementType;
  percentage: string;
  value: string;
  label: string;
}

const DEFAULT_CARDS: CardData[] = [
  {
    id: 0,
    icon: CreditCard,
    percentage: '2.15%',
    value: '$2,374',
    label: 'Weekly Expense',
  },
  {
    id: 1,
    icon: ShoppingCart,
    percentage: '1.20%',
    value: '$1,589',
    label: 'Weekly Orders',
  },
  {
    id: 2,
    icon: Users,
    percentage: '2.33%',
    value: '$976',
    label: 'Weekly Users',
  },
  {
    id: 3,
    icon: BarChart3,
    percentage: '3.82%',
    value: '$46,748',
    label: 'Weekly Sales',
  },
];

const DRAG_BUFFER = 60;
const VELOCITY_THRESHOLD = 500;

const WigglingCard = ({ card, i, x, cardWidth, gap }: { card: CardData; i: number; x: import('motion/react').MotionValue<number>; cardWidth: number; gap: number }) => {
  const Icon = card.icon;
  const center = -(i * (cardWidth + gap));

  const distance = useTransform(x, (v: number) => v - center);

  const rotate = useTransform(
    distance,
    [-cardWidth, -cardWidth * 0.1, 0, cardWidth * 0.1, cardWidth],
    [10, 10, 0, -10, -10],
  );

  const blur = useTransform(
    distance,
    [-cardWidth, -cardWidth * 0.2, 0, cardWidth * 0.2, cardWidth],
    [4, 2, 0, 2, 4],
  );

  const opacity = useTransform(
    distance,
    [-cardWidth, -cardWidth * 0.2, 0, cardWidth * 0.2, cardWidth],
    [0, 0.8, 1, 0.8, 0],
  );

  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div
      key={card.id}
      style={{
        opacity,
        rotate,
        filter,
        minWidth: cardWidth,
      }}
      className="relative flex h-72 flex-col justify-between rounded-[32px] border border-neutral-200 bg-white p-5 sm:h-80 sm:rounded-[40px] sm:p-6 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="flex flex-col gap-6 sm:gap-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 sm:h-20 sm:w-20 dark:bg-neutral-800">
          <Icon
            className="h-10 w-10 text-neutral-900 sm:h-14 sm:w-14 dark:text-neutral-100"
            strokeWidth={1.5}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex w-fit items-center rounded-2xl bg-neutral-200 px-3 py-0.5 text-base font-medium text-neutral-600 sm:text-lg dark:bg-neutral-800 dark:text-neutral-300">
            <FaArrowUpLong className="mr-1 h-3 w-3" />
            {card.percentage}
          </div>

          <h2 className="text-3xl font-bold text-neutral-900 sm:text-[42px] dark:text-neutral-100">
            {card.value}
          </h2>

          <p className="text-lg font-medium text-neutral-700 sm:text-[20px] dark:text-neutral-300">
            {card.label}
          </p>
        </div>
      </div>

      <div className="absolute right-6 bottom-7 sm:right-7 sm:bottom-9">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 sm:h-12 sm:w-12 dark:bg-neutral-800">
          <ArrowUpRight className="h-5 w-5 text-neutral-900 sm:h-6 sm:w-6 dark:text-neutral-100" />
        </div>
      </div>
    </motion.div>
  );
};

export function WigglingCards({ cards }: { cards?: CardData[] }) {
  const data = cards ?? DEFAULT_CARDS;
  const [index, setIndex] = useState(1);
  const [dimensions, setDimensions] = useState({ cardWidth: 320, gap: 200 });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({
          cardWidth: Math.min(width - 64, 300),
          gap: 40,
        });
      } else {
        setDimensions({
          cardWidth: 320,
          gap: 200,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { cardWidth, gap } = dimensions;
  const x = useMotionValue(-(index * (cardWidth + gap)));

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      setIndex((prev) => Math.min(prev + 1, data.length - 1));
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      setIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="flex flex-col items-center py-10">
      <div style={{ width: cardWidth + 40 }} className="relative mt-2">
        <motion.div
          className="flex touch-pan-y"
          drag="x"
          dragConstraints={{
            left: -(data.length - 1) * (cardWidth + gap),
            right: 0,
          }}
          style={{
            x,
            gap: `${gap}px`,
            perspective: 1000,
          }}
          animate={{
            x: -(index * (cardWidth + gap)),
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 40,
          }}
          onDragEnd={handleDragEnd}
        >
          {data.map((card, i) => (
            <WigglingCard
              key={card.id}
              card={card}
              i={i}
              x={x}
              cardWidth={cardWidth}
              gap={gap}
            />
          ))}
        </motion.div>
      </div>

      <div className="mt-8 flex gap-3">
        {data.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-3 w-3 rounded-full transition-colors duration-200 ease-out ${
              i === index
                ? 'bg-neutral-500 dark:bg-neutral-400'
                : 'bg-neutral-300 dark:bg-neutral-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
