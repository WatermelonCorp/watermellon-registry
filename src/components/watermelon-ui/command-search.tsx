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
import { motion } from "motion/react";
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
  onClose: () => void;
  items?: CommandItem[];
}

export const CommandSearch: FC<Props> = ({
  onClose,
  items = DEFAULT_ITEMS,
}) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };
    // Use capture to catch the event before other listeners
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.addEventListener("keydown", handleEscape as any, true);
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.removeEventListener("keydown", handleEscape as any, true);
    };
  }, [onClose]);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, items]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveIndex(0);
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
        (prev) => (prev - 1 + filteredItems.length) % filteredItems.length,
      );
    } else if (e.key === "Enter") {
      const selectedItem = filteredItems[activeIndex];
      if (selectedItem) {
        selectedItem.action();
        onClose();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-start justify-center pt-12 "
      onClick={onClose}
    >
      <motion.div
        layoutId="command-pallete"
        layout={false}
        transition={{ type: "spring", damping: 30, stiffness: 450, mass: 1 }}
        className="relative w-[calc(100%-2rem)] mx-4 md:mx-0 md:max-w-[580px] bg-white dark:bg-zinc-950 border-[1.4px] border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] dark:shadow-black h-max"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b-[1.4px] border-zinc-100 dark:border-zinc-800/50">
          <Search
            size={18}
            className="text-zinc-400 dark:text-zinc-500 mr-3"
            strokeWidth={2.5}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Find..."
            className="flex-1 bg-transparent text-zinc-900 dark:text-white text-[15px] outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="flex items-center gap-1.5 ml-2">
            <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800 p-0.5 px-1 rounded-[2px] bg-zinc-50 dark:bg-zinc-900/50">
              Esc
            </span>
          </div>
        </div>

        {/* Results Body */}
        <div className="max-h-[380px] overflow-y-auto custom-scrollbar p-1.5">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-sm">
              No results found for "{query}"
            </div>
          ) : (
            <div className="space-y-4 py-1">
              {sections.map((section) => (
                <div key={section.name} className="space-y-1">
                  <h3 className="px-3 py-1 text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    {section.name}
                  </h3>
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const globalIndex = filteredItems.findIndex(
                        (fi) => fi.id === item.id,
                      );
                      const isActive = globalIndex === activeIndex;

                      return (
                        <button
                          key={item.id}
                          className={`
                            group w-full flex items-center justify-between px-3 py-2.5 rounded-md text-left
                            ${isActive ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"}
                          `}
                          onMouseEnter={() => setActiveIndex(globalIndex)}
                          onClick={() => {
                            item.action();
                            onClose();
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`${isActive ? "text-zinc-900 dark:text-white" : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"}`}
                            >
                              {item.icon}
                            </span>
                            <span className="text-[14px] font-medium leading-none">
                              {item.title}
                            </span>
                          </div>

                          {item.shortcut && (
                            <kbd
                              className={`
                              text-[10px] font-bold px-1.5 py-0.5 rounded border 
                              ${isActive ? "bg-white dark:bg-zinc-700/50 border-zinc-300 dark:border-zinc-600 text-zinc-500 dark:text-zinc-300" : "bg-transparent border-transparent text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-500"}
                            `}
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
    </motion.div>
  );
};
