"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface InterestItem {
    id: string;
    label: string;
    emoji: string;
}

interface Particle {
    id: number;
    emoji: string;
    x: number;
    y: number;
}

interface Props {
    interests: InterestItem[];
    onChange?: (selectedIds: string[]) => void;
}

export const EmojiSpreeChips: React.FC<Props> = ({ interests, onChange }) => {
    const [selected, setSelected] = useState<string[]>([]);
    const [particles, setParticles] = useState<Particle[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleInterest = (
        id: string,
        emoji: string,
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        const isSelected = selected.includes(id);
        const newSelected = isSelected
            ? selected.filter((i) => i !== id)
            : [...selected, id];

        setSelected(newSelected);
        onChange?.(newSelected);

        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const rect = e.currentTarget.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2 - containerRect.left;
        const centerY = rect.top - containerRect.top;

        const newParticles = Array.from({ length: 3 }).map(() => ({
            id: Math.random() + Date.now(),
            emoji,
            x: centerX,
            y: centerY,
        }));

        setParticles((prev) => [...prev, ...newParticles]);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setParticles((prev) =>
                prev.filter((p) => p.id > Date.now() - 1000)
            );
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full max-w-4xl min-h-[600px] select-none overflow-hidden py-10 relative"
        >
            <h2 className="text-2xl sm:text-[36px] font-bold tracking-tight mb-6 px-6 ml-4 sm:ml-8 transition-colors text-neutral-800 dark:text-neutral-100">
                Interests
            </h2>

            {/* Grid */}
            <div className="flex flex-wrap gap-x-3 gap-y-5 sm:gap-x-4 sm:gap-y-7 px-4 sm:px-10 justify-center">
                {interests.map((item) => {
                    const isSelected = selected.includes(item.id);
                    return (
                        <motion.button
                            key={item.id}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) =>
                                toggleInterest(item.id, item.emoji, e)
                            }
                            className={`
                                flex items-center justify-center gap-2 sm:gap-4 
                                px-3 sm:px-4 py-[8px] sm:py-[10px] 
                                rounded-full border-[1.6px] 
                                text-sm sm:text-[18px] font-semibold 
                                transition-all duration-300 whitespace-nowrap
                                ${isSelected
                                    ? 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100'
                                    : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-100/80 dark:border-neutral-900 text-neutral-900 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700'
                                }
                            `}
                        >
                            <span className="text-lg sm:text-xl">
                                {item.emoji}
                            </span>
                            <span className="text-lg sm:text-xl font-bold">
                                {item.label}
                            </span>
                        </motion.button>
                    );
                })}
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
                <AnimatePresence>
                    {particles.map((p, i) => (
                        <motion.div
                            key={p.id}
                            initial={{
                                opacity: 0,
                                scale: 0.2,
                                y: p.y,
                                x: p.x,
                            }}
                            animate={{
                                opacity: [0, 1, 1, 0],
                                scale: [0.5, 2, 1.8, 1.2],
                                y: p.y - 250,
                                x: p.x + (i % 2 === 0 ? 100 : -40),
                                rotate: i % 2 === 0 ? 20 : -20,
                            }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="absolute text-5xl sm:text-7xl drop-shadow-xl"
                        >
                            {p.emoji}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Counter Badge */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40">
                <AnimatePresence>
                    {selected.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="
                                backdrop-blur-md 
                                border-[1.59px] 
                                px-8 sm:px-12 py-3 sm:py-[18px] 
                                rounded-full 
                                shadow-xl 
                                text-lg sm:text-xl 
                                font-bold 
                                transition-colors 
                                bg-white/80 dark:bg-neutral-900/80 
                                border-neutral-200 dark:border-neutral-700 
                                text-neutral-600 dark:text-neutral-100 
                                whitespace-nowrap
                            "
                        >
                            {selected.length} Interests
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};