"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

/* ---------- Types ---------- */
export interface Topic {
  id: string;
  title: string;
  content: string;
}

export interface ScrollIslandProps {
  topics: Topic[];
}

declare module 'react' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

export function ScrollIsland({ topics }: ScrollIslandProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  /* ---------- Route check ---------- */
  const isScrollIslandPage =
    typeof window !== "undefined" &&
    window.location.pathname === "/components/scroll-island";

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ---------- Scroll Progress ---------- */
  useEffect(() => {
    setMounted(true);

    const el = contentRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;

      if (scrollHeight > 0) {
        const progress = (scrollTop / scrollHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTopicClick = (id: string) => {
    setActiveTopicId(id);
    setTimeout(() => setActiveTopicId(null), 1800);
    setIsOpen(false);
  };

  /* ---------- Floating Island ---------- */
  const islandUI = (
    <>
      <div
        className="fixed top-72 sm:top-32 z-9999 flex justify-center pointer-events-none pt-6"
        style={{
          left: isMobile
            ? "0" 
            : isScrollIslandPage
            ? "28%"
            : "20%",
          width: "100%",
        }}
      >
        <motion.div
          className="pointer-events-auto bg-[#000002] border border-white/10 rounded-4xl shadow-2xl flex flex-col items-center overflow-hidden"
          animate={{
            height: isOpen ? "auto" : 52,
            width: isOpen ? "min(90vw, 400px)" : 210,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between w-full h-13 px-4 cursor-pointer select-none group"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-full relative shrink-0"
                style={{
                  background: `conic-gradient(white ${scrollProgress}%, #333 0)`,
                }}
              >
                <div className="absolute inset-[2.5px] bg-black rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
              </div>

              <span className="text-white font-medium text-sm">Index</span>

              <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                <ChevronDown size={16} className="text-zinc-400 group-hover:text-white" />
              </motion.div>
            </div>

            <div className="bg-zinc-800 text-zinc-200 text-[10px] font-bold h-6 px-2.5 flex items-center justify-center rounded-full">
              {Math.round(scrollProgress)}%
            </div>
          </div>

          {/* Links */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full px-2 pb-4 pt-2 max-h-[60vh] overflow-y-auto custom-scrollbar"
              >
                <div className="h-px bg-white/5 mx-2 mb-2" />
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      document
                        .getElementById(topic.id)
                        ?.scrollIntoView({ behavior: "smooth", block: "center" });
                      handleTopicClick(topic.id);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all truncate"
                  >
                    {topic.title}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-9998"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );

  /* ---------- Page Content ---------- */
  return (
    <div className="relative w-full">
      <main
        ref={contentRef}
        className="max-w-4xl mx-auto px- pt-32 pb-20
                   h-[calc(100vh-6rem)] overflow-y-auto"
      >
        {topics.map((topic) => (
          <div
            key={topic.id}
            id={topic.id}
            className={`mb-20 scroll-mt-32 p-2 rounded-2xl transition-all duration-500 ${
              activeTopicId === topic.id
                ? "bg-zinc-100 dark:bg-zinc-900 animate-flash"
                : ""
            }`}
          >
            <h4 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">
              {topic.title}
            </h4>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
              {topic.content}
            </p>
          </div>
        ))}
      </main>

      {mounted && createPortal(islandUI, document.body)}

<style jsx global>{`
        @keyframes flash {
          0%, 100% { background-color: transparent; }
          50% { background-color: rgba(255, 255, 255, 0.05); }
        }
        .animate-flash {
          animation: flash 0.6s ease-in-out 3;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
