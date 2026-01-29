import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { X, Sun, Moon } from 'lucide-react'; 
import { Navigation03Icon } from '@hugeicons/core-free-icons';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { HugeiconsIcon } from '@hugeicons/react';

interface FeedbackComponentProps {
    onSubmit?: (data: { rating: 'up' | 'down'; feedback: string }) => void;
}

const SPRING_CONFIG = {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
};

export const FeedbackComponent: React.FC<FeedbackComponentProps> = ({ onSubmit }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState<'up' | 'down' | null>(null);
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDark, setIsDark] = useState(false); // Theme state

    const handleOpen = (type: 'up' | 'down') => {
        setRating(type);
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            setRating(null);
            setFeedback('');
        }, 300);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!rating) return;
        setIsSubmitting(true);

        setTimeout(() => {
            onSubmit?.({ rating, feedback });
            setIsSubmitting(false);
            handleClose();
        }, 800);
    };

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0f0f12]' : 'bg-[#fcfcfc]'}`}>
            
            {/* Theme Toggle Button */}
            <button 
                onClick={() => setIsDark(!isDark)}
                className={`absolute top-8 p-3 rounded-full transition-all active:scale-90 z-50 ${isDark ? 'bg-[#1e1e24] text-yellow-400' : 'bg-white text-slate-600 shadow-md'}`}
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="relative flex items-center justify-center p-4 w-[380px] h-[370px]">
                <LayoutGroup>
                    <AnimatePresence mode="wait">
                        {!isOpen ? (
                            <motion.div
                                key="button-group"
                                className="flex gap-7"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={SPRING_CONFIG}
                            >
                                {['up', 'down'].map((type) => (
                                    <motion.button
                                        key={type}
                                        layoutId={type === 'up' ? "feedback-container" : "feedback-container-down"}
                                        onClick={() => handleOpen(type as 'up' | 'down')}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={SPRING_CONFIG}
                                        className="relative w-[64px] h-[64px] rounded-[18px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#626370] via-[#3d3e4a] to-[#23242b] shadow-[0_12px_30px_-5px_rgba(0,0,0,0.4),0_10px_20px_-5px_rgba(0,0,0,0.3)]"
                                    >
                                        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-white/20 z-10" />
                                        <div className="absolute inset-0 rounded-[22px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15)_0%,transparent_50%)]" />
                                        <div className="absolute inset-0 rounded-[22px] shadow-[inset_0_-4px_8px_rgba(0,0,0,0.5)]" />
                                        <div className="absolute inset-0 rounded-[22px] border border-white/5" />
                                        <motion.div
                                            layoutId={type === 'up' ? "icon-morph" : undefined}
                                            className="relative z-20"
                                            transition={SPRING_CONFIG}
                                        >
                                            {type === 'up' ? (
                                                <FiThumbsUp className="w-7 h-7 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]"/>
                                            ) : (
                                                <FiThumbsDown className="w-7 h-7 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]"/> 
                                            )}
                                        </motion.div>
                                    </motion.button>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="modal"
                                layoutId={rating === 'up' ? "feedback-container" : "feedback-container-down"}
                                className={`absolute inset-0 w-[380px] rounded-[40px] p-8 shadow-lg border-[1.7px] overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#1a1a1e] border-[#2d2d35]' : 'bg-white border-[#EEEEEE]'}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={SPRING_CONFIG}
                            >
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className={`absolute top-4 right-4 z-[60] p-1.5 rounded-full text-[#fefefe] transition-all active:scale-90 shadow-sm ${isDark ? 'bg-[#35353d] hover:bg-[#454550]' : 'bg-[#ACABB4] hover:bg-[#ACABB4]/80'}`}
                                    aria-label="Close"
                                >
                                    <X className="w-4 h-4 " strokeWidth={3} />
                                </button>

                                <div className="relative z-10 mb-4">
                                    <motion.div
                                        className="flex items-center gap-4 mb-3"
                                        initial={{ x: -15, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.1, ...SPRING_CONFIG }}
                                    >
                                        <h2 className={`text-[24px] font-semibold font-sans transition-colors ${isDark ? 'text-white' : 'text-black'}`}>
                                            Share Feedback
                                        </h2>
                                    </motion.div>
                                    <motion.p
                                        initial={{ y: 8, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.15 }}
                                        className={`text-[16px] leading-relaxed pr-8 transition-colors ${isDark ? 'text-gray-400' : 'text-[#949398]'}`}
                                    >
                                        Let us know what you liked most?
                                    </motion.p>
                                </div>

                                <form onSubmit={handleSubmit} className="relative z-10">
                                    <motion.div
                                        initial={{ y: 25, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2, ...SPRING_CONFIG }}
                                    >
                                        <textarea
                                            autoFocus
                                            placeholder="Type in your feedback (optional)"
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            className={`w-full h-32 p-5 border-[1.4px] rounded-xl resize-none focus:outline-none transition-all text-[16px] leading-relaxed ${isDark ? 'bg-[#121214] border-[#2d2d35] text-gray-200 placeholder:text-gray-600' : 'bg-[#FEFEFE] border-[#D9D8DD] text-slate-800 placeholder:text-[#B3B3B8]'}`}
                                        />
                                    </motion.div>

                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        initial={{ y: 25, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className={`mt-4 w-fit flex items-center justify-center gap-3 px-5 py-3 rounded-[10px] font-bold transition-all active:scale-[0.97] disabled:opacity-50 shadow-[0_10px_20px_rgba(0,0,0,0.15)] text-[14px] group overflow-hidden ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-[#000002] text-[#EEEDF4] hover:bg-[#000002]/90'}`}
                                    >
                                        <AnimatePresence mode="wait">
                                            {isSubmitting ? (
                                                <motion.div
                                                    key="loader"
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.5 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <HugeiconsIcon icon={Navigation03Icon} size={22} color={isDark ? "#000" : "#fefefe"} fill={isDark ? "#000" : "#fefefe"} strokeWidth={1.5} />
                                                    <span>Sending...</span>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="submit"
                                                    className="flex items-center gap-2.5"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                >
                                                    <HugeiconsIcon icon={Navigation03Icon} size={20} color={isDark ? "#000" : "#EEEDF4"} fill={isDark ? "#000" : "#fefefe"} strokeWidth={1.5} />
                                                    <span className="text-[15px]">Send Now</span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </LayoutGroup>
            </div>
        </div>
    );
};
