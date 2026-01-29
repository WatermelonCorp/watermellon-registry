import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ThumbsUp } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';

export interface StackItem {
  id: string;
  title: string;
  type: 'form' | 'steps';
  steps?: { icon: any; text: string }[];
  buttonText?: string;
}

interface DialogStackProps {
  stack: StackItem[];
  trigger: {
    label: string;
    icon: any;
  };
}

export const DialogStack: React.FC<DialogStackProps> = ({ stack, trigger }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex < stack.length - 1) setActiveIndex(prev => prev + 1);
  };

  const handleBack = () => {
    if (activeIndex > 0) setActiveIndex(prev => prev - 1);
  };

  const resetAndClose = () => {
    setIsOpen(false);
    setTimeout(() => setActiveIndex(0), 300);
  };

  const handleHeaderClose = () => {
    if (activeIndex > 0) {
      handleBack(); 
    } else {
      resetAndClose();
    }
  };

  return (
    <div className="min-h-screen dark:bg-[#0A0A0B] bg-gray-50 flex flex-col items-center justify-center transition-colors duration-500">
      
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="px-8 py-4 flex items-center gap-3 border-[1.7px] rounded-full shadow-sm font-semibold hover:shadow-lg transition-all text-[20px] dark:bg-[#161618] dark:border-[#27272A] dark:text-white bg-white border-[#F2F2F2] text-[#040306]"
      >
        <span className="dark:text-[#FAFAFA] text-[#040306]">
          <HugeiconsIcon icon={trigger.icon} size={28} />
        </span>
        <span>{trigger.label}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetAndClose}
              className="absolute inset-0 backdrop-blur-[2px] dark:bg-black/40 bg-white/10"
            />

            <div className="relative w-full max-w-[440px] h-[500px] flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                {stack.map((item, index) => {
                  const isUnder = index < activeIndex;
                  if (index > activeIndex) return null;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ y: 50, opacity: 0, scale: 0.95 }}
                      animate={{
                        y: isUnder ? -35 : 0,
                        scale: isUnder ? 0.94 : 1, 
                        opacity: isUnder ? 0.5 : 1,
                        zIndex: index,
                      }}
                      exit={{ y: 50, opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      className="absolute inset-0 dark:bg-[#161618] bg-white rounded-[20px] shadow-xl border-[1.6px] dark:border-[#27272A] border-[#E9E9EB] flex flex-col overflow-hidden h-fit transition-colors"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between dark:bg-[#1C1C1F] bg-[#FAFAFC] border-b-[1.5px] dark:border-[#2D2D30] border-[#E8E8ED] px-5 py-2.5 transition-colors">
                        <h3 className="text-lg font-medium dark:text-[#A1A1AA] text-[#7D7D84]">{item.title}</h3>
                        <button title='close' onClick={handleHeaderClose} className="p-1 rounded-full transition-colors dark:hover:bg-white/5 hover:bg-gray-100">
                          <X size={22} className="dark:text-[#A1A1AA] text-[#7F7E85]" />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="flex-1 px-5 pb-8 pt-4">
                        {item.type === 'form' ? (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-base font-normal dark:text-[#A1A1AA] text-[#535357]">Email Address</label>
                              <input title='email' type="text" className="w-full p-4 py-3 rounded-xl border-[1.5px] focus:outline-none transition-colors dark:border-[#333338] border-[#E6E6E6] dark:bg-[#1F1F23] bg-[#fefefe] dark:text-white text-black" />
                              <p className="text-[14px] text-[#9A999C]">Use commas to add multiple emails.</p>
                            </div>
                            <div className="space-y-2">
                              <label className="text-base font-normal dark:text-[#A1A1AA] text-[#535357]">Message</label>
                              <textarea title='message' rows={4} className="w-full p-4 py-3 rounded-xl border-[1.5px] focus:outline-none transition-colors dark:border-[#333338] border-[#E6E6E6] dark:bg-[#1F1F23] bg-[#fefefe] dark:text-white text-black" />
                            </div>
                            <button className="w-full dark:bg-[#fefefe] dark:text-[#000002] bg-[#000002] text-[#fefefe] py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors">
                              {item.buttonText || 'Send'} <ArrowRight size={18} />
                            </button>
                            <button onClick={handleNext} className="w-full font-medium text-[15px] dark:text-[#71717A] text-[#535357]">How it works?</button>
                          </div>
                        ) : (
                          <div className="space-y-8">
                            <h4 className="text-2xl font-bold dark:text-[#FAFAFA] text-[#1a1a1a]">3 easy steps</h4>
                            <div className="space-y-6">
                              {item.steps?.map((step, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                  <div className="w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 transition-colors dark:bg-[#242427] dark:border-[#333338] bg-[#F4F4F4] border-gray-100">
                                    <span className="dark:text-[#E4E4E7] text-[#2b2b2b]">
                                      <HugeiconsIcon icon={step.icon} size={27} strokeWidth={1.5} />
                                    </span>
                                  </div>
                                  <p className="text-base leading-snug pt-1 dark:text-[#D4D4D8] text-[#3C3B40]">{step.text}</p> 
                                </div>
                              ))}
                            </div>
                            <button onClick={handleBack} className="w-full dark:bg-[#fefefe] dark:text-[#000002] bg-[#000002] text-[#fefefe] py-4 rounded-2xl text-lg font-medium flex items-center justify-center gap-4 active:scale-[0.98] transition-all">
                              Got It <ThumbsUp size={22} />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};