import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup, type Transition } from "motion/react";
import { Upload, Menu } from "lucide-react";
import { IoChatbubbleOutline } from "react-icons/io5";

interface ToolbarItem {
    id: string;
    icon: React.ReactNode;
    label: string;
    shortcut: string[];
    showDot?: boolean;
}

interface TooltipNavbarProps {
    items?: ToolbarItem[];
}

/* Default Items */
const DEFAULT_ITEMS: ToolbarItem[] = [
    {
        id: "comment",
        icon: <IoChatbubbleOutline size={26} />,
        label: "Comment",
        shortcut: ["C"],
    },
    {
        id: "upload",
        icon: <Upload size={26} />,
        label: "Upload",
        shortcut: ["U"],
    },
    {
        id: "menu",
        icon: <Menu size={26} />,
        label: "Menu",
        shortcut: ["K"],
        showDot: true,
    },
];

const sharedLayoutTransition: Transition = {
    type: "spring",
    stiffness: 500,
    damping: 30,
    mass: 0.8,
};

export function VerticalTooltipNavbar({
    items = DEFAULT_ITEMS,
}: TooltipNavbarProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const activeIndex = useMemo(
        () => items.findIndex((item) => item.id === hoveredId),
        [hoveredId, items]
    );

    const activeItem = items[activeIndex];

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#fafafa] selection:bg-neutral-200">
            <div className="relative z-10 flex flex-col items-center gap-12">
                <div className="relative flex items-center">
                    <LayoutGroup>
                        <div
                            className="relative flex flex-col items-center p-2 px-3 bg-[#000000] gap-4 backdrop-blur-md border border-neutral-800 rounded-full shadow-md"
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {items.map((item) => (
                                <button
                                    key={item.id}
                                    onMouseEnter={() => setHoveredId(item.id)}
                                    className={`
                    relative z-20 flex items-center justify-center w-10 h-10 rounded-[12px]
                    transition-colors duration-200 outline-none group text-white
                  `}
                                >
                                    {hoveredId === item.id && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-[#353535] rounded-full z-[-1]"
                                            transition={sharedLayoutTransition}
                                        />
                                    )}

                                    <span className="relative">
                                        {item.icon}
                                        {item.showDot && (
                                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-neutral-900" />
                                        )}
                                    </span>
                                </button>
                            ))}

                            {/* Tooltip */}
                            <AnimatePresence>
                                {hoveredId && activeItem && (
                                    <motion.div
                                        key="tooltip"
                                        layoutId="tooltip-pill"
                                        initial={{ opacity: 0, x: 8, scale: 0.9 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        transition={sharedLayoutTransition}
                                        className="absolute right-full flex items-center pointer-events-none z-50"
                                        style={{
                                            top: activeIndex * 46 + 8,
                                        }}
                                    >
                                        <div className="flex items-center gap-2 mr-2 px-3 py-2 bg-[#000000] border border-[#000000] rounded-lg shadow-xl whitespace-nowrap">
                                            <motion.span
                                                layout="position"
                                                className="text-[14px] font-medium text-neutral-100"
                                            >
                                                {activeItem.label}
                                            </motion.span>

                                            {activeItem.shortcut.length > 0 && (
                                                <motion.div layout="position" className="flex gap-1">
                                                    {activeItem.shortcut.map((key, idx) => (
                                                        <kbd
                                                            key={idx}
                                                            className="min-w-[1.2rem] h-4.5 flex items-center justify-center bg-neutral-800 border border-neutral-700/50 px-1 rounded-[4px] text-[10px] font-bold text-neutral-400 uppercase"
                                                        >
                                                            {key}
                                                        </kbd>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </LayoutGroup>
                </div>
            </div>
        </div>
    );
}
