import React, { useState } from 'react';
import { motion, AnimatePresence, type PanInfo, type Variants } from 'motion/react';
import { ArrowUpRight, ShoppingCart, Users, CreditCard, BarChart3 } from 'lucide-react';
import { FaArrowUpLong, FaMoon, FaSun } from 'react-icons/fa6';

export interface CardData {
  id: number;
  icon: React.ElementType;
  percentage: string;
  value: string;
  label: string;
}

const DEFAULT_CARDS: CardData[] = [
  { id: 0, icon: CreditCard, percentage: "2.15%", value: "$2,374", label: "Weekly Expense" },
  { id: 1, icon: ShoppingCart, percentage: "1.20%", value: "$1,589", label: "Weekly Orders" },
  { id: 2, icon: Users, percentage: "2.33%", value: "$976", label: "Weekly Users" },
  { id: 3, icon: BarChart3, percentage: "3.82%", value: "$46,748", label: "Weekly Sales" },
];

interface WigglingCardsProps {
  cards?: CardData[];
}

export  function WigglingCards({ cards }: WigglingCardsProps) {
  const data = cards ?? DEFAULT_CARDS;

  const [index, setIndex] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isDark, setIsDark] = useState(false);

  const cardVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 25 : -25,
      filter: "blur(10px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 25 : -25,
      filter: "blur(10px)",
      transition: { duration: 0.4 },
    }),
    wiggle: {
      rotateZ: [-0.25, 0.25],
      transition: {
        rotateZ: {
          repeat: Infinity,
          duration: 1.2,
          ease: "easeInOut",
        },
      },
    },
  };

  const paginate = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= data.length) return;
    setDirection(newIndex > index ? 1 : -1);
    setIndex(newIndex);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 80) paginate(index - 1);
    else if (info.offset.x < -80) paginate(index + 1);
  };

  const CurrentIcon = data[index].icon;

  return (
    <div className={isDark ? 'invert hue-rotate-180' : ''}>
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans">

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center border bg-white shadow-sm"
          title="Toggle theme"
        >
          {isDark ? <FaSun /> : <FaMoon />}
        </button>

        <div className="relative w-80 h-96 flex items-center justify-center perspective-1000">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={index}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              whileHover="wiggle"
              className="absolute w-80 h-80 bg-white rounded-[40px] shadow-md shadow-gray-200 border-2 border-[#E0DEDA] p-6 flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              <div className="flex flex-col gap-10">
                <div className="bg-[#F4F4FC]/80 w-20 h-20 rounded-2xl flex items-center justify-center">
                  <CurrentIcon className="w-14 h-14 text-[#020204]" strokeWidth={1.5} />
                </div>

                <div className="flex flex-col items-start gap-1.5">
                  <div className="flex items-center text-[#68676E] text-lg font-medium bg-[#F4F4FC] w-fit px-3 py-0.5 rounded-2xl">
                    <FaArrowUpLong className="w-3 h-3 mr-1" />
                    {data[index].percentage}
                  </div>

                  <h2 className="text-[42px] font-bold text-[#020204] tracking-wide">
                    {data[index].value}
                  </h2>

                  <p className="text-[#000002] text-[20px] font-medium">
                    {data[index].label}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-9 right-7">
                <div className="w-12 h-12 bg-[#F4F4FB] shadow-sm rounded-full flex items-center justify-center transition-transform hover:scale-110">
                  <ArrowUpRight className="w-6 h-6 text-[#06050A]" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-3">
          {data.map((_, i) => (
            <button
              key={i}
              title="page"
              onClick={() => paginate(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === index ? 'bg-[#ADACB8]' : 'bg-[#E5E4F0] hover:bg-[#ADACB8]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
