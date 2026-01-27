import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { X, ArrowRight, Sun, Moon } from 'lucide-react';

export interface PasteData {
    name: string;
    image: string;
}

interface QuickPasteProps {
    onPaste: () => PasteData;
    onClear: () => void;
    onContinue: (data: PasteData) => void;
    placeholder?: string;
}

export const QuickPaste: React.FC<QuickPasteProps> = ({
    onPaste,
    onClear,
    onContinue,
    placeholder = "Email Address"
}) => {
    const [pastedData, setPastedData] = useState<PasteData | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [isDark, setIsDark] = useState(false);

    const handlePaste = () => {
        const data = onPaste();
        setPastedData(data);
    };

    const handleClear = () => {
        setPastedData(null);
        setInputValue("");
        onClear();
    };

    return (
        <div className={`h-screen w-full flex flex-col items-center justify-center transition-colors duration-500 ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#FEFEFE]'}`}>

            {/* Theme Toggle */}
            <button
                onClick={() => setIsDark(!isDark)}
                className={`mb-8 p-3 rounded-full border transition-all active:scale-90 ${isDark ? 'bg-[#1C1C1E] border-white/10 text-yellow-400' : 'bg-white border-black/5 text-gray-400 shadow-sm'}`}
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="w-full max-w-[380px] antialiased select-none">
                <LayoutGroup>
                    <motion.div
                        layout
                        className={`rounded-full px-2.5 py-2 flex items-center min-h-[60px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-colors duration-300 ${isDark ? 'bg-[#1C1C1E]' : 'bg-[#F4F4F9]'
                            }`}
                    >
                        <AnimatePresence mode="popLayout">
                            {pastedData ? (
                                <motion.div
                                    key="pasted"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex items-center justify-between w-full pl-1"
                                >
                                    <div className={`flex items-center py-[5px] rounded-full p-1 pr-3 border shadow-md transition-colors ${isDark ? 'bg-[#2C2C2E] border-white/10' : 'bg-[#FEFEFE] border-[#E3E2E7]'
                                        }`}>
                                        <img
                                            src={pastedData.image}
                                            alt={pastedData.name}
                                            className={`w-9 h-9 rounded-full shadow-xs border object-cover mr-3 transition-colors ${isDark ? 'border-white/10' : 'border-[#E3E2E7]'
                                                }`}
                                        />
                                        <span className={`text-[16px] font-bold tracking-tight mr-2 transition-colors ${isDark ? 'text-gray-200' : 'text-[#68676C]'
                                            }`}>
                                            {pastedData.name}
                                        </span>
                                        <button title='remove'
                                            onClick={handleClear}
                                            className="w-[22px] h-[22px] bg-[#AEACB8] rounded-full flex items-center justify-center text-white hover:bg-[#AFAEB3] transition-colors ml-1"
                                        >
                                            <X size={16} strokeWidth={3} />
                                        </button>
                                    </div>

                                    <button title='send'
                                        onClick={() => onContinue(pastedData)}
                                        className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all ${isDark ? 'bg-white text-black' : 'bg-[#1C1C1E] text-white'
                                            }`}
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
                                    className="flex items-center justify-between w-full -px-2.5 pl-3"
                                >
                                    <input
                                        type="text"
                                        placeholder={placeholder}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className={`bg-transparent border-none outline-none text-[18px] font-semibold w-full mr-4 transition-colors ${isDark ? 'text-white placeholder:text-gray-600' : 'text-[#26262A] placeholder:text-[#B3B3B8]'
                                            }`}
                                    />
                                    <button type='button'
                                        onClick={handlePaste}
                                        className="bg-[#016FFE] hover:bg-[#016FFE]/80 text-[#fefefe] px-7 py-2 rounded-full text-[15px] font-semibold tracking-wider shadow-md active:scale-95 transition-colors duration-300"
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