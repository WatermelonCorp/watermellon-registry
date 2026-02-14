import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

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
}

export const FeatureTour: React.FC<FeatureTourProps> = ({
    steps,
    onClose,
    onLearnMore,
    className = ""
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const goToStep = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' && currentIndex < steps.length - 1) {
                goToStep(currentIndex + 1);
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                goToStep(currentIndex - 1);
            } else if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, steps.length, onClose]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95,
            filter: 'blur(10px)',
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95,
            filter: 'blur(10px)',
        }),
    };

    const currentStep = steps[currentIndex];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full max-w-[400px] sm:aspect-[1/1.3] min-h-[520px] sm:min-h-0 rounded-[34px] border-[1.2px] shadow-sm p-6 sm:p-8 flex flex-col items-center overflow-hidden transition-colors duration-300 bg-[#FEFEFE] border-[#F0EFF6] dark:bg-[#151517] dark:border-white/5 [--shining-gradient:linear-gradient(90deg,transparent_0%,transparent_40%,rgba(255,255,255,1)_50%,transparent_60%,transparent_100%)] dark:[--shining-gradient:linear-gradient(90deg,transparent_0%,transparent_40%,rgba(255,255,255,0.8)_50%,transparent_60%,transparent_100%)] ${className}`}
        >
            <button title='close'
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full transition-colors group z-50 bg-[#ADACB8] hover:bg-[#ADACB8]/70 dark:bg-[#2C2C2E] dark:hover:bg-[#3A3A3C]"
            >
                <X size={20} strokeWidth={3} className="text-[#FEFDFF]" />
            </button>

            <div className="flex-1 w-full flex flex-col items-center justify-center relative">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.4 },
                            scale: { duration: 0.4 },
                            filter: { duration: 0.4 }
                        }}
                        className="w-full flex flex-col items-center text-center"
                    >
                        <div className=" flex items-center justify-center min-h-[100px]">
                            <motion.div
                                initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
                                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                                className="dark:text-white"
                            >
                                {currentStep.icon}
                            </motion.div>
                        </div>

                        <div className="space-y-2 px-4 mt-8 sm:mt-12">
                            {/* Shining Title Animation */}
                            <motion.h2
                                initial={{ backgroundPosition: '-200% 0' }}
                                animate={{ backgroundPosition: '200% 0' }}
                                transition={{
                                    delay: 0.5,
                                    duration: 2,
                                    ease: "easeInOut",
                                    repeat: 0
                                }}
                                style={{
                                    backgroundImage: 'var(--shining-gradient)',
                                    backgroundSize: '200% 100%',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                }}
                                className="text-[26px] font-bold transition-colors text-transparent bg-[#252525] dark:bg-white"
                            >
                                {currentStep.title}
                            </motion.h2>

                            <p className="text-[20px] font-medium leading-tight transition-colors text-[#98979A] dark:text-[#7C7C80]">
                                {currentStep.description}
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onLearnMore?.(currentStep)}
                            className="mt-6 sm:mt-10 px-10 py-3 rounded-full font-semibold text-lg transition-colors bg-[#F1F1F4] text-[#4F4F5A] hover:bg-[#EAEAEF] dark:bg-[#2C2C2E] dark:text-white dark:hover:bg-[#3A3A3C]"
                        >
                            Learn More
                        </motion.button>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-6 sm:mt-8 flex items-center gap-3">
                {steps.map((_, index) => (
                    <button title='page'
                        key={index}
                        onClick={() => goToStep(index)}
                        className="relative h-2 group focus:outline-none"
                    >
                        <div
                            className={`h-[12px] rounded-full transition-all duration-500 w-[12px] ease-out ${index === currentIndex
                                ? 'bg-gray-400 dark:bg-gray-100'
                                : 'bg-gray-200 group-hover:bg-gray-300 dark:bg-[#2C2C2E]'
                                }`}
                        />
                    </button>
                ))}
            </div>

            <div className="absolute inset-0 pointer-events-none rounded-[40px] bg-linear-to-br from-white/20 via-transparent to-black/2 dark:from-white/5 dark:via-transparent dark:to-black/40" />
        </motion.div>
    );
};