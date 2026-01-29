import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { ArrowRight, ChevronUp, ChevronDown, Sun, Moon } from 'lucide-react';
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
}
// default values 
const AGENTS = [
    {
        id: 'chatgpt', name: 'Chatgpt', icon: <HugeiconsIcon
            icon={ChatGptIcon}
            size={24}
            color="#2b2b2b "
            strokeWidth={1.5}
        />
    },
    {
        id: 'gemini', name: 'Gemini', icon: <HugeiconsIcon
            icon={GoogleGeminiIcon}
            size={24}
            color="#003355"
            strokeWidth={1.5}
        />
    },
    {
        id: 'claude', name: 'Claude', icon: <HugeiconsIcon
            icon={ClaudeIcon}
            size={24}
            color="#D97757"
            strokeWidth={1.5}
        />
    },
];

export const SelectAIAgent: React.FC<SelectAIAgentProps> = ({ agents = AGENTS, onSendMessage }) => {
    const [selectedAgent, setSelectedAgent] = useState<AIAgent>(agents[0]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [appType, setAppType] = useState<"Web App" | "Mobile App">("Web App");
    const [isDark, setIsDark] = useState(false);

    return (
        <div className={`h-screen w-full flex flex-col items-center justify-center transition-colors duration-500 ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#FDFDFD]'}`}>

            {/* Theme Toggle Button */}
            <button
                onClick={() => setIsDark(!isDark)}
                className={`mb-12 p-3 rounded-full border transition-all active:scale-90 ${isDark ? 'bg-[#1C1C1E] border-white/10 text-yellow-400' : 'bg-white border-black/5 text-gray-400 shadow-sm'}`}
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="relative w-full max-w-[440px] antialiased select-none">
                <LayoutGroup>
                    {/* Floating Menu */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.75, y: 12, x: -12, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, y: 0, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.75, y: 12, x: -12, filter: "blur(10px)" }}
                                transition={{ type: "spring", stiffness: 360, damping: 26, mass: 0.8 }}
                                className={`absolute -top-[46%] left-0 w-[170px] overflow-x-auto no-scrollbar backdrop-blur-xl border-[1.6px] shadow-sm rounded-full p-1.5 py-2 flex gap-2 z-50 origin-top-left transition-colors ${isDark ? 'bg-[#1C1C1E]/90 border-white/10' : 'bg-white/90 border-[#E8E7ED]'
                                    }`}
                            >
                                {agents.map((agent) => (
                                    <motion.button
                                        key={agent.id}
                                        layoutId={`agent-${agent.id}`}
                                        onClick={() => {
                                            setSelectedAgent(agent);
                                            setIsMenuOpen(false);
                                        }}
                                        className={`w-11 h-11 rounded-full flex items-center shrink-0 justify-center transition-colors ${selectedAgent.id === agent.id
                                            ? (isDark ? "bg-[#2C2C2E] border-[1.8px] border-white/20" : "bg-[#FEFEFE] border-[1.8px] border-[#E9E8EB]")
                                            : (isDark ? "hover:bg-white/5" : "hover:bg-gray-50")
                                            }`}
                                    >
                                        <div className="scale-125">{agent.icon}</div>
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main Input Box */}
                    <motion.div
                        layout
                        className={`rounded-[36px] p-5 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] border transition-colors ${isDark ? 'bg-[#1C1C1E] border-white/10' : 'bg-[#F4F4F9] border-[#E8E7EF]/70'
                            }`}
                    >
                        <div className="flex items-start gap-4">
                            {/* Active Icon Anchor */}
                            <motion.button
                                layoutId={`agent-${selectedAgent.id}`}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="mt-1.5 w-8 h-8 flex items-center justify-center shrink-0 cursor-pointer"
                            >
                                <div className="scale-[1.6]">{selectedAgent.icon}</div>
                            </motion.button>

                            <div className="flex-1 flex flex-col h-18 gap-5 ml-2">
                                <input
                                    type="text"
                                    placeholder="Start a new project"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className={`w-full bg-transparent border-none outline-none text-[20px] font-medium pt-1 transition-colors ${isDark ? 'text-white placeholder:text-gray-600' : 'text-black placeholder:text-[#C6C5CA]'
                                        }`}
                                />
                            </div>
                        </div>
                        <div className="flex items-center mt-8 justify-between w-full">

                            {/* Mode Selector Pill */}
                            <motion.button
                                layout
                                transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.9 }}
                                onClick={() => setAppType(t => (t === "Web App" ? "Mobile App" : "Web App"))}
                                className={`flex items-center gap-2.5 px-5 py-[8px] rounded-full shadow-xs border-[1.8px] active:scale-95 transition-all ${isDark ? 'bg-[#2C2C2E] border-white/5 hover:bg-[#3A3A3C]' : 'bg-[#fefefe] border-[#E8E7EF] hover:bg-[#fefefe]/70'
                                    }`}
                            >
                                <div className="relative overflow-hidden h-[24px]">
                                    <AnimatePresence mode="popLayout">
                                        <motion.span
                                            key={appType}
                                            initial={{ y: 16, opacity: 0, filter: "blur(6px)" }}
                                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                            exit={{ y: -16, opacity: 0, filter: "blur(6px)" }}
                                            transition={{ type: "spring", stiffness: 200, damping: 22, mass: 0.6 }}
                                            className={`block text-base font-bold whitespace-nowrap transition-colors ${isDark ? 'text-gray-300' : 'text-[#535256]'}`}
                                        >
                                            {appType}
                                        </motion.span>
                                    </AnimatePresence>
                                </div>

                                <div className={`flex flex-col -space-y-1 transition-colors ${isDark ? 'text-gray-500' : 'text-[#BDBCC3]'}`}>
                                    <ChevronUp size={16} strokeWidth={3.5} />
                                    <ChevronDown size={16} strokeWidth={3.5} />
                                </div>
                            </motion.button>

                            {/* Black Action Circle */}
                            <button title='send'
                                onClick={() => onSendMessage?.(message, selectedAgent.id)}
                                className={`w-11 h-11 rounded-full flex items-center justify-center hover:scale-105 active:scale-90 transition-all shadow-md ${isDark ? 'bg-white text-black' : 'bg-[#1C1C1E] text-white'
                                    }`}
                            >
                                <ArrowRight size={22} strokeWidth={2.5} />
                            </button>
                        </div>
                    </motion.div>
                </LayoutGroup>
            </div>
        </div>
    );
};