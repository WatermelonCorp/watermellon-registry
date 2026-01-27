"use client";

import { useState, useRef, useEffect, type ReactNode, type FC } from "react";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { ChevronDown, X, ArrowUpRight, Check, Sun, Moon } from "lucide-react";
import { FaMeta } from "react-icons/fa6";
import { HugeiconsIcon } from "@hugeicons/react";
import { GoogleGeminiIcon, QwenFreeIcons } from "@hugeicons/core-free-icons";
import { SiClaude } from "react-icons/si";

// --- Types ---
export interface Model {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  hasUpgrade?: boolean;
}

interface DropdownDisclosureProps {
  models?: Model[]; 
  defaultSelectedId?: string; 
}

// --- Default Models ---
const DEFAULT_MODELS: Model[] = [
  {
    id: "sonnet",
    name: "Sonnet 3.5",
    description: "Advanced reasoning",
    icon: <SiClaude size={22} />,
    hasUpgrade: true,
  },
  {
    id: "llama",
    name: "Llama 3.2",
    description: "Versatile problem-solving",
    icon: <FaMeta size={22} />,
  },
  {
    id: "qwen",
    name: "Qwen 2.5",
    description: "Rapid text generation",
    icon: (
      <HugeiconsIcon
        icon={QwenFreeIcons}
        size={24}
        color="#7c7b82"
        strokeWidth={1.5}
      />
    ),
  },
  {
    id: "gemma",
    name: "Gemma 2",
    description: "Efficient task completion",
    icon: (
      <HugeiconsIcon
        icon={GoogleGeminiIcon}
        size={24}
        color="#7c7b82"
        strokeWidth={1.5}
      />
    ),
  },
];

// --- Animation Config ---
const SPRING: Transition = {
  type: "spring",
  stiffness: 350,
  damping: 30,
  mass: 1,
};

// --- Component ---
export const DropdownDisclosure: FC<DropdownDisclosureProps> = ({ models, defaultSelectedId }) => {
  const modelList = models || DEFAULT_MODELS;
  const initialModel = modelList.find((m) => m.id === defaultSelectedId) || modelList[0];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Model>(initialModel);
  const [isDark, setIsDark] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  // Dark mode effect
  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-zinc-950 transition-colors duration-500">
      {/* THEME SWITCHER */}
      <button
        onClick={() => setIsDark(!isDark)}
        aria-label="Toggle dark mode"
        title="Toggle dark mode"
        className="mb-10 p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:scale-105 transition-all"
      >
        {isDark ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-zinc-600" size={20} />}
      </button>

      <div ref={ref} className="relative">
        <AnimatePresence mode="popLayout">
          {!isOpen ? (
            <motion.button
              key="trigger"
              layoutId="model-container"
              onClick={() => setIsOpen(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={SPRING}
              className="flex items-center gap-4 px-4 py-2 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm cursor-pointer"
            >
              <motion.div
                layoutId="icon-box"
                className="w-10 h-10 rounded-full border border-gray-200 dark:border-zinc-700 shadow-sm flex items-center justify-center text-gray-600 dark:text-zinc-400"
              >
                {selected.icon}
              </motion.div>

              <motion.span layoutId="title" className="font-bold text-base text-gray-600 dark:text-zinc-200">
                {selected.name}
              </motion.span>

              <motion.div layoutId="toggle">
                <ChevronDown className="w-6 h-6 text-gray-800 dark:text-zinc-400" />
              </motion.div>
            </motion.button>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: -20 }}
              exit={{ opacity: 0, y: 10 }}
              transition={SPRING}
              className="flex flex-col items-center gap-3 z-50 origin-bottom"
            >
              <motion.div
                layoutId="model-container"
                role="dialog"
                aria-label="Model Selection Menu"
                className="w-[390px] bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl px-3 py-4"
              >
                <div className="flex items-center justify-between mb-3 px-1">
                  <motion.span layoutId="title" className="text-sm font-bold text-gray-500 dark:text-zinc-500">
                    Choose Model
                  </motion.span>

                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    title="Close menu"
                    className="w-7 h-7 rounded-full bg-gray-400 dark:bg-zinc-700 hover:opacity-80 transition-opacity flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="flex flex-col gap-1">
                  {modelList.map((m) => {
                    const active = m.id === selected.id;

                    return (
                      <motion.button
                        key={m.id}
                        onClick={() => {
                          setSelected(m);
                          setTimeout(() => setIsOpen(false), 300);
                        }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors group"
                      >
                        <div className="flex items-center gap-5">
                          <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-zinc-700 flex items-center justify-center text-gray-500 dark:text-zinc-400">
                            {m.icon}
                          </div>

                          <div className="text-left">
                            <div className="text-base font-bold lowercase text-gray-600 dark:text-zinc-200">{m.name}</div>
                            <div className="text-sm text-gray-400 dark:text-zinc-500">{m.description}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {m.hasUpgrade && (
                            <div className="flex items-center overflow-hidden border border-gray-300 dark:border-zinc-600 rounded-lg text-sm font-semibold text-gray-800 dark:text-zinc-300">
                              <div className="px-2 py-1 border-r border-gray-300 dark:border-zinc-600">
                                <ArrowUpRight className="w-4 h-4 border-2 rounded-sm border-gray-800 dark:border-zinc-300" />
                              </div>
                              <div className="px-2 py-1">Upgrade</div>
                            </div>
                          )}

                          {!m.hasUpgrade && (
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                active
                                  ? "bg-gray-900 dark:bg-zinc-100 border-gray-900 dark:border-zinc-100"
                                  : "border-gray-200 dark:border-zinc-700"
                              }`}
                            >
                              <AnimatePresence>
                                {active && (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Check className="w-4 h-4 text-white dark:text-zinc-900 stroke-[3.5px]" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
