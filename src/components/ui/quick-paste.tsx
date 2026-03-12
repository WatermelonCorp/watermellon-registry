"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';

export interface PasteData {
    name: string;
    image: string;
}

interface QuickPasteProps {
    onPaste: () => PasteData;
    onClear?: () => void;
    onContinue?: (data: PasteData) => void;
    placeholder?: string;
    className?: string;
}

export const QuickPaste: React.FC<QuickPasteProps> = ({
    onPaste,
    onClear,
    onContinue,
    placeholder = "Email Address",
    className = ""
}) => {
    const [pastedData, setPastedData] = useState<PasteData | null>(null);
    const [inputValue, setInputValue] = useState("");

    const handlePaste = () => {
        const data = onPaste();
        setPastedData(data);
    };

    const handleClear = () => {
        setPastedData(null);
        setInputValue("");
        onClear?.();
    };

    return (
        <div className={`w-full flex flex-col items-center justify-center p-4 antialiased select-none ${className}`}>
            <div className="w-full max-w-100">
                <LayoutGroup>
                    <motion.div
                        layout
                        className="rounded-full p-1.5 flex items-center min-h-16 shadow-sm transition-colors duration-300 
                                   bg-neutral-100 dark:bg-neutral-900"
                    >
                        <AnimatePresence mode="popLayout">
                            {pastedData ? (
                                <motion.div
                                    key="pasted"
                                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 5 }}
                                    className="flex items-center justify-between w-full pr-1"
                                >
                                    <div className="flex items-center py-1.5 pl-1.5 pr-4 rounded-full border shadow-sm transition-colors 
                                                    bg-white border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
                                        <img
                                            src={pastedData.image}
                                            alt={pastedData.name}
                                            className="w-9 h-9 rounded-full shadow-sm border object-cover mr-3 
                                                       border-neutral-200 dark:border-neutral-700"
                                        />
                                        <span className="text-[15px] sm:text-[16px] font-bold tracking-tight mr-3 transition-colors truncate max-w-30 sm:max-w-none 
                                                       text-neutral-600 dark:text-neutral-200">
                                            {pastedData.name}
                                        </span>
                                        <button
                                            title='remove'
                                            onClick={handleClear}
                                            className="w-5 h-5 bg-neutral-400 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                                        >
                                            <X size={14} strokeWidth={3} />
                                        </button>
                                    </div>

                                    <button
                                        title='continue'
                                        onClick={() => onContinue?.(pastedData)}
                                        className="ml-2 w-11 h-11 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all 
                                                   bg-neutral-900 text-white dark:bg-white dark:text-black"
                                    >
                                        <ArrowRight size={22} strokeWidth={2.5} />
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="input"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center justify-between w-full pl-4 pr-1"
                                >
                                    <input
                                        type="text"
                                        placeholder={placeholder}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className="bg-transparent border-none outline-none text-[16px] sm:text-[18px] font-semibold w-full mr-2 transition-colors 
                                                   text-neutral-900 placeholder:text-neutral-400 dark:text-white dark:placeholder:text-neutral-600"
                                    />
                                    <button
                                        type='button'
                                        onClick={handlePaste}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-7 py-2.5 rounded-full text-[14px] sm:text-[15px] font-bold tracking-tight shadow-md active:scale-95 transition-all whitespace-nowrap"
                                    >
                                        Paste
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </LayoutGroup>
            </div>
        </div>
    );
};