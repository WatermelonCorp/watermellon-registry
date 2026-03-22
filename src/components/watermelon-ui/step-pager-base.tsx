import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BsMusicNoteList } from "react-icons/bs";
import { HiOutlineAdjustments } from "react-icons/hi";
import { MdFavorite } from "react-icons/md";
import { RiBubbleChartFill } from "react-icons/ri";

export interface StepItem {
  id: number;
  label: string;
  icon: React.ElementType;
}

const defaultItems: StepItem[] = [
  { id: 1, label: "Explore", icon: RiBubbleChartFill },
  { id: 2, label: "Curate", icon: MdFavorite },
  { id: 3, label: "Mix", icon: HiOutlineAdjustments },
  { id: 4, label: "Play", icon: BsMusicNoteList },
];

interface StepPagerProps {
  steps?: StepItem[];
  initialStep?: number;
}

export const StepPager: React.FC<StepPagerProps> = ({
  steps = defaultItems,
  initialStep = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialStep);

  const nextStep = () => setActiveIndex((prev) => (prev + 1) % steps.length);
  const prevStep = () =>
    setActiveIndex((prev) => (prev - 1 + steps.length) % steps.length);

  return (
    <div className="theme-injected">
      <div className="relative flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 select-none">
          <div className="flex h-8 items-center justify-center">
            <AnimatedText
              text={steps[activeIndex].label}
              className="text-foreground text-[26px] font-extrabold tracking-normal"
              delayStep={0.03}
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              title="left"
              onClick={prevStep}
              className="bg-muted text-muted-foreground hover:bg-muted/50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg transition-all duration-250 active:scale-95"
            >
              <ChevronLeft size={26} strokeWidth={2.5} />
            </button>

            <div className="border-border bg-background relative flex h-16 min-w-[140px] items-center justify-center gap-1 rounded-lg border-2 px-4">
              {steps.map((step, index) => {
                const isActive = index === activeIndex;
                const Icon = step.icon;

                return (
                  <div
                    key={step.id}
                    className="relative flex h-6 w-6 items-center justify-center"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-[-8px] z-0 rounded-lg bg-transparent"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}

                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={isActive ? "active" : "inactive"}
                        className="relative z-10 flex cursor-pointer items-center justify-center"
                        initial={{
                          opacity: 0,
                          filter: "blur(4px)",
                          scale: isActive ? 0 : 1,
                        }}
                        animate={{
                          opacity: 1,
                          filter: "blur(0px)",
                          scale: 1,
                          color: isActive
                            ? "oklch(var(--foreground))"
                            : "oklch(var(--muted-foreground))",
                        }}
                        exit={{ opacity: 0, filter: "blur(4px)", scale: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        onClick={() => setActiveIndex(index)}
                      >
                        {isActive ? (
                          <Icon size={26} className="text-foreground" />
                        ) : (
                          <div className="bg-muted-foreground/50 h-2.5 w-2.5 rounded-lg" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <button
              title="right"
              onClick={nextStep}
              className="bg-muted text-muted-foreground hover:bg-muted/50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg transition-all duration-250 active:scale-95"
            >
              <ChevronRight size={26} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function AnimatedText({
  text,
  className,
  delayStep = 0.014,
}: {
  text: string;
  className?: string;
  delayStep?: number;
}) {
  const chars = text.split("");

  return (
    <span className={className} style={{ display: "inline-flex" }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={text}
          style={{ display: "inline-flex", willChange: "transform" }}
        >
          {chars.map((char, i) => (
            <motion.span
              key={i}
              initial={{
                y: 10,
                opacity: 0,
                scale: 0.5,
                filter: "blur(2px)",
              }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                y: -10,
                opacity: 0,
                scale: 0.5,
                filter: "blur(2px)",
              }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 16,
                mass: 1.2,
                delay: i * delayStep,
              }}
              style={{
                display: "inline-block",
                whiteSpace: char === " " ? "pre" : undefined,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
