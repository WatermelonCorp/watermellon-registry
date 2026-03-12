"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ArrowUp, Square } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { IoBookOutline } from "react-icons/io5";
import { useTheme } from "next-themes";

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
    ThinkingMode.NORMAL
  );
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useTheme();

  const isDark = theme === "dark";

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
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
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
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-white font-sans text-neutral-900 antialiased selection:bg-black/10 dark:bg-[#000000] dark:text-white dark:selection:bg-white/10">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 h-[600px] w-[100px] -translate-x-1/2 rounded-full bg-blue-500/10 opacity-50 blur-[120px] dark:bg-blue-500/5" />
      </div>

      {/* Messages Scroll Area */}
      <div className="no-scrollbar relative z-10 flex-1 overflow-y-auto px-6">
        <div className="mx-auto w-full max-w-3xl pt-14 pb-40">
          <AnimatePresence initial={false}>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[300px] flex-col items-center justify-center space-y-4"
              ></motion.div>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  className={`mb-8 flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-[14px] px-4 py-2 text-[15px] leading-[1.6] ${
                      message.role === "user"
                        ? "bg-neutral-100 font-medium dark:bg-[#121212]"
                        : "bg-neutral-100 font-medium dark:bg-[#121212]"
                    } `}
                  >
                    {message.isThinking ? (
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <motion.span
                            className="bg-clip-text text-base font-medium tracking-wide text-transparent"
                            style={{
                              backgroundImage: isDark
                                ? "linear-gradient(90deg, #a3a3a3 0%, #a3a3a3 40%, #ffffff 50%, #a3a3a3 60%, #a3a3a3 100%)"
                                : "linear-gradient(90deg, #525252 0%, #525252 40%, #000000 50%, #525252 60%, #525252 100%)",
                              backgroundSize: "200% 100%",
                            }}
                            animate={{ backgroundPositionX: ["100%", "-100%"] }}
                            transition={{
                              repeat: Infinity,
                              duration: 2,
                              ease: "linear",
                            }}
                          >
                            Thinking...
                          </motion.span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-base whitespace-pre-wrap text-neutral-700 dark:text-neutral-500">
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

      <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-20 bg-gradient-to-t from-white via-white/90 to-transparent px-4 pt-10 pb-8 dark:from-black dark:via-black/90">
        <div className="pointer-events-auto mx-auto w-full max-w-3xl">
          <motion.div
            layout
            initial={false}
            className={`relative flex flex-col rounded-2xl border-[1.2px] shadow-none backdrop-blur-xl transition-all duration-300 dark:shadow-2xl ${
              isFocused
                ? "border-neutral-300 bg-white dark:border-white/15 dark:bg-[#121212]"
                : "border-neutral-200 bg-white/95 dark:border-white/8 dark:bg-[#0d0d0d]/95"
            } `}
          >
            {thinkingMode === ThinkingMode.DEEP && (
              <motion.div
                layoutId="active-line"
                className="absolute top-0 right-8 left-8 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"
              />
            )}

            <div className="flex flex-col px-0">
              <div className="mb-1 flex min-h-[24px] items-end gap-3 rounded-[16px] border-b border-neutral-200 bg-neutral-100 px-5 py-4 dark:border-[#121212] dark:bg-black/80">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Ask anything..."
                  className="flex-1 resize-none overflow-hidden border-none bg-transparent py-1 text-[16px] leading-relaxed font-normal text-neutral-800 outline-none placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-[#555]"
                  style={{ minHeight: "28px" }}
                />

                <AnimatePresence mode="popLayout" initial={false}>
                  {(inputValue.trim() || isProcessing) && (
                    <motion.button
                      key="send"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                      onClick={handleSend}
                      disabled={isProcessing}
                      className={`mb-1 flex items-center justify-center rounded-full p-1.5 ${
                        isProcessing
                          ? "bg-neutral-900 text-neutral-100 dark:bg-neutral-800 dark:text-neutral-500"
                          : "bg-black text-white dark:bg-white dark:text-black"
                      } `}
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
                          : ThinkingMode.DEEP
                      )
                    }
                    className={`relative flex items-center gap-2 overflow-hidden rounded-full px-3 py-1.5 transition-all duration-300 ${
                      thinkingMode === ThinkingMode.DEEP
                        ? " "
                        : "text-neutral-500 hover:bg-black/[0.05] hover:text-neutral-900 dark:text-neutral-500 dark:hover:bg-white/[0.03] dark:hover:text-neutral-300"
                    }`}
                  >
                    <IoBookOutline
                      size={14}
                      className={`transition-colors duration-300 ${
                        thinkingMode === ThinkingMode.DEEP
                          ? "text-blue-600 dark:text-blue-400"
                          : ""
                      }`}
                    />

                    <div className="relative flex h-4 items-center overflow-hidden">
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
                            <span className="text-[13px] font-semibold whitespace-nowrap text-blue-600 dark:text-blue-100">
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
                              className="absolute inset-0 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-[#0C0C0C]"
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
                  <span className="text-[12px] font-medium tracking-wider text-neutral-400 uppercase select-none dark:text-neutral-700">
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
