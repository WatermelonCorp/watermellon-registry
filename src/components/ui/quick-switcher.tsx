"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { ArrowRight, ChevronUp, ChevronDown } from "lucide-react";

export type QuickSwitcherMode = "ask" | "generate";

export interface QuickSwitcherProps {
    defaultMode?: QuickSwitcherMode;
    askIcon: React.ReactNode;
    generateIcon: React.ReactNode;
    askLabel?: string;
    generateLabel?: string;
    onActionClick?: (mode: QuickSwitcherMode) => void;
}

const transition: Transition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 0.8,
};

export const QuickSwitcher: React.FC<QuickSwitcherProps> = ({
    defaultMode = "ask",
    askIcon,
    generateIcon,
    askLabel = "Ask Anything",
    generateLabel = "Generate Image",
    onActionClick,
}) => {
    const [mode, setMode] = useState<QuickSwitcherMode>(defaultMode);

    const toggleMode = () => {
        setMode((prev) => (prev === "ask" ? "generate" : "ask"));
    };

    // Determine direction: if moving to 'generate', we are moving "down"
    const direction = mode === "ask" ? -1 : 1;

    return (
        <motion.div
            layout
            className="flex items-center bg-[#F2F2F2] dark:bg-zinc-900 h-[68px] p-1.5 rounded-full shadow-sm min-w-[320px] sm:min-w-[380px] border border-gray-200/50 dark:border-zinc-800/50"
        >
            {/* Mode Switcher Button (Left) */}
            <button
                onClick={toggleMode}
                className="group flex items-center bg-white dark:bg-zinc-800 shadow-sm rounded-full pl-2 pr-4 h-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors active:scale-95"
            >
                <div className="relative w-12 h-12 overflow-hidden flex items-center justify-center">
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                            key={mode}
                            initial={{ y: direction * 30, opacity: 0, filter: "blur(4px)" }}
                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                            exit={{ y: -direction * 30, opacity: 0, filter: "blur(4px)" }}
                            transition={transition}
                            className="flex items-center justify-center text-zinc-900 dark:text-zinc-100"
                        >
                            {mode === "ask" ? askIcon : generateIcon}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Vertical Indicators */}
                <div className="flex flex-col ml-1">
                    <ChevronUp
                        size={14}
                        strokeWidth={4}
                        className={`transition-colors ${mode === "ask" ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-300 dark:text-zinc-500"
                            }`}
                    />
                    <ChevronDown
                        size={14}
                        strokeWidth={4}
                        className={`transition-colors ${mode === "generate" ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-300 dark:text-zinc-500"
                            }`}
                    />
                </div>
            </button>

            {/* Input / Label Area (Center) */}
            <div className="flex-grow relative h-full flex items-center px-4 overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={mode}
                        initial={{ y: direction * 30, opacity: 0, filter: "blur(8px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: -direction * 30, opacity: 0, filter: "blur(8px)" }}
                        transition={transition}
                        className="absolute inset-0 flex items-center px-4"
                    >
                        <span className="text-[18px] sm:text-[20px] font-semibold text-zinc-400 dark:text-zinc-500 whitespace-nowrap truncate">
                            {mode === "ask" ? askLabel : generateLabel}
                        </span>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Action Button (Right) */}
            <motion.button
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onActionClick?.(mode)}
                className="flex items-center justify-center bg-white dark:bg-zinc-800 w-12 h-12 rounded-full shadow-sm border border-gray-100 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 active:bg-zinc-50 dark:active:bg-zinc-800 transition-colors shrink-0"
            >
                <ArrowRight size={22} strokeWidth={2.5} />
            </motion.button>
        </motion.div>
    );
};
