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
      <motion.div
        className={cn(
          "flex items-center justify-center overflow-hidden rounded-3xl bg-[rgb(241,236,231)] shadow-[0_0_0_1px_rgba(0,0,0,0.01),0_1px_2px_-1px_rgba(0,0,0,0.01),0_2px_4px_0_rgba(0,0,0,0.01)] transition-colors duration-400 ease-out dark:bg-neutral-700",
          {
            "border border-black/5 bg-neutral-50 dark:border-white/5 dark:bg-neutral-900":
              isOpen,
          }
        )}
        animate={{
          width: bounds.width > 0 ? bounds.width : "auto",
          height: bounds.height > 0 ? bounds.height : "auto",
        }}
      >
        <AnimatePresence mode="popLayout">
          {isOpen && (
            <motion.div
              className="absolute z-10 flex cursor-pointer items-center gap-2 rounded-2xl border bg-[#F1ECE7] px-4 py-1.5 dark:border-white/5 dark:bg-neutral-900"
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
                  "rotate-0 text-neutral-500 transition-transform duration-300 ease-in-out",
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
                <PlusIcon className="h-6 w-6 text-neutral-500 dark:text-neutral-100" />
              </motion.div>
            ) : (
              <motion.div key="open" className="flex shrink-0 flex-col gap-3">
                {items.map((item) => (
                  <motion.div
                    key={item.title}
                    className="flex flex-1 shrink-0 cursor-pointer items-center gap-2 rounded-xl p-1 hover:bg-[#f9f6f4] dark:hover:bg-white/5"
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
                    <div className="shrink-0 rounded-lg bg-[#F1ECE7] p-2 dark:bg-neutral-700">
                      <item.icon className="h-5 w-5 text-neutral-500 dark:text-neutral-100" />
                    </div>

                    <div className="flex w-52 flex-col leading-none text-nowrap">
                      <p className="font-semibold text-zinc-700 dark:text-neutral-100">
                        {item.title}
                      </p>
                      <span className="text-sm text-zinc-500 dark:text-neutral-400">
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
    </MotionConfig>
  );
};
