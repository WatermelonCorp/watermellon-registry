"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";

export interface ContextualAIBarProps {
    defaultExpanded?: boolean;
    placeholder?: string;
    tools?: React.ReactNode[];
    musicIcon: React.ReactNode;
    sparkleIcon: React.ReactNode;
}

export const ContextualAIBar: React.FC<ContextualAIBarProps> = ({
    defaultExpanded = false,
    placeholder = "Refine with AI",
    tools = [],
    musicIcon,
    sparkleIcon,
}) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    const spring = {
        type: "spring",
        stiffness: 220,
        damping: 28,
        mass: 1.2,
    } as const;

    return (
        <motion.div
            layout
            transition={spring}
            className="
          flex items-center
          bg-[#f4f4f5]/60 dark:bg-zinc-900/60
          border border-[#e8e8e9]/30 dark:border-zinc-800/30
          p-1 rounded-full
          shadow-sm
          overflow-hidden
        "
        >
            {/*  Toggle  */}
            <motion.div
                layout
                transition={spring}
                className="relative flex items-center p-1 bg-white dark:bg-zinc-800 rounded-full shadow-md"
            >
                {/* Music */}
                <motion.button
                    layout
                    onClick={() => setIsExpanded(false)}
                    whileTap={{ scale: 0.9 }}
                    className="relative p-2.5 rounded-full outline-none"
                >
                    {!isExpanded && (
                        <motion.div
                            layoutId="active-pill"
                            transition={spring}
                            className="absolute inset-0 rounded-full bg-[#F6F6F6] dark:bg-zinc-700"
                        />
                    )}

                    <motion.div
                        className="relative z-10"
                        animate={{ opacity: !isExpanded ? 1 : 0.45 }}
                        transition={spring}
                    >
                        {musicIcon}
                    </motion.div>
                </motion.button>

                {/* Sparkles */}
                <motion.button
                    layout
                    onClick={() => setIsExpanded(true)}
                    whileTap={{ scale: 0.9 }}
                    className="relative p-2.5 rounded-full outline-none"
                >
                    {isExpanded && (
                        <motion.div
                            layoutId="active-pill"
                            transition={spring}
                            className="absolute inset-0 rounded-full bg-[#F6F6F6] dark:bg-zinc-700"
                        />
                    )}

                    <motion.div
                        className="relative z-10"
                        animate={{ opacity: isExpanded ? 1 : 0.45 }}
                        transition={spring}
                    >
                        {sparkleIcon}
                    </motion.div>
                </motion.button>
            </motion.div>

            {/*  Content  */}
            <AnimatePresence mode="popLayout" initial={false}>
                {!isExpanded ? (
                    <motion.div
                        key="tools"
                        initial={{ opacity: 0, x: -22 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -22 }}
                        transition={spring}
                        className="flex items-center gap-5 px-4"
                    >
                        {tools.map((tool, index) => (
                            <ToolIcon key={index}>{tool}</ToolIcon>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="input"
                        initial={{ opacity: 0, x: 22 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 22 }}
                        transition={spring}
                        className="flex items-center gap-2 pl-2 sm:pl-4 pr-2"
                    >
                        <input
                            autoFocus
                            type="text"
                            placeholder={placeholder}
                            className="
                  bg-transparent
                  border-none
                  outline-none
                  text-xl
                  text-gray-800 dark:text-zinc-100
                  placeholder-gray-400 dark:placeholder-zinc-500
                  w-[135px] sm:w-[180px]
                "
                        />

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.92 }}
                            transition={spring}
                            className="
                  p-3
                  bg-[#fcfcfc] dark:bg-zinc-800 shadow-md
                  border border-gray-100 dark:border-zinc-700
                  rounded-full
                  hover:bg-gray-50 dark:hover:bg-zinc-700
                  text-black dark:text-zinc-100
                "
                        >
                            <ArrowRight size={22} strokeWidth={2.5} />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

/*  Helpers  */

const ToolIcon = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        transition={{
            type: "spring",
            stiffness: 300,
            damping: 26,
            mass: 1.1,
        }}
        className="text-[#040404] dark:text-zinc-100 cursor-pointer"
    >
        {children}
    </motion.div>
);