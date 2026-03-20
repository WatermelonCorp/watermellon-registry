"use client";

import { useState, type FC } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { FaBell, FaTasks } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import { BsCheckLg, BsFillPeopleFill, BsPinFill } from "react-icons/bs";
import { RiBubbleChartFill } from "react-icons/ri";
import { PiFunnelSimpleBold } from "react-icons/pi";
import type { IconType } from "react-icons";

export interface FilterItem {
  id: string;
  label: string;
  icon: IconType;
}

interface FilterDisclosureProps {
  items?: FilterItem[];
  defaultActiveId?: string;
  onChange?: (id: string) => void;
}

const SPRING = {
  type: "spring",
  stiffness: 240,
  damping: 20,
  mass: 1,
} as const;

const DEFAULT_ITEMS: FilterItem[] = [
  { id: "tasks", label: "Tasks", icon: FaTasks },
  { id: "events", label: "Events", icon: IoCalendar },
  { id: "reminders", label: "Reminders", icon: FaBell },
  { id: "appointments", label: "Appointment", icon: BsPinFill },
  { id: "meetings", label: "Mettings", icon: BsFillPeopleFill },
  { id: "celebrations", label: "Celebrations", icon: RiBubbleChartFill },
];

export const FilterDisclosure: FC<FilterDisclosureProps> = ({
  items = DEFAULT_ITEMS,
  defaultActiveId = "reminders",
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(defaultActiveId);

  const activeItem = items.find((i) => i.id === active);
  const ActiveIcon = activeItem ? activeItem.icon : FaTasks;

  const handleSelect = (id: string) => {
    setActive(id);
    onChange?.(id);
    setTimeout(() => setOpen(false), 220);
  };

  return (
    <div className="theme-injected flex h-[500px] w-[300px] items-center justify-center">
      <MotionConfig
        transition={{
          type: "spring",
          bounce: 0.25,
          duration: 0.7,
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {open ? (
            <motion.div
              key="open"
              layoutId="filter-disclosure"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0 },
              }}
              style={{ transformOrigin: "50% 100%" }}
              className="border-border bg-popover absolute z-20 flex w-[300px] flex-col gap-[4px] overflow-hidden  border-[1.6px] p-[8px] shadow-xl will-change-transform rounded-lg"
            >
              {items.map((item, index) => {
                const Icon = item.icon;
                const selected = active === item.id;

                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, scale: 1.1, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    onClick={() => handleSelect(item.id)}
                    whileTap={{ scale: 0.98 }}
                    transition={{ ...SPRING, delay: (3 + index) * 0.05 }}
                    className="hover:bg-accent flex w-full cursor-pointer items-center justify-between rounded-lg px-[12px] py-[10px] transition-colors"
                  >
                    <div className="flex items-center gap-[28px]">
                      <Icon className="text-muted-foreground h-[24px] w-[24px]" />
                      <span className="text-foreground text-[18px] font-bold tracking-tight">
                        {item.label}
                      </span>
                    </div>

                    <motion.div
                      className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-lg border-[3px] ${
                        selected ? "border-primary bg-primary" : "border-border"
                      }`}
                    >
                      <motion.div
                        animate={{
                          scale: selected ? 1 : 0,
                          opacity: selected ? 1 : 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 520,
                          damping: 30,
                        }}
                      >
                        <BsCheckLg className="text-primary-foreground h-[16px] w-[16px]" />
                      </motion.div>
                    </motion.div>
                  </motion.button>
                );
              })}
            </motion.div>
          ) : (
            <div key="close" className="flex items-center">
              <motion.button
                layoutId="filter-disclosure"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0 },
                }}
                onClick={() => setOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-border bg-background z-30 flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-lg border-[1.6px] shadow-sm will-change-transform"
              >
                <PiFunnelSimpleBold className="text-foreground h-[30px] w-[30px]" />
              </motion.button>

              <motion.div
                initial={{ x: -30 }}
                animate={{ x: 0 }}
                transition={{
                  type: "spring",
                  bounce: 0,
                  duration: 1.2,
                }}
                className="border-border bg-background z-10 -ml-[12px] flex h-[60px] w-[60px] items-center justify-center rounded-lg border-[1.6px] opacity-80 shadow-sm"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                  >
                    <ActiveIcon className="text-muted-foreground h-[24px] w-[24px]" />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
};
