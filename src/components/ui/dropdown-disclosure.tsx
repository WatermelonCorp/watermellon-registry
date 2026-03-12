"use client";

import { useRef, useEffect, type ReactNode, type FC } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { ChevronDown, X, ArrowUpRight, Check } from "lucide-react";
import { FaMeta } from "react-icons/fa6";
import { HugeiconsIcon } from "@hugeicons/react";
import { GoogleGeminiIcon, QwenFreeIcons } from "@hugeicons/core-free-icons";
import { SiClaude } from "react-icons/si";
import useMeasure from "react-use-measure";

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

  const [ref, bounds] = useMeasure({ offsetSize: true });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        onOpenChange(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  return (
    <MotionConfig
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        mass: 1,
      }}
    >
      <motion.div
        ref={containerRef}
        animate={{
          width: bounds.width > 0 ? bounds.width : "auto",
          height: bounds.height > 0 ? bounds.height : "auto",
        }}
        className="relative flex items-center justify-center overflow-hidden border border-black/10 bg-neutral-50 dark:border-white/20 dark:bg-neutral-900"
        style={{
          borderRadius: 16,
        }}
      >
        <div ref={ref} className="shrink-0 p-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {!isOpen ? (
              <motion.button
                key="trigger"
                onClick={() => onOpenChange(true)}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0,
                  },
                }}
                className="flex cursor-pointer items-center gap-2"
              >
                <motion.div
                  layoutId={`model-icon-${selected.id}`}
                  //   layout="position"
                  className="flex shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 dark:border-neutral-700 dark:text-neutral-400"
                  style={{
                    width: 40,
                    height: 40,
                  }}
                >
                  {selected.icon}
                </motion.div>

                <motion.span
                  layoutId={`model-name-${selected.id}`}
                  layout="position"
                  className="truncate text-base font-bold text-neutral-600 dark:text-neutral-200"
                >
                  {selected.name}
                </motion.span>

                <motion.div
                  //   layoutId="toggle"
                  className="ml-4"
                >
                  <ChevronDown className="h-6 w-6 text-neutral-800 dark:text-neutral-400" />
                </motion.div>
              </motion.button>
            ) : (
              <motion.div
                key="expanded"
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="flex flex-col items-center gap-3 pt-2"
              >
                <motion.div
                  role="dialog"
                  aria-label="Model Selection Menu"
                  className=""
                >
                  <div className="mb-3 flex items-center justify-between px-2">
                    <motion.span
                      layoutId="title"
                      className="text-lg font-bold text-neutral-500 dark:text-neutral-500"
                    >
                      Choose Model
                    </motion.span>

                    <button
                      onClick={() => onOpenChange(false)}
                      aria-label="Close menu"
                      title="Close menu"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-400 transition-opacity hover:opacity-80 dark:bg-neutral-700"
                    >
                      <X className="h-5 w-5 text-white" />
                    </button>
                  </div>

                  <div className="flex flex-col gap-1">
                    {modelList.map((m) => {
                      const active = m.id === selected.id;

                      return (
                        <motion.button
                          key={m.id}
                          onClick={() => {
                            onModelChange?.(m);
                            onOpenChange?.(false);
                          }}
                          whileTap={{ scale: 0.97 }}
                          className="group flex items-center justify-between gap-4 rounded-xl px-2 py-3 transition-colors hover:bg-neutral-100 sm:px-3 dark:hover:bg-neutral-800"
                        >
                          <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-5">
                            <motion.div
                              layoutId={`model-icon-${m.id}`}
                              layout="position"
                              className="flex shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 dark:border-neutral-700 dark:text-neutral-400"
                              style={{
                                width: 40,
                                height: 40,
                              }}
                            >
                              {m.icon}
                            </motion.div>

                            <div className="min-w-0 flex-1 text-left">
                              <motion.div
                                layoutId={`model-name-${m.id}`}
                                layout="position"
                                className="truncate text-base font-bold text-neutral-600 dark:text-neutral-200"
                                style={{
                                  fontSize: 14,
                                }}
                              >
                                {m.name}
                              </motion.div>
                              <div className="truncate text-sm text-neutral-400 dark:text-neutral-500">
                                {m.description}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {m.hasUpgrade && (
                              <div className="flex items-center overflow-hidden rounded-lg border border-neutral-300 text-sm font-semibold text-neutral-800 dark:border-neutral-600 dark:text-neutral-300">
                                <div className="border-r border-neutral-300 px-2 py-1 dark:border-neutral-600">
                                  <ArrowUpRight className="h-4 w-4 rounded-sm border-2 border-neutral-800 dark:border-neutral-300" />
                                </div>
                                <div className="px-2 py-1">Upgrade</div>
                              </div>
                            )}

                            {!m.hasUpgrade && (
                              <div
                                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                                  active
                                    ? "border-neutral-900 bg-neutral-900 dark:border-neutral-100 dark:bg-neutral-100"
                                    : "border-neutral-200 dark:border-neutral-700"
                                }`}
                              >
                                <AnimatePresence
                                  mode="popLayout"
                                  initial={false}
                                >
                                  {active && (
                                    <motion.div
                                      initial={{ scale: 0, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                      exit={{ scale: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <Check className="h-4 w-4 stroke-[3.5px] text-white dark:text-neutral-900" />
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
      </motion.div>
    </MotionConfig>
  );
};
