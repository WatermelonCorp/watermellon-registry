"use client";

import { useState, useEffect, type FC } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { Sun, Moon } from "lucide-react";

/* --- Props --- */
interface StepperProps {
  initialValue?: number;
  min?: number;
  max?: number;
}

/* --- Main Component --- */
export const Stepper: FC<StepperProps> = ({ initialValue = 0, min = 0, max = 999 }) => {
    const [value, setValue] = useState<number>(initialValue);
    const [direction, setDirection] = useState<number>(0);
    const [isDark, setIsDark] = useState<boolean>(false);

    // Theme Sync logic
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const step = (dir: number) => {
        setDirection(dir);
        setValue((v) => Math.min(max, Math.max(min, v + dir)));
    };

    const digits: string[] = value.toString().split("");

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-white dark:bg-zinc-950 transition-colors duration-500">
            
            {/* Theme Toggle Button */}
            <button 
                onClick={() => setIsDark(!isDark)}
                className="mb-12 p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all active:scale-90"
            >
                {isDark ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-zinc-500" size={20} />}
            </button>

            <div className="flex items-center gap-5 px-1 py-1 rounded-full bg-transparent border-2 border-[#E6E6EF] dark:border-zinc-800 shadow-sm">

                {/* Minus Button */}
                <motion.button
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: isDark ? "#27272a" : "#F0EFF6",
                    }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    onClick={() => step(-1)}
                    className="w-14 h-14 rounded-full bg-[#F0EFF6] dark:bg-zinc-800 text-[#5A5A63] dark:text-zinc-400 flex items-center justify-center shrink-0"
                    disabled={value <= min}
                >
                    <HiMinus size={20} />
                </motion.button>

                {/* Animated Value Container */}
                <div className="relative h-8 flex items-center justify-center text-2xl font-bold text-[#242426] dark:text-white shrink-0">
                    {digits.map((digit, index) => (
                        <div
                            key={`${index}-${digits.length}`} // Key helps handle layout shifts if digit count changes
                            className="relative w-4 h-8 overflow-hidden flex items-center justify-center"
                        >
                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.span
                                    key={digit}
                                    initial={{
                                        y: direction > 0 ? 12 : -12,
                                        opacity: 0,
                                        filter: "blur(2px)",
                                    }}
                                    animate={{
                                        y: 0,
                                        opacity: 1,
                                        filter: "blur(0px)",
                                    }}
                                    exit={{
                                        y: direction > 0 ? -12 : 12,
                                        opacity: 0,
                                        filter: "blur(2px)",
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 240,
                                        damping: 22,
                                        mass: 0.45,
                                    }}
                                    className="absolute inset-0 flex items-center justify-center tracking-tight"
                                >
                                    {digit}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Plus Button */}
                <motion.button
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: isDark ? "#27272a" : "#F0EFF6",
                    }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    onClick={() => step(1)}
                    className="w-14 h-14 rounded-full bg-[#F0EFF6] dark:bg-zinc-800 text-[#5A5A63] dark:text-zinc-400 flex items-center justify-center shrink-0"
                    disabled={value >= max}
                >
                    <HiPlus size={20} />
                </motion.button>

            </div>
        </div>
    );
};
