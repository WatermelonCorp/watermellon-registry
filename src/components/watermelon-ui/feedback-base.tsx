import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { X, Sparkle } from 'lucide-react';
import { Navigation03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
} from 'react-icons/fa6';

interface FeedbackComponentProps {
  onSubmit?: (data: { rating: 'up' | 'down'; feedback: string }) => void;
}

const SPRING_CONFIG = {
  ease: 'easeInOut' as const,
  duration: 0.3,
};

export const FeedbackComponent: React.FC<FeedbackComponentProps> = ({
  onSubmit,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRating, setActiveRating] = useState<'up' | 'down' | null>(null);
  const [animatingIcon, setAnimatingIcon] = useState<'up' | 'down' | null>(
    null,
  );
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpen = (type: 'up' | 'down') => {
    if (animatingIcon) return; // Prevent double clicks during animation
    setActiveRating(type);
    setAnimatingIcon(type);

    // Wait for the thumb pop animation to finish before expanding the card
    setTimeout(() => {
      setIsOpen(true);
      setAnimatingIcon(null);
    }, 500);
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
    <div className="theme-injected relative flex min-h-100 w-full items-center justify-center px-4 font-sans">
      <LayoutGroup id="feedback-group">
        <AnimatePresence mode="popLayout">
          {!isOpen ? (
            <motion.div
              key="initial-buttons"
              className="flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
              {(['up', 'down'] as const).map((type) => (
                <motion.button
                  key={type}
                  layoutId={
                    activeRating === type ? 'feedback-card' : `button-${type}`
                  }
                  onClick={() => handleOpen(type)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={SPRING_CONFIG}
                  className="relative flex h-16 w-16 items-center justify-center overflow-visible rounded-2xl bg-primary text-primary-foreground shadow-xl"
                >
                  <AnimatePresence>
                    {animatingIcon === type && (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        {[...Array(6)].map((_, i) => {
                          const angle = (i * 60 * Math.PI) / 180;
                          const distance = 45;
                          return (
                            <motion.div
                              key={`sparkle-${i}`}
                              className="absolute text-primary-foreground"
                              initial={{
                                scale: 0,
                                x: 0,
                                y: 0,
                                opacity: 1,
                                rotate: 0,
                              }}
                              animate={{
                                scale: [0, 1.2, 0],
                                x: Math.cos(angle) * distance,
                                y: Math.sin(angle) * distance,
                                opacity: [1, 1, 0],
                                rotate: [0, 90],
                              }}
                              transition={{ duration: 0.5, ease: 'easeOut' }}
                            >
                              <Sparkle
                                className="size-3"
                                fill="currentColor"
                              />
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    className="relative z-10"
                    animate={
                      animatingIcon === type
                        ? {
                            scale: [1, 1.8, 1],
                            rotate: [
                              0,
                              type === 'up' ? -35 : 35,
                              type === 'down' ? 35 : -35,
                              0,
                            ],
                            y: [0, -4, 0],
                          }
                        : { scale: 1, rotate: 0, y: 0 }
                    }
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    {type === 'up' ? (
                      activeRating === 'up' ? (
                        <FaThumbsUp className="h-6 w-6 text-primary-foreground" />
                      ) : (
                        <FaRegThumbsUp className="h-6 w-6 text-primary-foreground" />
                      )
                    ) : activeRating === 'down' ? (
                      <FaThumbsDown className="h-6 w-6 text-primary-foreground" />
                    ) : (
                      <FaRegThumbsDown className="h-6 w-6 text-primary-foreground" />
                    )}
                  </motion.div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="modal"
              layoutId="feedback-card"
              className="relative z-50 w-xs overflow-hidden rounded-2xl border border-border bg-card p-5 font-sans shadow-2xl sm:w-sm sm:rounded-3xl sm:p-8"
              transition={SPRING_CONFIG}
            >
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                className="absolute top-4 right-4 rounded-2xl bg-muted p-1.5 text-muted-foreground transition-all hover:scale-110 hover:text-foreground active:scale-90 sm:top-5 sm:right-5 sm:p-2"
              >
                <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={3} />
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative pt-2"
              >
                <h2 className="mb-1.5 pr-8 font-sans text-[20px] leading-tight font-bold text-foreground sm:mb-2 sm:text-[24px]">
                  Share Feedback
                </h2>

                <p className="mb-5 pr-6 font-sans text-[14px] leading-relaxed text-muted-foreground sm:mb-6 sm:text-[16px]">
                  {activeRating === 'up'
                    ? 'Let us know what you liked most?'
                    : 'What can we improve?'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <textarea
                      autoFocus
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Type in your feedback (optional)"
                      className="h-32 w-full resize-none rounded-xl border border-border bg-muted p-4 font-sans text-foreground transition-all outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-sans font-bold text-primary-foreground shadow-lg transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                  >
                    <HugeiconsIcon
                      icon={Navigation03Icon}
                      size={18}
                      className="fill-current"
                    />
                    <span>{isSubmitting ? 'Sending...' : 'Send Now'}</span>
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
};
