"use client";

import { useState, useRef, useEffect, type FC } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import { TbLockFilled } from "react-icons/tb";
import type { IconType } from "react-icons";

// --- Types ---
export interface Option {
    id: string;
    label: string;
    icon: IconType;
}

interface OptionPickerProps {
    options?: Option[];
}

// --- Default Options ---
const DEFAULT_OPTIONS: Option[] = [
    { id: "private", label: "Private", icon: TbLockFilled },
    { id: "public", label: "Public", icon: Globe },
];

// --- Animations ---
const rollVariants: Variants = {
    initial: { filter: "blur(8px)", opacity: 0, scale: 1.05 },
    animate: { filter: "blur(0px)", opacity: 1, scale: 1 },
    exit: { filter: "blur(8px)", opacity: 0, scale: 0.95 },
};

// --- Component ---
export const OptionPicker: FC<OptionPickerProps> = ({ options }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<Option>(options?.[0] || DEFAULT_OPTIONS[0]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleOpen = () => setIsOpen((prev) => !prev);
    const handleSelect = (option: Option) => {
        setSelected(option);
        setIsOpen(false);
    };

    // Use provided options or default
    const data = options || DEFAULT_OPTIONS;

    return (
        <div className="relative inline-block" ref={containerRef}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10, x: "-50%" }}
                        animate={{ opacity: 1, scale: 1, y: -8, x: "-50%" }}
                        exit={{ opacity: 0, scale: 0.9, y: 10, x: "-50%" }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        style={{ left: "50%" }}
                        className="absolute z-50 mb-2 origin-bottom bottom-full"
                        role="menu"
                        aria-label="Visibility options"
                    >
                        <div className="bg-[#F3F3F3] dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 rounded-full p-1.5 py-1 flex gap-2 whitespace-nowrap min-w-max relative shadow-xl">
                            {data.map((option, index) => {
                                const isActive = selected.id === option.id;
                                const isFirst = index === 0;
                                const isLast = index === data.length - 1;

                                const roundedClasses = `
                    ${isFirst ? "rounded-l-full rounded-r-2xl" : ""}
                    ${isLast ? "rounded-r-full rounded-l-2xl" : ""}
                    ${!isFirst && !isLast ? "rounded-none" : ""}
                  `;

                                return (
                                    <motion.button
                                        key={option.id}
                                        onClick={() => handleSelect(option)}
                                        whileTap={{ scale: 0.95 }}
                                        whileHover={{ y: -1 }}
                                        title={`Set as ${option.label}`}
                                        aria-label={`Select ${option.label}`}
                                        className={`relative flex items-center gap-2 px-5 py-3 font-semibold text-[15px] transition-all duration-300 ${roundedClasses} 
                      bg-[#FEFEFE] dark:bg-zinc-900 
                      ${isActive ? "text-[#010101] dark:text-white" : "text-[#6E6E6E] dark:text-zinc-400"}`}
                                    >
                                        <motion.span initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                                            <option.icon size={22} />
                                        </motion.span>
                                        <span className="relative z-10 text-lg text-bold">{option.label}</span>
                                    </motion.button>
                                );
                            })}

                            {/* Tooltip Arrow */}
                            <div
                                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 
                  bg-[#F3F3F3] dark:bg-zinc-800 
                  border-r border-b border-gray-100 dark:border-zinc-700 rotate-45"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MAIN BUTTON */}
            <motion.button
                onClick={toggleOpen}
                whileTap={{ scale: 0.97 }}
                title="Change Visibility"
                aria-label={`Visibility is currently ${selected.label}. Click to change.`}
                aria-expanded={isOpen}
                className={`flex items-center justify-center gap-2 px-4 py-4 rounded-full transition-all duration-300 select-none border border-transparent
          ${isOpen ? "bg-[#E5E5E5] dark:bg-zinc-800 dark:border-zinc-700" : "bg-[#F4F4F4] dark:bg-zinc-900"}`}
            >
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={selected.id}
                        variants={rollVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 28,
                            mass: 1,
                            filter: { duration: 0.35 },
                            opacity: { duration: 0.35 },
                        }}
                        className="flex items-center gap-2"
                    >
                        <selected.icon
                            size={24}
                            className={`transition-colors duration-300 ${isOpen ? "text-[#AEAEAE] dark:text-zinc-500" : "text-[#AFAFAF] dark:text-zinc-400"}`}
                        />
                        <span className="font-bold text-[#525252] dark:text-zinc-200 text-[18px] leading-none">{selected.label}</span>
                    </motion.div>
                </AnimatePresence>

                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="flex items-center">
                    <ChevronDown
                        size={24}
                        className={`transition-colors duration-300 ${isOpen ? "text-[#AEAEAE] dark:text-zinc-500" : "text-[#AFAFAF] dark:text-zinc-400"}`}
                        strokeWidth={2.5}
                    />
                </motion.div>
            </motion.button>
        </div>
    );
};