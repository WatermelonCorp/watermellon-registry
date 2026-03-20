"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MoreHorizontal, Copy } from "lucide-react";

/* --- Types --- */
export interface CarouselCard {
  id: string;
  title: string;
  value: string;
  color: string;
  icon: React.ElementType;
}

interface MinimalCarouselProps {
  cards: CarouselCard[];
  onCopyClick?: (card: CarouselCard) => void;
  onCustomizeClick?: (card: CarouselCard) => void;
}

export const MinimalCarousel: React.FC<MinimalCarouselProps> = ({
  cards,
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
    <div className="min-h-full w-full flex items-center justify-center bg-transparent theme-injected">
      <div
        className="w-full flex flex-col items-center justify-center px-4 sm:px-5 select-none font-sans"
        onClick={handleBackgroundClick}
      >
        {/* Container  */}
        <div className="w-full max-w-105">
          <motion.div layout className="flex flex-col gap-4">

            {/* Expanded Card */}
            <AnimatePresence mode="popLayout">
              {activeCard && (
                <motion.div
                  key={activeCard.id}
                  layoutId={activeCard.id}
                  className={`relative flex w-full flex-col justify-between
                             rounded-2xl sm:rounded-3xl border border-white/20 p-5 sm:p-6 text-white shadow-xl
                             ${activeCard.color}
                             min-h-42.5 sm:h-48`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full shrink-0">
                      <activeCard.icon size={38} className="sm:w-11 sm:h-11" />
                    </div>

                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCopyClick?.(activeCard);
                      }}
                      className="flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15
                                 px-3 py-1.5 sm:px-4 sm:py-2 font-bold backdrop-blur-md 
                                 text-xs sm:text-base whitespace-nowrap
                                 hover:bg-white/20 transition-colors"
                    >
                      Copy <span className="hidden xs:inline">Address</span> <Copy size={16} />
                    </motion.button>
                  </div>

                  <div className="flex items-end justify-between mt-4">
                    <div className="overflow-hidden mr-2">
                      <h3 className="text-xl sm:text-2xl font-semibold opacity-90 leading-tight truncate">
                        {activeCard.title}
                      </h3>
                      <p className="text-lg sm:text-xl font-semibold tracking-tight opacity-60 truncate">
                        {activeCard.value}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCustomizeClick?.(activeCard);
                      }}
                      className="rounded-full border border-white/30 bg-white/25 px-3 py-1.5 sm:px-4 sm:py-2
                                 text-sm sm:text-base font-bold backdrop-blur-md 
                                 hover:bg-white/40 transition-colors shrink-0"
                    >
                      Edit
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Grid Layout */}
            <motion.div
              layout
              className={`grid gap-3 sm:gap-4 transition-all duration-500 ${activeId ? "grid-cols-3" : "grid-cols-2"
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
                             rounded-xl sm:rounded-2xl border border-white/15 p-3 sm:p-4 text-white shadow-md
                             ${card.color}
                             ${activeId ? "h-24 sm:h-28" : "h-28 sm:h-32"}`}
                >
                  <div className="flex justify-between items-start">
                    <card.icon size={activeId ? 20 : 28} className="shrink-0" />
                    <div className="rounded-full border border-white/25 bg-white/15 p-1 sm:p-1.5 transition-colors">
                      <MoreHorizontal size={16} />
                    </div>
                  </div>

                  <div className="mt-1 overflow-hidden">
                    <h4 className={`${activeId ? "text-xs sm:text-xs" : "text-sm sm:text-base"} 
                                   font-medium opacity-90 truncate leading-tight`}>
                      {card.title}
                    </h4>
                    <p className={`${activeId ? "text-xs sm:text-xs" : "text-sm sm:text-base"} 
                                   font-semibold text-white/60 truncate`}>
                      {card.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};