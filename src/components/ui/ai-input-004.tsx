import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#fdf2f8]">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-[-10%] left-[-10%] h-[70%] w-[70%] rounded-full bg-blue-200/50 blur-[120px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute right-[-10%] bottom-[-10%] h-[60%] w-[60%] rounded-full bg-purple-200/50 blur-[120px]"
          animate={{
            x: [0, -40, 0],
            y: [0, -60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute top-[20%] right-[10%] h-[40%] w-[40%] rounded-full bg-pink-100/40 blur-[100px]"
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
            className="absolute z-20 px-4 text-center text-lg font-normal tracking-tight text-neutral-400/80 md:text-[22px]"
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
              <span className="font-semibold text-neutral-500/50">
                $Billion Dollar
              </span>{" "}
              saas...
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

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
            className="relative z-10 w-full max-w-[calc(100vw-32px)] border border-white/40 bg-white/80 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl md:w-[440px]"
          >
            <div className="flex w-full items-center gap-2">
              <Plus className="h-5 w-5 cursor-pointer text-neutral-400 transition-colors hover:text-neutral-600" />

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
                className="min-h-[40px] flex-1 resize-none bg-transparent py-2 text-[16px] text-neutral-800 placeholder-neutral-400 outline-none"
              />

              <div className="flex items-center gap-3">
                <Mic className="h-5 w-5 cursor-pointer text-neutral-400 hover:text-neutral-600" />
                <button
                  onClick={handleSubmit}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-white transition-all duration-200 ${
                    hasContent ? "bg-black" : "bg-black/20"
                  }`}
                >
                  <ArrowUp className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
