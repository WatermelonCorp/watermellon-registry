import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { FaBell } from 'react-icons/fa6';

interface MorphingButtonProps {
  buttonText?: string;
  placeholder?: string;
  onSubmit?: (email: string) => void;
  className?: string;
}

export const MorphingButton: React.FC<MorphingButtonProps> = ({
  buttonText = "Notify Me",
  placeholder = "Email",
  onSubmit,
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [isDark, setIsDark] = useState(false); // Theme state
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleToggle = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.stopPropagation();
      setIsExpanded(true);
    } else if (email) {
      onSubmit?.(email);
      setIsExpanded(false);
      setEmail("");
    }
  };

  const springConfig = {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 1
  } as const;

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center gap-12 p-8 transition-colors duration-500 ${isDark ? 'bg-[#0A0A0A]' : 'bg-white'}`}>
      
      {/* Theme Toggle Button */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className={`p-3 rounded-full transition-all active:scale-95 border ${
          isDark ? 'bg-[#1C1C1E] border-white/10 text-yellow-400' : 'bg-white border-black/5 text-gray-400 shadow-sm'
        }`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className={`flex items-center justify-center ${className}`}>
        <LayoutGroup>
          <motion.div
            ref={containerRef}
            layout
            transition={springConfig}
            style={{ borderRadius: 32 }}
            className={`
              relative flex items-center overflow-hidden border-[1.1px] transition-colors duration-300
              ${isDark ? "border-white/5" : "border-[#e7e6e6a6]"}
              ${isExpanded 
                ? (isDark ? "bg-[#1C1C1E] p-1 shadow-xl w-84" : "bg-[#F4F4F4] p-1 shadow-sm w-84") 
                : (isDark ? "bg-[#1C1C1E] p-0 w-auto" : "bg-[#F4F4F4] p-0 w-auto")
              }
            `}
          >
            {/* Input Area */}
            <AnimatePresence mode="popLayout">
              {isExpanded && (
                <motion.div
                  key="input-container"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ ...springConfig, delay: 0.1 }}
                  className="flex-1 flex items-center px-4"
                >
                  <input
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full bg-transparent outline-none text-xl font-semibold transition-colors ${
                      isDark ? "text-[#fefefe] placeholder-[#B2B2B2]" : "text-[#18181B] placeholder-[#A1A1AA]"
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && email) {
                        onSubmit?.(email);
                        setIsExpanded(false);
                        setEmail("");
                      }
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Button */}
            <motion.button
              layout
              onClick={handleToggle}
              transition={springConfig}
              className={`
                relative flex items-center justify-center gap-3 whitespace-nowrap font-bold
                transition-colors duration-300
                ${isExpanded 
                  ? (isDark 
                      ? "bg-[#2C2C2E] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#3A3A3C]" 
                      : "bg-[#FEFEFE] text-black px-5 py-3 rounded-full shadow-sm hover:bg-[#fafafa]") 
                  : (isDark
                      ? "bg-[#1C1C1E] text-white px-6 py-4 rounded-full hover:bg-[#252529]"
                      : "bg-[#F4F4F4] text-black px-6 py-4 rounded-full hover:bg-[#ebeaea]")
                }
              `}
            >
              <AnimatePresence mode="popLayout">
                {!isExpanded && (
                  <motion.span
                    key="bell-icon"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={springConfig}
                  >
                    <FaBell className={`w-6 h-6 ${isDark ? "text-[#fefefe]" : "text-[#000000]/90"}`} />
                  </motion.span>
                )}
              </AnimatePresence>
              
              <motion.span 
                layout="position" 
                className="text-xl tracking-tight"
              >
                {buttonText}
              </motion.span>
            </motion.button>
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
};