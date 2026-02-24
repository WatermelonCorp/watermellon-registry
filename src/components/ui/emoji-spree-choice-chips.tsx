"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface InterestItem {
    id: string;
    label: string;
    emoji: string;
}

interface Particle {
    id: string;
    emoji: string;
    xOffset: number;
    rotate: number;
}

interface Props {
    interests: InterestItem[];
    onChange?: (selectedIds: string[]) => void;
}

export const EmojiSpreeChips: React.FC<Props> = ({
    interests,
    onChange,
}) => {
    const [selected, setSelected] = useState<string[]>([]);
    const [particles, setParticles] = useState<Particle[]>([]);

    const spawnParticles = (emoji: string) => {
        const newParticles: Particle[] = Array.from({ length: 3 }).map(() => ({
            id: crypto.randomUUID(),
            emoji,
            xOffset: (Math.random() - 0.5) * 180,
            rotate: (Math.random() - 0.5) * 40,
        }));

        setParticles(newParticles);

        setTimeout(() => {
            setParticles([]);
        }, 1600);
    };

    const toggleInterest = (id: string, emoji: string) => {
        setSelected((prev) => {
            const exists = prev.includes(id);
            const updated = exists
                ? prev.filter((i) => i !== id)
                : [...prev, id];

            onChange?.(updated);

            if (!exists) spawnParticles(emoji);

            return updated;
        });
    };

    return (
        <div className="w-full max-w-4xl min-h-[600px] relative overflow-hidden py-10 isolate">
            <h2 className="text-3xl font-bold mb-8 px-6">Interests</h2>

            {/* Chips */}
            <div className="flex flex-wrap gap-4 px-6 justify-center relative z-20">
                {interests.map((item) => {
                    const isSelected = selected.includes(item.id);

                    return (
                        <motion.button
                            key={item.id}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 260, damping: 18 }}
                            onClick={() => toggleInterest(item.id, item.emoji)}
                            className={`flex items-center gap-3 px-5 py-2 rounded-full border text-lg font-semibold
                ${isSelected
                                    ? "bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600"
                                    : "bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
                                }`}
                        >
                            <span>{item.emoji}</span>
                            <span>{item.label}</span>
                        </motion.button>
                    );
                })}
            </div>

            {/* PARTICLES */}
            <div className="absolute inset-0 pointer-events-none">
                <AnimatePresence>
                    {particles.map((p, index) => (
                        <FloatingEmoji
                            key={p.id}
                            emoji={p.emoji}
                            delay={index * 0.08}
                            xOffset={p.xOffset}
                            rotate={p.rotate}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* Selected Pill */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
                <AnimatePresence>
                    {selected.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 40 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 20,
                            }}
                            className="relative border px-10 py-4 rounded-full shadow-lg text-xl font-bold bg-white dark:bg-neutral-900"
                        >
                            {selected.length} Interests
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

/* Floating Emoji Component */
const FloatingEmoji = ({
    emoji,
    delay,
    xOffset,
    rotate,
}: {
    emoji: string;
    delay: number;
    xOffset: number;
    rotate: number;
}) => {
    const [phase, setPhase] = useState<"up" | "down">("up");

    return (
        <motion.div
            initial={{ y: 0, x: 0, opacity: 0, scale: 0.6, rotate: 0 }}
            animate={{
                y: [0, -240, 0],
                x: [0, xOffset, xOffset * 0.4],
                opacity: [0, 1, 0.9],
                scale: [0.6, 1.8, 1],
                rotate: [0, rotate, rotate * 0.5],
            }}
            transition={{
                duration: 1.4,
                ease: "easeInOut",
                delay,
            }}
            onUpdate={(latest) => {
                if (typeof latest.y === "number") {
                    if (latest.y < -130) {
                        setPhase("up");
                    } else {
                        setPhase("down");
                    }
                }
            }}
            className={`absolute left-1/2 bottom-20 text-6xl -translate-x-1/2 ${phase === "up" ? "z-30" : "z-10"
                }`}
        >
            {emoji}
        </motion.div>
    );
};