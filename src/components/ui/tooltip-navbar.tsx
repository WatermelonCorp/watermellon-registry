import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup, type Transition } from "framer-motion";
import { Eye, Share2, Upload, Menu } from "lucide-react";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FiInbox } from "react-icons/fi";

export interface ToolbarItem {
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
        id: "inbox",
        icon: <FiInbox size={26} />,
        label: "Feature",
        shortcut: ["F"],
        showDot: true,
    },
    {
        id: "view",
        icon: <Eye size={26} />,
        label: "View",
        shortcut: ["V"],
    },
    {
        id: "share",
        icon: <Share2 size={26} />,
        label: "Mode",
        shortcut: ["S", "H"],
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

export function TooltipNavbar({
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
                            className="relative flex items-center p-2 px-3 bg-neutral-900/95 gap-1.5 backdrop-blur-md border border-neutral-800 rounded-full shadow-md"
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {items.map((item) => (
                                <button
                                    key={item.id}
                                    onMouseEnter={() => setHoveredId(item.id)}
                                    className={`
                    relative z-20 flex items-center justify-center w-10 h-10 rounded-[12px]
                    transition-colors duration-200 outline-none group
                    ${hoveredId === item.id ? "text-white" : "text-neutral-500"}
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
                                        initial={{ opacity: 0, y: 5, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 5, scale: 0.9 }}
                                        transition={sharedLayoutTransition}
                                        className="absolute bottom-full mb-3 flex justify-center pointer-events-none z-50"
                                        style={{
                                            left: activeIndex * 40 + 6,
                                            width: 40,
                                        }}
                                    >
                                        <div className="flex items-center gap-2 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl whitespace-nowrap">
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
