"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ArrowUp,
  Square,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { IoBookOutline } from 'react-icons/io5';

export interface MessageInput {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isThinking?: boolean;
}

export enum ThinkingMode {
  NORMAL = 'NORMAL',
  DEEP = 'DEEP'
}


export const AiInput005 = () => {
  const [messages, setMessages] = useState<MessageInput[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [thinkingMode, setThinkingMode] = useState<ThinkingMode>(ThinkingMode.NORMAL);
  const [isFocused, setIsFocused] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [inputValue]);

  const handleSend = async () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: MessageInput = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
    };

    const thinkingMessage: MessageInput = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      isThinking: true,
    };

    setMessages(prev => [...prev, userMessage, thinkingMessage]);
    setInputValue('');
    setIsProcessing(true);

    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.isThinking
            ? { ...msg, isThinking: false, content: "I dunnoo 😭" }
            : msg
        )
      );
      setIsProcessing(false);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative flex flex-col w-full h-full min-h-screen bg-[#000000] text-white selection:bg-white/10 font-sans antialiased overflow-hidden ">


      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full opacity-50" />
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative z-10 px-6 " >
        <div className="max-w-[60%] mx-auto pt-14 pb-40 w-full">
          <AnimatePresence initial={false}>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center min-h-[300px] space-y-4"
              >
              </motion.div>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  className={`flex mb-8 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      max-w-[85%] px-4 py-2 rounded-[14px] bg-[#121212] text-[15px] leading-[1.6]
                      ${message.role === 'user'
                        ? '  font-medium'
                        : ' font-medium '
                      }
                    `}
                  >
                    {message.isThinking ? (
                      <div className="flex items-center gap-2 ">
                        <div className="flex items-center gap-2  ">
                          <div className="relative">
                            {/* Base Text  */}
                            <span className="text-base text-neutral-500 font-medium tracking-wide">
                              Thinking...
                            </span>

                            {/*  Text Overlay */}
                            <motion.div
                              initial={{ clipPath: 'inset(0 100% 0 0)' }}
                              animate={{ clipPath: 'inset(0 -100% 0 0)' }}
                              transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut",
                              }}
                              className="absolute inset-0 text-base text-neutral-400 font-medium tracking-wide select-none pointer-events-none "
                              aria-hidden="true"
                            >
                              Thinking...
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap text-base text-neutral-500 ">{message.content}</div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 pt-10 bg-gradient-to-t from-black via-black/90 to-transparent z-20 pointer-events-none">
        <div className="w-full mx-auto max-w-[60%] pointer-events-auto">
          <motion.div
            layout
            initial={false}
            animate={{
              backgroundColor: isFocused ? 'rgba(18, 18, 18, 1)' : 'rgba(13, 13, 13, 0.95)',
              borderColor: isFocused ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.08)'
            }}
            className="relative flex flex-col border-[1.2px] border-[#121212] rounded-2xl backdrop-blur-xl shadow-2xl transition-all duration-300"
          >
            {thinkingMode === ThinkingMode.DEEP && (
              <motion.div
                layoutId="active-line"
                className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"
              />
            )}

            <div className="px-0  flex flex-col ">
              <div className="flex items-end gap-3 min-h-[24px] px-5 py-4 bg-black/80 mb-1 border-b rounded-[20px] border-[#121212]">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent border-none outline-none resize-none text-[16px] py-1 text-neutral-100 placeholder:text-[#555] font-normal leading-relaxed overflow-hidden"
                  style={{ minHeight: '28px' }}
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
                        ${isProcessing ? 'bg-neutral-800 text-neutral-500' : 'bg-white text-black hover:scale-105 active:scale-95'}
                      `}
                    >
                      {isProcessing ? <Square size={16} fill="currentColor" /> : <ArrowUp size={18} strokeWidth={3} />}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between px-4 py-2" >
                <div className="flex items-center gap-1.5">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setThinkingMode(prev => prev === ThinkingMode.DEEP ? ThinkingMode.NORMAL : ThinkingMode.DEEP)}
                    className={` flex items-center  gap-2 px-3 py-1.5 rounded-full transition-all duration-300 relative overflow-hidden ${thinkingMode === ThinkingMode.DEEP
                        ? ' '
                        : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.03]'}`} >
                    <IoBookOutline
                      size={14}
                      className={`transition-colors duration-300 ${thinkingMode === ThinkingMode.DEEP ? 'text-blue-400' : ''}`}
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
                            <span className="text-[13px] font-semibold text-blue-100 whitespace-nowrap">
                              Deep Thinking Now
                            </span>

                            {/* Shimmer Effect overlay */}
                            <motion.div
                              initial={{ x: '-100%' }}
                              animate={{ x: '100%' }}
                              transition={{
                                repeat: Infinity,
                                duration: 1.5,
                                ease: "linear",
                              }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0C0C0C] to-transparent skew-x-[-20deg]"
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
                  <span className="text-[12px] font-medium text-neutral-700 uppercase tracking-wider select-none">
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