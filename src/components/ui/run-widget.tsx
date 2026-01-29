import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionValueEvent } from 'motion/react';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import { FaRunning } from 'react-icons/fa';



const TICK_GAP = 12;

export const RunWidget = () => {
    const [miles, setMiles] = useState(0.8);

    const x = useMotionValue(-96);


    useMotionValueEvent(x, "change", (latest) => {
        const calculatedMiles = Math.abs(latest) / (TICK_GAP * 10);
        const rounded = Math.round(calculatedMiles * 10) / 10;

        if (rounded !== miles && rounded >= 0) {
            setMiles(rounded);
        }
    });

    const whole = Math.floor(miles);
    const decimal = Math.round((miles % 1) * 10);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 antialiased transition-colors duration-500 dark:bg-[#0A0A0A] bg-[#F6F5EE]">


            <div className="w-[320px] h-[320px] rounded-[42px] shadow-lg flex flex-col justify-between relative overflow-hidden border-2 p-[7px] transition-colors duration-300 dark:bg-[#1C1C1C] dark:border-white/5 bg-[#FEFEFE] border-[#E7E5E1]">
                {/* Header Section */}
                <div className="flex justify-between items-start py-3 px-3">
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center h-[76px] overflow-hidden relative font-sans -ml-2">

                            {/* Whole Number Section */}
                            <div className="relative flex items-center h-full min-w-[45px]">
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.span
                                        key={whole}
                                        initial={{ y: 50, opacity: 0, filter: "blur(6px)" }}
                                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                        exit={{
                                            y: -50,
                                            opacity: 0,
                                            filter: "blur(6px)",
                                            transition: { duration: 0.15 }
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 450,
                                            damping: 35,
                                            mass: 0.5
                                        }}
                                        className="text-[84px] font-bold leading-none inline-block select-none transition-colors dark:text-white text-[#282828]"
                                    >
                                        {whole}
                                    </motion.span>
                                </AnimatePresence>
                            </div>

                            <span className="text-[84px] font-bold leading-none select-none transition-colors dark:text-white text-[#282828]">.</span>

                            {/* Decimal Number Section */}
                            <div className="relative flex items-center h-full min-w-[45px]">
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.span
                                        key={decimal}
                                        initial={{ y: 50, opacity: 0, filter: "blur(6px)" }}
                                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                        exit={{
                                            y: -50,
                                            opacity: 0,
                                            filter: "blur(6px)",
                                            transition: { duration: 0.15 }
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 450,
                                            damping: 35,
                                            mass: 0.5
                                        }}
                                        className="text-[84px] font-bold leading-none inline-block select-none transition-colors dark:text-white text-[#282828]"
                                    >
                                        {decimal}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </div>
                        <span className="text-[24px] font-medium mt-2 transition-colors dark:text-gray-500 text-[#8C8C8A]">miles</span>
                    </div>

                    <button title='more' className="p-2.5 rounded-xl text-white transition-colors duration-300 shrink-0 dark:bg-[#3A3A38] dark:hover:bg-[#4A4A48] bg-[#8D8C85] hover:bg-[#8F8D8B]/80">
                        <HiOutlineArrowUpRight size={34} strokeWidth={3} />
                    </button>
                </div>

                {/* Ruler Section*/}
                <div className="relative h-24 flex items-center justify-center -mx-8">
                    {/* Static Center Indicator */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-[4px] h-12 rounded-full z-10 transition-colors dark:bg-white bg-[#595753]" />

                    <motion.div
                        drag="x"
                        dragConstraints={{ right: 0, left: -1200 }}
                        dragElastic={0.05}
                        style={{ x, left: '50%' }}
                        className="flex items-center absolute left-1/2"
                    >
                        <div className="flex items-center gap-[12px]">
                            {[...Array(101)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-shrink-0 rounded-full transition-colors duration-150 dark:bg-white/20 bg-[#DFDDDC] ${i % 5 === 0 ? 'h-9 w-[2px]' : 'h-9 w-[2px]'}`}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Action Button */}
                <button className="w-full py-[18px] mt-3 rounded-b-[32px] rounded-[8px] flex items-center justify-center gap-2 font-semibold text-[22px] transition-colors dark:bg-white/10 dark:text-white dark:hover:bg-white/20 bg-[#F0ECE6] text-[#2A2620] hover:bg-[#e9e4dc]">
                    <FaRunning size={28} className="fill-current" />
                    Begin Run
                </button>
            </div>
        </div>
    );
};