"use client";

import React, { useState, useEffect,type FC } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sun, Moon } from "lucide-react";
import {
    AddSquareIcon,
    MessageNotification01Icon,
    NoteIcon,
    Search01Icon,
    Settings01Icon,
} from "@hugeicons/core-free-icons";

/* --- Types --- */
export interface DockItem {
    id: number;
    Icon: React.ReactNode;
}

interface DockProps {
    items?: DockItem[];
}

/* --- Default Items --- */
const DEFAULT_DOCK_ITEMS: DockItem[] = [
    { id: 1, Icon: <HugeiconsIcon icon={Search01Icon} size={26} /> },
    { id: 2, Icon: <HugeiconsIcon icon={NoteIcon} size={26} /> },
    { id: 3, Icon: <HugeiconsIcon icon={AddSquareIcon} size={26} /> },
    { id: 4, Icon: <HugeiconsIcon icon={MessageNotification01Icon} size={26} /> },
    { id: 5, Icon: <HugeiconsIcon icon={Settings01Icon} size={26} /> },
];

/* --- Constants --- */
const dockSpring: Transition = {
    stiffness: 300,
    damping: 22,
    mass: 0.7,
};

const popSpring: Transition = {
    type: "spring",
    stiffness: 420,
    damping: 18,
    mass: 0.6,
};

/* --- Component --- */
export const Dock: FC<DockProps> = ({ items }) => {
    const dockItems = items ?? DEFAULT_DOCK_ITEMS;

    const [hovered, setHovered] = useState<number | null>(null);
    const [isDark, setIsDark] = useState<boolean>(false);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950 transition-colors duration-500">

            {/* Theme Toggle */}
            <button
                onClick={() => setIsDark(!isDark)}
                className="mb-12 p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all active:scale-90"
            >
                {isDark ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-zinc-500" size={20} />}
            </button>

            {/* Dock Container */}
            <motion.div
                layout
                transition={dockSpring}
                className="relative flex items-end gap-3.5 rounded-3xl bg-white dark:bg-zinc-900 px-3 py-2 shadow-sm border-[1.5px] border-[#E5E5E9] dark:border-zinc-800"
            >
                {dockItems.map((item, index) => {
                    const isActive = hovered === item.id;
                    const hoveredIndex = dockItems.findIndex(i => i.id === hovered);
                    const distance = hovered !== null ? Math.abs(index - hoveredIndex) : 99;

                    return (
                        <motion.div
                            key={item.id}
                            layout
                            transition={dockSpring}
                            onMouseEnter={() => setHovered(item.id)}
                            onMouseLeave={() => setHovered(null)}
                            className="relative flex flex-col items-center"
                        >
                            {/* ICON */}
                            <motion.div
                                animate={{
                                    y: isActive ? -18 : 0,
                                    scale:
                                        distance === 0
                                            ? 1.25
                                            : distance === 1
                                                ? 1.1
                                                : 1,
                                }}
                                transition={popSpring}
                                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4F4FB] dark:bg-zinc-800 hover:bg-[#F1F0F7] dark:hover:bg-zinc-700 transition-colors"
                            >
                                {/* Apply color dynamically */}
                                {React.isValidElement(item.Icon)
                                    ? React.cloneElement(item.Icon as React.ReactElement<any>, {
                                        color: isActive
                                            ? isDark ? "#FFFFFF" : "#3D3D44"
                                            : isDark ? "#52525B" : "#7c7b82",
                                    })
                                    : item.Icon}
                            </motion.div>
                            {/* DOT INDICATOR */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.span
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 6 }}
                                        exit={{ opacity: 0, y: -4 }}
                                        transition={dockSpring}
                                        className="absolute bottom-1 h-1 w-1 rounded-full bg-[#E2E2E6] dark:bg-zinc-600"
                                    />
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}
