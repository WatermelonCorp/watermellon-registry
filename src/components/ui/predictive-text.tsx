"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ImageIcon, Mic } from 'lucide-react';

interface PredictiveInputProps {
  dictionary?: string[];
  placeholder?: string;
  onSend?: (text: string) => void;
  className?: string;
}

const DEFAULT_WORDS = [
  "what", "whatever", "what's", "bright", "brighter", "brigade",
  "sunny", "sunset", "sun", "day", "dance", "data", "a", "an", "any"
];

export const PredictiveText: React.FC<PredictiveInputProps> = ({
  dictionary = DEFAULT_WORDS,
  placeholder = "Write a message",
  onSend,
  className = ""
}) => {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const words = text.trim().split(/\s+/);
    const lastWord = words[words.length - 1].toLowerCase();

    if (lastWord.length > 0) {
      const matches = dictionary
        .filter(word => word.toLowerCase().startsWith(lastWord) && word.toLowerCase() !== lastWord)
        .slice(0, 3);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [text, dictionary]);

  const applySuggestion = (suggestion: string) => {
    const words = text.split(/\s+/);
    words[words.length - 1] = suggestion;
    const newText = words.join(" ") + " ";
    setText(newText);
    inputRef.current?.focus();
  };

  return (
    <div className={`w-full flex flex-col items-center justify-center p-4 sm:p-6 antialiased select-none ${className}`}>
      
      <div className="relative w-full max-w-[95%] sm:max-w-md flex flex-col items-start mb-10 sm:mb-20">
        
        {/* Suggestions Bar - Responsive & Theme Aware */}
        <div className="h-10 sm:h-12 w-full flex justify-start items-center mb-3">
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="flex items-center gap-0.5 border-2 px-1 py-1 rounded-full shadow-sm transition-colors bg-white border-[#F4F4F8] dark:bg-zinc-900 dark:border-white/5"
              >
                {suggestions.map((word, i) => (
                  <button
                    key={word}
                    onClick={() => applySuggestion(word)}
                    className={`px-3 sm:px-4 py-1 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap
                      ${i === suggestions.length - 1 
                        ? 'text-blue-500' 
                        : 'text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300'}
                      ${i !== 0 ? 'border-l-2 pl-3 sm:pl-4 border-[#F4F4F8] dark:border-white/5' : ''}
                    `}
                  >
                    {word}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Field Area */}
        <div className="relative w-full group">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            className="w-full border-none rounded-4xl sm:rounded-[22px] shadow-sm py-3.5 sm:py-4 px-5 sm:px-6 pr-20 sm:pr-24 text-sm sm:text-base outline-none transition-all font-bold tracking-wide 
              bg-zinc-100 text-black placeholder:text-zinc-400 focus:ring-1 focus:ring-zinc-200
              dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-600 dark:focus:ring-white/10"
          />

          {/* Action Icons / Send Button */}
          <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 sm:gap-3">
            <AnimatePresence mode="wait">
              {text.length > 0 ? (
                <motion.button
                  key="send-btn"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => {
                    onSend?.(text);
                    setText("");
                  }}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all active:scale-90 bg-zinc-900 text-white dark:bg-white dark:text-black shadow-md"
                >
                  <ArrowUp size={18} strokeWidth={3} />
                </motion.button>
              ) : (
                <motion.div
                  key="placeholder-icons"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 sm:gap-4 pr-1 sm:pr-2 text-zinc-400 dark:text-zinc-600"
                >
                  <ImageIcon size={20} className="cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors" />
                  <Mic size={20} className="cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};