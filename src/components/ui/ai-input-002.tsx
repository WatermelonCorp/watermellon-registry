"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Globe,
  ChevronDown,
  Send,
  Image as ImageIcon,
  FileText,
  Layers,
  Sparkles,
  Cpu,
  Zap,
} from "lucide-react";
import { LuBrain } from "react-icons/lu";
import { PiLightbulbFilament } from "react-icons/pi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

interface Model {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface AIInputProps {
  messages?: Message[];
  onSendMessage?: (text: string, modelId: string) => void;
  models?: Model[];
  backgroundText?: string;
  placeholder?: string;
}

const DEFAULT_MODELS: Model[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    icon: <PiLightbulbFilament className="h-4 w-4" />,
  },
  {
    id: "claude-3-5",
    name: "Claude 3.5 Sonnet",
    icon: <Sparkles className="h-4 w-4" />,
  },
  { id: "gemini-pro", name: "Gemini Pro", icon: <Cpu className="h-4 w-4" /> },
  { id: "llama-3-1", name: "Llama 3.1", icon: <Zap className="h-4 w-4" /> },
];

export const AiInput: React.FC<AIInputProps> = ({
  messages = [],
  onSendMessage = () => {},
  models = DEFAULT_MODELS,
  backgroundText = "Skiper Input 001",
  placeholder = "Ask anything...",
}) => {
  const hasMessages = messages.length > 0;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-neutral-50 dark:bg-neutral-950">
      <AnimatePresence>
        {!hasMessages && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute inset-0 z-0 mb-10 flex items-end justify-center select-none"
          >
            <h1 className="text-xl font-bold text-neutral-300/40 sm:text-5xl md:text-[150px] dark:text-neutral-800/40">
              {backgroundText}
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      <MessageList messages={messages} scrollRef={scrollRef} />

      <ChatInput
        models={models}
        placeholder={placeholder}
        hasMessages={hasMessages}
        onSend={onSendMessage}
      />
    </div>
  );
};

