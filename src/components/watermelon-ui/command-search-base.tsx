"use client";

import {
  useState,
  useMemo,
  useEffect,
  useRef,
  type KeyboardEvent,
  type FC,
} from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  User,
  Bell,
  HelpCircle,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

export interface CommandItem {
  id: string;
  title: string;
  section: "Suggestions" | "Settings" | "Help";
  icon: ReactNode;
  shortcut?: string;
  action: () => void;
}

/*  DEFAULT DATA */
const DEFAULT_ITEMS: CommandItem[] = [
  {
    id: "1",
    title: "Calendar",
    section: "Suggestions",
    icon: <ArrowRight size={16} />,
    action: () => console.log("Calendar"),
  },
  {
    id: "2",
    title: "Search Emoji",
    section: "Suggestions",
    icon: <ArrowRight size={16} />,
    action: () => console.log("Emoji"),
  },
  {
    id: "3",
    title: "Calculator",
    section: "Suggestions",
    icon: <ArrowRight size={16} />,
    action: () => console.log("Calculator"),
  },

  {
    id: "4",
    title: "Profile",
    section: "Settings",
    icon: <User size={16} />,
    shortcut: "⌘ P",
    action: () => console.log("Profile"),
  },
  {
    id: "5",
    title: "Notifications",
    section: "Settings",
    icon: <Bell size={16} />,
    shortcut: "⌘ N",
    action: () => console.log("Notifications"),
  },

  {
    id: "6",
    title: "FAQ",
    section: "Help",
    icon: <HelpCircle size={16} />,
    action: () => console.log("FAQ"),
  },
  {
    id: "7",
    title: "Messages",
    section: "Help",
    icon: <MessageSquare size={16} />,
    action: () => console.log("Messages"),
  },
];

interface Props {
  items?: CommandItem[];
}

export const CommandSearch: FC<Props> = ({ items = DEFAULT_ITEMS }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      const activeEl = document.activeElement as HTMLElement | null;

      if (
        e.key.toLowerCase() === "f" &&
        !isOpen &&
        activeEl?.tagName !== "INPUT" &&
        activeEl?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setIsOpen(true);
      }

      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [isOpen]);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, items]);

  useEffect(() => {
    requestAnimationFrame(() => setActiveIndex(0));
  }, [query]);

  const sections = useMemo(() => {
    const groups: { [key: string]: CommandItem[] } = {};
    filteredItems.forEach((item) => {
      if (!groups[item.section]) groups[item.section] = [];
      groups[item.section].push(item);
    });

    return Object.entries(groups).map(([name, items]) => ({
      name,
      items,
    }));
  }, [filteredItems]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(
        (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
      );
    } else if (e.key === "Enter") {
      const selectedItem = filteredItems[activeIndex];
      if (selectedItem) {
        selectedItem.action();
        setIsOpen(false);
      }
    }
  };

  const sharedTransition = {
    type: "tween" as const,
    ease: "easeOut" as const,
    duration: 0.15,
  };

  return (
    <>
      <AnimatePresence mode="popLayout">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="theme-injected relative z-50 h-10 w-full max-w-[280px] md:w-64">
        <AnimatePresence mode="popLayout">
          {!isOpen ? (
            <motion.button
              key="trigger"
              layoutId="command-pallete"
              onClick={() => setIsOpen(true)}
              className="group border-border bg-background text-muted-foreground hover:text-foreground absolute top-0 left-0 flex h-10 w-full items-center gap-3 overflow-hidden rounded-lg border px-4 py-2 shadow-sm"
              transition={sharedTransition}
            >
              <motion.div layoutId="search-icon" transition={sharedTransition}>
                <Search size={16} className="opacity-40" />
              </motion.div>
              <motion.span
                layoutId="search-text"
                transition={sharedTransition}
                className="pr-8 text-sm font-medium"
              >
                Find...
              </motion.span>
              <motion.kbd
                layoutId="search-shortcut"
                transition={sharedTransition}
                className="border-border bg-muted text-muted-foreground group-hover:text-foreground absolute right-2 rounded-lg border px-2 py-0.5 text-[14px] font-bold"
              >
                F
              </motion.kbd>
            </motion.button>
          ) : (
            <motion.div
              layoutId="command-pallete"
              layout={false}
              transition={sharedTransition}
              className="border-border bg-popover absolute -top-2 -left-2 h-80 w-[calc(100vw-2rem)] overflow-hidden rounded-lg border shadow-[0_32px_64px_-15px_hsl(var(--foreground)/0.1)] md:w-[400px]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-border flex items-center border-b px-4 py-3.5">
                <motion.div
                  layoutId="search-icon"
                  transition={sharedTransition}
                >
                  <Search
                    size={18}
                    className="text-muted-foreground mr-3"
                    strokeWidth={2.5}
                  />
                </motion.div>
                <div className="relative flex flex-1 items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    className="text-foreground w-full bg-transparent text-[15px] font-medium outline-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  {!query && (
                    <motion.span
                      layoutId="search-text"
                      transition={sharedTransition}
                      className="text-muted-foreground pointer-events-none absolute left-0 text-[15px] font-medium"
                    >
                      Find...
                    </motion.span>
                  )}
                </div>
                <div className="ml-2 flex items-center gap-1.5">
                  <motion.span
                    layoutId="search-shortcut"
                    transition={sharedTransition}
                    className="border-border bg-muted text-muted-foreground rounded-lg border p-0.5 px-1 text-[11px] font-bold"
                  >
                    Esc
                  </motion.span>
                </div>
              </div>

              <div className="custom-scrollbar max-h-[380px] overflow-y-auto p-1.5">
                {filteredItems.length === 0 ? (
                  <div className="text-muted-foreground py-12 text-center text-sm">
                    No results found for "{query}"
                  </div>
                ) : (
                  <div className="space-y-4 py-1">
                    {sections.map((section) => (
                      <div key={section.name} className="space-y-1">
                        <h3 className="text-muted-foreground px-3 py-1 text-[11px] font-semibold tracking-wider uppercase">
                          {section.name}
                        </h3>
                        <div className="space-y-0.5">
                          {section.items.map((item) => {
                            const globalIndex = filteredItems.findIndex(
                              (fi) => fi.id === item.id
                            );
                            const isActive = globalIndex === activeIndex;

                            return (
                              <button
                                key={item.id}
                                className={`group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"} `}
                                onMouseEnter={() => setActiveIndex(globalIndex)}
                                onClick={() => {
                                  item.action();
                                  setIsOpen(false);
                                }}
                              >
                                <div className="flex items-center gap-3">
                                  <span
                                    className={`${isActive ? "text-accent-foreground" : "text-muted-foreground group-hover:text-foreground"}`}
                                  >
                                    {item.icon}
                                  </span>
                                  <span className="text-[14px] leading-none font-medium">
                                    {item.title}
                                  </span>
                                </div>

                                {item.shortcut && (
                                  <kbd
                                    className={`rounded-lg border px-1.5 py-0.5 text-[10px] font-bold ${isActive ? "border-border bg-background text-muted-foreground" : "text-muted-foreground group-hover:text-foreground border-transparent bg-transparent"} `}
                                  >
                                    {item.shortcut}
                                  </kbd>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
