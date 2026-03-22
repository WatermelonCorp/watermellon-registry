"use client";

import { useState, useRef, useEffect, type FC } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { ChevronDown, Globe } from "lucide-react";
import { TbLockFilled } from "react-icons/tb";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

export interface Option {
  id: string;
  label: string;
  icon: IconType;
}

interface OptionPickerProps {
  options?: Option[];
}

const DEFAULT_OPTIONS: Option[] = [
  { id: "private", label: "Private", icon: TbLockFilled },
  { id: "public", label: "Public", icon: Globe },
];

export const OptionPicker: FC<OptionPickerProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Option>(
    options?.[0] || DEFAULT_OPTIONS[0]
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const handleSelect = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
  };

  const data = options || DEFAULT_OPTIONS;

  return (
    <div
      className="theme-injected relative inline-block perspective-[1200px] mt-10 transform-3d"
      ref={containerRef}
    >
      <MotionConfig
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
                filter: "blur(4px)",
                scale: 1.1,
                rotateX: -70,
              }}
              animate={{
                opacity: 1,
                y: -5,
                filter: "blur(0px)",
                scale: 1,
                rotateX: 0,
              }}
              exit={{
                opacity: 0,
                y: 10,
                filter: "blur(4px)",
                scale: 1.1,
                rotateX: -70,
              }}
              className="absolute bottom-full left-1/2 z-50 mb-2 origin-bottom -translate-x-1/2 transform-3d"
              role="menu"
              aria-label="Visibility options"
            >
              <div className="relative flex min-w-max gap-2 rounded-lg border border-border bg-muted p-1.5 py-1 whitespace-nowrap">
                {data.map((option, index) => {
                  const isActive = selected.id === option.id;
                  const isFirst = index === 0;
                  const isLast = index === data.length - 1;

                  const roundedClasses = `
                    ${isFirst ? "rounded-l-lg rounded-r-lg" : ""}
                    ${isLast ? "rounded-r-lg rounded-l-lg" : ""}
                    ${!isFirst && !isLast ? "rounded-none" : ""}
                  `;

                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => handleSelect(option)}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ y: -1 }}
                      title={`Set as ${option.label}`}
                      aria-label={`Select ${option.label}`}
                      className={`relative flex items-center gap-2 px-5 py-3 text-[15px] font-semibold transition-all duration-300 ${roundedClasses} bg-background ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      <motion.span>
                        <option.icon size={22} />
                      </motion.span>
                      <span className="text-bold relative z-10 text-lg">
                        {option.label}
                      </span>
                    </motion.button>
                  );
                })}

                <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-r border-b border-border bg-muted" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          layout="size"
          onClick={toggleOpen}
          whileTap={{ scale: 0.97 }}
          title="Change Visibility"
          aria-label={`Visibility is currently ${selected.label}. Click to change.`}
          aria-expanded={isOpen}
          className={`flex items-center justify-center gap-2 rounded-lg border border-transparent px-4 py-4 transition-all duration-300 select-none ${
            isOpen ? "bg-muted/50 border-border" : "bg-muted"
          }`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
              className="flex items-center gap-2"
            >
              <selected.icon
                size={24}
                className={`transition-colors duration-300 ${
                  isOpen ? "text-muted-foreground" : "text-muted-foreground"
                }`}
              />
            </motion.div>
          </AnimatePresence>

          <AnimatedText
            value={selected.label}
            className="text-lg font-semibold text-foreground"
          />

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="flex items-center"
          >
            <ChevronDown
              size={24}
              className="text-muted-foreground"
              strokeWidth={2.5}
            />
          </motion.div>
        </motion.button>
      </MotionConfig>
    </div>
  );
};

const AnimatedText = ({
  value,
  className,
}: {
  value: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex text-lg tracking-tight will-change-transform",
        className
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {value.split("").map((char, index) => {
          const displayChar = char === " " ? "\u00A0" : char;

          return (
            <motion.span
              key={char + index}
              layout
              initial={{ opacity: 0, y: 5, scale: 0.7 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.03 * index,
                },
              }}
              exit={{ opacity: 0, y: -5, scale: 0.7 }}
            >
              {displayChar}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