const MessageList = ({
  messages,
  scrollRef,
}: {
  messages: Message[];
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) => {
  if (!messages.length) return null;

  return (
    <div
      ref={scrollRef}
      className="z-10 flex w-full flex-1 flex-col items-center overflow-y-auto pt-6 sm:pt-10"
    >
      <div className="flex w-full max-w-3xl flex-col gap-4 px-3 pb-6 sm:px-4 sm:pb-10">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl border px-3 py-2 text-sm font-medium shadow-sm sm:max-w-[80%] sm:px-4 sm:text-[15px] ${
                  msg.sender === "user"
                    ? "rounded-tr-none border-neutral-900 bg-neutral-900 text-white dark:border-neutral-700 dark:bg-neutral-800"
                    : "rounded-tl-none border-neutral-200 bg-white text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ChatInput = ({
  models,
  hasMessages,
  placeholder,
  onSend,
}: {
  models: Model[];
  hasMessages: boolean;
  placeholder: string;
  onSend: (text: string, modelId: string) => void;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isDeepMindActive, setIsDeepMindActive] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSend(inputValue, selectedModel.id);
    setInputValue("");
  };

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className={`z-20 flex w-full justify-center px-3 py-4 sm:px-4 ${
        !hasMessages ? "flex-1 items-center" : "items-end"
      }`}
    >
      <motion.div
        layout
        className="w-full max-w-3xl rounded-2xl border border-neutral-200 bg-white p-3 shadow-lg sm:rounded-[24px] dark:border-neutral-800 dark:bg-neutral-900"
      >
        <textarea
          ref={textAreaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={placeholder}
          className="mb-2 max-h-[180px] min-h-[40px] w-full resize-none bg-transparent px-1 text-sm font-semibold text-neutral-700 outline-none placeholder:text-neutral-400 sm:max-h-[200px] sm:min-h-[44px] sm:px-2 sm:text-base dark:text-neutral-300 dark:placeholder:text-neutral-600"
          rows={1}
        />

        <div className="mt-2 flex items-center justify-between gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-2 dark:border-neutral-800 dark:bg-neutral-950">
          <div className="no-scrollbar flex items-center gap-1 overflow-x-auto sm:gap-2">
            <AttachmentMenu />

            <motion.button
              layout
              onClick={() => setIsSearchActive(!isSearchActive)}
              className={`flex items-center gap-2 rounded-lg border p-2 transition-all sm:p-2.5 ${
                isSearchActive
                  ? "border-sky-300 bg-sky-50 dark:border-sky-700 dark:bg-sky-950"
                  : "border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900"
              }`}
            >
              <Globe
                className={`h-4 w-4 sm:h-5 sm:w-5 ${
                  isSearchActive
                    ? "text-sky-600 dark:text-sky-400"
                    : "text-neutral-500 dark:text-neutral-400"
                }`}
              />
              <AnimatePresence>
                {isSearchActive && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="hidden overflow-hidden text-sm font-medium whitespace-nowrap text-neutral-700 sm:inline dark:text-neutral-200"
                  >
                    Search
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              layout
              onClick={() => setIsDeepMindActive(!isDeepMindActive)}
              className={`flex items-center gap-2 rounded-lg border p-2 transition-all sm:p-2.5 ${
                isDeepMindActive
                  ? "border-indigo-300 bg-indigo-50 dark:border-indigo-700 dark:bg-indigo-950"
                  : "border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900"
              }`}
            >
              <LuBrain
                className={`h-4 w-4 sm:h-5 sm:w-5 ${
                  isDeepMindActive
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-neutral-500 dark:text-neutral-400"
                }`}
              />
              <AnimatePresence>
                {isDeepMindActive && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="hidden overflow-hidden text-sm font-medium whitespace-nowrap text-neutral-700 sm:inline dark:text-neutral-200"
                  >
                    DeepMind
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <ModelSelector
              models={models}
              selectedModel={selectedModel}
              onSelect={setSelectedModel}
            />
          </div>

          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={`rounded-lg p-2 transition-colors sm:p-3 ${
              inputValue.trim()
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "cursor-not-allowed bg-neutral-200 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-600"
            }`}
          >
            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ATTACHMENT_ITEMS = [
  { label: "Images", icon: ImageIcon },
  { label: "Documents", icon: FileText },
  { label: "Connect Apps", icon: Layers },
];

const AttachmentMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="group rounded-lg border border-neutral-200 bg-neutral-100 p-2 text-neutral-500 sm:p-2.5 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
        <Plus className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-45 sm:h-5 sm:w-5" />
      </button>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      align="start"
      side="bottom"
      className="mt-5.5 w-44 rounded-xl border border-neutral-200 bg-white p-2 sm:w-48 dark:border-neutral-800 dark:bg-neutral-900"
    >
      {ATTACHMENT_ITEMS.map(({ label, icon: Icon }) => (
        <DropdownMenuItem
          key={label}
          className="flex items-center gap-2 p-2 text-sm text-neutral-700 dark:text-neutral-200"
        >
          <Icon className="h-4 w-4 shrink-0" />
          {label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

const ModelSelector = ({
  models,
  selectedModel,
  onSelect,
}: {
  models: Model[];
  selectedModel: Model;
  onSelect: (model: Model) => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-100 p-2 text-sm text-neutral-700 sm:p-2.5 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
        {selectedModel.icon}
        <span className="hidden md:inline">{selectedModel.name}</span>
        <ChevronDown className="h-3 w-3" />
      </button>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      align="start"
      side="bottom"
      className="mt-5.5 w-48 rounded-xl border border-neutral-200 bg-white sm:w-52 dark:border-neutral-800 dark:bg-neutral-900"
    >
      {models.map((model) => (
        <DropdownMenuItem
          key={model.id}
          onClick={() => onSelect(model)}
          className="flex items-center gap-2 p-2 text-sm text-neutral-700 dark:text-neutral-200"
        >
          {model.icon}
          {model.name}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);
