"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ArrowUp, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { IoBookOutline } from "react-icons/io5";

export interface MessageInput {
  id: string;
  role: "user" | "assistant";
  content: string;
  isThinking?: boolean;
}

export const ThinkingMode = {
  NORMAL: "NORMAL",
  DEEP: "DEEP",
} as const;

export type ThinkingMode = (typeof ThinkingMode)[keyof typeof ThinkingMode];

export interface AiInput005Props {
  messages: MessageInput[];
  onSend: (text: string, mode: ThinkingMode) => void;
  isProcessing: boolean;
}

export const AiInput005: React.FC<AiInput005Props> = ({
  messages,
  onSend,
  isProcessing,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [thinkingMode, setThinkingMode] = useState<ThinkingMode>(
    ThinkingMode.NORMAL,
  );
  const [isFocused, setIsFocused] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [inputValue]);

  const handleSend = () => {
    if (!inputValue.trim() || isProcessing) return;

    onSend(inputValue.trim(), thinkingMode);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative flex flex-col w-full h-full min-h-screen bg-white dark:bg-[#000000] text-zinc-900 dark:text-white selection:bg-black/10 dark:selection:bg-white/10 font-sans antialiased overflow-hidden ">
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[600px] bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full opacity-50" />
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative z-10 px-6 ">
        <div className="max-w-3xl mx-auto pt-14 pb-40 w-full">
          <AnimatePresence initial={false}>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center min-h-[300px] space-y-4"
              ></motion.div>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  className={`flex mb-8 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`
                      max-w-[85%] px-4 py-2 rounded-[14px] text-[15px] leading-[1.6]
                      ${
                        message.role === "user"
                          ? "bg-zinc-100 dark:bg-[#121212] font-medium"
                          : "bg-zinc-100 dark:bg-[#121212] font-medium "
                      }
                    `}
                  >
                    {message.isThinking ? (
                      <div className="flex items-center gap-2 ">
                        <div className="flex items-center gap-2  ">
                          <div className="relative">
                            {/* Base Text  */}
                            <span className="text-base text-neutral-500 dark:text-neutral-500 font-medium tracking-wide">
                              Thinking...
                            </span>

                            {/*  Text Overlay */}
                            <motion.div
                              initial={{ clipPath: "inset(0 100% 0 0)" }}
                              animate={{ clipPath: "inset(0 -100% 0 0)" }}
                              transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut",
                              }}
                              className="absolute inset-0 text-base text-neutral-800 dark:text-neutral-400 font-medium tracking-wide select-none pointer-events-none "
                              aria-hidden="true"
                            >
                              Thinking...
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap text-base text-zinc-700 dark:text-neutral-500 ">
                        {message.content}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-10 bg-gradient-to-t from-white via-white/90 dark:from-black dark:via-black/90 to-transparent z-20 pointer-events-none">
        <div className="w-full mx-auto max-w-3xl pointer-events-auto">
          <motion.div
            layout
            initial={false}
            className={`relative flex flex-col border-[1.2px] rounded-2xl backdrop-blur-xl shadow-none dark:shadow-2xl transition-all duration-300
                            ${
                              isFocused
                                ? "bg-white border-zinc-300 dark:bg-[#121212] dark:border-white/15"
                                : "bg-white/95 border-zinc-200 dark:bg-[#0d0d0d]/95 dark:border-white/8"
                            }
                        `}
          >
            {thinkingMode === ThinkingMode.DEEP && (
              <motion.div
                layoutId="active-line"
                className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"
              />
            )}

            <div className="px-0  flex flex-col ">
              <div className="flex items-end gap-3 min-h-[24px] px-5 py-4 bg-zinc-100 dark:bg-black/80 mb-1 border-b rounded-[16px] border-zinc-200 dark:border-[#121212]">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent border-none outline-none resize-none text-[16px] py-1 text-zinc-800 dark:text-neutral-100 placeholder:text-zinc-400 dark:placeholder:text-[#555] font-normal leading-relaxed overflow-hidden"
                  style={{ minHeight: "28px" }}
                />

                <AnimatePresence mode="wait">
                  {(inputValue.trim() || isProcessing) && (
                    <motion.button
                      key="send"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      onClick={handleSend}
                      disabled={isProcessing}
                      className={`
                        mb-1 p-1.5 rounded-full flex items-center justify-center transition-all
                        ${isProcessing ? "bg-zinc-100 dark:bg-neutral-800 text-zinc-400 dark:text-neutral-500" : "bg-black dark:bg-white text-white dark:text-black hover:scale-105 active:scale-95"}
                      `}
                    >
                      {isProcessing ? (
                        <Square size={16} fill="currentColor" />
                      ) : (
                        <ArrowUp size={18} strokeWidth={3} />
                      )}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-1.5">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() =>
                      setThinkingMode((prev) =>
                        prev === ThinkingMode.DEEP
                          ? ThinkingMode.NORMAL
                          : ThinkingMode.DEEP,
                      )
                    }
                    className={` flex items-center  gap-2 px-3 py-1.5 rounded-full transition-all duration-300 relative overflow-hidden ${
                      thinkingMode === ThinkingMode.DEEP
                        ? " "
                        : "text-zinc-500 dark:text-neutral-500 hover:text-zinc-900 dark:hover:text-neutral-300 hover:bg-black/[0.05] dark:hover:bg-white/[0.03]"
                    }`}
                  >
                    <IoBookOutline
                      size={14}
                      className={`transition-colors duration-300 ${thinkingMode === ThinkingMode.DEEP ? "text-blue-600 dark:text-blue-400" : ""}`}
                    />

                    <div className="relative flex items-center overflow-hidden h-4">
                      <AnimatePresence mode="wait">
                        {thinkingMode === ThinkingMode.DEEP ? (
                          <motion.div
                            key="deep"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            className="relative"
                          >
                            {/* Base Text */}
                            <span className="text-[13px] font-semibold text-blue-600 dark:text-blue-100 whitespace-nowrap">
                              Deep Thinking Now
                            </span>

                            {/* Shimmer Effect overlay */}
                            <motion.div
                              initial={{ x: "-100%" }}
                              animate={{ x: "100%" }}
                              transition={{
                                repeat: Infinity,
                                duration: 1.5,
                                ease: "linear",
                              }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 dark:via-[#0C0C0C] to-transparent skew-x-[-20deg]"
                            />
                          </motion.div>
                        ) : (
                          <motion.span
                            key="normal"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            className="text-[13px] font-medium whitespace-nowrap"
                          >
                            Try Deep Thinking
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.button>
                </div>

                <div className="flex items-center gap-2 pr-1">
                  <span className="text-[12px] font-medium text-zinc-400 dark:text-neutral-700 uppercase tracking-wider select-none">
                    AGI is here
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
