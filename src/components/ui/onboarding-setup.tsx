import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

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

    return (
<div className={`transition-all duration-500  w-full flex flex-col items-center justify-center py-0 relative bg-transparent`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={spring}
                className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] border-2 border-[#EFEDF5] dark:border-[#1a1a1a] bg-[#F5F5F7] dark:bg-[#0A0A0A] rounded-[24px] overflow-hidden shadow-xl"
            >
                {/* LEFT CONTENT */}
                <div className="flex flex-col inter order-2 md:order-1">
                    <div className="p-5 sm:p-8 bg-white dark:bg-[#111] rounded-[18px] m-1.5 shadow-sm h-full flex flex-col">
                        <h1 className="text-[22px] sm:text-[24px] font-medium text-[#111] dark:text-[#EEE]">
                            {title}
                        </h1>
                        <p className="mt-1 text-[12px] text-[#99999B] dark:text-[#666]">
                            {subtitle}
                        </p>

                        <div className="border-t-[1.6px] border-dashed border-gray-200 dark:border-[#222] my-5" />

                        {/* Focus Options */}
                        <div className="grow">
                            <p className="text-[13px] font-normal tracking-tight text-[#8F8E92] mb-4">
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
                                                relative px-4 py-2.5 rounded-xl border-[1.5px] text-[12px] font-medium transition-all duration-200 flex items-center gap-2 grow sm:grow-0 justify-center sm:justify-start
                                                ${active
                                                    ? 'bg-[#FFF0E9] border-[#F87742]/40 text-[#F87742] dark:bg-[#2A1A14] dark:border-[#F87742]/50'
                                                    : 'bg-white dark:bg-[#111] border-[#E5E7EB] dark:border-[#222] text-[#4B5563] dark:text-[#999] hover:border-[#D1D5DB] dark:hover:border-[#333]'}
                                            `}
                                        >
                                            {active && (
                                                <CheckCircle2 size={18} fill="#FA692E" className="text-white dark:text-[#2A1A14]" />
                                            )}
                                            {option.label}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Revenue & Role Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                            <div>
                                <label className="text-[13px] font-normal text-[#979799]">
                                    Monthly revenue
                                </label>
                                <select title="revenue"
                                    value={revenue}
                                    onChange={(e) => onRevenueChange(e.target.value)}
                                    className="mt-2 w-full h-10 rounded-2xl border border-[#EEEDF3] dark:border-[#222] bg-white dark:bg-[#111] px-3 text-[13px] outline-none text-[#111] dark:text-[#999] focus:ring-1 focus:ring-[#d6d5db] dark:focus:ring-[#333]"
                                >
                                    <option>$100k – $200k</option>
                                    <option>$200k – $500k</option>
                                    <option>$500k+</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-[13px] font-normal text-[#979799]">
                                    Your role
                                </label>
                                <input
                                    value={role}
                                    onChange={(e) => onRoleChange(e.target.value)}
                                    placeholder="e.g. Sales Manager"
                                    className="mt-2 w-full h-10 rounded-2xl border border-[#EEEDF3] dark:border-[#222] bg-white dark:bg-[#111] px-3 text-[13px] outline-none text-[#111] dark:text-[#EEE] placeholder:text-[#A2A2A4] dark:placeholder:text-[#444] focus:ring-1 focus:ring-[#d6d5db] dark:focus:ring-[#333]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto p-5 pt-2 sm:px-8 sm:pb-8 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center font-medium gap-2 text-[11px] text-[#8B8B8D]">
                            <span className="whitespace-nowrap">STEP {step} / {totalSteps}</span>
                            <div className="flex gap-1 ml-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span
                                        key={i}
                                        className={`h-4 w-1 rounded-full transition-colors ${i < Math.ceil((step / totalSteps) * 5) ? "bg-[#ff6a32]" : "bg-[#E5E5ED] dark:bg-[#222]"}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            transition={spring}
                            onClick={onContinue}
                            className="h-10 px-8 w-full xs:w-auto sm:w-auto rounded-full bg-[#0F0F0F] dark:bg-[#EEE] text-[#D7D7D7] dark:text-black text-[13px] font-medium shadow-lg active:shadow-sm transition-all"
                        >
                            Continue
                        </motion.button>
                    </div>
                </div>

                {/* RIGHT IMAGE SECTION */}
                <div className="relative h-48 sm:h-64 md:h-auto md:min-h-full order-1 md:order-2 overflow-hidden">
                    <AnimatePresence mode="popLayout">
                        <motion.img
                            key={imageUrl}
                            src={imageUrl}
                            initial={{ opacity: 0, scale: 1.03 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={spring}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/5 dark:bg-black/20 pointer-events-none" />
                    </AnimatePresence>
                </div>
            </motion.div>
</div>
    );
};