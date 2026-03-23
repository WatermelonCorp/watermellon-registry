import React, { useState } from "react";
import {
  motion,
  MotionConfig,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  type Transition,
  MotionValue,
  type PanInfo,
} from "motion/react";
import { FaArrowUp } from "react-icons/fa6";
import { cn } from "@/lib/utils";

export interface FundItem {
  id: string;
  label: string;
  value: string;
  change: string;
}

interface FundWidgetProps {
  data?: FundItem[];
  initialIndex?: number;
}

const DEFAULT_DATA: FundItem[] = [
  {
    id: "stocks",
    label: "Stocks",
    value: "2.7Cr",
    change: "12%",
  },
  {
    id: "funds",
    label: "Funds",
    value: "3.5Cr",
    change: "8%",
  },
  {
    id: "deposits",
    label: "Deposits",
    value: "1.2Cr",
    change: "6%",
  },
];

const CARD_HEIGHT = 320;
const DRAG_BUFFER = 40;
const VELOCITY_THRESHOLD = 0;

const SPRING_OPTIONS: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 40,
};

const FundCard = ({ item, i, y }: { item: FundItem; i: number; y: MotionValue<number> }) => {
  const cardOffset = i * CARD_HEIGHT;

  const rotateX = useTransform(
    y,
    [-(cardOffset + CARD_HEIGHT), -cardOffset, -(cardOffset - CARD_HEIGHT)],
    [-25, 0, 25],
    { clamp: true }
  );

  const DEAD_ZONE = CARD_HEIGHT * 0.25;

  const blur = useTransform(
    y,
    [
      -(cardOffset + CARD_HEIGHT),
      -(cardOffset + DEAD_ZONE),
      -cardOffset,
      -(cardOffset - DEAD_ZONE),
      -(cardOffset - CARD_HEIGHT),
    ],
    [8, 0, 0, 0, 8],
    { clamp: true }
  );

  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div
      key={item.id}
      className="flex min-h-[320px] min-w-[320px] flex-col p-10 transform-3d"
      style={{
        rotateX,
        filter,
        transformPerspective: 1000,
      }}
    >
      <h2 className="text-foreground text-[60px] leading-none font-bold">
        {item.value}
      </h2>

      <p className="text-muted-foreground mt-4 flex items-center gap-2 text-[32px] font-bold">
        {item.change}
        <FaArrowUp className="text-2xl" />
      </p>

      <h3 className="text-muted-foreground mt-12 text-[40px] font-bold">
        {item.label}
      </h3>
    </motion.div>
  );
};

export const FundWidget: React.FC<FundWidgetProps> = ({
  data = DEFAULT_DATA,
  initialIndex = 0,
}) => {
  const [index, setIndex] = useState(initialIndex);

  const y = useMotionValue(-(initialIndex * CARD_HEIGHT));

const handleDragEnd = (
  _: MouseEvent | TouchEvent | PointerEvent,
  info: PanInfo
) => {
  const offset = info.offset.y;
  const velocity = info.velocity.y;

  if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
    setIndex((prev) => Math.min(prev + 1, data.length - 1));
  } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
    setIndex((prev) => Math.max(prev - 1, 0));
  }
};
  return (
    <div className="theme-injected">
      <div className="relative flex items-center justify-center">
        <MotionConfig transition={SPRING_OPTIONS}>
          <div className="relative overflow-visible">
            <div className="relative z-0 overflow-visible">
              <div className="border-border bg-muted absolute right-[18px] -bottom-[332px] left-[18px] z-[-1] h-20 w-[90%] rounded-lg border-2 shadow-[0_4px_20px_rgba(0,0,0,0.03)]" />
            </div>

            <div className="border-border bg-card relative h-[320px] w-[320px] overflow-hidden rounded-lg border-2 shadow-md select-none perspective-[1000px] transform-3d">
              <motion.div
                drag="y"
                dragConstraints={{
                  top: -((data.length - 1) * CARD_HEIGHT),
                  bottom: 0,
                }}
                dragElastic={0.12}
                style={{ y }}
                onDragEnd={handleDragEnd}
                animate={{
                  y: -(index * CARD_HEIGHT),
                }}
                className="flex cursor-grab flex-col transform-3d active:cursor-grabbing"
              >
                {data.map((item, i) => (
                  <FundCard key={item.id} item={item} i={i} y={y} />
                ))}
              </motion.div>

              <div className="absolute top-1/2 right-7 z-20 flex -translate-y-1/2 flex-col">
                {data.map((_, i) => (
                  <button
                    key={i}
                    title="slider"
                    onClick={() => setIndex(i)}
                    className="py-1 focus:outline-none"
                  >
                    <motion.div
                      animate={{
                        height: i === index ? 42 : 10,
                      }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "w-[8px] rounded-lg bg-foreground/50 transition-colors duration-300",
                        i === index && "bg-foreground"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </MotionConfig>
      </div>
    </div>
  );
};
