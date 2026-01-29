import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, ImageIcon, Mic, Sun, Moon } from 'lucide-react';

interface PredictiveInputProps {
  dictionary?: string[];
  placeholder?: string;
  onSend?: (text: string) => void;
}

const DEFAULT_WORDS = [
  "what", "whatever", "what's", "bright", "brighter", "brigade",
  "sunny", "sunset", "sun", "day", "dance", "data", "a", "an", "any"
];

export const PredictiveText: React.FC<PredictiveInputProps> = ({
  dictionary = DEFAULT_WORDS,
  placeholder = "Write a message",
  onSend
}) => {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isDark, setIsDark] = useState(false);
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
    <div className={`h-screen w-full flex flex-col items-center justify-center transition-colors duration-500 p-6 ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#fefefe]/40'}`}>

      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`mb-12 p-3 rounded-full border transition-all active:scale-90 ${isDark ? 'bg-[#1A1A1A] border-white/10 text-yellow-400' : 'bg-white border-black/5 text-gray-400 shadow-sm'}`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="relative w-full max-w-md flex flex-col items-center antialiased mb-32">
        {/* Suggestions Bar */}
        <div className="h-12 w-full flex justify-start items-center mb-4">
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`flex items-center gap-1 border-2 px-1 py-1 rounded-full shadow-sm transition-colors ${isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-[#FEFEFE] border-[#F4F4F8]'}`}
              >
                {suggestions.map((word, i) => (
                  <button
                    key={word}
                    onClick={() => applySuggestion(word)}
                    className={`px-4 py-1 text-[16px] font-bold transition-colors
                      ${i === suggestions.length - 1 ? 'text-blue-500' : (isDark ? 'text-gray-500 hover:text-gray-300' : 'text-[#9F9EA3] hover:text-gray-600')}
                      ${i !== 0 ? `border-l-2 pl-4 ${isDark ? 'border-white/5' : 'border-[#F4F4F8]'}` : ''}
                    `}
                  >
                    {word}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Field */}
        <div className="relative w-full group ">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => {
              const val = e.target.value;
              setText(val);
            }}
            placeholder={placeholder}
            className={`w-full border-none rounded-[18px] shadow-sm py-4 px-6 pr-24 text-[18px] outline-none transition-all font-bold tracking-wide ${isDark
                ? 'bg-[#1A1A1A] text-white focus:ring-1 focus:ring-white/10 placeholder:text-gray-600'
                : 'bg-[#F4F4F9] text-black focus:ring-1 focus:ring-[#ebebf1] placeholder:text-[#AFAEB3]'
              }`}
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3">
            <AnimatePresence mode="wait">
              {text.length > 0 ? (
                <motion.button
                  key="send-btn"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  title='send'
                  onClick={() => onSend?.(text)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-white text-black' : 'bg-[#262628] text-[#FEFEFE]'}`}
                >
                  <ArrowUp size={20} strokeWidth={3} />
                </motion.button>
              ) : (
                <motion.div
                  key="placeholder-icons"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`flex items-center gap-4 pr-2 transition-colors ${isDark ? 'text-gray-600' : 'text-[#86858E]'}`}
                >
                  <ImageIcon size={24} strokeWidth={2} className="cursor-pointer hover:opacity-70" />
                  <Mic size={24} strokeWidth={2} className="cursor-pointer hover:opacity-70" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};