"use client";

import { useState, type FC } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

/* ---------- TYPES ---------- */

export interface InlineOverflowAction {
    label: string;
}

export interface InlineOverflowProps {
    visibleActions: InlineOverflowAction[];
    hiddenActions: InlineOverflowAction[];
    showThemeToggle?: boolean;
}

/* ---------- SUB COMPONENT ---------- */

const Action: FC<{ label: string }> = ({ label }) => {
    return (
        <motion.button
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="h-9 px-3.5 text-sm font-bold text-black transition-colors bg-white border rounded-full sm:h-12 sm:px-6 dark:bg-zinc-800 sm:text-base border-black/5 dark:border-zinc-700 dark:text-zinc-100 whitespace-nowrap shrink-0"
        >
            {label}
        </motion.button>
    );
};

/* ---------- MAIN COMPONENT ---------- */

export const InlineOverflow: FC<InlineOverflowProps> = ({
    visibleActions,
    hiddenActions,
}) => {
    const [open, setOpen] = useState(false);

    return (
        <LayoutGroup>
            <motion.div
                layout
                className="flex items-center gap-1.5 sm:gap-2 rounded-full
                     bg-[#F6F5EE] dark:bg-zinc-900 px-1.5 py-1.5 sm:px-2 sm:py-2
                     border border-black/5 dark:border-zinc-800 shadow-sm
                     max-w-[calc(100vw-1.5rem)] overflow-x-auto no-scrollbar"
                transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.7 }}
            >
                {/* VISIBLE ACTIONS */}
                {visibleActions.map((action, i) => (
                    <Action key={i} label={action.label} />
                ))}

                {/* HIDDEN ACTIONS */}
                <AnimatePresence mode="popLayout">
                    {open &&
                        hiddenActions.map((action) => (
                            <motion.div
                                layout
                                key={action.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <Action label={action.label} />
                            </motion.div>
                        ))}
                </AnimatePresence>

                {/* TOGGLE BUTTON */}
                <motion.button
                    layout
                    onClick={() => setOpen(!open)}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center w-9 h-9 bg-white border rounded-full sm:h-12 sm:w-12 dark:bg-zinc-800 text-neutral-600 dark:text-zinc-400 border-black/5 dark:border-zinc-700 hover:opacity-70 shrink-0"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        {open ? (
                            <motion.div
                                key="close"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            >
                                <IoClose className="size-5 sm:size-6" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="dots"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                className="font-mono text-base tracking-wider"
                            >
                                <HiOutlineDotsHorizontal className="size-5 sm:size-7" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </motion.div>
        </LayoutGroup>
    );
};