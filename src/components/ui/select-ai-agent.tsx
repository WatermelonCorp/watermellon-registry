"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { ArrowRight, ChevronUp, ChevronDown } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ChatGptIcon, ClaudeIcon, GoogleGeminiIcon } from '@hugeicons/core-free-icons';

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
        id: 'chatgpt', name: 'Chatgpt', icon: <HugeiconsIcon
            icon={ChatGptIcon}
            size={24}
            color="currentColor"
            strokeWidth={1.5}
        />
    },
    {
        id: 'gemini', name: 'Gemini', icon: <HugeiconsIcon
            icon={GoogleGeminiIcon}
            size={24}
            color="currentColor"
            strokeWidth={1.5}
        />
    },
    {
        id: 'claude', name: 'Claude', icon: <HugeiconsIcon
            icon={ClaudeIcon}
            size={24}
            color="currentColor"
            strokeWidth={1.5}
        />
    },
];

export const SelectAIAgent: React.FC<SelectAIAgentProps> = ({ agents = AGENTS, onSendMessage, className = "" }) => {
    const [selectedAgent, setSelectedAgent] = useState<AIAgent>(agents[0]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [appType, setAppType] = useState<"Web App" | "Mobile App">("Web App");

    return (
        <div className={`w-full flex flex-col items-center justify-center p-4 sm:p-6 antialiased select-none ${className}`}>
            <div className="relative w-full max-w-[95%] sm:max-w-110">
                <LayoutGroup>
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 10, filter: "blur(8px)" }}
                                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.8, y: 10, filter: "blur(8px)" }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30,
                                    mass: 0.8
                                }}
                                className="absolute -top-14 left-0 w-fit backdrop-blur-xl border-[1.6px] shadow-xl rounded-full p-1.5 flex gap-1 sm:gap-2 z-60 origin-bottom-left bg-white/90 border-neutral-200 dark:bg-neutral-900/95 dark:border-neutral-800"
                            >
                                {agents.map((agent) => (
                                    <button
                                        key={agent.id}
                                        onClick={() => {
                                            setSelectedAgent(agent);
                                            setIsMenuOpen(false);
                                        }}
                                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center shrink-0 justify-center transition-all active:scale-95
                        ${selectedAgent.id === agent.id
                                                ? "bg-white border-[1.8px] border-neutral-200 dark:bg-white dark:border-neutral-300 shadow-sm"
                                                : "hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
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
                        className="rounded-[28px] sm:rounded-[36px] p-4 sm:p-5 shadow-sm border transition-all
                            bg-neutral-100 border-neutral-200/70 dark:bg-neutral-900 dark:border-neutral-800"
                    >
                        <div className="flex items-start gap-3 sm:gap-4">
                            <motion.button
                                layoutId={`agent-${selectedAgent.id}`}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="mt-1 w-8 h-8 flex items-center justify-center shrink-0 cursor-pointer"
                            >
                                <div className="scale-[1.4] sm:scale-[1.6] text-neutral-800 dark:text-neutral-100">
                                    {selectedAgent.icon}
                                </div>
                            </motion.button>

                            <div className="flex-1 flex flex-col h-14 sm:h-18 gap-3 sm:gap-5 ml-1">
                                <input
                                    type="text"
                                    placeholder="Start a new project"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full bg-transparent border-none outline-none text-lg sm:text-[20px] font-medium pt-1 
                                        text-black placeholder:text-neutral-400 dark:text-white dark:placeholder:text-neutral-600"
                                />
                            </div>
                        </div>

                        <div className="flex items-center mt-6 sm:mt-8 justify-between w-full">
                            <motion.button
                                layout
                                transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.9 }}
                                onClick={() => setAppType(t => (t === "Web App" ? "Mobile App" : "Web App"))}
                                className="flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-xs border-[1.8px] active:scale-95 transition-all
                                    bg-white border-neutral-200 hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700"
                            >
                                <div className="relative overflow-hidden h-5 sm:h-6">
                                    <AnimatePresence mode="popLayout">
                                        <motion.span
                                            key={appType}
                                            initial={{ y: 12, opacity: 0, filter: "blur(4px)" }}
                                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                            exit={{ y: -12, opacity: 0, filter: "blur(4px)" }}
                                            transition={{ type: "spring", stiffness: 200, damping: 22, mass: 0.6 }}
                                            className="block text-sm sm:text-base font-bold whitespace-nowrap text-neutral-600 dark:text-neutral-300"
                                        >
                                            {appType}
                                        </motion.span>
                                    </AnimatePresence>
                                </div>

                                <div className="flex flex-col -space-y-1 text-neutral-400 dark:text-neutral-600">
                                    <ChevronUp size={14} strokeWidth={3} />
                                    <ChevronDown size={14} strokeWidth={3} />
                                </div>
                            </motion.button>

                            <button
                                title='send'
                                onClick={() => onSendMessage?.(message, selectedAgent.id)}
                                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center hover:scale-105 active:scale-90 transition-all shadow-md
                                    bg-neutral-900 text-white dark:bg-white dark:text-black"
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