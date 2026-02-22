"use client";

import { cn } from "@/lib/utils";
import { Undo2 } from "lucide-react";
import { useEffect, useState, type FC, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Variants,
} from "framer-motion";
import useMeasure from "react-use-measure";

export interface TimedUndoActionProps {
  initialSeconds?: number;
  deleteLabel?: string;
  undoLabel?: string;
  icon?: ReactNode;
}

export const TimedUndoAction: FC<TimedUndoActionProps> = ({
  initialSeconds = 10,
  deleteLabel = "Delete Account",
  undoLabel = "Cancel Delete",
  icon,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [countDown, setCountDown] = useState(initialSeconds);
  const [ref, bounds] = useMeasure({ offsetSize: true });

  const handleDelete = () => {
    setIsDeleting((prev) => {
      const next = !prev;

      if (next) {
        setCountDown(initialSeconds);
      }

      return next;
    });
  };

  useEffect(() => {
    if (!isDeleting) return;

    const interval = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 1) {
          setIsDeleting(false);
          return initialSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isDeleting, initialSeconds]);

  return (
    <div className="font-sans flex  w-full items-center justify-center">
      <div className="flex  flex-col items-center justify-center will-change-transform">
        <MotionConfig
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 22,
          }}
        >
          <motion.div
            className={cn(
              "flex cursor-pointer items-center justify-start overflow-hidden rounded-full transition-colors duration-700 ease-out"
            )}
            animate={{
              width: bounds.width,
              backgroundColor: isDeleting ? "#FDEFF1" : "#FD2420",
            }}
            onClick={handleDelete}
          >
            <div
              className="flex items-center justify-center gap-2 px-3 py-1"
              ref={ref}
            >
              {/* ICON */}
              <AnimatePresence mode="popLayout">
                {isDeleting && (
                  <motion.div
                    className="rounded-full bg-red-500 p-2"
                    initial={{
                      opacity: 0,
                      filter: "blur(2px)",
                    }}
                    animate={{
                      opacity: 1,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      filter: "blur(2px)",
                    }}
                  >
                    {icon ?? <Undo2 className="size-3 text-white" />}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-center gap-2">
                <TextAnimated
                  isDeleting={isDeleting}
                  deleteLabel={deleteLabel}
                  undoLabel={undoLabel}
                />
              </div>

              <AnimatePresence mode="popLayout">
                {isDeleting && (
                  <motion.div
                    className="flex h-6 w-8 items-center justify-center rounded-xl bg-red-500 text-zinc-50"
                    initial={{
                      opacity: 0,
                      filter: "blur(2px)",
                    }}
                    animate={{
                      opacity: 1,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      filter: "blur(2px)",
                    }}
                  >
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={countDown}
                        className="text-[12px]"
                        initial={{
                          opacity: 0,
                          y: -10,
                          filter: "blur(2px)",
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                        }}
                        exit={{
                          opacity: 0,
                          y: 10,
                          filter: "blur(2px)",
                        }}
                      >
                        {countDown}
                      </motion.span>
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </MotionConfig>
      </div>
    </div>
  );
};

interface TextAnimatedProps {
  isDeleting: boolean;
  deleteLabel: string;
  undoLabel: string;
}

export const TextAnimated: FC<TextAnimatedProps> = ({
  isDeleting,
  deleteLabel,
  undoLabel,
}) => {
  const word = isDeleting ? undoLabel : deleteLabel;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.02,
        staggerDirection: 1,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.8,
      filter: "blur(2px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.8,
      filter: "blur(2px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.1,
      },
    },
  };

  return (
    <div className="relative flex h-10 items-center justify-center overflow-hidden will-change-transform">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={word}
          variants={containerVariants}
          initial={false}
          animate="visible"
          exit="exit"
          className="flex"
        >
          {word.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className={cn(
                "text-lg font-medium",
                isDeleting ? "text-red-400" : "text-zinc-50"
              )}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TimedUndoAction;
