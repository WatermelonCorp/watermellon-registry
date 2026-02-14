"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
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
                                   bg-[#F4F4F9] dark:bg-zinc-900"
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
                                                    bg-white border-[#E3E2E7] dark:bg-zinc-800 dark:border-white/10">
                                        <img
                                            src={pastedData.image}
                                            alt={pastedData.name}
                                            className="w-9 h-9 rounded-full shadow-sm border object-cover mr-3 
                                                       border-[#E3E2E7] dark:border-white/10"
                                        />
                                        <span className="text-[15px] sm:text-[16px] font-bold tracking-tight mr-3 transition-colors truncate max-w-30 sm:max-w-none 
                                                       text-[#68676C] dark:text-zinc-200">
                                            {pastedData.name}
                                        </span>
                                        <button 
                                            title='remove'
                                            onClick={handleClear}
                                            className="w-5 h-5 bg-[#AEACB8] rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                                        >
                                            <X size={14} strokeWidth={3} />
                                        </button>
                                    </div>

                                    <button 
                                        title='continue'
                                        onClick={() => onContinue?.(pastedData)}
                                        className="ml-2 w-11 h-11 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all 
                                                   bg-zinc-900 text-white dark:bg-white dark:text-black"
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
                                                   text-[#26262A] placeholder:text-[#B3B3B8] dark:text-white dark:placeholder:text-zinc-600"
                                    />
                                    <button 
                                        type='button'
                                        onClick={handlePaste}
                                        className="bg-[#016FFE] hover:bg-blue-600 text-white px-5 sm:px-7 py-2.5 rounded-full text-[14px] sm:text-[15px] font-bold tracking-tight shadow-md active:scale-95 transition-all whitespace-nowrap"
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