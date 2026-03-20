"use client";

import { motion, AnimatePresence } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
export type TooltipItem = {
  icon: ReactNode;
  label: string;
  labelHasKeyword?: (string | ReactNode)[] | false;
  hasBadge?: boolean;
};

import {
  MessageCircle,
  Inbox,
  Circle,
  Crosshair,
  Download,
  Menu,
  CommandIcon,
} from "lucide-react";

interface TooltipNavbarProps {
  items: TooltipItem[];
  tooltipDelay?: number;
}

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
  {
    icon: <Crosshair className="h-full w-full" />,
    label: "Focus Mode",
    labelHasKeyword: ["F"],
    hasBadge: false,
  },
  {
    icon: <Download className="h-full w-full" />,
    label: "Share",
    labelHasKeyword: ["S"],
    hasBadge: false,
  },
  {
    icon: <Menu className="h-full w-full" />,
    label: "Menu",
    labelHasKeyword: ["M"],
    hasBadge: false,
  },
];

export const TooltipNavbar = ({
  items = DEFAULT_ITEMS,
  tooltipDelay = 300,
}: TooltipNavbarProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [coords, setCoords] = useState({ clipPath: "", translateX: 0 });

  const measureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [isEntering, setIsEntering] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const calculatePosition = (index: number) => {
    const activeLabel = measureRefs.current[index];
    const activeIcon = buttonRefs.current[index];

    if (!activeLabel || !activeIcon) return null;

    const labelLeft = activeLabel.offsetLeft;
    const labelWidth = activeLabel.offsetWidth;
    const labelCenter = labelLeft + labelWidth / 2;

    const iconLeft = activeIcon.offsetLeft;
    const iconWidth = activeIcon.offsetWidth;
    const iconCenter = iconLeft + iconWidth / 2;

    const totalWidth = measureRefs.current.reduce(
      (acc, el) => acc + (el?.offsetWidth || 0),
      0
    );

    const cLeft = (labelLeft / totalWidth) * 100;
    const cRight = 100 - ((labelLeft + labelWidth) / totalWidth) * 100;

    return {
      clipPath: `inset(0 ${cRight}% 0 ${cLeft}% round 8px)`,
      translateX: iconCenter - labelCenter,
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
    setCoords({ clipPath: "", translateX: 0 });
    setIsEntering(true);
  };

  return (
    <div className="theme-injected">
      <div className="flex items-center justify-center">
        <div
          className="text-foreground relative"
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence>
            {activeIndex !== null && coords.clipPath !== "" && (
              <motion.div
                className="absolute bottom-16 left-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="bg-muted text-muted-foreground flex rounded-lg "
                  animate={{
                    clipPath: coords.clipPath,
                    x: coords.translateX,
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
                  <div className="inline-flex h-8 items-center justify-center">
                    {items.map((item, index) => (
                      <div
                        key={`real-${index}`}
                        className="flex items-center justify-center gap-1 px-2 text-sm font-medium whitespace-nowrap"
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

          <div className="bg-muted border-border z-10 inline-flex items-center justify-center rounded-lg border p-2 backdrop-blur">
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
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 flex h-0 overflow-hidden whitespace-nowrap opacity-0">
        {items.map((item, index) => (
          <div
            key={`measure-${index}`}
            ref={(el) => {
              measureRefs.current[index] = el;
            }}
            className="flex items-center justify-center gap-1 px-2 text-sm font-medium whitespace-nowrap"
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
