import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { Check, ChevronRight, Sun, Moon } from 'lucide-react';

export type FrequencyType = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

export interface FrequencyData {
    type: FrequencyType;
    subValue?: string;
}

const smoothSpring = {
    type: 'spring',
    stiffness: 220,
    damping: 28,
    mass: 0.9,
    bounce: 0,
} as const;

interface FrequencySelectorProps {
    value: FrequencyData;
    onChange: (data: FrequencyData) => void;
}

const FREQUENCIES: FrequencyType[] = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

const SUB_OPTIONS: Record<FrequencyType, string[]> = {
    Daily: [],
    Weekly: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    Monthly: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
    Yearly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

export const FrequencySelector: React.FC<FrequencySelectorProps> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tempType, setTempType] = useState<FrequencyType>(value.type);
    const [tempSubValue, setTempSubValue] = useState<string | undefined>(value.subValue);
    const [isDark, setIsDark] = useState(false);

    const handleOpen = () => {
        setTempType(value.type);
        setTempSubValue(value.subValue || SUB_OPTIONS[value.type][0]);
        setIsOpen(true);
    };

    const handleConfirm = () => {
        onChange({ type: tempType, subValue: tempType === 'Daily' ? undefined : tempSubValue });
        setIsOpen(false);
    };

    return (
        <div className={`min-h-screen h-full w-full flex flex-col items-center justify-center transition-colors duration-500 ${isDark ? 'bg-[#121212]' : 'bg-[#fefefe]'}`}>

            {/* Theme Toggle */}
            <button
                onClick={() => setIsDark(!isDark)}
                className={`mb-10 p-3 rounded-full border transition-all ${isDark ? 'bg-[#1E1E1E] border-gray-800 text-yellow-400' : 'bg-white border-gray-200 text-gray-500 shadow-sm'}`}
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="relative antialiased select-none">
                <AnimatePresence mode="wait">
                    {!isOpen ? (
                        <motion.div
                            layoutId="container"
                            onClick={handleOpen}
                            layout="position"
                            transition={smoothSpring}
                            className={`flex items-center justify-between rounded-full p-1 pl-6 w-[380px] h-[60px] cursor-pointer transition-colors ${isDark ? 'bg-[#1E1E1E]' : 'bg-[#F4F4F4]'}`}
                        >
                            <motion.span layout className={`font-bold text-[18px] ${isDark ? 'text-gray-500' : 'text-[#8E8E93]'}`}>Frequency</motion.span>
                            <motion.div
                                layoutId="trigger-pill"
                                layout="position"
                                transition={smoothSpring}
                                className={`flex items-center rounded-full px-4 h-12 shadow-sm border gap-3 transition-colors ${isDark ? 'bg-[#2C2C2E] border-white/5' : 'bg-[#fefefe] border-black/5'}`}
                            >
                                <span className={`font-bold text-[18px] ${isDark ? 'text-white' : 'text-[#000000]'}`}>
                                    {value.type}{value.subValue ? `, ${value.subValue}` : ''}
                                </span>
                                <div className="flex flex-col -space-y-1 rotate-[-90deg] scale-75">
                                    <ChevronRight size={26} strokeWidth={3} className={`${isDark ? 'text-gray-600' : 'text-[#AFAFAF]'} rotate-[-90deg]`} />
                                    <ChevronRight size={26} strokeWidth={3} className={`${isDark ? 'text-gray-600' : 'text-[#AFAFAF]'} rotate-[90deg]`} />
                                </div>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            layoutId="container"
                            layout="position"
                            className={`rounded-[32px] p-2 overflow-hidden flex flex-col gap-2 w-[440px] transition-colors ${isDark ? 'bg-[#1E1E1E]' : 'bg-[#F4F4F4]'}`}
                            transition={smoothSpring}
                        >
                            <div className="flex items-center gap-2">
                                <div className={`flex-1 rounded-full flex p-1 h-[50px] items-center relative transition-colors ${isDark ? 'bg-[#2C2C2E]' : 'bg-[#FEFEFE]'}`}>
                                    <LayoutGroup id="tabs">
                                        {FREQUENCIES.map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => {
                                                    setTempType(type);
                                                    setTempSubValue(SUB_OPTIONS[type][0]);
                                                }}
                                                className="relative flex-1 gap-2 text-center h-full flex items-center justify-center font-bold text-[18px] z-10 px-4 transition-colors"
                                                style={{ color: tempType === type ? (isDark ? '#fff' : '#000') : (isDark ? '#555' : '#8E8E93') }}
                                            >
                                                {tempType === type && (
                                                    <motion.div
                                                        layoutId="active-bg"
                                                        transition={{
                                                            type: 'spring',
                                                            stiffness: 300,
                                                            damping: 30,
                                                            mass: 0.8,
                                                            bounce: 0,
                                                        }}
                                                        className={`absolute inset-0 rounded-full shadow-sm z-[-1] ${isDark ? 'bg-[#3A3A3C]' : 'bg-[#F0F0F0]'}`}
                                                    />
                                                )}
                                                {type}
                                            </button>
                                        ))}
                                    </LayoutGroup>
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleConfirm}
                                    className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
                                >
                                    <Check size={22} strokeWidth={3} />
                                </motion.button>
                            </div>

                            <AnimatePresence mode="wait">
                                {SUB_OPTIONS[tempType].length > 0 && (
                                    <motion.div
                                        key={tempType}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 200,
                                            damping: 26,
                                            mass: 1,
                                            bounce: 0,
                                        }}
                                        className="px-1 pb-1"
                                    >
                                        <div className={`grid grid-cols-7 gap-1 rounded-2xl p-2 transition-colors ${isDark ? 'bg-[#2C2C2E]' : 'bg-white'}`}>
                                            {SUB_OPTIONS[tempType].map((option) => (
                                                <button
                                                    key={option}
                                                    onClick={() => setTempSubValue(option)}
                                                    className={`h-9 rounded-full px-4 text-[16px] font-bold transition-all flex items-center justify-center
                                                         ${tempSubValue === option
                                                            ? (isDark ? 'bg-[#3A3A3C] text-white shadow-sm' : 'bg-[#F0F0F0] text-[#000000] shadow-sm')
                                                            : (isDark ? 'text-gray-500 hover:text-gray-300' : 'text-[#8E8E93] hover:text-[#48484A]')
                                                        }`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
