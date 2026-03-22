"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { PlusIcon } from "lucide-react";
import { BsFileTextFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa6";
import { TbFileFilled } from "react-icons/tb";
import { IoIosFolder } from "react-icons/io";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";
import type { IconType } from "react-icons";

interface TooltipItem {
  title: string;
  description: string;
  icon: IconType;
}
interface FloatingDisclosureProps {
  items: TooltipItem[];
}

export const items = [
  {
    title: "Task",
    description: "Create a new task",
    icon: BsFileTextFill,
  },
  {
    title: "Reminder",
    description: "Create reminders",
    icon: FaBell,
  },
  {
    title: "Note",
    description: "Capture ideas",
    icon: TbFileFilled,
  },
  {
    title: "Project",
    description: "Organise projects",
    icon: IoIosFolder,
  },
];

export const FloatingDisclosure = ({ items }: FloatingDisclosureProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, bounds] = useMeasure({ offsetSize: true });

  useEffect(() => {
    console.log(bounds);
  }, [isOpen, bounds]);

  return (
    <MotionConfig
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 26,
      }}
    >
      <div className="h-[500px] flex items-center justify-center">
        <motion.div
          className={cn(
            "theme-injected bg-background border-border flex items-center justify-center overflow-hidden rounded-lg border shadow-[0_0_0_1px_hsl(var(--border)/0.2),0_1px_2px_-1px_hsl(var(--foreground)/0.05),0_2px_4px_0_hsl(var(--foreground)/0.05)] transition-colors duration-400 ease-out"
          )}
          animate={{
            width: bounds.width > 0 ? bounds.width : "auto",
            height: bounds.height > 0 ? bounds.height : "auto",
          }}
        >
          <AnimatePresence mode="popLayout">
            {isOpen && (
              <motion.div
                className="border-border bg-popover absolute z-10 flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-1.5"
                initial={{
                  opacity: 0,
                  filter: "blur(8px)",
                  y: 0,
                  top: "50%",
                  left: "50%",
                  x: "-50%",
                }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                  y: -170,
                  top: "50%",
                  left: "50%",
                  x: "-50%",
                  pointerEvents: "auto",
                }}
                exit={{
                  opacity: 0,
                  filter: "blur(8px)",
                  y: 0,
                }}
                transition={{
                  type: "spring",
                  delay: 0.05,
                  duration: 0.6,
                  bounce: 0.3,
                }}
                onClick={() => setIsOpen(false)}
              >
                <PlusIcon
                  className={cn(
                    "text-muted-foreground rotate-0 transition-transform duration-300 ease-in-out",
                    isOpen && "rotate-45"
                  )}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={ref} className={cn("p-2")}>
            <AnimatePresence mode="popLayout" initial={false}>
              {!isOpen ? (
                <motion.div
                  key="close"
                  className="shrink-0 cursor-pointer px-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <PlusIcon className="text-muted-foreground h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div key="open" className="flex shrink-0 flex-col gap-3">
                  {items.map((item) => (
                    <motion.div
                      key={item.title}
                      className="hover:bg-accent flex flex-1 shrink-0 cursor-pointer items-center gap-2 rounded-lg p-1"
                      initial={{
                        opacity: 0,
                        filter: "blur(4px)",
                        y: 20,
                        scale: 1,
                      }}
                      animate={{
                        opacity: 1,
                        filter: "blur(0px)",
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        filter: "blur(4px)",
                        transition: { duration: 0.2, ease: "easeOut" },
                      }}
                      transition={{
                        delay: 0.15,
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                    >
                      <div className="bg-muted shrink-0 rounded-lg p-2">
                        <item.icon className="text-muted-foreground h-5 w-5" />
                      </div>

                      <div className="flex w-52 flex-col leading-none text-nowrap">
                        <p className="text-foreground font-semibold">
                          {item.title}
                        </p>
                        <span className="text-muted-foreground text-sm">
                          {item.description}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
};
