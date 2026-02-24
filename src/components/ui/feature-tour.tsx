"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    motion,
    AnimatePresence,
    useReducedMotion,
    type Transition,
} from "motion/react";
import { X } from "lucide-react";

export interface TourStep {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}

interface FeatureTourProps {
    steps: TourStep[];
    onClose: () => void;
    onLearnMore?: (step: TourStep) => void;
    className?: string;
    loop?: boolean;
    closeOnBackdrop?: boolean;
}

/* ─────────────────────────
   Typed Motion Curves
───────────────────────── */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const FAST_OUT = [0.22, 1, 0.36, 1] as const;

const SPRING_ICON: Transition = {
    type: "spring",
    stiffness: 420,
    damping: 34,
    mass: 0.7,
};

const SPRING_BG: Transition = {
    type: "spring",
    stiffness: 340,
    damping: 30,
    mass: 0.8,
};

export const FeatureTour: React.FC<FeatureTourProps> = ({
    steps,
    onClose,
    onLearnMore,
    className = "",
    loop = false,
    closeOnBackdrop = true,
}) => {
    const shouldReduceMotion = useReducedMotion();
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!steps || steps.length === 0) return null;

    const goToStep = (index: number) => {
        if (index === currentIndex) return;
        setCurrentIndex(index);
    };

    const goNext = () => {
        setCurrentIndex((prev) =>
            prev === steps.length - 1 ? (loop ? 0 : prev) : prev + 1
        );
    };

    const goPrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? (loop ? steps.length - 1 : prev) : prev - 1
        );
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [steps.length, loop, onClose]);

    useEffect(() => {
        const btn = containerRef.current?.querySelector("button");
        btn?.focus();
    }, []);

    const currentStep = steps[currentIndex];

    return (
        <div
            className="flex items-center justify-center"
            onClick={closeOnBackdrop ? onClose : undefined}
            role="dialog"
            aria-modal="true"
        >
            <motion.div
                ref={containerRef}
                onClick={(e) => e.stopPropagation()}
                initial={{
                    opacity: 0,
                    scale: 0.96,
                    y: 16,
                    filter: "blur(4px)",
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    filter: "blur(0px)",
                }}
                exit={{
                    opacity: 0,
                    scale: 0.98,
                    y: 12,
                }}
                transition={{
                    duration: 0.18,
                    ease: EASE_OUT,
                }}
                className={`relative w-full max-w-[400px] sm:aspect-[1/1.3] min-h-[520px] sm:min-h-0 rounded-[34px] border shadow-sm p-6 sm:p-8 flex flex-col items-center overflow-hidden transition-colors duration-300 bg-white border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 ${className}`}
            >
                <button
                    onClick={onClose}
                    aria-label="Close tour"
                    className="absolute top-6 right-6 p-2 rounded-full transition-colors z-50 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                >
                    <X
                        size={20}
                        strokeWidth={3}
                        className="text-white dark:text-neutral-200"
                    />
                </button>

                <div className="flex-1 w-full flex flex-col items-center justify-center relative">

                    {/* Icon Morph */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep.id}
                            initial={{
                                opacity: 0,
                                scale: 0.92,
                                y: 8,
                                filter: "blur(3px)",
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                filter: "blur(0px)",
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.92,
                                y: -6,
                                filter: "blur(3px)",
                            }}
                            transition={{
                                duration: 0.16,
                                ease: FAST_OUT,
                            }}
                            className="relative flex items-center justify-center min-h-[120px]"
                        >
                            <motion.div
                                layoutId="tour-icon-bg"
                                transition={SPRING_BG}
                                className="absolute w-24 h-24 rounded-3xl
                           bg-neutral-100 dark:bg-neutral-800
                           shadow-inner dark:shadow-black/40"
                            />

                            <motion.div
                                layoutId="tour-icon"
                                transition={SPRING_ICON}
                                className="relative text-neutral-700 dark:text-neutral-200
                           drop-shadow-[0_4px_12px_rgba(0,0,0,0.12)]
                           dark:drop-shadow-[0_4px_16px_rgba(255,255,255,0.12)]"
                            >
                                {currentStep.icon}
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Content Slide */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`content-${currentStep.id}`}
                            initial={{
                                opacity: 0,
                                y: shouldReduceMotion ? 0 : 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: shouldReduceMotion ? 0 : -14,
                            }}
                            transition={{
                                duration: 0.16,
                                ease: EASE_OUT,
                            }}
                            className="space-y-2 px-4 mt-8 sm:mt-12 text-center"
                        >
                            <h2 className="text-[26px] font-bold text-neutral-900 dark:text-white">
                                {currentStep.title}
                            </h2>

                            <p className="text-[20px] font-medium leading-tight text-neutral-500 dark:text-neutral-400">
                                {currentStep.description}
                            </p>

                            {onLearnMore && (
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30,
                                    }}
                                    onClick={() => onLearnMore(currentStep)}
                                    className="mt-6 sm:mt-10 px-10 py-3 rounded-full font-semibold text-lg transition-colors bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                                >
                                    Learn More
                                </motion.button>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dots */}
                <div className="mt-6 sm:mt-8 flex items-center gap-3" role="tablist">
                    {steps.map((step, index) => (
                        <button
                            key={step.id}
                            role="tab"
                            aria-selected={index === currentIndex}
                            aria-label={`Go to ${step.title}`}
                            onClick={() => goToStep(index)}
                            className="relative h-2 focus:outline-none"
                        >
                            <motion.div
                                animate={{
                                    scale: index === currentIndex ? 1.2 : 1,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                                className={`h-[12px] w-[12px] rounded-full ${index === currentIndex
                                    ? "bg-neutral-500 dark:bg-neutral-200"
                                    : "bg-neutral-200 dark:bg-neutral-700"
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                <div className="absolute inset-0 pointer-events-none rounded-[40px] bg-linear-to-br from-white/20 via-transparent to-black/5 dark:from-white/5 dark:via-transparent dark:to-black/40" />
            </motion.div>
        </div>
    );
};