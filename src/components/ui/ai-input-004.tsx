import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Mic, ArrowUp } from "lucide-react";

type AppState = "IDLE" | "GENERATING" | "RESULT";

interface AiInputProps {
  onSend: (text: string) => void | Promise<void>;
  placeholder?: string;
  disabled?: boolean;
  appState?: AppState;
}

export const AiInput004: React.FC<AiInputProps> = ({
  onSend,
  placeholder = "Ask anything...",
  disabled = false,
  appState = "IDLE",
}) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasContent = value.trim().length > 0;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [value]);

  const handleSubmit = async () => {
    if (!value.trim() || disabled) return;
    const text = value.trim();
    setValue("");
    await onSend(text);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#fdf2f8]">
      {/* --- IMPROVED MOVING BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        {/* Blue Blob */}
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[120px] bg-blue-200/50"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Purple Blob */}
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-purple-200/50"
          animate={{
            x: [0, -40, 0],
            y: [0, -60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Pink Blob */}
        <motion.div
          className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full blur-[100px] bg-pink-100/40"
          animate={{
            x: [0, -20, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* --- GENERATING TEXT EFFECT --- */}
      <AnimatePresence mode="wait">
        {appState === "GENERATING" && (
          <motion.div
            key="generating-text"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              y: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            className="absolute z-20 text-lg md:text-[22px] tracking-tight text-gray-400/80 font-normal text-center px-4"
          >
            <motion.span
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #9ca3af 0%, #9ca3af 40%, #ffffff 50%, #9ca3af 60%, #9ca3af 100%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              animate={{ backgroundPositionX: ["100%", "-100%"] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Generating Your{" "}
              <span className="font-semibold text-gray-500/50">
                $Billion Dollar
              </span>{" "}
              saas...
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- INPUT BOX --- */}
      <AnimatePresence>
        {(appState === "IDLE" || appState === "RESULT") && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              borderRadius: 28,
              padding: "8px 12px",
            }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className="relative z-10 w-full max-w-[calc(100vw-32px)] md:w-[440px] bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-center w-full gap-2">
              <Plus className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />

              <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder={placeholder}
                rows={1}
                className="flex-1 bg-transparent outline-none resize-none text-[16px] text-gray-800 placeholder-gray-400 py-2 min-h-[40px]"
              />

              <div className="flex items-center gap-3">
                <Mic className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                <button
                  onClick={handleSubmit}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-200 ${hasContent ? "bg-black" : "bg-black/20"}`}
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
