"use client";

import { type FC, useState } from "react";
import {
  motion,
  AnimatePresence,
  type Transition,
  MotionConfig,
  LayoutGroup,
} from "motion/react";
import { Undo2 } from "lucide-react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";
import type { IconType } from "react-icons";

export type FeedbackStatus = "idle" | "up" | "down";

export interface QuickFeedbackProps {
  defaultStatus?: FeedbackStatus;
  showThemeToggle?: boolean;
  feedbackText?: string;
  onFeedback?: (status: "up" | "down") => void;
  onUndo?: () => void;
}

const containerTransition: Transition = {
  type: "spring",
  stiffness: 150,
  damping: 15,
  mass: 1,
};

export const QuickFeedback: FC<QuickFeedbackProps> = ({
  defaultStatus = "idle",
  feedbackText = "Feedback Received!",
  onFeedback,
  onUndo,
}) => {
  const [status, setStatus] = useState<FeedbackStatus>(defaultStatus);

  const handleFeedback = (value: "up" | "down") => {
    setStatus(value);
    onFeedback?.(value);
  };

  const handleUndo = () => {
    setStatus("idle");
    onUndo?.();
  };

  return (
    <div className="theme-injected relative flex w-full items-center justify-center gap-4 bg-transparent px-4 transition-colors duration-500">
      <MotionConfig transition={containerTransition}>
        <LayoutGroup>
          <div className="relative flex items-center justify-center gap-2">
            <AnimatePresence mode="sync" initial={false}>
              {(status === "idle" || status === "up") && (
                <QuickFeedbackButton
                  key="up-btn"
                  name="up"
                  handleFeedback={() => handleFeedback("up")}
                  handleUndo={handleUndo}
                  status={status}
                  feedbackText={feedbackText}
                  Icon={FaThumbsUp}
                />
              )}
              {(status === "idle" || status === "down") && (
                <QuickFeedbackButton
                  key="down-btn"
                  name="down"
                  handleFeedback={() => handleFeedback("down")}
                  handleUndo={handleUndo}
                  status={status}
                  feedbackText="Sorry about that"
                  Icon={FaThumbsDown}
                />
              )}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </MotionConfig>
    </div>
  );
};

interface QuickFeedbackButtonProps {
  name: "up" | "down";
  handleFeedback: () => void;
  handleUndo: () => void;
  status: FeedbackStatus;
  feedbackText: string;
  Icon: IconType;
}

export const QuickFeedbackButton: FC<QuickFeedbackButtonProps> = ({
  name,
  handleFeedback,
  handleUndo,
  status,
  feedbackText,
  Icon,
}) => {
  const [ref, bounds] = useMeasure({ offsetSize: true });
  const isActive = name === status;

  return (
    <motion.div
      layout="position"
      animate={{
        opacity: 1,
        width: bounds.width > 0 ? bounds.width : "auto",
        height: bounds.height > 0 ? bounds.height : "auto",
      }}
      className="bg-card border-border relative overflow-hidden rounded-lg border will-change-transform"
    >
      <motion.div
        ref={ref}
        className={cn(
          "flex w-fit items-center justify-center gap-1 px-12 py-3",
          isActive && "px-4.5 py-3.5"
        )}
      >
        <motion.button
          layout
          onClick={handleFeedback}
          className={cn(
            "ml-1 flex shrink-0 items-center justify-center rounded-lg",
            isActive && "pointer-events-none"
          )}
        >
          <Icon className="text-foreground size-8" />
        </motion.button>

        <AnimatePresence mode="popLayout" initial={false}>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap"
            >
              <span className="text-foreground ml-1 text-sm font-bold tracking-wide sm:ml-2 sm:text-lg">
                {feedbackText}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUndo();
                }}
                className="bg-muted text-foreground hover:bg-muted/80 flex shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold transition active:scale-95 sm:text-base"
              >
                <Undo2 size={16} className="sm:h-5 sm:w-5" strokeWidth={2.5} />
                Undo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
