import { useState, useMemo, useEffect, useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Search, User, Bell, HelpCircle, MessageSquare } from 'lucide-react';
import { GoArrowRight } from "react-icons/go";

export interface CommandItem {
  id: string;
  title: string;
  section: 'Suggestions' | 'Settings' | 'Help';
  icon: ReactNode;
  shortcut?: string;
  action: () => void;
}

/*  DEFAULT DATA */
const DEFAULT_ITEMS: CommandItem[] = [
  { id: '1', title: 'Calendar', section: 'Suggestions', icon: <GoArrowRight size={16} />, action: () => console.log('Calendar') },
  { id: '2', title: 'Search Emoji', section: 'Suggestions', icon: <GoArrowRight size={16} />, action: () => console.log('Emoji') },
  { id: '3', title: 'Calculator', section: 'Suggestions', icon: <GoArrowRight size={16} />, action: () => console.log('Calculator') },

  { id: '4', title: 'Profile', section: 'Settings', icon: <User size={16} />, shortcut: '⌘ P', action: () => console.log('Profile') },
  { id: '5', title: 'Notifications', section: 'Settings', icon: <Bell size={16} />, shortcut: '⌘ N', action: () => console.log('Notifications') },

  { id: '6', title: 'FAQ', section: 'Help', icon: <HelpCircle size={16} />, action: () => console.log('FAQ') },
  { id: '7', title: 'Messages', section: 'Help', icon: <MessageSquare size={16} />, action: () => console.log('Messages') },
];

interface Props {
  onClose: () => void;
  items?: CommandItem[]; 
}

export const CommandSearch: React.FC<Props> = ({
  onClose,
  items = DEFAULT_ITEMS, 
}) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, items]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const sections = useMemo(() => {
    const groups: { [key: string]: CommandItem[] } = {};
    filteredItems.forEach(item => {
      if (!groups[item.section]) groups[item.section] = [];
      groups[item.section].push(item);
    });

    return Object.entries(groups).map(([name, items]) => ({
      name,
      items
    }));
  }, [filteredItems]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
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
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/40 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.98, opacity: 0, y: -10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.98, opacity: 0, y: -10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-[580px] bg-[#0c0c0c] border-[1.4px] border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl shadow-black"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b-[1.4px] border-zinc-800/50">
          <Search size={18} className="text-zinc-500 mr-3" strokeWidth={2.5} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Find..."
            className="flex-1 bg-transparent text-white text-[15px] outline-none placeholder:text-zinc-600 font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="flex items-center gap-1.5 ml-2">
            <span className="text-[11px] font-bold text-zinc-500 border border-zinc-800 p-0.5 px-1 rounded-[2px] bg-zinc-900/50">Esc</span>
          </div>
        </div>

        {/* Results Body */}
        <motion.div layout className="max-h-[380px] overflow-y-auto custom-scrollbar p-1.5">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-sm">
              No results found for "{query}"
            </div>
          ) : (
            <div className="space-y-4 py-1">
              {sections.map((section) => (
                <div key={section.name} className="space-y-1">
                  <h3 className="px-3 py-1 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                    {section.name}
                  </h3>
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const globalIndex = filteredItems.findIndex(fi => fi.id === item.id);
                      const isActive = globalIndex === activeIndex;

                      return (
                        <motion.button
                          key={item.id}
                          layout
                          className={`
                            group w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-all duration-75 text-left
                            ${isActive ? 'bg-[#232323] text-white' : 'text-zinc-400 hover:text-zinc-200'}
                          `}
                          onMouseEnter={() => setActiveIndex(globalIndex)}
                          onClick={() => {
                            item.action();
                            onClose();
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'} transition-colors`}>
                              {item.icon}
                            </span>
                            <span className="text-[14px] font-medium leading-none">{item.title}</span>
                          </div>
                          
                          {item.shortcut && (
                            <kbd className={`
                              text-[10px] font-bold px-1.5 py-0.5 rounded border 
                              ${isActive ? 'bg-zinc-700/50 border-zinc-600 text-zinc-300' : 'bg-transparent border-transparent text-zinc-600 group-hover:text-zinc-500'}
                            `}>
                              {item.shortcut}
                            </kbd>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Footer info */}
        {filteredItems.length > 0 && (
          <div className="px-4 py-2 bg-black/40 border-t border-zinc-800/30 flex justify-end">
            <div className="flex gap-4 items-center opacity-40">
               <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                  <span className="p-0.5 border border-zinc-700 rounded bg-zinc-800 leading-none">↵</span>
                  <span>Select</span>
               </div>
               <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                  <span className="flex flex-col gap-0.5">
                    <span className="p-0.5 border border-zinc-700 rounded bg-zinc-800 leading-none text-[8px]">▲</span>
                    <span className="p-0.5 border border-zinc-700 rounded bg-zinc-800 leading-none text-[8px]">▼</span>
                  </span>
                  <span>Navigate</span>
               </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};