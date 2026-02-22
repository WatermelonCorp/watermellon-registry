import React, { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  type PanInfo,
} from "framer-motion";
import {
  ArrowUpRight,
  ShoppingCart,
  Users,
  CreditCard,
  BarChart3,
} from "lucide-react";
import { FaArrowUpLong } from "react-icons/fa6";

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
    percentage: "2.15%",
    value: "$2,374",
    label: "Weekly Expense",
  },
  {
    id: 1,
    icon: ShoppingCart,
    percentage: "1.20%",
    value: "$1,589",
    label: "Weekly Orders",
  },
  {
    id: 2,
    icon: Users,
    percentage: "2.33%",
    value: "$976",
    label: "Weekly Users",
  },
  {
    id: 3,
    icon: BarChart3,
    percentage: "3.82%",
    value: "$46,748",
    label: "Weekly Sales",
  },
];

const CARD_WIDTH = 320;
const GAP = 40;

const DRAG_BUFFER = 80;
const VELOCITY_THRESHOLD = 500;

export function WigglingCards({ cards }: { cards?: CardData[] }) {
  const data = cards ?? DEFAULT_CARDS;

  const [index, setIndex] = useState(1);

  const x = useMotionValue(-(index * (CARD_WIDTH + GAP)));

  const handleDragEnd = (_: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      setIndex((prev) => Math.min(prev + 1, data.length - 1));
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      setIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-[360px]">
        <motion.div
          className="flex gap-4"
          drag="x"
          dragConstraints={{
            left: -(data.length - 1) * (CARD_WIDTH + GAP),
            right: 0,
          }}
          style={{
            x,
            gap: `${GAP}px`,
            perspective: 1000,
          }}
          animate={{
            x: -(index * (CARD_WIDTH + GAP)),
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          onDragEnd={handleDragEnd}
        >
          {data.map((card, i) => {
            const Icon = card.icon;
            const center = -(i * (CARD_WIDTH + GAP));

            const distance = useTransform(x, (v) => v - center);

            const rotate = useTransform(
              distance,
              [-CARD_WIDTH, -CARD_WIDTH * 0.2, 0, CARD_WIDTH * 0.2, CARD_WIDTH],
              [10, 10, 0, -10, -10]
            );

            const blur = useTransform(
              distance,
              [-CARD_WIDTH, -CARD_WIDTH * 0.2, 0, CARD_WIDTH * 0.2, CARD_WIDTH],
              [4, 2, 0, 2, 4]
            );

            const opacity = useTransform(
              distance,
              [-CARD_WIDTH, -CARD_WIDTH * 0.2, 0, CARD_WIDTH * 0.2, CARD_WIDTH],
              [0, 0.8, 1, 0.8, 0]
            );

            const filter = useMotionTemplate`blur(${blur}px)`;

            return (
              <motion.div
                key={card.id}
                style={{
                  opacity,
                  rotate,
                  filter,
                  minWidth: CARD_WIDTH,
                }}
                className="relative flex h-80 flex-col justify-between rounded-[40px] border-2 border-[#E0DEDA] bg-white p-6"
              >
                <div className="flex flex-col gap-10">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#F4F4FC]/80">
                    <Icon
                      className="h-14 w-14 text-[#020204]"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex w-fit items-center rounded-2xl bg-[#F4F4FC] px-3 py-0.5 text-lg font-medium text-[#68676E]">
                      <FaArrowUpLong className="mr-1 h-3 w-3" />
                      {card.percentage}
                    </div>

                    <h2 className="text-[42px] font-bold text-[#020204]">
                      {card.value}
                    </h2>

                    <p className="text-[20px] font-medium text-[#000002]">
                      {card.label}
                    </p>
                  </div>
                </div>

                <div className="absolute right-7 bottom-9">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F4F4FB]">
                    <ArrowUpRight className="h-6 w-6" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-4 flex gap-3">
        {data.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-3 w-3 rounded-full transition-colors ${
              i === index ? "bg-[#ADACB8]" : "bg-[#E5E4F0]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
