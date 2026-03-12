"use client";

import { cn } from "@/lib/utils";
import { Undo2 } from "lucide-react";
import { useEffect, useState, type FC, type ReactNode } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
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
        if (prev < 1) {
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
    <div className="flex w-full items-center justify-center font-sans">
      <div className="flex flex-col items-center justify-center will-change-transform">
        <MotionConfig
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 22,
          }}
        >
          <motion.div
            className={cn(
              "relative flex cursor-pointer items-center justify-start overflow-hidden rounded-full bg-red-500 transition-colors duration-300 dark:bg-red-500",
              isDeleting && "bg-red-500/10 dark:bg-red-500/20"
            )}
            animate={{
              width: bounds.width > 0 ? bounds.width : "auto",
            }}
            onClick={handleDelete}
          >
            <div
              className={cn(
                "flex items-center justify-center gap-2 px-6 py-3",
                isDeleting && "px-3"
              )}
              ref={ref}
            >
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
                    {icon ?? <Undo2 className="size-5 text-white" />}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-center gap-2">
                <AnimatedText
                  text={isDeleting ? undoLabel : deleteLabel}
                  className={cn(
                    "z-10 text-lg",
                    isDeleting ? "text-red-400" : "text-neutral-50"
                  )}
                />
              </div>

              <AnimatePresence mode="popLayout">
                {isDeleting && (
                  <motion.div
                    className="flex items-center justify-center rounded-full bg-red-500 px-3 py-1 text-neutral-50 tabular-nums"
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
                        className="text-lg"
                        initial={{
                          opacity: 0,
                          y: -20,
                          filter: "blur(2px)",
                          scale: 0.5,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          y: 20,
                          filter: "blur(2px)",
                          scale: 0.5,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 240,
                          damping: 20,
                          mass: 1,
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
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          style={{ display: "inline-flex ", willChange: "transform" }}
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

export default TimedUndoAction;
