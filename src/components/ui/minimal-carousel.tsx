"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, Copy, Anchor } from "lucide-react";
import { VscSparkleFilled } from "react-icons/vsc";
import { BsBookmarkStarFill } from "react-icons/bs";
import { FaCloud } from "react-icons/fa";

/*  Types  */

export interface CarouselCard {
  id: string;
  title: string;
  value: string;
  color: string;
  icon: React.ElementType;
}

interface MinimalCarouselProps {
  cards?: CarouselCard[];
  onCopyClick?: (card: CarouselCard) => void;
  onCustomizeClick?: (card: CarouselCard) => void;
}

/*  Default Data  */

const DefaultCards: CarouselCard[] = [
  {
    id: "gxuri",
    title: "Gxuri",
    value: "1.03 ETH",
    color: "bg-[#AD46FF]",
    icon: VscSparkleFilled,
  },
  {
    id: "savings",
    title: "Savings",
    value: "25.08 ETH",
    color: "bg-[#171717]",
    icon: BsBookmarkStarFill,
  },
  {
    id: "yield",
    title: "Yield",
    value: "0.04 ETH",
    color: "bg-[#00B8DB]",
    icon: FaCloud,
  },
  {
    id: "spending",
    title: "Spending",
    value: "0 ETH",
    color: "bg-[#2B7FFF]",
    icon: Anchor,
  },
];

/*  Component  */

export const MinimalCarousel: React.FC<MinimalCarouselProps> = ({
  cards = DefaultCards,
  onCopyClick,
  onCustomizeClick,
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeCard = cards.find((c) => c.id === activeId);
  const secondaryCards = cards.filter((c) => c.id !== activeId);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setActiveId(null);
  };

  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center
                 bg-[#0a0a0a] px-4 sm:px-6 select-none font-sans"
      onClick={handleBackgroundClick}
    >
      <div className="w-full max-w-[380px] sm:max-w-[420px] md:max-w-[400px]">
        <motion.div layout className="flex flex-col gap-3">
          {/*  Expanded Card  */}
          <AnimatePresence mode="popLayout">
            {activeCard && (
              <motion.div
                key={activeCard.id}
                layoutId={activeCard.id}
                className={`relative flex w-full flex-col justify-between
                            rounded-[32px] p-4 py-3 text-white shadow-2xl
                            ${activeCard.color}
                            h-[170px] sm:h-[180px] md:h-[190px]`}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full">
                    <activeCard.icon size={44} />
                  </div>

                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => onCopyClick?.(activeCard)}
                    className="flex items-center gap-2 rounded-full
                               px-3 py-2 font-bold backdrop-blur-md text-base"
                  >
                    Copy Address <Copy size={18} />
                  </motion.button>
                </div>

                <div className="flex items-end justify-between pb-3 sm:pb-4">
                  <div>
                    <h3 className="text-2xl font-semibold opacity-90">
                      {activeCard.title}
                    </h3>
                    <p className="text-xl font-semibold tracking-tight opacity-60">
                      {activeCard.value}
                    </p>
                  </div>

                  <button
                    onClick={() => onCustomizeClick?.(activeCard)}
                    className="rounded-full bg-white/35 px-3 py-1.5
                               text-base font-bold backdrop-blur-md"
                  >
                    Customize
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/*  Grid  */}
          <motion.div
            layout
            className={`grid gap-3 ${activeId
                ? "grid-cols-3"
                : "grid-cols-2"
              }`}
          >
            {(activeId ? secondaryCards : cards).map((card) => (
              <motion.div
                key={card.id}
                layoutId={card.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveId(card.id);
                }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                className={`relative flex flex-col justify-between cursor-pointer
                            rounded-[28px] p-3.5 text-white shadow-lg
                            ${card.color}
                            ${activeId
                    ? "h-[110px] sm:h-[120px]"
                    : "h-[120px] sm:h-[130px]"
                  }`}
              >
                <div className="flex justify-between items-start">
                  <card.icon size={activeId ? 24 : 32} />
                  <div className="rounded-full bg-white/10 hover:bg-white/25 p-1.5">
                    <MoreHorizontal size={20} />
                  </div>
                </div>

                <div>
                  <h4
                    className={`${activeId ? "text-sm" : "text-base"
                      } font-medium opacity-90`}
                  >
                    {card.title}
                  </h4>
                  <p
                    className={`${activeId ? "text-sm" : "text-base"
                      } font-semibold text-white/60`}
                  >
                    {card.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};