"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);
  const [wordFrequency, setWordFrequency] = useState<Record<string, number>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  // Build a combined dictionary from the provided list + frequently used words
  const enrichedDictionary = useCallback(() => {
    const freqWords = Object.keys(wordFrequency).sort(
      (a, b) => wordFrequency[b] - wordFrequency[a]
    );
    // Merge freq words first (for priority), then dedupe with base dictionary
    return Array.from(new Set([...freqWords, ...dictionary]));
  }, [dictionary, wordFrequency]);

  useEffect(() => {
    const words = text.split(/\s+/);
    const lastWord = words[words.length - 1].toLowerCase();

    if (lastWord.length > 0) {
      const dict = enrichedDictionary();
      const matches = dict
        .filter(word => word.toLowerCase().startsWith(lastWord) && word.toLowerCase() !== lastWord)
        .slice(0, 3);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }

    // Reset active suggestion whenever text changes via typing
    setActiveSuggestionIndex(-1);
  }, [text, enrichedDictionary]);

  const applySuggestion = useCallback((suggestion: string) => {
    const words = text.split(/\s+/);
    words[words.length - 1] = suggestion;
    const newText = words.join(" ") + " ";
    setText(newText);
    setActiveSuggestionIndex(-1);
    inputRef.current?.focus();
  }, [text]);

  const handleSend = useCallback(() => {
    if (!text.trim()) return;

    // Track word frequency for smarter future suggestions
    const usedWords = text.trim().toLowerCase().split(/\s+/);
    setWordFrequency(prev => {
      const updated = { ...prev };
      usedWords.forEach(w => {
        updated[w] = (updated[w] ?? 0) + 1;
      });
      return updated;
    });

    onSend?.(text);
    setText("");
    setSuggestions([]);
  }, [text, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter": {
        if (activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
          e.preventDefault();
          applySuggestion(suggestions[activeSuggestionIndex]);
        } else {
          e.preventDefault();
          handleSend();
        }
        break;
      }

      case "Tab": {
        if (suggestions.length > 0) {
          e.preventDefault();
          // Cycle through suggestions, -1 means none selected
          const next = (activeSuggestionIndex + 1) % suggestions.length;
          setActiveSuggestionIndex(next);
        }
        break;
      }

      case "ArrowRight": {
        // Accept first suggestion on ArrowRight when cursor is at end
        const input = inputRef.current;
        if (
          suggestions.length > 0 &&
          input &&
          input.selectionStart === text.length
        ) {
          e.preventDefault();
          applySuggestion(suggestions[0]);
        }
        break;
      }

      case "Escape": {
        if (suggestions.length > 0) {
          e.preventDefault();
          setSuggestions([]);
        } else if (text.length > 0) {
          e.preventDefault();
          setText("");
        }
        break;
      }

      default:
        break;
    }
  };

  return (
    <div className={`w-full flex flex-col items-center justify-center p-4 sm:p-6 antialiased select-none ${className}`}>
      <div className="relative w-full max-w-[95%] sm:max-w-md flex flex-col items-start mb-10 sm:mb-20">

        <div className="h-10 sm:h-12 w-full flex justify-start items-center mb-3">
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="flex items-center gap-0.5 border-2 px-1 py-1 rounded-full shadow-sm transition-colors bg-white border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800"
              >
                {suggestions.map((word, i) => (
                  <button
                    key={word}
                    onClick={() => applySuggestion(word)}
                    className={`px-3 sm:px-4 py-1 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap
                      ${i === activeSuggestionIndex
                        ? 'text-blue-500 dark:text-blue-400'
                        : 'text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300'}
                      ${i !== 0 ? 'border-l-2 pl-3 sm:pl-4 border-neutral-100 dark:border-neutral-800' : ''}
                    `}
                  >
                    {word}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative w-full group">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full border-none rounded-4xl sm:rounded-[22px] shadow-sm py-3.5 sm:py-4 px-5 sm:px-6 pr-20 sm:pr-24 text-sm sm:text-base outline-none transition-all font-bold tracking-wide 
              bg-neutral-100 text-black placeholder:text-neutral-400 focus:ring-1 focus:ring-neutral-200
              dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-600 dark:focus:ring-neutral-800"
          />

          <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 sm:gap-3">
            <AnimatePresence mode="wait">
              {text.length > 0 ? (
                <motion.button
                  key="send-btn"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleSend}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all active:scale-90 bg-neutral-900 text-white dark:bg-white dark:text-black shadow-md"
                >
                  <ArrowUp size={18} strokeWidth={3} />
                </motion.button>
              ) : (
                <motion.div
                  key="placeholder-icons"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 sm:gap-4 pr-1 sm:pr-2 text-neutral-400 dark:text-neutral-600"
                >
                  <ImageIcon size={20} className="cursor-pointer hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors" />
                  <Mic size={20} className="cursor-pointer hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};