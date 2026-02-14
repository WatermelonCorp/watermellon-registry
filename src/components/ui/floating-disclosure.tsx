"use client";

import { useState, type FC } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { FaBell, FaTasks } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import { BsCheckLg, BsFillPeopleFill, BsPinFill } from "react-icons/bs";
import { RiBubbleChartFill } from "react-icons/ri";
import { PiFunnelSimpleBold } from "react-icons/pi";
import type { IconType } from "react-icons";

/* ---------- Types ---------- */
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

/* ---------- Constants ---------- */
const SPRING = {
    type: "spring",
    stiffness: 420,
    damping: 32,
    mass: 0.9,
} as const;

const DEFAULT_ITEMS: FilterItem[] = [
    { id: "tasks", label: "Tasks", icon: FaTasks },
    { id: "events", label: "Events", icon: IoCalendar },
    { id: "reminders", label: "Reminders", icon: FaBell },
    { id: "appointments", label: "Appointment", icon: BsPinFill },
    { id: "meetings", label: "Mettings", icon: BsFillPeopleFill },
    { id: "celebrations", label: "Celebrations", icon: RiBubbleChartFill },
];

const panelVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.97,
        y: 8,
        filter: "blur(4px)",
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 26,
            mass: 0.9,
            staggerChildren: 0.04,
            delayChildren: 0.05,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.97,
        y: 6,
        filter: "blur(4px)",
        transition: {
            duration: 0.18,
            ease: "easeInOut",
        },
    },
};

/* ---------- Component ---------- */
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
        <div className="relative w-[300px] h-[70px] flex items-center justify-center">
            {/* Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{ transformOrigin: "50% 100%" }}
                        className="
              absolute w-[300px] rounded-2xl
              border-[1.6px] border-[#E5E5E9] dark:border-zinc-800
              bg-[#FEFEFE] dark:bg-zinc-900
              shadow-[0_12px_40px_rgba(0,0,0,0.08)]
              dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]
              p-[8px] z-20 flex flex-col gap-[4px]
            "
                    >
                        {items.map((item) => {
                            const Icon = item.icon;
                            const selected = active === item.id;

                            return (
                                <motion.button
                                    key={item.id}
                                    onClick={() => handleSelect(item.id)}
                                    whileTap={{ scale: 0.98 }}
                                    className="
                    w-full flex items-center justify-between
                    px-[12px] py-[10px] rounded-[16px]
                    hover:bg-[#F6F5FA] dark:hover:bg-zinc-800/60
                    transition-colors
                  "
                                >
                                    <div className="flex items-center gap-[28px]">
                                        <Icon className="w-[24px] h-[24px] text-[#AFAEB9] dark:text-zinc-500" />
                                        <span className="font-bold tracking-tight text-[#535257] dark:text-zinc-200 text-[18px]">
                                            {item.label}
                                        </span>
                                    </div>

                                    <motion.div
                                        animate={{
                                            backgroundColor: selected ? "#31C051" : "rgba(0,0,0,0)",
                                        }}
                                        transition={SPRING}
                                        className={`
                      w-[26px] h-[26px] rounded-full
                      border-[3px] flex items-center justify-center shrink-0
                      ${selected ? "border-[#31C051]" : "border-[#ADADB2] dark:border-zinc-700"}
                    `}
                                    >
                                        <motion.div
                                            animate={{
                                                scale: selected ? 1 : 0,
                                                opacity: selected ? 1 : 0,
                                            }}
                                            transition={{ type: "spring", stiffness: 520, damping: 30 }}
                                        >
                                            <BsCheckLg className="w-[16px] h-[16px] text-white" />
                                        </motion.div>
                                    </motion.div>
                                </motion.button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger */}
            <AnimatePresence>
                {!open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={SPRING}
                        className="flex items-center"
                    >
                        <motion.button
                            onClick={() => setOpen(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={SPRING}
                            className="
                w-[60px] h-[60px] rounded-full
                border-[1.6px] border-[#E5E5E9] dark:border-zinc-800
                bg-[#FEFEFE] dark:bg-zinc-900
                z-30 shadow-xs flex items-center justify-center
              "
                        >
                            <PiFunnelSimpleBold className="w-[30px] h-[30px] text-[#272729] dark:text-zinc-100" />
                        </motion.button>

                        <div
                            className="
                -ml-[12px] w-[60px] h-[60px] rounded-full
                border-[1.6px] border-[#E5E5E9] dark:border-zinc-800
                bg-[#FEFEFE] dark:bg-zinc-900
                z-10 shadow-xs flex items-center justify-center opacity-80
              "
                        >
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key={active}
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.6 }}
                                    transition={SPRING}
                                >
                                    <ActiveIcon className="w-[24px] h-[24px] text-[#AFAEB9] dark:text-zinc-500" />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
