"use client";

import { useState, useEffect, type FC, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUpIcon } from "lucide-react";

/* ---------- TYPES ---------- */

export interface ActivityItemType {
    icon: ReactNode;
    title: string;
    desc: string;
    time: string;
}

export interface ActivitiesCardProps {
    headerIcon: ReactNode;
    title: string;
    subtitle: string;
    activities: ActivityItemType[];
}

/* ---------- SUB COMPONENT ---------- */

const ActivityItem: FC<ActivityItemType> = ({ icon, title, desc, time }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 sm:gap-4 px-3 sm:px-5 py-3 transition-colors cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
        >
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border border-gray-100/50 dark:border-zinc-700 bg-gradient-to-b from-[#f4f4f7]/90 to-[#E9EAF0]/90 dark:from-zinc-800 dark:to-zinc-900 text-gray-400 dark:text-zinc-500">
                {icon}
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-[15px] sm:text-[17px] font-bold text-[#3E3E43] dark:text-zinc-200 leading-tight truncate">
                    {title}
                </p>
                <p className="text-[13px] sm:text-[15px] text-[#909092] dark:text-zinc-500 truncate">
                    {desc}
                </p>
            </div>

            <span className="text-[11px] sm:text-[13px] text-[#9F9FA1] dark:text-zinc-600 whitespace-nowrap pt-1">
                {time}
            </span>
        </motion.div>
    );
};

/* ---------- MAIN COMPONENT ---------- */

export const ActivitiesCard: FC<ActivitiesCardProps> = ({
    headerIcon,
    title,
    subtitle,
    activities,
}) => {
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);


    return (
        <motion.div
            layout
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
            className="w-xs sm:w-sm  overflow-hidden sm:rounded-[20px] rounded-xl bg-[#FEFEFE] dark:bg-zinc-900 border-2 border-[#e7e6e6]/60 dark:border-zinc-800 shadow-lg"
        >
            {/* HEADER */}
            <motion.button
                layout
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between px-3 sm:px-4 py-2 sm:py-3.5 transition-colors gap-2 sm:gap-3"
            >
                <div className="flex items-center gap-3 sm:gap-4 text-left flex-1 min-w-0">
                    {/* ICON */}
                    <motion.div
                        animate={{
                            width: open ? (isMobile ? 36 : 48) : (isMobile ? 48 : 60),
                            height: open ? (isMobile ? 36 : 48) : (isMobile ? 48 : 60),
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative flex shrink-0 items-center justify-center sm:rounded-xl rounded-lg border border-gray-100/50 dark:border-zinc-700 bg-gradient-to-b from-[#f4f4f7] via-[#efeef2] to-[#E9EAF0] dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-900 shadow-sm overflow-hidden"
                    >
                        <motion.span className="absolute rounded-[inherit] pointer-events-none inset-0 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),_inset_-1px_-1px_2px_rgba(165,172,190,0.2)] dark:shadow-[inset_1px_1px_1px_rgba(255,255,255,0.1),inset_-1px_-1px_3px_rgba(0,0,0,0.6)]" />
                        <motion.div animate={{ scale: open ? 0.7 : 1 }}>
                            {headerIcon}
                        </motion.div>
                    </motion.div>

                    {/* TEXT */}
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                        <motion.p className="font-bold text-neutral-900 dark:text-zinc-100 text-[16px] sm:text-[17px] tracking-tight truncate">
                            {title}
                        </motion.p>
                        {!open && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-[#BFBFC2] dark:text-zinc-500 text-[14px] sm:text-[15px] tracking-tight truncate"
                            >
                                {subtitle}
                            </motion.p>
                        )}
                    </div>
                </div>

                {/* CHEVRON */}
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#9C97A8]/70 to-[#7A7596]/70 dark:from-zinc-700 dark:to-zinc-800 shadow-xs"
                >
                    <ChevronUpIcon className="size-5 text-white" />
                </motion.div>
            </motion.button>

            {/* CONTENT */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t-2 border-[#e7e6e6]/60 dark:border-zinc-800"
                    >
                        <div className="py-2">
                            {activities.map((item, i) => (
                                <ActivityItem key={i} {...item} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
