"use client";

import { motion, AnimatePresence } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { MessageCircle, Inbox, Circle, CommandIcon } from "lucide-react";

const DEFAULT_ITEMS: TooltipItem[] = [
  {
    icon: <MessageCircle className="h-full w-full" />,
    label: "Comment",
    labelHasKeyword: ["C"],
    hasBadge: false,
  },
  {
    icon: <Inbox className="h-full w-full" />,
    label: "Inbox",
    labelHasKeyword: ["I"],
    hasBadge: true,
  },
  {
    icon: <Circle className="h-full w-full" />,
    label: "Record",
    labelHasKeyword: ["R"],
    hasBadge: false,
  },
];

export type TooltipItem = {
  icon: ReactNode;
  label: string;
  labelHasKeyword?: (string | ReactNode)[] | false;
  hasBadge?: boolean;
};

interface TooltipVerticalNavbarProps {
  items: TooltipItem[];
  tooltipDelay?: number;
}

export const TooltipVerticalNavbar = ({
  items = DEFAULT_ITEMS,
  tooltipDelay = 300,
}: TooltipVerticalNavbarProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [coords, setCoords] = useState({ clipPath: "", translateY: 0 });

  const measureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [isEntering, setIsEntering] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const calculatePosition = (index: number) => {
    const activeLabel = measureRefs.current[index];
    const activeIcon = buttonRefs.current[index];

    if (!activeLabel || !activeIcon) return null;

    const labelTop = activeLabel.offsetTop;
    const labelHeight = activeLabel.offsetHeight;
    const labelCenter = labelTop + labelHeight / 2;

    const iconTop = activeIcon.offsetTop;
    const iconHeight = activeIcon.offsetHeight;
    const iconCenter = iconTop + iconHeight / 2;

    const totalHeight = measureRefs.current.reduce(
      (acc, el) => acc + (el?.offsetHeight || 0),
      0
    );

    const cTop = (labelTop / totalHeight) * 100;
    const cBottom = 100 - ((labelTop + labelHeight) / totalHeight) * 100;

    return {
      clipPath: `inset(${cTop}% 0 ${cBottom}% 0 round 8px)`,
      translateY: iconCenter - labelCenter,
    };
  };

  const handleMouseEnter = (index: number) => {
    const newCoords = calculatePosition(index);
    if (!newCoords) return;

    if (activeIndex === null) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsEntering(true);

      timeoutRef.current = setTimeout(() => {
        setCoords(newCoords);
        setActiveIndex(index);
      }, tooltipDelay);
    } else {
      setCoords(newCoords);
      setActiveIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveIndex(null);
    setCoords({ clipPath: "", translateY: 0 });
    setIsEntering(true);
  };

  return (
    <div className="theme-injected flex h-screen items-center px-8">
      <div className="text-foreground relative" onMouseLeave={handleMouseLeave}>
        <AnimatePresence>
          {activeIndex !== null && coords.clipPath !== "" && (
            <motion.div
              className="absolute top-0 left-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="bg-muted text-muted-foreground-foreground rounded-lg"
                animate={{
                  clipPath: coords.clipPath,
                  y: coords.translateY,
                }}
                transition={{
                  type: "spring",
                  bounce: 0,
                  duration: isEntering ? 0 : 0.4,
                }}
                onUpdate={() => {
                  if (isEntering) {
                    setIsEntering(false);
                  }
                }}
              >
                <div className="flex flex-col items-start justify-center">
                  {items.map((item, index) => (
                    <div
                      key={`real-${index}`}
                      className="flex h-10 items-center justify-center gap-2 px-3 text-sm font-medium whitespace-nowrap"
                    >
                      <span className="text-muted-foreground">
                        {item.label}
                      </span>
                      {item.hasBadge && (
                        <div className="text-muted-foreground flex items-center gap-0.5">
                          <span className="border-border flex items-center justify-center rounded-lg border p-1">
                            <CommandIcon className="text-muted-foreground size-3" />
                          </span>
                        </div>
                      )}
                      {item.labelHasKeyword && (
                        <div className="text-muted-foreground flex items-center gap-0.5">
                          {item.labelHasKeyword.map((key, i) => (
                            <span
                              key={i}
                              className="border-border flex items-center justify-center rounded-lg border px-1 tabular-nums"
                            >
                              {key}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-muted z-10 flex flex-col border border-border items-center justify-center rounded-lg p-2 backdrop-blur">
          {items.map((item, index) => (
            <button
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              className="hover:bg-accent flex cursor-pointer items-center justify-center rounded-lg transition-colors"
            >
              <div className="text-muted-foreground flex size-10 items-center justify-center p-1.5">
                {item.icon}
              </div>
              <span className="sr-only">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute top-0 left-0 flex flex-col overflow-hidden whitespace-nowrap opacity-0">
        {items.map((item, index) => (
          <div
            key={`measure-${index}`}
            ref={(el) => {
              measureRefs.current[index] = el;
            }}
            className="flex h-10 items-center justify-center gap-2 px-3 text-sm font-medium whitespace-nowrap"
          >
            <span>{item.label}</span>
            {item.hasBadge && (
              <div className="text-muted-foreground flex items-center gap-0.5">
                <span className="border-border flex items-center justify-center rounded-lg border p-1">
                  <CommandIcon className="text-muted-foreground size-3" />
                </span>
              </div>
            )}
            {item.labelHasKeyword && (
              <div className="text-muted-foreground flex items-center gap-0.5">
                {item.labelHasKeyword.map((key, i) => (
                  <span
                    key={i}
                    className="border-border flex items-center justify-center rounded-lg border px-1 tabular-nums"
                  >
                    {typeof key === "string" ? key : "⌘"}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
