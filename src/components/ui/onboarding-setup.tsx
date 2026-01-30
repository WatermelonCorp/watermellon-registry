import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Moon, Sun } from "lucide-react";

type FocusOption = {
    id: string;
    label: string;
};

interface OnboardingSetupProps {
    title: string;
    subtitle: string;
    focusOptions: FocusOption[];
    selectedFocus: string;
    onFocusChange: (id: string) => void;
    revenue: string;
    onRevenueChange: (value: string) => void;
    role: string;
    onRoleChange: (value: string) => void;
    step: number;
    totalSteps: number;
    onContinue: () => void;
    imageUrl: string;
}

const spring = {
    type: "spring",
    stiffness: 320,
    damping: 30,
    mass: 0.7,
} as const;

export const OnboardingSetup: React.FC<OnboardingSetupProps> = ({
    title,
    subtitle,
    focusOptions,
    selectedFocus,
    onFocusChange,
    revenue,
    onRevenueChange,
    role,
    onRoleChange,
    step,
    totalSteps,
    onContinue,
    imageUrl,
}) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    return (
        <div
            className="transition-all duration-500 min-h-screen w-full flex flex-col items-center justify-center p-10 relative overflow-hidden"
            style={{
                filter: theme === 'dark' ? 'invert(0.9) hue-rotate(180deg)' : 'none',
                backgroundColor: theme === 'dark' ? '#000' : 'transparent'
            }}
        >
            {/* Background Pattern */}
            <div className="fixed inset-0 pointer-events-none z-[-1] bg-[#FBFBFC] overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: `repeating-linear-gradient(
              -45deg,
              #E5E7EB 0px,
              #E5E7EB 1px,
              transparent 1px,
              transparent 10px
            )`
                    }}
                />

                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(to right, #D1D5DB 1px, transparent 1px)`,
                        backgroundSize: '240px 100%',
                        maskImage: 'linear-gradient(to bottom, black 5px, transparent 5px)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 5px, transparent 5px)',
                        maskSize: '100% 10px',
                        WebkitMaskSize: '100% 10px'
                    }}
                />

                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, #D1D5DB 1px, transparent 1px)`,
                        backgroundSize: '100% 180px',
                        maskImage: 'linear-gradient(to right, black 5px, transparent 5px)',
                        WebkitMaskImage: 'linear-gradient(to right, black 5px, transparent 5px)',
                        maskSize: '10px 100%',
                        WebkitMaskSize: '10px 100%'
                    }}
                />
            </div>

            {/* Theme Toggle */}
            <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="absolute top-10 right-10 p-2 rounded-full border border-gray-300 bg-white shadow-sm z-50"
                style={{ filter: theme === 'dark' ? 'invert(1) hue-rotate(180deg)' : 'none' }}
            >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={spring}
                className="w-full max-w-[980px] grid grid-cols-[1.05fr_0.95fr] border-2 border-[#EFEDF5] bg-[#F5F5F7] rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden"
            >
                {/* LEFT */}
                <div className="flex flex-col inter">
                    <div className="p-6 bg-[#FFFFFF] rounded-[12px] m-1.5">
                        <h1 className="text-[24px] font-medium text-[#111]">
                            {title}
                        </h1>
                        <p className="mt-1 text-[12px] text-[#99999B]">
                            {subtitle}
                        </p>

                        <div className="border-t-[1.6px] border-dashed border-gray-300 my-4" />

                        {/* Focus */}
                        <div className="">
                            <p className="text-[14px] font-nomral tracking-tight text-[#8F8E92] mb-4 block">
                                Your main focus
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {focusOptions.map((option) => {
                                    const active = option.id === selectedFocus;

                                    return (

                                        <motion.button
                                            key={option.id}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => onFocusChange(option.id)}
                                            className={`
                      relative px-5 py-2.5 rounded-xl border-[1.5px] text-[12px] font-medium transition-all duration-200 flex items-center gap-2
                      ${active
                                                    ? 'bg-[#FFF0E9] border-[#F87742]/40 text-[#F87742]'
                                                    : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:border-[#D1D5DB]'}
                    `}
                                        >
                                            {active && (
                                                <motion.div >
                                                    <CheckCircle2 size={20} fill="#FA692E" className="text-white" />
                                                </motion.div>
                                            )}
                                            {option.label}
                                        </motion.button>

                                    );
                                })}
                            </div>
                        </div>

                        {/* Revenue */}
                        <div className="mt-6">
                            <label className="text-[14px] font-normal text-[#979799]">
                                Monthly revenue you manage
                            </label>
                            <select title="revenue"
                                value={revenue}
                                onChange={(e) => onRevenueChange(e.target.value)}
                                className="mt-2 w-full h-[40px] rounded-[10px] border border-[#EEEDF3] px-3 text-[13px] outline-none focus:ring-1 text-[#A2A2A4] placeholder:text-[#A2A2A4] focus:ring-[#d6d5db]"
                            >
                                <option>$100k – $200k</option>
                                <option>$200k – $500k</option>
                                <option>$500k+</option>
                            </select>
                        </div>

                        {/* Role */}
                        <div className="mt-4">
                            <label className="text-[14px] font-normal text-[#979799]">
                                Your role
                            </label>
                            <input
                                value={role}
                                onChange={(e) => onRoleChange(e.target.value)}
                                placeholder="e.g. Sales Manager"
                                className="mt-2 w-full h-[40px] rounded-[10px] border border-[#EEEDF3] px-3 text-[13px] outline-none focus:ring-1 placeholder:text-[#A2A2A4] focus:ring-[#d6d5db]"
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto p-6 flex items-center justify-between">
                        <div className="flex items-center font-medium gap-2 text-[11px] text-[#8B8B8D]">
                            STEP 1 / 5
                            <div className="flex gap-1 ml-2">
                                {Array.from({ length: totalSteps }).map((_, i) => (
                                    <span
                                        key={i}
                                        className={`h-5 w-[4px] rounded-full ${i < step ? "bg-[#ff6a32]" : "bg-[#E5E5ED]"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            transition={spring}
                            onClick={onContinue}
                            className="h-[38px] px-6 rounded-full bg-[#0F0F0F] text-[#D7D7D7] text-[13px]"
                        >
                            Continue
                        </motion.button>
                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="relative">
                    <AnimatePresence mode="popLayout">
                        <motion.img
                            key={imageUrl}
                            src={imageUrl}
                            initial={{ opacity: 0, scale: 1.03 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={spring}
                            // Yahan humne re-invert add kiya hai taaki dark mode mein image normal dikhe
                            style={{
                                filter: theme === 'dark' ? 'invert(1) hue-rotate(180deg)' : 'none'
                            }}
                            className="absolute inset-0 w-full rounded-[18px] h-full object-cover"
                        />
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};
