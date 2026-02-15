"use client";

import { useState, type FC, type ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    Add01Icon,
    Cancel01Icon,
    Folder01Icon,
    TaskEdit01Icon,
    NoteIcon,
    Award01Icon,
    Flag02Icon,
    Calendar04Icon,
} from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "motion/react";

/* --- Types --- */

export interface DisclosureItem {
    icon: ReactNode;
    label: string;
}

export interface CreateNewDisclosureProps {
    items?: DisclosureItem[];
    initialOpen?: boolean;
}

/* --- Sub-Component --- */

interface GridItemProps {
    icon: ReactNode;
    label: string;
}

const GridItem: FC<GridItemProps> = ({ icon, label }) => {
    return (
        <motion.button
            className="group flex flex-col items-center justify-center gap-1.5
                 rounded-[24px] px-2 py-4
                 transition-all duration-200
                 hover:bg-[#F4F2EA] dark:hover:bg-zinc-800/50"
        >
            <div className="text-[#8B8B8B] dark:text-zinc-500 transition-colors group-hover:text-[#4A4A4A] dark:group-hover:text-zinc-300">
                {icon}
            </div>
            <span className="text-[14px] text-[#4A4A4A] dark:text-zinc-400 font-medium tracking-tight">
                {label}
            </span>
        </motion.button>
    );
};

/* --- Main Component --- */

export const CreateNewDisclosure: FC<CreateNewDisclosureProps> = ({
    items,
    initialOpen = false,
}) => {
    const [open, setOpen] = useState<boolean>(initialOpen);

    const defaultItems: DisclosureItem[] = [
        { icon: <HugeiconsIcon icon={Folder01Icon} size={28} strokeWidth={1.5} />, label: "Project" },
        { icon: <HugeiconsIcon icon={TaskEdit01Icon} size={28} strokeWidth={1.5} />, label: "Task" },
        { icon: <HugeiconsIcon icon={NoteIcon} size={28} strokeWidth={1.5} />, label: "Note" },
        { icon: <HugeiconsIcon icon={Award01Icon} size={28} strokeWidth={1.5} />, label: "Goal" },
        { icon: <HugeiconsIcon icon={Flag02Icon} size={28} strokeWidth={1.5} />, label: "Milestone" },
        { icon: <HugeiconsIcon icon={Calendar04Icon} size={28} strokeWidth={1.5} />, label: "Reminder" },
    ];

    const disclosureItems = items || defaultItems;

    return (
        <motion.div
            layout
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
            className={`relative overflow-hidden border-2 border-[#e7e6e6] dark:border-zinc-800 transition-colors duration-200 ${open
                ? "bg-[#F7F5EE] dark:bg-zinc-900 shadow-xl rounded-3xl"
                : "bg-transparent rounded-full"
                }`}
        >
            <AnimatePresence mode="popLayout" initial={false}>
                {!open ? (
                    /* COLLAPSED STATE */
                    <motion.button
                        key="collapsed"
                        layoutId="shared-container"
                        onClick={() => setOpen(true)}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                        className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#FAFBF8] dark:bg-zinc-900 text-[#626360] dark:text-zinc-400 text-lg font-medium shadow-md whitespace-nowrap"
                    >
                        <motion.div layout="position" className="flex items-center gap-2">
                            <HugeiconsIcon icon={Add01Icon} size={26} className="text-[#626360] dark:text-zinc-400" strokeWidth={1.5} />
                            Create New
                        </motion.div>
                    </motion.button>
                ) : (
                    /* EXPANDED STATE */
                    <motion.div
                        key="expanded"
                        layoutId="shared-container"
                        initial={{ opacity: 0, filter: "blur(6px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{
                            opacity: 0,
                            filter: "blur(6px)",
                            transition: { duration: 0.1 },
                        }}
                        className="h-full w-80 sm:w-88 bg-[#F7F5EE] dark:bg-zinc-900"
                    >
                        {/* HEADER */}
                        <div className="flex items-center justify-between px-6 py-3.5">
                            <p className="text-[17px] font-semibold text-[#5C5A56] dark:text-zinc-400">Create New</p>
                            <motion.button
                                onClick={() => setOpen(false)}
                                whileTap={{ scale: 0.9 }}
                                className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B8B5B0] dark:bg-zinc-700 cursor-pointer"
                            >
                                <HugeiconsIcon icon={Cancel01Icon} size={16} color="#ffffff" strokeWidth={2.5} />
                            </motion.button>
                        </div>

                        {/* GRID */}
                        <div className="grid grid-cols-3 gap-y-4 gap-x-2 p-4 bg-white dark:bg-zinc-950 rounded-b-[20px] rounded-t-[20px] shadow-sm">
                            {disclosureItems.map((item, index) => (
                                <GridItem key={index} icon={item.icon} label={item.label} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};