import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Info, ImagePlus, Sun, Moon } from 'lucide-react';
import { HiBadgeCheck } from 'react-icons/hi';

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
    onComplete?: (data: any) => void;
}

export const OnboardingScreen: React.FC<OnboardingProps> = ({
    title = "Business Details",
    subtitle = "Tell us about your brand to start creating campaigns on Payper.",
    businessNameLabel = "Business name",
    businessNamePlaceholder = "Enter your name",
    legalNameLabel = "Business Legal name",
    legalNamePlaceholder = "Enter your business legal name",
    nextButtonText = "Create business account",
    finishButtonText = "Finish Setup",
    tooltipMainText = "Click here to add your profile image.",
    tooltipSubText = "You can always do this later.",
    rightSectionDescription = "With your creator profile ready, it's time to set up your business account. This is how your brand will be seen in campaigns.",
    onComplete
}) => {
    const [businessName, setBusinessName] = useState('Acme Inc');
    const [legalName, setLegalName] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    const isDark = theme === 'dark';
    const totalSteps = 4;

    const spring = { type: "spring", stiffness: 300, damping: 30 } as const;
    const progressSpring = { type: "spring", stiffness: 100, damping: 20 } as const;

    const handleNext = () => {
        if (currentStep < totalSteps) setCurrentStep(prev => prev + 1);
        else onComplete?.({ businessName, legalName });
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    // Dynamic Theme Styles
    const styles = {
        outerBg: isDark ? 'bg-[#292929]' : 'bg-[#F2F2F2]',
        cardBg: isDark ? 'bg-[#0A0A0A]' : 'bg-white',
        leftSection: isDark ? 'bg-[#131313] border-white/10' : 'bg-[#FAFAFA] border-black/5',
        rightSection: isDark ? 'bg-[#1C1C1C] border-white/5' : 'bg-[#F4F4F4] border-black/5',
        titleText: isDark ? 'text-[#d8d8d8]' : 'text-[#1A1A1A]',
        subtitleText: isDark ? 'text-gray-400' : 'text-gray-500',
        inputBg: isDark ? 'bg-[#121212] border-[#1D1D1D] text-white' : 'bg-white border-[#121212]/40 text-black',
        inputText: isDark ? 'text-white' : 'text-black',
        labelColor: isDark ? 'text-[#6C6C6C]' : 'text-[#808080]',
        backBtn: isDark ? 'bg-[#121212] border-[#282828] text-[#999999]' : 'bg-[#1A1A1A] border-[#1A1A1A] text-[#666666]',
        nextBtn: isDark ? 'bg-[#EDEDED] text-[#101010]' : 'bg-[#1A1A1A] text-white',
        logoColor: isDark ? 'text-white' : 'text-black',
        mockupBorder: isDark ? 'border-[#303030]' : 'border-[#E5E5E5]',
        mockupText: isDark ? 'text-white' : 'text-[#1A1A1A]',
        mockupLines: isDark ? 'bg-white' : 'bg-black',
        toolTip: isDark ? 'bg-[#2B292E] border-[#2D2D2D] text-white' : 'bg-white border-[#E5E5E5] text-black shadow-lg',
        toggleBtn: isDark ? 'bg-[#1C1C1C] text-yellow-400 border-white/10' : 'bg-white text-slate-600 border-black/5'
    };

    return (
        <div className={`min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 transition-colors duration-500 ${styles.outerBg} inter`}>

            {/* Theme Toggle */}
            <motion.button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                whileTap={{ scale: 0.9 }}
                className={`mb-6 p-3 rounded-full border shadow-sm transition-all z-50 ${styles.toggleBtn}`}
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={spring}
                className={`w-full max-w-5xl md:h-[85vh] md:aspect-[16/11] ${styles.cardBg} rounded-[22px] overflow-hidden flex flex-col md:flex-row p-2 md:p-3 shadow-2xl transition-colors duration-500`}
            >

                {/* Left Section: Form */}
                <div className={`flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-12 py-10 md:py-12 ${styles.leftSection} md:rounded-l-[16px] rounded-r-none border md:border-r-0 transition-colors duration-500`}>
                    <div className="max-w-sm w-full text-center mx-auto">
                        {/* Logo */}
                        <div className="mb-6 md:mb-8 w-full flex justify-center">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className={`${styles.logoColor} transition-colors`}>
                                <path d="M7 8H5C3.34315 8 2 9.34315 2 11V13C2 14.6569 3.34315 16 5 16H7M17 8H19C20.6569 8 22 9.34315 22 11V13C22 14.6569 20.6569 16 19 16H17M8 12H16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                        </div>

                        <h1 className={`text-xl md:text-2xl font-medium tracking-wide ${styles.titleText} mb-2 transition-colors`}>{title}</h1>
                        <p className={`${styles.subtitleText} text-[11px] md:text-[12px] mb-6 md:mb-8 transition-colors`}>{subtitle}</p>

                        {/* Stepper */}
                        <div className="flex gap-2 mb-8 md:mb-10">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className={`flex-1 h-[3.5px] ${isDark ? 'bg-white/10' : 'bg-black/5'} rounded-full relative overflow-hidden`}>
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        animate={{ width: i <= currentStep ? "100%" : "0%" }}
                                        transition={progressSpring}
                                        className="h-full bg-[#14F195]/80 absolute left-0 top-0"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Form */}
                        <div className="space-y-5 md:space-y-6 mb-8 text-left">
                            <div className="space-y-2">
                                <label className={`text-[11px] md:text-[12px] tracking-wider font-medium ${styles.labelColor} flex items-center gap-1.5 transition-colors`}>
                                    {businessNameLabel} <Info size={14} className="opacity-70" />
                                </label>
                                <div className="relative group">
                                    <div className={`absolute -inset-[1px] rounded-xl ${isDark ? 'bg-white/15' : 'bg-black/5'} blur-md opacity-0 group-focus-within:opacity-40 transition-opacity duration-500 pointer-events-none`} />
                                    <input 
                                        placeholder={businessNamePlaceholder}
                                        type="text"
                                        value={businessName}
                                        onChange={(e) => setBusinessName(e.target.value)}
                                        className={`relative w-full ${styles.inputBg} border-[1.5px] rounded-xl px-4 py-3 outline-none focus:white/10 focus:ring-1 focus:ring-white/40 dark:focus:ring-black/40  text-[14px] placeholder:text-[#6B6B6B] transition-all z-10`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className={`text-[11px] md:text-[12px] tracking-wider font-medium ${styles.labelColor} flex items-center gap-1.5 transition-colors`}>
                                    {legalNameLabel} <Info size={14} className="opacity-70" />
                                </label>
                                <div className="relative group">
                                    <div className={`absolute -inset-[1px] rounded-xl ${isDark ? 'bg-white/15' : 'bg-black/5'} blur-md opacity-0 group-focus-within:opacity-40 transition-opacity duration-500 pointer-events-none`} />
                                    <input
                                        type="text"
                                        placeholder={legalNamePlaceholder}
                                        value={legalName}
                                        onChange={(e) => setLegalName(e.target.value)}
                                        className={`relative z-10 w-full ${styles.inputBg} border-[1.5px] text-[14px] rounded-xl px-4 py-3 outline-none focus:white/10 focus:ring-1 focus:ring-white/40 transition-all placeholder:text-[#6B6B6B]`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex items-center gap-3">
                            <motion.button
                                onClick={handleBack}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`p-2.5 px-4 md:px-[22px] rounded-full border ${styles.backBtn} transition-colors`}
                            >
                                <ChevronLeft size={22} />
                            </motion.button>
                            <motion.button
                                onClick={handleNext}
                                whileHover={{ scale: 1.02, opacity: 0.9 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex-1 ${styles.nextBtn} text-sm md:text-base font-medium py-3 md:py-3.5 rounded-full shadow-lg transition-colors`}
                            >
                                {currentStep === totalSteps ? finishButtonText : nextButtonText}
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className={`flex-1 ${styles.rightSection} relative flex flex-col items-center justify-center p-8 md:p-12 rounded-b-[16px] md:rounded-b-none md:rounded-r-[16px] border md:border-l-0 transition-colors duration-500`}>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className={`${styles.toolTip} px-3 py-2 rounded-xl text-center z-50 mb-[-40px] md:mt-12 md:-mb-[70px] text-[10px] md:text-xs font-medium transition-colors`}
                    >
                        <p>{tooltipMainText}</p>
                        <p className="opacity-80 font-normal text-[9px] md:text-[12px]">{tooltipSubText}</p>
                    </motion.div>

                    {/* Profile Card Mockup */}
                    <motion.div layout className={`relative w-full max-w-[240px] md:max-w-[280px] aspect-[4/3] rounded-[18px] border-2 ${styles.mockupBorder} ${isDark ? 'bg-gradient-to-b from-white/5 to-transparent' : 'bg-white shadow-sm'} flex flex-col items-center justify-center p-6 md:p-8 my-10 md:my-14 transition-all`}>
                        <div className={`w-12 h-12 md:w-14 md:h-14 ${isDark ? 'bg-[#3B3B3B]' : 'bg-[#F0F0F0]'} border-[1.4px] ${isDark ? 'border-white/10' : 'border-black/5'} rounded-xl flex items-center justify-center mb-4 text-[#A0A0A0] shadow-xl`}>
                            <ImagePlus size={20} strokeWidth={1.5} />
                        </div>

                        <div className="flex items-center gap-1.5 mb-4">
                            <span className={`${styles.mockupText} font-semibold text-xs md:text-sm transition-colors`}>{businessName || 'Your Brand'}</span>
                            <HiBadgeCheck size={16} className="text-[#FF9F1C] fill-[#FF9F1C]" />
                        </div>

                        <div className="w-full space-y-2 opacity-30">
                            <div className={`h-1 ${styles.mockupLines} rounded-full w-full`} />
                            <div className={`h-1 ${styles.mockupLines} rounded-full w-3/4 mx-auto`} />
                            <div className='flex items-center justify-center gap-3'>
                                <div className={`h-1.5 w-1.5 ${styles.mockupLines} rounded-full`} />
                                <div className={`h-1 ${styles.mockupLines} rounded-full w-[35%]`} />
                            </div>
                        </div>
                    </motion.div>

                    <p className={`text-center text-[11px] md:text-[12px] leading-snug ${styles.subtitleText} max-w-[320px] mb-4 md:mb-0 md:mt-10 transition-colors`}>
                        {rightSectionDescription}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};