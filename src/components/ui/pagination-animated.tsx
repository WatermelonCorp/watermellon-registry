"use client";

import { useState, useEffect, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import { Sun, Moon } from "lucide-react";

/* --- Props --- */
interface PaginationProps {
  totalPages?: number;
  initialPage?: number;
}

/* --- Main Component --- */
export const Pagination: FC<PaginationProps> = ({ totalPages = 15, initialPage = 1 }) => {
    const [page, setPage] = useState<number>(initialPage);
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

    const paginate = (dir: number) => {
        if ((page === 1 && dir === -1) || (page === totalPages && dir === 1)) return;
        setDirection(dir);
        setPage((p) => Math.min(totalPages, Math.max(1, p + dir)));
    };

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-white dark:bg-zinc-950 transition-colors duration-500">
            
            {/* Theme Toggle Button */}
            <button 
                onClick={() => setIsDark(!isDark)}
                className="mb-12 p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all active:scale-90 shadow-sm"
                aria-label="Toggle Theme"
            >
                {isDark ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-zinc-500" size={20} />}
            </button>

            <div className="flex justify-center">
                <div className="flex items-center gap-3 px-1 py-1 rounded-full bg-[#F0EFF6] dark:bg-zinc-900 border border-[#f0eff6dd] dark:border-zinc-800">

                    {/* Left Button */}
                    <motion.button
                        whileHover={{
                            backgroundColor: isDark ? "#fff" : "#000",
                            color: isDark ? "#000" : "#fff",
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        onClick={() => paginate(-1)}
                        disabled={page === 1}
                        className={`w-14 h-14 rounded-full bg-white dark:bg-zinc-800 text-[#030303] dark:text-white shadow flex items-center justify-center text-xl transition-colors duration-200 
                            ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        <HiOutlineArrowLeft size={28} strokeWidth={1.5} />
                    </motion.button>


                    {/* Counter Section */}
                    <div className="flex items-center justify-center pr-1 mr-1 text-[#59585F] dark:text-zinc-400 text-xl font-bold leading-none select-none">

                        {/* Animated Page Number */}
                        <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.span
                                    key={page}
                                    initial={{
                                        y: direction > 0 ? 12 : -12,
                                        opacity: 0,
                                        filter: "blur(4px)",
                                    }}
                                    animate={{
                                        y: 0,
                                        opacity: 1,
                                        filter: "blur(0px)",
                                    }}
                                    exit={{
                                        y: direction > 0 ? -12 : 12,
                                        opacity: 0,
                                        filter: "blur(4px)",
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 220,   
                                        damping: 22,     
                                        mass: 0.45,       
                                    }}
                                    className="absolute inset-0 flex items-center justify-center text-[#030303] dark:text-white"
                                >
                                    {page}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        {/* Static text */}
                        <span className="flex items-center h-8 leading-none ml-1">
                            of {totalPages}
                        </span>
                    </div>


                    {/* Right Button */}
                    <motion.button
                        whileHover={{
                            backgroundColor: isDark ? "#fff" : "#000",
                            color: isDark ? "#000" : "#fff",
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        onClick={() => paginate(1)}
                        disabled={page === totalPages}
                        className={`w-14 h-14 rounded-full bg-white dark:bg-zinc-800 text-[#030303] dark:text-white shadow flex items-center justify-center text-xl transition-colors duration-200
                            ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        <HiOutlineArrowRight size={28} strokeWidth={1.5} />
                    </motion.button>

                </div>
            </div>
        </div>
    );
}

