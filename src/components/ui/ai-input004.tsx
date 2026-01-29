import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Mic, ArrowUp } from 'lucide-react';

type AppState = 'IDLE' | 'GENERATING' | 'RESULT';

interface AiInputProps {
    onSend: (text: string) => void | Promise<void>;
    placeholder?: string;
    disabled?: boolean;
    appState?: AppState;
}

export const AiInput004: React.FC<AiInputProps> = ({
    onSend,
    placeholder = 'Ask anything...',
    disabled = false,
    appState = 'IDLE',
}) => {
    const [value, setValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const hasContent = value.trim().length > 0;

    /* Auto resize */
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height =
                Math.min(textareaRef.current.scrollHeight, 200) + 'px';
        }
    }, [value]);

    const handleSubmit = async () => {
        if (!value.trim() || disabled) return;
        const text = value.trim();
        setValue('');
        await onSend(text);
    };

    return (
        <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/*  bg Moving Gradient */}
            <motion.div
                className="absolute inset-0"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                style={{
                    background:
                        'radial-gradient(circle at 30% 30%, #e9d5ff, transparent 40%), radial-gradient(circle at 70% 60%, #bfdbfe, transparent 40%)',
                    backgroundSize: '200% 200%',
                }}
            />

            {/*  Generating Text */}
            <AnimatePresence>
                {appState === 'GENERATING' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute text-xl font-semibold tracking-wide"
                    >
                        <motion.span
                            className="bg-gradient-to-r from-[#A29EC6] via-white to-[#A29EC6]
                   bg-[length:200%_100%] bg-clip-text text-transparent"
                            initial={{ backgroundPositionX: '0%' }}
                            animate={{ backgroundPositionX: '200%' }}
                            transition={{
                                duration: 1.6,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            Generating Your{' '}
                            <span className="font-medium">$Billion Dollar</span> saas...
                        </motion.span>
                    </motion.div>
                )}
            </AnimatePresence>



            {/*  INPUT  */}
            <motion.div
                layout
                initial={false}
                animate={{
                    y: appState === 'GENERATING' ? -80 : 0,
                    opacity: appState === 'GENERATING' ? 0 : 1,
                    pointerEvents: appState === 'GENERATING' ? 'none' : 'auto',
                    borderRadius: 24,
                    padding: hasContent ? '16px 14px' : '10px',
                }}
                transition={{
                    y: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.25 },
                    borderRadius: { duration: 0.35 },
                }}
                className="relative z-10 w-[480px] max-w-[95vw] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/40"
            >
                <div
                    className={`flex ${hasContent ? 'flex-col gap-3' : 'items-center'
                        }`}
                >
                    {/* Top Row Container */}
                    <div className="flex items-center w-full px-2">

                        {/* Left side*/}
                        {!hasContent && (
                            <div className="pr-2">
                                <Plus className="w-5 h-5 text-gray-400 cursor-pointer" />
                            </div>
                        )}

                        {/* Center: Textarea  */}
                        <textarea
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit();
                                }
                            }}
                            placeholder={placeholder}
                            rows={1}
                            disabled={disabled}
                            className="flex-1 bg-transparent outline-none resize-none text-[16px] text-gray-700 placeholder-gray-400 py-2"
                        />

                        {/* Right Side */}
                        <div className="flex items-center gap-3 ml-auto pl-2">

                            {!hasContent && (
                                <>
                                    <Mic className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />


                                    <motion.button
                                        onClick={handleSubmit}
                                        disabled={disabled}
                                        initial={{ opacity: 1 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-black opacity-80"
                                    >
                                        <ArrowUp className="w-5 h-5" />
                                    </motion.button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <AnimatePresence>
                        {hasContent && (
                            <motion.div
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }}
                                className="flex items-center justify-between"
                            >
                                <Plus className="w-5 h-5 text-gray-400" />
                                <div className="flex items-center gap-3">
                                    <Mic className="w-5 h-5 text-gray-400" />
                                    <motion.button
                                        onClick={handleSubmit}
                                        animate={{ rotate: 90 }}
                                        className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white"
                                    >
                                        <ArrowUp className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};
