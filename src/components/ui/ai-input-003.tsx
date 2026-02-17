"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Youtube } from "lucide-react";

export type MentionType = "google" | "youtube" | null;

export interface MessageReply01 {
  id: string;
  text: string;
  sender: "user" | "ai";
  mention?: MentionType;
  timestamp: number;
}

interface AiInput003Props {
  onSendMessage?: (message: string, mention: MentionType) => void;
  placeholder?: string;
}

// --- Internal Components ---
const MentionBadge: React.FC<{ type: MentionType; compact?: boolean }> = ({
  type,
  compact = false,
}) => {
  if (!type) return null;
  const isGoogle = type === "google";
  const label = isGoogle ? "Google Search" : "Youtube Analyzer";

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-300 select-none
            ${compact ? "text-xs" : "text-sm"}
            bg-zinc-100 dark:bg-[#222] border border-zinc-200 dark:border-[#333]`}
    >
      {isGoogle ? (
        <div className="w-5 h-5 flex items-center justify-center bg-white rounded-md shadow-sm border border-zinc-100 dark:border-transparent">
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        </div>
      ) : (
        <div className="w-5 h-5 flex items-center justify-center bg-red-600 rounded-md shadow-sm">
          <Youtube size={14} className="text-white fill-white" />
        </div>
      )}
      <span className="text-zinc-600 dark:text-gray-300 font-medium">
        {label}
      </span>
    </div>
  );
};

export const AiInput003: React.FC<AiInput003Props> = ({
  onSendMessage,
  placeholder = "Type shit..",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<MessageReply01[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [mention, setMention] = useState<MentionType>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (val.includes("@goog")) setMention("google");
    else if (val.includes("@yt")) setMention("youtube");
    else if (!val.includes("@")) setMention(null);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isSending) return;

    setIsSending(true);
    const userMessage: MessageReply01 = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      mention: mention,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (onSendMessage) onSendMessage(inputValue, mention);

    setInputValue("");
    setMention(null);

    setTimeout(() => {
      setIsSending(false);
      setIsTyping(true);

      setTimeout(() => {
        const aiMessage: MessageReply01 = {
          id: (Date.now() + 1).toString(),
          text: "This is a simulated response.",
          sender: "ai",
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1500);
    }, 400);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white dark:bg-black text-zinc-900 dark:text-white overflow-hidden selection:bg-zinc-200 dark:selection:bg-white/20 border-x border-zinc-200 dark:border-zinc-800/50 relative">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[100%] h-[30%] bg-zinc-100/50 dark:bg-zinc-500/10 blur-[120px]" />
      </div>

      {/* Messages Scroll Area  */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 flex flex-col custom-scrollbar relative z-10"
      >
        <div className="flex-grow" />
        <div className="w-full max-w-2xl mx-auto py-10 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`px-5 py-3 rounded-[10px] max-w-[85%] text-[15px] leading-relaxed shadow-sm transition-colors duration-300
                  ${
                    msg.sender === "user"
                      ? "bg-zinc-100 dark:bg-[#1a1a1a] text-zinc-800 dark:text-zinc-100 rounded-br-none border border-zinc-200 dark:border-zinc-800/50"
                      : "bg-zinc-50 dark:bg-zinc-900/40 text-zinc-700 dark:text-zinc-200 border border-zinc-100 dark:border-zinc-800/30"
                  }`}
                >
                  {msg.text}
                </div>

                {msg.mention && msg.sender === "user" && (
                  <div className="mt-2">
                    <MentionBadge type={msg.mention} compact />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <div className="flex items-center gap-1.5 px-4 h-6">
              <div className="w-1 h-1 bg-zinc-300 dark:bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1 h-1 bg-zinc-300 dark:bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1 h-1 bg-zinc-300 dark:bg-zinc-500 rounded-full animate-bounce" />
            </div>
          )}
        </div>
      </div>

      {/* Input Bar Area */}
      <div className="flex justify-center items-center w-full px-4 pb-12 pt-4 bg-gradient-to-t from-zinc-50 dark:from-black via-zinc-50/80 dark:via-black to-transparent relative z-20 transition-colors duration-300">
        <div className="w-full max-w-2xl relative">
          <AnimatePresence>
            {mention && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute left-4 bottom-full mb-4"
              >
                <MentionBadge type={mention} />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            animate={{
              scale: isSending ? 0.985 : 1,
              borderColor: isSending ? "rgba(239,68,68,0.35)" : "transparent",
              boxShadow: isSending
                ? "0 0 18px rgba(239,68,68,0.12)"
                : "0 4px 12px rgba(0,0,0,0.03)",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 28,
            }}
            className="relative flex items-center bg-white dark:bg-zinc-900/40 rounded-full border border-zinc-300 dark:border-zinc-800 px-6 pr-4 py-3 overflow-hidden group shadow-md dark:shadow-sm transition-colors duration-300"
          >
            {isSending && (
              <motion.div
                initial={{ y: "220%" }}
                animate={{ y: "-120%" }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t
                                from-red-500/25 via-red-500/10 to-white/10  skew-x-12  blur-md"
              />
            )}

            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={placeholder}
              className="flex-1 bg-transparent border-none outline-none text-[18px] font-semibold text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-gray-500 py-2 z-10"
              autoFocus
            />

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className={`ml-4 w-10 h-10 flex items-center justify-center rounded-full z-10 transition-all duration-300
      ${
        inputValue.trim()
          ? "bg-zinc-900 dark:bg-white text-white dark:text-black shadow-lg shadow-zinc-200 dark:shadow-none active:scale-95"
          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 opacity-50"
      }`}
            >
              <ArrowUp size={20} strokeWidth={3} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
