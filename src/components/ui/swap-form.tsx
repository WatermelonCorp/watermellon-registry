"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Sun, Moon } from "lucide-react";
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
  defaultMode?: "signin" | "signup";
  defaultTheme?: "light" | "dark";
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

export const SwapForm: React.FC<SwapFormProps> = ({
  defaultMode = "signin",
  defaultTheme = "light",
  texts = {},
}) => {
  const [isSignIn, setIsSignIn] = useState<boolean>(
    defaultMode === "signin"
  );
  const [theme, setTheme] = useState<"light" | "dark">(defaultTheme);

  const mergedTexts = { ...DEFAULT_TEXTS, ...texts };

  /* Theme handling */
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  /* Animations */
  const variants: Variants = {
    initial: {
      opacity: 0,
      y: 12,
      scale: 0.98,
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
      y: -12,
      scale: 0.98,
      filter: "blur(4px)",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[110vh] h-full bg-[#FEFEFE] dark:bg-zinc-950 p-4 font-sans transition-colors duration-500">
      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="mb-8 p-3 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm hover:scale-110 transition-all"
      >
        {theme === "light" ? (
          <Moon size={20} className="text-gray-600" />
        ) : (
          <Sun size={20} className="text-yellow-400" />
        )}
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={isSignIn ? "signin" : "signup"}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 26,
            mass: 0.9,
          }}
          className="w-[440px] max-w-[420px] bg-[#F6F5FA] dark:bg-zinc-900 shadow-[0_10px_20px_rgba(0,0,0,0.08)] rounded-[32px] overflow-hidden border-[1.5px] border-[#E6E6EF] dark:border-zinc-800 transition-colors"
        >
          <div className="p-8 pb-10 border-b-[1.2px] bg-[#FEFEFE] dark:bg-zinc-950 rounded-[28px] border-[#E6E6EF] dark:border-zinc-800 transition-colors">
            <h2 className="text-3xl font-bold text-[#191919] dark:text-zinc-100 mb-2">
              {isSignIn
                ? mergedTexts.signInTitle
                : mergedTexts.signUpTitle}
            </h2>

            <p className="text-[#ADADB0] dark:text-zinc-500 text-[17px] mb-6">
              {isSignIn
                ? mergedTexts.signInSubtitle
                : mergedTexts.signUpSubtitle}
            </p>

            {/* Social Buttons */}
            <div className="space-y-3">
              <button className="w-full flex shadow-md items-center justify-center gap-3 py-3.5 px-4 border-[1.2px] border-[#E7E7E7] dark:border-zinc-800 rounded-xl font-medium text-[#131313] dark:text-zinc-200 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                <FaGoogle className="text-xl" />
                Continue with Google
              </button>

              <button className="w-full flex shadow-md items-center justify-center gap-3 py-3.5 px-4 border-[1.2px] border-[#E7E7E7] dark:border-zinc-800 rounded-xl font-medium text-[#131313] dark:text-zinc-200 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                <FaApple className="text-[26px]" />
                Continue with Apple
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#ECEBEE] dark:via-zinc-800 to-transparent" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-zinc-950 text-[14px] px-2 text-gray-400 dark:text-zinc-600">
                  OR
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-[#0B0B0B] dark:text-zinc-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border-[1.2px] border-[#E7E7E7] dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-1 focus:ring-black dark:focus:ring-zinc-400 outline-none shadow-md"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-full py-3.5 bg-[#030303] dark:bg-zinc-100 text-[#FAFAFA] dark:text-zinc-900 rounded-xl font-semibold shadow-xl"
              >
                {isSignIn
                  ? mergedTexts.signInButton
                  : mergedTexts.signUpButton}
              </motion.button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-[#F6F5FA] dark:bg-zinc-900 py-4 text-center">
            <p className="text-[#a8a7b0] dark:text-zinc-500 text-[14px]">
              {isSignIn
                ? mergedTexts.footerSignIn
                : mergedTexts.footerSignUp}
              <button
                onClick={() => setIsSignIn(!isSignIn)}
                className="text-black dark:text-white font-medium ml-1"
              >
                {isSignIn
                  ? mergedTexts.footerSignInCta
                  : mergedTexts.footerSignUpCta}
              </button>
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
