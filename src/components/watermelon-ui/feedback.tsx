import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { X } from 'lucide-react';
import { Navigation03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { FaRegThumbsUp, FaThumbsUp, FaRegThumbsDown, FaThumbsDown } from "react-icons/fa6";

interface FeedbackComponentProps {
    onSubmit?: (data: { rating: 'up' | 'down'; feedback: string }) => void;
}

const SPRING_CONFIG = {
    type: "spring" as const,
    stiffness: 350,
    damping: 30,
};

export const FeedbackComponent: React.FC<FeedbackComponentProps> = ({ onSubmit }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeRating, setActiveRating] = useState<'up' | 'down' | null>(null);
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOpen = (type: 'up' | 'down') => {
        setActiveRating(type);
        setTimeout(() => {
            setIsOpen(true);
        }, 150);
    };

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            setActiveRating(null);
            setFeedback('');
        }, 400);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeRating) return;
        setIsSubmitting(true);
        setTimeout(() => {
            onSubmit?.({ rating: activeRating, feedback });
            setIsSubmitting(false);
            handleClose();
        }, 800);
    };

    return (
        <div className="flex items-center justify-center w-full min-h-[400px] relative px-4">
            <LayoutGroup id="feedback-group">
                <AnimatePresence mode="wait">
                    {!isOpen ? (
                        <motion.div
                            key="initial-buttons"
                            className="flex gap-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, transition: { duration: 0.1 } }}
                        >
                            {(['up', 'down'] as const).map((type) => (
                                <motion.button
                                    key={type}
                                    layoutId={activeRating === type ? "feedback-card" : `button-${type}`}
                                    onClick={() => handleOpen(type)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative w-16 h-16 rounded-[22px] flex items-center justify-center bg-neutral-800 shadow-xl overflow-visible"
                                >
                                    <div className="relative z-10">
                                        {type === 'up' ? (
                                            activeRating === 'up' ?
                                                <FaThumbsUp className="w-6 h-6 text-white" /> :
                                                <FaRegThumbsUp className="w-6 h-6 text-white" />
                                        ) : (
                                            activeRating === 'down' ?
                                                <FaThumbsDown className="w-6 h-6 text-white" /> :
                                                <FaRegThumbsDown className="w-6 h-6 text-white" />
                                        )}
                                    </div>
                                </motion.button>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="modal"
                            layoutId="feedback-card"
                            className="relative w-xs sm:w-sm bg-white dark:bg-neutral-900 rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 shadow-2xl border border-neutral-200 dark:border-neutral-800 z-50 overflow-hidden"
                            transition={SPRING_CONFIG}
                        >
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClose();
                                }}
                                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 sm:p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:scale-110 active:scale-90 transition-all"
                            >
                                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={3} />
                            </motion.button>

                            <div className="relative pt-2">
                                <motion.h2
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1, ...SPRING_CONFIG }}
                                    className="text-[20px] sm:text-[24px] font-bold text-neutral-900 dark:text-white mb-1.5 sm:mb-2 leading-tight pr-8"
                                >
                                    Share Feedback
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.15, ...SPRING_CONFIG }}
                                    className="text-neutral-500 dark:text-neutral-400 mb-5 sm:mb-6 text-[14px] sm:text-[16px] leading-relaxed pr-6"
                                >
                                    {activeRating === 'up' ? "Let us know what you liked most?" : "What can we improve?"}
                                </motion.p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <textarea
                                            autoFocus
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            placeholder="Type in your feedback (optional)"
                                            className="w-full h-32 p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none resize-none transition-all text-neutral-800 dark:text-neutral-200"
                                        />
                                    </motion.div>

                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.25 }}
                                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold shadow-lg hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all"
                                    >
                                        <HugeiconsIcon icon={Navigation03Icon} size={18} className="fill-current" />
                                        <span>{isSubmitting ? 'Sending...' : 'Send Now'}</span>
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </LayoutGroup>
        </div>
    );
};