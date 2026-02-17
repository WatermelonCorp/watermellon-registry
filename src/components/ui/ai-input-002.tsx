import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowLeft } from "lucide-react";

/* TYPES */
export type Role = "user" | "assistant";

export interface MessageReply {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
}

/* DEFAULT AI SERVICE */
const defaultReplies = [
  "Lock in vro 🫡",
  "Got it 👍",
  "Interesting 👀",
  "Tell me more",
];

const defaultAiResponse = async (): Promise<string> => {
  await new Promise((res) => setTimeout(res, 700));
  return defaultReplies[0];
};

/* CHAT BUBBLE */
const ChatBubble: React.FC<{ role: Role; content: string }> = ({
  role,
  content,
}) => {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className={`flex w-full mb-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[90%] sm:max-w-[80%] px-4 sm:px-5 py-2 sm:py-2.5 text-[14px] sm:text-[15px] font-semibold shadow-sm transition-colors duration-200
        ${
          isUser
            ? "bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 border border-gray-100 dark:border-zinc-700 rounded-[16px] rounded-br-[4px]"
            : "bg-[#1DA1F2] dark:bg-sky-600 text-white rounded-[16px] rounded-bl-[4px] border border-sky-400/20 shadow-sky-500/10"
        }`}
      >
        {content}
      </div>
    </motion.div>
  );
};

/* AI INPUT BAR */
interface AiInputBarProps {
  onSend: (msg: string) => void;
  isLoading: boolean;
  placeholderText: string;
}

const AiInputBar: React.FC<AiInputBarProps> = ({
  onSend,
  isLoading,
  placeholderText,
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (inputValue.trim() && !isLoading) {
      onSend(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="w-full max-w-[700px] px-3 sm:px-4 pb-4 sm:pb-24">
      <motion.div
        layout
        className="relative flex items-center bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-[28px] p-1.5 sm:p-2 shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-gray-100/50 dark:border-zinc-800 transition-colors duration-200"
      >
        <button
          title="add files"
          type="button"
          className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 ml-1 text-gray-500 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl sm:rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
        >
          <Plus size={20} className="sm:size-[22px]" strokeWidth={2.5} />
        </button>

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder={placeholderText}
          className="flex-1 py-2 sm:py-3 px-3 sm:px-4 outline-none text-gray-700 dark:text-zinc-200 bg-transparent text-[15px] sm:text-[17px] placeholder:text-gray-400 dark:placeholder:text-zinc-500 transition-colors"
          disabled={isLoading}
        />

        <div className="mr-1">
          <button
            title="send"
            onClick={handleSubmit}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-black/70 dark:text-zinc-300 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl sm:rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors overflow-hidden"
          >
            <motion.div
              animate={{ rotate: inputValue.length > 0 ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <ArrowLeft
                size={20}
                className="sm:size-[22px]"
                strokeWidth={2.5}
              />
            </motion.div>
          </button>
        </div>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-white/60 dark:bg-zinc-900/60 rounded-[28px] flex items-center justify-center backdrop-blur-[1px]"
          >
            <div className="flex space-x-1.5">
              {[0, 0.2, 0.4].map((d) => (
                <motion.div
                  key={d}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: d }}
                  className="w-1.5 h-1.5 bg-gray-400 dark:bg-zinc-500 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

/* MAIN REUSABLE COMPONENT */
interface AiInput002Props {
  initialMessages?: MessageReply[];
  aiResponseFn?: () => Promise<string>;
  placeholderText?: string;
}

export const AiInput002: React.FC<AiInput002Props> = ({
  initialMessages = [],
  aiResponseFn = defaultAiResponse,
  placeholderText = "Send Message",
}) => {
  const [messages, setMessages] = useState<MessageReply[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const handleSend = async (content: string) => {
    setMessages((p) => [
      ...p,
      {
        id: Date.now().toString(),
        role: "user",
        content,
        timestamp: new Date(),
      },
    ]);

    setIsLoading(true);
    const reply = await aiResponseFn();

    setMessages((p) => [
      ...p,
      {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: reply,
        timestamp: new Date(),
      },
    ]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FA] dark:bg-zinc-950 transition-colors duration-300">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 sm:px-4 flex flex-col"
      >
        <div className="flex-grow" />
        <div className="max-w-2xl mx-auto w-full pb-4">
          <AnimatePresence>
            {messages.map((m) => (
              <ChatBubble key={m.id} {...m} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center items-center mb-0 sm:mb-6">
        <AiInputBar
          onSend={handleSend}
          isLoading={isLoading}
          placeholderText={placeholderText}
        />
      </div>
    </div>
  );
};
