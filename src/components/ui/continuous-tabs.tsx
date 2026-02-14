"use client";

import { useState, useEffect, type FC } from "react";
import { motion, LayoutGroup } from "framer-motion";

/* ---------- Types ---------- */
interface TabItem {
    id: string;
    label: string;
}

interface ContinuousTabsProps {
    tabs?: TabItem[];
    defaultActiveId?: string;
    onChange?: (id: string) => void;
}

/* ---------- Defaults ---------- */
const DEFAULT_TABS: TabItem[] = [
    { id: "home", label: "Home" },
    { id: "interactions", label: "Interactions" },
    { id: "resources", label: "Resources" },
    { id: "docs", label: "Docs" },
];

export const ContinuousTabs: FC<ContinuousTabsProps> = ({
    tabs = DEFAULT_TABS,
    defaultActiveId = "home",
    onChange,
}) => {
    const [active, setActive] = useState<string>(defaultActiveId);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleChange = (id: string) => {
        setActive(id);
        onChange?.(id);
    };

    if (!isMounted) return null;

    return (
        <LayoutGroup>
            <nav
                className="
          relative flex items-center gap-0.5 sm:gap-1 p-1 sm:p-1.5
            rounded-full
            border border-[#E5E5E9] dark:border-zinc-800
            bg-linear-to-b from-[#ffffff] to-[#e9e9f2]
            dark:from-zinc-900 dark:to-zinc-950
            shadow-[inset_0_-2px_4px_rgba(0,0,0,0.08),
                    inset_0_1px_0_rgba(255,255,255,0.9),
                    0_4px_12px_rgba(0,0,0,0.03)]
            dark:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.5),
                    inset_0_1px_0_rgba(255,255,255,0.05),
                    0_10px_20px_rgba(0,0,0,0.4)]
            transition-all duration-300
          "
            >
                {tabs.map((tab) => {
                    const isActive = active === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleChange(tab.id)}
                            className="relative px-4 py-2 sm:px-6 sm:py-3 rounded-full outline-none"
                        >
                            {/* Active pill */}
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    transition={{
                                        type: "spring",
                                        stiffness: 380,
                                        damping: 30,
                                        mass: 0.9,
                                    }}
                                    className="
                      absolute inset-0 rounded-full
                      bg-[#252528] dark:bg-zinc-100
                      shadow-xs
                    "
                                />
                            )}

                            {/* Text */}
                            <motion.span
                                layout="position"
                                className={`relative z-10 text-sm sm:text-base font-semibold transition-colors duration-200
                    ${isActive
                                        ? "text-[#EDEDEC] dark:text-zinc-950"
                                        : "text-[#343437] dark:text-zinc-500 hover:text-[#62625D] dark:hover:text-zinc-300"
                                    }
                  `}
                            >
                                {tab.label}
                            </motion.span>
                        </button>
                    );
                })}
            </nav>
        </LayoutGroup>
    );
};