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

  useEffect(() => {
    setHours(initialHours);
    setMinutes(initialMinutes);
    setTempHours(String(initialHours));
    setTempMinutes(String(initialMinutes));
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
        className={cn("flex items-center font-mono ", isExpanded && "gap-4")}
      >
        <motion.div
          layout
          animate={{
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            borderTopRightRadius: isExpanded ? 8 : 0,
            borderBottomRightRadius: isExpanded ? 8 : 0,
          }}
          className={cn(
            "flex cursor-pointer items-center justify-end gap-1 bg-zinc-100 px-1 pl-2 dark:bg-zinc-800",
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
            className="h-10 w-[2ch] bg-transparent text-center font-mono text-xl font-semibold text-neutral-900 dark:text-zinc-200 outline-none"
          />

          <motion.span
            layout
            className="text-lg font-medium text-zinc-500 dark:text-zinc-400"
          >
            Hr.
          </motion.span>
        </motion.div>

        <motion.div
          layout
          animate={{
            borderTopLeftRadius: isExpanded ? 8 : 0,
            borderBottomLeftRadius: isExpanded ? 8 : 0,
            borderTopRightRadius: isExpanded ? 8 : 0,
            borderBottomRightRadius: isExpanded ? 8 : 0,
          }}
          className={cn(
            "flex cursor-pointer items-center justify-end gap-1 bg-zinc-100 px-1 dark:bg-zinc-800 will-change-transform",
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
            className="h-10 w-[2ch] bg-transparent text-center font-mono text-xl font-semibold text-zinc-900 dark:text-zinc-200 outline-none"
          />

          <motion.span
            layout
            className="text-lg font-medium text-zinc-500 dark:text-zinc-400"
          >
            Min.
          </motion.span>
        </motion.div>

        <motion.div
          layout
          animate={{
            borderTopLeftRadius: isExpanded ? 8 : 0,
            borderBottomLeftRadius: isExpanded ? 8 : 0,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          }}
          className="flex h-10 w-10 items-center justify-center bg-zinc-100 dark:bg-zinc-800 will-change-transform"
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
                  <Check className="size-5 text-zinc-500" />
                ) : (
                  <Pencil className="size-5 text-zinc-500 " />
                )}
              </motion.div>
            </AnimatePresence>
          </button>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};
