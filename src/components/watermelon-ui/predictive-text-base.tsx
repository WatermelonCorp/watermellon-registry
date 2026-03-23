"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, ImageIcon, Mic } from "lucide-react";

interface PredictiveInputProps {
  dictionary?: string[];
  placeholder?: string;
  onSend?: (text: string) => void;
  className?: string;
}

const DEFAULT_WORDS = [
  "what",
  "whatever",
  "what's",
  "bright",
  "brighter",
  "brigade",
  "sunny",
  "sunset",
  "sun",
  "day",
  "dance",
  "data",
  "a",
  "an",
  "any",
];

export const PredictiveText: React.FC<PredictiveInputProps> = ({
  dictionary = DEFAULT_WORDS,
  placeholder = "Write a message",
  onSend,
  className = "",
}) => {
  const [text, setText] = useState("");

  const [activeSuggestionIndex, setActiveSuggestionIndex] =
    useState<number>(-1);
  const [wordFrequency, setWordFrequency] = useState<Record<string, number>>(
    {}
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const enrichedDictionary = useCallback(() => {
    const freqWords = Object.keys(wordFrequency).sort(
      (a, b) => wordFrequency[b] - wordFrequency[a]
    );
    return Array.from(new Set([...freqWords, ...dictionary]));
  }, [dictionary, wordFrequency]);

  const lastWord = useMemo(() => {
    const words = text.split(/\s+/);
    return words[words.length - 1].toLowerCase();
  }, [text]);

  const suggestions = useMemo(() => {
    if (lastWord.length > 0) {
      const dict = enrichedDictionary();
      return dict
        .filter(
          (word) =>
            word.toLowerCase().startsWith(lastWord) &&
            word.toLowerCase() !== lastWord
        )
        .slice(0, 3);
    }
    return [];
  }, [lastWord, enrichedDictionary]);

  useEffect(() => {
    requestAnimationFrame(() => setActiveSuggestionIndex(-1));
  }, [text]);

  const applySuggestion = useCallback(
    (suggestion: string) => {
      const words = text.split(/\s+/);
      words[words.length - 1] = suggestion;
      const newText = words.join(" ") + " ";
      setText(newText);
      setActiveSuggestionIndex(-1);
      inputRef.current?.focus();
    },
    [text]
  );

  const handleSend = useCallback(() => {
    if (!text.trim()) return;

    const usedWords = text.trim().toLowerCase().split(/\s+/);
    setWordFrequency((prev) => {
      const updated = { ...prev };
      usedWords.forEach((w) => {
        updated[w] = (updated[w] ?? 0) + 1;
      });
      return updated;
    });

    onSend?.(text);
    setText("");
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
          const next = (activeSuggestionIndex + 1) % suggestions.length;
          setActiveSuggestionIndex(next);
        }
        break;
      }

      case "ArrowRight": {
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
        if (text.length > 0) {
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
    <div
      className={`theme-injected flex w-full flex-col items-center justify-center p-4 antialiased select-none sm:p-6 ${className}`}
    >
      <div className="relative mb-10 flex w-full max-w-[95%] flex-col items-start sm:mb-20 sm:max-w-md">
        <div className="mb-3 flex h-10 w-full items-center justify-start sm:h-12">
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="bg-card border-border flex items-center gap-0.5 rounded-lg border px-1 py-1 shadow-sm transition-colors"
              >
                {suggestions.map((word, i) => (
                  <button
                    key={word}
                    onClick={() => applySuggestion(word)}
                    className={`px-3 py-1 text-xs font-bold whitespace-nowrap transition-colors sm:px-4 sm:text-sm ${
                      i === activeSuggestionIndex
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    } ${i !== 0 ? "border-border border-l pl-3 sm:pl-4" : ""} `}
                  >
                    {word}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="group relative w-full">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="bg-card text-foreground border border-border placeholder:text-muted-foreground focus:ring-ring w-full rounded-lg border-none px-5 py-3.5 pr-20 text-sm font-bold tracking-wide shadow-sm transition-all outline-none focus:ring-1 sm:px-6 sm:py-4 sm:pr-24 sm:text-base"
          />

          <div className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-2 sm:right-3 sm:gap-3">
            <AnimatePresence mode="wait">
              {text.length > 0 ? (
                <motion.button
                  key="send-btn"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleSend}
                  className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg shadow-md transition-all active:scale-90 sm:h-10 sm:w-10"
                >
                  <ArrowUp size={18} strokeWidth={3} />
                </motion.button>
              ) : (
                <motion.div
                  key="placeholder-icons"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-muted-foreground flex items-center gap-3 pr-1 sm:gap-4 sm:pr-2"
                >
                  <ImageIcon
                    size={20}
                    className="hover:text-foreground cursor-pointer transition-colors"
                  />
                  <Mic
                    size={20}
                    className="hover:text-foreground cursor-pointer transition-colors"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
