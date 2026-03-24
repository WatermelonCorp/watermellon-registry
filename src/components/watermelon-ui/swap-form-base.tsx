"use client";

import { type FC } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { FaGoogle, FaApple } from "react-icons/fa";

/*  TYPES  */

interface SwapFormTexts {
    signInTitle: string;
    signUpTitle: string;
    signInSubtitle: string;
    signUpSubtitle: string;
    signInButton: string;
    signUpButton: string;
    footerSignIn: string;
    footerSignUp: string;
    footerSignInCta: string;
    footerSignUpCta: string;
}

interface SwapFormProps {
    isSignIn: boolean;
    onModeChange: (isSignIn: boolean) => void;
    texts?: Partial<SwapFormTexts>;
}

/*  DEFAULT TEXTS  */

const DEFAULT_TEXTS: SwapFormTexts = {
    signInTitle: "Sign In",
    signUpTitle: "Create Account",
    signInSubtitle: "Hey friend, welcome back!",
    signUpSubtitle: "Just one more step to get started!",
    signInButton: "Get Sign In Code",
    signUpButton: "Create Account",
    footerSignIn: "Don't have account?",
    footerSignUp: "Already have account?",
    footerSignInCta: "Create Account",
    footerSignUpCta: "Sign In",
};

/*  COMPONENT  */

export const SwapForm: FC<SwapFormProps> = ({
    isSignIn,
    onModeChange,
    texts = {},
}) => {
    const mergedTexts = { ...DEFAULT_TEXTS, ...texts };

    /* Animations */
    const variants: Variants = {
        initial: {
            opacity: 0,
            y: -30,
            scale: 0.97,
            filter: "blur(4px)",
        },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
        },
        exit: {
            opacity: 0,
            y: -30,
            scale: 0.97,
            filter: "blur(4px)",
        },
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={isSignIn ? "signin" : "signup"}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                    ease: "easeIn",
                    duration: 0.3,
                }}
                className="theme-injected font-sans w-xs sm:w-sm bg-muted shadow-[0_10px_20px_rgba(0,0,0,0.08)] rounded-2xl overflow-hidden border border-border transition-colors"
            >
                <div className="p-6 sm:p-8 pb-8 sm:pb-10 border-b bg-card rounded-2xl border-border transition-colors">
                    <h2 className="font-sans text-2xl sm:text-3xl font-bold text-foreground mb-1.5 sm:mb-2 text-center sm:text-left">
                        {isSignIn
                            ? mergedTexts.signInTitle
                            : mergedTexts.signUpTitle}
                    </h2>

                    <p className="font-sans text-muted-foreground text-[15px] sm:text-[17px] mb-4 sm:mb-6 text-center sm:text-left">
                        {isSignIn
                            ? mergedTexts.signInSubtitle
                            : mergedTexts.signUpSubtitle}
                    </p>

                    {/* Social Buttons */}
                    <div className="space-y-2.5 sm:space-y-3">
                        <button className="font-sans w-full flex shadow-sm items-center justify-center gap-2 sm:gap-3 py-3 px-4 border border-border rounded-xl font-medium text-foreground bg-card hover:bg-muted transition-colors text-[15px] sm:text-base">
                            <FaGoogle className="text-lg sm:text-xl" />
                            Continue with Google
                        </button>

                        <button className="font-sans w-full flex shadow-sm items-center justify-center gap-2 sm:gap-3 py-3 px-4 border border-border rounded-xl font-medium text-foreground bg-card hover:bg-muted transition-colors text-[15px] sm:text-base">
                            <FaApple className="text-[22px] sm:text-[26px]" />
                            Continue with Apple
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative my-5 sm:my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full h-px bg-linear-to-r from-transparent via-border to-transparent" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-transparent font-sans text-[12px] sm:text-[14px] px-2 text-muted-foreground">
                                OR
                            </span>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-6 sm:space-y-8">
                        <div>
                            <label className="font-sans block text-sm font-medium text-foreground mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className="font-sans w-full px-4 py-2.5 rounded-xl border border-border bg-input focus:ring-1 focus:ring-ring outline-none shadow-sm text-[15px] sm:text-base text-foreground"
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.015 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="font-sans w-full py-3 sm:py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg text-[15px] sm:text-base"
                        >
                            {isSignIn
                                ? mergedTexts.signInButton
                                : mergedTexts.signUpButton}
                        </motion.button>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-muted py-3 sm:py-4 text-center">
                    <p className="font-sans text-muted-foreground text-[13px] sm:text-[14px]">
                        {isSignIn
                            ? mergedTexts.footerSignIn
                            : mergedTexts.footerSignUp}
                        <button
                            onClick={() => onModeChange(!isSignIn)}
                            className="ml-1 font-medium text-foreground"
                        >
                            {isSignIn
                                ? mergedTexts.footerSignInCta
                                : mergedTexts.footerSignUpCta}
                        </button>
                    </p>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};