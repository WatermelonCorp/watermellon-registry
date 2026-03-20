import React from "react";
import { motion, AnimatePresence } from "motion/react";
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
        <div className={`theme-injected font-sans transition-all duration-500 w-full flex flex-col items-center justify-center py-0 relative bg-transparent`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={spring}
                className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] border-2 border-border bg-background rounded-2xl overflow-hidden shadow-xl"
            >
                {/* LEFT CONTENT */}
                <div className="flex flex-col order-2 md:order-1">
                    <div className="p-6 sm:p-8 bg-card rounded-lg m-1 shadow-sm h-full flex flex-col">
                        <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
                            {title}
                        </h1>
                        <p className="mt-2 text-xs text-muted-foreground">
                            {subtitle}
                        </p>

                        <div className="border-t border-dashed border-border my-4" />

                        {/* Focus Options */}
                        <div className="grow">
                            <p className="text-xs font-medium tracking-tight text-muted-foreground mb-3">
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
                                                relative px-4 py-2 rounded-md border text-xs font-medium transition-all duration-200 flex items-center gap-2 grow sm:grow-0 justify-center sm:justify-start
                                                ${active
                                                    ? 'bg-primary/10 border-primary/40 text-primary'
                                                    : 'bg-card border-border text-foreground/70 hover:border-border/80'}
                                            `}
                                        >
                                            {active && (
                                                <CheckCircle2 size={18} fill="currentColor" className="text-primary" />
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
                                <label className="text-xs font-medium text-muted-foreground">
                                    Monthly revenue
                                </label>
                                <select title="revenue"
                                    value={revenue}
                                    onChange={(e) => onRevenueChange(e.target.value)}
                                    className="mt-2 w-full h-9 rounded-md border border-border bg-card px-3 text-sm outline-none text-foreground focus:ring-1 focus:ring-ring/50"
                                >
                                    <option>$100k – $200k</option>
                                    <option>$200k – $500k</option>
                                    <option>$500k+</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-muted-foreground">
                                    Your role
                                </label>
                                <input
                                    value={role}
                                    onChange={(e) => onRoleChange(e.target.value)}
                                    placeholder="e.g. Sales Manager"
                                    className="mt-2 w-full h-9 rounded-md border border-border bg-card px-3 text-sm outline-none text-foreground placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-ring/50"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto p-6 pt-4 sm:px-8 sm:pb-8 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center font-medium gap-2 text-xs text-muted-foreground">
                            <span className="whitespace-nowrap">STEP {step} / {totalSteps}</span>
                            <div className="flex gap-1 ml-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span
                                        key={i}
                                        className={`h-3 w-1 rounded-full transition-colors ${i < Math.ceil((step / totalSteps) * 5) ? "bg-primary" : "bg-border"}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            transition={spring}
                            onClick={onContinue}
                            className="h-9 px-6 w-full xs:w-auto sm:w-auto rounded-full bg-foreground text-background text-sm font-medium shadow-lg active:shadow-sm transition-all"
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