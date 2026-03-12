"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";

/*  useLoop HOOK  */

const useLoop = (delay = 1000) => {
    const [key, setKey] = useState(0);

    const incrementKey = useCallback(() => {
        setKey((prev) => prev + 1);
    }, []);

    useEffect(() => {
        const interval = setInterval(incrementKey, delay);
        return () => clearInterval(interval);
    }, [delay, incrementKey]);

    return { key };
};

/*  TYPES  */

interface LoopHookProps {
    items?: string[];
    delay?: number;
    title?: string;
}

/*  COMPONENT  */

export const LoopHook = ({
    items,
    delay = 1000,
    title = "useLoop hook",
}: LoopHookProps) => {
    const { key } = useLoop(delay);

    const array = useMemo(
        () =>
            items ?? [
                "Tik-Tik uno",
                "Tik-Tik dos",
                "Tik-Tik tres",
                "Tik-Tik cuatro",
                "Tik-Tik cinco",
                "Tik-Tik seis",
                "Tik-Tik siete",
                "Tik-Tik ocho",
                "Tik-Tik nueve",
                "Tik-Tik diez",
            ],
        [items]
    );

    const currentItem = useMemo(() => {
        return array[key % array.length];
    }, [array, key]);

    return (
        <div className="flex flex-col items-center justify-center gap-8 p-8 w-full">
            <div className="mb-10 flex flex-col items-center text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 dark:text-zinc-500 max-w-[15ch] leading-relaxed mb-10">
                    {title}
                </span>
                <div className="h-32 w-[1.2px] bg-gradient-to-b from-zinc-200 via-zinc-400 dark:from-zinc-400 dark:via-zinc-700 to-transparent" />
            </div>

            <AnimatePresence mode="popLayout">
                <motion.h1
                    key={key}
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 0.3 }}
                    className="whitespace-nowrap text-center text-zinc-900 dark:text-zinc-100 font-medium tracking-tight"
                >
                    {currentItem}
                </motion.h1>
            </AnimatePresence>
        </div>
    );
};