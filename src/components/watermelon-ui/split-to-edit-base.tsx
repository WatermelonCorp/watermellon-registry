"use client";

import React, { useState, useRef, useEffect, type FC } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  type Transition,
} from "motion/react";
import { Check, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

interface SplitToEditProps {
  initialHours?: number;
  initialMinutes?: number;
  onSave?: (hours: number, minutes: number) => void;
}

const layoutConfig: Transition = {
  type: "spring",
  stiffness: 450,
  damping: 25,
  mass: 2,
};

const collapsedConfig: Transition = {
  type: "spring",
  stiffness: 450,
  damping: 25,
  mass: 1,
};

export const SplitToEdit: FC<SplitToEditProps> = ({
  initialHours = 2,
  initialMinutes = 30,
  onSave,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [hours, setHours] = useState<number>(initialHours);
  const [minutes, setMinutes] = useState<number>(initialMinutes);

  const [tempHours, setTempHours] = useState<string>(String(initialHours));
  const [tempMinutes, setTempMinutes] = useState<string>(
    String(initialMinutes)
  );

  const hoursInputRef = useRef<HTMLInputElement>(null);
  const radius = "var(--radius)";

  useEffect(() => {
    requestAnimationFrame(() => {
      setHours(initialHours);
      setMinutes(initialMinutes);
      setTempHours(String(initialHours));
      setTempMinutes(String(initialMinutes));
    });
  }, [initialHours, initialMinutes]);

  useEffect(() => {
    if (isExpanded) {
      const t = setTimeout(() => {
        hoursInputRef.current?.focus();
        hoursInputRef.current?.select();
      }, 50);
      return () => clearTimeout(t);
    }
  }, [isExpanded]);

  const handleEdit = () => {
    setTempHours(String(hours));
    setTempMinutes(String(minutes));
    setIsExpanded(true);
  };

  const handleSave = () => {
    const h = Math.max(0, parseInt(tempHours) || 0);
    const m = Math.min(59, Math.max(0, parseInt(tempMinutes) || 0));

    setHours(h);
    setMinutes(m);

    setTempHours(String(h));
    setTempMinutes(String(m));

    setIsExpanded(false);

    onSave?.(h, m);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") setIsExpanded(false);
  };

  return (
    <MotionConfig transition={isExpanded ? layoutConfig : collapsedConfig}>
      <motion.div
        layout
        className={cn(
          "theme-injected flex items-center font-mono",
          isExpanded && "gap-4"
        )}
      >
        <motion.div
          layout
          animate={{
            borderTopLeftRadius: radius,
            borderBottomLeftRadius: radius,
            borderTopRightRadius: isExpanded ? radius : 0,
            borderBottomRightRadius: isExpanded ? radius : 0,
          }}
          className={cn(
            "bg-muted flex cursor-pointer items-center justify-end gap-1 px-1 pl-2",
            isExpanded && "gap-5 px-3"
          )}
          onClick={!isExpanded ? handleEdit : undefined}
        >
          <motion.input
            ref={hoursInputRef}
            layout
            value={tempHours}
            onChange={(e) =>
              setTempHours(e.target.value.replace(/\D/g, "").slice(0, 2))
            }
            readOnly={!isExpanded}
            onKeyDown={handleKeyPress}
            className="text-foreground h-10 w-[2ch] bg-transparent text-center font-mono text-xl font-semibold outline-none"
          />

          <motion.span
            layout
            className="text-muted-foreground text-lg font-medium"
          >
            Hr.
          </motion.span>
        </motion.div>

        <motion.div
          layout
          animate={{
            borderTopLeftRadius: isExpanded ? radius : 0,
            borderBottomLeftRadius: isExpanded ? radius : 0,
            borderTopRightRadius: isExpanded ? radius : 0,
            borderBottomRightRadius: isExpanded ? radius : 0,
          }}
          className={cn(
            "bg-muted flex cursor-pointer items-center justify-end gap-1 px-1 will-change-transform",
            isExpanded && "gap-5 px-3"
          )}
          onClick={!isExpanded ? handleEdit : undefined}
        >
          <motion.input
            layout
            value={tempMinutes}
            onChange={(e) =>
              setTempMinutes(e.target.value.replace(/\D/g, "").slice(0, 2))
            }
            readOnly={!isExpanded}
            onKeyDown={handleKeyPress}
            className="text-foreground h-10 w-[2ch] bg-transparent text-center font-mono text-xl font-semibold outline-none"
          />

          <motion.span
            layout
            className="text-muted-foreground text-lg font-medium"
          >
            Min.
          </motion.span>
        </motion.div>

        <motion.div
          layout
          animate={{
            borderTopLeftRadius: isExpanded ? radius : 0,
            borderBottomLeftRadius: isExpanded ? radius : 0,
            borderTopRightRadius: radius,
            borderBottomRightRadius: radius,
          }}
          className="bg-muted flex h-10 w-10 items-center justify-center will-change-transform"
        >
          <button
            onClick={isExpanded ? handleSave : handleEdit}
            className="cursor-pointer"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={isExpanded ? "check" : "pen"}
                initial={{
                  opacity: 0,
                  scale: 0.25,
                  filter: "blur(4px)",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  scale: 0.25,
                  filter: "blur(4px)",
                }}
                transition={{
                  type: "spring",
                  visualDuration: 0.25,
                  bounce: 0,
                }}
              >
                {isExpanded ? (
                  <Check className="text-muted-foreground size-5" />
                ) : (
                  <Pencil className="text-muted-foreground size-5" />
                )}
              </motion.div>
            </AnimatePresence>
          </button>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};
