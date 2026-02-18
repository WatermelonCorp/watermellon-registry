"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Globe,
  ChevronDown,
  Send,
  Image as ImageIcon,
  FileText,
  Layers,
  Sparkles,
  Cpu,
  Zap,
} from "lucide-react";
import { LuBrain } from "react-icons/lu";
import { PiLightbulbFilament } from "react-icons/pi";

interface Model {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

interface AIInputProps {
  messages?: Message[];
  onSendMessage?: (text: string, modelId: string) => void;
  models?: Model[];
  backgroundText?: string;
  placeholder?: string;
}

const DEFAULT_MODELS: Model[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    icon: <PiLightbulbFilament className="w-4 h-4" />,
  },
  {
    id: "claude-3-5",
    name: "Claude 3.5 Sonnet",
    icon: <Sparkles className="w-4 h-4" />,
  },
  { id: "gemini-pro", name: "Gemini Pro", icon: <Cpu className="w-4 h-4" /> },
  { id: "llama-3-1", name: "Llama 3.1", icon: <Zap className="w-4 h-4" /> },
];

export const AiInput: React.FC<AIInputProps> = ({
  messages = [],
  onSendMessage = (text, model) =>
    console.log(`Sending: ${text} with ${model}`),
  models = DEFAULT_MODELS,
  backgroundText = "Skiper Input 001",
  placeholder = "Ask anything...",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isPlusMenuOpen, setIsPlusMenuOpen] = useState(false);
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isDeepMindActive, setIsDeepMindActive] = useState(false);
  const [selectedModel, setSelectedModel] = useState(models[0]);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasMessages = messages.length > 0;

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsPlusMenuOpen(false);
        setIsModelMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue, selectedModel.id);
    setInputValue("");
  };

  return (
    <div
      className="relative w-full font-sans h-screen flex flex-col bg-zinc-50 dark:bg-[#080808] transition-colors duration-300 overflow-hidden"
      ref={containerRef}
    >
      {/* Background Text */}
      <AnimatePresence>
        {!hasMessages && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 flex items-end justify-center mb-10 pointer-events-none select-none z-0"
          >
            <h1 className=" text-2xl md:text-[150px] font-bold text-zinc-200/40 dark:text-[#141414]/40 tracking-normal font-sans">
              {backgroundText}
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Area */}
      <div
        ref={scrollRef}
        className={`flex-1 overflow-y-auto w-full flex flex-col items-center scroll-smooth custom-scrollbar pt-10 z-10 ${!hasMessages ? "hidden" : ""}`}
      >
        <div className="w-full max-w-[780px] flex flex-col gap-4 px-4 pb-10">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-[15px] font-medium shadow-sm border transition-colors ${
                    msg.sender === "user"
                      ? "bg-zinc-900 dark:bg-[#1c1c1c] text-white border-zinc-800 dark:border-white/5 rounded-tr-none"
                      : "bg-white dark:bg-[#111111] text-zinc-800 dark:text-[#e5e5e5] border-zinc-200 dark:border-white/5 rounded-tl-none flex items-center gap-2"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Input Section Wrapper */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }}
        className={`w-full flex justify-center px-4 p-6 z-20 ${!hasMessages ? "flex-1 items-center justify-center" : "items-end pb-10"}`}
      >
        <motion.div
          layout
          className="bg-white dark:bg-[#0E0E0E] border border-zinc-200 dark:border-[#1c1c1c]/40 rounded-[24px] p-3 py-2 shadow-xl dark:shadow-2xl focus-within:border-zinc-300 dark:focus-within:border-[#2d2d2d] w-full max-w-[780px] h-fit pt-4 transition-colors"
        >
          <textarea
            ref={textAreaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={placeholder}
            className="w-full bg-transparent text-zinc-600 dark:text-[#6e7070] placeholder-zinc-400 dark:placeholder-[#4F5151] font-semibold text-[16px] resize-none outline-none min-h-[44px] max-h-[200px] mb-2 px-2 leading-relaxed"
            rows={1}
          />

          <div className="flex items-center justify-between mt-2 bg-zinc-50 dark:bg-[#080808] p-1.5 px-2 rounded-xl border border-zinc-100 dark:border-transparent transition-colors">
            <div className="flex items-center gap-1.5">
              <div className="relative flex items-center justify-center">
                <button
                  title="add file"
                  onClick={() => setIsPlusMenuOpen(!isPlusMenuOpen)}
                  className={`p-2.5 rounded-lg transition-colors flex border items-center justify-center ${
                    isPlusMenuOpen
                      ? "bg-zinc-200 dark:bg-[#262626] text-zinc-900 dark:text-white border-zinc-300 dark:border-[#262626]"
                      : "text-zinc-500 dark:text-[#a3a3a3] bg-zinc-100 dark:bg-[#0d0d0d] border-zinc-200 dark:border-[#1a1a1ac1] hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  <motion.div
                    animate={{ rotate: isPlusMenuOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Plus className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isPlusMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full left-0 mb-3 bg-white dark:bg-[#171717] border border-zinc-200 dark:border-[#262626] rounded-xl overflow-hidden shadow-xl min-w-[160px] z-50 transition-colors"
                    >
                      <div className="p-1 flex flex-col gap-0.5">
                        <PlusMenuItem
                          icon={<ImageIcon className="w-4 h-4" />}
                          label="Images"
                          onClick={() => setIsPlusMenuOpen(false)}
                        />
                        <PlusMenuItem
                          icon={<FileText className="w-4 h-4" />}
                          label="Documents"
                          onClick={() => setIsPlusMenuOpen(false)}
                        />
                        <PlusMenuItem
                          icon={<Layers className="w-4 h-4" />}
                          label="Connect Apps"
                          onClick={() => setIsPlusMenuOpen(false)}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                onClick={() => setIsSearchActive(!isSearchActive)}
                layout
                className={`flex items-center gap-2 p-2.5 rounded-lg border transition-all duration-300 ${
                  isSearchActive
                    ? "bg-sky-50 dark:bg-[#1e293b] text-sky-600 dark:text-[#38bdf8] border-sky-200 dark:border-[#0ea5e9]/30 shadow-sm"
                    : "text-zinc-500 dark:text-[#a3a3a3] bg-zinc-100 dark:bg-[#0d0d0d] border-zinc-200 dark:border-[#1a1a1ac1] hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                <Globe
                  className={`w-5 h-5 ${isSearchActive ? "text-sky-600 dark:text-[#38bdf8]" : "text-zinc-500 dark:text-[#a3a3a3]"}`}
                />
                {isSearchActive && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    className="text-sm font-medium whitespace-nowrap overflow-hidden hidden sm:inline"
                  >
                    Search
                  </motion.span>
                )}
              </motion.button>

              <motion.button
                onClick={() => setIsDeepMindActive(!isDeepMindActive)}
                layout
                className={`flex items-center gap-2 p-2.5 rounded-lg border transition-all duration-300 ${
                  isDeepMindActive
                    ? "bg-indigo-50 dark:bg-[#1e293b] text-indigo-600 dark:text-[#a3a3a3] border-indigo-200 dark:border-[#0ea5e9]/30 shadow-sm"
                    : "text-zinc-500 dark:text-[#a3a3a3] bg-zinc-100 dark:bg-[#0d0d0d] border-zinc-200 dark:border-[#1a1a1ac1] hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                <LuBrain
                  className={`w-5 h-5 ${isDeepMindActive ? "text-indigo-600 dark:text-white" : "text-zinc-500 dark:text-[#a3a3a3]"}`}
                />
                {isDeepMindActive && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    className="text-sm font-medium whitespace-nowrap overflow-hidden hidden sm:inline"
                  >
                    DeepMind
                  </motion.span>
                )}
              </motion.button>

              <div className="relative">
                <button
                  onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
                  className="flex items-center gap-2 p-2.5 rounded-lg text-zinc-500 dark:text-[#a3a3a3] bg-zinc-100 dark:bg-[#0d0d0d] border border-zinc-200 dark:border-[#1a1a1ac1] hover:text-zinc-900 dark:hover:text-white transition-all max-w-[120px] sm:max-w-none"
                >
                  <span
                    className={
                      isModelMenuOpen ? "text-sky-600 dark:text-[#38bdf8]" : ""
                    }
                  >
                    {selectedModel.icon}
                  </span>
                  <span className="text-sm font-medium truncate hidden sm:inline">
                    {selectedModel.name}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 shrink-0 transition-transform duration-200 ${isModelMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isModelMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full left-0 mb-3 bg-white dark:bg-[#171717] border border-zinc-200 dark:border-[#262626] rounded-xl overflow-hidden shadow-xl min-w-[200px] z-50 transition-colors"
                    >
                      <div className="p-1.5 flex flex-col gap-0.5">
                        {models.map((model) => (
                          <button
                            key={model.id}
                            onClick={() => {
                              setSelectedModel(model);
                              setIsModelMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap ${
                              selectedModel.id === model.id
                                ? "bg-zinc-100 dark:bg-[#262626] text-zinc-900 dark:text-white"
                                : "text-zinc-500 dark:text-[#a3a3a3] hover:bg-zinc-50 dark:hover:bg-[#262626]/50 hover:text-zinc-900 dark:hover:text-white"
                            }`}
                          >
                            <span
                              className={
                                selectedModel.id === model.id
                                  ? "text-[#38bdf8]"
                                  : ""
                              }
                            >
                              {model.icon}
                            </span>
                            <span className="font-medium">{model.name}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <button
              title="send"
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={`p-3 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center ${
                inputValue.trim()
                  ? "bg-blue-600 dark:bg-transparent text-white dark:text-[#0ea5e9] border-[1.6px] border-blue-600 dark:border-[#0ea5e9]/20 scale-100 shadow-md shadow-blue-500/20 dark:shadow-none"
                  : "bg-zinc-100 dark:bg-[#171717] text-zinc-300 dark:text-[#404040] cursor-not-allowed"
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const PlusMenuItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-3 py-2 text-zinc-500 dark:text-[#a3a3a3] hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-[#262626] transition-colors rounded-lg text-sm text-left group"
  >
    <span className="group-hover:scale-110 transition-transform">{icon}</span>
    {label}
  </button>
);
