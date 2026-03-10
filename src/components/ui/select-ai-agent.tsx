"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { ArrowRight, ChevronUp, ChevronDown } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ChatGptIcon,
  ClaudeIcon,
  GoogleGeminiIcon,
} from "@hugeicons/core-free-icons";

export interface AIAgent {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface SelectAIAgentProps {
  agents?: AIAgent[];
  onSendMessage?: (message: string, agentId: string) => void;
  className?: string;
}

const AGENTS = [
  {
    id: "chatgpt",
    name: "Chatgpt",
    icon: (
      <HugeiconsIcon
        icon={ChatGptIcon}
        size={24}
        color="currentColor"
        strokeWidth={1.5}
      />
    ),
  },
  {
    id: "gemini",
    name: "Gemini",
    icon: (
      <HugeiconsIcon
        icon={GoogleGeminiIcon}
        size={24}
        color="currentColor"
        strokeWidth={1.5}
      />
    ),
  },
  {
    id: "claude",
    name: "Claude",
    icon: (
      <HugeiconsIcon
        icon={ClaudeIcon}
        size={24}
        color="currentColor"
        strokeWidth={1.5}
      />
    ),
  },
];

export const SelectAIAgent: React.FC<SelectAIAgentProps> = ({
  agents = AGENTS,
  onSendMessage,
  className = "",
}) => {
  const [selectedAgent, setSelectedAgent] = useState<AIAgent>(agents[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [appType, setAppType] = useState<"Web App" | "Mobile App">("Web App");

  return (
    <div
      className={`flex w-full flex-col items-center justify-center p-4 antialiased select-none sm:p-6 ${className}`}
    >
      <div className="relative z-40 w-full max-w-[95%] sm:max-w-110">
        <LayoutGroup>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  mass: 0.8,
                }}
                className="absolute -top-16 left-0 z-0 flex w-fit origin-bottom-left gap-1 rounded-full border-[1.6px] border-[#E8E7ED] bg-white/90 p-1.5 backdrop-blur-xl sm:gap-2 dark:border-white/10 dark:bg-neutral-900/95"
              >
                {agents.map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => {
                      setSelectedAgent(agent);
                      setIsMenuOpen(false);
                    }}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all active:scale-95 sm:h-11 sm:w-11 dark:brightness-150 ${
                      selectedAgent.id === agent.id
                        ? "border-[1.8px] border-[#E9E8EB] bg-white shadow-sm dark:border-white/20 dark:bg-white"
                        : "text-neutral-500 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-white/5"
                    }`}
                  >
                    <div className="scale-110 sm:scale-125">{agent.icon}</div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            layout
            className="rounded-[28px] border border-[#E8E7EF]/70 bg-neutral-100 p-4 shadow-sm transition-all sm:rounded-[36px] sm:p-5 dark:border-white/10 dark:bg-neutral-900"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <motion.button
                layoutId={`agent-${selectedAgent.id}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="mt-1 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center"
              >
                <div className="dark:brightness- scale-[1.4] text-neutral-800 sm:scale-[1.6] dark:text-neutral-100 dark:brightness-125">
                  {selectedAgent.icon}
                </div>
              </motion.button>

              <div className="ml-1 flex h-14 flex-1 flex-col gap-3 sm:h-18 sm:gap-5">
                <input
                  type="text"
                  placeholder="Start a new project"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border-none bg-transparent pt-1 text-lg font-medium text-black outline-none placeholder:text-[#C6C5CA] sm:text-[20px] dark:text-white dark:placeholder:text-neutral-600"
                />
              </div>
            </div>

            <div className="mt-6 flex w-full items-center justify-between sm:mt-8">
              <motion.button
                onClick={() =>
                  setAppType((t) =>
                    t === "Web App" ? "Mobile App" : "Web App"
                  )
                }
                className="flex items-center gap-2 overflow-hidden rounded-full border-[1.8px] border-[#E8E7EF] bg-white px-4 py-1.5 shadow-xs transition-all hover:bg-neutral-50 active:scale-95 sm:px-5 sm:py-2 dark:border-white/5 dark:bg-neutral-800 dark:hover:bg-neutral-800/50"
              >
                <div className="relative h-5 overflow-hidden sm:h-6">
                  <AnimatedText
                    text={appType}
                    className="text-sm font-semibold whitespace-nowrap text-[#535256] sm:text-base dark:text-neutral-300"
                  />
                </div>

                <motion.div
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 26,
                  }}
                  className="flex flex-col -space-y-1 text-[#BDBCC3] dark:text-neutral-600"
                >
                  <ChevronUp size={14} strokeWidth={3} />
                  <ChevronDown size={14} strokeWidth={3} />
                </motion.div>
              </motion.button>

              <button
                title="send"
                onClick={() => onSendMessage?.(message, selectedAgent.id)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white shadow-md transition-all hover:scale-105 active:scale-90 sm:h-11 sm:w-11 dark:bg-white dark:text-black"
              >
                <ArrowRight size={20} strokeWidth={2.5} />
              </button>
            </div>
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
};

function AnimatedText({
  text,
  className,
  delayStep = 0.014,
}: {
  text: string;
  className?: string;
  delayStep?: number;
}) {
  const chars = text.split("");

  return (
    <span className={className} style={{ display: "inline-flex" }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={text} style={{ display: "inline-flex " }}>
          {chars.map((char, i) => (
            <motion.span
              key={i}
              initial={{
                y: 10,
                opacity: 0,
                scale: 0.5,
                filter: "blur(2px)",
              }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                y: -10,
                opacity: 0,
                scale: 0.5,
                filter: "blur(2px)",
              }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 16,
                mass: 1.2,
                delay: i * delayStep,
              }}
              style={{
                display: "inline-block",
                whiteSpace: char === " " ? "pre" : undefined,
                willChange: "transform",
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
