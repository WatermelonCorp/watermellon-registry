"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Info, ImagePlus } from 'lucide-react';
import { HiBadgeCheck } from 'react-icons/hi';

interface OnboardingData {
    businessName: string;
    legalName: string;
}

interface OnboardingProps {
    title?: string;
    subtitle?: string;
    businessNameLabel?: string;
    businessNamePlaceholder?: string;
    legalNameLabel?: string;
    legalNamePlaceholder?: string;
    nextButtonText?: string;
    finishButtonText?: string;
    tooltipMainText?: string;
    tooltipSubText?: string;
    rightSectionDescription?: string;
    onComplete?: (data: OnboardingData) => void;
}

export const OnboardingScreen: React.FC<OnboardingProps> = ({
    title = "Business Details",
    subtitle = "Tell us about your brand to start creating campaigns.",
    businessNameLabel = "Business name",
    businessNamePlaceholder = "Enter your name",
    legalNameLabel = "Business Legal name",
    legalNamePlaceholder = "Enter your business legal name",
    nextButtonText = "Create business account",
    finishButtonText = "Finish Setup",
    tooltipMainText = "Click here to add your profile image.",
    tooltipSubText = "You can always do this later.",
    rightSectionDescription = "With your creator profile ready, it's time to set up your business account.",
    onComplete
}) => {
    const [businessName, setBusinessName] = useState('Acme Inc');
    const [legalName, setLegalName] = useState('');
    const [currentStep, setCurrentStep] = useState(1);

    const totalSteps = 3;
    const spring = { type: "spring", stiffness: 300, damping: 30 } as const;
    const progressSpring = { type: "spring", stiffness: 100, damping: 20 } as const;

    const handleNext = () => {
        if (currentStep < totalSteps) setCurrentStep(prev => prev + 1);
        else onComplete?.({ businessName, legalName });
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    return (
        <div className="theme-injected min-h-full w-full flex flex-col items-center justify-center transition-colors duration-500 bg-background text-foreground font-sans" style={{ fontFamily: "var(--font-sans)" }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={spring}
                className="w-full max-w-5xl bg-card text-card-foreground rounded-3xl overflow-hidden flex flex-col md:flex-row p-2 shadow-lg border border-border transition-colors duration-500"
            >
                {/* Left Section */}
                <div className="flex-[1.2] flex flex-col justify-center px-8 md:px-16 py-10 bg-muted/30 rounded-l-2xl rounded-r-none border border-border md:border-r md:border-r-border transition-colors duration-500">
                    <div className="max-w-sm w-full mx-auto">
                        <div className="mb-8 flex justify-center md:justify-start">
                            <div className="p-2 rounded-xl bg-muted">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-foreground">
                                    <path d="M7 8H5C3.34315 8 2 9.34315 2 11V13C2 14.6569 3.34315 16 5 16H7M17 8H19C20.6569 8 22 9.34315 22 11V13C22 14.6569 20.6569 16 19 16H17M8 12H16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>

                        <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-2 transition-colors">
                            {title}
                        </h1>
                        <p className="text-sm text-muted-foreground mb-8 transition-colors">
                            {subtitle}
                        </p>

                        {/* Stepper */}
                        <div className="flex gap-2 mb-10">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex-1 h-1 bg-muted rounded-full relative overflow-hidden">
                                    <motion.div
                                        animate={{ width: i <= currentStep ? "100%" : "0%" }}
                                        transition={progressSpring}
                                        className="h-full bg-primary absolute left-0 top-0"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6 mb-10 text-left">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2 transition-colors">
                                    {businessNameLabel} <Info size={14} className="opacity-50" />
                                </label>
                                <input
                                    placeholder={businessNamePlaceholder}
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    className="w-full bg-background border border-border text-foreground rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-ring/30 transition-all text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2 transition-colors">
                                    {legalNameLabel} <Info size={14} className="opacity-50" />
                                </label>
                                <input
                                    placeholder={legalNamePlaceholder}
                                    value={legalName}
                                    onChange={(e) => setLegalName(e.target.value)}
                                    className="w-full bg-background border border-border text-foreground rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-ring/30 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <motion.button
                                onClick={handleBack}
                                whileTap={{ scale: 0.95 }}
                                className="p-4 rounded-xl border bg-background border-border text-muted-foreground transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </motion.button>
                            <motion.button
                                onClick={handleNext}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 bg-primary text-primary-foreground text-sm font-bold py-4 rounded-xl shadow-md transition-colors"
                            >
                                {currentStep === totalSteps ? finishButtonText : nextButtonText}
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex-1 bg-muted/40 relative flex flex-col items-center justify-center p-12 rounded-r-2xl rounded-l-none border border-border md:border-l-0 transition-colors duration-500">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-4 py-2 rounded-xl text-center -mb-5 text-xs font-medium z-10 bg-card border border-border text-foreground shadow-md transition-colors"
                    >
                        <p>{tooltipMainText}</p>
                        <p className="opacity-60 font-normal text-xs">{tooltipSubText}</p>
                    </motion.div>

                    <motion.div layout className="relative w-full max-w-sm aspect-square rounded-3xl border-2 border-border bg-card shadow-sm flex flex-col items-center justify-center p-8 my-8 transition-all">
                        <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mb-6 text-muted-foreground shadow-inner">
                            <ImagePlus size={24} strokeWidth={1.5} />
                        </div>

                        <div className="flex items-center gap-2 mb-6">
                            <span className="font-bold text-sm text-foreground transition-colors">
                                {businessName || 'Your Brand'}
                            </span>
                            <HiBadgeCheck size={18} className="text-primary" />
                        </div>

                        <div className="w-full space-y-2 opacity-20">
                            <div className="h-1.5 bg-foreground rounded-full w-full" />
                            <div className="h-1.5 bg-foreground rounded-full w-2/3 mx-auto" />
                        </div>
                    </motion.div>

                    <p className="text-center text-xs leading-relaxed text-muted-foreground max-w-xs transition-colors">
                        {rightSectionDescription}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};