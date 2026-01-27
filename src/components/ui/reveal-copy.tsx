"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from "lucide-react";
import { FaCopy } from "react-icons/fa";
import { BsEyeFill } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa6';

export const RevealAndCopy = () => {
    const [revealed, setRevealed] = useState(false);
    const [copied, setCopied] = useState(false);
    const [timerActive, setTimerActive] = useState(false);
    const [isDark, setIsDark] = useState<boolean>(false);

    const cardNumber = '4485 1996 2057 7516';
    const parts = cardNumber.split(' ');

    // Theme Sync logic
    useEffect(() => {
        if (isDark) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
    }, [isDark]);

    useEffect(() => {
        if (!revealed) return;
        setTimerActive(true);
        const timer = setTimeout(() => {
            if (!copied) {
                resetAll();
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [revealed]);

    useEffect(() => {
        if (!copied) return;
        const t = setTimeout(() => {
            resetAll();
        }, 1200);
        return () => clearTimeout(t);
    }, [copied]);

    const resetAll = () => {
        setRevealed(false);
        setCopied(false);
        setTimerActive(false);
    };

    const handleCopy = async () => {
        if (copied) return;
        await navigator.clipboard.writeText(cardNumber);
        setCopied(true);
        setTimerActive(false);
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500 gap-8">

            {/* Theme Toggle Button */}
            <button
                onClick={() => setIsDark(!isDark)}
                className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all active:scale-90 shadow-sm"
            >
                {isDark ? (
                    <Sun className="text-yellow-400" size={20} />
                ) : (
                    <Moon className="text-zinc-500" size={20} />
                )}
            </button>

            <div className="flex items-center px-2 h-[70px] min-w-[420px] rounded-[20px] border-2 border-[#E5E4ED] dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm transition-colors duration-500">

                {/* Numbers */}
                <div className="flex flex-1 gap-0 text-[22px] tracking-[0.18em]">
                    {parts.map((part, idx) => (
                        <div key={idx} className="w-[85px] flex font-bold justify-center relative overflow-hidden">
                            <AnimatePresence mode="popLayout">
                                {!revealed && (idx === 1 || idx === 2) ? (
                                    <motion.div
                                        key="masked"
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        className="text-[#282828] dark:text-white"
                                    >
                                        xxxx
                                    </motion.div>
                                ) : (
                                    <div className="relative">
                                        <motion.div key="show" className="flex">
                                            {part.split('').map((c, i) => (
                                                <motion.span
                                                    key={i}
                                                    initial={{ opacity: 0, y: 6, filter: 'blur(6px)' }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                        filter: 'blur(0px)',
                                                        transition: { delay: i * 0.05 }
                                                    }}
                                                    className='text-[#282828] dark:text-zinc-100'
                                                >
                                                    {c}
                                                </motion.span>
                                            ))}
                                        </motion.div>

                                        {/* Shining Sweep Effect */}
                                        <motion.div
                                            initial={{ x: '-150%' }}
                                            animate={{ x: '150%' }}
                                            transition={{
                                                delay: 0.3,
                                                duration: 1,
                                                ease: "easeInOut"
                                            }}
                                            className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay dark:mix-blend-soft-light"
                                            style={{
                                                background: isDark
                                                    ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)'
                                                    : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                                                width: '100%',
                                                skewX: '-20deg'
                                            }}
                                        />
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Action */}
                <div className="relative w-12 h-12 ml-4">
                    <AnimatePresence mode="popLayout">
                        {!revealed ? (
                            <motion.button
                                key="eye"
                                onClick={() => setRevealed(true)}
                                initial={{ scale: 0.85, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.85, opacity: 0 }}
                                className="w-full h-full rounded-2xl bg-[#E4E4FF] dark:bg-indigo-900/30 text-[#4E53CA] dark:text-indigo-400 flex items-center justify-center"
                            >
                                <BsEyeFill size={22} />
                            </motion.button>
                        ) : (
                            <motion.button
                                key="copy"
                                onClick={handleCopy}
                                initial={{ scale: 0.85, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className={`relative w-full h-full rounded-2xl flex items-center justify-center transition-colors duration-300
                                    ${copied ? 'bg-[#2DBE50] text-white' : 'bg-[#CAF9D5] dark:bg-emerald-900/30 text-[#2DBE50] dark:text-emerald-400'}`}
                            >
                                {timerActive && !copied && (
                                    <svg
                                        className="absolute inset-0 w-full h-full pointer-events-none"
                                        viewBox="0 0 48 48"
                                    >
                                        <motion.rect
                                            x="1.5"
                                            y="1.5"
                                            width="45"
                                            height="45"
                                            rx="14"
                                            ry="14"
                                            fill="transparent"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeDasharray="180"
                                            initial={{ strokeDashoffset: 180 }}
                                            animate={{ strokeDashoffset: 0 }}
                                            transition={{ duration: 3, ease: 'linear' }}
                                        />
                                    </svg>
                                )}

                                {copied ? <FaCheck size={22} strokeWidth={2} /> : <FaCopy size={22} />}
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
