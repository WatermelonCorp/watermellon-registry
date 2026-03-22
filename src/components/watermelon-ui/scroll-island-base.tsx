"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import useMeasure from "react-use-measure";

export interface Topic {
  id: string;
  title: string;
  content: string;
}

export interface ScrollIslandProps {
  topics: Topic[];
}

declare module "react" {
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
  const [ref, bounds] = useMeasure({ offsetSize: true });

  const contentRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));

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

  const islandUI = (
    <>
      <MotionConfig
        transition={{
          type: "spring",
          bounce: 0.2,
          duration: 0.7,
        }}
      >
        <div
          className="theme-injected pointer-events-none fixed top-72 z-9999 flex justify-center pt-6 sm:top-32"
          style={{
            left: isMobile ? "0" : isScrollIslandPage ? "28%" : "20%",
            width: "100%",
          }}
        >
          <motion.div
            className={cn(
              "border-border bg-background rounded-lg pointer-events-auto flex flex-col items-center overflow-hidden border shadow-2xl"
            )}
            animate={{
              height: bounds.height > 0 ? bounds.height : "auto",
              width: isOpen ? 400 : 240,
            }}
          >
            <div
              ref={ref}
              className={cn("flex w-full flex-col items-center px-4")}
            >
              <div
                className="group flex h-13 w-full cursor-pointer items-center justify-between gap-8 select-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    layout
                    className="relative h-7 w-7 shrink-0 rounded-lg"
                    style={{
                      background: `conic-gradient(
    var(--foreground) 0% ${scrollProgress}%,
    color-mix(in oklch, var(--muted-foreground) 30%, transparent) ${scrollProgress}% 100%
  )`,
                    }}
                  >
                    <div className="bg-background absolute inset-[2.5px] rounded-lg" />
                  </motion.div>

                  <motion.span
                    layout
                    className="text-foreground text-lg font-medium"
                  >
                    Index
                  </motion.span>

                  <motion.div layout animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown
                      size={20}
                      className="text-muted-foreground group-hover:text-foreground"
                    />
                  </motion.div>
                </div>

                <motion.div
                  layout
                  className="bg-muted text-foreground flex items-center justify-center rounded-lg px-2.5 text-lg font-bold tabular-nums"
                >
                  {Math.round(scrollProgress)}%
                </motion.div>
              </div>

              <AnimatePresence mode="popLayout">
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="custom-scrollbar max-h-[60vh] w-full overflow-y-auto pt-2 pb-4"
                  >
                    <div className="bg-border mx-2 mb-2 h-px" />
                    {topics.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => {
                          document.getElementById(topic.id)?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });
                          handleTopicClick(topic.id);
                        }}
                        className="text-muted-foreground hover:text-foreground w-full truncate rounded-lg py-2 text-left text-sm"
                      >
                        {topic.title}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-background/40 fixed inset-0 z-9998 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>
      </MotionConfig>
    </>
  );

  return (
    <div className="theme-injected relative w-full">
      <main
        ref={contentRef}
        className="px- mx-auto h-[calc(100vh-6rem)] max-w-4xl overflow-y-auto pt-32 pb-20"
      >
        {topics.map((topic) => (
          <div
            key={topic.id}
            id={topic.id}
            className={`mb-20 scroll-mt-32 rounded-lg p-2 transition-all duration-500 ${
              activeTopicId === topic.id ? "animate-flash bg-muted" : ""
            }`}
          >
            <h4 className="text-foreground mb-6 text-3xl font-bold">
              {topic.title}
            </h4>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {topic.content}
            </p>
          </div>
        ))}
      </main>

      {mounted && createPortal(islandUI, document.body)}

      <style jsx global>{`
        @keyframes flash {
          0%,
          100% {
            background-color: transparent;
          }
          50% {
            background-color: oklch(var(--muted) / 0.5);
          }
        }
        .animate-flash {
          animation: flash 0.6s ease-in-out 3;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: oklch(var(--muted-foreground));
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
