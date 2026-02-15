"use client";

import { useState, type ReactNode, type FC } from "react";
import { motion } from "framer-motion";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { FaInbox, FaLandmark } from "react-icons/fa";

// --- Types ---
export interface TabItem {
    id: string;
    label: string;
    icon: ReactNode;
}

interface FluidTabsProps {
    tabs?: TabItem[];
    defaultActive?: string;
    onChange?: (id: string) => void;
}

// --- Default Tabs  ---
const DEFAULT_TABS: TabItem[] = [
    { id: "accounts", label: "Accounts", icon: <FaLandmark size={22} /> },
    { id: "deposits", label: "Deposits", icon: <FaInbox size={22} /> },
    { id: "funds", label: "Funds", icon: <BiSolidPieChartAlt2 size={22} /> },
];

export const FluidTabs: FC<FluidTabsProps> = ({
    tabs = DEFAULT_TABS,
    defaultActive = tabs[0]?.id,
    onChange,
}) => {
    const [active, setActive] = useState<string>(defaultActive);

    const handleChange = (id: string) => {
        setActive(id);
        onChange?.(id);
    };

    return (
        <div className="relative flex items-center gap-1 sm:gap-2 px-1 py-1 bg-[#F5F1EB] dark:bg-zinc-900 border-[1.6px] border-[#f5f1ebf4] dark:border-zinc-800 rounded-full transition-colors">
            {tabs.map((tab) => {
                const isActive = active === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => handleChange(tab.id)}
                        className="relative px-3 py-2.5 sm:px-4 sm:py-3.5 rounded-full group outline-none"
                    >
                        {/* Active floating pill */}
                        {isActive && (
                            <motion.div
                                layoutId="active-pill"
                                transition={{
                                    type: "spring",
                                    stiffness: 280,
                                    damping: 25,
                                    mass: 0.8,
                                }}
                                className="absolute inset-0 rounded-full shadow-xs border 
                    bg-gradient-to-b from-[#fefefe] to-gray-50/80 
                    dark:from-zinc-700 dark:to-zinc-800/90
                    border-[#fefefe]/90 dark:border-zinc-600/50"
                            />
                        )}

                        {/* Content */}
                        <motion.div
                            layout="position"
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                                mass: 0.5,
                            }}
                            className={`relative z-10 flex items-center gap-1.5 sm:gap-3 transition-colors duration-200
                  ${isActive
                                    ? "text-[#292926] dark:text-white font-bold"
                                    : "text-[#585652] dark:text-zinc-500 font-semibold group-hover:dark:text-zinc-300"
                                }`}
                        >
                            {/* Icon */}
                            <motion.div
                                animate={{ scale: isActive ? 1.03 : 1 }}
                                transition={{
                                    scale: { type: "spring", stiffness: 300, damping: 15 },
                                }}
                                className="flex items-center justify-center shrink-0"
                            >
                                {tab.icon}
                            </motion.div>

                            {/* Text */}
                            <span className="text-sm sm:text-base tracking-tight whitespace-nowrap">{tab.label}</span>
                        </motion.div>
                    </button>
                );
            })}
        </div>
    );
};