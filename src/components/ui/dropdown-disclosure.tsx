"use client";

import { useRef, useEffect, type ReactNode, type FC } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { ChevronDown, X, ArrowUpRight, Check } from "lucide-react";
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
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  selectedModelId: string;
  onModelChange: (model: Model) => void;
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
export const DropdownDisclosure: FC<DropdownDisclosureProps> = ({
  models = DEFAULT_MODELS,
  isOpen,
  onOpenChange,
  selectedModelId,
  onModelChange,
}) => {
  const modelList = models;
  const selected =
    modelList.find((m) => m.id === selectedModelId) || modelList[0];

  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        onOpenChange(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onOpenChange]);

  return (
    <div ref={ref} className="relative">
      <AnimatePresence mode="popLayout">
        {!isOpen ? (
          <motion.button
            key="trigger"
            layoutId="model-container"
            onClick={() => onOpenChange(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={SPRING}
            className="flex items-center gap-4 px-4 py-2 border border-gray-200 shadow-sm cursor-pointer bg-gray-50 dark:bg-zinc-900 dark:border-zinc-800 rounded-xl"
          >
            <motion.div
              layoutId="icon-box"
              className="flex items-center justify-center w-10 h-10 text-gray-600 border border-gray-200 rounded-full shadow-sm dark:border-zinc-700 dark:text-zinc-400"
            >
              {selected.icon}
            </motion.div>

            <motion.span
              layoutId="title"
              className="text-base font-bold text-gray-600 dark:text-zinc-200"
            >
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
            className="z-50 flex flex-col items-center gap-3 origin-bottom"
          >
            <motion.div
              layoutId="model-container"
              role="dialog"
              aria-label="Model Selection Menu"
              className="w-[85vw] sm:w-[370px] bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl px-2 py-4"
            >
              <div className="flex items-center justify-between px-1 mb-3">
                <motion.span
                  layoutId="title"
                  className="text-sm font-bold text-gray-500 dark:text-zinc-500"
                >
                  Choose Model
                </motion.span>

                <button
                  onClick={() => onOpenChange(false)}
                  aria-label="Close menu"
                  title="Close menu"
                  className="flex items-center justify-center transition-opacity bg-gray-400 rounded-full w-7 h-7 dark:bg-zinc-700 hover:opacity-80"
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
                        onModelChange(m);
                        setTimeout(() => onOpenChange(false), 300);
                      }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-between gap-4 px-2 sm:px-3 py-3 transition-colors rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 group"
                    >
                      <div className="flex items-center gap-3 sm:gap-5 min-w-0 flex-1">
                        <div className="flex items-center justify-center shrink-0 w-10 h-10 text-gray-500 border border-gray-200 rounded-full dark:border-zinc-700 dark:text-zinc-400">
                          {m.icon}
                        </div>

                        <div className="text-left min-w-0 flex-1">
                          <div className="text-base font-bold text-gray-600 dark:text-zinc-200 truncate">
                            {m.name}
                          </div>
                          <div className="text-sm text-gray-400 truncate dark:text-zinc-500">
                            {m.description}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {m.hasUpgrade && (
                          <div className="flex items-center overflow-hidden text-sm font-semibold text-gray-800 border border-gray-300 rounded-lg dark:border-zinc-600 dark:text-zinc-300">
                            <div className="px-2 py-1 border-r border-gray-300 dark:border-zinc-600">
                              <ArrowUpRight className="w-4 h-4 border-2 border-gray-800 rounded-sm dark:border-zinc-300" />
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
  );
};
